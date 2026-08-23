import Link from "next/link";
import styles from "@/styles/pages.module.css";

export const metadata = {
  title: "خدمات التدقيق اللغوي للطلاب الجامعيين",
  description: "خدمة تدقيق لغوي وتصحيح إملائي للمشاريع الجامعية والواجبات المنزلية وتقارير التخرج للطلاب بأسعار ميسرة وجودة عالية.",
};

export default function StudentServices() {
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
              <li className={styles.breadcrumbActive}>خدمات الطلاب</li>
            </ul>
            <h1 className={styles.pageTitle}>خدمات الطلاب</h1>
            <p className={styles.pageDesc}>
              ندقق مشاريع تخرجك، وتقاريرك الأكاديمية، وواجباتك اللغوية بأسعار تشجيعية ملائمة لميزانية الطالب لتضمن التميز الأكاديمي.
            </p>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className={styles.section}>
        <div className="container">
          <div className={styles.contentWrapper}>
            <h2>صياغة سليمة تنعكس على درجاتك الأكاديمية</h2>
            <p>
              يعد التعبير اللغوي السليم والدقيق من ركائز تقييم المشاريع الجامعية وأبحاث التخرج. أحياناً يمتلك الطالب الفكرة الصحيحة ولكنه يقع في فخ الصياغات غير المنضبطة إملائياً ونحوياً مما يؤثر على تقييمه النهائي. نحن ندعم الطلاب بتقديم تدقيق لغوي سريع واقتصادي للمشاريع العادية والقصيرة.
            </p>

            <h2>ماذا تشمل خدماتنا للطلاب؟</h2>
            <ul className={styles.featureList}>
              <li className={styles.featureItem}>
                <span className={styles.checkIcon}>✓</span>
                <span><strong>تصحيح الأخطاء النحوية والإملائية:</strong> مراجعة علامات الترقيم، وتصحيح كتابة الهمزات والتاء المربوطة والهاء في النصوص الطلابية.</span>
              </li>
              <li className={styles.featureItem}>
                <span className={styles.checkIcon}>✓</span>
                <span><strong>تحسين جودة الأسلوب والربط:</strong> تحويل الصياغات البسيطة أو المترجمة حرفياً إلى لغة فصيحة ومترابطة بوضوح.</span>
              </li>
              <li className={styles.featureItem}>
                <span className={styles.checkIcon}>✓</span>
                <span><strong>أسعار خاصة ومناسبة للطلاب:</strong> باقات مخفضة مخصصة لطلاب البكالوريوس لدعم مسيرتهم التعليمية.</span>
              </li>
              <li className={styles.featureItem}>
                <span className={styles.checkIcon}>✓</span>
                <span><strong>سرعة تسليم فائقة:</strong> إمكانية التسليم خلال 24 ساعة للمستندات والواجبات القصيرة والطارئة.</span>
              </li>
            </ul>

            <h2>الالتزام الأخلاقي للطلاب (هام)</h2>
            <p>
              نحن نلتزم التزاماً كاملاً بقوانين النزاهة الأكاديمية للجامعات، ولذلك:
            </p>
            <ul className={styles.notIncludedList}>
              <li className={styles.notIncludedItem}>
                <span className={styles.crossIcon}>✗</span>
                <span><strong>لا نقوم بحل الواجبات أو كتابة التقارير نيابةً عنك:</strong> يجب أن يقوم الطالب بكتابة وإعداد عمله بنفسه، ونحن نتولى تنقيته لغوياً فقط.</span>
              </li>
              <li className={styles.notIncludedItem}>
                <span className={styles.crossIcon}>✗</span>
                <span><strong>لا نتدخل في النظريات أو المخرجات العلمية:</strong> نحن لا نعدل الأرقام أو التحليل العلمي لعملك لضمان مصداقية الجهد الدراسي.</span>
              </li>
            </ul>

            <div style={{ textAlign: "center", marginTop: "50px" }}>
              <a href="https://wa.me/967770334448?text=%D9%85%D8%B1%D8%AD%D8%A8%D9%8B%D8%A7%D8%8C%20%D8%A3%D9%88%D8%AF%20%D8%A7%D9%84%D8%A7%D8%B3%D8%AA%D9%81%D8%B3%D8%A7%D8%B1%20%D8%B9%D9%86%20%D8%AE%D8%AF%D9%85%D8%A7%D8%AA%D9%83%D9%85%20%D8%A7%D9%84%D9%84%D8%BA%D9%88%D9%8A%D8%A9" target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                أرسل مشروعك الجامعي للتدقيق الآن
              </a>
            </div>

            {/* Related Services */}
            <div className={styles.siblingGrid}>
              <Link href="/services/academic-proofreading" className={styles.siblingCard}>
                <span className={styles.siblingName}>تدقيق الرسائل والأبحاث الأكاديمية ←</span>
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
