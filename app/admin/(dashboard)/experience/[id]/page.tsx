import { notFound } from "next/navigation";
import { asc, eq } from "drizzle-orm";
import { db, tables } from "@/db";
import { AdminPageHeader } from "@/components/admin/ui";
import { ExperienceForm } from "../experience-form";

export const dynamic = "force-dynamic";

export default async function EditExperiencePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const experience = await db.query.experiences.findFirst({
    where: eq(tables.experiences.id, id),
  });
  if (!experience) notFound();

  const highlights = await db
    .select()
    .from(tables.experienceHighlights)
    .where(eq(tables.experienceHighlights.experienceId, id))
    .orderBy(asc(tables.experienceHighlights.sortOrder));

  return (
    <>
      <AdminPageHeader title={`Edit: ${experience.role} — ${experience.company}`} />
      <ExperienceForm experience={experience} highlights={highlights} />
    </>
  );
}
