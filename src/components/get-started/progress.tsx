"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { Globe, Code, ShoppingCart, Sparkles, Check } from "lucide-react";

const steps = [
  { icon: Globe, label: "Connecting to site" },
  { icon: Code, label: "Scanning tech stack" },
  { icon: ShoppingCart, label: "Detecting platform" },
  { icon: Sparkles, label: "Generating recommendations" },
];

interface AnalysisProgressProps {
  onComplete?: () => void;
}

export function AnalysisProgress({ onComplete }: AnalysisProgressProps) {
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];

    steps.forEach((_, i) => {
      timers.push(
        setTimeout(() => {
          setActiveStep(i + 1);
          if (i === steps.length - 1 && onComplete) {
            setTimeout(onComplete, 600);
          }
        }, (i + 1) * 900)
      );
    });

    return () => timers.forEach(clearTimeout);
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -24 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="flex flex-col items-center gap-10 px-4"
    >
      <div className="text-center">
        <h2 className="text-2xl font-bold text-ainomiq-text mb-2">
          Analyzing your site
        </h2>
        <p className="text-ainomiq-text-muted text-sm">
          This usually takes a few seconds
        </p>
      </div>

      <div className="flex flex-col gap-4 w-full max-w-sm">
        {steps.map((step, i) => {
          const Icon = step.icon;
          const isComplete = activeStep > i;
          const isActive = activeStep === i;

          return (
            <motion.div
              key={step.label}
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                delay: i * 0.15,
                duration: 0.5,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="flex items-center gap-4"
            >
              <div
                className={`flex size-10 shrink-0 items-center justify-center rounded-full transition-all duration-500 ${
                  isComplete
                    ? "bg-ainomiq-blue text-white"
                    : isActive
                      ? "bg-ainomiq-blue/10 text-ainomiq-blue"
                      : "bg-ainomiq-surface text-ainomiq-text-subtle"
                }`}
              >
                {isComplete ? (
                  <Check className="size-4" />
                ) : (
                  <Icon className="size-4" />
                )}
              </div>

              <div className="flex-1">
                <p
                  className={`text-sm font-medium transition-colors duration-300 ${
                    isComplete || isActive
                      ? "text-ainomiq-text"
                      : "text-ainomiq-text-subtle"
                  }`}
                >
                  {step.label}
                </p>
                {isActive && (
                  <div className="mt-2 h-1 w-full overflow-hidden rounded-full bg-ainomiq-surface">
                    <motion.div
                      className="h-full bg-ainomiq-blue rounded-full"
                      initial={{ width: "0%" }}
                      animate={{ width: "100%" }}
                      transition={{ duration: 0.8, ease: "linear" }}
                    />
                  </div>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}
