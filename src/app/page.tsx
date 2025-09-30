import React from "react";
import NavbarComponent from "../components/navbar";
import ChatButton from "../components/chat-button";
import Client from "./client";

const servicesData = [
  {
    title: "Full-Stack Development",
    description:
      "Building end-to-end web applications with React, Next.js, TypeScript, and modern frontend technologies.",
  },
  {
    title: "Backend Development",
    description:
      "Developing robust backend systems with Java, Node.js, Express, and database technologies like MySQL and MongoDB.",
  },
  {
    title: "Data Engineering",
    description:
      "Working with data processing using Python, Pandas, SQL, and building data-driven applications.",
  },
  {
    title: "Gen-AI Integration",
    description:
      "Implementing LLM story pipelines and AI-powered features for interactive applications.",
  },
];

const skillsData = {
  Languages: [
    {
      name: "TypeScript",
      badge:
        "https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white&style=for-the-badge",
    },
    {
      name: "JavaScript",
      badge:
        "https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black&style=for-the-badge",
    },
    {
      name: "Python",
      badge:
        "https://img.shields.io/badge/Python-3776AB?logo=python&logoColor=white&style=for-the-badge",
    },
    {
      name: "Java",
      badge:
        "https://img.shields.io/badge/Java-007396?logo=java&logoColor=white&style=for-the-badge",
    },
    {
      name: "C",
      badge: "https://img.shields.io/badge/C-00599C?logo=c&logoColor=white&style=for-the-badge",
    },
    {
      name: "C++",
      badge:
        "https://img.shields.io/badge/C++-00599C?logo=cplusplus&logoColor=white&style=for-the-badge",
    },
    {
      name: "HTML5",
      badge:
        "https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white&style=for-the-badge",
    },
    {
      name: "CSS3",
      badge:
        "https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white&style=for-the-badge",
    },
  ],
  "Backend & Data Engineering": [
    {
      name: "Node.js",
      badge:
        "https://img.shields.io/badge/Node.js-339933?logo=nodedotjs&logoColor=white&style=for-the-badge",
    },
    {
      name: "Express",
      badge:
        "https://img.shields.io/badge/Express-000000?logo=express&logoColor=white&style=for-the-badge",
    },
    {
      name: "Firebase",
      badge:
        "https://img.shields.io/badge/Firebase-FFCA28?logo=firebase&logoColor=black&style=for-the-badge",
    },
    {
      name: "Firestore",
      badge:
        "https://img.shields.io/badge/Firestore-FFCA28?logo=firebase&logoColor=black&style=for-the-badge",
    },
    {
      name: "Pandas",
      badge:
        "https://img.shields.io/badge/Pandas-150458?logo=pandas&logoColor=white&style=for-the-badge",
    },
    {
      name: "PyTorch",
      badge:
        "https://img.shields.io/badge/PyTorch-EE4C2C?logo=pytorch&logoColor=white&style=for-the-badge",
    },
  ],
  Frontend: [
    {
      name: "React",
      badge:
        "https://img.shields.io/badge/React-61DAFB?logo=react&logoColor=black&style=for-the-badge",
    },
    {
      name: "Next.js",
      badge:
        "https://img.shields.io/badge/Next.js-000000?logo=nextdotjs&logoColor=white&style=for-the-badge",
    },
    {
      name: "Vercel",
      badge:
        "https://img.shields.io/badge/Vercel-000000?logo=vercel&logoColor=white&style=for-the-badge",
    },
    {
      name: "Tailwind CSS",
      badge:
        "https://img.shields.io/badge/Tailwind_CSS-06B6D4?logo=tailwindcss&logoColor=white&style=for-the-badge",
    },
    {
      name: "Jest",
      badge:
        "https://img.shields.io/badge/Jest-C21325?logo=jest&logoColor=white&style=for-the-badge",
    },
    {
      name: "Cypress",
      badge:
        "https://img.shields.io/badge/Cypress-17202C?logo=cypress&logoColor=white&style=for-the-badge",
    },
  ],
  Databases: [
    {
      name: "MySQL",
      badge:
        "https://img.shields.io/badge/MySQL-4479A1?logo=mysql&logoColor=white&style=for-the-badge",
    },
    {
      name: "MongoDB",
      badge:
        "https://img.shields.io/badge/MongoDB-47A248?logo=mongodb&logoColor=white&style=for-the-badge",
    },
  ],
  "Cloud & DevOps": [
    {
      name: "AWS",
      badge:
        "https://img.shields.io/badge/AWS-232F3E?logo=amazonaws&logoColor=white&style=for-the-badge",
    },
    {
      name: "Git",
      badge: "https://img.shields.io/badge/Git-F05032?logo=git&logoColor=white&style=for-the-badge",
    },
    {
      name: "GitHub",
      badge:
        "https://img.shields.io/badge/GitHub-181717?logo=github&logoColor=white&style=for-the-badge",
    },
    {
      name: "LaTeX",
      badge:
        "https://img.shields.io/badge/LaTeX-008080?logo=latex&logoColor=white&style=for-the-badge",
    },
  ],
};

const projectHighlights = [
  "DocSearch — End-to-end web search engine (crawler → indexing → TF-IDF + PageRank → ranking UI)",
  "Google Suite Copy — Gmail-style webmail + Drive-style cloud storage (not affiliated with Google)",
  "yelpscout — Yelp-dataset local business search & insights with Top-100 ranking and recommendations",
  "UFOgram — Social app MVP with real-time feed, profiles, and infinite scroll",
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background relative">
      {/* Floating Chat Button */}
      <ChatButton />

      {/* Navbar */}
      <NavbarComponent currentPage="about" />

      {/* Main Content */}
      <Client
        servicesData={servicesData}
        skillsData={skillsData}
        projectHighlights={projectHighlights}
      />
    </div>
  );
}
