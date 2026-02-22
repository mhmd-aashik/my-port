"use client";

import { Section } from "@/components/ui/section";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Video } from "lucide-react";

export function Mentorship() {
  return (
    <Section id="mentorship" className="border-t border-border/50">
      <div className="space-y-8">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold mb-2">Mentorship & Teaching</h2>
          <p className="text-muted-foreground text-sm">
            Sharing knowledge—from full-stack development to AI integration.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <Card className="border-border">
            <CardHeader className="flex flex-row items-center gap-3 pb-2">
              <div className="p-2 bg-primary/10 rounded shrink-0">
                <Video className="h-4 w-4 text-primary" />
              </div>
              <CardTitle className="text-base">Udemy Teaching Assistant</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-3">
                Helping students debug code, understand complex concepts, and solve software issues in real-time.
              </p>
              <p className="font-mono text-xs text-muted-foreground">Jan 2024 – Mar 2025</p>
            </CardContent>
          </Card>

          <Card className="border-border">
            <CardHeader className="flex flex-row items-center gap-3 pb-2">
              <div className="p-2 bg-primary/10 rounded shrink-0">
                <Users className="h-4 w-4 text-primary" />
              </div>
              <CardTitle className="text-base">Zero to Full Stack Hero</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-3">
                Mentoring developers from beginner to full stack, guiding them through real-world projects and career growth.
              </p>
              <p className="font-mono text-xs text-muted-foreground">Mar 2020 – Present</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </Section>
  );
}
