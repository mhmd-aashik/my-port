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
console.log("\nAdd this line to .env.local (and Railway service variables):\n");
console.log(`ADMIN_PASSCODE_HASH=${hash}\n`);
