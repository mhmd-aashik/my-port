import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Section } from "@/components/ui/section";
import { formatDate, getAdjacentPosts, getAllPosts, getPost } from "@/lib/blog";
import { siteConfig } from "@/data/profile";

export function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.description,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.description,
      publishedTime: post.date,
      url: `${siteConfig.url}/blog/${post.slug}`,
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const { prev, next } = getAdjacentPosts(slug);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    author: { "@type": "Person", name: "Mohammed Aashik", url: siteConfig.url },
    url: `${siteConfig.url}/blog/${post.slug}`,
  };

  return (
    <Section className="max-w-4xl">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Link
        href="/blog"
        className="inline-flex items-center gap-1.5 text-sm text-subtle transition-colors hover:text-foreground"
      >
        <ArrowLeft className="size-4" aria-hidden /> All articles
      </Link>

      <header className="mt-8">
        <div className="flex flex-wrap items-center gap-3 font-mono text-xs text-subtle">
          <time dateTime={post.date}>{formatDate(post.date)}</time>
          <span aria-hidden>·</span>
          <span>{post.readingMinutes} min read</span>
          <span aria-hidden>·</span>
          <span>{post.category}</span>
        </div>
        <h1 className="mt-4 text-3xl font-semibold leading-tight tracking-tight sm:text-4xl">
          {post.title}
        </h1>
        <p className="mt-4 text-lg leading-relaxed text-muted">
          {post.description}
        </p>
        <div className="mt-4 flex flex-wrap gap-1.5">
          {post.tags.map((t) => (
            <Badge key={t}>{t}</Badge>
          ))}
        </div>
      </header>

      <div className="mt-10 grid gap-12 lg:grid-cols-[1fr_220px]">
        <article
          className="prose min-w-0"
          dangerouslySetInnerHTML={{ __html: post.html }}
        />
        {post.toc.length > 1 && (
          <nav
            aria-label="Table of contents"
            className="order-first lg:order-none"
          >
            <div className="lg:sticky lg:top-24">
              <h2 className="font-mono text-xs uppercase tracking-wider text-subtle">
                On this page
              </h2>
              <ul className="mt-3 space-y-2 border-l border-border">
                {post.toc.map((entry) => (
                  <li key={entry.id}>
                    <a
                      href={`#${entry.id}`}
                      className={`block border-l-2 border-transparent text-sm text-muted transition-colors hover:border-accent hover:text-foreground ${
                        entry.level === 3 ? "pl-6" : "pl-3"
                      }`}
                    >
                      {entry.text}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </nav>
        )}
      </div>

      <nav
        aria-label="Adjacent articles"
        className="mt-16 grid gap-4 border-t border-border pt-8 sm:grid-cols-2"
      >
        {prev ? (
          <Link
            href={`/blog/${prev.slug}`}
            className="group rounded-lg border border-border p-4 transition-colors hover:border-border-strong"
          >
            <span className="inline-flex items-center gap-1 font-mono text-xs text-subtle">
              <ArrowLeft className="size-3" aria-hidden /> Previous
            </span>
            <p className="mt-1.5 text-sm font-medium group-hover:text-accent">
              {prev.title}
            </p>
          </Link>
        ) : (
          <span aria-hidden />
        )}
        {next && (
          <Link
            href={`/blog/${next.slug}`}
            className="group rounded-lg border border-border p-4 text-right transition-colors hover:border-border-strong"
          >
            <span className="inline-flex items-center gap-1 font-mono text-xs text-subtle">
              Next <ArrowRight className="size-3" aria-hidden />
            </span>
            <p className="mt-1.5 text-sm font-medium group-hover:text-accent">
              {next.title}
            </p>
          </Link>
        )}
      </nav>
    </Section>
  );
}
