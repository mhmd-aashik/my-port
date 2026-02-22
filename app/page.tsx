import { IdeTabs } from "@/components/layout/ide-tabs";
import { IdeTerminal } from "@/components/layout/ide-terminal";
import { Hero } from "@/components/sections/hero";
import { About } from "@/components/sections/about";
import { Experience } from "@/components/sections/experience";
import { Education } from "@/components/sections/education";
import { Projects } from "@/components/sections/projects";
import { HobbyProjects } from "@/components/sections/hobby-projects";
import { Skills } from "@/components/sections/skills";
import { Mentorship } from "@/components/sections/mentorship";
import { Contact } from "@/components/sections/contact";

export default function Home() {
  return (
    <div className="flex min-h-screen bg-background flex-col">
      <IdeTabs />
      <main className="flex-1 overflow-y-auto">
        <Hero />
        <About />
        <Experience />
        <Education />
        <Projects />
        <HobbyProjects />
        <Skills />
        <Mentorship />
        <Contact />
      </main>
      <IdeTerminal />
    </div>
  );
}
