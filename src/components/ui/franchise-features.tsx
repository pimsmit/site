'use client';

import { useState } from 'react';
import { MapPin, Zap, BarChart2, Users, ChevronRight } from 'lucide-react';

const tabs = [
  {
    id: 'locations',
    icon: MapPin,
    label: 'Locations',
    headline: 'Every location, one view',
    desc: 'Monitor all your franchise locations in real time. Revenue, orders, AI automation rate, and customer satisfaction - all in one dashboard.',
    bullets: [
      'Per-location revenue & order tracking',
      'Instant alerts on underperforming stores',
      'Compare locations side by side',
      'Status indicators: Excellent / Good / Needs attention',
    ],
    preview: (
      <div className="space-y-2">
        {[
          { name: 'Amsterdam Centrum', rev: 'EUR 2.847', rate: '96.8%', status: 'excellent' },
          { name: 'Rotterdam',         rev: 'EUR 1.934', rate: '94.7%', status: 'excellent' },
          { name: 'Utrecht',           rev: 'EUR 1.421', rate: '93.2%', status: 'good' },
          { name: 'Tilburg',           rev: 'EUR 318',   rate: '78.3%', status: 'attention' },
        ].map(loc => (
          <div key={loc.name} className="flex items-center justify-between rounded-xl px-4 py-3" style={{ background: 'rgba(255,255,255,0.05)' }}>
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full" style={{ background: loc.status === 'excellent' ? '#00d4aa' : loc.status === 'good' ? '#3b82f6' : '#f59e0b' }} />
              <span className="text-sm font-medium text-white">{loc.name}</span>
            </div>
            <div className="flex items-center gap-4 text-xs">
              <span className="text-ainomiq-text-muted">{loc.rev}</span>
              <span className="font-semibold" style={{ color: loc.status === 'attention' ? '#f59e0b' : '#00d4aa' }}>{loc.rate} AI</span>
            </div>
          </div>
        ))}
      </div>
    ),
  },
  {
    id: 'ai-actions',
    icon: Zap,
    label: 'AI Actions',
    headline: 'AI handles it before you notice',
    desc: 'Every customer message, complaint, upsell opportunity, and operational alert is handled by AI - instantly, 24/7, across all locations.',
    bullets: [
      'Auto-resolve customer complaints',
      'Smart upsell suggestions on every order',
      'Menu & pricing update broadcasts',
      'Live feed of every AI action taken',
    ],
    preview: (
      <div className="space-y-2">
        {[
          { loc: 'Amsterdam', action: 'AI drafted 5-star review response', tag: 'Resolved', color: '#00d4aa' },
          { loc: 'Haarlem',   action: 'Upsell accepted on 22 orders (+EUR 88)', tag: 'Upsell', color: '#f59e0b' },
          { loc: 'Utrecht',   action: 'Complaint resolved, coupon sent', tag: 'Resolved', color: '#00d4aa' },
          { loc: 'Rotterdam', action: 'Menu price updated across POS', tag: 'Update', color: '#3b82f6' },
        ].map((item, i) => (
          <div key={i} className="flex items-center justify-between rounded-xl px-4 py-3" style={{ background: 'rgba(255,255,255,0.05)' }}>
            <div className="flex-1 pr-4">
              <div className="text-xs font-semibold text-white">{item.loc}</div>
              <div className="text-xs text-ainomiq-text-muted">{item.action}</div>
            </div>
            <div className="rounded-full px-2 py-0.5 text-xs font-bold flex-shrink-0" style={{ background: `${item.color}22`, color: item.color }}>
              {item.tag}
            </div>
          </div>
        ))}
      </div>
    ),
  },
  {
    id: 'analytics',
    icon: BarChart2,
    label: 'Analytics',
    headline: 'Data that drives decisions',
    desc: 'Deep analytics across every location. Spot trends, track KPIs, and get AI-powered recommendations before problems become costly.',
    bullets: [
      'Revenue & order trends over time',
      'Peak hours and demand forecasting',
      'AI automation rate per location',
      'Customer satisfaction trending',
    ],
    preview: (
      <div className="space-y-3">
        <div className="rounded-xl p-4" style={{ background: 'rgba(255,255,255,0.05)' }}>
          <div className="text-xs text-ainomiq-text-muted mb-3">Orders Today vs Yesterday</div>
          <div className="flex items-end gap-1" style={{ height: 64 }}>
            {[40,55,90,100,72,60,75,95,88,65,50,40].map((h, i) => (
              <div key={i} className="flex-1 rounded-sm" style={{ height: `${h}%`, background: i % 2 === 0 ? 'rgba(59,130,246,0.6)' : 'rgba(0,212,170,0.4)' }} />
            ))}
          </div>
        </div>
        <div className="grid grid-cols-3 gap-2">
          {[
            { label: 'Avg CSAT', val: '4.8', delta: '+0.9' },
            { label: 'AI Rate', val: '94%', delta: '+12%' },
            { label: 'Resp Time', val: '1.2m', delta: '-6.8m' },
          ].map(m => (
            <div key={m.label} className="rounded-xl p-3 text-center" style={{ background: 'rgba(255,255,255,0.05)' }}>
              <div className="text-lg font-bold text-white">{m.val}</div>
              <div className="text-[10px] text-ainomiq-text-muted">{m.label}</div>
              <div className="text-[10px] font-semibold text-green-400">{m.delta}</div>
            </div>
          ))}
        </div>
      </div>
    ),
  },
  {
    id: 'staff',
    icon: Users,
    label: 'Staff',
    headline: 'Fewer hands, same output',
    desc: 'AI handles the repetitive work so your staff can focus on what matters. Track workload distribution and see where AI saves the most time.',
    bullets: [
      'AI handles 94% of customer interactions',
      'Staff notified only for escalations',
      'Shift cost reduction tracking',
      'Human override available anytime',
    ],
    preview: (
      <div className="space-y-2">
        {[
          { role: 'Customer Service', ai: 94, human: 6 },
          { role: 'Order Processing', ai: 88, human: 12 },
          { role: 'Complaints',       ai: 79, human: 21 },
          { role: 'Upselling',        ai: 91, human: 9 },
        ].map(item => (
          <div key={item.role} className="rounded-xl px-4 py-3" style={{ background: 'rgba(255,255,255,0.05)' }}>
            <div className="flex justify-between mb-1.5">
              <span className="text-xs font-medium text-white">{item.role}</span>
              <span className="text-xs font-bold text-ainomiq-blue">{item.ai}% AI</span>
            </div>
            <div className="flex rounded-full overflow-hidden" style={{ height: 6 }}>
              <div style={{ width: `${item.ai}%`, background: '#00d4aa' }} />
              <div style={{ width: `${item.human}%`, background: 'rgba(255,255,255,0.15)' }} />
            </div>
          </div>
        ))}
      </div>
    ),
  },
];

export function FranchiseFeatures() {
  const [active, setActive] = useState('locations');
  const tab = tabs.find(t => t.id === active)!;

  return (
    <section className="py-24 px-6">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="inline-flex items-center rounded-full bg-ainomiq-blue-glow px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-ainomiq-blue">
            Platform
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight mt-4">
            Everything in one place
          </h2>
          <p className="text-ainomiq-text-muted mt-4 max-w-xl mx-auto">
            One platform to run all your franchise operations. From AI-handled customer service to per-location analytics.
          </p>
        </div>

        {/* Tab bar */}
        <div className="flex justify-center gap-2 mb-10 flex-wrap">
          {tabs.map(t => {
            const Icon = t.icon;
            const isActive = t.id === active;
            return (
              <button
                key={t.id}
                onClick={() => setActive(t.id)}
                className="flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold transition-all"
                style={{
                  background: isActive ? 'rgba(59,130,246,0.15)' : 'rgba(255,255,255,0.05)',
                  border: `1px solid ${isActive ? 'rgba(59,130,246,0.4)' : 'rgba(255,255,255,0.08)'}`,
                  color: isActive ? '#60a5fa' : 'rgba(255,255,255,0.5)',
                }}
              >
                <Icon size={15} />
                {t.label}
              </button>
            );
          })}
        </div>

        {/* Content panel */}
        <div
          className="rounded-2xl overflow-hidden"
          style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}
        >
          <div className="grid md:grid-cols-2 gap-0">
            {/* Left: text */}
            <div className="p-8 md:p-10 flex flex-col justify-center">
              <h3 className="text-2xl font-extrabold tracking-tight text-white mb-3">{tab.headline}</h3>
              <p className="text-ainomiq-text-muted mb-6 leading-relaxed">{tab.desc}</p>
              <ul className="space-y-2">
                {tab.bullets.map(b => (
                  <li key={b} className="flex items-start gap-2 text-sm text-white/80">
                    <ChevronRight size={14} className="mt-0.5 flex-shrink-0 text-ainomiq-blue" />
                    {b}
                  </li>
                ))}
              </ul>
            </div>
            {/* Right: live preview */}
            <div className="p-6 md:p-8 border-t md:border-t-0 md:border-l border-white/5 flex flex-col justify-center">
              {tab.preview}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
