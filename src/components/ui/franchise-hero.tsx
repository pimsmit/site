'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { FranchiseDashboard } from '@/components/ui/franchise-dashboard';

function MobileDashboard() {
  return (
    <div className="p-4 pt-24 space-y-3 text-white">

      {/* Header */}
      <div className="flex items-center justify-between mb-1">
        <div>
          <div className="text-[10px] font-bold text-white">De Burgerij</div>
          <div className="text-[8px] text-ainomiq-text-muted">All Locations</div>
        </div>
        <div className="flex items-center gap-1 bg-green-500/20 rounded-full px-2 py-0.5">
          <div className="w-1.5 h-1.5 rounded-full bg-green-400" />
          <span className="text-[8px] text-green-400 font-semibold">AI Active</span>
        </div>
      </div>

      {/* KPI grid */}
      <div className="grid grid-cols-2 gap-2">
        {[
          { label: 'Revenue', val: 'EUR 12.847', sub: '+18% vs yesterday', color: '#00d4aa' },
          { label: 'AI Orders', val: '2.341', sub: '94.2% automation', color: '#3b82f6' },
          { label: 'Response', val: '1.2 min', sub: 'Was 8 min manual', color: '#a78bfa' },
          { label: 'CSAT', val: '4.8/5', sub: 'Up from 3.9 pre-AI', color: '#f59e0b' },
        ].map(k => (
          <div key={k.label} className="rounded-xl p-3" style={{ background: 'rgba(255,255,255,0.06)' }}>
            <div className="text-[8px] text-ainomiq-text-muted mb-1">{k.label}</div>
            <div className="text-sm font-bold" style={{ color: k.color }}>{k.val}</div>
            <div className="text-[7px] mt-0.5" style={{ color: k.color, opacity: 0.7 }}>{k.sub}</div>
          </div>
        ))}
      </div>

      {/* Bar chart */}
      <div className="rounded-xl p-3" style={{ background: 'rgba(255,255,255,0.04)' }}>
        <div className="text-[9px] font-semibold text-white mb-2">Revenue per Location</div>
        <div className="flex items-end gap-1" style={{ height: 52 }}>
          {[100,82,76,58,52,45,36,30,14,10].map((h, i) => (
            <div key={i} className="flex-1 rounded-sm" style={{
              height: `${h}%`,
              background: i === 0 ? '#00d4aa' : i < 3 ? '#3b82f6' : i < 6 ? '#818cf8' : '#ec4899',
              opacity: i > 6 ? 0.6 : 1,
            }} />
          ))}
        </div>
        <div className="flex justify-between mt-1">
          <span className="text-[6px] text-ainomiq-text-muted">AMS-C</span>
          <span className="text-[6px] text-ainomiq-text-muted">BRD</span>
        </div>
      </div>

      {/* Live feed */}
      <div className="rounded-xl p-3" style={{ background: 'rgba(255,255,255,0.04)' }}>
        <div className="flex items-center justify-between mb-2">
          <div className="text-[9px] font-semibold text-white">Live AI Activity</div>
          <div className="flex items-center gap-1">
            <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
            <span className="text-[7px] text-green-400">Live</span>
          </div>
        </div>
        {[
          { loc: 'Amsterdam', action: 'AI drafted 5-star response', type: 'Resolved', color: '#00d4aa' },
          { loc: 'Haarlem', action: 'Upsell on 22 orders accepted', type: 'Upsell', color: '#f59e0b' },
          { loc: 'Utrecht', action: 'Complaint resolved by AI', type: 'Resolved', color: '#00d4aa' },
        ].map((item, i) => (
          <div key={i} className="flex items-start justify-between py-1.5 border-t border-white/5">
            <div className="flex-1 pr-2">
              <div className="text-[8px] font-semibold text-white">{item.loc}</div>
              <div className="text-[7px] text-ainomiq-text-muted">{item.action}</div>
            </div>
            <div className="rounded-full px-1.5 py-0.5 text-[6px] font-bold flex-shrink-0" style={{ background: `${item.color}22`, color: item.color }}>
              {item.type}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function IPhoneMockup() {
  return (
    <div className="relative flex-shrink-0" style={{ width: 260, marginBottom: 44 }}>
      {/* iPhone body */}
      <div
        className="relative rounded-[36px] overflow-hidden shadow-2xl"
        style={{
          background: 'linear-gradient(180deg, #2a2a2c 0%, #1c1c1e 100%)',
          padding: '10px',
          boxShadow: '0 40px 80px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.08)',
          height: 520,
        }}
      >
        {/* Dynamic Island */}
        <div
          className="absolute top-4 left-1/2 -translate-x-1/2 z-20 rounded-full"
          style={{ width: 80, height: 22, background: '#000' }}
        />
        {/* Location bar — outside scroll, pinned below Dynamic Island */}
        <div
          className="absolute z-10 left-0 right-0"
          style={{ top: 36, background: '#0f1923', padding: '6px 12px 4px' }}
        >
          <div
            className="flex items-center gap-1.5"
            style={{ overflowX: 'auto', scrollbarWidth: 'none' }}
          >
            {[
              ['AMS-C','#00d4aa'],['AMS-Z','#3b82f6'],['ROT','#6366f1'],
              ['UTR','#818cf8'],['DH','#ec4899'],['EHV','#f59e0b'],
              ['GRN','#10b981'],['HLM','#8b5cf6'],['TLB','#ef4444'],['BRD','#06b6d4'],
            ].map(([loc, color]) => (
              <div
                key={loc}
                className="flex-shrink-0 flex items-center gap-1 rounded-full px-2 py-0.5"
                style={{ background: `${color}22`, border: `1px solid ${color}55` }}
              >
                <div className="w-1.5 h-1.5 rounded-full" style={{ background: color }} />
                <span className="text-[7px] font-bold" style={{ color }}>{loc}</span>
              </div>
            ))}
          </div>
        </div>
        {/* Screen */}
        <div
          className="rounded-[28px] overflow-y-auto h-full"
          style={{ background: '#0f1923', position: 'relative' }}
        >
          {/* Mobile-optimized dashboard layout */}
          <MobileDashboard />
        </div>
      </div>
      {/* Side buttons */}
      <div className="absolute left-0 top-20 w-0.5 h-8 rounded-r" style={{background:'#3a3a3c',marginLeft:-2}} />
      <div className="absolute left-0 top-32 w-0.5 h-6 rounded-r" style={{background:'#3a3a3c',marginLeft:-2}} />
      <div className="absolute right-0 top-24 w-0.5 h-10 rounded-l" style={{background:'#3a3a3c',marginRight:-2}} />
    </div>
  );
}

export function FranchiseHero() {
  return (
    <section className="relative overflow-hidden pt-32 pb-0 md:pt-44 md:pb-0">
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

      {/* Apple-style Desktop + iPhone mockup */}
      <div className="relative mx-auto mt-16 max-w-6xl px-4 pb-32">
        {/* Bottom fade — soft, tall gradient */}
        <div
          aria-hidden
          className="pointer-events-none absolute bottom-0 inset-x-0 h-64 z-10"
          style={{ background: 'linear-gradient(to bottom, transparent 0%, hsl(var(--background)) 80%)' }}
        />

        <div className="flex items-end justify-center gap-8">

        {/* Desktop monitor — hidden on mobile */}
        <div className="relative flex-1 hidden md:block" style={{ maxWidth: 900 }}>
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

        <IPhoneMockup />

        </div>
        {/* end flex row */}
      </div>
    </section>
  );
}
