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
  linesToArray,
  slugify,
  str,
  type ActionState,
} from "@/lib/admin/action-state";

const projectSchema = z.object({
  title: z.string().min(1, "Required").max(200),
  slug: z
    .string()
    .min(1, "Required")
    .max(120)
    .regex(/^[a-z0-9-]+$/, "Lowercase letters, numbers, and dashes only"),
  tagline: z.string().max(300),
  problem: z.string().max(3000),
  solution: z.string().max(3000),
  role: z.string().max(1000),
  architecture: z.string().max(3000),
  security: z.string().max(2000),
  performance: z.string().max(2000),
  results: z.string().max(2000),
  lessons: z.string().max(2000),
  githubUrl: z.string().url().or(z.literal("")),
  liveUrl: z.string().url().or(z.literal("")),
  seoTitle: z.string().max(150),
  seoDescription: z.string().max(300),
  status: z.enum(["draft", "published", "archived"]),
});

export async function upsertProject(
  _prev: ActionState,
  formData: FormData
): Promise<ActionState> {
  await requireAdmin();

  const id = str(formData.get("id"));
  const rawSlug = str(formData.get("slug")) || slugify(str(formData.get("title")));

  const parsed = projectSchema.safeParse({
    title: str(formData.get("title")),
    slug: rawSlug,
    tagline: str(formData.get("tagline")),
    problem: str(formData.get("problem")),
    solution: str(formData.get("solution")),
    role: str(formData.get("role")),
    architecture: str(formData.get("architecture")),
    security: str(formData.get("security")),
    performance: str(formData.get("performance")),
    results: str(formData.get("results")),
    lessons: str(formData.get("lessons")),
    githubUrl: str(formData.get("githubUrl")),
    liveUrl: str(formData.get("liveUrl")),
    seoTitle: str(formData.get("seoTitle")),
    seoDescription: str(formData.get("seoDescription")),
    status: str(formData.get("status")) || "draft",
  });
  if (!parsed.success) return { fieldErrors: fieldErrorsFrom(parsed.error) };

  // Slug uniqueness (excluding this record on update).
  const clash = await db.query.projects.findFirst({
    where: id
      ? and(eq(tables.projects.slug, parsed.data.slug), ne(tables.projects.id, id))
      : eq(tables.projects.slug, parsed.data.slug),
  });
  if (clash) return { fieldErrors: { slug: "Slug already in use." } };

  const publishing = parsed.data.status === "published";
  const values = {
    ...parsed.data,
    categories: linesToArray(formData.get("categories")),
    features: linesToArray(formData.get("features")),
    decisions: linesToArray(formData.get("decisions")),
    challenges: linesToArray(formData.get("challenges")),
    challengeSolutions: linesToArray(formData.get("challengeSolutions")),
    confidential: checkbox(formData.get("confidential")),
    featured: checkbox(formData.get("featured")),
    sortOrder: intOr(formData.get("sortOrder"), 0),
    featuredImageId: str(formData.get("featuredImageId")) || null,
    ogImageId: str(formData.get("ogImageId")) || null,
    updatedAt: new Date(),
  };
  const technologies = linesToArray(formData.get("technologies"));

  const savedId = await db.transaction(async (tx) => {
    let projectId = id;
    if (id) {
      const existing = await tx.query.projects.findFirst({
        where: eq(tables.projects.id, id),
      });
      await tx
        .update(tables.projects)
        .set({
          ...values,
          publishedAt:
            publishing && !existing?.publishedAt ? new Date() : existing?.publishedAt,
        })
        .where(eq(tables.projects.id, id));
      await tx
        .delete(tables.projectTechnologies)
        .where(eq(tables.projectTechnologies.projectId, id));
    } else {
      const [row] = await tx
        .insert(tables.projects)
        .values({ ...values, publishedAt: publishing ? new Date() : null })
        .returning({ id: tables.projects.id });
      projectId = row.id;
    }
    if (technologies.length > 0) {
      await tx.insert(tables.projectTechnologies).values(
        technologies.map((name, i) => ({ projectId, name, sortOrder: i }))
      );
    }
    return projectId;
  });

  await logAudit({
    action: id ? "update" : "create",
    entity: "projects",
    entityId: savedId,
    summary: parsed.data.title,
  });
  revalidatePublic("project", `/projects/${parsed.data.slug}`);
  return { success: id ? "Project updated." : "Project created." };
}

export async function deleteProject(
  _prev: ActionState,
  formData: FormData
): Promise<ActionState> {
  await requireAdmin();
  const id = str(formData.get("id"));
  if (!id) return { error: "Missing ID." };

  const project = await db.query.projects.findFirst({
    where: eq(tables.projects.id, id),
  });
  // Cascades remove technologies and gallery joins; shared media assets
  // themselves are never deleted here.
  await db.delete(tables.projects).where(eq(tables.projects.id, id));
  await logAudit({
    action: "delete",
    entity: "projects",
    entityId: id,
    summary: project?.title ?? "",
  });
  revalidatePublic("project", project ? `/projects/${project.slug}` : undefined);
  return { success: "Project deleted." };
}
