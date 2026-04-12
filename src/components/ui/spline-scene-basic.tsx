'use client'

import { SplineScene } from "@/components/ui/spline";

export function SplineSceneBasic() {
  return (
    <div className="w-full px-4 md:px-8 py-20 bg-gradient-to-br from-gray-50 via-white to-blue-50">
      <div className="max-w-6xl mx-auto">
        {/* Glassmorphism container */}
        <div className="relative overflow-hidden rounded-3xl border border-white/20 bg-white/40 backdrop-blur-xl shadow-2xl">
          {/* Gradient overlay for depth */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-purple-500/5 pointer-events-none" />

          <div className="relative flex flex-col md:flex-row items-center gap-8 p-8 md:p-12">
            {/* Left content — tighter */}
            <div className="flex-1 z-10 text-center md:text-left">
              <h1 className="text-5xl md:text-6xl font-bold text-gray-900 leading-tight mb-4">
                Meet your AI
                <br />
                <span className="text-[#4A90E2]">operator</span>
              </h1>
              <p className="text-lg text-gray-600 leading-relaxed max-w-md">
                Always on. Always optimizing. Your ainomiq agent runs your store
                while you focus on what matters.
              </p>
            </div>

            {/* Right content — robot MUCH bigger and closer */}
            <div className="flex-1 relative h-[400px] md:h-[500px] w-full -mb-8 md:-mb-12">
              <SplineScene
                scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
                className="w-full h-full scale-110"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
