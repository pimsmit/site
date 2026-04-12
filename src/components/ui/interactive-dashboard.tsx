"use client";
import React, { useState } from "react";
import { motion, AnimatePresence, useTransform, useScroll } from "framer-motion";
import { Bot, ChartColumn, Package, Mail, Gauge, Workflow, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const modules = [
  { icon: Bot, title: "AI Customer Service", description: "24/7 intelligent support" },
  { icon: ChartColumn, title: "AI Ad Manager", description: "Automated ad optimization" },
  { icon: Package, title: "Smart Inventory", description: "Forecasts stock needs" },
  { icon: Mail, title: "Email Marketing", description: "Personalized flows" },
  { icon: Gauge, title: "Performance Analytics", description: "Real-time dashboards" },
  { icon: Workflow, title: "Workflow Automations", description: "Connect your systems" },
];

const mockDashboards = {
  "AI Customer Service": {
    title: "Customer Service",
    subtitle: "AI-powered support dashboard",
    metrics: [
      { label: "Tickets Handled", value: "1,247", change: "+12.3%", positive: true },
      { label: "Avg Response Time", value: "2.4 min", change: "-18%", positive: true },
      { label: "CSAT Score", value: "4.8/5", change: "+0.3", positive: true },
      { label: "Escalations", value: "23", change: "-8%", positive: true },
    ],
  },
  "AI Ad Manager": {
    title: "Ad Performance",
    subtitle: "Real-time campaign analytics",
    metrics: [
      { label: "Ad Spend", value: "EUR 12,450", change: "+5.2%", positive: false },
      { label: "ROAS", value: "3.69x", change: "+7.0%", positive: true },
      { label: "CTR", value: "2.87%", change: "+1.2%", positive: true },
      { label: "Conversions", value: "847", change: "+8.7%", positive: true },
    ],
  },
  "Smart Inventory": {
    title: "Inventory",
    subtitle: "Stock management & forecasting",
    metrics: [
      { label: "Stock Level", value: "12,847", change: "-3%", positive: false },
      { label: "Stockouts Prevented", value: "34", change: "+12%", positive: true },
      { label: "Overstock Reduction", value: "30%", change: "+5%", positive: true },
      { label: "Reorder Alerts", value: "8", change: "0%", positive: true },
    ],
  },
  "Email Marketing": {
    title: "Email Campaigns",
    subtitle: "Automated flows & performance",
    metrics: [
      { label: "Email Revenue", value: "EUR 48,730", change: "+14.2%", positive: true },
      { label: "Subscribers", value: "127,492", change: "+9.1%", positive: true },
      { label: "Open Rate", value: "42.3%", change: "+2.1%", positive: true },
      { label: "Click Rate", value: "8.7%", change: "+1.4%", positive: true },
    ],
  },
  "Performance Analytics": {
    title: "Performance",
    subtitle: "E-commerce profit command center",
    metrics: [
      { label: "Revenue", value: "EUR 124,500", change: "+12.3%", positive: true },
      { label: "Orders", value: "42,847", change: "+8.7%", positive: true },
      { label: "AOV", value: "EUR 72.90", change: "+4.1%", positive: true },
      { label: "Net Profit", value: "EUR 47,800", change: "+18.5%", positive: true },
    ],
  },
  "Workflow Automations": {
    title: "Automations",
    subtitle: "Connected workflows & triggers",
    metrics: [
      { label: "Active Workflows", value: "34", change: "+3", positive: true },
      { label: "Tasks Automated", value: "12,847", change: "+18%", positive: true },
      { label: "Time Saved", value: "240h", change: "+12h", positive: true },
      { label: "Success Rate", value: "99.2%", change: "+0.3%", positive: true },
    ],
  },
};

export function InteractiveDashboard() {
  const [activeModule, setActiveModule] = useState<string | null>(null);
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0.9, 1], [0, 1]);

  const handleModuleClick = (title: string) => {
    setActiveModule(title);
  };

  const handleBack = () => {
    setActiveModule(null);
  };

  return (
    <div className="w-full h-full bg-white rounded-2xl overflow-hidden relative">
      <AnimatePresence mode="wait">
        {!activeModule ? (
          <motion.div
            key="modules"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="p-6 h-full flex flex-col"
          >
            <h2 className="text-xl font-bold mb-4">Active modules</h2>
            <div className="grid gap-3 mb-4 flex-1 overflow-auto">
              {modules.map((mod, i) => (
                <button
                  key={i}
                  onClick={() => handleModuleClick(mod.title)}
                  className="border rounded-lg p-4 hover:shadow-md hover:border-blue-500 transition-all bg-blue-50/30 text-left group cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center shrink-0">
                      <mod.icon className="w-5 h-5 text-blue-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-base mb-1">{mod.title}</h3>
                      <p className="text-xs text-gray-600 truncate">{mod.description}</p>
                    </div>
                    <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-blue-600 transition-colors shrink-0" />
                  </div>
                </button>
              ))}
            </div>
            <motion.div
              style={{ opacity }}
              className="text-center text-xs text-gray-500 py-2"
            >
              ✨ Click on a module to explore
            </motion.div>
          </motion.div>
        ) : (
          <motion.div
            key="dashboard"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="p-6 h-full flex flex-col"
          >
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-bold">{mockDashboards[activeModule].title}</h2>
                <p className="text-sm text-gray-600">{mockDashboards[activeModule].subtitle}</p>
              </div>
              <Button onClick={handleBack} variant="outline" size="sm">
                ← Back
              </Button>
            </div>
            <div className="grid grid-cols-2 gap-4 flex-1 overflow-auto">
              {mockDashboards[activeModule].metrics.map((metric, i) => (
                <div key={i} className="border rounded-lg p-4 bg-white hover:shadow-md transition-shadow">
                  <p className="text-sm text-gray-600 mb-1">{metric.label}</p>
                  <p className="text-2xl font-bold mb-1">{metric.value}</p>
                  <p className={`text-xs ${metric.positive ? "text-green-600" : "text-red-600"}`}>
                    {metric.change}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
