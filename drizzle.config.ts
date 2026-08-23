import { defineConfig } from "drizzle-kit";
import { loadEnv } from "./lib/env";

loadEnv();

export default defineConfig({
  dialect: "postgresql",
  schema: "./db/schema",
  out: "./drizzle",
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
  strict: true,
  verbose: true,
});
