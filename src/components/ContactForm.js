"use client";

import { useActionState } from "react";
import { submitContactInquiryAction } from "@/lib/actions";
import styles from "@/styles/pages.module.css";

export default function ContactForm() {
  const [state, formAction, isPending] = useActionState(submitContactInquiryAction, null);

  if (state?.success) {
    return (
      <div style={{ textAlign: "center", padding: "40px 20px" }}>
        <span style={{ fontSize: "3rem", color: "var(--olive)" }}>✓</span>
        <h3 style={{ fontSize: "1.25rem", color: "var(--olive)", marginTop: "16px", marginBottom: "8px", fontWeight: "700" }}>
          تم استلام طلبك بنجاح!
        </h3>
        <p style={{ fontSize: "0.95rem", color: "var(--text-secondary)", maxWidth: "450px", margin: "0 auto", lineHeight: "1.8" }}>
          نشكرك على تواصلك مع منصة الجلال. تم تسجيل طلبك وسيقوم خبيرنا اللغوي بمراجعة التفاصيل والتواصل معك عبر البريد الإلكتروني أو واتساب خلال ساعتين.
        </p>
      </div>
    );
  }

  return (
    <form action={formAction}>
      {state?.error && (
        <div style={{ background: "#fef2f2", border: "1px solid #fecaca", color: "#991b1b", padding: "10px 14px", borderRadius: "8px", fontSize: "0.85rem", marginBottom: "18px" }}>
          ⚠️ {state.error}
        </div>
      )}

      <div className={styles.formGroup}>
        <label className={styles.formLabel}>الاسم الكامل *</label>
        <input name="name" type="text" className={styles.formInput} placeholder="مثال: أحمد عبد الله" required />
      </div>

      <div className={styles.formGroup}>
        <label className={styles.formLabel}>البريد الإلكتروني *</label>
        <input name="email" type="email" className={styles.formInput} placeholder="name@example.com" required dir="ltr" />
      </div>

      <div className={styles.formGroup}>
        <label className={styles.formLabel}>رقم الجوال أو واتساب (اختياري)</label>
        <input name="phone" type="tel" className={styles.formInput} placeholder="+966 50 000 0000" dir="ltr" />
      </div>

      <div className={styles.formGroup}>
        <label className={styles.formLabel}>نوع الخدمة المطلوبة</label>
        <select name="service" className={styles.formSelect} defaultValue="تدقيق الأبحاث والرسائل الجامعية">
          <option value="تدقيق الأبحاث والرسائل الجامعية">تدقيق الأبحاث والرسائل الجامعية</option>
          <option value="تحرير الكتب والمقالات">تحرير الكتب والمقالات</option>
          <option value="الكتابة المؤسسية">الكتابة المؤسسية</option>
          <option value="المحتوى التسويقي">المحتوى التسويقي</option>
          <option value="التفريغ الصوتي">التفريغ الصوتي</option>
          <option value="خدمات الطلاب">خدمات الطلاب</option>
          <option value="المراجعة والنقد الأكاديمي">المراجعة والنقد الأكاديمي</option>
        </select>
      </div>

      <div className={styles.formGroup}>
        <label className={styles.formLabel}>تفاصيل الطلب أو نبذة عن المستند *</label>
        <textarea name="message" className={styles.formTextarea} placeholder="اكتب تفاصيل طلبك، عدد الكلمات التقريبي، والموعد المطلوب للتسليم..." rows="4" required></textarea>
      </div>

      <button type="submit" className="btn btn-primary" style={{ width: "100%" }} disabled={isPending}>
        {isPending ? "جاري إرسال الطلب..." : "إرسال طلب التدقيق"}
      </button>
    </form>
  );
}
