import prisma from "@/lib/prisma";

export default async function sitemap() {
  const baseUrl = "https://almuhkam.com";

  // Static core routes
  const staticRoutes = [
    "",
    "/about",
    "/services",
    "/methodology",
    "/portfolio",
    "/blog",
    "/faq",
    "/contact",
    "/privacy",
    "/terms",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString(),
    changeFrequency: route === "" ? "daily" : "weekly",
    priority: route === "" ? 1.0 : route === "/services" ? 0.9 : 0.8,
  }));

  // Services sub-routes
  const services = [
    "academic-proofreading",
    "book-editing",
    "corporate-writing",
    "content-marketing",
    "audio-transcription",
    "student-services",
    "academic-review",
  ].map((slug) => ({
    url: `${baseUrl}/services/${slug}`,
    lastModified: new Date().toISOString(),
    changeFrequency: "monthly",
    priority: 0.85,
  }));

  // Dynamic Blog posts from database
  let blogRoutes = [];
  try {
    const posts = await prisma.post.findMany({
      where: { isPublished: true },
      select: { slug: true, updatedAt: true },
    });
    blogRoutes = posts.map((post) => ({
      url: `${baseUrl}/blog/${encodeURIComponent(post.slug)}`,
      lastModified: post.updatedAt.toISOString(),
      changeFrequency: "weekly",
      priority: 0.75,
    }));
  } catch (error) {
    // Fallback if DB is unreachable during build
    blogRoutes = [
      "الفرق-بين-الهاء-والتاء-المربوطة",
      "كيف-تكتب-مقدمة-بحث-علمي",
      "خطوات-نشر-بحثك-العلمي",
    ].map((slug) => ({
      url: `${baseUrl}/blog/${encodeURIComponent(slug)}`,
      lastModified: new Date().toISOString(),
      changeFrequency: "weekly",
      priority: 0.7,
    }));
  }

  return [...staticRoutes, ...services, ...blogRoutes];
}
