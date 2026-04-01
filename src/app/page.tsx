import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Section } from "@/components/section";
import { BeamsBackground } from "@/components/ui/beams-background";
import WireframeGlobe from "@/components/ui/wireframe-dotted-globe";
import {
  Bot,
  BarChart3,
  Mail,
  Package,
  Gauge,
  Workflow,
  Zap,
  Clock,
  Shield,
  ArrowRight,
  Check,
} from "lucide-react";

const trustedBy = [
  "Domino's",
  "Billie Jeans",
  "Enterprise Co.",
  "RetailMax",
  "FoodFlow",
  "LogiTech NL",
  "StyleHouse",
  "DataDriven",
  "ScaleUp Labs",
  "CloudFirst",
  "Domino's",
  "Billie Jeans",
  "Enterprise Co.",
  "RetailMax",
  "FoodFlow",
  "LogiTech NL",
  "StyleHouse",
  "DataDriven",
  "ScaleUp Labs",
  "CloudFirst",
];

const features = [
  {
    icon: Bot,
    title: "AI Customer Service",
    description:
      "24/7 intelligent support that answers questions, resolves issues, and frees up your team.",
  },
  {
    icon: BarChart3,
    title: "Ads & Marketing",
    description:
      "Automated campaigns, creative testing, and ROAS optimization on autopilot.",
  },
  {
    icon: Mail,
    title: "Email Automation",
    description:
      "Personalized flows that convert. From welcome to win-back, fully AI-driven.",
  },
  {
    icon: Package,
    title: "Inventory Intelligence",
    description:
      "Predict demand, prevent stockouts, and optimize inventory with AI forecasting.",
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

const pricingPlans = [
  {
    name: "App",
    price: "€149",
    period: "/month",
    description: "For webshops looking to grow with AI",
    features: [
      "AI Customer Service agent",
      "Marketing automation",
      "Performance dashboard",
      "Email automation",
      "Shopify / WooCommerce integration",
      "Dedicated support",
    ],
    cta: "Get started",
    featured: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "",
    description: "For organizations automating at scale",
    features: [
      "Everything in App",
      "Custom AI agents",
      "Process automation",
      "Data analytics & insights",
      "Custom API integrations",
      "Dedicated team & SLA",
    ],
    cta: "Contact us",
    featured: false,
  },
];

export default function HomePage() {
  return (
    <>
      {/* Hero — BeamsBackground */}
      <BeamsBackground intensity="strong">
        <div className="flex flex-col items-center justify-center gap-6 px-6 text-center max-w-4xl">
          <div className="inline-flex items-center rounded-full bg-ainomiq-blue/10 backdrop-blur-sm px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-ainomiq-blue animate-float-up">
            Always Ahead
          </div>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-tight leading-[1.08] text-ainomiq-text animate-float-up delay-100">
            <span className="block">Always</span>
            <span className="block gradient-text">Ahead.</span>
          </h1>
          <p className="text-lg md:text-xl text-ainomiq-text-muted max-w-2xl animate-float-up delay-200">
            We build AI that runs — not reports that gather dust.
            Real automation, real results, from week one.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 animate-float-up delay-300">
            <Button
              asChild
              size="lg"
              className="rounded-full bg-ainomiq-blue hover:bg-ainomiq-blue-hover text-white px-8 h-12 text-base shadow-lg shadow-ainomiq-blue/25"
            >
              <Link href="/contact">Book a call</Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="rounded-full border-ainomiq-border hover:border-ainomiq-border-hover bg-white/60 backdrop-blur-sm text-ainomiq-text px-8 h-12 text-base"
            >
              <Link href="/platform">Explore platform</Link>
            </Button>
          </div>
        </div>
      </BeamsBackground>

      {/* Trusted By — Marquee */}
      <div className="border-y border-ainomiq-border overflow-hidden py-6">
        <div className="flex gap-12 animate-marquee w-max">
          {trustedBy.map((name, i) => (
            <span
              key={i}
              className="text-sm font-semibold uppercase tracking-wider text-ainomiq-text-subtle whitespace-nowrap opacity-50"
            >
              {name}
            </span>
          ))}
        </div>
      </div>

      {/* Why Us */}
      <Section label="Why ainomiq">
        <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-4">
          What makes us different
        </h2>
        <p className="text-ainomiq-text-muted text-lg max-w-xl mb-16">
          Not a consultancy that writes reports. We build AI that runs.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            {
              icon: Zap,
              title: "Always the latest technology",
              body: "We run on the newest models and frameworks. What was cutting-edge yesterday is our baseline today.",
            },
            {
              icon: Clock,
              title: "Live within 2 weeks",
              body: "No months-long projects. We analyze, build, and implement. Results from day one.",
            },
            {
              icon: Shield,
              title: "No legacy, no baggage",
              body: "Every solution is built with tomorrow's technology. No outdated systems, no assumptions.",
            },
          ].map((item) => (
            <Card
              key={item.title}
              className="bg-ainomiq-surface border-ainomiq-border hover:border-ainomiq-border-hover transition-colors group"
            >
              <CardContent className="p-8">
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-ainomiq-blue-glow">
                  <item.icon className="h-6 w-6 text-ainomiq-blue" />
                </div>
                <h3 className="text-lg font-bold mb-2">{item.title}</h3>
                <p className="text-sm text-ainomiq-text-muted leading-relaxed">
                  {item.body}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </Section>

      {/* Features Grid */}
      <Section label="Platform" className="bg-ainomiq-navy-light">
        <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-4">
          Everything you need
        </h2>
        <p className="text-ainomiq-text-muted text-lg max-w-xl mb-16">
          Six AI modules that work together to automate your business.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {features.map((feature) => (
            <Card
              key={feature.title}
              className="bg-white border-ainomiq-border hover:border-ainomiq-border-hover transition-all group hover:-translate-y-1"
            >
              <CardContent className="p-8">
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-ainomiq-blue-glow">
                  <feature.icon className="h-6 w-6 text-ainomiq-blue" />
                </div>
                <h3 className="text-lg font-bold mb-2">{feature.title}</h3>
                <p className="text-sm text-ainomiq-text-muted leading-relaxed">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="mt-10 text-center">
          <Button
            asChild
            variant="outline"
            className="rounded-full border-ainomiq-border hover:border-ainomiq-border-hover bg-white text-ainomiq-text"
          >
            <Link href="/platform">
              View full platform <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </Section>

      {/* Globe — Social Proof */}
      <section className="py-24 px-6 overflow-hidden">
        <div className="mx-auto max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="mb-6 inline-flex items-center rounded-full bg-ainomiq-blue-glow px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-ainomiq-blue">
                From the Netherlands, for Europe
              </div>
              <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-6">
                Active in <span className="gradient-text">8+ countries</span>
              </h2>
              <p className="text-ainomiq-text-muted text-lg leading-relaxed mb-8 max-w-lg">
                Our AI solutions run for businesses across Europe. From
                Amsterdam to Berlin, from London to Madrid — optimized
                for local markets.
              </p>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <div className="text-3xl font-extrabold tracking-tight text-ainomiq-text">
                    8+
                  </div>
                  <div className="text-sm text-ainomiq-text-muted">Countries</div>
                </div>
                <div>
                  <div className="text-3xl font-extrabold tracking-tight text-ainomiq-text">
                    24/7
                  </div>
                  <div className="text-sm text-ainomiq-text-muted">
                    AI Operations
                  </div>
                </div>
                <div>
                  <div className="text-3xl font-extrabold tracking-tight text-ainomiq-text">
                    {"<"}2 wk
                  </div>
                  <div className="text-sm text-ainomiq-text-muted">
                    Time to live
                  </div>
                </div>
                <div>
                  <div className="text-3xl font-extrabold tracking-tight text-ainomiq-text">
                    99.9%
                  </div>
                  <div className="text-sm text-ainomiq-text-muted">Uptime</div>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <WireframeGlobe width={500} height={500} />
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <Section label="Pricing" id="pricing" className="bg-ainomiq-navy-light">
        <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-4">
          Simple pricing, no surprises
        </h2>
        <p className="text-ainomiq-text-muted text-lg max-w-xl mb-16">
          Start small, scale up. No long-term contracts.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
          {pricingPlans.map((plan) => (
            <Card
              key={plan.name}
              className={`border-ainomiq-border bg-white ${
                plan.featured ? "ring-2 ring-ainomiq-blue" : ""
              }`}
            >
              <CardContent className="p-8">
                {plan.featured && (
                  <span className="mb-4 inline-block rounded-full bg-ainomiq-blue px-3 py-1 text-xs font-semibold text-white">
                    Popular
                  </span>
                )}
                <h3 className="text-xl font-bold mb-1">{plan.name}</h3>
                <div className="mb-1">
                  <span className="text-4xl font-extrabold tracking-tight">
                    {plan.price}
                  </span>
                  <span className="text-ainomiq-text-muted text-sm">
                    {plan.period}
                  </span>
                </div>
                <p className="text-sm text-ainomiq-text-muted mb-6">
                  {plan.description}
                </p>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((f) => (
                    <li
                      key={f}
                      className="flex items-center gap-2.5 text-sm text-ainomiq-text-muted"
                    >
                      <Check className="h-4 w-4 text-ainomiq-blue shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
                <Button
                  asChild
                  className={`w-full rounded-full ${
                    plan.featured
                      ? "bg-ainomiq-blue hover:bg-ainomiq-blue-hover text-white"
                      : "bg-ainomiq-navy-light border border-ainomiq-border hover:border-ainomiq-border-hover text-ainomiq-text"
                  }`}
                >
                  <Link href="/contact">{plan.cta}</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </Section>

      {/* Final CTA */}
      <section className="py-32 px-6 text-center">
        <div className="mx-auto max-w-2xl">
          <h2 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6">
            Always <span className="gradient-text">ahead.</span>
          </h2>
          <p className="text-lg text-ainomiq-text-muted mb-10 max-w-lg mx-auto">
            Book a free 30-minute strategy call. No sales pitch,
            just real insights into the possibilities.
          </p>
          <Button
            asChild
            size="lg"
            className="rounded-full bg-ainomiq-blue hover:bg-ainomiq-blue-hover text-white px-10 h-12 text-base"
          >
            <Link href="/contact">Book a call</Link>
          </Button>
        </div>
      </section>
    </>
  );
}
