import "server-only";
import {
  DeleteObjectCommand,
  GetObjectCommand,
  PutObjectCommand,
  S3Client,
} from "@aws-sdk/client-s3";
import { createHash, randomUUID } from "crypto";
import { requireEnv } from "./env";

let s3: S3Client | null = null;

function client(): S3Client {
  if (!s3) {
    s3 = new S3Client({
      endpoint: requireEnv("RAILWAY_BUCKET_ENDPOINT"),
      region: process.env.RAILWAY_BUCKET_REGION || "auto",
      credentials: {
        accessKeyId: requireEnv("RAILWAY_BUCKET_ACCESS_KEY_ID"),
        secretAccessKey: requireEnv("RAILWAY_BUCKET_SECRET_ACCESS_KEY"),
      },
      forcePathStyle: true,
    });
  }
  return s3;
}

function bucket(): string {
  return requireEnv("RAILWAY_BUCKET_NAME");
}

// ---- File validation -------------------------------------------------------

export const ALLOWED_TYPES: Record<string, { ext: string; magic: number[][] }> = {
  "image/jpeg": { ext: "jpg", magic: [[0xff, 0xd8, 0xff]] },
  "image/png": { ext: "png", magic: [[0x89, 0x50, 0x4e, 0x47]] },
  "image/webp": { ext: "webp", magic: [[0x52, 0x49, 0x46, 0x46]] }, // RIFF
  "image/avif": { ext: "avif", magic: [] }, // ISO-BMFF; checked via ftyp below
  "application/pdf": { ext: "pdf", magic: [[0x25, 0x50, 0x44, 0x46]] }, // %PDF
};

export function maxUploadBytes(): number {
  const mb = Number(process.env.MAX_UPLOAD_MB || 10);
  return (Number.isFinite(mb) && mb > 0 ? mb : 10) * 1024 * 1024;
}

// Validates both declared MIME type and actual file signature.
export function validateFile(
  mimeType: string,
  bytes: Buffer
): { ok: true; ext: string } | { ok: false; reason: string } {
  const spec = ALLOWED_TYPES[mimeType];
  if (!spec) return { ok: false, reason: "File type not allowed." };
  if (bytes.length === 0) return { ok: false, reason: "Empty file." };

  if (mimeType === "image/avif") {
    // ISO-BMFF: bytes 4..8 must be "ftyp"
    const ftyp = bytes.subarray(4, 8).toString("ascii");
    if (ftyp !== "ftyp") return { ok: false, reason: "File content does not match its type." };
    return { ok: true, ext: spec.ext };
  }

  const matches = spec.magic.some((sig) =>
    sig.every((byte, i) => bytes[i] === byte)
  );
  if (!matches) return { ok: false, reason: "File content does not match its type." };
  return { ok: true, ext: spec.ext };
}

export function generateObjectKey(folder: string, ext: string): string {
  // Collision-resistant; never trusts the original filename.
  return `portfolio/${folder}/${randomUUID()}.${ext}`;
}

export function checksumOf(bytes: Buffer): string {
  return createHash("sha256").update(bytes).digest("hex");
}

// ---- Bucket operations -----------------------------------------------------

export async function putObject(
  key: string,
  bytes: Buffer,
  contentType: string
): Promise<void> {
  await client().send(
    new PutObjectCommand({
      Bucket: bucket(),
      Key: key,
      Body: bytes,
      ContentType: contentType,
    })
  );
}

export async function deleteObject(key: string): Promise<void> {
  await client().send(new DeleteObjectCommand({ Bucket: bucket(), Key: key }));
}

export async function getObjectStream(key: string): Promise<{
  body: ReadableStream;
  contentType: string | undefined;
  contentLength: number | undefined;
}> {
  const res = await client().send(
    new GetObjectCommand({ Bucket: bucket(), Key: key })
  );
  return {
    body: res.Body!.transformToWebStream(),
    contentType: res.ContentType,
    contentLength: res.ContentLength,
  };
}
