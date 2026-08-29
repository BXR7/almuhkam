import Link from "next/link";
import styles from "@/styles/pages.module.css";

export const metadata = {
  title: "من نحن — الجلال للتدقيق اللغوي المُحْكَم",
  description: "مُتخصصون في التدقيق والتحرير اللغوي وكتابة المحتوى الإبداعي، والتسويقي، والمعرفي وفق أعلى معايير الجودة.",
};

export default function About() {
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
              <li className={styles.breadcrumbActive}>من نحن</li>
            </ul>
            <h1 className={styles.pageTitle}>الجلال — التدقيق اللغوي المُحْكَم</h1>
            <p className={styles.pageDesc}>
              الدقة في اللغة... والإحكام في الصياغة. نمنح النصوص قوة لغوية، ووضوحًا فكريًا، وتأثيرًا يُحدث الفرق.
            </p>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className={styles.section}>
        <div className="container">
          <div className={styles.contentWrapper}>
            <h2>نبذة عن المنصة</h2>
            <p>
              نحن في **منصة الجلال للتدقيق اللغوي المُحْكَم** متخصِّصون في التَّدْقِيق والتَّحْرِير اللُّغَوِيّ وكتابة المحتوى الإبداعي، والتسويقي، والمعرفي وفق أعلى معايير الجودة. نمنح النصوص قوة لغوية، ووضوحًا فكريًا، وتأثيرًا يُحدث الفرق الإيجابي لدى القراء والجهات الأكاديمية والمهنية.
            </p>
            <p>
              نعتز بخبرتنا المتخصصة؛ حيث نجمع بين **الدقة اللُّغَوِيّة**، و**الوعي الأسلوبي**، و**فهم السياق**؛ لتقديم أعمال تتسم بالجودة والاحترافية، وتلبِّي أعلى معايير التحرير اللغوي في العالم العربي.
            </p>

            <h2>مجالات عملنا الرئيسة</h2>
            <p>
              مجالات عملنا عديدة ومتنوعة؛ لأن اللغة المكتوبة وسيلة اتصال جوهرية بين الناس من خلال المواقع الإلكترونية أو المطبوعات الورقية أو الأبحاث العلمية. نقدِّم خدماتنا في أربعة مجالات رئيسة:
            </p>
            <ul className={styles.featureList}>
              <li className={styles.featureItem}>
                <span className={styles.checkIcon}>✦</span>
                <span><strong>التَّدْقِيق والتَّحْرِير اللُّغَوِيّ والتأليف:</strong> لأبحاث التخرج، ورسائل الماجستير والدكتوراه، والكُتب، والمقالات، والروايات، ومراجعة الكتب المترجمة إلى اللغة العربية في مختلف العلوم.</span>
              </li>
              <li className={styles.featureItem}>
                <span className={styles.checkIcon}>✦</span>
                <span><strong>التواصل المؤسسي:</strong> مساعدة المؤسسات على إنجاز أعمال الكتابة الوظيفية، والعلمية، والمهنية، وصناعة محتوى احترافي يلبي الأهداف التواصلية ويعبِّر عن هوية الجهة ورسالتها بوضوح ودقة.</span>
              </li>
              <li className={styles.featureItem}>
                <span className={styles.checkIcon}>✦</span>
                <span><strong>الدعاية والإعلان وشبكات التواصل الاجتماعي:</strong> تمكين عملائنا من الحصول على نصوص رصينة وجذابة تستقطب اهتمام الجمهور، وتعزِّز التفاعل، وتوصل الرسالة بفاعلية من خلال خدماتنا في الكتابة التسويقية والإبداعية.</span>
              </li>
              <li className={styles.featureItem}>
                <span className={styles.checkIcon}>✦</span>
                <span><strong>خدمات لطلبة الجامعات والباحثين:</strong> توفير خدمات التحرير والصياغة للمحتوى باللغة العربية المعاصرة والمراجعة الأكاديمية الدقيقة وضبط المراجع والتوثيق.</span>
              </li>
            </ul>

            <h2>شركاؤنا والجهات التي نخدمها</h2>
            <p>
              نقدم خدماتنا للعمـلاء مـن الأفراد والمؤسسات كافة (الحكومية، والخاصة، وغير الربحية) ومنها:
            </p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "12px", margin: "20px 0" }}>
              <div style={{ background: "var(--paper)", padding: "12px 16px", borderRadius: "8px", border: "1px solid var(--border-color)" }}>✦ دور النشر والطباعة</div>
              <div style={{ background: "var(--paper)", padding: "12px 16px", borderRadius: "8px", border: "1px solid var(--border-color)" }}>✦ مراكز الترجمة المتخصصة</div>
              <div style={{ background: "var(--paper)", padding: "12px 16px", borderRadius: "8px", border: "1px solid var(--border-color)" }}>✦ الصحف والمواقع الإلكترونية</div>
              <div style={{ background: "var(--paper)", padding: "12px 16px", borderRadius: "8px", border: "1px solid var(--border-color)" }}>✦ قنوات التلفزيون والإذاعات</div>
              <div style={{ background: "var(--paper)", padding: "12px 16px", borderRadius: "8px", border: "1px solid var(--border-color)" }}>✦ مكاتب المحاماة والاستشارات</div>
              <div style={{ background: "var(--paper)", padding: "12px 16px", borderRadius: "8px", border: "1px solid var(--border-color)" }}>✦ مكاتب التنسيق والطباعة</div>
              <div style={{ background: "var(--paper)", padding: "12px 16px", borderRadius: "8px", border: "1px solid var(--border-color)" }}>✦ شركات الدعاية والإعلان</div>
              <div style={{ background: "var(--paper)", padding: "12px 16px", borderRadius: "8px", border: "1px solid var(--border-color)" }}>✦ شركات البرمجيات والتطبيقات</div>
            </div>

            <h2>ميثاق الأمانة وأخلاقيات البحث العلمي</h2>
            <p>
              انطلاقًا من التزامنا الصارم بأخلاقيات البحث العلمي، **لا نقدِّم خدمة كتابة البحوث أو الرسائل العلمية مطلقاً**، وإنما نقتصر على التدقيق اللغوي، والتحرير، والمراجعة، والنقد الأكاديمي بما يحفظ أصالة العمل العلمي وحقوق ملكية صاحبه الفكرية.
            </p>

            <div style={{ textAlign: "center", marginTop: "50px" }}>
              <a href="https://wa.me/967770334448?text=%D9%85%D8%B1%D8%AD%D8%A8%D9%8B%D8%A7%20%D9%85%D9%86%D8%B5%D8%A9%20%D8%A7%D9%84%D8%AC%D9%84%D8%A7%D9%84%D8%8C%20%D8%A3%D9%88%D8%AF%20%D8%A7%D9%84%D8%A7%D8%B3%D8%AA%D9%81%D8%B3%D8%A7%D8%B1%20%D8%B9%D9%86%20%D8%AE%D8%AF%D9%85%D8%A7%D8%AA%20%D8%A7%D9%84%D8%AA%D8%AF%D9%82%D9%8A%D9%82%20%D8%A7%D9%84%D9%84%D8%BA%D9%88%D9%8A%20%D8%A7%D9%84%D9%85%D9%8F%D8%AD%D9%92%D9%83%D9%8E%D9%85:" target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                تواصل معنا لبدء تدقيق مشروعك
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
