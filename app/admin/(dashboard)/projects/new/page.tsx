import { AdminPageHeader } from "@/components/admin/ui";
import { ProjectForm } from "../project-form";

export default function NewProjectPage() {
  return (
    <>
      <AdminPageHeader title="Add project" />
      <ProjectForm />
    </>
  );
}
