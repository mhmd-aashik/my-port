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
    <Section className="min-h-screen flex items-center justify-center pt-32 pb-16 md:pt-48 md:pb-32">
      <div className="flex flex-col items-center text-center max-w-4xl mx-auto space-y-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="relative"
        >
          <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-primary to-secondary opacity-75 blur-lg animate-pulse" />
          <div className="relative rounded-full bg-background p-2">
            <Image
              src="/images/me.png"
              alt={profile.name}
              width={128}
              height={128}
              draggable={false}
              className="h-24 w-24 md:h-32 md:w-32 rounded-full object-cover"
              priority
            />
          </div>
        </motion.div>

        <div className="space-y-4">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight"
          >
            Hi, I&apos;m <span className="text-primary">{profile.name}</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-xl md:text-2xl text-muted-foreground font-medium"
          >
            {profile.role}
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="max-w-2xl mx-auto text-muted-foreground text-lg"
          >
            I build scalable, production-ready web & mobile experiences with
            modern tech stacks.
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="flex flex-wrap items-center justify-center gap-4"
        >
          <Button size="lg" asChild>
            <Link href="#projects">
              View Projects <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
          <Button size="lg" variant="outline" asChild>
            <a href="/cv/aashik-cv.pdf" download="aashik-cv.pdf">
              Download CV <Download className="ml-2 h-4 w-4" />
            </a>
          </Button>
          <div className="flex items-center gap-2 ml-4">
            <Button size="icon" variant="ghost" asChild>
              <Link href={profile.linkedin} target="_blank">
                <Linkedin className="h-5 w-5" />
              </Link>
            </Button>
            <Button size="icon" variant="ghost" asChild>
              <Link href={`mailto:${profile.email}`}>
                <Mail className="h-5 w-5" />
              </Link>
            </Button>
            <Button size="icon" variant="ghost" asChild>
              <Link href="https://github.com" target="_blank">
                <Github className="h-5 w-5" />
              </Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </Section>
  );
}
