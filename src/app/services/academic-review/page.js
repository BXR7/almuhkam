import Link from "next/link";
import styles from "@/styles/pages.module.css";

export const metadata = {
  title: "المراجعة والنقد الأكاديمي للأبحاث والرسائل",
  description: "خدمة تقييم ومراجعة هيكلية البحث العلمي، نقد الحجج والمنهجية المتبعة، والتأكد من قوة الأطروحة وتماسك فصولها قبل المناقشة والتحكيم.",
};

export default function AcademicReview() {
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
              <li className={styles.breadcrumbActive}>المراجعة والنقد الأكاديمي</li>
            </ul>
            <h1 className={styles.pageTitle}>المراجعة والنقد الأكاديمي</h1>
            <p className={styles.pageDesc}>
              نراجع بنية بحثك العلمي وهيكليته ونقده منهجياً وموضوعياً، لنكشف نقاط الضعف ونعزز تماسك الحجج قبل إرسال المستند للجان التحكيم الرسمية.
            </p>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className={styles.section}>
        <div className="container">
          <div className={styles.contentWrapper}>
            <h2>كن محكّم نفسك الأول لتتفادى الرفض العلمي</h2>
            <p>
              كتابة البحث العلمي تتخطى السلامة النحوية للمفردات. التماسك الداخلي للدراسة، وسلامة تصميم المنهجية، وقوة ترابط الحجج ونقد الأدبيات السابقة هي المعايير التي يقيم المُحكّمون بحثك بناءً عليها. خدمتنا في النقد الأكاديمي توفر لك تقييماً موضوعياً شاملاً من أكاديميين وخبراء لغويين لتلافي الأخطاء الهيكلية المنهجية قبل النشر الفعلي.
            </p>

            <h2>ماذا تشمل خدمة المراجعة والنقد الأكاديمي لدينا؟</h2>
            <ul className={styles.featureList}>
              <li className={styles.featureItem}>
                <span className={styles.checkIcon}>✓</span>
                <span><strong>تقييم تماسك البنية والهيكل:</strong> التأكد من التدفق المنطقي للمعلومات من المقدمة والفرضيات وحتى الاستنتاجات والتوصيات.</span>
              </li>
              <li className={styles.featureItem}>
                <span className={styles.checkIcon}>✓</span>
                <span><strong>نقد المنهجية العلمية المتبعة:</strong> مراجعة الأدوات الإحصائية أو الاستقصائية المطبقة والتأكد من صلتها المباشرة بأهداف البحث وفرضياته.</span>
              </li>
              <li className={styles.featureItem}>
                <span className={styles.checkIcon}>✓</span>
                <span><strong>كشف فجوات الأدبيات السابقة:</strong> التأكد من استعراض الدراسات السابقة برؤية نقدية وليس مجرد سرد تقليدي للمحتويات.</span>
              </li>
              <li className={styles.featureItem}>
                <span className={styles.checkIcon}>✓</span>
                <span><strong>تقرير تقييمي أكاديمي مفصل:</strong> تسليم تقرير مكتوب يتضمن التوصيات والملاحظات الجوهرية والنقاط الواجب تصحيحها لتقوية حجة الدراسة.</span>
              </li>
            </ul>

            <h2>ما لا تشمله خدمة النقد الأكاديمي</h2>
            <ul className={styles.notIncludedList}>
              <li className={styles.notIncludedItem}>
                <span className={styles.crossIcon}>✗</span>
                <span><strong>إعادة كتابة الفصول الضعيفة:</strong> نحن نشخص وننقد ونقترح التعديلات، ولكن تقع مسؤولية كتابتها وصياغتها وتعديلها علمياً على عاتق الباحث نفسه.</span>
              </li>
              <li className={styles.notIncludedItem}>
                <span className={styles.crossIcon}>✗</span>
                <span><strong>ضمان القبول الفوري في المجلات:</strong> لا نملك تأثيراً مباشراً على قرار لجان التحكيم، لكننا نزيد بنسبة كبيرة من فرص قبول البحث عبر تقليل أخطاء النقد الأساسية.</span>
              </li>
            </ul>

            <div style={{ textAlign: "center", marginTop: "50px" }}>
              <a href="https://wa.me/967770334448?text=%D9%85%D8%B1%D8%AD%D8%A8%D9%8B%D8%A7%D8%8C%20%D8%A3%D9%88%D8%AF%20%D8%A7%D9%84%D8%A7%D8%B3%D8%AA%D9%81%D8%B3%D8%A7%D8%B1%20%D8%B9%D9%86%20%D8%AE%D8%AF%D9%85%D8%A7%D8%AA%D9%83%D9%85%20%D8%A7%D9%84%D9%84%D8%BA%D9%88%D9%8A%D8%A9" target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                اطلب مراجعة ونقد دراستك العلمية الآن
              </a>
            </div>

            {/* Related Services */}
            <div className={styles.siblingGrid}>
              <Link href="/services/academic-proofreading" className={styles.siblingCard}>
                <span className={styles.siblingName}>تدقيق الأبحاث والرسائل الجامعية ←</span>
              </Link>
              <Link href="/services/book-editing" className={styles.siblingCard}>
                <span className={styles.siblingName}>تحرير الكتب والمقالات ←</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
