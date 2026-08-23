"use client";

import { useState } from "react";
import Link from "next/link";
import styles from "@/styles/pages.module.css";

const faqs = [
  {
    q: "ما الفرق بين التدقيق اللغوي والتحرير الأسلوبي؟",
    a: "التدقيق اللغوي يركز على تصحيح الأخطاء المباشرة مثل النحو، والإملاء، وعلامات الترقيم، وضبط حركات الحروف. أما التحرير الأسلوبي فيتعدى ذلك إلى إعادة صياغة الجمل الركيكة، وإزالة الحشو، وتحسين انسيابية الأفكار ونبرة النص العامة مع الحفاظ التام على جوهر فكرتك الأساسية."
  },
  {
    q: "كيف يتم تحديد سعر الخدمة لمستندي؟",
    a: "يتم تحديد السعر بناءً على ثلاثة معايير رئيسية: عدد كلمات المستند (تحسب بمعدل ٢٥٠ كلمة للصفحة)، ونوع الخدمة المطلوبة (تدقيق بسيط للطلاب أم تحرير أسلوبي وتنسيق مراجع أكاديمية)، ودرجة الاستعجال للموعد المحدد للتسليم."
  },
  {
    q: "هل نصوصي وأبحاثي آمنة وسرية لديكم؟",
    a: "نعم، نلتزم التزاماً مطلقاً بالسرية التامة للبيانات وحماية حقوق الملكية الفكرية لبحوثكم. نستخدم أنظمة تخزين مشفرة لحفظ المستندات، ولا نشاركها مع أي جهة، كما نقوم بمسح الملفات نهائياً من خوادمنا بعد تسليم العمل بـ ٣٠ يوماً."
  },
  {
    q: "هل تقدمون خدمات كتابة الأبحاث أو الأطروحات الجاهزة؟",
    a: "لا نقوم مطلقاً بكتابة الأبحاث أو الرسائل الجامعية أو الواجبات نيابة عن الطلاب. دورنا يقتصر على التدقيق والتحرير والمراجعة المنهجية لمسوداتكم الخاصة لدعم النزاهة والأمانة العلمية الأكاديمية."
  },
  {
    q: "ما هي صيغ الملفات التي تقبلونها للتدقيق؟",
    a: "نفضل استلام الملفات بصيغة Microsoft Word (.docx) لأنها تتيح لنا تتبع التغييرات (Track Changes) بدقة لتستطيع مراجعة كافة التعديلات، ونقبل كذلك ملفات PDF ولكن قد يصعب تتبع التغييرات عليها مباشرة."
  },
  {
    q: "كم يستغرق تدقيق رسالة ماجستير أو دكتوراه كاملة؟",
    a: "المستندات المتوسطة (٢0 - ٥0 صفحة) تستغرق عادة من ٣ إلى ٥ أيام عمل. لدينا كذلك خدمة التدقيق السريع للطلبات الطارئة لتسليم الملفات خلال ٢٤ إلى ٤٨ ساعة بأسعار مخصصة."
  }
];

export default function FAQ() {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

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
              <li className={styles.breadcrumbActive}>الأسئلة الشائعة</li>
            </ul>
            <h1 className={styles.pageTitle}>الأسئلة الشائعة</h1>
            <p className={styles.pageDesc}>
              إجابات واضحة ومباشرة عن كافة الأسئلة المتعلقة بأسعار الخدمات، منهجية العمل، معايير السرية الفكرية والالتزام الأخلاقي لمنصة الجلال.
            </p>
          </div>
        </div>
      </section>

      {/* Accordion List */}
      <section className={styles.section}>
        <div className="container" style={{ maxWidth: "800px" }}>
          <div className={styles.faqAccordion}>
            {faqs.map((faq, index) => (
              <div key={index} className={styles.faqItem}>
                <button 
                  className={styles.faqQuestion} 
                  onClick={() => toggleFAQ(index)}
                  aria-expanded={activeIndex === index}
                >
                  <span>{faq.q}</span>
                  <span style={{ fontSize: "0.8rem", transform: activeIndex === index ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.2s" }}>▼</span>
                </button>
                {activeIndex === index && (
                  <div className={styles.faqAnswer}>
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>

          <div style={{ textAlign: "center", marginTop: "50px" }}>
            <p style={{ color: "var(--text-secondary)", marginBottom: "20px" }}>هل لديك سؤال آخر لم نجيب عليه هنا؟</p>
            <Link href="/contact" className="btn btn-secondary">تواصل معنا مباشرة</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
