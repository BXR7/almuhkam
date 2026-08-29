import Link from "next/link";
import BeforeAfterSlider from "@/components/BeforeAfterSlider";
import { getServiceIcon, BrainIcon, AlarmIcon, PenIcon } from "@/components/Icons";
import styles from "@/styles/home.module.css";

const servicePillars = [
  {
    id: "academic-proofreading",
    name: "التدقيق والتحرير اللغوي والتأليف",
    desc: "تدقيق وتحرير لغوي ومراجعة ونقد أكاديمي لأبحاث التخرج، ورسائل الماجستير والدكتوراه، والكتب، والمقالات، والروايات، ومراجعة الكتب المترجمة إلى العربية.",
    tag: "المجال الأول"
  },
  {
    id: "corporate-writing",
    name: "التواصل المؤسسي",
    desc: "إنجاز أعمال الكتابة الوظيفية، والعلمية، والمهنية، والتقارير وصناعة محتوى احترافي يلبي الأهداف التواصلية ويعبّر عن هوية الجهة ورسالتها بوضوح ودقة.",
    tag: "المجال الثاني"
  },
  {
    id: "content-marketing",
    name: "الدعاية والإعلان وشبكات التواصل",
    desc: "نصوص رصينة وجذابة تستقطب اهتمام الجمهور، وتعزز التفاعل، وتوصل الرسالة المقصودة بفاعلية، من خلال خدمات متقدمة في الكتابة التسويقية والإبداعية.",
    tag: "المجال الثالث"
  },
  {
    id: "student-services",
    name: "خدمات لطلبة الجامعات والباحثين",
    desc: "مراجعة نقدية وتدقيق لغوي وصياغة للمحتوى باللغة العربية المعاصرة لمشاريع التخرج والأطروحات الأكاديمية لحفظ رصانتها العلمية.",
    tag: "المجال الرابع"
  }
];

const clientSectors = [
  { title: "دور النشر والطباعة", desc: "تدقيق المخطوطات والكتب قبل مرحلة النشر والطباعة." },
  { title: "مراكز الترجمة", desc: "مراجعة وضبط النصوص المترجمة إلى العربية الفصيحة." },
  { title: "الصحف والمواقع الإلكترونية", desc: "تحرير المقالات والتقارير الصحفية وضبط صياغتها." },
  { title: "قنوات التلفزيون والإذاعات", desc: "صياغة وتدقيق نصوص البرامج والتقارير الإخبارية." },
  { title: "مكاتب المحاماة", desc: "ضبط صياغة اللوائح القانونية والمذكرات بلسان عربي مبين." },
  { title: "شركات الدعاية والبرمجيات", desc: "صناعة وتدقيق المحتوى التسويقي وواجهات التطبيقات." }
];

export default function Home() {
  return (
    <div>
      {/* ════ Hero ════ */}
      <section className={styles.hero}>
        <div className={styles.heroBg} style={{ backgroundImage: "url('/assets/almuhkam-paper-hero.jpg')", backgroundPosition: "center", backgroundSize: "cover", opacity: 0.47 }} />
        <div className="container">
          <div className={styles.heroContent}>
            <span className={styles.heroTag}>الجلال — التدقيق اللغوي المُحْكَم</span>
            <h1 className={styles.heroTitle}>
              الدقة في اللغة...{" "}
              <span className={styles.accentText}>والإحكام في الصياغة</span>
            </h1>
            <p className={styles.heroDesc}>
              مُتخصصون في التدقيق والتحرير اللغوي وكتابة المحتوى الإبداعي، والتسويقي، والمعرفي وفق أعلى معايير الجودة، نمنح النصوص قوة لغوية، ووضوحًا فكريًا، وتأثيرًا يُحدث الفرق.
            </p>
            <div className={styles.heroCtas}>
              <a href="https://wa.me/967770334448?text=%D9%85%D8%B1%D8%AD%D8%A8%D9%8B%D8%A7%20%D9%85%D9%86%D8%B5%D8%A9%20%D8%A7%D9%84%D8%AC%D9%84%D8%A7%D9%84%D8%8C%20%D8%A3%D9%88%D8%AF%20%D8%A7%D9%84%D8%A7%D8%B3%D8%AA%D9%81%D8%B3%D8%A7%D8%B1%20%D8%B9%D9%86%20%D8%AE%D8%AF%D9%85%D8%A7%D8%AA%20%D8%A7%D9%84%D8%AA%D8%AF%D9%82%D9%8A%D9%82%20%D8%A7%D9%84%D9%84%D8%BA%D9%88%D9%8A%20%D8%A7%D9%84%D9%85%D9%8F%D8%AD%D9%92%D9%83%D9%8E%D9%85:" target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                اطلب عرض سعر فوري 💬
              </a>
              <Link href="/services" className="btn btn-secondary">
                استكشف مجالات عملنا
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ════ مجالات العمل الرئيسة (Pillars) ════ */}
      <section className={`${styles.section} ${styles.sectionAlt}`}>
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: "56px" }}>
            <span className={styles.sectionTag}>مجالات عملنا</span>
            <h2 className={styles.sectionTitle}>أربعة مجالات رئيسة تلبي كافة الاحتياجات</h2>
            <p className={styles.sectionDesc} style={{ margin: "0 auto" }}>
              لأن اللغة المكتوبة وسيلة اتصال بين الناس من خلال المواقع الإلكترونية أو المطبوعات الورقية أو الأبحاث العلمية، نقدم خدماتنا التخصصية بدقة متناهية.
            </p>
          </div>

          <div className={styles.servicesGrid}>
            {servicePillars.map((service) => (
              <div key={service.id} className={styles.serviceCard}>
                <div className={styles.serviceIcon}>
                  {getServiceIcon(service.id)}
                </div>
                <div style={{ fontSize: "0.78rem", fontWeight: "bold", color: "var(--copper)", marginBottom: "6px" }}>
                  {service.tag}
                </div>
                <h3 className={styles.serviceName}>{service.name}</h3>
                <p className={styles.serviceDesc}>{service.desc}</p>
                <Link href={`/services/${service.id}`} className={styles.serviceLink}>
                  <span>تفاصيل المجال</span>
                  <span className={styles.arrow}>←</span>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════ Before/After ════ */}
      <section className={styles.section}>
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: "40px" }}>
            <span className={styles.sectionTag}>برهان الجودة</span>
            <h2 className={styles.sectionTitle}>شاهد الفارق بنفسك — الإحكام في الصياغة</h2>
            <p className={styles.sectionDesc} style={{ margin: "0 auto" }}>
              مقارنة حقيقية بين نص قبل التدقيق وبعده — راجع التصحيحات اللغوية والنحوية والأسلوبية بالتفصيل.
            </p>
          </div>
          <BeforeAfterSlider />
        </div>
      </section>

      {/* ════ Ethical Commitment (الأمانة العلمية) ════ */}
      <section className={styles.ethicalSection}>
        <div className="container">
          <div className={styles.ethicalBox}>
            <span className={styles.ethicalIcon}>✦</span>
            <h2 className={styles.ethicalTitle}>التزامنا بأخلاقيات البحث العلمي والأمانة الأكاديمية</h2>
            <p className={styles.ethicalDesc}>
              انطلاقًا من التزامنا بأخلاقيات البحث العلمي، لا نقدِّم خدمة كتابة البحوث أو الرسائل العلمية، وإنما نقتصر على التدقيق اللغوي، والتحرير، والمراجعة، والنقد الأكاديمي بما يحفظ أصالة العمل العلمي وملكية صاحبه.
            </p>
          </div>
        </div>
      </section>

      {/* ════ القطاعات المستفيدة (Audience & Sectors) ════ */}
      <section className={`${styles.section} ${styles.sectionAlt}`}>
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: "56px" }}>
            <span className={styles.sectionTag}>شركاء النجاح</span>
            <h2 className={styles.sectionTitle}>خدماتنا للأفراد والمؤسسات كافة</h2>
            <p className={styles.sectionDesc} style={{ margin: "0 auto" }}>
              نعتز بخبرتنا المتخصصة؛ نجمع بين الدقة اللغوية، والوعي الأسلوبي، وفهم السياق لتقديم أعمال تتسم بالجودة والاحترافية.
            </p>
          </div>

          <div className={styles.servicesGrid} style={{ gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))" }}>
            {clientSectors.map((sector, idx) => (
              <div key={idx} className={styles.serviceCard} style={{ padding: "24px" }}>
                <h3 className={styles.serviceName} style={{ fontSize: "1.1rem", color: "var(--olive)", marginBottom: "8px" }}>
                  ✦ {sector.title}
                </h3>
                <p className={styles.serviceDesc} style={{ margin: 0, fontSize: "0.9rem" }}>
                  {sector.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════ How It Works ════ */}
      <section className={styles.section}>
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: "56px" }}>
            <span className={styles.sectionTag}>المنهجية</span>
            <h2 className={styles.sectionTitle}>ثلاث خطوات نحو نصٍ مُتقَن ومُحْكَم</h2>
          </div>

          <div className={styles.stepsGrid}>
            <div className={styles.step}>
              <span className={styles.stepNumber}>١</span>
              <h3 className={styles.stepTitle}>أرسل نصك</h3>
              <p className={styles.stepDesc}>ارفع ملفك عبر النموذج أو أرسله مباشرة عبر واتساب مع تحديد موعد التسليم والملاحظات.</p>
            </div>
            <div className={styles.step}>
              <span className={styles.stepNumber}>٢</span>
              <h3 className={styles.stepTitle}>يراجعه خبير متخصص</h3>
              <p className={styles.stepDesc}>نُسند ملفك لخبير لغوي متخصص في مجالك ليبدأ التدقيق النحوي والأسلوبي وضبط السياق.</p>
            </div>
            <div className={styles.step}>
              <span className={styles.stepNumber}>٣</span>
              <h3 className={styles.stepTitle}>استلم نصك مُحْكَمًا</h3>
              <p className={styles.stepDesc}>تتلقى نسختين: نسخة نهائية جاهزة للنشر، ونسخة بتتبع التغييرات لمراجعة كل تصويب.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ════ Final CTA ════ */}
      <section className={styles.finalCta}>
        <div className="container">
          <h2 className={styles.ctaTitle}>
            الدقة في اللغة... والإحكام في الصياغة
          </h2>
          <p className={styles.ctaDesc}>
            تواصل معنا الآن لمناقشة أبحاثك، كتبك، أو محتواك المؤسسي — نحن هنا لمنح نصوصك قوة لغوية وتأثيراً يُحدث الفرق.
          </p>
          <a href="https://wa.me/967770334448?text=%D9%85%D8%B1%D8%AD%D8%A8%D9%8B%D8%A7%20%D9%85%D9%86%D8%B5%D8%A9%20%D8%A7%D9%84%D8%AC%D9%84%D8%A7%D9%84%D8%8C%20%D8%A3%D9%88%D8%AF%20%D8%A7%D9%84%D8%A7%D8%B3%D8%AA%D9%81%D8%B3%D8%A7%D8%B1%20%D8%B9%D9%86%20%D8%AE%D8%AF%D9%85%D8%A7%D8%AA%20%D8%A7%D9%84%D8%AA%D8%AF%D9%82%D9%8A%D9%82%20%D8%A7%D9%84%D9%84%D8%BA%D9%88%D9%8A%20%D8%A7%D9%84%D9%85%D9%8F%D8%AD%D9%92%D9%83%D9%8E%D9%85:" target="_blank" rel="noopener noreferrer" className="btn btn-primary">
            تواصل مباشر عبر واتساب 💬
          </a>
        </div>
      </section>
    </div>
  );
}
