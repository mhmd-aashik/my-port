import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { cn } from "@/lib/utils";
import { Toaster } from "sonner";

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
});

export const metadata: Metadata = {
  title: "Mohammed Aashik | Full-Stack AI Engineer",
  description:
    "Full-Stack AI Engineer building intelligent applications with LLMs, RAG, agents, and modern web stacks. 6+ years of experience in AI integration, production systems, and DevOps.",
  keywords: [
    "Mohammed Aashik",
    "Full-Stack Engineer",
    "AI Engineer",
    "DevOps",
    "Web Development",
    "Mobile Applications",
    "Next.js",
    "React",
    "TypeScript",
  ],
  authors: [{ name: "Mohammed Aashik" }],
  creator: "Mohammed Aashik",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://mohammedaashik.com",
    title: "Mohammed Aashik | Full-Stack AI Engineer",
    description:
      "Full-Stack AI Engineer building intelligent applications with LLMs, RAG, agents, and modern web stacks.",
    siteName: "Mohammed Aashik Portfolio",
    images: [
      {
        url: "/images/me.jpg",
        width: 1200,
        height: 630,
        alt: "Mohammed Aashik | Full-Stack AI Engineer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Mohammed Aashik | Full-Stack AI Engineer",
    description:
      "Full-Stack AI Engineer building intelligent applications with LLMs, RAG, agents, and modern web stacks.",
    creator: "@mohammedaashik",
    images: ["/images/me.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          GeistSans.variable,
          jetbrainsMono.variable
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
        >
          {children}
          <Toaster theme="dark" richColors />
        </ThemeProvider>
      </body>
    </html>
  );
}
