import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CustomProjectsHero } from "@/components/get-started/custom-projects-hero";
import { ProjectRequestForm } from "@/components/get-started/project-request-form";
import { Features } from "@/components/ui/features-9";
import { Testimonials } from "@/components/ui/unique-testimonial";
import {
  Sparkles,
  Zap,
  BarChart3,
  MessageCircle,
  Layers,
  Smartphone,
  CheckCircle,
  ArrowRight,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Custom Solutions - Ainomiq",
  description:
    "Need a custom automation solution? From chatbots to full dashboards — we build what you need.",
};

const SOLUTION_TYPES = [
  {
    icon: MessageCircle,
    title: "AI Chatbot",
    description: "Website assistant, WhatsApp bot, or customer support AI that handles conversations 24/7.",
    examples: ["Customer support bot", "Lead qualification", "FAQ automation", "WhatsApp Business API"],
  },
  {
    icon: Layers,
    title: "All-in-one Dashboard",
    description: "Custom control center that connects all your tools and data in one place.",
    examples: ["Multi-tool dashboard", "Real-time analytics", "Team collaboration hub", "Custom reporting"],
  },
  {
    icon: Smartphone,
    title: "Mobile App",
    description: "Native iOS/Android app or PWA built for your specific workflow.",
    examples: ["Field service app", "Internal tools", "Customer portal", "Data collection app"],
  },
  {
    icon: Zap,
    title: "Workflow Automation",
    description: "Connect your systems and automate repetitive tasks end-to-end.",
    examples: ["API integrations", "Data sync pipelines", "Approval workflows", "Notification systems"],
  },
  {
    icon: BarChart3,
    title: "Data & Analytics",
    description: "Custom BI dashboards, data warehouses, or predictive models tailored to your business.",
    examples: ["Custom BI dashboard", "Predictive analytics", "Data warehouse", "Real-time reporting"],
  },
  {
    icon: Sparkles,
    title: "Something Else",
    description: "Have a unique challenge? Tell us what you need — we'll figure out how to build it.",
    examples: ["Unique integrations", "Legacy system modernization", "Proof of concept", "R&D projects"],
  },
];

const PROCESS_STEPS = [
  {
    step: "01",
    title: "Tell us what you need",
    description: "Fill out the brief below. We'll ask about your project, timeline, and budget.",
  },
  {
    step: "02",
    title: "Get your estimate",
    description: "Instant cost estimate based on scope and complexity. Transparent pricing, no surprises.",
  },
  {
    step: "03",
    title: "We prepare a project brief",
    description: "Our team refines the scope, tech stack, and delivery timeline within 24 hours.",
  },
  {
    step: "04",
    title: "We connect you with a builder",
    description: "Meet your dedicated builder. They'll start working on your project right away.",
  },
];

const WHY_US = [
  { label: "Fixed-price or hourly", icon: CheckCircle },
  { label: "Transparent timelines", icon: CheckCircle },
  { label: "Weekly updates", icon: CheckCircle },
  { label: "No consultancy fluff", icon: CheckCircle },
  { label: "Built to last", icon: CheckCircle },
  { label: "Post-launch support", icon: CheckCircle },
];

export default function CustomPage() {
  return (
    <>
      {/* Hero */}
      <CustomProjectsHero />

      {/* What we build */}
      <section className="py-20 px-6 bg-white">
        <div className="mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-4">
              What we build
            </h2>
            <p className="text-ainomiq-text-muted text-lg max-w-2xl mx-auto">
              From chatbots to dashboards — if it runs on code, we can build it.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {SOLUTION_TYPES.map((solution) => (
              <div
                key={solution.title}
                className="rounded-2xl border border-ainomiq-border bg-white p-6 hover:border-ainomiq-blue transition-colors"
              >
                <div className="mb-4 inline-flex items-center justify-center rounded-xl bg-ainomiq-blue-glow p-3">
                  <solution.icon className="h-6 w-6 text-ainomiq-blue" />
                </div>
                <h3 className="text-xl font-bold mb-2">{solution.title}</h3>
                <p className="text-ainomiq-text-muted text-sm mb-4">
                  {solution.description}
                </p>
                <ul className="space-y-1">
                  {solution.examples.map((example) => (
                    <li key={example} className="flex items-center gap-2 text-xs text-ainomiq-text-muted">
                      <div className="h-1 w-1 rounded-full bg-ainomiq-blue" />
                      {example}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-20 px-6 bg-ainomiq-navy-light">
        <div className="mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-4">
              How it works
            </h2>
            <p className="text-ainomiq-text-muted text-lg max-w-2xl mx-auto">
              From brief to build in 4 simple steps.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {PROCESS_STEPS.map((item, idx) => (
              <div key={item.step} className="relative">
                <div className="mb-4">
                  <div className="text-6xl font-extrabold text-ainomiq-blue/20">
                    {item.step}
                  </div>
                </div>
                <h3 className="text-lg font-bold mb-2">{item.title}</h3>
                <p className="text-sm text-ainomiq-text-muted">
                  {item.description}
                </p>
                {idx < PROCESS_STEPS.length - 1 && (
                  <div className="hidden lg:block absolute top-8 -right-4 text-ainomiq-blue">
                    <ArrowRight className="h-5 w-5" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why choose us */}
      <section className="py-20 px-6 bg-white">
        <div className="mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-4">
              Why choose us
            </h2>
            <p className="text-ainomiq-text-muted text-lg">
              We're not a consultancy that writes reports. We build automation that runs.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {WHY_US.map((item) => (
              <div
                key={item.label}
                className="flex items-center gap-3 rounded-xl border border-ainomiq-border bg-ainomiq-surface p-4"
              >
                <item.icon className="h-5 w-5 text-ainomiq-blue shrink-0" />
                <span className="text-sm font-medium">{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Request form */}
      <ProjectRequestForm />

      {/* Features & Testimonials */}
      <Features />
      <Testimonials />
    </>
  );
}
