"use server";

import { eq, or } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { db, tables } from "@/db";
import { requireAdmin } from "@/lib/admin/auth";
import { logAudit } from "@/lib/admin/audit";
import {
  checksumOf,
  deleteObject,
  generateObjectKey,
  maxUploadBytes,
  putObject,
  validateFile,
} from "@/lib/storage";

export type MediaActionState = { error?: string; success?: string } | null;

const FOLDERS = [
  "profile",
  "projects",
  "blog",
  "story",
  "education",
  "experience",
  "documents",
  "misc",
] as const;

export async function uploadMedia(
  _prev: MediaActionState,
  formData: FormData
): Promise<MediaActionState> {
  await requireAdmin();

  const file = formData.get("file");
  const folderRaw = String(formData.get("folder") ?? "misc");
  const altText = String(formData.get("altText") ?? "").slice(0, 300);
  const folder = (FOLDERS as readonly string[]).includes(folderRaw)
    ? (folderRaw as (typeof FOLDERS)[number])
    : "misc";

  if (!(file instanceof File)) return { error: "No file selected." };
  if (file.size > maxUploadBytes()) {
    return {
      error: `File exceeds the ${Math.round(maxUploadBytes() / 1024 / 1024)} MB limit.`,
    };
  }

  const bytes = Buffer.from(await file.arrayBuffer());
  const check = validateFile(file.type, bytes);
  if (!check.ok) return { error: check.reason };

  const objectKey = generateObjectKey(folder, check.ext);
  const generatedFilename = objectKey.split("/").pop()!;

  // Upload first, then insert metadata; clean the object up if the DB insert
  // fails so no orphaned files accumulate in the bucket.
  try {
    await putObject(objectKey, bytes, file.type);
  } catch (err) {
    console.error("Bucket upload failed:", err);
    return {
      error:
        "Upload to storage failed. Check bucket credentials (RAILWAY_BUCKET_SECRET_ACCESS_KEY).",
    };
  }

  try {
    await db.insert(tables.mediaAssets).values({
      objectKey,
      originalFilename: file.name.slice(0, 255),
      generatedFilename,
      mimeType: file.type,
      fileSize: file.size,
      altText,
      checksum: checksumOf(bytes),
      folder,
    });
  } catch (err) {
    console.error("Media metadata insert failed; cleaning up object:", err);
    await deleteObject(objectKey).catch(() => {});
    return { error: "Could not save file metadata. Upload rolled back." };
  }

  await logAudit({
    action: "upload",
    entity: "mediaAssets",
    summary: `Uploaded ${file.name} → ${objectKey}`,
  });
  revalidatePath("/admin/media");
  return { success: "File uploaded." };
}

export async function updateMediaMeta(
  _prev: MediaActionState,
  formData: FormData
): Promise<MediaActionState> {
  await requireAdmin();
  const id = String(formData.get("id") ?? "");
  const altText = String(formData.get("altText") ?? "").slice(0, 300);
  const caption = String(formData.get("caption") ?? "").slice(0, 500);
  if (!id) return { error: "Missing asset ID." };

  await db
    .update(tables.mediaAssets)
    .set({ altText, caption, updatedAt: new Date() })
    .where(eq(tables.mediaAssets.id, id));

  await logAudit({
    action: "update",
    entity: "mediaAssets",
    entityId: id,
    summary: "Updated alt text / caption",
  });
  revalidatePath("/admin/media");
  return { success: "Metadata saved." };
}

// Refuses to delete assets still referenced by content.
export async function deleteMedia(
  _prev: MediaActionState,
  formData: FormData
): Promise<MediaActionState> {
  await requireAdmin();
  const id = String(formData.get("id") ?? "");
  if (!id) return { error: "Missing asset ID." };

  const asset = await db.query.mediaAssets.findFirst({
    where: eq(tables.mediaAssets.id, id),
  });
  if (!asset) return { error: "Asset not found." };

  const [profileRef, projectRef, imageRef, chapterRef, postRef, expRef, eduRef, msRef] =
    await Promise.all([
      db.query.profile.findFirst({
        where: or(
          eq(tables.profile.photoId, id),
          eq(tables.profile.cvId, id)
        ),
      }),
      db.query.projects.findFirst({
        where: or(
          eq(tables.projects.featuredImageId, id),
          eq(tables.projects.ogImageId, id)
        ),
      }),
      db.query.projectImages.findFirst({
        where: eq(tables.projectImages.mediaId, id),
      }),
      db.query.storyChapters.findFirst({
        where: eq(tables.storyChapters.coverImageId, id),
      }),
      db.query.blogPosts.findFirst({
        where: or(
          eq(tables.blogPosts.featuredImageId, id),
          eq(tables.blogPosts.ogImageId, id)
        ),
      }),
      db.query.experiences.findFirst({
        where: eq(tables.experiences.logoId, id),
      }),
      db.query.education.findFirst({
        where: eq(tables.education.logoId, id),
      }),
      db.query.storyMilestones.findFirst({
        where: eq(tables.storyMilestones.imageId, id),
      }),
    ]);

  if (
    profileRef || projectRef || imageRef || chapterRef ||
    postRef || expRef || eduRef || msRef
  ) {
    return {
      error:
        "This file is still used by content. Remove those references first.",
    };
  }

  await db.delete(tables.mediaAssets).where(eq(tables.mediaAssets.id, id));
  await deleteObject(asset.objectKey).catch((err) => {
    console.error("Object delete failed (metadata already removed):", err);
  });

  await logAudit({
    action: "delete",
    entity: "mediaAssets",
    entityId: id,
    summary: `Deleted ${asset.originalFilename}`,
  });
  revalidatePath("/admin/media");
  return { success: "File deleted." };
}
