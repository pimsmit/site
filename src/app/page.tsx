import Link from "next/link";
import { FeatureCarousel } from "@/components/ui/feature-carousel";
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
                alt="Pim Smit & Bink Sanders - Co-Founders of Ainomiq"
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
                    className="rounded-full border-white/30 hover:border-white/60 bg-ainomiq-navy/10 backdrop-blur-sm text-white hover:bg-ainomiq-navy/20 ml-6 shrink-0"
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
                className="rounded-full border-ainomiq-border hover:border-ainomiq-border-hover bg-ainomiq-navy text-ainomiq-text"
              >
                <Link href="/about">
                  Read more <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Globe - Social Proof */}
      <section className="py-24 px-6 overflow-hidden bg-ainomiq-navy">
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
                Amsterdam to Berlin, from London to Madrid - optimized
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
              <WireframeGlobe width={500} height={500} bgColor="#ffffff" />
            </div>
          </div>
        </div>
      </section>
      {/* Feature Carousel */}
      <section className="py-16 px-4 bg-ainomiq-navy">
        <FeatureCarousel />
      </section>
      {/* Why we're different - CTA strip above footer */}
      <section className="bg-ainomiq-navy">
        <div className="mx-auto max-w-6xl px-6 py-20 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <span className="inline-block rounded-full border border-ainomiq-border px-3 py-1 text-xs font-semibold text-ainomiq-text-subtle uppercase tracking-wider mb-6">
              Why Ainomiq
            </span>
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-6">
              Built different.<br />Works differently.
            </h2>
            <p className="text-ainomiq-text-muted text-lg leading-relaxed mb-8 max-w-md">
              Most automation tools bolt AI on top of old software. We built Ainomiq from the ground up - one platform, every channel, fully autonomous.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild size="lg" className="rounded-full bg-ainomiq-blue hover:bg-ainomiq-blue-hover text-white">
                <Link href="https://app.ainomiq.com">Get started free</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="rounded-full border-ainomiq-border hover:border-ainomiq-border-hover bg-transparent text-ainomiq-text">
                <Link href="/contact">Talk to us</Link>
              </Button>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-4">
            {[
              { title: "No legacy software", body: "Built from scratch for AI-first operations. No retrofitting, no workarounds." },
              { title: "One platform, everything", body: "Automation, analytics, and AI agents - one login, one dashboard, full control across your entire operation." },
              { title: "Truly autonomous", body: "Not just suggestions. Ainomiq acts: executes tasks, makes decisions, and delivers results - 24/7." },
              { title: "Fits your stack", body: "We integrate with the tools you already use - from CRMs and ERPs to e-commerce platforms and marketing tools." },
            ].map((item) => (
              <div key={item.title} className="flex gap-4 p-5 rounded-xl border border-ainomiq-border bg-ainomiq-surface">
                <div className="mt-0.5 h-2 w-2 rounded-full bg-ainomiq-blue shrink-0" />
                <div>
                  <p className="font-semibold text-sm mb-1">{item.title}</p>
                  <p className="text-sm text-ainomiq-text-muted leading-relaxed">{item.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

    </>
  );
}
