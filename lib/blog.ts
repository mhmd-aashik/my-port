import fs from "fs";
import path from "path";
import {
  extractToc,
  markdownToHtml,
  parseFrontmatter,
  readingTime,
  type TocEntry,
} from "./markdown";

export type Post = {
  slug: string;
  title: string;
  description: string;
  date: string;
  category: string;
  tags: string[];
  featured: boolean;
  readingMinutes: number;
  body: string;
};

export type RenderedPost = Post & { html: string; toc: TocEntry[] };

const BLOG_DIR = path.join(process.cwd(), "content", "blog");

function str(v: string | string[] | undefined, fallback = ""): string {
  return typeof v === "string" ? v : fallback;
}

export function getAllPosts(): Post[] {
  if (!fs.existsSync(BLOG_DIR)) return [];
  return fs
    .readdirSync(BLOG_DIR)
    .filter((f) => f.endsWith(".md"))
    .map((file) => {
      const raw = fs.readFileSync(path.join(BLOG_DIR, file), "utf8");
      const { frontmatter, body } = parseFrontmatter(raw);
      return {
        slug: file.replace(/\.md$/, ""),
        title: str(frontmatter.title, "Untitled"),
        description: str(frontmatter.description),
        date: str(frontmatter.date),
        category: str(frontmatter.category, "Engineering"),
        tags: Array.isArray(frontmatter.tags) ? frontmatter.tags : [],
        featured: str(frontmatter.featured) === "true",
        readingMinutes: readingTime(body),
        body,
      };
    })
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getPost(slug: string): RenderedPost | null {
  const post = getAllPosts().find((p) => p.slug === slug);
  if (!post) return null;
  return { ...post, html: markdownToHtml(post.body), toc: extractToc(post.body) };
}

export function getAdjacentPosts(slug: string): {
  prev: Post | null;
  next: Post | null;
} {
  const posts = getAllPosts();
  const idx = posts.findIndex((p) => p.slug === slug);
  return {
    prev: idx < posts.length - 1 ? posts[idx + 1] : null,
    next: idx > 0 ? posts[idx - 1] : null,
  };
}

export function formatDate(date: string): string {
  const d = new Date(date);
  if (Number.isNaN(d.getTime())) return date;
  return d.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}
