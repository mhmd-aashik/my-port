import { AdminForm } from "@/components/admin/admin-form";
import { StatusSelect, TextArea, TextInput } from "@/components/admin/fields";
import { MediaSelect } from "@/components/admin/media-select";
import { upsertChapter } from "./actions";

type ChapterRow = {
  id: string;
  slug: string;
  title: string;
  timePeriod: string;
  intro: string;
  body: string;
  pullQuote: string;
  coverImageId: string | null;
  seoTitle: string;
  seoDescription: string;
  sortOrder: number;
  status: "draft" | "published" | "archived";
};

export async function ChapterForm({ chapter }: { chapter?: ChapterRow }) {
  return (
    <AdminForm
      action={upsertChapter}
      submitLabel={chapter ? "Save chapter" : "Create chapter"}
    >
      {chapter && <input type="hidden" name="id" value={chapter.id} />}
      <div className="grid gap-5 sm:grid-cols-2">
        <TextInput label="Title" name="title" defaultValue={chapter?.title} required />
        <TextInput label="Slug" name="slug" defaultValue={chapter?.slug} hint="Leave empty to generate" />
        <TextInput label="Time period" name="timePeriod" defaultValue={chapter?.timePeriod} hint='e.g. "2019–2021"' />
        <TextInput label="Sort order" name="sortOrder" type="number" defaultValue={String(chapter?.sortOrder ?? 0)} />
      </div>
      <TextArea label="Short introduction" name="intro" defaultValue={chapter?.intro} rows={2} />
      <TextArea
        label="Body (Markdown)"
        name="body"
        defaultValue={chapter?.body}
        rows={12}
        hint="Keep [Add ...] placeholders for personal details you haven't written yet — they render as visible editorial notes."
      />
      <TextInput label="Pull quote" name="pullQuote" defaultValue={chapter?.pullQuote} />
      <div className="grid gap-5 sm:grid-cols-2">
        <MediaSelect label="Cover image" name="coverImageId" defaultValue={chapter?.coverImageId} />
        <StatusSelect defaultValue={chapter?.status} />
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <TextInput label="SEO title" name="seoTitle" defaultValue={chapter?.seoTitle} />
        <TextInput label="SEO description" name="seoDescription" defaultValue={chapter?.seoDescription} />
      </div>
    </AdminForm>
  );
}
