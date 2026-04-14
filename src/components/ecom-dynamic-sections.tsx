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
      <SplineSceneBasic />
      <FeaturedModulesScroll />
      {children}
      <WaitlistSection />
    </>
  );
}
