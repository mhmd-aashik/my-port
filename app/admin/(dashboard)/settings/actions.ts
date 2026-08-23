"use server";

import { z } from "zod";
import { db, tables } from "@/db";
import { requireAdmin } from "@/lib/admin/auth";
import { logAudit } from "@/lib/admin/audit";
import { revalidatePublic } from "@/lib/admin/revalidate";
import {
  fieldErrorsFrom,
  str,
  type ActionState,
} from "@/lib/admin/action-state";

const settingsSchema = z.object({
  siteTitle: z.string().min(1, "Required").max(120),
  siteDescription: z.string().max(400),
  heroHeading: z.string().max(200),
  heroDescription: z.string().max(500),
  heroCtaPrimary: z.string().max(60),
  heroCtaSecondary: z.string().max(60),
  footerText: z.string().max(300),
  contactPageText: z.string().max(500),
});

export async function saveSettings(
  _prev: ActionState,
  formData: FormData
): Promise<ActionState> {
  await requireAdmin();

  const parsed = settingsSchema.safeParse({
    siteTitle: str(formData.get("siteTitle")),
    siteDescription: str(formData.get("siteDescription")),
    heroHeading: str(formData.get("heroHeading")),
    heroDescription: str(formData.get("heroDescription")),
    heroCtaPrimary: str(formData.get("heroCtaPrimary")),
    heroCtaSecondary: str(formData.get("heroCtaSecondary")),
    footerText: str(formData.get("footerText")),
    contactPageText: str(formData.get("contactPageText")),
  });
  if (!parsed.success) return { fieldErrors: fieldErrorsFrom(parsed.error) };

  await db
    .insert(tables.siteSettings)
    .values({ id: 1, ...parsed.data })
    .onConflictDoUpdate({
      target: tables.siteSettings.id,
      set: { ...parsed.data, updatedAt: new Date() },
    });

  await logAudit({ action: "update", entity: "siteSettings", summary: "Saved site settings" });
  revalidatePublic("settings");
  return { success: "Settings saved." };
}
