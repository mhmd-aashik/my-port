"use client";

import { Section } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { profile } from "@/data/profile";
import { Mail, MapPin, Phone } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export function Contact() {
 const [isSubmitting, setIsSubmitting] = useState(false);

 async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
  e.preventDefault();
  setIsSubmitting(true);

  const formData = new FormData(e.currentTarget);
  const data = Object.fromEntries(formData.entries());

  try {
   const response = await fetch("/api/contact", {
    method: "POST",
    headers: {
     "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
   });

   if (!response.ok) {
    throw new Error("Failed to send message");
   }

   toast.success("Message sent successfully!", {
    description: "I'll get back to you as soon as possible.",
   });
   (e.target as HTMLFormElement).reset();
  } catch (err) {
   toast.error("Something went wrong.", {
    description: "Please try again later or email me directly.",
   });
  } finally {
   setIsSubmitting(false);
  }
 }

 return (
  <Section id="contact">
   <div className="space-y-12">
    <div className="text-center space-y-4">
     <h2 className="text-3xl md:text-4xl font-bold">Get in Touch</h2>
     <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
      Interested in working together? Feel free to reach out for collaborations or just a friendly hello.
     </p>
    </div>

    <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
     <div className="space-y-8">
      <Card>
       <CardHeader>
        <CardTitle>Contact Information</CardTitle>
       </CardHeader>
       <CardContent className="space-y-6">
        <div className="flex items-center gap-4">
         <div className="p-3 bg-primary/10 rounded-full">
          <Mail className="h-6 w-6 text-primary" />
         </div>
         <div>
          <p className="font-medium">Email</p>
          <a
           href={`mailto:${profile.email} `}
           className="text-muted-foreground hover:text-primary transition-colors"
          >
           {profile.email}
          </a>
         </div>
        </div>
        <div className="flex items-center gap-4">
         <div className="p-3 bg-primary/10 rounded-full">
          <Phone className="h-6 w-6 text-primary" />
         </div>
         <div>
          <p className="font-medium">Phone</p>
          <a
           href={`tel:${profile.phone} `}
           className="text-muted-foreground hover:text-primary transition-colors"
          >
           {profile.phone}
          </a>
         </div>
        </div>
        <div className="flex items-center gap-4">
         <div className="p-3 bg-primary/10 rounded-full">
          <MapPin className="h-6 w-6 text-primary" />
         </div>
         <div>
          <p className="font-medium">Location</p>
          <p className="text-muted-foreground">{profile.location}</p>
         </div>
        </div>
       </CardContent>
      </Card>
     </div>

     <Card>
      <CardHeader>
       <CardTitle>Send a Message</CardTitle>
      </CardHeader>
      <CardContent>
       <form className="space-y-4" onSubmit={handleSubmit}>
        <div className="grid grid-cols-2 gap-4">
         <div className="space-y-2">
          <label htmlFor="name" className="text-sm font-medium">
           Name
          </label>
          <Input id="name" name="name" placeholder="John Doe" required disabled={isSubmitting} />
         </div>
         <div className="space-y-2">
          <label htmlFor="email" className="text-sm font-medium">
           Email
          </label>
          <Input id="email" name="email" type="email" placeholder="john@example.com" required disabled={isSubmitting} />
         </div>
        </div>
        <div className="space-y-2">
         <label htmlFor="subject" className="text-sm font-medium">
          Subject
         </label>
         <Input id="subject" name="subject" placeholder="Project Inquiry" required disabled={isSubmitting} />
        </div>
        <div className="space-y-2">
         <label htmlFor="message" className="text-sm font-medium">
          Message
         </label>
         <Textarea
          id="message"
          name="message"
          placeholder="Tell me about your project..."
          className="min-h-[150px]"
          required
          disabled={isSubmitting}
         />
        </div>
        <Button type="submit" className="w-full" disabled={isSubmitting}>
         {isSubmitting ? "Sending..." : "Send Message"}
        </Button>
       </form>
      </CardContent>
     </Card>
    </div>
   </div>
  </Section>
 );
}
