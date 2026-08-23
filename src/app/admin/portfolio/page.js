import Link from "next/link";
import { Plus, Edit3, Trash2, Eye, Briefcase } from "lucide-react";
import prisma from "@/lib/prisma";
import { deleteProjectAction } from "@/lib/actions";
import styles from "@/styles/admin.module.css";

export default async function AdminPortfolioListPage() {
  const projects = await prisma.project.findMany({
    orderBy: { order: "asc" },
  });

  return (
    <div>
      <div className={styles.pageHeading}>
        <div>
          <h1 className={styles.pageTitle}>إدارة نماذج الأعمال (Portfolio)</h1>
          <p className={styles.pageSubtitle}>عرض وتعديل عينات ومقارنات التدقيق اللغوي (قبل / بعد)</p>
        </div>

        <Link href="/admin/portfolio/new" className={styles.primaryBtn}>
          <Plus size={16} />
          <span>إضافة نموذج عمل جديد</span>
        </Link>
      </div>

      <div className={styles.card}>
        {projects.length === 0 ? (
          <div style={{ textAlign: "center", padding: "40px", color: "#5a6b63" }}>
            <Briefcase size={48} style={{ opacity: 0.3, marginBottom: "12px" }} />
            <p>لا توجد نماذج أعمال مضافة حتى الآن.</p>
            <Link href="/admin/portfolio/new" className={styles.primaryBtn} style={{ marginTop: "12px" }}>
              إضافة أول نموذج
            </Link>
          </div>
        ) : (
          <div className={styles.tableWrapper}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>عنوان المشروع / العينة</th>
                  <th>المجال / التصنيف</th>
                  <th>نص العينة</th>
                  <th>عدد التعديلات المشروحة</th>
                  <th>تاريخ الإضافة</th>
                  <th>الإجراءات</th>
                </tr>
              </thead>
              <tbody>
                {projects.map((project) => {
                  let editsCount = 0;
                  try {
                    const parsed = JSON.parse(project.editsJson || "[]");
                    editsCount = parsed.length;
                  } catch (e) {
                    editsCount = 0;
                  }

                  return (
                    <tr key={project.id}>
                      <td>
                        <strong>{project.title}</strong>
                      </td>
                      <td>
                        <span className={`${styles.badge} ${styles.badgeInfo}`}>{project.category}</span>
                      </td>
                      <td style={{ maxWidth: "260px" }}>
                        <p style={{ margin: 0, fontSize: "0.8rem", color: "#5a6b63", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                          {project.beforeText}
                        </p>
                      </td>
                      <td>
                        <span className={`${styles.badge} ${styles.badgeNeutral}`}>{editsCount} تصحيحات</span>
                      </td>
                      <td style={{ fontSize: "0.8rem", color: "#5a6b63", whiteSpace: "nowrap" }}>
                        {new Date(project.createdAt).toLocaleDateString("ar-SA")}
                      </td>
                      <td>
                        <div style={{ display: "flex", gap: "8px" }}>
                          <Link
                            href="/portfolio"
                            target="_blank"
                            className={styles.secondaryBtn}
                            style={{ padding: "6px 8px" }}
                            title="معاينة في الموقع"
                          >
                            <Eye size={14} />
                          </Link>
                          <Link
                            href={`/admin/portfolio/${project.id}`}
                            className={styles.secondaryBtn}
                            style={{ padding: "6px 8px" }}
                            title="تعديل النموذج"
                          >
                            <Edit3 size={14} />
                          </Link>
                          <form
                            action={async () => {
                              "use server";
                              await deleteProjectAction(project.id);
                            }}
                          >
                            <button
                              type="submit"
                              className={styles.dangerBtn}
                              style={{ padding: "6px 8px" }}
                              title="حذف النموذج"
                            >
                              <Trash2 size={14} />
                            </button>
                          </form>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
