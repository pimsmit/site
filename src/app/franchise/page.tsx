import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Section } from "@/components/section";
import { Accordion } from "@/components/accordion";
import { PlatformGraph } from "@/components/platform-graph";
import { FranchiseHero } from "@/components/ui/franchise-hero";
import { FranchiseDashboard } from "@/components/ui/franchise-dashboard";
import { TrendingDown, TrendingUp, DollarSign, Clock, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Franchise AI. Ainomiq",
  description:
    "Cut costs, boost efficiency, and increase profit per location with AI-powered franchise operations.",
};

const results = [
  { value: "24/7", label: "Always on", desc: "No shift ends, no sick days, no missed tickets" },
  { value: "1", label: "Platform", desc: "One dashboard for every location, every metric" },
  { value: "<2min", label: "Setup per location", desc: "Connect a new store without IT involvement" },
  { value: "0", label: "Missed tickets", desc: "Every customer question gets a response, automatically" },
];

const accordionItems = [
  {
    num: "01",
    title: "Smarter scheduling, lower costs",
    body: "Analyzes sales patterns, weather, events, and historical data to predict exactly how many staff you need per shift. No more overstaffing during slow hours or panic-calling during rush.",
  },
  {
    num: "02",
    title: "Real-time insights across all locations",
    body: "One dashboard for all your stores. Compare performance, spot outliers, and make data-driven decisions. without waiting for end-of-month reports.",
  },
  {
    num: "03",
    title: "Smart assistant for every employee",
    body: "New hire? Language barrier? No problem. A smart assistant answers operational questions, guides procedures, and handles training. in any language, 24/7.",
  },
  {
    num: "04",
    title: "Inventory & waste management",
    body: "Predicts demand per product, per location. Automatically suggests optimal stock levels, flags expiring items, and reduces food waste by up to 40%.",
  },
  {
    num: "05",
    title: "Quality control & compliance",
    body: "Automated checklists, HACCP monitoring, and hygiene tracking. Consistent quality across every location. without relying on manual inspections.",
  },
  {
    num: "06",
    title: "Multi-language onboarding",
    body: "Train new employees in their own language. Intelligent onboarding guides cover procedures, safety, and operations. no translator needed.",
  },
  {
    num: "07",
    title: "Automated manager tasks",
    body: "Daily reports, opening and closing checklists, escalation handling. Automates the repetitive work so managers can focus on the floor.",
  },
  {
    num: "08",
    title: "Customer feedback analysis",
    body: "Analyzes reviews, complaints, and ratings across all platforms. Spots patterns per location so you can fix problems before they spread.",
  },
];

export default function FranchisePage() {
  return (
    <>
      <FranchiseHero />

      {/* Accordion. How we transform franchise ops */}
      <section className="py-24 px-6">
        <div className="mx-auto max-w-4xl">
          <span className="inline-flex items-center rounded-full bg-ainomiq-blue-glow px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-ainomiq-blue">
            How it works
          </span>
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight mt-4 mb-12">
            How Ainomiq transforms franchise operations
          </h2>
          <Accordion items={accordionItems} />
        </div>
      </section>

      {/* How we do it. 3-level visual flow */}
      <section className="py-24 px-6">
        <div className="mx-auto max-w-5xl">
          <div className="text-center mb-20">
            <span className="inline-flex items-center rounded-full bg-ainomiq-blue-glow px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-ainomiq-blue">
              The platform
            </span>
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight mt-4">
              One platform, three levels of intelligence
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {/* Owner */}
            <div className="rounded-2xl p-8 text-white" style={{ background: "linear-gradient(135deg, #0f172a 0%, #1e3a8a 100%)" }}>
              <span className="inline-flex items-center rounded-full bg-ainomiq-navy/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-sky-300 mb-4">
                Franchise Owner
              </span>
              <h3 className="text-xl font-bold mb-2">Understand why stores succeed</h3>
              <p className="text-sm text-white/80 leading-relaxed mb-5">
                See exactly why a store performs well and replicate it across your network.
              </p>
              <div className="space-y-2">
                {["Success pattern analysis", "Expansion scoring", "Cross-store benchmarking", "Growth recommendations"].map((item) => (
                  <div key={item} className="flex items-center gap-2.5 text-sm text-white/80">
                    <div className="w-1 h-1 rounded-full bg-sky-300 shrink-0" />
                    {item}
                  </div>
                ))}
              </div>
            </div>

            {/* Manager */}
            <div className="rounded-2xl border border-ainomiq-blue/20 p-8 bg-gradient-to-b from-blue-50 to-white">
              <span className="inline-flex items-center rounded-full bg-ainomiq-blue/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-ainomiq-blue mb-4">
                Store Manager
              </span>
              <h3 className="text-xl font-bold mb-2">Focus on growth, not busywork</h3>
              <p className="text-sm text-ainomiq-text-muted leading-relaxed mb-5">
                Every repetitive task is handled automatically. Your managers spend their time on what actually grows the business.
              </p>
              <div className="space-y-2">
                {["Automated scheduling", "Performance dashboards", "Inventory on autopilot", "Quality control handled", "Growth-focused coaching", "One-click reporting"].map((item) => (
                  <div key={item} className="flex items-center gap-2.5 text-sm text-ainomiq-text-muted">
                    <div className="w-1 h-1 rounded-full bg-ainomiq-blue shrink-0" />
                    {item}
                  </div>
                ))}
              </div>
            </div>

            {/* Employee */}
            <div className="rounded-2xl border border-ainomiq-border p-8 bg-ainomiq-navy">
              <span className="inline-flex items-center rounded-full bg-ainomiq-blue/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-ainomiq-blue mb-4">
                Employee
              </span>
              <h3 className="text-xl font-bold mb-2">Support on the floor, 24/7</h3>
              <p className="text-sm text-ainomiq-text-muted leading-relaxed mb-5">
                A smart assistant in any language. Procedures, training, and answers always one question away.
              </p>
              <div className="space-y-2">
                {["Any-language assistant", "Step-by-step procedures", "Interactive onboarding", "Shift schedules & tasks"].map((item) => (
                  <div key={item} className="flex items-center gap-2.5 text-sm text-ainomiq-text-muted">
                    <div className="w-1 h-1 rounded-full bg-ainomiq-blue shrink-0" />
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <p className="text-center text-sm text-ainomiq-text-muted mt-10">
            Data flows up. Insights flow down. Every level gets exactly what they need.
          </p>
        </div>
      </section>

      {/* AI Intelligence. data drives improvements */}
      <section className="py-24 px-6 bg-ainomiq-navy-light">
        <div className="mx-auto max-w-6xl">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <span className="inline-flex items-center rounded-full bg-ainomiq-blue-glow px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-ainomiq-blue">
                Continuous improvement
              </span>
              <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight mt-4 mb-6">
                Every interaction makes your franchise smarter
              </h2>
              <p className="text-ainomiq-text-muted leading-relaxed mb-6">
                The more your franchise operates, the more data flows in. Our platform turns that data into actionable recommendations. automatically. No analyst needed.
              </p>
              <p className="text-ainomiq-text-muted leading-relaxed">
                From predicting your busiest Tuesday to flagging a store that&apos;s underperforming. The system sees patterns humans miss and helps managers act on them before they become problems.
              </p>
            </div>
            <div className="space-y-4">
              {[
                { title: "Predictive recommendations", body: "Analyzes trends and suggests improvements. from staffing adjustments to new revenue opportunities." },
                { title: "Manager coaching", body: "Personalized tips per store manager based on their location's data, performance, and growth potential." },
                { title: "Full-picture insights", body: "Sales, staffing, inventory, reviews, quality. all connected in one intelligent view." },
                { title: "Expansion-ready", body: "Identifies which locations are ready to scale, what's working best, and where to replicate success." },
              ].map((item) => (
                <div
                  key={item.title}
                  className="rounded-2xl border border-ainomiq-border bg-ainomiq-navy p-6 hover:border-ainomiq-blue/30 transition-colors"
                >
                  <h3 className="font-bold mb-1">{item.title}</h3>
                  <p className="text-sm text-ainomiq-text-muted leading-relaxed">{item.body}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Results / ROI */}
      <section className="py-24 px-6 bg-ainomiq-navy-light">
        <div className="mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <span className="inline-flex items-center rounded-full bg-ainomiq-blue-glow px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-ainomiq-blue">
              Real results
            </span>
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight mt-4">
              What you get
            </h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {results.map((r) => (
              <div key={r.label} className="rounded-2xl border border-ainomiq-border bg-ainomiq-navy p-6 text-center hover:border-ainomiq-blue/30 transition-colors">
                <span className={`block text-3xl md:text-4xl font-extrabold tracking-tight mb-2 ${
                  r.value.startsWith("+") ? "text-emerald-500" : r.value.startsWith("-") ? "text-ainomiq-blue" : "text-ainomiq-blue"
                }`}>{r.value}</span>
                <h3 className="font-bold text-sm mb-1">{r.label}</h3>
                <p className="text-xs text-ainomiq-text-muted">{r.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What we do. steps */}
      <section className="py-24 px-6">
        <div className="mx-auto max-w-4xl">
          <span className="inline-flex items-center rounded-full bg-ainomiq-blue-glow px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-ainomiq-blue">
            What we do
          </span>
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight mt-4 mb-12">
            A system that runs your stores. so you don&apos;t have to
          </h2>
          <div className="space-y-10">
            {[
              { num: "01", title: "We connect to your systems", body: "POS, planning tools, sales data. we plug into what you already have. No new hardware, no disruption." },
              { num: "02", title: "Automation takes over the busywork", body: "Scheduling, demand prediction, inventory. The system handles it 24/7. Your managers focus on customers, not spreadsheets." },
              { num: "03", title: "You see the results immediately", body: "Lower labour costs, less waste, better shifts. Real-time dashboards show exactly where you're saving and earning more." },
            ].map((s) => (
              <div key={s.num} className="flex gap-6">
                <span className="text-3xl font-extrabold text-ainomiq-blue/20 shrink-0">{s.num}</span>
                <div>
                  <h3 className="text-xl font-bold mb-2">{s.title}</h3>
                  <p className="text-ainomiq-text-muted leading-relaxed">{s.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why it works */}
      <section className="py-24 px-6 bg-ainomiq-navy-light">
        <div className="mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <span className="inline-flex items-center rounded-full bg-ainomiq-blue-glow px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-ainomiq-blue">
              Built for franchise
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight mt-4">
              Why franchise operators choose Ainomiq
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: "One system, all locations",
                body: "Every store runs on the same platform. You get consistent data, consistent operations, and full visibility from a single dashboard.",
              },
              {
                title: "Works with what you have",
                body: "No ripping out your existing POS or planning tools. We connect to your current systems and add intelligence on top.",
              },
              {
                title: "Scales as you grow",
                body: "Adding a new location takes minutes, not months. The platform handles the complexity so you can focus on opening stores, not configuring software.",
              },
            ].map((item) => (
              <div key={item.title} className="rounded-2xl border border-ainomiq-border bg-ainomiq-navy p-8">
                <h3 className="font-bold text-lg mb-3">{item.title}</h3>
                <p className="text-sm leading-relaxed text-ainomiq-text-muted">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gradient CTA */}
      <section className="relative py-24 px-6 overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(135deg, #0f172a 0%, #1e3a8a 50%, #3b82f6 100%)",
          }}
        />
        <div
          className="absolute inset-0 opacity-30"
          style={{
            background: "radial-gradient(ellipse at 70% 50%, rgba(96,165,250,0.5) 0%, transparent 60%)",
          }}
        />
        <div className="relative z-10 mx-auto max-w-3xl text-center">
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white mb-6">
            The future of franchise operations starts here.
          </h2>
          <p className="text-lg text-white/80 mb-10 max-w-lg mx-auto">
            Book a 30-minute demo. We&apos;ll show you exactly how much you can save per location.
          </p>
          <Button
            asChild
            size="lg"
            className="rounded-full bg-ainomiq-navy text-ainomiq-blue hover:bg-ainomiq-navy/90 px-10 h-12 font-bold"
          >
            <Link href="/contact">
              Get a demo <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>
    </>
  );
}
