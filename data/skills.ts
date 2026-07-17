export const skillTiers = {
  core: {
    label: "Core Expertise",
    description: "Technologies I use daily to design and ship production systems.",
    skills: [
      "Node.js", "NestJS", "Next.js", "React", "TypeScript", "JavaScript",
      "Go", "Microservices", "REST APIs", "GraphQL",
    ],
  },
  experienced: {
    label: "Experienced With",
    description: "Used extensively in production across multiple projects.",
    skills: [
      "MongoDB", "PostgreSQL", "MySQL", "Redis", "RabbitMQ", "Docker",
      "Kubernetes", "AWS", "Azure", "CI/CD", "Keycloak", "Stripe", "WebSockets",
      "Prisma", "TypeORM", "Mongoose",
    ],
  },
  additional: {
    label: "Additional Tools",
    description: "Working knowledge applied where projects need them.",
    skills: [
      "React Native", "Flutter", "FastAPI", "Django REST Framework", "Flask",
      "Gin", "Electron", "Tauri", "Jenkins", "Ansible", "GitHub Actions",
      "Framer Motion", "GSAP", "Tailwind CSS", "Figma",
    ],
  },
};

export const skillCategories = [
  {
    name: "Frontend Engineering",
    skills: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Material UI", "Framer Motion", "GSAP", "Sass/SCSS"],
  },
  {
    name: "Backend Engineering",
    skills: ["Node.js", "NestJS", "Express.js", "Go", "Gin", "FastAPI", "Django REST Framework"],
  },
  {
    name: "Architecture",
    skills: ["Microservices", "REST APIs", "GraphQL", "WebSockets", "Event-driven systems", "RabbitMQ", "Multi-tenancy", "RBAC", "Clean architecture"],
  },
  {
    name: "Databases",
    skills: ["PostgreSQL", "MongoDB", "MySQL", "Redis", "Prisma", "TypeORM", "Mongoose", "Drizzle ORM"],
  },
  {
    name: "Cloud & DevOps",
    skills: ["Docker", "Kubernetes", "AWS", "Azure", "Linux", "GitHub Actions", "Jenkins", "CI/CD", "Ansible"],
  },
  {
    name: "AI & Automation",
    skills: ["OpenAI", "Claude", "Gemini", "Cursor", "GitHub Copilot", "AI-powered features"],
  },
  {
    name: "Mobile",
    skills: ["React Native", "Flutter"],
  },
  {
    name: "Engineering Tools",
    skills: ["Git", "Postman", "Figma", "Stripe", "Keycloak", "Resend"],
  },
];

// Maps technologies to the real engineering work they enable.
export const skillsInPractice = [
  {
    skill: "NestJS",
    usage:
      "Designing modular APIs, authentication systems, background workflows, and microservice applications.",
  },
  {
    skill: "RabbitMQ",
    usage:
      "Building event-driven communication between services with retry, resilience, and asynchronous processing.",
  },
  {
    skill: "Next.js",
    usage:
      "Server-rendered products with App Router, Server Components, and ISR — fast pages with minimal client JavaScript.",
  },
  {
    skill: "Docker & Kubernetes",
    usage:
      "Creating consistent development and production environments, and deploying services that scale independently.",
  },
  {
    skill: "PostgreSQL & MongoDB",
    usage:
      "Modeling relational and document data, designing indexes, and keeping query performance predictable as data grows.",
  },
  {
    skill: "AI tools",
    usage:
      "Accelerating research, refactoring, documentation, testing, and debugging while maintaining human review.",
  },
];
