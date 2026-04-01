import * as cheerio from "cheerio";

export interface ScrapedData {
  title: string;
  description: string;
  html: string;
  scripts: string[];
  links: string[];
  metas: Record<string, string>;
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

    return { title, description, html, scripts, links, metas };
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
