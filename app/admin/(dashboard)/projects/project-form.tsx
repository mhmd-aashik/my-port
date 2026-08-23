import { AdminForm } from "@/components/admin/admin-form";
import {
  CheckboxInput,
  StatusSelect,
  TextArea,
  TextInput,
} from "@/components/admin/fields";
import { MediaSelect } from "@/components/admin/media-select";
import { upsertProject } from "./actions";

type ProjectRow = {
  id: string;
  slug: string;
  title: string;
  tagline: string;
  categories: string[];
  problem: string;
  solution: string;
  role: string;
  architecture: string;
  features: string[];
  decisions: string[];
  challenges: string[];
  challengeSolutions: string[];
  security: string;
  performance: string;
  results: string;
  lessons: string;
  githubUrl: string;
  liveUrl: string;
  confidential: boolean;
  featuredImageId: string | null;
  ogImageId: string | null;
  seoTitle: string;
  seoDescription: string;
  featured: boolean;
  sortOrder: number;
  status: "draft" | "published" | "archived";
};

export async function ProjectForm({
  project,
  technologies = [],
}: {
  project?: ProjectRow;
  technologies?: string[];
}) {
  return (
    <AdminForm
      action={upsertProject}
      submitLabel={project ? "Save changes" : "Create project"}
    >
      {project && <input type="hidden" name="id" value={project.id} />}
      <div className="grid gap-5 sm:grid-cols-2">
        <TextInput label="Title" name="title" defaultValue={project?.title} required />
        <TextInput label="Slug" name="slug" defaultValue={project?.slug} hint="Leave empty to generate from title" />
      </div>
      <TextInput label="Tagline / short summary" name="tagline" defaultValue={project?.tagline} />
      <TextArea label="Categories (one per line)" name="categories" defaultValue={project?.categories.join("\n")} rows={3} hint="e.g. Full Stack, Backend, AI, Microservices, Frontend" />
      <div className="grid gap-5 sm:grid-cols-2">
        <TextArea label="Problem" name="problem" defaultValue={project?.problem} rows={4} />
        <TextArea label="Solution" name="solution" defaultValue={project?.solution} rows={4} />
      </div>
      <TextArea label="My role" name="role" defaultValue={project?.role} rows={2} />
      <TextArea label="Architecture" name="architecture" defaultValue={project?.architecture} rows={3} />
      <TextArea label="Main features (one per line)" name="features" defaultValue={project?.features.join("\n")} rows={6} />
      <div className="grid gap-5 sm:grid-cols-2">
        <TextArea label="Technical decisions (one per line)" name="decisions" defaultValue={project?.decisions.join("\n")} rows={4} />
        <TextArea label="Challenges (one per line)" name="challenges" defaultValue={project?.challenges.join("\n")} rows={4} />
      </div>
      <TextArea label="Solutions to challenges (one per line)" name="challengeSolutions" defaultValue={project?.challengeSolutions.join("\n")} rows={3} />
      <div className="grid gap-5 sm:grid-cols-2">
        <TextArea label="Security considerations" name="security" defaultValue={project?.security} rows={3} />
        <TextArea label="Performance considerations" name="performance" defaultValue={project?.performance} rows={3} />
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <TextArea label="Results / outcome" name="results" defaultValue={project?.results} rows={3} />
        <TextArea label="Lessons learned" name="lessons" defaultValue={project?.lessons} rows={3} />
      </div>
      <TextArea label="Technologies (one per line)" name="technologies" defaultValue={technologies.join("\n")} rows={5} />
      <div className="grid gap-5 sm:grid-cols-2">
        <TextInput label="GitHub URL" name="githubUrl" defaultValue={project?.githubUrl} />
        <TextInput label="Live demo URL" name="liveUrl" defaultValue={project?.liveUrl} />
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <MediaSelect label="Featured image" name="featuredImageId" defaultValue={project?.featuredImageId} />
        <MediaSelect label="Open Graph image" name="ogImageId" defaultValue={project?.ogImageId} />
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <TextInput label="SEO title" name="seoTitle" defaultValue={project?.seoTitle} />
        <TextInput label="SEO description" name="seoDescription" defaultValue={project?.seoDescription} />
      </div>
      <div className="flex flex-wrap items-end gap-6">
        <CheckboxInput label="Confidential (NDA) project" name="confidential" defaultChecked={project?.confidential} />
        <CheckboxInput label="Featured on homepage" name="featured" defaultChecked={project?.featured} />
        <TextInput label="Sort order" name="sortOrder" type="number" defaultValue={String(project?.sortOrder ?? 0)} />
        <StatusSelect defaultValue={project?.status} />
      </div>
    </AdminForm>
  );
}
