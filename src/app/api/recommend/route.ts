import { NextRequest } from "next/server";
import { streamText } from "ai";
import type { SiteAnalysis, ManualAnswers } from "@/lib/analysis-types";

const SYSTEM_PROMPT = `You are Ainomiq's AI advisor. You analyze businesses and recommend specific Ainomiq services with estimated monthly cost savings.

Ainomiq has 4 core services:

1. **24/7 Support** — AI customer service that handles email, phone, social media, and chat tickets automatically. Handles 200+ tickets/day.
   - Typical savings: 45-76% on support costs (replaces 1-3 support agents)
   - Higher savings for businesses with high ticket volume, multi-channel support, or 24/7 requirements

2. **Precise Performance** — AI-powered ad management for Meta, Google, and TikTok. Automated budget allocation, creative testing, audience optimization.
   - Typical savings: 30-55% on ad management costs (replaces agency or in-house ad manager)
   - Higher savings for businesses running ads on multiple platforms with significant spend

3. **Mail Engine** — AI email marketing automation with Klaviyo/Mailchimp integration. Automated flows, segmentation, AI copywriting.
   - Typical savings: 40-65% on email marketing costs (replaces email agency or specialist)
   - Higher savings for businesses with large email lists or complex automation needs

4. **Smart Inventory** — AI stock predictions, reorder alerts, multi-warehouse support. Prevents overstock and stockouts.
   - Typical savings: 25-50% on inventory-related costs (fewer stockouts, less overstock waste)
   - Higher savings for businesses with 100+ SKUs or seasonal demand

IMPORTANT RULES:
- You MUST respond with ONLY a valid JSON object, no other text
- Base savings estimates on the detected tech stack, product count, business size, and industry
- If they already use a tool (e.g., Klaviyo), the savings for that service are HIGHER because integration is seamless
- If they run ads (Meta Pixel, Google Ads detected), Precise Performance savings are HIGHER
- If they have e-commerce (Shopify/WooCommerce), all services are more relevant
- For each service, give a specific savings percentage (not a range) based on their situation
- Add a brief personalized explanation for each service

Respond with this exact JSON structure:
{
  "services": [
    {
      "id": "support",
      "name": "24/7 Support",
      "savingsPercent": <number>,
      "description": "<1-2 sentence personalized explanation>",
      "relevance": "high" | "medium" | "low"
    },
    {
      "id": "performance",
      "name": "Precise Performance",
      "savingsPercent": <number>,
      "description": "<1-2 sentence personalized explanation>",
      "relevance": "high" | "medium" | "low"
    },
    {
      "id": "email",
      "name": "Mail Engine",
      "savingsPercent": <number>,
      "description": "<1-2 sentence personalized explanation>",
      "relevance": "high" | "medium" | "low"
    },
    {
      "id": "inventory",
      "name": "Smart Inventory",
      "savingsPercent": <number>,
      "description": "<1-2 sentence personalized explanation>",
      "relevance": "high" | "medium" | "low"
    }
  ],
  "summary": "<2-3 sentence overall recommendation>",
  "plan": "App" | "Enterprise"
}`;

export async function POST(request: NextRequest) {
  const body = await request.json();
  const analysis: SiteAnalysis | undefined = body.analysis;
  const manual: ManualAnswers | undefined = body.manual;

  let userPrompt: string;

  if (analysis) {
    const techList = analysis.technologies
      .map((t) => `${t.name} (${t.category}, ${t.confidence} confidence)`)
      .join(", ");

    userPrompt = `Analyze this business and recommend services with savings:
Site: ${analysis.url}
Title: ${analysis.title}
Description: ${analysis.description}
Detected technologies: ${techList || "None detected"}
Has e-commerce platform: ${analysis.hasEcommerce ? "Yes" : "No"}
Estimated scale: ${analysis.estimatedScale}
Products found: ${analysis.productCount}
Sample products: ${analysis.sampleProducts.join(", ") || "None found"}
Price range: ${analysis.priceRange ? `${analysis.currency} ${analysis.priceRange.min} - ${analysis.priceRange.max}` : "Unknown"}
FAQ items: ${analysis.faqItems.length > 0 ? analysis.faqItems.join(" | ") : "None found"}
Pages on site: ${analysis.pageCount}
Social presence: ${analysis.socialPresence.join(", ") || "None detected"}
Contact: ${analysis.contactEmail || "no email"}, ${analysis.contactPhone || "no phone"}

Site content excerpt:
${analysis.bodyTextSummary}`;
  } else if (manual) {
    userPrompt = `Recommend services with savings based on these answers:
Platform: ${manual.platform}
Monthly orders: ${manual.orderVolume}
Tools in use: ${manual.tools.join(", ") || "None specified"}`;
  } else {
    return new Response("Missing analysis or manual answers", { status: 400 });
  }

  const result = streamText({
    model: "openai/gpt-5.4-mini",
    system: SYSTEM_PROMPT,
    prompt: userPrompt,
  });

  return result.toUIMessageStreamResponse();
}
