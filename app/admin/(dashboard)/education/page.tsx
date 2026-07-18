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
import { deleteEducation } from "./actions";

export const dynamic = "force-dynamic";

export default async function EducationAdminPage() {
  const rows = await db
    .select()
    .from(tables.education)
    .orderBy(asc(tables.education.sortOrder));

  return (
    <>
      <AdminPageHeader
        title="Education"
        description="Qualifications and study."
        action={{ href: "/admin/education/new", label: "Add qualification" }}
      />
      {rows.length === 0 ? (
        <EmptyState message="No education entries yet." />
      ) : (
        <AdminTable headers={["Qualification", "Institution", "Period", "Status", ""]}>
          {rows.map((row) => (
            <tr key={row.id} className="bg-surface/50">
              <td className="px-4 py-3">
                <Link href={`/admin/education/${row.id}`} className="font-medium hover:text-accent">
                  {row.qualification}
                </Link>
              </td>
              <td className="px-4 py-3 text-muted">{row.institution}</td>
              <td className="px-4 py-3 font-mono text-xs text-subtle">
                {row.startDate}{row.endDate ? ` – ${row.endDate}` : ""}
              </td>
              <td className="px-4 py-3"><StatusBadge status={row.status} /></td>
              <td className="px-4 py-3 text-right">
                <DeleteForm action={deleteEducation} id={row.id} />
              </td>
            </tr>
          ))}
        </AdminTable>
      )}
    </>
  );
}
