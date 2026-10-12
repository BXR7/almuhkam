-- Read-only post-migration assertions. Run through the authorized operator.
BEGIN READ ONLY;
DO $$
DECLARE t text; r text;
BEGIN
  IF EXISTS (SELECT 1 FROM pg_roles WHERE rolname IN ('aljalal_app','aljalal_runtime')
    AND (rolsuper OR rolbypassrls OR rolcreaterole OR rolcreatedb OR rolreplication)) THEN
    RAISE EXCEPTION 'Elevated runtime role';
  END IF;
  IF has_schema_privilege('aljalal_app','app_private','CREATE') OR has_schema_privilege('aljalal_app','public','CREATE') THEN
    RAISE EXCEPTION 'Runtime DDL privilege';
  END IF;
  FOREACH t IN ARRAY ARRAY['User','Post','Project','Inquiry','Setting','Session','RateLimit'] LOOP
    IF NOT EXISTS (SELECT 1 FROM pg_class c JOIN pg_namespace n ON n.oid=c.relnamespace
      WHERE n.nspname='app_private' AND c.relname=t AND c.relrowsecurity AND c.relforcerowsecurity
      AND pg_get_userbyid(c.relowner)='aljalal_owner') THEN RAISE EXCEPTION 'RLS/ownership mismatch on %',t; END IF;
    IF has_table_privilege('aljalal_app',format('app_private.%I',t),'TRUNCATE') THEN RAISE EXCEPTION 'Runtime truncate privilege'; END IF;
    FOREACH r IN ARRAY ARRAY['anon','authenticated','service_role'] LOOP
      IF EXISTS (SELECT 1 FROM pg_roles WHERE rolname=r) THEN
        IF has_schema_privilege(r,'app_private','USAGE') OR has_table_privilege(r,format('app_private.%I',t),'SELECT,INSERT,UPDATE,DELETE') THEN
          RAISE EXCEPTION 'API grant remains for % on %',r,t;
        END IF;
      END IF;
    END LOOP;
  END LOOP;
  IF has_table_privilege('aljalal_app','app_private."User"','INSERT,UPDATE,DELETE') THEN RAISE EXCEPTION 'Runtime can modify credentials'; END IF;
END $$;
SELECT 'database boundary checks passed; still verify dashboard/API/Advisor externally' AS result;
COMMIT;
