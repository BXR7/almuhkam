"use client";

import { useActionState } from "react";
import { Lock, Mail, ShieldCheck, ArrowLeft } from "lucide-react";
import { loginAction } from "@/lib/actions";
import styles from "@/styles/admin.module.css";

export default function AdminLoginPage() {
  const [state, formAction, isPending] = useActionState(loginAction, null);

  return (
    <div className={styles.loginContainer}>
      <div className={styles.loginCard}>
        <div className={styles.loginHeader}>
          <div style={{ width: "48px", height: "48px", borderRadius: "12px", background: "#0d5c46", color: "#fff", display: "grid", placeItems: "center", margin: "0 auto 12px" }}>
            <ShieldCheck size={28} />
          </div>
          <div className={styles.loginLogo}>الجلال</div>
          <p className={styles.loginSubtitle}>تسجيل الدخول إلى لوحة التحكم الإدارية</p>
        </div>

        {state?.error && (
          <div className={styles.alertError}>
            <span>⚠️</span>
            <span>{state.error}</span>
          </div>
        )}

        <form action={formAction}>
          <div className={styles.formGroup}>
            <label className={styles.label} htmlFor="email">البريد الإلكتروني</label>
            <div style={{ position: "relative" }}>
              <input
                id="email"
                name="email"
                type="email"
                required
                placeholder="admin@aljalal.com"
                className={styles.input}
                style={{ paddingRight: "38px" }}
                defaultValue="admin@aljalal.com"
              />
              <Mail size={18} style={{ position: "absolute", right: "12px", top: "12px", color: "#5a6b63" }} />
            </div>
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label} htmlFor="password">كلمة المرور</label>
            <div style={{ position: "relative" }}>
              <input
                id="password"
                name="password"
                type="password"
                required
                placeholder="••••••••"
                className={styles.input}
                style={{ paddingRight: "38px" }}
              />
              <Lock size={18} style={{ position: "absolute", right: "12px", top: "12px", color: "#5a6b63" }} />
            </div>
          </div>

          <div style={{ marginTop: "24px" }}>
            <button
              type="submit"
              disabled={isPending}
              className={styles.primaryBtn}
              style={{ width: "100%", justifyContent: "center", padding: "12px" }}
            >
              {isPending ? "جاري تسجيل الدخول..." : "دخول إلى اللوحة"}
            </button>
          </div>
        </form>

        <div style={{ marginTop: "24px", textAlign: "center", borderTop: "1px solid rgba(13, 92, 70, 0.1)", paddingTop: "16px" }}>
          <a href="/" style={{ fontSize: "0.82rem", color: "#5a6b63", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: "6px" }}>
            <ArrowLeft size={14} />
            <span>العودة للموقع الرئيسي</span>
          </a>
        </div>
      </div>
    </div>
  );
}
