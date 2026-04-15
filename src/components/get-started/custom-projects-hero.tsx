"use client";

import { InfiniteSlider } from "@/components/ui/infinite-slider";

const CLIENTS: { name: string; logo: string }[] = [
  { name: "Domino's", logo: "/logos/dominos.png" },
  { name: "Button Amsterdam", logo: "/logos/button-amsterdam.png" },
  { name: "Alpina", logo: "/logos/alpina.png" },
  { name: "La Dos", logo: "/logos/la-dos.png" },
  { name: "Billie Jeans", logo: "/logos/billie-jeans.png" },
  { name: "AccuExpert", logo: "/logos/accu-expert.png" },
  { name: "SchoolRegister", logo: "/logos/schoolregister.png" },
  { name: "VindJeRijschool.nl", logo: "/logos/vindjerijschool.png" },
  { name: "Padelland", logo: "/logos/padelland.png" },
];

export function CustomProjectsHero() {
  return (
    <section className="relative overflow-hidden bg-white">
      <div className="mx-auto max-w-5xl">
        <div className="relative flex min-h-[calc(60vh-4rem)] flex-col items-center justify-center gap-5 px-6 pt-32 pb-20">
          <div className="mb-6 inline-flex items-center rounded-full bg-ainomiq-blue-glow px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-ainomiq-blue">
            Custom Projects
          </div>
          
          <h1 className="text-center text-4xl md:text-6xl font-extrabold tracking-tight">
            Need a custom solution?
          </h1>
          
          <p className="text-center text-ainomiq-text-muted text-lg md:text-xl max-w-2xl">
            Tell us what you need. We'll calculate the cost, prepare a project brief, and connect you with a builder.
          </p>

          <div className="mt-4 text-center text-sm text-ainomiq-text-muted">
            From concept to deployment — transparent pricing, clear timelines.
          </div>
        </div>
      </div>

      {/* Client logos trust scroller */}
      <section className="relative overflow-hidden border-y border-ainomiq-border bg-ainomiq-navy-light py-8">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_50%,rgba(59,130,246,0.06),transparent)]"
        />

        <h2 className="relative z-10 mb-4 text-center text-lg font-medium tracking-tight text-ainomiq-text-muted md:text-xl">
          Trusted by businesses like{" "}
          <span className="font-semibold text-ainomiq-text">yours</span>
        </h2>

        <div className="relative z-10 mx-auto max-w-4xl overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_15%,black_85%,transparent)]">
          <InfiniteSlider gap={56} duration={30} reverse>
            {CLIENTS.map((client) => (
              <div key={client.name} className="flex items-center justify-center h-7 w-[100px] md:h-8 md:w-[120px] flex-shrink-0">
                <img
                  src={client.logo}
                  alt={client.name}
                  loading="lazy"
                  className="pointer-events-none max-h-full max-w-full w-auto h-auto object-contain select-none opacity-40 grayscale"
                />
              </div>
            ))}
          </InfiniteSlider>
        </div>
      </section>
    </section>
  );
}
