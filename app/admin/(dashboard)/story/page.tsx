import Link from "next/link";
import { asc } from "drizzle-orm";
import { db, tables } from "@/db";
import { AdminForm } from "@/components/admin/admin-form";
import { DeleteForm } from "@/components/admin/delete-form";
import { CheckboxInput, TextArea, TextInput } from "@/components/admin/fields";
import {
  AdminPageHeader,
  AdminTable,
  EmptyState,
  StatusBadge,
} from "@/components/admin/ui";
import { deleteChapter, deleteMilestone, upsertMilestone } from "./actions";

export const dynamic = "force-dynamic";

export default async function StoryAdminPage() {
  const [chapters, milestones] = await Promise.all([
    db.select().from(tables.storyChapters).orderBy(asc(tables.storyChapters.sortOrder)),
    db.select().from(tables.storyMilestones).orderBy(asc(tables.storyMilestones.sortOrder)),
  ]);

  return (
    <>
      <AdminPageHeader
        title="My Story"
        description="Chapters and timeline milestones."
        action={{ href: "/admin/story/new", label: "Add chapter" }}
      />

      {chapters.length === 0 ? (
        <EmptyState message="No chapters yet." />
      ) : (
        <AdminTable headers={["Chapter", "Period", "Status", "Order", ""]}>
          {chapters.map((ch) => (
            <tr key={ch.id} className="bg-surface/50">
              <td className="px-4 py-3">
                <Link href={`/admin/story/${ch.id}`} className="font-medium hover:text-accent">
                  {ch.title}
                </Link>
              </td>
              <td className="px-4 py-3 font-mono text-xs text-subtle">{ch.timePeriod}</td>
              <td className="px-4 py-3"><StatusBadge status={ch.status} /></td>
              <td className="px-4 py-3 font-mono text-xs text-subtle">{ch.sortOrder}</td>
              <td className="px-4 py-3 text-right">
                <DeleteForm action={deleteChapter} id={ch.id} />
              </td>
            </tr>
          ))}
        </AdminTable>
      )}

      <h2 className="mb-4 mt-12 text-lg font-semibold">Timeline milestones</h2>
      <div className="space-y-3">
        {milestones.map((m) => (
          <details key={m.id} className="rounded-lg border border-border bg-surface p-4">
            <summary className="cursor-pointer text-sm">
              <span className="font-mono text-xs text-accent">{m.date}</span>{" "}
              {m.title}
              {!m.visible && <span className="ml-2 font-mono text-xs text-subtle">(hidden)</span>}
            </summary>
            <div className="mt-4 space-y-3">
              <AdminForm action={upsertMilestone} submitLabel="Save milestone">
                <input type="hidden" name="id" value={m.id} />
                <div className="grid gap-4 sm:grid-cols-3">
                  <TextInput label="Date / year" name="date" defaultValue={m.date} required />
                  <TextInput label="Title" name="title" defaultValue={m.title} required />
                  <TextInput label="Sort order" name="sortOrder" type="number" defaultValue={String(m.sortOrder)} />
                </div>
                <TextArea label="Description" name="description" defaultValue={m.description} rows={2} />
                <CheckboxInput label="Visible" name="visible" defaultChecked={m.visible} />
              </AdminForm>
              <DeleteForm action={deleteMilestone} id={m.id} label="Delete milestone" />
            </div>
          </details>
        ))}
      </div>

      <div className="mt-8 rounded-lg border border-dashed border-border-strong p-5">
        <h3 className="mb-4 text-sm font-semibold">Add milestone</h3>
        <AdminForm action={upsertMilestone} submitLabel="Add milestone">
          <div className="grid gap-4 sm:grid-cols-3">
            <TextInput label="Date / year" name="date" required />
            <TextInput label="Title" name="title" required />
            <TextInput label="Sort order" name="sortOrder" type="number" defaultValue="0" />
          </div>
          <TextArea label="Description" name="description" rows={2} />
          <CheckboxInput label="Visible" name="visible" defaultChecked />
        </AdminForm>
      </div>
    </>
  );
}
