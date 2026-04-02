import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Section } from "@/components/section";
import {
  Gauge,
  Headset,
  Mail,
  Package,
  Cog,
  Workflow,
  ArrowRight,
  Play,
  Clock,
  Star,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Demos — AiNomiq",
  description:
    "See Ainomiq in action. Watch demos of Precise Performance, 24/7 Support, Mail Engine, Smart Inventory, and Enterprise solutions.",
};

const demos = [
  {
    icon: Gauge,
    title: "Precise Performance",
    description:
      "A unified view of your entire business. Real-time metrics, anomaly detection, and actionable recommendations — all in one dashboard.",
    duration: "2 min",
    rating: 4.9,
    tags: ["Analytics", "Real-time", "Free tier"],
    color: "bg-amber-50",
    iconColor: "text-amber-600",
    featured: true,
    plan: "App",
  },
  {
    icon: Headset,
    title: "24/7 Support",
    description:
      "Watch how 200+ customer tickets per day get resolved automatically — processing returns, answering questions, and escalating edge cases. All in your brand voice.",
    duration: "3 min",
    rating: 4.9,
    tags: ["Live demo", "Shopify", "Multilingual"],
    color: "bg-blue-50",
    iconColor: "text-blue-600",
    featured: true,
    plan: "App",
  },
  {
    icon: Mail,
    title: "Mail Engine",
    description:
      "From welcome sequences to win-back campaigns — see how flows and campaigns get optimized and sent automatically. Integrated with Klaviyo.",
    duration: "2 min",
    rating: 4.7,
    tags: ["Klaviyo", "A/B testing", "Campaigns"],
    color: "bg-emerald-50",
    iconColor: "text-emerald-600",
    featured: false,
    plan: "App",
  },
  {
    icon: Package,
    title: "Smart Inventory",
    description:
      "Predict demand before it happens. See how stockouts are prevented, reorders are triggered, and inventory stays optimized — automatically.",
    duration: "2 min",
    rating: 4.8,
    tags: ["Forecasting", "Reorder alerts", "Multi-warehouse"],
    color: "bg-violet-50",
    iconColor: "text-violet-600",
    featured: false,
    plan: "App",
  },
  {
    icon: Cog,
    title: "Tailored Systems",
    description:
      "See how we build custom automation systems for enterprise clients — from scoping to deployment in weeks, not months.",
    duration: "4 min",
    rating: 4.9,
    tags: ["Enterprise", "Custom build", "End-to-end"],
    color: "bg-slate-50",
    iconColor: "text-slate-600",
    featured: false,
    plan: "Enterprise",
  },
  {
    icon: Workflow,
    title: "Operations on Autopilot",
    description:
      "Watch how entire business processes run without manual intervention — from order intake to fulfillment, fully automated.",
    duration: "3 min",
    rating: 4.8,
    tags: ["Enterprise", "Workflows", "Integrations"],
    color: "bg-cyan-50",
    iconColor: "text-cyan-600",
    featured: false,
    plan: "Enterprise",
  },
];

export default function DemosPage() {
  return (
    <>
      {/* Hero */}
      <section className="pt-40 pb-16 px-6">
        <div className="mx-auto max-w-4xl text-center">
          <div className="mb-6 inline-flex items-center rounded-full bg-ainomiq-blue-glow px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-ainomiq-blue">
            Demos
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6 text-ainomiq-text">
            See it in{" "}
            <span className="gradient-text">action</span>
          </h1>
          <p className="text-lg text-ainomiq-text-muted max-w-xl mx-auto">
            No slides, no promises. Watch exactly how Ainomiq works for
            real businesses — from setup to results.
          </p>
        </div>
      </section>

      {/* Featured Demos */}
      <Section>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {demos
            .filter((d) => d.featured)
            .map((demo) => (
              <Card
                key={demo.title}
                className="border-ainomiq-border bg-white hover:border-ainomiq-border-hover transition-all group overflow-hidden"
              >
                {/* Video placeholder */}
                <div
                  className={`relative h-52 ${demo.color} flex items-center justify-center`}
                >
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/90 shadow-lg group-hover:scale-110 transition-transform">
                    <Play className="h-7 w-7 text-ainomiq-blue ml-1" />
                  </div>
                  <div className="absolute top-4 right-4 flex items-center gap-1.5 rounded-full bg-white/90 backdrop-blur-sm px-3 py-1 text-xs font-medium text-ainomiq-text-muted">
                    <Clock className="h-3 w-3" />
                    {demo.duration}
                  </div>
                </div>
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <div
                      className={`flex h-10 w-10 items-center justify-center rounded-xl bg-ainomiq-blue-glow`}
                    >
                      <demo.icon className="h-5 w-5 text-ainomiq-blue" />
                    </div>
                    <div className="flex items-center gap-1 ml-auto">
                      <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                      <span className="text-sm font-medium text-ainomiq-text">
                        {demo.rating}
                      </span>
                    </div>
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-ainomiq-text">
                    {demo.title}
                  </h3>
                  <p className="text-sm text-ainomiq-text-muted leading-relaxed mb-4">
                    {demo.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {demo.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-ainomiq-border px-3 py-1 text-xs font-medium text-ainomiq-text-muted"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
        </div>
      </Section>

      {/* All Demos */}
      <Section className="bg-ainomiq-navy-light">
        <h2 className="text-2xl md:text-4xl font-extrabold tracking-tight mb-10 text-ainomiq-text">
          All demos
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {demos.map((demo) => (
            <Card
              key={demo.title}
              className="border-ainomiq-border bg-white hover:border-ainomiq-border-hover transition-all group"
            >
              <CardContent className="p-6 flex items-start gap-5">
                <div
                  className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${demo.color}`}
                >
                  <demo.icon className={`h-6 w-6 ${demo.iconColor}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-bold text-ainomiq-text">
                      {demo.title}
                    </h3>
                    <span className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${
                      demo.plan === "App"
                        ? "bg-ainomiq-blue-glow text-ainomiq-blue"
                        : "bg-slate-100 text-slate-600"
                    }`}>
                      {demo.plan}
                    </span>
                    <span className="text-xs text-ainomiq-text-subtle flex items-center gap-1 ml-auto">
                      <Clock className="h-3 w-3" />
                      {demo.duration}
                    </span>
                  </div>
                  <p className="text-sm text-ainomiq-text-muted leading-relaxed">
                    {demo.description}
                  </p>
                </div>
                <Play className="h-5 w-5 text-ainomiq-text-subtle shrink-0 group-hover:text-ainomiq-blue transition-colors mt-1" />
              </CardContent>
            </Card>
          ))}
        </div>
      </Section>

      {/* CTA */}
      <section className="py-32 px-6 text-center">
        <div className="mx-auto max-w-2xl">
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-6 text-ainomiq-text">
            Ready to get started?
          </h2>
          <p className="text-lg text-ainomiq-text-muted mb-10 max-w-lg mx-auto">
            Set up your account in seconds. No credit card required.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Button
              asChild
              size="lg"
              className="rounded-full bg-ainomiq-blue hover:bg-ainomiq-blue-hover text-white px-8 h-12"
            >
              <Link href="/get-started">Get started</Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="rounded-full border-ainomiq-border hover:border-ainomiq-border-hover bg-white text-ainomiq-text px-8 h-12"
            >
              <Link href="/contact">
                Book a call <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
