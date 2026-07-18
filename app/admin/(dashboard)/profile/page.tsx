import { eq } from "drizzle-orm";
import { db, tables } from "@/db";
import { AdminForm } from "@/components/admin/admin-form";
import { TextArea, TextInput } from "@/components/admin/fields";
import { MediaSelect } from "@/components/admin/media-select";
import { AdminPageHeader } from "@/components/admin/ui";
import { saveProfile } from "./actions";

export const dynamic = "force-dynamic";

export default async function ProfileAdminPage() {
  const p = await db.query.profile.findFirst({
    where: eq(tables.profile.id, 1),
  });

  return (
    <>
      <AdminPageHeader
        title="Profile"
        description="Identity, contact details, biography, photo, and CV."
      />
      <AdminForm action={saveProfile}>
        <div className="grid gap-5 sm:grid-cols-2">
          <TextInput label="Full name" name="fullName" defaultValue={p?.fullName} required />
          <TextInput label="Professional headline" name="headline" defaultValue={p?.headline} />
          <TextInput label="Email" name="email" type="email" defaultValue={p?.email} required />
          <TextInput label="Phone" name="phone" defaultValue={p?.phone} />
          <TextInput label="Location" name="location" defaultValue={p?.location} />
          <TextInput label="Years of experience" name="yearsOfExperience" defaultValue={p?.yearsOfExperience} hint='e.g. "7+"' />
        </div>
        <TextArea label="Short biography (hero/subheadline)" name="shortBio" defaultValue={p?.shortBio} rows={3} />
        <TextArea label="Long biography (about/summary)" name="longBio" defaultValue={p?.longBio} rows={6} />
        <div className="grid gap-5 sm:grid-cols-2">
          <TextInput label="Availability status" name="availability" defaultValue={p?.availability} />
          <TextInput label="Relocation status" name="relocation" defaultValue={p?.relocation} />
        </div>
        <TextInput label="Response-time note" name="responseTime" defaultValue={p?.responseTime} />
        <div className="grid gap-5 sm:grid-cols-2">
          <MediaSelect label="Profile photograph" name="photoId" defaultValue={p?.photoId} />
          <MediaSelect label="CV file (PDF)" name="cvId" defaultValue={p?.cvId} pdfOnly />
        </div>
      </AdminForm>
    </>
  );
}
