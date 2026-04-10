import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Section } from "@/components/section";
import { Accordion } from "@/components/accordion";
import { TrendingDown, TrendingUp, DollarSign, Clock, ArrowRight, Quote } from "lucide-react";

export const metadata: Metadata = {
  title: "Franchise AI — Ainomiq",
  description:
    "Cut costs, boost efficiency, and increase profit per location with AI-powered franchise operations.",
};

const results = [
  { icon: TrendingDown, value: "30%", label: "Labour cost reduction", desc: "AI identifies overspend patterns and optimizes scheduling across every shift." },
  { icon: Clock, value: "2 weeks", label: "Up and running", desc: "No 6-month rollout. Your AI system is live and learning within 14 days." },
  { icon: TrendingUp, value: "15%", label: "Revenue improvement", desc: "Smarter staffing + less waste = more profit per location, automatically." },
  { icon: DollarSign, value: "€8K+", label: "Saved per store per year", desc: "Across scheduling, inventory, and operational efficiency — measurable from month one." },
];

const accordionItems = [
  {
    num: "01",
    title: "Smarter scheduling, lower costs",
    body: "AI analyzes sales patterns, weather, events, and historical data to predict exactly how many staff you need per shift. No more overstaffing during slow hours or panic-calling during rush.",
  },
  {
    num: "02",
    title: "Real-time insights across all locations",
    body: "One dashboard for all your stores. Compare performance, spot outliers, and make data-driven decisions — without waiting for end-of-month reports.",
  },
  {
    num: "03",
    title: "AI assistant for every employee",
    body: "New hire? Language barrier? No problem. An AI assistant answers operational questions, guides procedures, and handles training — in any language, 24/7.",
  },
  {
    num: "04",
    title: "Inventory & waste management",
    body: "AI predicts demand per product, per location. Automatically suggests optimal stock levels, flags expiring items, and reduces food waste by up to 40%.",
  },
  {
    num: "05",
    title: "Quality control & compliance",
    body: "Automated checklists, HACCP monitoring, and hygiene tracking. Consistent quality across every location — without relying on manual inspections.",
  },
  {
    num: "06",
    title: "Multi-language onboarding",
    body: "Train new employees in their own language. AI-powered onboarding guides cover procedures, safety, and operations — no translator needed.",
  },
  {
    num: "07",
    title: "Automated manager tasks",
    body: "Daily reports, opening and closing checklists, escalation handling — AI takes care of the repetitive work so managers can focus on the floor.",
  },
  {
    num: "08",
    title: "Customer feedback analysis",
    body: "AI analyzes reviews, complaints, and ratings across all platforms. Spots patterns per location so you can fix problems before they spread.",
  },
];

export default function FranchisePage() {
  return (
    <>
      {/* Hero */}
      <section className="pt-40 pb-20 px-6">
        <div className="mx-auto max-w-4xl text-center">
          <div className="mb-6 inline-flex items-center rounded-full bg-ainomiq-blue-glow px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-ainomiq-blue">
            Franchise
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight leading-[1.05] mb-6">
            Your franchise,{" "}
            <span className="gradient-text">powered by AI</span>
          </h1>
          <p className="text-lg text-ainomiq-text-muted max-w-2xl mx-auto leading-relaxed mb-10">
            Empower your employees, unlock real-time insights, and scale your franchise — all from one intelligent platform.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Button
              asChild
              size="lg"
              className="rounded-full bg-ainomiq-blue hover:bg-ainomiq-blue-hover text-white px-8 h-12"
            >
              <Link href="/contact">Get a demo</Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="rounded-full border-ainomiq-border px-8 h-12"
            >
              <Link href="/contact">Book a call</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Testimonial placeholder */}
      <section className="py-16 px-6 bg-ainomiq-navy-light">
        <div className="mx-auto max-w-4xl text-center">
          <Quote className="h-8 w-8 text-ainomiq-blue/30 mx-auto mb-6" />
          <blockquote className="text-xl md:text-2xl font-bold tracking-tight leading-snug mb-6 max-w-3xl mx-auto">
            &ldquo;We reduced labour costs by 28% in the first three months. The AI scheduling alone paid for itself within weeks.&rdquo;
          </blockquote>
          <div className="flex items-center justify-center gap-3">
            <div className="w-10 h-10 rounded-full bg-ainomiq-blue/20 flex items-center justify-center text-sm font-bold text-ainomiq-blue">
              FM
            </div>
            <div className="text-left">
              <p className="text-sm font-semibold">Franchise Manager</p>
              <p className="text-xs text-ainomiq-text-muted">Top-10 QSR Chain, Netherlands</p>
            </div>
          </div>
        </div>
      </section>

      {/* Accordion — How we transform franchise ops */}
      <section className="py-24 px-6">
        <div className="mx-auto max-w-4xl">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-ainomiq-blue">
            How it works
          </span>
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight mt-4 mb-12">
            How Ainomiq transforms franchise operations
          </h2>
          <Accordion items={accordionItems} />
        </div>
      </section>

      {/* How we do it — 3-level visual flow */}
      <section className="py-24 px-6 bg-ainomiq-navy-light">
        <div className="mx-auto max-w-4xl">
          <div className="text-center mb-16">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-ainomiq-blue">
              How we do it
            </span>
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight mt-4">
              One platform, three levels of intelligence
            </h2>
          </div>

          <div className="relative space-y-4">
            {/* Connecting line */}
            <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-sky-300 via-ainomiq-blue to-[#0f172a] hidden md:block" />

            {/* Level 3: Owner */}
            <div className="relative rounded-2xl border border-white/20 p-8 md:p-10 text-white" style={{ background: "linear-gradient(135deg, #0f172a 0%, #1e3a8a 100%)" }}>
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-xs font-mono text-white/40">LEVEL 03</span>
                  <span className="text-xs font-semibold uppercase tracking-wider text-sky-300">Franchise Owner</span>
                </div>
                <h3 className="text-xl md:text-2xl font-bold mb-3">Strategic decisions, powered by data</h3>
                <div className="grid sm:grid-cols-3 gap-4 mt-6">
                  {["P&L per location", "Expansion readiness scores", "Cross-store benchmarking", "Revenue forecasting", "Investment ROI tracking", "Portfolio health overview"].map((item) => (
                    <div key={item} className="rounded-xl bg-white/10 backdrop-blur px-4 py-3 text-sm text-white/80">{item}</div>
                  ))}
                </div>
              </div>
            </div>

            {/* Level 2: Manager */}
            <div className="relative rounded-2xl border border-ainomiq-blue/30 p-8 md:p-10" style={{ background: "linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%)" }}>
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-xs font-mono text-ainomiq-text-muted">LEVEL 02</span>
                  <span className="text-xs font-semibold uppercase tracking-wider text-ainomiq-blue">Store Manager</span>
                </div>
                <h3 className="text-xl md:text-2xl font-bold mb-3">Daily operations, fully optimized</h3>
                <div className="grid sm:grid-cols-3 gap-4 mt-6">
                  {["Smart shift planning", "Real-time performance", "Inventory alerts", "Quality checklists", "Team management", "AI coaching tips"].map((item) => (
                    <div key={item} className="rounded-xl bg-white/80 border border-ainomiq-border px-4 py-3 text-sm text-ainomiq-text-muted">{item}</div>
                  ))}
                </div>
              </div>
            </div>

            {/* Level 1: Employee */}
            <div className="relative rounded-2xl border border-ainomiq-border p-8 md:p-10 bg-white">
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-xs font-mono text-ainomiq-text-muted">LEVEL 01</span>
                  <span className="text-xs font-semibold uppercase tracking-wider text-ainomiq-blue">Employee</span>
                </div>
                <h3 className="text-xl md:text-2xl font-bold mb-3">Support on the floor, 24/7</h3>
                <div className="grid sm:grid-cols-3 gap-4 mt-6">
                  {["AI assistant (any language)", "Step-by-step procedures", "Onboarding guides", "Shift schedules", "Task checklists", "Instant answers"].map((item) => (
                    <div key={item} className="rounded-xl bg-ainomiq-navy-light border border-ainomiq-border px-4 py-3 text-sm text-ainomiq-text-muted">{item}</div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Flow description */}
          <div className="text-center mt-12">
            <p className="text-sm text-ainomiq-text-muted max-w-lg mx-auto">
              Data flows up. Insights flow down. Every level gets exactly what they need — from an employee asking a question to an owner deciding where to expand next.
            </p>
          </div>
        </div>
      </section>

      {/* AI Intelligence — data drives improvements */}
      <section className="py-24 px-6 bg-ainomiq-navy-light">
        <div className="mx-auto max-w-6xl">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-ainomiq-blue">
                Continuous improvement
              </span>
              <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight mt-4 mb-6">
                Every interaction makes your franchise smarter
              </h2>
              <p className="text-ainomiq-text-muted leading-relaxed mb-6">
                The more your franchise operates, the more data flows in. AI turns that data into actionable recommendations — automatically. No analyst needed.
              </p>
              <p className="text-ainomiq-text-muted leading-relaxed">
                From predicting your busiest Tuesday to flagging a store that&apos;s underperforming — AI sees patterns humans miss and helps managers act on them before they become problems.
              </p>
            </div>
            <div className="space-y-4">
              {[
                { title: "Predictive recommendations", body: "AI analyzes trends and suggests improvements — from staffing adjustments to new revenue opportunities." },
                { title: "Manager coaching", body: "Personalized tips per store manager based on their location's data, performance, and growth potential." },
                { title: "Full-picture insights", body: "Sales, staffing, inventory, reviews, quality — all connected in one intelligent view." },
                { title: "Expansion-ready", body: "AI identifies which locations are ready to scale, what's working best, and where to replicate success." },
              ].map((item) => (
                <div
                  key={item.title}
                  className="rounded-2xl border border-ainomiq-border bg-white p-6 hover:border-ainomiq-blue/30 transition-colors"
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
      <Section label="Real results" className="bg-ainomiq-navy-light">
        <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-4">
          The numbers that matter
        </h2>
        <p className="text-ainomiq-text-muted text-lg max-w-2xl leading-relaxed mb-12">
          Every franchise owner cares about one thing: the bottom line. Here&apos;s what AI delivers.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {results.map((r) => (
            <Card key={r.label} className="bg-white border-ainomiq-border">
              <CardContent className="p-8">
                <div className="flex items-center gap-4 mb-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-ainomiq-blue-glow">
                    <r.icon className="h-6 w-6 text-ainomiq-blue" />
                  </div>
                  <span className="text-3xl font-extrabold tracking-tight text-ainomiq-blue">{r.value}</span>
                </div>
                <h3 className="font-bold text-lg mb-2">{r.label}</h3>
                <p className="text-sm text-ainomiq-text-muted leading-relaxed">{r.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </Section>

      {/* What we do — steps */}
      <section className="py-24 px-6">
        <div className="mx-auto max-w-4xl">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-ainomiq-blue">
            What we do
          </span>
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight mt-4 mb-12">
            AI that runs your stores — so you don&apos;t have to
          </h2>
          <div className="space-y-10">
            {[
              { num: "01", title: "We connect to your systems", body: "POS, planning tools, sales data — we plug into what you already have. No new hardware, no disruption." },
              { num: "02", title: "AI takes over the busywork", body: "Scheduling, demand prediction, inventory — AI handles it 24/7. Your managers focus on customers, not spreadsheets." },
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
          <p className="text-lg text-white/70 mb-10 max-w-lg mx-auto">
            Book a 30-minute demo. We&apos;ll show you exactly how much you can save per location.
          </p>
          <Button
            asChild
            size="lg"
            className="rounded-full bg-white text-ainomiq-blue hover:bg-white/90 px-10 h-12 font-bold"
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
