import React from "react";
import NavbarComponent from "@/components/navbar";
import ResumeClient from "./client";

const skillsData = {
  "Programming & Software Design":
    "Python, Java, C, C++, SQL, Object-Oriented Programming, RESTful API",
  "Web Development":
    "HTML, JavaScript/TypeScript, CSS, React, Node.js, Express.js, Next.js, Vercel, Tailwind, HeroUI, Figma",
  "Data & Databases": "Pandas, MongoDB, Firestore, MySQL, Oracle, Neo4j, AWS",
  "Machine Learning & AI": "ChatGPT, LangChain, PyTorch, Groq, Prompt Engineering, MCP",
  Tools: "GitHub, LaTeX, Firebase, Azure DevOps Server, Jest, JUnit, Cypress",
};

export default function ResumePage() {
  return (
    <div className="min-h-screen bg-background relative">
      {/* Navbar */}
      <NavbarComponent currentPage="resume" />

      {/* Client-side resume content */}
      <ResumeClient skillsData={skillsData} />
    </div>
  );
}

// Generate metadata for the resume page
export const metadata = {
  title: "Software Engineer Resume - Lionel Hu",
  description:
    "Software Engineer with expertise in full-stack development, data engineering, and AI integration. MS Computer Science from UPenn, BS Computer Science from Rice University. Currently at HeartByte building Gen-AI story applications.",
  keywords: [
    "Software Engineer Resume",
    "Full-Stack Developer",
    "React",
    "Next.js",
    "TypeScript",
    "Java",
    "Python",
    "HeartByte",
    "University of Pennsylvania",
    "Rice University",
    "Lionel Hu",
  ],
  openGraph: {
    title: "Software Engineer Resume - Lionel Hu",
    description:
      "Professional resume showcasing experience in full-stack development, data engineering, and AI integration.",
    type: "website",
    locale: "en_US",
  },
};
