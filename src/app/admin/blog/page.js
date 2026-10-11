import { requirePermission } from "@/lib/auth";
import Link from "next/link";
import { Plus, Edit3, Trash2, Eye, FileText } from "lucide-react";
import prisma from "@/lib/prisma";
import { deletePostAction } from "@/lib/actions";
import styles from "@/styles/admin.module.css";

export default async function AdminBlogListPage() {
  await requirePermission("content");
  const posts = await prisma.post.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div>
      <div className={styles.pageHeading}>
        <div>
          <h1 className={styles.pageTitle}>إدارة المدونة والمقالات</h1>
          <p className={styles.pageSubtitle}>إضافة، تعديل، ونشر المقالات التحريرية والأكاديمية</p>
        </div>

        <Link href="/admin/blog/new" className={styles.primaryBtn}>
          <Plus size={16} />
          <span>كتابة مقال جديد</span>
        </Link>
      </div>

      <div className={styles.card}>
        {posts.length === 0 ? (
          <div style={{ textAlign: "center", padding: "40px", color: "#5a6b63" }}>
            <FileText size={48} style={{ opacity: 0.3, marginBottom: "12px" }} />
            <p>لا توجد مقالات مضافة حتى الآن.</p>
            <Link href="/admin/blog/new" className={styles.primaryBtn} style={{ marginTop: "12px" }}>
              إضافة أول مقال
            </Link>
          </div>
        ) : (
          <div className={styles.tableWrapper}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>العنوان</th>
                  <th>التصنيف</th>
                  <th>الرابط المخصص (Slug)</th>
                  <th>وقت القراءة</th>
                  <th>الحالة</th>
                  <th>تاريخ الإنشاء</th>
                  <th>الإجراءات</th>
                </tr>
              </thead>
              <tbody>
                {posts.map((post) => (
                  <tr key={post.id}>
                    <td>
                      <strong>{post.title}</strong>
                      <div style={{ fontSize: "0.78rem", color: "#5a6b63", maxWidth: "300px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                        {post.excerpt}
                      </div>
                    </td>
                    <td>
                      <span className={`${styles.badge} ${styles.badgeNeutral}`}>{post.tag}</span>
                    </td>
                    <td style={{ fontSize: "0.78rem", color: "#5a6b63", direction: "ltr", textAlign: "right" }}>
                      /{post.slug}
                    </td>
                    <td style={{ fontSize: "0.82rem", color: "#5a6b63" }}>{post.readTime}</td>
                    <td>
                      {post.isPublished ? (
                        <span className={`${styles.badge} ${styles.badgeSuccess}`}>منشور</span>
                      ) : (
                        <span className={`${styles.badge} ${styles.badgeWarning}`}>مسودة</span>
                      )}
                    </td>
                    <td style={{ fontSize: "0.8rem", color: "#5a6b63", whiteSpace: "nowrap" }}>
                      {new Date(post.createdAt).toLocaleDateString("ar-SA")}
                    </td>
                    <td>
                      <div style={{ display: "flex", gap: "8px" }}>
                        <Link
                          href={`/blog/${post.slug}`}
                          target="_blank"
                          className={styles.secondaryBtn}
                          style={{ padding: "6px 8px" }}
                          title="معاينة في الموقع"
                        >
                          <Eye size={14} />
                        </Link>
                        <Link
                          href={`/admin/blog/${post.id}`}
                          className={styles.secondaryBtn}
                          style={{ padding: "6px 8px" }}
                          title="تعديل المقال"
                        >
                          <Edit3 size={14} />
                        </Link>
                        <form
                          action={async () => {
                            "use server";
                            await deletePostAction(post.id);
                          }}
                        >
                          <button
                            type="submit"
                            className={styles.dangerBtn}
                            style={{ padding: "6px 8px" }}
                            title="حذف المقال"
                          >
                            <Trash2 size={14} />
                          </button>
                        </form>
                      </div>
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
