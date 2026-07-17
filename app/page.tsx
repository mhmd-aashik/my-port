import { Hero } from "@/components/home/hero";
import { Summary } from "@/components/home/summary";
import { FeaturedExperience } from "@/components/home/featured-experience";
import { FeaturedProjects } from "@/components/home/featured-projects";
import { Expertise } from "@/components/home/expertise";
import { StoryPreview } from "@/components/home/story-preview";
import { LatestPosts } from "@/components/home/latest-posts";
import { ContactCta } from "@/components/home/contact-cta";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Summary />
      <FeaturedExperience />
      <FeaturedProjects />
      <Expertise />
      <StoryPreview />
      <LatestPosts />
      <ContactCta />
    </>
  );
}
