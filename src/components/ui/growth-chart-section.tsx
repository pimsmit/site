"use client";

import dynamic from "next/dynamic";
import { useRef, useEffect } from "react";
import type { PlayerRef } from "@remotion/player";
import { AnimatedLineChart } from "@/components/ui/animated-line-chart";

// Remotion Player — SSR off
const Player = dynamic(
  () => import("@remotion/player").then((m) => ({ default: m.Player })),
  { ssr: false }
);

const FRAMES = 180;

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

function FreezePlayer({ component, label, labelColor }: {
  component: React.ComponentType;
  label: string;
  labelColor: string;
}) {
  const ref = useRef<PlayerRef>(null);

  useEffect(() => {
    // Poll until the dynamic Player is mounted and ref is available
    let interval: ReturnType<typeof setInterval>;
    let attached = false;

    const handler = () => {
      // Seek to last frame and pause — stays frozen
      ref.current?.seekTo(FRAMES - 1);
      ref.current?.pause();
    };

    interval = setInterval(() => {
      if (ref.current && !attached) {
        attached = true;
        ref.current.addEventListener("ended", handler);
        clearInterval(interval);
      }
    }, 100);

    return () => {
      clearInterval(interval);
      if (attached && ref.current) {
        ref.current.removeEventListener("ended", handler);
      }
    };
  }, []);

  return (
    <div className="rounded-2xl overflow-hidden border border-gray-100 bg-white p-4"
      style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.06)" }}>
      <p className={`text-xs font-semibold uppercase tracking-widest mb-3 text-center ${labelColor}`}>
        {label}
      </p>
      <div className="w-full rounded-xl overflow-hidden" style={{ height: 220 }}>
        <Player
          ref={ref}
          component={component}
          durationInFrames={FRAMES}
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
  );
}

export function GrowthChartSection() {
  return (
    <section className="py-10 md:py-16 px-6 bg-white">
      <div className="mx-auto max-w-4xl">
        <div className="text-center mb-10">
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#0f1b2d]">
            What consistent automation looks like.
          </h2>
          <p className="text-gray-400 mt-2 text-sm max-w-md mx-auto">
            Erratic performance before. Steady growth after.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FreezePlayer component={ChaoticScene} label="Before" labelColor="text-red-400" />
          <FreezePlayer component={GrowthScene} label="After" labelColor="text-[#0f1b2d]" />
        </div>
      </div>
    </section>
  );
}
