import { notFound } from "next/navigation";
import { eq } from "drizzle-orm";
import { db, tables } from "@/db";
import { AdminPageHeader } from "@/components/admin/ui";
import { PostForm } from "../post-form";

export const dynamic = "force-dynamic";

export default async function EditPostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const post = await db.query.blogPosts.findFirst({
    where: eq(tables.blogPosts.id, id),
  });
  if (!post) notFound();

  const tagRows = await db
    .select({ name: tables.blogTags.name })
    .from(tables.blogPostTags)
    .innerJoin(tables.blogTags, eq(tables.blogPostTags.tagId, tables.blogTags.id))
    .where(eq(tables.blogPostTags.postId, id));

  return (
    <>
      <AdminPageHeader title={`Edit: ${post.title}`} />
      <PostForm post={post} tags={tagRows.map((t) => t.name)} />
    </>
  );
}
