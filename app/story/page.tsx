import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/page-header";
import { Reveal } from "@/components/ui/reveal";
import { Section, SectionHeading } from "@/components/ui/section";
import { storyChapters, storyTimeline } from "@/data/story";

export const metadata: Metadata = {
  title: "My Story",
  description:
    "From childhood curiosity in Sri Lanka to senior software engineering in Dubai — the journey behind the career.",
  alternates: { canonical: "/story" },
};

// Renders [Add ...] placeholders in a visually distinct style so they read
// as intentional editorial notes, not missing content.
function StoryText({ text }: { text: string }) {
  const parts = text.split(/(\[Add [^\]]+\])/g);
  return (
    <p className="leading-relaxed text-muted">
      {parts.map((part, i) =>
        part.startsWith("[Add") ? (
          <span
            key={i}
            className="mx-0.5 rounded border border-dashed border-border-strong bg-surface-raised px-1.5 py-0.5 font-mono text-xs text-subtle"
          >
            {part}
          </span>
        ) : (
          <span key={i}>{part}</span>
        )
      )}
    </p>
  );
}

export default function StoryPage() {
  return (
    <>
      <PageHeader
        eyebrow="My Story"
        title="From curiosity to building production software."
        description="The journey from a curious kid in Sri Lanka to a senior engineer in Dubai — told honestly, including the parts still being written."
      />

      <Section>
        <div className="mx-auto max-w-2xl space-y-14">
          {storyChapters.map((chapter, i) => (
            <Reveal key={chapter.number} delay={Math.min(i * 0.03, 0.15)}>
              <article>
                <div className="flex items-baseline gap-4">
                  <span className="font-mono text-sm text-accent">
                    {chapter.number}
                  </span>
                  <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">
                    {chapter.title}
                  </h2>
                </div>
                <div className="mt-4 space-y-4 border-l border-border pl-[2.15rem]">
                  {chapter.paragraphs.map((p, j) => (
                    <StoryText key={j} text={p} />
                  ))}
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section className="border-t border-border">
        <Reveal>
          <SectionHeading
            eyebrow="Timeline"
            title="Milestones"
            className="mx-auto max-w-2xl"
          />
        </Reveal>
        <ol className="mx-auto mt-10 max-w-2xl border-l border-border">
          {storyTimeline.map((item, i) => (
            <Reveal key={`${item.year}-${item.label}`} delay={i * 0.04}>
              <li className="relative pb-8 pl-8 last:pb-0">
                <span
                  className="absolute -left-[5px] top-1.5 size-2.5 rounded-full border-2 border-background bg-accent"
                  aria-hidden
                />
                <span className="font-mono text-xs text-accent">{item.year}</span>
                <p className="mt-1 text-sm leading-relaxed text-muted">
                  {item.label}
                </p>
              </li>
            </Reveal>
          ))}
        </ol>
      </Section>
    </>
  );
}
