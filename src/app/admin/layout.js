import { getSession } from "@/lib/auth";
import prisma from "@/lib/prisma";
import Sidebar from "@/components/admin/Sidebar";
import AdminHeader from "@/components/admin/Header";
import styles from "@/styles/admin.module.css";

export const metadata = {
  title: "لوحة التحكم الإدارية | منصة الجلال",
  description: "لوحة إدارة محتوى وطلبات منصة الجلال للتدقيق اللغوي والتحرير الأكاديمي",
};

export default async function AdminLayout({ children }) {
  const session = await getSession();

  // If unauthenticated (e.g. on login page), render children directly without dashboard shell
  if (!session) {
    return <>{children}</>;
  }

  // Count pending (NEW) inquiries for the sidebar badge
  let pendingCount = 0;
  try {
    pendingCount = await prisma.inquiry.count({
      where: { status: "NEW" },
    });
  } catch (err) {
    // If DB is not ready yet
    pendingCount = 0;
  }

  return (
    <div className={styles.adminLayout}>
      <Sidebar user={session} pendingInquiriesCount={pendingCount} />
      <div className={styles.mainWrapper}>
        <AdminHeader user={session} />
        <main className={styles.pageBody}>{children}</main>
      </div>
    </div>
  );
}
