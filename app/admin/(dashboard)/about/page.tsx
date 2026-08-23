import { asc } from "drizzle-orm";
import { db, tables } from "@/db";
import { AdminForm } from "@/components/admin/admin-form";
import { DeleteForm } from "@/components/admin/delete-form";
import { CheckboxInput, TextArea, TextInput } from "@/components/admin/fields";
import { AdminPageHeader, EmptyState } from "@/components/admin/ui";
import { deleteAboutSection, upsertAboutSection } from "./actions";

export const dynamic = "force-dynamic";

export default async function AboutAdminPage() {
  const sections = await db
    .select()
    .from(tables.aboutSections)
    .orderBy(asc(tables.aboutSections.sortOrder));

  return (
    <>
      <AdminPageHeader
        title="About"
        description="Engineering principles and about-page sections. Each section is edited inline below."
      />
      {sections.length === 0 && <EmptyState message="No sections yet — add one below." />}
      <div className="space-y-6">
        {sections.map((section) => (
          <details
            key={section.id}
            className="rounded-lg border border-border bg-surface p-4"
          >
            <summary className="cursor-pointer text-sm font-medium">
              {section.title}
              {!section.visible && (
                <span className="ml-2 font-mono text-xs text-subtle">(hidden)</span>
              )}
            </summary>
            <div className="mt-4 space-y-4">
              <AdminForm action={upsertAboutSection} submitLabel="Save section">
                <input type="hidden" name="id" value={section.id} />
                <TextInput label="Title" name="title" defaultValue={section.title} required />
                <TextArea label="Body" name="body" defaultValue={section.body} rows={3} />
                <div className="flex items-center gap-6">
                  <TextInput label="Sort order" name="sortOrder" type="number" defaultValue={String(section.sortOrder)} />
                  <CheckboxInput label="Visible" name="visible" defaultChecked={section.visible} />
                </div>
              </AdminForm>
              <DeleteForm action={deleteAboutSection} id={section.id} label="Delete section" />
            </div>
          </details>
        ))}
      </div>

      <div className="mt-10 rounded-lg border border-dashed border-border-strong p-5">
        <h2 className="mb-4 text-sm font-semibold">Add new section</h2>
        <AdminForm action={upsertAboutSection} submitLabel="Add section">
          <TextInput label="Title" name="title" required />
          <TextArea label="Body" name="body" rows={3} />
          <div className="flex items-center gap-6">
            <TextInput label="Sort order" name="sortOrder" type="number" defaultValue="0" />
            <CheckboxInput label="Visible" name="visible" defaultChecked />
          </div>
        </AdminForm>
      </div>
    </>
  );
}
