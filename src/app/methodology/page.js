import Link from "next/link";
import styles from "@/styles/pages.module.css";
import homeStyles from "@/styles/home.module.css";

export const metadata = {
  title: "منهجيتنا في التدقيق — كيف نضمن دقة نصوصكم؟",
  description: "اطلع على منهجيتنا الصارمة في التدقيق والتحرير اللغوي المكونة من دورتي مراجعة وتصفية وضمان السرية والجودة.",
};

const steps = [
  { num: "١", name: "استلام المستند وفحصه", desc: "نستقبل مستنداتكم عبر النظام بصيغة Word بشكل أساسي ونقوم بتحليل عدد كلماتها والفرع العلمي التخصصي لها." },
  { num: "٢", name: "تعيين المدقق المتخصص", desc: "يتم إسناد البحث أو الكتاب للمدقق الأكثر خبرة وتخصصاً بمجال نصك العلمي أو الأدبي لضمان فهم المصطلحات الدقيقة." },
  { num: "٣", name: "التدقيق اللغوي الأول (الضبط والقواعد)", desc: "مراجعة نحوية وإملائية وصرفية شاملة، وضبط علامات الترقيم، وصياغة الفقرات وتعديل مواضع اللبس." },
  { num: "٤", name: "التدقيق الأسلوبي الثاني (التصفية والسبك)", desc: "يقوم كبير المدققين بمراجعة النص مرة ثانية لضمان جودة السبك الأسلوبي، وتماسك النبرة العلمية أو الإبداعية وسلاسة التدفق." },
  { num: "٥", name: "مراجعة التوثيق والمراجع", desc: "التأكد من مطابقة توثيق المراجع وهوامش الصفحة للنظام المطلوب (مثل APA أو شروط المجلة المستهدفة للنشر)." },
  { num: "٦", name: "التسليم في نسختين", desc: "نرسل إليكم ملفين: نسخة نظيفة ومجهزة بالكامل للتحكيم أو الطباعة، ونسخة أخرى بتتبع التغييرات لملاحظة ومراجعة كافة التعديلات." }
];

export default function Methodology() {
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
              <li className={styles.breadcrumbActive}>منهجيتنا</li>
            </ul>
            <h1 className={styles.pageTitle}>منهجيتنا الصارمة لضمان الجودة</h1>
            <p className={styles.pageDesc}>
              نحن لا نؤمن بالتصحيح العشوائي المكتفي بالتدقيق الظاهري. نعتمد منهجية علمية منظمة ومكونة من فحصين شاملين لضمان سلامة كل كلمة.
            </p>
          </div>
        </div>
      </section>

      {/* Steps List */}
      <section className={styles.section}>
        <div className="container">
          <div className={styles.contentWrapper}>
            <h2>خطوات تدقيق نصوصكم</h2>
            <div className={homeStyles.stepsGrid} style={{ marginTop: "40px", rowGap: "50px" }}>
              {steps.map((step, index) => (
                <div key={index} className={homeStyles.step}>
                  <span className={homeStyles.stepNumber}>{step.num}</span>
                  <h3 className={homeStyles.stepTitle} style={{ marginTop: "8px" }}>{step.name}</h3>
                  <p className={homeStyles.stepDesc}>{step.desc}</p>
                </div>
              ))}
            </div>

            <h2 style={{ marginTop: "60px" }}>معايير الأمان والسرية العلمية</h2>
            <p>
              نعلم تمام العلم القيمة العلمية والمادية للمخطوطات والرسائل الجامعية التي تسلمونها إلينا. نلتزم التزاماً صارماً ومثبتاً في شروط الخدمة بحماية حقوق الملكية الفكرية لبحوثكم، وحذف الملفات نهائياً من خوادمنا بعد تسليمها وحصولكم على الملاحظات. لا يتم نشر أي جزء من مستنداتكم أو استخدامه كأمثلة دون موافقة خطية صريحة.
            </p>

            <div style={{ textAlign: "center", marginTop: "50px" }}>
              <a href="https://wa.me/967770334448?text=%D9%85%D8%B1%D8%AD%D8%A8%D9%8B%D8%A7%D8%8C%20%D8%A3%D9%88%D8%AF%20%D8%A7%D9%84%D8%A7%D8%B3%D8%AA%D9%81%D8%B3%D8%A7%D8%B1%20%D8%B9%D9%86%20%D8%AE%D8%AF%D9%85%D8%A7%D8%AA%D9%83%D9%85%20%D8%A7%D9%84%D9%84%D8%BA%D9%88%D9%8A%D8%A9" target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                ابدأ بتطبيق المنهجية على نصوصك الآن
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
