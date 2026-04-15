"use client";

import { Sparkles } from "lucide-react";
import { ProjectRequestForm } from "@/components/get-started/project-request-form";

export function CustomHero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-white via-white to-ainomiq-navy-light/20 pt-24 pb-32 px-6">
      <div className="mx-auto max-w-6xl">
        {/* Badge */}
        <div className="mb-6 flex justify-center">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-ainomiq-blue/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-ainomiq-blue border border-ainomiq-blue/20">
            <Sparkles className="h-3.5 w-3.5" /> Custom Projects
          </span>
        </div>

        {/* Heading */}
        <h1 className="text-center text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight mb-4">
          Need a custom solution?
        </h1>

        {/* Subtext */}
        <p className="text-center text-lg md:text-xl text-ainomiq-text-muted max-w-2xl mx-auto mb-4">
          Tell us what you need. We'll calculate the cost, prepare a project brief, and connect you with a builder.
        </p>

        {/* Trust line */}
        <p className="text-center text-sm text-ainomiq-text-muted mb-12">
          From concept to deployment — transparent pricing, clear timelines.
        </p>

        {/* Glassmorphism elevated card with full wizard */}
        <div className="relative -mt-8">
          {/* Glow effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-ainomiq-blue/20 via-ainomiq-violet/20 to-ainomiq-blue/20 blur-3xl -z-10 scale-95" />
          
          {/* Glass card */}
          <div className="mx-auto max-w-5xl rounded-3xl bg-white/80 backdrop-blur-xl border border-ainomiq-border shadow-2xl p-1">
            <div className="rounded-[22px] bg-white p-2 md:p-4 border border-ainomiq-border/50">
              {/* Full wizard form */}
              <ProjectRequestForm />
            </div>
          </div>
        </div>

        {/* Trust scroller - below card */}
        <div className="mt-20 text-center">
          <p className="text-sm text-ainomiq-text-muted mb-6">
            Trusted by businesses like yours
          </p>
          <div className="flex items-center justify-center gap-8 opacity-40 grayscale">
            {/* Logo placeholders - replace with actual client logos */}
            <div className="h-8 w-24 bg-ainomiq-text-muted/20 rounded" />
            <div className="h-8 w-24 bg-ainomiq-text-muted/20 rounded" />
            <div className="h-8 w-24 bg-ainomiq-text-muted/20 rounded" />
            <div className="h-8 w-24 bg-ainomiq-text-muted/20 rounded" />
          </div>
        </div>
      </div>
    </section>
  );
}
