import { AdminPageHeader } from "@/components/admin/ui";
import { ExperienceForm } from "../experience-form";

export default function NewExperiencePage() {
  return (
    <>
      <AdminPageHeader title="Add experience" />
      <ExperienceForm />
    </>
  );
}
