import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Reveal } from "@/components/ui/reveal";
import { Section, SectionHeading } from "@/components/ui/section";

type SkillGroup = {
  label: string;
  description: string;
  skills: string[];
  core: boolean;
};

export function Expertise({ groups }: { groups: SkillGroup[] }) {
  if (groups.length === 0) return null;
  return (
    <Section className="border-t border-border">
      <Reveal>
        <div className="flex flex-wrap items-end justify-between gap-4">
          <SectionHeading
            eyebrow="Technical Expertise"
            title="Tools chosen for the job, not the résumé"
            description="Strongest first — the technologies I reach for when systems need to work in production."
          />
          <Link
            href="/skills"
            className="inline-flex items-center gap-1.5 text-sm text-accent transition-colors hover:text-accent-strong"
          >
            How I use them <ArrowRight className="size-4" aria-hidden />
          </Link>
        </div>
      </Reveal>
      <div className="mt-10 space-y-8">
        {groups.map((tier, i) => (
          <Reveal key={tier.label} delay={i * 0.08}>
            <div className="grid gap-3 sm:grid-cols-[200px_1fr] sm:gap-8">
              <div>
                <h3 className="font-mono text-sm text-foreground">{tier.label}</h3>
                <p className="mt-1 text-xs leading-relaxed text-subtle">
                  {tier.description}
                </p>
              </div>
              <div className="flex flex-wrap content-start gap-2">
                {tier.skills.map((s) => (
                  <Badge key={s} variant={tier.core ? "accent" : "default"}>
                    {s}
                  </Badge>
                ))}
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
