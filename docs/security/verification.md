# Before/after verification and reproduction

Executed on 2026-10-11 in isolated local PostgreSQL 17 containers with synthetic records, generated test credentials and the actual Next production build. Production Supabase was not inspected or changed. Baseline comparisons below are source findings; they are not historical production penetration-test results.

| Boundary | Before (baseline source) | After (executed evidence) |
|---|---|---|
| JWT | Published fallback accepted, no issuer/audience, seven days | Four unit scenarios test missing/known/weak keys, forged/tampered/expired/wrong-audience/wrong-issuer/missing-jti/wrong-algorithm JWTs, rotation, permissions and validation. All pass. |
| Session authorization | Self-contained user/role claim; logout only cookie deletion | Chromium tests use real database sessions: logout replay denied, nonexistent session denied, database expiry denied, role changed to USER denied immediately. |
| Private pages/actions | Middleware/layout reliance, no current-role checks | Anonymous dashboard redirected; editor private page/action denied without inquiry disclosure or mutation; cross-origin action denied; authorized admin/editor content CRUD succeeds. |
| Public content | Detail/metadata accepts draft slug | Published blog/detail/portfolio render; draft URL is 404 and contains neither draft body nor metadata excerpt. |
| Inquiries/settings | No role enforcement or bounds | Public inquiry inserted; administrator status update/delete and settings save verified; editor private mutation replay denied; input bounds/HTML escaping checked by unit tests. |
| Database API boundary | RLS absent from source; reported production RLS disabled | Synthetic anon/authenticated/service_role cannot access any original app table; read-only verify.sql passes; runtime cannot update users/create private tables/truncate; published content and auth work through runtime Prisma. Actual hosted REST/GraphQL remains unverified. |
| Migration integrity | No versioned security migration | Final forward migration matches original table counts/digests, rollback statements execute inside a test transaction and preserve digests/API denial, then transaction rollback restores forward state. Prisma migrate diff against final database returns an empty migration. |
| Future objects | Unspecified defaults | NOLOGIN owner creates private future-table fixture; neither API roles nor runtime receive automatic SELECT. Fixture creation is rolled back without DROP. |
| Dependencies | npm audit: 15 affected package entries (1 critical, 13 high, 1 moderate) | Full audit: 5 high affected package entries, all development chain. Production audit: 0 findings. These counts are package entries, not distinct vulnerabilities or proof of exploitation. |
| Site usability | Fixed public header covers admin logout | Browser regression exposed the obstruction; public header no longer renders on admin paths; real logout click succeeds. Public page design remains unchanged. |

## Commands and observed results

- `npm ci --no-audit --no-fund`: passed with locked baseline dependencies; patched dependencies then installed and lockfile refreshed.
- `npm run lint`: passed without suppressed rules. One existing Link lint error in the login page was corrected.
- `npm test`: passed (runner reports the file as one suite); `node tests/security.test.mjs` separately reports all four test scenarios passing.
- `TEST_PG_PORT=55440 node scripts/test-database.mjs`: passed final forward migration, read-only assertions, counts/digests, role denial, least privilege, future-table defaults and rollback-transaction tests on a fresh database. Original fixture counts: User 2, Post 2, Project 1, Inquiry 1, Setting 1; every original aggregate digest matched after migration and rollback statements.
- `node scripts/test-app-command.mjs ./node_modules/.bin/prisma validate`: passed.
- `node scripts/test-app-command.mjs npm run build`: passed on Next 16.4.0, preserving the existing Google fonts and public routes. Actual runtime database is aljalal_app inheriting only aljalal_runtime, not an owner/superuser identity.
- Prisma `migrate diff` (isolated database to `prisma/schema.prisma`, read-only comparison): `-- This is an empty migration.` An earlier Session FK update-action mismatch was corrected before the final rehearsal; no generated destructive SQL was applied.
- `npx playwright test`: **7 passed (33.2s)**. Real Chromium, production Next server, Prisma and PostgreSQL; framework authorization/database behavior is not mocked.
- `npm audit --omit=dev --json`: zero vulnerabilities. Full `npm audit --json`: five high development-only package entries.
- `git diff --check`: passed.

Initial browser attempts failed on incorrect expected Arabic confirmation wording, a save selector also matching logout, uncontrolled login fields resetting after failed actions, and the genuine header obstruction. Tests were corrected without removing the security assertions; the obstruction was fixed in the app. Initial database/schema checks identified a foreign-key update-action mismatch, which was fixed and rehearsed on a fresh isolated instance. These initial failures are not represented as passing results.

## Remaining dependency risk

Unpatched advisory `GHSA-vfj7-8cjw-p6xm` in braces propagates through micromatch, fast-glob, @next/eslint-plugin-next and eslint-config-next: five high package entries. npm suggests a framework-tooling downgrade to Next ESLint config 14.2.35; that incompatible downgrade was not performed. This is development tooling, not shipped production code. Do not run lint against untrusted external glob patterns; use isolated CI with no production secrets. Track the upstream fix and rerun full npm audit. No audit override or warning suppression hides this risk. Refer to [the upstream advisory](https://github.com/advisories/GHSA-vfj7-8cjw-p6xm).

## Limits of this evidence

The isolated baseline represents the repository schema, not a restored production clone with Supabase event triggers/extensions/roles. All hosted Advisor findings, REST/GraphQL behavior, pooler/TLS identity, global privileges, secret settings, real backup restore, coordinated rotation, real SMTP delivery, platform ingress controls and deployed security headers require production/staging operator verification. Local service_role is a synthetic BYPASSRLS role, not a claim about the hosted role's actual grants. Rollback SQL was tested within an isolated transaction; an actual production-representative rollback and compatibility-build rehearsal remains an approval prerequisite. No customer records, production secrets or database URLs were inspected, printed or committed. No production security finding is declared resolved here.

## PR #1 follow-up verification (2026-10-11)

- Reproduced original private-schema migration as a PostgreSQL 17 non-superuser database owner/CREATEROLE operator: SQLSTATE 42501, `must be able to SET ROLE "aljalal_owner"`. Explicit trusted-operator membership fixed it; forward migration, restricted-operator rollback, independent original row counts/digests, API denial, runtime privileges and future-table defaults passed on isolated PostgreSQL 15 and 17.
- The initial correction's push workflow exposed a repeated-login browser synchronization race. After waiting for action completion and checking persisted attempt counts, all seven browser tests passed locally, the throttle test passed three repeated runs, and both Actions runs for `653f1f5` succeeded (`38146635813`, `38146632599`). No production throttle changes/retries were added.
- User supplied Vercel's exact failure: JWT_SECRET validation threw from next.config.mjs evaluation. Removed that configuration-time call, keeping shared runtime issuance/verification validation and adding rejection of whitespace and obvious repeated keys.
- `npm run lint`, `npm test`, and `node scripts/test-app-command.mjs --without-jwt-secret npm run build` passed. No local .env files supplied a hidden key. Eight browser tests passed (33.6s), including a separately launched production-mode server with JWT_SECRET absent: public content retrieval succeeded against the synthetic fixture, but a correctly signed session with a real fixture session row and correct-password login were denied. No new cookie/session was created.
- All testing used loopback synthetic databases. No Production access or mutations occurred. Vercel settings/log access and actual Preview runtime readiness still require project-member verification; build success does not establish database compatibility or secure environment separation. See [Preview configuration](preview-configuration.md) and [deployment review](pr1-deployment-review.md).
