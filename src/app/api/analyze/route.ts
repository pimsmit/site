import { NextRequest, NextResponse } from "next/server";
import { scrapeUrl, normalizeUrl } from "@/lib/scraper";
import { detectTechnologies } from "@/lib/tech-detector";
import type { SiteAnalysis } from "@/lib/analysis-types";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const rawUrl = body.url;

    if (!rawUrl || typeof rawUrl !== "string") {
      return NextResponse.json({ error: "URL is required" }, { status: 400 });
    }

    let url: string;
    try {
      url = normalizeUrl(rawUrl);
    } catch {
      return NextResponse.json({ error: "Invalid URL" }, { status: 400 });
    }

    const data = await scrapeUrl(url);
    const technologies = detectTechnologies(data);

    const hasEcommerce = technologies.some(
      (t) =>
        t.category === "platform" &&
        ["Shopify", "WooCommerce", "Magento", "BigCommerce", "PrestaShop"].includes(t.name)
    );

    const adCount = technologies.filter((t) => t.category === "ads").length;
    const emailCount = technologies.filter((t) => t.category === "email").length;
    const estimatedScale: SiteAnalysis["estimatedScale"] =
      adCount >= 2 || emailCount >= 1 ? "large" : hasEcommerce ? "medium" : "small";

    const analysis: SiteAnalysis = {
      url,
      title: data.title,
      description: data.description,
      technologies,
      hasEcommerce,
      estimatedScale,
    };

    return NextResponse.json({ analysis });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to analyze site";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
