"use client";

import { Button, Card, CardBody, Link, Chip } from "@heroui/react";
import { ArrowTopRightOnSquareIcon } from "@heroicons/react/24/outline";
import React from "react";
import Image from "next/image";
import NavbarComponent from "../components/navbar";
import ChatButton from "../components/chat-button";

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
      <main className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Hero Section */}
        <Card className="bg-gradient-to-r from-primary-100 via-primary-50 to-secondary-100 dark:from-primary-900 dark:via-primary-800 dark:to-secondary-900 border-none">
          <CardBody className="text-center space-y-6 py-12">
            <div className="flex justify-center mb-6">
              <div className="relative">
                <div className="w-40 h-40 rounded-full overflow-hidden border-4 border-white shadow-2xl">
                  <Image
                    src="/images/lionelhu-min.jpg"
                    alt="Lionel Hu"
                    width={160}
                    height={160}
                    className="w-full h-full object-cover"
                    priority
                  />
                </div>
              </div>
            </div>
            <div className="space-y-3">
              <h1 className="text-5xl font-bold bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
                Lionel Hu
              </h1>
              <div className="flex flex-wrap justify-center gap-2">
                <Chip size="lg" variant="flat" color="primary">
                  Software Engineer
                </Chip>
                <Chip size="lg" variant="flat" color="secondary">
                  Full-stack Development
                </Chip>
              </div>
              <p className="text-lg text-default-600 max-w-2xl mx-auto">
                Building scalable web applications and exploring the intersection of AI and software
                engineering
              </p>
            </div>
          </CardBody>
        </Card>

        {/* About Text */}
        <Card>
          <CardBody className="p-8 space-y-6">
            <h2 className="text-2xl font-bold text-foreground mb-4">About me</h2>

            <div className="space-y-4 text-foreground">
              <p>
                Hi, I&apos;m <strong>Lionel Hu</strong>, a passionate software engineer specializing
                in full-stack and frontend development. I work at{" "}
                <strong>HeartByte (Storio)</strong> on a Gen-AI interactive story web app built with{" "}
                <strong>Next.js + TypeScript + Firebase/Firestore</strong>.
              </p>

              <div>
                <p className="font-semibold">Education</p>
                <ul className="list-disc list-inside ml-4 space-y-1">
                  <li>
                    <strong>MSE in Computer and Information Science</strong> – University of
                    Pennsylvania (GPA: 3.90/4.00)
                  </li>
                  <li>
                    <strong>BA in Computer Science</strong> – Rice University (GPA: 3.70/4.00)
                  </li>
                </ul>
              </div>

              <div>
                <p className="font-semibold">Work Experience</p>
                <ul className="list-disc list-inside ml-4 space-y-1">
                  <li>
                    <strong>HeartByte (Storio) | Software Engineer</strong> – Building a Gen-AI
                    interactive story web app with branching visual-novel engine, LLM story
                    pipelines, and production features end-to-end.
                  </li>
                  <li>
                    <strong>Recent Projects</strong> – Built end-to-end web search engine,
                    Gmail/Drive-style suite, and yelpscout business insights app.
                  </li>
                </ul>
              </div>

              <p>
                I love building scalable web applications and exploring the intersection of AI and
                software engineering. I&apos;m passionate about creating user experiences that are
                both functional and engaging.
              </p>
            </div>
          </CardBody>
        </Card>

        {/* Services Section */}
        <Card>
          <CardBody className="p-8">
            <h3 className="text-2xl font-bold text-foreground mb-6 text-center">
              What I&apos;m doing
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {servicesData.map((service, index) => (
                <Card
                  key={index}
                  className="group hover:scale-105 transition-transform duration-200 border-none shadow-md hover:shadow-lg"
                >
                  <CardBody className="p-6 space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-gradient-to-br from-primary-400 to-secondary-400 rounded-lg flex items-center justify-center">
                        <span className="text-white text-xl">
                          {index === 0 ? "⚡" : index === 1 ? "🛠️" : index === 2 ? "📊" : "🤖"}
                        </span>
                      </div>
                      <h4 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
                        {service.title}
                      </h4>
                    </div>
                    <p className="text-default-600 text-sm leading-relaxed">
                      {service.description}
                    </p>
                  </CardBody>
                </Card>
              ))}
            </div>
          </CardBody>
        </Card>

        {/* Skills Section */}
        <Card>
          <CardBody className="p-8 space-y-6">
            <h3 className="text-2xl font-bold text-foreground mb-6">Skills</h3>

            {Object.entries(skillsData).map(([category, skills]) => (
              <div key={category} className="space-y-3">
                <h4 className="text-lg font-semibold text-foreground">{category}</h4>
                <div className="flex flex-wrap gap-2">
                  {skills.map((skill) => (
                    <img key={skill.name} src={skill.badge} alt={skill.name} className="h-8" />
                  ))}
                </div>
              </div>
            ))}
          </CardBody>
        </Card>

        {/* Project Highlights */}
        <Card>
          <CardBody className="p-8">
            <h3 className="text-2xl font-bold text-foreground mb-6 text-center">
              Project Highlights
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {projectHighlights.map((project, index) => (
                <Card
                  key={index}
                  className="group hover:scale-102 transition-all duration-200 border-none bg-gradient-to-br from-default-50 to-default-100 dark:from-default-900 dark:to-default-800"
                >
                  <CardBody className="p-4">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                        <span className="text-white text-sm font-bold">{index + 1}</span>
                      </div>
                      <p className="text-foreground text-sm leading-relaxed">{project}</p>
                    </div>
                  </CardBody>
                </Card>
              ))}
            </div>

            <div className="text-center pt-6">
              <Button
                as={Link}
                href="/portfolio"
                color="primary"
                variant="ghost"
                size="lg"
                endContent={<ArrowTopRightOnSquareIcon className="h-4 w-4" />}
              >
                View Full Portfolio
              </Button>
            </div>
          </CardBody>
        </Card>

        {/* Personal Interests */}
        <Card className="bg-gradient-to-br from-secondary-50 to-primary-50 dark:from-secondary-900 dark:to-primary-900 border-none">
          <CardBody className="p-8">
            <h3 className="text-2xl font-bold text-foreground mb-6 text-center">Outside of Tech</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { icon: "💪", label: "Fitness", desc: "Gym & Wellness" },
                { icon: "📷", label: "Photography", desc: "Capturing moments" },
                { icon: "⛰️", label: "Outdoors", desc: "Travel & Adventure" },
                { icon: "📖", label: "Reading", desc: "Continuous learning" },
              ].map((interest, index) => (
                <div
                  key={index}
                  className="text-center space-y-2 group hover:scale-105 transition-transform duration-200"
                >
                  <div className="text-4xl mb-2 group-hover:scale-110 transition-transform duration-200">
                    {interest.icon}
                  </div>
                  <div className="space-y-1">
                    <div className="font-semibold text-foreground">{interest.label}</div>
                    <div className="text-sm text-default-600">{interest.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </CardBody>
        </Card>

        <div className="pt-2 text-center text-sm text-default-500">Built by Lionel Hu</div>
      </main>
    </div>
  );
}
