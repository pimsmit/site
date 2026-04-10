import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Section } from "@/components/section";
import {
  CalendarClock,
  BarChart3,
  Bot,
  Package,
  Users,
  Smartphone,
  ArrowRight,
  ChevronRight,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Franchise AI — Ainomiq",
  description:
    "AI-powered operations for franchise businesses. Smart scheduling, real-time analytics, and autonomous store management.",
};

const modules = [
  {
    icon: CalendarClock,
    title: "Smart Scheduling",
    body: "AI plans staffing based on predicted demand. No more overstaffing during slow hours or understaffing during rush.",
  },
  {
    icon: BarChart3,
    title: "Real-time Analytics",
    body: "Live dashboards per location. Compare stores, spot issues instantly, and make decisions based on data — not gut feeling.",
  },
  {
    icon: Bot,
    title: "AI Store Assistant",
    body: "Voice-powered help for employees. Training, procedures, product questions — answered instantly by AI, 24/7.",
  },
  {
    icon: Package,
    title: "Inventory & Waste Prediction",
    body: "Order smarter, waste less. AI predicts demand patterns and auto-suggests optimal inventory levels.",
  },
  {
    icon: Users,
    title: "Labour Optimization",
    body: "Reduce labour cost from 34% to 25-28%. AI identifies overspend patterns and suggests actionable cuts.",
  },
  {
    icon: Smartphone,
    title: "Manager Dashboard",
    body: "Everything in one app. Store performance, team scheduling, AI insights, and alerts — all in your pocket.",
  },
];

const stats = [
  { value: "30%", label: "Less labour waste" },
  { value: "2 weeks", label: "Implementation time" },
  { value: "24/7", label: "AI assistant — no extra staff" },
  { value: "6", label: "Intelligent modules" },
];

const steps = [
  {
    num: "01",
    title: "Connect",
    body: "We integrate with your POS, planning tools, and data systems. No disruption to daily operations.",
  },
  {
    num: "02",
    title: "Deploy",
    body: "AI modules go live within two weeks. Your team gets hands-on training from day one.",
  },
  {
    num: "03",
    title: "Optimize",
    body: "The system learns and improves continuously. Better predictions, smarter scheduling, lower costs — every single day.",
  },
];

const sectors = [
  { emoji: "🍕", name: "Quick Service Restaurants", examples: "Pizza, burgers, coffee chains" },
  { emoji: "🛒", name: "Retail Franchises", examples: "Convenience, fashion, home goods" },
  { emoji: "🏋️", name: "Fitness & Wellness", examples: "Gyms, studios, health clubs" },
  { emoji: "🧹", name: "Service Franchises", examples: "Cleaning, automotive, maintenance" },
  { emoji: "🏨", name: "Hospitality", examples: "Hotels, hostels, vacation rentals" },
  { emoji: "🎓", name: "Education", examples: "Tutoring, language schools, training centers" },
];

export default function FranchisePage() {
  return (
    <>
      {/* Hero */}
      <section className="pt-40 pb-24 px-6">
        <div className="mx-auto max-w-4xl">
          <div className="mb-6 inline-flex items-center rounded-full bg-ainomiq-blue-glow px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-ainomiq-blue">
            Franchise AI
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight leading-[1.05] mb-6">
            Your franchise runs on people.{" "}
            <span className="gradient-text">What if it also ran on AI?</span>
          </h1>
          <p className="text-lg text-ainomiq-text-muted max-w-2xl leading-relaxed mb-8">
            High turnover, inconsistent quality, rising labour costs — every franchise deals with it. Ainomiq builds AI systems that solve these problems from day one, and keep getting smarter over time.
          </p>
          <div className="flex flex-wrap gap-3">
            <Button
              asChild
              size="lg"
              className="rounded-full bg-ainomiq-blue hover:bg-ainomiq-blue-hover text-white px-8 h-12"
            >
              <Link href="/contact">Book a demo</Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="rounded-full border-ainomiq-border px-8 h-12"
            >
              <a href="#platform">See what we build <ChevronRight className="ml-1 h-4 w-4" /></a>
            </Button>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 px-6 bg-ainomiq-navy-light">
        <div className="mx-auto max-w-6xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((s) => (
              <div key={s.label} className="text-center">
                <div className="text-3xl md:text-4xl font-extrabold tracking-tight text-ainomiq-blue mb-1">
                  {s.value}
                </div>
                <div className="text-sm text-ainomiq-text-muted">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Platform modules */}
      <section id="platform" className="scroll-mt-28 py-24 px-6">
        <div className="mx-auto max-w-6xl">
          <div className="mb-16">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-ainomiq-blue">
              The Platform
            </span>
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight mt-4 mb-4">
              AiNomiq Franchise OS
            </h2>
            <p className="text-ainomiq-text-muted text-lg max-w-2xl leading-relaxed">
              Six intelligent modules that work together to optimize every aspect of your franchise operations.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {modules.map((m) => (
              <Card key={m.title} className="bg-white border-ainomiq-border">
                <CardContent className="p-6">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-ainomiq-blue-glow">
                    <m.icon className="h-6 w-6 text-ainomiq-blue" />
                  </div>
                  <h3 className="font-bold mb-2">{m.title}</h3>
                  <p className="text-sm text-ainomiq-text-muted leading-relaxed">
                    {m.body}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <Section label="How it works" className="bg-ainomiq-navy-light">
        <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-16">
          Live in three steps
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((s) => (
            <div key={s.num}>
              <span className="text-4xl font-extrabold text-ainomiq-blue/20 block mb-3">
                {s.num}
              </span>
              <h3 className="text-xl font-bold mb-2">{s.title}</h3>
              <p className="text-ainomiq-text-muted leading-relaxed">
                {s.body}
              </p>
            </div>
          ))}
        </div>
      </Section>

      {/* Sectors */}
      <section className="py-24 px-6">
        <div className="mx-auto max-w-6xl">
          <div className="mb-16">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-ainomiq-blue">
              Built for every franchise
            </span>
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight mt-4 mb-4">
              Works across industries
            </h2>
            <p className="text-ainomiq-text-muted text-lg max-w-2xl leading-relaxed">
              Our platform adapts to any franchise model. Same powerful AI, tailored to your operations.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {sectors.map((s) => (
              <div
                key={s.name}
                className="rounded-2xl border border-ainomiq-border p-6 hover:border-ainomiq-blue/30 transition-colors"
              >
                <span className="text-3xl block mb-3">{s.emoji}</span>
                <h3 className="font-bold mb-1">{s.name}</h3>
                <p className="text-sm text-ainomiq-text-muted">{s.examples}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Case study teaser */}
      <section className="py-24 px-6 bg-ainomiq-navy-light">
        <div className="mx-auto max-w-4xl text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-ainomiq-blue">
            Case study
          </span>
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight mt-4 mb-4">
            Powering AI store operations for a top-10 franchise
          </h2>
          <p className="text-ainomiq-text-muted text-lg max-w-2xl mx-auto leading-relaxed mb-8">
            We&apos;re building AI-driven store operations for one of the world&apos;s largest quick-service restaurant chains. Real-time insights, smart scheduling, and an AI assistant that speaks every language in the kitchen.
          </p>
          <Button
            asChild
            size="lg"
            className="rounded-full bg-ainomiq-blue hover:bg-ainomiq-blue-hover text-white px-8 h-12"
          >
            <Link href="/contact">
              Learn more <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>

      {/* CTA */}
      <section className="py-32 px-6 text-center">
        <div className="mx-auto max-w-2xl">
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-6">
            Discover what AI can do for your franchise
          </h2>
          <p className="text-lg text-ainomiq-text-muted mb-10 max-w-lg mx-auto">
            Book a 30-minute demo and see how Ainomiq can transform your operations.
          </p>
          <Button
            asChild
            size="lg"
            className="rounded-full bg-ainomiq-blue hover:bg-ainomiq-blue-hover text-white px-10 h-12"
          >
            <Link href="/contact">Book a demo</Link>
          </Button>
        </div>
      </section>
    </>
  );
}
