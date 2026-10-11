# Aljalal

Production security changes are documented in [the audit](docs/security/audit.md), [verification](docs/security/verification.md), and [approval-gated runbook](docs/security/runbook.md). Never apply database changes or rotate production credentials from a build job. Production database remediation and all six Supabase Advisor findings remain pending live verification and explicit execution approval.

For a fresh isolated local rehearsal: start PostgreSQL 17 on loopback port 55439 with trust authentication **only for synthetic local testing**, then run:

```sh
npm ci
npm run lint
npm test
node scripts/test-database.mjs
node scripts/test-app-command.mjs npm run build
npx playwright install chromium
npx playwright test
npm audit --omit=dev
```

The fixture runner refuses an existing database and creates only a named local synthetic database. It writes generated test configuration to `/tmp/aljalal-test-config.json` with mode 0600. Use a fresh test instance for each full migration rehearsal; never point it at production. `TEST_PG_PORT` selects another local port. No production connection or customer data is needed. CI runs the same tests.

Administrator provisioning is a separate manual create-only operation (`npm run provision-admin`) using `ADMIN_EMAIL` and `ADMIN_PASSWORD` from a secret manager and an authorized provisioning identity. Passwords must be at least 16 characters and at most 72 UTF-8 bytes. The application runtime cannot modify User records. `prisma/seed.js` never creates credentials and must not be part of production deployment.

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
