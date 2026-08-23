import Link from "next/link";
import styles from "@/styles/pages.module.css";

export const metadata = {
  title: "الكتابة المؤسسية والتقارير للشركات",
  description: "خدمة كتابة وتدقيق الوثائق المؤسسية والتقارير السنوية والخطابات الرسمية باحترافية لغوية تامة تلائم كبرى الشركات.",
};

export default function CorporateWriting() {
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
              <li className={styles.breadcrumbActive}>الكتابة المؤسسية</li>
            </ul>
            <h1 className={styles.pageTitle}>الكتابة المؤسسية</h1>
            <p className={styles.pageDesc}>
              نحمي هيبتكم اللغوية ونصقل وثائقكم الرسمية، تقاريركم السنوية، وملفاتكم التعريفية بلغة عربية رصينة ودقيقة تناسب مجتمع الأعمال والمؤسسات الحكومية.
            </p>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className={styles.section}>
        <div className="container">
          <div className={styles.contentWrapper}>
            <h2>لغة مؤسستكم هي عنوان احترافيتكم</h2>
            <p>
              التقارير السنوية، والوثائق الداخلية، والخطابات الموجهة للوزارات والهيئات الحكومية تمثل واجهة الشركة وقيمتها المهنية. إن وجود خطأ نحوي أو استخدام أسلوب غير رصين قد يعطي انطباعاً غير احترافي للجهات الشريكة أو العملاء.
            </p>

            <h2>ماذا تشمل خدماتنا المؤسسية؟</h2>
            <ul className={styles.featureList}>
              <li className={styles.featureItem}>
                <span className={styles.checkIcon}>✓</span>
                <span><strong>التدقيق اللغوي الدقيق للتقارير:</strong> مراجعة شاملة لغوية للميزانيات السنوية، وتقارير الحوكمة، واستراتيجيات الشركات.</span>
              </li>
              <li className={styles.featureItem}>
                <span className={styles.checkIcon}>✓</span>
                <span><strong>توحيد الصوت والنبرة اللغوية:</strong> ضبط صياغة الوثائق المكتوبة بواسطة أكثر من موظف لتبدو بنبرة متناسقة ورصينة.</span>
              </li>
              <li className={styles.featureItem}>
                <span className={styles.checkIcon}>✓</span>
                <span><strong>مواءمة المراسلات الرسمية:</strong> تدقيق وتصويب صياغة الخطابات والبرقيات الرسمية الموجهة للجهات الحكومية والشركاء لضمان قوة حجتها اللغوية.</span>
              </li>
              <li className={styles.featureItem}>
                <span className={styles.checkIcon}>✓</span>
                <span><strong>الالتزام التام بالسرية والخصوصية:</strong> نوقع اتفاقيات عدم إفشاء الأسرار (NDA) لحماية بياناتكم وأرقامكم المالية الحساسة.</span>
              </li>
            </ul>

            <h2>حدود الخدمة للمؤسسات</h2>
            <ul className={styles.notIncludedList}>
              <li className={styles.notIncludedItem}>
                <span className={styles.crossIcon}>✗</span>
                <span><strong>كتابة المحتوى المالي دون بيانات:</strong> يجب أن تزودنا الشركة بالمسودات والبيانات الخام للبدء بالصياغة والتدقيق.</span>
              </li>
              <li className={styles.notIncludedItem}>
                <span className={styles.crossIcon}>✗</span>
                <span><strong>ترجمة الوثائق:</strong> هذه الخدمة مخصصة لتدقيق ومراجعة المحتوى المكتوب باللغة العربية مسبقاً.</span>
              </li>
            </ul>

            <div style={{ textAlign: "center", marginTop: "50px" }}>
              <a href="https://wa.me/967770334448?text=%D9%85%D8%B1%D8%AD%D8%A8%D9%8B%D8%A7%D8%8C%20%D8%A3%D9%88%D8%AF%20%D8%A7%D9%84%D8%A7%D8%B3%D8%AA%D9%81%D8%B3%D8%A7%D8%B1%20%D8%B9%D9%86%20%D8%AE%D8%AF%D9%85%D8%A7%D8%AA%D9%83%D9%85%20%D8%A7%D9%84%D9%84%D8%BA%D9%88%D9%8A%D8%A9" target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                اطلب عرض سعر لمؤسستك الآن
              </a>
            </div>

            {/* Related Services */}
            <div className={styles.siblingGrid}>
              <Link href="/services/content-marketing" className={styles.siblingCard}>
                <span className={styles.siblingName}>المحتوى التسويقي والإعلاني ←</span>
              </Link>
              <Link href="/services/audio-transcription" className={styles.siblingCard}>
                <span className={styles.siblingName}>التفريغ الصوتي للمحاضرات والمؤتمرات ←</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
