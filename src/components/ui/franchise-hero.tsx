'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { FranchiseDashboard } from '@/components/ui/franchise-dashboard';

export function FranchiseHero() {
  return (
    <section className="relative overflow-hidden pt-32 pb-8 md:pt-44 md:pb-12">
      {/* Subtle blue glow top-left */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 -left-40 h-[600px] w-[600px] rounded-full opacity-20 blur-3xl"
        style={{ background: 'radial-gradient(circle, #3b82f6 0%, transparent 70%)' }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -top-20 -right-40 h-[400px] w-[400px] rounded-full opacity-10 blur-3xl"
        style={{ background: 'radial-gradient(circle, #6366f1 0%, transparent 70%)' }}
      />

      <div className="relative mx-auto max-w-4xl px-6 text-center">
        {/* Badge */}
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

        {/* Headline */}
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight leading-[1.05] text-foreground">
          One platform.
          <br />
          Every location.
        </h1>

        {/* Subtext */}
        <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
          Ainomiq gives franchise operators a single AI layer across all locations.
          Customer service, inventory, email, and reporting - automated from day one.
        </p>

        {/* CTAs */}
        <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Button asChild size="lg" className="rounded-xl px-6 text-base">
            <Link href="/get-started">Get started</Link>
          </Button>
          <Button asChild size="lg" variant="outline" className="rounded-xl px-6">
            <Link href="/contact">Talk to sales</Link>
          </Button>
        </div>
      </div>

      {/* Apple-style Desktop mockup with live dashboard */}
      <div className="relative mx-auto mt-16 max-w-6xl px-4">
        {/* Bottom fade */}
        <div
          aria-hidden
          className="pointer-events-none absolute bottom-0 inset-x-4 h-40 z-10"
          style={{ background: 'linear-gradient(to bottom, transparent, hsl(var(--background)))' }}
        />

        {/* iMac / Desktop monitor frame */}
        <div className="relative mx-auto" style={{ maxWidth: 1080 }}>
          {/* Monitor bezel */}
          <div
            className="rounded-2xl overflow-hidden shadow-2xl"
            style={{
              background: 'linear-gradient(180deg, #2a2a2c 0%, #1c1c1e 100%)',
              padding: '10px 10px 0 10px',
              boxShadow: '0 40px 80px rgba(0,0,0,0.4), 0 0 0 1px rgba(255,255,255,0.08), inset 0 1px 0 rgba(255,255,255,0.12)',
            }}
          >
            {/* Traffic lights */}
            <div className="flex items-center gap-1.5 px-3 pb-2">
              <div className="w-3 h-3 rounded-full" style={{ background: '#ff5f57' }} />
              <div className="w-3 h-3 rounded-full" style={{ background: '#febc2e' }} />
              <div className="w-3 h-3 rounded-full" style={{ background: '#28c840' }} />
            </div>

            {/* Screen area */}
            <div
              className="rounded-t-lg overflow-hidden"
              style={{
                background: '#0f1923',
                maxHeight: 560,
                overflowY: 'auto',
                scrollbarWidth: 'none',
              }}
            >
              <style>{`
                .monitor-screen::-webkit-scrollbar { display: none; }
              `}</style>
              <div className="monitor-screen" style={{ transform: 'scale(0.85)', transformOrigin: 'top center', width: '117.6%', marginLeft: '-8.8%' }}>
                <FranchiseDashboard />
              </div>
            </div>
          </div>

          {/* Monitor stand neck */}
          <div
            className="mx-auto"
            style={{
              width: 120,
              height: 24,
              background: 'linear-gradient(180deg, #2a2a2c 0%, #3a3a3c 100%)',
              clipPath: 'polygon(20% 0%, 80% 0%, 100% 100%, 0% 100%)',
            }}
          />
          {/* Stand base */}
          <div
            className="mx-auto rounded-full"
            style={{
              width: 200,
              height: 10,
              background: 'linear-gradient(180deg, #3a3a3c 0%, #2a2a2c 100%)',
              boxShadow: '0 2px 12px rgba(0,0,0,0.3)',
            }}
          />
        </div>
      </div>

      {/* Integration logos */}
      <div className="mx-auto mt-16 max-w-3xl px-6">
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
      </div>
    </section>
  );
}
