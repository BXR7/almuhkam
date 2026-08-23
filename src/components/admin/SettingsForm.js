"use client";

import { useActionState } from "react";
import { Save, CheckCircle2 } from "lucide-react";
import { updateSettingsAction } from "@/lib/actions";
import styles from "@/styles/admin.module.css";

export default function SettingsForm({ initialSettings = {} }) {
  const [state, formAction, isPending] = useActionState(updateSettingsAction, null);

  return (
    <form action={formAction} className={styles.card} style={{ maxWidth: "720px" }}>
      {state?.success && (
        <div className={styles.alertSuccess} style={{ marginBottom: "24px", padding: "14px 16px", fontSize: "0.95rem" }}>
          <CheckCircle2 size={20} />
          <span>{state.message || "تم حفظ وتحديث الإعدادات بنجاح!"}</span>
        </div>
      )}

      {state?.error && (
        <div className={styles.alertError} style={{ marginBottom: "24px", padding: "14px 16px", fontSize: "0.95rem" }}>
          <span>⚠️</span>
          <span>{state.error}</span>
        </div>
      )}

      <div className={styles.formGrid}>
        <div className={styles.formGroup} style={{ gridColumn: "1 / -1" }}>
          <label className={styles.label} htmlFor="site_name">اسم المنصة والعنوان الرئيسي</label>
          <input
            id="site_name"
            name="site_name"
            type="text"
            required
            defaultValue={initialSettings["site_name"] || "الجلال — منصة التدقيق اللغوي والتحرير الأكاديمي"}
            className={styles.input}
          />
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label} htmlFor="contact_email">البريد الإلكتروني الرسمي للتواصل</label>
          <input
            id="contact_email"
            name="contact_email"
            type="email"
            required
            defaultValue={initialSettings["contact_email"] || "jalal611@gmail.com"}
            className={styles.input}
            dir="ltr"
          />
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label} htmlFor="contact_phone">رقم الهاتف الظاهر في الموقع</label>
          <input
            id="contact_phone"
            name="contact_phone"
            type="text"
            required
            defaultValue={initialSettings["contact_phone"] || "+967 770 334 448"}
            className={styles.input}
            dir="ltr"
          />
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label} htmlFor="whatsapp_number">رقم الواتساب للزر العائم والمراسلة (أرقام فقط بدون +)</label>
          <input
            id="whatsapp_number"
            name="whatsapp_number"
            type="text"
            required
            defaultValue={initialSettings["whatsapp_number"] || "967770334448"}
            className={styles.input}
            dir="ltr"
          />
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label} htmlFor="address">العنوان والمقر</label>
          <input
            id="address"
            name="address"
            type="text"
            required
            defaultValue={initialSettings["address"] || "الجمهورية اليمنية – صنعاء"}
            className={styles.input}
          />
        </div>
      </div>

      <div className={styles.formActions}>
        <button type="submit" disabled={isPending} className={styles.primaryBtn}>
          <Save size={16} />
          <span>{isPending ? "جاري الحفظ والتحديث..." : "حفظ الإعدادات"}</span>
        </button>
      </div>
    </form>
  );
}
