import { describe, expect, it } from "vitest";
import { validateContact } from "@/lib/validation";
import {
  checkbox,
  fieldErrorsFrom,
  intOr,
  linesToArray,
  slugify,
} from "@/lib/admin/action-state";

describe("contact form validation", () => {
  const valid = {
    name: "Jane Recruiter",
    email: "jane@example.com",
    company: "Acme",
    subject: "Senior role",
    message: "We would like to talk to you about a senior backend position.",
    opportunityType: "Full-time role",
    website: "",
  };

  it("accepts a valid payload", () => {
    expect(validateContact(valid).valid).toBe(true);
  });

  it("rejects missing and malformed fields", () => {
    expect(validateContact({ ...valid, name: "" }).errors.name).toBeTruthy();
    expect(validateContact({ ...valid, email: "nope" }).errors.email).toBeTruthy();
    expect(validateContact({ ...valid, message: "short" }).errors.message).toBeTruthy();
    expect(
      validateContact({ ...valid, opportunityType: "Hacking" }).errors
        .opportunityType
    ).toBeTruthy();
  });

  it("enforces length limits", () => {
    expect(
      validateContact({ ...valid, message: "x".repeat(5001) }).errors.message
    ).toBeTruthy();
    expect(
      validateContact({ ...valid, name: "x".repeat(101) }).errors.name
    ).toBeTruthy();
  });
});

describe("form helpers", () => {
  it("linesToArray splits and trims", () => {
    expect(linesToArray("a\n  b  \n\nc\n")).toEqual(["a", "b", "c"]);
    expect(linesToArray(null)).toEqual([]);
  });

  it("checkbox handles form values", () => {
    expect(checkbox("on")).toBe(true);
    expect(checkbox(null)).toBe(false);
  });

  it("intOr falls back on garbage", () => {
    expect(intOr("42", 0)).toBe(42);
    expect(intOr("nope", 7)).toBe(7);
  });

  it("slugify produces url-safe slugs", () => {
    expect(slugify("Hello World! (2026)")).toBe("hello-world-2026");
  });

  it("fieldErrorsFrom flattens zod issues", () => {
    const errors = fieldErrorsFrom({
      issues: [
        { path: ["title"], message: "Required" },
        { path: ["slug"], message: "Invalid" },
        { path: ["title"], message: "Second (ignored)" },
      ],
    });
    expect(errors.title).toBe("Required");
    expect(errors.slug).toBe("Invalid");
  });
});
