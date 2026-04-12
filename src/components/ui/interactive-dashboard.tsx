"use client";
import React, { useState } from "react";
import { motion, AnimatePresence, useTransform, useScroll } from "framer-motion";
import { 
  Bot, ChartColumn, Package, Mail, FileText, BarChart3, 
  UserPlus, TrendingUp, Settings, ChevronDown, ChevronRight 
} from "lucide-react";
import { Button } from "@/components/ui/button";

const modules = [
  {
    icon: ChartColumn,
    title: "AI Ad Manager",
    description: "Autonomous ad creation, optimization, and scaling — powered by dedicated AI agents.",
    mockData: [
      { label: "Ad Spend", value: "EUR 12,450", change: "+5.2%", positive: false },
      { label: "ROAS", value: "3.69x", change: "+7.0%", positive: true },
      { label: "CTR", value: "2.87%", change: "+1.2%", positive: true },
      { label: "Conversions", value: "847", change: "+8.7%", positive: true },
    ],
  },
  {
    icon: Bot,
    title: "AI Customer Service",
    description: "AI handles support across all channels. Learns your brand voice and policies.",
    mockData: [
      { label: "Tickets Handled", value: "1,247", change: "+12.3%", positive: true },
      { label: "Avg Response Time", value: "2.4 min", change: "-18%", positive: true },
      { label: "CSAT Score", value: "4.8/5", change: "+0.3", positive: true },
      { label: "Escalations", value: "23", change: "-8%", positive: true },
    ],
  },
  {
    icon: Package,
    title: "Smart Inventory",
    description: "Real-time stock tracking with automated alerts and supplier management.",
    mockData: [
      { label: "Stock Level", value: "12,847", change: "-3%", positive: false },
      { label: "Stockouts Prevented", value: "34", change: "+12%", positive: true },
      { label: "Overstock Reduction", value: "30%", change: "+5%", positive: true },
      { label: "Reorder Alerts", value: "8", change: "0%", positive: true },
    ],
  },
  {
    icon: Mail,
    title: "Email Marketing",
    description: "Full Klaviyo integration for flows, campaigns, and subscriber analytics.",
    mockData: [
      { label: "Email Revenue", value: "EUR 48,730", change: "+14.2%", positive: true },
      { label: "Subscribers", value: "127,492", change: "+9.1%", positive: true },
      { label: "Open Rate", value: "42.3%", change: "+2.1%", positive: true },
      { label: "Click Rate", value: "8.7%", change: "+1.4%", positive: true },
    ],
  },
  {
    icon: FileText,
    title: "Content Pipeline",
    description: "Google Drive integration turns your raw content into production-ready ads.",
    mockData: [
      { label: "Content Items", value: "247", change: "+18%", positive: true },
      { label: "Ads Generated", value: "847", change: "+12%", positive: true },
      { label: "Processing Time", value: "2.4h", change: "-18%", positive: true },
      { label: "Quality Score", value: "4.8/5", change: "+0.3", positive: true },
    ],
  },
  {
    icon: BarChart3,
    title: "Live Analytics",
    description: "Real-time data from all platforms in one unified view.",
    mockData: [
      { label: "Revenue", value: "EUR 124,500", change: "+12.3%", positive: true },
      { label: "Orders", value: "42,847", change: "+8.7%", positive: true },
      { label: "AOV", value: "EUR 72.90", change: "+4.1%", positive: true },
      { label: "Net Profit", value: "EUR 47,800", change: "+18.5%", positive: true },
    ],
  },
  {
    icon: UserPlus,
    title: "Onboarding System",
    description: "Guided setup for new clients with smart questionnaires and sheet output.",
    mockData: [
      { label: "Clients Onboarded", value: "34", change: "+12%", positive: true },
      { label: "Avg Setup Time", value: "4.2h", change: "-18%", positive: true },
      { label: "Completion Rate", value: "94%", change: "+3%", positive: true },
      { label: "Satisfaction", value: "4.8/5", change: "+0.3", positive: true },
    ],
  },
  {
    icon: TrendingUp,
    title: "Performance & Profit",
    description: "Profit command center with revenue tracking, cost analysis, and growth metrics.",
    mockData: [
      { label: "Revenue", value: "EUR 3,124,500", change: "+12.3%", positive: true },
      { label: "Net Profit", value: "EUR 1,247,800", change: "+18.5%", positive: true },
      { label: "Profit Margin", value: "39.9%", change: "+2.1%", positive: true },
      { label: "Blended ROAS", value: "4.12x", change: "+11.3%", positive: true },
    ],
  },
  {
    icon: Settings,
    title: "Account & Settings",
    description: "Full control over integrations, notifications, navigation, and data.",
    mockData: [
      { label: "Integrations", value: "12", change: "+2", positive: true },
      { label: "API Calls", value: "847,200", change: "+5%", positive: true },
      { label: "Team Members", value: "8", change: "0", positive: true },
      { label: "Storage Used", value: "2.4 GB", change: "+0.1GB", positive: false },
    ],
  },
];

export function InteractiveDashboard() {
  const [expandedModule, setExpandedModule] = useState<string | null>(null);
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0.9, 1], [0, 1]);

  const handleModuleClick = (title: string) => {
    setExpandedModule(expandedModule === title ? null : title);
  };

  return (
    <div className="w-full h-full bg-gradient-to-br from-blue-50 to-white overflow-auto">
      <div className="max-w-6xl mx-auto px-6 py-12">
        {/* Hero */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">
            Your AI-powered
            <br />
            e-commerce operator
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
            Ainomiq connects your entire e-commerce stack and runs it with AI.
            Automated ad creation and optimization, AI customer service, smart
            inventory management, and data-driven email marketing — one
            platform, zero manual work.
          </p>
          <div className="flex gap-3 justify-center">
            <Button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5">
              Start for free
            </Button>
            <Button variant="outline" className="px-6 py-2.5">
              Learn more
            </Button>
          </div>
        </div>

        {/* Modules Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {modules.map((module, i) => {
            const Icon = module.icon;
            const isExpanded = expandedModule === module.title;

            return (
              <motion.div
                key={i}
                layout
                className={`bg-white rounded-lg border hover:shadow-lg transition-all cursor-pointer ${
                  isExpanded ? "col-span-full" : ""
                }`}
                onClick={() => handleModuleClick(module.title)}
              >
                <div className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center shrink-0">
                        <Icon className="w-5 h-5 text-blue-600" />
                      </div>
                      <h3 className="font-semibold text-lg">{module.title}</h3>
                    </div>
                    <ChevronRight
                      className={`w-5 h-5 text-gray-400 transition-transform ${
                        isExpanded ? "rotate-90" : ""
                      }`}
                    />
                  </div>
                  <p className="text-sm text-gray-600 mb-4">{module.description}</p>

                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t">
                          {module.mockData.map((metric, j) => (
                            <div key={j} className="bg-gray-50 rounded-lg p-4">
                              <p className="text-xs text-gray-600 mb-1">{metric.label}</p>
                              <p className="text-xl font-bold mb-1">{metric.value}</p>
                              <p
                                className={`text-xs font-medium ${
                                  metric.positive ? "text-green-600" : "text-red-600"
                                }`}
                              >
                                {metric.change}
                              </p>
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          style={{ opacity }}
          className="text-center text-sm text-gray-500 mt-8"
        >
          ✨ Click on any module to see live metrics
        </motion.div>
      </div>
    </div>
  );
}
