import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { cn } from "@/lib/utils";
import { Toaster } from "sonner";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit" });

export const metadata: Metadata = {
  title: "Mohammed Aashik | Full-Stack AI Engineer",
  description:
    "Senior Full-Stack Engineer specializing in scalable web & mobile applications, AI, and DevOps.",
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
      "Senior Full-Stack Engineer specializing in scalable web & mobile applications, AI, and DevOps.",
    siteName: "Mohammed Aashik Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Mohammed Aashik | Full-Stack AI Engineer",
    description:
      "Senior Full-Stack Engineer specializing in scalable web & mobile applications, AI, and DevOps.",
    creator: "@mohammedaashik",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          inter.variable,
          outfit.variable
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
