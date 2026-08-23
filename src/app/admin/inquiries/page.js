import prisma from "@/lib/prisma";
import InquiriesTable from "@/components/admin/InquiriesTable";
import styles from "@/styles/admin.module.css";

export const dynamic = "force-dynamic";

export default async function AdminInquiriesPage() {
  let inquiries = [];
  try {
    inquiries = await prisma.inquiry.findMany({
      orderBy: { createdAt: "desc" },
    });
  } catch (error) {
    console.error("Error loading inquiries:", error);
  }

  return (
    <div>
      <div className={styles.pageHeading}>
        <div>
          <h1 className={styles.pageTitle}>طلبات واستفسارات العملاء</h1>
          <p className={styles.pageSubtitle}>متابعة كافة الرسائل وطلبات عروض الأسعار الواردة من الموقع</p>
        </div>
      </div>

      <InquiriesTable initialInquiries={inquiries} />
    </div>
  );
}
