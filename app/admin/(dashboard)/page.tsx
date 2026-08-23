import Link from "next/link";
import { count, desc, eq } from "drizzle-orm";
import { db, tables } from "@/db";
import { AdminPageHeader, StatusBadge } from "@/components/admin/ui";

export const dynamic = "force-dynamic";

export default async function AdminOverviewPage() {
  const [
    [publishedProjects],
    [draftProjects],
    [publishedPosts],
    [draftPosts],
    [unreadMessages],
    [mediaCount],
    recentAudit,
    recentPosts,
  ] = await Promise.all([
    db.select({ n: count() }).from(tables.projects).where(eq(tables.projects.status, "published")),
    db.select({ n: count() }).from(tables.projects).where(eq(tables.projects.status, "draft")),
    db.select({ n: count() }).from(tables.blogPosts).where(eq(tables.blogPosts.status, "published")),
    db.select({ n: count() }).from(tables.blogPosts).where(eq(tables.blogPosts.status, "draft")),
    db.select({ n: count() }).from(tables.contactMessages).where(eq(tables.contactMessages.status, "unread")),
    db.select({ n: count() }).from(tables.mediaAssets),
    db.select().from(tables.auditLogs).orderBy(desc(tables.auditLogs.createdAt)).limit(8),
    db.select({
      id: tables.blogPosts.id,
      title: tables.blogPosts.title,
      status: tables.blogPosts.status,
      updatedAt: tables.blogPosts.updatedAt,
    }).from(tables.blogPosts).orderBy(desc(tables.blogPosts.updatedAt)).limit(5),
  ]);

  const stats = [
    { label: "Published projects", value: publishedProjects.n, href: "/admin/projects" },
    { label: "Draft projects", value: draftProjects.n, href: "/admin/projects" },
    { label: "Published posts", value: publishedPosts.n, href: "/admin/blog" },
    { label: "Draft posts", value: draftPosts.n, href: "/admin/blog" },
    { label: "Unread messages", value: unreadMessages.n, href: "/admin/messages" },
    { label: "Media files", value: mediaCount.n, href: "/admin/media" },
  ];

  return (
    <>
      <AdminPageHeader
        title="Overview"
        description="Content status across the site."
      />
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
        {stats.map((s) => (
          <Link
            key={s.label}
            href={s.href}
            className="rounded-lg border border-border bg-surface p-4 transition-colors hover:border-border-strong"
          >
            <p className="text-2xl font-semibold">{s.value}</p>
            <p className="mt-1 text-xs text-muted">{s.label}</p>
          </Link>
        ))}
      </div>

      <div className="mt-10 grid gap-8 lg:grid-cols-2">
        <section>
          <h2 className="mb-3 font-mono text-xs uppercase tracking-wider text-subtle">
            Recently edited posts
          </h2>
          <ul className="space-y-2">
            {recentPosts.map((p) => (
              <li
                key={p.id}
                className="flex items-center justify-between gap-3 rounded-md border border-border bg-surface px-3 py-2 text-sm"
              >
                <Link href={`/admin/blog/${p.id}`} className="truncate hover:text-accent">
                  {p.title}
                </Link>
                <StatusBadge status={p.status} />
              </li>
            ))}
            {recentPosts.length === 0 && (
              <li className="text-sm text-subtle">Nothing yet.</li>
            )}
          </ul>
        </section>
        <section>
          <h2 className="mb-3 font-mono text-xs uppercase tracking-wider text-subtle">
            Recent admin actions
          </h2>
          <ul className="space-y-2">
            {recentAudit.map((a) => (
              <li
                key={a.id}
                className="rounded-md border border-border bg-surface px-3 py-2 text-sm"
              >
                <span className="font-mono text-xs text-accent">{a.action}</span>{" "}
                <span className="text-muted">{a.entity}</span>
                {a.summary && (
                  <span className="block truncate text-xs text-subtle">{a.summary}</span>
                )}
              </li>
            ))}
            {recentAudit.length === 0 && (
              <li className="text-sm text-subtle">No actions logged yet.</li>
            )}
          </ul>
        </section>
      </div>
    </>
  );
}
