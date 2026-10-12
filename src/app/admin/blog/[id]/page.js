import { requirePermission } from "@/lib/auth";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowRight, Save, Eye } from "lucide-react";
import prisma from "@/lib/prisma";
import { updatePostAction } from "@/lib/actions";
import styles from "@/styles/admin.module.css";

export default async function EditBlogPostPage({ params }) {
  await requirePermission("content");
  const { id } = await params;
  const post = await prisma.post.findUnique({
    where: { id },
  });

  if (!post) {
    notFound();
  }

  const updatePostWithId = updatePostAction.bind(null, post.id);

  return (
    <div>
      <div className={styles.pageHeading}>
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <Link href="/admin/blog" className={styles.secondaryBtn} style={{ padding: "8px 12px" }}>
            <ArrowRight size={16} />
          </Link>
          <div>
            <h1 className={styles.pageTitle}>تعديل المقال</h1>
            <p className={styles.pageSubtitle}>تعديل بيانات ونصوص: {post.title}</p>
          </div>
        </div>

        <Link href={`/blog/${post.slug}`} target="_blank" className={styles.secondaryBtn}>
          <Eye size={16} />
          <span>معاينة في الموقع</span>
        </Link>
      </div>

      <form action={updatePostWithId} className={styles.card}>
        <div className={styles.formGrid}>
          <div className={styles.formGroup} style={{ gridColumn: "1 / -1" }}>
            <label className={styles.label} htmlFor="title">عنوان المقال *</label>
            <input
              id="title"
              name="title"
              type="text"
              required
              defaultValue={post.title}
              className={styles.input}
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label} htmlFor="tag">تصنيف المقال</label>
            <select id="tag" name="tag" className={styles.select} defaultValue={post.tag}>
              <option value="كتابة أكاديمية">كتابة أكاديمية</option>
              <option value="أخطاء شائعة">أخطاء شائعة</option>
              <option value="نصائح للباحثين">نصائح للباحثين</option>
              <option value="قواعد اللغة">قواعد اللغة</option>
              <option value="تحرير الكتب">تحرير الكتب</option>
            </select>
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label} htmlFor="readTime">وقت القراءة المقدر</label>
            <input
              id="readTime"
              name="readTime"
              type="text"
              defaultValue={post.readTime}
              className={styles.input}
            />
          </div>

          <div className={styles.formGroup} style={{ gridColumn: "1 / -1" }}>
            <label className={styles.label} htmlFor="slug">الرابط المخصص (Slug)</label>
            <input
              id="slug"
              name="slug"
              type="text"
              defaultValue={post.slug}
              className={styles.input}
            />
          </div>

          <div className={styles.formGroup} style={{ gridColumn: "1 / -1" }}>
            <label className={styles.label} htmlFor="excerpt">ملخص المقال *</label>
            <textarea
              id="excerpt"
              name="excerpt"
              required
              rows={2}
              defaultValue={post.excerpt}
              className={styles.textarea}
              style={{ minHeight: "80px" }}
            />
          </div>

          <div className={styles.formGroup} style={{ gridColumn: "1 / -1" }}>
            <label className={styles.label} htmlFor="content">محتوى المقال بالكامل *</label>
            <textarea
              id="content"
              name="content"
              required
              rows={14}
              defaultValue={post.content}
              className={styles.textarea}
              style={{ minHeight: "340px", fontSize: "0.95rem" }}
            />
          </div>

          <div className={styles.formGroup} style={{ gridColumn: "1 / -1" }}>
            <label style={{ display: "flex", alignItems: "center", gap: "8px", cursor: "pointer", fontWeight: "600" }}>
              <input
                type="checkbox"
                name="isPublished"
                value="true"
                defaultChecked={post.isPublished}
                style={{ width: "18px", height: "18px" }}
              />
              <span>منشور في الموقع العام</span>
            </label>
          </div>
        </div>

        <div className={styles.formActions}>
          <Link href="/admin/blog" className={styles.secondaryBtn}>
            إلغاء
          </Link>
          <button type="submit" className={styles.primaryBtn}>
            <Save size={16} />
            <span>حفظ التعديلات</span>
          </button>
        </div>
      </form>
    </div>
  );
}
