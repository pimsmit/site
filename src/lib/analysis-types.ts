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
}

export interface ModuleRecommendation {
  id: string;
  name: string;
  icon: string;
  description: string;
  relevance: "high" | "medium" | "low";
}

export interface ManualAnswers {
  platform: string;
  orderVolume: string;
  tools: string[];
}
