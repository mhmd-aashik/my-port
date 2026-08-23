import { AdminForm } from "@/components/admin/admin-form";
import {
  CheckboxInput,
  StatusSelect,
  TextArea,
  TextInput,
} from "@/components/admin/fields";
import { MediaSelect } from "@/components/admin/media-select";
import { upsertExperience } from "./actions";

type ExperienceRow = {
  id: string;
  company: string;
  role: string;
  employmentType: string;
  location: string;
  startDate: string;
  endDate: string;
  current: boolean;
  context: string;
  technologies: string[];
  logoId: string | null;
  featured: boolean;
  sortOrder: number;
  status: "draft" | "published" | "archived";
};

type HighlightRow = { kind: string; body: string };

export async function ExperienceForm({
  experience,
  highlights = [],
}: {
  experience?: ExperienceRow;
  highlights?: HighlightRow[];
}) {
  const byKind = (kind: string) =>
    highlights
      .filter((h) => h.kind === kind)
      .map((h) => h.body)
      .join("\n");

  return (
    <AdminForm
      action={upsertExperience}
      submitLabel={experience ? "Save changes" : "Create experience"}
    >
      {experience && <input type="hidden" name="id" value={experience.id} />}
      <div className="grid gap-5 sm:grid-cols-2">
        <TextInput label="Company" name="company" defaultValue={experience?.company} required />
        <TextInput label="Job title" name="role" defaultValue={experience?.role} required />
        <TextInput label="Employment type" name="employmentType" defaultValue={experience?.employmentType ?? "Full-time"} />
        <TextInput label="Location" name="location" defaultValue={experience?.location} />
        <TextInput label="Start date" name="startDate" defaultValue={experience?.startDate} hint='Display text, e.g. "Jan 2024"' />
        <TextInput label="End date" name="endDate" defaultValue={experience?.endDate} hint="Leave empty if current role" />
      </div>
      <div className="flex flex-wrap gap-6">
        <CheckboxInput label="Currently working here" name="current" defaultChecked={experience?.current} />
        <CheckboxInput label="Featured on homepage" name="featured" defaultChecked={experience?.featured} />
      </div>
      <TextArea label="Context / company summary" name="context" defaultValue={experience?.context} rows={2} />
      <TextArea
        label="Responsibilities & contributions (one per line)"
        name="responsibilities"
        defaultValue={byKind("responsibility")}
        rows={6}
      />
      <div className="grid gap-5 sm:grid-cols-2">
        <TextArea label="Technical challenges (one per line)" name="challenges" defaultValue={byKind("challenge")} rows={4} />
        <TextArea label="Outcomes (one per line)" name="outcomes" defaultValue={byKind("outcome")} rows={4} />
      </div>
      <TextArea
        label="Technologies (one per line)"
        name="technologies"
        defaultValue={experience?.technologies.join("\n")}
        rows={4}
      />
      <div className="grid gap-5 sm:grid-cols-3">
        <MediaSelect label="Company logo" name="logoId" defaultValue={experience?.logoId} />
        <TextInput label="Sort order" name="sortOrder" type="number" defaultValue={String(experience?.sortOrder ?? 0)} hint="Lower numbers appear first" />
        <StatusSelect defaultValue={experience?.status} />
      </div>
    </AdminForm>
  );
}
