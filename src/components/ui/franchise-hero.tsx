'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] },
  }),
};

export function FranchiseHero() {
  return (
    <section className="relative overflow-hidden pt-32 pb-8 md:pt-44 md:pb-12">
      {/* Subtle blue glow top-left */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 -left-40 h-[600px] w-[600px] rounded-full opacity-20 blur-3xl"
        style={{ background: 'radial-gradient(circle, #3b82f6 0%, transparent 70%)' }}
      />
      {/* Subtle blue glow top-right */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-20 -right-40 h-[400px] w-[400px] rounded-full opacity-10 blur-3xl"
        style={{ background: 'radial-gradient(circle, #6366f1 0%, transparent 70%)' }}
      />

      <div className="relative mx-auto max-w-4xl px-6 text-center">
        {/* Badge */}
        <motion.div
          initial="hidden"
          animate="visible"
          custom={0}
          variants={fadeUp}
        >
          <Link
            href="/contact"
            className="group inline-flex items-center gap-3 rounded-full border bg-muted px-4 py-1.5 text-sm shadow-sm transition-all duration-300 hover:bg-background mb-8"
          >
            <span className="text-foreground">AI for franchise operations</span>
            <span className="block h-4 w-px bg-border" />
            <div className="size-5 overflow-hidden rounded-full bg-background">
              <div className="flex w-10 -translate-x-1/2 duration-500 ease-in-out group-hover:translate-x-0">
                <span className="flex size-5"><ArrowRight className="m-auto size-3" /></span>
                <span className="flex size-5"><ArrowRight className="m-auto size-3" /></span>
              </div>
            </div>
          </Link>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial="hidden"
          animate="visible"
          custom={0.1}
          variants={fadeUp}
          className="text-5xl md:text-7xl font-bold tracking-tight leading-[1.05] text-foreground"
        >
          One platform.
          <br />
          Every location.
        </motion.h1>

        {/* Subtext */}
        <motion.p
          initial="hidden"
          animate="visible"
          custom={0.2}
          variants={fadeUp}
          className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground"
        >
          Ainomiq gives franchise operators a single AI layer across all locations.
          Customer service, inventory, email, and reporting - automated from day one.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial="hidden"
          animate="visible"
          custom={0.3}
          variants={fadeUp}
          className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row"
        >
          <Button asChild size="lg" className="rounded-xl px-6 text-base">
            <Link href="/get-started">Get started</Link>
          </Button>
          <Button asChild size="lg" variant="outline" className="rounded-xl px-6">
            <Link href="/contact">Talk to sales</Link>
          </Button>
        </motion.div>
      </div>

      {/* Dashboard screenshot */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
        className="relative mx-auto mt-16 max-w-5xl px-6"
      >
        {/* Fade-out bottom gradient */}
        <div
          aria-hidden
          className="pointer-events-none absolute bottom-0 inset-x-6 h-32 z-10"
          style={{ background: 'linear-gradient(to bottom, transparent, var(--background))' }}
        />
        <div className="overflow-hidden rounded-2xl border shadow-2xl shadow-black/10 ring-1 ring-black/5">
          <img
            src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=2400&h=1280&fit=crop&crop=center&q=80"
            alt="Ainomiq franchise dashboard"
            width="2400"
            height="1280"
            className="w-full object-cover"
          />
        </div>
      </motion.div>

      {/* Integration logos */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.7 }}
        className="mx-auto mt-16 max-w-3xl px-6"
      >
        <p className="text-center text-xs font-semibold uppercase tracking-widest text-muted-foreground/50 mb-6">
          Integrates with your existing tools
        </p>
        <div className="grid grid-cols-4 gap-6 sm:grid-cols-8">
          {['Shopify', 'Klaviyo', 'Meta', 'Google', 'TikTok', 'Stripe', 'OpenAI', 'Zapier'].map((name) => (
            <div key={name} className="flex items-center justify-center">
              <span className="text-muted-foreground/40 text-xs font-semibold tracking-wide">{name}</span>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
