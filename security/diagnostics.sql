-- Read-only. Run once as the REAL runtime identity and once as the migration operator.
-- Do not include connection URLs or customer rows in evidence output.
BEGIN READ ONLY;
SELECT current_user, session_user, current_database(), current_setting('search_path');
SELECT rolname, rolsuper, rolbypassrls, rolcreaterole, rolcreatedb, rolcanlogin, rolinherit
FROM pg_roles WHERE rolname IN (current_user, session_user, 'anon', 'authenticated', 'service_role', 'authenticator') OR rolname LIKE 'aljalal_%';
SELECT pg_get_userbyid(member) AS member, pg_get_userbyid(roleid) AS parent FROM pg_auth_members;
SELECT nspname, pg_get_userbyid(nspowner) AS owner, nspacl FROM pg_namespace WHERE nspname IN ('public','app_private');
SELECT n.nspname, c.relname, pg_get_userbyid(c.relowner) AS owner,
 c.relrowsecurity, c.relforcerowsecurity, c.relacl
FROM pg_class c JOIN pg_namespace n ON n.oid=c.relnamespace
WHERE n.nspname IN ('public','app_private') AND c.relkind IN ('r','p','v','m','S');
SELECT * FROM pg_policies WHERE schemaname IN ('public','app_private');
SELECT defaclrole::regrole, defaclnamespace::regnamespace, defaclobjtype, defaclacl FROM pg_default_acl;
SELECT table_schema, table_name, grantee, privilege_type FROM information_schema.table_privileges WHERE table_schema IN ('public','app_private');
SELECT table_schema, table_name, column_name, grantee, privilege_type FROM information_schema.column_privileges WHERE table_schema IN ('public','app_private');
SELECT n.nspname, p.proname, p.prosecdef, p.proconfig, p.proacl
FROM pg_proc p JOIN pg_namespace n ON p.pronamespace=n.oid WHERE n.nspname IN ('public','app_private');
-- Exposed schemas may be set externally by Supabase, so NULL is NOT proof of no API exposure.
SELECT current_setting('pgrst.db_schemas', true);
SELECT r.rolname, d.datname, s.setconfig FROM pg_db_role_setting s
LEFT JOIN pg_roles r ON r.oid=s.setrole LEFT JOIN pg_database d ON d.oid=s.setdatabase;
SELECT c.relname, has_table_privilege(current_user,c.oid,'SELECT') AS can_select,
 has_table_privilege(current_user,c.oid,'INSERT') AS can_insert,
 has_table_privilege(current_user,c.oid,'UPDATE') AS can_update,
 has_table_privilege(current_user,c.oid,'DELETE') AS can_delete,
 has_table_privilege(current_user,c.oid,'TRUNCATE') AS can_truncate
FROM pg_class c JOIN pg_namespace n ON n.oid=c.relnamespace WHERE n.nspname IN ('public','app_private') AND c.relkind='r';
COMMIT;
-- Additionally export ALL Supabase Advisor findings, Data API/GraphQL settings, extension versions,
-- backup/PITR status and deployment environment variable NAMES (never values) via the dashboard.
