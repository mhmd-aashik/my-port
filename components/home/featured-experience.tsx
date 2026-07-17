import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Reveal } from "@/components/ui/reveal";
import { Section, SectionHeading } from "@/components/ui/section";
import { experience } from "@/data/experience";

export function FeaturedExperience() {
  const featured = experience.filter((e) => e.featured);
  return (
    <Section className="border-t border-border">
      <Reveal>
        <div className="flex flex-wrap items-end justify-between gap-4">
          <SectionHeading
            eyebrow="Experience"
            title="Recent roles"
            description="Senior engineering work across SaaS platforms, national infrastructure, and international client delivery."
          />
          <Link
            href="/experience"
            className="inline-flex items-center gap-1.5 text-sm text-accent transition-colors hover:text-accent-strong"
          >
            Full timeline <ArrowRight className="size-4" aria-hidden />
          </Link>
        </div>
      </Reveal>
      <ol className="mt-10 space-y-0 border-l border-border">
        {featured.map((role, i) => (
          <Reveal key={`${role.company}-${role.period}`} delay={i * 0.08}>
            <li className="relative pb-10 pl-8 last:pb-0">
              <span
                className="absolute -left-[5px] top-1.5 size-2.5 rounded-full border-2 border-background bg-accent"
                aria-hidden
              />
              <p className="font-mono text-xs text-subtle">{role.period}</p>
              <h3 className="mt-1 text-lg font-semibold">
                {role.role}{" "}
                <span className="font-normal text-muted">— {role.company}</span>
              </h3>
              <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted">
                {role.context}
              </p>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {role.tech.slice(0, 6).map((t) => (
                  <Badge key={t}>{t}</Badge>
                ))}
              </div>
            </li>
          </Reveal>
        ))}
      </ol>
    </Section>
  );
}
