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

const categorySchema = z.object({
  name: z.string().min(1, "Required").max(120),
  description: z.string().max(400),
});

const skillSchema = z.object({
  name: z.string().min(1, "Required").max(120),
  usage: z.string().max(600),
  level: z.enum([
    "core_expertise",
    "strong_experience",
    "working_knowledge",
    "currently_learning",
  ]),
  categoryId: z.string().uuid().or(z.literal("")),
});

export async function upsertSkillCategory(
  _prev: ActionState,
  formData: FormData
): Promise<ActionState> {
  await requireAdmin();
  const id = str(formData.get("id"));
  const parsed = categorySchema.safeParse({
    name: str(formData.get("name")),
    description: str(formData.get("description")),
  });
  if (!parsed.success) return { fieldErrors: fieldErrorsFrom(parsed.error) };

  const values = {
    ...parsed.data,
    sortOrder: intOr(formData.get("sortOrder"), 0),
    visible: checkbox(formData.get("visible")),
    updatedAt: new Date(),
  };

  if (id) {
    await db.update(tables.skillCategories).set(values).where(eq(tables.skillCategories.id, id));
  } else {
    await db.insert(tables.skillCategories).values(values);
  }
  await logAudit({
    action: id ? "update" : "create",
    entity: "skillCategories",
    summary: parsed.data.name,
  });
  revalidatePublic("skill");
  return { success: "Category saved." };
}

export async function deleteSkillCategory(
  _prev: ActionState,
  formData: FormData
): Promise<ActionState> {
  await requireAdmin();
  const id = str(formData.get("id"));
  if (!id) return { error: "Missing ID." };
  // Skills in this category keep existing with categoryId = null (FK: set null).
  await db.delete(tables.skillCategories).where(eq(tables.skillCategories.id, id));
  await logAudit({ action: "delete", entity: "skillCategories", entityId: id });
  revalidatePublic("skill");
  return { success: "Category deleted." };
}

export async function upsertSkill(
  _prev: ActionState,
  formData: FormData
): Promise<ActionState> {
  await requireAdmin();
  const id = str(formData.get("id"));
  const parsed = skillSchema.safeParse({
    name: str(formData.get("name")),
    usage: str(formData.get("usage")),
    level: str(formData.get("level")) || "strong_experience",
    categoryId: str(formData.get("categoryId")),
  });
  if (!parsed.success) return { fieldErrors: fieldErrorsFrom(parsed.error) };

  const values = {
    name: parsed.data.name,
    usage: parsed.data.usage,
    level: parsed.data.level,
    categoryId: parsed.data.categoryId || null,
    icon: str(formData.get("icon")),
    core: checkbox(formData.get("core")),
    visible: checkbox(formData.get("visible")),
    sortOrder: intOr(formData.get("sortOrder"), 0),
    updatedAt: new Date(),
  };

  if (id) {
    await db.update(tables.skills).set(values).where(eq(tables.skills.id, id));
  } else {
    await db.insert(tables.skills).values(values);
  }
  await logAudit({
    action: id ? "update" : "create",
    entity: "skills",
    summary: parsed.data.name,
  });
  revalidatePublic("skill");
  return { success: "Skill saved." };
}

export async function deleteSkill(
  _prev: ActionState,
  formData: FormData
): Promise<ActionState> {
  await requireAdmin();
  const id = str(formData.get("id"));
  if (!id) return { error: "Missing ID." };
  await db.delete(tables.skills).where(eq(tables.skills.id, id));
  await logAudit({ action: "delete", entity: "skills", entityId: id });
  revalidatePublic("skill");
  return { success: "Skill deleted." };
}
