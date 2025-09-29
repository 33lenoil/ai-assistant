"use client";

import {
  Button,
  Card,
  CardBody,
  Link,
  Chip,
  Modal,
  ModalContent,
  ModalBody,
  useDisclosure,
  Skeleton,
  Spinner,
} from "@heroui/react";
import { ArrowLeftIcon, ArrowRightIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { useState, useEffect, useCallback, use } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import ChatButton from "../../../components/chat-button";
import NavbarComponent from "../../../components/navbar";
import { locationData } from "../../../data/locations";

interface PhotographyLocationPageProps {
  params: Promise<{ location: string }>;
}

export default function PhotographyLocationPage({ params }: PhotographyLocationPageProps) {
  const resolvedParams = use(params);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [imagesLoaded, setImagesLoaded] = useState<Record<number, boolean>>({});
  const [lightboxImageLoaded, setLightboxImageLoaded] = useState<Record<number, boolean>>({});
  const [isLoading, setIsLoading] = useState(true);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [heroRef, heroInView] = useInView({ threshold: 0.1, triggerOnce: true });

  const location = locationData[resolvedParams.location];

  const handleImageLoad = useCallback((index: number) => {
    setImagesLoaded((prev) => {
      if (!prev[index]) {
        return { ...prev, [index]: true };
      }
      return prev;
    });
  }, []);

  useEffect(() => {
    if (location && Object.keys(imagesLoaded).length > 0) {
      setIsLoading(false);
    }
  }, [location, imagesLoaded]);

  const handleLightboxImageLoad = useCallback((index: number) => {
    setLightboxImageLoaded((prev) => ({ ...prev, [index]: true }));
  }, []);

  const openLightbox = (index: number) => {
    setSelectedImageIndex(index);
    // Only reset loading state if the image hasn't been loaded before
    setLightboxImageLoaded((prev) => {
      if (prev[index] === undefined) {
        return { ...prev, [index]: false };
      }
      return prev;
    });
    onOpen();
  };

  const navigateImage = useCallback(
    (direction: "prev" | "next") => {
      if (!location) return;

      let newIndex: number;
      if (direction === "prev") {
        newIndex = selectedImageIndex > 0 ? selectedImageIndex - 1 : location.photos.length - 1;
      } else {
        newIndex = selectedImageIndex < location.photos.length - 1 ? selectedImageIndex + 1 : 0;
      }

      // Only reset loading state if the image hasn't been loaded before
      setLightboxImageLoaded((prev) => {
        if (prev[newIndex] === undefined) {
          return { ...prev, [newIndex]: false };
        }
        return prev;
      });
      setSelectedImageIndex(newIndex);
    },
    [location, selectedImageIndex]
  );

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (!isOpen) return;

      if (e.key === "ArrowLeft") navigateImage("prev");
      if (e.key === "ArrowRight") navigateImage("next");
      if (e.key === "Escape") onClose();
    },
    [isOpen, onClose, navigateImage]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

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

      {/* Main Content */}
      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 space-y-8 overflow-x-hidden">
        {/* Back Navigation */}
        <div className="flex items-center gap-4">
          <Button
            as={Link}
            href="/photography"
            variant="ghost"
            startContent={<ArrowLeftIcon className="h-4 w-4" />}
          >
            Back to Photography
          </Button>
        </div>

        {/* Hero Section */}
        <motion.div
          ref={heroRef}
          initial={{ opacity: 0, y: 30 }}
          animate={heroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
        >
          <Card className="bg-gradient-to-r from-primary-100 via-primary-50 to-secondary-100 dark:from-primary-900 dark:via-primary-800 dark:to-secondary-900 border-none">
            <CardBody className="p-8">
              <div className="flex flex-col sm:flex-row sm:flex-wrap items-start sm:items-center justify-between gap-4">
                <div className="flex flex-wrap items-center gap-4">
                  <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground break-words">
                    {location.flag} {location.displayName}
                  </h1>
                  <Chip variant="flat" color="primary">
                    {location.category}
                  </Chip>
                  <Chip variant="flat" color="secondary">
                    {location.photos.length} Photos
                  </Chip>
                </div>
                {isLoading && <Spinner size="lg" color="primary" />}
              </div>
            </CardBody>
          </Card>
        </motion.div>

        {/* Photo Grid with Lazy Loading */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {location.photos.map((photo, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="relative aspect-square cursor-pointer group"
              onClick={() => openLightbox(index)}
            >
              {!imagesLoaded[index] && <Skeleton className="absolute inset-0 rounded-lg" />}
              <Image
                src={photo}
                alt={`${location.displayName} - Photo ${index + 1}`}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className={`object-cover rounded-lg transition-all duration-500 group-hover:scale-105 ${
                  imagesLoaded[index] ? "opacity-100" : "opacity-0"
                }`}
                onLoad={() => handleImageLoad(index)}
              />

              {/* Hover overlay */}
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg flex items-center justify-center">
                <div className="text-white text-sm font-medium">View Full Size</div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Lightbox Modal */}
        <Modal
          isOpen={isOpen}
          onClose={onClose}
          size="full"
          className="bg-black/95"
          hideCloseButton
          classNames={{
            base: "m-0 sm:m-0",
            wrapper: "w-full h-full",
            body: "p-0",
          }}
        >
          <ModalContent>
            <ModalBody className="flex items-center justify-center relative p-0 h-screen w-screen">
              {/* Close button */}
              <Button
                isIconOnly
                variant="light"
                className="absolute top-4 right-4 z-20 text-white bg-black/20 hover:bg-black/40"
                onPress={onClose}
              >
                <XMarkIcon className="h-6 w-6" />
              </Button>

              {/* Navigation arrows */}
              <Button
                isIconOnly
                variant="light"
                className="absolute left-4 top-1/2 transform -translate-y-1/2 z-20 text-white bg-black/20 hover:bg-black/40"
                onPress={() => navigateImage("prev")}
              >
                <ArrowLeftIcon className="h-6 w-6" />
              </Button>

              <Button
                isIconOnly
                variant="light"
                className="absolute right-4 top-1/2 transform -translate-y-1/2 z-20 text-white bg-black/20 hover:bg-black/40"
                onPress={() => navigateImage("next")}
              >
                <ArrowRightIcon className="h-6 w-6" />
              </Button>

              {/* Image counter */}
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-20 text-white bg-black/50 px-3 py-1 rounded-full text-sm">
                {selectedImageIndex + 1} / {location.photos.length}
              </div>

              {/* Loading spinner */}
              {!lightboxImageLoaded[selectedImageIndex] && (
                <div className="absolute inset-0 flex items-center justify-center z-10">
                  <Spinner size="lg" color="white" />
                </div>
              )}

              {/* Main image container with proper constraints */}
              <div className="relative w-full h-full flex items-center justify-center p-16">
                <motion.div
                  key={selectedImageIndex}
                  initial={{ opacity: 0 }}
                  animate={{
                    opacity: lightboxImageLoaded[selectedImageIndex] ? 1 : 0,
                  }}
                  transition={{ duration: 0.3 }}
                  className="relative w-full h-full flex items-center justify-center"
                >
                  <Image
                    src={location.photos[selectedImageIndex]}
                    alt={`${location.displayName} - Photo ${selectedImageIndex + 1}`}
                    fill
                    className="object-contain"
                    onLoad={() => handleLightboxImageLoad(selectedImageIndex)}
                    priority
                    sizes="100vw"
                  />
                </motion.div>
              </div>
            </ModalBody>
          </ModalContent>
        </Modal>

        <div className="pt-2 text-center text-sm text-default-500">
          Built by Lionel Hu • {location.displayName} Collection
        </div>
      </main>
    </div>
  );
}
