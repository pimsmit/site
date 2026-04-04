"use client";

import { Marquee } from "@/components/ui/marquee";
import { Users } from "lucide-react";

const teamMembers = [
  {
    initials: "BS",
    name: "Bink Sanders",
    role: "Founder & CEO",
    gradient: "from-ainomiq-blue to-blue-400",
  },
  {
    initials: "PK",
    name: "Pim Klaver",
    role: "Co-founder & CTO",
    gradient: "from-violet-500 to-purple-400",
  },
  {
    initials: "AI",
    name: "Marco",
    role: "Operations Agent",
    gradient: "from-emerald-500 to-teal-400",
  },
  {
    initials: "BS",
    name: "Bink Sanders",
    role: "Founder & CEO",
    gradient: "from-ainomiq-blue to-blue-400",
  },
  {
    initials: "PK",
    name: "Pim Klaver",
    role: "Co-founder & CTO",
    gradient: "from-violet-500 to-purple-400",
  },
  {
    initials: "AI",
    name: "Marco",
    role: "Operations Agent",
    gradient: "from-emerald-500 to-teal-400",
  },
];

export function TeamSection() {
  return (
    <section className="relative w-full overflow-hidden py-24 bg-ainomiq-navy-light">
      <div className="relative z-10 mx-auto max-w-7xl">
        {/* Header */}
        <div className="mx-auto mb-16 flex max-w-5xl flex-col items-center px-6 text-center lg:px-0">
          <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-ainomiq-blue text-white">
            <Users className="h-6 w-6" />
          </div>

          <h2 className="relative mb-4 text-3xl font-extrabold tracking-tight md:text-5xl text-ainomiq-text">
            The people behind Ainomiq
          </h2>
          <p className="max-w-2xl text-ainomiq-text-muted">
            A small, agile team that builds automation solutions every day that
            actually work. No overhead, no meetings — just results.
          </p>
        </div>

        {/* Team Marquee */}
        <div className="relative w-full">
          <div className="pointer-events-none absolute top-0 left-0 z-10 h-full w-32 bg-gradient-to-r from-ainomiq-navy-light to-transparent" />
          <div className="pointer-events-none absolute top-0 right-0 z-10 h-full w-32 bg-gradient-to-l from-ainomiq-navy-light to-transparent" />

          <Marquee className="[--gap:1.5rem] [--duration:30s]" pauseOnHover>
            {teamMembers.map((member, i) => (
              <div
                className="group flex w-64 shrink-0 flex-col"
                key={`${member.name}-${i}`}
              >
                <div className="relative h-80 w-full overflow-hidden rounded-2xl border border-ainomiq-border bg-white">
                  {/* Avatar with gradient */}
                  <div
                    className={`flex h-full w-full items-center justify-center bg-gradient-to-br ${member.gradient} opacity-10 transition-opacity duration-300 group-hover:opacity-20`}
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-6xl font-extrabold text-ainomiq-text-subtle/30 group-hover:text-ainomiq-text-subtle/50 transition-colors duration-300">
                      {member.initials}
                    </span>
                  </div>
                  <div className="absolute bottom-0 w-full rounded-b-2xl bg-white/90 backdrop-blur-sm p-4 border-t border-ainomiq-border">
                    <h3 className="font-semibold text-ainomiq-text">
                      {member.name}
                    </h3>
                    <p className="text-sm text-ainomiq-text-muted">
                      {member.role}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </Marquee>
        </div>

        {/* Quote */}
        <div className="mx-auto mt-20 max-w-3xl px-6 text-center lg:px-0">
          <p className="mb-8 text-lg font-medium leading-relaxed text-ainomiq-text md:text-xl">
            &ldquo;We build automation that runs. No pilots that go nowhere,
            no reports that gather dust. Working solutions,
            live within 2 weeks.&rdquo;
          </p>
          <div className="flex flex-col items-center gap-3">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-ainomiq-blue-glow text-lg font-bold text-ainomiq-blue">
              BS
            </div>
            <div className="text-center">
              <p className="font-semibold text-ainomiq-text">Bink Sanders</p>
              <p className="text-sm text-ainomiq-text-muted">
                Founder & CEO &middot; Ainomiq
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
