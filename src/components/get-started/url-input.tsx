"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { Globe, ArrowRight, Loader2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface UrlInputProps {
  onSubmit: (url: string) => void;
  isLoading: boolean;
}

export function UrlInput({ onSubmit, isLoading }: UrlInputProps) {
  const [url, setUrl] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!url.trim() || isLoading) return;
    onSubmit(url.trim());
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -24 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="flex flex-col items-center gap-8 text-center px-4"
    >
      <Badge variant="secondary" className="text-ainomiq-blue">
        Get Started
      </Badge>

      <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-ainomiq-text max-w-2xl">
        Let&apos;s analyze your{" "}
        <span className="gradient-text">business</span>
      </h1>

      <p className="text-ainomiq-text-muted text-lg max-w-md">
        Enter your website URL and we&apos;ll recommend the perfect automation setup for
        your business.
      </p>

      <form onSubmit={handleSubmit} className="w-full max-w-lg">
        <div className="relative flex items-center">
          <Globe className="absolute left-4 size-5 text-ainomiq-text-subtle pointer-events-none" />
          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="yourstore.com"
            className="h-14 w-full rounded-full border border-ainomiq-border bg-ainomiq-navy pl-12 pr-36 text-base text-ainomiq-text placeholder:text-ainomiq-text-subtle shadow-sm outline-none transition-all focus:border-ainomiq-blue focus:ring-2 focus:ring-ainomiq-blue/20"
            disabled={isLoading}
            autoFocus
          />
          <button
            type="submit"
            disabled={!url.trim() || isLoading}
            className="absolute right-2 inline-flex h-10 items-center gap-2 rounded-full bg-ainomiq-blue px-5 text-sm font-medium text-white transition-all hover:bg-ainomiq-blue-hover disabled:opacity-50 disabled:pointer-events-none"
          >
            {isLoading ? (
              <Loader2 className="size-4 animate-spin" />
            ) : (
              <>
                Analyze
                <ArrowRight className="size-4" />
              </>
            )}
          </button>
        </div>
      </form>

      <p className="text-xs text-ainomiq-text-subtle">
        We&apos;ll scan your site for technology stack, tools, and integrations.
      </p>
    </motion.div>
  );
}
