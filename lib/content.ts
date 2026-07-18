import "server-only";
import { cache } from "react";
import { asc, desc, eq } from "drizzle-orm";
import { db, tables } from "@/db";

// Public-site read layer. Every getter is wrapped in React cache() for
// per-request deduplication; pages use ISR (`revalidate`) and CMS mutations
// call revalidatePath, so content updates appear without redeploys.

const mediaUrl = (id: string | null | undefined) =>
  id ? `/api/media/${id}` : null;

export const getSettings = cache(async () => {
  const s = await db.query.siteSettings.findFirst({
    where: eq(tables.siteSettings.id, 1),
  });
  return {
    siteTitle: s?.siteTitle || "Mohammed Aashik — Full-Stack Software Engineer",
    siteDescription: s?.siteDescription || "",
    heroHeading: s?.heroHeading || "",
    heroDescription: s?.heroDescription || "",
    heroCtaPrimary: s?.heroCtaPrimary || "View My Work",
    heroCtaSecondary: s?.heroCtaSecondary || "Contact Me",
    footerText: s?.footerText || "",
    contactPageText: s?.contactPageText || "",
  };
});

export const getProfile = cache(async () => {
  const p = await db.query.profile.findFirst({
    where: eq(tables.profile.id, 1),
  });
  return {
    name: p?.fullName || "Mohammed Aashik",
    title: p?.headline || "Full-Stack Software Engineer",
    email: p?.email || "",
    phone: p?.phone || "",
    location: p?.location || "",
    availability: p?.availability || "",
    relocation: p?.relocation || "",
    yearsOfExperience: p?.yearsOfExperience || "7+",
    responseTime: p?.responseTime || "",
    subheadline: p?.shortBio || "",
    summary: p?.longBio || "",
    avatar: mediaUrl(p?.photoId) ?? "/images/me.jpg",
    cvPath: mediaUrl(p?.cvId) ?? "/cv/aashik-cv.pdf",
  };
});

export const getSocialLinks = cache(async () => {
  const rows = await db
    .select()
    .from(tables.socialLinks)
    .where(eq(tables.socialLinks.visible, true))
    .orderBy(asc(tables.socialLinks.sortOrder));
  const find = (label: string) =>
    rows.find((r) => r.label.toLowerCase() === label)?.url ?? "";
  return {
    list: rows,
    linkedin: find("linkedin"),
    github: find("github"),
    email: find("email") || "mailto:aashikdevelop@gmail.com",
  };
});

export const getNavItems = cache(async () => {
  const rows = await db
    .select()
    .from(tables.navigationItems)
    .where(eq(tables.navigationItems.visible, true))
    .orderBy(asc(tables.navigationItems.sortOrder));
  return rows.map((r) => ({ label: r.label, href: r.href }));
});

export const getAboutSections = cache(async () => {
  return db
    .select()
    .from(tables.aboutSections)
    .where(eq(tables.aboutSections.visible, true))
    .orderBy(asc(tables.aboutSections.sortOrder));
});

export type PublicExperience = {
  id: string;
  company: string;
  role: string;
  employmentType: string;
  location: string;
  period: string;
  context: string;
  tech: string[];
  featured: boolean;
  responsibilities: string[];
  challenges: string[];
  outcomes: string[];
};

export const getExperiences = cache(async (): Promise<PublicExperience[]> => {
  const rows = await db.query.experiences.findMany({
    where: eq(tables.experiences.status, "published"),
    orderBy: [asc(tables.experiences.sortOrder)],
    with: { highlights: true },
  });
  return rows.map((row) => ({
    id: row.id,
    company: row.company,
    role: row.role,
    employmentType: row.employmentType,
    location: row.location,
    period: `${row.startDate} – ${row.current ? "Present" : row.endDate}`,
    context: row.context,
    tech: row.technologies,
    featured: row.featured,
    responsibilities: row.highlights
      .filter((h) => h.kind === "responsibility")
      .sort((a, b) => a.sortOrder - b.sortOrder)
      .map((h) => h.body),
    challenges: row.highlights
      .filter((h) => h.kind === "challenge")
      .sort((a, b) => a.sortOrder - b.sortOrder)
      .map((h) => h.body),
    outcomes: row.highlights
      .filter((h) => h.kind === "outcome")
      .sort((a, b) => a.sortOrder - b.sortOrder)
      .map((h) => h.body),
  }));
});

export const getEducation = cache(async () => {
  const rows = await db
    .select()
    .from(tables.education)
    .where(eq(tables.education.status, "published"))
    .orderBy(asc(tables.education.sortOrder));
  return rows.map((row) => ({
    qualification: row.qualification,
    institution: row.institution,
    location: row.location,
    period: row.endDate ? `${row.startDate} – ${row.endDate}` : row.startDate,
    areas: row.areas,
  }));
});

export type PublicProject = {
  slug: string;
  title: string;
  tagline: string;
  categories: string[];
  problem: string;
  solution: string;
  role: string;
  architecture: string;
  features: string[];
  decisions: string[];
  challenges: string[];
  challengeSolutions: string[];
  security: string;
  performance: string;
  results: string;
  lessons: string;
  tech: string[];
  github?: string;
  live?: string;
  confidential: boolean;
  featured: boolean;
  featuredImage: string | null;
};

export const getProjects = cache(async (): Promise<PublicProject[]> => {
  const rows = await db.query.projects.findMany({
    where: eq(tables.projects.status, "published"),
    orderBy: [asc(tables.projects.sortOrder)],
    with: { technologies: true },
  });
  return rows.map((row) => ({
    slug: row.slug,
    title: row.title,
    tagline: row.tagline,
    categories: row.categories,
    problem: row.problem,
    solution: row.solution,
    role: row.role,
    architecture: row.architecture,
    features: row.features,
    decisions: row.decisions,
    challenges: row.challenges,
    challengeSolutions: row.challengeSolutions,
    security: row.security,
    performance: row.performance,
    results: row.results,
    lessons: row.lessons,
    tech: row.technologies
      .sort((a, b) => a.sortOrder - b.sortOrder)
      .map((t) => t.name),
    github: row.githubUrl || undefined,
    live: row.liveUrl || undefined,
    confidential: row.confidential,
    featured: row.featured,
    featuredImage: mediaUrl(row.featuredImageId),
  }));
});

export const getProjectBySlug = cache(async (slug: string) => {
  const all = await getProjects();
  return all.find((p) => p.slug === slug) ?? null;
});

export const getSkillGroups = cache(async () => {
  const categories = await db.query.skillCategories.findMany({
    where: eq(tables.skillCategories.visible, true),
    orderBy: [asc(tables.skillCategories.sortOrder)],
    with: { skills: true },
  });
  return categories.map((cat) => ({
    label: cat.name,
    description: cat.description,
    skills: cat.skills
      .filter((s) => s.visible)
      .sort((a, b) => a.sortOrder - b.sortOrder)
      .map((s) => s.name),
    core: cat.skills.some((s) => s.core),
  }));
});

export const getSkillsInPractice = cache(async () => {
  const rows = await db
    .select()
    .from(tables.skills)
    .where(eq(tables.skills.visible, true))
    .orderBy(asc(tables.skills.sortOrder));
  return rows
    .filter((s) => s.usage.trim().length > 0)
    .map((s) => ({ skill: s.name, usage: s.usage }));
});

export const getStoryChapters = cache(async () => {
  return db
    .select()
    .from(tables.storyChapters)
    .where(eq(tables.storyChapters.status, "published"))
    .orderBy(asc(tables.storyChapters.sortOrder));
});

export const getStoryMilestones = cache(async () => {
  return db
    .select()
    .from(tables.storyMilestones)
    .where(eq(tables.storyMilestones.visible, true))
    .orderBy(asc(tables.storyMilestones.sortOrder));
});

export type PublicPost = {
  id: string;
  slug: string;
  title: string;
  description: string;
  body: string;
  date: string;
  category: string;
  tags: string[];
  featured: boolean;
  readingMinutes: number;
};

export const getPublishedPosts = cache(async (): Promise<PublicPost[]> => {
  const rows = await db.query.blogPosts.findMany({
    where: eq(tables.blogPosts.status, "published"),
    orderBy: [desc(tables.blogPosts.publishedAt)],
    with: { category: true, postTags: { with: { tag: true } } },
  });
  return rows.map((row) => ({
    id: row.id,
    slug: row.slug,
    title: row.title,
    description: row.description,
    body: row.body,
    date: row.publishedAt?.toISOString().slice(0, 10) ?? "",
    category: row.category?.name ?? "Engineering",
    tags: row.postTags.map((pt) => pt.tag.name),
    featured: row.featured,
    readingMinutes: Math.max(
      1,
      Math.round(row.body.split(/\s+/).filter(Boolean).length / 220)
    ),
  }));
});

export const getPublishedPost = cache(async (slug: string) => {
  const posts = await getPublishedPosts();
  return posts.find((p) => p.slug === slug) ?? null;
});

export const getAdjacentPublishedPosts = cache(async (slug: string) => {
  const posts = await getPublishedPosts();
  const idx = posts.findIndex((p) => p.slug === slug);
  return {
    prev: idx >= 0 && idx < posts.length - 1 ? posts[idx + 1] : null,
    next: idx > 0 ? posts[idx - 1] : null,
  };
});
