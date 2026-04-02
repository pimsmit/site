export interface TechDetection {
  name: string;
  category: "platform" | "email" | "ads" | "analytics" | "other";
  confidence: "high" | "medium" | "low";
}

export interface SiteAnalysis {
  url: string;
  title: string;
  description: string;
  technologies: TechDetection[];
  hasEcommerce: boolean;
  estimatedScale: "small" | "medium" | "large";
  productCount: number;
  sampleProducts: string[];
  priceRange: { min: number; max: number } | null;
  currency: string;
  faqItems: string[];
  pageCount: number;
  socialPresence: string[];
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
  platform: string;
  orderVolume: string;
  tools: string[];
}
