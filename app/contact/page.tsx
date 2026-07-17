import type { Metadata } from "next";
import { Github, Globe, Linkedin, Mail, MapPin } from "lucide-react";
import { ContactForm } from "@/components/forms/contact-form";
import { PageHeader } from "@/components/ui/page-header";
import { Reveal } from "@/components/ui/reveal";
import { Section } from "@/components/ui/section";
import { profile } from "@/data/profile";
import { socialLinks } from "@/data/social-links";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch about senior engineering roles, contract projects, consulting, or collaboration. Based in Dubai, open to remote.",
  alternates: { canonical: "/contact" },
};

const details = [
  {
    icon: Mail,
    label: "Email",
    value: profile.email,
    href: socialLinks.email,
  },
  {
    icon: Linkedin,
    label: "LinkedIn",
    value: "linkedin.com/in/aashikdev",
    href: socialLinks.linkedin,
  },
  {
    icon: Github,
    label: "GitHub",
    value: "github.com/aashikdev",
    href: socialLinks.github,
  },
  {
    icon: MapPin,
    label: "Location",
    value: profile.location,
  },
  {
    icon: Globe,
    label: "Availability",
    value: "On-site in the UAE · Remote worldwide",
  },
];

export default function ContactPage() {
  return (
    <>
      <PageHeader
        eyebrow="Contact"
        title="Let's talk about what you're building."
        description="Senior engineering roles, contract work, consulting, or a technical conversation — all welcome."
      />
      <Section>
        <div className="grid gap-12 lg:grid-cols-[1fr_320px]">
          <Reveal>
            <ContactForm />
          </Reveal>
          <Reveal delay={0.1}>
            <aside className="space-y-5">
              {details.map((d) => (
                <div key={d.label} className="flex items-start gap-3">
                  <span
                    className="mt-0.5 rounded-md border border-border bg-surface p-2 text-accent"
                    aria-hidden
                  >
                    <d.icon className="size-4" />
                  </span>
                  <div>
                    <p className="font-mono text-xs uppercase tracking-wider text-subtle">
                      {d.label}
                    </p>
                    {d.href ? (
                      <a
                        href={d.href}
                        target={d.href.startsWith("http") ? "_blank" : undefined}
                        rel="noopener noreferrer"
                        className="text-sm text-foreground transition-colors hover:text-accent"
                      >
                        {d.value}
                      </a>
                    ) : (
                      <p className="text-sm text-foreground">{d.value}</p>
                    )}
                  </div>
                </div>
              ))}
              <p className="rounded-lg border border-border bg-surface p-4 text-sm leading-relaxed text-muted">
                {profile.responseTime}
              </p>
            </aside>
          </Reveal>
        </div>
      </Section>
    </>
  );
}
