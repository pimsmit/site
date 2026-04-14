"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Bot, ChartColumn, Package, Mail, BarChart3,
  TrendingUp, Settings, ChevronRight,
  Home, Gauge, Workflow, ShoppingBag, Instagram, Send, HelpCircle, LayoutDashboard
} from "lucide-react";

const modules = [
  { icon: Bot, title: "Customer Service", description: "Email, chat, DMs, and comments — handled automatically." },
  { icon: Package, title: "Inventory Management", description: "Stock tracking, alerts, and reorder suggestions." },
  { icon: Mail, title: "Email Marketing", description: "Klaviyo flows & campaigns on autopilot." },
  { icon: TrendingUp, title: "Performance Tracking", description: "Revenue, profit, and growth metrics — free." , free: true },
  { icon: ChartColumn, title: "Ads Manager", description: "Meta, Google, and TikTok campaigns.", soon: true },
  { icon: BarChart3, title: "Social Media", description: "Posting, scheduling, and engagement.", soon: true },
] as const;

const bottomTabs = [
  { icon: Home, label: "Overview" },
  { icon: Gauge, label: "Performance" },
  { icon: Bot, label: "Customer Service" },
  { icon: ShoppingBag, label: "Stock" },
  { icon: Settings, label: "Settings" },
];

const sidebarItems = [
  { icon: Home, label: "Overview" },
  { icon: Gauge, label: "Performance" },
  { icon: Workflow, label: "Automations" },
  { icon: ShoppingBag, label: "Stock Management" },
  { icon: Bot, label: "Customer Service" },
  { icon: Instagram, label: "Instagram" },
  { icon: Send, label: "Email Marketing" },
  { icon: Settings, label: "Settings" },
  { icon: HelpCircle, label: "Support" },
];

type ViewData = {
  metrics: { label: string; value: string; change: string; positive: boolean }[];
  rows: { user: string; message: string; status: string; time: string }[];
  rowLabel: string;
};

const viewData: Record<string, ViewData> = {
  "Overview": {
    metrics: [
      { label: "Total Revenue", value: "€3,420", change: "+8.2%", positive: true },
      { label: "Orders Today", value: "82", change: "+5", positive: true },
      { label: "Active Sessions", value: "1,267", change: "-242", positive: false },
      { label: "CVR", value: "4.58%", change: "-0.17pp", positive: false },
    ],
    rows: [
      { user: "Order #37906", message: "Billie Jeans Pin Stellar × 2", status: "Fulfilled", time: "3m ago" },
      { user: "Order #37905", message: "Blue Light Glasses", status: "Processing", time: "9m ago" },
      { user: "Order #37904", message: "Signature + Powerlock", status: "Fulfilled", time: "15m ago" },
      { user: "Order #37903", message: "Satin Beanie", status: "Fulfilled", time: "22m ago" },
    ],
    rowLabel: "Recent Orders",
  },
  "Performance": {
    metrics: [
      { label: "ROAS", value: "1.44x", change: "+0.06", positive: true },
      { label: "Ad Spend", value: "€248", change: "+€12", positive: false },
      { label: "Revenue", value: "€3,420", change: "+8.2%", positive: true },
      { label: "CPA", value: "€19.80", change: "-€1.63", positive: true },
    ],
    rows: [
      { user: "Video — UGC Hook 01", message: "Organic selfie style", status: "ROAS 2.06", time: "Active" },
      { user: "Video — Hook 04", message: "Before/after transformation", status: "ROAS 1.78", time: "Active" },
      { user: "Image — Hero Shot", message: "Product flat lay", status: "ROAS 0.35", time: "Paused" },
      { user: "Video — Hook 10", message: "Note from creator", status: "ROAS 1.55", time: "Active" },
    ],
    rowLabel: "Top Ads",
  },
  "Automations": {
    metrics: [
      { label: "Flows Active", value: "17", change: "+2", positive: true },
      { label: "Revenue (30d)", value: "€2,031", change: "+€340", positive: true },
      { label: "Avg Open Rate", value: "38.4%", change: "+2.1%", positive: true },
      { label: "Unsubscribes", value: "12", change: "-3", positive: true },
    ],
    rows: [
      { user: "Abandoned Cart", message: "3-step flow, 4h / 16h / 48h", status: "Active", time: "€0 ⚠️" },
      { user: "Welcome Series", message: "5 emails, signup trigger", status: "Active", time: "0% CVR" },
      { user: "Abandoned Checkout v3", message: "First email 1h delay", status: "Updated", time: "€480" },
      { user: "Browse Abandonment", message: "Product page exit", status: "Draft", time: "Pending" },
    ],
    rowLabel: "Email Flows",
  },
  "Stock Management": {
    metrics: [
      { label: "SKUs Tracked", value: "34", change: "0", positive: true },
      { label: "Low Stock", value: "3", change: "+1", positive: false },
      { label: "Pending Orders", value: "82", change: "+5", positive: false },
      { label: "Avg Fulfillment", value: "2.1 days", change: "-0.3d", positive: true },
    ],
    rows: [
      { user: "Jeans Pin Stellar Silver", message: "12 units left", status: "Low Stock", time: "Reorder" },
      { user: "Blue Light Glasses", message: "0 units", status: "Out of Stock", time: "Urgent" },
      { user: "Satin Beanie Black", message: "47 units", status: "In Stock", time: "OK" },
      { user: "Pin Signature Gold", message: "8 units left", status: "Low Stock", time: "Reorder" },
    ],
    rowLabel: "Inventory Status",
  },
  "Customer Service": {
    metrics: [
      { label: "Tickets Handled", value: "1,247", change: "+12.3%", positive: true },
      { label: "Avg Response", value: "2.4 min", change: "-18%", positive: true },
      { label: "CSAT Score", value: "4.8/5", change: "+0.3", positive: true },
      { label: "Escalations", value: "23", change: "-8%", positive: true },
    ],
    rows: [
      { user: "Sophie M.", message: "Issue with order #12847", status: "Resolved", time: "2m ago" },
      { user: "Jake D.", message: "Shipping delay inquiry", status: "In Progress", time: "8m ago" },
      { user: "Emma R.", message: "Product size question", status: "Resolved", time: "12m ago" },
      { user: "Liam K.", message: "Return request", status: "Pending", time: "18m ago" },
    ],
    rowLabel: "Recent Tickets",
  },
  "Instagram": {
    metrics: [
      { label: "Followers", value: "24.8K", change: "+312", positive: true },
      { label: "Reach (7d)", value: "48.2K", change: "+6.1%", positive: true },
      { label: "Comments", value: "187", change: "+23", positive: true },
      { label: "DMs Handled", value: "94", change: "+11", positive: true },
    ],
    rows: [
      { user: "Reel — Pin styling tips", message: "UGC, hook 01 format", status: "Live", time: "12.4K views" },
      { user: "Carousel — 3 ways to style", message: "Product education", status: "Live", time: "8.7K reach" },
      { user: "Story — Flash sale 20%", message: "Swipe up to shop", status: "Expired", time: "3.1K views" },
      { user: "Reel — Before/after", message: "Hook 04 variant", status: "Scheduled", time: "Tomorrow" },
    ],
    rowLabel: "Recent Posts",
  },
  "Email Marketing": {
    metrics: [
      { label: "Open Rate", value: "38.4%", change: "+2.1%", positive: true },
      { label: "Click Rate", value: "3.2%", change: "+0.4%", positive: true },
      { label: "Revenue (30d)", value: "€2,031", change: "+€340", positive: true },
      { label: "Subscribers", value: "29,921", change: "+412", positive: true },
    ],
    rows: [
      { user: "Campaign — Bestsellers", message: "Sent to 29,921 subscribers", status: "Sent", time: "Apr 11" },
      { user: "Campaign — Blue Light", message: "Segment: 90d engaged", status: "Draft", time: "Pending" },
      { user: "Flow — Welcome", message: "5 emails, 0% conversion", status: "Needs Fix", time: "Active" },
      { user: "Flow — Abandoned Cart", message: "EUR 0 revenue", status: "Needs Fix", time: "Active" },
    ],
    rowLabel: "Campaigns & Flows",
  },
  "Settings": {
    metrics: [
      { label: "Integrations", value: "8", change: "Active", positive: true },
      { label: "Agents Active", value: "16", change: "Running", positive: true },
      { label: "Uptime", value: "99.8%", change: "+0.1%", positive: true },
      { label: "API Calls (24h)", value: "4,821", change: "+302", positive: false },
    ],
    rows: [
      { user: "Shopify", message: "y2aghp-gy.myshopify.com", status: "Connected", time: "OK" },
      { user: "Klaviyo", message: "Account RvivBi", status: "Connected", time: "OK" },
      { user: "Meta Ads", message: "act_922445726475791", status: "Connected", time: "OK" },
      { user: "GA4", message: "Property 524144630", status: "Connected", time: "OK" },
    ],
    rowLabel: "Integrations",
  },
  "Support": {
    metrics: [
      { label: "Open Tickets", value: "3", change: "-2", positive: true },
      { label: "Avg Response", value: "< 1h", change: "SLA met", positive: true },
      { label: "Docs Pages", value: "48", change: "+3", positive: true },
      { label: "Satisfaction", value: "4.9/5", change: "+0.1", positive: true },
    ],
    rows: [
      { user: "Ticket #001", message: "GA4 tracking gap investigation", status: "In Progress", time: "2h ago" },
      { user: "Ticket #002", message: "Shopify webhook config", status: "Resolved", time: "Yesterday" },
      { user: "Docs — CVR Monitor", message: "Setup guide", status: "Published", time: "Apr 11" },
      { user: "Docs — Email Flows", message: "Best practices", status: "Published", time: "Apr 10" },
    ],
    rowLabel: "Open Tickets",
  },
};

const timeRanges = ["Today", "7 days", "14 days", "30 days", "90 days"];

function statusColor(status: string) {
  if (["Resolved", "Fulfilled", "Active", "Connected", "Published", "Live", "OK", "Sent"].includes(status))
    return "bg-green-100 text-green-700";
  if (["In Progress", "Processing", "Updated", "Scheduled"].includes(status))
    return "bg-blue-100 text-blue-700";
  if (["Pending", "Draft", "Paused"].includes(status))
    return "bg-yellow-100 text-yellow-700";
  if (["Low Stock", "Needs Fix", "Urgent", "Expired"].includes(status))
    return "bg-red-100 text-red-700";
  return "bg-gray-100 text-gray-700";
}

function DashboardView({ view, isMobile }: { view: string; isMobile: boolean }) {
  const [activeRange, setActiveRange] = useState("7 days");
  const data = viewData[view] ?? viewData["Overview"];

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={view + activeRange}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -8 }}
        transition={{ duration: 0.2 }}
        className="h-full overflow-auto"
      >
        {/* Header */}
        <div className={`flex items-center justify-between mb-3 ${isMobile ? "px-4 pt-3" : "px-5 pt-4"}`}>
          <h2 className={`font-bold text-gray-900 ${isMobile ? "text-base" : "text-xl"}`}>{view}</h2>
          <div className="flex gap-1">
            {(isMobile ? ["7d", "30d", "90d"] : timeRanges).map((r, i) => {
              const fullLabel = isMobile ? (r === "7d" ? "7 days" : r === "30d" ? "30 days" : "90 days") : r;
              return (
                <button
                  key={i}
                  onClick={() => setActiveRange(fullLabel)}
                  className={`text-xs px-2 py-1 rounded-lg transition-colors ${
                    activeRange === fullLabel ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  {r}
                </button>
              );
            })}
          </div>
        </div>

        {/* Metrics */}
        <div className={`grid grid-cols-2 gap-2 ${isMobile ? "px-4" : "px-5"} mb-4`}>
          {data.metrics.map((m, i) => (
            <div key={i} className="bg-white border rounded-xl p-3 hover:shadow-md transition-all cursor-pointer">
              <p className="text-xs text-gray-500 mb-1">{m.label}</p>
              <p className={`font-bold text-gray-900 ${isMobile ? "text-lg" : "text-xl"}`}>{m.value}</p>
              <p className={`text-xs font-medium mt-0.5 ${m.positive ? "text-green-600" : "text-red-500"}`}>{m.change}</p>
            </div>
          ))}
        </div>

        {/* Rows */}
        <div className={`bg-white border rounded-xl overflow-hidden ${isMobile ? "mx-4 mb-4" : "mx-5 mb-5"}`}>
          <div className="px-4 py-2.5 border-b">
            <p className="font-semibold text-sm">{data.rowLabel}</p>
          </div>
          {data.rows.map((row, i) => (
            <button
              key={i}
              className="w-full flex items-center justify-between px-4 py-2.5 border-b last:border-0 hover:bg-gray-50 active:bg-gray-100 transition-colors text-left"
            >
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">{row.user}</p>
                <p className="text-xs text-gray-500 truncate">{row.message}</p>
              </div>
              <div className="text-right ml-3 shrink-0">
                <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${statusColor(row.status)}`}>
                  {row.status}
                </span>
                <p className="text-xs text-gray-400 mt-1">{row.time}</p>
              </div>
            </button>
          ))}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

function MobileApp() {
  const [activeTab, setActiveTab] = useState("Overview");

  return (
    <div className="flex flex-col h-full bg-gray-50">
      {/* Top bar */}
      <div className="bg-white border-b px-4 py-3 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-2">
          <LayoutDashboard className="w-5 h-5 text-blue-600" />
          <span className="font-bold text-base">ainomiq</span>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto">
        <DashboardView view={activeTab} isMobile={true} />
      </div>

      {/* Bottom tab bar */}
      <div className="bg-white border-t shrink-0">
        <div className="flex">
          {bottomTabs.map((tab, i) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.label;
            return (
              <button
                key={i}
                onClick={() => setActiveTab(tab.label)}
                className={`flex-1 flex flex-col items-center py-2 gap-0.5 transition-colors ${
                  isActive ? "text-blue-600" : "text-gray-400"
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="text-[10px] font-medium">{tab.label}</span>
                {isActive && <div className="w-1 h-1 rounded-full bg-blue-600 mt-0.5" />}
              </button>
            );
          })}
        </div>
        <div className="flex justify-center pb-1">
          <div className="w-24 h-1 bg-gray-300 rounded-full" />
        </div>
      </div>
    </div>
  );
}

function DesktopApp() {
  const [activeView, setActiveView] = useState("Customer Service");

  return (
    <div className="flex h-full">
      {/* Sidebar */}
      <div className="w-52 bg-gray-50 border-r flex flex-col shrink-0">
        <div className="p-4 border-b">
          <div className="flex items-center gap-2">
            <LayoutDashboard className="w-4 h-4 text-blue-600" />
            <span className="font-bold">ainomiq</span>
          </div>
        </div>
        <nav className="flex-1 p-2 space-y-0.5 overflow-auto">
          {sidebarItems.map((item, i) => {
            const Icon = item.icon;
            const isActive = activeView === item.label;
            return (
              <button
                key={i}
                onClick={() => setActiveView(item.label)}
                className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs transition-all ${
                  isActive ? "bg-blue-600 text-white" : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                <Icon className="w-3.5 h-3.5 shrink-0" />
                <span className="truncate">{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Main */}
      <div className="flex-1 overflow-auto">
        <DashboardView view={activeView} isMobile={false} />
      </div>
    </div>
  );
}

export function InteractiveDashboard() {
  const [showApp, setShowApp] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  return (
    <div className="w-full h-full bg-white overflow-hidden">
      <AnimatePresence mode="wait">
        {!showApp ? (
          <motion.div
            key="landing"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25 }}
            className="w-full h-full overflow-auto"
          >
            {isMobile ? (
              <div className="flex flex-col h-full bg-white px-5 pt-6 pb-4">
                <div className="text-center mb-6">
                  <div className="flex items-center justify-center gap-2 mb-4">
                    <LayoutDashboard className="w-6 h-6 text-blue-600" />
                    <span className="text-xl font-bold">ainomiq</span>
                  </div>
                  <h1 className="text-2xl font-bold text-gray-900 mb-2 leading-tight">
                    Your store,<br />fully automated
                  </h1>
                  <p className="text-sm text-gray-500 mb-6">One platform. Every department. Zero manual work.</p>
                  <button
                    onClick={() => setShowApp(true)}
                    className="w-full bg-blue-600 text-white font-semibold py-3 rounded-2xl text-sm shadow-md active:scale-95 transition-transform"
                  >
                    Start for free
                  </button>
                </div>
                <div className="flex-1 overflow-auto space-y-2">
                  {modules.map((m, i) => {
                    const Icon = m.icon;
                    return (
                      <button
                        key={i}
                        onClick={() => setShowApp(true)}
                        className="w-full flex items-center gap-3 bg-gray-50 rounded-2xl px-4 py-3 text-left active:bg-gray-100 transition-colors"
                      >
                        <div className="w-9 h-9 rounded-xl bg-blue-100 flex items-center justify-center shrink-0">
                          <Icon className="w-4 h-4 text-blue-600" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <p className="text-sm font-semibold text-gray-900">{m.title}</p>
                            {'soon' in m && m.soon && <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-amber-100 text-amber-700 font-medium">Soon</span>}
                            {'free' in m && m.free && <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-green-100 text-green-700 font-medium">Free</span>}
                          </div>
                          <p className="text-xs text-gray-500 truncate">{m.description}</p>
                        </div>
                        <ChevronRight className="w-4 h-4 text-gray-400 shrink-0" />
                      </button>
                    );
                  })}
                </div>
              </div>
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-blue-50 to-white overflow-auto p-8">
                <div className="text-center mb-8">
                  <h1 className="text-4xl font-bold mb-3 text-gray-900">Your store,<br />fully automated</h1>
                  <p className="text-gray-600 max-w-xl mx-auto mb-6 text-sm">
                    Ainomiq connects your store and runs every department — one platform, zero manual work.
                  </p>
                  <div className="flex gap-3 justify-center">
                    <button
                      onClick={() => setShowApp(true)}
                      className="bg-blue-600 text-white px-6 py-2.5 rounded-lg font-semibold hover:bg-blue-700 transition-colors text-sm"
                    >
                      Start for free
                    </button>
                    <button className="border px-6 py-2.5 rounded-lg text-sm text-gray-700 hover:bg-gray-50 transition-colors">
                      Learn more
                    </button>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-3 max-w-3xl mx-auto">
                  {modules.map((m, i) => {
                    const Icon = m.icon;
                    return (
                      <button
                        key={i}
                        onClick={() => setShowApp(true)}
                        className="bg-white rounded-xl border p-4 text-left hover:shadow-md transition-all"
                      >
                        <div className="flex items-center gap-2 mb-2">
                          <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center">
                            <Icon className="w-4 h-4 text-blue-600" />
                          </div>
                          <p className="font-semibold text-xs">{m.title}</p>
                          {'soon' in m && m.soon && <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-amber-100 text-amber-700 font-medium">Soon</span>}
                          {'free' in m && m.free && <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-green-100 text-green-700 font-medium">Free</span>}
                        </div>
                        <p className="text-xs text-gray-500">{m.description}</p>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </motion.div>
        ) : (
          <motion.div
            key="app"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="w-full h-full"
          >
            {isMobile ? <MobileApp /> : <DesktopApp />}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
