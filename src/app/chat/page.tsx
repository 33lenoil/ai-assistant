import React from "react";
import NavbarComponent from "@/components/navbar";
import ChatClient from "./client";

export default function ChatPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Navbar */}
      <NavbarComponent currentPage="chat" />

      {/* Client-side chat interface */}
      <ChatClient />
    </div>
  );
}

// Generate metadata for the chat page
export const metadata = {
  title: "AI Assistant Chat - Lionel Hu",
  description:
    "Chat with Lionel Hu's personal AI assistant. Ask about his background, skills, experience, projects, and technical expertise in software engineering and full-stack development.",
  keywords: [
    "AI Assistant",
    "Chat",
    "Lionel Hu",
    "Software Engineer",
    "Technical Skills",
    "Experience",
    "Projects",
  ],
  openGraph: {
    title: "AI Assistant Chat - Lionel Hu",
    description:
      "Chat with Lionel Hu's personal AI assistant about his background, skills, and experience.",
    type: "website",
    locale: "en_US",
  },
};
