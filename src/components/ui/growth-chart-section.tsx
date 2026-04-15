"use client";

import * as React from "react";

const BEFORE_POINTS = [
  [0, 38], [6, 18], [12, 52], [18, 22], [24, 60], [30, 28],
  [36, 55], [42, 15], [48, 45], [54, 12], [60, 48], [66, 20],
  [72, 42], [78, 10], [84, 35], [90, 8],
];

const AFTER_POINTS = [
  [90, 8], [96, 16], [104, 24], [112, 33], [120, 40],
  [130, 50], [140, 58], [150, 66], [160, 74], [170, 82],
  [180, 88],
];

function pointsToPath(pts: number[][]): string {
  return pts.map(([x, y], i) => `${i === 0 ? "M" : "L"}${x},${100 - y}`).join(" ");
}

function pathLength(pts: number[][]): number {
  let len = 0;
  for (let i = 1; i < pts.length; i++) {
    const dx = pts[i][0] - pts[i - 1][0];
    const dy = pts[i][1] - pts[i - 1][1];
    len += Math.sqrt(dx * dx + dy * dy);
  }
  return len;
}

const BEFORE_PATH = pointsToPath(BEFORE_POINTS);
const AFTER_PATH = pointsToPath(AFTER_POINTS);
const BEFORE_LEN = Math.ceil(pathLength(BEFORE_POINTS));
const AFTER_LEN = Math.ceil(pathLength(AFTER_POINTS));

export function GrowthChartSection() {
  const [phase, setPhase] = React.useState<"idle" | "before" | "activated" | "after">("idle");
  const sectionRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && phase === "idle") {
          setPhase("before");
          setTimeout(() => setPhase("activated"), 2200);
          setTimeout(() => setPhase("after"), 2800);
        }
      },
      { threshold: 0.15 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, [phase]);

  const beforeDone = phase === "activated" || phase === "after";
  const showActivated = phase === "activated" || phase === "after";
  const showAfter = phase === "after";

  return (
    <section ref={sectionRef} className="py-10 md:py-16 px-6 bg-white">
      <div className="mx-auto max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#0f1b2d]">
            What consistent automation looks like.
          </h2>
          <p className="text-gray-400 mt-2 text-sm max-w-md mx-auto">
            Erratic performance before. Steady growth after.
          </p>
        </div>

        {/* Chart container */}
        <div className="relative rounded-2xl border border-gray-100 bg-white px-6 pt-10 pb-8 shadow-sm overflow-hidden">

          {/* "Ainomiq Activated" label */}
          <div
            className="absolute top-4 left-1/2 -translate-x-1/2 flex items-center gap-2 px-4 py-1.5 rounded-full border text-xs font-semibold uppercase tracking-widest transition-all duration-500"
            style={{
              background: showActivated ? "rgba(59,130,246,0.06)" : "transparent",
              borderColor: showActivated ? "rgba(59,130,246,0.25)" : "transparent",
              color: showActivated ? "#3b82f6" : "transparent",
              opacity: showActivated ? 1 : 0,
              transform: `translateX(-50%) translateY(${showActivated ? 0 : 6}px)`,
            }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
            Ainomiq Activated
          </div>

          <svg
            viewBox="0 0 180 100"
            className="w-full"
            style={{ height: "240px", overflow: "visible" }}
            preserveAspectRatio="none"
          >
            {/* Grid lines */}
            {[20, 40, 60, 80].map(y => (
              <line key={y} x1={0} x2={180} y1={100 - y} y2={100 - y}
                stroke="#f3f4f6" strokeWidth="0.5" />
            ))}

            {/* Divider */}
            {showActivated && (
              <line x1={90} x2={90} y1={0} y2={100}
                stroke="#3b82f6" strokeWidth="0.8" strokeDasharray="2 2"
                style={{ opacity: 0.6 }}
              />
            )}

            {/* Before line */}
            {phase !== "idle" && (
              <path
                d={BEFORE_PATH}
                fill="none"
                stroke="#ef4444"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeDasharray={BEFORE_LEN}
                strokeDashoffset={beforeDone ? 0 : BEFORE_LEN}
                style={{ transition: "stroke-dashoffset 2s ease-out" }}
              />
            )}

            {/* After line */}
            {showAfter && (
              <path
                d={AFTER_PATH}
                fill="none"
                stroke="#3b82f6"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeDasharray={AFTER_LEN}
                strokeDashoffset={0}
                style={{
                  strokeDashoffset: AFTER_LEN,
                  animation: "drawAfter 2s ease-out forwards",
                }}
              />
            )}
          </svg>

          {/* CSS animation for after line */}
          <style>{`
            @keyframes drawAfter {
              from { stroke-dashoffset: ${AFTER_LEN}; }
              to   { stroke-dashoffset: 0; }
            }
          `}</style>

          {/* Legend */}
          <div className="flex justify-center gap-8 mt-4">
            <div className="flex items-center gap-2">
              <div className="w-6 h-0.5 bg-red-500 rounded" />
              <span className="text-xs text-gray-400">Before</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-6 h-0.5 bg-blue-500 rounded" />
              <span className="text-xs text-gray-400">With Ainomiq</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
