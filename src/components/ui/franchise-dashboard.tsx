"use client";

import { useState, useEffect, useRef } from "react";
import {
  BarChart, Bar, AreaChart, Area, PieChart, Pie, Cell,
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer,
} from "recharts";

// ─── Types ────────────────────────────────────────────────────────────────────

interface LocationData {
  name: string;
  short: string;
  revenue: number;
  orders: number;
  aiRate: number;
  satisfaction: number;
  status: "excellent" | "good" | "attention";
}

interface ActivityItem {
  id: number;
  location: string;
  action: string;
  time: string;
  type: "resolve" | "upsell" | "update" | "complaint";
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const locations: LocationData[] = [
  { name: "Amsterdam Centrum", short: "AMS-C", revenue: 2847, orders: 412, aiRate: 96.8, satisfaction: 4.9, status: "excellent" },
  { name: "Amsterdam Zuid",    short: "AMS-Z", revenue: 2103, orders: 318, aiRate: 95.1, satisfaction: 4.8, status: "excellent" },
  { name: "Rotterdam",         short: "ROT",   revenue: 1934, orders: 287, aiRate: 94.7, satisfaction: 4.8, status: "excellent" },
  { name: "Utrecht",           short: "UTR",   revenue: 1421, orders: 214, aiRate: 93.2, satisfaction: 4.7, status: "good" },
  { name: "Den Haag",          short: "DH",    revenue: 1287, orders: 198, aiRate: 91.4, satisfaction: 4.4, status: "good" },
  { name: "Eindhoven",         short: "EHV",   revenue: 1102, orders: 171, aiRate: 93.8, satisfaction: 4.6, status: "good" },
  { name: "Groningen",         short: "GRN",   revenue: 891,  orders: 134, aiRate: 92.6, satisfaction: 4.5, status: "good" },
  { name: "Haarlem",           short: "HLM",   revenue: 743,  orders: 112, aiRate: 90.1, satisfaction: 4.3, status: "good" },
  { name: "Tilburg",           short: "TLB",   revenue: 318,  orders: 51,  aiRate: 78.3, satisfaction: 3.7, status: "attention" },
  { name: "Breda",             short: "BRD",   revenue: 201,  orders: 44,  aiRate: 81.2, satisfaction: 4.0, status: "good" },
];

const ordersAreaData = [
  { time: "10:00", orders: 24 }, { time: "11:00", orders: 48 }, { time: "12:00", orders: 187 },
  { time: "13:00", orders: 214 }, { time: "14:00", orders: 98 }, { time: "15:00", orders: 67 },
  { time: "16:00", orders: 82 }, { time: "17:00", orders: 134 }, { time: "18:00", orders: 221 },
  { time: "19:00", orders: 267 }, { time: "20:00", orders: 198 }, { time: "21:00", orders: 143 },
  { time: "22:00", orders: 58 },
];

const aiActionsData = [
  { name: "Customer replies", value: 45, color: "#00d4aa" },
  { name: "Order updates",    value: 28, color: "#3b82f6" },
  { name: "Complaints",       value: 15, color: "#8b5cf6" },
  { name: "Upsells",          value: 8,  color: "#f59e0b" },
  { name: "Other",            value: 4,  color: "#64748b" },
];

const satisfactionTrendData = Array.from({ length: 30 }, (_, i) => ({
  day: `D-${30 - i}`,
  score: parseFloat((3.9 + (i / 29) * 0.9 + (Math.random() * 0.08 - 0.04)).toFixed(2)),
}));

const weeklyRevenueData = Array.from({ length: 12 }, (_, i) => ({
  week: `W${i + 1}`,
  revenue: Math.round(8000 + i * 400 + Math.random() * 500),
}));

const allActivityItems: ActivityItem[] = [
  { id: 1,  location: "Amsterdam Centrum", action: "Replied to complaint about wait time - Offered 10% discount - Resolved",    time: "Just now",   type: "resolve"   },
  { id: 2,  location: "Rotterdam",         action: "Upsell suggestion sent - Customer added fries (+EUR 3.50)",                 time: "12s ago",    type: "upsell"    },
  { id: 3,  location: "Utrecht",           action: "Order status update sent to 12 customers",                                  time: "28s ago",    type: "update"    },
  { id: 4,  location: "Amsterdam Zuid",    action: "Complaint about cold food - Escalated to manager - Voucher issued",          time: "45s ago",    type: "complaint" },
  { id: 5,  location: "Eindhoven",         action: "Loyalty reward triggered - 3 customers notified",                           time: "1m ago",     type: "update"    },
  { id: 6,  location: "Groningen",         action: "Upsell: dessert combo suggested - 4/7 accepted (+EUR 14.80)",               time: "1m 18s ago", type: "upsell"    },
  { id: 7,  location: "Den Haag",          action: "Review response posted to Google - 5-star review thanked",                  time: "1m 40s ago", type: "resolve"   },
  { id: 8,  location: "Haarlem",           action: "Long wait complaint - Auto-apology sent - Free drink coupon issued",         time: "2m ago",     type: "complaint" },
  { id: 9,  location: "Amsterdam Centrum", action: "Bundle upsell sent via order confirmation - Accepted (+EUR 6.90)",           time: "2m 20s ago", type: "upsell"    },
  { id: 10, location: "Rotterdam",         action: "Order delay notification sent to 8 customers - ETA updated",                 time: "2m 55s ago", type: "update"    },
  { id: 11, location: "Utrecht",           action: "Review replied on Thuisbezorgd - Resolved complaint - 1 star to 4 stars",   time: "3m ago",     type: "resolve"   },
  { id: 12, location: "Breda",             action: "Inventory alert: burger buns low - Auto-reorder triggered",                  time: "3m 30s ago", type: "update"    },
  { id: 13, location: "Tilburg",           action: "Complaint: wrong order - Replacement dispatched + EUR 5 voucher",            time: "4m ago",     type: "complaint" },
  { id: 14, location: "Groningen",         action: "Upsell: drink upgrade on 18 orders - 11 accepted (+EUR 22)",                time: "4m 30s ago", type: "upsell"    },
  { id: 15, location: "Den Haag",          action: "AI replied to 3 Instagram DMs - All resolved without escalation",           time: "5m ago",     type: "resolve"   },
];

const aiActionTemplates = [
  (id: number): ActivityItem => ({ id, location: "Amsterdam Centrum", action: "New review received - AI drafted 5-star response - Published",      time: "Just now", type: "resolve"   }),
  (id: number): ActivityItem => ({ id, location: "Rotterdam",         action: "Upsell combo triggered on checkout - Customer accepted (+EUR 5.20)", time: "Just now", type: "upsell"    }),
  (id: number): ActivityItem => ({ id, location: "Utrecht",           action: "15 customers updated on order delay - All acknowledged",             time: "Just now", type: "update"    }),
  (id: number): ActivityItem => ({ id, location: "Eindhoven",         action: "Complaint resolved - Refund processed EUR 12.50 - Customer happy",   time: "Just now", type: "complaint" }),
  (id: number): ActivityItem => ({ id, location: "Groningen",         action: "Loyalty milestone hit - 50 customers sent birthday voucher",         time: "Just now", type: "update"    }),
  (id: number): ActivityItem => ({ id, location: "Haarlem",           action: "Upsell: drink upgrade on 22 orders - 14 accepted (+EUR 28)",         time: "Just now", type: "upsell"    }),
];

const typeColors: Record<ActivityItem["type"], string> = {
  resolve: "#00d4aa", upsell: "#f59e0b", update: "#3b82f6", complaint: "#8b5cf6",
};
const typeLabels: Record<ActivityItem["type"], string> = {
  resolve: "Resolved", upsell: "Upsell", update: "Update", complaint: "Complaint",
};

const locationIssues: Record<string, string[]> = {
  "Amsterdam Centrum": ["Peak hour queue complaints (3)", "Upsell acceptance low at lunch", "Parking complaints from delivery"],
  "Amsterdam Zuid":    ["1 unresolved Google review", "Weekend staffing gap flagged"],
  "Rotterdam":         ["Delivery delay spike Thursday", "Inventory: mayo near reorder point"],
  "Utrecht":           ["New manager onboarding in progress", "Loyalty redemptions up 40%"],
  "Den Haag":          ["Instagram DM backlog cleared", "Weekend revenue below target"],
  "Eindhoven":         ["Strong upsell performance", "Zero complaints this week"],
  "Groningen":         ["Supplier delay flagged", "Positive feedback on new menu"],
  "Haarlem":           ["2 complaints about wait time", "AI response time improving"],
  "Tilburg":           ["AI rate below target - training needed", "3 unresolved complaints", "Revenue 45% below network avg"],
  "Breda":             ["Onboarding phase - 60 days live", "AI rate growing week-over-week"],
};

const TABS = ["Overview", "Locations", "AI Actions", "Analytics", "Staff"] as const;
type Tab = typeof TABS[number];

// ─── Helpers ──────────────────────────────────────────────────────────────────

function StatusBadge({ status }: { status: LocationData["status"] }) {
  const map = {
    excellent: { bg: "#00d4aa18", text: "#00d4aa", dot: "#00d4aa", label: "Excellent" },
    good:      { bg: "#3b82f618", text: "#3b82f6", dot: "#3b82f6", label: "Good"      },
    attention: { bg: "#ef444418", text: "#ef4444", dot: "#ef4444", label: "Attention" },
  }[status];
  return (
    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold" style={{ background: map.bg, color: map.text }}>
      <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: map.dot }} />
      {map.label}
    </span>
  );
}

// ─── Tab: Overview ────────────────────────────────────────────────────────────

function OverviewTab({ dateRange, selectedLocation }: { dateRange: string; selectedLocation: string }) {
  const [activityFeed, setActivityFeed] = useState<ActivityItem[]>(allActivityItems.slice(0, 8));
  const nextIdRef = useRef(20);
  const tplRef = useRef(0);

  useEffect(() => {
    const interval = setInterval(() => {
      const newItem = aiActionTemplates[tplRef.current % aiActionTemplates.length](nextIdRef.current++);
      tplRef.current++;
      setActivityFeed((prev) => [newItem, ...prev.slice(0, 7)]);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const rm = dateRange === "Today" ? 1 : dateRange === "This Week" ? 6.8 : 29.4;
  const filteredBar = locations.map((l) => ({ name: l.short, revenue: l.revenue }));
  const selLoc = selectedLocation !== "All Locations" ? locations.find((l) => l.name === selectedLocation) : null;

  return (
    <div>
      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-4">
        {[
          { label: "Total Revenue", value: `EUR ${Math.round(12847 * rm).toLocaleString("nl-NL")}`, sub: "+18% vs yesterday", c: "#00d4aa", icon: "EUR" },
          { label: "AI-Handled Orders", value: Math.round(2341 * rm).toLocaleString("nl-NL"), sub: "94.2% automation rate", c: "#3b82f6", icon: "AI" },
          { label: "Avg Response Time", value: "1.2 min", sub: "Was 8 min manual", c: "#8b5cf6", icon: "RT" },
          { label: "Customer Satisfaction", value: `${selLoc ? selLoc.satisfaction : "4.8"}/5`, sub: "Up from 3.9 pre-AI", c: "#f59e0b", icon: "CS" },
        ].map((k) => (
          <div key={k.label} className="rounded-xl p-4 flex flex-col gap-1" style={{ background: "#161d27", border: "1px solid #1e2836" }}>
            <div className="text-xs font-semibold px-2 py-0.5 rounded self-start" style={{ background: `${k.c}18`, color: k.c }}>{k.icon}</div>
            <div className="text-xs mt-1" style={{ color: "#64748b" }}>{k.label}</div>
            <div className="text-xl font-extrabold text-white">{k.value}</div>
            <div className="text-xs font-semibold" style={{ color: k.c }}>{k.sub}</div>
          </div>
        ))}
      </div>

      {/* Charts row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 mb-3">
        <div className="rounded-xl p-4" style={{ background: "#161d27", border: "1px solid #1e2836" }}>
          <div className="text-sm font-bold text-white mb-3">Revenue per Location</div>
          <ResponsiveContainer width="100%" height={180}>
            <BarChart data={filteredBar} margin={{ top: 4, right: 4, bottom: 0, left: -20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e2836" />
              <XAxis dataKey="name" tick={{ fill: "#64748b", fontSize: 10 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: "#64748b", fontSize: 10 }} axisLine={false} tickLine={false} tickFormatter={(v) => `${v}`} />
              <Tooltip contentStyle={{ background: "#0f1923", border: "1px solid #1e2836", borderRadius: 8, color: "#e2e8f0" }} formatter={(v) => [`EUR ${Number(v).toLocaleString("nl-NL")}`, "Revenue"]} />
              <Bar dataKey="revenue" radius={[4, 4, 0, 0]}>
                {filteredBar.map((_, i) => <Cell key={i} fill={`hsl(${180 + i * 18}, 80%, 55%)`} />)}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="rounded-xl p-4" style={{ background: "#161d27", border: "1px solid #1e2836" }}>
          <div className="text-sm font-bold text-white mb-3">Orders Over Time Today</div>
          <ResponsiveContainer width="100%" height={180}>
            <AreaChart data={ordersAreaData} margin={{ top: 4, right: 4, bottom: 0, left: -20 }}>
              <defs>
                <linearGradient id="ordG" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e2836" />
              <XAxis dataKey="time" tick={{ fill: "#64748b", fontSize: 10 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: "#64748b", fontSize: 10 }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ background: "#0f1923", border: "1px solid #1e2836", borderRadius: 8, color: "#e2e8f0" }} />
              <Area type="monotone" dataKey="orders" stroke="#3b82f6" strokeWidth={2} fill="url(#ordG)" dot={false} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Charts row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 mb-3">
        <div className="rounded-xl p-4" style={{ background: "#161d27", border: "1px solid #1e2836" }}>
          <div className="text-sm font-bold text-white mb-3">AI Actions Breakdown</div>
          <div className="flex items-center gap-4">
            <ResponsiveContainer width={140} height={140}>
              <PieChart>
                <Pie data={aiActionsData} cx="50%" cy="50%" innerRadius={40} outerRadius={60} paddingAngle={3} dataKey="value">
                  {aiActionsData.map((e, i) => <Cell key={i} fill={e.color} />)}
                </Pie>
                <Tooltip contentStyle={{ background: "#0f1923", border: "1px solid #1e2836", borderRadius: 8, color: "#e2e8f0" }} formatter={(v) => [`${v}%`, ""]} />
              </PieChart>
            </ResponsiveContainer>
            <div className="flex flex-col gap-1.5">
              {aiActionsData.map((d) => (
                <div key={d.name} className="flex items-center gap-2 text-xs">
                  <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: d.color }} />
                  <span style={{ color: "#94a3b8" }}>{d.name}</span>
                  <span className="font-bold text-white ml-auto pl-2">{d.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="rounded-xl p-4" style={{ background: "#161d27", border: "1px solid #1e2836" }}>
          <div className="text-sm font-bold text-white mb-3">Satisfaction - Last 30 Days</div>
          <ResponsiveContainer width="100%" height={140}>
            <LineChart data={satisfactionTrendData} margin={{ top: 4, right: 4, bottom: 0, left: -20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e2836" />
              <XAxis dataKey="day" tick={{ fill: "#64748b", fontSize: 9 }} axisLine={false} tickLine={false} interval={4} />
              <YAxis domain={[3.5, 5]} tick={{ fill: "#64748b", fontSize: 10 }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ background: "#0f1923", border: "1px solid #1e2836", borderRadius: 8, color: "#e2e8f0" }} />
              <Line type="monotone" dataKey="score" stroke="#00d4aa" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Live Activity Feed */}
      <div className="rounded-xl overflow-hidden" style={{ background: "#161d27", border: "1px solid #1e2836" }}>
        <div className="px-4 py-3 flex items-center justify-between" style={{ borderBottom: "1px solid #1e2836" }}>
          <div className="text-sm font-bold text-white">Live AI Activity Feed</div>
          <div className="flex items-center gap-2 text-xs font-semibold" style={{ color: "#00d4aa" }}>
            <span className="w-2 h-2 rounded-full bg-teal-400 animate-pulse" />
            Live
          </div>
        </div>
        <div className="divide-y" style={{ borderColor: "#1e2836" }}>
          {activityFeed.map((item, i) => (
            <div key={item.id} className="px-4 py-2.5 flex items-start gap-3" style={{ opacity: Math.max(0.35, 1 - i * 0.1) }}>
              <div className="w-2 h-2 rounded-full mt-1.5 flex-shrink-0" style={{ background: typeColors[item.type] }} />
              <div className="flex-1 min-w-0">
                <div className="text-xs font-semibold text-white">{item.location}</div>
                <div className="text-xs mt-0.5 truncate" style={{ color: "#94a3b8" }}>{item.action}</div>
              </div>
              <div className="flex flex-col items-end gap-1 flex-shrink-0">
                <span className="text-xs px-2 py-0.5 rounded-full font-semibold" style={{ background: `${typeColors[item.type]}20`, color: typeColors[item.type] }}>
                  {typeLabels[item.type]}
                </span>
                <span className="text-xs" style={{ color: "#64748b" }}>{item.time}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Tab: Locations ───────────────────────────────────────────────────────────

function LocationsTab() {
  const [selected, setSelected] = useState<string | null>(null);
  const selData = selected ? locations.find((l) => l.name === selected) : null;

  return (
    <div>
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-4">
        {locations.map((loc) => (
          <button
            key={loc.name}
            onClick={() => setSelected(selected === loc.name ? null : loc.name)}
            className="rounded-xl p-4 text-left transition-all"
            style={{
              background: selected === loc.name ? "#00d4aa10" : "#161d27",
              border: `1px solid ${selected === loc.name ? "#00d4aa50" : "#1e2836"}`,
            }}
          >
            <div className="text-xs font-bold text-white mb-1">{loc.short}</div>
            <div className="text-xs mb-2" style={{ color: "#64748b" }}>{loc.name}</div>
            <StatusBadge status={loc.status} />
            <div className="mt-2 text-xs" style={{ color: "#00d4aa" }}>EUR {loc.revenue.toLocaleString("nl-NL")}</div>
          </button>
        ))}
      </div>

      {selData && (
        <div className="rounded-xl p-5" style={{ background: "#161d27", border: "1px solid #00d4aa40" }}>
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="text-lg font-bold text-white">{selData.name}</div>
              <StatusBadge status={selData.status} />
            </div>
            <button onClick={() => setSelected(null)} className="text-xs px-3 py-1.5 rounded-lg" style={{ background: "#1e2836", color: "#94a3b8" }}>Close</button>
          </div>

          <div className="grid grid-cols-4 gap-3 mb-4">
            {[
              { label: "Revenue", value: `EUR ${selData.revenue.toLocaleString("nl-NL")}`, c: "#00d4aa" },
              { label: "Orders", value: selData.orders.toString(), c: "#3b82f6" },
              { label: "AI Rate", value: `${selData.aiRate}%`, c: "#8b5cf6" },
              { label: "Satisfaction", value: `${selData.satisfaction}/5`, c: "#f59e0b" },
            ].map((s) => (
              <div key={s.label} className="rounded-lg p-3 text-center" style={{ background: "#0f1923" }}>
                <div className="text-xs mb-1" style={{ color: "#64748b" }}>{s.label}</div>
                <div className="text-lg font-bold" style={{ color: s.c }}>{s.value}</div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="text-xs font-bold text-white mb-2">Top Issues This Week</div>
              <div className="space-y-1.5">
                {(locationIssues[selData.name] || []).map((issue, i) => (
                  <div key={i} className="flex items-start gap-2 text-xs" style={{ color: "#94a3b8" }}>
                    <span className="mt-0.5 text-yellow-500">!</span>
                    {issue}
                  </div>
                ))}
              </div>
            </div>
            <div>
              <div className="text-xs font-bold text-white mb-2">Recent AI Actions</div>
              <div className="space-y-1.5">
                {allActivityItems.filter((a) => a.location === selData.name).slice(0, 3).map((a) => (
                  <div key={a.id} className="flex items-start gap-2 text-xs" style={{ color: "#94a3b8" }}>
                    <span className="w-1.5 h-1.5 rounded-full mt-1 flex-shrink-0" style={{ background: typeColors[a.type] }} />
                    <span className="truncate">{a.action.split(" - ")[0]}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Full table */}
      <div className="rounded-xl overflow-hidden mt-3" style={{ background: "#161d27", border: "1px solid #1e2836" }}>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr style={{ borderBottom: "1px solid #1e2836" }}>
                {["Location", "Revenue", "Orders", "AI Rate", "Satisfaction", "Status"].map((h) => (
                  <th key={h} className="px-4 py-3 text-left text-xs font-semibold" style={{ color: "#64748b" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {locations.map((loc, i) => (
                <tr
                  key={loc.name}
                  className="cursor-pointer transition-colors"
                  style={{ borderBottom: i < locations.length - 1 ? "1px solid #1e2836" : undefined, background: selected === loc.name ? "#00d4aa08" : undefined }}
                  onClick={() => setSelected(selected === loc.name ? null : loc.name)}
                >
                  <td className="px-4 py-2.5 font-semibold text-white">{loc.name}</td>
                  <td className="px-4 py-2.5" style={{ color: "#00d4aa" }}>EUR {loc.revenue.toLocaleString("nl-NL")}</td>
                  <td className="px-4 py-2.5" style={{ color: "#e2e8f0" }}>{loc.orders}</td>
                  <td className="px-4 py-2.5">
                    <div className="flex items-center gap-2">
                      <div className="flex-1 h-1.5 rounded-full" style={{ background: "#1e2836", maxWidth: 50 }}>
                        <div className="h-full rounded-full" style={{ width: `${loc.aiRate}%`, background: loc.aiRate > 92 ? "#00d4aa" : loc.aiRate > 85 ? "#3b82f6" : "#f59e0b" }} />
                      </div>
                      <span style={{ color: "#94a3b8" }}>{loc.aiRate}%</span>
                    </div>
                  </td>
                  <td className="px-4 py-2.5 font-bold" style={{ color: loc.satisfaction >= 4.7 ? "#00d4aa" : loc.satisfaction >= 4.3 ? "#3b82f6" : "#ef4444" }}>{loc.satisfaction} stars</td>
                  <td className="px-4 py-2.5"><StatusBadge status={loc.status} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// ─── Tab: AI Actions ──────────────────────────────────────────────────────────

function AIActionsTab() {
  const [filter, setFilter] = useState<"All" | ActivityItem["type"]>("All");
  const filters = ["All", "resolve", "upsell", "update", "complaint"] as const;
  const filtered = filter === "All" ? allActivityItems : allActivityItems.filter((a) => a.type === filter);

  return (
    <div>
      <div className="grid grid-cols-3 gap-3 mb-4">
        {[
          { label: "Actions Today", value: "847", c: "#00d4aa" },
          { label: "Resolve Rate", value: "94.2%", c: "#3b82f6" },
          { label: "Avg Response", value: "1.2 min", c: "#8b5cf6" },
        ].map((s) => (
          <div key={s.label} className="rounded-xl p-4 text-center" style={{ background: "#161d27", border: "1px solid #1e2836" }}>
            <div className="text-2xl font-extrabold" style={{ color: s.c }}>{s.value}</div>
            <div className="text-xs mt-1" style={{ color: "#64748b" }}>{s.label}</div>
          </div>
        ))}
      </div>

      <div className="flex gap-2 mb-3">
        {filters.map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f as typeof filter)}
            className="px-3 py-1.5 rounded-lg text-xs font-semibold transition-all"
            style={{
              background: filter === f ? (f === "All" ? "#3b82f6" : typeColors[f as ActivityItem["type"]]) + "25" : "#161d27",
              border: `1px solid ${filter === f ? (f === "All" ? "#3b82f6" : typeColors[f as ActivityItem["type"]]) : "#1e2836"}`,
              color: filter === f ? (f === "All" ? "#3b82f6" : typeColors[f as ActivityItem["type"]]) : "#64748b",
            }}
          >
            {f === "All" ? "All" : typeLabels[f as ActivityItem["type"]]}
          </button>
        ))}
      </div>

      <div className="rounded-xl overflow-hidden" style={{ background: "#161d27", border: "1px solid #1e2836" }}>
        <table className="w-full text-sm">
          <thead>
            <tr style={{ borderBottom: "1px solid #1e2836" }}>
              {["Location", "Action", "Type", "Time"].map((h) => (
                <th key={h} className="px-4 py-3 text-left text-xs font-semibold" style={{ color: "#64748b" }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((item, i) => (
              <tr key={item.id} style={{ borderBottom: i < filtered.length - 1 ? "1px solid #1e2836" : undefined }}>
                <td className="px-4 py-2.5 text-xs font-semibold text-white whitespace-nowrap">{item.location}</td>
                <td className="px-4 py-2.5 text-xs max-w-xs truncate" style={{ color: "#94a3b8" }}>{item.action}</td>
                <td className="px-4 py-2.5">
                  <span className="text-xs px-2 py-0.5 rounded-full font-semibold" style={{ background: `${typeColors[item.type]}20`, color: typeColors[item.type] }}>
                    {typeLabels[item.type]}
                  </span>
                </td>
                <td className="px-4 py-2.5 text-xs whitespace-nowrap" style={{ color: "#64748b" }}>{item.time}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ─── Tab: Analytics ───────────────────────────────────────────────────────────

function AnalyticsTab() {
  return (
    <div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 mb-3">
        <div className="rounded-xl p-4" style={{ background: "#161d27", border: "1px solid #1e2836" }}>
          <div className="text-sm font-bold text-white mb-3">Customer Satisfaction Trend (30 days)</div>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={satisfactionTrendData} margin={{ top: 4, right: 4, bottom: 0, left: -20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e2836" />
              <XAxis dataKey="day" tick={{ fill: "#64748b", fontSize: 9 }} axisLine={false} tickLine={false} interval={4} />
              <YAxis domain={[3.5, 5]} tick={{ fill: "#64748b", fontSize: 10 }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ background: "#0f1923", border: "1px solid #1e2836", borderRadius: 8, color: "#e2e8f0" }} />
              <Line type="monotone" dataKey="score" stroke="#00d4aa" strokeWidth={2.5} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="rounded-xl p-4" style={{ background: "#161d27", border: "1px solid #1e2836" }}>
          <div className="text-sm font-bold text-white mb-3">Weekly Revenue (12 weeks)</div>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={weeklyRevenueData} margin={{ top: 4, right: 4, bottom: 0, left: -20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e2836" />
              <XAxis dataKey="week" tick={{ fill: "#64748b", fontSize: 10 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: "#64748b", fontSize: 10 }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ background: "#0f1923", border: "1px solid #1e2836", borderRadius: 8, color: "#e2e8f0" }} formatter={(v) => [`EUR ${Number(v).toLocaleString("nl-NL")}`, "Revenue"]} />
              <Bar dataKey="revenue" fill="#3b82f6" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="rounded-xl overflow-hidden" style={{ background: "#161d27", border: "1px solid #1e2836" }}>
        <div className="px-4 py-3" style={{ borderBottom: "1px solid #1e2836" }}>
          <div className="text-sm font-bold text-white">Before vs After Ainomiq</div>
        </div>
        <table className="w-full text-sm">
          <thead>
            <tr style={{ borderBottom: "1px solid #1e2836" }}>
              {["Metric", "Before AI", "After AI", "Improvement"].map((h) => (
                <th key={h} className="px-4 py-3 text-left text-xs font-semibold" style={{ color: "#64748b" }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[
              { metric: "Avg Response Time", before: "8 min", after: "1.2 min", delta: "85% faster", c: "#00d4aa" },
              { metric: "Customer Satisfaction", before: "3.9/5", after: "4.8/5", delta: "+23%", c: "#00d4aa" },
              { metric: "Orders per Day (all)", before: "1,890", after: "2,341", delta: "+23.9%", c: "#00d4aa" },
              { metric: "AI Automation Rate", before: "0%", after: "94.2%", delta: "Full coverage", c: "#00d4aa" },
              { metric: "Staff Hours on CS", before: "320 hrs/mo", after: "18 hrs/mo", delta: "94% reduction", c: "#00d4aa" },
            ].map((row, i) => (
              <tr key={row.metric} style={{ borderBottom: i < 4 ? "1px solid #1e2836" : undefined }}>
                <td className="px-4 py-3 text-xs font-semibold text-white">{row.metric}</td>
                <td className="px-4 py-3 text-xs" style={{ color: "#ef4444" }}>{row.before}</td>
                <td className="px-4 py-3 text-xs font-semibold" style={{ color: "#00d4aa" }}>{row.after}</td>
                <td className="px-4 py-3">
                  <span className="text-xs px-2 py-0.5 rounded-full font-semibold" style={{ background: "#00d4aa18", color: "#00d4aa" }}>{row.delta}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ─── Tab: Staff ───────────────────────────────────────────────────────────────

function StaffTab() {
  const [aiSystems, setAiSystems] = useState<Record<string, boolean>>(
    Object.fromEntries(locations.map((l) => [l.name, true]))
  );

  return (
    <div>
      <div className="grid grid-cols-3 gap-3 mb-4">
        {[
          { label: "Active AI Systems", value: Object.values(aiSystems).filter(Boolean).length.toString(), c: "#00d4aa" },
          { label: "Total Actions Today", value: "847", c: "#3b82f6" },
          { label: "Coverage", value: `${Math.round((Object.values(aiSystems).filter(Boolean).length / locations.length) * 100)}%`, c: "#8b5cf6" },
        ].map((s) => (
          <div key={s.label} className="rounded-xl p-4 text-center" style={{ background: "#161d27", border: "1px solid #1e2836" }}>
            <div className="text-2xl font-extrabold" style={{ color: s.c }}>{s.value}</div>
            <div className="text-xs mt-1" style={{ color: "#64748b" }}>{s.label}</div>
          </div>
        ))}
      </div>

      <div className="rounded-xl overflow-hidden" style={{ background: "#161d27", border: "1px solid #1e2836" }}>
        <div className="px-4 py-3" style={{ borderBottom: "1px solid #1e2836" }}>
          <div className="text-sm font-bold text-white">AI Systems by Location</div>
        </div>
        <table className="w-full text-sm">
          <thead>
            <tr style={{ borderBottom: "1px solid #1e2836" }}>
              {["Location", "Status", "Actions Today", "System Type", "Toggle"].map((h) => (
                <th key={h} className="px-4 py-3 text-left text-xs font-semibold" style={{ color: "#64748b" }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {locations.map((loc, i) => {
              const active = aiSystems[loc.name];
              return (
                <tr key={loc.name} style={{ borderBottom: i < locations.length - 1 ? "1px solid #1e2836" : undefined }}>
                  <td className="px-4 py-2.5 text-xs font-semibold text-white">{loc.name}</td>
                  <td className="px-4 py-2.5">
                    <span className="flex items-center gap-1.5 text-xs font-semibold" style={{ color: active ? "#00d4aa" : "#64748b" }}>
                      <span className={`w-1.5 h-1.5 rounded-full ${active ? "animate-pulse bg-teal-400" : "bg-slate-600"}`} />
                      {active ? "Active" : "Inactive"}
                    </span>
                  </td>
                  <td className="px-4 py-2.5 text-xs" style={{ color: "#94a3b8" }}>{active ? Math.round(loc.aiRate * 0.8) : 0}</td>
                  <td className="px-4 py-2.5 text-xs" style={{ color: "#94a3b8" }}>CS + Inventory + Reviews</td>
                  <td className="px-4 py-2.5">
                    <button
                      onClick={() => setAiSystems((prev) => ({ ...prev, [loc.name]: !prev[loc.name] }))}
                      className="px-3 py-1 rounded-lg text-xs font-semibold transition-all"
                      style={{
                        background: active ? "#ef444418" : "#00d4aa18",
                        border: `1px solid ${active ? "#ef4444" : "#00d4aa"}`,
                        color: active ? "#ef4444" : "#00d4aa",
                      }}
                    >
                      {active ? "Disable" : "Enable"}
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export function FranchiseDashboard() {
  const [tab, setTab] = useState<Tab>("Overview");
  const [selectedLocation, setSelectedLocation] = useState("All Locations");
  const [dateRange, setDateRange] = useState<"Today" | "This Week" | "This Month">("Today");

  return (
    <div className="rounded-2xl overflow-hidden" style={{ background: "#0f1923", border: "1px solid #1e2836" }}>
      {/* Header */}
      <div className="px-5 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3" style={{ borderBottom: "1px solid #1e2836", background: "linear-gradient(135deg, #0f1923 0%, #161d27 100%)" }}>
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl flex items-center justify-center text-lg font-black" style={{ background: "linear-gradient(135deg, #00d4aa, #3b82f6)" }}>
            B
          </div>
          <div>
            <div className="font-extrabold text-white leading-tight">De Burgerij</div>
            <div className="text-xs" style={{ color: "#64748b" }}>Franchise Operations Dashboard</div>
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <select
            value={selectedLocation}
            onChange={(e) => setSelectedLocation(e.target.value)}
            className="text-xs rounded-lg px-2.5 py-1.5 focus:outline-none"
            style={{ background: "#161d27", border: "1px solid #1e2836", color: "#e2e8f0" }}
          >
            <option>All Locations</option>
            {locations.map((l) => <option key={l.name}>{l.name}</option>)}
          </select>
          <div className="flex rounded-lg overflow-hidden" style={{ border: "1px solid #1e2836" }}>
            {(["Today", "This Week", "This Month"] as const).map((r) => (
              <button key={r} onClick={() => setDateRange(r)} className="px-2.5 py-1.5 text-xs font-semibold transition-colors" style={{ background: dateRange === r ? "#00d4aa22" : "#161d27", color: dateRange === r ? "#00d4aa" : "#94a3b8" }}>
                {r}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-xs font-semibold" style={{ background: "#00d4aa15", border: "1px solid #00d4aa30", color: "#00d4aa" }}>
            <span className="w-1.5 h-1.5 rounded-full bg-teal-400 animate-pulse" />
            AI Active
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 px-5 pt-3 pb-0" style={{ borderBottom: "1px solid #1e2836" }}>
        {TABS.map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className="px-4 py-2 text-xs font-semibold rounded-t-lg transition-all"
            style={{
              background: tab === t ? "#161d27" : "transparent",
              color: tab === t ? "#00d4aa" : "#64748b",
              borderBottom: tab === t ? "2px solid #00d4aa" : "2px solid transparent",
            }}
          >
            {t}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="p-5">
        {tab === "Overview"    && <OverviewTab dateRange={dateRange} selectedLocation={selectedLocation} />}
        {tab === "Locations"   && <LocationsTab />}
        {tab === "AI Actions"  && <AIActionsTab />}
        {tab === "Analytics"   && <AnalyticsTab />}
        {tab === "Staff"       && <StaffTab />}
      </div>
    </div>
  );
}

