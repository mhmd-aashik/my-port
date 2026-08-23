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
  str,
  type ActionState,
} from "@/lib/admin/action-state";

const aboutSchema = z.object({
  title: z.string().min(1, "Required").max(200),
  body: z.string().max(2000),
});

export async function upsertAboutSection(
  _prev: ActionState,
  formData: FormData
): Promise<ActionState> {
  await requireAdmin();

  const id = str(formData.get("id"));
  const parsed = aboutSchema.safeParse({
    title: str(formData.get("title")),
    body: str(formData.get("body")),
  });
  if (!parsed.success) return { fieldErrors: fieldErrorsFrom(parsed.error) };

  const values = {
    ...parsed.data,
    sortOrder: intOr(formData.get("sortOrder"), 0),
    visible: checkbox(formData.get("visible")),
    updatedAt: new Date(),
  };

  if (id) {
    await db.update(tables.aboutSections).set(values).where(eq(tables.aboutSections.id, id));
  } else {
    await db.insert(tables.aboutSections).values(values);
  }

  await logAudit({
    action: id ? "update" : "create",
    entity: "aboutSections",
    summary: parsed.data.title,
  });
  revalidatePublic("about");
  return { success: "About section saved." };
}

export async function deleteAboutSection(
  _prev: ActionState,
  formData: FormData
): Promise<ActionState> {
  await requireAdmin();
  const id = str(formData.get("id"));
  if (!id) return { error: "Missing ID." };
  await db.delete(tables.aboutSections).where(eq(tables.aboutSections.id, id));
  await logAudit({ action: "delete", entity: "aboutSections", entityId: id });
  revalidatePublic("about");
  return { success: "Section deleted." };
}
