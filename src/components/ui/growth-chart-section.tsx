"use client";

import { useEffect, useRef, useState } from "react";

// Before: chaotic zigzag across full width (0→200)
const BEFORE_PATH =
  "M0,55 C4,55 6,75 10,75 C14,75 16,25 20,25 C24,25 26,78 30,78 C34,78 36,22 40,22 C44,22 46,72 50,72 C54,72 56,18 60,18 C64,18 66,68 70,68 C74,68 76,15 80,15 C84,15 86,65 90,65 C94,65 96,12 100,12 C104,12 106,62 110,62 C114,62 116,10 120,10 C124,10 126,60 130,60 C134,60 136,8 140,8 C144,8 146,58 150,58 C154,58 156,6 160,6 C164,6 166,56 170,56 C174,56 176,5 180,5 C184,5 186,55 190,55 C194,55 197,30 200,30";

// After: smooth S-curve growth
const AFTER_PATH =
  "M0,90 C40,90 70,75 100,55 C130,35 160,15 200,5";

function AnimatedChart({
  path,
  color,
  label,
  labelColor,
  delay = 0,
  strokeWidth = 4,
}: {
  path: string;
  color: string;
  label: string;
  labelColor: string;
  delay?: number;
  strokeWidth?: number;
}) {
  const pathRef = useRef<SVGPathElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const firedRef = useRef(false);
  const [len, setLen] = useState(600);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (pathRef.current) {
      setLen(pathRef.current.getTotalLength());
    }
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !firedRef.current) {
          firedRef.current = true;
          observer.disconnect();
          setTimeout(() => setDone(true), delay);
        }
      },
      { threshold: 0.2 }
    );
    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, [delay]);

  return (
    <div
      ref={containerRef}
      className="rounded-2xl overflow-hidden border border-gray-100 bg-white p-4"
      style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.06)" }}
    >
      <p className={`text-xs font-semibold uppercase tracking-widest mb-3 text-center ${labelColor}`}>
        {label}
      </p>
      <svg
        viewBox="0 0 200 100"
        className="w-full"
        style={{ height: 200 }}
        preserveAspectRatio="none"
      >
        {/* Grid lines */}
        {[25, 50, 75].map((y) => (
          <line key={`h${y}`} x1={0} x2={200} y1={y} y2={y} stroke="#f0f0f0" strokeWidth={0.6} />
        ))}
        {[50, 100, 150].map((x) => (
          <line key={`v${x}`} x1={x} x2={x} y1={0} y2={100} stroke="#f0f0f0" strokeWidth={0.6} />
        ))}

        {/* Glow */}
        <path
          d={path}
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth * 3}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeOpacity={0.12}
          strokeDasharray={len}
          strokeDashoffset={done ? 0 : len}
          style={{
            transition: done
              ? `stroke-dashoffset 2.6s cubic-bezier(0.4,0,0.2,1)`
              : "none",
          }}
        />

        {/* Main line */}
        <path
          ref={pathRef}
          d={path}
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray={len}
          strokeDashoffset={done ? 0 : len}
          style={{
            transition: done
              ? `stroke-dashoffset 2.6s cubic-bezier(0.4,0,0.2,1)`
              : "none",
          }}
        />
      </svg>
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
          <AnimatedChart
            path={BEFORE_PATH}
            color="#f87171"
            label="Before"
            labelColor="text-red-400"
            strokeWidth={4}
            delay={0}
          />
          <AnimatedChart
            path={AFTER_PATH}
            color="#3b82f6"
            label="After"
            labelColor="text-[#0f1b2d]"
            strokeWidth={4}
            delay={300}
          />
        </div>
      </div>
    </section>
  );
}
