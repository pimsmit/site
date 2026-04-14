'use client'

import React, { useRef, useState, useEffect } from 'react';
import { SplineScene } from "@/components/ui/spline";
import { Spotlight } from "@/components/ui/spotlight";

type Activity = {
  time: string;
  action: string;
  detail: string;
  status: 'done' | 'active' | 'pending';
};

const ACTIVITIES: Activity[] = [
  { time: '2 min ago', action: 'Customer email', detail: 'Responded to 3 support tickets', status: 'done' },
  { time: '8 min ago', action: 'Inventory alert', detail: 'Restock notification sent', status: 'done' },
  { time: '14 min ago', action: 'Email campaign', detail: 'Sent to 2,418 subscribers', status: 'done' },
  { time: 'Just now', action: 'Ad optimization', detail: 'Analyzing performance data', status: 'active' },
  { time: 'In 15 min', action: 'Scheduled flow', detail: 'Cart abandonment sequence', status: 'pending' },
];

function ActivityFeed() {
  const [visibleActivities, setVisibleActivities] = useState<Activity[]>([]);

  useEffect(() => {
    // Stagger the activity reveals
    ACTIVITIES.forEach((activity, i) => {
      setTimeout(() => {
        setVisibleActivities(prev => [...prev, activity]);
      }, i * 600);
    });
  }, []);

  return (
    <div className="flex flex-col w-full max-w-full md:max-w-md rounded-2xl overflow-hidden bg-black/40 backdrop-blur-md border border-white/10">
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-white/10 bg-white/5">
        <div>
          <p className="text-white text-sm font-semibold">System Activity</p>
          <p className="text-blue-200 text-xs">Running 24/7</p>
        </div>
        <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
      </div>

      {/* Activity list */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3 max-h-[320px] scrollbar-hide">
        {visibleActivities.map((activity, i) => (
          <div
            key={i}
            className="flex items-start gap-3 p-3 rounded-xl bg-white/5 border border-white/10 animate-fade-in"
            style={{ animationDelay: `${i * 100}ms` }}
          >
            {/* Status indicator */}
            <div className={`mt-1 w-2 h-2 rounded-full shrink-0 ${
              activity.status === 'done' ? 'bg-green-400' :
              activity.status === 'active' ? 'bg-blue-400 animate-pulse' :
              'bg-gray-400'
            }`} />
            
            {/* Content */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-2 mb-1">
                <p className="text-white text-sm font-medium truncate">{activity.action}</p>
                <span className="text-blue-200 text-xs whitespace-nowrap shrink-0">{activity.time}</span>
              </div>
              <p className="text-blue-100/70 text-xs leading-relaxed">{activity.detail}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function SplineSceneBasic() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState<{ x: number; y: number } | null>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const handleMouseLeave = () => setMousePos(null);

  return (
    <div className="w-full px-4 md:px-8 pt-0 pb-0 relative">
      {/* Gradient fade from white into section */}
      <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-white via-slate-50 to-transparent pointer-events-none" />
      <div className="max-w-6xl mx-auto pt-20">
        {/* Glassy container */}
        <div
          ref={containerRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className="relative flex flex-col md:flex-row items-center gap-8 p-8 md:p-12 rounded-3xl border border-white/40 bg-gradient-to-br from-blue-950 via-blue-900 to-indigo-950 shadow-none overflow-hidden"
        >
          {/* Mouse hover glow */}
          {mousePos && (
            <div
              className="absolute pointer-events-none z-[1] rounded-full bg-white/15 blur-[60px] transition-opacity duration-300"
              style={{
                width: 250,
                height: 250,
                left: mousePos.x - 125,
                top: mousePos.y - 125,
              }}
            />
          )}
          {/* Interactive moving spotlight background */}
          <Spotlight
            className="-top-40 left-0 md:left-60 md:-top-20"
            fill="#4A90E2"
          />
          {/* Glass reflection overlay */}
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-white/[0.08] to-transparent pointer-events-none" />

          {/* Left content — heading + activity feed */}
          <div className="flex-1 z-10 flex flex-col items-center md:items-start">
            <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight mb-3">
              Your system.<br />Always running.
            </h2>
            <p className="text-lg text-blue-200 leading-relaxed max-w-md mb-6">
              While you sleep, it handles customer emails, restocks inventory, and sends campaigns. No supervision needed.
            </p>
            <ActivityFeed />
          </div>

          {/* Right content — robot (taller so legs show within container) */}
          <div className="flex-1 relative h-[400px] md:h-[600px] w-full">
            <SplineScene
              scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
              className="w-full h-full scale-125 translate-y-[10%]"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
