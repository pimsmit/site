"use client";

import * as React from "react";

// Smooth sine-wave path for "before" (chaotic)
const BEFORE_PATH =
  "M0,58 C3,58 5,72 8,72 C11,72 13,30 16,30 C19,30 21,74 24,74 C27,74 29,26 32,26 C35,26 37,70 40,70 C43,70 45,22 48,22 C51,22 53,68 56,68 C59,68 61,20 64,20 C67,20 69,65 72,65 C75,65 77,18 80,18 C83,18 85,62 88,62 C89.5,62 90,72 90,72";

// Clean bezier growth curve for "after"
const AFTER_PATH =
  "M90,72 C100,72 106,62 114,52 C124,40 134,30 148,20 C160,12 170,8 180,6";

const BEFORE_LEN = 340;
const AFTER_LEN = 140;

export function GrowthChartSection() {
  const [phase, setPhase] = React.useState<"idle" | "before" | "activated" | "after">("idle");
  const sectionRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && phase === "idle") {
          setPhase("before");
          setTimeout(() => setPhase("activated"), 2400);
          setTimeout(() => setPhase("after"), 2900);
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
        <div className="text-center mb-10">
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#0f1b2d]">
            What consistent automation looks like.
          </h2>
          <p className="text-gray-400 mt-2 text-sm max-w-md mx-auto">
            Erratic performance before. Steady growth after.
          </p>
        </div>

        {/* Chart */}
        <div className="relative rounded-2xl bg-white px-6 pt-10 pb-6 overflow-hidden" style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.07), 0 0 0 1px rgba(0,0,0,0.05)" }}>

          {/* Ainomiq Activated pill */}
          <div
            className="absolute top-4 flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-widest transition-all duration-500"
            style={{
              left: "calc(50% - 10px)",
              transform: "translateX(-50%)",
              background: showActivated ? "rgba(59,130,246,0.07)" : "transparent",
              border: `1px solid ${showActivated ? "rgba(59,130,246,0.2)" : "transparent"}`,
              color: showActivated ? "#3b82f6" : "transparent",
              opacity: showActivated ? 1 : 0,
            }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500 inline-block" />
            Ainomiq Activated
          </div>

          <svg
            viewBox="0 0 180 90"
            className="w-full"
            style={{ height: "220px" }}
            preserveAspectRatio="none"
          >
            {/* Subtle grid */}
            {[20, 40, 60, 80].map(y => (
              <line key={y} x1={0} x2={180} y1={y} y2={y}
                stroke="#f3f4f6" strokeWidth="0.4" />
            ))}

            {/* Activation divider */}
            {showActivated && (
              <line
                x1={90} x2={90} y1={0} y2={90}
                stroke="#bfdbfe" strokeWidth="0.8" strokeDasharray="2 2"
              />
            )}

            {/* Before line */}
            {phase !== "idle" && (
              <path
                d={BEFORE_PATH}
                fill="none"
                stroke="#f87171"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeDasharray={BEFORE_LEN}
                strokeDashoffset={beforeDone ? 0 : BEFORE_LEN}
                style={{ transition: "stroke-dashoffset 2.2s cubic-bezier(0.4,0,0.2,1)" }}
              />
            )}

            {/* After line */}
            {showAfter && (
              <>
                <path
                  d={AFTER_PATH}
                  fill="none"
                  stroke="#3b82f6"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeDasharray={AFTER_LEN}
                  strokeDashoffset={AFTER_LEN}
                  style={{ animation: "drawAfterLine 1.8s cubic-bezier(0.4,0,0.2,1) forwards" }}
                />
                {/* Glow */}
                <path
                  d={AFTER_PATH}
                  fill="none"
                  stroke="#93c5fd"
                  strokeWidth="5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeDasharray={AFTER_LEN}
                  strokeDashoffset={AFTER_LEN}
                  style={{ opacity: 0.25, animation: "drawAfterLine 1.8s cubic-bezier(0.4,0,0.2,1) forwards" }}
                />
              </>
            )}
          </svg>

          <style>{`
            @keyframes drawAfterLine {
              from { stroke-dashoffset: ${AFTER_LEN}; }
              to   { stroke-dashoffset: 0; }
            }
          `}</style>

          {/* Legend */}
          <div className="flex justify-center gap-8 mt-3">
            <div className="flex items-center gap-2">
              <div className="w-5 h-px bg-red-400 rounded" style={{ height: "2px" }} />
              <span className="text-xs text-gray-400">Before</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-5 bg-blue-500 rounded" style={{ height: "2px" }} />
              <span className="text-xs text-gray-400">With Ainomiq</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
