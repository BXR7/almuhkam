import Link from "next/link";
import styles from "@/styles/pages.module.css";

export const metadata = {
  title: "تدقيق الأبحاث والرسائل الجامعية",
  description: "خدمة تدقيق لغوي أكاديمي احترافي لرسائل الماجستير والدكتوراه والأبحاث العلمية الموجهة للنشر في المجلات الجلالة.",
};

export default function AcademicProofreading() {
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
              <li className={styles.breadcrumbActive}>تدقيق الأبحاث والرسائل الجامعية</li>
            </ul>
            <h1 className={styles.pageTitle}>تدقيق الأبحاث والرسائل الجامعية</h1>
            <p className={styles.pageDesc}>
              نرتقي بأطروحتك العلمية أو بحثك الأكاديمي لتستوفي أعلى معايير الضبط اللغوي والمنهجي والأسلوبي المتبع في الجامعات والمجلات العلمية المحكّمة.
            </p>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className={styles.section}>
        <div className="container">
          <div className={styles.contentWrapper}>
            <h2>لماذا تحتاج أبحاثك للتدقيق اللغوي الاحترافي؟</h2>
            <p>
              الأبحاث العلمية ورسائل الماجستير والدكتوراه تمثل جهداً فكرياً وعلمياً كبيراً بذله الباحث على مدار أشهر أو سنوات. ومع ذلك، فإن وجود أخطاء إملائية، أو تركيبية، أو ركاكة في الأسلوب قد يؤدي إلى رفض الأبحاث من قبل لجان التحكيم أو المجلات العلمية المعتمدة، أو تشتيت القارئ عن فهم القيمة المعرفية الكامنة في الدراسة.
            </p>

            <h2>ماذا تشمل خدمتنا الأكاديمية؟</h2>
            <ul className={styles.featureList}>
              <li className={styles.featureItem}>
                <span className={styles.checkIcon}>✓</span>
                <span><strong>التصحيح النحوي والإملائي:</strong> تصويب كافة الأخطاء الإملائية، والتركيبية، وضبط القواعد النحوية وعلامات الترقيم بدقة بالغة.</span>
              </li>
              <li className={styles.featureItem}>
                <span className={styles.checkIcon}>✓</span>
                <span><strong>الملاءمة الأسلوبية:</strong> تعديل الجمل الركيكة وإعادة صياغتها لتناسب الصبغة والوقار الأكاديمي المطلوب في البحث العلمي.</span>
              </li>
              <li className={styles.featureItem}>
                <span className={styles.checkIcon}>✓</span>
                <span><strong>مراجعة المراجع وعلامات التوثيق:</strong> مراجعة اتساق توثيق المصادر والمراجع وهوامش البحث حسب الأنظمة المعتمدة (APA، MLA، إلخ).</span>
              </li>
              <li className={styles.featureItem}>
                <span className={styles.checkIcon}>✓</span>
                <span><strong>تدقيق التماسك البنيوي:</strong> التأكد من الترابط العضوي والمنطقي بين فصول البحث والفقرات لضمان قراءة انسيابية مريحة للمُحكّمين.</span>
              </li>
            </ul>

            <h2>ما لا تشمله هذه الخدمة (حدود الأمانة العلمية)</h2>
            <p>
              حرصاً منا على نزاهتك الأكاديمية، نلتزم بحدود صارمة تمنع الغش الأكاديمي أو السرقة الفكرية:
            </p>
            <ul className={styles.notIncludedList}>
              <li className={styles.notIncludedItem}>
                <span className={styles.crossIcon}>✗</span>
                <span><strong>كتابة الأبحاث أو الأطروحات نيابة عن الباحث:</strong> لا نقوم مطلقاً بكتابة أي فصول أو صياغة فرضيات أو استخلاص نتائج دراسات.</span>
              </li>
              <li className={styles.notIncludedItem}>
                <span className={styles.crossIcon}>✗</span>
                <span><strong>التحليل الإحصائي أو جمع البيانات:</strong> الباحث مسؤول بشكل كامل عن الجانب التطبيقي والإحصائي وعينات البحث.</span>
              </li>
              <li className={styles.notIncludedItem}>
                <span className={styles.crossIcon}>✗</span>
                <span><strong>تعديل جوهر الأفكار العلمية:</strong> دورنا تصحيح الوعاء اللغوي والأسلوبي الناقل للفكرة، دون العبث بمحتوى الفكرة ذاتها.</span>
              </li>
            </ul>

            <h2>كيف تجري آلية العمل لرسالتك الأكاديمية؟</h2>
            <p>
              نتبع مساراً صارماً من خطوتين في التدقيق اللغوي لضمان التفوق المطلق:
              <br />
              <strong>المرحلة الأولى:</strong> يقرأ المدقق المتخصص النص كاملاً ويصحح القواعد النحوية والإملائية ويكتب الملاحظات الهامشية.
              <br />
              <strong>المرحلة الثانية:</strong> تتم مراجعة المستند ثانيةً من قبل مدقق كبير للتأكد من سلامة الصياغة الأسلوبية واتساق علامات الترقيم والمصطلحات. ثم نرسل لك ملفين (نسخة نظيفة مقبولة للنشر، ونسخة بتتبع التغييرات).
            </p>

            <h2>لمن هذه الخدمة؟</h2>
            <p>
              هذه الخدمة مخصصة لـ:
              طلاب الدراسات العليا (الماجستير والدكتوراه) في الجامعات العربية والخليجية، وأعضاء هيئة التدريس الراغبين في نشر أبحاثهم في مجلات محلية ودولية محكمة، والمراكز البحثية والتربوية.
            </p>

            <div style={{ textAlign: "center", marginTop: "50px" }}>
              <a href="https://wa.me/967770334448?text=%D9%85%D8%B1%D8%AD%D8%A8%D9%8B%D8%A7%D8%8C%20%D8%A3%D9%88%D8%AF%20%D8%A7%D9%84%D8%A7%D8%B3%D8%AA%D9%81%D8%B3%D8%A7%D8%B1%20%D8%B9%D9%86%20%D8%AE%D8%AF%D9%85%D8%A7%D8%AA%D9%83%D9%85%20%D8%A7%D9%84%D9%84%D8%BA%D9%88%D9%8A%D8%A9" target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                اطلب عرض سعر لرسالتك الآن
              </a>
            </div>

            {/* Related Services */}
            <div className={styles.siblingGrid}>
              <Link href="/services/academic-review" className={styles.siblingCard}>
                <span className={styles.siblingName}>المراجعة والنقد الأكاديمي ←</span>
              </Link>
              <Link href="/services/student-services" className={styles.siblingCard}>
                <span className={styles.siblingName}>خدمات الطلاب الجامعيين ←</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
