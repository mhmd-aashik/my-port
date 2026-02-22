"use client";

import * as React from "react";
import Link from "next/link";
import { Menu, X, Github, Linkedin, Code2 } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { profile } from "@/data/profile";

const navItems = [
  { name: "About", href: "#about" },
  { name: "Experience", href: "#experience" },
  { name: "Education", href: "#education" },
  { name: "Projects", href: "#projects" },
  { name: "Skills", href: "#skills" },
  { name: "Contact", href: "#contact" },
];

export function IdeTabs() {
  const [activeTab, setActiveTab] = React.useState<string | null>(null);
  const [isOpen, setIsOpen] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      const sections = navItems.map((item) => ({
        ...item,
        el: document.querySelector(item.href),
      }));
      const scrollY = window.scrollY + 120;
      for (let i = sections.length - 1; i >= 0; i--) {
        const rect = sections[i].el?.getBoundingClientRect();
        const top = (rect?.top ?? 0) + window.scrollY;
        if (scrollY >= top) {
          setActiveTab(sections[i].href);
          break;
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/90 backdrop-blur-xl">
      <div className="flex h-14 items-center justify-between px-4 md:px-6 lg:px-8">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2 group shrink-0"
        >
          <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
            <Code2 className="h-4 w-4 text-primary" />
          </div>
          <span className="font-semibold text-sm hidden sm:inline">
            {profile.name.split(" ")[1]}
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-1">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "relative px-4 py-2 text-sm font-medium rounded-md transition-colors",
                activeTab === item.href
                  ? "text-foreground"
                  : "text-muted-foreground hover:text-foreground hover:bg-accent/50"
              )}
            >
              {item.name}
              {activeTab === item.href && (
                <motion.div
                  layoutId="nav-underline"
                  className="absolute inset-0 rounded-md bg-primary/10 -z-10"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.4 }}
                />
              )}
            </Link>
          ))}
        </nav>

        {/* Right: CTA + Social */}
        <div className="flex items-center gap-2">
          <div className="hidden md:flex items-center gap-1">
            <Link
              href={profile.github}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-accent/50 transition-colors"
              aria-label="GitHub"
            >
              <Github className="h-4 w-4" />
            </Link>
            <Link
              href={profile.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-accent/50 transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin className="h-4 w-4" />
            </Link>
          </div>
          <Link
            href="#contact"
            className="hidden sm:inline-flex items-center px-4 py-2 text-sm font-medium rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
          >
            Get in Touch
          </Link>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-md hover:bg-accent/50 text-muted-foreground hover:text-foreground transition-colors"
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden border-t border-border bg-card/95 backdrop-blur-xl overflow-hidden"
          >
            <div className="p-4 flex flex-col gap-1">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className={cn(
                    "px-4 py-3 rounded-lg text-sm font-medium transition-colors",
                    activeTab === item.href
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground hover:bg-accent/50 hover:text-foreground"
                  )}
                >
                  {item.name}
                </Link>
              ))}
              <div className="flex gap-2 pt-4 mt-2 border-t border-border">
                <Link
                  href={profile.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setIsOpen(false)}
                  className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg bg-accent/50 text-sm font-medium hover:bg-accent transition-colors"
                >
                  <Github className="h-4 w-4" />
                  GitHub
                </Link>
                <Link
                  href={profile.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setIsOpen(false)}
                  className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg bg-accent/50 text-sm font-medium hover:bg-accent transition-colors"
                >
                  <Linkedin className="h-4 w-4" />
                  LinkedIn
                </Link>
              </div>
              <Link
                href="#contact"
                onClick={() => setIsOpen(false)}
                className="mt-2 py-3 rounded-lg bg-primary text-primary-foreground text-center text-sm font-medium hover:bg-primary/90 transition-colors"
              >
                Get in Touch
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
