import { MessageSquare, Mail, Phone, Trash2, CheckCircle2, Clock, Check } from "lucide-react";
import prisma from "@/lib/prisma";
import { updateInquiryStatusAction, deleteInquiryAction } from "@/lib/actions";
import styles from "@/styles/admin.module.css";

export default async function AdminInquiriesPage() {
  const inquiries = await prisma.inquiry.findMany({
    orderBy: { createdAt: "desc" },
  });

  const getStatusBadge = (status) => {
    switch (status) {
      case "NEW":
        return <span className={`${styles.badge} ${styles.badgeWarning}`}>طلب جديد</span>;
      case "IN_REVIEW":
        return <span className={`${styles.badge} ${styles.badgeInfo}`}>قيد المراجعة</span>;
      case "QUOTED":
        return <span className={`${styles.badge} ${styles.badgeSuccess}`}>تم تقديم السعر</span>;
      case "COMPLETED":
        return <span className={`${styles.badge} ${styles.badgeSuccess}`}>مكتمل</span>;
      default:
        return <span className={`${styles.badge} ${styles.badgeNeutral}`}>{status}</span>;
    }
  };

  return (
    <div>
      <div className={styles.pageHeading}>
        <div>
          <h1 className={styles.pageTitle}>طلبات واستفسارات العملاء</h1>
          <p className={styles.pageSubtitle}>متابعة كافة الرسائل وطلبات عروض الأسعار الواردة من الموقع</p>
        </div>
      </div>

      <div className={styles.card}>
        {inquiries.length === 0 ? (
          <div style={{ textAlign: "center", padding: "40px", color: "#5a6b63" }}>
            <Mail size={48} style={{ opacity: 0.3, marginBottom: "12px" }} />
            <p>لا توجد طلبات أو رسائل واردة حتى الآن.</p>
          </div>
        ) : (
          <div className={styles.tableWrapper}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>بيانات العميل</th>
                  <th>الخدمة المطلوبة</th>
                  <th>نص الرسالة / الطلب</th>
                  <th>تاريخ الإرسال</th>
                  <th>الحالة</th>
                  <th>تغيير الحالة</th>
                  <th>التواصل السريع</th>
                  <th>حذف</th>
                </tr>
              </thead>
              <tbody>
                {inquiries.map((inq) => (
                  <tr key={inq.id}>
                    <td>
                      <strong style={{ fontSize: "0.95rem" }}>{inq.name}</strong>
                      <div style={{ fontSize: "0.78rem", color: "#5a6b63", direction: "ltr", textAlign: "right" }}>
                        {inq.email}
                      </div>
                      {inq.phone && (
                        <div style={{ fontSize: "0.78rem", color: "#0d5c46", direction: "ltr", textAlign: "right" }}>
                          {inq.phone}
                        </div>
                      )}
                    </td>
                    <td>
                      <span className={`${styles.badge} ${styles.badgeNeutral}`}>{inq.service}</span>
                    </td>
                    <td style={{ maxWidth: "300px" }}>
                      <p style={{ margin: 0, fontSize: "0.85rem", color: "#1a1f1c", lineHeight: "1.6", whiteSpace: "pre-wrap" }}>
                        {inq.message}
                      </p>
                    </td>
                    <td style={{ fontSize: "0.8rem", color: "#5a6b63", whiteSpace: "nowrap" }}>
                      {new Date(inq.createdAt).toLocaleDateString("ar-SA", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </td>
                    <td>{getStatusBadge(inq.status)}</td>
                    <td>
                      <form
                        action={async (formData) => {
                          "use server";
                          const newStatus = formData.get("status")?.toString();
                          if (newStatus) {
                            await updateInquiryStatusAction(inq.id, newStatus);
                          }
                        }}
                      >
                        <select
                          name="status"
                          defaultValue={inq.status}
                          className={styles.select}
                          style={{ padding: "4px 8px", fontSize: "0.78rem", minWidth: "120px" }}
                          onChange={(e) => e.target.form.requestSubmit()}
                        >
                          <option value="NEW">طلب جديد</option>
                          <option value="IN_REVIEW">قيد المراجعة</option>
                          <option value="QUOTED">تم تقديم السعر</option>
                          <option value="COMPLETED">مكتمل</option>
                        </select>
                      </form>
                    </td>
                    <td>
                      <div style={{ display: "flex", gap: "6px" }}>
                        {inq.phone ? (
                          <a
                            href={`https://wa.me/${inq.phone.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(`مرحباً أستاذ ${inq.name}، معك منصة الجلال للتدقيق اللغوي بخصوص طلبك (${inq.service}):`)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={styles.primaryBtn}
                            style={{ padding: "6px 10px", fontSize: "0.78rem", background: "#25D366" }}
                            title="فتح محادثة واتساب"
                          >
                            <MessageSquare size={14} />
                            <span>واتساب</span>
                          </a>
                        ) : (
                          <a
                            href={`mailto:${inq.email}?subject=${encodeURIComponent(`منصة الجلال للتدقيق اللغوي — الرد على طلبكم: ${inq.service}`)}`}
                            className={styles.secondaryBtn}
                            style={{ padding: "6px 10px", fontSize: "0.78rem" }}
                            title="إرسال بريد إلكتروني"
                          >
                            <Mail size={14} />
                            <span>بريد</span>
                          </a>
                        )}
                      </div>
                    </td>
                    <td>
                      <form
                        action={async () => {
                          "use server";
                          await deleteInquiryAction(inq.id);
                        }}
                      >
                        <button
                          type="submit"
                          className={styles.dangerBtn}
                          style={{ padding: "6px 8px" }}
                          title="حذف الطلب"
                        >
                          <Trash2 size={14} />
                        </button>
                      </form>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
