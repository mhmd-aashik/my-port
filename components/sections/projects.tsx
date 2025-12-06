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
import { ExternalLink, Github } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

const categories = ["All", "Enterprise", "Backend", "Web Apps"];

export function Projects() {
 const [activeCategory, setActiveCategory] = useState("All");

 const filteredProjects = projects.filter(
  (project) =>
   activeCategory === "All" ||
   (project.category && project.category === activeCategory)
 );

 return (
  <Section id="projects" className="bg-muted/50">
   <div className="space-y-12">
    <div className="text-center space-y-4">
     <h2 className="text-3xl md:text-4xl font-bold">Featured Projects</h2>
     <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
      A selection of projects I&apos;ve worked on, from enterprise systems to open source tools.
     </p>
    </div>

    <div className="flex justify-center gap-2 flex-wrap">
     {categories.map((category) => (
      <Button
       key={category}
       variant={activeCategory === category ? "default" : "outline"}
       onClick={() => setActiveCategory(category)}
       className="rounded-full"
      >
       {category}
      </Button>
     ))}
    </div>

    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
     <AnimatePresence mode="popLayout">
      {filteredProjects.map((project) => (
       <motion.div
        key={project.title}
        layout
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.3 }}
       >
        <Card className="h-full flex flex-col hover:shadow-lg transition-shadow">
         <CardHeader>
          <CardTitle className="line-clamp-1">{project.title}</CardTitle>
          <CardDescription className="line-clamp-3">
           {project.description}
          </CardDescription>
         </CardHeader>
         <CardContent className="flex-1">
          <div className="flex flex-wrap gap-2 mb-4">
           {project.tech.map((tech) => (
            <Badge key={tech} variant="outline">
             {tech}
            </Badge>
           ))}
          </div>
          {project.details && (
           <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
            {project.details.features.slice(0, 2).map((feature, i) => (
             <li key={i} className="line-clamp-1">
              {feature}
             </li>
            ))}
           </ul>
          )}
         </CardContent>
         <CardFooter className="gap-2">
          <Button variant="outline" size="sm" className="w-full" asChild>
           <Link href={project.link} target="_blank">
            <ExternalLink className="mr-2 h-4 w-4" />
            View Project
           </Link>
          </Button>
          {/* Add GitHub link if available in data, currently placeholder */}
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
