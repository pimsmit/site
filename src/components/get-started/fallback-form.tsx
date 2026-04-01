"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { ArrowRight, AlertCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type { ManualAnswers } from "@/lib/analysis-types";

interface FallbackFormProps {
  onSubmit: (answers: ManualAnswers) => void;
}

const platforms = ["Shopify", "WooCommerce", "Magento", "BigCommerce", "Other"];
const volumes = ["< 100", "100 - 1,000", "1,000+", "10,000+"];
const toolOptions = [
  "Klaviyo",
  "Mailchimp",
  "Meta Ads",
  "Google Ads",
  "TikTok Ads",
  "Google Analytics",
  "Hotjar",
];

export function FallbackForm({ onSubmit }: FallbackFormProps) {
  const [platform, setPlatform] = useState("");
  const [orderVolume, setOrderVolume] = useState("");
  const [tools, setTools] = useState<string[]>([]);

  const toggleTool = (tool: string) => {
    setTools((prev) =>
      prev.includes(tool) ? prev.filter((t) => t !== tool) : [...prev, tool]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!platform || !orderVolume) return;
    onSubmit({ platform, orderVolume, tools });
  };

  const canSubmit = platform && orderVolume;

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -24 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="flex flex-col items-center gap-8 px-4 w-full max-w-lg mx-auto"
    >
      <div className="flex items-center gap-2 text-ainomiq-text-muted text-sm">
        <AlertCircle className="size-4" />
        <span>We couldn&apos;t scan your site. Answer a few questions instead.</span>
      </div>

      <form onSubmit={handleSubmit} className="w-full flex flex-col gap-8">
        {/* Platform */}
        <div className="flex flex-col gap-3">
          <label className="text-sm font-medium text-ainomiq-text">
            What platform does your store run on?
          </label>
          <div className="flex flex-wrap gap-2">
            {platforms.map((p) => (
              <button
                key={p}
                type="button"
                onClick={() => setPlatform(p)}
                className={cn(
                  "rounded-full border px-4 py-2 text-sm transition-all",
                  platform === p
                    ? "border-ainomiq-blue bg-ainomiq-blue text-white"
                    : "border-ainomiq-border bg-white text-ainomiq-text hover:border-ainomiq-border-hover"
                )}
              >
                {p}
              </button>
            ))}
          </div>
        </div>

        {/* Order Volume */}
        <div className="flex flex-col gap-3">
          <label className="text-sm font-medium text-ainomiq-text">
            How many orders per month?
          </label>
          <div className="flex flex-wrap gap-2">
            {volumes.map((v) => (
              <button
                key={v}
                type="button"
                onClick={() => setOrderVolume(v)}
                className={cn(
                  "rounded-full border px-4 py-2 text-sm transition-all",
                  orderVolume === v
                    ? "border-ainomiq-blue bg-ainomiq-blue text-white"
                    : "border-ainomiq-border bg-white text-ainomiq-text hover:border-ainomiq-border-hover"
                )}
              >
                {v}
              </button>
            ))}
          </div>
        </div>

        {/* Tools */}
        <div className="flex flex-col gap-3">
          <label className="text-sm font-medium text-ainomiq-text">
            Which tools do you use?{" "}
            <span className="text-ainomiq-text-subtle font-normal">
              (optional)
            </span>
          </label>
          <div className="flex flex-wrap gap-2">
            {toolOptions.map((tool) => (
              <button
                key={tool}
                type="button"
                onClick={() => toggleTool(tool)}
                className={cn(
                  "rounded-full border px-4 py-2 text-sm transition-all",
                  tools.includes(tool)
                    ? "border-ainomiq-blue bg-ainomiq-blue/10 text-ainomiq-blue"
                    : "border-ainomiq-border bg-white text-ainomiq-text hover:border-ainomiq-border-hover"
                )}
              >
                {tool}
              </button>
            ))}
          </div>
        </div>

        <button
          type="submit"
          disabled={!canSubmit}
          className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-ainomiq-blue px-8 text-sm font-medium text-white transition-all hover:bg-ainomiq-blue-hover disabled:opacity-50 disabled:pointer-events-none"
        >
          Get recommendations
          <ArrowRight className="size-4" />
        </button>
      </form>
    </motion.div>
  );
}
