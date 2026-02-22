"use client";

import { motion } from "framer-motion";
import { ArrowRight, Download, Github, Linkedin, Mail } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Section } from "@/components/ui/section";
import { profile } from "@/data/profile";

export function Hero() {
  return (
    <Section className="min-h-[85vh] flex items-center justify-center py-24">
      <div className="flex flex-col items-center text-center max-w-4xl mx-auto space-y-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
          className="relative"
        >
          <div className="relative rounded-lg overflow-hidden ring-1 ring-border hover:ring-primary/40 transition-all duration-300 hover:shadow-[0_0_20px_rgba(124,92,255,0.15)]">
            <Image
              src="/images/me.png"
              alt={profile.name}
              width={120}
              height={120}
              draggable={false}
              className="h-24 w-24 md:h-28 md:w-28 object-cover"
              priority
            />
          </div>
        </motion.div>

        <div className="space-y-4">
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight"
          >
            Hi, I&apos;m{" "}
            <span className="text-primary">{profile.name}</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="text-lg md:text-xl text-muted-foreground font-medium"
          >
            {profile.role}
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.25 }}
            className="max-w-2xl mx-auto text-muted-foreground text-base"
          >
            I build AI-powered applications—integrating LLMs, RAG, and agents
            into scalable full-stack systems.
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.35 }}
          className="flex flex-wrap items-center justify-center gap-3"
        >
          <Button
            size="lg"
            asChild
            className="transition-all duration-200 hover:-translate-y-0.5 focus-glow"
          >
            <Link href="#projects">
              View Projects <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
          <Button
            size="lg"
            variant="outline"
            asChild
            className="border-border hover:border-primary/40 hover:bg-primary/5 transition-all duration-200 hover:-translate-y-0.5"
          >
            <a href="/cv/aashik-cv.pdf" download="aashik-cv.pdf">
              Download CV <Download className="ml-2 h-4 w-4" />
            </a>
          </Button>
          <div className="flex items-center gap-1 ml-2">
            <Button size="icon" variant="ghost" asChild className="hover:bg-accent">
              <Link href={profile.linkedin} target="_blank">
                <Linkedin className="h-5 w-5" />
              </Link>
            </Button>
            <Button size="icon" variant="ghost" asChild className="hover:bg-accent">
              <Link href="#contact">
                <Mail className="h-5 w-5" />
              </Link>
            </Button>
            <Button size="icon" variant="ghost" asChild className="hover:bg-accent">
              <Link href={profile.github} target="_blank">
                <Github className="h-5 w-5" />
              </Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </Section>
  );
}
