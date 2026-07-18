import { notFound } from "next/navigation";
import { eq } from "drizzle-orm";
import { db, tables } from "@/db";
import { AdminPageHeader } from "@/components/admin/ui";
import { EducationForm } from "../education-form";

export const dynamic = "force-dynamic";

export default async function EditEducationPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const education = await db.query.education.findFirst({
    where: eq(tables.education.id, id),
  });
  if (!education) notFound();

  return (
    <>
      <AdminPageHeader title={`Edit: ${education.qualification}`} />
      <EducationForm education={education} />
    </>
  );
}
