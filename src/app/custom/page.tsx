import type { Metadata } from "next";
import { CustomHero } from "@/components/get-started/custom-hero";
import RadialOrbitalTimeline from "@/components/ui/radial-orbital-timeline";
import {
  Calendar,
  Code,
  FileText,
  User,
  Rocket,
  MessageCircle,
} from "lucide-react";

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
    icon: MessageCircle,
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
    icon: FileText,
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
    icon: User,
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
    icon: Code,
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
    icon: Calendar,
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
    icon: Rocket,
    relatedIds: [5],
    status: "pending" as const,
    energy: 20,
  },
];

export default function CustomPage() {
  return (
    <>
      {/* Hero with wizard */}
      <CustomHero />

      {/* Project Journey Timeline */}
      <section className="relative bg-black">
        <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-white to-black pointer-events-none z-10"></div>
        <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-white to-black pointer-events-none z-10"></div>
        
        <div className="py-20 px-6">
          <div className="text-center mb-12 relative z-20">
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white mb-4">
              Your project journey
            </h2>
            <p className="text-white/60 text-lg max-w-2xl mx-auto">
              Click any node to explore the process. Related steps light up.
            </p>
          </div>

          <RadialOrbitalTimeline timelineData={PROJECT_TIMELINE} />
        </div>
      </section>
    </>
  );
}
