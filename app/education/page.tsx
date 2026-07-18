import type { Metadata } from "next";
import { GraduationCap } from "lucide-react";
import { Card } from "@/components/ui/card";
import { PageHeader } from "@/components/ui/page-header";
import { Reveal } from "@/components/ui/reveal";
import { Section, SectionHeading } from "@/components/ui/section";
import { certifications } from "@/data/education";
import { getEducation } from "@/lib/content";

export const revalidate = 300;

export const metadata: Metadata = {
  title: "Education",
  description:
    "BSc (Hons) Computing Science in Software Engineering from Kingston University, plus diplomas and professional certifications.",
  alternates: { canonical: "/education" },
};

export default async function EducationPage() {
  const education = await getEducation();

  return (
    <>
      <PageHeader
        eyebrow="Education"
        title="Qualifications"
        description="Formal study layered alongside seven years of production engineering."
      />
      <Section>
        <div className="space-y-5">
          {education.map((item, i) => (
            <Reveal key={item.qualification} delay={i * 0.06}>
              <Card className="sm:flex sm:items-start sm:gap-6">
                <span
                  className="mb-4 inline-flex rounded-md border border-accent/30 bg-accent-soft p-2.5 text-accent sm:mb-0"
                  aria-hidden
                >
                  <GraduationCap className="size-5" />
                </span>
                <div className="flex-1">
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <h2 className="text-lg font-semibold leading-snug">
                      {item.qualification}
                    </h2>
                    <span className="font-mono text-xs text-subtle">
                      {item.period}
                    </span>
                  </div>
                  <p className="mt-1 text-sm text-muted">
                    {item.institution}
                    {item.location ? ` · ${item.location}` : ""}
                  </p>
                  <ul className="mt-3 flex flex-wrap gap-x-5 gap-y-1">
                    {item.areas.map((a) => (
                      <li key={a} className="flex items-center gap-2 text-sm text-muted">
                        <span className="size-1 rounded-full bg-accent" aria-hidden />
                        {a}
                      </li>
                    ))}
                  </ul>
                </div>
              </Card>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section className="border-t border-border">
        <Reveal>
          <SectionHeading eyebrow="Certifications" title="Continued learning" />
        </Reveal>
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {certifications.map((cert, i) => (
            <Reveal key={cert.title} delay={i * 0.06}>
              <Card className="h-full">
                <h3 className="text-sm font-semibold leading-snug">{cert.title}</h3>
                <p className="mt-1 font-mono text-xs text-subtle">{cert.issuer}</p>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  {cert.highlight}
                </p>
              </Card>
            </Reveal>
          ))}
        </div>
      </Section>
    </>
  );
}
