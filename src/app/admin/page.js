import Link from "next/link";
import { FileText, Briefcase, Inbox, Plus, ArrowLeft, Clock, Phone, MessageSquare } from "lucide-react";
import prisma from "@/lib/prisma";
import styles from "@/styles/admin.module.css";

export default async function AdminDashboardOverview() {
  let postsCount = 0;
  let projectsCount = 0;
  let inquiriesCount = 0;
  let newInquiriesCount = 0;
  let recentInquiries = [];
  let recentPosts = [];

  try {
    [postsCount, projectsCount, inquiriesCount, newInquiriesCount, recentInquiries, recentPosts] =
      await Promise.all([
        prisma.post.count(),
        prisma.project.count(),
        prisma.inquiry.count(),
        prisma.inquiry.count({ where: { status: "NEW" } }),
        prisma.inquiry.findMany({
          take: 5,
          orderBy: { createdAt: "desc" },
        }),
        prisma.post.findMany({
          take: 3,
          orderBy: { createdAt: "desc" },
        }),
      ]);
  } catch (error) {
    console.error("Dashboard data fetch error:", error);
  }

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
      {/* Heading */}
      <div className={styles.pageHeading}>
        <div>
          <h1 className={styles.pageTitle}>لوحة التحكم العامة</h1>
          <p className={styles.pageSubtitle}>نظرة شاملة على نشاط المنصة، المقالات، وطلبات العملاء الواردة</p>
        </div>

        <div style={{ display: "flex", gap: "10px" }}>
          <Link href="/admin/blog/new" className={styles.primaryBtn}>
            <Plus size={16} />
            <span>مقال جديد</span>
          </Link>
          <Link href="/admin/portfolio/new" className={styles.secondaryBtn}>
            <Plus size={16} />
            <span>نموذج عمل</span>
          </Link>
        </div>
      </div>

      {/* Stats Cards */}
      <div className={styles.statsGrid}>
        <div className={styles.statCard}>
          <div className={styles.statIconWrap}>
            <Inbox size={26} />
          </div>
          <div className={styles.statInfo}>
            <div className={styles.statNumber}>{inquiriesCount}</div>
            <div className={styles.statLabel}>إجمالي طلبات التواصل</div>
          </div>
        </div>

        <div className={styles.statCard}>
          <div className={`${styles.statIconWrap} ${styles.statIconWrapCopper}`}>
            <Clock size={26} />
          </div>
          <div className={styles.statInfo}>
            <div className={styles.statNumber} style={{ color: "#b1843e" }}>{newInquiriesCount}</div>
            <div className={styles.statLabel}>طلبات جديدة بانتظار الرد</div>
          </div>
        </div>

        <div className={styles.statCard}>
          <div className={styles.statIconWrap}>
            <FileText size={26} />
          </div>
          <div className={styles.statInfo}>
            <div className={styles.statNumber}>{postsCount}</div>
            <div className={styles.statLabel}>مقالات المدونة</div>
          </div>
        </div>

        <div className={styles.statCard}>
          <div className={`${styles.statIconWrap} ${styles.statIconWrapCopper}`}>
            <Briefcase size={26} />
          </div>
          <div className={styles.statInfo}>
            <div className={styles.statNumber} style={{ color: "#b1843e" }}>{projectsCount}</div>
            <div className={styles.statLabel}>نماذج الأعمال المعروضة</div>
          </div>
        </div>
      </div>

      {/* Recent Inquiries Table */}
      <div className={styles.card}>
        <div className={styles.cardHeader}>
          <h2 className={styles.cardTitle}>أحدث طلبات واستفسارات العملاء</h2>
          <Link href="/admin/inquiries" className={styles.secondaryBtn} style={{ padding: "6px 14px", fontSize: "0.8rem" }}>
            <span>عرض كل الطلبات</span>
            <ArrowLeft size={14} />
          </Link>
        </div>

        {recentInquiries.length === 0 ? (
          <div style={{ textAlign: "center", padding: "40px", color: "#5a6b63" }}>
            <Inbox size={40} style={{ opacity: 0.3, marginBottom: "8px" }} />
            <p>لا توجد طلبات واردة حتى الآن.</p>
          </div>
        ) : (
          <div className={styles.tableWrapper}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>العميل</th>
                  <th>الخدمة المطلوبة</th>
                  <th>الرسالة / النبذة</th>
                  <th>التاريخ</th>
                  <th>الحالة</th>
                  <th>الإجراء</th>
                </tr>
              </thead>
              <tbody>
                {recentInquiries.map((inq) => (
                  <tr key={inq.id}>
                    <td>
                      <strong>{inq.name}</strong>
                      <div style={{ fontSize: "0.75rem", color: "#5a6b63", direction: "ltr", textAlign: "right" }}>{inq.email}</div>
                    </td>
                    <td>
                      <span className={`${styles.badge} ${styles.badgeNeutral}`}>{inq.service}</span>
                    </td>
                    <td style={{ maxWidth: "260px" }}>
                      <p style={{ margin: 0, fontSize: "0.82rem", color: "#5a6b63", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                        {inq.message}
                      </p>
                    </td>
                    <td style={{ fontSize: "0.8rem", color: "#5a6b63", whiteSpace: "nowrap" }}>
                      {new Date(inq.createdAt).toLocaleDateString("ar-SA")}
                    </td>
                    <td>{getStatusBadge(inq.status)}</td>
                    <td>
                      <div style={{ display: "flex", gap: "6px" }}>
                        {inq.phone && (
                          <a
                            href={`https://wa.me/${inq.phone.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(`مرحباً أستاذ ${inq.name}، بخصوص استفسارك عبر منصة الجلال للتدقيق اللغوي:`)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={styles.secondaryBtn}
                            style={{ padding: "6px 10px", fontSize: "0.75rem", color: "#166534" }}
                            title="تواصل عبر واتساب"
                          >
                            <MessageSquare size={14} />
                          </a>
                        )}
                        <Link
                          href="/admin/inquiries"
                          className={styles.secondaryBtn}
                          style={{ padding: "6px 10px", fontSize: "0.75rem" }}
                        >
                          التفاصيل
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Recent Blog Posts */}
      <div className={styles.card}>
        <div className={styles.cardHeader}>
          <h2 className={styles.cardTitle}>آخر مقالات المدونة</h2>
          <Link href="/admin/blog" className={styles.secondaryBtn} style={{ padding: "6px 14px", fontSize: "0.8rem" }}>
            <span>إدارة المدونة</span>
            <ArrowLeft size={14} />
          </Link>
        </div>

        <div className={styles.tableWrapper}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>عنوان المقال</th>
                <th>التصنيف</th>
                <th>وقت القراءة</th>
                <th>الحالة</th>
                <th>تاريخ النشر</th>
              </tr>
            </thead>
            <tbody>
              {recentPosts.map((post) => (
                <tr key={post.id}>
                  <td>
                    <strong>{post.title}</strong>
                  </td>
                  <td>
                    <span className={`${styles.badge} ${styles.badgeNeutral}`}>{post.tag}</span>
                  </td>
                  <td style={{ fontSize: "0.8rem", color: "#5a6b63" }}>{post.readTime}</td>
                  <td>
                    {post.isPublished ? (
                      <span className={`${styles.badge} ${styles.badgeSuccess}`}>منشور</span>
                    ) : (
                      <span className={`${styles.badge} ${styles.badgeWarning}`}>مسودة</span>
                    )}
                  </td>
                  <td style={{ fontSize: "0.8rem", color: "#5a6b63" }}>
                    {new Date(post.createdAt).toLocaleDateString("ar-SA")}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
