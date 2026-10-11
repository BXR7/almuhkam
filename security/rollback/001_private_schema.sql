-- Approval-gated rollback: preserves every record and keeps API access denied.
-- Stop writes; compare counts/digests; restore compatibility build mapped to public for original models.
-- Never restore the known-secret/default-password release.
BEGIN;
SET LOCAL lock_timeout = '5s';
DO $$ DECLARE t text; BEGIN
  FOREACH t IN ARRAY ARRAY['User','Post','Project','Inquiry','Setting'] LOOP
    EXECUTE format('ALTER TABLE app_private.%I SET SCHEMA public',t);
  END LOOP;
END $$;
-- Retain Session/RateLimit, ownership, ACLs, policies, FORCE RLS, role defaults and private schema.
-- Tables moved to public remain API-denied; runtime needs existing public USAGE.
GRANT USAGE ON SCHEMA public TO aljalal_runtime;
COMMIT;
