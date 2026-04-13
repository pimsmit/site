"use client";

import React, { useEffect, useRef } from 'react';
import { motion, useInView, useSpring, useMotionValue, useTransform } from 'framer-motion';
import { Bot, Zap, ShieldCheck } from 'lucide-react';

const AnimatedNumber = ({ value }: { value: number }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });
  const spring = useSpring(0, { mass: 0.8, stiffness: 100, damping: 20 });

  useEffect(() => {
    if (isInView) spring.set(value);
  }, [isInView, value, spring]);

  useEffect(() => {
    const unsubscribe = spring.on("change", (latest) => {
      if (ref.current) {
        ref.current.textContent = Intl.NumberFormat('en-US').format(Number(latest.toFixed(2)));
      }
    });
    return () => unsubscribe();
  }, [spring]);

  return <span ref={ref}>0</span>;
};

const StatCard = ({ stat, index }: { stat: { icon: React.ReactNode; value: number; unit: string; label: string; description: string }, index: number }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["8deg", "-8deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-8deg", "8deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const cardVariants = {
    offscreen: { y: 50, opacity: 0 },
    onscreen: { y: 0, opacity: 1, transition: { type: "spring" as const, bounce: 0.4, duration: 0.8, delay: index * 0.15 } }
  };

  return (
    <motion.div
      variants={cardVariants}
      initial="offscreen"
      whileInView="onscreen"
      viewport={{ once: true, amount: 0.5 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => { x.set(0); y.set(0); }}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      className="relative p-8 rounded-xl bg-slate-50 border border-slate-200 shadow-sm"
    >
      <div style={{ transform: "translateZ(50px)", transformStyle: "preserve-3d" }} className="flex flex-col h-full">
        <div className="mb-4">{stat.icon}</div>
        <h2 className="text-4xl md:text-5xl font-bold text-black">
          <AnimatedNumber value={stat.value} />
          <span className="text-3xl text-slate-600">{stat.unit}</span>
        </h2>
        <h3 className="text-lg font-semibold text-slate-800 mt-2">{stat.label}</h3>
        <p className="text-sm text-slate-600 mt-4 flex-grow">{stat.description}</p>
      </div>
    </motion.div>
  );
};

export function ScaleWithoutLimits() {
  const stats = [
    { icon: <Zap className="h-8 w-8 text-yellow-400" />, value: 2, unit: "min", label: "Setup Time", description: "Connect your Shopify store and go live in under 2 minutes." },
    { icon: <Bot className="h-8 w-8 text-[#4A90E2]" />, value: 80, unit: "%", label: "Less Manual Work", description: "Customer service, emails, reporting — handled automatically." },
    { icon: <Zap className="h-8 w-8 text-yellow-400" />, value: 24, unit: "/7", label: "Always On", description: "Your system never sleeps, never takes a break." },
    { icon: <ShieldCheck className="h-8 w-8 text-green-400" />, value: 100, unit: "%", label: "Your Brand Voice", description: "Every email, ad, and reply matches your tone. No generic slop." },
  ];

  return (
    <div className="relative w-full bg-white flex flex-col items-center justify-center pt-44 md:pt-52 pb-20 px-8 md:px-16 overflow-hidden">
      <div className="relative z-10 flex flex-col items-center text-center mb-8">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.8, ease: "easeInOut" }}
          className="text-5xl md:text-6xl font-bold tracking-tighter mb-4 text-black"
        >
          Scale Without Limits
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.8, ease: "easeInOut" }}
          className="text-lg text-slate-700 max-w-2xl"
        >
          Built for e-commerce stores that want to grow faster. ainomiq handles ads, email, inventory, and customer service — automatically.
        </motion.p>
      </div>

      <div className="relative z-10 w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {stats.map((stat, index) => (
          <StatCard key={stat.label} stat={stat} index={index} />
        ))}
      </div>
    </div>
  );
}
