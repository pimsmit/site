export interface TechDetection {
  name: string;
  category: "platform" | "email" | "ads" | "analytics" | "other";
  confidence: "high" | "medium" | "low";
}

export interface ScrapedProduct {
  name: string;
  price: string | null;
  image: string | null;
  url: string | null;
}

export interface SiteAnalysis {
  url: string;
  title: string;
  description: string;
  favicon: string | null;
  technologies: TechDetection[];
  hasEcommerce: boolean;
  estimatedScale: "small" | "medium" | "large";
  products: ScrapedProduct[];
  priceRange: { min: number; max: number } | null;
  currency: string;
  faqItems: string[];
  pageCount: number;
  pageLinks: string[];
  socialPresence: string[];
  socialLinks: Record<string, string>;
  contactEmail: string | null;
  contactPhone: string | null;
  bodyTextSummary: string;
}

export interface ServiceRecommendation {
  id: string;
  name: string;
  savingsPercent: number;
  description: string;
  relevance: "high" | "medium" | "low";
}

export interface ManualAnswers {
  businessType: "ecommerce" | "service";
  platform?: string;
  orderVolume?: string;
  industry?: string;
  teamSize?: string;
  description?: string;
  tools: string[];
}
