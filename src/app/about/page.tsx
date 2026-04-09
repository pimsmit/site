import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Section } from "@/components/section";
import { Zap, BadgeCheck, Info, Clock } from "lucide-react";

export const metadata: Metadata = {
  title: "About",
  description:
    "We are Ainomiq. Learn more about our team, our mission, and our values.",
};

const values = [
  {
    icon: Zap,
    title: "Building the future",
    body: "We run on the latest technology. What was cutting-edge yesterday is our baseline today.",
  },
  {
    icon: BadgeCheck,
    title: "Results first",
    body: "Everything we build must have measurable impact. No reports that end up in a drawer.",
  },
  {
    icon: Info,
    title: "Honest and direct",
    body: "We say what's possible and what isn't. No hidden costs, no unrealistic promises.",
  },
  {
    icon: Clock,
    title: "Ship fast",
    body: "Two-week implementation isn't marketing speak. We build fast because we carry no legacy.",
  },
];

const timeline = [
  {
    year: "2025",
    title: "Ainomiq founded",
    body: "Bink Sanders starts Ainomiq from the conviction that automation can be faster, more practical, and more affordable.",
  },
  {
    year: "2026",
    title: "First client: Domino's",
    body: "Ainomiq begins building automated store operations for Domino's franchisees.",
  },
  {
    year: "2026",
    title: "App in development",
    body: "The Ainomiq app is being built — six intelligent modules for e-commerce and enterprise.",
  },
  {
    year: "2026+",
    title: "Growth and scale",
    body: "More clients, more modules, international expansion. The story starts here.",
  },
];

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="pt-40 pb-20 px-6">
        <div className="mx-auto max-w-4xl">
          <div className="mb-6 inline-flex items-center rounded-full bg-ainomiq-blue-glow px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-ainomiq-blue">
            About Ainomiq
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight leading-[1.05] mb-6">
            We are{" "}
            <span className="gradient-text">Ainomiq</span>
          </h1>
          <p className="text-lg text-ainomiq-text-muted max-w-2xl">
            A young automation company that builds what works. No hype, no empty
            promises — concrete solutions that move your business forward.
          </p>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-24 px-6">
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

      {/* Mission */}
      <Section label="Our mission" className="bg-ainomiq-navy-light">
        <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-4">
          Making automation accessible for every business
        </h2>
        <p className="text-ainomiq-text-muted text-lg max-w-2xl leading-relaxed">
          Automation doesn&apos;t have to be complicated or expensive. We make it practical,
          affordable, and effective. Whether you run a webshop or lead an
          enterprise — we build systems that work for you from day one.
        </p>
      </Section>

      {/* Values */}
      <Section label="Our values" className="bg-ainomiq-navy-light">
        <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-16">
          What we stand for
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {values.map((v) => (
            <Card
              key={v.title}
              className="bg-white border-ainomiq-border text-center"
            >
              <CardContent className="p-6">
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-ainomiq-blue-glow">
                  <v.icon className="h-6 w-6 text-ainomiq-blue" />
                </div>
                <h3 className="font-bold mb-2">{v.title}</h3>
                <p className="text-sm text-ainomiq-text-muted leading-relaxed">
                  {v.body}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </Section>

      {/* Timeline */}
      <Section label="Our story">
        <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-12">
          Just getting started — and that&apos;s our advantage
        </h2>
        <div className="relative max-w-xl pl-8 border-l-2 border-ainomiq-border space-y-10">
          {timeline.map((item) => (
            <div key={item.title} className="relative pl-6">
              <div className="absolute -left-[calc(0.5rem+1px)] top-1 h-3 w-3 rounded-full bg-ainomiq-blue border-2 border-white" />
              <span className="text-xs font-semibold uppercase tracking-wider text-ainomiq-blue">
                {item.year}
              </span>
              <h3 className="font-bold mt-1 mb-1">{item.title}</h3>
              <p className="text-sm text-ainomiq-text-muted leading-relaxed">
                {item.body}
              </p>
            </div>
          ))}
        </div>
      </Section>

      {/* Hiring CTA */}
      <div className="px-6 pb-8">
        <div className="mx-auto max-w-6xl text-center">
          <p className="text-sm text-ainomiq-text-subtle">
            Our team is growing. Interested in working at Ainomiq?{" "}
            <Link
              href="/contact"
              className="text-ainomiq-blue font-semibold hover:underline"
            >
              Get in touch
            </Link>
          </p>
        </div>
      </div>

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
