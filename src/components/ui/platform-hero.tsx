"use client";

import { GradientWave } from "@/components/ui/gradient-wave";
import { Button } from "@/components/ui/button";
import { Marquee } from "@/components/ui/marquee";
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

const platformLogos = [
  { name: "Shopify", src: "https://cdn.simpleicons.org/shopify" },
  { name: "Facebook", src: "https://cdn.simpleicons.org/facebook" },
  { name: "Instagram", src: "https://cdn.simpleicons.org/instagram" },
  { name: "Meta", src: "https://cdn.simpleicons.org/meta" },
  { name: "TikTok", src: "https://cdn.simpleicons.org/tiktok" },
  { name: "Snapchat", src: "https://cdn.simpleicons.org/snapchat" },
  { name: "Google", src: "https://cdn.simpleicons.org/google" },
  { name: "Google Ads", src: "https://cdn.simpleicons.org/googleads" },
  { name: "Klaviyo", src: "/logos/klaviyo.svg" },
];

const integrations = [
  {
    name: "Intelligent Customer Service",
    designation: "24/7 Support Agent",
    description: "Answers questions, resolves issues.",
    icon: <Bot className="h-5 w-5 text-ainomiq-blue" />,
    gradient: "from-blue-500/20 to-blue-600/5",
  },
  {
    name: "Ads Automation",
    designation: "ROAS Optimization",
    description: "Campaigns on autopilot, creative testing.",
    icon: <BarChart3 className="h-5 w-5 text-emerald-500" />,
    gradient: "from-emerald-500/20 to-emerald-600/5",
  },
  {
    name: "Email Flows",
    designation: "Personalized Flows",
    description: "From welcome to win-back, automated.",
    icon: <Mail className="h-5 w-5 text-violet-500" />,
    gradient: "from-violet-500/20 to-violet-600/5",
  },
  {
    name: "Smart Inventory",
    designation: "Demand Forecasting",
    description: "Predict demand, prevent stockouts.",
    icon: <Package className="h-5 w-5 text-amber-500" />,
    gradient: "from-amber-500/20 to-amber-600/5",
  },
  {
    name: "Analytics",
    designation: "Performance Dashboard",
    description: "Real-time insights, actionable data.",
    icon: <Gauge className="h-5 w-5 text-rose-500" />,
    gradient: "from-rose-500/20 to-rose-600/5",
  },
  {
    name: "Workflows",
    designation: "Process Automation",
    description: "Connect systems, eliminate manual work.",
    icon: <Workflow className="h-5 w-5 text-cyan-500" />,
    gradient: "from-cyan-500/20 to-cyan-600/5",
  },
];

export function PlatformHero() {
  return (
    <div className="relative min-h-[90vh] pt-28 pb-12">
      <div className="overflow-hidden flex flex-col px-6 items-center justify-center">
        <GradientWave className="absolute inset-0 opacity-15" />

        <div className="z-10 my-12 space-y-12 mx-auto max-w-4xl flex flex-col items-center text-center">
          <div className="space-y-6">
            <h1 className="text-4xl font-extrabold tracking-tight md:text-6xl lg:text-8xl text-ainomiq-text">
              Smart{" "}
              <span className="gradient-text">Automations</span>
            </h1>
            <p className="max-w-xl mx-auto text-base text-ainomiq-text-muted leading-relaxed">
              Connects to every tool in your stack and takes over the manual work your team does by hand. Lower ops costs, fewer tools to manage, one system.
            </p>
          </div>

          {/* Integration Icons */}
          <div className="flex items-center justify-center gap-3 md:gap-4 flex-wrap">
            {platformLogos.map((platform) => (
              <Button
                key={platform.name}
                variant="outline"
                size="icon"
                type="button"
                aria-label={platform.name}
                className="rounded-lg hover:scale-110 transition-all duration-300 cursor-pointer"
              >
                <img
                  src={platform.src}
                  alt={`${platform.name} icon`}
                  className="h-4 w-4"
                />
              </Button>
            ))}
          </div>

          <Button
            asChild
            className="rounded-full bg-ainomiq-blue hover:bg-ainomiq-blue-hover text-white px-12 md:px-16 h-14 text-base font-semibold shadow-lg shadow-ainomiq-blue/25"
          >
            <Link href="/get-started">
              Get started <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </div>

      {/* Integration Modules Marquee */}
      <div className="w-full z-10 relative flex flex-col items-center mt-8">
        <p className="text-center text-ainomiq-text-muted mb-8 text-base z-10 relative">
          Six intelligent modules working together as one app
        </p>
        <Marquee className="w-full [--duration:50s] [--gap:2rem]">
          {integrations.map((item, index) => (
            <div key={index} className="h-full">
              <div className="relative flex items-center gap-3 h-full overflow-visible border border-ainomiq-border backdrop-blur-md bg-white rounded-xl mx-2 min-w-[260px]">
                <div className="flex flex-col px-5 py-4 flex-1">
                  <div className="flex items-center gap-3 mb-1">
                    <div
                      className={`flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br ${item.gradient}`}
                    >
                      {item.icon}
                    </div>
                    <h3 className="font-semibold text-sm text-ainomiq-text">
                      {item.name}
                    </h3>
                  </div>
                  <p className="text-xs text-ainomiq-blue font-medium">
                    {item.designation}
                  </p>
                  <p className="text-xs text-ainomiq-text-muted mt-1">
                    {item.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </Marquee>
      </div>
    </div>
  );
}
