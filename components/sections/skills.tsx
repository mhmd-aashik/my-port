"use client";

import { Section } from "@/components/ui/section";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { skills } from "@/data/skills";

export function Skills() {
  return (
    <Section id="skills" className="border-t border-border/50">
      <div className="space-y-8">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold mb-2">Tech Stack</h2>
          <p className="text-muted-foreground text-sm">
            AI tools, frameworks, and technologies for building intelligent applications.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {Object.entries(skills).map(([category, items]) => (
            <Card key={category} className="border-border">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium capitalize text-muted-foreground">
                  {category.replace(/([A-Z])/g, " $1").trim()}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-1.5">
                  {items.map((skill) => (
                    <Badge
                      key={skill}
                      variant="secondary"
                      className="font-mono text-xs bg-secondary/50 border-border"
                    >
                      {skill}
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
