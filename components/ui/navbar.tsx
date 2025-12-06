"use client";

import * as React from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/mode-toggle";
import { profile } from "@/data/profile";

const navItems = [
 { name: "About", href: "#about" },
 { name: "Experience", href: "#experience" },
 { name: "Projects", href: "#projects" },
 { name: "Skills", href: "#skills" },
 { name: "Contact", href: "#contact" },
];

export function Navbar() {
 const [isOpen, setIsOpen] = React.useState(false);
 const [scrolled, setScrolled] = React.useState(false);

 React.useEffect(() => {
  const handleScroll = () => {
   setScrolled(window.scrollY > 50);
  };
  window.addEventListener("scroll", handleScroll);
  return () => window.removeEventListener("scroll", handleScroll);
 }, []);

 return (
  <header
   className={cn(
    "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
    scrolled
     ? "bg-background/80 backdrop-blur-md border-b"
     : "bg-transparent"
   )}
  >
   <div className="container mx-auto px-4 md:px-6">
    <div className="flex h-16 items-center justify-between">
     <Link
      href="/"
      className="text-lg font-bold tracking-tight hover:opacity-80 transition-opacity"
     >
      {profile.name}
     </Link>

     {/* Desktop Nav */}
     <nav className="hidden md:flex items-center gap-6">
      {navItems.map((item) => (
       <Link
        key={item.name}
        href={item.href}
        className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
       >
        {item.name}
       </Link>
      ))}
      <ModeToggle />
     </nav>

     {/* Mobile Menu Toggle */}
     <div className="flex items-center gap-2 md:hidden">
      <ModeToggle />
      <Button
       variant="ghost"
       size="icon"
       onClick={() => setIsOpen(!isOpen)}
       aria-label="Toggle menu"
      >
       {isOpen ? (
        <X className="h-5 w-5" />
       ) : (
        <Menu className="h-5 w-5" />
       )}
      </Button>
     </div>
    </div>
   </div>

   {/* Mobile Nav */}
   <AnimatePresence>
    {isOpen && (
     <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: "auto" }}
      exit={{ opacity: 0, height: 0 }}
      className="md:hidden border-b bg-background"
     >
      <div className="container mx-auto px-4 py-4 flex flex-col gap-4">
       {navItems.map((item) => (
        <Link
         key={item.name}
         href={item.href}
         className="text-sm font-medium py-2 hover:text-primary transition-colors"
         onClick={() => setIsOpen(false)}
        >
         {item.name}
        </Link>
       ))}
      </div>
     </motion.div>
    )}
   </AnimatePresence>
  </header>
 );
}
