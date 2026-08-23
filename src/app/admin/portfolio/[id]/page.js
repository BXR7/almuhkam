import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowRight, Eye } from "lucide-react";
import prisma from "@/lib/prisma";
import ProjectForm from "@/components/admin/ProjectForm";
import { updateProjectAction } from "@/lib/actions";
import styles from "@/styles/admin.module.css";

export default async function EditPortfolioProjectPage({ params }) {
  const { id } = await params;
  const project = await prisma.project.findUnique({
    where: { id },
  });

  if (!project) {
    notFound();
  }

  const updateProjectWithId = updateProjectAction.bind(null, project.id, null);

  return (
    <div>
      <div className={styles.pageHeading}>
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <Link href="/admin/portfolio" className={styles.secondaryBtn} style={{ padding: "8px 12px" }}>
            <ArrowRight size={16} />
          </Link>
          <div>
            <h1 className={styles.pageTitle}>تعديل نموذج العمل</h1>
            <p className={styles.pageSubtitle}>تعديل نصوص ومقارنات: {project.title}</p>
          </div>
        </div>

        <Link href="/portfolio" target="_blank" className={styles.secondaryBtn}>
          <Eye size={16} />
          <span>معاينة في الموقع</span>
        </Link>
      </div>

      <ProjectForm initialData={project} action={updateProjectWithId} />
    </div>
  );
}
