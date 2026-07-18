import type { Metadata } from "next";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { ButtonLink } from "@/components/ui/button-link";
import { PageHeader } from "@/components/ui/page-header";
import { Reveal } from "@/components/ui/reveal";
import { Section, SectionHeading } from "@/components/ui/section";
import { getAboutSections, getProfile } from "@/lib/content";

export const revalidate = 300;

export const metadata: Metadata = {
  title: "About",
  description:
    "How I approach engineering: maintainable systems, proportionate architecture, security by design, and continuous learning.",
  alternates: { canonical: "/about" },
};

export default async function AboutPage() {
  const [profile, principles] = await Promise.all([
    getProfile(),
    getAboutSections(),
  ]);

  return (
    <>
      <PageHeader
        eyebrow="About"
        title="Engineer first, generalist by necessity, learner by habit."
        description="Who I am, how I work, and what I'm looking for."
      />

      <Section>
        <Reveal>
          <div className="grid gap-10 lg:grid-cols-[1fr_280px] lg:gap-16">
            <div className="space-y-5 leading-relaxed text-muted">
              <p>
                I&apos;m {profile.name}, a {profile.title} based in{" "}
                {profile.location}, with {profile.yearsOfExperience} years of
                experience across the stack — from React and Next.js interfaces
                to NestJS microservices, RabbitMQ messaging, and the Docker and
                Kubernetes infrastructure underneath them.
              </p>
              <p>{profile.summary}</p>
              <p>
                I approach problems by understanding them before architecting
                them: what the business actually needs, what failure would cost,
                and what the simplest design is that honestly meets both. With
                teams and stakeholders, I work in the open — written decisions,
                honest estimates, and requirements translated into systems
                without losing what the requester meant.
              </p>
              <p>
                Right now I&apos;m deepening my work in software architecture
                and AI engineering. {profile.relocation && `${profile.relocation}.`}
              </p>
            </div>
            <Reveal delay={0.1}>
              <div className="space-y-4">
                <Image
                  src={profile.avatar}
                  alt={`Portrait of ${profile.name}`}
                  width={280}
                  height={340}
                  className="rounded-lg border border-border object-cover"
                  unoptimized={profile.avatar.startsWith("/api/")}
                />
                <ButtonLink href="/story" variant="secondary" className="w-full">
                  Read My Story <ArrowRight className="size-4" aria-hidden />
                </ButtonLink>
              </div>
            </Reveal>
          </div>
        </Reveal>
      </Section>

      {principles.length > 0 && (
        <Section className="border-t border-border">
          <Reveal>
            <SectionHeading
              eyebrow="Philosophy"
              title="Engineering principles"
              description="The rules I actually follow, learned from systems that punished me when I didn't."
            />
          </Reveal>
          <div className="mt-10 grid gap-5 sm:grid-cols-2">
            {principles.map((p, i) => (
              <Reveal key={p.id} delay={(i % 2) * 0.06}>
                <div className="rounded-lg border border-border bg-surface p-5">
                  <h3 className="text-sm font-semibold leading-snug">{p.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{p.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Section>
      )}
    </>
  );
}
