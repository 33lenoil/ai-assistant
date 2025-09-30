import React from "react";
import NavbarComponent from "../../components/navbar";
import PhotographyClient from "./client";

interface PhotoLocation {
  id: string;
  name: string;
  displayName: string;
  description: string;
  coverImage: string;
  photoCount: number;
  coordinates: { lat: number; lng: number };
  flag: string;
  category: "adventure" | "urban" | "nature" | "culture";
}

const photoLocations: PhotoLocation[] = [
  {
    id: "alaska",
    name: "alaska",
    displayName: "Alaska",
    description: "Wild frontiers and pristine wilderness under the midnight sun",
    coverImage: "/images/photography/alaska/DSCF6585.jpg",
    photoCount: 7,
    coordinates: { lat: 64.0685, lng: -152.2782 },
    flag: "🇺🇸",
    category: "adventure",
  },
  {
    id: "peru",
    name: "peru",
    displayName: "Peru",
    description: "Ancient Incan heritage meets breathtaking Andean landscapes",
    coverImage: "/images/photography/peru/DSCF6033.jpg",
    photoCount: 8,
    coordinates: { lat: -9.19, lng: -75.0152 },
    flag: "🇵🇪",
    category: "culture",
  },
  {
    id: "puerto_rico",
    name: "puerto_rico",
    displayName: "Puerto Rico",
    description: "Tropical paradise with vibrant culture and stunning coastlines",
    coverImage: "/images/photography/puerto_rico/DSCF0108.jpg",
    photoCount: 16,
    coordinates: { lat: 18.2208, lng: -66.5901 },
    flag: "🇵🇷",
    category: "nature",
  },
  {
    id: "utah",
    name: "utah",
    displayName: "Utah",
    description: "Dramatic red rock formations and otherworldly desert landscapes",
    coverImage: "/images/photography/utah/DSCF6875.jpg",
    photoCount: 10,
    coordinates: { lat: 39.321, lng: -111.0937 },
    flag: "🇺🇸",
    category: "nature",
  },
  {
    id: "canada",
    name: "canada",
    displayName: "Canada",
    description: "Majestic mountains and serene lakes in the great white north",
    coverImage: "/images/photography/canada/DSCF0010.jpg",
    photoCount: 5,
    coordinates: { lat: 56.1304, lng: -106.3468 },
    flag: "🇨🇦",
    category: "nature",
  },
  {
    id: "chicago",
    name: "chicago",
    displayName: "Chicago",
    description: "Architectural marvels and urban energy by Lake Michigan",
    coverImage: "/images/photography/chicago/DSCF6800.jpg",
    photoCount: 3,
    coordinates: { lat: 41.8781, lng: -87.6298 },
    flag: "🇺🇸",
    category: "urban",
  },
  {
    id: "guangzhou",
    name: "guangzhou",
    displayName: "广州 (Guangzhou)",
    description: "Modern metropolis blending tradition with innovation",
    coverImage: "/images/photography/guangzhou/DSCF0522.jpg",
    photoCount: 2,
    coordinates: { lat: 23.1291, lng: 113.2644 },
    flag: "🇨🇳",
    category: "urban",
  },
  {
    id: "qinggan",
    name: "qinggan",
    displayName: "青甘大环线 (Qinghai-Gansu Loop)",
    description: "Tranquil landscapes and timeless beauty",
    coverImage: "/images/photography/qinggan/DSCF0548.jpg",
    photoCount: 6,
    coordinates: { lat: 37.5665, lng: 100.7051 },
    flag: "🇨🇳",
    category: "nature",
  },
  {
    id: "smokey",
    name: "smokey",
    displayName: "Smoky Mountains",
    description: "Misty peaks and ancient forests in the Appalachian range",
    coverImage: "/images/photography/smokey/DSCF5909.jpg",
    photoCount: 5,
    coordinates: { lat: 35.6118, lng: -83.4895 },
    flag: "🇺🇸",
    category: "nature",
  },
  {
    id: "nj",
    name: "nj",
    displayName: "New Jersey",
    description: "Hidden gems and natural beauty in the Garden State",
    coverImage: "/images/photography/nj/DSCF5671.jpg",
    photoCount: 7,
    coordinates: { lat: 40.0583, lng: -74.4057 },
    flag: "🇺🇸",
    category: "nature",
  },
  {
    id: "nemours",
    name: "nemours",
    displayName: "Nemours",
    description: "Elegant gardens and historic architecture",
    coverImage: "/images/photography/nemours/DSCF0460.jpg",
    photoCount: 3,
    coordinates: { lat: 39.7184, lng: -75.5061 },
    flag: "🇺🇸",
    category: "culture",
  },
  {
    id: "balcony",
    name: "balcony",
    displayName: "Balcony Views",
    description: "Intimate perspectives and everyday moments",
    coverImage: "/images/photography/balcony/DSCF0050.jpg",
    photoCount: 4,
    coordinates: { lat: 37.5665, lng: -122.3212 },
    flag: "🏠",
    category: "urban",
  },
];

export default function PhotographyPage() {
  return (
    <div className="min-h-screen bg-background relative overflow-x-hidden">
      {/* Navbar */}
      <NavbarComponent currentPage="photography" />

      {/* Client-side interactive photography gallery */}
      <PhotographyClient photoLocations={photoLocations} />
    </div>
  );
}

// Generate metadata for the photography page
export const metadata = {
  title: "Travel Photography Portfolio - Lionel Hu",
  description:
    "Explore the world through photography. From the frozen wilderness of Alaska to the ancient peaks of Peru, discover diverse landscapes and cultures captured across the globe. View stunning photography collections from 12+ destinations including nature, urban, and cultural scenes.",
  keywords: [
    "Travel Photography",
    "Landscape Photography",
    "Nature Photography",
    "Urban Photography",
    "Alaska",
    "Peru",
    "Utah",
    "Canada",
    "Photography Portfolio",
    "Lionel Hu",
  ],
  openGraph: {
    title: "Travel Photography Portfolio - Lionel Hu",
    description:
      "Explore stunning photography from 12+ destinations across the globe. Nature, urban, and cultural photography collections.",
    type: "website",
    locale: "en_US",
  },
};
