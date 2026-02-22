export const projects = [
  {
    title: "AI-Powered Document Assistant",
    description:
      "RAG-based application for intelligent document Q&A. Uses embeddings, vector search, and LLMs to answer questions from uploaded documents with source citations.",
    tech: ["Next.js", "OpenAI", "LangChain", "Pinecone", "TypeScript"],
    link: "#",
    details: {
      features: [
        "RAG pipeline with chunking and embeddings",
        "Streaming responses with source attribution",
        "Multi-document support and semantic search",
      ],
      impact: "Enables intelligent document analysis for enterprise workflows.",
    },
    category: "AI/ML",
  },
  {
    title: "Smart Ticketing & Seat Reservation System",
  description:
   "High-performance railway ticketing and train-management platform for the Government Railway. Features engine/carriage catalog, drag-and-drop seat formations, route planning, and holiday calendar.",
  tech: [
   "React 18",
   "TypeScript",
   "Tailwind CSS",
   "Redux Toolkit",
   "Chart.js",
  ],
  link: "#", // Placeholder
  details: {
   features: [
    "Train management: engine/carriage catalog, drag-and-drop seat formations",
    "Reporting: 5+ interactive dashboards (sales, revenue, class-wise, etc.)",
    "Performance optimizations: code splitting, lazy loading, virtualization",
   ],
   impact: "Enabled real-time railway analytics and improved scheduling.",
  },
  category: "Enterprise",
 },
 {
  title: "Tourist Booking App Backend",
  description:
   "Scalable RESTful API for a tourist booking platform with filtering, sorting, pagination, and secure authentication.",
  tech: ["NestJS", "MongoDB", "Pug", "Stripe", "Redis"],
  link: "#", // Placeholder
  details: {
   features: [
    "Authentication/authorization, password reset, security best practices",
    "Payments with Stripe, email notifications, file uploads",
    "Server-side rendered pages with Pug",
   ],
  },
  category: "Backend",
 },
];
