import Link from "next/link";
import styles from "@/styles/pages.module.css";

export const metadata = {
  title: "خدمة التفريغ الصوتي الاحترافي للملفات والمحاضرات",
  description: "خدمة تحويل الصوت والفيديو والمقابلات إلى نصوص عربية مكتوبة بدقة نحوية وإملائية تامة ومصنفة حسب المتحدثين.",
};

export default function AudioTranscription() {
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
              <li><Link href="/services">خدماتنا</Link></li>
              <li>/</li>
              <li className={styles.breadcrumbActive}>التفريغ الصوتي</li>
            </ul>
            <h1 className={styles.pageTitle}>التفريغ الصوتي</h1>
            <p className={styles.pageDesc}>
              نحوّل تسجيلاتكم الصوتية ومرئياتكم (محاضرات، ندوات، مقابلات، أبحاث) إلى نصوص عربية فصيحة مكتوبة بدقة ومحققة إملائياً ونحوياً بالكامل.
            </p>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className={styles.section}>
        <div className="container">
          <div className={styles.contentWrapper}>
            <h2>تحويل الصوت إلى كلمة مقروءة ومرتبة</h2>
            <p>
              الباحثون والصحفيون وصنّاع المحتوى يسجلون ساعات طويلة من المقابلات والمحاضرات الصوتية التي تحتاج للتحويل لنص مكتوب للبدء بتحليلها أو نشرها. تعاني الأدوات الآلية لتحويل الصوت من تشويه المصطلحات وإهمال الصياغة السليمة وخلط اللهجات. نحن نفرغ تسجيلاتكم يدوياً لضمان الفهم السياقي والضبط التام.
            </p>

            <h2>ماذا تشمل خدمة التفريغ الصوتي لدينا؟</h2>
            <ul className={styles.featureList}>
              <li className={styles.featureItem}>
                <span className={styles.checkIcon}>✓</span>
                <span><strong>التفريغ اليدوي الدقيق:</strong> استماع دقيق وفهم للمصطلحات التخصصية وتدوينها دون أخطاء.</span>
              </li>
              <li className={styles.featureItem}>
                <span className={styles.checkIcon}>✓</span>
                <span><strong>تحويل العامية للفصحى (اختياري):</strong> تحويل الكلمات الدارجة واللهجات المحلية إلى لغة عربية فصحى مقروءة بوضوح.</span>
              </li>
              <li className={styles.featureItem}>
                <span className={styles.checkIcon}>✓</span>
                <span><strong>تصنيف المتحدثين والوسم الزمني:</strong> تفصيل الحوار بأسماء المتحدثين ووضع علامات زمنية (Timestamps) عند الملاحظات الهامة.</span>
              </li>
              <li className={styles.featureItem}>
                <span className={styles.checkIcon}>✓</span>
                <span><strong>التدقيق اللغوي التلقائي:</strong> نمرر النص المفرّغ عبر دورتين تدقيق لغوي للتأكد من سلامة الصياغة التامة قبل التسليم.</span>
              </li>
            </ul>

            <h2>محددات خدمة التفريغ</h2>
            <ul className={styles.notIncludedList}>
              <li className={styles.notIncludedItem}>
                <span className={styles.crossIcon}>✗</span>
                <span><strong>الملفات الصوتية غير الواضحة تماماً:</strong> قد نعتذر عن تفريغ التسجيلات ذات الضوضاء المرتفعة جداً أو الصوت المشوش الذي يعوق فهم الكلمات.</span>
              </li>
            </ul>

            <div style={{ textAlign: "center", marginTop: "50px" }}>
              <a href="https://wa.me/967770334448?text=%D9%85%D8%B1%D8%AD%D8%A8%D9%8B%D8%A7%D8%8C%20%D8%A3%D9%88%D8%AF%20%D8%A7%D9%84%D8%A7%D8%B3%D8%AA%D9%81%D8%B3%D8%A7%D8%B1%20%D8%B9%D9%86%20%D8%AE%D8%AF%D9%85%D8%A7%D8%AA%D9%83%D9%85%20%D8%A7%D9%84%D9%84%D8%BA%D9%88%D9%8A%D8%A9" target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                ارسل ملفاتك الصوتية للتفريغ الآن
              </a>
            </div>

            {/* Related Services */}
            <div className={styles.siblingGrid}>
              <Link href="/services/academic-proofreading" className={styles.siblingCard}>
                <span className={styles.siblingName}>تدقيق الأبحاث والرسائل الجامعية ←</span>
              </Link>
              <Link href="/services/content-marketing" className={styles.siblingCard}>
                <span className={styles.siblingName}>المحتوى التسويقي والإعلاني ←</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
