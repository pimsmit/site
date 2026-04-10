import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  MapPin,
  CalendarClock,
  ClipboardCheck,
  Users,
  BarChart3,
  Wrench,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Facility Services AI — Ainomiq",
  description:
    "AI automation for field service and facility management. Route planning, scheduling, and workforce optimization.",
};

const modules = [
  { icon: MapPin, title: "Smart Route Planning", body: "AI optimizes routes for field teams. Less driving, more jobs per day, lower fuel costs." },
  { icon: CalendarClock, title: "Automated Scheduling", body: "Match the right technician to the right job. AI handles availability, skills, and urgency." },
  { icon: ClipboardCheck, title: "Digital Work Orders", body: "Paperless job management from dispatch to completion. Photos, checklists, and sign-offs — all digital." },
  { icon: Users, title: "Workforce Management", body: "Track hours, productivity, and capacity across your entire team in real-time." },
  { icon: BarChart3, title: "Performance Dashboards", body: "See which teams perform, which clients cost money, and where to optimize." },
  { icon: Wrench, title: "Predictive Maintenance", body: "AI predicts equipment failures before they happen. Schedule maintenance, avoid downtime." },
];

export default function FacilityServicesPage() {
  return (
    <>
      {/* Hero */}
      <section className="pt-40 pb-16 px-6">
        <div className="mx-auto max-w-4xl">
          <div className="mb-6 inline-flex items-center rounded-full bg-ainomiq-blue-glow px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-ainomiq-blue">
            Facility Services AI
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight leading-[1.05] mb-6">
            Automate the field,{" "}
            <span className="gradient-text">not just the office.</span>
          </h1>
          <p className="text-lg text-ainomiq-text-muted max-w-2xl leading-relaxed mb-8">
            From route planning to workforce management — Ainomiq brings AI to your field operations so your teams do more with less.
          </p>
          <Button
            asChild
            size="lg"
            className="rounded-full bg-ainomiq-blue hover:bg-ainomiq-blue-hover text-white px-8 h-12"
          >
            <Link href="/contact">Book a demo</Link>
          </Button>
        </div>
      </section>

      {/* Modules */}
      <section className="py-20 px-6 bg-ainomiq-navy-light">
        <div className="mx-auto max-w-6xl">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-ainomiq-blue">The Platform</span>
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight mt-4 mb-10">
            AI for field & maintenance
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {modules.map((m) => (
              <Card key={m.title} className="bg-white border-ainomiq-border">
                <CardContent className="p-6">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-ainomiq-blue-glow">
                    <m.icon className="h-6 w-6 text-ainomiq-blue" />
                  </div>
                  <h3 className="font-bold mb-2">{m.title}</h3>
                  <p className="text-sm text-ainomiq-text-muted leading-relaxed">{m.body}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6 text-center">
        <div className="mx-auto max-w-2xl">
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-6">
            Ready to optimize your field operations?
          </h2>
          <p className="text-lg text-ainomiq-text-muted mb-10 max-w-lg mx-auto">
            Book a 30-minute demo and see how Ainomiq works for facility services.
          </p>
          <Button
            asChild
            size="lg"
            className="rounded-full bg-ainomiq-blue hover:bg-ainomiq-blue-hover text-white px-10 h-12"
          >
            <Link href="/contact">Book a demo</Link>
          </Button>
        </div>
      </section>
    </>
  );
}
