// app/api/chat/route.ts
import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";
import fs from "node:fs/promises";
import path from "node:path";

export const runtime = "nodejs";

const MODEL = "gpt-4o-mini";
const TEMPERATURE = 0.2;

// Chat limits (adjust as you like)
const MAX_MESSAGES = 12;
const MAX_TOTAL_CHARS = 6000;

type ClientMessage = {
  role: "user" | "assistant";
  content: string;
};

type RepoItem = { name: string; url: string; tags?: string[] };

// --- helpers ----

async function readJson<T>(relPath: string): Promise<T> {
  const abs = path.join(process.cwd(), relPath);
  const raw = await fs.readFile(abs, "utf-8");
  return JSON.parse(raw) as T;
}

function truncateHistory(messages: ClientMessage[]) {
  // Keep last N and cap total chars
  const trimmed = messages.slice(-MAX_MESSAGES);
  let total = 0;
  const result: ClientMessage[] = [];
  for (let i = trimmed.length - 1; i >= 0; i--) {
    const m = trimmed[i];
    total += m.content.length;
    if (total > MAX_TOTAL_CHARS) break;
    result.unshift(m);
  }
  return result;
}

function buildSystemPrompt(profile: any) {
  return `
You are Lionel Hu's professional AI assistant. You are to answer questions for Lionel, but don't act like you are Lionel.
Be friendly and professional, don't just be a robot.

SCOPE:
- Answer only with information from the provided "profile" JSON. Don't just copy information from the profile or include markdown formatting, paraphrase a bit.
- If the answer isn’t in profile, say you are not sure and suggest checking resume/LinkedIn or contact Lionel directly (use the links in profile).
- Respond specifically to the user's question, don't avoid the question and just talk about Lionel's experiences.
- When you do have an answer, be self-assured and confident.

TOOLS:
- You may request repo links by emitting a single XML block:
  <TOOL>
    get_repo_links: { "query": "<short phrase>" }
  </TOOL>
- Keep the rest of your answer as normal text outside the TOOL block.
- Only request the tool when the user asks for code examples, project repos, or "where is the repo" style intents.

OUTPUT:
- Plain text. No markdown tables unless the user asks.
- Don't tell the user to feel free to ask you any details, ask them if they want anything specific when appropriate.
- Be concise and friendly.

PROFILE (read-only):
${JSON.stringify(profile)}
`.trim();
}

function extractToolCall(text: string) {
  // Matches <TOOL> ... </TOOL> and tries to parse a get_repo_links payload
  const m = text.match(/<TOOL>([\s\S]*?)<\/TOOL>/i);
  if (!m) return null;

  const inner = m[1];
  const getRepo = inner.match(/get_repo_links\s*:\s*({[\s\S]*})/i);
  if (!getRepo) return null;

  try {
    const payload = JSON.parse(getRepo[1]);
    if (typeof payload?.query === "string") {
      return { query: payload.query, fullMatch: m[0] };
    }
  } catch {
    // ignore parse error
  }
  return null;
}

function matchRepos(repos: RepoItem[], query: string): RepoItem[] {
  const q = query.toLowerCase();
  // simple scoring: name match > tag match > partial
  const scored = repos.map((r) => {
    const nameLc = r.name.toLowerCase();
    const tagHit = (r.tags || []).some((t) => t.toLowerCase().includes(q));
    const nameExact = nameLc === q ? 3 : 0;
    const nameIncl = nameLc.includes(q) ? 2 : 0;
    const tagIncl = tagHit ? 1 : 0;
    return { repo: r, score: nameExact + nameIncl + tagIncl };
  });
  return scored
    .filter((s) => s.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 5)
    .map((s) => s.repo);
}

// --- route ----

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    const incoming: ClientMessage[] = Array.isArray(body?.messages) ? body.messages : [];

    const messages = truncateHistory(
      incoming.filter(
        (m) => m && (m.role === "user" || m.role === "assistant") && typeof m.content === "string"
      )
    );

    const profile = await readJson<any>("src/data/profile.json");
    const repos = await readJson<RepoItem[]>("src/data/repos.json");

    const systemPrompt = buildSystemPrompt(profile);

    const client = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    const completion = await client.chat.completions.create({
      model: MODEL,
      temperature: TEMPERATURE,
      messages: [
        { role: "system", content: systemPrompt },
        ...messages.map((m) => ({ role: m.role, content: m.content })),
      ],
    });

    const text = completion.choices[0]?.message?.content?.trim() ?? "";
    if (!text) {
      return NextResponse.json(
        { text: "Sorry, I couldn't generate a response.", repoLinks: [] },
        { status: 200 }
      );
    }

    // Detect and run tool call if present
    let finalText = text;
    let repoLinks: { name: string; url: string }[] = [];

    const tool = extractToolCall(text);
    if (tool) {
      const matched = matchRepos(repos, tool.query);
      repoLinks = matched.map(({ name, url }) => ({ name, url }));
      // Remove the TOOL block from the text the user sees
      finalText = text.replace(tool.fullMatch, "").trim();
    }

    return NextResponse.json({ text: finalText, repoLinks }, { status: 200 });
  } catch (err: any) {
    console.error("/api/chat error:", err);
    return NextResponse.json(
      { text: "Server error. Please try again.", repoLinks: [] },
      { status: 500 }
    );
  }
}
