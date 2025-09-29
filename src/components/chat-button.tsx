"use client";

import { Button, Link } from "@heroui/react";
import { ChatBubbleLeftRightIcon } from "@heroicons/react/24/outline";

export default function ChatButton() {
  return (
    <Button
      as={Link}
      href="/chat"
      className="fixed bottom-6 right-6 z-50 shadow-2xl animate-pulse hover:animate-none transition-all duration-300 hover:scale-105"
      color="primary"
      variant="shadow"
      size="lg"
      radius="full"
      startContent={<ChatBubbleLeftRightIcon className="h-5 w-5" />}
    >
      <span className="hidden sm:inline">Chat with Lionel&apos;s AI Assistant</span>
      <span className="sm:hidden">Chat</span>
    </Button>
  );
}
