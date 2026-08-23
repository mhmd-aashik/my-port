import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { db, tables } from "@/db";
import { getObjectStream } from "@/lib/storage";

// Public media delivery: streams objects from the private bucket through the
// server. Credentials never reach the browser; unknown IDs 404.
export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  if (!/^[0-9a-f-]{36}$/i.test(id)) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const asset = await db.query.mediaAssets.findFirst({
    where: eq(tables.mediaAssets.id, id),
  });
  if (!asset) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  try {
    const { body, contentType, contentLength } = await getObjectStream(
      asset.objectKey
    );
    return new Response(body, {
      headers: {
        "Content-Type": contentType ?? asset.mimeType,
        ...(contentLength ? { "Content-Length": String(contentLength) } : {}),
        "Cache-Control": "public, max-age=86400, stale-while-revalidate=604800",
        "Content-Disposition":
          asset.mimeType === "application/pdf"
            ? `inline; filename="${asset.generatedFilename}"`
            : "inline",
        "X-Content-Type-Options": "nosniff",
      },
    });
  } catch (err) {
    console.error("Media delivery failed:", err);
    return NextResponse.json({ error: "Unavailable" }, { status: 502 });
  }
}
