"use client";
import React from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  Bot,
  BarChart3,
  Mail,
  Package,
  Gauge,
  Workflow,
  ArrowRight,
} from "lucide-react";

const features = [
  {
    icon: Bot,
    title: "AI Customer Service",
    description:
      "Handles customer service inquiries, keeps your brand voice alive and personal.",
  },
  {
    icon: BarChart3,
    title: "AI Ad Manager",
    description:
      "Automates ad optimization, bid customization, and creative — powered by real-time data.",
  },
  {
    icon: Package,
    title: "Smart Inventory",
    description:
      "Forecasts stock needs and automates stock and supplies management.",
  },
  {
    icon: Mail,
    title: "Email Marketing",
    description:
      "Full-funnel integration for flows, campaigns, and subscriber engagement.",
  },
  {
    icon: Workflow,
    title: "Content Pipeline",
    description:
      "Google Drive integrations, forms, and app content via production workflows.",
  },
  {
    icon: Gauge,
    title: "Live Analytics",
    description:
      "Real-time data from all platforms in one unified dashboard view.",
  },
];

export function InteractiveDashboard() {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Only enable interaction when scroll is complete (tablet is flat)
  const isInteractive = useTransform(scrollYProgress, (latest) => latest >= 0.98);
  const [interactive, setInteractive] = React.useState(false);

  React.useEffect(() => {
    const unsubscribe = isInteractive.on("change", (v) => setInteractive(v));
    return () => unsubscribe();
  }, [isInteractive]);

  const [hoveredModule, setHoveredModule] = React.useState<number | null>(null);

  return (
    <div ref={containerRef} className="w-full h-full bg-white rounded-2xl p-6 md:p-10 overflow-auto">
      {/* Title */}
      <div className="text-center mb-8">
        <h1 className="text-2xl md:text-4xl font-bold mb-2">Your AI-powered</h1>
        <h2 className="text-2xl md:text-4xl font-bold mb-4">e-commerce operator</h2>
        <p className="text-gray-600 text-sm md:text-base max-w-2xl mx-auto mb-6">
          Ainomiq connects your entire e-commerce stack and runs it with AI.
          Automate ad campaigns, customer service, email, inventory management,
          and data-driven marketing — one platform, zero manual work.
        </p>
        <div className="flex gap-3 justify-center">
          <Button asChild className="rounded-full bg-blue-500 hover:bg-blue-600 text-white px-6">
            <Link href="https://app.ainomiq.com">
              Get started <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>

      {/* Module Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto">
        {features.map((feature, idx) => (
          <motion.div
            key={idx}
            whileHover={interactive ? { scale: 1.05, y: -5 } : {}}
            transition={{ duration: 0.2 }}
            onHoverStart={() => interactive && setHoveredModule(idx)}
            onHoverEnd={() => setHoveredModule(null)}
          >
            <Card className={`border transition-all h-full ${
              hoveredModule === idx 
                ? 'shadow-lg border-blue-400' 
                : 'shadow-sm border-gray-200'
            } ${!interactive ? 'pointer-events-none' : 'cursor-pointer'}`}>
              <CardContent className="p-6">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50">
                  <feature.icon className="h-6 w-6 text-blue-500" />
                </div>
                <h3 className="text-base font-bold mb-2">{feature.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Additional modules row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-5xl mx-auto mt-4">
        {[
          { title: "Onboarding System", desc: "Guides setup for new clients with smart customization", icon: Workflow },
          { title: "Performance & Profit", desc: "Full profit command center with spend data and analysis", icon: Gauge },
          { title: "Account & Settings", desc: "Full control over integrations and notifications", icon: Bot },
        ].map((module, idx) => (
          <motion.div
            key={idx}
            whileHover={interactive ? { scale: 1.05, y: -5 } : {}}
            transition={{ duration: 0.2 }}
            onHoverStart={() => interactive && setHoveredModule(idx + 6)}
            onHoverEnd={() => setHoveredModule(null)}
          >
            <Card className={`border transition-all h-full ${
              hoveredModule === idx + 6
                ? 'shadow-lg border-blue-400'
                : 'shadow-sm border-gray-200'
            } ${!interactive ? 'pointer-events-none' : 'cursor-pointer'}`}>
              <CardContent className="p-6">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50">
                  <module.icon className="h-6 w-6 text-blue-500" />
                </div>
                <h3 className="text-base font-bold mb-2">{module.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{module.desc}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Indicator when interactive */}
      {interactive && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-8 text-center bg-blue-50 text-blue-700 px-6 py-3 rounded-full text-sm font-medium inline-block mx-auto"
        >
          ✨ Hover over modules to explore
        </motion.div>
      )}
    </div>
  );
}
