import { Linkedin, Mail } from "lucide-react";
import { ButtonLink } from "@/components/ui/button-link";
import { Reveal } from "@/components/ui/reveal";
import { Section } from "@/components/ui/section";

export function ContactCta({
  responseTime,
  social,
}: {
  responseTime: string;
  social: { linkedin: string; email: string };
}) {
  return (
    <Section className="border-t border-border">
      <Reveal>
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            Have a challenging product or engineering problem?
          </h2>
          <p className="mt-4 leading-relaxed text-muted">
            I&apos;m open to senior software engineering, backend engineering,
            full-stack, consulting, and international opportunities.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <ButtonLink href="/contact">Start a Conversation</ButtonLink>
            <ButtonLink href={social.email} variant="secondary">
              <Mail className="size-4" aria-hidden /> Email Me
            </ButtonLink>
            {social.linkedin && (
              <ButtonLink href={social.linkedin} variant="secondary" external>
                <Linkedin className="size-4" aria-hidden /> Connect on LinkedIn
              </ButtonLink>
            )}
          </div>
          {responseTime && (
            <p className="mt-6 font-mono text-xs text-subtle">{responseTime}</p>
          )}
        </div>
      </Reveal>
    </Section>
  );
}
