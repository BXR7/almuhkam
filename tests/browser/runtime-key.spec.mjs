import { test, expect } from '@playwright/test';
import { readFile } from 'node:fs/promises';
import { spawn } from 'node:child_process';
import { once } from 'node:events';
import pg from 'pg';
import { SignJWT } from 'jose';

const config = JSON.parse(await readFile('/tmp/aljalal-test-config.json', 'utf8'));
const database = new URL(config.DATABASE_URL);
if (database.hostname !== '127.0.0.1' || database.pathname !== '/aljalal_security_test') throw new Error('Local fixtures only');
database.username = 'postgres'; database.password = '';

test('production runtime without a JWT key refuses existing sessions and valid-password login', async ({ browser }) => {
  const db = new pg.Client({ connectionString: database.href });
  await db.connect();
  const env = { ...process.env, ...config, NODE_ENV: 'production' };
  delete env.JWT_SECRET;
  const server = spawn(process.execPath, ['node_modules/next/dist/bin/next', 'start', '--hostname', '127.0.0.1', '--port', '3010'], { env, stdio: 'ignore' });
  const context = await browser.newContext();
  try {
    await expect.poll(async () => {
      try { return (await context.request.get('http://127.0.0.1:3010/admin/login')).status(); }
      catch { return 0; }
    }, { timeout: 30000 }).toBe(200);
    const page = await context.newPage();
    await page.goto('http://127.0.0.1:3010/blog');
    await expect(page.getByText('Public article')).toBeVisible();
    const id = 'missing-key-session-fixture';
    await db.query('INSERT INTO app_private."Session" (id,"userId","expiresAt") VALUES ($1,$2,NOW()+INTERVAL \'1 hour\')', [id, 'admin-fixture']);
    const token = await new SignJWT({}).setProtectedHeader({ alg: 'HS256' }).setSubject('admin-fixture')
      .setJti(id).setIssuer('aljalal').setAudience('aljalal-admin').setIssuedAt().setExpirationTime('1h')
      .sign(new TextEncoder().encode(config.JWT_SECRET));
    await context.addCookies([{ name: 'aljalal_admin_session', value: token, domain: '127.0.0.1', path: '/' }]);
    await page.goto('http://127.0.0.1:3010/admin');
    await expect(page).toHaveURL(/\/admin\/login$/);
    await context.clearCookies();
    const before = (await db.query('SELECT count(*)::int n FROM app_private."Session"')).rows[0].n;
    await page.locator('[name=email]').fill('admin-fixture@example.test');
    await page.locator('[name=password]').fill(config.TEST_PASSWORD);
    await page.locator('button[type=submit]').last().click();
    await expect(page.getByText('حدث خطأ أثناء محاولة تسجيل الدخول.')).toBeVisible();
    await expect(page).toHaveURL(/\/admin\/login$/);
    expect((await context.cookies()).some(cookie => cookie.name === 'aljalal_admin_session')).toBe(false);
    expect((await db.query('SELECT count(*)::int n FROM app_private."Session"')).rows[0].n).toBe(before);
  } finally {
    await context.close();
    if (server.exitCode === null) {
      const exited = once(server, 'exit'); server.kill('SIGTERM'); await exited;
    }
    await db.query('DELETE FROM app_private."Session" WHERE id=$1', ['missing-key-session-fixture']);
    await db.end();
  }
});
