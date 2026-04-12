'use client'

import { SplineScene } from "@/components/ui/spline";
import { Spotlight } from "@/components/ui/spotlight";

export function SplineSceneBasic() {
  return (
    <div className="w-full px-4 md:px-8 py-20 bg-gradient-to-br from-blue-950 via-blue-900 to-indigo-950 relative overflow-hidden">
      {/* Interactive moving spotlight background */}
      <Spotlight
        className="-top-40 left-0 md:left-60 md:-top-20"
        fill="#4A90E2"
      />
      <div className="max-w-6xl mx-auto">
        <div className="relative flex flex-col md:flex-row items-center gap-8 p-8 md:p-12">
          {/* Left content */}
          <div className="flex-1 z-10 text-center md:text-left">
            <h1 className="text-5xl md:text-6xl font-bold text-white leading-tight mb-4">
              Meet Mark
            </h1>
            <p className="text-lg text-blue-200 leading-relaxed max-w-md">
              Mark works 24/7 and never needs a break. Crazy, right?
            </p>
          </div>

          {/* Right content — robot */}
          <div className="flex-1 relative h-[400px] md:h-[500px] w-full -mb-8 md:-mb-12">
            <SplineScene
              scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
              className="w-full h-full scale-110"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
