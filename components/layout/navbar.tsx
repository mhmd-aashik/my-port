"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X, Download } from "lucide-react";
import { ModeToggle } from "@/components/mode-toggle";
import { cn } from "@/lib/utils";

type NavItem = { label: string; href: string };

export function Navbar({
  navItems,
  cvPath,
}: {
  navItems: NavItem[];
  cvPath: string;
}) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  // The CMS has its own chrome.
  if (pathname.startsWith("/admin")) return null;

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-colors duration-300",
        scrolled || open
          ? "border-b border-border bg-background/85 backdrop-blur-md"
          : "bg-transparent"
      )}
    >
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-accent focus:px-3 focus:py-2 focus:text-sm focus:text-background"
      >
        Skip to content
      </a>
      <nav
        aria-label="Main"
        className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6"
      >
        <Link href="/" className="font-mono text-sm font-semibold tracking-tight">
          <span className="text-accent">~/</span>aashik
        </Link>

        <div className="hidden items-center gap-1 lg:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={isActive(item.href) ? "page" : undefined}
              className={cn(
                "rounded-md px-3 py-2 text-sm transition-colors",
                isActive(item.href)
                  ? "text-foreground"
                  : "text-muted hover:text-foreground"
              )}
            >
              {item.label}
              {isActive(item.href) && (
                <span className="mx-auto mt-0.5 block h-0.5 w-4 rounded-full bg-accent" />
              )}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <ModeToggle />
          <a
            href={cvPath}
            download
            className="hidden items-center gap-1.5 rounded-md border border-border-strong px-3 py-1.5 text-sm text-muted transition-colors hover:border-accent hover:text-foreground sm:inline-flex"
          >
            <Download className="size-3.5" aria-hidden />
            CV
          </a>
          <button
            type="button"
            aria-expanded={open}
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
            className="rounded-md p-2 text-muted hover:text-foreground lg:hidden"
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </nav>

      {open && (
        <div className="border-t border-border bg-background lg:hidden">
          <div className="mx-auto max-w-6xl space-y-1 px-4 py-4 sm:px-6">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                aria-current={isActive(item.href) ? "page" : undefined}
                className={cn(
                  "block rounded-md px-3 py-2.5 text-base",
                  isActive(item.href)
                    ? "bg-accent-soft text-foreground"
                    : "text-muted hover:bg-surface-raised hover:text-foreground"
                )}
              >
                {item.label}
              </Link>
            ))}
            <a
              href={cvPath}
              download
              className="mt-2 flex items-center gap-2 rounded-md border border-border-strong px-3 py-2.5 text-base text-muted"
            >
              <Download className="size-4" aria-hidden />
              Download CV
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
