export type ChatMessage = { role: "user" | "assistant"; content: string };
export type ChatResponse = {
  text: string;
  repoLinks: { name: string; url: string }[];
};

export async function sendToChatAPI(messages: ChatMessage[]): Promise<ChatResponse> {
  const res = await fetch("/api/chat", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ messages }),
  });
  if (!res.ok) {
    return { text: "Server error. Please try again.", repoLinks: [] };
  }
  return (await res.json()) as ChatResponse;
}
