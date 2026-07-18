import Link from "next/link";
import { notFound } from "next/navigation";
import { eq } from "drizzle-orm";
import { ArrowLeft } from "lucide-react";
import { db, tables } from "@/db";
import { markdownToHtml } from "@/lib/markdown";

export const dynamic = "force-dynamic";

// Secure draft preview: lives inside the admin layout, so it requires the
// admin session. Drafts are never exposed through public routes.
export default async function PostPreviewPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const post = await db.query.blogPosts.findFirst({
    where: eq(tables.blogPosts.id, id),
  });
  if (!post) notFound();

  return (
    <article>
      <Link
        href={`/admin/blog/${post.id}`}
        className="inline-flex items-center gap-1.5 text-sm text-subtle hover:text-foreground"
      >
        <ArrowLeft className="size-4" aria-hidden /> Back to editor
      </Link>
      <p className="mt-6 font-mono text-xs uppercase tracking-wider text-accent">
        Preview · {post.status}
      </p>
      <h1 className="mt-2 text-3xl font-semibold tracking-tight">{post.title}</h1>
      <p className="mt-3 text-muted">{post.description}</p>
      <div
        className="prose mt-8"
        dangerouslySetInnerHTML={{ __html: markdownToHtml(post.body) }}
      />
    </article>
  );
}
