import { AdminPageHeader } from "@/components/admin/ui";
import { EducationForm } from "../education-form";

export default function NewEducationPage() {
  return (
    <>
      <AdminPageHeader title="Add qualification" />
      <EducationForm />
    </>
  );
}
