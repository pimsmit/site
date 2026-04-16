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

interface SiteData {
  url: string;
  title: string;
  metaDescription: string;
  tech: string[];
  colors: string[];
  language: string;
  bodyPreview: string;
}

export async function POST(request: NextRequest) {
  try {
    const { input, siteData } = (await request.json()) as {
      input: string;
      siteData?: SiteData;
    };

    if (!input || input.trim().length < 3) {
      return NextResponse.json({ error: "Too short" }, { status: 400 });
    }

    const apiKey = process.env.OPENROUTER_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: "Not available" }, { status: 500 });
    }

    let siteContext = "";
    if (siteData) {
      siteContext = `

The client's current website has been analyzed:
- URL: ${siteData.url}
- Title: ${siteData.title}
- Description: ${siteData.metaDescription}
- Tech stack: ${siteData.tech.join(", ") || "unknown"}
- Brand colors: ${siteData.colors.join(", ") || "unknown"}
- Language: ${siteData.language || "unknown"}
- Content preview: ${siteData.bodyPreview.slice(0, 800)}

Use this data to:
1. Tailor the project description to their ACTUAL business and brand
2. Reference their existing tech stack for integration recommendations
3. Match their brand voice/tone based on their site content
4. Suggest specific improvements based on what they already have`;
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
        max_tokens: 1000,
        response_format: { type: "json_object" },
        messages: [
          {
            role: "system",
            content: `You help clients fill in a project request form for Ainomiq, an AI automation agency.

Given a short description of what the client wants${siteData ? " and data scraped from their current website" : ""}, return a JSON object with:
- "projectType": one of ${JSON.stringify(PROJECT_TYPE_IDS)}
- "description": a concrete, specific project brief (100-200 words, bullet points for features). Be specific, make reasonable assumptions, NEVER ask questions back or say "further details needed". Write in the SAME LANGUAGE as the input.${siteData ? ' Reference their actual business, brand, and existing tools where relevant.' : ''}
- "timeline": one of ${JSON.stringify(TIMELINE_IDS)} — estimate based on complexity
- "targetAudience": who this is for (short, 5-15 words)${siteData ? " — infer from their site content" : ""} or "" if unclear
- "needsCredentials": boolean — true if they mention existing systems/integrations that need access${siteData ? " or if their site uses integrations (Shopify, Klaviyo, etc.)" : ""}
- "recommendations": array of 2-4 short actionable suggestions${siteData ? " based on their site. Reference the CLIENT's detected platforms by name (e.g. 'Connect to your Shopify store for real-time order data', 'Sync with your Klaviyo for automated emails'). Ainomiq is the agency — always say 'your [platform]', never 'Ainomiq data' or 'our data'." : " (e.g. 'Add analytics dashboard', 'Automate order notifications')"}

Return ONLY valid JSON, no markdown, no commentary.${siteContext}`,
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
      if (!PROJECT_TYPE_IDS.includes(parsed.projectType)) {
        parsed.projectType = "other";
      }
      if (!TIMELINE_IDS.includes(parsed.timeline)) {
        parsed.timeline = "2-4-weeks";
      }
      if (!Array.isArray(parsed.recommendations)) {
        parsed.recommendations = [];
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
