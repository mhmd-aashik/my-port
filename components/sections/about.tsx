"use client";

import { Section } from "@/components/ui/section";
import { Card, CardContent } from "@/components/ui/card";
import { profile } from "@/data/profile";
import { Code2, Globe, Users, Bot } from "lucide-react";

const facts = [
  { icon: Code2, label: "Experience", value: "7+ Years" },
  { icon: Globe, label: "Projects", value: "34+ Completed" },
  { icon: Users, label: "Mentorship", value: "30+ Students" },
  { icon: Bot, label: "Focus", value: "AI & Full-Stack" },
];

export function About() {
  return (
    <Section id="about" className="border-t border-border/50">
      <div className="grid md:grid-cols-2 gap-12 items-center">
        <div className="space-y-6">
          <h2 className="text-2xl md:text-3xl font-bold">About Me</h2>
          <p className="text-muted-foreground leading-relaxed">
            {profile.summary}
          </p>
          <p className="text-muted-foreground leading-relaxed">
            I started my coding journey around 2017. Today I focus on building
            AI-native applications—integrating LLMs, RAG pipelines, and agents
            into production systems.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {facts.map((fact, index) => (
            <Card key={index} className="border-border">
              <CardContent className="p-4 flex flex-col items-center text-center gap-2">
                <fact.icon className="h-6 w-6 text-primary mb-1" />
                <h3 className="font-semibold text-lg">{fact.value}</h3>
                <p className="text-xs text-muted-foreground">{fact.label}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </Section>
  );
}
