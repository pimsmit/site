import { NextRequest } from "next/server";
import { streamText } from "ai";
import type { SiteAnalysis, ManualAnswers } from "@/lib/analysis-types";

const SYSTEM_PROMPT = `You are an AI advisor for Ainomiq, an AI automation app. Based on the site analysis or manual answers provided, recommend the best plan and modules.

Ainomiq offers two plans:
- **App** (from EUR 149/mo): Self-service AI app for e-commerce. Includes dashboard, Customer Service AI, Ad Management, Email Marketing, Inventory tracking, and Performance analytics.
- **Enterprise** (custom pricing): Custom-built AI systems for larger businesses with complex needs, integrations, or high volume.

Ainomiq modules:
1. **Customer Service AI** - Automated ticket handling, 200+ tickets/day capacity, multi-language
2. **Ad Management** - Meta, Google, TikTok ad optimization with AI-driven budget allocation
3. **Email Marketing** - Klaviyo integration, automated flows, segmentation, AI copywriting
4. **Inventory Tracking** - Stock predictions, reorder alerts, multi-warehouse support
5. **Performance Dashboard** - Real-time metrics, ROAS tracking, custom reports (FREE with any plan)
6. **Workflow Automation** - Custom AI workflows, API integrations, data pipelines

Guidelines:
- Be specific about WHY each module is relevant based on their detected tech stack
- If they use Klaviyo, highlight the Email Marketing module
- If they use Meta Pixel/Google Ads, highlight Ad Management
- If they're on Shopify/WooCommerce, highlight the platform integration
- Recommend App for most e-commerce businesses, Enterprise for complex/large operations
- Keep the response concise (max 150 words)
- Use a confident, helpful tone
- Format: Start with the plan recommendation, then briefly explain why each relevant module matters for them`;

export async function POST(request: NextRequest) {
  const body = await request.json();
  const analysis: SiteAnalysis | undefined = body.analysis;
  const manual: ManualAnswers | undefined = body.manual;

  let userPrompt: string;

  if (analysis) {
    const techList = analysis.technologies
      .map((t) => `${t.name} (${t.category}, ${t.confidence} confidence)`)
      .join(", ");

    userPrompt = `Analyze this business and recommend a plan:
Site: ${analysis.url}
Title: ${analysis.title}
Description: ${analysis.description}
Detected technologies: ${techList || "None detected"}
Has e-commerce platform: ${analysis.hasEcommerce ? "Yes" : "No"}
Estimated scale: ${analysis.estimatedScale}`;
  } else if (manual) {
    userPrompt = `Recommend a plan based on these answers:
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
