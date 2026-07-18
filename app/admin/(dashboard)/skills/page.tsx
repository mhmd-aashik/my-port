import { asc } from "drizzle-orm";
import { db, tables } from "@/db";
import { AdminForm } from "@/components/admin/admin-form";
import { DeleteForm } from "@/components/admin/delete-form";
import {
  CheckboxInput,
  SelectInput,
  TextArea,
  TextInput,
} from "@/components/admin/fields";
import { AdminPageHeader, EmptyState } from "@/components/admin/ui";
import {
  deleteSkill,
  deleteSkillCategory,
  upsertSkill,
  upsertSkillCategory,
} from "./actions";

export const dynamic = "force-dynamic";

const levelOptions = [
  { value: "core_expertise", label: "Core expertise" },
  { value: "strong_experience", label: "Strong experience" },
  { value: "working_knowledge", label: "Working knowledge" },
  { value: "currently_learning", label: "Currently learning" },
];

export default async function SkillsAdminPage() {
  const [categories, skills] = await Promise.all([
    db.select().from(tables.skillCategories).orderBy(asc(tables.skillCategories.sortOrder)),
    db.select().from(tables.skills).orderBy(asc(tables.skills.sortOrder)),
  ]);

  const categoryOptions = [
    { value: "", label: "— uncategorized —" },
    ...categories.map((c) => ({ value: c.id, label: c.name })),
  ];

  return (
    <>
      <AdminPageHeader
        title="Skills"
        description="Categories and skills with capability levels — no percentages."
      />

      {categories.length === 0 && (
        <EmptyState message="No skill categories yet — add one below." />
      )}

      <div className="space-y-8">
        {categories.map((cat) => {
          const catSkills = skills.filter((s) => s.categoryId === cat.id);
          return (
            <section key={cat.id} className="rounded-lg border border-border bg-surface p-5">
              <details>
                <summary className="cursor-pointer text-sm font-semibold">
                  {cat.name}{" "}
                  <span className="font-normal text-subtle">
                    ({catSkills.length} skills{cat.visible ? "" : ", hidden"})
                  </span>
                </summary>
                <div className="mt-4 space-y-4 border-t border-border pt-4">
                  <AdminForm action={upsertSkillCategory} submitLabel="Save category">
                    <input type="hidden" name="id" value={cat.id} />
                    <div className="grid gap-4 sm:grid-cols-2">
                      <TextInput label="Name" name="name" defaultValue={cat.name} required />
                      <TextInput label="Sort order" name="sortOrder" type="number" defaultValue={String(cat.sortOrder)} />
                    </div>
                    <TextArea label="Description" name="description" defaultValue={cat.description} rows={2} />
                    <CheckboxInput label="Visible" name="visible" defaultChecked={cat.visible} />
                  </AdminForm>
                  <DeleteForm action={deleteSkillCategory} id={cat.id} label="Delete category" />
                </div>
              </details>

              <ul className="mt-4 space-y-2">
                {catSkills.map((skill) => (
                  <li key={skill.id} className="rounded-md border border-border p-3">
                    <details>
                      <summary className="cursor-pointer text-sm">
                        {skill.name}{" "}
                        <span className="font-mono text-xs text-subtle">
                          {skill.level.replace("_", " ")}
                          {skill.core ? " · core" : ""}
                          {skill.visible ? "" : " · hidden"}
                        </span>
                      </summary>
                      <div className="mt-3 space-y-3">
                        <AdminForm action={upsertSkill} submitLabel="Save skill">
                          <input type="hidden" name="id" value={skill.id} />
                          <div className="grid gap-4 sm:grid-cols-2">
                            <TextInput label="Name" name="name" defaultValue={skill.name} required />
                            <SelectInput label="Level" name="level" defaultValue={skill.level} options={levelOptions} />
                            <SelectInput label="Category" name="categoryId" defaultValue={skill.categoryId ?? ""} options={categoryOptions} />
                            <TextInput label="Sort order" name="sortOrder" type="number" defaultValue={String(skill.sortOrder)} />
                          </div>
                          <TextArea label="How I use this skill" name="usage" defaultValue={skill.usage} rows={2} />
                          <div className="flex gap-6">
                            <CheckboxInput label="Core skill" name="core" defaultChecked={skill.core} />
                            <CheckboxInput label="Visible" name="visible" defaultChecked={skill.visible} />
                          </div>
                        </AdminForm>
                        <DeleteForm action={deleteSkill} id={skill.id} label="Delete skill" />
                      </div>
                    </details>
                  </li>
                ))}
              </ul>
            </section>
          );
        })}
      </div>

      <div className="mt-10 grid gap-8 lg:grid-cols-2">
        <div className="rounded-lg border border-dashed border-border-strong p-5">
          <h2 className="mb-4 text-sm font-semibold">Add category</h2>
          <AdminForm action={upsertSkillCategory} submitLabel="Add category">
            <TextInput label="Name" name="name" required />
            <TextArea label="Description" name="description" rows={2} />
            <div className="flex items-end gap-4">
              <TextInput label="Sort order" name="sortOrder" type="number" defaultValue="0" />
              <CheckboxInput label="Visible" name="visible" defaultChecked />
            </div>
          </AdminForm>
        </div>
        <div className="rounded-lg border border-dashed border-border-strong p-5">
          <h2 className="mb-4 text-sm font-semibold">Add skill</h2>
          <AdminForm action={upsertSkill} submitLabel="Add skill">
            <TextInput label="Name" name="name" required />
            <SelectInput label="Category" name="categoryId" options={categoryOptions} />
            <SelectInput label="Level" name="level" defaultValue="strong_experience" options={levelOptions} />
            <TextArea label="How I use this skill" name="usage" rows={2} />
            <div className="flex items-end gap-4">
              <TextInput label="Sort order" name="sortOrder" type="number" defaultValue="0" />
              <CheckboxInput label="Core skill" name="core" />
              <CheckboxInput label="Visible" name="visible" defaultChecked />
            </div>
          </AdminForm>
        </div>
      </div>
    </>
  );
}
