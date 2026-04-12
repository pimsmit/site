"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bot, BarChart3, Package, X } from "lucide-react";
import { Button } from "./button";

const modules = [
  {
    icon: Bot,
    title: "AI Customer Service",
    description: "Handles customer service inquiries, keeps your brand voice alive and personal.",
  },
  {
    icon: BarChart3,
    title: "AI Ad Manager",
    description: "Automates ad optimization, bid customization, and creative — powered by real-time data.",
  },
  {
    icon: Package,
    title: "Smart Inventory",
    description: "Forecasts stock needs and automates stock and supplies management.",
  },
];

export function InteractiveDashboard() {
  const [showApp, setShowApp] = useState(false);

  return (
    <div className="w-full h-full bg-white rounded-2xl overflow-hidden relative">
      <AnimatePresence mode="wait">
        {!showApp ? (
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
                <div
                  key={i}
                  className="border rounded-lg p-4 hover:shadow-md transition-shadow bg-blue-50/30"
                >
                  <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center mb-3">
                    <mod.icon className="w-5 h-5 text-blue-600" />
                  </div>
                  <h3 className="font-semibold text-base mb-1">{mod.title}</h3>
                  <p className="text-xs text-gray-600">{mod.description}</p>
                </div>
              ))}
            </div>
            <Button
              onClick={() => setShowApp(true)}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white"
            >
              Get started
            </Button>
          </motion.div>
        ) : (
          <motion.div
            key="app"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="w-full h-full bg-white flex relative"
          >
            {/* Close button */}
            <button
              onClick={() => setShowApp(false)}
              className="absolute top-4 right-4 z-50 w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Sidebar */}
            <div className="w-48 bg-gray-50 border-r p-4 flex flex-col text-sm">
              <div className="font-bold text-lg mb-6">ainomiq</div>
              <nav className="space-y-1 flex-1">
                <div className="px-3 py-2 text-gray-500">Overview</div>
                <div className="px-3 py-2 bg-blue-50 text-blue-600 rounded font-medium">Performance</div>
                <div className="px-3 py-2 text-gray-500">Automations</div>
                <div className="px-3 py-2 text-gray-500">Stock Management</div>
                <div className="px-3 py-2 text-gray-500">Customer Service</div>
                <div className="px-3 py-2 text-gray-500">Instagram</div>
                <div className="px-3 py-2 text-gray-500">Email Marketing</div>
              </nav>
              <div className="border-t pt-4 space-y-1">
                <div className="px-3 py-2 text-gray-500">Settings</div>
                <div className="px-3 py-2 text-gray-500">Support</div>
              </div>
            </div>

            {/* Main content */}
            <div className="flex-1 overflow-auto p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h1 className="text-2xl font-bold">Performance</h1>
                  <p className="text-sm text-gray-500">E-commerce profit command center</p>
                </div>
                <Button variant="outline" size="sm">Refresh</Button>
              </div>

              {/* Time range tabs */}
              <div className="flex gap-2 mb-6 text-sm">
                <button className="px-4 py-2 rounded border bg-white">Today</button>
                <button className="px-4 py-2 rounded bg-blue-50 text-blue-600 border-blue-200">7 days</button>
                <button className="px-4 py-2 rounded border bg-white">14 days</button>
                <button className="px-4 py-2 rounded border bg-white">30 days</button>
                <button className="px-4 py-2 rounded border bg-white">90 days</button>
              </div>

              {/* Metrics grid */}
              <div className="grid grid-cols-4 gap-4 mb-6">
                <MetricCard label="Revenue" value="EUR 3,124,500" change="+12.3%" />
                <MetricCard label="Orders" value="42,847" change="+8.7%" />
                <MetricCard label="AOV" value="EUR 72,90" change="+4.1%" />
                <MetricCard label="Ad Spend" value="EUR 847,200" change="+5.2%" />
                <MetricCard label="ROAS" value="3.69x" change="+7.0%" positive />
                <MetricCard label="CPC" value="EUR 1,24" change="-3.8%" positive />
                <MetricCard label="CTR" value="2.87%" change="+1.2%" />
                <MetricCard label="Purchases" value="42,847" change="+8.7%" />
                <MetricCard label="Email Revenue" value="EUR 487,300" change="+14.2%" />
                <MetricCard label="Subscribers" value="127,492" change="+9.1%" />
                <MetricCard label="Net Profit" value="EUR 1,247,800" change="+18.5%" positive />
                <MetricCard label="Blended ROAS" value="4.12x" change="+11.3%" positive />
              </div>

              {/* Chart placeholder */}
              <div className="bg-white border rounded-lg p-6 mb-6">
                <h3 className="font-semibold mb-4">Revenue vs Ad Spend</h3>
                <div className="h-64 bg-gradient-to-br from-green-50 to-blue-50 rounded flex items-center justify-center text-gray-400">
                  Interactive chart area
                </div>
              </div>

              {/* Profit breakdown */}
              <div className="bg-white border rounded-lg p-6">
                <h3 className="font-semibold mb-4">Profit Breakdown</h3>
                <div className="h-12 bg-gradient-to-r from-green-500 via-yellow-400 to-red-400 rounded mb-4"></div>
                <div className="grid grid-cols-5 gap-4 text-sm">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <div className="w-3 h-3 rounded bg-green-500"></div>
                      <span className="text-gray-600">Revenue</span>
                    </div>
                    <div className="font-bold">EUR 3,124,500</div>
                    <div className="text-xs text-gray-500">100.0%</div>
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <div className="w-3 h-3 rounded bg-red-400"></div>
                      <span className="text-gray-600">COGS</span>
                    </div>
                    <div className="font-bold">EUR 1,124,800</div>
                    <div className="text-xs text-gray-500">36.0%</div>
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <div className="w-3 h-3 rounded bg-orange-400"></div>
                      <span className="text-gray-600">Shipping</span>
                    </div>
                    <div className="font-bold">EUR 187,470</div>
                    <div className="text-xs text-gray-500">6.0%</div>
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <div className="w-3 h-3 rounded bg-purple-400"></div>
                      <span className="text-gray-600">Gateway Fees</span>
                    </div>
                    <div className="font-bold">EUR 62,490</div>
                    <div className="text-xs text-gray-500">2.0%</div>
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <div className="w-3 h-3 rounded bg-blue-500"></div>
                      <span className="text-gray-600">Ad Spend</span>
                    </div>
                    <div className="font-bold">EUR 847,200</div>
                    <div className="text-xs text-gray-500">27.1%</div>
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t">
                  <div className="flex items-center gap-2 mb-1">
                    <div className="w-3 h-3 rounded bg-gray-800"></div>
                    <span className="text-gray-600">Net Profit</span>
                  </div>
                  <div className="font-bold text-xl">EUR 1,247,800</div>
                  <div className="text-sm text-gray-500">39.9%</div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function MetricCard({ label, value, change, positive }: { label: string; value: string; change: string; positive?: boolean }) {
  const isPositive = positive !== undefined ? positive : change.startsWith("+");
  return (
    <div className="bg-white border rounded-lg p-4">
      <div className="text-xs text-gray-500 mb-1">{label}</div>
      <div className="text-xl font-bold mb-1">{value}</div>
      <div className={`text-xs ${isPositive ? "text-green-600" : "text-red-600"}`}>{change}</div>
    </div>
  );
}
