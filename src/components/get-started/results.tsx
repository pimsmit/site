"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import {
  Bot,
  BarChart3,
  Mail,
  Package,
  Sparkles,
  ArrowRight,
  ExternalLink,
  TrendingDown,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type { SiteAnalysis, ManualAnswers } from "@/lib/analysis-types";

interface ResultsProps {
  analysis: SiteAnalysis | null;
  manual?: ManualAnswers;
}

interface ServiceData {
  id: string;
  name: string;
  savingsPercent: number;
  description: string;
  relevance: "high" | "medium" | "low";
}

interface RecommendationData {
  services: ServiceData[];
  summary: string;
  plan: "App" | "Enterprise";
}

const serviceIcons: Record<string, typeof Bot> = {
  support: Bot,
  performance: BarChart3,
  email: Mail,
  inventory: Package,
};

const serviceColors: Record<string, string> = {
  support: "from-blue-500 to-blue-600",
  performance: "from-violet-500 to-violet-600",
  email: "from-emerald-500 to-emerald-600",
  inventory: "from-amber-500 to-amber-600",
};

function AnimatedPercent({ target, delay }: { target: number; delay: number }) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    const timeout = setTimeout(() => {
      const duration = 1200;
      const start = performance.now();
      function tick(now: number) {
        const elapsed = now - start;
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        setValue(Math.round(eased * target));
        if (progress < 1) requestAnimationFrame(tick);
      }
      requestAnimationFrame(tick);
    }, delay);
    return () => clearTimeout(timeout);
  }, [target, delay]);

  return <span>{value}%</span>;
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
  const [recommendation, setRecommendation] = useState<RecommendationData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const abortRef = useRef<AbortController | null>(null);

  useEffect(() => {
    const controller = new AbortController();
    abortRef.current = controller;

    async function fetchRecommendation() {
      setIsLoading(true);
      try {
        const payload = analysis ? { analysis } : { manual };
        const response = await fetch("/api/recommend", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
          signal: controller.signal,
        });

        if (!response.ok || !response.body) {
          setError("Unable to generate recommendation.");
          setIsLoading(false);
          return;
        }

        const reader = response.body.getReader();
        const decoder = new TextDecoder();
        let fullText = "";

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          const chunk = decoder.decode(value, { stream: true });
          const lines = chunk.split("\n");
          for (const line of lines) {
            if (line.startsWith("g:")) {
              try {
                const parsed = JSON.parse(line.slice(2));
                if (typeof parsed === "string") {
                  fullText += parsed;
                }
              } catch {
                // skip
              }
            }
          }
        }

        // Parse JSON from the streamed text
        const jsonMatch = fullText.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
          const data = JSON.parse(jsonMatch[0]) as RecommendationData;
          setRecommendation(data);
        } else {
          setError("Unable to parse recommendation.");
        }
      } catch (err) {
        if (err instanceof DOMException && err.name === "AbortError") return;
        setError("Unable to generate recommendation.");
      } finally {
        setIsLoading(false);
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

      {/* Site insights */}
      {analysis && (analysis.productCount > 0 || analysis.faqItems.length > 0 || analysis.socialPresence.length > 0) && (
        <div>
          <h3 className="text-lg font-semibold text-ainomiq-text mb-4">
            What we found
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {analysis.productCount > 0 && (
              <div className="rounded-xl border border-ainomiq-border bg-white p-4 shadow-sm text-center">
                <p className="text-2xl font-bold text-ainomiq-blue">{analysis.productCount}+</p>
                <p className="text-xs text-ainomiq-text-muted mt-1">Products</p>
              </div>
            )}
            {analysis.pageCount > 0 && (
              <div className="rounded-xl border border-ainomiq-border bg-white p-4 shadow-sm text-center">
                <p className="text-2xl font-bold text-ainomiq-blue">{analysis.pageCount}</p>
                <p className="text-xs text-ainomiq-text-muted mt-1">Pages</p>
              </div>
            )}
            {analysis.socialPresence.length > 0 && (
              <div className="rounded-xl border border-ainomiq-border bg-white p-4 shadow-sm text-center">
                <p className="text-2xl font-bold text-ainomiq-blue">{analysis.socialPresence.length}</p>
                <p className="text-xs text-ainomiq-text-muted mt-1">Social channels</p>
              </div>
            )}
            {analysis.faqItems.length > 0 && (
              <div className="rounded-xl border border-ainomiq-border bg-white p-4 shadow-sm text-center">
                <p className="text-2xl font-bold text-ainomiq-blue">{analysis.faqItems.length}</p>
                <p className="text-xs text-ainomiq-text-muted mt-1">FAQ items</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Service Savings Cards */}
      {isLoading && (
        <div className="flex flex-col items-center gap-4 py-12">
          <div className="flex size-12 items-center justify-center rounded-full bg-ainomiq-blue/10">
            <Sparkles className="size-6 text-ainomiq-blue animate-pulse" />
          </div>
          <p className="text-ainomiq-text-muted text-sm">Calculating your savings...</p>
        </div>
      )}

      {error && (
        <div className="rounded-2xl border border-ainomiq-border bg-white p-8 text-center">
          <p className="text-ainomiq-text-muted">{error}</p>
          <a href="/contact" className="text-ainomiq-blue text-sm mt-2 inline-block hover:underline">
            Contact us for a personalized assessment
          </a>
        </div>
      )}

      {recommendation && (
        <>
          <div>
            <h3 className="text-lg font-semibold text-ainomiq-text mb-2">
              Your estimated savings
            </h3>
            <p className="text-sm text-ainomiq-text-muted mb-6">
              Based on your site analysis, here&apos;s what Ainomiq can save you each month.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {recommendation.services.map((service, i) => {
                const Icon = serviceIcons[service.id] || Sparkles;
                const gradient = serviceColors[service.id] || "from-blue-500 to-blue-600";

                return (
                  <motion.div
                    key={service.id}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      delay: 0.15 + i * 0.1,
                      duration: 0.6,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    className={cn(
                      "relative overflow-hidden rounded-2xl border p-6 shadow-sm transition-all",
                      service.relevance === "high"
                        ? "border-ainomiq-blue/30 bg-white ring-1 ring-ainomiq-blue/10"
                        : service.relevance === "medium"
                          ? "border-ainomiq-border bg-white"
                          : "border-ainomiq-border bg-white opacity-60"
                    )}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className={cn("flex size-10 items-center justify-center rounded-xl bg-gradient-to-br text-white", gradient)}>
                          <Icon className="size-5" />
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-ainomiq-text">{service.name}</p>
                          <Badge
                            variant={service.relevance === "high" ? "default" : "secondary"}
                            className="text-[10px] mt-1"
                          >
                            {service.relevance === "high" ? "High impact" : service.relevance === "medium" ? "Relevant" : "Optional"}
                          </Badge>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center gap-1 text-ainomiq-blue">
                          <TrendingDown className="size-4" />
                          <span className="text-2xl font-bold">
                            <AnimatedPercent target={service.savingsPercent} delay={300 + i * 150} />
                          </span>
                        </div>
                        <p className="text-[10px] text-ainomiq-text-muted">monthly savings</p>
                      </div>
                    </div>
                    <p className="text-xs text-ainomiq-text-muted leading-relaxed">
                      {service.description}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Summary */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="rounded-2xl border border-ainomiq-border bg-white p-6 md:p-8 shadow-sm"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="flex size-10 items-center justify-center rounded-full bg-ainomiq-blue/10">
                <Sparkles className="size-5 text-ainomiq-blue" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-ainomiq-text">
                  Our recommendation
                </h3>
                <Badge className="mt-1">
                  {recommendation.plan === "Enterprise"
                    ? "Enterprise — custom pricing"
                    : "App — from EUR 149/mo"}
                </Badge>
              </div>
            </div>
            <p className="text-sm text-ainomiq-text-muted leading-relaxed">
              {recommendation.summary}
            </p>
          </motion.div>
        </>
      )}

      {/* CTAs */}
      {recommendation && (
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pb-8">
          {recommendation.plan === "Enterprise" ? (
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
      )}
    </motion.div>
  );
}
