import Link from "next/link";
import styles from "@/styles/pages.module.css";

export const metadata = {
  title: "من نحن — قصة الجلال وقيمه اللغوية الأكاديمية",
  description: "تعرف على منصة الجلال للتدقيق اللغوي والتحرير الأكاديمي، رسالتنا، قيمنا، ومؤسس المنصة اللغوي جلال.",
};

export default function About() {
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
              <li className={styles.breadcrumbActive}>من نحن</li>
            </ul>
            <h1 className={styles.pageTitle}>شريكك اللغوي الموثوق</h1>
            <p className={styles.pageDesc}>
              الجلال هي منصة رائدة متخصصة في خدمات التدقيق اللغوي والتحرير الأكاديمي، تأسست لتكون الجسر الآمن لنقل نصوصك العربية إلى مستوى الإحكام اللغوي.
            </p>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className={styles.section}>
        <div className="container">
          <div className={styles.contentWrapper}>
            <h2>قصة التأسيس: سد فجوة جودة المحتوى العربي</h2>
            <p>
              ولدت فكرة **الجلال** من رحم حاجة الباحثين والكتاب الأكاديميين والمؤسسات في دول الخليج العربي لجهة تدقيق لغوي تجمع الأمانة والسرية والاحترافية الأكاديمية المطلقة. لاحظنا أن هناك الكثير من البرمجيات الآلية تسيء فهم معاني العربية المعقدة وعلاقات الإعراب، أو هواة لا يلتزمون بالمواعيد ولا يدركون مناهج التوثيق العلمي الدقيقة (APA، MLA).
            </p>
            <p>
              تحت إشراف المؤسس **جلال**، وهو مدقق لغوي محترف بخبرة تمتد لأكثر من عشر سنوات في مراجعة الرسائل الجامعية الخليجية، سعينا لبناء منصة رقمية ذات منهجية واضحة تسهّل على الباحث رفع مستنداته واستلامها مدققة تماماً بلمسة زر واحدة.
            </p>

            <h2>قيمنا الراسخة</h2>
            <ul className={styles.featureList}>
              <li className={styles.featureItem}>
                <span className={styles.checkIcon}>✦</span>
                <span><strong>الدقة والضبط اللغوي:</strong> لا نكتفي بتصحيح السطح اللغوي، بل نغوص في دلالة الجمل وتراكيبها ووقارها الأسلوبي.</span>
              </li>
              <li className={styles.featureItem}>
                <span className={styles.checkIcon}>✦</span>
                <span><strong>الأمانة الأكاديمية المطلقة:</strong> لا نكتب نيابةً عن أحد ولا نسهل الغش العلمي؛ نحن مدققون ومحررون فقط.</span>
              </li>
              <li className={styles.featureItem}>
                <span className={styles.checkIcon}>✦</span>
                <span><strong>السرية والخصوصية:</strong> نلتزم بأعلى معايير سرية البيانات والملفات الأكاديمية والسرية الفكرية، ولا نشارك مستنداتك مع أي طرف ثالث.</span>
              </li>
              <li className={styles.featureItem}>
                <span className={styles.checkIcon}>✦</span>
                <span><strong>الالتزام بالمواعيد:</strong> الوقت في البحث العلمي والمؤسسي لا يقدر بثمن، ونلتزم بموعد تسليم نهائي متفق عليه بدقة.</span>
              </li>
            </ul>

            <h2>التزامنا الأخلاقي</h2>
            <p>
              إن التزامنا الأخلاقي هو حجر الزاوية في **الجلال**. نؤمن أن الأمانة العلمية هي خط أحمر لا يمكن تجاوزه. نساعدك في صياغة لغوية ممتازة لأفكارك، لكننا لا نكتب بحوثاً أو أطروحات للطلاب مطلقاً.
            </p>

            <div style={{ textAlign: "center", marginTop: "50px" }}>
              <a href="https://wa.me/967770334448?text=%D9%85%D8%B1%D8%AD%D8%A8%D9%8B%D8%A7%D8%8C%20%D8%A3%D9%88%D8%AF%20%D8%A7%D9%84%D8%A7%D8%B3%D8%AA%D9%81%D8%B3%D8%A7%D8%B1%20%D8%B9%D9%86%20%D8%AE%D8%AF%D9%85%D8%A7%D8%AA%D9%83%D9%85%20%D8%A7%D9%84%D9%84%D8%BA%D9%88%D9%8A%D8%A9" target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                اطلب تدقيق نصوصك معنا الآن
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
