"use server";

import { eq } from "drizzle-orm";
import { z } from "zod";
import { db, tables } from "@/db";
import { requireAdmin } from "@/lib/admin/auth";
import { logAudit } from "@/lib/admin/audit";
import { revalidatePublic } from "@/lib/admin/revalidate";
import {
  fieldErrorsFrom,
  intOr,
  linesToArray,
  str,
  type ActionState,
} from "@/lib/admin/action-state";

const educationSchema = z.object({
  qualification: z.string().min(1, "Required").max(250),
  institution: z.string().min(1, "Required").max(250),
  location: z.string().max(120),
  startDate: z.string().max(40),
  endDate: z.string().max(40),
  status: z.enum(["draft", "published", "archived"]),
});

export async function upsertEducation(
  _prev: ActionState,
  formData: FormData
): Promise<ActionState> {
  await requireAdmin();

  const id = str(formData.get("id"));
  const parsed = educationSchema.safeParse({
    qualification: str(formData.get("qualification")),
    institution: str(formData.get("institution")),
    location: str(formData.get("location")),
    startDate: str(formData.get("startDate")),
    endDate: str(formData.get("endDate")),
    status: str(formData.get("status")) || "published",
  });
  if (!parsed.success) return { fieldErrors: fieldErrorsFrom(parsed.error) };

  const values = {
    ...parsed.data,
    areas: linesToArray(formData.get("areas")),
    logoId: str(formData.get("logoId")) || null,
    sortOrder: intOr(formData.get("sortOrder"), 0),
    updatedAt: new Date(),
  };

  let savedId = id;
  if (id) {
    await db.update(tables.education).set(values).where(eq(tables.education.id, id));
  } else {
    const [row] = await db
      .insert(tables.education)
      .values(values)
      .returning({ id: tables.education.id });
    savedId = row.id;
  }

  await logAudit({
    action: id ? "update" : "create",
    entity: "education",
    entityId: savedId,
    summary: parsed.data.qualification,
  });
  revalidatePublic("education");
  return { success: id ? "Education updated." : "Education created." };
}

export async function deleteEducation(
  _prev: ActionState,
  formData: FormData
): Promise<ActionState> {
  await requireAdmin();
  const id = str(formData.get("id"));
  if (!id) return { error: "Missing ID." };
  await db.delete(tables.education).where(eq(tables.education.id, id));
  await logAudit({ action: "delete", entity: "education", entityId: id });
  revalidatePublic("education");
  return { success: "Education deleted." };
}
