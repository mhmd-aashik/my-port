import { desc } from "drizzle-orm";
import { db, tables } from "@/db";
import { SelectInput } from "./fields";

// Server component: dropdown of existing media assets (upload via /admin/media).
export async function MediaSelect({
  label,
  name,
  defaultValue,
  pdfOnly = false,
  hint,
}: {
  label: string;
  name: string;
  defaultValue?: string | null;
  pdfOnly?: boolean;
  hint?: string;
}) {
  const assets = await db
    .select({
      id: tables.mediaAssets.id,
      originalFilename: tables.mediaAssets.originalFilename,
      mimeType: tables.mediaAssets.mimeType,
      folder: tables.mediaAssets.folder,
    })
    .from(tables.mediaAssets)
    .orderBy(desc(tables.mediaAssets.createdAt))
    .limit(200);

  const filtered = assets.filter((a) =>
    pdfOnly ? a.mimeType === "application/pdf" : a.mimeType !== "application/pdf"
  );

  return (
    <SelectInput
      label={label}
      name={name}
      defaultValue={defaultValue ?? ""}
      hint={hint ?? "Upload files in the Media section first."}
      options={[
        { value: "", label: "— none —" },
        ...filtered.map((a) => ({
          value: a.id,
          label: `${a.folder}/${a.originalFilename}`,
        })),
      ]}
    />
  );
}
