'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { AnimatedGroup } from '@/components/ui/animated-group';
import { cn } from '@/lib/utils';

const transitionVariants = {
  item: {
    hidden: { opacity: 0, filter: 'blur(12px)', y: 12 },
    visible: {
      opacity: 1,
      filter: 'blur(0px)',
      y: 0,
      transition: { type: 'spring' as const, bounce: 0.3, duration: 1.5 },
    },
  },
};

export function FranchiseHero() {
  return (
    <main className="overflow-hidden">
      {/* Background glow blobs */}
      <div aria-hidden className="z-[2] absolute inset-0 pointer-events-none isolate opacity-50 contain-strict hidden lg:block">
        <div className="w-[35rem] h-[80rem] -translate-y-[350px] absolute left-0 top-0 -rotate-45 rounded-full bg-[radial-gradient(68.54%_68.72%_at_55.02%_31.46%,rgba(59,130,246,.10)_0,rgba(59,130,246,.03)_50%,transparent_80%)]" />
        <div className="h-[80rem] absolute left-0 top-0 w-56 -rotate-45 rounded-full bg-[radial-gradient(50%_50%_at_50%_50%,rgba(99,102,241,.07)_0,rgba(99,102,241,.02)_80%,transparent_100%)] [translate:5%_-50%]" />
      </div>

      <section>
        <div className="relative pt-24 md:pt-36">
          {/* Dark background image */}
          <AnimatedGroup
            variants={{
              container: { visible: { transition: { delayChildren: 1 } } },
              item: {
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, transition: { type: 'spring' as const, bounce: 0.3, duration: 2 } },
              },
            }}
            className="absolute inset-0 -z-20"
          >
            <div className="absolute inset-x-0 top-0 -z-20 h-full bg-gradient-to-br from-[#0f1b2d] via-[#0a1628] to-[#0d1f3c] hidden dark:block" />
          </AnimatedGroup>

          <div aria-hidden className="absolute inset-0 -z-10 size-full [background:radial-gradient(125%_125%_at_50%_100%,transparent_0%,var(--background)_75%)]" />

          <div className="mx-auto max-w-7xl px-6">
            <div className="text-center sm:mx-auto lg:mr-auto lg:mt-0">
              <AnimatedGroup variants={transitionVariants}>
                {/* Badge */}
                <Link
                  href="/contact"
                  className="hover:bg-background dark:hover:border-t-border bg-muted group mx-auto flex w-fit items-center gap-4 rounded-full border p-1 pl-4 shadow-md shadow-black/5 transition-all duration-300 dark:border-t-white/5 dark:shadow-zinc-950 mb-6"
                >
                  <span className="text-foreground text-sm">AI for franchise operations</span>
                  <span className="dark:border-background block h-4 w-0.5 border-l bg-white dark:bg-zinc-700" />
                  <div className="bg-background group-hover:bg-muted size-6 overflow-hidden rounded-full duration-500">
                    <div className="flex w-12 -translate-x-1/2 duration-500 ease-in-out group-hover:translate-x-0">
                      <span className="flex size-6"><ArrowRight className="m-auto size-3" /></span>
                      <span className="flex size-6"><ArrowRight className="m-auto size-3" /></span>
                    </div>
                  </div>
                </Link>

                <h1 className="mt-8 max-w-4xl mx-auto text-balance text-6xl md:text-7xl lg:mt-8 xl:text-[5.25rem] font-bold tracking-tight">
                  One platform.<br />Every location.
                </h1>
                <p className="mx-auto mt-8 max-w-2xl text-balance text-lg text-muted-foreground">
                  Ainomiq gives franchise operators a single AI layer across all locations. Customer service, inventory, email, and reporting — automated from day one.
                </p>
              </AnimatedGroup>

              {/* CTAs */}
              <AnimatedGroup
                variants={{
                  container: { visible: { transition: { staggerChildren: 0.05, delayChildren: 0.75 } } },
                  ...transitionVariants,
                }}
                className="mt-12 flex flex-col items-center justify-center gap-2 md:flex-row"
              >
                <div className="bg-foreground/10 rounded-[14px] border p-0.5">
                  <Button asChild size="lg" className="rounded-xl px-5 text-base">
                    <Link href="/get-started">
                      <span className="text-nowrap">Get started</span>
                    </Link>
                  </Button>
                </div>
                <Button asChild size="lg" variant="ghost" className="h-10.5 rounded-xl px-5">
                  <Link href="/contact">
                    <span className="text-nowrap">Talk to sales</span>
                  </Link>
                </Button>
              </AnimatedGroup>
            </div>
          </div>

          {/* Dashboard preview image */}
          <AnimatedGroup
            variants={{
              container: { visible: { transition: { staggerChildren: 0.05, delayChildren: 0.75 } } },
              ...transitionVariants,
            }}
          >
            <div className="relative -mr-56 mt-8 overflow-hidden px-2 sm:mr-0 sm:mt-12 md:mt-20">
              <div aria-hidden className="bg-gradient-to-b to-background absolute inset-0 z-10 from-transparent from-35%" />
              <div className="inset-shadow-2xs ring-background dark:inset-shadow-white/20 bg-background relative mx-auto max-w-6xl overflow-hidden rounded-2xl border p-4 shadow-lg shadow-zinc-950/15 ring-1">
                <img
                  className="bg-background aspect-15/8 relative rounded-2xl w-full object-cover"
                  src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=2700&h=1440&fit=crop&crop=center&q=80"
                  alt="Ainomiq franchise dashboard"
                  width="2700"
                  height="1440"
                />
              </div>
            </div>
          </AnimatedGroup>
        </div>
      </section>

      {/* Social proof logos */}
      <section className="bg-background pb-16 pt-16 md:pb-32">
        <div className="group relative m-auto max-w-5xl px-6">
          <div className="absolute inset-0 z-10 flex scale-95 items-center justify-center opacity-0 duration-500 group-hover:scale-100 group-hover:opacity-100">
            <Link href="/contact" className="block text-sm duration-150 hover:opacity-75">
              <span>Meet our clients</span>
              <ChevronRight className="ml-1 inline-block size-3" />
            </Link>
          </div>
          <div className="group-hover:blur-xs mx-auto mt-12 grid max-w-2xl grid-cols-4 gap-x-12 gap-y-8 transition-all duration-500 group-hover:opacity-50 sm:gap-x-16 sm:gap-y-14">
            {['Shopify', 'Klaviyo', 'Meta', 'Google', 'TikTok', 'Stripe', 'OpenAI', 'Anthropic'].map((name) => (
              <div key={name} className="flex items-center justify-center">
                <span className="text-muted-foreground/60 text-sm font-semibold tracking-wide">{name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
