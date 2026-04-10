import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Section } from "@/components/section";
import { Zap, BadgeCheck, Info, Clock } from "lucide-react";
import { ValuesScroll } from "@/components/values-scroll";

export const metadata: Metadata = {
  title: "About",
  description:
    "We are Ainomiq. Learn more about our team, our mission, and our values.",
};

const values = [
  {
    icon: Zap,
    num: "01",
    title: "Just get it done",
    body: "We value decisive action and speed over prolonged deliberation and planning.",
  },
  {
    icon: BadgeCheck,
    num: "02",
    title: "Invent what customers want",
    body: "Our core identity must always be rooted in building for our customers; this has been the foundation of our success.",
  },
  {
    icon: Info,
    num: "03",
    title: "Winner's mindset",
    body: "Fiercely competitive nature and fighting spirit are foundational.",
  },
  {
    icon: Clock,
    num: "04",
    title: "The Polymath Principle",
    body: "The best team members understand other functions deeply and promote cross-functional collaboration.",
  },
];

const benefits = [
  { title: "Remote-first", body: "Work from anywhere. Results matter, not where your desk is." },
  { title: "Competitive pay", body: "We hire the best and compensate accordingly." },
  { title: "Latest AI tools", body: "Work with cutting-edge AI every single day. We don't just follow — we build." },
  { title: "Flexible PTO", body: "Take what you need. We trust you to manage your time." },
  { title: "Equity", body: "Share in the upside. Early team members get meaningful ownership." },
  { title: "Growth budget", body: "Courses, conferences, books — invest in yourself on us." },
];


export default function AboutPage() {
  return (
    <>
      {/* Our Story */}
      <section className="pt-40 pb-24 px-6">
        <div className="mx-auto max-w-6xl">
          <div className="mb-6 inline-flex items-center rounded-full bg-ainomiq-blue-glow px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-ainomiq-blue">
            Our Story
          </div>
          <div className="grid md:grid-cols-2 gap-12 items-stretch">
            {/* Text */}
            <div className="flex flex-col">
              <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-6">
                Two friends, one obsession
              </h2>
              <div className="space-y-4 text-ainomiq-text-muted text-lg leading-relaxed">
                <p>
                  Ainomiq started with two childhood friends who shared the same obsession: AI.
                  Bink came from years in IT. Pim from e-commerce. Different worlds, same fascination.
                  Both started small, automating parts of their own work. Over time, those small
                  automations turned into something bigger. Entire processes running on autopilot.
                  Teams getting smaller because the systems did the heavy lifting.
                </p>
                <p>
                  That&apos;s when it clicked. If we can do this for ourselves, we can do this for others.
                </p>
                <p>
                  Ainomiq was born from that moment. Two friends, built on mutual respect and a shared
                  belief that AI isn&apos;t just a tool, it&apos;s the foundation of how businesses will run.
                  We started Ainomiq with one conviction: to build the next generation of AI systems.
                  Not something you get delivered and is outdated in six months. We build alongside you
                  and keep optimizing, every single day.
                </p>
              </div>
            </div>
            {/* Portraits */}
            <div className="grid grid-cols-2 gap-6">
              <div className="flex flex-col">
                <div className="relative flex-1 min-h-0 overflow-hidden rounded-2xl">
                  <Image
                    src="/team/bink.jpg"
                    alt="Bink Sanders"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="text-center mt-3">
                  <p className="font-bold text-ainomiq-text">Bink Sanders</p>
                  <p className="text-sm text-ainomiq-text-muted">Co-Founder</p>
                </div>
              </div>
              <div className="flex flex-col">
                <div className="relative flex-1 min-h-0 overflow-hidden rounded-2xl">
                  <Image
                    src="/team/pim.jpg"
                    alt="Pim Smit"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="text-center mt-3">
                  <p className="font-bold text-ainomiq-text">Pim Smit</p>
                  <p className="text-sm text-ainomiq-text-muted">Co-Founder</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Ainomiq */}
      <Section label="Why Ainomiq" className="bg-ainomiq-navy-light">
        <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-4">
          AI moves fast. We move faster.
        </h2>
        <div className="text-ainomiq-text-muted text-lg max-w-2xl leading-relaxed space-y-4">
          <p>
            At Ainomiq, staying ahead isn&apos;t a goal, it&apos;s how we work. Our team tests and applies new technology every single day, so everything we deliver uses what works best right now.
          </p>
          <p>
            And we keep it that way. Because AI evolves fast, your systems should too. Everything we build is designed to grow, adapt, and keep optimizing as the technology moves forward. That&apos;s what makes Ainomiq different. Not just a one-time solution, but a system that stays ahead.
          </p>
        </div>
      </Section>

      {/* Mission and Impact */}
      <Section label="Mission and Impact">
        <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-4">
          Bringing every business into the age of AI
        </h2>
        <p className="text-ainomiq-text-muted text-lg max-w-2xl leading-relaxed">
          Every business deserves to benefit from AI, not just the ones with big budgets or tech teams. We&apos;re here to change that. By building smart, evolving systems that make AI work for businesses of any size, we help companies compete in a world that&apos;s changing faster than ever.
        </p>
      </Section>

      {/* Values — scroll-driven */}
      <ValuesScroll />

      {/* Benefits — Beam AI futuristic style */}
      <section className="relative w-full overflow-hidden py-24 px-6">
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, #bae6fd 0%, #3b82f6 15%, #1e3a8a 35%, #0f172a 60%, #020617 100%)",
          }}
        />
        <div
          className="absolute inset-0 opacity-30"
          style={{
            background:
              "radial-gradient(ellipse at 20% 80%, rgba(74,144,245,0.4) 0%, transparent 50%), radial-gradient(ellipse at 80% 20%, rgba(139,92,246,0.25) 0%, transparent 50%)",
          }}
        />
        <div className="relative z-10 mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-ainomiq-blue">
              Benefits
            </span>
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white mt-4">
              Great work deserves great benefits
            </h2>
            <p className="text-white/50 text-lg mt-4 max-w-lg mx-auto">
              We take care of our team so they can focus on building.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {benefits.map((b) => (
              <div
                key={b.title}
                className="group relative rounded-2xl border border-white/10 backdrop-blur-xl p-8 transition-all duration-500 hover:border-ainomiq-blue/40 hover:shadow-[0_0_40px_rgba(74,144,245,0.15)]"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.02) 100%)",
                }}
              >
                <h3 className="text-lg font-bold text-white mb-3 group-hover:text-ainomiq-blue transition-colors duration-300">
                  {b.title}
                </h3>
                <p className="text-sm leading-relaxed text-white/50 group-hover:text-white/70 transition-colors duration-300">
                  {b.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Careers */}
      <Section label="Careers">
        <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-4">
          Build the future with us
        </h2>
        <p className="text-ainomiq-text-muted text-lg max-w-2xl leading-relaxed mb-4">
          We&apos;re a small team with big ambitions. At Ainomiq, you won&apos;t sit in meetings about meetings. You&apos;ll ship real AI systems for real businesses — and see the impact from day one.
        </p>
      </Section>

      {/* Open Positions — Decagon-style with arrows */}
      <section id="jobs" className="py-24 px-6 bg-ainomiq-navy-light">
        <div className="mx-auto max-w-6xl">
          <span className="text-xs font-semibold uppercase tracking-wider text-ainomiq-blue">Open positions</span>
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight mt-4 mb-12">We&apos;re hiring</h2>
          <div className="space-y-12">
            {[
              {
                dept: "Engineering",
                jobs: [
                  { title: "AI Engineer", location: "Remote" },
                  { title: "Full-Stack Developer", location: "Remote" },
                  { title: "Backend Developer (Python)", location: "Remote" },
                ],
              },
              {
                dept: "Growth",
                jobs: [
                  { title: "Sales & Partnerships", location: "Netherlands" },
                  { title: "Marketing & Content", location: "Remote" },
                ],
              },
            ].map((dept) => (
              <div key={dept.dept}>
                <h3 className="text-lg font-bold mb-0 pb-4 border-b border-ainomiq-border">{dept.dept}</h3>
                {dept.jobs.map((job) => (
                  <Link
                    key={job.title}
                    href="/contact"
                    className="flex items-center justify-between py-4 border-b border-ainomiq-border group"
                  >
                    <span className="font-semibold group-hover:text-ainomiq-blue transition-colors">{job.title}</span>
                    <div className="flex items-center gap-3">
                      <span className="text-xs text-ainomiq-text-muted">{job.location}</span>
                      <svg className="w-5 h-5 text-ainomiq-text-muted group-hover:text-ainomiq-blue transition-colors" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M13.48 10.83H3.33V9.17h10.15L8.81 4.5 10 3.33l6.67 6.67L10 16.67l-1.19-1.17 4.67-4.67z" />
                      </svg>
                    </div>
                  </Link>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-32 px-6 text-center bg-ainomiq-navy-light">
        <div className="mx-auto max-w-2xl">
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-6">
            Let&apos;s get to know each other
          </h2>
          <p className="text-lg text-ainomiq-text-muted mb-10 max-w-lg mx-auto">
            Curious what Ainomiq can do for your business? We&apos;d love to chat.
          </p>
          <Button
            asChild
            size="lg"
            className="rounded-full bg-ainomiq-blue hover:bg-ainomiq-blue-hover text-white px-10 h-12"
          >
            <Link href="/contact">Get in touch</Link>
          </Button>
        </div>
      </section>
    </>
  );
}
