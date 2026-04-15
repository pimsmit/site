import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Section } from "@/components/section";
import WireframeGlobe from "@/components/ui/wireframe-dotted-globe";
import { AnimatedCounter } from "@/components/animated-counter";
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
  Plus,
} from "lucide-react";
import { HeroSection, LogosSection } from "@/components/ui/hero-1";
import { LocalizedPrice } from "@/components/localized-price";

const features = [
  {
    icon: Bot,
    title: "Intelligent Customer Service",
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
      "Personalized flows that convert. From welcome to win-back, fully automated.",
  },
  {
    icon: Package,
    title: "Inventory Intelligence",
    description:
      "Predict demand, prevent stockouts, and optimize inventory with predictive forecasting.",
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

const pricingPlans: {
  name: string;
  amount?: number;
  price?: string;
  period: string;
  description: string;
  features: { label: string; icon: "check" | "plus" }[];
  cta: string;
  href: string;
  featured: boolean;
}[] = [
  {
    name: "App",
    amount: 0,
    period: "/month",
    description: "For webshops looking to grow",
    features: [
      { label: "Precise Performance", icon: "check" },
      { label: "Mail Engine", icon: "plus" },
      { label: "Smart Inventory", icon: "plus" },
      { label: "24/7 Support", icon: "plus" },
    ],
    cta: "Get started",
    href: "/get-started",
    featured: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "",
    description: "For organizations automating at scale",
    features: [
      { label: "Tailored Systems", icon: "check" },
      { label: "Custom Integrations", icon: "check" },
      { label: "Operations on Autopilot", icon: "check" },
      { label: "White-Glove Service", icon: "check" },
    ],
    cta: "Contact us",
    href: "/contact",
    featured: false,
  },
];

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <HeroSection />

      {/* Logo Cloud */}
      <LogosSection />

      {/* Meet the Founders */}
      <section className="py-24 px-6">
        <div className="mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight">
              Meet the Founders
            </h2>
          </div>

          {/* Photo with overlay (desktop) / text below (mobile) */}
          <div className="max-w-4xl mx-auto">
            <div className="group relative aspect-[16/9] overflow-hidden rounded-3xl">
              <img
                src="/team/founders.jpg?v=2"
                alt="Pim Smit & Bink Sanders — Co-Founders of Ainomiq"
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent md:from-black/70 md:via-black/20" />
              {/* Names always on image */}
              <div className="absolute bottom-0 left-0 right-0 p-5 md:p-10">
                <h3 className="text-xl md:text-4xl font-extrabold text-white">
                  Pim Smit &amp; Bink Sanders
                </h3>
                {/* Desktop: text left, Read more right */}
                <div className="hidden md:flex items-end justify-between mt-4">
                  <p className="text-white/80 text-base leading-relaxed max-w-md">
                    Ainomiq started with two childhood friends who shared the same obsession: AI.
                    Bink came from years in IT. Pim from e-commerce. Different worlds, same fascination.
                  </p>
                  <Button
                    asChild
                    variant="outline"
                    className="rounded-full border-white/30 hover:border-white/60 bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 ml-6 shrink-0"
                  >
                    <Link href="/about">
                      Read more <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </div>
            </div>

            {/* Mobile: text + CTA below image */}
            <div className="md:hidden mt-6 text-center">
              <p className="text-ainomiq-text-muted text-sm leading-relaxed max-w-md mx-auto mb-5">
                Ainomiq started with two childhood friends who shared the same obsession: AI.
                Bink came from years in IT. Pim from e-commerce. Different worlds, same fascination.
              </p>
              <Button
                asChild
                variant="outline"
                className="rounded-full border-ainomiq-border hover:border-ainomiq-border-hover bg-white text-ainomiq-text"
              >
                <Link href="/about">
                  Read more <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Globe — Social Proof */}
      <section className="py-24 px-6 overflow-hidden bg-ainomiq-navy-light">
        <div className="mx-auto max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="mb-6 inline-flex items-center rounded-full bg-ainomiq-blue-glow px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-ainomiq-blue">
                From the Netherlands, worldwide
              </div>
              <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-6">
                Active in <span className="gradient-text">58 countries</span>
              </h2>
              <p className="text-ainomiq-text-muted text-lg leading-relaxed mb-8 max-w-lg">
                Our solutions run for businesses worldwide. From
                Amsterdam to Berlin, from London to Madrid — optimized
                for local markets.
              </p>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <div className="text-3xl font-extrabold tracking-tight text-ainomiq-text">
                    <AnimatedCounter end={58} suffix="+" />
                  </div>
                  <div className="text-sm text-ainomiq-text-muted">Countries</div>
                </div>
                <div>
                  <div className="text-3xl font-extrabold tracking-tight text-ainomiq-text">
                    <AnimatedCounter end={24} suffix="/7" />
                  </div>
                  <div className="text-sm text-ainomiq-text-muted">
                    Automated Operations
                  </div>
                </div>
                <div>
                  <div className="text-3xl font-extrabold tracking-tight text-ainomiq-text">
                    <AnimatedCounter end={2} suffix="M+" />
                  </div>
                  <div className="text-sm text-ainomiq-text-muted">
                    Tasks / month
                  </div>
                </div>
                <div>
                  <div className="text-3xl font-extrabold tracking-tight text-ainomiq-text">
                    <AnimatedCounter end={99.9} decimals={1} suffix="%" />
                  </div>
                  <div className="text-sm text-ainomiq-text-muted">Uptime</div>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <WireframeGlobe width={500} height={500} bgColor="#f8fafc" />
            </div>
          </div>
        </div>
      </section>

      {/* Why Us */}
      <Section label="Why ainomiq">
        <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-4">
          What makes us different
        </h2>
        <p className="text-ainomiq-text-muted text-lg max-w-xl mb-16">
          Not a consultancy that writes reports. We build automation that runs.
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
      <Section label="App" className="bg-ainomiq-navy-light">
        <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-4">
          Everything you need
        </h2>
        <p className="text-ainomiq-text-muted text-lg max-w-xl mb-16">
          Six intelligent modules that work together to automate your business.
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
            <Link href="/ecommerce">
              View full app <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </Section>

      {/* Pricing */}
      <Section label="Pricing" id="pricing">
        <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-4">
          Simple pricing, no surprises
        </h2>
        <p className="text-ainomiq-text-muted text-lg max-w-xl mb-16">
          Start small, scale up. No long-term contracts.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto items-stretch">
          {pricingPlans.map((plan) => (
            <Card
              key={plan.name}
              className={`border-ainomiq-border bg-white ${
                plan.featured ? "ring-2 ring-ainomiq-blue" : ""
              }`}
            >
              <CardContent className="p-8 flex flex-col h-full">
                <div className="h-7 mb-2">
                  {plan.featured && (
                    <span className="inline-block rounded-full bg-ainomiq-blue px-3 py-1 text-xs font-semibold text-white">
                      Popular
                    </span>
                  )}
                </div>
                <h3 className="text-xl font-bold mb-1">{plan.name}</h3>
                <div className="mb-1">
                  <span className="text-4xl font-extrabold tracking-tight">
                    {plan.amount != null ? (
                      <LocalizedPrice amount={plan.amount} />
                    ) : (
                      plan.price
                    )}
                  </span>
                  {plan.period && (
                    <span className="text-ainomiq-text-muted text-sm">
                      {plan.period}
                    </span>
                  )}
                </div>
                <p className="text-sm text-ainomiq-text-muted mb-6">
                  {plan.description}
                </p>
                <ul className="space-y-3 mb-8 flex-1">
                  {plan.features.map((f) => (
                    <li
                      key={f.label}
                      className="flex items-center gap-2.5 text-sm text-ainomiq-text-muted"
                    >
                      {f.icon === "plus" ? (
                        <Plus className="h-4 w-4 text-ainomiq-blue shrink-0" />
                      ) : (
                        <Check className="h-4 w-4 text-ainomiq-blue shrink-0" />
                      )}
                      {f.label}
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
                  <Link href={plan.href}>{plan.cta}</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </Section>

    </>
  );
}
