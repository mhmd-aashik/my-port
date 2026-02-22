"use client";

import { useState } from "react";
import { Section } from "@/components/ui/section";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { projects } from "@/data/projects";
import { ExternalLink } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

const categories = ["All", "AI/ML", "Enterprise", "Backend", "Web Apps"];

export function Projects() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredProjects = projects.filter(
    (project) =>
      activeCategory === "All" ||
      (project.category && project.category === activeCategory)
  );

  return (
    <Section id="projects" className="border-t border-border/50">
      <div className="space-y-8">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold mb-2">Featured Projects</h2>
          <p className="text-muted-foreground text-sm">
            AI-powered applications, enterprise systems, and full-stack solutions.
          </p>
        </div>

        <div className="flex gap-2 flex-wrap">
          {categories.map((category) => (
            <Button
              key={category}
              variant={activeCategory === category ? "default" : "outline"}
              size="sm"
              onClick={() => setActiveCategory(category)}
              className="rounded-md font-mono text-xs"
            >
              {category}
            </Button>
          ))}
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <motion.div
                key={project.title}
                layout
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 8 }}
                transition={{ duration: 0.25 }}
              >
                <Card className="h-full flex flex-col border-border">
                  <CardHeader className="pb-3">
                    <CardTitle className="line-clamp-1 text-base">{project.title}</CardTitle>
                    <CardDescription className="line-clamp-3 text-sm">
                      {project.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="flex-1 space-y-3">
                    <div className="flex flex-wrap gap-1.5">
                      {project.tech.map((tech) => (
                        <Badge
                          key={tech}
                          variant="secondary"
                          className="font-mono text-xs bg-secondary/50 border-border"
                        >
                          {tech}
                        </Badge>
                      ))}
                    </div>
                    {project.details && (
                      <ul className="list-disc list-inside text-xs text-muted-foreground space-y-0.5">
                        {project.details.features.slice(0, 2).map((feature, i) => (
                          <li key={i} className="line-clamp-1">{feature}</li>
                        ))}
                      </ul>
                    )}
                  </CardContent>
                  <CardFooter className="pt-0">
                    <Button variant="outline" size="sm" className="w-full font-mono text-xs" asChild>
                      <Link href={project.link} target="_blank">
                        <ExternalLink className="mr-1.5 h-3.5 w-3.5" />
                        View Project
                      </Link>
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </Section>
  );
}
