import Link from "next/link";
import prisma from "@/lib/prisma";
import styles from "@/styles/pages.module.css";

export const metadata = {
  title: "نماذج أعمالنا في التدقيق والتحرير — منصة الجلال",
  description: "اطلع على عينات ونماذج واقعية من أعمال التدقيق الإملائي والنحوي والتحرير الأكاديمي والأسلوبي التي قمنا بها للأبحاث والكتب.",
};

export default async function Portfolio() {
  let projects = [];
  try {
    projects = await prisma.project.findMany({
      orderBy: { order: "asc" },
    });
  } catch (e) {
    console.error("Error fetching portfolio projects:", e);
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
              <li className={styles.breadcrumbActive}>نماذج أعمالنا</li>
            </ul>
            <h1 className={styles.pageTitle}>نماذج من أعمالنا اللغوية</h1>
            <p className={styles.pageDesc}>
              نعتقد أن البرهان العملي خير من الكلام المرسل. اطلع على أمثلة واقعية ومقارنات توضح كيفية تحرير ونقد وتصويب النصوص لترتقي بمستواها.
            </p>
          </div>
        </div>
      </section>

      {/* Samples list */}
      <section className={styles.section}>
        <div className="container">
          <div className={styles.contentWrapper} style={{ maxWidth: "900px" }}>
            {projects.length === 0 ? (
              <div style={{ textAlign: "center", padding: "60px 20px", color: "var(--text-secondary)" }}>
                <p style={{ fontSize: "1.1rem" }}>لا توجد نماذج أعمال معروضة حالياً.</p>
              </div>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: "60px" }}>
                {projects.map((sample) => {
                  let edits = [];
                  try {
                    edits = JSON.parse(sample.editsJson || "[]");
                  } catch (e) {
                    edits = [];
                  }

                  return (
                    <article key={sample.id} style={{ borderBottom: "1px solid var(--border-color)", paddingBottom: "40px" }}>
                      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "16px", flexWrap: "wrap", gap: "10px" }}>
                        <h2 style={{ fontSize: "1.25rem", borderRight: "3px solid var(--copper)", paddingRight: "12px", margin: 0 }}>
                          {sample.title}
                        </h2>
                        <span style={{ fontSize: "0.78rem", background: "var(--bg-secondary)", padding: "4px 12px", borderRadius: "999px", color: "var(--olive)", fontWeight: "600", border: "1px solid var(--border-color)" }}>
                          {sample.category}
                        </span>
                      </div>
                      
                      {/* Before card */}
                      <div style={{ background: "rgba(239, 68, 68, 0.03)", border: "1px solid rgba(239, 68, 68, 0.15)", borderRadius: "var(--radius-md)", padding: "24px", marginBottom: "16px", color: "var(--text-secondary)" }}>
                        <h3 style={{ fontSize: "0.9rem", color: "#c0392b", marginBottom: "8px", fontWeight: "bold" }}>قبل التدقيق والتعديل:</h3>
                        <p style={{ fontSize: "1.05rem", lineHeight: "1.8" }}>{sample.beforeText}</p>
                      </div>

                      {/* After card */}
                      <div style={{ background: "rgba(13, 92, 70, 0.03)", border: "1px solid rgba(13, 92, 70, 0.18)", borderRadius: "var(--radius-md)", padding: "24px", marginBottom: "20px", color: "var(--text-primary)" }}>
                        <h3 style={{ fontSize: "0.9rem", color: "var(--olive)", marginBottom: "8px", fontWeight: "bold" }}>بعد التدقيق والتحرير:</h3>
                        <p style={{ fontSize: "1.05rem", lineHeight: "1.8" }}>{sample.afterText}</p>
                      </div>

                      {/* Edit Annotations */}
                      {edits.length > 0 && (
                        <div style={{ background: "var(--bg-secondary)", borderRadius: "var(--radius-md)", border: "1px solid var(--border-color)", padding: "16px 20px" }}>
                          <h4 style={{ fontSize: "0.85rem", color: "var(--copper)", marginBottom: "12px", fontWeight: "bold" }}>شرح التعديلات المجراة:</h4>
                          <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "8px", fontSize: "0.88rem", color: "var(--text-secondary)", padding: 0, margin: 0 }}>
                            {edits.map((edit, idx) => (
                              <li key={idx} style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                                <span style={{ color: "var(--copper)" }}>✦</span>
                                <span>تم تصحيح <strong>({edit.from})</strong> إلى <strong>({edit.to})</strong> — {edit.type}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </article>
                  );
                })}
              </div>
            )}

            <div style={{ textAlign: "center", marginTop: "50px" }}>
              <a href="https://wa.me/967770334448?text=%D9%85%D8%B1%D8%AD%D8%A8%D9%8B%D8%A7%D8%8C%20%D8%A3%D9%88%D8%AF%20%D8%A7%D9%84%D8%A7%D8%B3%D8%AA%D9%81%D8%B3%D8%A7%D8%B1%20%D8%B9%D9%86%20%D8%AE%D8%AF%D9%85%D8%A7%D8%AA%D9%83%D9%85%20%D8%A7%D9%84%D9%84%D8%BA%D9%88%D9%8A%D8%A9" target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                أرسل نصك لنرتقي به الآن
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
