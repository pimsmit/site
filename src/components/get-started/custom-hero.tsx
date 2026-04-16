"use client";

import { Sparkles } from "lucide-react";
import { ProjectRequestForm } from "@/components/get-started/project-request-form";
import { GlassFilter } from "@/components/ui/liquid-glass";

export function CustomHero() {
  return (
    <section
      className="relative min-h-screen overflow-hidden pt-24 pb-16 px-6"
      style={{
        background: `url("https://images.unsplash.com/photo-1432251407527-504a6b4174a2?q=80&w=1480&auto=format&fit=crop&ixlib=rb-4.1.0") center center`,
        backgroundSize: "cover",
        animation: "moveBackground 60s linear infinite",
      }}
    >
      <GlassFilter />

      {/* Overlay for readability */}
      <div className="absolute inset-0 bg-white/40 backdrop-blur-sm -z-0" />

      <div className="mx-auto max-w-6xl relative z-10">
        {/* Badge */}
        <div className="mb-6 flex justify-center">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-white/30 backdrop-blur-md px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-ainomiq-blue border border-white/50 shadow-[0_2px_8px_rgba(0,0,0,0.1),inset_1px_1px_1px_rgba(255,255,255,0.5)]">
            <Sparkles className="h-3.5 w-3.5" /> Custom Projects
          </span>
        </div>

        {/* Heading */}
        <h1 className="text-center text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight mb-4 text-gray-900">
          Need a custom solution?
        </h1>

        {/* Subtext */}
        <p className="text-center text-lg md:text-xl text-gray-700 max-w-2xl mx-auto mb-4">
          Tell us what you need. We&apos;ll calculate the cost, prepare a project brief, and connect you with a builder.
        </p>

        {/* Trust line */}
        <p className="text-center text-sm text-gray-600 mb-12">
          From concept to deployment - transparent pricing, clear timelines.
        </p>

        {/* Liquid Glass card */}
        <div className="relative mx-auto max-w-5xl">
          <div
            className="relative flex flex-col overflow-hidden rounded-3xl p-6 md:p-8 transition-all duration-700"
            style={{
              boxShadow: "0 6px 6px rgba(0, 0, 0, 0.2), 0 0 20px rgba(0, 0, 0, 0.1)",
            }}
          >
            {/* Glass layers */}
            <div
              className="absolute inset-0 z-0 overflow-hidden rounded-3xl"
              style={{
                backdropFilter: "blur(3px)",
                filter: "url(#glass-distortion)",
                isolation: "isolate",
              }}
            />
            <div
              className="absolute inset-0 z-10 rounded-3xl"
              style={{ background: "rgba(255, 255, 255, 0.25)" }}
            />
            <div
              className="absolute inset-0 z-20 rounded-3xl overflow-hidden"
              style={{
                boxShadow:
                  "inset 2px 2px 1px 0 rgba(255, 255, 255, 0.5), inset -1px -1px 1px 1px rgba(255, 255, 255, 0.5)",
              }}
            />

            {/* Form content */}
            <div className="relative z-30">
              <ProjectRequestForm />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
