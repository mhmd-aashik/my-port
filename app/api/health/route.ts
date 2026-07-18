import { NextResponse } from "next/server";
import { sql } from "drizzle-orm";
import { db } from "@/db";

export const dynamic = "force-dynamic";

// Health check for Railway. Reports component status only — no secrets,
// connection strings, or infrastructure details.
export async function GET() {
  let database = "ok";
  try {
    await db.execute(sql`SELECT 1`);
  } catch {
    database = "unavailable";
  }

  const storageConfigured = Boolean(
    process.env.RAILWAY_BUCKET_ENDPOINT &&
      process.env.RAILWAY_BUCKET_NAME &&
      process.env.RAILWAY_BUCKET_ACCESS_KEY_ID &&
      process.env.RAILWAY_BUCKET_SECRET_ACCESS_KEY
  );

  const healthy = database === "ok";
  return NextResponse.json(
    {
      status: healthy ? "ok" : "degraded",
      database,
      storage: storageConfigured ? "configured" : "not_configured",
      timestamp: new Date().toISOString(),
    },
    { status: healthy ? 200 : 503 }
  );
}
