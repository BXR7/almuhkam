export default function robots() {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/admin/", "/admin/*", "/api/", "/_next/"],
    },
    sitemap: "https://aljalal.com/sitemap.xml",
  };
}
