import Link from "next/link";
import BeforeAfterSlider from "@/components/BeforeAfterSlider";
import { getServiceIcon, BrainIcon, AlarmIcon, PenIcon } from "@/components/Icons";
import styles from "@/styles/home.module.css";

const services = [
  { id: "academic-proofreading", name: "تدقيق الأبحاث والرسائل الجامعية", desc: "مراجعة شاملة لرسائل الماجستير والدكتوراه والأبحاث العلمية لضمان سلامتها الأكاديمية واللغوية وتوافقها مع مناهج التوثيق العلمي." },
  { id: "book-editing", name: "تحرير الكتب والمقالات", desc: "صقل الأسلوب الأدبي، وتنسيق الفصول، وتحسين صياغة الروايات والمؤلفات الطويلة والقصيرة دون التأثير على صوت الكاتب الفني." },
  { id: "corporate-writing", name: "الكتابة المؤسسية", desc: "صياغة وتدقيق التقارير السنوية، والكتيبات التعريفية، ومراسلات الشركات الرسمية بلغة رصينة ومحترفة تمثل هويتك التجارية." },
  { id: "content-marketing", name: "المحتوى التسويقي", desc: "كتابة وتعديل النصوص الإعلانية، ومنشورات مواقع التواصل الاجتماعي، ومحتوى المواقع الإلكترونية بما يتوافق مع شروط السيو (SEO)." },
  { id: "audio-transcription", name: "التفريغ الصوتي", desc: "تحويل الملفات الصوتية (محاضرات، مقابلات، ندوات) إلى نصوص عربية فصيحة مكتوبة بدقة بالغة وبنية سليمة." },
  { id: "student-services", name: "خدمات الطلاب", desc: "تدقيق لغوي وإملائي سريع للمشاريع والواجبات الطلابية بأسعار مخصصة لتلائم ميزانية الطلاب الجامعيين." },
  { id: "academic-review", name: "المراجعة والنقد الأكاديمي", desc: "مراجعة بنية الرسائل العلمية، وتقييم ترابط الأقسام وقوتها المنهجية والنقدية قبل التوجه إلى مرحلة التحكيم والمناقشة." }
];

export default function Home() {
  return (
    <div>
      {/* ════ Hero ════ */}
      <section className={styles.hero}>
        <div className={styles.heroBg} style={{ backgroundImage: "url('/assets/almuhkam-paper-hero.jpg')", backgroundPosition: "center", backgroundSize: "cover", opacity: 0.47 }} />
        <div className="container">
          <div className={styles.heroContent}>
            <span className={styles.heroTag}>المنصة الاحترافية للضبط والتحرير اللغوي</span>
            <h1 className={styles.heroTitle}>
              نرتقي بنصوصكم إلى مستوى{" "}
              <span className={styles.accentText}>الإتقان اللغوي</span>
            </h1>
            <p className={styles.heroDesc}>
              نجمع بين الخبرة الأكاديمية البشرية العميقة والمنهجية المنظمة لتقديم خدمات تدقيق وتحرير لغوي تليق بتطلعاتكم الأكاديمية والمهنية.
            </p>
            <div className={styles.heroCtas}>
              <a href="https://wa.me/967770334448?text=%D9%85%D8%B1%D8%AD%D8%A8%D9%8B%D8%A7%D8%8C%20%D8%A3%D9%88%D8%AF%20%D8%A7%D9%84%D8%A7%D8%B3%D8%AA%D9%81%D8%B3%D8%A7%D8%B1%20%D8%B9%D9%86%20%D8%AE%D8%AF%D9%85%D8%A7%D8%AA%D9%83%D9%85%20%D8%A7%D9%84%D9%84%D8%BA%D9%88%D9%8A%D8%A9" target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                اطلب عرض سعر مجاني
              </a>
              <Link href="/services" className="btn btn-secondary">
                تعرّف على خدماتنا
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ════ Problem ════ */}
      <section className={`${styles.section} ${styles.sectionAlt}`}>
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: "56px" }}>
            <span className={styles.sectionTag}>المشكلة</span>
            <h2 className={styles.sectionTitle}>لماذا تفشل الأدوات التقليدية؟</h2>
            <p className={styles.sectionDesc} style={{ margin: "0 auto" }}>
              كتابة نص عربي خالٍ من الشوائب يتعدى مجرد تصحيح الحروف — إنه يتطلب فهمًا عميقًا للسياق والدلالة والأسلوب.
            </p>
          </div>

          <div className={styles.problemGrid}>
            <div className={styles.problemCard}>
              <div className={styles.cardIcon}>
                <BrainIcon />
              </div>
              <h3 className={styles.cardTitle}>الذكاء الاصطناعي لا يكفي</h3>
              <p className={styles.cardDesc}>
                البرمجيات الآلية تصحح الإملاء الظاهري فقط، لكنها تجهل الفروق الدلالية الدقيقة وعلامات الإعراب السياقية.
              </p>
            </div>
            <div className={styles.problemCard} data-accent="amber">
              <div className={styles.cardIcon}>
                <AlarmIcon />
              </div>
              <h3 className={styles.cardTitle}>المستقلون غير موثوقين</h3>
              <p className={styles.cardDesc}>
                التعامل مع الهواة يحمل مخاطر التأخر في التسليم وانعدام معايير الجودة الثابتة والسرية العلمية.
              </p>
            </div>
            <div className={styles.problemCard} data-accent="rose">
              <div className={styles.cardIcon}>
                <PenIcon />
              </div>
              <h3 className={styles.cardTitle}>تدقيق سطحي مكلف</h3>
              <p className={styles.cardDesc}>
                كثير من الخدمات تقدم تصحيحًا عابرًا للأخطاء الواضحة دون الغوص في تماسك النص وبنيته وسلامة مراجعه.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ════ Before/After ════ */}
      <section className={styles.section}>
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: "40px" }}>
            <span className={styles.sectionTag}>برهان الجودة</span>
            <h2 className={styles.sectionTitle}>شاهد الفارق بنفسك</h2>
            <p className={styles.sectionDesc} style={{ margin: "0 auto" }}>
              مقارنة حقيقية بين نص قبل التدقيق وبعده — راجع التصحيحات اللغوية والأسلوبية بالتفصيل.
            </p>
          </div>
          <BeforeAfterSlider />
        </div>
      </section>

      {/* ════ Services ════ */}
      <section className={`${styles.section} ${styles.sectionAlt}`}>
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: "56px" }}>
            <span className={styles.sectionTag}>خدماتنا</span>
            <h2 className={styles.sectionTitle}>حلول لغوية متكاملة لكل تخصص</h2>
            <p className={styles.sectionDesc} style={{ margin: "0 auto" }}>
              خدمات مصممة بعناية لتلبية احتياجات الباحثين والمؤلفين والمؤسسات.
            </p>
          </div>

          <div className={styles.servicesGrid}>
            {services.map((service) => (
              <div key={service.id} className={styles.serviceCard}>
                <div className={styles.serviceIcon}>
                  {getServiceIcon(service.id)}
                </div>
                <h3 className={styles.serviceName}>{service.name}</h3>
                <p className={styles.serviceDesc}>{service.desc}</p>
                <Link href={`/services/${service.id}`} className={styles.serviceLink}>
                  <span>تفاصيل الخدمة</span>
                  <span className={styles.arrow}>←</span>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════ Ethical Commitment ════ */}
      <section className={styles.ethicalSection}>
        <div className="container">
          <div className={styles.ethicalBox}>
            <span className={styles.ethicalIcon}>✦</span>
            <h2 className={styles.ethicalTitle}>ندقق ونحرر — لا نكتب نيابةً عنكم</h2>
            <p className={styles.ethicalDesc}>
              نلتزم التزامًا أخلاقيًا وعلميًا صارمًا: نرتقي بنصوصكم وأفكاركم الخاصة إلى أعلى مستوى لغوي ممكن. لا نقدم خدمات كتابة الأبحاث أو الرسائل الجاهزة — الأمانة الأكاديمية خطنا الأحمر.
            </p>
          </div>
        </div>
      </section>

      {/* ════ How It Works ════ */}
      <section className={`${styles.section} ${styles.sectionAlt}`}>
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: "56px" }}>
            <span className={styles.sectionTag}>المنهجية</span>
            <h2 className={styles.sectionTitle}>ثلاث خطوات نحو نصٍ مُتقَن</h2>
          </div>

          <div className={styles.stepsGrid}>
            <div className={styles.step}>
              <span className={styles.stepNumber}>١</span>
              <h3 className={styles.stepTitle}>أرسل نصك</h3>
              <p className={styles.stepDesc}>ارفع ملفك عبر النموذج أو أرسله مباشرة عبر واتساب مع تحديد الموعد المطلوب.</p>
            </div>
            <div className={styles.step}>
              <span className={styles.stepNumber}>٢</span>
              <h3 className={styles.stepTitle}>يراجعه خبير متخصص</h3>
              <p className={styles.stepDesc}>نُسند ملفك للمدقق الأنسب لتخصصك ليبدأ المراجعة اللغوية والأسلوبية المعمقة.</p>
            </div>
            <div className={styles.step}>
              <span className={styles.stepNumber}>٣</span>
              <h3 className={styles.stepTitle}>استلم نصك مُتقنًا</h3>
              <p className={styles.stepDesc}>تتلقى نسختين: نسخة نهائية جاهزة للنشر، ونسخة بتتبع التغييرات لمراجعة كل تعديل.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ════ Stats ════ */}
      <section className={styles.section}>
        <div className="container">
          <div className={styles.statsGrid}>
            <div className={styles.stat}>
              <div className={styles.statNumber}>+٥٠٠</div>
              <div className={styles.statLabel}>مستند تم تدقيقه</div>
            </div>
            <div className={styles.stat}>
              <div className={styles.statNumber}>+١٠</div>
              <div className={styles.statLabel}>سنوات خبرة</div>
            </div>
            <div className={styles.stat}>
              <div className={styles.statNumber}>٩٨٪</div>
              <div className={styles.statLabel}>رضا العملاء</div>
            </div>
            <div className={styles.stat}>
              <div className={styles.statNumber}>٢٤/٧</div>
              <div className={styles.statLabel}>دعم مستمر</div>
            </div>
          </div>
        </div>
      </section>

      {/* ════ Audience ════ */}
      <section className={`${styles.section} ${styles.sectionAlt}`}>
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: "56px" }}>
            <span className={styles.sectionTag}>لمن نعمل؟</span>
            <h2 className={styles.sectionTitle}>مستعدون لمساعدتك أيًا كان مجالك</h2>
          </div>

          <div className={styles.audienceGrid}>
            <Link href="/services/academic-proofreading" className={styles.audienceCard}>
              <div className={styles.audienceIcon}>{getServiceIcon("academic-proofreading")}</div>
              <h3 className={styles.audienceTitle}>باحث أكاديمي</h3>
              <p className={styles.audienceDesc}>حسّن أسلوب أطروحتك وتخطّ عقبة النشر العلمي.</p>
            </Link>
            <Link href="/services/book-editing" className={styles.audienceCard}>
              <div className={styles.audienceIcon}>{getServiceIcon("book-editing")}</div>
              <h3 className={styles.audienceTitle}>مؤلف أو ناشر</h3>
              <p className={styles.audienceDesc}>تأكد من خلو كتابك من الأخطاء قبل الطباعة.</p>
            </Link>
            <Link href="/services/corporate-writing" className={styles.audienceCard}>
              <div className={styles.audienceIcon}>{getServiceIcon("corporate-writing")}</div>
              <h3 className={styles.audienceTitle}>جهة مؤسسية</h3>
              <p className={styles.audienceDesc}>حافظ على وقار هويتك اللغوية في كل مراسلاتك.</p>
            </Link>
            <Link href="/services/student-services" className={styles.audienceCard}>
              <div className={styles.audienceIcon}>{getServiceIcon("student-services")}</div>
              <h3 className={styles.audienceTitle}>طالب جامعي</h3>
              <p className={styles.audienceDesc}>قدّم أبحاثك ومشاريعك بأفضل صياغة ممكنة.</p>
            </Link>
          </div>
        </div>
      </section>

      {/* ════ Final CTA ════ */}
      <section className={styles.finalCta}>
        <div className="container">
          <h2 className={styles.ctaTitle}>
            جاهز للارتقاء بنصك؟
          </h2>
          <p className={styles.ctaDesc}>
            اطلب عرض سعر مجاني الآن — سيتواصل معك خبيرنا اللغوي خلال ساعتين.
          </p>
          <a href="https://wa.me/967770334448?text=%D9%85%D8%B1%D8%AD%D8%A8%D9%8B%D8%A7%D8%8C%20%D8%A3%D9%88%D8%AF%20%D8%A7%D9%84%D8%A7%D8%B3%D8%AA%D9%81%D8%B3%D8%A7%D8%B1%20%D8%B9%D9%86%20%D8%AE%D8%AF%D9%85%D8%A7%D8%AA%D9%83%D9%85%20%D8%A7%D9%84%D9%84%D8%BA%D9%88%D9%8A%D8%A9" target="_blank" rel="noopener noreferrer" className="btn btn-primary">
            ابدأ الآن مجانًا
          </a>
        </div>
      </section>
    </div>
  );
}
