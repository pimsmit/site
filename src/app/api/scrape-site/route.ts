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

    // Tech detection — only flag when we find DEFINITIVE proof (CDN domains, script paths, meta tags)
    // Never match on just the word appearing in body text
    const techSignals: string[] = [];

    // E-commerce platforms — check CDN/script URLs, not just keyword
    if (/cdn\.shopify\.com|Shopify\.theme|Shopify\.shop|shopify-section/i.test(html)) techSignals.push("Shopify");
    if (/wp-content\/plugins\/woocommerce|woocommerce-product|is-woocommerce/i.test(html)) techSignals.push("WooCommerce");
    if (/wp-content\/|wp-includes\/|wordpress\.org/i.test(html) && !/woocommerce/i.test(html)) techSignals.push("WordPress");
    if (/static\d*\.squarespace\.com|squarespace-cdn/i.test(html)) techSignals.push("Squarespace");
    if (/static\.parastorage\.com|wix-code-sdk|X-Wix-/i.test(html)) techSignals.push("Wix");
    if (/bigcommerce\.com\/assets|data-bigcommerce/i.test(html)) techSignals.push("BigCommerce");
    if (/\/static\/version\d|Magento_|mage\/requirejs/i.test(html)) techSignals.push("Magento");

    // Frameworks — check build artifacts
    if (/_next\/static|__NEXT_DATA__/i.test(html)) techSignals.push("Next.js");

    // Marketing/email — check embedded script tags with specific domains
    if (/static\.klaviyo\.com|a\.]klaviyo\.com|\.klaviyo\.js/i.test(html)) techSignals.push("Klaviyo");
    if (/cdn-images\.mailchimp\.com|list-manage\.com|mc\.us\d+\.list-manage/i.test(html)) techSignals.push("Mailchimp");

    // Analytics — check actual tracking scripts
    if (/googletagmanager\.com|google-analytics\.com\/analytics|gtag\(|GoogleAnalyticsObject/i.test(html)) techSignals.push("Google Analytics");
    if (/static\.hotjar\.com|hj\('init'/i.test(html)) techSignals.push("Hotjar");

    // Support — check widget script sources
    if (/static\.zdassets\.com|zopim|zendesk\.com\/embeddable/i.test(html)) techSignals.push("Zendesk");
    if (/widget\.intercom\.io|intercomSettings/i.test(html)) techSignals.push("Intercom");
    if (/code\.tidio\.co|tidioChatApi/i.test(html)) techSignals.push("Tidio");
    if (/client\.crisp\.chat|\$crisp/i.test(html)) techSignals.push("Crisp");

    // Payments — check script/SDK loads
    if (/js\.stripe\.com|Stripe\(/i.test(html)) techSignals.push("Stripe");
    if (/connect\.facebook\.net.*fbevents|fbq\(|_fbq/i.test(html)) techSignals.push("Meta Pixel");
    if (/analytics\.tiktok\.com|ttq\.load/i.test(html)) techSignals.push("TikTok Pixel");
    if (/js\.hs-scripts\.com|js\.hs-analytics\.net|hbspt\./i.test(html)) techSignals.push("HubSpot");
    if (/paypal\.com\/sdk|paypalobjects\.com/i.test(html)) techSignals.push("PayPal");
    if (/js\.mollie\.com/i.test(html)) techSignals.push("Mollie");
    if (/www\.google\.com\/recaptcha|grecaptcha/i.test(html)) techSignals.push("reCAPTCHA");

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
