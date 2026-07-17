import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ExternalLink, Github, Lock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Reveal } from "@/components/ui/reveal";
import { Section } from "@/components/ui/section";
import { projects } from "@/data/projects";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) return {};
  return {
    title: project.title,
    description: project.tagline,
    alternates: { canonical: `/projects/${project.slug}` },
  };
}

function Block({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h2 className="font-mono text-xs uppercase tracking-wider text-subtle">
        {title}
      </h2>
      <div className="mt-2 text-sm leading-relaxed text-muted">{children}</div>
    </div>
  );
}

function List({ items }: { items: string[] }) {
  return (
    <ul className="space-y-2">
      {items.map((item) => (
        <li key={item} className="flex gap-2.5">
          <span className="mt-2 size-1 shrink-0 rounded-full bg-accent" aria-hidden />
          {item}
        </li>
      ))}
    </ul>
  );
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) notFound();

  return (
    <Section className="max-w-4xl">
      <Reveal>
        <Link
          href="/projects"
          className="inline-flex items-center gap-1.5 text-sm text-subtle transition-colors hover:text-foreground"
        >
          <ArrowLeft className="size-4" aria-hidden /> All projects
        </Link>

        <div className="mt-8 flex flex-wrap items-center gap-3">
          {project.categories.map((c) => (
            <span key={c} className="font-mono text-xs text-accent">
              {c}
            </span>
          ))}
          {project.confidential && (
            <span className="inline-flex items-center gap-1 font-mono text-xs text-subtle">
              <Lock className="size-3" aria-hidden /> Confidential — generalized
              case study
            </span>
          )}
        </div>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
          {project.title}
        </h1>
        <p className="mt-3 text-lg leading-relaxed text-muted">
          {project.tagline}
        </p>

        <div className="mt-5 flex flex-wrap gap-3">
          {!project.confidential && project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-md border border-border-strong px-4 py-2 text-sm transition-colors hover:border-accent"
            >
              <Github className="size-4" aria-hidden /> GitHub
            </a>
          )}
          {project.live && (
            <a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-md border border-border-strong px-4 py-2 text-sm transition-colors hover:border-accent"
            >
              <ExternalLink className="size-4" aria-hidden /> Live demo
            </a>
          )}
        </div>
      </Reveal>

      <Reveal delay={0.1}>
        <div className="mt-12 space-y-10">
          <div className="grid gap-8 sm:grid-cols-2">
            <Block title="The problem">{project.problem}</Block>
            <Block title="The solution">{project.solution}</Block>
          </div>
          <Block title="My role">{project.role}</Block>
          <Block title="Architecture">{project.architecture}</Block>
          <div className="grid gap-8 lg:grid-cols-2">
            <Block title="Main features">
              <List items={project.features} />
            </Block>
            <div className="space-y-8">
              <Block title="Key engineering decisions">
                <List items={project.decisions} />
              </Block>
              <Block title="Challenges">
                <List items={project.challenges} />
              </Block>
            </div>
          </div>
          <div className="grid gap-8 sm:grid-cols-2">
            <Block title="Security">{project.security}</Block>
            <Block title="Performance">{project.performance}</Block>
          </div>
          <div className="rounded-lg border border-border bg-surface p-6">
            <Block title="Outcome">{project.outcome}</Block>
            <div className="mt-6">
              <Block title="Lessons learned">{project.lessons}</Block>
            </div>
          </div>
          <div>
            <h2 className="font-mono text-xs uppercase tracking-wider text-subtle">
              Technology stack
            </h2>
            <div className="mt-3 flex flex-wrap gap-1.5">
              {project.tech.map((t) => (
                <Badge key={t}>{t}</Badge>
              ))}
            </div>
          </div>
        </div>
      </Reveal>
    </Section>
  );
}
