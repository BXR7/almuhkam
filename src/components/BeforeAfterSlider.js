"use client";

import { useState } from "react";
import styles from "@/styles/slider.module.css";

export default function BeforeAfterSlider() {
  const [mode, setMode] = useState("after"); // "before" or "after"

  return (
    <div className={styles.sliderContainer}>
      <div className={styles.sliderCard}>
        {/* Header */}
        <div className={styles.sliderHeader}>
          <span className={styles.title}>
            <svg viewBox="0 0 24 24" width="20" height="20" stroke="var(--copper)" strokeWidth="1.75" fill="none" strokeLinecap="round" strokeLinejoin="round" style={{ marginLeft: "8px" }}>
              <path d="M12 20h9M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z" />
            </svg>
            نموذج واقعي من أعمالنا
          </span>
          <div className={styles.tabs}>
            <button 
              className={`${styles.tab} ${mode === "before" ? styles.activeTabBefore : ""}`}
              onClick={() => setMode("before")}
            >
              قبل التدقيق
            </button>
            <button 
              className={`${styles.tab} ${mode === "after" ? styles.activeTabAfter : ""}`}
              onClick={() => setMode("after")}
            >
              بعد التدقيق
            </button>
          </div>
        </div>

        {/* Content */}
        <div className={styles.content}>
          {mode === "before" ? (
            <p className={styles.textOriginal}>
              إنَّ هذا البحث يهدف <span className={styles.errorWord} title="خطأ إملائي: يجب كتابة همزة القطع">الى</span> دراسة الأثر الذي تتركه المناهج الحديثة، <span className={styles.errorWord} title="خطأ تركيب أسلوبي: إنَّ تكسر همزتها بعد حيث">حيث أنَّ</span> النتائج قد <span className={styles.errorWord} title="خطأ إملائي: الهمزة المتوسطة ترسم على السطر لأنها مفتوحة وما قبلها ألف">جائت</span> لتؤكد <span className={styles.errorWord} title="خطأ في تعدية الفعل: الفعل أثّر يتعدى بحرف الجر (في) وليس (على)">تأثيرها على</span> مستوى تحصيل الطلاب العلمي والعملي.
            </p>
          ) : (
            <p className={styles.textCorrected}>
              إنَّ هذا البحث يهدف <span className={styles.correctedWord}>إلى</span> دراسة الأثر الذي تتركه المناهج الحديثة، <span className={styles.correctedWord}>حيث إنَّ</span> النتائج قد <span className={styles.correctedWord}>جاءت</span> لتؤكد <span className={styles.correctedWord}>تأثيرها في</span> مستوى تحصيل الطلاب العلمي والعملي.
            </p>
          )}
        </div>

        {/* Legend */}
        <div className={styles.legend}>
          <div className={styles.legendItem}>
            <span className={styles.dotOriginal}></span>
            <span>أخطاء لغوية شائعة</span>
          </div>
          <div className={styles.legendItem}>
            <span className={styles.dotCorrected}></span>
            <span>تصويب لغوي دقيق</span>
          </div>
        </div>
      </div>
    </div>
  );
}
