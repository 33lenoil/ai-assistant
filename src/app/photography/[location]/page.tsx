import React from "react";
import { Link } from "@heroui/react";
import NavbarComponent from "../../../components/navbar";
import LocationClient from "./client";
import { locationData } from "../../../data/locations";
import ChatButton from "@/components/chat-button";

interface PhotographyLocationPageProps {
  params: Promise<{ location: string }>;
}

export default async function PhotographyLocationPage({ params }: PhotographyLocationPageProps) {
  const resolvedParams = await params;
  const location = locationData[resolvedParams.location];

  // If location doesn't exist, show 404
  if (!location) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">Location Not Found</h1>
          <Link href="/photography" className="text-primary hover:underline">
            ← Back to Photography
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background relative overflow-x-hidden">
      {/* Floating Chat Button */}
      <ChatButton />

      {/* Navbar */}
      <NavbarComponent currentPage="photography" />

      {/* Client-side interactive gallery */}
      <LocationClient location={location} />
    </div>
  );
}

// Generate static params for all available locations
export async function generateStaticParams() {
  return Object.keys(locationData).map((location) => ({
    location,
  }));
}

// Generate metadata for each location page
export async function generateMetadata({ params }: PhotographyLocationPageProps) {
  const resolvedParams = await params;
  const location = locationData[resolvedParams.location];

  if (!location) {
    return {
      title: "Location Not Found - Lionel Hu Photography",
    };
  }

  return {
    title: `${location.displayName} - Photography by Lionel Hu`,
    description: `${location.description} - ${location.photos.length} photos from ${location.displayName}`,
  };
}
