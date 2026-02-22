"use client";

import Link from "next/link";
import {
  User,
  Briefcase,
  GraduationCap,
  FolderGit2,
  Code2,
  MessageSquare,
  FileCode2,
  ChevronRight,
} from "lucide-react";
import { profile } from "@/data/profile";
import { cn } from "@/lib/utils";

const navItems = [
  { name: "About", href: "#about", icon: User },
  { name: "Experience", href: "#experience", icon: Briefcase },
  { name: "Education", href: "#education", icon: GraduationCap },
  { name: "Projects", href: "#projects", icon: FolderGit2 },
  { name: "Hobby Projects", href: "#hobby-projects", icon: FileCode2 },
  { name: "Skills", href: "#skills", icon: Code2 },
  { name: "Contact", href: "#contact", icon: MessageSquare },
];

export function IdeSidebar() {
  return (
    <aside className="hidden lg:flex flex-col w-56 shrink-0 border-r border-border bg-card/50">
      <div className="p-4 border-b border-border">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 rounded bg-primary/20 flex items-center justify-center group-hover:bg-primary/30 transition-colors">
            <Code2 className="h-4 w-4 text-primary" />
          </div>
          <span className="font-semibold text-sm truncate">{profile.name}</span>
        </Link>
      </div>
      <nav className="flex-1 p-2 overflow-y-auto">
        <p className="px-2 py-1.5 text-xs font-medium text-muted-foreground uppercase tracking-wider">
          Explorer
        </p>
        <div className="mt-1 space-y-0.5">
          {navItems.map((item) => (
            <NavLink key={item.href} href={item.href} icon={item.icon}>
              {item.name}
            </NavLink>
          ))}
        </div>
      </nav>
    </aside>
  );
}

function NavLink({
  href,
  icon: Icon,
  children,
}: {
  href: string;
  icon: React.ElementType;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "flex items-center gap-2 px-2 py-1.5 rounded-md text-sm text-muted-foreground",
        "hover:bg-accent hover:text-foreground transition-all duration-200",
        "group"
      )}
    >
      <Icon className="h-4 w-4 shrink-0 text-muted-foreground group-hover:text-primary transition-colors" />
      <span className="flex-1 truncate">{children}</span>
      <ChevronRight className="h-3.5 w-3.5 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
    </Link>
  );
}
