export type ActionState = {
  error?: string;
  success?: string;
  fieldErrors?: Record<string, string>;
} | null;

// Converts a Zod error into a flat field → message map.
// (Typed loosely to stay compatible across Zod minor versions.)
export function fieldErrorsFrom(err: {
  issues: Array<{ path: Array<string | number>; message: string }>;
}): Record<string, string> {
  const out: Record<string, string> = {};
  for (const issue of err.issues) {
    const key = issue.path.join(".") || "_";
    if (!(key in out)) out[key] = issue.message;
  }
  return out;
}

// One entry per non-empty line — used for list-ish textarea fields.
export function linesToArray(value: FormDataEntryValue | null): string[] {
  return String(value ?? "")
    .split("\n")
    .map((s) => s.trim())
    .filter(Boolean);
}

export function checkbox(value: FormDataEntryValue | null): boolean {
  return value === "on" || value === "true";
}

export function str(value: FormDataEntryValue | null): string {
  return typeof value === "string" ? value : "";
}

export function intOr(value: FormDataEntryValue | null, fallback: number): number {
  const n = Number(value);
  return Number.isFinite(n) ? Math.trunc(n) : fallback;
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}
