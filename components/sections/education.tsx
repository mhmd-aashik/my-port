"use client";

import { Section } from "@/components/ui/section";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { education, certifications } from "@/data/education";
import { Award, GraduationCap } from "lucide-react";

export function Education() {
  return (
    <Section id="education" className="border-t border-border/50">
      <div className="space-y-12">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold mb-2">Education</h2>
          <p className="text-muted-foreground text-sm">
            Academic background and qualifications.
          </p>
        </div>

        <div className="space-y-6">
          {education.map((edu, index) => (
            <div key={index} className="flex gap-4">
              <div className="flex flex-col items-center shrink-0">
                <div className="w-8 h-8 rounded bg-primary/10 flex items-center justify-center">
                  <GraduationCap className="h-4 w-4 text-primary" />
                </div>
                {index !== education.length - 1 && (
                  <div className="w-px flex-1 min-h-[24px] bg-border my-1" />
                )}
              </div>
              <div className="pb-6">
                <h3 className="font-semibold">{edu.degree}</h3>
                <p className="text-primary text-sm font-medium">{edu.institution}</p>
                <p className="text-muted-foreground text-sm mt-1">{edu.highlight}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="pt-4">
          <h3 className="text-lg font-semibold mb-4">Certifications</h3>
          <div className="grid md:grid-cols-2 gap-4">
            {certifications.map((cert, index) => (
              <Card key={index} className="border-border">
                <CardHeader className="flex flex-row items-start gap-3 pb-2">
                  <div className="p-2 bg-primary/10 rounded shrink-0">
                    <Award className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="text-base">{cert.title}</CardTitle>
                    <p className="text-xs text-muted-foreground font-medium">{cert.issuer}</p>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{cert.highlight}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}
