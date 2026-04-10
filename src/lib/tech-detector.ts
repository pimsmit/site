import type { ScrapedData } from "./scraper";
import type { TechDetection } from "./analysis-types";

interface DetectionRule {
  name: string;
  category: TechDetection["category"];
  patterns: {
    scripts?: RegExp[];
    links?: RegExp[];
    html?: RegExp[];
    metas?: { key: string; pattern: RegExp }[];
  };
}

const rules: DetectionRule[] = [
  // Platforms
  {
    name: "Shopify",
    category: "platform",
    patterns: {
      scripts: [/cdn\.shopify\.com/, /shopify\.com\/s\/files/],
      links: [/cdn\.shopify\.com/],
      html: [/Shopify\.theme/, /shopify-section/],
      metas: [{ key: "generator", pattern: /shopify/i }],
    },
  },
  {
    name: "WooCommerce",
    category: "platform",
    patterns: {
      scripts: [/woocommerce/, /wc-cart/],
      links: [/woocommerce/],
      html: [/woocommerce/, /wc-block/],
      metas: [{ key: "generator", pattern: /woocommerce/i }],
    },
  },
  {
    name: "Magento",
    category: "platform",
    patterns: {
      scripts: [/\/mage\//, /magento/, /requirejs-config/],
      html: [/data-mage-init/, /magento-init/, /Mage\.Cookies/],
      metas: [{ key: "generator", pattern: /magento/i }],
    },
  },
  {
    name: "WordPress",
    category: "platform",
    patterns: {
      scripts: [/wp-content/, /wp-includes/],
      links: [/wp-content/, /wp-includes/],
      html: [/wp-content/],
      metas: [{ key: "generator", pattern: /wordpress/i }],
    },
  },
  {
    name: "BigCommerce",
    category: "platform",
    patterns: {
      scripts: [/bigcommerce\.com/, /cdn11\.bigcommerce/],
      html: [/bigcommerce/i],
    },
  },
  {
    name: "PrestaShop",
    category: "platform",
    patterns: {
      scripts: [/prestashop/i],
      metas: [{ key: "generator", pattern: /prestashop/i }],
    },
  },

  // Email marketing
  {
    name: "Klaviyo",
    category: "email",
    patterns: {
      scripts: [/klaviyo\.com/, /static\.klaviyo/],
      html: [/klaviyo/i],
    },
  },
  {
    name: "Mailchimp",
    category: "email",
    patterns: {
      scripts: [/mailchimp\.com/, /chimpstatic\.com/, /mc\.us\d+\.list-manage/],
      html: [/mailchimp/i],
    },
  },
  {
    name: "Brevo",
    category: "email",
    patterns: {
      scripts: [/brevo\.com/, /sendinblue\.com/],
      html: [/brevo|sendinblue/i],
    },
  },
  {
    name: "ActiveCampaign",
    category: "email",
    patterns: {
      scripts: [/activecampaign\.com/, /trackcmp\.net/],
    },
  },

  // Ads
  {
    name: "Meta Pixel",
    category: "ads",
    patterns: {
      scripts: [/connect\.facebook\.net/, /fbevents\.js/, /fbq\(/],
      html: [/facebook\.com\/tr/, /fbq\(/],
    },
  },
  {
    name: "Google Ads",
    category: "ads",
    patterns: {
      scripts: [/googleads\.g\.doubleclick/, /google_tag/, /gtag.*AW-/],
      html: [/AW-\d+/],
    },
  },
  {
    name: "TikTok Pixel",
    category: "ads",
    patterns: {
      scripts: [/analytics\.tiktok\.com/, /ttq\.load/],
      html: [/ttq\./],
    },
  },
  {
    name: "Snapchat Pixel",
    category: "ads",
    patterns: {
      scripts: [/sc-static\.net\/scevent/, /snaptr\(/],
    },
  },

  // Analytics
  {
    name: "Google Analytics (GA4)",
    category: "analytics",
    patterns: {
      scripts: [
        /googletagmanager\.com\/gtag/,
        /google-analytics\.com/,
        /G-[A-Z0-9]+/,
      ],
      html: [/G-[A-Z0-9]{5,}/],
    },
  },
  {
    name: "Google Tag Manager",
    category: "analytics",
    patterns: {
      scripts: [/googletagmanager\.com\/gtm/],
      html: [/GTM-[A-Z0-9]+/],
    },
  },
  {
    name: "Hotjar",
    category: "analytics",
    patterns: {
      scripts: [/hotjar\.com/, /static\.hotjar/],
    },
  },
  {
    name: "Mixpanel",
    category: "analytics",
    patterns: {
      scripts: [/mixpanel\.com/, /cdn\.mxpnl\.com/],
    },
  },
];

export function detectTechnologies(data: ScrapedData): TechDetection[] {
  const detected: TechDetection[] = [];
  const allScriptText = data.scripts.join(" ");
  const allLinksText = data.links.join(" ");

  for (const rule of rules) {
    let matches = 0;
    let totalPatterns = 0;

    if (rule.patterns.scripts) {
      for (const pattern of rule.patterns.scripts) {
        totalPatterns++;
        if (pattern.test(allScriptText)) matches++;
      }
    }

    if (rule.patterns.links) {
      for (const pattern of rule.patterns.links) {
        totalPatterns++;
        if (pattern.test(allLinksText)) matches++;
      }
    }

    if (rule.patterns.html) {
      for (const pattern of rule.patterns.html) {
        totalPatterns++;
        if (pattern.test(data.html)) matches++;
      }
    }

    if (rule.patterns.metas) {
      for (const meta of rule.patterns.metas) {
        totalPatterns++;
        const value = data.metas[meta.key];
        if (value && meta.pattern.test(value)) matches++;
      }
    }

    if (matches > 0) {
      const ratio = matches / totalPatterns;
      detected.push({
        name: rule.name,
        category: rule.category,
        confidence: ratio >= 0.5 ? "high" : ratio >= 0.25 ? "medium" : "low",
      });
    }
  }

  return detected;
}
