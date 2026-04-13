'use client'

import React, { useRef, useState } from 'react';
import { SplineScene } from "@/components/ui/spline";
import { Spotlight } from "@/components/ui/spotlight";

export function SplineSceneBasic() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState<{ x: number; y: number } | null>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const handleMouseLeave = () => setMousePos(null);

  return (
    <div className="w-full px-4 md:px-8 py-20 bg-white relative overflow-hidden">
      <div className="max-w-6xl mx-auto">
        {/* Glassy container */}
        <div
          ref={containerRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className="relative flex flex-col md:flex-row items-center gap-8 p-8 md:p-12 rounded-3xl border border-white/40 bg-gradient-to-br from-blue-950 via-blue-900 to-indigo-950 shadow-[0_8px_32px_rgba(0,0,0,0.12)] overflow-hidden"
        >
          {/* Mouse hover glow */}
          {mousePos && (
            <div
              className="absolute pointer-events-none z-[1] rounded-full bg-white/15 blur-[60px] transition-opacity duration-300"
              style={{
                width: 250,
                height: 250,
                left: mousePos.x - 125,
                top: mousePos.y - 125,
              }}
            />
          )}
          {/* Interactive moving spotlight background */}
          <Spotlight
            className="-top-40 left-0 md:left-60 md:-top-20"
            fill="#4A90E2"
          />
          {/* Glass reflection overlay */}
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-white/[0.08] to-transparent pointer-events-none" />

          {/* Left content */}
          <div className="flex-1 z-10 text-center md:text-left">
            <h1 className="text-5xl md:text-6xl font-bold text-white leading-tight mb-4">
              Meet Mark
            </h1>
            <p className="text-lg text-blue-200 leading-relaxed max-w-md">
              Mark works 24/7 and never needs a break. Crazy, right?
            </p>
          </div>

          {/* Right content — robot */}
          <div className="flex-1 relative h-[400px] md:h-[500px] w-full -mb-8 md:-mb-12">
            <SplineScene
              scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
              className="w-full h-full scale-110"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
