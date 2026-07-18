import "server-only";
import { db, tables } from "@/db";

export async function logAudit(input: {
  action: string;
  entity: string;
  entityId?: string;
  summary?: string;
  meta?: Record<string, unknown>;
}): Promise<void> {
  try {
    await db.insert(tables.auditLogs).values({
      action: input.action,
      entity: input.entity,
      entityId: input.entityId ?? "",
      summary: input.summary ?? "",
      meta: input.meta ?? null,
    });
  } catch (err) {
    // Auditing must never break a mutation; log and continue.
    console.error("Audit log failed:", err);
  }
}
