"use client";

import { Sparkles } from "lucide-react";
import { ProjectRequestForm } from "@/components/get-started/project-request-form";
import { LogoCloud } from "@/components/ui/logo-cloud";

export function CustomHero() {
  return (
    <section className="relative min-h-screen overflow-hidden bg-gradient-to-br from-blue-50 via-white to-blue-100/80 pt-24 pb-32 px-6">
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
        <div className="relative">
          {/* Multiple layered glow effects */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/40 via-purple-500/30 to-blue-500/40 blur-[100px] -z-10 animate-pulse" style={{ animationDuration: '4s' }} />
          <div className="absolute inset-0 bg-gradient-to-br from-ainomiq-blue/20 to-transparent blur-2xl -z-10" />
          
          {/* Outer glass shell */}
          <div className="mx-auto max-w-5xl rounded-[32px] bg-gradient-to-br from-white/60 via-blue-50/50 to-white/70 backdrop-blur-2xl border border-white/60 shadow-[0_8px_32px_rgba(59,130,246,0.25),0_0_80px_rgba(147,197,253,0.15)] p-3">
            {/* Inner white card */}
            <div className="rounded-[26px] bg-white/95 backdrop-blur-sm p-6 md:p-8 border border-blue-100/50 shadow-inner">
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
          <div className="flex items-center justify-center gap-8 md:gap-12 opacity-50 grayscale">
            <img src="/logos/dominos.png" alt="Domino's" className="h-10 w-auto" />
            <img src="/logos/billie-jeans.png" alt="Billie Jeans" className="h-10 w-auto" />
            <img src="/logos/alpina.png" alt="Alpina" className="h-10 w-auto" />
            <img src="/logos/button-amsterdam.png" alt="Button Amsterdam" className="h-10 w-auto" />
          </div>
        </div>
      </div>

      {/* Infinite logo scroller */}
      <div className="mt-16">
        <LogoCloud logos={CLIENT_LOGOS} />
      </div>
    </section>
  );
}

const CLIENT_LOGOS = [
  { src: "/logos/dominos.png", alt: "Domino's" },
  { src: "/logos/billie-jeans.png", alt: "Billie Jeans" },
  { src: "/logos/alpina.png", alt: "Alpina" },
  { src: "/logos/button-amsterdam.png", alt: "Button Amsterdam" },
  { src: "/logos/padelland.png", alt: "Padelland" },
  { src: "/logos/vindjerijschool.png", alt: "Vindjerijschool" },
  { src: "/logos/la-dos.png", alt: "La Dos" },
  { src: "/logos/accu-expert.png", alt: "Accu Expert" },
];
