import {
  boolean,
  index,
  integer,
  pgTable,
  text,
  timestamp,
  uniqueIndex,
  uuid,
} from "drizzle-orm/pg-core";
import { contentStatus, skillLevel } from "./enums";
import { mediaAssets } from "./media";

const timestamps = {
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
};

export const experiences = pgTable(
  "experiences",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    company: text("company").notNull(),
    role: text("role").notNull(),
    employmentType: text("employment_type").notNull().default("Full-time"),
    location: text("location").notNull().default(""),
    startDate: text("start_date").notNull().default(""), // display string, e.g. "Jan 2024"
    endDate: text("end_date").notNull().default(""),
    current: boolean("current").notNull().default(false),
    context: text("context").notNull().default(""),
    technologies: text("technologies").array().notNull().default([]),
    logoId: uuid("logo_id").references(() => mediaAssets.id, { onDelete: "set null" }),
    featured: boolean("featured").notNull().default(false),
    sortOrder: integer("sort_order").notNull().default(0),
    status: contentStatus("status").notNull().default("published"),
    ...timestamps,
  },
  (t) => [
    index("experiences_sort_idx").on(t.sortOrder),
    index("experiences_status_idx").on(t.status),
    index("experiences_featured_idx").on(t.featured),
  ]
);

// kind: responsibility | challenge | outcome
export const experienceHighlights = pgTable(
  "experience_highlights",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    experienceId: uuid("experience_id")
      .notNull()
      .references(() => experiences.id, { onDelete: "cascade" }),
    kind: text("kind").notNull().default("responsibility"),
    body: text("body").notNull(),
    sortOrder: integer("sort_order").notNull().default(0),
  },
  (t) => [index("experience_highlights_exp_idx").on(t.experienceId)]
);

export const education = pgTable(
  "education",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    qualification: text("qualification").notNull(),
    institution: text("institution").notNull(),
    location: text("location").notNull().default(""),
    startDate: text("start_date").notNull().default(""),
    endDate: text("end_date").notNull().default(""),
    areas: text("areas").array().notNull().default([]),
    logoId: uuid("logo_id").references(() => mediaAssets.id, { onDelete: "set null" }),
    sortOrder: integer("sort_order").notNull().default(0),
    status: contentStatus("status").notNull().default("published"),
    ...timestamps,
  },
  (t) => [
    index("education_sort_idx").on(t.sortOrder),
    index("education_status_idx").on(t.status),
  ]
);

export const projects = pgTable(
  "projects",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    slug: text("slug").notNull(),
    title: text("title").notNull(),
    tagline: text("tagline").notNull().default(""),
    categories: text("categories").array().notNull().default([]),
    problem: text("problem").notNull().default(""),
    solution: text("solution").notNull().default(""),
    role: text("role").notNull().default(""),
    architecture: text("architecture").notNull().default(""),
    features: text("features").array().notNull().default([]),
    decisions: text("decisions").array().notNull().default([]),
    challenges: text("challenges").array().notNull().default([]),
    challengeSolutions: text("challenge_solutions").array().notNull().default([]),
    security: text("security").notNull().default(""),
    performance: text("performance").notNull().default(""),
    results: text("results").notNull().default(""),
    lessons: text("lessons").notNull().default(""),
    githubUrl: text("github_url").notNull().default(""),
    liveUrl: text("live_url").notNull().default(""),
    confidential: boolean("confidential").notNull().default(false),
    featuredImageId: uuid("featured_image_id").references(() => mediaAssets.id, {
      onDelete: "set null",
    }),
    seoTitle: text("seo_title").notNull().default(""),
    seoDescription: text("seo_description").notNull().default(""),
    ogImageId: uuid("og_image_id").references(() => mediaAssets.id, {
      onDelete: "set null",
    }),
    featured: boolean("featured").notNull().default(false),
    sortOrder: integer("sort_order").notNull().default(0),
    status: contentStatus("status").notNull().default("draft"),
    publishedAt: timestamp("published_at", { withTimezone: true }),
    ...timestamps,
  },
  (t) => [
    uniqueIndex("projects_slug_idx").on(t.slug),
    index("projects_status_idx").on(t.status),
    index("projects_sort_idx").on(t.sortOrder),
    index("projects_featured_idx").on(t.featured),
  ]
);

export const projectTechnologies = pgTable(
  "project_technologies",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    projectId: uuid("project_id")
      .notNull()
      .references(() => projects.id, { onDelete: "cascade" }),
    name: text("name").notNull(),
    sortOrder: integer("sort_order").notNull().default(0),
  },
  (t) => [index("project_technologies_project_idx").on(t.projectId)]
);

// Gallery images: join media to projects with ordering.
export const projectImages = pgTable(
  "project_images",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    projectId: uuid("project_id")
      .notNull()
      .references(() => projects.id, { onDelete: "cascade" }),
    mediaId: uuid("media_id")
      .notNull()
      .references(() => mediaAssets.id, { onDelete: "cascade" }),
    sortOrder: integer("sort_order").notNull().default(0),
  },
  (t) => [index("project_images_project_idx").on(t.projectId)]
);

export const skillCategories = pgTable(
  "skill_categories",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    name: text("name").notNull(),
    description: text("description").notNull().default(""),
    sortOrder: integer("sort_order").notNull().default(0),
    visible: boolean("visible").notNull().default(true),
    ...timestamps,
  },
  (t) => [
    uniqueIndex("skill_categories_name_idx").on(t.name),
    index("skill_categories_sort_idx").on(t.sortOrder),
  ]
);

export const skills = pgTable(
  "skills",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    name: text("name").notNull(),
    categoryId: uuid("category_id").references(() => skillCategories.id, {
      onDelete: "set null",
    }),
    level: skillLevel("level").notNull().default("strong_experience"),
    usage: text("usage").notNull().default(""), // "how I use this skill"
    icon: text("icon").notNull().default(""),
    core: boolean("core").notNull().default(false),
    visible: boolean("visible").notNull().default(true),
    sortOrder: integer("sort_order").notNull().default(0),
    ...timestamps,
  },
  (t) => [
    index("skills_category_idx").on(t.categoryId),
    index("skills_sort_idx").on(t.sortOrder),
    index("skills_core_idx").on(t.core),
  ]
);

export const storyChapters = pgTable(
  "story_chapters",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    slug: text("slug").notNull(),
    title: text("title").notNull(),
    timePeriod: text("time_period").notNull().default(""),
    intro: text("intro").notNull().default(""),
    body: text("body").notNull().default(""), // markdown
    pullQuote: text("pull_quote").notNull().default(""),
    coverImageId: uuid("cover_image_id").references(() => mediaAssets.id, {
      onDelete: "set null",
    }),
    seoTitle: text("seo_title").notNull().default(""),
    seoDescription: text("seo_description").notNull().default(""),
    sortOrder: integer("sort_order").notNull().default(0),
    status: contentStatus("status").notNull().default("published"),
    ...timestamps,
  },
  (t) => [
    uniqueIndex("story_chapters_slug_idx").on(t.slug),
    index("story_chapters_sort_idx").on(t.sortOrder),
    index("story_chapters_status_idx").on(t.status),
  ]
);

export const storyMilestones = pgTable(
  "story_milestones",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    date: text("date").notNull(), // year or display date
    title: text("title").notNull(),
    description: text("description").notNull().default(""),
    imageId: uuid("image_id").references(() => mediaAssets.id, { onDelete: "set null" }),
    experienceId: uuid("experience_id").references(() => experiences.id, {
      onDelete: "set null",
    }),
    educationId: uuid("education_id").references(() => education.id, {
      onDelete: "set null",
    }),
    projectId: uuid("project_id").references(() => projects.id, {
      onDelete: "set null",
    }),
    sortOrder: integer("sort_order").notNull().default(0),
    visible: boolean("visible").notNull().default(true),
    ...timestamps,
  },
  (t) => [index("story_milestones_sort_idx").on(t.sortOrder)]
);
