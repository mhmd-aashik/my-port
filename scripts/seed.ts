/**
 * Idempotent database seed. Ports the repo's original static content
 * (data/*.ts and content/blog/*.md) into PostgreSQL. Safe to run repeatedly:
 * existing rows (matched by natural keys) are left untouched.
 *
 * Run: npm run db:seed
 */
import fs from "fs";
import path from "path";
import { and, eq } from "drizzle-orm";
import { db, tables } from "../db";
import { parseFrontmatter } from "../lib/markdown";
import { profile as profileData, siteConfig } from "../data/profile";
import { socialLinks as socialData } from "../data/social-links";
import { navItems } from "../data/navigation";
import { experience as experienceData } from "../data/experience";
import { education as educationData } from "../data/education";
import { projects as projectsData } from "../data/projects";
import { skillTiers, skillsInPractice } from "../data/skills";
import { storyChapters as chaptersData, storyTimeline } from "../data/story";

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

async function seedSingletons() {
  await db
    .insert(tables.siteSettings)
    .values({
      id: 1,
      siteTitle: siteConfig.title,
      siteDescription: siteConfig.description,
      heroHeading:
        "I build scalable digital products, from intuitive interfaces to distributed backend systems.",
      heroDescription: profileData.subheadline,
      footerText: `Full-Stack Software Engineer building scalable products from ${profileData.location}.`,
      contactPageText:
        "Senior engineering roles, contract work, consulting, or a technical conversation — all welcome.",
    })
    .onConflictDoNothing();

  await db
    .insert(tables.profile)
    .values({
      id: 1,
      fullName: profileData.name,
      headline: profileData.title,
      shortBio: profileData.subheadline,
      longBio: profileData.summary,
      email: profileData.email,
      phone: profileData.phone,
      location: profileData.location,
      availability: profileData.availability,
      relocation: "Based in Dubai; open to UAE and remote opportunities",
      yearsOfExperience: profileData.yearsOfExperience,
      responseTime: profileData.responseTime,
    })
    .onConflictDoNothing();
  console.log("✓ site settings + profile");
}

async function seedSocialAndNav() {
  const socials = [
    { label: "LinkedIn", url: socialData.linkedin, icon: "linkedin", sortOrder: 0 },
    { label: "GitHub", url: socialData.github, icon: "github", sortOrder: 1 },
    { label: "Email", url: socialData.email, icon: "mail", sortOrder: 2 },
  ];
  for (const s of socials) {
    const existing = await db.query.socialLinks.findFirst({
      where: eq(tables.socialLinks.label, s.label),
    });
    if (!existing) await db.insert(tables.socialLinks).values(s);
  }

  for (const [i, item] of navItems.entries()) {
    const existing = await db.query.navigationItems.findFirst({
      where: eq(tables.navigationItems.href, item.href),
    });
    if (!existing) {
      await db
        .insert(tables.navigationItems)
        .values({ label: item.label, href: item.href, sortOrder: i });
    }
  }
  console.log("✓ social links + navigation");
}

const aboutSeed = [
  {
    title: "Build for maintainability, not only immediate delivery",
    body: "The person who inherits the code matters as much as the deadline. I optimize for the six-months-later reader.",
  },
  {
    title: "Keep architecture proportionate to the problem",
    body: "Microservices, queues, and Kubernetes earn their complexity — or they don't get used.",
  },
  {
    title: "Make security part of the design",
    body: "Authentication, authorization, and tenant isolation are architecture, not features bolted on before launch.",
  },
  {
    title: "Measure before optimizing",
    body: "Profiles and metrics decide what's slow. Intuition just nominates candidates.",
  },
  {
    title: "Prefer clarity over cleverness",
    body: "Code is read far more than it is written. Clever is a cost; clear is an asset.",
  },
  {
    title: "Document important technical decisions",
    body: "A short written 'why' outlives everyone's memory of the meeting.",
  },
  {
    title: "Automate repetitive work",
    body: "CI/CD, scripts, and tooling — anything done three times by hand should be done a fourth time by a machine.",
  },
  {
    title: "Use AI as an engineering assistant, not a replacement for judgment",
    body: "AI accelerates research, refactoring, and testing. Deciding what to build and what to trust stays human.",
  },
];

async function seedAbout() {
  for (const [i, section] of aboutSeed.entries()) {
    const existing = await db.query.aboutSections.findFirst({
      where: eq(tables.aboutSections.title, section.title),
    });
    if (!existing) {
      await db
        .insert(tables.aboutSections)
        .values({ ...section, sortOrder: i });
    }
  }
  console.log("✓ about sections");
}

async function seedExperience() {
  for (const [i, exp] of experienceData.entries()) {
    const [start, end = ""] = exp.period.split("–").map((s) => s.trim());
    const existing = await db.query.experiences.findFirst({
      where: and(
        eq(tables.experiences.company, exp.company),
        eq(tables.experiences.role, exp.role)
      ),
    });
    if (existing) continue;

    await db.transaction(async (tx) => {
      const [row] = await tx
        .insert(tables.experiences)
        .values({
          company: exp.company,
          role: exp.role,
          employmentType: exp.employmentType,
          location: exp.location,
          startDate: start ?? "",
          endDate: end === "Present" ? "" : end,
          current: end === "Present",
          context: exp.context,
          technologies: exp.tech,
          featured: exp.featured,
          sortOrder: i,
          status: "published",
        })
        .returning({ id: tables.experiences.id });

      const highlights = [
        ...exp.responsibilities.map((body, j) => ({
          kind: "responsibility",
          body,
          sortOrder: j,
        })),
        ...exp.challenges.map((body, j) => ({
          kind: "challenge",
          body,
          sortOrder: j,
        })),
        ...exp.outcomes.map((body, j) => ({
          kind: "outcome",
          body,
          sortOrder: j,
        })),
      ];
      if (highlights.length > 0) {
        await tx.insert(tables.experienceHighlights).values(
          highlights.map((h) => ({ ...h, experienceId: row.id }))
        );
      }
    });
  }
  console.log("✓ experience");
}

async function seedEducation() {
  for (const [i, edu] of educationData.entries()) {
    const existing = await db.query.education.findFirst({
      where: eq(tables.education.qualification, edu.qualification),
    });
    if (existing) continue;
    const [start, end = ""] = edu.period.split("–").map((s) => s.trim());
    await db.insert(tables.education).values({
      qualification: edu.qualification,
      institution: edu.institution,
      location: edu.location,
      startDate: start ?? "",
      endDate: end,
      areas: edu.areas,
      sortOrder: i,
      status: "published",
    });
  }
  console.log("✓ education");
}

async function seedProjects() {
  for (const [i, project] of projectsData.entries()) {
    const existing = await db.query.projects.findFirst({
      where: eq(tables.projects.slug, project.slug),
    });
    if (existing) continue;

    await db.transaction(async (tx) => {
      const [row] = await tx
        .insert(tables.projects)
        .values({
          slug: project.slug,
          title: project.title,
          tagline: project.tagline,
          categories: project.categories,
          problem: project.problem,
          solution: project.solution,
          role: project.role,
          architecture: project.architecture,
          features: project.features,
          decisions: project.decisions,
          challenges: project.challenges,
          security: project.security,
          performance: project.performance,
          results: project.outcome,
          lessons: project.lessons,
          githubUrl: project.confidential ? "" : (project.github ?? ""),
          liveUrl: project.live ?? "",
          confidential: project.confidential ?? false,
          featured: project.featured,
          sortOrder: i,
          status: "published",
          publishedAt: new Date(),
        })
        .returning({ id: tables.projects.id });

      await tx.insert(tables.projectTechnologies).values(
        project.tech.map((name, j) => ({
          projectId: row.id,
          name,
          sortOrder: j,
        }))
      );
    });
  }
  console.log("✓ projects");
}

async function seedSkills() {
  const levelByTier: Record<string, "core_expertise" | "strong_experience" | "working_knowledge"> = {
    core: "core_expertise",
    experienced: "strong_experience",
    additional: "working_knowledge",
  };
  const usageBySkill = new Map(
    skillsInPractice.map((s) => [s.skill.toLowerCase(), s.usage])
  );

  for (const [tierKey, tier] of Object.entries(skillTiers)) {
    const existingCat = await db.query.skillCategories.findFirst({
      where: eq(tables.skillCategories.name, tier.label),
    });
    const catId =
      existingCat?.id ??
      (
        await db
          .insert(tables.skillCategories)
          .values({
            name: tier.label,
            description: tier.description,
            sortOrder: tierKey === "core" ? 0 : tierKey === "experienced" ? 1 : 2,
          })
          .returning({ id: tables.skillCategories.id })
      )[0].id;

    for (const [j, name] of tier.skills.entries()) {
      const existing = await db.query.skills.findFirst({
        where: and(
          eq(tables.skills.name, name),
          eq(tables.skills.categoryId, catId)
        ),
      });
      if (existing) continue;
      await db.insert(tables.skills).values({
        name,
        categoryId: catId,
        level: levelByTier[tierKey] ?? "working_knowledge",
        usage: usageBySkill.get(name.toLowerCase()) ?? "",
        core: tierKey === "core",
        sortOrder: j,
      });
    }
  }
  console.log("✓ skills");
}

async function seedStory() {
  for (const [i, chapter] of chaptersData.entries()) {
    const slug = slugify(chapter.title);
    const existing = await db.query.storyChapters.findFirst({
      where: eq(tables.storyChapters.slug, slug),
    });
    if (existing) continue;
    await db.insert(tables.storyChapters).values({
      slug,
      title: chapter.title,
      body: chapter.paragraphs.join("\n\n"),
      sortOrder: i,
      status: "published",
    });
  }

  for (const [i, m] of storyTimeline.entries()) {
    const existing = await db.query.storyMilestones.findFirst({
      where: eq(tables.storyMilestones.title, m.label),
    });
    if (existing) continue;
    await db.insert(tables.storyMilestones).values({
      date: m.year,
      title: m.label,
      sortOrder: i,
    });
  }
  console.log("✓ story chapters + milestones");
}

async function seedBlog() {
  const defaults = [
    "Backend Engineering",
    "Frontend Engineering",
    "Architecture",
    "Microservices",
    "AI Engineering",
    "Career",
    "Personal Journey",
    "DevOps",
    "Tutorials",
  ];
  for (const [i, name] of defaults.entries()) {
    await db
      .insert(tables.blogCategories)
      .values({ name, slug: slugify(name), sortOrder: i })
      .onConflictDoNothing();
  }

  const blogDir = path.join(process.cwd(), "content", "blog");
  if (!fs.existsSync(blogDir)) return;

  for (const file of fs.readdirSync(blogDir).filter((f) => f.endsWith(".md"))) {
    const slug = file.replace(/\.md$/, "");
    const existing = await db.query.blogPosts.findFirst({
      where: eq(tables.blogPosts.slug, slug),
    });
    if (existing) continue;

    const raw = fs.readFileSync(path.join(blogDir, file), "utf8");
    const { frontmatter, body } = parseFrontmatter(raw);
    const categoryName = typeof frontmatter.category === "string" ? frontmatter.category : "";
    const category = categoryName
      ? await db.query.blogCategories.findFirst({
          where: eq(tables.blogCategories.name, categoryName),
        })
      : undefined;

    await db.transaction(async (tx) => {
      const [post] = await tx
        .insert(tables.blogPosts)
        .values({
          slug,
          title: String(frontmatter.title ?? slug),
          description: String(frontmatter.description ?? ""),
          body,
          categoryId: category?.id,
          featured: String(frontmatter.featured) === "true",
          status: "published",
          publishedAt: frontmatter.date ? new Date(String(frontmatter.date)) : new Date(),
        })
        .returning({ id: tables.blogPosts.id });

      const tagNames = Array.isArray(frontmatter.tags) ? frontmatter.tags : [];
      for (const tagName of tagNames) {
        const tagSlug = slugify(tagName);
        let tag = await tx.query.blogTags.findFirst({
          where: eq(tables.blogTags.slug, tagSlug),
        });
        if (!tag) {
          [tag] = await tx
            .insert(tables.blogTags)
            .values({ name: tagName, slug: tagSlug })
            .returning();
        }
        await tx
          .insert(tables.blogPostTags)
          .values({ postId: post.id, tagId: tag.id })
          .onConflictDoNothing();
      }
    });
  }
  console.log("✓ blog categories, tags, posts");
}

async function main() {
  console.log("Seeding database…");
  await seedSingletons();
  await seedSocialAndNav();
  await seedAbout();
  await seedExperience();
  await seedEducation();
  await seedProjects();
  await seedSkills();
  await seedStory();
  await seedBlog();
  console.log("Done. Seed is idempotent — running again will not duplicate rows.");
  process.exit(0);
}

main().catch((err) => {
  console.error("Seed failed:", err);
  process.exit(1);
});
