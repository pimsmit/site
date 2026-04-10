"use client";

import { useEffect, useRef, useState } from "react";

const valuesData = [
  {
    num: "01",
    title: "Just get it done",
    body: "We value decisive action and speed over prolonged deliberation and planning. Every solution ships fast because our clients can't afford to wait.",
    color: "#7dd3fc", // sky-300
  },
  {
    num: "02",
    title: "Invent what customers want",
    body: "Our core identity is rooted in building for our customers. We listen, we test, we iterate — because the best products come from obsessing over real problems.",
    color: "#38bdf8", // sky-400
  },
  {
    num: "03",
    title: "Winner's mindset",
    body: "Fiercely competitive nature and fighting spirit are foundational. We play to win, learn from losses, and never settle for second best.",
    color: "#4A90F5", // ainomiq-blue
  },
  {
    num: "04",
    title: "The Polymath Principle",
    body: "The best team members understand other functions deeply and promote cross-functional collaboration. Breadth of knowledge drives innovation.",
    color: "#2563eb", // blue-600
  },
];

const bgColors = [
  "rgb(224, 242, 254)", // sky-100 — fresh start
  "rgb(147, 197, 253)", // blue-300
  "rgb(96, 165, 250)",  // blue-400
  "rgb(59, 130, 246)",  // blue-500 — ainomiq blue territory
];

export function ValuesScroll() {
  const [active, setActive] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = itemRefs.current.indexOf(entry.target as HTMLDivElement);
            if (idx !== -1) setActive(idx);
          }
        });
      },
      { threshold: 0.6 }
    );

    itemRefs.current.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full transition-colors duration-700 ease-in-out"
      style={{ backgroundColor: bgColors[active] }}
    >
      <div className="mx-auto max-w-6xl px-6 md:px-10">
        <div className="flex flex-col md:flex-row">
          {/* Left: sticky labels */}
          <div className="md:sticky md:top-0 md:h-screen md:w-1/2 flex flex-col justify-center py-16 md:py-0">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] mb-12" style={{ color: active >= 2 ? 'rgba(255,255,255,0.5)' : undefined }}>
              Our values
            </span>
            <div className="space-y-8">
              {valuesData.map((v, i) => (
                <button
                  key={v.num}
                  onClick={() => {
                    setActive(i);
                    itemRefs.current[i]?.scrollIntoView({
                      behavior: "smooth",
                      block: "center",
                    });
                  }}
                  className="flex items-center gap-5 text-left transition-all duration-500 group cursor-pointer"
                >
                  <span
                    className="text-sm font-mono transition-colors duration-500"
                    style={{ color: i === active ? valuesData[active].color : active >= 2 ? "rgba(255,255,255,0.2)" : "rgba(0,0,0,0.2)" }}
                  >
                    {v.num}
                  </span>
                  <span
                    className="text-xl md:text-2xl font-bold tracking-tight transition-colors duration-500"
                    style={{ color: i === active ? (active >= 2 ? "#fff" : "#0f172a") : active >= 2 ? "rgba(255,255,255,0.2)" : "rgba(0,0,0,0.2)" }}
                  >
                    {v.title}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Right: scrolling descriptions */}
          <div className="md:w-1/2 flex flex-col">
            {valuesData.map((v, i) => (
              <div
                key={v.num}
                ref={(el) => { itemRefs.current[i] = el; }}
                className="flex items-center min-h-[50vh] md:min-h-[80vh] py-16 md:py-0"
              >
                <div
                  className={`max-w-md transition-all duration-700 ${
                    i === active ? "opacity-100 translate-y-0" : "opacity-0 md:opacity-10 translate-y-4"
                  }`}
                >
                  <div
                    className="w-12 h-1 rounded-full mb-6 transition-colors duration-700"
                    style={{ backgroundColor: valuesData[active].color }}
                  />
                  <p className={`text-lg md:text-xl leading-relaxed ${active >= 2 ? 'text-white/80' : 'text-ainomiq-text/80'}`}>
                    {v.body}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
