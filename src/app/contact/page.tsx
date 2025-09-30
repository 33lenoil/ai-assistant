import { MapPinIcon, EnvelopeIcon } from "@heroicons/react/24/outline";
import { FaGithub, FaLinkedinIn } from "react-icons/fa";
import NavbarComponent from "@/components/navbar";
import ChatButton from "@/components/chat-button";
import ContactClient from "./client";

export default function ContactPage() {
  const contactInfo = [
    {
      icon: <EnvelopeIcon className="h-5 w-5" />,
      label: "Email",
      value: "lionelhu33@gmail.com",
      href: "mailto:lionelhu33@gmail.com",
      color: "primary" as const,
    },
    {
      icon: <MapPinIcon className="h-5 w-5" />,
      label: "Location",
      value: "Burlingame, California",
      href: null,
      color: "secondary" as const,
    },
    {
      icon: <FaGithub className="h-5 w-5" />,
      label: "GitHub",
      value: "github.com/33lenoil",
      href: "https://github.com/33lenoil",
      color: "success" as const,
    },
    {
      icon: <FaLinkedinIn className="h-5 w-5" />,
      label: "LinkedIn",
      value: "linkedin.com/in/lionel-hu",
      href: "https://www.linkedin.com/in/lionel-hu/",
      color: "warning" as const,
    },
  ];

  return (
    <div className="min-h-screen bg-background relative">
      {/* Floating Chat Button */}
      <ChatButton />

      {/* Navbar */}
      <NavbarComponent currentPage="contact" />

      {/* Main Content */}
      <main className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-foreground">Get In Touch</h1>
          <p className="text-lg text-default-600 max-w-2xl mx-auto">
            Let&apos;s discuss opportunities, collaborations, or just say hello! I&apos;m always
            excited to connect with fellow developers and potential collaborators.
          </p>
        </div>

        <ContactClient contactInfo={contactInfo} />

        <div className="pt-2 text-center text-sm text-default-500">Built by Lionel Hu</div>
      </main>
    </div>
  );
}

// Generate metadata for the contact page
export const metadata = {
  title: "Contact - Lionel Hu",
  description:
    "Get in touch with Lionel Hu, Software Engineer specializing in full-stack development and AI integration. Available for collaborations, opportunities, and technical discussions.",
  keywords: [
    "Contact",
    "Software Engineer",
    "Collaboration",
    "Full-Stack Developer",
    "Lionel Hu",
    "Burlingame California",
  ],
  openGraph: {
    title: "Contact - Lionel Hu",
    description:
      "Get in touch with Lionel Hu for collaborations, opportunities, and technical discussions.",
    type: "website",
    locale: "en_US",
  },
};
