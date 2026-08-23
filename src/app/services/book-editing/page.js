import Link from "next/link";
import styles from "@/styles/pages.module.css";

export const metadata = {
  title: "تحرير الكتب والمقالات",
  description: "خدمة تحرير الكتب ومراجعة الروايات وتدقيق المقالات الأدبية والعلمية بإتقان وأسلوب رصين يناسب دور النشر.",
};

export default function BookEditing() {
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
              <li className={styles.breadcrumbActive}>تحرير الكتب والمقالات</li>
            </ul>
            <h1 className={styles.pageTitle}>تحرير الكتب والمقالات</h1>
            <p className={styles.pageDesc}>
              نصقل أسلوب مؤلفاتك الأدبية والعلمية، ونضبط اتساق صياغتها، لتكون جاهزة للمطبعة ودور النشر بأبهى صورة لغوية ممكنة.
            </p>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className={styles.section}>
        <div className="container">
          <div className={styles.contentWrapper}>
            <h2>صناعة الكتاب تبدأ بسلامة الكلمة</h2>
            <p>
              يستغرق تأليف الكتاب جهداً إبداعياً مضنياً، غير أن الكتابة الطويلة لا تخلو من الهفوات الأسلوبية، والقصور اللغوي، أو عدم اتساق الصياغة وتتابع الأحداث. خدمتنا في تحرير الكتب والمخطوطات تهدف لتنقيتها من هذه العثرات وتجهيزها للقارئ بكفاءة واحترافية عالية.
            </p>

            <h2>ماذا تشمل خدمة تحرير الكتب؟</h2>
            <ul className={styles.featureList}>
              <li className={styles.featureItem}>
                <span className={styles.checkIcon}>✓</span>
                <span><strong>التدقيق اللغوي والإملائي:</strong> تصحيح إملائي تام وضبط دقيق للأخطاء النحوية والتركيبية وعلامات الترقيم.</span>
              </li>
              <li className={styles.featureItem}>
                <span className={styles.checkIcon}>✓</span>
                <span><strong>التحرير الأسلوبي:</strong> تحسين انسيابية الجمل وتدفقها، وتجنب الحشو، والتكرار، واختيار المفردات الأكثر بلاغة.</span>
              </li>
              <li className={styles.featureItem}>
                <span className={styles.checkIcon}>✓</span>
                <span><strong>التشكيل والضبط بالحركات (Tashkeel):</strong> إدراج الضبط الجزئي أو الكلي الكلاسيكي للكلمات لمنع اللبس في القراءة والألفاظ.</span>
              </li>
              <li className={styles.featureItem}>
                <span className={styles.checkIcon}>✓</span>
                <span><strong>مراجعة اتساق البناء الفني:</strong> التأكد من اتساق حبكة الرواية أو تسلسل فصول الكتاب الفكري والمنطقي.</span>
              </li>
            </ul>

            <h2>حدود الخدمة والالتزام المهني</h2>
            <ul className={styles.notIncludedList}>
              <li className={styles.notIncludedItem}>
                <span className={styles.crossIcon}>✗</span>
                <span><strong>كتابة الكتب بالنيابة (Ghostwriting):</strong> نحن لا نقوم بالتأليف نيابة عنك. عملنا هو مراجعة وتصفية ما كتبته فحسب.</span>
              </li>
              <li className={styles.notIncludedItem}>
                <span className={styles.crossIcon}>✗</span>
                <span><strong>التصميم الفني والتنسيق الداخلي (Formatting):</strong> لا نقوم بتصميم أغلفة الكتب أو التنسيق الطباعي الداخلي للمخطوطات.</span>
              </li>
            </ul>

            <div style={{ textAlign: "center", marginTop: "50px" }}>
              <a href="https://wa.me/967770334448?text=%D9%85%D8%B1%D8%AD%D8%A8%D9%8B%D8%A7%D8%8C%20%D8%A3%D9%88%D8%AF%20%D8%A7%D9%84%D8%A7%D8%B3%D8%AA%D9%81%D8%B3%D8%A7%D8%B1%20%D8%B9%D9%86%20%D8%AE%D8%AF%D9%85%D8%A7%D8%AA%D9%83%D9%85%20%D8%A7%D9%84%D9%84%D8%BA%D9%88%D9%8A%D8%A9" target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                اطلب تدقيق كتابك الآن
              </a>
            </div>

            {/* Related Services */}
            <div className={styles.siblingGrid}>
              <Link href="/services/content-marketing" className={styles.siblingCard}>
                <span className={styles.siblingName}>تحرير المحتوى التسويقي ←</span>
              </Link>
              <Link href="/services/academic-review" className={styles.siblingCard}>
                <span className={styles.siblingName}>المراجعة والنقد الأكاديمي ←</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
