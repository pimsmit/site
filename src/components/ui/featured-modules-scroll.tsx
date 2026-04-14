"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Headphones, Package, Mail, BarChart3, ChevronRight, ChevronDown, CheckCircle2 } from "lucide-react"

interface ModuleFlow {
  id: string
  icon: React.ElementType
  name: string
  color: string
  bgColor: string
  steps: { label: string; detail: string }[]
  result: string
}

const modules: ModuleFlow[] = [
  {
    id: "cs",
    icon: Headphones,
    name: "Customer Service",
    color: "#3B82F6",
    bgColor: "#EFF6FF",
    steps: [
      { label: "Email or DM received", detail: "All channels monitored 24/7" },
      { label: "Classified automatically", detail: "Order issue? Return? Question?" },
      { label: "Response drafted", detail: "Your brand voice, your data" },
      { label: "Sent or escalated", detail: "Instant reply or routed to team" },
    ],
    result: "Avg. response: 47 seconds",
  },
  {
    id: "inventory",
    icon: Package,
    name: "Inventory",
    color: "#10B981",
    bgColor: "#ECFDF5",
    steps: [
      { label: "Stock synced", detail: "Shopify + warehouse data" },
      { label: "Demand predicted", detail: "Sales velocity & trends" },
      { label: "Restock alert sent", detail: "Before you run out" },
      { label: "Reorder suggested", detail: "Lead times & MOQ calculated" },
    ],
    result: "Zero stockouts last quarter",
  },
  {
    id: "email",
    icon: Mail,
    name: "Email Marketing",
    color: "#8B5CF6",
    bgColor: "#F5F3FF",
    steps: [
      { label: "Event triggered", detail: "Signup, cart, purchase, birthday" },
      { label: "Flow selected", detail: "Welcome, win-back, post-purchase" },
      { label: "Content personalized", detail: "Name, product, segment copy" },
      { label: "Sent at optimal time", detail: "Max open rates automatically" },
    ],
    result: "2,418 emails sent this week",
  },
  {
    id: "performance",
    icon: BarChart3,
    name: "Performance",
    color: "#F59E0B",
    bgColor: "#FFFBEB",
    steps: [
      { label: "Data collected", detail: "Shopify, ads, email, analytics" },
      { label: "True profit calculated", detail: "Revenue minus all costs" },
      { label: "Anomalies detected", detail: "ROAS drops, traffic shifts" },
      { label: "Insights delivered", detail: "Specific recommendations" },
    ],
    result: "Profit margin up 12%",
  },
]

export function FeaturedModulesScroll() {
  const [activeModule, setActiveModule] = useState<string>("cs")
  const [animatingStep, setAnimatingStep] = useState<number>(-1)
  const [showResult, setShowResult] = useState(false)
  const current = modules.find(m => m.id === activeModule)!

  useEffect(() => {
    setAnimatingStep(-1)
    setShowResult(false)
    const timers: NodeJS.Timeout[] = []
    current.steps.forEach((_, i) => {
      timers.push(setTimeout(() => setAnimatingStep(i), 400 + i * 600))
    })
    timers.push(setTimeout(() => setShowResult(true), 400 + current.steps.length * 600 + 300))
    return () => timers.forEach(clearTimeout)
  }, [activeModule])

  return (
    <section className="py-24 md:py-32 px-4 md:px-6 bg-white overflow-hidden">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <span className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-3 block">
            How it works
          </span>
          <h2 className="text-2xl md:text-5xl font-extrabold text-gray-900 tracking-tight mb-3">
            See the automation in action.
          </h2>
          <p className="text-gray-500 text-base md:text-lg max-w-xl mx-auto">
            Click a module to see how it runs — from trigger to result, fully automated.
          </p>
        </div>

        {/* Flow visualization */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeModule}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            className="mb-12 md:mb-16"
          >
            {/* Module title */}
            <div className="flex items-center justify-center gap-3 mb-8 md:mb-10">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center"
                style={{ backgroundColor: current.bgColor }}
              >
                <current.icon className="w-5 h-5" style={{ color: current.color }} />
              </div>
              <h3 className="text-lg md:text-xl font-bold text-gray-900">{current.name}</h3>
            </div>

            {/* MOBILE: Vertical steps */}
            <div className="md:hidden flex flex-col items-center gap-0 px-2">
              {current.steps.map((step, i) => {
                const isActive = animatingStep >= i
                const isAnimating = animatingStep === i

                return (
                  <div key={i} className="flex flex-col items-center">
                    {/* Step row */}
                    <motion.div
                      initial={{ opacity: 0.3 }}
                      animate={{ opacity: isActive ? 1 : 0.3 }}
                      transition={{ duration: 0.4 }}
                      className="flex items-center gap-4 w-full max-w-xs"
                    >
                      {/* Number circle */}
                      <motion.div
                        animate={{
                          backgroundColor: isActive ? current.color : "#E5E7EB",
                          scale: isAnimating ? [1, 1.15, 1] : 1,
                        }}
                        transition={{ duration: 0.4 }}
                        className="w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-bold shrink-0 relative"
                        style={{ boxShadow: isActive ? `0 4px 12px ${current.color}30` : "none" }}
                      >
                        {isActive ? i + 1 : <span className="text-gray-400">{i + 1}</span>}
                        {isAnimating && (
                          <motion.div
                            className="absolute inset-0 rounded-full"
                            style={{ border: `2px solid ${current.color}` }}
                            initial={{ scale: 1, opacity: 0.6 }}
                            animate={{ scale: 1.6, opacity: 0 }}
                            transition={{ duration: 0.8 }}
                          />
                        )}
                      </motion.div>

                      {/* Text */}
                      <div>
                        <motion.p
                          animate={{ color: isActive ? "#111827" : "#9CA3AF" }}
                          className="font-semibold text-sm leading-tight"
                        >
                          {step.label}
                        </motion.p>
                        <motion.p
                          animate={{ color: isActive ? "#6B7280" : "#D1D5DB" }}
                          className="text-xs mt-0.5"
                        >
                          {step.detail}
                        </motion.p>
                      </div>
                    </motion.div>

                    {/* Vertical connector */}
                    {i < current.steps.length - 1 && (
                      <div className="flex flex-col items-center py-1.5" style={{ marginLeft: "-120px" }}>
                        <div className="w-0.5 h-5 bg-gray-200 relative overflow-hidden rounded-full">
                          <motion.div
                            className="absolute inset-x-0 top-0 rounded-full"
                            style={{ backgroundColor: current.color }}
                            initial={{ height: "0%" }}
                            animate={{ height: animatingStep > i ? "100%" : "0%" }}
                            transition={{ duration: 0.3 }}
                          />
                        </div>
                      </div>
                    )}
                  </div>
                )
              })}

              {/* Result badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: showResult ? 1 : 0, scale: showResult ? 1 : 0.8 }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
                className="mt-4"
              >
                <div
                  className="flex items-center gap-2 px-4 py-2.5 rounded-full border"
                  style={{ backgroundColor: current.bgColor, borderColor: `${current.color}30` }}
                >
                  <CheckCircle2 className="w-4 h-4" style={{ color: current.color }} />
                  <span className="text-xs font-semibold" style={{ color: current.color }}>
                    {current.result}
                  </span>
                </div>
              </motion.div>
            </div>

            {/* DESKTOP: Horizontal steps */}
            <div className="hidden md:flex items-start justify-center gap-0 pb-4">
              {current.steps.map((step, i) => {
                const isActive = animatingStep >= i
                const isAnimating = animatingStep === i

                return (
                  <div key={i} className="flex items-start">
                    <motion.div
                      initial={{ opacity: 0.3, scale: 0.95 }}
                      animate={{
                        opacity: isActive ? 1 : 0.3,
                        scale: isAnimating ? 1.03 : 1,
                      }}
                      transition={{ duration: 0.4, ease: "easeOut" }}
                      className="relative flex flex-col items-center text-center w-[180px]"
                    >
                      <motion.div
                        animate={{
                          backgroundColor: isActive ? current.color : "#E5E7EB",
                          scale: isAnimating ? [1, 1.2, 1] : 1,
                        }}
                        transition={{ duration: 0.4, scale: { duration: 0.5 } }}
                        className="w-12 h-12 rounded-full flex items-center justify-center text-white text-sm font-bold mb-3 shadow-sm"
                        style={{ boxShadow: isActive ? `0 4px 16px ${current.color}30` : "none" }}
                      >
                        {isActive ? (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ type: "spring", stiffness: 500, damping: 25 }}
                          >
                            {i + 1}
                          </motion.div>
                        ) : (
                          <span className="text-gray-400">{i + 1}</span>
                        )}
                      </motion.div>

                      {isAnimating && (
                        <motion.div
                          className="absolute top-0 w-12 h-12 rounded-full"
                          style={{ border: `2px solid ${current.color}` }}
                          initial={{ scale: 1, opacity: 0.6 }}
                          animate={{ scale: 1.8, opacity: 0 }}
                          transition={{ duration: 0.8 }}
                        />
                      )}

                      <motion.p
                        animate={{ color: isActive ? "#111827" : "#9CA3AF" }}
                        className="font-semibold text-sm mb-1 leading-tight"
                      >
                        {step.label}
                      </motion.p>
                      <motion.p
                        animate={{ color: isActive ? "#6B7280" : "#D1D5DB" }}
                        className="text-xs leading-relaxed"
                      >
                        {step.detail}
                      </motion.p>
                    </motion.div>

                    {i < current.steps.length - 1 && (
                      <div className="flex items-center pt-5 px-2">
                        <motion.div
                          animate={{ opacity: animatingStep > i ? 1 : 0.2 }}
                          transition={{ duration: 0.3 }}
                          className="relative"
                        >
                          <div className="w-12 h-0.5 bg-gray-200 relative overflow-hidden rounded-full">
                            <motion.div
                              className="absolute inset-y-0 left-0 rounded-full"
                              style={{ backgroundColor: current.color }}
                              initial={{ width: "0%" }}
                              animate={{ width: animatingStep > i ? "100%" : "0%" }}
                              transition={{ duration: 0.4 }}
                            />
                          </div>
                          <motion.div
                            animate={{ x: animatingStep > i ? 0 : -4, opacity: animatingStep > i ? 1 : 0.2 }}
                            className="absolute -right-1 -top-[5px]"
                          >
                            <ChevronRight className="w-3 h-3" style={{ color: animatingStep > i ? current.color : "#D1D5DB" }} />
                          </motion.div>
                        </motion.div>
                      </div>
                    )}
                  </div>
                )
              })}

              {/* Result connector + badge */}
              <div className="flex items-center pt-5 px-2">
                <motion.div
                  animate={{ opacity: showResult ? 1 : 0.2 }}
                  className="w-12 h-0.5 bg-gray-200 relative overflow-hidden rounded-full"
                >
                  <motion.div
                    className="absolute inset-y-0 left-0 rounded-full"
                    style={{ backgroundColor: current.color }}
                    initial={{ width: "0%" }}
                    animate={{ width: showResult ? "100%" : "0%" }}
                    transition={{ duration: 0.4 }}
                  />
                </motion.div>
              </div>

              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: showResult ? 1 : 0, scale: showResult ? 1 : 0.8 }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
                className="pt-1"
              >
                <div
                  className="flex items-center gap-2 px-4 py-2.5 rounded-full border whitespace-nowrap"
                  style={{ backgroundColor: current.bgColor, borderColor: `${current.color}30` }}
                >
                  <CheckCircle2 className="w-4 h-4" style={{ color: current.color }} />
                  <span className="text-xs font-semibold" style={{ color: current.color }}>
                    {current.result}
                  </span>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Dock — below the flow */}
        <div className="flex justify-center">
          <div className="inline-flex items-end gap-1.5 md:gap-2 p-2 rounded-2xl bg-gray-50 border border-gray-100">
            {modules.map((mod) => {
              const Icon = mod.icon
              const isActive = activeModule === mod.id
              return (
                <button
                  key={mod.id}
                  onClick={() => setActiveModule(mod.id)}
                  className="group relative flex flex-col items-center"
                >
                  <span
                    className={`absolute -top-10 left-1/2 -translate-x-1/2 rounded-md border border-gray-100 bg-white px-2 py-1 text-xs whitespace-nowrap text-gray-700 shadow-sm transition-opacity duration-200 ${
                      isActive ? "opacity-100" : "opacity-0 group-hover:opacity-100"
                    }`}
                  >
                    {mod.name}
                  </span>
                  <motion.div
                    animate={{ scale: isActive ? 1.15 : 1, y: isActive ? -4 : 0 }}
                    transition={{ type: "spring", stiffness: 400, damping: 25 }}
                    className={`relative w-12 h-12 md:w-16 md:h-16 rounded-xl flex items-center justify-center transition-all duration-200 border ${
                      isActive
                        ? "border-gray-200 shadow-lg bg-white"
                        : "border-transparent bg-white hover:border-gray-200 hover:shadow-md"
                    }`}
                    style={isActive ? { boxShadow: `0 8px 24px ${mod.color}20` } : {}}
                  >
                    <Icon
                      className="w-6 h-6 md:w-8 md:h-8 transition-colors duration-200"
                      style={{ color: isActive ? mod.color : "#9CA3AF" }}
                    />
                  </motion.div>
                  {isActive && (
                    <motion.div
                      layoutId="activeDot"
                      className="w-1.5 h-1.5 rounded-full mt-1.5"
                      style={{ backgroundColor: mod.color }}
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}
                  {!isActive && <div className="w-1.5 h-1.5 mt-1.5" />}
                </button>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
