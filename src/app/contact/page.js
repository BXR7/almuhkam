import Link from "next/link";
import styles from "@/styles/pages.module.css";
import ContactForm from "@/components/ContactForm";

export const metadata = {
  title: "اتصل بنا — قنوات تواصل منصة الجلال",
  description: "تواصل مع خبيرنا اللغوي جلال لمناقشة مشروعك، أو الاستفسار عن تفاصيل الأسعار وفترات تسليم تدقيق الملفات.",
};

export default function Contact() {
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
              <li className={styles.breadcrumbActive}>اتصل بنا</li>
            </ul>
            <h1 className={styles.pageTitle}>تواصل معنا</h1>
            <p className={styles.pageDesc}>
              سواء كان لديك استفسار عام، أو تود مناقشة مشروع كتاب أو أطروحة علمية، يسعدنا تواصلك معنا مباشرة وسنقوم بالرد عليك سريعاً.
            </p>
          </div>
        </div>
      </section>

      {/* Grid Layout Section */}
      <section className={styles.section}>
        <div className="container">
          <div className={styles.contactGrid}>
            {/* Left: Contact Form */}
            <div className={styles.formWrapper}>
              <h2 style={{ fontSize: "1.2rem", marginTop: "0", marginBottom: "24px" }}>أرسل لنا استفسارك</h2>
              <ContactForm />
            </div>

            {/* Right: Direct Information */}
            <div className={styles.contactInfoCards}>
              <div className={styles.infoCard}>
                <h3><span>📍</span> العنوان والمقر</h3>
                <p style={{ fontWeight: "600", color: "var(--text-primary)" }}>
                  الجمهورية اليمنية – صنعاء
                </p>
                <p style={{ fontSize: "0.82rem", color: "var(--text-secondary)", marginTop: "4px" }}>
                  نقدم خدماتنا لكافة الباحثين والمؤلفين والمؤسسات محلياً وفي دول الخليج والعالم العربي.
                </p>
              </div>

              <div className={styles.infoCard}>
                <h3><span>📱</span> واتساب وهاتف مباشر</h3>
                <p style={{ marginBottom: "8px" }}>للحصول على رد فوري ومناقشة عاجلة لمستنداتك ومواعيد التسليم:</p>
                <p style={{ fontWeight: "bold", fontSize: "1.05rem", color: "var(--olive)", direction: "ltr", textAlign: "right", marginBottom: "12px" }}>
                  +967 770 334 448
                </p>
                <a href="https://wa.me/967770334448" target="_blank" rel="noopener noreferrer" className="btn btn-secondary" style={{ width: "100%", justifyContent: "center" }}>
                  تواصل فوري عبر واتساب
                </a>
              </div>

              <div className={styles.infoCard}>
                <h3><span>📧</span> البريد الإلكتروني</h3>
                <p>للشراكات المؤسسية والمشاريع العلمية الكبرى وأعضاء هيئات التدريس:</p>
                <a href="mailto:jalal611@gmail.com" style={{ fontWeight: "bold", color: "var(--copper)", display: "block", marginTop: "8px", fontSize: "0.95rem" }}>
                  jalal611@gmail.com
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
