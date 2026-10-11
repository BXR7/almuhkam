// Dedicated local, synthetic database ONLY. Fails if already initialized.
import pg from "pg";
import bcrypt from "bcryptjs";
import assert from "node:assert/strict";
import { readFile, writeFile } from "node:fs/promises";
import { randomBytes } from "node:crypto";
const port = process.env.TEST_PG_PORT || "55439";
if (!/^[0-9]{4,5}$/.test(port)) throw new Error("Invalid local test port");
const admin = new pg.Client({ connectionString: `postgresql://postgres@127.0.0.1:${port}/postgres` });
await admin.connect();
await admin.query("CREATE ROLE migration_operator LOGIN CREATEROLE CREATEDB NOSUPERUSER NOBYPASSRLS");
await admin.query("CREATE DATABASE aljalal_security_test OWNER migration_operator");
await admin.end();
const db = new pg.Client({ connectionString: `postgresql://postgres@127.0.0.1:${port}/aljalal_security_test` });
await db.connect();
const operator = new pg.Client({ connectionString: `postgresql://migration_operator@127.0.0.1:${port}/aljalal_security_test` });
await operator.connect();
try {
  await operator.query(await readFile("security/test-baseline.sql", "utf8"));
  await db.query("CREATE ROLE anon NOLOGIN; CREATE ROLE authenticated NOLOGIN; CREATE ROLE service_role NOLOGIN BYPASSRLS");
  await db.query('GRANT USAGE ON SCHEMA public TO anon, authenticated, service_role; GRANT ALL ON ALL TABLES IN SCHEMA public TO anon, authenticated, service_role; GRANT SELECT (email) ON public."User" TO anon');
  const password = randomBytes(24).toString("base64");
  const hash = await bcrypt.hash(password, 12);
  for (const [id, role] of [["admin-fixture", "ADMIN"], ["editor-fixture", "EDITOR"]]) {
    await db.query('INSERT INTO public."User" (id,name,email,password,role,"updatedAt") VALUES ($1,$1,$2,$3,$4,NOW())', [id, `${id}@example.test`, hash, role]);
  }
  await db.query(`INSERT INTO public."Post" (id,title,slug,excerpt,content,"isPublished","updatedAt") VALUES ('published','Public article','published','excerpt','Public content',true,NOW()), ('draft','Private draft','draft','SECRET draft excerpt','SECRET draft body',false,NOW());
    INSERT INTO public."Project" (id,title,"beforeText","afterText","editsJson","updatedAt") VALUES ('project','Public project','Before','After','[]',NOW());
    INSERT INTO public."Inquiry" (id,name,email,message,"updatedAt") VALUES ('inquiry','Synthetic customer','customer@example.test','PRIVATE customer message',NOW());
    INSERT INTO public."Setting" (key,value,"updatedAt") VALUES ('site_name','Fixture site',NOW());`);
  const tables = ['User','Post','Project','Inquiry','Setting'];
  async function fingerprint(schema) {
    const result = {};
    for (const t of tables) result[t] = (await db.query(`SELECT count(*)::int AS count, md5(string_agg(row_to_json(t)::text, ',' ORDER BY row_to_json(t)::text)) AS digest FROM ${schema}."${t}" t`)).rows[0];
    return result;
  }
  const before = await fingerprint("public");
  await operator.query(await readFile("security/migrations/001_private_schema.sql", "utf8"));
  assert.equal((await operator.query("SELECT rolsuper FROM pg_roles WHERE rolname=current_user")).rows[0].rolsuper, false);
  assert.equal((await db.query("SELECT pg_has_role('aljalal_app','aljalal_owner','MEMBER') AS allowed")).rows[0].allowed, false);
  assert.deepEqual(await fingerprint("app_private"), before);
  await db.query(await readFile("security/verify.sql", "utf8"));
  await db.query("ALTER ROLE aljalal_app LOGIN");
  for (const role of ['anon','authenticated','service_role']) {
    await db.query(`SET ROLE ${role}`);
    for (const t of tables) {
      await assert.rejects(db.query(`SELECT * FROM app_private."${t}"`), e => e.code === '42501');
      await assert.rejects(db.query(`SELECT * FROM public."${t}"`), e => e.code === '42P01');
    }
    await db.query("RESET ROLE");
  }
  await db.query("SET ROLE aljalal_app");
  assert.equal((await db.query('SELECT count(*)::int n FROM app_private."Post"')).rows[0].n, 2);
  await assert.rejects(db.query(`UPDATE app_private."User" SET role='ADMIN'`), e => e.code === '42501');
  await assert.rejects(db.query('CREATE TABLE app_private.bad (id int)'), e => e.code === '42501');
  // Verify TRUNCATE denied via privilege introspection; never execute a destructive statement.
  assert.equal((await db.query(`SELECT has_table_privilege(current_user,'app_private."Post"','TRUNCATE') AS allowed`)).rows[0].allowed, false);
  await db.query("RESET ROLE");
  await db.query('BEGIN; SET LOCAL ROLE aljalal_owner; CREATE TABLE app_private.future_fixture (id int); RESET ROLE');
  for (const role of ['anon','authenticated','service_role','aljalal_app']) {
    assert.equal((await db.query("SELECT has_table_privilege($1,'app_private.future_fixture','SELECT') AS allowed", [role])).rows[0].allowed, false);
  }
  await db.query('ROLLBACK');
  // Exercise the rollback inside a transaction, then restore the tested forward state.
  const rollback = (await readFile("security/rollback/001_private_schema.sql", "utf8")).replace(/^BEGIN;$/m, '').replace(/^COMMIT;$/m, '');
  await operator.query('BEGIN'); await operator.query(rollback);
  assert.equal((await operator.query("SELECT count(*)::int n FROM pg_tables WHERE schemaname='public' AND tablename=ANY($1)", [tables])).rows[0].n, tables.length);
  await operator.query('ROLLBACK');
  await db.query('BEGIN'); await db.query(rollback);
  assert.deepEqual(await fingerprint("public"), before);
  await db.query('SET LOCAL ROLE anon');
  await assert.rejects(db.query('SELECT * FROM public."Inquiry"'), e => e.code === '42501');
  // Expected denial aborts transaction; ROLLBACK restores all forward schema changes.
  await db.query('ROLLBACK');
  assert.deepEqual(await fingerprint("app_private"), before);
  const config = { DATABASE_URL: `postgresql://aljalal_app@127.0.0.1:${port}/aljalal_security_test`, JWT_SECRET: randomBytes(48).toString("base64"), TEST_PASSWORD: password };
  await writeFile('/tmp/aljalal-test-config.json', JSON.stringify(config), { mode: 0o600 });
  console.log('PASS: forward migration, original row counts/digests, anon/authenticated/service_role denial, runtime least privilege, future-table defaults, rollback integrity and denial');
} finally { await operator.end(); await db.end(); }
