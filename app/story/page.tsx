import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/page-header";
import { Reveal } from "@/components/ui/reveal";
import { Section, SectionHeading } from "@/components/ui/section";
import { markdownToHtml } from "@/lib/markdown";
import { getStoryChapters, getStoryMilestones } from "@/lib/content";

export const revalidate = 300;

export const metadata: Metadata = {
  title: "My Story",
  description:
    "From childhood curiosity in Sri Lanka to senior software engineering in Dubai — the journey behind the career.",
  alternates: { canonical: "/story" },
};

// Renders [Add ...] placeholders as visually distinct editorial notes.
function highlightPlaceholders(html: string): string {
  return html.replace(
    /\[Add ([^\]]+)\]/g,
    '<span class="story-placeholder">[Add $1]</span>'
  );
}

export default async function StoryPage() {
  const [chapters, milestones] = await Promise.all([
    getStoryChapters(),
    getStoryMilestones(),
  ]);

  return (
    <>
      <PageHeader
        eyebrow="My Story"
        title="From curiosity to building production software."
        description="The journey from a curious kid in Sri Lanka to a senior engineer in Dubai — told honestly, including the parts still being written."
      />

      <Section>
        <div className="mx-auto max-w-2xl space-y-14">
          {chapters.map((chapter, i) => (
            <Reveal key={chapter.id} delay={Math.min(i * 0.03, 0.15)}>
              <article>
                <div className="flex items-baseline gap-4">
                  <span className="font-mono text-sm text-accent">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">
                    {chapter.title}
                  </h2>
                  {chapter.timePeriod && (
                    <span className="font-mono text-xs text-subtle">
                      {chapter.timePeriod}
                    </span>
                  )}
                </div>
                {chapter.pullQuote && (
                  <blockquote className="mt-4 border-l-2 border-accent pl-4 italic text-muted">
                    {chapter.pullQuote}
                  </blockquote>
                )}
                <div
                  className="prose mt-4 border-l border-border pl-[2.15rem]"
                  dangerouslySetInnerHTML={{
                    __html: highlightPlaceholders(markdownToHtml(chapter.body)),
                  }}
                />
              </article>
            </Reveal>
          ))}
        </div>
      </Section>

      {milestones.length > 0 && (
        <Section className="border-t border-border">
          <Reveal>
            <SectionHeading
              eyebrow="Timeline"
              title="Milestones"
              className="mx-auto max-w-2xl"
            />
          </Reveal>
          <ol className="mx-auto mt-10 max-w-2xl border-l border-border">
            {milestones.map((item, i) => (
              <Reveal key={item.id} delay={i * 0.04}>
                <li className="relative pb-8 pl-8 last:pb-0">
                  <span
                    className="absolute -left-[5px] top-1.5 size-2.5 rounded-full border-2 border-background bg-accent"
                    aria-hidden
                  />
                  <span className="font-mono text-xs text-accent">{item.date}</span>
                  <p className="mt-1 text-sm font-medium">{item.title}</p>
                  {item.description && (
                    <p className="mt-1 text-sm leading-relaxed text-muted">
                      {item.description}
                    </p>
                  )}
                </li>
              </Reveal>
            ))}
          </ol>
        </Section>
      )}
    </>
  );
}
