import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";
import profile from "@/data/profile.json";
import repos from "@/data/repos.json";
import { RepoItem } from "@/types";

const openai = new OpenAI({
  apiKey: process.env.OPEN_AI_API_KEY,
});

// Helper: search repos.json
function get_repo_links(query: string): { name: string; url: string }[] {
  const q = query.toLowerCase();
  return (repos as RepoItem[])
    .filter(
      (r) =>
        r.id.toLowerCase().includes(q) ||
        r.name.toLowerCase().includes(q) ||
        (r.tags || []).some((t: string) => q.includes(t) || t.includes(q))
    )
    .slice(0, 5)
    .map((r) => ({ name: r.name, url: r.url }));
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    let messages = body.messages || [];

    // Trim history to last 10 messages
    messages = messages.slice(-10);

    // Ensure user input length cap
    const lastUser = messages[messages.length - 1];
    if (lastUser?.content?.length > 1000) {
      lastUser.content = lastUser.content.slice(0, 1000);
    }

    // System instructions
    const systemPrompt = `
You are Lionel Hu's professional PR assistant.
Answer only from the provided profile JSON.
If you do not know, say so and suggest checking resume/LinkedIn.
If the user asks about a repository or code link, respond with a tool call like:
<TOOL>{"tool":"get_repo_links","query":"..."}<\/TOOL>
Otherwise, answer concisely in text.
Profile data:
${JSON.stringify(profile)}
`;

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "system", content: systemPrompt }, ...messages],
      temperature: 0.3,
    });

    const content = completion.choices[0]?.message?.content || "";

    // Detect tool call
    const toolMatch = content.match(/<TOOL>([\s\S]*?)<\/TOOL>/);
    if (toolMatch) {
      try {
        const payload = JSON.parse(toolMatch[1]);
        if (payload.tool === "get_repo_links") {
          const results = get_repo_links(payload.query);
          return NextResponse.json({ text: "Here are the repos I found:", urls: results });
        }
      } catch (e: unknown) {
        return NextResponse.json({ text: "I tried to find repos but parsing failed.", urls: [] });
      }
    }

    // Normal answer
    return NextResponse.json({ text: content, urls: [] });
  } catch (err: unknown) {
    console.error("Chat API error:", err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
