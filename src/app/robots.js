export default function robots() {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/admin/", "/admin/*", "/api/", "/_next/"],
    },
    sitemap: `${process.env.NEXT_PUBLIC_SITE_URL || "https://aljalal.vercel.app"}/sitemap.xml`,
  };
}
