import { defineConfig } from '@playwright/test';
export default defineConfig({
  testDir: './tests/browser', workers: 1, retries: 0, timeout: 60000,
  use: { baseURL: 'http://127.0.0.1:3009', headless: true },
  reporter: 'list', outputDir: '/tmp/aljalal-playwright-results',
  webServer: { command: 'node scripts/test-app-command.mjs npm start -- --hostname 127.0.0.1 --port 3009', url: 'http://127.0.0.1:3009', reuseExistingServer: false, timeout: 60000 },
});
