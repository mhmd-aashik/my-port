import { AdminForm } from "@/components/admin/admin-form";
import { StatusSelect, TextArea, TextInput } from "@/components/admin/fields";
import { MediaSelect } from "@/components/admin/media-select";
import { upsertEducation } from "./actions";

type EducationRow = {
  id: string;
  qualification: string;
  institution: string;
  location: string;
  startDate: string;
  endDate: string;
  areas: string[];
  logoId: string | null;
  sortOrder: number;
  status: "draft" | "published" | "archived";
};

export async function EducationForm({ education }: { education?: EducationRow }) {
  return (
    <AdminForm
      action={upsertEducation}
      submitLabel={education ? "Save changes" : "Create entry"}
    >
      {education && <input type="hidden" name="id" value={education.id} />}
      <div className="grid gap-5 sm:grid-cols-2">
        <TextInput label="Qualification" name="qualification" defaultValue={education?.qualification} required />
        <TextInput label="Institution" name="institution" defaultValue={education?.institution} required />
        <TextInput label="Location" name="location" defaultValue={education?.location} />
        <TextInput label="Start date" name="startDate" defaultValue={education?.startDate} />
        <TextInput label="End date" name="endDate" defaultValue={education?.endDate} />
        <TextInput label="Sort order" name="sortOrder" type="number" defaultValue={String(education?.sortOrder ?? 0)} />
      </div>
      <TextArea
        label="Main learning areas (one per line)"
        name="areas"
        defaultValue={education?.areas.join("\n")}
        rows={4}
      />
      <div className="grid gap-5 sm:grid-cols-2">
        <MediaSelect label="Institution logo" name="logoId" defaultValue={education?.logoId} />
        <StatusSelect defaultValue={education?.status} />
      </div>
    </AdminForm>
  );
}
