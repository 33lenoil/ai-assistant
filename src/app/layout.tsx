import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Providers } from "../components/providers";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Generate metadata for the home page
export const metadata = {
  title: "Lionel Hu - Software Engineer & Full-Stack Developer",
  description:
    "Software Engineer specializing in full-stack development, Gen-AI integration, and data engineering. Currently at HeartByte building interactive story applications with React, Next.js, and Firebase.",
  keywords: [
    "Software Engineer",
    "Full-Stack Developer",
    "React",
    "Next.js",
    "TypeScript",
    "Firebase",
    "Gen-AI",
    "Data Engineering",
    "Web Development",
  ],
  openGraph: {
    title: "Lionel Hu - Software Engineer & Full-Stack Developer",
    description:
      "Software Engineer specializing in full-stack development, Gen-AI integration, and data engineering.",
    type: "website",
    locale: "en_US",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning
      >
        <Providers>{children}</Providers>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
