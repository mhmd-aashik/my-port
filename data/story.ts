// My Story content. Bracketed [Add ...] items are intentional placeholders
// for personal details only Aashik can fill in — do not invent them.

export type StoryChapter = {
  number: string;
  title: string;
  paragraphs: string[];
};

export const storyChapters: StoryChapter[] = [
  {
    number: "01",
    title: "Where It Started",
    paragraphs: [
      "I grew up in Sri Lanka, curious about how things worked long before I knew what software was. [Add the first memory that made you interested in technology.]",
      "[Add the first computer or device you used, and what you remember about it.]",
    ],
  },
  {
    number: "02",
    title: "Discovering Technology",
    paragraphs: [
      "At some point curiosity about machines became curiosity about what makes them do things — websites, programs, the logic underneath. [Add the moment you decided to study software development.]",
      "[Add your first programming project and what building it felt like.]",
    ],
  },
  {
    number: "03",
    title: "Learning the Foundations",
    paragraphs: [
      "I studied deliberately and in layers: an HND in Software Development at Bucks New University through IDM Nations Campus in 2019, a Diploma in ICT at Winsys City Campus, and later a BSc (Hons) in Computing Science in Software Engineering from Kingston University through ESOFT.",
      "The formal education mattered, but most of what I use daily came from building — small projects, broken deployments, and documentation read late at night.",
    ],
  },
  {
    number: "04",
    title: "My First Opportunity",
    paragraphs: [
      "In April 2019, InventuriX Technologies took me on as a software engineering intern. I wrote React components and Node.js features for applications with real users, and learned that production code is a different discipline from tutorial code.",
      "Six months later I was promoted to Associate Software Engineer.",
    ],
  },
  {
    number: "05",
    title: "Growing as an Engineer",
    paragraphs: [
      "As an associate and then a full engineer at InventuriX, I built dashboards and secure APIs for UK-based clients, integrated Stripe subscriptions, and learned performance work the honest way — by making slow things fast and measuring the difference.",
      "By the end of four and a half years there, I was leading full-stack delivery for international clients and mentoring the juniors who sat where I had started.",
    ],
  },
  {
    number: "06",
    title: "Working on Real Systems",
    paragraphs: [
      "At Pelican Cube I joined the team behind a national railway's ticketing and train-management platform — NestJS microservices, RabbitMQ messaging, Keycloak identity, and reporting that operations staff depend on daily.",
      "Systems at that scale teach humility: every refactor happens while trains run and tickets sell.",
    ],
  },
  {
    number: "07",
    title: "Becoming a Senior Engineer",
    paragraphs: [
      "At Veuston International I moved into designing architecture rather than only implementing it — multi-tenant systems, granular access control, and the security and scalability decisions that shape everything built on top of them.",
      "[Add an important career setback and what it taught you.] [Add the proudest moment in your career.]",
    ],
  },
  {
    number: "08",
    title: "The Role of AI",
    paragraphs: [
      "Tools like Claude, Cursor, ChatGPT, and Copilot changed how I work — not by writing my software, but by compressing the distance between a question and an answer. Research, refactoring, documentation, and test coverage all move faster.",
      "The judgment — what to build, what to trust, what to ship — stays human. That balance is, to me, what AI-assisted engineering means.",
    ],
  },
  {
    number: "09",
    title: "Looking Ahead",
    paragraphs: [
      "I'm now based in Dubai, focused on software architecture, AI engineering, and building products that hold up under real load and real users.",
      "What draws me forward: leading engineering work on ambitious products, designing systems more than screens, and staying close to the craft while helping teams grow.",
    ],
  },
  {
    number: "10",
    title: "Lessons From the Journey",
    paragraphs: [
      "Curiosity creates opportunities. Consistency matters more than perfect beginnings. Real engineering requires continuous learning. Good software is built by understanding people and problems. Every project teaches something.",
    ],
  },
];

export const storyTimeline = [
  { year: "2019", label: "HND in Software Development; internship at InventuriX" },
  { year: "2019", label: "Promoted to Associate Software Engineer" },
  { year: "2021", label: "Software Engineer — leading full-stack delivery for international clients" },
  { year: "2023", label: "Completed Diploma in ICT, Winsys City Campus" },
  { year: "2024", label: "Joined Pelican Cube — national railway platform, microservices at scale" },
  { year: "2025", label: "BSc (Hons) Software Engineering, Kingston University" },
  { year: "2026", label: "Senior Software Engineer at Veuston International; based in Dubai" },
];

export const storyPreview = {
  heading: "From curiosity to building production software.",
  text: "My journey into technology began with curiosity — wanting to understand how computers, websites, and digital products worked. That curiosity gradually became a career built around solving real problems, learning continuously, and creating software used by people and organizations.",
};
