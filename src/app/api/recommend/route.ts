import { NextRequest, NextResponse } from "next/server";
import { generateText } from "ai";
import { openai } from "@ai-sdk/openai";
import type { SiteAnalysis, ManualAnswers } from "@/lib/analysis-types";

const SYSTEM_PROMPT = `You are Ainomiq's AI advisor. You analyze businesses and recommend specific Ainomiq services with estimated monthly cost savings.

Ainomiq has 4 core services:

1. **24/7 Support** — AI customer service that handles email, phone, social media, and chat tickets automatically. Handles 200+ tickets/day.
   - Typical savings: 45-76% on support costs (replaces 1-3 support agents)

2. **Precise Performance** — AI-powered ad management for Meta, Google, and TikTok. Automated budget allocation, creative testing, audience optimization.
   - Typical savings: 30-55% on ad management costs (replaces agency or in-house ad manager)

3. **Mail Engine** — AI email marketing automation with Klaviyo/Mailchimp integration. Automated flows, segmentation, AI copywriting.
   - Typical savings: 40-65% on email marketing costs (replaces email agency or specialist)

4. **Smart Inventory** — AI stock predictions, reorder alerts, multi-warehouse support. Prevents overstock and stockouts.
   - Typical savings: 25-50% on inventory-related costs (fewer stockouts, less overstock waste)

RULES:
- Respond with ONLY valid JSON, no markdown, no code fences, no explanation
- Base savings on the detected tech stack, products, business size
- If they use a tool (e.g. Klaviyo), savings for that service are HIGHER
- If they run ads (Meta Pixel, Google Ads), Precise Performance savings are HIGHER
- Give a SPECIFIC savings % per service (not a range)
- The description MUST reference specific things you found on their site (product names, tools, etc.)
- Be impressive and specific — show you really analyzed their business

JSON structure:
{"services":[{"id":"support","name":"24/7 Support","savingsPercent":NUMBER,"description":"STRING","relevance":"high|medium|low"},{"id":"performance","name":"Precise Performance","savingsPercent":NUMBER,"description":"STRING","relevance":"high|medium|low"},{"id":"email","name":"Mail Engine","savingsPercent":NUMBER,"description":"STRING","relevance":"high|medium|low"},{"id":"inventory","name":"Smart Inventory","savingsPercent":NUMBER,"description":"STRING","relevance":"high|medium|low"}],"summary":"STRING","plan":"App|Enterprise"}`;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const analysis: SiteAnalysis | undefined = body.analysis;
    const manual: ManualAnswers | undefined = body.manual;

    let userPrompt: string;

    if (analysis) {
      const techList = analysis.technologies
        .map((t) => `${t.name} (${t.category}, ${t.confidence} confidence)`)
        .join(", ");

      const productList = analysis.products
        .slice(0, 15)
        .map((p) => `${p.name}${p.price ? ` — ${p.price}` : ""}`)
        .join(", ");

      userPrompt = `Analyze this business:
Site: ${analysis.url}
Title: ${analysis.title}
Description: ${analysis.description}
Technologies: ${techList || "None detected"}
E-commerce: ${analysis.hasEcommerce ? "Yes" : "No"}
Scale: ${analysis.estimatedScale}
Products (${analysis.products.length}): ${productList || "None found on page"}
Price range: ${analysis.priceRange ? `${analysis.currency} ${analysis.priceRange.min} - ${analysis.priceRange.max}` : "Unknown"}
FAQ items (${analysis.faqItems.length}): ${analysis.faqItems.slice(0, 5).join(" | ") || "None"}
Pages: ${analysis.pageCount}
Social: ${analysis.socialPresence.join(", ") || "None"}
Contact: ${analysis.contactEmail || "none"}, ${analysis.contactPhone || "none"}

Site content:
${analysis.bodyTextSummary}`;
    } else if (manual) {
      userPrompt = `Recommend services based on:
Platform: ${manual.platform}
Monthly orders: ${manual.orderVolume}
Tools: ${manual.tools.join(", ") || "None"}`;
    } else {
      return NextResponse.json({ error: "Missing data" }, { status: 400 });
    }

    const result = await generateText({
      model: openai("gpt-4o-mini"),
      system: SYSTEM_PROMPT,
      prompt: userPrompt,
    });

    // Parse the JSON response
    const jsonMatch = result.text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      return NextResponse.json({ error: "Failed to generate recommendation" }, { status: 500 });
    }

    const recommendation = JSON.parse(jsonMatch[0]);
    return NextResponse.json(recommendation);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to generate recommendation";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
