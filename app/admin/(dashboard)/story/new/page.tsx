import { AdminPageHeader } from "@/components/admin/ui";
import { ChapterForm } from "../chapter-form";

export default function NewChapterPage() {
  return (
    <>
      <AdminPageHeader title="Add story chapter" />
      <ChapterForm />
    </>
  );
}
