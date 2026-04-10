import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  CalendarClock,
  BarChart3,
  Bot,
  Package,
  Users,
  Smartphone,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Franchise AI — Ainomiq",
  description:
    "AI-powered operations for franchise businesses. Smart scheduling, real-time analytics, and autonomous store management.",
};

const modules = [
  { icon: CalendarClock, title: "Smart Scheduling", body: "AI plans staffing based on predicted demand. No more overstaffing or understaffing." },
  { icon: BarChart3, title: "Real-time Analytics", body: "Live dashboards per location. Compare stores and spot issues instantly." },
  { icon: Bot, title: "AI Store Assistant", body: "Voice-powered help for employees. Training, procedures, questions — answered 24/7." },
  { icon: Package, title: "Inventory Prediction", body: "Order smarter, waste less. AI predicts demand and suggests optimal stock levels." },
  { icon: Users, title: "Labour Optimization", body: "Reduce labour cost from 34% to 25-28% with AI-driven spend analysis." },
  { icon: Smartphone, title: "Manager Dashboard", body: "Store performance, scheduling, AI insights — everything in one app." },
];

export default function FranchisePage() {
  return (
    <>
      {/* Hero */}
      <section className="pt-40 pb-16 px-6">
        <div className="mx-auto max-w-4xl">
          <div className="mb-6 inline-flex items-center rounded-full bg-ainomiq-blue-glow px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-ainomiq-blue">
            Franchise AI
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight leading-[1.05] mb-6">
            Your franchise runs on people.{" "}
            <span className="gradient-text">What if it also ran on AI?</span>
          </h1>
          <p className="text-lg text-ainomiq-text-muted max-w-2xl leading-relaxed mb-8">
            High turnover, inconsistent quality, rising labour costs — Ainomiq builds AI systems that solve these problems from day one.
          </p>
          <Button
            asChild
            size="lg"
            className="rounded-full bg-ainomiq-blue hover:bg-ainomiq-blue-hover text-white px-8 h-12"
          >
            <Link href="/contact">Book a demo</Link>
          </Button>
        </div>
      </section>

      {/* Modules */}
      <section className="py-20 px-6 bg-ainomiq-navy-light">
        <div className="mx-auto max-w-6xl">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-ainomiq-blue">The Platform</span>
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight mt-4 mb-10">
            AiNomiq Franchise OS
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {modules.map((m) => (
              <Card key={m.title} className="bg-white border-ainomiq-border">
                <CardContent className="p-6">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-ainomiq-blue-glow">
                    <m.icon className="h-6 w-6 text-ainomiq-blue" />
                  </div>
                  <h3 className="font-bold mb-2">{m.title}</h3>
                  <p className="text-sm text-ainomiq-text-muted leading-relaxed">{m.body}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6 text-center">
        <div className="mx-auto max-w-2xl">
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-6">
            Discover what AI can do for your franchise
          </h2>
          <p className="text-lg text-ainomiq-text-muted mb-10 max-w-lg mx-auto">
            Book a 30-minute demo and see how Ainomiq transforms your operations.
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
