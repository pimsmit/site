import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { url } = (await request.json()) as { url: string };

    if (!url || url.trim().length < 4) {
      return NextResponse.json({ error: "No URL" }, { status: 400 });
    }

    let normalizedUrl = url.trim();
    if (!normalizedUrl.startsWith("http")) {
      normalizedUrl = "https://" + normalizedUrl;
    }

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 8000);

    let html: string;
    try {
      const res = await fetch(normalizedUrl, {
        signal: controller.signal,
        headers: {
          "User-Agent": "Mozilla/5.0 (compatible; AinomiqBot/1.0)",
          Accept: "text/html",
        },
      });
      clearTimeout(timeout);
      if (!res.ok) {
        return NextResponse.json({ error: "Could not reach site" }, { status: 400 });
      }
      html = await res.text();
    } catch {
      clearTimeout(timeout);
      return NextResponse.json({ error: "Could not reach site" }, { status: 400 });
    }

    const title = (html.match(/<title[^>]*>([^<]*)<\/title>/i) || [])[1]?.trim() || "";
    const metaDesc =
      (html.match(/<meta[^>]*name=["']description["'][^>]*content=["']([^"']*)["']/i) || [])[1]?.trim() || "";
    const ogImage =
      (html.match(/<meta[^>]*property=["']og:image["'][^>]*content=["']([^"']*)["']/i) || [])[1]?.trim() || "";

    const techSignals: string[] = [];
    if (/shopify/i.test(html)) techSignals.push("Shopify");
    if (/woocommerce/i.test(html)) techSignals.push("WooCommerce");
    if (/wordpress/i.test(html)) techSignals.push("WordPress");
    if (/squarespace/i.test(html)) techSignals.push("Squarespace");
    if (/wix\.com/i.test(html)) techSignals.push("Wix");
    if (/bigcommerce/i.test(html)) techSignals.push("BigCommerce");
    if (/magento/i.test(html)) techSignals.push("Magento");
    if (/_next|__next/i.test(html)) techSignals.push("Next.js");
    if (/klaviyo/i.test(html)) techSignals.push("Klaviyo");
    if (/mailchimp/i.test(html)) techSignals.push("Mailchimp");
    if (/google-analytics|gtag|GA4/i.test(html)) techSignals.push("Google Analytics");
    if (/hotjar/i.test(html)) techSignals.push("Hotjar");
    if (/zendesk/i.test(html)) techSignals.push("Zendesk");
    if (/intercom/i.test(html)) techSignals.push("Intercom");
    if (/tidio/i.test(html)) techSignals.push("Tidio");
    if (/crisp/i.test(html)) techSignals.push("Crisp");
    if (/stripe/i.test(html)) techSignals.push("Stripe");
    if (/facebook.*pixel|fbq\(/i.test(html)) techSignals.push("Meta Pixel");
    if (/tiktok.*pixel/i.test(html)) techSignals.push("TikTok Pixel");

    // Extract visible text
    const bodyMatch = (html.match(/<body[^>]*>([\s\S]*?)<\/body>/i) || [])[1] || "";
    const visibleText = bodyMatch
      .replace(/<script[\s\S]*?<\/script>/gi, "")
      .replace(/<style[\s\S]*?<\/style>/gi, "")
      .replace(/<[^>]+>/g, " ")
      .replace(/\s+/g, " ")
      .trim()
      .slice(0, 2000);

    const colorMatches = html.match(/#[0-9a-fA-F]{3,8}/g) || [];
    const uniqueColors = [...new Set(colorMatches)].slice(0, 10);

    const htmlLang = (html.match(/<html[^>]*lang=["']([^"']+)["']/i) || [])[1] || "";

    return NextResponse.json({
      url: normalizedUrl,
      title,
      metaDescription: metaDesc,
      ogImage,
      tech: techSignals,
      colors: uniqueColors,
      language: htmlLang,
      bodyPreview: visibleText,
    });
  } catch (error) {
    console.error("Scrape error:", error);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}
