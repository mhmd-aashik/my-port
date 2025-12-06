import { profile } from "@/data/profile";
import { Github, Linkedin, Mail, Twitter } from "lucide-react";
import Link from "next/link";

export function Footer() {
 return (
  <footer className="border-t bg-background">
   <div className="container mx-auto px-4 py-8 md:py-12">
    <div className="flex flex-col md:flex-row justify-between items-center gap-6">
     <div className="flex flex-col items-center md:items-start gap-2">
      <span className="text-lg font-bold">{profile.name}</span>
      <p className="text-sm text-muted-foreground text-center md:text-left">
       © {new Date().getFullYear()} All rights reserved.
      </p>
     </div>

     <div className="flex items-center gap-4">
      <Link
       href={profile.linkedin}
       target="_blank"
       rel="noopener noreferrer"
       className="text-muted-foreground hover:text-foreground transition-colors"
      >
       <Linkedin className="h-5 w-5" />
       <span className="sr-only">LinkedIn</span>
      </Link>
      <Link
       href={`mailto:${profile.email}`}
       className="text-muted-foreground hover:text-foreground transition-colors"
      >
       <Mail className="h-5 w-5" />
       <span className="sr-only">Email</span>
      </Link>
      {/* Add more social links if available in profile */}
     </div>
    </div>
   </div>
  </footer>
 );
}
