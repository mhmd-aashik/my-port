"use server";

import bcrypt from "bcryptjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { clientIp } from "@/lib/admin/auth";
import { logAudit } from "@/lib/admin/audit";
import { rateLimit } from "@/lib/admin/rate-limit";
import {
  createSessionToken,
  SESSION_COOKIE,
  sessionCookieOptions,
} from "@/lib/admin/session";

export type LoginState = { error: string } | null;

const GENERIC_ERROR = "Invalid passcode.";

export async function login(
  _prev: LoginState,
  formData: FormData
): Promise<LoginState> {
  const ip = await clientIp();
  const { allowed, retryAfterSeconds } = rateLimit(
    `login:${ip}`,
    5,
    15 * 60 * 1000
  );
  if (!allowed) {
    return {
      error: `Too many attempts. Try again in ${Math.ceil(retryAfterSeconds / 60)} minutes.`,
    };
  }

  const passcode = formData.get("passcode");
  const hash = process.env.ADMIN_PASSCODE_HASH;

  if (!hash) {
    return {
      error:
        "ADMIN_PASSCODE_HASH is not configured. Run: node scripts/hash-passcode.mjs",
    };
  }
  if (typeof passcode !== "string" || passcode.length === 0 || passcode.length > 200) {
    return { error: GENERIC_ERROR };
  }

  const valid = await bcrypt.compare(passcode, hash);
  if (!valid) {
    await logAudit({ action: "login_failed", entity: "session", meta: { ip } });
    return { error: GENERIC_ERROR };
  }

  const store = await cookies();
  store.set(SESSION_COOKIE, createSessionToken(), sessionCookieOptions());
  await logAudit({ action: "login", entity: "session", meta: { ip } });
  redirect("/admin");
}

export async function logout(): Promise<void> {
  const store = await cookies();
  store.delete(SESSION_COOKIE);
  await logAudit({ action: "logout", entity: "session" });
  redirect("/admin/login");
}
