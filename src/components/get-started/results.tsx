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
  Globe,
  ShoppingBag,
  MessageCircleQuestion,
  Link2,
  AtSign,
  Phone,
  Instagram,
  Facebook,
  Youtube,
  Copy,
  Check,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type { SiteAnalysis, ManualAnswers, ScrapedProduct } from "@/lib/analysis-types";

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

const socialIcons: Record<string, typeof Instagram> = {
  instagram: Instagram,
  facebook: Facebook,
  youtube: Youtube,
};

function AnimatedNumber({ target, delay, suffix = "%" }: { target: number; delay: number; suffix?: string }) {
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
  return <span>{value}{suffix}</span>;
}

function ProductCard({ product, index }: { product: ScrapedProduct; index: number }) {
  const inner = (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.05 * index, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className="group flex flex-col rounded-xl border border-ainomiq-border bg-white shadow-sm overflow-hidden hover:shadow-md hover:border-ainomiq-blue/20 transition-all"
    >
      {product.image ? (
        <div className="relative h-32 bg-gray-50 overflow-hidden">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-contain p-2 group-hover:scale-105 transition-transform duration-300"
            onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
          />
        </div>
      ) : (
        <div className="h-32 bg-gray-50 flex items-center justify-center">
          <ShoppingBag className="size-8 text-gray-200" />
        </div>
      )}
      <div className="p-3 flex-1 flex flex-col gap-1">
        <p className="text-xs font-medium text-ainomiq-text leading-tight line-clamp-2">{product.name}</p>
        {product.price && (
          <p className="text-xs text-ainomiq-blue font-semibold mt-auto">{product.price}</p>
        )}
      </div>
    </motion.div>
  );

  if (product.url) {
    return (
      <a href={product.url} target="_blank" rel="noopener noreferrer" className="block">
        {inner}
      </a>
    );
  }
  return inner;
}

function categoryLabel(category: string) {
  switch (category) {
    case "platform": return "Platform";
    case "email": return "Email";
    case "ads": return "Advertising";
    case "analytics": return "Analytics";
    default: return "Other";
  }
}

function PromoCodePill() {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText("OPTIMIZEE25");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.7, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="flex items-center justify-center"
    >
      <button
        onClick={handleCopy}
        className="group inline-flex items-center gap-3 rounded-full border border-ainomiq-blue/20 bg-ainomiq-blue/5 px-5 py-2.5 transition-all hover:border-ainomiq-blue/40 hover:bg-ainomiq-blue/10 cursor-pointer"
      >
        <span className="text-xs text-ainomiq-text-muted">You're early — get 25% off</span>
        <span className="inline-flex items-center gap-1.5 rounded-full bg-ainomiq-blue/10 px-3 py-1 text-xs font-bold tracking-wider text-ainomiq-blue">
          OPTIMIZEE25
          {copied ? (
            <Check className="size-3 text-emerald-500" />
          ) : (
            <Copy className="size-3 opacity-50 group-hover:opacity-100 transition-opacity" />
          )}
        </span>
      </button>
    </motion.div>
  );
}

export function Results({ analysis, manual }: ResultsProps) {
  const [recommendation, setRecommendation] = useState<RecommendationData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showAllProducts, setShowAllProducts] = useState(false);
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

        if (!response.ok) {
          setError("Unable to generate recommendation.");
          setIsLoading(false);
          return;
        }

        const data = await response.json();
        if (data.error) {
          setError(data.error);
        } else {
          setRecommendation(data);
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
  const products = analysis?.products ?? [];
  const visibleProducts = showAllProducts ? products : products.slice(0, 8);

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -24 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="w-full max-w-4xl mx-auto px-4 flex flex-col gap-8"
    >
      {/* Header with site info */}
      {analysis && (
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-4 rounded-2xl border border-ainomiq-border bg-white p-5 shadow-sm"
        >
          <div className="flex size-12 items-center justify-center rounded-xl bg-ainomiq-blue/10 flex-shrink-0">
            <Globe className="size-6 text-ainomiq-blue" />
          </div>
          <div className="flex-1 min-w-0">
            <h2 className="text-lg font-semibold text-ainomiq-text truncate">{analysis.title || analysis.url}</h2>
            {analysis.description && (
              <p className="text-xs text-ainomiq-text-muted mt-0.5 line-clamp-2">{analysis.description}</p>
            )}
          </div>
          <a
            href={analysis.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-ainomiq-blue hover:underline text-xs flex items-center gap-1 flex-shrink-0"
          >
            Visit <ExternalLink className="size-3" />
          </a>
        </motion.div>
      )}

      {/* Stats overview */}
      {analysis && (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { label: "Products", value: products.length, icon: ShoppingBag, show: true },
            { label: "Pages", value: analysis.pageCount, icon: Link2, show: analysis.pageCount > 0 },
            { label: "Social channels", value: analysis.socialPresence.length, icon: Instagram, show: analysis.socialPresence.length > 0 },
            { label: "FAQ items", value: analysis.faqItems.length, icon: MessageCircleQuestion, show: analysis.faqItems.length > 0 },
          ]
            .filter((s) => s.show)
            .map((stat, i) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.1 + i * 0.05 }}
                  className="rounded-xl border border-ainomiq-border bg-white p-4 shadow-sm text-center"
                >
                  <Icon className="size-4 text-ainomiq-blue mx-auto mb-2" />
                  <p className="text-2xl font-bold text-ainomiq-text">
                    <AnimatedNumber target={stat.value} delay={200 + i * 100} suffix="" />
                  </p>
                  <p className="text-[10px] text-ainomiq-text-muted mt-1 uppercase tracking-wider">{stat.label}</p>
                </motion.div>
              );
            })}
        </div>
      )}

      {/* Tech Stack */}
      {techs.length > 0 && (
        <div>
          <h3 className="text-sm font-semibold text-ainomiq-text mb-3 flex items-center gap-2">
            <span className="size-1.5 rounded-full bg-ainomiq-blue" />
            Detected tech stack
          </h3>
          <div className="flex flex-wrap gap-2">
            {techs.map((tech, i) => (
              <motion.div
                key={tech.name}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.03 }}
              >
                <Badge
                  variant={tech.confidence === "high" ? "default" : "secondary"}
                  className="text-xs py-1 px-3"
                >
                  {tech.name}
                  <span className="ml-1.5 text-[9px] opacity-60">{categoryLabel(tech.category)}</span>
                </Badge>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* Products */}
      {products.length > 0 && (
        <div>
          <h3 className="text-sm font-semibold text-ainomiq-text mb-3 flex items-center gap-2">
            <span className="size-1.5 rounded-full bg-ainomiq-blue" />
            Products we found ({products.length})
            {analysis?.priceRange && (
              <span className="text-xs font-normal text-ainomiq-text-muted ml-auto">
                {analysis.currency} {analysis.priceRange.min.toFixed(2)} — {analysis.priceRange.max.toFixed(2)}
              </span>
            )}
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {visibleProducts.map((product, i) => (
              <ProductCard key={`${product.name}-${i}`} product={product} index={i} />
            ))}
          </div>
          {products.length > 8 && (
            <button
              onClick={() => setShowAllProducts(!showAllProducts)}
              className="mt-3 text-xs text-ainomiq-blue hover:underline cursor-pointer"
            >
              {showAllProducts ? "Show less" : `Show all ${products.length} products`}
            </button>
          )}
        </div>
      )}

      {/* FAQ */}
      {analysis && analysis.faqItems.length > 0 && (
        <div>
          <h3 className="text-sm font-semibold text-ainomiq-text mb-3 flex items-center gap-2">
            <span className="size-1.5 rounded-full bg-ainomiq-blue" />
            FAQ items we can automate
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {analysis.faqItems.map((q, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.03 * i }}
                className="flex items-start gap-2 rounded-lg border border-ainomiq-border bg-white p-3 text-xs text-ainomiq-text"
              >
                <MessageCircleQuestion className="size-3.5 text-ainomiq-blue mt-0.5 flex-shrink-0" />
                <span className="line-clamp-2">{q}</span>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* Social & Contact */}
      {analysis && (analysis.socialPresence.length > 0 || analysis.contactEmail || analysis.contactPhone) && (
        <div className="flex flex-wrap gap-2">
          {analysis.socialPresence.map((platform) => {
            const Icon = socialIcons[platform] || Globe;
            const href = analysis.socialLinks?.[platform];
            return (
              <a
                key={platform}
                href={href || "#"}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-full border border-ainomiq-border bg-white px-3 py-1.5 text-xs text-ainomiq-text hover:border-ainomiq-blue/30 transition-colors"
              >
                <Icon className="size-3 text-ainomiq-blue" />
                {platform}
              </a>
            );
          })}
          {analysis.contactEmail && (
            <span className="inline-flex items-center gap-1.5 rounded-full border border-ainomiq-border bg-white px-3 py-1.5 text-xs text-ainomiq-text">
              <AtSign className="size-3 text-ainomiq-blue" />
              {analysis.contactEmail}
            </span>
          )}
          {analysis.contactPhone && (
            <span className="inline-flex items-center gap-1.5 rounded-full border border-ainomiq-border bg-white px-3 py-1.5 text-xs text-ainomiq-text">
              <Phone className="size-3 text-ainomiq-blue" />
              {analysis.contactPhone}
            </span>
          )}
        </div>
      )}

      {/* Divider */}
      <div className="h-px bg-ainomiq-border" />

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
            <h3 className="text-sm font-semibold text-ainomiq-text mb-2 flex items-center gap-2">
              <span className="size-1.5 rounded-full bg-ainomiq-blue" />
              Your estimated monthly savings
            </h3>
            <p className="text-xs text-ainomiq-text-muted mb-5">
              Based on everything we found on your site — here&apos;s what Ainomiq can save you.
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
                    transition={{ delay: 0.1 + i * 0.08, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                    className={cn(
                      "relative overflow-hidden rounded-2xl border p-5 shadow-sm transition-all",
                      service.relevance === "high"
                        ? "border-ainomiq-blue/30 bg-white ring-1 ring-ainomiq-blue/10"
                        : service.relevance === "medium"
                          ? "border-ainomiq-border bg-white"
                          : "border-ainomiq-border bg-white opacity-60"
                    )}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className={cn("flex size-10 items-center justify-center rounded-xl bg-gradient-to-br text-white", gradient)}>
                          <Icon className="size-5" />
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-ainomiq-text">{service.name}</p>
                          <Badge
                            variant={service.relevance === "high" ? "default" : "secondary"}
                            className="text-[10px] mt-0.5"
                          >
                            {service.relevance === "high" ? "High impact" : service.relevance === "medium" ? "Relevant" : "Optional"}
                          </Badge>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center gap-1 text-ainomiq-blue">
                          <TrendingDown className="size-4" />
                          <span className="text-2xl font-bold">
                            <AnimatedNumber target={service.savingsPercent} delay={400 + i * 150} />
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
            transition={{ delay: 0.5, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="rounded-2xl border border-ainomiq-border bg-white p-6 shadow-sm"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="flex size-10 items-center justify-center rounded-full bg-ainomiq-blue/10">
                <Sparkles className="size-5 text-ainomiq-blue" />
              </div>
              <div>
                <h3 className="text-base font-semibold text-ainomiq-text">Our recommendation</h3>
                <Badge className="mt-0.5">
                  {recommendation.plan === "Enterprise"
                    ? "Enterprise — custom pricing"
                    : "App — start free"}
                </Badge>
              </div>
            </div>
            <p className="text-sm text-ainomiq-text-muted leading-relaxed">
              {recommendation.summary}
            </p>
          </motion.div>

          {/* Promo Code */}
          {recommendation.plan !== "Enterprise" && <PromoCodePill />}

          {/* CTAs */}
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
        </>
      )}
    </motion.div>
  );
}
