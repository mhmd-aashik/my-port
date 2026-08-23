export type Experience = {
  company: string;
  role: string;
  employmentType: string;
  period: string;
  location: string;
  context: string;
  responsibilities: string[];
  challenges: string[];
  outcomes: string[];
  tech: string[];
  featured: boolean;
};

// NOTE: Veuston dates were unclear in the source CV — confirmed as 2026 by Aashik.
export const experience: Experience[] = [
  {
    company: "Veuston International",
    role: "Senior Software Engineer",
    employmentType: "Full-time",
    period: "Jan 2026 – Present",
    location: "Remote",
    context:
      "Multi-tenant SaaS platform serving isolated organization environments.",
    responsibilities: [
      "Designed and built the multi-tenant backend architecture supporting isolated organization environments with dynamic slug-based routing.",
      "Designed a granular resource–action role-based access control (RBAC) system.",
      "Implemented JWT authentication with Passport.js strategies.",
      "Built multi-step OTP verification flows using Resend.",
    ],
    challenges: [
      "Keeping tenant data strictly isolated while sharing a single codebase and infrastructure.",
      "Modeling permissions granular enough for enterprise clients without making them unmanageable.",
    ],
    outcomes: [
      "A tenant-aware backend foundation that new organizations can onboard onto without code changes.",
    ],
    tech: ["NestJS", "Node.js", "TypeScript", "PostgreSQL", "Passport.js", "JWT", "Resend"],
    featured: true,
  },
  {
    company: "Pelican Cube",
    role: "Software Engineer",
    employmentType: "Full-time",
    period: "Jan 2024 – Dec 2025",
    location: "Sri Lanka",
    context:
      "Large government railway ticketing and train-management platform: smart ticketing, seat reservation, reporting, and train management.",
    responsibilities: [
      "Built and maintained NestJS and Node.js microservices behind the ticketing platform.",
      "Refactored RabbitMQ message-driven services for reliability and clearer ownership.",
      "Improved reporting performance across sales, revenue, and operational dashboards.",
      "Developed Next.js and React components for admin and operational interfaces.",
      "Worked with Keycloak authentication and role-based access control.",
      "Contributed to API specifications and architecture documentation.",
    ],
    challenges: [
      "Refactoring live message-driven services without disrupting ticket sales.",
      "Reporting queries over large operational datasets that had grown slow over time.",
    ],
    outcomes: [
      "Reduced technical debt through systematic refactoring and documented service boundaries.",
      "Faster, more reliable reporting for railway operations staff.",
    ],
    tech: ["NestJS", "Node.js", "RabbitMQ", "Next.js", "React", "Keycloak", "Flutter", "AWS"],
    featured: true,
  },
  {
    company: "InventuriX Technologies",
    role: "Software Engineer",
    employmentType: "Full-time",
    period: "Oct 2021 – Nov 2023",
    location: "Sri Lanka",
    context:
      "Full-stack delivery of enterprise web applications for international clients.",
    responsibilities: [
      "Led full-stack development for international clients, from requirements to production.",
      "Designed REST APIs and microservices with security-first defaults.",
      "Built advanced Next.js applications using SSR, SSG, API routes, and dynamic routing.",
      "Designed MongoDB schemas and CMS architecture for content-heavy products.",
      "Implemented authentication and distributed session management.",
      "Managed Docker deployments and CI/CD pipelines.",
      "Mentored junior developers and reviewed architecture decisions.",
    ],
    challenges: [
      "Translating loosely defined stakeholder requirements into concrete system designs.",
      "Improving Core Web Vitals on content-heavy pages without redesigning them.",
    ],
    outcomes: [
      "Consistent 90+ Lighthouse scores across delivered applications.",
      "Junior developers mentored into independent feature ownership.",
    ],
    tech: ["Next.js", "React", "Node.js", "MongoDB", "TypeScript", "Docker", "CI/CD"],
    featured: true,
  },
  {
    company: "InventuriX Technologies",
    role: "Associate Software Engineer",
    employmentType: "Full-time",
    period: "Oct 2019 – Oct 2021",
    location: "Sri Lanka",
    context: "Full-stack solutions for UK-based clients.",
    responsibilities: [
      "Built applications and analytics dashboards for UK-based clients.",
      "Designed secure REST APIs with optimized database queries.",
      "Implemented token-based authentication and authorization.",
      "Integrated Stripe subscriptions with webhook automation.",
      "Improved SEO and frontend performance through SSR/SSG, caching, and bundle optimization.",
      "Contributed to Docker and CI/CD workflows.",
    ],
    challenges: [
      "Making subscription billing resilient to webhook failures and retries.",
    ],
    outcomes: [
      "90+ Lighthouse scores on client-facing applications.",
      "Reliable recurring-billing flows for subscription products.",
    ],
    tech: ["Next.js", "React", "Node.js", "Express.js", "MongoDB", "TypeScript", "Stripe"],
    featured: false,
  },
  {
    company: "InventuriX Technologies",
    role: "Software Engineer Intern",
    employmentType: "Internship",
    period: "Apr 2019 – Oct 2019",
    location: "Sri Lanka",
    context: "Production web applications built with React, Node.js, and MongoDB.",
    responsibilities: [
      "Built React and Node.js features for production applications.",
      "Created reusable UI components.",
      "Supported REST API development, debugging, and testing.",
      "Learned Git workflows and deployment processes.",
    ],
    challenges: [
      "Learning to work in an existing production codebase with real users.",
    ],
    outcomes: [
      "Promoted to Associate Software Engineer after six months.",
    ],
    tech: ["React.js", "Node.js", "MongoDB", "REST APIs", "Git"],
    featured: false,
  },
];
