"use client";

import { Section } from "@/components/ui/section";
import { Card, CardContent } from "@/components/ui/card";
import { profile } from "@/data/profile";
import { Code2, Globe, Users, Zap } from "lucide-react";

const facts = [
 {
  icon: Code2,
  label: "Experience",
  value: "6+ Years",
 },
 {
  icon: Globe,
  label: "Projects",
  value: "34+ Completed",
 },
 {
  icon: Users,
  label: "Mentorship",
  value: "30+ Students",
 },
 {
  icon: Zap,
  label: "Focus",
  value: "Performance",
 },
];

export function About() {
 return (
  <Section id="about" className="bg-muted/50">
   <div className="grid md:grid-cols-2 gap-12 items-center">
    <div className="space-y-6">
     <h2 className="text-3xl md:text-4xl font-bold">About Me</h2>
     <p className="text-lg text-muted-foreground leading-relaxed">
      {profile.summary}
     </p>
     <p className="text-lg text-muted-foreground leading-relaxed">
      I started my coding journey around 2017, and since then, I&apos;ve been passionate about solving complex problems and building software that scales. Whether it&apos;s optimizing database queries, architecting cloud infrastructure, or mentoring the next generation of developers, I love every aspect of the software lifecycle.
     </p>
    </div>

    <div className="grid grid-cols-2 gap-4">
     {facts.map((fact, index) => (
      <Card key={index} className="border-none shadow-none bg-background/50">
       <CardContent className="p-6 flex flex-col items-center text-center gap-2">
        <fact.icon className="h-8 w-8 text-primary mb-2" />
        <h3 className="font-bold text-xl">{fact.value}</h3>
        <p className="text-sm text-muted-foreground">{fact.label}</p>
       </CardContent>
      </Card>
     ))}
    </div>
   </div>
  </Section>
 );
}
