"use client";

import { Section } from "@/components/ui/section";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { experience } from "@/data/experience";
import { Calendar, Briefcase } from "lucide-react";

export function Experience() {
  return (
    <Section id="experience" className="border-t border-border/50">
      <div className="space-y-10">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold mb-2">Work Experience</h2>
          <p className="text-muted-foreground text-sm">
            Building production systems—from full-stack apps to AI-integrated solutions.
          </p>
        </div>

        <div className="space-y-6">
          {experience.map((job, index) => (
            <Card key={index} className="border-border">
              <CardHeader className="pb-3">
                <div className="flex flex-col gap-1.5">
                  <div className="flex items-center gap-2 text-xs text-muted-foreground font-mono">
                    <Calendar className="h-3.5 w-3.5" />
                    {job.period}
                  </div>
                  <CardTitle className="text-lg">{job.role}</CardTitle>
                  <div className="flex items-center gap-2 text-primary text-sm font-medium">
                    <Briefcase className="h-4 w-4" />
                    {job.company}
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {job.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {job.tech.map((tech) => (
                    <Badge
                      key={tech}
                      variant="secondary"
                      className="font-mono text-xs bg-secondary/50 border-border"
                    >
                      {tech}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </Section>
  );
}
