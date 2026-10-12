"use client";

import { useActionState } from "react";
import Link from "next/link";
import { ArrowRight, Save, FileText } from "lucide-react";
import { createPostAction } from "@/lib/actions";
import styles from "@/styles/admin.module.css";

export default function NewBlogPostPage() {
  const [state, formAction, isPending] = useActionState(createPostAction, null);

  return (
    <div>
      <div className={styles.pageHeading}>
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <Link href="/admin/blog" className={styles.secondaryBtn} style={{ padding: "8px 12px" }}>
            <ArrowRight size={16} />
          </Link>
          <div>
            <h1 className={styles.pageTitle}>كتابة مقال جديد</h1>
            <p className={styles.pageSubtitle}>أضف مقالاً جديداً إلى مدونة الجلال اللغوية</p>
          </div>
        </div>
      </div>

      {state?.error && (
        <div className={styles.alertError}>
          <span>⚠️</span>
          <span>{state.error}</span>
        </div>
      )}

      <form action={formAction} className={styles.card}>
        <div className={styles.formGrid}>
          <div className={styles.formGroup} style={{ gridColumn: "1 / -1" }}>
            <label className={styles.label} htmlFor="title">عنوان المقال *</label>
            <input
              id="title"
              name="title"
              type="text"
              required
              placeholder="مثال: أهمية التدقيق اللغوي في نشر الأبحاث العلمية"
              className={styles.input}
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label} htmlFor="tag">تصنيف المقال</label>
            <select id="tag" name="tag" className={styles.select} defaultValue="كتابة أكاديمية">
              <option value="كتابة أكاديمية">كتابة أكاديمية</option>
              <option value="أخطاء شائعة">أخطاء شائعة</option>
              <option value="نصائح للباحثين">نصائح للباحثين</option>
              <option value="قواعد اللغة">قواعد اللغة</option>
              <option value="تحرير الكتب">تحرير الكتب</option>
            </select>
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label} htmlFor="readTime">وقت القراءة المقدر</label>
            <input
              id="readTime"
              name="readTime"
              type="text"
              defaultValue="٥ دقائق"
              placeholder="مثال: ٤ دقائق"
              className={styles.input}
            />
          </div>

          <div className={styles.formGroup} style={{ gridColumn: "1 / -1" }}>
            <label className={styles.label} htmlFor="slug">الرابط المخصص (Slug) - اختياري</label>
            <input
              id="slug"
              name="slug"
              type="text"
              placeholder="يُترك فارغاً للتوليد التلقائي من العنوان"
              className={styles.input}
            />
          </div>

          <div className={styles.formGroup} style={{ gridColumn: "1 / -1" }}>
            <label className={styles.label} htmlFor="excerpt">ملخص المقال (يظهر في بطاقة المدونة و SEO) *</label>
            <textarea
              id="excerpt"
              name="excerpt"
              required
              rows={2}
              placeholder="اكتب نبذة مختصرة عن محتوى المقال تشجع القارئ على قراءته..."
              className={styles.textarea}
              style={{ minHeight: "80px" }}
            />
          </div>

          <div className={styles.formGroup} style={{ gridColumn: "1 / -1" }}>
            <label className={styles.label} htmlFor="content">محتوى المقال بالكامل *</label>
            <textarea
              id="content"
              name="content"
              required
              rows={12}
              placeholder="اكتب محتوى المقال هنا بالتفصيل. يمكنك استخدام الفقرات والنقاط..."
              className={styles.textarea}
              style={{ minHeight: "320px", fontSize: "0.95rem" }}
            />
          </div>

          <div className={styles.formGroup} style={{ gridColumn: "1 / -1" }}>
            <label style={{ display: "flex", alignItems: "center", gap: "8px", cursor: "pointer", fontWeight: "600" }}>
              <input type="checkbox" name="isPublished" value="true" defaultChecked style={{ width: "18px", height: "18px" }} />
              <span>نشر المقال مباشرة في الموقع العام</span>
            </label>
          </div>
        </div>

        <div className={styles.formActions}>
          <Link href="/admin/blog" className={styles.secondaryBtn}>
            إلغاء
          </Link>
          <button type="submit" disabled={isPending} className={styles.primaryBtn}>
            <Save size={16} />
            <span>{isPending ? "جاري الحفظ..." : "حفظ ونشر المقال"}</span>
          </button>
        </div>
      </form>
    </div>
  );
}
