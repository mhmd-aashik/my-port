import Link from "next/link";
import { Github, Linkedin, Mail } from "lucide-react";
import { navItems } from "@/data/navigation";
import { profile } from "@/data/profile";
import { socialLinks } from "@/data/social-links";

export function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="flex flex-col gap-8 sm:flex-row sm:items-start sm:justify-between">
          <div className="max-w-sm">
            <p className="font-mono text-sm font-semibold">
              <span className="text-accent">~/</span>aashik
            </p>
            <p className="mt-3 text-sm leading-relaxed text-muted">
              Full-Stack Software Engineer building scalable products from{" "}
              {profile.location}.
            </p>
            <div className="mt-4 flex gap-3">
              <a
                href={socialLinks.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="text-subtle transition-colors hover:text-foreground"
              >
                <Github className="size-5" />
              </a>
              <a
                href={socialLinks.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="text-subtle transition-colors hover:text-foreground"
              >
                <Linkedin className="size-5" />
              </a>
              <a
                href={socialLinks.email}
                aria-label="Email"
                className="text-subtle transition-colors hover:text-foreground"
              >
                <Mail className="size-5" />
              </a>
            </div>
          </div>
          <nav aria-label="Footer" className="grid grid-cols-2 gap-x-12 gap-y-2">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm text-muted transition-colors hover:text-foreground"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
        <p className="mt-10 font-mono text-xs text-subtle">
          © {new Date().getFullYear()} {profile.name}. Built with Next.js.
        </p>
      </div>
    </footer>
  );
}
