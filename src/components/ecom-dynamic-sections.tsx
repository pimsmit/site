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
const AnimatedTestimonials = dynamic(
  () => import("@/components/ui/animated-testimonials").then(m => ({ default: m.AnimatedTestimonials })),
  { ssr: false }
);
const WaitlistSection = dynamic(
  () => import("@/components/ui/waitlist-section").then(m => ({ default: m.WaitlistSection })),
  { ssr: false }
);
const LiveCodeSection = dynamic(
  () => import("@/components/ui/live-code-section").then(m => ({ default: m.LiveCodeSection })),
  { ssr: false }
);
const GrowthChartSection = dynamic(
  () => import("@/components/ui/growth-chart-section").then(m => ({ default: m.GrowthChartSection })),
  { ssr: false }
);


export function EcomDynamicSections({ children }: { children?: React.ReactNode }) {
  return (
    <>
      <div id="customer-service" className="scroll-mt-24" />
      <AinomiqHeroScroll />

      {/* Breather - rust tussen drukke secties */}
      <section className="py-16 md:py-20 px-6 bg-ainomiq-navy">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-[#0f1b2d]">
            Connect once.<br />Run forever.
          </h2>
        </div>
      </section>

      <SplineSceneBasic />
      <div id="smart-inventory" className="scroll-mt-24" />
      <div id="email-marketing" className="scroll-mt-24" />
      <FeaturedModulesScroll />
      <AnimatedTestimonials
        testimonials={[
          {
            id: 1,
            name: "Lisa van der Berg",
            role: "Founder",
            company: "Maison Luxe",
            content: "We connected our Shopify store and within a day, customer emails were being handled automatically. Our response time went from 12 hours to under 2 minutes.",
            rating: 5,
            avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face",
          },
          {
            id: 2,
            name: "Thomas Eriksen",
            role: "Head of Operations",
            company: "Nordic Essentials",
            content: "The inventory module predicted our Q4 demand spike three weeks before it happened. We avoided stockouts on our top 5 SKUs. That alone paid for a year of Ainomiq.",
            rating: 5,
            avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
          },
          {
            id: 3,
            name: "Sophie Dubois",
            role: "E-commerce Manager",
            company: "Atelier Bloom",
            content: "Our email flows used to take a full day to set up. Now they run on autopilot - welcome series, abandoned carts, post-purchase, all personalized. Conversion is up 40%.",
            rating: 5,
            avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
          },
        ]}
      />
      {children}
      <LiveCodeSection />
      <GrowthChartSection />
      <WaitlistSection />
    </>
  );
}
