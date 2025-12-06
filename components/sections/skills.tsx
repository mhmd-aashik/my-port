"use client";

import { Section } from "@/components/ui/section";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { skills } from "@/data/skills";

export function Skills() {
 return (
  <Section id="skills">
   <div className="space-y-12">
    <div className="text-center space-y-4">
     <h2 className="text-3xl md:text-4xl font-bold">Tech Stack</h2>
     <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
      The technologies and tools I use to build scalable applications.
     </p>
    </div>

    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
     {Object.entries(skills).map(([category, items]) => (
      <Card key={category} className="hover:shadow-md transition-shadow">
       <CardHeader>
        <CardTitle className="capitalize">
         {category.replace(/([A-Z])/g, " $1").trim()}
        </CardTitle>
       </CardHeader>
       <CardContent>
        <div className="flex flex-wrap gap-2">
         {items.map((skill) => (
          <Badge key={skill} variant="secondary">
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
