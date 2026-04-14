"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Headphones, Package, Mail, BarChart3, ArrowRight, ChevronRight } from "lucide-react"

interface ModuleFlow {
  id: string
  icon: React.ElementType
  name: string
  color: string
  bgColor: string
  steps: { label: string; detail: string }[]
}

const modules: ModuleFlow[] = [
  {
    id: "cs",
    icon: Headphones,
    name: "Customer Service",
    color: "#3B82F6",
    bgColor: "#EFF6FF",
    steps: [
      { label: "Customer sends email or DM", detail: "Gmail, Instagram, Facebook — all channels monitored 24/7" },
      { label: "System reads and classifies", detail: "Order issue? Return? Question? Automatically categorized" },
      { label: "Drafts personalized response", detail: "Using your brand voice, order data, and FAQ knowledge" },
      { label: "Sends or escalates", detail: "Routine questions answered instantly. Complex issues routed to your team" },
    ],
  },
  {
    id: "inventory",
    icon: Package,
    name: "Inventory",
    color: "#10B981",
    bgColor: "#ECFDF5",
    steps: [
      { label: "Tracks stock in real-time", detail: "Syncs with Shopify, warehouse, and supplier data" },
      { label: "Predicts demand patterns", detail: "Analyzes sales velocity, seasonality, and trends" },
      { label: "Sends restock alerts", detail: "Before you run out — not after" },
      { label: "Suggests reorder quantities", detail: "Based on lead times, MOQ, and cash flow" },
    ],
  },
  {
    id: "email",
    icon: Mail,
    name: "Email Marketing",
    color: "#8B5CF6",
    bgColor: "#F5F3FF",
    steps: [
      { label: "Customer triggers event", detail: "New signup, abandoned cart, purchase, delivery, birthday" },
      { label: "Selects the right flow", detail: "Welcome series, win-back, post-purchase — all pre-built" },
      { label: "Personalizes content", detail: "Name, product, segment-specific copy and offers" },
      { label: "Sends at optimal time", detail: "Maximizing open rates and conversions automatically" },
    ],
  },
  {
    id: "performance",
    icon: BarChart3,
    name: "Performance",
    color: "#F59E0B",
    bgColor: "#FFFBEB",
    steps: [
      { label: "Collects all your data", detail: "Shopify, ads, email, analytics — one unified source" },
      { label: "Calculates true profit", detail: "Revenue minus COGS, ads, shipping, returns, fees" },
      { label: "Spots trends and anomalies", detail: "ROAS drops, conversion changes, traffic shifts" },
      { label: "Delivers actionable insights", detail: "Not just charts — specific recommendations you can act on" },
    ],
  },
]

export function FeaturedModulesScroll() {
  const [activeModule, setActiveModule] = useState<string>("cs")
  const current = modules.find(m => m.id === activeModule)!

  return (
    <section className="py-24 md:py-32 px-6 bg-white overflow-hidden">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-3 block">
            How it works
          </span>
          <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900 tracking-tight mb-4">
            See the automation in action.
          </h2>
          <p className="text-gray-500 text-lg max-w-xl mx-auto">
            Click a module to see how it runs — from trigger to result, fully automated.
          </p>
        </div>

        {/* Dock */}
        <div className="flex justify-center mb-16">
          <div className="inline-flex items-end gap-2 p-2 rounded-2xl bg-gray-50 border border-gray-100">
            {modules.map((mod) => {
              const Icon = mod.icon
              const isActive = activeModule === mod.id
              return (
                <button
                  key={mod.id}
                  onClick={() => setActiveModule(mod.id)}
                  className="group relative flex flex-col items-center"
                >
                  {/* Tooltip */}
                  <span
                    className={`absolute -top-10 left-1/2 -translate-x-1/2 rounded-md border border-gray-100 bg-white px-2 py-1 text-xs whitespace-nowrap text-gray-700 shadow-sm transition-opacity duration-200 ${
                      isActive ? "opacity-100" : "opacity-0 group-hover:opacity-100"
                    }`}
                  >
                    {mod.name}
                  </span>
                  <motion.div
                    animate={{
                      scale: isActive ? 1.15 : 1,
                      y: isActive ? -4 : 0,
                    }}
                    transition={{ type: "spring", stiffness: 400, damping: 25 }}
                    className={`relative w-14 h-14 md:w-16 md:h-16 rounded-xl flex items-center justify-center transition-all duration-200 border ${
                      isActive
                        ? "border-gray-200 shadow-lg bg-white"
                        : "border-transparent bg-white hover:border-gray-200 hover:shadow-md"
                    }`}
                    style={isActive ? { boxShadow: `0 8px 24px ${mod.color}20` } : {}}
                  >
                    <Icon
                      className="w-7 h-7 md:w-8 md:h-8 transition-colors duration-200"
                      style={{ color: isActive ? mod.color : "#9CA3AF" }}
                    />
                  </motion.div>
                  {/* Active dot */}
                  {isActive && (
                    <motion.div
                      layoutId="activeDot"
                      className="w-1.5 h-1.5 rounded-full mt-2"
                      style={{ backgroundColor: mod.color }}
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}
                  {!isActive && <div className="w-1.5 h-1.5 mt-2" />}
                </button>
              )
            })}
          </div>
        </div>

        {/* Flow visualization */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeModule}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="max-w-3xl mx-auto"
          >
            {/* Module title */}
            <div className="flex items-center gap-3 mb-8">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center"
                style={{ backgroundColor: current.bgColor }}
              >
                <current.icon className="w-5 h-5" style={{ color: current.color }} />
              </div>
              <h3 className="text-xl font-bold text-gray-900">{current.name}</h3>
            </div>

            {/* Flow steps */}
            <div className="space-y-0">
              {current.steps.map((step, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 + 0.1, duration: 0.3 }}
                >
                  <div className="flex gap-4">
                    {/* Left: step indicator + connector line */}
                    <div className="flex flex-col items-center">
                      <div
                        className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold shrink-0"
                        style={{ backgroundColor: current.color }}
                      >
                        {i + 1}
                      </div>
                      {i < current.steps.length - 1 && (
                        <div className="w-0.5 h-full min-h-[40px] my-1" style={{ backgroundColor: `${current.color}20` }} />
                      )}
                    </div>

                    {/* Right: content */}
                    <div className="pb-8 pt-1">
                      <p className="font-semibold text-gray-900 mb-1">{step.label}</p>
                      <p className="text-sm text-gray-500 leading-relaxed">{step.detail}</p>
                    </div>
                  </div>
                </motion.div>
              ))}

              {/* Result */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: current.steps.length * 0.1 + 0.15, duration: 0.3 }}
                className="flex gap-4"
              >
                <div className="flex flex-col items-center">
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center shrink-0"
                    style={{ backgroundColor: current.bgColor }}
                  >
                    <ChevronRight className="w-4 h-4" style={{ color: current.color }} />
                  </div>
                </div>
                <div className="pt-1">
                  <p className="text-sm font-medium" style={{ color: current.color }}>
                    Fully automated — no manual work required.
                  </p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  )
}
