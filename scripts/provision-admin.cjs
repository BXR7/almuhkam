// Run manually with a migration/provisioning identity, never the runtime database role.
const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");
const db = new PrismaClient({ log: [] });
async function main() {
  const { ADMIN_EMAIL: email, ADMIN_PASSWORD: password } = process.env;
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || !password ||
      password.length < 16 || Buffer.byteLength(password) > 72) throw new Error("Invalid provisioning input");
  // create only: existing users and credentials are never overwritten.
  await db.user.create({ data: { email, password: await bcrypt.hash(password, 12), name: "مدير المنصة", role: "ADMIN" } });
  console.log("Administrator provisioned");
}
main().catch(() => { console.error("Provisioning failed; no credentials logged"); process.exitCode = 1; }).finally(() => db.$disconnect());
