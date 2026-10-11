-- Manual, approval-gated migration. NOT automatically run during build or deployment.
-- Preconditions: restorable backup verified; diagnostics reviewed; isolated tests passed;
-- reviewed owner/operator; all existing table/column grants and policies understood.
BEGIN;
SET LOCAL lock_timeout = '5s';
SET LOCAL statement_timeout = '60s';
-- Fail on drift, rather than modifying an unreviewed existing role/schema.
CREATE ROLE aljalal_owner NOLOGIN NOSUPERUSER NOBYPASSRLS NOCREATEDB NOCREATEROLE NOREPLICATION;
CREATE ROLE aljalal_runtime NOLOGIN NOSUPERUSER NOBYPASSRLS NOCREATEDB NOCREATEROLE NOREPLICATION;
CREATE ROLE aljalal_app NOLOGIN NOSUPERUSER NOBYPASSRLS NOCREATEDB NOCREATEROLE NOREPLICATION IN ROLE aljalal_runtime;
DO $$ BEGIN
  IF has_schema_privilege('aljalal_app','public','CREATE') THEN
    RAISE EXCEPTION 'Runtime inherits public CREATE: review shared schema privileges before proceeding';
  END IF;
END $$;
-- The trusted migration operator needs owner membership; Supabase postgres is
-- not a superuser. PostgreSQL 16+ creator membership does not imply SET/INHERIT.
-- Never grant this membership to the runtime or Data API roles.
DO $$ BEGIN
  IF current_setting('server_version_num')::int >= 160000 THEN
    EXECUTE format('GRANT aljalal_owner TO %I WITH INHERIT TRUE, SET TRUE', current_user);
  ELSE
    EXECUTE format('GRANT aljalal_owner TO %I', current_user);
  END IF;
END $$;
CREATE SCHEMA app_private AUTHORIZATION aljalal_owner;
REVOKE ALL ON SCHEMA app_private FROM PUBLIC;
GRANT USAGE ON SCHEMA app_private TO aljalal_runtime;
DO $$
DECLARE t text; r record;
BEGIN
  FOREACH t IN ARRAY ARRAY['User','Post','Project','Inquiry','Setting'] LOOP
    IF EXISTS (SELECT 1 FROM pg_policies WHERE schemaname='public' AND tablename=t) THEN
      RAISE EXCEPTION 'Unexpected policy on %, review diagnostics before migration', t;
    END IF;
    -- Includes inherited PUBLIC grants; revoke column ACLs as well as table ACLs.
    FOR r IN SELECT DISTINCT CASE WHEN a.grantee=0 THEN 'PUBLIC' ELSE quote_ident(pg_get_userbyid(a.grantee)) END AS grantee
      FROM pg_class c JOIN pg_namespace n ON n.oid=c.relnamespace,
      LATERAL aclexplode(c.relacl) a WHERE n.nspname='public' AND c.relname=t AND a.grantee<>c.relowner
    LOOP
      EXECUTE format('REVOKE ALL ON TABLE public.%I FROM %s',t,r.grantee);
    END LOOP;
    FOR r IN SELECT att.attname, CASE WHEN a.grantee=0 THEN 'PUBLIC' ELSE quote_ident(pg_get_userbyid(a.grantee)) END AS grantee
      FROM pg_attribute att JOIN pg_class c ON c.oid=att.attrelid JOIN pg_namespace n ON n.oid=c.relnamespace,
      LATERAL aclexplode(att.attacl) a WHERE n.nspname='public' AND c.relname=t AND a.grantee<>c.relowner
    LOOP
      EXECUTE format('REVOKE ALL (%I) ON TABLE public.%I FROM %s',r.attname,t,r.grantee);
    END LOOP;
    EXECUTE format('REVOKE ALL ON TABLE public.%I FROM PUBLIC',t);
    EXECUTE format('ALTER TABLE public.%I SET SCHEMA app_private',t);
    EXECUTE format('ALTER TABLE app_private.%I OWNER TO aljalal_owner',t);
    EXECUTE format('ALTER TABLE app_private.%I ENABLE ROW LEVEL SECURITY',t);
    EXECUTE format('ALTER TABLE app_private.%I FORCE ROW LEVEL SECURITY',t);
  END LOOP;
END $$;
SET LOCAL ROLE aljalal_owner;
CREATE TABLE app_private."Session" (
  "id" TEXT PRIMARY KEY, "userId" TEXT NOT NULL REFERENCES app_private."User"("id") ON DELETE CASCADE ON UPDATE CASCADE,
  "expiresAt" TIMESTAMP(3) NOT NULL, "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX "Session_userId_idx" ON app_private."Session"("userId");
CREATE INDEX "Session_expiresAt_idx" ON app_private."Session"("expiresAt");
CREATE TABLE app_private."RateLimit" ("key" TEXT PRIMARY KEY, "count" INTEGER NOT NULL, "resetAt" TIMESTAMP(3) NOT NULL);
CREATE INDEX "RateLimit_resetAt_idx" ON app_private."RateLimit"("resetAt");
ALTER TABLE app_private."Session" ENABLE ROW LEVEL SECURITY;
ALTER TABLE app_private."Session" FORCE ROW LEVEL SECURITY;
ALTER TABLE app_private."RateLimit" ENABLE ROW LEVEL SECURITY;
ALTER TABLE app_private."RateLimit" FORCE ROW LEVEL SECURITY;
-- JWT users are NOT PostgreSQL identities. Server code enforces individual permissions.
-- RLS explicitly admits only the server runtime group, never anon/authenticated/service_role.
DO $$ DECLARE t text; BEGIN
  FOREACH t IN ARRAY ARRAY['User','Post','Project','Inquiry','Setting','Session','RateLimit'] LOOP
    EXECUTE format('CREATE POLICY server_runtime ON app_private.%I TO aljalal_runtime USING (true) WITH CHECK (true)',t);
  END LOOP;
END $$;
GRANT SELECT ON app_private."User" TO aljalal_runtime;
GRANT SELECT, INSERT, UPDATE, DELETE ON app_private."Post", app_private."Project", app_private."Inquiry", app_private."Session", app_private."RateLimit" TO aljalal_runtime;
GRANT SELECT, INSERT, UPDATE ON app_private."Setting" TO aljalal_runtime;
-- No automatic grants to runtime: each future table needs an intentional grant/policy.
ALTER DEFAULT PRIVILEGES FOR ROLE aljalal_owner REVOKE ALL ON TABLES FROM PUBLIC;
ALTER DEFAULT PRIVILEGES FOR ROLE aljalal_owner REVOKE ALL ON SEQUENCES FROM PUBLIC;
ALTER DEFAULT PRIVILEGES FOR ROLE aljalal_owner REVOKE EXECUTE ON FUNCTIONS FROM PUBLIC;
ALTER DEFAULT PRIVILEGES FOR ROLE aljalal_owner REVOKE USAGE ON TYPES FROM PUBLIC;
COMMIT;
-- Operator separately provisions aljalal_app LOGIN/password using secret manager, never this file.
-- Supabase Data API should be disabled after confirming no external consumers; app_private MUST NOT be exposed.
