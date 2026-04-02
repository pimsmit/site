"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { RocketIcon, ArrowRightIcon, PhoneCallIcon } from "lucide-react";
import { InfiniteSlider } from "@/components/ui/infinite-slider";
import Link from "next/link";
import { useEffect, useRef } from "react";

export function HeroSection() {
  const gradientRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!gradientRef.current) return;
      const x = (e.clientX / window.innerWidth) * 100;
      const y = (e.clientY / window.innerHeight) * 100;
      gradientRef.current.style.background = `
        radial-gradient(ellipse 60% 50% at ${x}% ${y}%, rgba(59,130,246,0.12) 0%, transparent 70%),
        radial-gradient(ellipse 40% 60% at ${100 - x}% ${100 - y}%, rgba(147,197,253,0.08) 0%, transparent 60%),
        linear-gradient(180deg, #ffffff 0%, #f8fafc 100%)
      `;
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <section className="relative overflow-hidden">
      {/* Interactive gradient background */}
      <div
        ref={gradientRef}
        className="absolute inset-0 -z-10 transition-[background] duration-300 ease-out"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 30%, rgba(59,130,246,0.12) 0%, transparent 70%), linear-gradient(180deg, #ffffff 0%, #f8fafc 100%)",
        }}
      />

      {/* Decorative lines */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 mx-auto hidden max-w-5xl lg:block"
      >
        <div className="absolute inset-y-0 left-0 w-px bg-gradient-to-b from-transparent via-ainomiq-border to-ainomiq-border" />
        <div className="absolute inset-y-0 right-0 w-px bg-gradient-to-b from-transparent via-ainomiq-border to-ainomiq-border" />
      </div>

      <div className="mx-auto max-w-5xl">
        <div className="relative flex min-h-[calc(75vh-4rem)] flex-col items-center justify-center gap-5 px-6 pt-32 pb-20">
          {/* Inner decorative lines */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 -z-[1] overflow-hidden"
          >
            <div className="absolute inset-y-0 left-4 w-px bg-gradient-to-b from-transparent via-ainomiq-border to-ainomiq-border md:left-8" />
            <div className="absolute inset-y-0 right-4 w-px bg-gradient-to-b from-transparent via-ainomiq-border to-ainomiq-border md:right-8" />
          </div>

          {/* Badge */}
          <a
            className="group mx-auto flex w-fit items-center gap-3 rounded-full border border-ainomiq-border bg-white px-3 py-1 shadow-sm animate-float-up"
            href="#pricing"
          >
            <RocketIcon className="size-3 text-ainomiq-blue" />
            <span className="text-xs font-medium text-ainomiq-text">
              Always Ahead
            </span>
            <span className="block h-5 border-l border-ainomiq-border" />
            <ArrowRightIcon className="size-3 text-ainomiq-text-muted duration-150 ease-out group-hover:translate-x-1" />
          </a>

          {/* Headline */}
          <h1 className="text-balance text-center text-5xl font-extrabold tracking-tight text-ainomiq-text animate-float-up delay-100 md:text-6xl lg:text-7xl">
            Always{" "}
            <span className="gradient-text">Ahead.</span>
          </h1>

          {/* Subtitle */}
          <p className="mx-auto max-w-lg text-center text-base text-ainomiq-text-muted tracking-wider animate-float-up delay-200 sm:text-lg md:text-xl">
            AI automation for businesses that refuse to stand still.
            <br />
            Real systems, real results — live within two weeks.
          </p>

          {/* CTAs */}
          <div className="flex flex-row flex-wrap items-center justify-center gap-3 pt-2 animate-float-up delay-300">
            <Button
              asChild
              size="lg"
              className="rounded-full border border-ainomiq-border bg-white text-ainomiq-text hover:bg-ainomiq-navy-light"
            >
              <Link href="/platform">
                See Demo&apos;s
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              className="rounded-full bg-ainomiq-blue hover:bg-ainomiq-blue-hover text-white shadow-lg shadow-ainomiq-blue/25"
            >
              <Link href="/get-started">
                Get Started
                <ArrowRightIcon className="size-4 ms-2" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

const logos = [
  { src: "https://cdn.jsdelivr.net/npm/simple-icons@v14/icons/openai.svg", alt: "OpenAI" },
  { src: "https://cdn.jsdelivr.net/npm/simple-icons@v14/icons/anthropic.svg", alt: "Anthropic" },
  { src: "https://cdn.jsdelivr.net/npm/simple-icons@v14/icons/shopify.svg", alt: "Shopify" },
  { src: "https://cdn.jsdelivr.net/npm/simple-icons@v14/icons/meta.svg", alt: "Meta" },
  { src: "https://cdn.jsdelivr.net/npm/simple-icons@v14/icons/google.svg", alt: "Google" },
  { src: "https://cdn.jsdelivr.net/npm/simple-icons@v14/icons/python.svg", alt: "Python" },
  { src: "https://cdn.jsdelivr.net/npm/simple-icons@v14/icons/vercel.svg", alt: "Vercel" },
  { src: "https://cdn.jsdelivr.net/npm/simple-icons@v14/icons/github.svg", alt: "GitHub" },
  { src: "https://cdn.jsdelivr.net/npm/simple-icons@v14/icons/klaviyo.svg", alt: "Klaviyo" },
];

export function LogosSection() {
  return (
    <section className="relative overflow-hidden border-y border-ainomiq-border bg-ainomiq-navy-light py-8">
      {/* Subtle blue glow behind */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_50%,rgba(59,130,246,0.06),transparent)]"
      />

      <h2 className="relative z-10 mb-4 text-center text-lg font-medium tracking-tight text-ainomiq-text-muted md:text-xl">
        Trusted by{" "}
        <span className="font-semibold text-ainomiq-text">experts</span>
      </h2>

      <div className="relative z-10 mx-auto max-w-4xl overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_15%,black_85%,transparent)]">
        <InfiniteSlider gap={56} duration={30} reverse>
          {logos.map((logo) => (
            <img
              key={logo.alt}
              src={logo.src}
              alt={logo.alt}
              loading="lazy"
              className="pointer-events-none h-6 w-auto select-none opacity-40 grayscale md:h-7"
            />
          ))}
        </InfiniteSlider>
      </div>
    </section>
  );
}
