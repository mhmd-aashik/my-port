import { ArrowRight, Download, Github, Linkedin, Mail } from "lucide-react";
import { ButtonLink } from "@/components/ui/button-link";
import { Reveal } from "@/components/ui/reveal";
import { SystemDiagram } from "./system-diagram";

// Applies the gradient to the last few words of the (CMS-editable) heading.
function GradientHeading({ text }: { text: string }) {
  const words = text.split(" ");
  const split = Math.max(1, words.length - 3);
  return (
    <>
      {words.slice(0, split).join(" ")}{" "}
      <span className="text-gradient">{words.slice(split).join(" ")}</span>
    </>
  );
}

export function Hero({
  heading,
  description,
  ctaPrimary,
  ctaSecondary,
  availability,
  cvPath,
  social,
}: {
  heading: string;
  description: string;
  ctaPrimary: string;
  ctaSecondary: string;
  availability: string;
  cvPath: string;
  social: { linkedin: string; github: string; email: string };
  avatar?: string;
}) {
  return (
    <div className="relative overflow-hidden">
      <div className="absolute inset-0 bg-grid [mask-image:radial-gradient(ellipse_70%_60%_at_50%_0%,black,transparent)]" />
      <div className="relative mx-auto grid max-w-6xl gap-12 px-4 pb-16 pt-20 sm:px-6 sm:pt-28 lg:grid-cols-[1.2fr_1fr] lg:items-center">
        <Reveal>
          {availability && (
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-1 font-mono text-xs text-muted">
              <span className="relative flex size-2">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-accent opacity-60" />
                <span className="relative inline-flex size-2 rounded-full bg-accent" />
              </span>
              {availability}
            </span>
          )}
          <h1 className="mt-6 max-w-2xl text-4xl font-semibold leading-[1.1] tracking-tight sm:text-5xl lg:text-6xl">
            <GradientHeading text={heading} />
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted">
            {description}
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <ButtonLink href="/projects">
              {ctaPrimary}
              <ArrowRight className="size-4" aria-hidden />
            </ButtonLink>
            <ButtonLink href="/contact" variant="secondary">
              {ctaSecondary}
            </ButtonLink>
          </div>
          <div className="mt-6 flex flex-wrap items-center gap-4 text-sm text-subtle">
            <a
              href={cvPath}
              download
              className="inline-flex items-center gap-1.5 transition-colors hover:text-foreground"
            >
              <Download className="size-4" aria-hidden /> Download CV
            </a>
            {social.linkedin && (
              <a
                href={social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 transition-colors hover:text-foreground"
              >
                <Linkedin className="size-4" aria-hidden /> LinkedIn
              </a>
            )}
            {social.github && (
              <a
                href={social.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 transition-colors hover:text-foreground"
              >
                <Github className="size-4" aria-hidden /> GitHub
              </a>
            )}
            <a
              href={social.email}
              className="inline-flex items-center gap-1.5 transition-colors hover:text-foreground"
            >
              <Mail className="size-4" aria-hidden /> Email
            </a>
          </div>
        </Reveal>
        <Reveal delay={0.15}>
          <div className="flex flex-col items-center justify-center gap-6">
            <SystemDiagram />
          </div>
        </Reveal>
      </div>
    </div>
  );
}
