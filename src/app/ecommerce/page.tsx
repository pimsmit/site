import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Section } from "@/components/section";
import { AinomiqHeroScroll } from "@/components/ui/ainomiq-hero-scroll";
import { SplineSceneBasic } from "@/components/ui/spline-scene-basic";
import { WaitlistSection } from "@/components/ui/waitlist-section";
import {
  Bot,
  BarChart3,
  Mail,
  Package,
  Gauge,
  Workflow,
  ArrowRight,
  Check,
  ShoppingCart,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Ecommerce Application",
  description:
    "The Ainomiq app: intelligent modules working together to automate your e-commerce business.",
};

const featuredModules = [
  {
    id: "customer-service",
    icon: Bot,
    title: "Intelligent Customer Service",
    headline: "Your support team that never sleeps",
    description:
      "An intelligent agent that answers customer questions 24/7, handles returns, and identifies escalations. Trained on your products, tone of voice, and policies.",
    capabilities: [
      "Multilingual support across 30+ languages",
      "Sentiment analysis and auto-escalation",
      "Handles 200+ tickets per day",
      "Trained on your brand voice and policies",
    ],
    stat: "200+",
    statLabel: "tickets handled daily",
  },
  {
    id: "smart-inventory",
    icon: Package,
    title: "Smart Inventory",
    headline: "Predict demand before it happens",
    description:
      "Intelligent forecasting that prevents stockouts and minimizes overstock. Real-time tracking across all your warehouses and sales channels.",
    capabilities: [
      "Predictive demand forecasting",
      "Automatic reorder alerts",
      "Seasonal trend analysis",
      "Multi-warehouse sync",
    ],
    stat: "30%",
    statLabel: "less overstock",
  },
  {
    id: "email-marketing",
    icon: Mail,
    title: "E-mail Marketing",
    headline: "Automated flows that convert",
    description:
      "Personalized email flows from welcome to win-back. Intelligently optimizes timing, subject lines, and content for maximum conversions.",
    capabilities: [
      "Optimized send times",
      "Dynamic personalization",
      "Automated A/B testing",
      "Smart segmentation",
    ],
    stat: "3.2x",
    statLabel: "higher conversion",
  },
];

const moreModules = [
  {
    icon: BarChart3,
    title: "Ads & Marketing",
    description:
      "Automated campaigns, creative testing, and ROAS optimization on autopilot.",
  },
  {
    icon: Gauge,
    title: "Performance Analytics",
    description:
      "Real-time dashboards with actionable insights. See exactly what works and why.",
  },
  {
    icon: Workflow,
    title: "Workflow Automations",
    description:
      "Connect your systems and eliminate manual work. From order to fulfillment, automated.",
  },
];

export default function PlatformPage() {
  return (
    <>
      {/* Hero */}
      <AinomiqHeroScroll />
      <SplineSceneBasic />

      {/* Featured Modules — scrollable sections */}
      {featuredModules.map((mod, i) => (
        <section
          key={mod.id}
          id={mod.id}
          className={`scroll-mt-28 py-24 px-6 ${i % 2 === 0 ? "bg-ainomiq-navy-light" : ""}`}
        >
          <div className="mx-auto max-w-5xl">
            <div className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${i % 2 !== 0 ? "lg:grid-flow-dense" : ""}`}>
              <div className={i % 2 !== 0 ? "lg:col-start-2" : ""}>
                <div className="mb-4 inline-flex items-center rounded-full bg-ainomiq-blue-glow px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-ainomiq-blue">
                  {String(i + 1).padStart(2, "0")} — {mod.title}
                </div>
                <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-4">
                  {mod.headline}
                </h2>
                <p className="text-ainomiq-text-muted text-lg leading-relaxed mb-8">
                  {mod.description}
                </p>
                <ul className="space-y-3">
                  {mod.capabilities.map((cap) => (
                    <li
                      key={cap}
                      className="flex items-center gap-3 text-sm text-ainomiq-text-muted"
                    >
                      <Check className="h-4 w-4 text-ainomiq-blue shrink-0" />
                      {cap}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Stat card */}
              <div className={`flex items-center justify-center ${i % 2 !== 0 ? "lg:col-start-1" : ""}`}>
                <Card className="bg-white border-ainomiq-border w-full max-w-sm">
                  <CardContent className="p-10 text-center">
                    <div className="mb-4 mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-ainomiq-blue-glow">
                      <mod.icon className="h-8 w-8 text-ainomiq-blue" />
                    </div>
                    <div className="text-5xl font-extrabold tracking-tight text-[#0f1b2d] mb-2">
                      {mod.stat}
                    </div>
                    <p className="text-sm text-ainomiq-text-muted">
                      {mod.statLabel}
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>
      ))}

      {/* Industry — E-commerce */}
      <section id="ecommerce" className="scroll-mt-28 py-24 px-6 bg-ainomiq-navy-light">
        <div className="mx-auto max-w-5xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="mb-4 inline-flex items-center rounded-full bg-ainomiq-blue-glow px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-ainomiq-blue">
                E-commerce
              </div>
              <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-4">
                Built for webshops that want to scale
              </h2>
              <p className="text-ainomiq-text-muted text-lg leading-relaxed mb-8">
                Whether you sell 50 or 5,000 orders a day — our platform handles customer service, inventory, marketing, and analytics so you can focus on growing your brand.
              </p>
              <ul className="space-y-3">
                {[
                  "Shopify, WooCommerce & custom integrations",
                  "Automated handling of returns, tracking, and FAQs",
                  "Automated ad campaigns with ROAS optimization",
                  "Real-time profit and performance dashboards",
                ].map((cap) => (
                  <li key={cap} className="flex items-center gap-3 text-sm text-ainomiq-text-muted">
                    <Check className="h-4 w-4 text-ainomiq-blue shrink-0" />
                    {cap}
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex items-center justify-center">
              <Card className="bg-white border-ainomiq-border w-full max-w-sm">
                <CardContent className="p-10 text-center">
                  <div className="mb-4 mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-ainomiq-blue-glow">
                    <ShoppingCart className="h-8 w-8 text-ainomiq-blue" />
                  </div>
                  <div className="text-5xl font-extrabold tracking-tight text-[#0f1b2d] mb-2">
                    5,000+
                  </div>
                  <p className="text-sm text-ainomiq-text-muted">
                    orders per day, fully automated
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* More Modules */}
      <Section label="And more">
        <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-4">
          Plus three more modules
        </h2>
        <p className="text-ainomiq-text-muted text-lg max-w-xl mb-12">
          Everything working together to run your e-commerce on autopilot.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {moreModules.map((mod) => (
            <Card
              key={mod.title}
              className="bg-white border-ainomiq-border hover:border-ainomiq-border-hover transition-all hover:-translate-y-1"
            >
              <CardContent className="p-8">
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-ainomiq-blue-glow">
                  <mod.icon className="h-6 w-6 text-ainomiq-blue" />
                </div>
                <h3 className="text-lg font-bold mb-2">{mod.title}</h3>
                <p className="text-sm text-ainomiq-text-muted leading-relaxed">
                  {mod.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </Section>

      {/* CTA */}
      <section className="py-32 px-6 text-center">
        <div className="mx-auto max-w-2xl">
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-6">
            Ready to automate?
          </h2>
          <p className="text-lg text-ainomiq-text-muted mb-10 max-w-lg mx-auto">
            Start with one module, grow to the full app. We help you with the
            right roadmap.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Button
              asChild
              size="lg"
              className="rounded-full bg-ainomiq-blue hover:bg-ainomiq-blue-hover text-white px-8 h-12"
            >
              <Link href="/get-started">Get started free</Link>
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

      {/* Waitlist */}
      <WaitlistSection />
    </>
  );
}
