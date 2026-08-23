import {
  boolean,
  index,
  integer,
  jsonb,
  pgTable,
  text,
  timestamp,
  uuid,
  check,
} from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";
import { messageStatus } from "./enums";
import { mediaAssets } from "./media";

const timestamps = {
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
};

// Singleton: CHECK (id = 1) makes duplicate settings rows impossible.
export const siteSettings = pgTable(
  "site_settings",
  {
    id: integer("id").primaryKey().default(1),
    siteTitle: text("site_title").notNull().default(""),
    siteDescription: text("site_description").notNull().default(""),
    seoKeywords: text("seo_keywords").array().notNull().default([]),
    heroHeading: text("hero_heading").notNull().default(""),
    heroDescription: text("hero_description").notNull().default(""),
    heroCtaPrimary: text("hero_cta_primary").notNull().default("View My Work"),
    heroCtaSecondary: text("hero_cta_secondary").notNull().default("Contact Me"),
    footerText: text("footer_text").notNull().default(""),
    contactPageText: text("contact_page_text").notNull().default(""),
    ...timestamps,
  },
  (t) => [check("site_settings_singleton", sql`${t.id} = 1`)]
);

export const profile = pgTable(
  "profile",
  {
    id: integer("id").primaryKey().default(1),
    fullName: text("full_name").notNull().default(""),
    headline: text("headline").notNull().default(""),
    shortBio: text("short_bio").notNull().default(""),
    longBio: text("long_bio").notNull().default(""),
    email: text("email").notNull().default(""),
    phone: text("phone").notNull().default(""),
    location: text("location").notNull().default(""),
    availability: text("availability").notNull().default(""),
    relocation: text("relocation").notNull().default(""),
    yearsOfExperience: text("years_of_experience").notNull().default(""),
    responseTime: text("response_time").notNull().default(""),
    photoId: uuid("photo_id").references(() => mediaAssets.id, {
      onDelete: "set null",
    }),
    cvId: uuid("cv_id").references(() => mediaAssets.id, {
      onDelete: "set null",
    }),
    ...timestamps,
  },
  (t) => [check("profile_singleton", sql`${t.id} = 1`)]
);

export const socialLinks = pgTable(
  "social_links",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    label: text("label").notNull(),
    url: text("url").notNull(),
    icon: text("icon").notNull().default(""), // lucide icon name
    sortOrder: integer("sort_order").notNull().default(0),
    visible: boolean("visible").notNull().default(true),
    ...timestamps,
  },
  (t) => [index("social_links_sort_idx").on(t.sortOrder)]
);

export const navigationItems = pgTable(
  "navigation_items",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    label: text("label").notNull(),
    href: text("href").notNull(),
    sortOrder: integer("sort_order").notNull().default(0),
    visible: boolean("visible").notNull().default(true),
    ...timestamps,
  },
  (t) => [index("navigation_items_sort_idx").on(t.sortOrder)]
);

export const aboutSections = pgTable(
  "about_sections",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    title: text("title").notNull(),
    body: text("body").notNull().default(""),
    sortOrder: integer("sort_order").notNull().default(0),
    visible: boolean("visible").notNull().default(true),
    ...timestamps,
  },
  (t) => [index("about_sections_sort_idx").on(t.sortOrder)]
);

export const contactMessages = pgTable(
  "contact_messages",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    name: text("name").notNull(),
    email: text("email").notNull(),
    company: text("company").notNull().default(""),
    opportunityType: text("opportunity_type").notNull().default(""),
    subject: text("subject").notNull(),
    message: text("message").notNull(),
    status: messageStatus("status").notNull().default("unread"),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
    readAt: timestamp("read_at", { withTimezone: true }),
    repliedAt: timestamp("replied_at", { withTimezone: true }),
  },
  (t) => [
    index("contact_messages_status_idx").on(t.status),
    index("contact_messages_created_idx").on(t.createdAt),
  ]
);

export const auditLogs = pgTable(
  "audit_logs",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    action: text("action").notNull(), // create | update | delete | publish | login | upload ...
    entity: text("entity").notNull(),
    entityId: text("entity_id").notNull().default(""),
    summary: text("summary").notNull().default(""),
    meta: jsonb("meta"),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (t) => [
    index("audit_logs_created_idx").on(t.createdAt),
    index("audit_logs_entity_idx").on(t.entity),
  ]
);
