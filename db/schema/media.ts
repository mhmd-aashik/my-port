import {
  index,
  integer,
  pgTable,
  text,
  timestamp,
  uniqueIndex,
  uuid,
} from "drizzle-orm/pg-core";
import { mediaFolder } from "./enums";

export const mediaAssets = pgTable(
  "media_assets",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    objectKey: text("object_key").notNull(),
    originalFilename: text("original_filename").notNull(),
    generatedFilename: text("generated_filename").notNull(),
    mimeType: text("mime_type").notNull(),
    fileSize: integer("file_size").notNull(),
    width: integer("width"),
    height: integer("height"),
    altText: text("alt_text").notNull().default(""),
    caption: text("caption").notNull().default(""),
    checksum: text("checksum").notNull().default(""),
    folder: mediaFolder("folder").notNull().default("misc"),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (t) => [
    uniqueIndex("media_assets_object_key_idx").on(t.objectKey),
    index("media_assets_folder_idx").on(t.folder),
    index("media_assets_created_idx").on(t.createdAt),
  ]
);
