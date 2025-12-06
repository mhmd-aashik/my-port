import { Navbar } from "@/components/ui/navbar";
import { Footer } from "@/components/ui/footer";
import { Hero } from "@/components/sections/hero";
import { About } from "@/components/sections/about";
import { Experience } from "@/components/sections/experience";
import { Projects } from "@/components/sections/projects";
import { Skills } from "@/components/sections/skills";
import { Mentorship } from "@/components/sections/mentorship";
import { Contact } from "@/components/sections/contact";

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <div className="flex flex-col gap-0">
        <Hero />
        <About />
        <Experience />
        <Projects />
        <Skills />
        <Mentorship />
        <Contact />
      </div>
      <Footer />
    </main>
  );
}
