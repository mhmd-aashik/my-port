"use client";

import { Section } from "@/components/ui/section";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { experience } from "@/data/experience";
import { Calendar, Briefcase } from "lucide-react";

export function Experience() {
 return (
  <Section id="experience">
   <div className="space-y-12">
    <div className="text-center space-y-4">
     <h2 className="text-3xl md:text-4xl font-bold">Work Experience</h2>
     <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
      My professional journey in software development and mentorship.
     </p>
    </div>

    <div className="relative max-w-4xl mx-auto pl-8 md:pl-0">
     {/* Timeline Line */}
     <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-border -translate-x-1/2 hidden md:block" />
     <div className="absolute left-0 top-0 bottom-0 w-px bg-border md:hidden" />

     <div className="space-y-12">
      {experience.map((job, index) => (
       <div
        key={index}
        className={`relative flex flex-col md:flex-row gap-8 ${index % 2 === 0 ? "md:flex-row-reverse" : ""
         }`}
       >
        {/* Timeline Dot */}
        <div className="absolute left-0 md:left-1/2 w-4 h-4 bg-primary rounded-full -translate-x-[9px] md:-translate-x-1/2 mt-6 ring-4 ring-background" />

        <div className="flex-1 md:w-1/2" />

        <div className="flex-1 md:w-1/2">
         <Card className="relative hover:shadow-lg transition-shadow">
          <CardHeader>
           <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
             <Calendar className="h-4 w-4" />
             {job.period}
            </div>
            <CardTitle className="text-xl">{job.role}</CardTitle>
            <div className="flex items-center gap-2 text-primary font-medium">
             <Briefcase className="h-4 w-4" />
             {job.company}
            </div>
           </div>
          </CardHeader>
          <CardContent className="space-y-4">
           <p className="text-muted-foreground">{job.description}</p>
           <div className="flex flex-wrap gap-2">
            {job.tech.map((tech) => (
             <Badge key={tech} variant="secondary">
              {tech}
             </Badge>
            ))}
           </div>
          </CardContent>
         </Card>
        </div>
       </div>
      ))}
     </div>
    </div>
   </div>
  </Section>
 );
}
