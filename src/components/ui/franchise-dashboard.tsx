"use client";

import { useState, useEffect, useRef } from "react";
import {
  BarChart,
  Bar,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

// ─── Types ───────────────────────────────────────────────────────────────────

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

// ─── Mock Data ────────────────────────────────────────────────────────────────

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

const revenueBarData = locations.map((l) => ({ name: l.short, revenue: l.revenue }));

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
  score: parseFloat((3.9 + (i / 29) * 0.9 + (Math.random() * 0.1 - 0.05)).toFixed(2)),
}));

const allActivityItems: ActivityItem[] = [
  { id: 1,  location: "Amsterdam Centrum", action: "Replied to complaint about wait time - Offered 10% discount - Resolved",     time: "Just now",  type: "resolve"   },
  { id: 2,  location: "Rotterdam",         action: "Upsell suggestion sent - Customer added fries (+€3.50)",                      time: "12s ago",   type: "upsell"    },
  { id: 3,  location: "Utrecht",           action: "Order status update sent to 12 customers",                                    time: "28s ago",   type: "update"    },
  { id: 4,  location: "Amsterdam Zuid",    action: "Complaint about cold food - Escalated to manager - Voucher issued",           time: "45s ago",   type: "complaint" },
  { id: 5,  location: "Eindhoven",         action: "Loyalty reward triggered - 3 customers notified",                            time: "1m ago",    type: "update"    },
  { id: 6,  location: "Groningen",         action: "Upsell: dessert combo suggested - 4/7 accepted (+€14.80)",                   time: "1m 18s ago",type: "upsell"    },
  { id: 7,  location: "Den Haag",          action: "Review response posted to Google - 5-star review thanked",                   time: "1m 40s ago",type: "resolve"   },
  { id: 8,  location: "Haarlem",           action: "Long wait complaint - Auto-apology sent - Free drink coupon issued",          time: "2m ago",    type: "complaint" },
  { id: 9,  location: "Amsterdam Centrum", action: "Bundle upsell sent via order confirmation - Accepted (+€6.90)",               time: "2m 20s ago",type: "upsell"    },
  { id: 10, location: "Rotterdam",         action: "Order delay notification sent to 8 customers - ETA updated",                  time: "2m 55s ago",type: "update"    },
  { id: 11, location: "Utrecht",           action: "Review replied on Thuisbezorgd - Resolved complaint - 1 star to 4 stars",    time: "3m ago",    type: "resolve"   },
  { id: 12, location: "Breda",             action: "Inventory alert: burger buns low - Auto-reorder triggered",                   time: "3m 30s ago",type: "update"    },
];

// ─── Sub-components ───────────────────────────────────────────────────────────

const typeColors: Record<ActivityItem["type"], string> = {
  resolve:   "#00d4aa",
  upsell:    "#f59e0b",
  update:    "#3b82f6",
  complaint: "#8b5cf6",
};
const typeLabels: Record<ActivityItem["type"], string> = {
  resolve:   "Resolved",
  upsell:    "Upsell",
  update:    "Update",
  complaint: "Complaint",
};

function StatusBadge({ status }: { status: LocationData["status"] }) {
  const map = {
    excellent: { bg: "bg-teal-500/15", text: "text-teal-400", dot: "bg-teal-400", label: "Excellent" },
    good:      { bg: "bg-blue-500/15",  text: "text-blue-400",  dot: "bg-blue-400",  label: "Good"      },
    attention: { bg: "bg-red-500/15",   text: "text-red-400",   dot: "bg-red-400",   label: "Attention" },
  }[status];
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${map.bg} ${map.text}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${map.dot} animate-pulse`} />
      {map.label}
    </span>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export function FranchiseDashboard() {
  const [selectedLocation, setSelectedLocation] = useState<string>("All Locations");
  const [dateRange, setDateRange] = useState<"Today" | "This Week" | "This Month">("Today");
  const [activityFeed, setActivityFeed] = useState<ActivityItem[]>(allActivityItems.slice(0, 8));
  const nextIdRef = useRef(13);

  // Cycle new items into activity feed every 3s
  useEffect(() => {
    const templates = [
      (id: number): ActivityItem => ({ id, location: "Amsterdam Centrum", action: "New review received - AI drafted 5-star response - Published",         time: "Just now", type: "resolve"   }),
      (id: number): ActivityItem => ({ id, location: "Rotterdam",         action: "Upsell combo triggered on checkout - Customer accepted (+€5.20)",      time: "Just now", type: "upsell"    }),
      (id: number): ActivityItem => ({ id, location: "Utrecht",           action: "15 customers updated on order delay - All acknowledged",               time: "Just now", type: "update"    }),
      (id: number): ActivityItem => ({ id, location: "Eindhoven",         action: "Complaint resolved - Refund processed €12.50 - Customer satisfied",    time: "Just now", type: "complaint" }),
      (id: number): ActivityItem => ({ id, location: "Groningen",         action: "Loyalty milestone hit - 50 customers sent birthday voucher",           time: "Just now", type: "update"    }),
      (id: number): ActivityItem => ({ id, location: "Haarlem",           action: "Upsell: drink upgrade suggested on 22 orders - 14 accepted (+€28)",    time: "Just now", type: "upsell"    }),
    ];
    let tplIdx = 0;
    const interval = setInterval(() => {
      const newItem = templates[tplIdx % templates.length](nextIdRef.current++);
      tplIdx++;
      setActivityFeed((prev) => [newItem, ...prev.slice(0, 7)]);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // Filter bar data by location
  const filteredBarData = selectedLocation === "All Locations"
    ? revenueBarData
    : revenueBarData.map((d) => ({
        ...d,
        revenue: locations.find((l) => l.short === d.name)?.name === selectedLocation ? d.revenue : Math.round(d.revenue * 0.3),
      }));

  const selectedLocationData = selectedLocation === "All Locations"
    ? null
    : locations.find((l) => l.name === selectedLocation);

  // KPI adjustments based on date range
  const rangeMultiplier = dateRange === "Today" ? 1 : dateRange === "This Week" ? 6.8 : 29.4;

  return (
    <div
      className="rounded-2xl overflow-hidden"
      style={{ background: "#0f1923", border: "1px solid #1e2836" }}
    >
      {/* ── Header ── */}
      <div
        className="px-6 py-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
        style={{ borderBottom: "1px solid #1e2836", background: "linear-gradient(135deg, #0f1923 0%, #161d27 100%)" }}
      >
        <div className="flex items-center gap-3">
          {/* Logo placeholder */}
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center text-xl font-black"
            style={{ background: "linear-gradient(135deg, #00d4aa, #3b82f6)" }}
          >
            🍔
          </div>
          <div>
            <div className="font-extrabold text-white text-lg leading-tight">De Burgerij</div>
            <div className="text-xs" style={{ color: "#64748b" }}>Franchise Operations Dashboard</div>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {/* Location selector */}
          <select
            value={selectedLocation}
            onChange={(e) => setSelectedLocation(e.target.value)}
            className="text-sm rounded-lg px-3 py-2 font-medium focus:outline-none focus:ring-1"
            style={{ background: "#161d27", border: "1px solid #1e2836", color: "#e2e8f0" }}
          >
            <option>All Locations</option>
            {locations.map((l) => <option key={l.name}>{l.name}</option>)}
          </select>

          {/* Date range */}
          <div className="flex rounded-lg overflow-hidden" style={{ border: "1px solid #1e2836" }}>
            {(["Today", "This Week", "This Month"] as const).map((r) => (
              <button
                key={r}
                onClick={() => setDateRange(r)}
                className="px-3 py-2 text-xs font-semibold transition-colors"
                style={{
                  background: dateRange === r ? "#00d4aa22" : "#161d27",
                  color: dateRange === r ? "#00d4aa" : "#94a3b8",
                }}
              >
                {r}
              </button>
            ))}
          </div>

          {/* AI badge */}
          <div
            className="flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-semibold"
            style={{ background: "#00d4aa15", border: "1px solid #00d4aa30", color: "#00d4aa" }}
          >
            <span className="w-2 h-2 rounded-full bg-teal-400 animate-pulse" />
            AI Active &mdash; 847 actions today
          </div>
        </div>
      </div>

      {/* ── KPI Cards ── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 p-6">
        {[
          {
            label: "Total Revenue",
            value: `€${Math.round(12847 * rangeMultiplier).toLocaleString("nl-NL")}`,
            sub: "+18% vs yesterday",
            subColor: "#00d4aa",
            icon: "💶",
          },
          {
            label: "AI-Handled Orders",
            value: Math.round(2341 * rangeMultiplier).toLocaleString("nl-NL"),
            sub: "94.2% automation rate",
            subColor: "#3b82f6",
            icon: "🤖",
          },
          {
            label: "Avg Response Time",
            value: "1.2 min",
            sub: "Was 8 min manual",
            subColor: "#8b5cf6",
            icon: "⚡",
          },
          {
            label: "Customer Satisfaction",
            value: `${selectedLocationData ? selectedLocationData.satisfaction : "4.8"}/5`,
            sub: "↑ from 3.9 pre-AI",
            subColor: "#f59e0b",
            icon: "⭐",
          },
        ].map((kpi) => (
          <div
            key={kpi.label}
            className="rounded-xl p-5 flex flex-col gap-1"
            style={{ background: "#161d27", border: "1px solid #1e2836" }}
          >
            <div className="text-2xl mb-1">{kpi.icon}</div>
            <div className="text-xs font-medium" style={{ color: "#64748b" }}>{kpi.label}</div>
            <div className="text-2xl font-extrabold text-white tracking-tight">{kpi.value}</div>
            <div className="text-xs font-semibold" style={{ color: kpi.subColor }}>{kpi.sub}</div>
          </div>
        ))}
      </div>

      {/* ── Charts Row 1 ── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 px-6 pb-4">
        {/* Revenue per location */}
        <div className="rounded-xl p-5" style={{ background: "#161d27", border: "1px solid #1e2836" }}>
          <div className="text-sm font-bold text-white mb-4">Revenue per Location</div>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={filteredBarData} margin={{ top: 4, right: 4, bottom: 0, left: -20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e2836" />
              <XAxis dataKey="name" tick={{ fill: "#64748b", fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: "#64748b", fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={(v) => `€${v}`} />
              <Tooltip
                contentStyle={{ background: "#0f1923", border: "1px solid #1e2836", borderRadius: 8, color: "#e2e8f0" }}
                formatter={(v) => [`€${Number(v).toLocaleString("nl-NL")}`, "Revenue"]}
              />
              <Bar dataKey="revenue" radius={[4, 4, 0, 0]}>
                {filteredBarData.map((_, i) => (
                  <Cell key={i} fill={`hsl(${180 + i * 18}, 80%, 55%)`} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Orders over time */}
        <div className="rounded-xl p-5" style={{ background: "#161d27", border: "1px solid #1e2836" }}>
          <div className="text-sm font-bold text-white mb-4">Orders Over Time Today</div>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={ordersAreaData} margin={{ top: 4, right: 4, bottom: 0, left: -20 }}>
              <defs>
                <linearGradient id="ordersGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%"  stopColor="#3b82f6" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e2836" />
              <XAxis dataKey="time" tick={{ fill: "#64748b", fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: "#64748b", fontSize: 11 }} axisLine={false} tickLine={false} />
              <Tooltip
                contentStyle={{ background: "#0f1923", border: "1px solid #1e2836", borderRadius: 8, color: "#e2e8f0" }}
              />
              <Area type="monotone" dataKey="orders" stroke="#3b82f6" strokeWidth={2} fill="url(#ordersGrad)" dot={false} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* ── Charts Row 2 ── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 px-6 pb-4">
        {/* AI actions breakdown */}
        <div className="rounded-xl p-5" style={{ background: "#161d27", border: "1px solid #1e2836" }}>
          <div className="text-sm font-bold text-white mb-4">AI Actions Breakdown</div>
          <div className="flex items-center gap-6">
            <ResponsiveContainer width={160} height={160}>
              <PieChart>
                <Pie data={aiActionsData} cx="50%" cy="50%" innerRadius={45} outerRadius={70} paddingAngle={3} dataKey="value">
                  {aiActionsData.map((entry, i) => (
                    <Cell key={i} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{ background: "#0f1923", border: "1px solid #1e2836", borderRadius: 8, color: "#e2e8f0" }}
                  formatter={(v) => [`${v}%`, ""]}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="flex flex-col gap-2">
              {aiActionsData.map((d) => (
                <div key={d.name} className="flex items-center gap-2 text-xs">
                  <span className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ background: d.color }} />
                  <span style={{ color: "#94a3b8" }}>{d.name}</span>
                  <span className="font-bold text-white ml-auto pl-3">{d.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Satisfaction trend */}
        <div className="rounded-xl p-5" style={{ background: "#161d27", border: "1px solid #1e2836" }}>
          <div className="text-sm font-bold text-white mb-4">Customer Satisfaction — Last 30 Days</div>
          <ResponsiveContainer width="100%" height={160}>
            <LineChart data={satisfactionTrendData} margin={{ top: 4, right: 4, bottom: 0, left: -20 }}>
              <defs>
                <linearGradient id="satGrad" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%"   stopColor="#8b5cf6" />
                  <stop offset="100%" stopColor="#00d4aa" />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e2836" />
              <XAxis dataKey="day" tick={{ fill: "#64748b", fontSize: 10 }} axisLine={false} tickLine={false} interval={4} />
              <YAxis domain={[3.5, 5]} tick={{ fill: "#64748b", fontSize: 11 }} axisLine={false} tickLine={false} />
              <Tooltip
                contentStyle={{ background: "#0f1923", border: "1px solid #1e2836", borderRadius: 8, color: "#e2e8f0" }}
              />
              <Line type="monotone" dataKey="score" stroke="url(#satGrad)" strokeWidth={2.5} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* ── Location Table ── */}
      <div className="px-6 pb-4">
        <div className="rounded-xl overflow-hidden" style={{ background: "#161d27", border: "1px solid #1e2836" }}>
          <div className="px-5 py-4" style={{ borderBottom: "1px solid #1e2836" }}>
            <div className="text-sm font-bold text-white">Location Performance</div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr style={{ borderBottom: "1px solid #1e2836" }}>
                  {["Location", "Revenue", "Orders", "AI Rate", "Satisfaction", "Status"].map((h) => (
                    <th key={h} className="px-5 py-3 text-left text-xs font-semibold" style={{ color: "#64748b" }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {locations.map((loc, i) => (
                  <tr
                    key={loc.name}
                    className="transition-colors cursor-pointer"
                    style={{
                      borderBottom: i < locations.length - 1 ? "1px solid #1e2836" : undefined,
                      background: selectedLocation === loc.name ? "#00d4aa08" : undefined,
                    }}
                    onClick={() => setSelectedLocation(selectedLocation === loc.name ? "All Locations" : loc.name)}
                  >
                    <td className="px-5 py-3 font-semibold text-white">{loc.name}</td>
                    <td className="px-5 py-3" style={{ color: "#00d4aa" }}>€{loc.revenue.toLocaleString("nl-NL")}</td>
                    <td className="px-5 py-3" style={{ color: "#e2e8f0" }}>{loc.orders}</td>
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-2">
                        <div className="flex-1 h-1.5 rounded-full" style={{ background: "#1e2836", maxWidth: 60 }}>
                          <div
                            className="h-full rounded-full"
                            style={{ width: `${loc.aiRate}%`, background: loc.aiRate > 92 ? "#00d4aa" : loc.aiRate > 85 ? "#3b82f6" : "#f59e0b" }}
                          />
                        </div>
                        <span style={{ color: "#94a3b8" }}>{loc.aiRate}%</span>
                      </div>
                    </td>
                    <td className="px-5 py-3">
                      <span className="font-bold" style={{ color: loc.satisfaction >= 4.7 ? "#00d4aa" : loc.satisfaction >= 4.3 ? "#3b82f6" : "#ef4444" }}>
                        {loc.satisfaction} ⭐
                      </span>
                    </td>
                    <td className="px-5 py-3"><StatusBadge status={loc.status} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* ── AI Activity Feed ── */}
      <div className="px-6 pb-6">
        <div className="rounded-xl overflow-hidden" style={{ background: "#161d27", border: "1px solid #1e2836" }}>
          <div className="px-5 py-4 flex items-center justify-between" style={{ borderBottom: "1px solid #1e2836" }}>
            <div className="text-sm font-bold text-white">Live AI Activity Feed</div>
            <div className="flex items-center gap-2 text-xs font-semibold" style={{ color: "#00d4aa" }}>
              <span className="w-2 h-2 rounded-full bg-teal-400 animate-pulse" />
              Live
            </div>
          </div>
          <div className="divide-y" style={{ borderColor: "#1e2836" }}>
            {activityFeed.map((item, i) => (
              <div
                key={item.id}
                className="px-5 py-3 flex items-start gap-3 transition-all"
                style={{
                  opacity: i === 0 ? 1 : Math.max(0.4, 1 - i * 0.08),
                  animation: i === 0 ? "fadeInDown 0.4s ease" : undefined,
                }}
              >
                <div
                  className="w-2 h-2 rounded-full mt-1.5 flex-shrink-0"
                  style={{ background: typeColors[item.type] }}
                />
                <div className="flex-1 min-w-0">
                  <div className="text-xs font-semibold text-white">{item.location}</div>
                  <div className="text-xs mt-0.5 truncate" style={{ color: "#94a3b8" }}>{item.action}</div>
                </div>
                <div className="flex flex-col items-end gap-1 flex-shrink-0">
                  <span
                    className="text-xs px-2 py-0.5 rounded-full font-semibold"
                    style={{ background: `${typeColors[item.type]}20`, color: typeColors[item.type] }}
                  >
                    {typeLabels[item.type]}
                  </span>
                  <span className="text-xs" style={{ color: "#64748b" }}>{item.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeInDown {
          from { opacity: 0; transform: translateY(-8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
