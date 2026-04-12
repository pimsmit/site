"use client";
import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";

export function InteractiveDashboard() {
  return (
    <div className="w-full h-full bg-white rounded-2xl overflow-hidden">
      {/* Full app mockup as interactive image */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full h-full relative"
      >
        <Image
          src="/app-mockup.png"
          alt="Ainomiq Dashboard"
          fill
          className="object-cover object-left-top"
          priority
        />
      </motion.div>
    </div>
  );
}
