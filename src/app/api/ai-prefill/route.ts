import { NextRequest, NextResponse } from "next/server";
import { generateText } from "ai";
import { openai } from "@ai-sdk/openai";

const PROJECT_TYPE_IDS = [
  "simple-automation",
  "website",
  "chatbot",
  "chatbot-basic",
  "chatbot-standard",
  "chatbot-advanced",
  "chatbot-enterprise",
  "dashboard",
  "webshop",
  "mobile-app",
  "enterprise",
];

const TIMELINE_IDS = ["asap", "1-2-weeks", "2-4-weeks", "1-2-months", "flexible"];

// Feature keys that map to prices in the estimate API
const FEATURE_KEYS = [
  "payment", "login", "admin", "rbac", "email-notifs", "sms-push", "search",
  "file-uploads-basic", "file-uploads-large", "analytics", "booking",
  "multilang-small", "multilang-large", "chat", "ai-chatbot-basic",
  "rag", "custom-ai-agent", "api-external", "realtime", "saas",
];

// Integration keys that map to prices in the estimate API
const INTEGRATION_KEYS = [
  "shopify", "magento", "klaviyo", "meta", "google", "hubspot",
  "salesforce", "erp", "marketplace", "whatsapp", "custom-api",
];

interface SiteData {
  url: string;
  title: string;
  metaDescription: string;
  tech: string[];
  colors: string[];
  language: string;
  bodyPreview: string;
}

const SYSTEM_PROMPT = `You help clients fill in a project request form for Ainomiq, an AI automation agency.

## Pricing config (exact — use this to classify and select features)

### Base prices per project type:
- simple-automation: €2,500 — scrapers, data pipelines, file parsers (Excel/CSV/PDF), translation scripts, Zapier-like workflows, image processing, email automations, scheduled jobs
- website: €5,000 — marketing sites, landing pages, portfolios (no backend logic)
- chatbot-basic: €3,500 — simple embedded website chatbot, FAQ/product info only, text-only, no voice, no hardware, no staff training. Example: product FAQ bot for a webshop
- chatbot-standard: €7,500 — chatbot with integrations (CRM/Shopify/email), multi-channel (web+email), basic knowledge base. Example: customer service bot that checks orders
- chatbot-advanced: €12,500 — RAG/knowledge base, complex integrations, multi-language, learns from data. Example: smart support bot with full knowledge base
- chatbot-enterprise: €18,000 — voice capability, hardware deployment, staff training, complex multi-system integrations. Example: Domino's staff training bot with voice + hardware
- dashboard: €7,500 — admin panels, data portals, internal tools with user management
- webshop: €15,000 — full e-commerce with catalog, cart, checkout, order management
- mobile-app: €20,000 — native iOS/Android apps
- enterprise: €25,000 — multi-tenant SaaS, full system replacements, 6+ month projects

### Feature add-ons (only include if genuinely needed):
- payment: €750 — Stripe/Mollie/iDEAL payment processing
- login: €750 — user accounts, authentication
- admin: €1,500 — admin panel / backoffice
- rbac: €1,000 — role-based access control
- email-notifs: €500 — transactional email notifications
- sms-push: €500 — SMS or push notifications
- search: €500 — search & filtering
- file-uploads-basic: €400 — basic file/image uploads
- file-uploads-large: €1,400 — video/large file uploads, S3/CDN
- analytics: €1,500 — analytics dashboard, charts, reporting
- booking: €2,000 — booking/scheduling/calendar
- multilang-small: €750 — 2-3 languages
- multilang-large: €1,500 — 4+ languages
- chat: €1,500 — real-time messaging/chat
- ai-chatbot-basic: €2,500 — basic AI chatbot feature
- rag: €5,000 — RAG / knowledge base / vector search
- custom-ai-agent: €7,500 — custom autonomous AI agent
- api-external: €2,000 — public API for third parties (with docs, auth, versioning)
- realtime: €1,500 — real-time/websockets/live data
- saas: €7,500 — multi-tenant / SaaS architecture

### Integration add-ons (only include if explicitly mentioned):
- shopify: €1,000
- magento: €1,500 (also WooCommerce)
- klaviyo: €300 (also Mailchimp, Sendgrid)
- meta: €500 (Facebook, Instagram API, TikTok)
- google: €400 (Google Ads, GA4, GTM)
- hubspot: €750
- salesforce: €2,500
- erp: €2,500 (Exact, Twinfield, SAP)
- marketplace: €1,000 (Bol.com, Amazon, Etsy)
- whatsapp: €500 (also Slack, Teams)
- custom-api: €1,500 (custom API connection, webhook, Zapier, Make.com)

### Timeline surcharges:
- asap: +25%
- 1-2-weeks: +15%
- 2-4-weeks: 0% (standard)
- 1-2-months: 0%
- flexible: 0%

### Delivery time by project type + complexity:
- simple-automation, no complex features: 1-2 weeks
- simple-automation with integrations: 2-3 weeks
- website: 2-3 weeks
- chatbot: 3-5 weeks
- dashboard: 3-5 weeks
- webshop: 4-6 weeks
- mobile-app: 6-10 weeks
- enterprise: 8-16 weeks

## CRITICAL classification rules:

**DO NOT over-classify:**
- A web scraper → simple-automation (even if it processes 10,000 items/day)
- An Excel/CSV processor → simple-automation
- A translation pipeline → simple-automation
- An Amazon product scraper → simple-automation (Amazon as data source ≠ "marketplace integration")
- A PDF reader/extractor → simple-automation
- An image processing script → simple-automation

**Integrations: ONLY add if the client explicitly mentions connecting TO that platform:**
- "scrape Amazon" → NO marketplace integration (Amazon is the data source, not an integration)
- "sync orders with Shopify" → YES shopify integration
- "send emails via Klaviyo" → YES klaviyo integration
- "export to Excel" → NO integration needed (just file-uploads-basic at most, usually nothing)

**Features: be conservative. A simple scraper needs ZERO features from the list.**

## Output format (JSON only, no markdown):
{
  "projectType": "<id>",
  "description": "<English brief, 80-150 words, bullet points, specific, no questions>",
  "timeline": "<id>",
  "targetAudience": "<5-15 words in English or empty string>",
  "needsCredentials": <boolean>,
  "features": ["<feature-key>", ...],  // only keys from the feature list above, only if genuinely needed
  "integrations": ["<integration-key>", ...],  // only keys from integration list, only if explicitly mentioned
  "recommendations": ["<short suggestion>", "<short suggestion>"]  // 2-3 actionable tips
}`;

export async function POST(request: NextRequest) {
  try {
    const { input, siteData } = (await request.json()) as {
      input: string;
      siteData?: SiteData;
    };

    if (!input || input.trim().length < 3) {
      return NextResponse.json({ error: "Too short" }, { status: 400 });
    }

    let siteContext = "";
    if (siteData) {
      siteContext = `\n\nClient website analysis:
- URL: ${siteData.url}
- Title: ${siteData.title}
- Tech stack: ${siteData.tech.join(", ") || "unknown"}
- Content: ${siteData.bodyPreview.slice(0, 500)}

Use this to tailor the description to their actual business. Only add integrations that match their existing platforms.`;
    }

    const { text } = await generateText({
      model: openai("gpt-4o-mini"),
      system: SYSTEM_PROMPT + siteContext,
      prompt: input,
      maxOutputTokens: 900,
    });

    try {
      const cleaned = text.trim().replace(/^```json\s*/i, "").replace(/```\s*$/, "").trim();
      const parsed = JSON.parse(cleaned);

      if (!PROJECT_TYPE_IDS.includes(parsed.projectType)) {
        parsed.projectType = "simple-automation";
      }
      if (!TIMELINE_IDS.includes(parsed.timeline)) {
        parsed.timeline = "2-4-weeks";
      }
      if (!Array.isArray(parsed.recommendations)) {
        parsed.recommendations = [];
      }
      // Validate feature/integration keys
      if (Array.isArray(parsed.features)) {
        parsed.features = parsed.features.filter((f: string) => FEATURE_KEYS.includes(f));
      } else {
        parsed.features = [];
      }
      if (Array.isArray(parsed.integrations)) {
        parsed.integrations = parsed.integrations.filter((i: string) => INTEGRATION_KEYS.includes(i));
      } else {
        parsed.integrations = [];
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
