"use client";

import { profile } from "@/data/profile";
import { Github, Linkedin, Mail, Terminal } from "lucide-react";
import Link from "next/link";

export function IdeTerminal() {
  return (
    <footer className="border-t border-border bg-card/80">
      <div className="flex items-center h-10 px-4 gap-4">
        <div className="flex items-center gap-2 text-muted-foreground">
          <Terminal className="h-4 w-4" />
          <span className="text-xs font-mono">terminal</span>
        </div>
        <div className="flex-1 font-mono text-xs text-muted-foreground truncate">
          <span className="text-[#4DE1C1]">$</span> ready — {profile.name} • Full-Stack AI Developer
        </div>
        <div className="flex items-center gap-3">
          <Link
            href={profile.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-primary transition-colors"
          >
            <Github className="h-4 w-4" />
            <span className="sr-only">GitHub</span>
          </Link>
          <Link
            href={profile.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-primary transition-colors"
          >
            <Linkedin className="h-4 w-4" />
            <span className="sr-only">LinkedIn</span>
          </Link>
          <Link
            href={`mailto:${profile.email}`}
            className="text-muted-foreground hover:text-primary transition-colors"
          >
            <Mail className="h-4 w-4" />
            <span className="sr-only">Email</span>
          </Link>
        </div>
      </div>
    </footer>
  );
}
