import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const [posts, projects, inquiries, settings] = await Promise.all([
    prisma.post.findMany(),
    prisma.project.findMany(),
    prisma.inquiry.findMany(),
    prisma.setting.findMany(),
  ]);

  console.log("✅ Connection Successful!");
  console.log("Posts count:", posts.length);
  console.log("Projects count:", projects.length);
  console.log("Inquiries count:", inquiries.length);
  console.log("Settings count:", settings.length);
}

main()
  .catch((e) => {
    console.error("❌ Connection failed:", e);
  })
  .finally(() => prisma.$disconnect());
