import { test, expect } from '@playwright/test';
import { readFile } from 'node:fs/promises';
import pg from 'pg';
import { SignJWT } from 'jose';
const config = JSON.parse(await readFile('/tmp/aljalal-test-config.json', 'utf8'));
const localDatabase = new URL(config.DATABASE_URL);
if (localDatabase.hostname !== '127.0.0.1' || localDatabase.pathname !== '/aljalal_security_test') throw new Error('Local fixtures only');
localDatabase.username = 'postgres'; localDatabase.password = '';
const db = new pg.Client({ connectionString: localDatabase.href });
test.beforeAll(() => db.connect());
test.afterAll(() => db.end());
test.beforeEach(() => db.query('DELETE FROM app_private."RateLimit"'));
const customerEmail = `browser-${Date.now()}@example.test`;
async function login(page, role = 'admin') {
  await page.goto('/admin/login');
  await page.locator('[name=email]').fill(`${role}-fixture@example.test`);
  await page.locator('[name=password]').fill(config.TEST_PASSWORD);
  await page.locator('button[type=submit]').last().click();
  await expect(page).toHaveURL(role === 'admin' ? /\/admin$/ : /\/admin\/blog$/);
}
async function replay(context, req) {
  const original = await req.allHeaders();
  const headers = Object.fromEntries(['content-type', 'next-action', 'origin', 'accept'].filter(k => original[k]).map(k => [k, original[k]]));
  return context.request.post(req.url(), { headers, data: req.postDataBuffer(), maxRedirects: 0, timeout: 10000 });
}

test('public retrieval, draft secrecy, inquiry creation, headers and unauthenticated dashboard', async ({ page }) => {
  const response = await page.goto('/blog');
  expect(response.headers()['x-content-type-options']).toBe('nosniff');
  await expect(page.getByText('Public article')).toBeVisible();
  expect((await page.goto('/blog/draft')).status()).toBe(404);
  expect(await page.content()).not.toContain('SECRET draft');
  await page.goto('/blog/published'); await expect(page.getByText('Public content')).toBeVisible();
  await page.goto('/portfolio'); await expect(page.getByText('Public project')).toBeVisible();
  await page.goto('/admin/inquiries'); await expect(page).toHaveURL(/login$/);
  await page.goto('/contact');
  await page.locator('[name=name]').fill('Browser customer');
  await page.locator('[name=email]').fill(customerEmail);
  await page.locator('[name=message]').fill('Browser inquiry');
  await page.locator('button[type=submit]').last().click();
  await expect(page.getByText('تم استلام طلبك بنجاح!', { exact: false })).toBeVisible();
  expect((await db.query('SELECT count(*)::int n FROM app_private."Inquiry" WHERE email=$1', [customerEmail])).rows[0].n).toBe(1);
});

test('administrator login and content create/update/delete; anonymous action replay denied', async ({ page, browser }) => {
  await login(page);
  await expect(page.getByText('PRIVATE customer message')).toBeVisible();
  await page.goto('/admin/blog/new');
  await page.locator('[name=title]').fill('Browser article');
  await page.locator('[name=slug]').fill('browser-article');
  await page.locator('[name=excerpt]').fill('Browser excerpt');
  await page.locator('[name=content]').fill('Browser content');
  const request = page.waitForRequest(r => r.method() === 'POST' && r.url().includes('/admin/blog/new'));
  await page.locator('button[type=submit]').last().click();
  const captured = await request;
  await expect(page).toHaveURL(/\/admin\/blog$/);
  const anon = await browser.newContext();
  await replay(anon, captured);
  expect((await db.query(`SELECT count(*)::int n FROM app_private."Post" WHERE slug LIKE 'browser-article%'`)).rows[0].n).toBe(1);
  await anon.close();
  const originalHeaders = await captured.allHeaders();
  await page.context().request.post(captured.url(), {
    headers: { 'content-type': originalHeaders['content-type'], 'next-action': originalHeaders['next-action'], origin: 'https://untrusted.example' },
    data: captured.postDataBuffer(), maxRedirects: 0,
  });
  expect((await db.query(`SELECT count(*)::int n FROM app_private."Post" WHERE slug LIKE 'browser-article%'`)).rows[0].n).toBe(1);
  const id = (await db.query(`SELECT id FROM app_private."Post" WHERE slug='browser-article'`)).rows[0].id;
  await page.goto(`/admin/blog/${id}`);
  await page.locator('[name=title]').fill('Updated article');
  await page.locator('button[type=submit]').last().click();
  await expect(page).toHaveURL(/\/admin\/blog$/);
  await expect(page.getByText('Updated article')).toBeVisible();
  await page.getByRole('row').filter({ hasText: 'Updated article' }).locator('button[title="حذف المقال"]').click();
  await expect(page.getByText('Updated article')).toHaveCount(0);
  expect((await db.query('SELECT id FROM app_private."Post" WHERE id=$1', [id])).rowCount).toBe(0);
  await page.goto('/admin/portfolio/new');
  await page.locator('[name=title]').fill('Browser project');
  await page.locator('[name=beforeText]').fill('Original');
  await page.locator('[name=afterText]').fill('Revised');
  await page.locator('button[type=submit]').last().click();
  await expect(page).toHaveURL(/\/admin\/portfolio$/);
  const projectId = (await db.query(`SELECT id FROM app_private."Project" WHERE title='Browser project'`)).rows[0].id;
  await page.goto(`/admin/portfolio/${projectId}`);
  await page.locator('[name=title]').fill('Updated project');
  await page.locator('button[type=submit]').last().click();
  await expect(page).toHaveURL(/\/admin\/portfolio$/);
  await page.getByRole('row').filter({ hasText: 'Updated project' }).locator('button[title="حذف النموذج"]').click();
  await expect(page.getByText('Updated project')).toHaveCount(0);
});

test('editor denied customer data, private action replay; logout revokes server session', async ({ page, browser }) => {
  await login(page);
  await page.goto('/admin/inquiries');
  const row = page.getByRole('row').filter({ has: page.getByText('customer@example.test', { exact: true }) });
  const request = page.waitForRequest(r => r.method() === 'POST');
  await row.locator('select').selectOption('IN_REVIEW');
  const captured = await request;
  await expect.poll(async () => (await db.query(`SELECT status FROM app_private."Inquiry" WHERE id='inquiry'`)).rows[0].status).toBe('IN_REVIEW');
  const editorContext = await browser.newContext();
  const editor = await editorContext.newPage(); await login(editor, 'editor');
  const privateResponse = await editor.goto('/admin/inquiries');
  expect(privateResponse.status()).toBe(500);
  expect(await editor.content()).not.toContain('PRIVATE customer message');
  await db.query(`UPDATE app_private."Inquiry" SET status='NEW' WHERE id='inquiry'`);
  await replay(editorContext, captured);
  expect((await db.query(`SELECT status FROM app_private."Inquiry" WHERE id='inquiry'`)).rows[0].status).toBe('NEW');
  await page.goto('/admin');
  const cookies = await page.context().cookies();
  const oldCookie = cookies.find(c => c.name === 'aljalal_admin_session');
  expect(oldCookie.httpOnly).toBe(true); expect(oldCookie.sameSite).toBe('Lax');
  await page.getByRole('button', { name: 'خروج' }).click();
  await expect(page).toHaveURL(/login$/);
  await page.context().addCookies([oldCookie]);
  await page.goto('/admin/inquiries'); await expect(page).toHaveURL(/login$/);
  await editorContext.close();
});

test('validly signed token for nonexistent session and legacy forged token are denied', async ({ page }) => {
  const token = await new SignJWT({}).setProtectedHeader({ alg: 'HS256' }).setSubject('admin-fixture')
    .setJti('nonexistent').setIssuer('aljalal').setAudience('aljalal-admin').setIssuedAt().setExpirationTime('8h')
    .sign(new TextEncoder().encode(config.JWT_SECRET));
  await page.context().addCookies([{ name: 'aljalal_admin_session', value: token, domain: '127.0.0.1', path: '/' }]);
  await page.goto('/admin'); await expect(page).toHaveURL(/login$/);
  const forged = await new SignJWT({ id: 'admin-fixture', role: 'ADMIN' }).setProtectedHeader({ alg: 'HS256' }).setExpirationTime('7d')
    .sign(new TextEncoder().encode('aljalal_secret_key_2026_proofreading_platform_secure_token'));
  await page.context().addCookies([{ name: 'aljalal_admin_session', value: forged, domain: '127.0.0.1', path: '/' }]);
  await page.goto('/admin'); await expect(page).toHaveURL(/login$/);
});

test('account login throttle is persistent and rejects repeated failures', async ({ page }) => {
  await page.goto('/admin/login');
  const submit = page.locator('button[type=submit]').last();
  for (let attempt = 1; attempt <= 11; attempt++) {
    // A response can arrive before React commits the form reset. The old error
    // remains visible between attempts, so it cannot signal a completed render.
    await expect(submit).toBeEnabled();
    await page.locator('[name=email]').fill('missing-account@example.test');
    await page.locator('[name=password]').fill('invalid-password');
    const response = page.waitForResponse(r => r.request().method() === 'POST' && r.url().includes('/admin/login'));
    await submit.click(); await response;
    await expect(submit).toBeEnabled();
    await expect.poll(async () => (await db.query('SELECT count FROM app_private."RateLimit"')).rows[0]?.count).toBe(attempt);
    await expect(page.getByText(attempt <= 10 ? 'بيانات الدخول غير صحيحة.' : 'يرجى المحاولة لاحقاً.')).toBeVisible();
  }
});

test('editor content CRUD works; current role and database expiry override a valid token', async ({ page }) => {
  await login(page, 'editor');
  await page.goto('/admin/blog/new');
  await page.locator('[name=title]').fill('Editor article');
  await page.locator('[name=slug]').fill('editor-article');
  await page.locator('[name=excerpt]').fill('Editor excerpt');
  await page.locator('[name=content]').fill('Editor body');
  await page.locator('button[type=submit]').last().click();
  await expect(page).toHaveURL(/\/admin\/blog$/);
  const id = (await db.query(`SELECT id FROM app_private."Post" WHERE slug='editor-article'`)).rows[0].id;
  await page.goto(`/admin/blog/${id}`);
  await page.locator('[name=title]').fill('Editor updated article');
  await page.locator('button[type=submit]').last().click();
  await expect(page).toHaveURL(/\/admin\/blog$/);
  await page.getByRole('row').filter({ hasText: 'Editor updated article' }).locator('button[title="حذف المقال"]').click();
  await expect(page.getByText('Editor updated article')).toHaveCount(0);
  await db.query(`UPDATE app_private."User" SET role='USER' WHERE id='editor-fixture'`);
  try { await page.goto('/admin/blog'); await expect(page).toHaveURL(/login$/); }
  finally { await db.query(`UPDATE app_private."User" SET role='EDITOR' WHERE id='editor-fixture'`); }
  await login(page, 'editor');
  await db.query(`UPDATE app_private."Session" SET "expiresAt"='2000-01-01' WHERE "userId"='editor-fixture'`);
  await page.goto('/admin/blog'); await expect(page).toHaveURL(/login$/);
});

test('administrator settings and inquiry update/delete actions preserve authorization', async ({ page }) => {
  await login(page);
  await page.goto('/admin/settings');
  await page.locator('[name=site_name]').fill('Verified site name');
  await page.locator('button[type=submit]').last().click();
  await expect(page.getByText('تم حفظ وتحديث الإعدادات بنجاح!')).toBeVisible();
  expect((await db.query(`SELECT value FROM app_private."Setting" WHERE key='site_name'`)).rows[0].value).toBe('Verified site name');
  await db.query(`INSERT INTO app_private."Inquiry" (id,name,email,message,"updatedAt") VALUES ('delete-fixture','Delete fixture','delete-fixture@example.test','Synthetic removable record',NOW())`);
  await page.goto('/admin/inquiries');
  const row = page.getByRole('row').filter({ has: page.getByText('delete-fixture@example.test', { exact: true }) });
  await row.locator('select').selectOption('QUOTED');
  await expect.poll(async () => (await db.query(`SELECT status FROM app_private."Inquiry" WHERE id='delete-fixture'`)).rows[0].status).toBe('QUOTED');
  page.once('dialog', dialog => dialog.accept());
  await row.locator('button[title="حذف الطلب"]').click();
  await expect(row).toHaveCount(0);
  expect((await db.query(`SELECT id FROM app_private."Inquiry" WHERE id='delete-fixture'`)).rowCount).toBe(0);
});
