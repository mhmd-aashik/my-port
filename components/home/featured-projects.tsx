import Link from "next/link";
import { ArrowRight, Github, Lock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Reveal } from "@/components/ui/reveal";
import { Section, SectionHeading } from "@/components/ui/section";
import type { PublicProject } from "@/lib/content";

export function FeaturedProjects({ projects }: { projects: PublicProject[] }) {
  if (projects.length === 0) return null;
  return (
    <Section className="border-t border-border">
      <Reveal>
        <div className="flex flex-wrap items-end justify-between gap-4">
          <SectionHeading
            eyebrow="Projects"
            title="Selected work"
            description="Case studies over screenshots — the problem, the architecture, and what shipped."
          />
          <Link
            href="/projects"
            className="inline-flex items-center gap-1.5 text-sm text-accent transition-colors hover:text-accent-strong"
          >
            All projects <ArrowRight className="size-4" aria-hidden />
          </Link>
        </div>
      </Reveal>
      <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {projects.map((project, i) => (
          <Reveal key={project.slug} delay={i * 0.08}>
            <Card className="group flex h-full flex-col">
              <div className="flex items-start justify-between gap-3">
                <h3 className="text-lg font-semibold leading-snug">
                  {project.title}
                </h3>
                {project.confidential ? (
                  <span
                    className="inline-flex items-center gap-1 font-mono text-xs text-subtle"
                    title="Confidential client work"
                  >
                    <Lock className="size-3" aria-hidden /> NDA
                  </span>
                ) : (
                  project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${project.title} on GitHub`}
                      className="text-subtle transition-colors hover:text-foreground"
                    >
                      <Github className="size-4" />
                    </a>
                  )
                )}
              </div>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                {project.tagline}
              </p>
              <div className="mt-4 flex flex-wrap gap-1.5">
                {project.tech.slice(0, 5).map((t) => (
                  <Badge key={t}>{t}</Badge>
                ))}
              </div>
              <Link
                href={`/projects/${project.slug}`}
                className="mt-auto inline-flex items-center gap-1.5 pt-5 text-sm text-accent transition-colors hover:text-accent-strong"
              >
                Read case study
                <ArrowRight
                  className="size-4 transition-transform group-hover:translate-x-0.5"
                  aria-hidden
                />
              </Link>
            </Card>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
