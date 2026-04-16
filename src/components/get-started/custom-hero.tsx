"use client";

import { Sparkles } from "lucide-react";
import { ProjectRequestForm } from "@/components/get-started/project-request-form";

export function CustomHero() {
  return (
    <section
      className="relative min-h-screen overflow-hidden pt-24 pb-16 px-6"
      style={{
        backgroundImage: `url("https://images.unsplash.com/photo-1432251407527-504a6b4174a2?q=80&w=2400&auto=format&fit=crop")`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="mx-auto max-w-6xl relative z-10">
        {/* Badge */}
        <div className="mb-6 flex justify-center">
          <span
            className="inline-flex items-center gap-1.5 rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-white/90"
            style={{
              background: "rgba(255, 255, 255, 0.15)",
              backdropFilter: "blur(12px)",
              WebkitBackdropFilter: "blur(12px)",
              border: "1px solid rgba(255, 255, 255, 0.3)",
            }}
          >
            <Sparkles className="h-3.5 w-3.5" /> Custom Projects
          </span>
        </div>

        {/* Heading */}
        <h1 className="text-center text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight mb-4 text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)]">
          Need a custom solution?
        </h1>

        {/* Subtext */}
        <p className="text-center text-lg md:text-xl text-white/85 max-w-2xl mx-auto mb-4 drop-shadow-[0_1px_2px_rgba(0,0,0,0.2)]">
          Tell us what you need. We&apos;ll calculate the cost, prepare a project brief, and connect you with a builder.
        </p>

        {/* Trust line */}
        <p className="text-center text-sm text-white/70 mb-12">
          From concept to deployment - transparent pricing, clear timelines.
        </p>

        {/* Apple-style liquid glass card */}
        <div className="relative mx-auto max-w-5xl">
          <div
            className="relative overflow-hidden rounded-3xl p-6 md:p-8"
            style={{
              background: "rgba(255, 255, 255, 0.18)",
              backdropFilter: "blur(14px) saturate(1.4)",
              WebkitBackdropFilter: "blur(14px) saturate(1.4)",
              border: "1px solid rgba(255, 255, 255, 0.35)",
              boxShadow: "0 4px 24px rgba(0, 0, 0, 0.12), inset 0 1px 0 rgba(255, 255, 255, 0.4)",
            }}
          >
            {/* Top edge highlight - subtle light refraction */}
            <div
              className="absolute inset-x-0 top-0 h-px rounded-t-3xl"
              style={{
                background: "linear-gradient(90deg, transparent 10%, rgba(255,255,255,0.6) 30%, rgba(255,255,255,0.8) 50%, rgba(255,255,255,0.6) 70%, transparent 90%)",
              }}
            />

            {/* Form content */}
            <div className="relative z-10">
              <ProjectRequestForm />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
