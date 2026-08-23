import Link from "next/link";
import { ArrowRight } from "lucide-react";
import ProjectForm from "@/components/admin/ProjectForm";
import { createProjectAction } from "@/lib/actions";
import styles from "@/styles/admin.module.css";

export default function NewPortfolioProjectPage() {
  return (
    <div>
      <div className={styles.pageHeading}>
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <Link href="/admin/portfolio" className={styles.secondaryBtn} style={{ padding: "8px 12px" }}>
            <ArrowRight size={16} />
          </Link>
          <div>
            <h1 className={styles.pageTitle}>إضافة نموذج عمل جديد</h1>
            <p className={styles.pageSubtitle}>أضف عينة تدقيق لغوي جديدة مع مقارنة قبل وبعد وشرح التصحيحات</p>
          </div>
        </div>
      </div>

      <ProjectForm action={createProjectAction.bind(null, null)} />
    </div>
  );
}
