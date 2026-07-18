import Link from "next/link";
import { desc, ilike, or } from "drizzle-orm";
import { db, tables } from "@/db";
import { AdminForm } from "@/components/admin/admin-form";
import { DeleteForm } from "@/components/admin/delete-form";
import { TextInput } from "@/components/admin/fields";
import {
  AdminPageHeader,
  AdminTable,
  EmptyState,
  StatusBadge,
} from "@/components/admin/ui";
import { deleteCategory, deletePost, upsertCategory } from "./actions";

export const dynamic = "force-dynamic";

export default async function BlogAdminPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q } = await searchParams;

  const posts = await db
    .select()
    .from(tables.blogPosts)
    .where(
      q
        ? or(
            ilike(tables.blogPosts.title, `%${q}%`),
            ilike(tables.blogPosts.description, `%${q}%`)
          )
        : undefined
    )
    .orderBy(desc(tables.blogPosts.updatedAt))
    .limit(100);

  const categories = await db.select().from(tables.blogCategories);

  return (
    <>
      <AdminPageHeader
        title="Blog"
        description="Posts, drafts, and categories."
        action={{ href: "/admin/blog/new", label: "New post" }}
      />

      <form method="GET" className="mb-5 flex gap-2">
        <input
          type="search"
          name="q"
          defaultValue={q}
          placeholder="Search posts…"
          className="w-full max-w-xs rounded-md border border-border bg-surface px-3.5 py-2 text-sm focus:border-accent"
        />
        <button
          type="submit"
          className="rounded-md border border-border px-4 py-2 text-sm text-muted hover:text-foreground"
        >
          Search
        </button>
      </form>

      {posts.length === 0 ? (
        <EmptyState message={q ? `No posts match "${q}".` : "No posts yet."} />
      ) : (
        <AdminTable headers={["Title", "Status", "Published", "Preview", ""]}>
          {posts.map((post) => (
            <tr key={post.id} className="bg-surface/50">
              <td className="px-4 py-3">
                <Link href={`/admin/blog/${post.id}`} className="font-medium hover:text-accent">
                  {post.title}
                </Link>
                {post.featured && <span className="ml-2 text-accent">★</span>}
              </td>
              <td className="px-4 py-3"><StatusBadge status={post.status} /></td>
              <td className="px-4 py-3 font-mono text-xs text-subtle">
                {post.publishedAt
                  ? new Date(post.publishedAt).toLocaleDateString("en-GB")
                  : "—"}
              </td>
              <td className="px-4 py-3">
                <Link
                  href={`/admin/blog/${post.id}/preview`}
                  className="text-xs text-accent hover:underline"
                >
                  Preview
                </Link>
              </td>
              <td className="px-4 py-3 text-right">
                <DeleteForm action={deletePost} id={post.id} />
              </td>
            </tr>
          ))}
        </AdminTable>
      )}

      <h2 className="mb-4 mt-12 text-lg font-semibold">Categories</h2>
      <div className="flex flex-wrap gap-3">
        {categories.map((cat) => (
          <div
            key={cat.id}
            className="flex items-center gap-3 rounded-md border border-border bg-surface px-3 py-2 text-sm"
          >
            {cat.name}
            <DeleteForm action={deleteCategory} id={cat.id} label="" />
          </div>
        ))}
      </div>
      <div className="mt-5 max-w-sm rounded-lg border border-dashed border-border-strong p-4">
        <AdminForm action={upsertCategory} submitLabel="Add category">
          <TextInput label="New category name" name="name" required />
        </AdminForm>
      </div>
    </>
  );
}
