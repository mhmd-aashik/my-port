export type Project = {
  slug: string;
  title: string;
  tagline: string;
  categories: string[];
  problem: string;
  solution: string;
  role: string;
  architecture: string;
  features: string[];
  decisions: string[];
  challenges: string[];
  security: string;
  performance: string;
  lessons: string;
  outcome: string;
  tech: string[];
  github?: string;
  live?: string;
  confidential?: boolean;
  featured: boolean;
};

export const projectFilters = [
  "All",
  "Full Stack",
  "Backend",
  "Frontend",
  "AI",
  "Microservices",
] as const;

export const projects: Project[] = [
  {
    slug: "tourist-booking-platform",
    title: "Tourist Booking Platform",
    tagline:
      "Production-grade booking API with payments, RBAC, and server-rendered pages.",
    categories: ["Backend", "Full Stack"],
    problem:
      "Tour operators needed a booking system handling search, secure payments, and role-separated administration — the kind of API that has to be correct about money and access control.",
    solution:
      "A NestJS REST API with a full booking lifecycle: filtering, sorting, field selection, pagination, and aggregation pipelines on MongoDB; Stripe checkout with webhook-driven booking confirmation; and server-side rendered pages with Pug.",
    role: "Sole developer — API design, data modeling, payments, security hardening, and deployment.",
    architecture:
      "Layered NestJS application (controllers → services → Mongoose models) with global exception filters, request validation pipes, and aggregation pipelines for statistics endpoints.",
    features: [
      "REST API with filtering, sorting, field selection, and pagination",
      "MongoDB aggregation for tour statistics and monthly plans",
      "JWT authentication with roles (user, guide, lead-guide, admin)",
      "Password reset flow with expiring tokens",
      "Stripe payments confirmed via webhooks",
      "Email notifications, file uploads, and image processing",
      "Rate limiting, security headers, sanitization against NoSQL injection and XSS",
      "Server-side rendered booking pages with Pug",
    ],
    decisions: [
      "Webhook-confirmed payments rather than trusting the client redirect — bookings are only created when Stripe confirms the charge.",
      "Factory-pattern generic handlers for CRUD endpoints to keep controllers thin.",
    ],
    challenges: [
      "Modeling geospatial queries for tours-within-distance search.",
      "Making the payment flow safe against duplicate webhook delivery.",
    ],
    security:
      "Helmet security headers, express-rate-limit, mongo-sanitize, HPP protection, and bcrypt password hashing.",
    performance:
      "Indexed queries, lean documents for read paths, and pagination defaults on every list endpoint.",
    lessons:
      "Payments taught me to design around eventual consistency — the webhook, not the redirect, is the source of truth.",
    outcome:
      "A complete, deployable booking backend demonstrating production API patterns end to end.",
    tech: ["NestJS", "MongoDB", "Mongoose", "Pug", "Stripe", "JWT", "Redis"],
    github: "https://github.com/aashikdev", // TODO: replace with exact repo URL
    featured: true,
  },
  {
    slug: "developer-ai-qa-platform",
    title: "Developer AI Q&A Platform",
    tagline:
      "Stack Overflow-style platform with AI-generated answers and a reputation system.",
    categories: ["Full Stack", "AI", "Frontend"],
    problem:
      "Developers wanted a Q&A space where good answers arrive fast — including an AI first-response while waiting for human answers.",
    solution:
      "A Next.js App Router application where developers post questions, vote, and build reputation, with OpenAI-generated draft answers, global search, and recommendation-based feeds.",
    role: "Sole developer — full-stack design and implementation.",
    architecture:
      "Next.js App Router with React Server Components and Server Actions; MongoDB via Mongoose; Clerk for authentication synced through webhooks; SSR for feeds, SSG/ISR for stable pages.",
    features: [
      "Ask, answer, vote, and save questions",
      "AI-generated answers via OpenAI",
      "Global and filtered search with sorting",
      "Reputation and badge system driven by community activity",
      "Clerk authentication with webhook-synced user records",
      "Syntax-highlighted code blocks with Prism.js",
      "Fully responsive, dark-mode-first UI with Tailwind CSS",
    ],
    decisions: [
      "Server Actions over API routes for mutations — fewer moving parts and typed end-to-end.",
      "ISR for question pages so popular questions stay fast without stale votes lingering.",
    ],
    challenges: [
      "Keeping Clerk's user store and MongoDB consistent through webhook events.",
      "Designing a reputation model that rewards quality without being gameable.",
    ],
    security:
      "Clerk-managed sessions, server-side authorization checks on every mutation, and webhook signature verification.",
    performance:
      "RSC-first rendering keeps client JavaScript minimal; images and fonts optimized through Next.js primitives.",
    lessons:
      "RSC + Server Actions collapse an entire API layer when the frontend and backend share a codebase.",
    outcome:
      "A complete community platform demonstrating modern Next.js architecture with AI features.",
    tech: ["Next.js", "TypeScript", "MongoDB", "Mongoose", "Clerk", "OpenAI", "Tailwind CSS", "Prism.js"],
    github: "https://github.com/aashikdev", // TODO: replace with exact repo URL
    featured: true,
  },
  {
    slug: "railway-ticketing-platform",
    title: "Railway Ticketing & Train Management",
    tagline:
      "Microservices behind a national railway's smart ticketing and reporting.",
    categories: ["Microservices", "Backend", "Full Stack"],
    problem:
      "A government railway needed modern ticketing, seat reservation, train management, and operational reporting — on infrastructure that cannot afford downtime during ticket sales.",
    solution:
      "A microservices platform built on NestJS and Node.js with RabbitMQ message-driven communication between services, Keycloak-secured access, and React/Next.js operational interfaces including drag-and-drop seat formation management.",
    role: "Software Engineer on the platform team — microservice development, RabbitMQ refactoring, reporting performance, and frontend components.",
    architecture:
      "Event-driven microservices communicating over RabbitMQ, fronted by API gateways, with Keycloak for identity and RBAC across services.",
    features: [
      "Smart ticketing and seat reservation",
      "Engine/carriage catalog with drag-and-drop seat formations",
      "Route planning and holiday calendars",
      "Interactive reporting dashboards: sales, revenue, class-wise analytics",
    ],
    decisions: [
      "Refactored message contracts between services to make retry and failure behavior explicit.",
    ],
    challenges: [
      "Refactoring live RabbitMQ consumers without dropping in-flight messages.",
      "Reporting queries across large operational datasets.",
    ],
    security:
      "Keycloak-managed identity, per-service RBAC, and gateway-level authorization.",
    performance:
      "Query optimization and caching for reporting; code splitting and virtualization on dashboard frontends.",
    lessons:
      "In event-driven systems, the hard part is not sending messages — it is deciding what happens when handling them fails.",
    outcome:
      "More reliable message-driven services and materially faster reporting for operations staff.",
    tech: ["NestJS", "Node.js", "RabbitMQ", "Keycloak", "Next.js", "React", "PostgreSQL"],
    confidential: true,
    featured: true,
  },
  {
    slug: "multi-tenant-saas-backend",
    title: "Multi-Tenant SaaS Backend",
    tagline:
      "Tenant-isolated backend architecture with granular RBAC and OTP onboarding.",
    categories: ["Backend", "Microservices"],
    problem:
      "A SaaS product needed each customer organization to operate in a fully isolated environment — own users, own permissions, own data — from one codebase.",
    solution:
      "A NestJS multi-tenant architecture using dynamic slug-based routing to resolve tenants, a resource–action RBAC model granular enough for enterprise policies, JWT authentication via Passport.js strategies, and multi-step OTP verification with Resend.",
    role: "Senior Software Engineer — architecture and implementation of the tenancy, auth, and permission layers.",
    architecture:
      "Tenant resolution middleware feeding request-scoped context; permission checks expressed as resource–action pairs evaluated per tenant; auth flows built on Passport.js strategies.",
    features: [
      "Dynamic slug-based tenant routing",
      "Isolated organization environments",
      "Granular resource–action RBAC",
      "JWT authentication with Passport.js",
      "Multi-step OTP verification via Resend",
    ],
    decisions: [
      "Request-scoped tenant context over per-tenant databases — isolation enforced in one place, operations kept simple.",
    ],
    challenges: [
      "Guaranteeing no query can cross a tenant boundary, even in future code written by other developers.",
    ],
    security:
      "Tenancy enforced at the data-access layer, short-lived JWTs, OTP-gated sensitive actions.",
    performance:
      "Tenant-aware caching and indexed tenant keys on all core collections.",
    lessons:
      "Multi-tenancy is a discipline, not a feature — the architecture must make the wrong query impossible to write.",
    outcome:
      "New organizations onboard with zero code changes; permissions map cleanly to enterprise policies.",
    tech: ["NestJS", "TypeScript", "PostgreSQL", "Passport.js", "JWT", "Resend"],
    confidential: true,
    featured: false,
  },
];
