"use server";

import { eq } from "drizzle-orm";
import { z } from "zod";
import { db, tables } from "@/db";
import { requireAdmin } from "@/lib/admin/auth";
import { logAudit } from "@/lib/admin/audit";
import { revalidatePublic } from "@/lib/admin/revalidate";
import {
  checkbox,
  fieldErrorsFrom,
  intOr,
  linesToArray,
  str,
  type ActionState,
} from "@/lib/admin/action-state";

const experienceSchema = z.object({
  company: z.string().min(1, "Required").max(200),
  role: z.string().min(1, "Required").max(200),
  employmentType: z.string().max(60),
  location: z.string().max(120),
  startDate: z.string().max(40),
  endDate: z.string().max(40),
  context: z.string().max(1000),
  status: z.enum(["draft", "published", "archived"]),
});

export async function upsertExperience(
  _prev: ActionState,
  formData: FormData
): Promise<ActionState> {
  await requireAdmin();

  const id = str(formData.get("id"));
  const parsed = experienceSchema.safeParse({
    company: str(formData.get("company")),
    role: str(formData.get("role")),
    employmentType: str(formData.get("employmentType")),
    location: str(formData.get("location")),
    startDate: str(formData.get("startDate")),
    endDate: str(formData.get("endDate")),
    context: str(formData.get("context")),
    status: str(formData.get("status")) || "published",
  });
  if (!parsed.success) return { fieldErrors: fieldErrorsFrom(parsed.error) };

  const current = checkbox(formData.get("current"));
  const values = {
    ...parsed.data,
    endDate: current ? "" : parsed.data.endDate,
    current,
    featured: checkbox(formData.get("featured")),
    sortOrder: intOr(formData.get("sortOrder"), 0),
    technologies: linesToArray(formData.get("technologies")),
    logoId: str(formData.get("logoId")) || null,
    updatedAt: new Date(),
  };

  const highlights = [
    ...linesToArray(formData.get("responsibilities")).map((body, i) => ({
      kind: "responsibility", body, sortOrder: i,
    })),
    ...linesToArray(formData.get("challenges")).map((body, i) => ({
      kind: "challenge", body, sortOrder: i,
    })),
    ...linesToArray(formData.get("outcomes")).map((body, i) => ({
      kind: "outcome", body, sortOrder: i,
    })),
  ];

  const savedId = await db.transaction(async (tx) => {
    let expId = id;
    if (id) {
      await tx.update(tables.experiences).set(values).where(eq(tables.experiences.id, id));
      await tx
        .delete(tables.experienceHighlights)
        .where(eq(tables.experienceHighlights.experienceId, id));
    } else {
      const [row] = await tx
        .insert(tables.experiences)
        .values(values)
        .returning({ id: tables.experiences.id });
      expId = row.id;
    }
    if (highlights.length > 0) {
      await tx.insert(tables.experienceHighlights).values(
        highlights.map((h) => ({ ...h, experienceId: expId }))
      );
    }
    return expId;
  });

  await logAudit({
    action: id ? "update" : "create",
    entity: "experiences",
    entityId: savedId,
    summary: `${parsed.data.role} — ${parsed.data.company}`,
  });
  revalidatePublic("experience");
  return { success: id ? "Experience updated." : "Experience created." };
}

export async function deleteExperience(
  _prev: ActionState,
  formData: FormData
): Promise<ActionState> {
  await requireAdmin();
  const id = str(formData.get("id"));
  if (!id) return { error: "Missing ID." };

  await db.delete(tables.experiences).where(eq(tables.experiences.id, id));
  await logAudit({ action: "delete", entity: "experiences", entityId: id });
  revalidatePublic("experience");
  return { success: "Experience deleted." };
}
