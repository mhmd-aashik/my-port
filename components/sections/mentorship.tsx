"use client";

import { Section } from "@/components/ui/section";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Video } from "lucide-react";

export function Mentorship() {
 return (
  <Section id="mentorship" className="bg-muted/50">
   <div className="space-y-12">
    <div className="text-center space-y-4">
     <h2 className="text-3xl md:text-4xl font-bold">Mentorship & Teaching</h2>
     <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
      Sharing knowledge and helping the next generation of developers.
     </p>
    </div>

    <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
     <Card className="hover:shadow-lg transition-shadow">
      <CardHeader className="flex flex-row items-center gap-4">
       <div className="p-3 bg-primary/10 rounded-full">
        <Video className="h-6 w-6 text-primary" />
       </div>
       <CardTitle>Udemy Teaching Assistant</CardTitle>
      </CardHeader>
      <CardContent>
       <p className="text-muted-foreground mb-4">
        Helping students debug code, understand complex concepts, and solve software issues in real-time.
       </p>
       <p className="font-medium">Jan 2024 – Mar 2025</p>
      </CardContent>
     </Card>

     <Card className="hover:shadow-lg transition-shadow">
      <CardHeader className="flex flex-row items-center gap-4">
       <div className="p-3 bg-primary/10 rounded-full">
        <Users className="h-6 w-6 text-primary" />
       </div>
       <CardTitle>Zero to Full Stack Hero</CardTitle>
      </CardHeader>
      <CardContent>
       <p className="text-muted-foreground mb-4">
        Mentoring developers from beginner to full stack, guiding them through real-world projects and career growth.
       </p>
       <p className="font-medium">Mar 2020 – Present</p>
      </CardContent>
     </Card>
    </div>
   </div>
  </Section>
 );
}
