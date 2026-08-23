import { Reveal } from "@/components/ui/reveal";
import { Section } from "@/components/ui/section";

export function Summary({
  summary,
  highlights,
}: {
  summary: string;
  highlights: string[];
}) {
  return (
    <Section className="border-t border-border">
      <Reveal>
        <div className="grid gap-10 lg:grid-cols-[1.2fr_1fr]">
          <p className="max-w-xl text-lg leading-relaxed text-muted">{summary}</p>
          <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-1">
            {highlights.map((h) => (
              <li
                key={h}
                className="flex items-center gap-3 font-mono text-sm text-muted"
              >
                <span className="size-1.5 shrink-0 rounded-full bg-accent" aria-hidden />
                {h}
              </li>
            ))}
          </ul>
        </div>
      </Reveal>
    </Section>
  );
}
