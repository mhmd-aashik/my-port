import type { Metadata } from "next";
import { Badge } from "@/components/ui/badge";
import { PageHeader } from "@/components/ui/page-header";
import { Reveal } from "@/components/ui/reveal";
import { Section } from "@/components/ui/section";
import { experience } from "@/data/experience";

export const metadata: Metadata = {
  title: "Experience",
  description:
    "7+ years of professional software engineering: multi-tenant SaaS architecture, national railway microservices, and full-stack delivery for international clients.",
  alternates: { canonical: "/experience" },
};

export default function ExperiencePage() {
  return (
    <>
      <PageHeader
        eyebrow="Experience"
        title="Professional timeline"
        description="From intern to senior engineer — the roles, the systems, and what each one demanded."
      />
      <Section>
        <ol className="border-l border-border">
          {experience.map((role, i) => (
            <Reveal key={`${role.company}-${role.period}`} delay={i * 0.05}>
              <li className="relative pb-14 pl-8 last:pb-0 sm:pl-12">
                <span
                  className="absolute -left-[5px] top-2 size-2.5 rounded-full border-2 border-background bg-accent"
                  aria-hidden
                />
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-xs text-subtle">
                  <span>{role.period}</span>
                  <span aria-hidden>·</span>
                  <span>{role.employmentType}</span>
                  <span aria-hidden>·</span>
                  <span>{role.location}</span>
                </div>
                <h2 className="mt-2 text-xl font-semibold">
                  {role.role}{" "}
                  <span className="font-normal text-muted">
                    — {role.company}
                  </span>
                </h2>
                <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted">
                  {role.context}
                </p>

                <div className="mt-5 grid gap-6 lg:grid-cols-2">
                  <div>
                    <h3 className="font-mono text-xs uppercase tracking-wider text-subtle">
                      Contributions
                    </h3>
                    <ul className="mt-2 space-y-2">
                      {role.responsibilities.map((r) => (
                        <li
                          key={r}
                          className="flex gap-2.5 text-sm leading-relaxed text-muted"
                        >
                          <span
                            className="mt-2 size-1 shrink-0 rounded-full bg-accent"
                            aria-hidden
                          />
                          {r}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="space-y-5">
                    <div>
                      <h3 className="font-mono text-xs uppercase tracking-wider text-subtle">
                        Technical challenges
                      </h3>
                      <ul className="mt-2 space-y-2">
                        {role.challenges.map((c) => (
                          <li
                            key={c}
                            className="flex gap-2.5 text-sm leading-relaxed text-muted"
                          >
                            <span
                              className="mt-2 size-1 shrink-0 rounded-full bg-border-strong"
                              aria-hidden
                            />
                            {c}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h3 className="font-mono text-xs uppercase tracking-wider text-subtle">
                        Outcomes
                      </h3>
                      <ul className="mt-2 space-y-2">
                        {role.outcomes.map((o) => (
                          <li
                            key={o}
                            className="flex gap-2.5 text-sm leading-relaxed text-muted"
                          >
                            <span
                              className="mt-2 size-1 shrink-0 rounded-full bg-accent"
                              aria-hidden
                            />
                            {o}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="mt-5 flex flex-wrap gap-1.5">
                  {role.tech.map((t) => (
                    <Badge key={t}>{t}</Badge>
                  ))}
                </div>
              </li>
            </Reveal>
          ))}
        </ol>
      </Section>
    </>
  );
}
