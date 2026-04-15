import { NextRequest, NextResponse } from "next/server";

/**
 * Pricing matrix — market-rate estimates at €50/hr
 * Each project type has base hours, and modifiers for complexity/timeline
 */

const BASE_HOURS: Record<string, { min: number; max: number; label: string }> = {
  "website-landing": { min: 8, max: 20, label: "Website / Landing page" },
  "webapp-dashboard": { min: 30, max: 80, label: "Web app / Dashboard" },
  "ai-chatbot": { min: 20, max: 60, label: "AI Integration / Chatbot" },
  "automation-workflow": { min: 15, max: 50, label: "Automation / Workflow" },
  "ecommerce": { min: 25, max: 70, label: "E-commerce" },
  "api-development": { min: 15, max: 45, label: "API Development" },
  "mobile-app": { min: 40, max: 120, label: "Mobile App" },
  "data-analytics": { min: 20, max: 60, label: "Data & Analytics" },
  "other": { min: 10, max: 40, label: "Other" },
};

// Complexity multipliers based on feature count / description length heuristic
const COMPLEXITY_TIERS = [
  { maxChars: 150, multiplier: 0.8, label: "Simple" },
  { maxChars: 350, multiplier: 1.0, label: "Standard" },
  { maxChars: 600, multiplier: 1.2, label: "Detailed" },
  { maxChars: Infinity, multiplier: 1.5, label: "Complex" },
];

// Rush fee multipliers
const TIMELINE_MULTIPLIERS: Record<string, number> = {
  "asap": 1.5,
  "1-2-weeks": 1.25,
  "2-4-weeks": 1.0,
  "1-2-months": 0.95,
  "flexible": 0.9,
};

const HOURLY_RATE = 50; // EUR
const MARGIN = 0.30; // 30% margin

interface EstimateRequest {
  projectType: string;
  description: string;
  timeline: string;
  features?: string[];
}

export async function POST(req: NextRequest) {
  try {
    const body: EstimateRequest = await req.json();

    const base = BASE_HOURS[body.projectType];
    if (!base) {
      return NextResponse.json(
        { error: "Unknown project type" },
        { status: 400 }
      );
    }

    // Determine complexity from description length
    const descLen = (body.description || "").trim().length;
    const complexity =
      COMPLEXITY_TIERS.find((t) => descLen <= t.maxChars) ||
      COMPLEXITY_TIERS[COMPLEXITY_TIERS.length - 1];

    // Timeline multiplier
    const timelineMult = TIMELINE_MULTIPLIERS[body.timeline] || 1.0;

    // Calculate hours
    const avgHours = (base.min + base.max) / 2;
    const adjustedHours = Math.ceil(avgHours * complexity.multiplier * timelineMult);

    // Calculate costs
    const baseCost = adjustedHours * HOURLY_RATE;
    const totalCost = Math.ceil(baseCost * (1 + MARGIN));

    // Round to nearest 50
    const roundedTotal = Math.ceil(totalCost / 50) * 50;

    // Estimated delivery
    const deliveryDays = Math.ceil(adjustedHours / 6); // ~6 productive hours/day

    return NextResponse.json({
      estimate: {
        hours: adjustedHours,
        hourlyRate: HOURLY_RATE,
        complexity: complexity.label,
        timelineMultiplier: timelineMult,
        baseCost,
        margin: MARGIN,
        total: roundedTotal,
        deliveryDays,
        projectType: base.label,
      },
    });
  } catch {
    return NextResponse.json(
      { error: "Invalid request" },
      { status: 400 }
    );
  }
}
