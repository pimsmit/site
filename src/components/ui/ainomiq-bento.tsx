"use client"

import { MessageSquare, TrendingUp, Mail, Package, Zap, Globe } from "lucide-react"
import { BentoGridWithFeatures, type BentoFeature } from "@/components/ui/bento-grid"

function StatCard({ value, label }: { value: string; label: string }) {
  return (
    <div className="flex flex-col">
      <span className="text-4xl font-extrabold tracking-tight text-[#0f1b2d]">{value}</span>
      <span className="text-sm text-ainomiq-text-subtle mt-1">{label}</span>
    </div>
  )
}

function ModuleTag({ icon: Icon, label, color }: { icon: React.ElementType; label: string; color: string }) {
  return (
    <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold ${color}`}>
      <Icon className="w-3.5 h-3.5" />
      {label}
    </div>
  )
}

export function AinomiqBento() {
  const features: BentoFeature[] = [
    {
      id: "1",
      title: "One platform. Every channel.",
      description: "Email, chat, Instagram DMs, Facebook - all customer conversations in one inbox, handled automatically.",
      content: (
        <div className="mt-6 flex flex-wrap gap-2">
          <ModuleTag icon={MessageSquare} label="Live chat" color="bg-blue-50 text-blue-700" />
          <ModuleTag icon={Mail} label="Email" color="bg-purple-50 text-purple-700" />
          <ModuleTag icon={Globe} label="Instagram DMs" color="bg-pink-50 text-pink-700" />
          <ModuleTag icon={MessageSquare} label="Facebook" color="bg-indigo-50 text-indigo-700" />
          <div className="w-full mt-4 rounded-xl bg-ainomiq-surface p-4 border border-ainomiq-border">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                <MessageSquare className="w-4 h-4 text-blue-600" />
              </div>
              <div>
                <p className="text-xs font-semibold text-[#0f1b2d]">Where is my order?</p>
                <p className="text-xs text-ainomiq-text-subtle mt-0.5">Your order is on its way - expected delivery Thursday. <span className="text-blue-600 underline">Track here →</span></p>
                <p className="text-xs text-ainomiq-text-subtle mt-1">Replied in 4 seconds · Automated</p>
              </div>
            </div>
          </div>
        </div>
      ),
      className: "col-span-1 md:col-span-3 lg:col-span-2 border-b md:border-r border-ainomiq-border",
    },
    {
      id: "2",
      title: "Never run out of stock.",
      description: "Real-time inventory tracking with smart restock alerts before you hit zero.",
      content: (
        <div className="mt-6 space-y-3">
          {[
            { label: "Blue Linen Shirt", stock: 82, color: "bg-green-400" },
            { label: "Classic White Tee", stock: 34, color: "bg-yellow-400" },
            { label: "Slim Chinos", stock: 11, color: "bg-orange-400" },
            { label: "Summer Dress", stock: 5, color: "bg-red-400", alert: true },
          ].map((item) => (
            <div key={item.label} className="flex items-center gap-3">
              <div className={`w-2 h-2 rounded-full flex-shrink-0 ${item.color}`} />
              <span className="text-xs text-ainomiq-text-muted flex-1">{item.label}</span>
              <span className={`text-xs font-semibold ${item.alert ? "text-red-600" : "text-ainomiq-text-subtle"}`}>
                {item.stock} left{item.alert ? " ⚠️" : ""}
              </span>
            </div>
          ))}
        </div>
      ),
      className: "col-span-1 md:col-span-3 lg:col-span-2 border-b lg:border-r border-ainomiq-border",
    },
    {
      id: "3",
      title: "Emails that convert.",
      description: "Flows built and sent automatically - welcome, abandoned cart, post-purchase. All personalized.",
      content: (
        <div className="mt-6 space-y-2">
          {[
            { flow: "Welcome series", status: "Active", open: "62%" },
            { flow: "Abandoned cart", status: "Active", open: "48%" },
            { flow: "Post-purchase", status: "Active", open: "71%" },
          ].map((row) => (
            <div key={row.flow} className="flex items-center justify-between rounded-lg bg-ainomiq-surface px-3 py-2 border border-ainomiq-border">
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
                <span className="text-xs font-medium text-[#0f1b2d]">{row.flow}</span>
              </div>
              <span className="text-xs text-ainomiq-text-subtle">{row.open} open rate</span>
            </div>
          ))}
        </div>
      ),
      className: "col-span-1 md:col-span-6 md:border-b lg:col-span-2 border-b border-ainomiq-border",
    },
    {
      id: "4",
      title: "",
      description: "",
      content: (
        <div className="flex flex-col items-center justify-center h-full py-8">
          <div className="flex gap-12 flex-wrap justify-center">
            <StatCard value="2M+" label="tasks automated per month" />
            <StatCard value="58" label="countries active" />
            <StatCard value="< 5s" label="average response time" />
            <StatCard value="99.9%" label="uptime guaranteed" />
          </div>
        </div>
      ),
      className: "col-span-1 md:col-span-6 lg:col-span-6 border-b border-ainomiq-border bg-ainomiq-surface",
    },
    {
      id: "5",
      title: "Set up in 2 minutes.",
      description: "Connect your store, pick your modules. No developers, no waiting.",
      content: (
        <div className="mt-6 flex items-center gap-3">
          <div className="flex -space-x-2">
            {["shopify", "klaviyo", "meta", "google"].map((s, i) => (
              <div key={s} className="w-9 h-9 rounded-full border-2 border-white bg-ainomiq-navy shadow-sm flex items-center justify-center" style={{ zIndex: 4 - i }}>
                <Package className="w-4 h-4 text-ainomiq-text-subtle" />
              </div>
            ))}
          </div>
          <span className="text-xs text-ainomiq-text-subtle">Connects with your existing tools</span>
        </div>
      ),
      className: "col-span-1 md:col-span-3 lg:col-span-2 md:border-r border-ainomiq-border",
    },
    {
      id: "6",
      title: "Always improving.",
      description: "Every automation learns from your store's data. The longer it runs, the smarter it gets.",
      content: (
        <div className="mt-6">
          <div className="flex items-center gap-2 mb-3">
            <TrendingUp className="w-4 h-4 text-green-500" />
            <span className="text-xs font-medium text-green-700">+18% efficiency this month</span>
          </div>
          <div className="w-full bg-ainomiq-navy-light rounded-full h-1.5">
            <div className="bg-green-500 h-1.5 rounded-full" style={{ width: "72%" }} />
          </div>
        </div>
      ),
      className: "col-span-1 md:col-span-3 lg:col-span-2 lg:border-r border-ainomiq-border",
    },
    {
      id: "7",
      title: "Built for scale.",
      description: "Start with one store, grow to multiple brands. One login, full control.",
      content: (
        <div className="mt-6 flex items-center gap-3">
          <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-blue-50 border border-blue-100">
            <Zap className="w-4 h-4 text-blue-600" />
            <span className="text-xs font-semibold text-blue-700">Auto-scales with your store</span>
          </div>
        </div>
      ),
      className: "col-span-1 md:col-span-6 lg:col-span-2 border-ainomiq-border",
    },
  ]

  return (
    <section className="py-20 md:py-28 px-6 bg-ainomiq-navy">
      <div className="mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <p className="text-sm font-semibold text-blue-600 uppercase tracking-widest mb-3">Everything you need</p>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#0f1b2d]">
            One system. Fully automated.
          </h2>
          <p className="text-ainomiq-text-subtle mt-3 max-w-lg mx-auto">
            From first click to repeat customer - Ainomiq handles it.
          </p>
        </div>
        <BentoGridWithFeatures features={features} />
      </div>
    </section>
  )
}
