"use client";

import { useMemo } from "react";
import { Player } from "@remotion/player";
import { LiveCodeCompilation } from "@/components/ui/live-code-compilation";
import { SplineScene } from "@/components/ui/spline";

export function BuildYourSolution() {
  const props = useMemo(() => ({ speed: 1 }), []);

  return (
    <section className="relative w-full py-16 md:py-24 px-6 bg-gradient-to-br from-blue-50 via-white to-blue-100/80 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          {/* Left: Code typing animation */}
          <div className="relative">
            <div className="mb-6">
              <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-4">
                We write the code.<br />You get the solution.
              </h2>
              <p className="text-lg text-ainomiq-text-muted max-w-lg">
                From concept to deployment — our team builds exactly what you need. No templates, no shortcuts.
              </p>
            </div>
            
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

          {/* Right: Robot */}
          <div className="relative h-[400px] md:h-[600px] w-full flex items-center justify-center">
            <SplineScene
              scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
              className="w-full h-full scale-125"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
