"use client";

import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Link,
  Chip,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Tooltip,
} from "@heroui/react";
import {
  CodeBracketIcon,
  ArrowTopRightOnSquareIcon,
  EyeIcon,
  CalendarIcon,
  TagIcon,
} from "@heroicons/react/24/outline";
import { useState, useEffect } from "react";
import NavbarComponent from "@/components/navbar";
import ChatButton from "@/components/chat-button";

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
    icon: "👽",
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
  const [mounted] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    // Component mounted
  }, []);

  const filteredProjects =
    selectedCategory === "All"
      ? projectsData
      : projectsData.filter((project) => project.category === selectedCategory);

  const openProjectModal = (project: Project) => {
    setSelectedProject(project);
    onOpen();
  };

  return (
    <div className="min-h-screen bg-background relative">
      {/* Floating Chat Button */}
      <ChatButton />

      {/* Navbar */}
      <NavbarComponent currentPage="portfolio" />

      {/* Main Content */}
      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-foreground">Portfolio</h1>
          <p className="text-lg text-default-600 max-w-2xl mx-auto">
            A collection of projects showcasing full-stack development, data engineering, and
            innovative web applications.
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="flex justify-center gap-2 md:gap-3">
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "solid" : "bordered"}
              color={selectedCategory === category ? "primary" : "default"}
              onPress={() => setSelectedCategory(category)}
              className="transition-all duration-200 flex-1 sm:flex-none min-w-0 text-xs sm:text-base px-3 sm:px-4 py-2 sm:py-3 h-8 sm:h-10"
            >
              <span className="truncate">{category}</span>
            </Button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {filteredProjects.map((project) => (
            <Card
              key={project.id}
              className="group hover:scale-105 transition-all duration-300 border-none shadow-lg hover:shadow-2xl"
            >
              <CardHeader className="pb-0">
                <div
                  className={`w-full h-48 rounded-lg bg-gradient-to-br ${project.gradient} flex items-center justify-center text-6xl mb-4 relative overflow-hidden cursor-pointer`}
                  onClick={() => openProjectModal(project)}
                >
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300"></div>
                  <span className="relative z-10 filter drop-shadow-lg">{project.icon}</span>
                  <div className="absolute top-4 right-4">
                    <Chip
                      size="sm"
                      variant="solid"
                      color="default"
                      className="bg-white/20 text-white"
                    >
                      {project.category}
                    </Chip>
                  </div>
                </div>
              </CardHeader>

              <CardBody className="pt-0 space-y-4">
                <div
                  className="space-y-2"
                  onClick={() => openProjectModal(project)}
                  style={{ cursor: "pointer" }}
                >
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                      {project.title}
                    </h3>
                    <div className="flex items-center gap-1 text-sm text-default-500">
                      <CalendarIcon className="h-4 w-4" />
                      {project.date}
                    </div>
                  </div>

                  <p className="text-default-600 text-sm line-clamp-2">{project.description}</p>
                </div>

                <div className="flex flex-wrap gap-1">
                  {project.technologies.slice(0, 3).map((tech) => (
                    <Chip key={tech} size="sm" variant="flat" color="primary">
                      {tech}
                    </Chip>
                  ))}
                  {project.technologies.length > 3 && (
                    <Chip size="sm" variant="flat" color="default">
                      +{project.technologies.length - 3}
                    </Chip>
                  )}
                </div>

                <div className="flex gap-2 pt-2">
                  <Tooltip content="View Details">
                    <Button
                      isIconOnly
                      variant="flat"
                      color="primary"
                      size="sm"
                      onPress={() => openProjectModal(project)}
                    >
                      <EyeIcon className="h-4 w-4" />
                    </Button>
                  </Tooltip>

                  <Tooltip content="View Code">
                    <Button
                      as={Link}
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      isIconOnly
                      variant="flat"
                      color="secondary"
                      size="sm"
                    >
                      <CodeBracketIcon className="h-4 w-4" />
                    </Button>
                  </Tooltip>
                </div>
              </CardBody>
            </Card>
          ))}
        </div>

        {/* Project Detail Modal */}
        <Modal
          isOpen={isOpen}
          onClose={onClose}
          size="3xl"
          scrollBehavior="inside"
          className="mx-4"
        >
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1">
                  <div className="flex items-center gap-3">
                    <span className="text-3xl">{selectedProject?.icon}</span>
                    <div>
                      <h2 className="text-2xl font-bold">{selectedProject?.title}</h2>
                      <div className="flex items-center gap-2 text-sm text-default-500">
                        <TagIcon className="h-4 w-4" />
                        {selectedProject?.category}
                        <span>•</span>
                        <CalendarIcon className="h-4 w-4" />
                        {selectedProject?.date}
                      </div>
                    </div>
                  </div>
                </ModalHeader>

                <ModalBody>
                  <div className="space-y-6">
                    <div
                      className={`w-full h-64 rounded-lg bg-gradient-to-br ${selectedProject?.gradient} flex items-center justify-center text-8xl`}
                    >
                      <span className="filter drop-shadow-2xl">{selectedProject?.icon}</span>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <h3 className="text-lg font-semibold mb-2">Description</h3>
                        <p className="text-default-600">{selectedProject?.longDescription}</p>
                      </div>

                      <div>
                        <h3 className="text-lg font-semibold mb-2">Key Features</h3>
                        <ul className="space-y-1">
                          {selectedProject?.features.map((feature, index) => (
                            <li key={index} className="text-default-600 text-sm">
                              • {feature}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <h3 className="text-lg font-semibold mb-2">Technologies</h3>
                        <div className="flex flex-wrap gap-2">
                          {selectedProject?.technologies.map((tech) => (
                            <Chip key={tech} variant="flat" color="primary">
                              {tech}
                            </Chip>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </ModalBody>

                <ModalFooter>
                  <Button color="danger" variant="light" onPress={onClose}>
                    Close
                  </Button>
                  <Button
                    as={Link}
                    href={selectedProject?.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    color="primary"
                    startContent={<ArrowTopRightOnSquareIcon className="h-4 w-4" />}
                  >
                    View Project
                  </Button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>

        <div className="pt-2 text-center text-sm text-default-500">Built by Lionel Hu</div>
      </main>
    </div>
  );
}
