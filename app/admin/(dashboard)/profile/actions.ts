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

const profileSchema = z.object({
  fullName: z.string().min(1, "Required").max(120),
  headline: z.string().max(160),
  shortBio: z.string().max(600),
  longBio: z.string().max(4000),
  email: z.string().email("Invalid email").max(200),
  phone: z.string().max(40),
  location: z.string().max(120),
  availability: z.string().max(200),
  relocation: z.string().max(200),
  yearsOfExperience: z.string().max(10),
  responseTime: z.string().max(200),
  photoId: z.string().uuid().or(z.literal("")),
  cvId: z.string().uuid().or(z.literal("")),
});

export async function saveProfile(
  _prev: ActionState,
  formData: FormData
): Promise<ActionState> {
  await requireAdmin();

  const parsed = profileSchema.safeParse({
    fullName: str(formData.get("fullName")),
    headline: str(formData.get("headline")),
    shortBio: str(formData.get("shortBio")),
    longBio: str(formData.get("longBio")),
    email: str(formData.get("email")),
    phone: str(formData.get("phone")),
    location: str(formData.get("location")),
    availability: str(formData.get("availability")),
    relocation: str(formData.get("relocation")),
    yearsOfExperience: str(formData.get("yearsOfExperience")),
    responseTime: str(formData.get("responseTime")),
    photoId: str(formData.get("photoId")),
    cvId: str(formData.get("cvId")),
  });
  if (!parsed.success) return { fieldErrors: fieldErrorsFrom(parsed.error) };

  const { photoId, cvId, ...rest } = parsed.data;
  const values = {
    ...rest,
    photoId: photoId || null,
    cvId: cvId || null,
  };

  await db
    .insert(tables.profile)
    .values({ id: 1, ...values })
    .onConflictDoUpdate({
      target: tables.profile.id,
      set: { ...values, updatedAt: new Date() },
    });

  await logAudit({ action: "update", entity: "profile", summary: "Saved profile" });
  revalidatePublic("profile");
  return { success: "Profile saved." };
}
