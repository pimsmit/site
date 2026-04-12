'use client'

import { SplineScene } from "@/components/ui/spline";
import { Card } from "@/components/ui/card"
import { Spotlight } from "@/components/ui/spotlight"

export function SplineSceneBasic() {
  return (
    <div className="w-full px-4 md:px-8 py-16 bg-white">
      <Card className="w-full h-[500px] bg-white relative overflow-hidden border border-gray-100 shadow-sm">
        <Spotlight
          className="-top-40 left-0 md:left-60 md:-top-20"
          fill="blue"
        />

        <div className="flex h-full">
          {/* Left content */}
          <div className="flex-1 p-8 relative z-10 flex flex-col justify-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
              Meet your AI
              <br />
              <span className="text-[#4A90E2]">operator</span>
            </h1>
            <p className="mt-4 text-gray-500 max-w-sm text-base leading-relaxed">
              Always on. Always optimizing. Your ainomiq agent runs your store
              while you focus on what matters.
            </p>
          </div>

          {/* Right content — robot */}
          <div className="flex-1 relative">
            <SplineScene
              scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
              className="w-full h-full"
            />
          </div>
        </div>
      </Card>
    </div>
  )
}
