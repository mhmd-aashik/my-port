import { desc } from "drizzle-orm";
import { db, tables } from "@/db";
import { AdminPageHeader, AdminTable, EmptyState } from "@/components/admin/ui";
import Link from "next/link";

export const dynamic = "force-dynamic";

const PAGE_SIZE = 50;

export default async function AuditAdminPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const { page: pageParam } = await searchParams;
  const page = Math.max(1, Number(pageParam) || 1);

  const rows = await db
    .select()
    .from(tables.auditLogs)
    .orderBy(desc(tables.auditLogs.createdAt))
    .limit(PAGE_SIZE + 1)
    .offset((page - 1) * PAGE_SIZE);

  const hasNext = rows.length > PAGE_SIZE;
  const visible = rows.slice(0, PAGE_SIZE);

  return (
    <>
      <AdminPageHeader
        title="Audit Log"
        description="Every CMS change, login, and upload."
      />
      {visible.length === 0 ? (
        <EmptyState message="No audit entries yet." />
      ) : (
        <AdminTable headers={["When", "Action", "Entity", "Summary"]}>
          {visible.map((row) => (
            <tr key={row.id} className="bg-surface/50">
              <td className="whitespace-nowrap px-4 py-3 font-mono text-xs text-subtle">
                {new Date(row.createdAt).toLocaleString("en-GB")}
              </td>
              <td className="px-4 py-3 font-mono text-xs text-accent">{row.action}</td>
              <td className="px-4 py-3 text-muted">{row.entity}</td>
              <td className="max-w-md truncate px-4 py-3 text-muted">{row.summary}</td>
            </tr>
          ))}
        </AdminTable>
      )}
      <div className="mt-6 flex gap-3">
        {page > 1 && (
          <Link
            href={`/admin/audit?page=${page - 1}`}
            className="rounded-md border border-border px-4 py-2 text-sm text-muted hover:text-foreground"
          >
            ← Newer
          </Link>
        )}
        {hasNext && (
          <Link
            href={`/admin/audit?page=${page + 1}`}
            className="rounded-md border border-border px-4 py-2 text-sm text-muted hover:text-foreground"
          >
            Older →
          </Link>
        )}
      </div>
    </>
  );
}
