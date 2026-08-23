import { asc } from "drizzle-orm";
import { db, tables } from "@/db";
import { AdminForm } from "@/components/admin/admin-form";
import {
  CheckboxInput,
  SelectInput,
  StatusSelect,
  TextArea,
  TextInput,
} from "@/components/admin/fields";
import { MediaSelect } from "@/components/admin/media-select";
import { upsertPost } from "./actions";

type PostRow = {
  id: string;
  slug: string;
  title: string;
  description: string;
  body: string;
  categoryId: string | null;
  featuredImageId: string | null;
  ogImageId: string | null;
  seoTitle: string;
  seoDescription: string;
  featured: boolean;
  status: "draft" | "published" | "archived";
};

export async function PostForm({
  post,
  tags = [],
}: {
  post?: PostRow;
  tags?: string[];
}) {
  const categories = await db
    .select()
    .from(tables.blogCategories)
    .orderBy(asc(tables.blogCategories.sortOrder));

  return (
    <AdminForm action={upsertPost} submitLabel={post ? "Save post" : "Create post"}>
      {post && <input type="hidden" name="id" value={post.id} />}
      <div className="grid gap-5 sm:grid-cols-2">
        <TextInput label="Title" name="title" defaultValue={post?.title} required />
        <TextInput label="Slug" name="slug" defaultValue={post?.slug} hint="Leave empty to generate from title" />
      </div>
      <TextArea label="Description / excerpt" name="description" defaultValue={post?.description} rows={2} />
      <TextArea
        label="Body (Markdown)"
        name="body"
        defaultValue={post?.body}
        rows={20}
        hint="Headings (##), lists, code fences, quotes, links, and tables are supported. Content is rendered through a sanitizing pipeline."
      />
      <div className="grid gap-5 sm:grid-cols-2">
        <SelectInput
          label="Category"
          name="categoryId"
          defaultValue={post?.categoryId ?? ""}
          options={[
            { value: "", label: "— none —" },
            ...categories.map((c) => ({ value: c.id, label: c.name })),
          ]}
        />
        <TextArea label="Tags (one per line)" name="tags" defaultValue={tags.join("\n")} rows={3} />
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <MediaSelect label="Featured image" name="featuredImageId" defaultValue={post?.featuredImageId} />
        <MediaSelect label="Open Graph image" name="ogImageId" defaultValue={post?.ogImageId} />
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <TextInput label="SEO title" name="seoTitle" defaultValue={post?.seoTitle} />
        <TextInput label="SEO description" name="seoDescription" defaultValue={post?.seoDescription} />
      </div>
      <div className="flex flex-wrap items-end gap-6">
        <CheckboxInput label="Featured post" name="featured" defaultChecked={post?.featured} />
        <StatusSelect defaultValue={post?.status} />
      </div>
    </AdminForm>
  );
}
