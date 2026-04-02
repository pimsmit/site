"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import { AnimatePresence } from "motion/react";
import { UrlInput } from "./url-input";
import { AnalysisProgress } from "./progress";
import { Results } from "./results";
import { FallbackForm } from "./fallback-form";
import type { SiteAnalysis, ManualAnswers } from "@/lib/analysis-types";

type Step = "input" | "analyzing" | "results" | "fallback";

export function GetStartedWizard() {
  const [step, setStep] = useState<Step>("input");
  const [analysis, setAnalysis] = useState<SiteAnalysis | null>(null);
  const [manual, setManual] = useState<ManualAnswers | undefined>();
  const [isLoading, setIsLoading] = useState(false);
  const gradientRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!gradientRef.current) return;
      const x = (e.clientX / window.innerWidth) * 100;
      const y = (e.clientY / window.innerHeight) * 100;
      gradientRef.current.style.background = `
        radial-gradient(ellipse 60% 50% at ${x}% ${y}%, rgba(59,130,246,0.12) 0%, transparent 70%),
        radial-gradient(ellipse 40% 60% at ${100 - x}% ${100 - y}%, rgba(147,197,253,0.08) 0%, transparent 60%),
        linear-gradient(180deg, #ffffff 0%, #f8fafc 100%)
      `;
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const handleUrlSubmit = useCallback(async (url: string) => {
    setIsLoading(true);
    setStep("analyzing");

    try {
      const response = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url }),
      });

      const data = await response.json();

      if (!response.ok || data.error) {
        setStep("fallback");
        return;
      }

      setAnalysis(data.analysis);
      // Progress animation will call handleProgressComplete
    } catch {
      setStep("fallback");
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleProgressComplete = useCallback(() => {
    if (analysis) {
      setStep("results");
    }
  }, [analysis]);

  const handleFallbackSubmit = useCallback((answers: ManualAnswers) => {
    setManual(answers);
    setStep("results");
  }, []);

  return (
    <section className="relative overflow-hidden">
      {/* Interactive gradient background — same as homepage hero */}
      <div
        ref={gradientRef}
        className="absolute inset-0 -z-10 transition-[background] duration-300 ease-out"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 30%, rgba(59,130,246,0.12) 0%, transparent 70%), linear-gradient(180deg, #ffffff 0%, #f8fafc 100%)",
        }}
      />

      {/* Decorative lines */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 mx-auto hidden max-w-5xl lg:block"
      >
        <div className="absolute inset-y-0 left-0 w-px bg-gradient-to-b from-transparent via-ainomiq-border to-ainomiq-border" />
        <div className="absolute inset-y-0 right-0 w-px bg-gradient-to-b from-transparent via-ainomiq-border to-ainomiq-border" />
      </div>

      <div className="mx-auto max-w-5xl">
        <div className="relative flex min-h-[calc(75vh-4rem)] flex-col items-center justify-center gap-5 px-6 pt-32 pb-20">
          {/* Inner decorative lines */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 -z-[1] overflow-hidden"
          >
            <div className="absolute inset-y-0 left-4 w-px bg-gradient-to-b from-transparent via-ainomiq-border to-ainomiq-border md:left-8" />
            <div className="absolute inset-y-0 right-4 w-px bg-gradient-to-b from-transparent via-ainomiq-border to-ainomiq-border md:right-8" />
          </div>

          <AnimatePresence mode="wait">
            {step === "input" && (
              <UrlInput
                key="input"
                onSubmit={handleUrlSubmit}
                isLoading={isLoading}
              />
            )}
            {step === "analyzing" && (
              <AnalysisProgress
                key="progress"
                onComplete={handleProgressComplete}
              />
            )}
            {step === "results" && (
              <Results key="results" analysis={analysis} manual={manual} />
            )}
            {step === "fallback" && (
              <FallbackForm key="fallback" onSubmit={handleFallbackSubmit} />
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
