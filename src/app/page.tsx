"use client";

import { Button, Card, CardBody, Link, Textarea } from "@heroui/react";
import { ArrowTopRightOnSquareIcon, PaperAirplaneIcon } from "@heroicons/react/24/outline";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { sendToChatAPI } from "@/lib/chat";

const CLIENT_MESSAGE_CAP = 12; // local cap to mirror server

type UIMsg = {
  id: string;
  role: "user" | "assistant";
  content?: string;
  repoLinks?: { name: string; url: string }[];
};

export default function Home() {
  const [messages, setMessages] = useState<UIMsg[]>([]);
  const [status, setStatus] = useState<"idle" | "loading">("idle");
  const [error, setError] = useState<string | null>(null);
  const [input, setInput] = useState("");
  const chatContainerRef = useRef<HTMLDivElement>(null);

  const isLoading = status === "loading";

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
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
        <div className="mx-auto flex h-16 max-w-4xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <h1 className="text-xl font-semibold text-gray-900 dark:text-white">
            Lionel’s AI Assistant
          </h1>
          <nav className="flex items-center gap-3 text-sm">
            <Link href="/Lionel_Hu_Resume.pdf" target="_blank" rel="noopener noreferrer">
              Resume
            </Link>
            <Link href="https://github.com/33lenoil" target="_blank" rel="noopener noreferrer">
              GitHub
            </Link>
            <Link
              href="https://www.linkedin.com/in/lionel-hu/"
              target="_blank"
              rel="noopener noreferrer"
            >
              LinkedIn
            </Link>
            <Link href="https://33lenoil.github.io/" target="_blank" rel="noopener noreferrer">
              Portfolio
            </Link>
          </nav>
        </div>
      </header>

      {/* Main */}
      <main className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        {cappedMessages.length === 0 && (
          <div className="text-center">
            <h2 className="mb-2 text-2xl font-bold text-gray-900 dark:text-white">
              Hi! I&apos;m your personal AI assistant.
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              Ask me about Lionel’s background, skills, experience, or projects.
            </p>
          </div>
        )}

        {/* Chat area */}
        <Card className="h-[500px]">
          <CardBody className="p-0 h-full">
            <div ref={chatContainerRef} className="h-full overflow-y-auto p-6">
              <div className="flex flex-col gap-4 min-h-full">
                {cappedMessages.length === 0 ? (
                  <div className="flex flex-1 items-center justify-center text-center text-gray-500 dark:text-gray-400">
                    <div>
                      <p className="text-lg mb-2">Start a conversation</p>
                      <p className="text-sm">Try asking:</p>
                      <div className="mt-3 flex flex-wrap justify-center gap-2">
                        <Button
                          size="sm"
                          variant="flat"
                          onPress={() => ask("What are your strongest skills?")}
                        >
                          &quot;What are your strongest skills?&quot;
                        </Button>
                        <Button
                          size="sm"
                          variant="flat"
                          onPress={() => ask("Summarize your HeartByte experience.")}
                        >
                          &quot;Summarize your HeartByte experience.&quot;
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
                    {cappedMessages.map((m) => {
                      const isUser = m.role === "user";
                      const text = m.content ?? "";

                      return (
                        <div
                          key={m.id}
                          className={`flex ${isUser ? "justify-end" : "justify-start"}`}
                        >
                          <div
                            className={`max-w-[80%] rounded-lg px-4 py-2 ${
                              isUser
                                ? "bg-primary text-primary-foreground"
                                : "bg-gray-100 dark:bg-gray-700"
                            }`}
                          >
                            {!!text && (
                              <p
                                className={`whitespace-pre-wrap ${
                                  isUser ? "text-white" : "text-gray-800 dark:text-gray-200"
                                }`}
                              >
                                {text}
                              </p>
                            )}

                            {/* Repo link buttons (when present on an assistant message) */}
                            {m.repoLinks && m.repoLinks.length > 0 && (
                              <div className="mt-3 space-y-2">
                                {m.repoLinks.map((repo, idx) => (
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
                          </div>
                        </div>
                      );
                    })}

                    {/* Typing / loading indicator */}
                    {isLoading && (
                      <div className="flex justify-start">
                        <div className="rounded-lg bg-gray-100 px-4 py-2 dark:bg-gray-700">
                          <div className="flex gap-1">
                            <div className="h-2 w-2 animate-bounce rounded-full bg-gray-400"></div>
                            <div className="h-2 w-2 animate-bounce rounded-full bg-gray-400 [animation-delay:0.1s]"></div>
                            <div className="h-2 w-2 animate-bounce rounded-full bg-gray-400 [animation-delay:0.2s]"></div>
                          </div>
                        </div>
                      </div>
                    )}

                    {error && <div className="text-sm text-red-600">{error}</div>}
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
            <div className="mt-2 text-right text-xs text-gray-500">
              History limited to last {CLIENT_MESSAGE_CAP} messages.
            </div>
          </CardBody>
        </Card>

        <div className="pt-2 text-center text-sm text-gray-500 dark:text-gray-400">
          Powered by AI • Built by Lionel Hu
        </div>
      </main>
    </div>
  );
}
