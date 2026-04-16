"use client";

import dynamic from "next/dynamic";

const SplineScene = dynamic(
  () => import("@/components/ui/spline").then((mod) => mod.SplineScene),
  { ssr: false, loading: () => <div className="w-full h-full bg-gradient-to-br from-blue-100/30 to-blue-50/20 rounded-2xl animate-pulse" /> }
);

export function BuildYourSolution() {
  return (
    <section className="relative w-full py-20 md:py-32 px-6 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-center gap-12 md:gap-16">
          {/* Left — text content */}
          <div className="flex-1 space-y-6">
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-ainomiq-text leading-tight">
              We build your
              <br />
              <span className="text-ainomiq-blue">digital workforce.</span>
            </h2>
            <p className="text-lg text-ainomiq-text-muted max-w-lg leading-relaxed">
              Chatbots that handle your customers. Dashboards that run your operations. Integrations that connect everything. Custom-built for your business.
            </p>

            <div className="space-y-4 pt-2">
              {[
                { title: "Customer support bots", desc: "Email, Instagram, Facebook — 24/7 automated responses" },
                { title: "Custom dashboards", desc: "Real-time analytics, inventory, and performance tracking" },
                { title: "API integrations", desc: "Connect Shopify, Klaviyo, Meta, and any platform you use" },
              ].map((item) => (
                <div key={item.title} className="flex items-start gap-3">
                  <div className="mt-1.5 w-2 h-2 rounded-full bg-ainomiq-blue shrink-0" />
                  <div>
                    <p className="font-semibold text-ainomiq-text">{item.title}</p>
                    <p className="text-sm text-ainomiq-text-muted">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right — Spline robot */}
          <div className="flex-1 relative h-[400px] md:h-[500px] w-full">
            <SplineScene
              scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
              className="w-full h-full"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
