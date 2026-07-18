"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const items = [
  { href: "/admin", label: "Overview" },
  { href: "/admin/settings", label: "Site Settings" },
  { href: "/admin/profile", label: "Profile" },
  { href: "/admin/about", label: "About" },
  { href: "/admin/experience", label: "Experience" },
  { href: "/admin/education", label: "Education" },
  { href: "/admin/projects", label: "Projects" },
  { href: "/admin/skills", label: "Skills" },
  { href: "/admin/story", label: "My Story" },
  { href: "/admin/blog", label: "Blog" },
  { href: "/admin/media", label: "Media" },
  { href: "/admin/messages", label: "Messages" },
  { href: "/admin/audit", label: "Audit Log" },
];

export function AdminNav() {
  const pathname = usePathname();
  const isActive = (href: string) =>
    href === "/admin" ? pathname === "/admin" : pathname.startsWith(href);

  return (
    <nav aria-label="CMS sections" className="flex gap-1 overflow-x-auto lg:flex-col">
      {items.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          aria-current={isActive(item.href) ? "page" : undefined}
          className={cn(
            "whitespace-nowrap rounded-md px-3 py-2 text-sm transition-colors",
            isActive(item.href)
              ? "bg-accent-soft text-accent"
              : "text-muted hover:bg-surface-raised hover:text-foreground"
          )}
        >
          {item.label}
        </Link>
      ))}
    </nav>
  );
}
