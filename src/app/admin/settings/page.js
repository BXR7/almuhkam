import prisma from "@/lib/prisma";
import SettingsForm from "@/components/admin/SettingsForm";
import styles from "@/styles/admin.module.css";

export const dynamic = "force-dynamic";

export default async function AdminSettingsPage() {
  let settings = {};
  try {
    const settingsRecords = await prisma.setting.findMany();
    settings = settingsRecords.reduce((acc, curr) => {
      acc[curr.key] = curr.value;
      return acc;
    }, {});
  } catch (err) {
    console.error("Error loading settings:", err);
  }

  return (
    <div>
      <div className={styles.pageHeading}>
        <div>
          <h1 className={styles.pageTitle}>الإعدادات العامة</h1>
          <p className={styles.pageSubtitle}>تعديل معلومات التواصل والبيانات الأساسية للمنصة</p>
        </div>
      </div>

      <SettingsForm initialSettings={settings} />
    </div>
  );
}
