'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { FranchiseDashboard } from '@/components/ui/franchise-dashboard';

function MobileDashboard() {
  const [tab, setTab] = React.useState<'overview'|'locations'|'staff'|'analytics'|'ai'>('overview');

  const tabs = [
    { id: 'overview' as const, label: 'Overview', icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/>
        <rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/>
      </svg>
    )},
    { id: 'locations' as const, label: 'Locations', icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s-8-4.5-8-11.8A8 8 0 0 1 12 2a8 8 0 0 1 8 8.2c0 7.3-8 11.8-8 11.8z"/>
        <circle cx="12" cy="10" r="3"/>
      </svg>
    )},
    { id: 'staff' as const, label: 'Staff', icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
        <circle cx="9" cy="7" r="4"/>
        <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
        <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
      </svg>
    )},
    { id: 'analytics' as const, label: 'Analytics', icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="18" y1="20" x2="18" y2="10"/>
        <line x1="12" y1="20" x2="12" y2="4"/>
        <line x1="6" y1="20" x2="6" y2="14"/>
      </svg>
    )},
    { id: 'ai' as const, label: 'AI', icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2a2 2 0 0 1 2 2c0 .74-.4 1.39-1 1.73V7h1a7 7 0 0 1 7 7h1a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1h-1v1a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-1H2a1 1 0 0 1-1-1v-3a1 1 0 0 1 1-1h1a7 7 0 0 1 7-7h1V5.73c-.6-.34-1-.99-1-1.73a2 2 0 0 1 2-2z"/>
        <circle cx="7.5" cy="14.5" r="1.5"/>
        <circle cx="16.5" cy="14.5" r="1.5"/>
      </svg>
    )},
  ];

  return (
    <div className="flex flex-col text-white" style={{ height: '100%' }}>
      {/* Scrollable content area */}
      <div className="flex-1 overflow-y-auto p-3 pt-20 space-y-2.5" style={{ paddingBottom: 60 }}>

        {/* Header */}
        <div className="flex items-center justify-between mb-1">
          <div>
            <div className="text-[10px] font-bold text-white">De Burgerij</div>
            <div className="text-[8px]" style={{ color: '#64748b' }}>All Locations</div>
          </div>
          <div className="flex items-center gap-1 rounded-full px-2 py-0.5" style={{ background: 'rgba(74,222,128,0.15)' }}>
            <div className="w-1.5 h-1.5 rounded-full bg-green-400" />
            <span className="text-[8px] text-green-400 font-semibold">AI Active</span>
          </div>
        </div>

        {tab === 'overview' && (
          <>
            {/* KPI grid */}
            <div className="grid grid-cols-2 gap-1.5">
              {[
                { label: 'Revenue', val: 'EUR 12.847', sub: '+18% vs yesterday', color: '#00d4aa' },
                { label: 'AI Orders', val: '2.341', sub: '94.2% automation', color: '#3b82f6' },
                { label: 'Response', val: '1.2 min', sub: 'Was 8 min manual', color: '#a78bfa' },
                { label: 'CSAT', val: '4.8/5', sub: 'Up from 3.9 pre-AI', color: '#f59e0b' },
              ].map(k => (
                <div key={k.label} className="rounded-xl p-2.5" style={{ background: 'rgba(255,255,255,0.06)' }}>
                  <div className="text-[7px] mb-0.5" style={{ color: '#64748b' }}>{k.label}</div>
                  <div className="text-[11px] font-bold" style={{ color: k.color }}>{k.val}</div>
                  <div className="text-[6px] mt-0.5" style={{ color: k.color, opacity: 0.7 }}>{k.sub}</div>
                </div>
              ))}
            </div>
            {/* Bar chart */}
            <div className="rounded-xl p-2.5" style={{ background: 'rgba(255,255,255,0.04)' }}>
              <div className="text-[8px] font-semibold text-white mb-2">Revenue per Location</div>
              <div className="flex items-end gap-1" style={{ height: 44 }}>
                {[100,82,76,58,52,45,36,30,14,10].map((h, i) => (
                  <div key={i} className="flex-1 rounded-sm" style={{
                    height: `${h}%`,
                    background: i === 0 ? '#00d4aa' : i < 3 ? '#3b82f6' : i < 6 ? '#818cf8' : '#ec4899',
                    opacity: i > 6 ? 0.6 : 1,
                  }} />
                ))}
              </div>
              <div className="flex justify-between mt-1">
                <span className="text-[6px]" style={{ color: '#64748b' }}>AMS-C</span>
                <span className="text-[6px]" style={{ color: '#64748b' }}>BRD</span>
              </div>
            </div>
            {/* Live feed */}
            <div className="rounded-xl p-2.5" style={{ background: 'rgba(255,255,255,0.04)' }}>
              <div className="flex items-center justify-between mb-1.5">
                <div className="text-[8px] font-semibold text-white">Live AI Activity</div>
                <div className="flex items-center gap-1">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-400" style={{ animation: 'pulse 2s infinite' }} />
                  <span className="text-[7px] text-green-400">Live</span>
                </div>
              </div>
              {[
                { loc: 'Amsterdam', action: 'AI drafted 5-star response', type: 'Resolved', color: '#00d4aa' },
                { loc: 'Haarlem', action: 'Upsell on 22 orders accepted', type: 'Upsell', color: '#f59e0b' },
                { loc: 'Utrecht', action: 'Complaint resolved by AI', type: 'Resolved', color: '#00d4aa' },
              ].map((item, i) => (
                <div key={i} className="flex items-start justify-between py-1.5" style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}>
                  <div className="flex-1 pr-2">
                    <div className="text-[8px] font-semibold text-white">{item.loc}</div>
                    <div className="text-[7px]" style={{ color: '#64748b' }}>{item.action}</div>
                  </div>
                  <div className="rounded-full px-1.5 py-0.5 text-[6px] font-bold flex-shrink-0" style={{ background: `${item.color}22`, color: item.color }}>
                    {item.type}
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {tab === 'locations' && (
          <div className="space-y-1.5">
            <div className="text-[8px] font-semibold text-white mb-2">10 Locations</div>
            {[
              { name: 'Amsterdam Centrum', revenue: 'EUR 12.847', ai: '96.8%', status: 'green' },
              { name: 'Amsterdam Zuid', revenue: 'EUR 10.934', ai: '94.7%', status: 'green' },
              { name: 'Rotterdam', revenue: 'EUR 9.421', ai: '93.2%', status: 'green' },
              { name: 'Utrecht', revenue: 'EUR 8.318', ai: '91.4%', status: 'green' },
              { name: 'Den Haag', revenue: 'EUR 7.203', ai: '90.1%', status: 'yellow' },
              { name: 'Eindhoven', revenue: 'EUR 6.841', ai: '88.3%', status: 'green' },
              { name: 'Groningen', revenue: 'EUR 5.632', ai: '85.7%', status: 'yellow' },
              { name: 'Haarlem', revenue: 'EUR 4.918', ai: '83.2%', status: 'green' },
              { name: 'Tilburg', revenue: 'EUR 3.204', ai: '79.1%', status: 'green' },
              { name: 'Breda', revenue: 'EUR 2.109', ai: '75.3%', status: 'red' },
            ].map((loc, i) => (
              <div key={i} className="rounded-xl p-2.5 flex items-center justify-between" style={{ background: 'rgba(255,255,255,0.05)' }}>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: loc.status === 'green' ? '#4ade80' : loc.status === 'yellow' ? '#facc15' : '#f87171' }} />
                  <div>
                    <div className="text-[8px] font-semibold text-white">{loc.name}</div>
                    <div className="text-[7px]" style={{ color: '#64748b' }}>{loc.revenue}</div>
                  </div>
                </div>
                <div className="text-[8px] font-bold" style={{ color: '#00d4aa' }}>{loc.ai} AI</div>
              </div>
            ))}
          </div>
        )}

        {tab === 'staff' && (
          <div className="space-y-1.5">
            <div className="text-[8px] font-semibold text-white mb-2">On shift now - 47 employees</div>
            {[
              { name: 'Sophie K.', role: 'Manager', loc: 'Amsterdam C.', status: 'Active' },
              { name: 'Tom B.', role: 'Cashier', loc: 'Amsterdam C.', status: 'Break' },
              { name: 'Layla M.', role: 'Kitchen', loc: 'Rotterdam', status: 'Active' },
              { name: 'Daan V.', role: 'Manager', loc: 'Utrecht', status: 'Active' },
              { name: 'Emma R.', role: 'Cashier', loc: 'Den Haag', status: 'Active' },
              { name: 'Noah J.', role: 'Kitchen', loc: 'Haarlem', status: 'Break' },
            ].map((emp, i) => (
              <div key={i} className="rounded-xl p-2.5 flex items-center justify-between" style={{ background: 'rgba(255,255,255,0.05)' }}>
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full flex items-center justify-center text-[8px] font-bold" style={{ background: '#3b82f622', color: '#3b82f6' }}>
                    {emp.name[0]}
                  </div>
                  <div>
                    <div className="text-[8px] font-semibold text-white">{emp.name}</div>
                    <div className="text-[7px]" style={{ color: '#64748b' }}>{emp.role} - {emp.loc}</div>
                  </div>
                </div>
                <div className="rounded-full px-1.5 py-0.5 text-[6px] font-bold" style={{
                  background: emp.status === 'Active' ? '#4ade8022' : '#facc1522',
                  color: emp.status === 'Active' ? '#4ade80' : '#facc15',
                }}>{emp.status}</div>
              </div>
            ))}
          </div>
        )}

        {tab === 'analytics' && (
          <>
            <div className="grid grid-cols-2 gap-1.5">
              {[
                { label: 'Avg ticket', val: 'EUR 14.20', trend: '+4%', color: '#3b82f6' },
                { label: 'Peak hour', val: '12:00-13:00', trend: 'daily', color: '#a78bfa' },
                { label: 'Waste saved', val: 'EUR 2.340', trend: 'this month', color: '#00d4aa' },
                { label: 'NPS Score', val: '72', trend: '+8 pts', color: '#f59e0b' },
              ].map(k => (
                <div key={k.label} className="rounded-xl p-2.5" style={{ background: 'rgba(255,255,255,0.06)' }}>
                  <div className="text-[7px] mb-0.5" style={{ color: '#64748b' }}>{k.label}</div>
                  <div className="text-[11px] font-bold" style={{ color: k.color }}>{k.val}</div>
                  <div className="text-[6px] mt-0.5" style={{ color: k.color, opacity: 0.7 }}>{k.trend}</div>
                </div>
              ))}
            </div>
            <div className="rounded-xl p-2.5" style={{ background: 'rgba(255,255,255,0.04)' }}>
              <div className="text-[8px] font-semibold text-white mb-2">Weekly Revenue</div>
              <div className="flex items-end gap-1" style={{ height: 48 }}>
                {[60,72,58,80,90,76,100].map((h, i) => (
                  <div key={i} className="flex-1 rounded-sm" style={{ height: `${h}%`, background: i === 6 ? '#00d4aa' : '#3b82f6', opacity: i < 5 ? 0.6 : 1 }} />
                ))}
              </div>
              <div className="flex justify-between mt-1">
                <span className="text-[6px]" style={{ color: '#64748b' }}>Mon</span>
                <span className="text-[6px]" style={{ color: '#64748b' }}>Sun</span>
              </div>
            </div>
          </>
        )}

        {tab === 'ai' && (
          <div className="space-y-1.5">
            <div className="grid grid-cols-2 gap-1.5 mb-2">
              <div className="rounded-xl p-2.5" style={{ background: 'rgba(0,212,170,0.1)' }}>
                <div className="text-[7px] mb-0.5" style={{ color: '#64748b' }}>AI handled today</div>
                <div className="text-[13px] font-bold" style={{ color: '#00d4aa' }}>2.341</div>
                <div className="text-[6px]" style={{ color: '#00d4aa', opacity: 0.7 }}>94.2% of all tickets</div>
              </div>
              <div className="rounded-xl p-2.5" style={{ background: 'rgba(59,130,246,0.1)' }}>
                <div className="text-[7px] mb-0.5" style={{ color: '#64748b' }}>Avg response</div>
                <div className="text-[13px] font-bold" style={{ color: '#3b82f6' }}>1.2 min</div>
                <div className="text-[6px]" style={{ color: '#3b82f6', opacity: 0.7 }}>Was 8 min manual</div>
              </div>
            </div>
            <div className="text-[8px] font-semibold text-white mb-1">Recent AI Actions</div>
            {[
              { action: 'Resolved complaint', loc: 'Amsterdam C.', time: '2m ago', color: '#00d4aa' },
              { action: 'Upsell triggered', loc: 'Rotterdam', time: '5m ago', color: '#f59e0b' },
              { action: 'Review replied', loc: 'Utrecht', time: '8m ago', color: '#3b82f6' },
              { action: 'Staff scheduled', loc: 'Den Haag', time: '12m ago', color: '#a78bfa' },
              { action: 'Inventory alert', loc: 'Breda', time: '18m ago', color: '#f87171' },
              { action: 'Resolved complaint', loc: 'Haarlem', time: '22m ago', color: '#00d4aa' },
            ].map((item, i) => (
              <div key={i} className="rounded-xl p-2 flex items-center justify-between" style={{ background: 'rgba(255,255,255,0.04)' }}>
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: item.color }} />
                  <div>
                    <div className="text-[8px] font-semibold text-white">{item.action}</div>
                    <div className="text-[7px]" style={{ color: '#64748b' }}>{item.loc}</div>
                  </div>
                </div>
                <div className="text-[6px]" style={{ color: '#64748b' }}>{item.time}</div>
              </div>
            ))}
          </div>
        )}

      </div>

      {/* iOS-style bottom tab bar */}
      <div
        className="flex-shrink-0 flex items-center justify-around px-1 pt-2 pb-1"
        style={{
          background: 'rgba(15,25,35,0.95)',
          borderTop: '1px solid rgba(255,255,255,0.08)',
          backdropFilter: 'blur(12px)',
          height: 52,
        }}
      >
        {tabs.map(t => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className="flex flex-col items-center gap-0.5 flex-1"
            style={{ border: 'none', background: 'none', cursor: 'pointer', color: tab === t.id ? '#3b82f6' : '#64748b', transition: 'color 0.15s' }}
          >
            <span style={{ display: 'flex', opacity: tab === t.id ? 1 : 0.6 }}>{t.icon}</span>
            <span className="text-[6px] font-semibold" style={{ letterSpacing: 0.2 }}>{t.label}</span>
          </button>
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
        className="relative rounded-[36px] shadow-2xl"
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
          className="rounded-[28px] h-full"
          style={{ background: '#0f1923', position: 'relative', overflow: 'hidden' }}
        >
          <div className="h-full" style={{ display: 'flex', flexDirection: 'column' }}>
            <MobileDashboard />
          </div>
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
