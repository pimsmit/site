"use client";

import dynamic from "next/dynamic";
import { AnimatedLineChart } from "@/components/ui/animated-line-chart";

// Remotion Player — SSR off
const Player = dynamic(
  () => import("@remotion/player").then((m) => ({ default: m.Player })),
  { ssr: false }
);

// Two scenes: chaotic (before) and smooth (after)
function ChaoticScene() {
  return (
    <AnimatedLineChart
      data={[22, 8, 31, 12, 40, 6, 28, 15, 38, 9, 25]}
      strokeColor="#f87171"
      strokeWidth={3}
      background="transparent"
      gridColor="#e5e7eb"
      showDot
    />
  );
}

function GrowthScene() {
  return (
    <AnimatedLineChart
      data={[8, 12, 18, 24, 31, 38, 46, 55, 64, 74, 85]}
      strokeColor="#3b82f6"
      strokeWidth={3}
      background="transparent"
      gridColor="#e5e7eb"
      showDot
    />
  );
}

export function GrowthChartSection() {
  return (
    <section className="py-10 md:py-16 px-6 bg-white">
      <div className="mx-auto max-w-4xl">
        {/* Header */}
        <div className="text-center mb-10">
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#0f1b2d]">
            What consistent automation looks like.
          </h2>
          <p className="text-gray-400 mt-2 text-sm max-w-md mx-auto">
            Erratic performance before. Steady growth after.
          </p>
        </div>

        {/* Side-by-side charts */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Before */}
          <div className="rounded-2xl overflow-hidden border border-gray-100 bg-white p-4"
            style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.06)" }}>
            <p className="text-xs font-semibold text-red-400 uppercase tracking-widest mb-3 text-center">
              Before
            </p>
            <div className="w-full rounded-xl overflow-hidden" style={{ height: 220 }}>
              <Player
                component={ChaoticScene}
                durationInFrames={180}
                fps={30}
                compositionWidth={800}
                compositionHeight={400}
                style={{ width: "100%", height: "100%" }}
                controls={false}
                autoPlay
                loop={false}
                clickToPlay={false}
                acknowledgeRemotionLicense
              />
            </div>
          </div>

          {/* After */}
          <div className="rounded-2xl overflow-hidden border border-gray-100 bg-white p-4"
            style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.06)" }}>
            <p className="text-xs font-semibold text-[#0f1b2d] uppercase tracking-widest mb-3 text-center">
              With Ainomiq
            </p>
            <div className="w-full rounded-xl overflow-hidden" style={{ height: 220 }}>
              <Player
                component={GrowthScene}
                durationInFrames={180}
                fps={30}
                compositionWidth={800}
                compositionHeight={400}
                style={{ width: "100%", height: "100%" }}
                controls={false}
                autoPlay
                loop={false}
                clickToPlay={false}
                acknowledgeRemotionLicense
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
