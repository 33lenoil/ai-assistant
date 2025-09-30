import React from "react";
import NavbarComponent from "@/components/navbar";
import PortfolioClient from "./client";

interface Project {
  id: string;
  title: string;
  category: string;
  date: string;
  description: string;
  longDescription: string;
  technologies: string[];
  link: string;
  icon: string;
  gradient: string;
  features: string[];
}

const projectsData: Project[] = [
  {
    id: "docsearch",
    title: "DocSearch",
    category: "Data Engineering",
    date: "December 2023",
    description:
      "End-to-end web search engine with crawler, indexing, TF-IDF + PageRank algorithms, and ranking UI.",
    longDescription:
      "Built a comprehensive search engine from scratch including web crawling, distributed key-value storage, indexing with TF-IDF and PageRank algorithms, and a responsive web interface. Implemented efficient crawl frontier policies and optimized query performance.",
    technologies: ["Java", "Distributed Systems", "TF-IDF", "PageRank", "Web Crawling", "EC2"],
    link: "https://github.com/33lenoil/DocSearch",
    icon: "🔍",
    gradient: "from-blue-500 to-purple-600",
    features: [
      "Distributed key-value store with concurrent processing",
      "Crawled 400K+ pages with intelligent frontier policies",
      "TF-IDF and PageRank ranking algorithms",
      "Responsive web UI with real-time search",
    ],
  },
  {
    id: "googlesuite",
    title: "Google Suite Copy",
    category: "Web Applications",
    date: "May 2024",
    description:
      "Gmail-style webmail + Drive-style cloud storage application (not affiliated with Google).",
    longDescription:
      "Full-stack web application replicating core Google Workspace functionality including email management, file storage, and collaborative features. Built with modern web technologies for optimal performance and user experience.",
    technologies: ["React", "Node.js", "Express", "MongoDB", "Real-time Sync", "File Upload"],
    link: "https://github.com/33lenoil/gmail-google-cloud-clone",
    icon: "📧",
    gradient: "from-green-500 to-blue-500",
    features: [
      "Gmail-style email interface with threading",
      "Drive-style file management with drag & drop",
      "Real-time collaboration features",
      "Advanced search and filtering capabilities",
    ],
  },
  {
    id: "yelpscout",
    title: "YelpScout",
    category: "Data Engineering",
    date: "May 2024",
    description:
      "Yelp-dataset local business search & insights with Top-100 ranking, weekday popularity, and recommendations.",
    longDescription:
      "Advanced business analytics platform processing Yelp's massive dataset to provide insights on local businesses. Features sophisticated recommendation algorithms and real-time analytics dashboard.",
    technologies: [
      "React",
      "Node.js",
      "MySQL",
      "Data Analytics",
      "RAKE-NLTK",
      "Performance Optimization",
    ],
    link: "https://github.com/33lenoil/YelpScouts",
    icon: "🏪",
    gradient: "from-orange-500 to-red-500",
    features: [
      "Analytics for 150K+ businesses",
      "Weekday popularity tracking",
      "RAKE-NLTK keyword extraction",
      "Optimized queries (minutes to 1-3s)",
    ],
  },
  {
    id: "ufogram",
    title: "UFOgram",
    category: "Web Applications",
    date: "December 2023",
    description: "Social app MVP with real-time feed, profiles, and infinite scroll functionality.",
    longDescription:
      "Modern social media platform with real-time features, infinite scrolling, and engaging user profiles. Built as an MVP to demonstrate full-stack social application development.",
    technologies: [
      "React",
      "Real-time Updates",
      "Infinite Scroll",
      "Social Features",
      "MVP Architecture",
    ],
    link: "https://ufogram-frontend.fly.dev",
    icon: "🛸",
    gradient: "from-purple-500 to-pink-500",
    features: [
      "Real-time social feed updates",
      "Infinite scroll with performance optimization",
      "User profiles and social interactions",
      "Deployed MVP with live demo",
    ],
  },
];

const categories = ["All", "Data Engineering", "Web Applications"];

export default function PortfolioPage() {
  return (
    <div className="min-h-screen bg-background relative">
      {/* Navbar */}
      <NavbarComponent currentPage="portfolio" />

      {/* Client-side portfolio content */}
      <PortfolioClient projectsData={projectsData} categories={categories} />
    </div>
  );
}

// Generate metadata for the portfolio page
export const metadata = {
  title: "Software Development Portfolio - Lionel Hu",
  description:
    "Explore Lionel Hu's portfolio of full-stack development projects, data engineering solutions, and innovative web applications. Features DocSearch engine, YelpScout analytics, Google Suite clone, and UFOgram social platform.",
  keywords: [
    "Software Portfolio",
    "Full-Stack Development",
    "Data Engineering",
    "Web Applications",
    "DocSearch",
    "YelpScout",
    "React",
    "Node.js",
    "Java",
    "MySQL",
    "Lionel Hu",
  ],
  openGraph: {
    title: "Software Development Portfolio - Lionel Hu",
    description:
      "Full-stack development projects including search engines, analytics platforms, and web applications.",
    type: "website",
    locale: "en_US",
  },
};
