"use client";

import { useState, useTransition } from "react";
import { MessageSquare, Mail, Trash2, CheckCircle2, AlertCircle } from "lucide-react";
import { updateInquiryStatusAction, deleteInquiryAction } from "@/lib/actions";
import styles from "@/styles/admin.module.css";

export default function InquiriesTable({ initialInquiries = [] }) {
  const [inquiries, setInquiries] = useState(initialInquiries);
  const [isPending, startTransition] = useTransition();
  const [message, setMessage] = useState(null);

  const handleStatusChange = (id, newStatus) => {
    startTransition(async () => {
      try {
        const res = await updateInquiryStatusAction(id, newStatus);
        if (res?.success) {
          setInquiries((prev) =>
            prev.map((item) => (item.id === id ? { ...item, status: newStatus } : item))
          );
          setMessage({ type: "success", text: "تم تحديث حالة الطلب بنجاح!" });
          setTimeout(() => setMessage(null), 3000);
        } else {
          setMessage({ type: "error", text: res?.error || "فشل تحديث الحالة." });
        }
      } catch (err) {
        console.error("Status update error:", err);
      }
    });
  };

  const handleDelete = (id, clientName) => {
    if (!window.confirm(`هل أنت متأكد من حذف طلب العميل: "${clientName}"؟`)) {
      return;
    }

    startTransition(async () => {
      try {
        const res = await deleteInquiryAction(id);
        if (res?.success) {
          setInquiries((prev) => prev.filter((item) => item.id !== id));
          setMessage({ type: "success", text: "تم حذف الطلب بنجاح." });
          setTimeout(() => setMessage(null), 3000);
        } else {
          setMessage({ type: "error", text: res?.error || "فشل حذف الطلب." });
        }
      } catch (err) {
        console.error("Delete inquiry error:", err);
      }
    });
  };

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

  if (inquiries.length === 0) {
    return (
      <div className={styles.card} style={{ textAlign: "center", padding: "48px 24px", color: "#5a6b63" }}>
        <Mail size={48} style={{ opacity: 0.3, marginBottom: "12px" }} />
        <p style={{ fontSize: "1.05rem", fontWeight: "500" }}>لا توجد طلبات أو رسائل واردة حتى الآن.</p>
        <p style={{ fontSize: "0.85rem", opacity: "0.8", marginTop: "4px" }}>
          ستظهر هنا تلقائياً كافة الرسائل والطلبات المرسلة من صفحة اتصل بنا فور وصولها.
        </p>
      </div>
    );
  }

  return (
    <div className={styles.card}>
      {message && (
        <div
          className={message.type === "success" ? styles.alertSuccess : styles.alertError}
          style={{ marginBottom: "16px", padding: "10px 14px", fontSize: "0.88rem" }}
        >
          {message.type === "success" ? <CheckCircle2 size={16} /> : <AlertCircle size={16} />}
          <span>{message.text}</span>
        </div>
      )}

      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>بيانات العميل</th>
              <th>الخدمة المطلوبة</th>
              <th>نص الرسالة / الطلب</th>
              <th>تاريخ الإرسال</th>
              <th>الحالة الحالية</th>
              <th>تغيير الحالة</th>
              <th>التواصل المباشر</th>
              <th>إجراء</th>
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
                    <div style={{ fontSize: "0.78rem", color: "#0d5c46", direction: "ltr", textAlign: "right", fontWeight: "600" }}>
                      {inq.phone}
                    </div>
                  )}
                </td>
                <td>
                  <span className={`${styles.badge} ${styles.badgeNeutral}`}>{inq.service}</span>
                </td>
                <td style={{ maxWidth: "320px" }}>
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
                  <select
                    value={inq.status}
                    disabled={isPending}
                    onChange={(e) => handleStatusChange(inq.id, e.target.value)}
                    className={styles.select}
                    style={{ padding: "4px 8px", fontSize: "0.78rem", minWidth: "120px" }}
                  >
                    <option value="NEW">طلب جديد</option>
                    <option value="IN_REVIEW">قيد المراجعة</option>
                    <option value="QUOTED">تم تقديم السعر</option>
                    <option value="COMPLETED">مكتمل</option>
                  </select>
                </td>
                <td>
                  <div style={{ display: "flex", gap: "6px" }}>
                    {inq.phone ? (
                      <a
                        href={`https://wa.me/${inq.phone.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(`مرحباً أستاذ ${inq.name}، معك منصة الجلال للتدقيق اللغوي بخصوص استفسارك عن (${inq.service}):`)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.primaryBtn}
                        style={{ padding: "6px 10px", fontSize: "0.78rem", background: "#25D366" }}
                        title="فتح محادثة واتساب فورية"
                      >
                        <MessageSquare size={14} />
                        <span>واتساب</span>
                      </a>
                    ) : (
                      <a
                        href={`mailto:${inq.email}?subject=${encodeURIComponent(`منصة الجلال للتدقيق اللغوي — الرد على استفساركم: ${inq.service}`)}`}
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
                  <button
                    type="button"
                    disabled={isPending}
                    onClick={() => handleDelete(inq.id, inq.name)}
                    className={styles.dangerBtn}
                    style={{ padding: "6px 8px" }}
                    title="حذف الطلب"
                  >
                    <Trash2 size={14} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
