import { pgEnum } from "drizzle-orm/pg-core";

export const contentStatus = pgEnum("content_status", [
  "draft",
  "published",
  "archived",
]);

export const messageStatus = pgEnum("message_status", [
  "unread",
  "read",
  "replied",
  "archived",
  "spam",
]);

export const skillLevel = pgEnum("skill_level", [
  "core_expertise",
  "strong_experience",
  "working_knowledge",
  "currently_learning",
]);

export const mediaFolder = pgEnum("media_folder", [
  "profile",
  "projects",
  "blog",
  "story",
  "education",
  "experience",
  "documents",
  "misc",
]);
