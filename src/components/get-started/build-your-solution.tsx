"use client";

import { useMemo } from "react";
import { Player } from "@remotion/player";
import { LiveCodeCompilation } from "@/components/ui/live-code-compilation";

export function BuildYourSolution() {
  const props = useMemo(() => ({ speed: 1 }), []);

  return (
    <section className="relative w-full py-16 md:py-24 px-6 overflow-hidden">
      
      <div className="max-w-7xl mx-auto">
        {/* Glassmorphism container */}
        <div className="relative">
          {/* Glow effects */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-purple-500/15 to-blue-500/20 blur-[80px] -z-10" />
          
          {/* Outer glass shell */}
          <div className="rounded-[32px] bg-gradient-to-br from-white/60 via-blue-50/50 to-white/70 backdrop-blur-2xl border border-white/60 shadow-[0_8px_32px_rgba(59,130,246,0.15)] p-8 md:p-12">
            <div className="max-w-5xl mx-auto">
              {/* Heading */}
              <div className="mb-8 text-center">
                <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-4">
                  We write the code.<br />You get the solution.
                </h2>
                <p className="text-lg text-ainomiq-text-muted max-w-lg mx-auto">
                  From concept to deployment — our team builds exactly what you need. No templates, no shortcuts.
                </p>
              </div>
              
              {/* Code editor - full width, robot shows in preview pane */}
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <Player
                  component={LiveCodeCompilation as any}
                  inputProps={props}
                  durationInFrames={240}
                  fps={30}
                  compositionWidth={1280}
                  compositionHeight={720}
                  autoPlay
                  loop
                  controls={false}
                  clickToPlay={false}
                  style={{
                    width: "100%",
                    height: "auto",
                    aspectRatio: "16 / 9",
                    borderRadius: 16,
                    overflow: "hidden",
                    background: "#050505",
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
