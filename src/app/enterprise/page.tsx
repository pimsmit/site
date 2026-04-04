import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Section } from "@/components/section";
import {
  Layers,
  MessageCircle,
  Smartphone,
  Cog,
  Users,
  BarChart3,
  FileText,
  Lightbulb,
  Lock,
  Code,
  Headphones,
  BadgeCheck,
  ArrowRight,
  Check,
  Building2,
  Wrench,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Custom Solutions",
  description:
    "Custom solutions: all-in-one automation, chatbots, mobile apps, and more. Built for your business.",
};

const customSolutions = [
  {
    id: "all-in-one",
    icon: Layers,
    title: "All-in-one",
    headline: "One system to run your entire operation",
    description:
      "A fully integrated automation suite tailored to your business. From customer service to inventory, from marketing to analytics — everything connected in one platform.",
    capabilities: [
      "Custom-built for your workflows",
      "All departments in one system",
      "Real-time data across every touchpoint",
      "Scales with your business",
    ],
    stat: "1",
    statLabel: "platform, infinite possibilities",
  },
  {
    id: "chatbot",
    icon: MessageCircle,
    title: "Chatbot",
    headline: "Intelligent conversations, anywhere",
    description:
      "Intelligent chatbots for your website, WhatsApp, Instagram, and more. Trained on your knowledge base, answering questions and converting visitors into customers 24/7.",
    capabilities: [
      "Website, WhatsApp & social media",
      "Trained on your products and FAQs",
      "Seamless handoff to human agents",
      "Multi-language support",
    ],
    stat: "24/7",
    statLabel: "always available",
  },
  {
    id: "app",
    icon: Smartphone,
    title: "App",
    headline: "Your brand, in every pocket",
    description:
      "Custom iOS and Android apps built with intelligence at the core. From loyalty programs to real-time order tracking — a mobile experience your customers will love.",
    capabilities: [
      "iOS & Android (Playstore)",
      "Push notifications & engagement",
      "Integrated with your backend",
      "Smart personalization",
    ],
    stat: "2",
    statLabel: "platforms, one codebase",
  },
];

const moreSolutions = [
  {
    icon: Cog,
    title: "Process Automation",
    description:
      "Eliminate repetitive tasks. From data entry to reporting — automate what slows people down.",
  },
  {
    icon: Users,
    title: "Digital Workers",
    description:
      "Autonomous digital workers that independently execute tasks and collaborate with your team.",
  },
  {
    icon: BarChart3,
    title: "Data Analytics",
    description:
      "Real-time dashboards and predictive analytics. Better decisions based on data-driven insights.",
  },
  {
    icon: FileText,
    title: "Document Processing",
    description:
      "Automatic processing of invoices, contracts, and reports. OCR, extraction, and classification.",
  },
  {
    icon: Lightbulb,
    title: "Automation Strategy",
    description:
      "Roadmap, feasibility analysis, and implementation strategy to make your automation vision concrete.",
  },
];

const enterpriseFeatures = [
  {
    icon: Lock,
    title: "Security & Compliance",
    subtitle: "GDPR-compliant, ISO 27001, EU-hosted",
  },
  {
    icon: Code,
    title: "API Integrations",
    subtitle: "Connect with any system via REST or GraphQL",
  },
  {
    icon: Headphones,
    title: "Dedicated Support",
    subtitle: "Personal team, fast response times",
  },
  {
    icon: BadgeCheck,
    title: "SLA Guarantee",
    subtitle: "99.9% uptime, contractually guaranteed",
  },
];

const steps = [
  {
    num: "01",
    title: "Analysis",
    body: "In-depth analysis of your processes, data, and systems to identify the biggest automation opportunities.",
  },
  {
    num: "02",
    title: "Strategy",
    body: "A concrete roadmap with priorities, expected ROI, and a tailored implementation plan.",
  },
  {
    num: "03",
    title: "Implementation",
    body: "Agile development in sprints. Integration with your existing systems and extensive testing.",
  },
  {
    num: "04",
    title: "Optimization",
    body: "Continuous monitoring, adjusting, and improving. Your systems get smarter every day.",
  },
];

export default function EnterprisePage() {
  return (
    <>
      {/* Hero */}
      <section className="pt-40 pb-20 px-6">
        <div className="mx-auto max-w-4xl">
          <div className="mb-6 inline-flex items-center rounded-full bg-ainomiq-blue-glow px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-ainomiq-blue">
            Custom Solutions
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight leading-[1.05] mb-6">
            Where automation meets{" "}
            <span className="gradient-text">ambition</span>
          </h1>
          <p className="text-lg text-ainomiq-text-muted max-w-2xl mb-10">
            From all-in-one platforms to custom chatbots and mobile apps — we
            build solutions that tackle your specific business challenges.
          </p>
          <div className="flex flex-wrap gap-4">
            <Button
              asChild
              size="lg"
              className="rounded-full bg-ainomiq-blue hover:bg-ainomiq-blue-hover text-white px-8 h-12"
            >
              <Link href="/contact">Book a strategy call</Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="rounded-full border-ainomiq-border hover:border-ainomiq-border-hover bg-white text-ainomiq-text px-8 h-12"
            >
              <Link href="#all-in-one">View solutions</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Custom Solutions — scrollable sections */}
      {customSolutions.map((sol, i) => (
        <section
          key={sol.id}
          id={sol.id}
          className={`scroll-mt-28 py-24 px-6 ${i % 2 === 0 ? "bg-ainomiq-navy-light" : ""}`}
        >
          <div className="mx-auto max-w-5xl">
            <div className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${i % 2 !== 0 ? "lg:grid-flow-dense" : ""}`}>
              <div className={i % 2 !== 0 ? "lg:col-start-2" : ""}>
                <div className="mb-4 inline-flex items-center rounded-full bg-ainomiq-blue-glow px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-ainomiq-blue">
                  {String(i + 1).padStart(2, "0")} — {sol.title}
                </div>
                <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-4">
                  {sol.headline}
                </h2>
                <p className="text-ainomiq-text-muted text-lg leading-relaxed mb-8">
                  {sol.description}
                </p>
                <ul className="space-y-3">
                  {sol.capabilities.map((cap) => (
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
                      <sol.icon className="h-8 w-8 text-ainomiq-blue" />
                    </div>
                    <div className="text-5xl font-extrabold tracking-tight text-[#0f1b2d] mb-2">
                      {sol.stat}
                    </div>
                    <p className="text-sm text-ainomiq-text-muted">
                      {sol.statLabel}
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>
      ))}

      {/* Industries — Franchise */}
      <section id="franchise" className="scroll-mt-28 py-24 px-6">
        <div className="mx-auto max-w-5xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="mb-4 inline-flex items-center rounded-full bg-ainomiq-blue-glow px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-ainomiq-blue">
                Franchise
              </div>
              <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-4">
                Scale across locations, not complexity
              </h2>
              <p className="text-ainomiq-text-muted text-lg leading-relaxed mb-8">
                Franchise operations need consistency at scale. Our solutions standardize customer service, marketing, and operations across every location — while giving headquarters full visibility.
              </p>
              <ul className="space-y-3">
                {[
                  "Centralized customer service for all locations",
                  "Automated marketing localized per region",
                  "Real-time performance dashboards per franchise",
                  "Standardized workflows, zero manual overhead",
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
                    <Building2 className="h-8 w-8 text-ainomiq-blue" />
                  </div>
                  <div className="text-5xl font-extrabold tracking-tight text-[#0f1b2d] mb-2">
                    50+
                  </div>
                  <p className="text-sm text-ainomiq-text-muted">
                    locations managed from one platform
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Industries — Facility Services */}
      <section id="facility-services" className="scroll-mt-28 py-24 px-6 bg-ainomiq-navy-light">
        <div className="mx-auto max-w-5xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center lg:grid-flow-dense">
            <div className="lg:col-start-2">
              <div className="mb-4 inline-flex items-center rounded-full bg-ainomiq-blue-glow px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-ainomiq-blue">
                Facility Services
              </div>
              <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-4">
                Automate the field, not just the office
              </h2>
              <p className="text-ainomiq-text-muted text-lg leading-relaxed mb-8">
                From maintenance scheduling to field worker dispatch — automation that handles the operational complexity of facility services so your team can focus on delivering quality.
              </p>
              <ul className="space-y-3">
                {[
                  "Intelligent scheduling and dispatch",
                  "Automated client communication",
                  "Predictive maintenance alerts",
                  "Real-time field worker tracking",
                ].map((cap) => (
                  <li key={cap} className="flex items-center gap-3 text-sm text-ainomiq-text-muted">
                    <Check className="h-4 w-4 text-ainomiq-blue shrink-0" />
                    {cap}
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex items-center justify-center lg:col-start-1">
              <Card className="bg-white border-ainomiq-border w-full max-w-sm">
                <CardContent className="p-10 text-center">
                  <div className="mb-4 mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-ainomiq-blue-glow">
                    <Wrench className="h-8 w-8 text-ainomiq-blue" />
                  </div>
                  <div className="text-5xl font-extrabold tracking-tight text-[#0f1b2d] mb-2">
                    80%
                  </div>
                  <p className="text-sm text-ainomiq-text-muted">
                    less manual scheduling
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* More Solutions */}
      <Section label="And more">
        <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-4">
          More enterprise solutions
        </h2>
        <p className="text-ainomiq-text-muted text-lg max-w-xl mb-12">
          From process automation to strategy — we build what your business needs.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {moreSolutions.map((s) => (
            <Card
              key={s.title}
              className="bg-white border-ainomiq-border hover:border-ainomiq-border-hover transition-all hover:-translate-y-1"
            >
              <CardContent className="p-8">
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-ainomiq-blue-glow">
                  <s.icon className="h-6 w-6 text-ainomiq-blue" />
                </div>
                <h3 className="text-lg font-bold mb-2">{s.title}</h3>
                <p className="text-sm text-ainomiq-text-muted leading-relaxed">
                  {s.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </Section>

      {/* Process */}
      <Section label="Our approach">
        <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-16">
          From analysis to optimization
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step) => (
            <div key={step.num}>
              <span className="text-6xl font-extrabold text-ainomiq-blue/10 leading-none block mb-3">
                {step.num}
              </span>
              <h3 className="text-xl font-bold mb-2">{step.title}</h3>
              <p className="text-sm text-ainomiq-text-muted leading-relaxed">
                {step.body}
              </p>
            </div>
          ))}
        </div>
      </Section>

      {/* Enterprise Features */}
      <Section label="Enterprise-grade" className="bg-ainomiq-navy-light">
        <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-16">
          Built for scale and security
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {enterpriseFeatures.map((feat) => (
            <Card
              key={feat.title}
              className="bg-white border-ainomiq-border text-center"
            >
              <CardContent className="p-6">
                <feat.icon className="h-8 w-8 text-ainomiq-blue mx-auto mb-3" />
                <h4 className="text-sm font-bold mb-1">{feat.title}</h4>
                <p className="text-xs text-ainomiq-text-muted">
                  {feat.subtitle}
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
            Book a strategy call
          </h2>
          <p className="text-lg text-ainomiq-text-muted mb-10 max-w-lg mx-auto">
            Discover in 45 minutes how automation can transform your organization. No
            obligations, completely confidential.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Button
              asChild
              size="lg"
              className="rounded-full bg-ainomiq-blue hover:bg-ainomiq-blue-hover text-white px-10 h-12"
            >
              <Link href="/contact">Book a call</Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="rounded-full border-ainomiq-border hover:border-ainomiq-border-hover bg-white text-ainomiq-text px-8 h-12"
            >
              <Link href="/platform">
                See ecommerce app <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
