import type { MetadataRoute } from "next";
import { getProjects, getPublishedPosts } from "@/lib/content";
import { siteConfig } from "@/data/profile";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticPages = [
    "",
    "/about",
    "/experience",
    "/education",
    "/projects",
    "/skills",
    "/story",
    "/blog",
    "/contact",
  ].map((path) => ({
    url: `${siteConfig.url}${path}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: path === "" ? 1 : 0.7,
  }));

  let projectPages: MetadataRoute.Sitemap = [];
  let blogPages: MetadataRoute.Sitemap = [];
  try {
    const [projects, posts] = await Promise.all([
      getProjects(),
      getPublishedPosts(),
    ]);
    projectPages = projects.map((p) => ({
      url: `${siteConfig.url}/projects/${p.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    }));
    blogPages = posts.map((p) => ({
      url: `${siteConfig.url}/blog/${p.slug}`,
      lastModified: p.date ? new Date(p.date) : new Date(),
      changeFrequency: "yearly" as const,
      priority: 0.6,
    }));
  } catch {
    // Database unavailable — ship static entries only.
  }

  return [...staticPages, ...projectPages, ...blogPages];
}
