"use server";

import { eq } from "drizzle-orm";
import { db, tables } from "@/db";
import { requireAdmin } from "@/lib/admin/auth";
import { logAudit } from "@/lib/admin/audit";
import { str, type ActionState } from "@/lib/admin/action-state";

const VALID = ["unread", "read", "replied", "archived", "spam"] as const;
type MessageStatus = (typeof VALID)[number];

export async function setMessageStatus(
  _prev: ActionState,
  formData: FormData
): Promise<ActionState> {
  await requireAdmin();
  const id = str(formData.get("id"));
  const status = str(formData.get("status")) as MessageStatus;
  if (!id || !VALID.includes(status)) return { error: "Invalid request." };

  await db
    .update(tables.contactMessages)
    .set({
      status,
      readAt: status === "read" || status === "replied" ? new Date() : undefined,
      repliedAt: status === "replied" ? new Date() : undefined,
    })
    .where(eq(tables.contactMessages.id, id));

  await logAudit({
    action: "update",
    entity: "contactMessages",
    entityId: id,
    summary: `Marked ${status}`,
  });
  return { success: `Marked as ${status}.` };
}
