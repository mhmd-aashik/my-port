import { createHmac, timingSafeEqual } from "crypto";

// Stateless signed session token: base64url(payload).base64url(hmac).
// The secret lives only in ADMIN_SESSION_SECRET; rotating it invalidates
// every existing session immediately.

export const SESSION_COOKIE = "admin_session";
export const SESSION_TTL_SECONDS = 60 * 60 * 8; // 8 hours

type SessionPayload = {
  sub: "admin";
  iat: number;
  exp: number;
};

function getSecret(): string {
  const secret = process.env.ADMIN_SESSION_SECRET;
  if (!secret || secret.length < 32) {
    throw new Error("ADMIN_SESSION_SECRET must be set (32+ chars).");
  }
  return secret;
}

function sign(data: string, secret: string): string {
  return createHmac("sha256", secret).update(data).digest("base64url");
}

export function createSessionToken(now = Date.now()): string {
  const payload: SessionPayload = {
    sub: "admin",
    iat: Math.floor(now / 1000),
    exp: Math.floor(now / 1000) + SESSION_TTL_SECONDS,
  };
  const body = Buffer.from(JSON.stringify(payload)).toString("base64url");
  return `${body}.${sign(body, getSecret())}`;
}

export function verifySessionToken(
  token: string | undefined,
  now = Date.now()
): boolean {
  if (!token) return false;
  const parts = token.split(".");
  if (parts.length !== 2) return false;
  const [body, mac] = parts;

  const expected = sign(body, getSecret());
  const a = Buffer.from(mac);
  const b = Buffer.from(expected);
  if (a.length !== b.length || !timingSafeEqual(a, b)) return false;

  try {
    const payload = JSON.parse(
      Buffer.from(body, "base64url").toString("utf8")
    ) as SessionPayload;
    if (payload.sub !== "admin") return false;
    if (typeof payload.exp !== "number") return false;
    return payload.exp * 1000 > now;
  } catch {
    return false;
  }
}

export function sessionCookieOptions() {
  return {
    httpOnly: true as const,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax" as const,
    path: "/",
    maxAge: SESSION_TTL_SECONDS,
  };
}
