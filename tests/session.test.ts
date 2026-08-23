import { beforeAll, describe, expect, it } from "vitest";

beforeAll(() => {
  process.env.ADMIN_SESSION_SECRET =
    "test-secret-test-secret-test-secret-1234";
});

describe("admin session tokens", () => {
  it("creates and verifies a valid token", async () => {
    const { createSessionToken, verifySessionToken } = await import(
      "@/lib/admin/session"
    );
    const token = createSessionToken();
    expect(verifySessionToken(token)).toBe(true);
  });

  it("rejects a tampered token", async () => {
    const { createSessionToken, verifySessionToken } = await import(
      "@/lib/admin/session"
    );
    const token = createSessionToken();
    const [body, mac] = token.split(".");
    const tamperedBody = Buffer.from(
      JSON.stringify({ sub: "admin", iat: 0, exp: 9999999999 })
    ).toString("base64url");
    expect(verifySessionToken(`${tamperedBody}.${mac}`)).toBe(false);
    expect(verifySessionToken(`${body}.AAAA${mac.slice(4)}`)).toBe(false);
  });

  it("rejects an expired token", async () => {
    const { createSessionToken, verifySessionToken, SESSION_TTL_SECONDS } =
      await import("@/lib/admin/session");
    const past = Date.now() - (SESSION_TTL_SECONDS + 60) * 1000;
    const token = createSessionToken(past);
    expect(verifySessionToken(token)).toBe(false);
  });

  it("rejects garbage input", async () => {
    const { verifySessionToken } = await import("@/lib/admin/session");
    expect(verifySessionToken(undefined)).toBe(false);
    expect(verifySessionToken("")).toBe(false);
    expect(verifySessionToken("a.b.c")).toBe(false);
    expect(verifySessionToken("not-a-token")).toBe(false);
  });
});

describe("passcode hashing", () => {
  it("verifies with bcrypt and rejects wrong passcodes", async () => {
    const bcrypt = (await import("bcryptjs")).default;
    const hash = bcrypt.hashSync("correct-horse-battery", 10);
    expect(bcrypt.compareSync("correct-horse-battery", hash)).toBe(true);
    expect(bcrypt.compareSync("wrong-passcode", hash)).toBe(false);
  });
});

describe("rate limiter", () => {
  it("blocks after the limit within a window", async () => {
    const { rateLimit } = await import("@/lib/admin/rate-limit");
    const key = `test:${Math.random()}`;
    for (let i = 0; i < 5; i++) {
      expect(rateLimit(key, 5, 60_000).allowed).toBe(true);
    }
    const blocked = rateLimit(key, 5, 60_000);
    expect(blocked.allowed).toBe(false);
    expect(blocked.retryAfterSeconds).toBeGreaterThan(0);
  });
});
