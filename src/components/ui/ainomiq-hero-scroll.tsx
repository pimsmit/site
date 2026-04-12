"use client";
import React from "react";
import { ContainerScroll } from "@/components/ui/container-scroll-animation";
import Image from "next/image";

export function AinomiqHeroScroll() {
  return (
    <div className="flex flex-col overflow-hidden bg-white">
      {/* Text section - positioned over dashboard */}
      <div className="relative">
        {/* Dashboard scroll animation */}
        <ContainerScroll titleComponent={<></>}>
          <Image
            src="/dashboard-preview.png"
            alt="ainomiq dashboard"
            height={720}
            width={1400}
            className="mx-auto rounded-2xl object-cover h-full object-left-top"
            draggable={false}
          />
        </ContainerScroll>
        
        {/* Text overlaying top of dashboard */}
        <div className="absolute inset-x-0 top-0 flex flex-col items-center justify-start pt-20 pb-10 px-4 pointer-events-none">
          <h1 className="text-3xl md:text-5xl font-bold text-black mb-4 text-center">
            Scale your store with
          </h1>
          <h2 className="text-5xl md:text-[7rem] font-bold leading-none text-[#4A90E2] text-center">
            smart automations
          </h2>
        </div>
      </div>
    </div>
  );
}
