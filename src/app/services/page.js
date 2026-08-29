import Link from "next/link";
import { getServiceIcon } from "@/components/Icons";
import styles from "@/styles/pages.module.css";
import homeStyles from "@/styles/home.module.css";

export const metadata = {
  title: "مجالات عملنا وخدماتنا — الجلال للتدقيق اللغوي المُحْكَم",
  description: "نقدِّم خدْمَات التَّدْقِيق والتَّحْرِير اللُّغَوِيّ، والمراجعة، والنقد الأكاديمي، والكتابة المؤسسية، وصناعة المحتوى وفق أعلى معايير الجودة.",
};

const pillars = [
  {
    pillarTitle: "١. التدقيق والتحرير اللغوي والتأليف",
    pillarDesc: "نقدِّم خدمات التَّدْقِيق والتَّحْرِير اللُّغَوِيّ، والمراجعة، والنقد الأكاديمي لأبحاث التخرج، ورسائل الماجستير والدكتوراه، والكُتب، والمقالات، والروايات، ومراجعة الكتب المترجمة إلى العربية.",
    services: [
      { id: "academic-proofreading", name: "تدقيق الأبحاث والرسائل الجامعية", desc: "مراجعة شاملة لرسائل الماجستير والدكتوراه والأبحاث العلمية لضمان سلامتها الأكاديمية واللغوية وتوافقها مع مناهج التوثيق." },
      { id: "book-editing", name: "تحرير الكتب والروايات والمقالات", desc: "صقل الأسلوب الأدبي، وتنسيق الفصول، وتحسين صياغة المؤلفات دون التأثير على صوت الكاتب الفني." },
      { id: "academic-review", name: "المراجعة والنقد الأكاديمي", desc: "مراجعة بنية الرسائل العلمية، وتقييم ترابط الأقسام وقوتها المنهجية والنقدية قبل التحكيم والمناقشة." }
    ]
  },
  {
    pillarTitle: "٢. التواصل المؤسسي والكتابة المهنية",
    pillarDesc: "نساعد عملاءنا على إنجاز أعمال الكتابة الوظيفية، والعلمية، والمهنية، وصناعة محتوى احترافي يلبِّي الأهداف التواصلية ويعبِّر عن هوية الجهة ورسالتها بدقة.",
    services: [
      { id: "corporate-writing", name: "الكتابة المؤسسية والتقارير", desc: "صياغة وتدقيق التقارير السنوية، والكتيبات التعريفية، ومراسلات الشركات الرسمية بلغة رصينة ومحترفة تمثل هويتك." },
      { id: "audio-transcription", name: "التفريغ الصوتي والتوثيق", desc: "تحويل الملفات الصوتية (محاضرات، مقابلات، ندوات، اجتماعات) إلى نصوص عربية فصيحة مكتوبة بدقة بالغة." }
    ]
  },
  {
    pillarTitle: "٣. الدعاية والإعلان وشبكات التواصل الاجتماعي",
    pillarDesc: "نُمكِّن عملاءنا من الحصول على نصوص رصينة وجذابة، تستقطب اهتمام الجمهور، وتعزِّز التفاعل، وتوصل الرسالة المقصودة بفاعلية من خلال الكتابة التسويقية والإبداعية.",
    services: [
      { id: "content-marketing", name: "صناعة المحتوى التسويقي والإعلاني", desc: "كتابة وتعديل النصوص الإعلانية، ومنشورات شبكات التواصل الاجتماعي، ومحتوى المواقع الإلكترونية المتوافق مع معايير SEO." }
    ]
  },
  {
    pillarTitle: "٤. خدمات لطلبة الجامعات والباحثين",
    pillarDesc: "توفير خدمات التحرير والصياغة للمحتوى باللغة العربية المعاصرة للطلبة والباحثين لمساعدتهم على تقديم أبحاث متميزة خالية من العيوب.",
    services: [
      { id: "student-services", name: "خدمات أبحاث التخرج والطلاب", desc: "تدقيق لغوي وإملائي ومنهجي سريع للمشاريع والواجبات الطلابية بأسعار مخصصة لتلائم ميزانية الطلاب." }
    ]
  }
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
              <li className={styles.breadcrumbActive}>مجالات عملنا</li>
            </ul>
            <h1 className={styles.pageTitle}>مجالات عملنا وخدماتنا</h1>
            <p className={styles.pageDesc}>
              الدقة في اللغة... والإحكام في الصياغة. حلول لغوية تخصصية متكاملة مقسمة إلى أربعة مجالات رئيسة لتلبية كافة احتياجات الأفراد والمؤسسات.
            </p>
          </div>
        </div>
      </section>

      {/* Pillars Section */}
      <section className={styles.section}>
        <div className="container">
          {pillars.map((pillar, pIdx) => (
            <div key={pIdx} style={{ marginBottom: "56px" }}>
              <div style={{ borderBottom: "2px solid var(--border-color)", paddingBottom: "16px", marginBottom: "28px" }}>
                <h2 style={{ color: "var(--olive)", fontSize: "1.45rem", marginBottom: "8px" }}>{pillar.pillarTitle}</h2>
                <p style={{ color: "var(--text-secondary)", fontSize: "0.95rem", lineHeight: "1.7", margin: 0 }}>
                  {pillar.pillarDesc}
                </p>
              </div>

              <div className={homeStyles.servicesGrid} style={{ gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))" }}>
                {pillar.services.map((service) => (
                  <div key={service.id} className={homeStyles.serviceCard}>
                    <div className={homeStyles.serviceIcon}>
                      {getServiceIcon(service.id)}
                    </div>
                    <h3 className={homeStyles.serviceName} style={{ fontSize: "1.15rem" }}>{service.name}</h3>
                    <p className={homeStyles.serviceDesc}>{service.desc}</p>
                    <Link href={`/services/${service.id}`} className={homeStyles.serviceLink} style={{ marginTop: "16px" }}>
                      <span>تفاصيل الخدمة والطلب</span>
                      <span className={homeStyles.arrow}>←</span>
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
