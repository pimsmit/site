"use client";
import React from "react";
import { ContainerScroll } from "@/components/ui/container-scroll-animation";
import { InteractiveDashboard } from "@/components/ui/interactive-dashboard";

export function AinomiqHeroScroll() {
  return (
    <div className="flex flex-col items-center justify-center overflow-hidden w-full">
      <ContainerScroll
        titleComponent={
          <div className="text-center w-full px-4">
            <p className="text-lg md:text-2xl font-medium text-gray-600 mb-1 md:mb-2">
              Scale your store with
            </p>
            <span className="text-5xl md:text-[6rem] font-bold leading-none text-[#4A90E2] block">
              smart automations
            </span>
          </div>
        }
      >
        <div className="w-full h-full bg-white overflow-hidden">
          <InteractiveDashboard />
        </div>
      </ContainerScroll>
    </div>
  );
}
