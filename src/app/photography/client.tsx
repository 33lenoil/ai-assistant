"use client";

import { Button, Card, CardBody, CardHeader, Link, Chip, Skeleton } from "@heroui/react";
import { MapPinIcon, PhotoIcon, GlobeAltIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import ChatButton from "../../components/chat-button";

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

interface PhotographyClientProps {
  photoLocations: PhotoLocation[];
}

const categories = [
  { name: "All", value: "all", icon: <GlobeAltIcon className="h-4 w-4" /> },
  { name: "Adventure", value: "adventure", icon: <MapPinIcon className="h-4 w-4" /> },
  { name: "Nature", value: "nature", icon: <PhotoIcon className="h-4 w-4" /> },
  { name: "Urban", value: "urban", icon: <PhotoIcon className="h-4 w-4" /> },
  { name: "Culture", value: "culture", icon: <PhotoIcon className="h-4 w-4" /> },
];

export default function PhotographyClient({ photoLocations }: PhotographyClientProps) {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [imagesLoaded, setImagesLoaded] = useState<Record<string, boolean>>({});
  const [heroRef, heroInView] = useInView({ threshold: 0.1, triggerOnce: true });
  const [gridRef, gridInView] = useInView({ threshold: 0.1, triggerOnce: true });

  const filteredLocations =
    selectedCategory === "all"
      ? photoLocations
      : photoLocations.filter((location) => location.category === selectedCategory);

  const handleImageLoad = (locationId: string) => {
    setImagesLoaded((prev) => ({ ...prev, [locationId]: true }));
  };

  return (
    <>
      {/* Floating Chat Button */}
      <ChatButton />

      {/* Main Content */}
      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 space-y-12 overflow-x-hidden">
        {/* Hero Section with Animated Geography */}
        <motion.div
          ref={heroRef}
          initial={{ opacity: 0, y: 50 }}
          animate={heroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
          className="text-center space-y-8"
        >
          <div className="space-y-4">
            <motion.h1
              initial={{ opacity: 0, scale: 0.9 }}
              animate={heroInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-4xl sm:text-4xl lg:text-6xl font-bold bg-gradient-to-r from-primary-600 via-secondary-600 to-success-600 bg-clip-text text-transparent px-4 py-2 leading-tight"
            >
              Photography
            </motion.h1>

            <motion.div
              initial={{ opacity: 0 }}
              animate={heroInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="relative"
            >
              <p className="text-2xl text-default-600 font-light mb-2">
                Traverse the vast tapestry of the world
              </p>
              {/* Animated globe effect */}
              <motion.div
                initial={{ scale: 0, rotate: 0 }}
                animate={heroInView ? { scale: 1, rotate: 360 } : { scale: 0, rotate: 0 }}
                transition={{ duration: 2, delay: 0.6, type: "spring" }}
                className="inline-block text-4xl ml-2"
              >
                🌍
              </motion.div>
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={heroInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="text-lg text-default-500 max-w-3xl mx-auto"
            >
              Through the lens, every corner of our planet tells a story. From the frozen wilderness
              of Alaska to the ancient peaks of Peru, each photograph captures a moment in time
              across the diverse landscapes and cultures that make our world extraordinary.
            </motion.p>
          </div>
        </motion.div>

        {/* Category Filters */}
        <div className="flex flex-wrap justify-center gap-3 px-2">
          {categories.map((category) => (
            <Button
              key={category.value}
              variant={selectedCategory === category.value ? "solid" : "bordered"}
              color={selectedCategory === category.value ? "primary" : "default"}
              onPress={() => setSelectedCategory(category.value)}
              startContent={category.icon}
              className="transition-all duration-200"
            >
              {category.name}
            </Button>
          ))}
        </div>

        {/* Photography Grid */}
        <motion.div
          ref={gridRef}
          initial={{ opacity: 0 }}
          animate={gridInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8"
        >
          {filteredLocations.map((location, index) => (
            <motion.div
              key={location.id}
              initial={{ opacity: 0, y: 50 }}
              animate={gridInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card
                as={Link}
                href={`/photography/${location.name}`}
                className="group hover:scale-105 transition-all duration-300 cursor-pointer border-none shadow-lg hover:shadow-2xl h-full"
              >
                <CardHeader className="p-0">
                  <div className="relative w-full h-64 overflow-hidden rounded-t-lg">
                    {!imagesLoaded[location.id] && (
                      <Skeleton className="absolute inset-0 rounded-t-lg" />
                    )}
                    <Image
                      src={location.coverImage}
                      alt={`Photography from ${location.displayName} - ${location.description}. Cover image showcasing ${location.category} photography with ${location.photoCount} photos in collection.`}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className={`object-cover transition-all duration-500 group-hover:scale-110 ${
                        imagesLoaded[location.id] ? "opacity-100" : "opacity-0"
                      }`}
                      onLoad={() => handleImageLoad(location.id)}
                    />

                    {/* Overlay with flag, photo count, and location pin */}
                    <div className="absolute top-4 left-4 flex gap-2">
                      <Chip size="sm" variant="solid" className="bg-white/90 text-black">
                        {location.flag}
                      </Chip>
                      <Chip
                        size="sm"
                        variant="solid"
                        color="primary"
                        className="bg-black/60 text-white"
                      >
                        {location.photoCount} photos
                      </Chip>
                    </div>

                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                </CardHeader>

                <CardBody className="p-6 space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                      {location.displayName}
                    </h3>
                    <Chip
                      size="sm"
                      variant="flat"
                      color={
                        location.category === "adventure"
                          ? "danger"
                          : location.category === "nature"
                            ? "success"
                            : location.category === "urban"
                              ? "secondary"
                              : "warning"
                      }
                    >
                      {location.category}
                    </Chip>
                  </div>

                  <p className="text-default-600 text-sm leading-relaxed">{location.description}</p>
                </CardBody>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        <div className="pt-2 text-center text-sm text-default-500">
          Built by Lionel Hu • Captured across the globe 🌍
        </div>
      </main>
    </>
  );
}
