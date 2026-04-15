import type { Metadata } from "next";
import { BuildYourSolution } from "@/components/get-started/build-your-solution";
import { CustomHero } from "@/components/get-started/custom-hero";
import RadialOrbitalTimeline from "@/components/ui/radial-orbital-timeline";

export const metadata: Metadata = {
  title: "Custom Solutions - Ainomiq",
  description:
    "Need a custom automation solution? From chatbots to full dashboards — we build what you need.",
};

const PROJECT_TIMELINE = [
  {
    id: 1,
    title: "Intake",
    date: "Day 1",
    content: "You fill out the brief. We calculate cost, scope, and timeline instantly.",
    category: "Planning",
    icon: "MessageCircle" as const,
    relatedIds: [2],
    status: "completed" as const,
    energy: 100,
  },
  {
    id: 2,
    title: "Brief Review",
    date: "Day 1-2",
    content: "Our team reviews your project, refines the scope, and confirms tech stack.",
    category: "Planning",
    icon: "FileText" as const,
    relatedIds: [1, 3],
    status: "completed" as const,
    energy: 90,
  },
  {
    id: 3,
    title: "Builder Match",
    date: "Day 2-3",
    content: "We connect you with a dedicated builder. You'll meet them before work starts.",
    category: "Team",
    icon: "User" as const,
    relatedIds: [2, 4],
    status: "in-progress" as const,
    energy: 70,
  },
  {
    id: 4,
    title: "Development",
    date: "Week 1-N",
    content: "Builder starts working. Weekly updates, live demos, continuous feedback.",
    category: "Build",
    icon: "Code" as const,
    relatedIds: [3, 5],
    status: "in-progress" as const,
    energy: 60,
  },
  {
    id: 5,
    title: "Testing & QA",
    date: "Final Week",
    content: "Thorough testing, bug fixes, and final polish before handoff.",
    category: "Quality",
    icon: "Calendar" as const,
    relatedIds: [4, 6],
    status: "pending" as const,
    energy: 40,
  },
  {
    id: 6,
    title: "Launch",
    date: "Delivery",
    content: "We deploy your project. Post-launch support included for 30 days.",
    category: "Delivery",
    icon: "Rocket" as const,
    relatedIds: [5],
    status: "pending" as const,
    energy: 20,
  },
];

export default function CustomPage() {
  return (
    <div className="relative">
      {/* Single continuous background for entire page */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-100/60 via-blue-50/30 via-white via-blue-50/20 to-white -z-30" />

      {/* Hero with wizard */}
      <CustomHero />

      {/* Build Your Solution section - code + robot */}
      <BuildYourSolution />

      {/* Project Journey Timeline */}
      <section className="relative">
        <div className="py-16 px-6">
          <div className="text-center mb-8 relative z-20">
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-ainomiq-text mb-4">
              Your project journey
            </h2>
            <p className="text-ainomiq-text-muted text-lg max-w-2xl mx-auto">
              Click any node to explore the process. Related steps light up.
            </p>
          </div>

          <RadialOrbitalTimeline timelineData={PROJECT_TIMELINE} />
        </div>
      </section>
    </div>
  );
}
