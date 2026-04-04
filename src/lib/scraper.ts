import * as cheerio from "cheerio";

export interface ScrapedProduct {
  name: string;
  price: string | null;
  image: string | null;
  url: string | null;
}

export interface ScrapedData {
  title: string;
  description: string;
  html: string;
  scripts: string[];
  links: string[];
  metas: Record<string, string>;
  products: ScrapedProduct[];
  priceRange: { min: number; max: number } | null;
  currency: string;
  faqItems: string[];
  pageLinks: string[];
  socialLinks: Record<string, string>;
  contactInfo: { email: string | null; phone: string | null };
  bodyText: string;
}

function resolveUrl(base: string, path: string): string {
  try {
    return new URL(path, base).toString();
  } catch {
    return path;
  }
}

export async function scrapeUrl(url: string): Promise<ScrapedData> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 10000);

  try {
    const response = await fetch(url, {
      signal: controller.signal,
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36",
        Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
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
    $("link[href], script[src], img[src], a[href]").each((_, el) => {
      const href = $(el).attr("href") || $(el).attr("src");
      if (href) links.push(href);
    });

    const metas: Record<string, string> = {};
    $("meta").each((_, el) => {
      const name = $(el).attr("name") || $(el).attr("property") || "";
      const content = $(el).attr("content") || "";
      if (name && content) {
        metas[name.toLowerCase()] = content;
      }
    });

    // --- Product extraction ---
    const products: ScrapedProduct[] = [];
    const seenNames = new Set<string>();

    // 1. JSON-LD structured data (most reliable)
    $('script[type="application/ld+json"]').each((_, el) => {
      try {
        const data = JSON.parse($(el).text());
        const items = Array.isArray(data) ? data : [data];
        for (const item of items) {
          // Handle @graph arrays
          const entries = item["@graph"] ? item["@graph"] : [item];
          for (const entry of entries) {
            if (
              entry["@type"] === "Product" ||
              entry["@type"]?.includes?.("Product")
            ) {
              const name = entry.name?.trim();
              if (name && !seenNames.has(name.toLowerCase())) {
                seenNames.add(name.toLowerCase());
                const offer = Array.isArray(entry.offers)
                  ? entry.offers[0]
                  : entry.offers;
                products.push({
                  name,
                  price: offer?.price
                    ? `${offer.priceCurrency || "EUR"} ${offer.price}`
                    : null,
                  image: Array.isArray(entry.image)
                    ? entry.image[0]
                    : entry.image || null,
                  url: entry.url || null,
                });
              }
            }
            // Product listing pages
            if (entry["@type"] === "ItemList" && entry.itemListElement) {
              for (const li of entry.itemListElement) {
                const prod = li.item || li;
                const name = prod.name?.trim();
                if (name && !seenNames.has(name.toLowerCase())) {
                  seenNames.add(name.toLowerCase());
                  products.push({
                    name,
                    price: null,
                    image: Array.isArray(prod.image)
                      ? prod.image[0]
                      : prod.image || null,
                    url: prod.url || null,
                  });
                }
              }
            }
          }
        }
      } catch {
        // skip invalid JSON-LD
      }
    });

    // 2. Shopify-specific: product cards
    $(
      '.product-card, [class*="ProductCard"], [class*="product-item"], [class*="product-grid"] > *, .collection-product-card'
    ).each((_, el) => {
      if (products.length >= 30) return;
      const $el = $(el);
      const name = (
        $el.find("h2, h3, [class*='title'], [class*='name']").first().text() ||
        $el.find("a").first().attr("title") ||
        ""
      ).trim();
      if (!name || name.length > 120 || seenNames.has(name.toLowerCase())) return;
      seenNames.add(name.toLowerCase());

      const imgSrc =
        $el.find("img").first().attr("src") ||
        $el.find("img").first().attr("data-src") ||
        null;
      const linkHref = $el.find("a").first().attr("href") || null;
      const priceText =
        $el.find('[class*="price"], [class*="Price"]').first().text().trim() || null;

      products.push({
        name,
        price: priceText,
        image: imgSrc ? resolveUrl(url, imgSrc) : null,
        url: linkHref ? resolveUrl(url, linkHref) : null,
      });
    });

    // 3. Generic product patterns (fallback from HTML)
    if (products.length === 0) {
      $(
        '[data-product], [data-product-id], [class*="product"][class*="card"], [class*="product"][class*="item"]'
      ).each((_, el) => {
        if (products.length >= 30) return;
        const $el = $(el);
        const name = (
          $el.find("h2, h3, h4, [class*='title'], [class*='name']").first().text() ||
          ""
        ).trim();
        if (!name || name.length > 120 || seenNames.has(name.toLowerCase())) return;
        seenNames.add(name.toLowerCase());

        const imgSrc =
          $el.find("img").first().attr("src") ||
          $el.find("img").first().attr("data-src") ||
          null;
        const linkHref = $el.find("a").first().attr("href") || null;
        const priceText =
          $el.find('[class*="price"]').first().text().trim() || null;

        products.push({
          name,
          price: priceText,
          image: imgSrc ? resolveUrl(url, imgSrc) : null,
          url: linkHref ? resolveUrl(url, linkHref) : null,
        });
      });
    }

    // 4. Shopify /products.json API (most e-commerce sites use JS rendering so HTML selectors miss products)
    if (products.length < 5) {
      try {
        const baseUrl = new URL(url).origin;
        const shopifyRes = await fetch(`${baseUrl}/products.json?limit=30`, {
          signal: AbortSignal.timeout(5000),
          headers: {
            "User-Agent":
              "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36",
            Accept: "application/json",
          },
        });
        if (shopifyRes.ok) {
          const json = await shopifyRes.json();
          if (json.products && Array.isArray(json.products)) {
            for (const p of json.products) {
              if (products.length >= 30) break;
              const name = p.title?.trim();
              if (!name || seenNames.has(name.toLowerCase())) continue;
              seenNames.add(name.toLowerCase());

              const variant = p.variants?.[0];
              const price = variant?.price
                ? `${variant.price}`
                : null;
              const image = p.images?.[0]?.src || p.image?.src || null;

              products.push({
                name,
                price,
                image,
                url: `${baseUrl}/products/${p.handle}`,
              });
            }
          }
        }
      } catch {
        // Not a Shopify store or endpoint unavailable — ignore
      }
    }

    // 5. WooCommerce Store API (fallback for WordPress stores)
    if (products.length < 5) {
      try {
        const baseUrl = new URL(url).origin;
        const wooRes = await fetch(`${baseUrl}/wp-json/wc/store/products?per_page=30`, {
          signal: AbortSignal.timeout(5000),
          headers: {
            "User-Agent":
              "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36",
            Accept: "application/json",
          },
        });
        if (wooRes.ok) {
          const wooProducts = await wooRes.json();
          if (Array.isArray(wooProducts)) {
            for (const p of wooProducts) {
              if (products.length >= 30) break;
              const name = p.name?.trim();
              if (!name || seenNames.has(name.toLowerCase())) continue;
              seenNames.add(name.toLowerCase());

              const price = p.prices?.price
                ? `${(parseInt(p.prices.price, 10) / 100).toFixed(2)}`
                : null;
              const image = p.images?.[0]?.src || null;

              products.push({
                name,
                price,
                image,
                url: p.permalink || null,
              });
            }
          }
        }
      } catch {
        // Not a WooCommerce store — ignore
      }
    }

    // Price range from all detected prices
    const allPrices: number[] = [];
    const priceRegex = /(?:€|EUR|\$|USD|£|GBP)\s*(\d+[.,]\d{2})/g;
    const bodyText = $("body").text();
    let priceMatch;
    while ((priceMatch = priceRegex.exec(bodyText)) !== null && allPrices.length < 100) {
      const price = parseFloat(priceMatch[1].replace(",", "."));
      if (price > 0 && price < 100000) allPrices.push(price);
    }

    let currency = "EUR";
    if (bodyText.includes("$") || bodyText.includes("USD")) currency = "USD";
    if (bodyText.includes("£") || bodyText.includes("GBP")) currency = "GBP";
    if (bodyText.includes("€") || bodyText.includes("EUR")) currency = "EUR";

    // Extract FAQ
    const faqItems: string[] = [];
    $('[class*="faq"] h3, [class*="faq"] h4, [class*="faq"] summary, [class*="accordion"] h3, [class*="accordion"] button, [class*="accordion"] summary, details summary, [itemtype*="FAQPage"] [itemprop="name"], [class*="question"]').each(
      (_, el) => {
        const q = $(el).text().trim();
        if (q && q.length > 10 && q.length < 200 && faqItems.length < 20) {
          faqItems.push(q);
        }
      }
    );

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
    const phoneMatch = bodyText.match(
      /(?:\+\d{1,3}[-.\s]?)?\(?\d{2,4}\)?[-.\s]?\d{3,4}[-.\s]?\d{3,4}/
    );

    const contactInfo = {
      email: emailMatch ? emailMatch[0] : null,
      phone: phoneMatch ? phoneMatch[0].trim() : null,
    };

    // Truncated body text for AI analysis
    const cleanText = bodyText.replace(/\s+/g, " ").trim().slice(0, 4000);

    return {
      title,
      description,
      html,
      scripts,
      links,
      metas,
      products,
      priceRange:
        allPrices.length >= 2
          ? { min: Math.min(...allPrices), max: Math.max(...allPrices) }
          : null,
      currency,
      faqItems,
      pageLinks,
      socialLinks,
      contactInfo,
      bodyText: cleanText,
    };
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
