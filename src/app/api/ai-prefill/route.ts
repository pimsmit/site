import { NextRequest, NextResponse } from "next/server";

const PROJECT_TYPE_IDS = [
  "website-landing",
  "webapp-dashboard",
  "ai-chatbot",
  "automation-workflow",
  "ecommerce",
  "api-development",
  "mobile-app",
  "data-analytics",
  "other",
];

const TIMELINE_IDS = ["asap", "1-2-weeks", "2-4-weeks", "1-2-months", "flexible"];

export async function POST(request: NextRequest) {
  try {
    const { input } = (await request.json()) as { input: string };

    if (!input || input.trim().length < 5) {
      return NextResponse.json({ error: "Too short" }, { status: 400 });
    }

    const apiKey = process.env.OPENROUTER_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: "Not available" }, { status: 500 });
    }

    const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
        "HTTP-Referer": "https://ainomiq.com",
        "X-Title": "Ainomiq Project Form",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        max_tokens: 800,
        response_format: { type: "json_object" },
        messages: [
          {
            role: "system",
            content: `You help clients fill in a project request form for Ainomiq, an AI automation agency.

Given a short description of what the client wants, return a JSON object with:
- "projectType": one of ${JSON.stringify(PROJECT_TYPE_IDS)}
- "description": a concrete, specific project brief (100-200 words, bullet points for features). Be specific, make reasonable assumptions, NEVER ask questions back or say "further details needed". Write in the SAME LANGUAGE as the input.
- "timeline": one of ${JSON.stringify(TIMELINE_IDS)} — estimate based on complexity
- "targetAudience": who this is for (short, 5-15 words) or "" if unclear
- "needsCredentials": boolean — true if they mention existing systems/integrations that need access

Return ONLY valid JSON, no markdown, no commentary.`,
          },
          { role: "user", content: input },
        ],
      }),
    });

    if (!res.ok) {
      console.error("OpenRouter error:", res.status, await res.text());
      return NextResponse.json({ error: "AI failed" }, { status: 502 });
    }

    const data = await res.json();
    const content = data.choices?.[0]?.message?.content?.trim();
    
    try {
      const parsed = JSON.parse(content);
      // Validate projectType
      if (!PROJECT_TYPE_IDS.includes(parsed.projectType)) {
        parsed.projectType = "other";
      }
      if (!TIMELINE_IDS.includes(parsed.timeline)) {
        parsed.timeline = "2-4-weeks";
      }
      return NextResponse.json(parsed);
    } catch {
      return NextResponse.json({ error: "Invalid AI response" }, { status: 502 });
    }
  } catch (error) {
    console.error("AI prefill error:", error);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}
