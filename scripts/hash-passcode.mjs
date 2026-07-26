#!/usr/bin/env node
// Generates the bcrypt hash for ADMIN_PASSCODE_HASH.
// Usage: node scripts/hash-passcode.mjs "your-passcode"
// Run locally only; never commit the passcode or paste it anywhere public.
import bcrypt from "bcryptjs";

const passcode = process.argv[2];

if (!passcode || passcode.length < 10) {
  console.error(
    "Usage: node scripts/hash-passcode.mjs \"your-passcode\"\n" +
      "Passcode must be at least 10 characters. Use a long, unique phrase."
  );
  process.exit(1);
}

const hash = bcrypt.hashSync(passcode, 12);

// Next.js env files expand $VAR references, so every $ must be escaped.
const escaped = hash.replaceAll("$", "\\$");

console.log("\nAdd this line to .env.local exactly as printed (the \\$ escaping matters):\n");
console.log(`ADMIN_PASSCODE_HASH=${escaped}\n`);
console.log(
  "For Railway service variables, use the UNESCAPED value instead (Railway does not expand $):\n"
);
console.log(`${hash}\n`);
