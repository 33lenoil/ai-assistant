"use client";

import { Button, Card, CardBody, Link, Divider } from "@heroui/react";
import {
  AcademicCapIcon,
  BriefcaseIcon,
  WrenchScrewdriverIcon,
  DocumentArrowDownIcon,
} from "@heroicons/react/24/outline";
import { useEffect } from "react";
import ChatButton from "@/components/chat-button";

const TimelineItem = ({
  title,
  company,
  degree,
  date,
  description,
  isLast = false,
}: {
  title: string;
  company?: string | React.ReactNode;
  degree?: string;
  date: string;
  description: string[];
  isLast?: boolean;
}) => {
  return (
    <div className="relative pl-8 pb-8 last:pb-0">
      {/* Timeline dot */}
      <div className="absolute left-0 top-2 w-3 h-3 bg-primary rounded-full"></div>
      {/* Timeline line - hidden for last item */}
      {!isLast && <div className="absolute left-1.5 top-5 w-0.5 h-full bg-default-200"></div>}

      <div className="space-y-2">
        <h4 className="text-lg font-semibold text-foreground">{title}</h4>
        {degree && <p className="text-default-600 font-medium">{degree}</p>}
        {company && <p className="text-default-600 font-medium">{company}</p>}
        <p className="text-sm text-primary font-medium">{date}</p>
        <ul className="space-y-1 text-default-700">
          {description.map((item, index) => (
            <li key={index} className="text-sm">
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

interface ResumeClientProps {
  skillsData: Record<string, string>;
}

export default function ResumeClient({ skillsData }: ResumeClientProps) {
  useEffect(() => {
    // Component mounted
  }, []);

  return (
    <>
      {/* Floating Chat Button */}
      <ChatButton />

      {/* Main Content */}
      <main className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-foreground">Resume</h1>
        </div>

        {/* Contact Information */}
        <Card>
          <CardBody className="p-8">
            <div className="text-center space-y-4">
              <h2 className="text-2xl font-bold text-foreground">Lionel Hu</h2>
              <div className="flex flex-wrap justify-center items-center gap-2 text-default-600">
                <span>Burlingame, CA</span>
                <span>|</span>
                <Link href="mailto:lionelhu33@gmail.com" className="text-primary hover:underline">
                  lionelhu33@gmail.com
                </Link>
                <span>|</span>
                <Link
                  href="https://github.com/33lenoil"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  GitHub
                </Link>
                <span>|</span>
                <Link
                  href="https://www.linkedin.com/in/lionel-hu"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  LinkedIn
                </Link>
              </div>

              {/* Download Resume Button */}
              <div className="flex justify-center pt-2">
                <Button
                  as={Link}
                  href="/Lionel_Hu_Resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  color="primary"
                  variant="bordered"
                  startContent={<DocumentArrowDownIcon className="h-4 w-4" />}
                  className="font-medium"
                >
                  Download PDF Resume
                </Button>
              </div>
            </div>
          </CardBody>
        </Card>

        {/* Education Section */}
        <Card>
          <CardBody className="p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-primary/10 rounded-lg">
                <AcademicCapIcon className="h-6 w-6 text-primary" />
              </div>
              <h2 className="text-2xl font-bold text-foreground">Education</h2>
            </div>

            <div className="space-y-0">
              <TimelineItem
                title="University of Pennsylvania"
                degree="Master of Science in Engineering in Computer and Information Science"
                date="August 2023 — May 2025"
                description={["‣ GPA: 3.90/4.0", "‣ Philadelphia, PA"]}
              />
              <TimelineItem
                title="Rice University"
                degree="Bachelor of Arts in Computer Science"
                date="August 2019 — May 2023"
                description={["‣ Houston, TX"]}
                isLast={true}
              />
            </div>
          </CardBody>
        </Card>

        {/* Experience Section */}
        <Card>
          <CardBody className="p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-primary/10 rounded-lg">
                <BriefcaseIcon className="h-6 w-6 text-primary" />
              </div>
              <h2 className="text-2xl font-bold text-foreground">Experience</h2>
            </div>

            <div className="space-y-0">
              <TimelineItem
                title="Software Engineer"
                company="HeartByte Inc | YC Startup for Gen-AI Interactive Story"
                date="June 2025 — Present"
                description={[
                  "‣ Built a Gen-AI interactive story web app using React, Next.js, and Firebase serving 10K+ users monthly.",
                  "‣ Designed and implemented a production-grade branching visual-novel engine enabling choice-driven narratives, manual and auto save/restore flows, and clean authoring experience, boosted playability for 1k+ stories.",
                  "‣ Re-architected 10+ core pages end-to-end with UI revamp, client-side-to-server-side rendering migration, API/data fetching redesign, and database schema redesign, improved usability, efficiency, and core web vitals by 20%.",
                  "‣ Designed a numeric stats system personal to each user within each novel for branching logic that enables conditional branching and conditional novel endings, enabling authors to personalize their stories creatively.",
                  "‣ Shipped an LLM story-generation pipeline (Groq + prompt engineering) with few-shot examples and JSON schema validation/repair for hallucination prevention; integrated into a multi-step story authoring flow.",
                ]}
              />
              <TimelineItem
                title="Software Engineer Intern"
                company="HeartByte Inc | San Francisco CA (Remote)"
                date="May 2024 — Aug 2024; Jan 2025 — May 2025"
                description={[
                  "‣ Spearheaded comprehensive Search Engine Optimization (SEO) initiatives, including structured metadata, improved site performance, and keyword targeting, to enhance online visibility and increase organic traffic by 5X.",
                  "‣ Developed 10+ full-stack features including story recommendation using TypeScript, React.js, Firebase and Next.js, enhancing product functionality to improve user experience and boost product completeness.",
                  "‣ Streamlined and standardized website UI of 15+ pages by standardizing CSS and styling using Tailwind CSS and NextUI components, reducing design inconsistencies and accelerating the development process.",
                ]}
              />
              <TimelineItem
                title="Software Engineer"
                company={
                  <span>
                    <Link
                      href="https://github.com/33lenoil/YelpScouts"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline cursor-pointer"
                    >
                      YelpScout
                    </Link>
                    {" | University of Pennsylvania"}
                  </span>
                }
                date="Jan 2024 — May 2024"
                description={[
                  "‣ Engineered a local business search & insights web app using React, Node/Express, and MySQL with advanced search filters, single-business analytics pages, and personalized recommendations in a 4-person team.",
                  "‣ Designed and implemented the single-business analytics page for 150K+ businesses with weekday popularity, ratings, reservation flag, and customer review keyword extraction powered by RAKE-NLTK preprocessing.",
                  "‣ Optimized performance via indexes and cached/intermediate tables, reducing heavy queries from minutes to 1–3s.",
                ]}
              />
              <TimelineItem
                title="Software Engineer"
                company={
                  <span>
                    <Link
                      href="https://github.com/33lenoil/DocSearch"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline cursor-pointer"
                    >
                      DocSearch
                    </Link>
                    {" | University of Pennsylvania"}
                  </span>
                }
                date="Sep 2023 — Dec 2023"
                description={[
                  "‣ Built an end-to-end search engine (crawler, distributed KVS, indexer, ranking, web UI, EC2) in a 4-person team.",
                  "‣ Implemented a robust and efficient distributed key-value store in Java with concurrent processing and stream-put to store crawl/index/PageRank tables; crawled 400K+ pages and stored information in the KVS.",
                  "‣ Engineered the pipeline, including crawling, precomputed TF-IDF + PageRank, ranking, and web deployment.",
                  "‣ Implemented crawl frontier policies: allowlist-based token filtering with title-term expansion, depth/size guards and error filtering, and per-domain quotas to boost crawl efficiency and downstream relevance.",
                ]}
                isLast={true}
              />
            </div>
          </CardBody>
        </Card>

        {/* Skills Section */}
        <Card>
          <CardBody className="p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-primary/10 rounded-lg">
                <WrenchScrewdriverIcon className="h-6 w-6 text-primary" />
              </div>
              <h2 className="text-2xl font-bold text-foreground">Skills</h2>
            </div>

            <div className="space-y-6">
              {Object.entries(skillsData).map(([category, skills]) => (
                <div key={category} className="space-y-2">
                  <h4 className="text-lg font-semibold text-foreground">{category}</h4>
                  <p className="text-default-600">{skills}</p>
                  {category !== Object.keys(skillsData)[Object.keys(skillsData).length - 1] && (
                    <Divider className="mt-4" />
                  )}
                </div>
              ))}
            </div>
          </CardBody>
        </Card>

        <div className="pt-2 text-center text-sm text-default-500">Built by Lionel Hu</div>
      </main>
    </>
  );
}
