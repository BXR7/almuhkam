import Link from "next/link";
import { getServiceIcon } from "@/components/Icons";
import styles from "@/styles/pages.module.css";
import homeStyles from "@/styles/home.module.css";

export const metadata = {
  title: "خدماتنا اللغوية",
  description: "اكتشف خدمات التدقيق اللغوي والتحرير الأكاديمي وصياغة المحتوى التي نقدمها لمساعدتك في تحقيق أعلى معايير الجودة اللغوية.",
};

const services = [
  { id: "academic-proofreading", name: "تدقيق الأبحاث والرسائل الجامعية", desc: "مراجعة شاملة لرسائل الماجستير والدكتوراه والأبحاث العلمية لضمان سلامتها الأكاديمية واللغوية وتوافقها مع مناهج التوثيق العلمي." },
  { id: "book-editing", name: "تحرير الكتب والمقالات", desc: "صقل الأسلوب الأدبي، وتنسيق الفصول، وتحسين صياغة الروايات والمؤلفات الطويلة والقصيرة دون التأثير على صوت الكاتب الفني." },
  { id: "corporate-writing", name: "الكتابة المؤسسية", desc: "صياغة وتدقيق التقارير السنوية، والكتيبات التعريفية، ومراسلات الشركات الرسمية بلغة رصينة ومحترفة تمثل هويتك التجارية." },
  { id: "content-marketing", name: "المحتوى التسويقي", desc: "كتابة وتعديل النصوص الإعلانية، ومنشورات مواقع التواصل الاجتماعي، ومحتوى المواقع الإلكترونية بما يتوافق مع شروط السيو (SEO)." },
  { id: "audio-transcription", name: "التفريغ الصوتي", desc: "تحويل الملفات الصوتية (محاضرات، مقابلات، ندوات) إلى نصوص عربية فصيحة مكتوبة بدقة بالغة وبنية سليمة." },
  { id: "student-services", name: "خدمات الطلاب", desc: "تدقيق لغوي وإملائي سريع للمشاريع والواجبات الطلابية بأسعار مخصصة لتلائم ميزانية الطلاب الجامعيين." },
  { id: "academic-review", name: "المراجعة والنقد الأكاديمي", desc: "مراجعة بنية الرسائل العلمية، وتقييم ترابط الأقسام وقوتها المنهجية والنقدية قبل التوجه إلى مرحلة التحكيم والمناقشة." }
];

export default function ServicesHub() {
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
              <li className={styles.breadcrumbActive}>خدماتنا</li>
            </ul>
            <h1 className={styles.pageTitle}>خدماتنا اللغوية</h1>
            <p className={styles.pageDesc}>
              حلول لغوية تخصصية متكاملة مصممة لتلبية متطلبات الباحثين الأكاديميين والمؤسسات والمؤلفين تحت إشراف نخبة من المتخصصين.
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid Section */}
      <section className={styles.section}>
        <div className="container">
          <div className={homeStyles.servicesGrid}>
            {services.map((service) => (
              <div key={service.id} className={homeStyles.serviceCard}>
                <div className={homeStyles.serviceIcon}>
                  {getServiceIcon(service.id)}
                </div>
                <h2 className={homeStyles.serviceName} style={{ fontSize: "1.15rem" }}>{service.name}</h2>
                <p className={homeStyles.serviceDesc}>{service.desc}</p>
                <Link href={`/services/${service.id}`} className={homeStyles.serviceLink} style={{ marginTop: "16px" }}>
                  تفاصيل الخدمة والطلب ←
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
