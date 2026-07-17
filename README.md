# aashik.dev — Portfolio

Personal portfolio of Mohammed Aashik, Full-Stack Software Engineer. Built with Next.js 16 (App Router), TypeScript, Tailwind CSS 4, and Framer Motion. Dark-first theme with light mode, fully responsive, SEO-ready.

## Getting started

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build
npm run lint       # eslint
npm run typecheck  # tsc --noEmit
```

## Editing content

All portfolio content lives in `data/` — no professional information is hardcoded in components:

| File | Contents |
|---|---|
| `data/profile.ts` | Name, title, location, contact, summary, site metadata |
| `data/experience.ts` | Work history (Veuston dates flagged with a NOTE — verify) |
| `data/education.ts` | Qualifications and certifications |
| `data/projects.ts` | Project case studies (GitHub links marked TODO) |
| `data/skills.ts` | Skill tiers, categories, and "how I use them" |
| `data/story.ts` | My Story chapters — `[Add ...]` placeholders await your personal memories |
| `data/navigation.ts` / `data/social-links.ts` | Nav items and social URLs |

## Blog

Posts are plain Markdown files in `content/blog/*.md` with frontmatter:

```md
---
title: Post Title
description: One-line summary.
date: 2026-07-01
category: Backend Engineering
tags: [nestjs, architecture]
featured: false
---
```

Rendering uses a small zero-dependency Markdown pipeline in `lib/markdown.ts` (chosen to keep the project dependency-light; swap for `@next/mdx` or Contentlayer later without changing content files). Reading time, table of contents, prev/next navigation, RSS (`/rss.xml`), and sitemap entries are automatic.

## TODOs before deploying

1. `data/profile.ts` — add your CV PDF at `public/cv/mohammed-aashik-cv.pdf` (or update `cvPath`).
2. `data/projects.ts` — replace placeholder GitHub links with exact repo URLs.
3. `data/story.ts` — fill in the `[Add ...]` personal placeholders.
4. Contact form email: copy `.env.example` to `.env.local` and set `RESEND_API_KEY`; update the `from:` sender in `app/api/contact/route.ts` to a verified domain.
5. Verify Veuston International dates in `data/experience.ts`.

## Deployment (Vercel)

Push to GitHub, import the repo in Vercel, add `RESEND_API_KEY` as an environment variable, deploy. The site is statically generated except the contact API route.

## Structure

```
app/          Pages (App Router): home, about, experience, education,
              projects (+ case studies), skills, story, blog (+ articles),
              contact, 404, sitemap, robots, rss
components/   layout/ (navbar, footer), home/ (homepage sections),
              projects/, forms/, ui/ (primitives)
content/blog/ Markdown articles
data/         All editable portfolio content
lib/          blog reader, markdown pipeline, validation, utils
```
