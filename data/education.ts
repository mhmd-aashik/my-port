export type Education = {
  qualification: string;
  institution: string;
  period: string;
  location: string;
  areas: string[];
};

export const education: Education[] = [
  {
    qualification: "BSc (Hons) Computing Science in Software Engineering",
    institution: "Kingston University London / ESOFT",
    period: "2024 – 2025",
    location: "Sri Lanka (Kingston University award)",
    areas: [
      "Software engineering and system design",
      "Scalable web application architecture",
      "Software quality and engineering practice",
    ],
  },
  {
    qualification: "Diploma in Information and Communication Technology",
    institution: "Winsys City Campus",
    period: "2020 – 2023",
    location: "Sri Lanka",
    areas: [
      "IT infrastructure and networking",
      "Operating systems",
      "Foundations of computing",
    ],
  },
  {
    qualification: "HND in Software Development",
    institution: "Bucks New University / IDM Nations Campus",
    period: "2019",
    location: "Sri Lanka",
    areas: [
      "Full-stack web development",
      "Applied software engineering",
      "Databases and application design",
    ],
  },
];

export const certifications = [
  {
    title: "Frontend Developer Career Path",
    issuer: "Scrimba",
    highlight: "Real-world React, modern JavaScript, and frontend engineering.",
  },
  {
    title: "Ultimate Next.js 14",
    issuer: "jsMastery Pro",
    highlight:
      "Full-stack applications with App Router, advanced patterns, and production practices.",
  },
  {
    title: "Cybersecurity / Ethical Hacking Certifications",
    issuer: "Various platforms",
    highlight:
      "Vulnerability assessment, secure coding, penetration testing fundamentals.",
  },
];
