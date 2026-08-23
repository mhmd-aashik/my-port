import fs from "fs";
import path from "path";

// Next.js loads .env.local automatically, but CLI tools (drizzle-kit, tsx
// scripts, vitest) do not. This dependency-free loader fills the gap.
// Existing process.env values always win.
export function loadEnv(): void {
  for (const file of [".env.local", ".env"]) {
    const p = path.join(process.cwd(), file);
    if (!fs.existsSync(p)) continue;
    for (const line of fs.readFileSync(p, "utf8").split("\n")) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith("#")) continue;
      const idx = trimmed.indexOf("=");
      if (idx === -1) continue;
      const key = trimmed.slice(0, idx).trim();
      let value = trimmed.slice(idx + 1).trim().replace(/^["']|["']$/g, "");
      value = value.replaceAll("\\$", "$");
      if (!(key in process.env)) process.env[key] = value;
    }
  }
}

export function requireEnv(name: string): string {
  const value = process.env[name];
  if (!value) throw new Error(`Missing required environment variable: ${name}`);
  return value;
}
