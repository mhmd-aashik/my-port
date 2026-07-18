import Link from "next/link";
import { asc } from "drizzle-orm";
import { db, tables } from "@/db";
import { DeleteForm } from "@/components/admin/delete-form";
import {
  AdminPageHeader,
  AdminTable,
  EmptyState,
  StatusBadge,
} from "@/components/admin/ui";
import { deleteProject } from "./actions";

export const dynamic = "force-dynamic";

export default async function ProjectsAdminPage() {
  const rows = await db
    .select()
    .from(tables.projects)
    .orderBy(asc(tables.projects.sortOrder));

  return (
    <>
      <AdminPageHeader
        title="Projects"
        description="Case studies shown in the gallery."
        action={{ href: "/admin/projects/new", label: "Add project" }}
      />
      {rows.length === 0 ? (
        <EmptyState message="No projects yet." />
      ) : (
        <AdminTable headers={["Title", "Slug", "Status", "Featured", "Order", ""]}>
          {rows.map((row) => (
            <tr key={row.id} className="bg-surface/50">
              <td className="px-4 py-3">
                <Link href={`/admin/projects/${row.id}`} className="font-medium hover:text-accent">
                  {row.title}
                </Link>
                {row.confidential && (
                  <span className="ml-2 font-mono text-xs text-subtle">NDA</span>
                )}
              </td>
              <td className="px-4 py-3 font-mono text-xs text-subtle">{row.slug}</td>
              <td className="px-4 py-3"><StatusBadge status={row.status} /></td>
              <td className="px-4 py-3">{row.featured ? "★" : ""}</td>
              <td className="px-4 py-3 font-mono text-xs text-subtle">{row.sortOrder}</td>
              <td className="px-4 py-3 text-right">
                <DeleteForm action={deleteProject} id={row.id} />
              </td>
            </tr>
          ))}
        </AdminTable>
      )}
    </>
  );
}
