import Link from "next/link";
import styles from "@/styles/pages.module.css";

export const metadata = {
  title: "صياغة وتدقيق المحتوى التسويقي والإعلاني",
  description: "خدمة كتابة وتدقيق المحتوى التسويقي ومراجعة الإعلانات ومواقع التواصل الاجتماعي بلغة عربية فصيحة وجذابة تلائم الجمهور المستهدف.",
};

export default function ContentMarketing() {
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
              <li className={styles.breadcrumbActive}>المحتوى التسويقي</li>
            </ul>
            <h1 className={styles.pageTitle}>المحتوى التسويقي</h1>
            <p className={styles.pageDesc}>
              نصوغ وندقق نصوصك الترويجية ومحتوى موقعك الإلكتروني بلغة جذابة وسليمة تجمع بين بلاغة الفصحى وجاذبية الإعلان المعاصر.
            </p>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className={styles.section}>
        <div className="container">
          <div className={styles.contentWrapper}>
            <h2>النص الخالي من الأخطاء يرفع المبيعات ويعزز الثقة</h2>
            <p>
              النصوص الإعلانية والبريد الترويجي ومحتوى شبكات التواصل الاجتماعي هي نقاط الاتصال الأولى مع عملائك. وجود أخطاء إملائية أو أسلوب ركيك يقلل من هيبة علامتك التجارية بشكل مباشر ويضعف فرص تحويل الزوار إلى مشترين. نحن هنا لضمان تقديم محتوى ترويجي نقي وجذاب.
            </p>

            <h2>ماذا تشمل خدمتنا في المحتوى التسويقي؟</h2>
            <ul className={styles.featureList}>
              <li className={styles.featureItem}>
                <span className={styles.checkIcon}>✓</span>
                <span><strong>تدقيق نصوص الحملات الإعلانية:</strong> مراجعة وتعديل نصوص الإعلانات الممولة وصفحات الهبوط (Landing Pages) بدقة.</span>
              </li>
              <li className={styles.featureItem}>
                <span className={styles.checkIcon}>✓</span>
                <span><strong>تحسين محركات البحث (SEO Copywriting):</strong> مراجعة توزيع الكلمات المفتاحية وسلامة العناوين الفرعية والميتا تاغز لتحسين ترتيب موقعك في جوجل.</span>
              </li>
              <li className={styles.featureItem}>
                <span className={styles.checkIcon}>✓</span>
                <span><strong>نبرة وصوت العلامة التجارية:</strong> مواءمة الصياغة لتناسب فئتك المستهدفة (شبابية، فاخرة، تقنية، إلخ).</span>
              </li>
              <li className={styles.featureItem}>
                <span className={styles.checkIcon}>✓</span>
                <span><strong>تنقية اللهجات العامية وتفصيحها:</strong> تحسين وترجمة العبارات الدارجة في نصوصك إلى لغة عربية فصحى ومبسطة ومفهومة للجميع في الخليج والوطن العربي.</span>
              </li>
            </ul>

            <h2>حدود الخدمة الإعلانية</h2>
            <ul className={styles.notIncludedList}>
              <li className={styles.notIncludedItem}>
                <span className={styles.crossIcon}>✗</span>
                <span><strong>تصميم الصور أو إدارة الحسابات:</strong> دورنا لغوي فقط في تدقيق وتحرير النصوص المكتوبة، ولا نشمل تصميم الجرافيك أو جدولة المنشورات.</span>
              </li>
            </ul>

            <div style={{ textAlign: "center", marginTop: "50px" }}>
              <a href="https://wa.me/967770334448?text=%D9%85%D8%B1%D8%AD%D8%A8%D9%8B%D8%A7%D8%8C%20%D8%A3%D9%88%D8%AF%20%D8%A7%D9%84%D8%A7%D8%B3%D8%AA%D9%81%D8%B3%D8%A7%D8%B1%20%D8%B9%D9%86%20%D8%AE%D8%AF%D9%85%D8%A7%D8%AA%D9%83%D9%85%20%D8%A7%D9%84%D9%84%D8%BA%D9%88%D9%8A%D8%A9" target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                ابدأ بتدقيق حملتك التسويقية الآن
              </a>
            </div>

            {/* Related Services */}
            <div className={styles.siblingGrid}>
              <Link href="/services/corporate-writing" className={styles.siblingCard}>
                <span className={styles.siblingName}>الكتابة المؤسسية والتقارير ←</span>
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
