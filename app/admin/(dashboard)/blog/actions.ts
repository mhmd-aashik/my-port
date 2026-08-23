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
  linesToArray,
  slugify,
  str,
  type ActionState,
} from "@/lib/admin/action-state";

const postSchema = z.object({
  title: z.string().min(1, "Required").max(250),
  slug: z.string().min(1).max(150).regex(/^[a-z0-9-]+$/, "Invalid slug"),
  description: z.string().max(500),
  body: z.string().max(100000),
  categoryId: z.string().uuid().or(z.literal("")),
  seoTitle: z.string().max(150),
  seoDescription: z.string().max(300),
  status: z.enum(["draft", "published", "archived"]),
});

export async function upsertPost(
  _prev: ActionState,
  formData: FormData
): Promise<ActionState> {
  await requireAdmin();

  const id = str(formData.get("id"));
  const parsed = postSchema.safeParse({
    title: str(formData.get("title")),
    slug: str(formData.get("slug")) || slugify(str(formData.get("title"))),
    description: str(formData.get("description")),
    body: str(formData.get("body")),
    categoryId: str(formData.get("categoryId")),
    seoTitle: str(formData.get("seoTitle")),
    seoDescription: str(formData.get("seoDescription")),
    status: str(formData.get("status")) || "draft",
  });
  if (!parsed.success) return { fieldErrors: fieldErrorsFrom(parsed.error) };

  const clash = await db.query.blogPosts.findFirst({
    where: id
      ? and(eq(tables.blogPosts.slug, parsed.data.slug), ne(tables.blogPosts.id, id))
      : eq(tables.blogPosts.slug, parsed.data.slug),
  });
  if (clash) return { fieldErrors: { slug: "Slug already in use." } };

  const publishing = parsed.data.status === "published";
  const { categoryId, ...rest } = parsed.data;
  const values = {
    ...rest,
    categoryId: categoryId || null,
    featured: checkbox(formData.get("featured")),
    featuredImageId: str(formData.get("featuredImageId")) || null,
    ogImageId: str(formData.get("ogImageId")) || null,
    updatedAt: new Date(),
  };
  const tagNames = linesToArray(formData.get("tags"));

  const savedId = await db.transaction(async (tx) => {
    let postId = id;
    if (id) {
      const existing = await tx.query.blogPosts.findFirst({
        where: eq(tables.blogPosts.id, id),
      });
      await tx
        .update(tables.blogPosts)
        .set({
          ...values,
          publishedAt:
            publishing && !existing?.publishedAt ? new Date() : existing?.publishedAt,
        })
        .where(eq(tables.blogPosts.id, id));
      await tx.delete(tables.blogPostTags).where(eq(tables.blogPostTags.postId, id));
    } else {
      const [row] = await tx
        .insert(tables.blogPosts)
        .values({ ...values, publishedAt: publishing ? new Date() : null })
        .returning({ id: tables.blogPosts.id });
      postId = row.id;
    }

    for (const name of tagNames) {
      const tagSlug = slugify(name);
      let tag = await tx.query.blogTags.findFirst({
        where: eq(tables.blogTags.slug, tagSlug),
      });
      if (!tag) {
        [tag] = await tx
          .insert(tables.blogTags)
          .values({ name, slug: tagSlug })
          .returning();
      }
      await tx
        .insert(tables.blogPostTags)
        .values({ postId, tagId: tag.id })
        .onConflictDoNothing();
    }
    return postId;
  });

  await logAudit({
    action: id ? "update" : publishing ? "publish" : "create",
    entity: "blogPosts",
    entityId: savedId,
    summary: parsed.data.title,
  });
  revalidatePublic("blog", `/blog/${parsed.data.slug}`);
  return { success: id ? "Post updated." : "Post created." };
}

export async function deletePost(
  _prev: ActionState,
  formData: FormData
): Promise<ActionState> {
  await requireAdmin();
  const id = str(formData.get("id"));
  if (!id) return { error: "Missing ID." };
  const post = await db.query.blogPosts.findFirst({
    where: eq(tables.blogPosts.id, id),
  });
  await db.delete(tables.blogPosts).where(eq(tables.blogPosts.id, id));
  await logAudit({
    action: "delete",
    entity: "blogPosts",
    entityId: id,
    summary: post?.title ?? "",
  });
  revalidatePublic("blog", post ? `/blog/${post.slug}` : undefined);
  return { success: "Post deleted." };
}

const categorySchema = z.object({
  name: z.string().min(1, "Required").max(120),
});

export async function upsertCategory(
  _prev: ActionState,
  formData: FormData
): Promise<ActionState> {
  await requireAdmin();
  const id = str(formData.get("id"));
  const parsed = categorySchema.safeParse({ name: str(formData.get("name")) });
  if (!parsed.success) return { fieldErrors: fieldErrorsFrom(parsed.error) };

  const values = {
    name: parsed.data.name,
    slug: slugify(parsed.data.name),
    description: str(formData.get("description")).slice(0, 400),
    updatedAt: new Date(),
  };
  if (id) {
    await db.update(tables.blogCategories).set(values).where(eq(tables.blogCategories.id, id));
  } else {
    await db.insert(tables.blogCategories).values(values).onConflictDoNothing();
  }
  await logAudit({ action: id ? "update" : "create", entity: "blogCategories", summary: values.name });
  revalidatePublic("blog");
  return { success: "Category saved." };
}

export async function deleteCategory(
  _prev: ActionState,
  formData: FormData
): Promise<ActionState> {
  await requireAdmin();
  const id = str(formData.get("id"));
  if (!id) return { error: "Missing ID." };
  await db.delete(tables.blogCategories).where(eq(tables.blogCategories.id, id));
  await logAudit({ action: "delete", entity: "blogCategories", entityId: id });
  revalidatePublic("blog");
  return { success: "Category deleted. Posts keep existing without a category." };
}
