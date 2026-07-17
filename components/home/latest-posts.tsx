import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Reveal } from "@/components/ui/reveal";
import { Section, SectionHeading } from "@/components/ui/section";
import { formatDate, getAllPosts } from "@/lib/blog";

export function LatestPosts() {
  const posts = getAllPosts().slice(0, 3);
  if (posts.length === 0) return null;

  return (
    <Section className="border-t border-border">
      <Reveal>
        <div className="flex flex-wrap items-end justify-between gap-4">
          <SectionHeading
            eyebrow="Writing"
            title="Latest from the blog"
            description="Engineering notes, architecture lessons, and career reflections."
          />
          <Link
            href="/blog"
            className="inline-flex items-center gap-1.5 text-sm text-accent transition-colors hover:text-accent-strong"
          >
            All articles <ArrowRight className="size-4" aria-hidden />
          </Link>
        </div>
      </Reveal>
      <div className="mt-10 grid gap-5 md:grid-cols-3">
        {posts.map((post, i) => (
          <Reveal key={post.slug} delay={i * 0.08}>
            <Card className="flex h-full flex-col">
              <div className="flex items-center gap-3 font-mono text-xs text-subtle">
                <time dateTime={post.date}>{formatDate(post.date)}</time>
                <span aria-hidden>·</span>
                <span>{post.readingMinutes} min read</span>
              </div>
              <h3 className="mt-3 text-base font-semibold leading-snug">
                <Link
                  href={`/blog/${post.slug}`}
                  className="transition-colors hover:text-accent"
                >
                  {post.title}
                </Link>
              </h3>
              <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-muted">
                {post.description}
              </p>
              <div className="mt-auto pt-4">
                <Badge>{post.category}</Badge>
              </div>
            </Card>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
