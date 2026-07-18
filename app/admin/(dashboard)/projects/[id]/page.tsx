import { notFound } from "next/navigation";
import { asc, eq } from "drizzle-orm";
import { db, tables } from "@/db";
import { AdminPageHeader } from "@/components/admin/ui";
import { ProjectForm } from "../project-form";

export const dynamic = "force-dynamic";

export default async function EditProjectPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const project = await db.query.projects.findFirst({
    where: eq(tables.projects.id, id),
  });
  if (!project) notFound();

  const techRows = await db
    .select()
    .from(tables.projectTechnologies)
    .where(eq(tables.projectTechnologies.projectId, id))
    .orderBy(asc(tables.projectTechnologies.sortOrder));

  return (
    <>
      <AdminPageHeader title={`Edit: ${project.title}`} />
      <ProjectForm project={project} technologies={techRows.map((t) => t.name)} />
    </>
  );
}
