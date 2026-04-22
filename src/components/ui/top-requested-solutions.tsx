"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Bot,
  MessageCircle,
  Globe,
  Smartphone,
  Package,
  Mail,
  Users,
  Star,
  BarChart3,
  ShoppingCart,
  ArrowRight,
  Sparkles,
} from "lucide-react"
import Link from "next/link"

const solutions = [
  {
    rank: 1,
    icon: Bot,
    label: "AI Chatbot",
    sub: "Email, chat & WhatsApp automation",
    color: "#3B82F6",
    glow: "59,130,246",
    href: "/get-started?solution=chatbot",
  },
  {
    rank: 2,
    icon: MessageCircle,
    label: "WhatsApp Bot",
    sub: "Sales, support & follow-ups",
    color: "#10B981",
    glow: "16,185,129",
    href: "/get-started?solution=whatsapp",
  },
  {
    rank: 3,
    icon: Globe,
    label: "Website Chatbot",
    sub: "Embedded support widget",
    color: "#8B5CF6",
    glow: "139,92,246",
    href: "/get-started?solution=website-chatbot",
  },
  {
    rank: 4,
    icon: Smartphone,
    label: "iOS / Android App",
    sub: "Custom branded mobile app",
    color: "#F59E0B",
    glow: "245,158,11",
    href: "/get-started?solution=mobile-app",
  },
  {
    rank: 5,
    icon: Package,
    label: "Inventory System",
    sub: "Stock tracking & alerts",
    color: "#EF4444",
    glow: "239,68,68",
    href: "/get-started?solution=inventory",
  },
  {
    rank: 6,
    icon: Mail,
    label: "Email Automation",
    sub: "Flows, campaigns & segmentation",
    color: "#06B6D4",
    glow: "6,182,212",
    href: "/get-started?solution=email",
  },
  {
    rank: 7,
    icon: Users,
    label: "CRM Integration",
    sub: "HubSpot, Salesforce & more",
    color: "#EC4899",
    glow: "236,72,153",
    href: "/get-started?solution=crm",
  },
  {
    rank: 8,
    icon: Star,
    label: "Review Management",
    sub: "Auto-reply & monitoring",
    color: "#F97316",
    glow: "249,115,22",
    href: "/get-started?solution=reviews",
  },
  {
    rank: 9,
    icon: BarChart3,
    label: "Analytics Dashboard",
    sub: "Real-time KPI overview",
    color: "#84CC16",
    glow: "132,204,22",
    href: "/get-started?solution=analytics",
  },
  {
    rank: 10,
    icon: ShoppingCart,
    label: "Shopify Integration",
    sub: "Full e-com automation",
    color: "#A78BFA",
    glow: "167,139,250",
    href: "/get-started?solution=shopify",
  },
]

export function TopRequestedSolutions() {
  const [hovered, setHovered] = useState<number | null>(null)

  return (
    <section className="py-24 px-6 bg-ainomiq-navy overflow-hidden">
      <div className="mx-auto max-w-5xl">
        {/* Header */}
        <div className="text-center mb-14">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 rounded-full bg-ainomiq-blue-glow px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-ainomiq-blue mb-4"
          >
            <Sparkles className="h-3.5 w-3.5" />
            Most Requested
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.08 }}
            className="text-3xl md:text-5xl font-extrabold tracking-tight text-ainomiq-text mb-4"
          >
            What businesses ask for most
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.14 }}
            className="text-ainomiq-text-muted text-lg max-w-xl mx-auto"
          >
            From chatbots to full integrations — these are the solutions our clients request most.
          </motion.p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {solutions.map((sol, i) => {
            const Icon = sol.icon
            const isHovered = hovered === i
            return (
              <motion.div
                key={sol.rank}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
              >
                <Link href={sol.href}>
                  <motion.div
                    onHoverStart={() => setHovered(i)}
                    onHoverEnd={() => setHovered(null)}
                    animate={{
                      borderColor: isHovered ? sol.color + "80" : "rgba(255,255,255,0.06)",
                      backgroundColor: isHovered ? `rgba(${sol.glow}, 0.06)` : "rgba(255,255,255,0.02)",
                      boxShadow: isHovered ? `0 8px 32px rgba(${sol.glow}, 0.15)` : "none",
                    }}
                    transition={{ duration: 0.2 }}
                    className="relative flex items-center gap-4 rounded-2xl border p-4 cursor-pointer"
                  >
                    {/* Rank number */}
                    <div className="flex-shrink-0 w-7 text-right">
                      <span
                        className="text-sm font-bold tabular-nums"
                        style={{ color: isHovered ? sol.color : "#4b5563" }}
                      >
                        {String(sol.rank).padStart(2, "0")}
                      </span>
                    </div>

                    {/* Icon */}
                    <motion.div
                      animate={{
                        backgroundColor: isHovered ? `rgba(${sol.glow}, 0.15)` : "rgba(255,255,255,0.04)",
                        scale: isHovered ? 1.08 : 1,
                      }}
                      transition={{ duration: 0.2 }}
                      className="flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center"
                    >
                      <Icon
                        className="w-5 h-5 transition-colors duration-200"
                        style={{ color: isHovered ? sol.color : "#6b7280" }}
                      />
                    </motion.div>

                    {/* Text */}
                    <div className="flex-1 min-w-0">
                      <p
                        className="text-sm font-semibold transition-colors duration-200"
                        style={{ color: isHovered ? "#f1f5f9" : "#cbd5e1" }}
                      >
                        {sol.label}
                      </p>
                      <p className="text-xs text-ainomiq-text-muted truncate">{sol.sub}</p>
                    </div>

                    {/* Arrow */}
                    <AnimatePresence>
                      {isHovered && (
                        <motion.div
                          initial={{ opacity: 0, x: -6 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -6 }}
                          transition={{ duration: 0.15 }}
                          className="flex-shrink-0"
                        >
                          <ArrowRight className="w-4 h-4" style={{ color: sol.color }} />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                </Link>
              </motion.div>
            )
          })}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-10 text-center"
        >
          <p className="text-ainomiq-text-muted text-sm mb-4">Don&apos;t see what you need?</p>
          <Link
            href="/get-started"
            className="inline-flex items-center gap-2 rounded-full bg-ainomiq-blue hover:bg-ainomiq-blue-hover text-white text-sm font-semibold px-6 py-3 transition-colors"
          >
            Describe your custom solution <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
