import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { siteConfig } from "@/data/profile";
import { getNavItems, getProfile, getSettings, getSocialLinks } from "@/lib/content";
import { cn } from "@/lib/utils";

export async function generateMetadata(): Promise<Metadata> {
  let title = siteConfig.title;
  let description = siteConfig.description;
  try {
    const settings = await getSettings();
    if (settings.siteTitle) title = settings.siteTitle;
    if (settings.siteDescription) description = settings.siteDescription;
  } catch {
    // Database unavailable (e.g. first build before migration) — use fallbacks.
  }
  return {
    metadataBase: new URL(siteConfig.url),
    title: { default: title, template: "%s — Mohammed Aashik" },
    description,
    keywords: [
      "Full Stack Software Engineer",
      "Senior Software Engineer",
      "NestJS Developer",
      "Node.js Developer",
      "Backend Engineer",
      "Next.js Developer",
      "React Developer",
      "Microservices Engineer",
      "AI Engineer",
      "Software Engineer UAE",
      "Full Stack Developer Dubai",
    ],
    authors: [{ name: "Mohammed Aashik", url: siteConfig.url }],
    creator: "Mohammed Aashik",
    alternates: { canonical: "/" },
    openGraph: {
      type: "website",
      locale: "en_US",
      url: siteConfig.url,
      title,
      description,
      siteName: siteConfig.name,
    },
    twitter: { card: "summary_large_image", title, description },
    robots: { index: true, follow: true },
  };
}

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const [navItems, profile, social, settings] = await Promise.all([
    getNavItems(),
    getProfile(),
    getSocialLinks(),
    getSettings(),
  ]);

  const personJsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: profile.name,
    jobTitle: profile.title,
    url: siteConfig.url,
    email: profile.email,
    address: { "@type": "PostalAddress", addressLocality: "Dubai", addressCountry: "AE" },
    sameAs: [social.linkedin, social.github].filter(Boolean),
  };
  const websiteJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.name,
    url: siteConfig.url,
  };

  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          "min-h-screen font-sans antialiased",
          GeistSans.variable,
          GeistMono.variable
        )}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([personJsonLd, websiteJsonLd]),
          }}
        />
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
        >
          <Navbar navItems={navItems} cvPath={profile.cvPath} />
          <main id="main" className="pt-16">
            {children}
          </main>
          <Footer
            navItems={navItems}
            footerText={settings.footerText}
            social={{ linkedin: social.linkedin, github: social.github, email: social.email }}
            name={profile.name}
          />
        </ThemeProvider>
      </body>
    </html>
  );
}
