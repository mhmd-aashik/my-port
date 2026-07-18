import { describe, expect, it } from "vitest";
import { generateObjectKey, validateFile } from "@/lib/storage";

const jpeg = Buffer.from([0xff, 0xd8, 0xff, 0xe0, 0x00]);
const png = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a]);
const pdf = Buffer.from("%PDF-1.7 rest-of-file");

describe("file validation", () => {
  it("accepts matching MIME + signature", () => {
    expect(validateFile("image/jpeg", jpeg)).toEqual({ ok: true, ext: "jpg" });
    expect(validateFile("image/png", png)).toEqual({ ok: true, ext: "png" });
    expect(validateFile("application/pdf", pdf)).toEqual({ ok: true, ext: "pdf" });
  });

  it("rejects disallowed types", () => {
    expect(validateFile("application/x-msdownload", jpeg).ok).toBe(false);
    expect(validateFile("image/svg+xml", png).ok).toBe(false);
    expect(validateFile("text/html", pdf).ok).toBe(false);
  });

  it("rejects a spoofed MIME type (signature mismatch)", () => {
    // Claims to be a PNG but carries a PDF payload.
    expect(validateFile("image/png", pdf).ok).toBe(false);
    // Claims to be a PDF but is actually a JPEG.
    expect(validateFile("application/pdf", jpeg).ok).toBe(false);
  });

  it("rejects empty files", () => {
    expect(validateFile("image/png", Buffer.alloc(0)).ok).toBe(false);
  });
});

describe("object keys", () => {
  it("generates collision-resistant, foldered keys", () => {
    const a = generateObjectKey("projects", "png");
    const b = generateObjectKey("projects", "png");
    expect(a).toMatch(/^portfolio\/projects\/[0-9a-f-]{36}\.png$/);
    expect(a).not.toBe(b);
  });
});
