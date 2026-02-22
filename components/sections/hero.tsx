"use client";

import { motion } from "framer-motion";
import { ArrowRight, Download, Github, Linkedin, Mail, MapPin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Section } from "@/components/ui/section";
import { profile } from "@/data/profile";

export function Hero() {
  return (
    <Section className="min-h-[90vh] flex items-center py-20 md:py-28 overflow-visible">
      <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start overflow-visible">
        {/* Left: Content */}
        <div className="space-y-8 order-2 lg:order-1">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-primary/10 border border-primary/20 w-fit"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#4DE1C1] opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#4DE1C1]" />
            </span>
            <span className="text-xs font-mono text-muted-foreground">
              Available for opportunities
            </span>
          </motion.div>

          <div className="space-y-4">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-sm font-mono text-primary"
            >
              &gt; Hello, I&apos;m
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1]"
            >
              <span className="text-foreground">{profile.name.split(" ")[0]}</span>{" "}
              <span className="text-primary">{profile.name.split(" ")[1]}</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-lg md:text-xl text-muted-foreground font-medium"
            >
              {profile.role}
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.25 }}
              className="text-muted-foreground text-base max-w-lg leading-relaxed"
            >
              I build AI-powered applications—integrating LLMs, RAG, and agents
              into scalable full-stack systems. 7+ years shipping production code.
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex items-center gap-2 text-sm text-muted-foreground"
          >
            <MapPin className="h-4 w-4" />
            <span>{profile.location}</span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.35 }}
            className="flex flex-wrap items-center gap-3"
          >
            <Button size="lg" asChild className="font-mono">
              <Link href="#projects">
                View Projects <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild className="font-mono">
              <a href="/cv/aashik-cv.pdf" download="aashik-cv.pdf">
                Download CV <Download className="ml-2 h-4 w-4" />
              </a>
            </Button>
            <div className="flex items-center gap-1">
              <Button size="icon" variant="ghost" asChild>
                <Link href={profile.linkedin} target="_blank" aria-label="LinkedIn">
                  <Linkedin className="h-5 w-5" />
                </Link>
              </Button>
              <Button size="icon" variant="ghost" asChild>
                <Link href="#contact" aria-label="Email">
                  <Mail className="h-5 w-5" />
                </Link>
              </Button>
              <Button size="icon" variant="ghost" asChild>
                <Link href={profile.github} target="_blank" aria-label="GitHub">
                  <Github className="h-5 w-5" />
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>

        {/* Right: Avatar + Code block */}
        <div className="order-1 lg:order-2 flex flex-col items-center lg:items-end gap-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative"
          >
            <div className="absolute -inset-1 rounded-2xl bg-gradient-to-br from-primary/30 to-[#4DE1C1]/20 blur-2xl opacity-60" />
            <div className="relative rounded-2xl overflow-hidden ring-1 ring-border bg-card p-1">
              <Image
                src="/images/me.png"
                alt={profile.name}
                width={280}
                height={280}
                draggable={false}
                className="h-48 w-48 md:h-64 md:w-64 object-cover rounded-xl"
                priority
              />
            </div>
          </motion.div>

          {/* Code snippet */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="w-full min-w-[280px] max-w-lg rounded-lg border border-border bg-card/80 p-4 font-mono text-sm"
          >
            <div className="flex gap-2 mb-3">
              <span className="w-3 h-3 rounded-full bg-[#FF5F56]" />
              <span className="w-3 h-3 rounded-full bg-[#FFBD2E]" />
              <span className="w-3 h-3 rounded-full bg-[#27C93F]" />
            </div>
            <pre className="text-muted-foreground space-y-1.5 whitespace-pre-wrap break-words overflow-visible">
              <code><span className="text-[#7C5CFF]">const</span> developer = {"{"}</code>
              <code>  <span className="text-amber-400/90">name</span>: <span className="text-[#4DE1C1]">&quot;{profile.name}&quot;</span>,</code>
              <code>  <span className="text-amber-400/90">role</span>: <span className="text-[#4DE1C1]">&quot;Full-Stack AI Engineer&quot;</span>,</code>
              <code>  <span className="text-amber-400/90">stack</span>: [<span className="text-[#4DE1C1]">&quot;Next.js&quot;</span>, <span className="text-[#4DE1C1]">&quot;LLMs&quot;</span>, <span className="text-[#4DE1C1]">&quot;RAG&quot;</span>],</code>
              <code>  <span className="text-amber-400/90">available</span>: <span className="text-[#4DE1C1]">true</span></code>
              <code>{"}"};</code>
            </pre>
          </motion.div>
        </div>
      </div>
    </Section>
  );
}
