"use client";
import React, { useRef } from "react";
import { useScroll, useTransform, motion, MotionValue } from "framer-motion";

export const ContainerScroll = ({
  titleComponent,
  children,
}: {
  titleComponent: string | React.ReactNode;
  children: React.ReactNode;
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });
  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // scrollYProgress 0 = container bottom enters viewport bottom
  // scrollYProgress ~0.3 = container is roughly centered in viewport
  // Animation plays from 0.1 (just entered view) to 0.4 (well into view)
  const rotate = useTransform(scrollYProgress, [0.1, 0.4], [45, 0]);
  const scale = useTransform(scrollYProgress, [0.1, 0.4], [1, 1.05]);
  const translate = useTransform(scrollYProgress, [0.1, 0.4], [-100, 0]);
  const textOpacity = useTransform(scrollYProgress, [0.1, 0.3, 0.5], [1, 1, 0]);

  // Mobile: iPhone slides up from bottom with app inside
  if (isMobile) {
    return (
      <MobilePhoneScroll titleComponent={titleComponent}>
        {children}
      </MobilePhoneScroll>
    );
  }

  return (
    <div
      className="h-[70rem] flex items-center justify-center relative p-8"
      ref={containerRef}
    >
      <div className="py-2 w-full relative" style={{ perspective: "1000px" }}>
        <Header translate={translate} titleComponent={titleComponent} opacity={textOpacity} />
        <Card rotate={rotate} translate={translate} scale={scale}>
          {children}
        </Card>
      </div>
    </div>
  );
};

// Mobile: sticky section — phone rises up as you scroll
function MobilePhoneScroll({
  titleComponent,
  children,
}: {
  titleComponent: React.ReactNode;
  children: React.ReactNode;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Phone slides from below (100%) to center (0%)
  const phoneY = useTransform(scrollYProgress, [0, 0.5, 1], ["80%", "0%", "-10%"]);
  const phoneScale = useTransform(scrollYProgress, [0, 0.4], [0.85, 1]);
  const titleOpacity = useTransform(scrollYProgress, [0, 0.2], [0, 1]);
  const titleY = useTransform(scrollYProgress, [0, 0.2], [20, 0]);

  return (
    <div
      ref={containerRef}
      className="relative min-h-[160vw] flex flex-col items-center justify-start overflow-hidden pt-8 px-6"
    >
      {/* Text above phone */}
      <motion.div
        style={{ opacity: titleOpacity, y: titleY }}
        className="text-center w-full mb-6 z-10 relative"
      >
        {titleComponent}
      </motion.div>

      {/* iPhone frame rising from bottom */}
      <motion.div
        style={{ y: phoneY, scale: phoneScale, width: "min(320px, 85vw)" }}
        className="relative mx-auto z-20"
      >
        {/* Phone outer shell */}
        <div
          className="relative w-full rounded-[3rem] bg-[#1a1a1a] shadow-[0_40px_80px_rgba(0,0,0,0.5),0_0_0_1px_rgba(255,255,255,0.08)]"
          style={{ aspectRatio: "9/19.5" }}
        >
          {/* Side buttons */}
          <div className="absolute -left-[3px] top-[20%] w-[3px] h-8 bg-[#333] rounded-l-sm" />
          <div className="absolute -left-[3px] top-[31%] w-[3px] h-10 bg-[#333] rounded-l-sm" />
          <div className="absolute -left-[3px] top-[43%] w-[3px] h-10 bg-[#333] rounded-l-sm" />
          <div className="absolute -right-[3px] top-[28%] w-[3px] h-14 bg-[#333] rounded-r-sm" />

          {/* Screen bezel */}
          <div className="absolute inset-[3px] rounded-[2.7rem] bg-black overflow-hidden">
            {/* Dynamic island */}
            <div className="absolute top-3 left-1/2 -translate-x-1/2 z-30 w-20 h-5 bg-black rounded-full" />

            {/* Screen content */}
            <div className="absolute inset-0 overflow-hidden rounded-[2.7rem] bg-white">
              {/* Status bar */}
              <div className="absolute top-0 left-0 right-0 h-12 z-20 flex items-end justify-between px-6 pb-1">
                <span className="text-[10px] font-semibold text-black">9:41</span>
                <div className="flex items-center gap-1">
                  <div className="flex gap-0.5 items-end h-3">
                    {[3,4,5,6].map(h => (
                      <div key={h} className="w-[2px] bg-black rounded-sm" style={{ height: h }} />
                    ))}
                  </div>
                  <svg className="w-3 h-3" viewBox="0 0 12 12" fill="none">
                    <path d="M6 2C8.8 2 11 4.2 11 7H1C1 4.2 3.2 2 6 2Z" fill="black" opacity=".3"/>
                    <path d="M6 3.5C8 3.5 9.7 4.9 10.2 6.8H1.8C2.3 4.9 4 3.5 6 3.5Z" fill="black" opacity=".6"/>
                    <path d="M6 5C7.3 5 8.4 5.7 9 6.8H3C3.6 5.7 4.7 5 6 5Z" fill="black"/>
                  </svg>
                  <div className="flex items-center gap-0.5">
                    <div className="w-5 h-2.5 rounded-sm border border-black/40 flex items-center p-0.5">
                      <div className="h-full bg-black rounded-[1px]" style={{ width: "75%" }} />
                    </div>
                  </div>
                </div>
              </div>

              {/* App content — pushed down past status bar */}
              <div className="absolute inset-0 pt-12 pb-0">
                {children}
              </div>
            </div>
          </div>

          {/* Reflection glare */}
          <div className="absolute inset-[3px] rounded-[2.7rem] bg-gradient-to-br from-white/10 to-transparent pointer-events-none z-10" />
        </div>

        {/* Phone shadow */}
        <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-2/3 h-4 bg-black/20 blur-xl rounded-full" />
      </motion.div>
    </div>
  );
}

export const Header = ({ translate, titleComponent, opacity }: any) => {
  return (
    <motion.div
      style={{ opacity }}
      className="max-w-5xl mx-auto text-center relative z-10 mb-12"
    >
      {titleComponent}
    </motion.div>
  );
};

export const Card = ({
  rotate,
  scale,
  children,
}: {
  rotate: MotionValue<number>;
  scale: MotionValue<number>;
  translate: MotionValue<number>;
  children: React.ReactNode;
}) => {
  return (
    <motion.div
      style={{
        rotateX: rotate,
        scale,
        boxShadow:
          "0 0 #0000004d, 0 9px 20px #0000004a, 0 37px 37px #00000042, 0 84px 50px #00000026, 0 149px 60px #0000000a, 0 233px 65px #00000003",
      }}
      className="max-w-5xl -mt-24 mx-auto h-[40rem] w-full border-4 border-[#6C6C6C] p-6 bg-[#222222] rounded-[30px] shadow-2xl relative z-30"
    >
      <div className="h-full w-full overflow-hidden rounded-2xl bg-white">
        {children}
      </div>
    </motion.div>
  );
};
