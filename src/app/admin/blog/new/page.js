import { requirePermission } from "@/lib/auth";
import NewPostForm from "@/components/admin/NewPostForm";
export default async function Page() {
  await requirePermission("content");
  return <NewPostForm />;
}
