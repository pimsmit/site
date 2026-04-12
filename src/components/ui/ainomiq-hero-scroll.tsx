"use client";
import React from "react";
import { ContainerScroll } from "@/components/ui/container-scroll-animation";
import Image from "next/image";

export function AinomiqHeroScroll() {
  return (
    <div className="flex flex-col overflow-hidden">
      <ContainerScroll
        titleComponent={
          <>
            <h1 className="text-lg md:text-2xl font-medium text-gray-700 dark:text-gray-300 mb-4">
              Scale your store with
            </h1>
            <h2 className="text-5xl md:text-[7rem] font-bold leading-none text-[#4A90E2]">
              smart automations
            </h2>
          </>
        }
      >
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
  );
}
