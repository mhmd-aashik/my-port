import { Hero } from "@/components/home/hero";
import { Summary } from "@/components/home/summary";
import { FeaturedExperience } from "@/components/home/featured-experience";
import { FeaturedProjects } from "@/components/home/featured-projects";
import { Expertise } from "@/components/home/expertise";
import { StoryPreview } from "@/components/home/story-preview";
import { LatestPosts } from "@/components/home/latest-posts";
import { ContactCta } from "@/components/home/contact-cta";
import {
  getExperiences,
  getProfile,
  getProjects,
  getPublishedPosts,
  getSettings,
  getSkillGroups,
  getSocialLinks,
  getStoryChapters,
} from "@/lib/content";

export const revalidate = 300;

export default async function HomePage() {
  const [profile, settings, social, experiences, projects, groups, posts, chapters] =
    await Promise.all([
      getProfile(),
      getSettings(),
      getSocialLinks(),
      getExperiences(),
      getProjects(),
      getSkillGroups(),
      getPublishedPosts(),
      getStoryChapters(),
    ]);

  const highlights = [
    `${profile.yearsOfExperience} years of experience`,
    "Full-stack and backend engineering",
    "Microservices and distributed systems",
    "International client experience",
    "Production deployment experience",
  ];

  const storyIntro =
    chapters[0]?.intro ||
    "My journey into technology began with curiosity — wanting to understand how computers, websites, and digital products worked. That curiosity gradually became a career built around solving real problems.";

  return (
    <>
      <Hero
        heading={settings.heroHeading || "I build scalable digital products, from intuitive interfaces to distributed backend systems."}
        description={settings.heroDescription || profile.subheadline}
        ctaPrimary={settings.heroCtaPrimary}
        ctaSecondary={settings.heroCtaSecondary}
        availability={profile.availability}
        cvPath={profile.cvPath}
        social={social}
      />
      <Summary summary={profile.summary} highlights={highlights} />
      <FeaturedExperience roles={experiences.filter((e) => e.featured)} />
      <FeaturedProjects projects={projects.filter((p) => p.featured)} />
      <Expertise groups={groups.slice(0, 3)} />
      <StoryPreview intro={storyIntro} />
      <LatestPosts posts={posts.slice(0, 3)} />
      <ContactCta responseTime={profile.responseTime} social={social} />
    </>
  );
}
