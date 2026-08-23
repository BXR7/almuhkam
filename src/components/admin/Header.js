"use client";

import Link from "next/link";
import { LogOut, Globe, Plus } from "lucide-react";
import { logoutAction } from "@/lib/actions";
import styles from "@/styles/admin.module.css";

export default function AdminHeader({ user }) {
  return (
    <header className={styles.topHeader}>
      <div className={styles.headerLeft}>
        <div style={{ fontSize: "0.95rem", fontWeight: "600", color: "#0d5c46" }}>
          مرحباً بك، <span style={{ color: "#b1843e" }}>{user?.name || "المدير"}</span>
        </div>
      </div>

      <div className={styles.headerRight}>
        <Link href="/" target="_blank" className={styles.viewSiteBtn}>
          <Globe size={16} />
          <span>الموقع المباشر</span>
        </Link>

        <form action={logoutAction}>
          <button type="submit" className={styles.logoutButton} title="تسجيل الخروج">
            <LogOut size={16} />
            <span>خروج</span>
          </button>
        </form>
      </div>
    </header>
  );
}
