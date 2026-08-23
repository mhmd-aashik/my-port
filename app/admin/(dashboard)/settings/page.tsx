import { db, tables } from "@/db";
import { eq } from "drizzle-orm";
import { AdminForm } from "@/components/admin/admin-form";
import { TextArea, TextInput } from "@/components/admin/fields";
import { AdminPageHeader } from "@/components/admin/ui";
import { saveSettings } from "./actions";

export const dynamic = "force-dynamic";

export default async function SettingsPage() {
  const settings = await db.query.siteSettings.findFirst({
    where: eq(tables.siteSettings.id, 1),
  });

  return (
    <>
      <AdminPageHeader
        title="Site Settings"
        description="Global metadata, hero content, and shared text."
      />
      <AdminForm action={saveSettings}>
        <div className="grid gap-5 sm:grid-cols-2">
          <TextInput label="Website title" name="siteTitle" defaultValue={settings?.siteTitle} required />
          <TextInput label="Hero CTA (primary)" name="heroCtaPrimary" defaultValue={settings?.heroCtaPrimary} />
        </div>
        <TextArea label="Website description (SEO)" name="siteDescription" defaultValue={settings?.siteDescription} rows={3} />
        <TextInput label="Hero heading" name="heroHeading" defaultValue={settings?.heroHeading} />
        <TextArea label="Hero description" name="heroDescription" defaultValue={settings?.heroDescription} rows={3} />
        <div className="grid gap-5 sm:grid-cols-2">
          <TextInput label="Hero CTA (secondary)" name="heroCtaSecondary" defaultValue={settings?.heroCtaSecondary} />
          <TextInput label="Footer text" name="footerText" defaultValue={settings?.footerText} />
        </div>
        <TextArea label="Contact-page intro text" name="contactPageText" defaultValue={settings?.contactPageText} rows={2} />
      </AdminForm>
    </>
  );
}
