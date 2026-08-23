import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/page-header";
import { Reveal } from "@/components/ui/reveal";
import { Section } from "@/components/ui/section";
import { ProjectGallery } from "@/components/projects/project-gallery";
import { getProjects } from "@/lib/content";

export const revalidate = 300;

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Case studies of production systems: booking platforms, AI-powered products, railway microservices, and multi-tenant SaaS architecture.",
  alternates: { canonical: "/projects" },
};

export default async function ProjectsPage() {
  const projects = await getProjects();

  return (
    <>
      <PageHeader
        eyebrow="Projects"
        title="Case studies, not screenshots"
        description="Each project covers the problem, the architecture, the decisions, and what shipped. Confidential client work is presented as generalized case studies without revealing client information."
      />
      <Section>
        <Reveal>
          <ProjectGallery projects={projects} />
        </Reveal>
      </Section>
    </>
  );
}
