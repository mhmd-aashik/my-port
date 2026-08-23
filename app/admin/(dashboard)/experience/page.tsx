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
import { deleteExperience } from "./actions";

export const dynamic = "force-dynamic";

export default async function ExperienceAdminPage() {
  const rows = await db
    .select()
    .from(tables.experiences)
    .orderBy(asc(tables.experiences.sortOrder));

  return (
    <>
      <AdminPageHeader
        title="Experience"
        description="Professional roles shown on the timeline."
        action={{ href: "/admin/experience/new", label: "Add experience" }}
      />
      {rows.length === 0 ? (
        <EmptyState message="No experience entries yet. Run the seed or add one." />
      ) : (
        <AdminTable headers={["Role", "Company", "Period", "Status", "Order", ""]}>
          {rows.map((row) => (
            <tr key={row.id} className="bg-surface/50">
              <td className="px-4 py-3">
                <Link href={`/admin/experience/${row.id}`} className="font-medium hover:text-accent">
                  {row.role}
                </Link>
                {row.featured && (
                  <span className="ml-2 font-mono text-xs text-accent">★</span>
                )}
              </td>
              <td className="px-4 py-3 text-muted">{row.company}</td>
              <td className="px-4 py-3 font-mono text-xs text-subtle">
                {row.startDate} – {row.current ? "Present" : row.endDate}
              </td>
              <td className="px-4 py-3"><StatusBadge status={row.status} /></td>
              <td className="px-4 py-3 font-mono text-xs text-subtle">{row.sortOrder}</td>
              <td className="px-4 py-3 text-right">
                <DeleteForm action={deleteExperience} id={row.id} />
              </td>
            </tr>
          ))}
        </AdminTable>
      )}
    </>
  );
}
