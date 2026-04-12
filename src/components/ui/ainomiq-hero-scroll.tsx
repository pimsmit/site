"use client";
import React from "react";
import { ContainerScroll } from "@/components/ui/container-scroll-animation";
import Image from "next/image";

export function AinomiqHeroScroll() {
  return (
    <div className="flex flex-col items-center overflow-hidden bg-white">
      {/* Text section - small top margin */}
      <div className="flex flex-col items-center justify-center pt-10 pb-4 px-4 w-full">
        <h1 className="text-3xl md:text-5xl font-bold text-black mb-2 text-center">
          Scale your store with
        </h1>
        <h2 className="text-5xl md:text-[7rem] font-bold leading-none text-[#4A90E2] text-center mb-8">
          smart automations
        </h2>
      </div>
      
      {/* Dashboard scroll animation - centered */}
      <div className="w-full flex justify-center">
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
      </div>
    </div>
  );
}
