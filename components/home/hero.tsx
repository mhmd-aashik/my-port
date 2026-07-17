import { ArrowRight, Download, Github, Linkedin, Mail } from "lucide-react";
import { ButtonLink } from "@/components/ui/button-link";
import { Reveal } from "@/components/ui/reveal";
import { profile } from "@/data/profile";
import { socialLinks } from "@/data/social-links";

// Minimal architecture-inspired visual: a request's path through a system.
function SystemDiagram() {
  const node =
    "rounded-md border border-border bg-surface px-3 py-2 font-mono text-xs text-muted";
  const edge = "h-px w-6 bg-border-strong sm:w-10";
  return (
    <div
      aria-hidden
      className="relative hidden items-center justify-center rounded-lg border border-border bg-surface/50 p-8 lg:flex"
    >
      <div className="absolute inset-0 bg-grid opacity-60" />
      <div className="relative flex flex-col items-center gap-4">
        <div className="flex items-center gap-2">
          <span className={node}>client</span>
          <span className={edge} />
          <span className="rounded-md border border-accent/40 bg-accent-soft px-3 py-2 font-mono text-xs text-accent">
            api gateway
          </span>
          <span className={edge} />
          <span className={node}>auth</span>
        </div>
        <span className="h-6 w-px bg-border-strong" />
        <div className="flex items-center gap-2">
          <span className={node}>svc·booking</span>
          <span className={edge} />
          <span className="rounded-md border border-accent/40 bg-accent-soft px-3 py-2 font-mono text-xs text-accent">
            rabbitmq
          </span>
          <span className={edge} />
          <span className={node}>svc·reporting</span>
        </div>
        <span className="h-6 w-px bg-border-strong" />
        <div className="flex items-center gap-2">
          <span className={node}>postgres</span>
          <span className={node}>redis</span>
          <span className={node}>s3</span>
        </div>
      </div>
    </div>
  );
}

export function Hero() {
  return (
    <div className="relative overflow-hidden">
      <div className="absolute inset-0 bg-grid [mask-image:radial-gradient(ellipse_70%_60%_at_50%_0%,black,transparent)]" />
      <div className="relative mx-auto grid max-w-6xl gap-12 px-4 pb-16 pt-20 sm:px-6 sm:pt-28 lg:grid-cols-[1.2fr_1fr] lg:items-center">
        <Reveal>
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-1 font-mono text-xs text-muted">
            <span className="relative flex size-2">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-accent opacity-60" />
              <span className="relative inline-flex size-2 rounded-full bg-accent" />
            </span>
            {profile.availability}
          </span>
          <h1 className="mt-6 max-w-2xl text-4xl font-semibold leading-[1.1] tracking-tight sm:text-5xl lg:text-6xl">
            I build scalable digital products, from intuitive interfaces to{" "}
            <span className="text-gradient">distributed backend systems</span>.
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted">
            {profile.subheadline}
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <ButtonLink href="/projects">
              View My Work
              <ArrowRight className="size-4" aria-hidden />
            </ButtonLink>
            <ButtonLink href="/contact" variant="secondary">
              Contact Me
            </ButtonLink>
          </div>
          <div className="mt-6 flex flex-wrap items-center gap-4 text-sm text-subtle">
            <a
              href={profile.cvPath}
              download
              className="inline-flex items-center gap-1.5 transition-colors hover:text-foreground"
            >
              <Download className="size-4" aria-hidden /> Download CV
            </a>
            <a
              href={socialLinks.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 transition-colors hover:text-foreground"
            >
              <Linkedin className="size-4" aria-hidden /> LinkedIn
            </a>
            <a
              href={socialLinks.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 transition-colors hover:text-foreground"
            >
              <Github className="size-4" aria-hidden /> GitHub
            </a>
            <a
              href={socialLinks.email}
              className="inline-flex items-center gap-1.5 transition-colors hover:text-foreground"
            >
              <Mail className="size-4" aria-hidden /> Email
            </a>
          </div>
        </Reveal>
        <Reveal delay={0.15}>
          <SystemDiagram />
        </Reveal>
      </div>
    </div>
  );
}
