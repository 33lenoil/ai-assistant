"use client";

import { Button, Card, CardBody, Link, Textarea } from "@heroui/react";
import {
  ArrowTopRightOnSquareIcon,
  PaperAirplaneIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import { useCallback, useEffect, useMemo, useRef, useState, memo } from "react";
import { sendToChatAPI } from "@/lib/chat";
import { getBlobUrl } from "@/lib/constants";

const CLIENT_MESSAGE_CAP = 12; // local cap to mirror server

// Global image cache
let cachedLionelImage: HTMLImageElement | null = null;
let imageLoadPromise: Promise<HTMLImageElement> | null = null;

// Preload and cache Lionel's avatar image
const preloadLionelImage = (): Promise<HTMLImageElement> => {
  if (cachedLionelImage) {
    return Promise.resolve(cachedLionelImage);
  }

  if (imageLoadPromise) {
    return imageLoadPromise;
  }

  imageLoadPromise = new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      cachedLionelImage = img;
      resolve(img);
    };
    img.onerror = reject;
    img.src = getBlobUrl("images/lionelhu-min.jpg");
  });

  return imageLoadPromise;
};

type UIMsg = {
  id: string;
  role: "user" | "assistant";
  content?: string;
  repoLinks?: { name: string; url: string }[];
};

// Custom avatar component that uses cached image directly
const CachedAvatar = memo(({ isUser }: { isUser: boolean }) => {
  const [imageLoaded, setImageLoaded] = useState(!!cachedLionelImage);

  useEffect(() => {
    if (!isUser && !cachedLionelImage) {
      preloadLionelImage()
        .then(() => setImageLoaded(true))
        .catch(console.error);
    }
  }, [isUser]);

  if (isUser) {
    return (
      <div className="flex-shrink-0 h-8 w-8 rounded-full bg-default-300 flex items-center justify-center">
        <UserIcon className="h-5 w-5 text-default-600" />
      </div>
    );
  }

  return (
    <div
      className="flex-shrink-0 h-8 w-8 rounded-full bg-cover bg-center bg-default-200"
      style={{
        backgroundImage:
          imageLoaded && cachedLionelImage
            ? `url(${cachedLionelImage.src})`
            : `url(${getBlobUrl("images/lionelhu-min.jpg")})`,
      }}
    />
  );
});

CachedAvatar.displayName = "CachedAvatar";

// Avatar component for messages - memoized to prevent flickering
const MessageAvatar = memo(({ role }: { role: "user" | "assistant" }) => {
  const isUser = role === "user";
  return <CachedAvatar isUser={isUser} />;
});

MessageAvatar.displayName = "MessageAvatar";

// Individual message component - memoized to prevent unnecessary re-renders
const MessageItem = memo(
  ({
    message,
  }: {
    message: UIMsg | { id: string; role: "assistant"; content: string; isLoading: boolean };
  }) => {
    const isUser = message.role === "user";
    const text = message.content ?? "";
    const messageIsLoading = "isLoading" in message && message.isLoading;

    return (
      <div key={message.id} className={`flex gap-3 ${isUser ? "justify-end" : "justify-start"}`}>
        {/* Avatar for assistant messages (left side) */}
        {!isUser && <MessageAvatar role={message.role} />}

        <div
          className={`max-w-[80%] rounded-lg px-4 py-2 ${
            isUser ? "bg-primary text-primary-foreground" : "bg-default-100"
          }`}
        >
          {messageIsLoading ? (
            <div className="flex gap-1">
              <div className="h-2 w-2 animate-bounce rounded-full bg-default-400"></div>
              <div className="h-2 w-2 animate-bounce rounded-full bg-default-400 [animation-delay:0.1s]"></div>
              <div className="h-2 w-2 animate-bounce rounded-full bg-default-400 [animation-delay:0.2s]"></div>
            </div>
          ) : (
            <>
              {!!text && (
                <p
                  className={`whitespace-pre-wrap ${
                    isUser ? "text-primary-foreground" : "text-foreground"
                  }`}
                >
                  {formatTextWithLinks(text, isUser)}
                </p>
              )}

              {/* Repo link buttons (when present on an assistant message) */}
              {"repoLinks" in message && message.repoLinks && message.repoLinks.length > 0 && (
                <div className="mt-3 space-y-2">
                  {message.repoLinks.map((repo: { name: string; url: string }, idx: number) => (
                    <Button
                      key={`${repo.url}-${idx}`}
                      as={Link}
                      href={repo.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      variant="bordered"
                      size="sm"
                      startContent={<ArrowTopRightOnSquareIcon className="h-4 w-4" />}
                      className="w-full justify-start"
                    >
                      <div className="text-left">
                        <div className="font-medium">{repo.name}</div>
                      </div>
                    </Button>
                  ))}
                </div>
              )}
            </>
          )}
        </div>

        {/* Avatar for user messages (right side) */}
        {isUser && <MessageAvatar role={message.role} />}
      </div>
    );
  }
);

MessageItem.displayName = "MessageItem";

// Function to detect URLs and convert them to clickable links
const formatTextWithLinks = (text: string, isUser: boolean = false) => {
  const urlRegex = /(https?:\/\/[^\s]+)/g;

  // Split the text and process each part
  const parts: (string | React.ReactElement)[] = [];
  let lastIndex = 0;
  let match;

  while ((match = urlRegex.exec(text)) !== null) {
    // Add text before the URL
    if (match.index > lastIndex) {
      parts.push(text.slice(lastIndex, match.index));
    }

    // Clean the URL by removing trailing punctuation
    let url = match[0];
    let trailingPunctuation = "";

    // Remove common punctuation from the end
    const punctuationRegex = /([.!?,:;]+)$/;
    const punctuationMatch = url.match(punctuationRegex);
    if (punctuationMatch) {
      trailingPunctuation = punctuationMatch[1];
      url = url.slice(0, -trailingPunctuation.length);
    }

    // Add the clickable link
    parts.push(
      <a
        key={match.index}
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className={`underline hover:no-underline ${
          isUser ? "text-blue-200 hover:text-blue-100" : "text-blue-500 hover:text-blue-700"
        }`}
      >
        {url}
      </a>
    );

    // Add the trailing punctuation as regular text
    if (trailingPunctuation) {
      parts.push(trailingPunctuation);
    }

    lastIndex = urlRegex.lastIndex;
  }

  // Add any remaining text
  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex));
  }

  return parts;
};

export default function ChatClient() {
  const [messages, setMessages] = useState<UIMsg[]>([]);
  const [status, setStatus] = useState<"idle" | "loading">("idle");
  const [error, setError] = useState<string | null>(null);
  const [input, setInput] = useState("");
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const isLoading = status === "loading";

  useEffect(() => {
    // Preload Lionel's avatar image globally when app starts
    preloadLionelImage().catch(console.error);
  }, []);

  // enforce a local cap so we don't grow unbounded on the client
  const cappedMessages = useMemo(
    () => (messages.length > CLIENT_MESSAGE_CAP ? messages.slice(-CLIENT_MESSAGE_CAP) : messages),
    [messages]
  );

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [cappedMessages, isLoading]);

  const submit = useCallback(
    async (e?: React.FormEvent) => {
      e?.preventDefault();
      const text = input.trim();
      if (!text || isLoading) return;

      setError(null);

      // optimistic cap: trim before sending (keep space for the new user msg)
      if (messages.length >= CLIENT_MESSAGE_CAP) {
        setMessages((prev) => prev.slice(-(CLIENT_MESSAGE_CAP - 1)));
      }

      // push user message
      const userMsg: UIMsg = {
        id: `u-${Date.now()}`,
        role: "user",
        content: text,
      };
      const next = [...messages, userMsg];
      setMessages(next);
      setInput("");

      // build history for API (only role/content)
      const history = next.map((m) => ({ role: m.role, content: m.content ?? "" }));

      setStatus("loading");
      try {
        const { text: assistantText, repoLinks } = await sendToChatAPI(history);
        const assistantMsg: UIMsg = {
          id: `a-${Date.now()}`,
          role: "assistant",
          content: assistantText,
          repoLinks: repoLinks ?? [],
        };
        setMessages((prev) => [...prev, assistantMsg]);
      } catch (err: unknown) {
        console.error("Chat error:", err);
        setError("Something went wrong. Please try again.");
        setMessages((prev) => [
          ...prev,
          { id: `e-${Date.now()}`, role: "assistant", content: "Network error. Please try again." },
        ]);
      } finally {
        setStatus("idle");
      }
    },
    [input, isLoading, messages]
  );

  const ask = (q: string) => setInput(q);

  return (
    <main className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {cappedMessages.length === 0 && (
        <div className="text-center">
          <h2 className="mb-2 text-2xl font-bold text-foreground">
            🤖 Hi! I&apos;m Lionel&apos;s personal AI assistant.
          </h2>
          <p className="text-default-500">
            Ask me about Lionel&apos;s background, skills, experience, or projects.
          </p>
        </div>
      )}

      {/* Chat area */}
      <Card className="h-[500px]">
        <CardBody className="p-0 h-full">
          <div ref={chatContainerRef} className="h-full overflow-y-auto p-6">
            <div className="flex flex-col gap-4 min-h-full">
              {cappedMessages.length === 0 ? (
                <div className="flex flex-1 items-center justify-center text-center text-default-500">
                  <div>
                    <p className="text-lg mb-2">Start a conversation</p>
                    <p className="text-sm">Try asking:</p>
                    <div className="mt-3 flex flex-wrap justify-center gap-2">
                      <Button
                        size="sm"
                        variant="flat"
                        onPress={() => ask("What are Lionel's strongest skills?")}
                      >
                        &quot;What are Lionel&apos;s strongest skills?&quot;
                      </Button>
                      <Button
                        size="sm"
                        variant="flat"
                        onPress={() => ask("Summarize Lionel's HeartByte experience.")}
                      >
                        &quot;Summarize Lionel&apos;s HeartByte experience.&quot;
                      </Button>
                      <Button
                        size="sm"
                        variant="flat"
                        onPress={() => ask("Show me the UFOgram repo")}
                      >
                        &quot;Show me the UFOgram repo&quot;
                      </Button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col gap-4">
                  {[
                    ...cappedMessages,
                    ...(isLoading
                      ? [
                          {
                            id: "loading",
                            role: "assistant" as const,
                            content: "",
                            isLoading: true,
                          },
                        ]
                      : []),
                  ].map((message) => (
                    <MessageItem key={message.id} message={message} />
                  ))}

                  {error && <div className="text-sm text-danger">{error}</div>}
                </div>
              )}
            </div>
          </div>
        </CardBody>
      </Card>

      {/* Composer */}
      <Card>
        <CardBody className="p-4">
          <form onSubmit={submit} className="flex gap-3">
            <Textarea
              placeholder="Ask me anything about Lionel…"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              minRows={1}
              maxRows={4}
              className="flex-1"
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  submit();
                }
              }}
            />
            <Button
              type="submit"
              variant="solid"
              isIconOnly
              size="lg"
              isDisabled={!input.trim() || isLoading}
              className="self-end"
            >
              <PaperAirplaneIcon className="h-5 w-5" />
            </Button>
          </form>
          <div className="mt-2 text-right text-xs text-default-500">
            History limited to last {CLIENT_MESSAGE_CAP} messages.
          </div>
        </CardBody>
      </Card>

      <div className="pt-2 text-center text-sm text-default-500">
        Powered by AI • Built by Lionel Hu
      </div>
    </main>
  );
}
