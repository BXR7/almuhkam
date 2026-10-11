import Link from "next/link";
import { notFound } from "next/navigation";
import prisma from "@/lib/prisma";
import styles from "@/styles/pages.module.css";

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const decodedSlug = decodeURIComponent(slug);

  let post = null;
  try {
    post = await prisma.post.findUnique({
      where: { slug: decodedSlug, isPublished: true },
    });
  } catch (e) {
    post = null;
  }

  return {
    title: post ? `${post.title} — مدونة الجلال` : "مقال في المدونة",
    description: post ? post.excerpt : "مدونة الجلال للتدقيق اللغوي والتحرير الأكاديمي.",
  };
}

export default async function BlogPostPage({ params }) {
  const { slug } = await params;
  const decodedSlug = decodeURIComponent(slug);

  let post = null;
  try {
    post = await prisma.post.findUnique({
      where: { slug: decodedSlug, isPublished: true },
    });
  } catch (e) {
    post = null;
  }

  if (!post) {
    notFound();
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
              <li><Link href="/blog">المدونة</Link></li>
              <li>/</li>
              <li className={styles.breadcrumbActive}>{post.tag}</li>
            </ul>
            <h1 className={styles.pageTitle} style={{ fontSize: "2.2rem", maxWidth: "860px", margin: "16px auto", lineHeight: "1.3" }}>
              {post.title}
            </h1>
            <div style={{ display: "flex", justifyContent: "center", gap: "20px", fontSize: "0.85rem", color: "var(--text-muted)", marginTop: "12px" }}>
              <span>📅 نشر في: {new Date(post.createdAt).toLocaleDateString("ar-SA")}</span>
              <span>⏱️ وقت القراءة: {post.readTime}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className={styles.section}>
        <div className="container">
          <div className={styles.contentWrapper} style={{ whiteSpace: "pre-line", fontSize: "1.1rem", lineHeight: "2" }}>
            {post.content}
            
            <div style={{ marginTop: "60px", padding: "36px 30px", border: "1px solid var(--border-color)", borderRadius: "var(--radius-md)", background: "var(--bg-secondary)", textAlign: "center" }}>
              <h3 style={{ fontSize: "1.2rem", marginBottom: "12px", color: "var(--olive)" }}>
                هل تود التأكد من سلامة ورقتك البحثية أو أطروحتك قبل المناقشة؟
              </h3>
              <p style={{ fontSize: "0.95rem", color: "var(--text-secondary)", marginBottom: "22px", maxWidth: "560px", marginInline: "auto" }}>
                نقدم خدمات تدقيق لغوي وتحرير أكاديمي بأيدي خبراء متخصصين مع الالتزام التام بالسرية والأمانة العلمية.
              </p>
              <a href="https://wa.me/967770334448?text=%D9%85%D8%B1%D8%AD%D8%A8%D9%8B%D8%A7%D8%8C%20%D8%A3%D9%88%D8%AF%20%D8%A7%D9%84%D8%A7%D8%B3%D8%AA%D9%81%D8%B3%D8%A7%D8%B1%20%D8%B9%D9%86%20%D8%AE%D8%AF%D9%85%D8%A7%D8%AA%D9%83%D9%85%20%D8%A7%D9%84%D9%84%D8%BA%D9%88%D9%8A%D8%A9" target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                اطلب عرض سعر مجاني لمستندك
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
