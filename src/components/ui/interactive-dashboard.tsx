"use client";
import React, { useState } from "react";
import { motion, AnimatePresence, useTransform, useScroll } from "framer-motion";
import { 
  Bot, ChartColumn, Package, Mail, Gauge, Workflow, 
  LayoutDashboard, Settings, HelpCircle, Instagram, X 
} from "lucide-react";

const sidebarItems = [
  { id: "overview", label: "Overview", icon: LayoutDashboard },
  { id: "performance", label: "Performance", icon: Gauge },
  { id: "automations", label: "Automations", icon: Workflow },
  { id: "stock", label: "Stock Management", icon: Package },
  { id: "customer-service", label: "Customer Service", icon: Bot },
  { id: "instagram", label: "Instagram", icon: Instagram },
  { id: "email", label: "Email Marketing", icon: Mail },
  { id: "settings", label: "Settings", icon: Settings },
  { id: "support", label: "Support", icon: HelpCircle },
];

const dashboardViews = {
  "overview": {
    title: "Overview",
    subtitle: "Your business at a glance",
    metrics: [
      { label: "Total Revenue", value: "EUR 3,124,500", change: "+12.3%", positive: true },
      { label: "Active Customers", value: "12,847", change: "+8.7%", positive: true },
      { label: "Avg Order Value", value: "EUR 72.90", change: "+4.1%", positive: true },
      { label: "Conversion Rate", value: "3.2%", change: "+0.3%", positive: true },
    ],
  },
  "performance": {
    title: "Performance",
    subtitle: "E-commerce profit command center",
    metrics: [
      { label: "Revenue", value: "EUR 3,124,500", change: "+12.3%", positive: true },
      { label: "Orders", value: "42,847", change: "+8.7%", positive: true },
      { label: "AOV", value: "EUR 72.90", change: "+4.1%", positive: true },
      { label: "Ad Spend", value: "EUR 847,200", change: "+5.2%", positive: false },
      { label: "ROAS", value: "3.69x", change: "+7.0%", positive: true },
      { label: "CPC", value: "EUR 1.24", change: "-3.8%", positive: true },
      { label: "CTR", value: "2.87%", change: "+1.2%", positive: true },
      { label: "Purchases", value: "42,847", change: "+8.7%", positive: true },
      { label: "Email Revenue", value: "EUR 487,300", change: "+14.2%", positive: true },
      { label: "Subscribers", value: "127,492", change: "+9.1%", positive: true },
      { label: "Net Profit", value: "EUR 1,247,800", change: "+18.5%", positive: true },
      { label: "Blended ROAS", value: "4.12x", change: "+11.3%", positive: true },
    ],
  },
  "automations": {
    title: "Automations",
    subtitle: "Connected workflows & triggers",
    metrics: [
      { label: "Active Workflows", value: "34", change: "+3", positive: true },
      { label: "Tasks Automated", value: "12,847", change: "+18%", positive: true },
      { label: "Time Saved", value: "240h", change: "+12h", positive: true },
      { label: "Success Rate", value: "99.2%", change: "+0.3%", positive: true },
    ],
  },
  "stock": {
    title: "Stock Management",
    subtitle: "Inventory & forecasting",
    metrics: [
      { label: "Stock Level", value: "12,847", change: "-3%", positive: false },
      { label: "Stockouts Prevented", value: "34", change: "+12%", positive: true },
      { label: "Overstock Reduction", value: "30%", change: "+5%", positive: true },
      { label: "Reorder Alerts", value: "8", change: "0%", positive: true },
    ],
  },
  "customer-service": {
    title: "Customer Service",
    subtitle: "AI-powered support dashboard",
    metrics: [
      { label: "Tickets Handled", value: "1,247", change: "+12.3%", positive: true },
      { label: "Avg Response Time", value: "2.4 min", change: "-18%", positive: true },
      { label: "CSAT Score", value: "4.8/5", change: "+0.3", positive: true },
      { label: "Escalations", value: "23", change: "-8%", positive: true },
    ],
  },
  "instagram": {
    title: "Instagram",
    subtitle: "Social media engagement",
    metrics: [
      { label: "Followers", value: "42,847", change: "+8.7%", positive: true },
      { label: "Engagement Rate", value: "4.2%", change: "+0.3%", positive: true },
      { label: "Post Reach", value: "127,492", change: "+12%", positive: true },
      { label: "Comments Replied", value: "1,247", change: "+18%", positive: true },
    ],
  },
  "email": {
    title: "Email Marketing",
    subtitle: "Automated flows & performance",
    metrics: [
      { label: "Email Revenue", value: "EUR 48,730", change: "+14.2%", positive: true },
      { label: "Subscribers", value: "127,492", change: "+9.1%", positive: true },
      { label: "Open Rate", value: "42.3%", change: "+2.1%", positive: true },
      { label: "Click Rate", value: "8.7%", change: "+1.4%", positive: true },
    ],
  },
  "settings": {
    title: "Settings",
    subtitle: "Account & preferences",
    metrics: [
      { label: "Integrations", value: "12", change: "+2", positive: true },
      { label: "API Calls", value: "847,200", change: "+5%", positive: true },
      { label: "Team Members", value: "8", change: "0", positive: true },
      { label: "Storage Used", value: "2.4 GB", change: "+0.1GB", positive: false },
    ],
  },
  "support": {
    title: "Support",
    subtitle: "Help & documentation",
    metrics: [
      { label: "Support Tickets", value: "23", change: "-8%", positive: true },
      { label: "Avg Resolution Time", value: "4.2h", change: "-12%", positive: true },
      { label: "Knowledge Base Views", value: "1,247", change: "+18%", positive: true },
      { label: "Chat Sessions", value: "847", change: "+5%", positive: true },
    ],
  },
};

export function InteractiveDashboard() {
  const [activeView, setActiveView] = useState("customer-service");
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0.9, 1], [0, 1]);

  const currentView = dashboardViews[activeView];

  return (
    <div className="w-full h-full bg-white rounded-2xl overflow-hidden flex">
      {/* Sidebar */}
      <div className="w-48 bg-gray-50 border-r flex-shrink-0 flex flex-col">
        <div className="p-4 border-b">
          <h1 className="font-bold text-lg">ainomiq</h1>
        </div>
        <nav className="flex-1 overflow-auto py-2">
          {sidebarItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => setActiveView(item.id)}
                className={`w-full px-4 py-2.5 text-left text-sm flex items-center gap-3 transition-colors ${
                  activeView === item.id
                    ? "bg-blue-50 text-blue-600 font-medium"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                <Icon className="w-4 h-4" />
                {item.label}
              </button>
            );
          })}
        </nav>
        <div className="p-4 border-t space-y-2">
          <button className="w-full px-4 py-2 text-sm text-left text-gray-700 hover:bg-gray-100 rounded transition-colors">
            Settings
          </button>
          <button className="w-full px-4 py-2 text-sm text-left text-gray-700 hover:bg-gray-100 rounded transition-colors">
            Support
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="border-b px-6 py-4 flex items-center justify-between bg-white">
          <div>
            <h2 className="text-xl font-bold">{currentView.title}</h2>
            <p className="text-sm text-gray-600">{currentView.subtitle}</p>
          </div>
          <div className="flex gap-2">
            <button className="px-3 py-1.5 text-xs border rounded hover:bg-gray-50 transition-colors">
              Today
            </button>
            <button className="px-3 py-1.5 text-xs text-blue-600 hover:bg-blue-50 transition-colors">
              7 days
            </button>
            <button className="px-3 py-1.5 text-xs border rounded hover:bg-gray-50 transition-colors">
              14 days
            </button>
            <button className="px-3 py-1.5 text-xs border rounded hover:bg-gray-50 transition-colors">
              30 days
            </button>
            <button className="px-3 py-1.5 text-xs border rounded hover:bg-gray-50 transition-colors">
              90 days
            </button>
            <button className="px-3 py-1.5 text-xs border rounded hover:bg-gray-50 transition-colors ml-2">
              Refresh
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-auto p-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeView}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
            >
              {currentView.metrics.map((metric, i) => (
                <div
                  key={i}
                  className="border rounded-lg p-4 bg-white hover:shadow-md transition-shadow cursor-pointer"
                >
                  <p className="text-sm text-gray-600 mb-1">{metric.label}</p>
                  <p className="text-2xl font-bold mb-1">{metric.value}</p>
                  <p
                    className={`text-xs font-medium ${
                      metric.positive ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {metric.change}
                  </p>
                </div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

        <motion.div
          style={{ opacity }}
          className="text-center text-xs text-gray-500 py-2 border-t bg-gray-50"
        >
          ✨ Click sidebar items to switch views
        </motion.div>
      </div>
    </div>
  );
}
