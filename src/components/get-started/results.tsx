"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import {
  Bot,
  BarChart3,
  Mail,
  Package,
  Gauge,
  Workflow,
  Sparkles,
  ArrowRight,
  ExternalLink,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type { SiteAnalysis, ManualAnswers } from "@/lib/analysis-types";

interface ResultsProps {
  analysis: SiteAnalysis | null;
  manual?: ManualAnswers;
}

const modules = [
  {
    id: "customer-service",
    name: "Customer Service AI",
    icon: Bot,
    description: "Automated ticket handling, 200+ tickets/day",
  },
  {
    id: "ad-management",
    name: "Ad Management",
    icon: BarChart3,
    description: "Meta, Google, TikTok ad optimization",
  },
  {
    id: "email-marketing",
    name: "Email Marketing",
    icon: Mail,
    description: "Klaviyo integration, AI copywriting",
  },
  {
    id: "inventory",
    name: "Inventory Tracking",
    icon: Package,
    description: "Stock predictions, reorder alerts",
  },
  {
    id: "dashboard",
    name: "Performance Dashboard",
    icon: Gauge,
    description: "Real-time metrics, ROAS tracking",
  },
  {
    id: "workflows",
    name: "Workflow Automation",
    icon: Workflow,
    description: "Custom AI workflows, API integrations",
  },
];

function getModuleRelevance(
  moduleId: string,
  analysis: SiteAnalysis | null,
  manual?: ManualAnswers
): "high" | "medium" | "low" {
  if (!analysis && !manual) return "medium";

  const techs = analysis?.technologies ?? [];
  const techNames = techs.map((t) => t.name.toLowerCase());
  const tools = manual?.tools.map((t) => t.toLowerCase()) ?? [];

  switch (moduleId) {
    case "customer-service":
      return analysis?.hasEcommerce || manual?.platform !== "Other"
        ? "high"
        : "medium";
    case "ad-management":
      if (
        techNames.some((n) => n.includes("pixel") || n.includes("ads")) ||
        tools.some((t) => t.includes("meta") || t.includes("google ads"))
      )
        return "high";
      return analysis?.hasEcommerce ? "medium" : "low";
    case "email-marketing":
      if (
        techNames.some((n) =>
          ["klaviyo", "mailchimp", "brevo", "activecampaign"].some((e) =>
            n.includes(e)
          )
        ) ||
        tools.some((t) => t.includes("klaviyo"))
      )
        return "high";
      return "medium";
    case "inventory":
      return analysis?.hasEcommerce || manual?.platform !== "Other"
        ? "high"
        : "low";
    case "dashboard":
      return "high"; // Free with any plan, always relevant
    case "workflows":
      return analysis?.estimatedScale === "large" ||
        manual?.orderVolume === "1000+" ||
        manual?.orderVolume === "10,000+"
        ? "high"
        : "medium";
    default:
      return "medium";
  }
}

function categoryLabel(category: string) {
  switch (category) {
    case "platform":
      return "Platform";
    case "email":
      return "Email";
    case "ads":
      return "Advertising";
    case "analytics":
      return "Analytics";
    default:
      return "Other";
  }
}

export function Results({ analysis, manual }: ResultsProps) {
  const [streamedText, setStreamedText] = useState("");
  const [isStreaming, setIsStreaming] = useState(false);
  const [recommendedPlan, setRecommendedPlan] = useState<
    "App" | "Enterprise" | null
  >(null);
  const abortRef = useRef<AbortController | null>(null);

  useEffect(() => {
    const controller = new AbortController();
    abortRef.current = controller;

    async function fetchRecommendation() {
      setIsStreaming(true);
      try {
        const body = analysis ? { analysis } : { manual };
        const response = await fetch("/api/recommend", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
          signal: controller.signal,
        });

        if (!response.ok || !response.body) {
          setStreamedText(
            "Unable to generate recommendation. Please contact us for a personalized assessment."
          );
          setIsStreaming(false);
          return;
        }

        const reader = response.body.getReader();
        const decoder = new TextDecoder();
        let fullText = "";

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          const chunk = decoder.decode(value, { stream: true });
          // Parse SSE format - extract text from UI message stream
          const lines = chunk.split("\n");
          for (const line of lines) {
            if (line.startsWith("g:")) {
              try {
                const parsed = JSON.parse(line.slice(2));
                if (typeof parsed === "string") {
                  fullText += parsed;
                  setStreamedText(fullText);
                }
              } catch {
                // skip unparseable lines
              }
            }
          }
        }

        // Detect plan from streamed text
        if (fullText.toLowerCase().includes("enterprise")) {
          setRecommendedPlan("Enterprise");
        } else {
          setRecommendedPlan("App");
        }
      } catch (err) {
        if (err instanceof DOMException && err.name === "AbortError") return;
        setStreamedText(
          "Unable to generate recommendation. Please contact us for a personalized assessment."
        );
      } finally {
        setIsStreaming(false);
      }
    }

    fetchRecommendation();

    return () => controller.abort();
  }, [analysis, manual]);

  const techs = analysis?.technologies ?? [];

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -24 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="w-full max-w-4xl mx-auto px-4 flex flex-col gap-10"
    >
      {/* Tech Stack */}
      {techs.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold text-ainomiq-text mb-4">
            Detected Tech Stack
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {techs.map((tech, i) => (
              <motion.div
                key={tech.name}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: i * 0.05,
                  duration: 0.5,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="flex flex-col gap-2 rounded-xl border border-ainomiq-border bg-white p-4 shadow-sm"
              >
                <span className="text-sm font-medium text-ainomiq-text">
                  {tech.name}
                </span>
                <Badge variant="secondary" className="w-fit text-[10px]">
                  {categoryLabel(tech.category)}
                </Badge>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* Module Match */}
      <div>
        <h3 className="text-lg font-semibold text-ainomiq-text mb-4">
          Recommended Modules
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {modules.map((mod, i) => {
            const relevance = getModuleRelevance(mod.id, analysis, manual);
            const Icon = mod.icon;

            return (
              <motion.div
                key={mod.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: 0.2 + i * 0.05,
                  duration: 0.5,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className={cn(
                  "flex flex-col gap-3 rounded-xl border p-4 shadow-sm transition-all",
                  relevance === "high"
                    ? "border-ainomiq-blue/30 bg-ainomiq-blue-muted ring-2 ring-ainomiq-blue/20"
                    : relevance === "medium"
                      ? "border-ainomiq-border bg-white"
                      : "border-ainomiq-border bg-white opacity-50"
                )}
              >
                <div className="flex items-center justify-between">
                  <div className="flex size-9 items-center justify-center rounded-lg bg-ainomiq-surface">
                    <Icon className="size-4 text-ainomiq-blue" />
                  </div>
                  <Badge
                    variant={relevance === "high" ? "default" : "secondary"}
                    className="text-[10px]"
                  >
                    {relevance === "high"
                      ? "High match"
                      : relevance === "medium"
                        ? "Relevant"
                        : "Optional"}
                  </Badge>
                </div>
                <div>
                  <p className="text-sm font-medium text-ainomiq-text">
                    {mod.name}
                  </p>
                  <p className="text-xs text-ainomiq-text-muted mt-0.5">
                    {mod.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Plan Recommendation */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          delay: 0.5,
          duration: 0.6,
          ease: [0.16, 1, 0.3, 1],
        }}
        className="rounded-2xl border border-ainomiq-border bg-white p-6 md:p-8 shadow-sm"
      >
        <div className="flex items-center gap-3 mb-4">
          <div className="flex size-10 items-center justify-center rounded-full bg-ainomiq-blue/10">
            <Sparkles className="size-5 text-ainomiq-blue" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-ainomiq-text">
              AI Recommendation
            </h3>
            {recommendedPlan && (
              <Badge className="mt-1">
                Recommended: {recommendedPlan}
                {recommendedPlan === "App" && " — from EUR 149/mo"}
              </Badge>
            )}
          </div>
        </div>

        <div className="prose prose-sm max-w-none text-ainomiq-text-muted">
          {streamedText ? (
            <p className="whitespace-pre-wrap leading-relaxed">
              {streamedText}
              {isStreaming && (
                <span className="inline-block w-1.5 h-4 ml-0.5 -mb-0.5 bg-ainomiq-blue animate-pulse" />
              )}
            </p>
          ) : (
            <div className="flex items-center gap-2 text-ainomiq-text-subtle">
              <span className="inline-block w-1.5 h-4 bg-ainomiq-blue animate-pulse" />
              Generating your personalized recommendation...
            </div>
          )}
        </div>
      </motion.div>

      {/* CTAs */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pb-8">
        {recommendedPlan === "Enterprise" ? (
          <a
            href="/contact"
            className="inline-flex h-12 items-center gap-2 rounded-full bg-ainomiq-blue px-8 text-sm font-medium text-white transition-all hover:bg-ainomiq-blue-hover shadow-sm"
          >
            Request Enterprise Demo
            <ArrowRight className="size-4" />
          </a>
        ) : (
          <a
            href="https://app.ainomiq.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-12 items-center gap-2 rounded-full bg-ainomiq-blue px-8 text-sm font-medium text-white transition-all hover:bg-ainomiq-blue-hover shadow-sm"
          >
            Start free on App
            <ExternalLink className="size-4" />
          </a>
        )}
        <a
          href="/contact"
          className="inline-flex h-12 items-center gap-2 rounded-full border border-ainomiq-border px-8 text-sm font-medium text-ainomiq-text transition-all hover:bg-ainomiq-surface"
        >
          Talk to our team
        </a>
      </div>
    </motion.div>
  );
}
