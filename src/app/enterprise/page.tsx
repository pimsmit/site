import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Section } from "@/components/section";
import {
  Cog,
  Users,
  BarChart3,
  FileText,
  Layers,
  Lightbulb,
  Lock,
  Code,
  Headphones,
  BadgeCheck,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Enterprise",
  description:
    "Enterprise AI solutions: process automation, AI agents, data analytics, and more.",
};

const solutions = [
  {
    icon: Cog,
    title: "Process Automation",
    description:
      "Eliminate repetitive tasks. From data entry to reporting — AI automates what slows people down.",
  },
  {
    icon: Users,
    title: "AI Agents",
    description:
      "Autonomous digital workers that independently execute tasks, make decisions, and collaborate with your team.",
  },
  {
    icon: BarChart3,
    title: "Data Analytics & Insights",
    description:
      "Real-time dashboards and predictive analytics. Make better decisions based on AI-driven insights.",
  },
  {
    icon: FileText,
    title: "Document Processing",
    description:
      "Automatic processing of invoices, contracts, and reports. OCR, extraction, and classification with AI.",
  },
  {
    icon: Layers,
    title: "Custom AI Development",
    description:
      "Custom-built AI models for your specific use case. From concept to production.",
  },
  {
    icon: Lightbulb,
    title: "AI Strategy Consulting",
    description:
      "Roadmap, feasibility analysis, and implementation strategy. We help make your AI vision concrete.",
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

const industries = [
  "Retail",
  "Hospitality",
  "Logistics",
  "Finance",
  "Healthcare",
];

const steps = [
  {
    num: "01",
    title: "Analysis",
    body: "In-depth analysis of your processes, data, and systems to identify the biggest AI opportunities.",
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
    body: "Continuous monitoring, adjusting, and improving. Your AI systems get smarter every day.",
  },
];

export default function EnterprisePage() {
  return (
    <>
      {/* Hero */}
      <section className="pt-40 pb-20 px-6">
        <div className="mx-auto max-w-4xl">
          <div className="mb-6 inline-flex items-center rounded-full bg-ainomiq-blue-glow px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-ainomiq-blue">
            Enterprise
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight leading-[1.05] mb-6">
            Where automation meets{" "}
            <span className="gradient-text">ambition</span>
          </h1>
          <p className="text-lg text-ainomiq-text-muted max-w-2xl mb-10">
            From process automation to autonomous AI agents — we build
            enterprise-grade solutions that tackle complex business processes.
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
              <Link href="#solutions">View solutions</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Solutions */}
      <Section
        label="Solutions"
        id="solutions"
        className="bg-ainomiq-navy-light"
      >
        <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-16">
          Six enterprise AI modules
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {solutions.map((s) => (
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

      {/* Industries */}
      <Section label="Industries" className="bg-ainomiq-navy-light">
        <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-10">
          Industries where AI makes an impact
        </h2>
        <div className="flex flex-wrap gap-3">
          {industries.map((ind) => (
            <span
              key={ind}
              className="rounded-full border border-ainomiq-border px-5 py-2 text-sm font-medium text-ainomiq-text-muted"
            >
              {ind}
            </span>
          ))}
        </div>
      </Section>

      {/* Enterprise Features */}
      <Section label="Enterprise-grade">
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
      <section className="py-32 px-6 text-center bg-ainomiq-navy-light">
        <div className="mx-auto max-w-2xl">
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-6">
            Book a strategy call
          </h2>
          <p className="text-lg text-ainomiq-text-muted mb-10 max-w-lg mx-auto">
            Discover in 45 minutes how AI can transform your organization.
            No obligations, completely confidential.
          </p>
          <Button
            asChild
            size="lg"
            className="rounded-full bg-ainomiq-blue hover:bg-ainomiq-blue-hover text-white px-10 h-12"
          >
            <Link href="/contact">Book a call</Link>
          </Button>
        </div>
      </section>
    </>
  );
}
