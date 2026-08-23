import Link from "next/link";
import prisma from "@/lib/prisma";
import styles from "@/styles/pages.module.css";
import homeStyles from "@/styles/home.module.css";

export const metadata = {
  title: "مدونة الجلال — مقالات في التحرير الأكاديمي واللغة العربية",
  description: "اطلع على أفضل المقالات والنصائح اللغوية لكتابة البحوث العلمية والرسائل الجامعية وتجنب الأخطاء النحوية والإملائية الشائعة.",
};

export default async function BlogHub() {
  let posts = [];
  try {
    posts = await prisma.post.findMany({
      where: { isPublished: true },
      orderBy: { createdAt: "desc" },
    });
  } catch (error) {
    console.error("Error fetching blog posts:", error);
  }

  return (
    <div>
      {/* Page Hero */}
      <section className={styles.pageHero}>
        <div className={styles.pageHeroBg}></div>
        <div className="container">
          <div className={styles.heroContent}>
            <ul className={styles.breadcrumb}>
              <li><Link href="/">الرئيسية</Link></li>
              <li>/</li>
              <li className={styles.breadcrumbActive}>المدونة</li>
            </ul>
            <h1 className={styles.pageTitle}>مدونة الجلال اللغوية</h1>
            <p className={styles.pageDesc}>
              مقالات إرشادية متخصصة تُعنى بقواعد اللغة العربية، وأساليب الصياغة الأكاديمية والبحثية، لمساعدتك في تطوير مهارتك الكتابية.
            </p>
          </div>
        </div>
      </section>

      {/* Grid List */}
      <section className={styles.section}>
        <div className="container">
          {posts.length === 0 ? (
            <div style={{ textAlign: "center", padding: "60px 20px", color: "var(--text-secondary)" }}>
              <p style={{ fontSize: "1.1rem" }}>لا توجد مقالات منشورة حالياً.</p>
            </div>
          ) : (
            <div className={styles.blogGrid}>
              {posts.map((post) => (
                <article key={post.id} className={homeStyles.blogCard}>
                  <span className={homeStyles.blogTag}>{post.tag}</span>
                  <h2 className={homeStyles.blogTitle} style={{ fontSize: "1.1rem" }}>
                    <Link href={`/blog/${post.slug}`} style={{ color: "inherit" }}>
                      {post.title}
                    </Link>
                  </h2>
                  <p className={homeStyles.blogExcerpt}>{post.excerpt}</p>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.75rem", color: "var(--text-muted)", marginTop: "12px", marginBottom: "16px" }}>
                    <span>📅 {new Date(post.createdAt).toLocaleDateString("ar-SA")}</span>
                    <span>⏱️ وقت القراءة: {post.readTime}</span>
                  </div>
                  <Link href={`/blog/${post.slug}`} className={homeStyles.blogMore}>
                    اقرأ المقال كاملًا ←
                  </Link>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
