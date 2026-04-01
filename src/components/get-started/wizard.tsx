"use client";

import { useState, useCallback } from "react";
import { AnimatePresence } from "motion/react";
import { BeamsBackground } from "@/components/ui/beams-background";
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
    <BeamsBackground intensity="subtle" className="min-h-screen pt-32 pb-16">
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
    </BeamsBackground>
  );
}
