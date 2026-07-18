/**
 * DEVELOPMENT ONLY: truncates all content tables so the seed can run fresh.
 * Refuses to run when NODE_ENV=production or when the DATABASE_URL host
 * doesn't look local unless FORCE_RESET=1 is set explicitly.
 *
 * Run: npm run db:reset-dev
 */
import { sql } from "drizzle-orm";
import { db } from "../db";

const url = process.env.DATABASE_URL ?? "";
const looksRemote = !/localhost|127\.0\.0\.1/.test(url);

if (process.env.NODE_ENV === "production") {
  console.error("Refusing to reset in production.");
  process.exit(1);
}
if (looksRemote && process.env.FORCE_RESET !== "1") {
  console.error(
    "DATABASE_URL points at a remote database. If you really mean it, run with FORCE_RESET=1."
  );
  process.exit(1);
}

async function main() {
  await db.execute(sql`
    TRUNCATE TABLE
      blog_post_tags, blog_tags, blog_posts, blog_categories,
      story_milestones, story_chapters,
      project_images, project_technologies, projects,
      skills, skill_categories,
      experience_highlights, experiences, education,
      about_sections, navigation_items, social_links,
      contact_messages, audit_logs, media_assets,
      profile, site_settings
    RESTART IDENTITY CASCADE
  `);
  console.log("All content tables truncated.");
  process.exit(0);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
