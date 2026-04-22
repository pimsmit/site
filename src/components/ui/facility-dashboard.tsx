'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  AreaChart, Area, PieChart, Pie, Cell, LineChart, Line, ReferenceLine
} from 'recharts';
import { Shield, Users, AlertTriangle, Clock, Star, ChevronDown } from 'lucide-react';

// ─── Data ─────────────────────────────────────────────────────────────────────

const sitePerformance = [
  { site: 'Schiphol Airport',       guards: 45, incidents: 12, aiRate: 94, sla: 100, status: 'Excellent', statusColor: '#00d4aa', client: 'Royal Schiphol Group',    contact: 'Jan de Vries' },
  { site: 'Rotterdam Port',         guards: 38, incidents: 9,  aiRate: 91, sla: 98,  status: 'Good',      statusColor: '#00d4aa', client: 'Port of Rotterdam',       contact: 'Mark Janssen' },
  { site: 'ASML Eindhoven',         guards: 28, incidents: 3,  aiRate: 97, sla: 100, status: 'Excellent', statusColor: '#00d4aa', client: 'ASML Holding NV',         contact: 'Sophie Bakker' },
  { site: 'Den Haag Ministerie',    guards: 22, incidents: 5,  aiRate: 89, sla: 96,  status: 'Good',      statusColor: '#f59e0b', client: 'Rijksoverheid NL',        contact: 'Peter Mulder' },
  { site: 'Utrecht Science Park',   guards: 18, incidents: 2,  aiRate: 95, sla: 100, status: 'Excellent', statusColor: '#00d4aa', client: 'Utrecht University',       contact: 'Anna Smit' },
  { site: 'Amsterdam HQ ING',       guards: 35, incidents: 6,  aiRate: 90, sla: 97,  status: 'Good',      statusColor: '#00d4aa', client: 'ING Group NV',            contact: 'Tom Visser' },
  { site: 'Groningen Gasunie',      guards: 20, incidents: 1,  aiRate: 98, sla: 100, status: 'Excellent', statusColor: '#00d4aa', client: 'Gasunie NV',              contact: 'Lena Hoorn' },
  { site: 'Tilburg Logistiek',      guards: 34, incidents: 0,  aiRate: 100,sla: 100, status: 'Excellent', statusColor: '#00d4aa', client: 'PostNL Distribution',     contact: 'Kees van Dam' },
];

const siteGuards: Record<string, { name: string; status: 'on-duty' | 'patrolling' | 'break' }[]> = {
  'Schiphol Airport':     [{ name: 'Erik Wolters', status: 'on-duty' }, { name: 'Fatima Yilmaz', status: 'patrolling' }, { name: 'Bas de Groot', status: 'on-duty' }, { name: 'Sandra Kuiper', status: 'break' }],
  'Rotterdam Port':       [{ name: 'Johan Prins', status: 'patrolling' }, { name: 'Mira Okafor', status: 'on-duty' }, { name: 'Pieter Vos', status: 'on-duty' }],
  'ASML Eindhoven':       [{ name: 'Dave Laan', status: 'on-duty' }, { name: 'Roos Vermeer', status: 'patrolling' }, { name: 'Ali Hassan', status: 'on-duty' }],
  'Den Haag Ministerie':  [{ name: 'Henk Brouwer', status: 'on-duty' }, { name: 'Ingrid Kok', status: 'break' }, { name: 'Noel Peters', status: 'patrolling' }],
  'Utrecht Science Park': [{ name: 'Laura Bos', status: 'on-duty' }, { name: 'Tim Snel', status: 'patrolling' }],
  'Amsterdam HQ ING':     [{ name: 'Kevin Hart', status: 'on-duty' }, { name: 'Yara Bosman', status: 'patrolling' }, { name: 'Daan Hout', status: 'on-duty' }],
  'Groningen Gasunie':    [{ name: 'Sven Kuijpers', status: 'on-duty' }, { name: 'Mirjam Otten', status: 'on-duty' }],
  'Tilburg Logistiek':    [{ name: 'Rob Dekker', status: 'patrolling' }, { name: 'Chantal Berg', status: 'on-duty' }, { name: 'Omar Fadel', status: 'on-duty' }],
};

const incidentsBySite = sitePerformance.map((s) => ({ site: s.site.split(' ')[0], incidents: s.incidents }));

const incidentsTrend = [
  { day: 'Ma 14', incidents: 52 }, { day: 'Di 15', incidents: 48 },
  { day: 'Wo 16', incidents: 45 }, { day: 'Do 17', incidents: 41 },
  { day: 'Vr 18', incidents: 43 }, { day: 'Za 19', incidents: 39 },
  { day: 'Zo 20', incidents: 38 },
];

const aiActionTypes = [
  { name: 'Incident reporting', value: 35, color: '#00d4aa' },
  { name: 'Schedule optimization', value: 25, color: '#3b82f6' },
  { name: 'Client status updates', value: 20, color: '#8b5cf6' },
  { name: 'Compliance checks', value: 12, color: '#f59e0b' },
  { name: 'Escalations', value: 8,  color: '#ef4444' },
];

const responseTimeTrend = Array.from({ length: 30 }, (_, i) => {
  const base = i < 12 ? 6.8 - (i * 0.1) : 5.2 - ((i - 12) * 0.1);
  return { day: i + 1, responseTime: Math.max(2.3, parseFloat(base.toFixed(1))) };
});

const allIncidents = [
  { time: '09:14', site: 'Schiphol Airport',     desc: 'Unauthorized access attempt - Gate B7',         severity: 'High',   status: 'resolved',    ai: true  },
  { time: '09:31', site: 'Rotterdam Port',        desc: 'Perimeter alarm triggered - Container zone 3',  severity: 'Medium', status: 'monitoring',  ai: true  },
  { time: '10:02', site: 'ASML Eindhoven',        desc: 'Visitor badge expired - Cleanroom access',       severity: 'Low',    status: 'resolved',    ai: true  },
  { time: '10:18', site: 'Den Haag Ministerie',   desc: 'Guard check-in missed - Floor 4',               severity: 'Medium', status: 'escalated',   ai: false },
  { time: '10:45', site: 'Amsterdam HQ ING',      desc: 'Suspicious package report - Reception',          severity: 'High',   status: 'resolved',    ai: false },
  { time: '11:00', site: 'Schiphol Airport',      desc: 'Fire alarm test - Terminal 2',                  severity: 'Low',    status: 'resolved',    ai: true  },
  { time: '11:23', site: 'Utrecht Science Park',  desc: 'Tailgating incident - Lab entrance',             severity: 'Medium', status: 'resolved',    ai: true  },
  { time: '11:50', site: 'Rotterdam Port',        desc: 'Unregistered vehicle spotted - Dock 7',          severity: 'Medium', status: 'monitoring',  ai: true  },
  { time: '12:05', site: 'Groningen Gasunie',     desc: 'Sensor offline - Sector C',                     severity: 'Low',    status: 'resolved',    ai: true  },
  { time: '12:30', site: 'Tilburg Logistiek',     desc: 'Visitor registration issue - Entrance',          severity: 'Low',    status: 'resolved',    ai: true  },
  { time: '13:00', site: 'ASML Eindhoven',        desc: 'Contractor exceeded access time',                severity: 'Low',    status: 'resolved',    ai: true  },
  { time: '13:22', site: 'Den Haag Ministerie',   desc: 'Protest group approaching - Front',              severity: 'High',   status: 'escalated',   ai: false },
];

const allGuards = [
  { name: 'Erik Wolters',   site: 'Schiphol Airport',     shift: 'Day',   status: 'on-duty',    checkin: '09:00' },
  { name: 'Fatima Yilmaz', site: 'Schiphol Airport',     shift: 'Day',   status: 'patrolling', checkin: '09:05' },
  { name: 'Bas de Groot',  site: 'Schiphol Airport',     shift: 'Day',   status: 'on-duty',    checkin: '09:00' },
  { name: 'Sandra Kuiper', site: 'Schiphol Airport',     shift: 'Night', status: 'break',      checkin: '21:00' },
  { name: 'Johan Prins',   site: 'Rotterdam Port',       shift: 'Day',   status: 'patrolling', checkin: '08:00' },
  { name: 'Mira Okafor',   site: 'Rotterdam Port',       shift: 'Day',   status: 'on-duty',    checkin: '08:00' },
  { name: 'Pieter Vos',    site: 'Rotterdam Port',       shift: 'Night', status: 'on-duty',    checkin: '20:00' },
  { name: 'Dave Laan',     site: 'ASML Eindhoven',       shift: 'Day',   status: 'on-duty',    checkin: '07:00' },
  { name: 'Roos Vermeer',  site: 'ASML Eindhoven',       shift: 'Day',   status: 'patrolling', checkin: '07:00' },
  { name: 'Ali Hassan',    site: 'ASML Eindhoven',       shift: 'Night', status: 'on-duty',    checkin: '19:00' },
  { name: 'Henk Brouwer',  site: 'Den Haag Ministerie',  shift: 'Day',   status: 'on-duty',    checkin: '08:00' },
  { name: 'Ingrid Kok',    site: 'Den Haag Ministerie',  shift: 'Day',   status: 'break',      checkin: '08:00' },
  { name: 'Laura Bos',     site: 'Utrecht Science Park', shift: 'Day',   status: 'on-duty',    checkin: '08:30' },
  { name: 'Tim Snel',      site: 'Utrecht Science Park', shift: 'Day',   status: 'patrolling', checkin: '08:30' },
  { name: 'Kevin Hart',    site: 'Amsterdam HQ ING',     shift: 'Day',   status: 'on-duty',    checkin: '07:30' },
  { name: 'Yara Bosman',   site: 'Amsterdam HQ ING',     shift: 'Day',   status: 'patrolling', checkin: '07:30' },
  { name: 'Daan Hout',     site: 'Amsterdam HQ ING',     shift: 'Night', status: 'on-duty',    checkin: '19:30' },
  { name: 'Sven Kuijpers', site: 'Groningen Gasunie',    shift: 'Day',   status: 'on-duty',    checkin: '06:00' },
  { name: 'Rob Dekker',    site: 'Tilburg Logistiek',    shift: 'Day',   status: 'patrolling', checkin: '06:00' },
  { name: 'Chantal Berg',  site: 'Tilburg Logistiek',    shift: 'Day',   status: 'on-duty',    checkin: '06:00' },
];

const reports = [
  { title: 'Daily Incident Report - Schiphol',       site: 'Schiphol Airport',     type: 'Incident',    date: '22 Apr 13:00', status: 'Sent'      },
  { title: 'Client Status Update - ING HQ',          site: 'Amsterdam HQ ING',     type: 'Status',      date: '22 Apr 12:00', status: 'Sent'      },
  { title: 'Compliance Check - ASML',                site: 'ASML Eindhoven',       type: 'Compliance',  date: '22 Apr 11:30', status: 'Sent'      },
  { title: 'Monthly Performance - Rotterdam Port',   site: 'Rotterdam Port',       type: 'Performance', date: '22 Apr 10:00', status: 'Sent'      },
  { title: 'Shift Handover Report - Gasunie',        site: 'Groningen Gasunie',    type: 'Handover',    date: '22 Apr 06:30', status: 'Sent'      },
  { title: 'Incident Escalation - Den Haag',         site: 'Den Haag Ministerie',  type: 'Escalation',  date: '22 Apr 13:22', status: 'Sent'      },
  { title: 'Weekly Guard Roster - Tilburg',          site: 'Tilburg Logistiek',    type: 'Roster',      date: '22 Apr 08:00', status: 'Sent'      },
  { title: 'Client Monthly Review - ING',            site: 'Amsterdam HQ ING',     type: 'Performance', date: '23 Apr 09:00', status: 'Scheduled' },
  { title: 'Compliance Audit - Schiphol Q2',         site: 'Schiphol Airport',     type: 'Compliance',  date: '23 Apr 10:00', status: 'Scheduled' },
  { title: 'Weekly Trend Analysis - All Sites',      site: 'All Sites',            type: 'Analytics',   date: '23 Apr 07:00', status: 'Draft'     },
];

const activityFeedItems = [
  { id: 1, text: 'Schiphol - Unauthorized access attempt - Guard dispatched in 1.8min - Incident filed automatically', warning: false },
  { id: 2, text: 'Rotterdam Port - Shift handover report generated automatically for 8 guards', warning: false },
  { id: 3, text: 'ASML Eindhoven - Compliance check completed - All 28 guards certified', warning: false },
  { id: 4, text: 'Den Haag - Client requested status update - Auto-report sent in 12sec', warning: false },
  { id: 5, text: 'Utrecht - Guard called in sick - AI found replacement, schedule updated', warning: false },
  { id: 6, text: 'Amsterdam ING - Perimeter alarm triggered - Verified false positive - Client notified', warning: false },
  { id: 7, text: 'Groningen Gasunie - Monthly performance report generated - Sent to client', warning: false },
  { id: 8, text: 'Tilburg - Visitor registration logged for 142 people', warning: false },
  { id: 9, text: 'Schiphol - Suspicious behavior reported - Incident escalated to supervisor', warning: true },
  { id: 10, text: 'Rotterdam - Guard patrol route optimized by AI - 23% more coverage', warning: false },
];

const TABS = ['Overview', 'Sites', 'Incidents', 'Guards', 'Reports'] as const;
type Tab = typeof TABS[number];

const CARD = { background: '#161d27', border: '1px solid #1e2836', borderRadius: 12 };

const severityColors: Record<string, string> = { High: '#ef4444', Medium: '#f59e0b', Low: '#3b82f6' };
const statusColors: Record<string, string> = { resolved: '#00d4aa', escalated: '#ef4444', monitoring: '#f59e0b' };
const guardStatusColors: Record<string, string> = { 'on-duty': '#00d4aa', patrolling: '#3b82f6', break: '#f59e0b', 'off-duty': '#64748b' };

// ─── Overview Tab ─────────────────────────────────────────────────────────────

function OverviewTab() {
  const [feedIndex, setFeedIndex] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setFeedIndex((i) => (i + 1) % activityFeedItems.length), 3000);
    return () => clearInterval(t);
  }, []);

  const visibleFeed = Array.from({ length: 5 }, (_, i) => activityFeedItems[(feedIndex + i) % activityFeedItems.length]);

  return (
    <div>
      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-4">
        {[
          { icon: <Users size={13} />, label: 'Guards deployed', value: '240 / 240', sub: '100% coverage', c: '#00d4aa' },
          { icon: <AlertTriangle size={13} />, label: 'AI incidents handled', value: '38 today', sub: '92% auto-resolved', c: '#3b82f6' },
          { icon: <Clock size={13} />, label: 'Avg response time', value: '2.3 min', sub: 'SLA: under 5 min', c: '#8b5cf6' },
          { icon: <Star size={13} />, label: 'Client satisfaction', value: '4.9 / 5', sub: '0 complaints this month', c: '#f59e0b' },
        ].map((k) => (
          <div key={k.label} style={CARD} className="p-4 flex flex-col gap-1">
            <div className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider" style={{ color: '#6b7280' }}>
              <span style={{ color: k.c }}>{k.icon}</span>{k.label}
            </div>
            <div className="text-xl font-bold text-white">{k.value}</div>
            <div className="text-xs" style={{ color: k.c }}>{k.sub}</div>
          </div>
        ))}
      </div>

      {/* Charts row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 mb-3">
        <div style={CARD} className="p-4">
          <div className="text-sm font-semibold text-white mb-3">Incident volume per site</div>
          <ResponsiveContainer width="100%" height={180}>
            <BarChart data={incidentsBySite} barCategoryGap="30%">
              <CartesianGrid strokeDasharray="3 3" stroke="#1e2836" vertical={false} />
              <XAxis dataKey="site" tick={{ fill: '#6b7280', fontSize: 10 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: '#6b7280', fontSize: 10 }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ background: '#161d27', border: '1px solid #1e2836', borderRadius: 8, color: '#e5e7eb' }} />
              <Bar dataKey="incidents" fill="#00d4aa" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div style={CARD} className="p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="text-sm font-semibold text-white">Incidents - last 7 days</div>
            <span className="text-xs px-2 py-0.5 rounded-full" style={{ background: '#00d4aa15', color: '#00d4aa' }}>-27% vs last week</span>
          </div>
          <ResponsiveContainer width="100%" height={180}>
            <AreaChart data={incidentsTrend}>
              <defs>
                <linearGradient id="incG" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#00d4aa" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#00d4aa" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e2836" vertical={false} />
              <XAxis dataKey="day" tick={{ fill: '#6b7280', fontSize: 10 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: '#6b7280', fontSize: 10 }} axisLine={false} tickLine={false} domain={[30, 60]} />
              <Tooltip contentStyle={{ background: '#161d27', border: '1px solid #1e2836', borderRadius: 8, color: '#e5e7eb' }} />
              <Area type="monotone" dataKey="incidents" stroke="#00d4aa" strokeWidth={2} fill="url(#incG)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Charts row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 mb-3">
        <div style={CARD} className="p-4">
          <div className="text-sm font-semibold text-white mb-3">AI action breakdown</div>
          <div className="flex items-center gap-4">
            <ResponsiveContainer width={140} height={140}>
              <PieChart>
                <Pie data={aiActionTypes} dataKey="value" innerRadius={40} outerRadius={60} paddingAngle={3} strokeWidth={0}>
                  {aiActionTypes.map((_, i) => <Cell key={i} fill={aiActionTypes[i].color} />)}
                </Pie>
                <Tooltip formatter={(v) => [`${v}%`, '']} contentStyle={{ background: '#161d27', border: '1px solid #1e2836', borderRadius: 8, color: '#e5e7eb' }} />
              </PieChart>
            </ResponsiveContainer>
            <div className="flex flex-col gap-1.5 flex-1">
              {aiActionTypes.map((d) => (
                <div key={d.name} className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full flex-shrink-0" style={{ background: d.color }} />
                  <span className="text-xs flex-1" style={{ color: '#9ca3af' }}>{d.name}</span>
                  <span className="text-xs font-semibold text-white">{d.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div style={CARD} className="p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="text-sm font-semibold text-white">Response time trend (30 days)</div>
            <span className="text-xs px-2 py-0.5 rounded-full" style={{ background: '#00d4aa15', color: '#00d4aa' }}>6.8 - 2.3 min</span>
          </div>
          <ResponsiveContainer width="100%" height={140}>
            <LineChart data={responseTimeTrend}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e2836" vertical={false} />
              <XAxis dataKey="day" tick={{ fill: '#6b7280', fontSize: 9 }} axisLine={false} tickLine={false} tickFormatter={(v) => v % 5 === 0 ? `D${v}` : ''} />
              <YAxis tick={{ fill: '#6b7280', fontSize: 10 }} axisLine={false} tickLine={false} domain={[1, 8]} tickFormatter={(v) => `${v}m`} />
              <Tooltip formatter={(v) => [`${v} min`, 'Response time']} contentStyle={{ background: '#161d27', border: '1px solid #1e2836', borderRadius: 8, color: '#e5e7eb' }} labelFormatter={(l) => `Day ${l}`} />
              <ReferenceLine x={12} stroke="#00d4aa" strokeDasharray="4 4" label={{ value: 'AI on', fill: '#00d4aa', fontSize: 9, position: 'insideTopRight' }} />
              <Line type="monotone" dataKey="responseTime" stroke="#00d4aa" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Live feed */}
      <div style={CARD} className="p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="text-sm font-semibold text-white">AI activity feed</div>
          <div className="flex items-center gap-1.5">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75" style={{ background: '#00d4aa' }} />
              <span className="relative inline-flex rounded-full h-2 w-2" style={{ background: '#00d4aa' }} />
            </span>
            <span className="text-xs" style={{ color: '#6b7280' }}>Live</span>
          </div>
        </div>
        <div className="space-y-1.5 overflow-hidden" style={{ height: 160 }}>
          <AnimatePresence mode="popLayout">
            {visibleFeed.map((item, idx) => (
              <motion.div
                key={`${item.id}-${feedIndex}-${idx}`}
                initial={{ opacity: 0, y: -12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 12 }}
                transition={{ duration: 0.35 }}
                className="flex items-start gap-3 px-3 py-2 rounded-lg"
                style={{ background: '#0f1923' }}
              >
                <span className="mt-0.5 text-sm" style={{ color: item.warning ? '#f59e0b' : '#00d4aa' }}>
                  {item.warning ? '!' : 'OK'}
                </span>
                <span className="text-xs leading-relaxed" style={{ color: '#9ca3af' }}>{item.text}</span>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

// ─── Sites Tab ────────────────────────────────────────────────────────────────

function SitesTab() {
  const [selected, setSelected] = useState<string | null>(null);
  const selSite = selected ? sitePerformance.find((s) => s.site === selected) : null;
  const selGuards = selected ? (siteGuards[selected.replace(' Airport', ' Airport').split(' ').slice(0, 2).join(' ')] || siteGuards[selected] || []) : [];

  return (
    <div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
        {sitePerformance.map((site) => (
          <button
            key={site.site}
            onClick={() => setSelected(selected === site.site ? null : site.site)}
            className="rounded-xl p-4 text-left transition-all"
            style={{
              background: selected === site.site ? '#00d4aa10' : '#161d27',
              border: `1px solid ${selected === site.site ? '#00d4aa50' : '#1e2836'}`,
            }}
          >
            <Shield size={16} style={{ color: site.statusColor, marginBottom: 8 }} />
            <div className="text-xs font-bold text-white mb-1 leading-tight">{site.site}</div>
            <div className="text-xs mb-2" style={{ color: '#6b7280' }}>{site.guards} guards</div>
            <span className="inline-flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-full" style={{ background: `${site.statusColor}18`, color: site.statusColor }}>
              <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: site.statusColor }} />
              {site.status}
            </span>
          </button>
        ))}
      </div>

      {selSite && (
        <div className="rounded-xl p-5 mb-3" style={{ background: '#161d27', border: '1px solid #00d4aa40' }}>
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="text-lg font-bold text-white">{selSite.site}</div>
              <div className="text-xs" style={{ color: '#6b7280' }}>Client: {selSite.client} - Contact: {selSite.contact}</div>
            </div>
            <button onClick={() => setSelected(null)} className="text-xs px-3 py-1.5 rounded-lg" style={{ background: '#1e2836', color: '#94a3b8' }}>Close</button>
          </div>
          <div className="grid grid-cols-4 gap-3 mb-4">
            {[
              { label: 'Guards', value: selSite.guards.toString(), c: '#00d4aa' },
              { label: 'Incidents', value: selSite.incidents.toString(), c: selSite.incidents > 5 ? '#ef4444' : '#3b82f6' },
              { label: 'AI Rate', value: `${selSite.aiRate}%`, c: '#8b5cf6' },
              { label: 'SLA', value: `${selSite.sla}%`, c: selSite.sla === 100 ? '#00d4aa' : '#f59e0b' },
            ].map((s) => (
              <div key={s.label} className="rounded-lg p-3 text-center" style={{ background: '#0f1923' }}>
                <div className="text-xs mb-1" style={{ color: '#64748b' }}>{s.label}</div>
                <div className="text-lg font-bold" style={{ color: s.c }}>{s.value}</div>
              </div>
            ))}
          </div>
          <div className="text-xs font-bold text-white mb-2">On-site Guards</div>
          <div className="grid grid-cols-2 gap-2">
            {(siteGuards[selSite.site] || selGuards).map((g, i) => (
              <div key={i} className="flex items-center gap-2 px-3 py-2 rounded-lg" style={{ background: '#0f1923' }}>
                <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: guardStatusColors[g.status] }} />
                <span className="text-xs font-semibold text-white">{g.name}</span>
                <span className="ml-auto text-xs capitalize" style={{ color: guardStatusColors[g.status] }}>{g.status}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Full table */}
      <div className="rounded-xl overflow-hidden" style={{ background: '#161d27', border: '1px solid #1e2836' }}>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr style={{ borderBottom: '1px solid #1e2836' }}>
                {['Site', 'Guards', 'Incidents', 'AI Rate', 'SLA', 'Status'].map((h) => (
                  <th key={h} className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider" style={{ color: '#6b7280' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {sitePerformance.map((row, i) => (
                <tr
                  key={row.site}
                  className="cursor-pointer transition-colors"
                  style={{ borderBottom: i < sitePerformance.length - 1 ? '1px solid #1e283650' : 'none', background: selected === row.site ? '#00d4aa06' : undefined }}
                  onClick={() => setSelected(selected === row.site ? null : row.site)}
                >
                  <td className="px-4 py-2.5 text-white font-medium text-xs">{row.site}</td>
                  <td className="px-4 py-2.5 text-xs" style={{ color: '#9ca3af' }}>{row.guards}</td>
                  <td className="px-4 py-2.5 text-xs" style={{ color: row.incidents === 0 ? '#6b7280' : '#e5e7eb' }}>{row.incidents}</td>
                  <td className="px-4 py-2.5">
                    <div className="flex items-center gap-2">
                      <div className="h-1.5 w-14 rounded-full" style={{ background: '#1e2836' }}>
                        <div className="h-1.5 rounded-full" style={{ width: `${row.aiRate}%`, background: '#00d4aa' }} />
                      </div>
                      <span className="text-xs" style={{ color: '#9ca3af' }}>{row.aiRate}%</span>
                    </div>
                  </td>
                  <td className="px-4 py-2.5 text-xs font-semibold" style={{ color: row.sla === 100 ? '#00d4aa' : '#f59e0b' }}>{row.sla}%</td>
                  <td className="px-4 py-2.5">
                    <span className="px-2 py-0.5 rounded-full text-xs font-semibold" style={{ background: `${row.statusColor}20`, color: row.statusColor }}>{row.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// ─── Incidents Tab ────────────────────────────────────────────────────────────

function IncidentsTab() {
  const [filter, setFilter] = useState<'All' | 'High' | 'Medium' | 'Low'>('All');
  const filtered = filter === 'All' ? allIncidents : allIncidents.filter((i) => i.severity === filter);

  return (
    <div>
      <div className="grid grid-cols-3 gap-3 mb-4">
        {[
          { label: 'Total Incidents', value: '38', c: '#3b82f6' },
          { label: 'AI Resolved', value: '92%', c: '#00d4aa' },
          { label: 'Escalated', value: '3', c: '#ef4444' },
        ].map((s) => (
          <div key={s.label} className="rounded-xl p-4 text-center" style={{ background: '#161d27', border: '1px solid #1e2836' }}>
            <div className="text-2xl font-extrabold" style={{ color: s.c }}>{s.value}</div>
            <div className="text-xs mt-1" style={{ color: '#6b7280' }}>{s.label}</div>
          </div>
        ))}
      </div>

      <div className="flex gap-2 mb-3">
        {(['All', 'High', 'Medium', 'Low'] as const).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className="px-3 py-1.5 rounded-lg text-xs font-semibold transition-all"
            style={{
              background: filter === f ? (f === 'All' ? '#3b82f6' : severityColors[f]) + '25' : '#161d27',
              border: `1px solid ${filter === f ? (f === 'All' ? '#3b82f6' : severityColors[f]) : '#1e2836'}`,
              color: filter === f ? (f === 'All' ? '#3b82f6' : severityColors[f]) : '#64748b',
            }}
          >
            {f}
          </button>
        ))}
      </div>

      <div className="rounded-xl overflow-hidden" style={{ background: '#161d27', border: '1px solid #1e2836' }}>
        <table className="w-full text-sm">
          <thead>
            <tr style={{ borderBottom: '1px solid #1e2836' }}>
              {['Time', 'Site', 'Description', 'Severity', 'Status', 'AI'].map((h) => (
                <th key={h} className="px-4 py-3 text-left text-xs font-semibold" style={{ color: '#6b7280' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((inc, i) => (
              <tr key={i} style={{ borderBottom: i < filtered.length - 1 ? '1px solid #1e2836' : undefined }}>
                <td className="px-4 py-2.5 text-xs whitespace-nowrap font-mono" style={{ color: '#64748b' }}>{inc.time}</td>
                <td className="px-4 py-2.5 text-xs font-semibold text-white whitespace-nowrap">{inc.site.split(' ').slice(0, 2).join(' ')}</td>
                <td className="px-4 py-2.5 text-xs max-w-xs" style={{ color: '#9ca3af' }}>{inc.desc}</td>
                <td className="px-4 py-2.5">
                  <span className="text-xs px-2 py-0.5 rounded-full font-semibold" style={{ background: `${severityColors[inc.severity]}20`, color: severityColors[inc.severity] }}>{inc.severity}</span>
                </td>
                <td className="px-4 py-2.5">
                  <span className="text-xs px-2 py-0.5 rounded-full font-semibold capitalize" style={{ background: `${statusColors[inc.status]}20`, color: statusColors[inc.status] }}>{inc.status}</span>
                </td>
                <td className="px-4 py-2.5">
                  <span className="text-xs font-semibold" style={{ color: inc.ai ? '#00d4aa' : '#64748b' }}>{inc.ai ? 'Yes' : 'Manual'}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ─── Guards Tab ───────────────────────────────────────────────────────────────

function GuardsTab() {
  const [siteFilter, setSiteFilter] = useState('All');
  const [shiftFilter, setShiftFilter] = useState('All');
  const filtered = allGuards.filter((g) => (siteFilter === 'All' || g.site === siteFilter) && (shiftFilter === 'All' || g.shift === shiftFilter));

  return (
    <div>
      <div className="grid grid-cols-3 gap-3 mb-4">
        {[
          { label: 'On Duty', value: allGuards.filter((g) => g.status !== 'off-duty').length.toString(), c: '#00d4aa' },
          { label: 'Coverage', value: '100%', c: '#3b82f6' },
          { label: 'Total Guards', value: allGuards.length.toString(), c: '#8b5cf6' },
        ].map((s) => (
          <div key={s.label} className="rounded-xl p-4 text-center" style={{ background: '#161d27', border: '1px solid #1e2836' }}>
            <div className="text-2xl font-extrabold" style={{ color: s.c }}>{s.value}</div>
            <div className="text-xs mt-1" style={{ color: '#6b7280' }}>{s.label}</div>
          </div>
        ))}
      </div>

      <div className="flex gap-3 mb-3">
        <select value={siteFilter} onChange={(e) => setSiteFilter(e.target.value)} className="text-xs rounded-lg px-2.5 py-1.5 focus:outline-none" style={{ background: '#161d27', border: '1px solid #1e2836', color: '#e2e8f0' }}>
          <option value="All">All Sites</option>
          {sitePerformance.map((s) => <option key={s.site}>{s.site}</option>)}
        </select>
        <select value={shiftFilter} onChange={(e) => setShiftFilter(e.target.value)} className="text-xs rounded-lg px-2.5 py-1.5 focus:outline-none" style={{ background: '#161d27', border: '1px solid #1e2836', color: '#e2e8f0' }}>
          <option value="All">All Shifts</option>
          <option>Day</option>
          <option>Night</option>
        </select>
      </div>

      <div className="rounded-xl overflow-hidden" style={{ background: '#161d27', border: '1px solid #1e2836' }}>
        <table className="w-full text-sm">
          <thead>
            <tr style={{ borderBottom: '1px solid #1e2836' }}>
              {['Name', 'Site', 'Shift', 'Status', 'Last Check-in'].map((h) => (
                <th key={h} className="px-4 py-3 text-left text-xs font-semibold" style={{ color: '#6b7280' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((g, i) => (
              <tr key={g.name} style={{ borderBottom: i < filtered.length - 1 ? '1px solid #1e2836' : undefined }}>
                <td className="px-4 py-2.5 text-xs font-semibold text-white">{g.name}</td>
                <td className="px-4 py-2.5 text-xs" style={{ color: '#9ca3af' }}>{g.site.split(' ').slice(0, 2).join(' ')}</td>
                <td className="px-4 py-2.5 text-xs" style={{ color: '#64748b' }}>{g.shift}</td>
                <td className="px-4 py-2.5">
                  <span className="flex items-center gap-1.5 text-xs font-semibold capitalize" style={{ color: guardStatusColors[g.status] }}>
                    <span className="w-1.5 h-1.5 rounded-full" style={{ background: guardStatusColors[g.status] }} />
                    {g.status}
                  </span>
                </td>
                <td className="px-4 py-2.5 text-xs font-mono" style={{ color: '#64748b' }}>{g.checkin}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ─── Reports Tab ──────────────────────────────────────────────────────────────

function ReportsTab() {
  const reportStatusColors: Record<string, string> = { Sent: '#00d4aa', Scheduled: '#3b82f6', Draft: '#f59e0b' };

  return (
    <div>
      <div className="grid grid-cols-3 gap-3 mb-4">
        {[
          { label: 'Auto-generated today', value: '7', c: '#00d4aa' },
          { label: 'Scheduled', value: '2', c: '#3b82f6' },
          { label: 'Drafts', value: '1', c: '#f59e0b' },
        ].map((s) => (
          <div key={s.label} className="rounded-xl p-4 text-center" style={{ background: '#161d27', border: '1px solid #1e2836' }}>
            <div className="text-2xl font-extrabold" style={{ color: s.c }}>{s.value}</div>
            <div className="text-xs mt-1" style={{ color: '#6b7280' }}>{s.label}</div>
          </div>
        ))}
      </div>

      <div className="rounded-xl overflow-hidden" style={{ background: '#161d27', border: '1px solid #1e2836' }}>
        <table className="w-full text-sm">
          <thead>
            <tr style={{ borderBottom: '1px solid #1e2836' }}>
              {['Report', 'Site', 'Type', 'Date', 'Status', ''].map((h) => (
                <th key={h} className="px-4 py-3 text-left text-xs font-semibold" style={{ color: '#6b7280' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {reports.map((r, i) => (
              <tr key={i} style={{ borderBottom: i < reports.length - 1 ? '1px solid #1e2836' : undefined }}>
                <td className="px-4 py-2.5 text-xs font-semibold text-white">{r.title}</td>
                <td className="px-4 py-2.5 text-xs" style={{ color: '#9ca3af' }}>{r.site.split(' ').slice(0, 2).join(' ')}</td>
                <td className="px-4 py-2.5">
                  <span className="text-xs px-2 py-0.5 rounded-full" style={{ background: '#1e2836', color: '#64748b' }}>{r.type}</span>
                </td>
                <td className="px-4 py-2.5 text-xs" style={{ color: '#64748b' }}>{r.date}</td>
                <td className="px-4 py-2.5">
                  <span className="text-xs px-2 py-0.5 rounded-full font-semibold" style={{ background: `${reportStatusColors[r.status]}20`, color: reportStatusColors[r.status] }}>{r.status}</span>
                </td>
                <td className="px-4 py-2.5">
                  <button className="text-xs px-2.5 py-1 rounded-lg transition-colors" style={{ background: '#1e2836', color: '#64748b' }} onClick={() => {}}>
                    Download
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export function FacilityDashboard() {
  const [tab, setTab] = useState<Tab>('Overview');
  const [selectedSite, setSelectedSite] = useState('All sites');
  const [selectedShift, setSelectedShift] = useState('All');

  return (
    <div style={{ background: '#0f1923', borderRadius: 16, color: 'white', border: '1px solid #1e2836' }}>
      {/* Header */}
      <div className="px-5 py-4 flex flex-wrap items-center justify-between gap-3" style={{ borderBottom: '1px solid #1e2836', background: 'linear-gradient(135deg, #0f1923 0%, #161d27 100%)', borderRadius: '16px 16px 0 0' }}>
        <div className="flex items-center gap-3">
          <div style={{ background: 'linear-gradient(135deg, #00d4aa22, #3b82f622)', border: '1px solid #00d4aa44', borderRadius: 10, padding: 7 }}>
            <Shield size={18} color="#00d4aa" />
          </div>
          <div>
            <div className="font-bold text-lg text-white leading-tight">SecureNL</div>
            <div className="text-xs" style={{ color: '#6b7280' }}>Security Operations Dashboard</div>
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <select value={selectedSite} onChange={(e) => setSelectedSite(e.target.value)} className="text-xs rounded-lg px-2.5 py-1.5 focus:outline-none" style={{ background: '#161d27', border: '1px solid #1e2836', color: 'white' }}>
            <option>All sites</option>
            {sitePerformance.map((s) => <option key={s.site}>{s.site}</option>)}
          </select>
          <select value={selectedShift} onChange={(e) => setSelectedShift(e.target.value)} className="text-xs rounded-lg px-2.5 py-1.5 focus:outline-none" style={{ background: '#161d27', border: '1px solid #1e2836', color: 'white' }}>
            <option value="All">All shifts</option>
            <option>Day</option>
            <option>Night</option>
          </select>
          <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg" style={{ background: '#00d4aa15', border: '1px solid #00d4aa33' }}>
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75" style={{ background: '#00d4aa' }} />
              <span className="relative inline-flex rounded-full h-2 w-2" style={{ background: '#00d4aa' }} />
            </span>
            <span className="text-xs font-semibold" style={{ color: '#00d4aa' }}>AI Active</span>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 px-5 pt-3" style={{ borderBottom: '1px solid #1e2836' }}>
        {TABS.map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className="px-4 py-2 text-xs font-semibold rounded-t-lg transition-all"
            style={{
              background: tab === t ? '#161d27' : 'transparent',
              color: tab === t ? '#00d4aa' : '#64748b',
              borderBottom: tab === t ? '2px solid #00d4aa' : '2px solid transparent',
            }}
          >
            {t}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="p-5">
        {tab === 'Overview'   && <OverviewTab />}
        {tab === 'Sites'      && <SitesTab />}
        {tab === 'Incidents'  && <IncidentsTab />}
        {tab === 'Guards'     && <GuardsTab />}
        {tab === 'Reports'    && <ReportsTab />}
      </div>
    </div>
  );
}
