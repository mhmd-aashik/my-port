import { notFound } from "next/navigation";
import { eq } from "drizzle-orm";
import { db, tables } from "@/db";
import { AdminPageHeader } from "@/components/admin/ui";
import { ChapterForm } from "../chapter-form";

export const dynamic = "force-dynamic";

export default async function EditChapterPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const chapter = await db.query.storyChapters.findFirst({
    where: eq(tables.storyChapters.id, id),
  });
  if (!chapter) notFound();

  return (
    <>
      <AdminPageHeader title={`Edit chapter: ${chapter.title}`} />
      <ChapterForm chapter={chapter} />
    </>
  );
}
