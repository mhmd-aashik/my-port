import { ArrowRight } from "lucide-react";
import { ButtonLink } from "@/components/ui/button-link";
import { Reveal } from "@/components/ui/reveal";
import { Section } from "@/components/ui/section";
import { storyPreview } from "@/data/story";

export function StoryPreview() {
  return (
    <Section className="border-t border-border">
      <Reveal>
        <div className="relative overflow-hidden rounded-lg border border-border bg-surface px-6 py-12 sm:px-12 sm:py-16">
          <div
            className="absolute inset-0 bg-grid opacity-50 [mask-image:radial-gradient(ellipse_60%_80%_at_80%_50%,black,transparent)]"
            aria-hidden
          />
          <div className="relative max-w-2xl">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent">
              My Story
            </p>
            <h2 className="mt-3 text-2xl font-semibold tracking-tight sm:text-3xl">
              {storyPreview.heading}
            </h2>
            <p className="mt-4 leading-relaxed text-muted">{storyPreview.text}</p>
            <div className="mt-7">
              <ButtonLink href="/story" variant="secondary">
                Read My Story <ArrowRight className="size-4" aria-hidden />
              </ButtonLink>
            </div>
          </div>
        </div>
      </Reveal>
    </Section>
  );
}
