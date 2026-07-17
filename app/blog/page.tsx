import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { PageHeader } from "@/components/ui/page-header";
import { Reveal } from "@/components/ui/reveal";
import { Section } from "@/components/ui/section";
import { formatDate, getAllPosts } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Technical articles on backend engineering, microservices, AI-assisted development, and lessons from seven years of building software.",
  alternates: { canonical: "/blog" },
};

export default function BlogPage() {
  const posts = getAllPosts();
  const featured = posts.find((p) => p.featured) ?? posts[0];
  const rest = posts.filter((p) => p !== featured);

  return (
    <>
      <PageHeader
        eyebrow="Blog"
        title="Engineering notes"
        description="Articles on backend systems, architecture, AI-assisted engineering, and the career lessons in between."
      />
      <Section>
        {featured && (
          <Reveal>
            <Card className="group relative overflow-hidden p-8 sm:p-10">
              <div
                className="absolute inset-0 bg-grid opacity-40 [mask-image:radial-gradient(ellipse_50%_80%_at_90%_20%,black,transparent)]"
                aria-hidden
              />
              <div className="relative">
                <div className="flex flex-wrap items-center gap-3 font-mono text-xs text-subtle">
                  <Badge variant="accent">Featured</Badge>
                  <time dateTime={featured.date}>{formatDate(featured.date)}</time>
                  <span aria-hidden>·</span>
                  <span>{featured.readingMinutes} min read</span>
                  <span aria-hidden>·</span>
                  <span>{featured.category}</span>
                </div>
                <h2 className="mt-4 max-w-2xl text-2xl font-semibold tracking-tight sm:text-3xl">
                  <Link
                    href={`/blog/${featured.slug}`}
                    className="transition-colors hover:text-accent"
                  >
                    {featured.title}
                  </Link>
                </h2>
                <p className="mt-3 max-w-2xl leading-relaxed text-muted">
                  {featured.description}
                </p>
                <Link
                  href={`/blog/${featured.slug}`}
                  className="mt-5 inline-flex items-center gap-1.5 text-sm text-accent transition-colors hover:text-accent-strong"
                >
                  Read article
                  <ArrowRight
                    className="size-4 transition-transform group-hover:translate-x-0.5"
                    aria-hidden
                  />
                </Link>
              </div>
            </Card>
          </Reveal>
        )}

        <div className="mt-8 grid gap-5 md:grid-cols-2">
          {rest.map((post, i) => (
            <Reveal key={post.slug} delay={(i % 2) * 0.06}>
              <Card className="flex h-full flex-col">
                <div className="flex flex-wrap items-center gap-3 font-mono text-xs text-subtle">
                  <time dateTime={post.date}>{formatDate(post.date)}</time>
                  <span aria-hidden>·</span>
                  <span>{post.readingMinutes} min read</span>
                </div>
                <h2 className="mt-3 text-lg font-semibold leading-snug">
                  <Link
                    href={`/blog/${post.slug}`}
                    className="transition-colors hover:text-accent"
                  >
                    {post.title}
                  </Link>
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  {post.description}
                </p>
                <div className="mt-auto flex flex-wrap gap-1.5 pt-4">
                  <Badge>{post.category}</Badge>
                  {post.tags.slice(0, 3).map((t) => (
                    <Badge key={t}>{t}</Badge>
                  ))}
                </div>
              </Card>
            </Reveal>
          ))}
        </div>

        {posts.length === 0 && (
          <p className="text-center text-sm text-subtle">
            Articles are on their way. Check back soon.
          </p>
        )}
      </Section>
    </>
  );
}
