import Link from "next/link";
import styles from "@/styles/pages.module.css";

export const metadata = {
  title: "سياسة الخصوصية — أمان وسرية المستندات الأكاديمية",
  description: "اطلع على سياسة الخصوصية لمنصة الجلال، وتعرف على كيفية حماية سرية أبحاثك ومستنداتك وملفاتك الحساسة.",
};

export default function PrivacyPolicy() {
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
              <li className={styles.breadcrumbActive}>سياسة الخصوصية</li>
            </ul>
            <h1 className={styles.pageTitle}>سياسة الخصوصية وسرية الملفات</h1>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className={styles.section}>
        <div className="container">
          <div className={styles.contentWrapper}>
            <h2>التزامنا بحماية سرية أبحاثك</h2>
            <p>
              ندرك في منصة **الجلال** القيمة الأكاديمية والمهنية للمستندات والرسائل العلمية التي تشاركونها معنا. ولذلك، نضع سرية معلوماتكم وملفاتكم في قائمة أولوياتنا. توضح هذه السياسة كيف نتعامل مع بياناتكم وملفاتكم المرفوعة.
            </p>

            <h2>١. جمع المعلومات ومعالجتها</h2>
            <p>
              نقوم بجمع الاسم، والبريد الإلكتروني، ورقم الواتساب فقط لغرض التواصل وتقديم تقرير عرض السعر والملفات المنجزة. لا نطلب منكم أي بيانات بنكية أو حساسة غير ضرورية لعملية التدقيق.
            </p>

            <h2>٢. حماية الملفات والمستندات المرفوعة</h2>
            <ul className={styles.featureList}>
              <li className={styles.featureItem}>
                <span className={styles.checkIcon}>✦</span>
                <span>لا يتم حفظ أو مشاركة أو تداول نصوصكم مع أي جهة خارجية أو زملاء أو طلاب آخرين مطلقاً تحت أي ظرف.</span>
              </li>
              <li className={styles.featureItem}>
                <span className={styles.checkIcon}>✦</span>
                <span>الملفات يتم تخزينها في خوادم مشفرة آمنة، ويكون للمدقق المسؤول عن النص فقط صلاحية الوصول للملف.</span>
              </li>
              <li className={styles.featureItem}>
                <span className={styles.checkIcon}>✦</span>
                <span>نلتزم بحذف جميع الملفات الأصلية والمدققة نهائياً من خوادمنا بعد مرور ٣٠ يوماً من تسليم العمل وحصولكم عليه، ما لم تطلبوا منا حذفها فوراً.</span>
              </li>
            </ul>

            <h2>٣. الملكية الفكرية</h2>
            <p>
              حقوق الملكية الفكرية للنصوص والمحتوى المرفوع والمنجز تظل ملكاً خالصاً وأصيلاً للباحث أو المؤسسة أو المؤلف. لا تدعي منصة **الجلال** أو مدققوها أي حق ملكية أو نشر في المستندات والبحوث المدققة.
            </p>

            <h2>٤. التغييرات في سياسة الخصوصية</h2>
            <p>
              قد نقوم بتحديث هذه السياسة دورياً تماشياً مع معايير الأمان وحماية البيانات الإقليمية. نوصي بمراجعة هذه الصفحة بشكل مستمر لمعرفة أي تحديثات.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
