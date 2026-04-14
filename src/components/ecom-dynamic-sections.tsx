"use client";

import dynamic from "next/dynamic";

const AinomiqHeroScroll = dynamic(
  () => import("@/components/ui/ainomiq-hero-scroll").then(m => ({ default: m.AinomiqHeroScroll })),
  { ssr: false }
);
const SplineSceneBasic = dynamic(
  () => import("@/components/ui/spline-scene-basic").then(m => ({ default: m.SplineSceneBasic })),
  { ssr: false, loading: () => <div className="w-full h-[500px]" /> }
);
const FeaturedModulesScroll = dynamic(
  () => import("@/components/ui/featured-modules-scroll").then(m => ({ default: m.FeaturedModulesScroll })),
  { ssr: false }
);
const WaitlistSection = dynamic(
  () => import("@/components/ui/waitlist-section").then(m => ({ default: m.WaitlistSection })),
  { ssr: false }
);

export function EcomDynamicSections({ children }: { children?: React.ReactNode }) {
  return (
    <>
      <AinomiqHeroScroll />

      {/* Breather — rust tussen drukke secties */}
      <section className="py-28 md:py-36 px-6 bg-gradient-to-b from-white via-white to-slate-50">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-[#0f1b2d] mb-4">
            Connect once.<br />Run forever.
          </h2>
          <p className="text-lg text-slate-500 max-w-md mx-auto">
            Your store keeps working while you focus on what matters.
          </p>
        </div>
      </section>

      <SplineSceneBasic />
      <FeaturedModulesScroll />
      {children}
      <WaitlistSection />
    </>
  );
}
