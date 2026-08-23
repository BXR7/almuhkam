"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  FileText,
  Briefcase,
  Inbox,
  Settings,
  ExternalLink,
  ShieldCheck,
} from "lucide-react";
import styles from "@/styles/admin.module.css";

const navItems = [
  {
    label: "لوحة التحكم",
    href: "/admin",
    icon: LayoutDashboard,
    exact: true,
  },
  {
    label: "المدونة والمقالات",
    href: "/admin/blog",
    icon: FileText,
  },
  {
    label: "نماذج الأعمال",
    href: "/admin/portfolio",
    icon: Briefcase,
  },
  {
    label: "طلبات العملاء",
    href: "/admin/inquiries",
    icon: Inbox,
  },
  {
    label: "الإعدادات العامة",
    href: "/admin/settings",
    icon: Settings,
  },
];

export default function Sidebar({ user, pendingInquiriesCount = 0 }) {
  const pathname = usePathname();

  return (
    <aside className={styles.sidebar}>
      {/* Brand Header */}
      <div className={styles.sidebarHeader}>
        <Link href="/admin" className={styles.brandLogo}>
          <div style={{ width: "32px", height: "32px", borderRadius: "8px", background: "#b1843e", display: "grid", placeItems: "center", color: "#fff" }}>
            <ShieldCheck size={20} />
          </div>
          <div>
            <div className={styles.brandTitle}>الجلال</div>
          </div>
        </Link>
        <span className={styles.brandBadge}>لوحة الإدارة</span>
      </div>

      {/* Nav Menu */}
      <nav className={styles.sidebarNav}>
        <div className={styles.navSectionLabel}>القائمة الرئيسية</div>

        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = item.exact
            ? pathname === item.href
            : pathname.startsWith(item.href);

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`${styles.navItem} ${isActive ? styles.activeNavItem : ""}`}
            >
              <Icon size={18} />
              <span>{item.label}</span>
              {item.href === "/admin/inquiries" && pendingInquiriesCount > 0 && (
                <span className={styles.navItemBadge}>{pendingInquiriesCount}</span>
              )}
            </Link>
          );
        })}

        <div className={styles.navSectionLabel} style={{ marginTop: "16px" }}>روابط خارجية</div>
        <Link href="/" target="_blank" className={styles.navItem}>
          <ExternalLink size={18} />
          <span>زيارة الموقع العام</span>
        </Link>
      </nav>

      {/* User Footer */}
      <div className={styles.sidebarFooter}>
        <div className={styles.userInfo}>
          <div className={styles.userAvatar}>
            {user?.name ? user.name[0] : "م"}
          </div>
          <div>
            <div className={styles.userName}>{user?.name || "مدير المنصة"}</div>
            <div className={styles.userRole}>{user?.email || "admin@aljalal.com"}</div>
          </div>
        </div>
      </div>
    </aside>
  );
}
