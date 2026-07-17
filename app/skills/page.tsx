import type { Metadata } from "next";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { PageHeader } from "@/components/ui/page-header";
import { Reveal } from "@/components/ui/reveal";
import { Section, SectionHeading } from "@/components/ui/section";
import { skillCategories, skillTiers, skillsInPractice } from "@/data/skills";

export const metadata: Metadata = {
  title: "Skills",
  description:
    "Core expertise in Node.js, NestJS, Next.js, React, TypeScript, and Go — with production experience across microservices, databases, and cloud infrastructure.",
  alternates: { canonical: "/skills" },
};

export default function SkillsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Skills"
        title="Capability over checklists"
        description="No percentage bars — skills grouped by how deeply I've used them in production, and what I actually do with them."
      />

      <Section>
        <div className="space-y-10">
          {Object.values(skillTiers).map((tier, i) => (
            <Reveal key={tier.label} delay={i * 0.06}>
              <div className="grid gap-3 sm:grid-cols-[220px_1fr] sm:gap-8">
                <div>
                  <h2 className="text-base font-semibold">{tier.label}</h2>
                  <p className="mt-1 text-sm leading-relaxed text-subtle">
                    {tier.description}
                  </p>
                </div>
                <div className="flex flex-wrap content-start gap-2">
                  {tier.skills.map((s) => (
                    <Badge key={s} variant={i === 0 ? "accent" : "default"}>
                      {s}
                    </Badge>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section className="border-t border-border">
        <Reveal>
          <SectionHeading
            eyebrow="In Practice"
            title="How I use these skills"
            description="Technologies mapped to the real engineering work they enable."
          />
        </Reveal>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {skillsInPractice.map((item, i) => (
            <Reveal key={item.skill} delay={(i % 3) * 0.06}>
              <Card className="h-full">
                <h3 className="font-mono text-sm font-semibold text-accent">
                  {item.skill}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  {item.usage}
                </p>
              </Card>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section className="border-t border-border">
        <Reveal>
          <SectionHeading
            eyebrow="By Discipline"
            title="The full toolbox"
          />
        </Reveal>
        <div className="mt-10 grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-4">
          {skillCategories.map((cat, i) => (
            <Reveal key={cat.name} delay={(i % 4) * 0.05}>
              <div>
                <h3 className="font-mono text-xs uppercase tracking-wider text-subtle">
                  {cat.name}
                </h3>
                <ul className="mt-3 space-y-1.5">
                  {cat.skills.map((s) => (
                    <li key={s} className="text-sm text-muted">
                      {s}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>
    </>
  );
}
