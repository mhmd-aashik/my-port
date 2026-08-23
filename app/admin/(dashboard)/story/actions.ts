"use server";

import { and, eq, ne } from "drizzle-orm";
import { z } from "zod";
import { db, tables } from "@/db";
import { requireAdmin } from "@/lib/admin/auth";
import { logAudit } from "@/lib/admin/audit";
import { revalidatePublic } from "@/lib/admin/revalidate";
import {
  checkbox,
  fieldErrorsFrom,
  intOr,
  slugify,
  str,
  type ActionState,
} from "@/lib/admin/action-state";

const chapterSchema = z.object({
  title: z.string().min(1, "Required").max(200),
  slug: z.string().min(1).max(120).regex(/^[a-z0-9-]+$/, "Invalid slug"),
  timePeriod: z.string().max(80),
  intro: z.string().max(1000),
  body: z.string().max(20000),
  pullQuote: z.string().max(500),
  seoTitle: z.string().max(150),
  seoDescription: z.string().max(300),
  status: z.enum(["draft", "published", "archived"]),
});

export async function upsertChapter(
  _prev: ActionState,
  formData: FormData
): Promise<ActionState> {
  await requireAdmin();

  const id = str(formData.get("id"));
  const parsed = chapterSchema.safeParse({
    title: str(formData.get("title")),
    slug: str(formData.get("slug")) || slugify(str(formData.get("title"))),
    timePeriod: str(formData.get("timePeriod")),
    intro: str(formData.get("intro")),
    body: str(formData.get("body")),
    pullQuote: str(formData.get("pullQuote")),
    seoTitle: str(formData.get("seoTitle")),
    seoDescription: str(formData.get("seoDescription")),
    status: str(formData.get("status")) || "published",
  });
  if (!parsed.success) return { fieldErrors: fieldErrorsFrom(parsed.error) };

  const clash = await db.query.storyChapters.findFirst({
    where: id
      ? and(eq(tables.storyChapters.slug, parsed.data.slug), ne(tables.storyChapters.id, id))
      : eq(tables.storyChapters.slug, parsed.data.slug),
  });
  if (clash) return { fieldErrors: { slug: "Slug already in use." } };

  const values = {
    ...parsed.data,
    coverImageId: str(formData.get("coverImageId")) || null,
    sortOrder: intOr(formData.get("sortOrder"), 0),
    updatedAt: new Date(),
  };

  if (id) {
    await db.update(tables.storyChapters).set(values).where(eq(tables.storyChapters.id, id));
  } else {
    await db.insert(tables.storyChapters).values(values);
  }

  await logAudit({
    action: id ? "update" : "create",
    entity: "storyChapters",
    summary: parsed.data.title,
  });
  revalidatePublic("story");
  return { success: "Chapter saved." };
}

export async function deleteChapter(
  _prev: ActionState,
  formData: FormData
): Promise<ActionState> {
  await requireAdmin();
  const id = str(formData.get("id"));
  if (!id) return { error: "Missing ID." };
  await db.delete(tables.storyChapters).where(eq(tables.storyChapters.id, id));
  await logAudit({ action: "delete", entity: "storyChapters", entityId: id });
  revalidatePublic("story");
  return { success: "Chapter deleted." };
}

const milestoneSchema = z.object({
  date: z.string().min(1, "Required").max(40),
  title: z.string().min(1, "Required").max(250),
  description: z.string().max(1000),
});

export async function upsertMilestone(
  _prev: ActionState,
  formData: FormData
): Promise<ActionState> {
  await requireAdmin();
  const id = str(formData.get("id"));
  const parsed = milestoneSchema.safeParse({
    date: str(formData.get("date")),
    title: str(formData.get("title")),
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
    await db.update(tables.storyMilestones).set(values).where(eq(tables.storyMilestones.id, id));
  } else {
    await db.insert(tables.storyMilestones).values(values);
  }
  await logAudit({
    action: id ? "update" : "create",
    entity: "storyMilestones",
    summary: `${parsed.data.date} — ${parsed.data.title}`,
  });
  revalidatePublic("story");
  return { success: "Milestone saved." };
}

export async function deleteMilestone(
  _prev: ActionState,
  formData: FormData
): Promise<ActionState> {
  await requireAdmin();
  const id = str(formData.get("id"));
  if (!id) return { error: "Missing ID." };
  await db.delete(tables.storyMilestones).where(eq(tables.storyMilestones.id, id));
  await logAudit({ action: "delete", entity: "storyMilestones", entityId: id });
  revalidatePublic("story");
  return { success: "Milestone deleted." };
}
