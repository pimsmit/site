import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Section } from "@/components/section";
import { PlatformHero } from "@/components/ui/platform-hero";
import {
  Bot,
  BarChart3,
  Mail,
  Package,
  Gauge,
  Workflow,
  ArrowRight,
} from "lucide-react";

export const metadata: Metadata = {
  title: "App",
  description:
    "The Ainomiq AI app: six modules working together to automate your business.",
};

const modules = [
  {
    icon: Bot,
    title: "AI Customer Service",
    description:
      "An intelligent agent that answers customer questions 24/7, handles returns, and identifies escalations. Trained on your products, tone of voice, and policies.",
    capabilities: [
      "Multilingual support",
      "Sentiment analysis",
      "Auto-escalation",
      "Knowledge base sync",
    ],
  },
  {
    icon: BarChart3,
    title: "Ads & Marketing Automation",
    description:
      "AI that optimizes your campaigns, tests creatives, and allocates budgets based on real-time performance data. ROAS up, CPA down.",
    capabilities: [
      "Creative testing",
      "Budget allocation",
      "ROAS optimization",
      "Cross-channel",
    ],
  },
  {
    icon: Mail,
    title: "Email & Flows",
    description:
      "Personalized email flows that convert. Welcome, abandoned cart, win-back, post-purchase — all AI-optimized.",
    capabilities: [
      "Personalization",
      "A/B testing",
      "Timing optimization",
      "Segmentation",
    ],
  },
  {
    icon: Package,
    title: "Inventory Intelligence",
    description:
      "Predict demand before it happens. AI-driven forecasting that prevents stockouts and minimizes overstock.",
    capabilities: [
      "Demand forecasting",
      "Reorder alerts",
      "Seasonal analysis",
      "Supplier sync",
    ],
  },
  {
    icon: Gauge,
    title: "Performance Analytics",
    description:
      "A unified dashboard that brings all your data together. Real-time insights, automatic alerts, and AI-driven recommendations.",
    capabilities: [
      "Real-time data",
      "Custom dashboards",
      "Anomaly detection",
      "Automated reports",
    ],
  },
  {
    icon: Workflow,
    title: "Workflow Automations",
    description:
      "Connect your systems and eliminate manual work. Order processing, fulfillment triggers, inventory syncs — all automated.",
    capabilities: [
      "API integrations",
      "Event triggers",
      "Multi-step flows",
      "Error handling",
    ],
  },
];

export default function PlatformPage() {
  return (
    <>
      {/* Hero */}
      <PlatformHero />

      {/* Modules */}
      <Section className="bg-ainomiq-navy-light">
        <div className="space-y-6">
          {modules.map((mod, i) => (
            <Card
              key={mod.title}
              className="bg-white border-ainomiq-border hover:border-ainomiq-border-hover transition-all"
            >
              <CardContent className="p-8 md:p-10">
                <div className="flex flex-col md:flex-row md:items-start gap-6 md:gap-10">
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-ainomiq-blue-glow">
                    <mod.icon className="h-7 w-7 text-ainomiq-blue" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-xs font-mono text-ainomiq-text-subtle">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <h3 className="text-xl font-bold">{mod.title}</h3>
                    </div>
                    <p className="text-ainomiq-text-muted leading-relaxed mb-5 max-w-2xl">
                      {mod.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {mod.capabilities.map((cap) => (
                        <span
                          key={cap}
                          className="rounded-full border border-ainomiq-border px-3 py-1 text-xs font-medium text-ainomiq-text-muted"
                        >
                          {cap}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </Section>

      {/* CTA */}
      <section className="py-32 px-6 text-center">
        <div className="mx-auto max-w-2xl">
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-6">
            Ready to automate?
          </h2>
          <p className="text-lg text-ainomiq-text-muted mb-10 max-w-lg mx-auto">
            Start with one module, grow to the full app. We help
            you with the right roadmap.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Button
              asChild
              size="lg"
              className="rounded-full bg-ainomiq-blue hover:bg-ainomiq-blue-hover text-white px-8 h-12"
            >
              <Link href="/contact">Book a call</Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="rounded-full border-ainomiq-border hover:border-ainomiq-border-hover bg-white text-ainomiq-text px-8 h-12"
            >
              <Link href="/#pricing">
                View pricing <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
