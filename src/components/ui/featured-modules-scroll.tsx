"use client"

import { useState, useEffect, useCallback } from "react"
import { motion, AnimatePresence, useMotionValue, useTransform, animate } from "framer-motion"
import { Headphones, Package, Mail, BarChart3, CheckCircle2, Zap, Inbox, Brain, PenTool, Send, BoxesIcon, TrendingUp, Bell, ShoppingCart, Activity, GitBranch, UserCheck, Clock, Satellite, Calculator, Search, Lightbulb } from "lucide-react"

interface ModuleFlow {
  id: string
  icon: React.ElementType
  name: string
  color: string
  bgColor: string
  glowColor: string
  steps: { label: string; detail: string; icon: React.ElementType }[]
  result: string
  trigger: string
}

const modules: ModuleFlow[] = [
  {
    id: "cs",
    icon: Headphones,
    name: "Customer Service",
    color: "#3B82F6",
    bgColor: "#EFF6FF",
    glowColor: "59, 130, 246",
    trigger: "New message received",
    steps: [
      { label: "Message received", detail: "Email, DM, or comment", icon: Inbox },
      { label: "Auto-classified", detail: "Return? Question? Complaint?", icon: Brain },
      { label: "Response drafted", detail: "Your tone, your data", icon: PenTool },
      { label: "Sent or escalated", detail: "Reply in 47 seconds avg.", icon: Send },
    ],
    result: "Avg. response: 47s",
  },
  {
    id: "inventory",
    icon: Package,
    name: "Inventory",
    color: "#10B981",
    bgColor: "#ECFDF5",
    glowColor: "16, 185, 129",
    trigger: "Stock level changed",
    steps: [
      { label: "Stock synced", detail: "Shopify + warehouse", icon: BoxesIcon },
      { label: "Demand predicted", detail: "Velocity & trends", icon: TrendingUp },
      { label: "Alert triggered", detail: "Before you run out", icon: Bell },
      { label: "Reorder suggested", detail: "MOQ & lead times", icon: ShoppingCart },
    ],
    result: "Zero stockouts",
  },
  {
    id: "email",
    icon: Mail,
    name: "Email Marketing",
    color: "#8B5CF6",
    bgColor: "#F5F3FF",
    glowColor: "139, 92, 246",
    trigger: "Campaign created",
    steps: [
      { label: "Audience built", detail: "Segments, filters, lists", icon: UserCheck },
      { label: "Content generated", detail: "Subject, body, design", icon: Activity },
      { label: "A/B tested", detail: "Subject lines, send times", icon: GitBranch },
      { label: "Sent & tracked", detail: "Opens, clicks, revenue", icon: Clock },
    ],
    result: "2,418 campaigns sent this week",
  },
  {
    id: "performance",
    icon: BarChart3,
    name: "Performance",
    color: "#F59E0B",
    bgColor: "#FFFBEB",
    glowColor: "245, 158, 11",
    trigger: "Data refresh cycle",
    steps: [
      { label: "Data collected", detail: "All platforms synced", icon: Satellite },
      { label: "Profit calculated", detail: "Revenue minus all costs", icon: Calculator },
      { label: "Anomaly detected", detail: "ROAS drop, traffic shift", icon: Search },
      { label: "Insight delivered", detail: "Specific actions", icon: Lightbulb },
    ],
    result: "Margin up 12%",
  },
]

// Animated particle that flows through the pipeline
function FlowParticle({ color, glowColor, progress, isVertical }: {
  color: string; glowColor: string; progress: number; isVertical: boolean
}) {
  if (progress < 0 || progress > 1) return null

  return (
    <motion.div
      className="absolute pointer-events-none z-30"
      style={isVertical ? {
        left: "20px",
        top: `${progress * 100}%`,
        transform: "translate(-50%, -50%)",
      } : {
        left: `${progress * 100}%`,
        top: "24px",
        transform: "translate(-50%, -50%)",
      }}
    >
      {/* Outer glow */}
      <motion.div
        className="absolute rounded-full"
        style={{
          width: 40, height: 40,
          left: -20, top: -20,
          background: `radial-gradient(circle, rgba(${glowColor}, 0.3) 0%, transparent 70%)`,
        }}
        animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0.8, 0.5] }}
        transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
      />
      {/* Core dot */}
      <motion.div
        className="rounded-full"
        style={{
          width: 8, height: 8,
          backgroundColor: color,
          boxShadow: `0 0 12px rgba(${glowColor}, 0.8), 0 0 24px rgba(${glowColor}, 0.4)`,
        }}
      />
    </motion.div>
  )
}

// Glowing connector between steps
function GlowConnector({ active, color, glowColor, isVertical }: {
  active: boolean; color: string; glowColor: string; isVertical: boolean
}) {
  return (
    <div className={`relative ${isVertical ? "w-0.5 h-8 mx-auto" : "h-0.5 w-12 lg:w-16"}`}>
      {/* Background track */}
      <div className={`absolute ${isVertical ? "inset-0" : "inset-0"} rounded-full bg-gray-200/60`} />
      {/* Animated fill */}
      <motion.div
        className={`absolute rounded-full ${isVertical ? "inset-x-0 top-0" : "inset-y-0 left-0"}`}
        style={{ backgroundColor: color }}
        initial={isVertical ? { height: "0%" } : { width: "0%" }}
        animate={isVertical ? { height: active ? "100%" : "0%" } : { width: active ? "100%" : "0%" }}
        transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
      />
      {/* Glow overlay when active */}
      {active && (
        <motion.div
          className={`absolute rounded-full ${isVertical ? "inset-x-0 top-0 h-full" : "inset-y-0 left-0 w-full"}`}
          style={{
            backgroundColor: color,
            boxShadow: `0 0 8px rgba(${glowColor}, 0.6)`,
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: [0.4, 0.8, 0.4] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />
      )}
    </div>
  )
}

// Step node — the circle + text for each step
function StepNode({ step, index, isActive, isAnimating, color, glowColor, bgColor, isVertical }: {
  step: { label: string; detail: string; icon: React.ElementType }
  index: number; isActive: boolean; isAnimating: boolean
  color: string; glowColor: string; bgColor: string; isVertical: boolean
}) {
  return (
    <motion.div
      initial={{ opacity: 0.25 }}
      animate={{
        opacity: isActive ? 1 : 0.25,
        scale: isAnimating ? 1.02 : 1,
      }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={isVertical
        ? "flex items-center gap-4 w-full"
        : "relative flex flex-col items-center text-center w-[160px] lg:w-[180px]"
      }
    >
      {/* Circle */}
      <div className="relative shrink-0">
        {/* Glow ring when animating */}
        {isAnimating && (
          <motion.div
            className="absolute inset-0 rounded-full"
            style={{ border: `2px solid rgba(${glowColor}, 0.4)` }}
            initial={{ scale: 1, opacity: 0.7 }}
            animate={{ scale: 1.6, opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          />
        )}

        <motion.div
          animate={{
            backgroundColor: isActive ? color : "#E5E7EB",
            boxShadow: isActive
              ? `0 4px 20px rgba(${glowColor}, 0.4), 0 0 40px rgba(${glowColor}, 0.15)`
              : "0 1px 3px rgba(0,0,0,0.1)",
          }}
          transition={{ duration: 0.4 }}
          className={`${isVertical ? "w-11 h-11" : "w-12 h-12"} rounded-full flex items-center justify-center relative z-10`}
        >
          {isActive ? (
            <motion.div
              animate={{ scale: isAnimating ? [1, 1.2, 1] : 1 }}
              transition={{ duration: 0.5 }}
            >
              <step.icon className="w-5 h-5 text-white" />
            </motion.div>
          ) : (
            <span className="text-sm text-gray-400 font-medium">{index + 1}</span>
          )}
        </motion.div>
      </div>

      {/* Text */}
      <div className={isVertical ? "" : "mt-3"}>
        <motion.p
          animate={{ color: isActive ? "#111827" : "#9CA3AF" }}
          className={`font-semibold leading-tight ${isVertical ? "text-sm" : "text-sm mb-1"}`}
        >
          {step.label}
        </motion.p>
        <motion.p
          animate={{ color: isActive ? "#6B7280" : "#D1D5DB" }}
          className={`text-xs ${isVertical ? "mt-0.5" : "leading-relaxed"}`}
        >
          {step.detail}
        </motion.p>
      </div>
    </motion.div>
  )
}

export function FeaturedModulesScroll() {
  const [activeModule, setActiveModule] = useState<string>("cs")
  const [animatingStep, setAnimatingStep] = useState<number>(-1)
  const [showResult, setShowResult] = useState(false)
  const [showTrigger, setShowTrigger] = useState(false)
  const current = modules.find(m => m.id === activeModule)!

  // Run animation once
  const runAnimation = useCallback(() => {
    setAnimatingStep(-1)
    setShowResult(false)
    setShowTrigger(false)

    const timers: NodeJS.Timeout[] = []

    // Show trigger badge
    timers.push(setTimeout(() => setShowTrigger(true), 200))

    // Animate each step
    current.steps.forEach((_, i) => {
      const baseDelay = 600 + i * 700
      timers.push(setTimeout(() => setAnimatingStep(i), baseDelay))
    })

    // Show result
    const resultDelay = 600 + current.steps.length * 700 + 400
    timers.push(setTimeout(() => {
      setShowResult(true)
    }, resultDelay))

    return () => timers.forEach(clearTimeout)
  }, [activeModule, current.steps])

  useEffect(() => {
    const cleanup = runAnimation()
    return cleanup
  }, [activeModule, runAnimation])

  return (
    <section className="py-20 md:py-32 px-4 md:px-6 bg-white overflow-hidden">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10 md:mb-16">
          <h2 className="text-2xl md:text-5xl font-extrabold text-gray-900 tracking-tight mb-3">
            See the automation in action.
          </h2>
          <p className="text-gray-500 text-base md:text-lg max-w-xl mx-auto">
            Pick a module. Watch it run — from trigger to result.
          </p>
        </div>

        {/* Module selector dock — TOP on mobile for easy switching */}
        <div className="flex justify-center mb-10 md:mb-14">
          <div className="inline-flex items-center gap-1.5 md:gap-2 p-1.5 md:p-2 rounded-2xl bg-gray-50/80 border border-gray-100 backdrop-blur-sm">
            {modules.map((mod) => {
              const Icon = mod.icon
              const isActive = activeModule === mod.id
              return (
                <button
                  key={mod.id}
                  onClick={() => setActiveModule(mod.id)}
                  className="group relative flex flex-col items-center"
                >
                  <motion.div
                    animate={{ scale: isActive ? 1.1 : 1, y: isActive ? -2 : 0 }}
                    transition={{ type: "spring", stiffness: 400, damping: 25 }}
                    className={`relative w-12 h-12 md:w-14 md:h-14 rounded-xl flex items-center justify-center transition-all duration-200 border ${
                      isActive
                        ? "border-gray-200 shadow-lg bg-white"
                        : "border-transparent bg-white/60 hover:bg-white hover:border-gray-200 hover:shadow-md"
                    }`}
                    style={isActive ? { boxShadow: `0 8px 24px rgba(${mod.glowColor}, 0.2)` } : {}}
                  >
                    <Icon
                      className="w-5 h-5 md:w-6 md:h-6 transition-colors duration-200"
                      style={{ color: isActive ? mod.color : "#9CA3AF" }}
                    />
                  </motion.div>

                  {isActive && (
                    <motion.div
                      layoutId="activeDot"
                      className="w-1 h-1 rounded-full mt-1"
                      style={{ backgroundColor: mod.color }}
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}
                </button>
              )
            })}
          </div>
        </div>

        {/* Flow visualization */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeModule}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3 }}
          >
            {/* Trigger badge */}
            <div className="flex justify-center mb-6 md:mb-8">
              <motion.div
                initial={{ opacity: 0, scale: 0.8, y: 8 }}
                animate={{
                  opacity: showTrigger ? 1 : 0,
                  scale: showTrigger ? 1 : 0.8,
                  y: showTrigger ? 0 : 8,
                }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full border"
                style={{
                  backgroundColor: `rgba(${current.glowColor}, 0.08)`,
                  borderColor: `rgba(${current.glowColor}, 0.2)`,
                }}
              >
                <motion.div
                  animate={{ rotate: [0, 15, -15, 0] }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                >
                  <Zap className="w-3.5 h-3.5" style={{ color: current.color }} />
                </motion.div>
                <span className="text-xs font-semibold" style={{ color: current.color }}>
                  {current.trigger}
                </span>
              </motion.div>
            </div>

            {/* MOBILE: Vertical flow */}
            <div className="md:hidden max-w-xs mx-auto relative">
              {current.steps.map((step, i) => {
                const isActive = animatingStep >= i
                const isAnimating = animatingStep === i

                return (
                  <div key={i}>
                    <StepNode
                      step={step}
                      index={i}
                      isActive={isActive}
                      isAnimating={isAnimating}
                      color={current.color}
                      glowColor={current.glowColor}
                      bgColor={current.bgColor}
                      isVertical={true}
                    />
                    {i < current.steps.length - 1 && (
                      <div className="ml-[21px] py-1">
                        <GlowConnector
                          active={animatingStep > i}
                          color={current.color}
                          glowColor={current.glowColor}
                          isVertical={true}
                        />
                      </div>
                    )}
                  </div>
                )
              })}

              {/* Result */}
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.9 }}
                animate={{
                  opacity: showResult ? 1 : 0,
                  y: showResult ? 0 : 10,
                  scale: showResult ? 1 : 0.9,
                }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="mt-5 ml-1"
              >
                <div
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full border"
                  style={{
                    backgroundColor: current.bgColor,
                    borderColor: `rgba(${current.glowColor}, 0.3)`,
                    boxShadow: `0 4px 16px rgba(${current.glowColor}, 0.15)`,
                  }}
                >
                  <CheckCircle2 className="w-4 h-4" style={{ color: current.color }} />
                  <span className="text-xs font-bold" style={{ color: current.color }}>
                    {current.result}
                  </span>
                </div>
              </motion.div>
            </div>

            {/* DESKTOP: Horizontal flow */}
            <div className="hidden md:flex items-start justify-center gap-0 pb-4 relative">
              {current.steps.map((step, i) => {
                const isActive = animatingStep >= i
                const isAnimating = animatingStep === i

                return (
                  <div key={i} className="flex items-start">
                    <StepNode
                      step={step}
                      index={i}
                      isActive={isActive}
                      isAnimating={isAnimating}
                      color={current.color}
                      glowColor={current.glowColor}
                      bgColor={current.bgColor}
                      isVertical={false}
                    />

                    {i < current.steps.length - 1 && (
                      <div className="flex items-center pt-5 px-1 lg:px-2">
                        <GlowConnector
                          active={animatingStep > i}
                          color={current.color}
                          glowColor={current.glowColor}
                          isVertical={false}
                        />
                      </div>
                    )}
                  </div>
                )
              })}

              {/* Result connector + badge */}
              <div className="flex items-center pt-5 px-2">
                <GlowConnector
                  active={showResult}
                  color={current.color}
                  glowColor={current.glowColor}
                  isVertical={false}
                />
              </div>

              <motion.div
                initial={{ opacity: 0, scale: 0.8, x: -8 }}
                animate={{
                  opacity: showResult ? 1 : 0,
                  scale: showResult ? 1 : 0.8,
                  x: showResult ? 0 : -8,
                }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="pt-1 shrink-0"
              >
                <div
                  className="flex items-center gap-2 px-5 py-3 rounded-full border whitespace-nowrap"
                  style={{
                    backgroundColor: current.bgColor,
                    borderColor: `rgba(${current.glowColor}, 0.3)`,
                    boxShadow: `0 4px 20px rgba(${current.glowColor}, 0.2)`,
                  }}
                >
                  <motion.div
                    animate={{ rotate: showResult ? [0, 360] : 0 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                  >
                    <CheckCircle2 className="w-4 h-4" style={{ color: current.color }} />
                  </motion.div>
                  <span className="text-sm font-bold" style={{ color: current.color }}>
                    {current.result}
                  </span>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  )
}
