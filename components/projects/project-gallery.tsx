"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowRight, Github, Lock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { projectFilters, projects } from "@/data/projects";
import { cn } from "@/lib/utils";

export function ProjectGallery() {
  const [filter, setFilter] = useState<string>("All");

  const visible =
    filter === "All"
      ? projects
      : projects.filter((p) => p.categories.includes(filter));

  return (
    <div>
      <div
        role="group"
        aria-label="Filter projects by category"
        className="flex flex-wrap gap-2"
      >
        {projectFilters.map((f) => (
          <button
            key={f}
            type="button"
            aria-pressed={filter === f}
            onClick={() => setFilter(f)}
            className={cn(
              "rounded-full border px-4 py-1.5 font-mono text-xs transition-colors",
              filter === f
                ? "border-accent/40 bg-accent-soft text-accent"
                : "border-border text-muted hover:border-border-strong hover:text-foreground"
            )}
          >
            {f}
          </button>
        ))}
      </div>

      <div className="mt-8 grid gap-5 md:grid-cols-2">
        {visible.map((project) => (
          <Card key={project.slug} className="group flex h-full flex-col">
            <div className="flex items-start justify-between gap-3">
              <div className="flex flex-wrap gap-1.5">
                {project.categories.map((c) => (
                  <span key={c} className="font-mono text-xs text-accent">
                    {c}
                  </span>
                ))}
              </div>
              {project.confidential ? (
                <span
                  className="inline-flex items-center gap-1 font-mono text-xs text-subtle"
                  title="Confidential client work — generalized case study"
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
            <h2 className="mt-3 text-xl font-semibold leading-snug">
              {project.title}
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-muted">
              {project.tagline}
            </p>
            <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-muted">
              {project.problem}
            </p>
            <div className="mt-4 flex flex-wrap gap-1.5">
              {project.tech.map((t) => (
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
        ))}
      </div>

      {visible.length === 0 && (
        <p className="mt-12 text-center text-sm text-subtle">
          No projects in this category yet.
        </p>
      )}
    </div>
  );
}
