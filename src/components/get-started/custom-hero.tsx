"use client";

import { Sparkles } from "lucide-react";
import { ProjectRequestForm } from "@/components/get-started/project-request-form";
import { GlassFilter } from "@/components/ui/liquid-glass";
import { EtherealShadow } from "@/components/ui/ethereal-shadow";

export function CustomHero() {
  return (
    <section className="relative min-h-screen overflow-hidden pt-24 pb-16 px-6">
      {/* Ethereal shadow background - ainomiq blue/white */}
      <div className="absolute inset-0 -z-10 bg-ainomiq-navy">
        <EtherealShadow
          color="rgba(59, 130, 246, 0.6)"
          animation={{ scale: 100, speed: 90 }}
          noise={{ opacity: 0.3, scale: 1 }}
          sizing="fill"
        />
      </div>

      <GlassFilter />

      <div className="mx-auto max-w-6xl relative z-10">
        {/* Badge */}
        <div className="mb-6 flex justify-center">
          <div
            className="relative flex items-center gap-1.5 rounded-3xl px-5 py-2 text-xs font-semibold uppercase tracking-wider text-white overflow-hidden cursor-default"
            style={{
              boxShadow: "0 6px 6px rgba(0, 0, 0, 0.2), 0 0 20px rgba(0, 0, 0, 0.1)",
            }}
          >
            <div
              className="absolute inset-0 z-0 overflow-hidden rounded-3xl"
              style={{
                backdropFilter: "blur(3px)",
                filter: "url(#glass-distortion)",
                isolation: "isolate",
              }}
            />
            <div className="absolute inset-0 z-10 rounded-3xl" style={{ background: "rgba(255, 255, 255, 0.25)" }} />
            <div
              className="absolute inset-0 z-20 rounded-3xl overflow-hidden"
              style={{ boxShadow: "inset 2px 2px 1px 0 rgba(255,255,255,0.5), inset -1px -1px 1px 1px rgba(255,255,255,0.5)" }}
            />
            <Sparkles className="h-3.5 w-3.5 relative z-30" />
            <span className="relative z-30">Custom Projects</span>
          </div>
        </div>

        {/* Heading */}
        <h1 className="text-center text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight mb-4 text-ainomiq-text">
          Need a custom solution?
        </h1>

        {/* Subtext */}
        <p className="text-center text-lg md:text-xl text-ainomiq-text-muted max-w-2xl mx-auto mb-4">
          Tell us what you need. We&apos;ll calculate the cost, prepare a project brief, and connect you with a builder.
        </p>

        {/* Trust line */}
        <p className="text-center text-sm text-ainomiq-text-subtle mb-12">
          From concept to deployment - transparent pricing, clear timelines.
        </p>

        {/* Liquid Glass card */}
        <div className="relative mx-auto max-w-5xl">
          <div
            className="relative flex flex-col overflow-hidden rounded-3xl p-6 md:p-8 transition-all duration-700"
            style={{
              boxShadow: "0 6px 6px rgba(0, 0, 0, 0.2), 0 0 20px rgba(0, 0, 0, 0.1)",
              transitionTimingFunction: "cubic-bezier(0.175, 0.885, 0.32, 2.2)",
            }}
          >
            <div
              className="absolute inset-0 z-0 overflow-hidden rounded-3xl"
              style={{
                backdropFilter: "blur(3px)",
                filter: "url(#glass-distortion)",
                isolation: "isolate",
              }}
            />
            <div className="absolute inset-0 z-10 rounded-3xl" style={{ background: "rgba(255, 255, 255, 0.45)" }} />
            <div
              className="absolute inset-0 z-20 rounded-3xl overflow-hidden"
              style={{ boxShadow: "inset 2px 2px 1px 0 rgba(255,255,255,0.6), inset -1px -1px 1px 1px rgba(255,255,255,0.6)" }}
            />
            <div className="relative z-30">
              <ProjectRequestForm />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
