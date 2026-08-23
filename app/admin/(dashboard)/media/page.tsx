import { desc, ilike } from "drizzle-orm";
import { db, tables } from "@/db";
import { AdminForm } from "@/components/admin/admin-form";
import { DeleteForm } from "@/components/admin/delete-form";
import { SelectInput, TextInput } from "@/components/admin/fields";
import { AdminPageHeader, EmptyState } from "@/components/admin/ui";
import { deleteMedia, updateMediaMeta, uploadMedia } from "./actions";
import { UploadInput } from "./upload-input";

export const dynamic = "force-dynamic";

const folderOptions = [
  "profile",
  "projects",
  "blog",
  "story",
  "education",
  "experience",
  "documents",
  "misc",
].map((f) => ({ value: f, label: `portfolio/${f}/` }));

export default async function MediaAdminPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q } = await searchParams;
  const assets = await db
    .select()
    .from(tables.mediaAssets)
    .where(q ? ilike(tables.mediaAssets.originalFilename, `%${q}%`) : undefined)
    .orderBy(desc(tables.mediaAssets.createdAt))
    .limit(100);

  return (
    <>
      <AdminPageHeader
        title="Media Library"
        description="Images and documents stored in the Railway bucket. Files are validated by type, signature, and size."
      />

      <div className="mb-8 rounded-lg border border-dashed border-border-strong p-5">
        <h2 className="mb-4 text-sm font-semibold">Upload file</h2>
        <AdminForm action={uploadMedia} submitLabel="Upload">
          <UploadInput />
          <div className="grid gap-4 sm:grid-cols-2">
            <SelectInput label="Folder" name="folder" options={folderOptions} />
            <TextInput label="Alt text" name="altText" hint="Describe the image for screen readers" />
          </div>
        </AdminForm>
        <p className="mt-3 text-xs text-subtle">
          Allowed: JPEG, PNG, WebP, AVIF, PDF · Max {process.env.MAX_UPLOAD_MB || 10} MB
        </p>
      </div>

      <form method="GET" className="mb-5 flex gap-2">
        <input
          type="search"
          name="q"
          defaultValue={q}
          placeholder="Search by filename…"
          className="w-full max-w-xs rounded-md border border-border bg-surface px-3.5 py-2 text-sm focus:border-accent"
        />
        <button
          type="submit"
          className="rounded-md border border-border px-4 py-2 text-sm text-muted hover:text-foreground"
        >
          Search
        </button>
      </form>

      {assets.length === 0 ? (
        <EmptyState message="No files uploaded yet." />
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {assets.map((asset) => (
            <div key={asset.id} className="rounded-lg border border-border bg-surface p-4">
              {asset.mimeType.startsWith("image/") ? (
                /* eslint-disable-next-line @next/next/no-img-element */
                <img
                  src={`/api/media/${asset.id}`}
                  alt={asset.altText || asset.originalFilename}
                  className="mb-3 h-32 w-full rounded-md border border-border object-cover"
                  loading="lazy"
                />
              ) : (
                <div className="mb-3 flex h-32 items-center justify-center rounded-md border border-border bg-surface-raised font-mono text-xs text-subtle">
                  PDF
                </div>
              )}
              <p className="truncate text-sm font-medium" title={asset.originalFilename}>
                {asset.originalFilename}
              </p>
              <p className="mt-0.5 font-mono text-xs text-subtle">
                {asset.folder} · {(asset.fileSize / 1024).toFixed(0)} KB
              </p>
              <p className="mt-1 select-all break-all font-mono text-xs text-subtle">
                /api/media/{asset.id}
              </p>
              <details className="mt-3">
                <summary className="cursor-pointer text-xs text-muted">Edit metadata</summary>
                <div className="mt-3 space-y-3">
                  <AdminForm action={updateMediaMeta} submitLabel="Save">
                    <input type="hidden" name="id" value={asset.id} />
                    <TextInput label="Alt text" name="altText" defaultValue={asset.altText} />
                    <TextInput label="Caption" name="caption" defaultValue={asset.caption} />
                  </AdminForm>
                  <DeleteForm action={deleteMedia} id={asset.id} label="Delete file" />
                </div>
              </details>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
