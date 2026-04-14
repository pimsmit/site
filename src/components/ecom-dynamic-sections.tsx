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
      <section className="pt-28 md:pt-36 pb-0 px-6 bg-white">
        <div className="mx-auto max-w-2xl text-center pb-20 md:pb-28">
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-[#0f1b2d]">
            Connect once.<br />Run forever.
          </h2>
        </div>
      </section>

      <SplineSceneBasic />
      <FeaturedModulesScroll />
      {children}
      <WaitlistSection />
    </>
  );
}
