import * as cheerio from "cheerio";

export interface ProductInfo {
  count: number;
  sampleNames: string[];
  priceRange: { min: number; max: number } | null;
  currency: string;
}

export interface ScrapedData {
  title: string;
  description: string;
  html: string;
  scripts: string[];
  links: string[];
  metas: Record<string, string>;
  products: ProductInfo;
  faqItems: string[];
  pageLinks: string[];
  socialLinks: Record<string, string>;
  contactInfo: { email: string | null; phone: string | null };
  bodyText: string;
}

export async function scrapeUrl(url: string): Promise<ScrapedData> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 8000);

  try {
    const response = await fetch(url, {
      signal: controller.signal,
      headers: {
        "User-Agent":
          "Mozilla/5.0 (compatible; AinomiqBot/1.0; +https://ainomiq.com)",
        Accept: "text/html,application/xhtml+xml",
      },
      redirect: "follow",
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    const html = await response.text();
    const $ = cheerio.load(html);

    const title = $("title").first().text().trim();
    const description =
      $('meta[name="description"]').attr("content")?.trim() ?? "";

    const scripts: string[] = [];
    $("script[src]").each((_, el) => {
      const src = $(el).attr("src");
      if (src) scripts.push(src);
    });
    $("script:not([src])").each((_, el) => {
      const text = $(el).text();
      if (text.length > 0 && text.length < 10000) {
        scripts.push(text);
      }
    });

    const links: string[] = [];
    $('link[href], script[src], img[src], a[href]').each((_, el) => {
      const href =
        $(el).attr("href") || $(el).attr("src");
      if (href) links.push(href);
    });

    const metas: Record<string, string> = {};
    $("meta").each((_, el) => {
      const name =
        $(el).attr("name") || $(el).attr("property") || "";
      const content = $(el).attr("content") || "";
      if (name && content) {
        metas[name.toLowerCase()] = content;
      }
    });

    // Extract products
    const prices: number[] = [];
    const productNames: string[] = [];
    // Common product selectors
    $('[class*="product"] h2, [class*="product"] h3, [class*="product-title"], [class*="product-name"], .product-card h2, .product-card h3').each((_, el) => {
      const name = $(el).text().trim();
      if (name && name.length < 100 && productNames.length < 20) {
        productNames.push(name);
      }
    });
    // Price detection
    const priceRegex = /(?:€|EUR|\$|USD|£|GBP)\s*(\d+[.,]\d{2})/g;
    const bodyText = $("body").text();
    let priceMatch;
    while ((priceMatch = priceRegex.exec(bodyText)) !== null && prices.length < 50) {
      const price = parseFloat(priceMatch[1].replace(",", "."));
      if (price > 0 && price < 100000) prices.push(price);
    }
    // Currency detection
    let currency = "EUR";
    if (bodyText.includes("$") || bodyText.includes("USD")) currency = "USD";
    if (bodyText.includes("£") || bodyText.includes("GBP")) currency = "GBP";
    if (bodyText.includes("€") || bodyText.includes("EUR")) currency = "EUR";

    const products: ProductInfo = {
      count: productNames.length || (prices.length > 3 ? prices.length : 0),
      sampleNames: productNames.slice(0, 10),
      priceRange: prices.length >= 2
        ? { min: Math.min(...prices), max: Math.max(...prices) }
        : null,
      currency,
    };

    // Extract FAQ
    const faqItems: string[] = [];
    $('[class*="faq"] h3, [class*="faq"] h4, [class*="accordion"] h3, [class*="accordion"] button, details summary, [itemtype*="FAQPage"] [itemprop="name"]').each((_, el) => {
      const q = $(el).text().trim();
      if (q && q.length > 10 && q.length < 200 && faqItems.length < 15) {
        faqItems.push(q);
      }
    });

    // Extract page links (internal navigation)
    const pageLinks: string[] = [];
    const seen = new Set<string>();
    $("a[href]").each((_, el) => {
      const href = $(el).attr("href") || "";
      if (href.startsWith("/") && !href.startsWith("//") && !seen.has(href)) {
        seen.add(href);
        pageLinks.push(href);
      }
    });

    // Social links
    const socialLinks: Record<string, string> = {};
    const socialPatterns: Record<string, RegExp> = {
      instagram: /instagram\.com/,
      facebook: /facebook\.com/,
      tiktok: /tiktok\.com/,
      twitter: /twitter\.com|x\.com/,
      linkedin: /linkedin\.com/,
      youtube: /youtube\.com/,
      pinterest: /pinterest\.com/,
    };
    $("a[href]").each((_, el) => {
      const href = $(el).attr("href") || "";
      for (const [platform, pattern] of Object.entries(socialPatterns)) {
        if (pattern.test(href) && !socialLinks[platform]) {
          socialLinks[platform] = href;
        }
      }
    });

    // Contact info
    const emailMatch = bodyText.match(/[\w.-]+@[\w.-]+\.\w{2,}/);
    const phoneMatch = bodyText.match(/(?:\+\d{1,3}[-.\s]?)?\(?\d{2,4}\)?[-.\s]?\d{3,4}[-.\s]?\d{3,4}/);

    const contactInfo = {
      email: emailMatch ? emailMatch[0] : null,
      phone: phoneMatch ? phoneMatch[0].trim() : null,
    };

    // Truncated body text for AI analysis
    const cleanText = bodyText.replace(/\s+/g, " ").trim().slice(0, 3000);

    return { title, description, html, scripts, links, metas, products, faqItems, pageLinks, socialLinks, contactInfo, bodyText: cleanText };
  } finally {
    clearTimeout(timeout);
  }
}

export function normalizeUrl(input: string): string {
  let url = input.trim();
  if (!url.startsWith("http://") && !url.startsWith("https://")) {
    url = "https://" + url;
  }
  try {
    return new URL(url).toString();
  } catch {
    throw new Error("Invalid URL");
  }
}
