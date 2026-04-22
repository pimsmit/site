"use client";

import { AnimatedLineChart } from "@/components/ui/animated-line-chart";

export function GrowthChartSection() {
  return (
    <section className="py-10 md:py-16 px-6 bg-ainomiq-navy">
      <div className="mx-auto max-w-4xl">
        <div className="text-center mb-10">
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#0f1b2d]">
            What consistent automation looks like.
          </h2>
          <p className="text-ainomiq-text-subtle mt-2 text-sm max-w-md mx-auto">
            Erratic performance before. Steady growth after.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
          {/* Before */}
          <div
            className="rounded-2xl overflow-hidden border border-ainomiq-border bg-ainomiq-navy p-4"
            style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.06)" }}
          >
            <p className="text-xs font-semibold text-red-400 uppercase tracking-widest mb-3 text-center">
              Before
            </p>
            <div style={{ height: 220, position: "relative" }}>
              <AnimatedLineChart
                data={[22, 8, 31, 12, 40, 6, 28, 15, 38, 9, 25]}
                strokeColor="#f87171"
                strokeWidth={4}
                background="transparent"
                gridColor="#e5e7eb"
                showDot
                durationMs={2600}
              />
            </div>
          </div>

          {/* After */}
          <div
            className="rounded-2xl overflow-hidden border border-ainomiq-border bg-ainomiq-navy p-4"
            style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.06)" }}
          >
            <p className="text-xs font-semibold text-[#0f1b2d] uppercase tracking-widest mb-3 text-center">
              After
            </p>
            <div style={{ height: 220, position: "relative" }}>
              <AnimatedLineChart
                data={[8, 12, 18, 24, 31, 38, 46, 55, 64, 74, 85]}
                strokeColor="#3b82f6"
                strokeWidth={4}
                background="transparent"
                gridColor="#e5e7eb"
                showDot
                durationMs={2600}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
