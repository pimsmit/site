"use client";

import { useEffect, useState, useRef } from "react";
import dynamic from "next/dynamic";

const SplineScene = dynamic(
  () => import("@/components/ui/spline").then((mod) => mod.SplineScene),
  { ssr: false, loading: () => <div className="w-full h-full bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-2xl animate-pulse" /> }
);

const MONO = "ui-monospace, SFMono-Regular, Menlo, monospace";

const CODE_LINES = [
  { text: 'import { AinomiqBot } from "./core";', tokens: [["import", "#c084fc"], [" { AinomiqBot } ", "#e4e4e7"], ["from", "#c084fc"], [' "./core"', "#86efac"], [";", "#71717a"]] },
  { text: "", tokens: [] },
  { text: "const bot = new AinomiqBot({", tokens: [["const", "#c084fc"], [" bot = ", "#e4e4e7"], ["new", "#c084fc"], [" AinomiqBot", "#3b82f6"], ["({", "#71717a"]] },
  { text: '  name: "Customer Support",', tokens: [["  name", "#3b82f6"], [": ", "#71717a"], ['"Customer Support"', "#86efac"], [",", "#71717a"]] },
  { text: '  channels: ["email", "instagram", "facebook"],', tokens: [["  channels", "#3b82f6"], [": [", "#71717a"], ['"email"', "#86efac"], [", ", "#71717a"], ['"instagram"', "#86efac"], [", ", "#71717a"], ['"facebook"', "#86efac"], ["],", "#71717a"]] },
  { text: "  responseTime: 30,", tokens: [["  responseTime", "#3b82f6"], [": ", "#71717a"], ["30", "#fbbf24"], [",", "#71717a"]] },
  { text: '  language: "auto",', tokens: [["  language", "#3b82f6"], [": ", "#71717a"], ['"auto"', "#86efac"], [",", "#71717a"]] },
  { text: "});", tokens: [["});", "#71717a"]] },
  { text: "", tokens: [] },
  { text: "await bot.train(shopifyData);", tokens: [["await", "#c084fc"], [" bot", "#e4e4e7"], [".train", "#3b82f6"], ["(shopifyData);", "#71717a"]] },
  { text: "await bot.connect();", tokens: [["await", "#c084fc"], [" bot", "#e4e4e7"], [".connect", "#3b82f6"], ["();", "#71717a"]] },
  { text: "", tokens: [] },
  { text: "// 🤖 Bot is live - handling customers 24/7", tokens: [["// 🤖 Bot is live - handling customers 24/7", "#6b7280"]] },
];

const CHARS_PER_TICK = 2;
const TICK_MS = 35;

export function BuildYourSolution() {
  const [charCount, setCharCount] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval>>(undefined);
  const totalChars = CODE_LINES.reduce((sum, l) => sum + l.text.length + 1, 0);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setCharCount((c) => {
        if (c >= totalChars) {
          clearInterval(intervalRef.current);
          return totalChars;
        }
        return c + CHARS_PER_TICK;
      });
    }, TICK_MS);
    return () => clearInterval(intervalRef.current);
  }, [totalChars]);

  // Build visible lines from charCount
  let remaining = charCount;
  const visibleLines: { lineNum: number; tokens: [string, string][] }[] = [];
  
  for (let i = 0; i < CODE_LINES.length; i++) {
    const line = CODE_LINES[i];
    const lineLen = line.text.length + 1; // +1 for newline
    if (remaining <= 0) break;
    
    const charsForLine = Math.min(remaining, line.text.length);
    remaining -= lineLen;
    
    // Build partial tokens
    const partialTokens: [string, string][] = [];
    let charsLeft = charsForLine;
    
    if (line.tokens.length === 0 && charsForLine >= 0) {
      visibleLines.push({ lineNum: i + 1, tokens: [] });
      continue;
    }
    
    for (const [text, color] of line.tokens) {
      if (charsLeft <= 0) break;
      const visibleText = text.slice(0, charsLeft);
      partialTokens.push([visibleText, color]);
      charsLeft -= text.length;
    }
    
    visibleLines.push({ lineNum: i + 1, tokens: partialTokens });
  }

  const cursorVisible = charCount < totalChars && Math.floor(Date.now() / 500) % 2 === 0;

  return (
    <section className="relative w-full py-16 md:py-28 px-6 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        {/* Heading */}
        <div className="mb-10 text-center">
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-4">
            We write the code.
            <br />
            <span className="text-ainomiq-blue">You get the solution.</span>
          </h2>
          <p className="text-lg text-ainomiq-text-muted max-w-lg mx-auto">
            From concept to deployment - our team builds exactly what you need.
          </p>
        </div>

        {/* Split: code left, robot right */}
        <div className="flex flex-col md:flex-row items-stretch gap-0 rounded-3xl overflow-hidden shadow-2xl border border-ainomiq-border/60">
          {/* LEFT - Code editor */}
          <div className="flex-1 bg-[#0a0a0b] p-0">
            {/* Title bar */}
            <div className="flex items-center gap-2 px-4 h-10 border-b border-white/[0.06]">
              <div className="w-3 h-3 rounded-full bg-[#ff5f57] opacity-60" />
              <div className="w-3 h-3 rounded-full bg-[#febc2e] opacity-60" />
              <div className="w-3 h-3 rounded-full bg-[#28c840] opacity-60" />
              <span className="ml-3 text-xs text-white/40" style={{ fontFamily: MONO }}>
                bot.ts
              </span>
            </div>
            {/* Code body */}
            <div className="p-5 min-h-[380px]" style={{ fontFamily: MONO, fontSize: 13.5, lineHeight: 1.7 }}>
              {visibleLines.map((line, i) => (
                <div key={i} className="flex" style={{ whiteSpace: "pre" }}>
                  <span className="w-7 text-white/20 select-none shrink-0 text-right mr-4">
                    {line.lineNum}
                  </span>
                  <span>
                    {line.tokens.length === 0 ? (
                      <span>&nbsp;</span>
                    ) : (
                      line.tokens.map(([text, color], j) => (
                        <span key={j} style={{ color }}>{text}</span>
                      ))
                    )}
                    {i === visibleLines.length - 1 && cursorVisible && (
                      <span className="inline-block w-2 h-4 bg-blue-500 ml-px align-text-bottom" />
                    )}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT - Spline robot */}
          <div className="flex-1 relative min-h-[380px] md:min-h-[460px] bg-gradient-to-br from-blue-50 via-white to-blue-100/50">
            {/* Status badge */}
            <div className="absolute top-5 right-5 z-10 flex items-center gap-2 bg-ainomiq-navy/80 backdrop-blur-sm rounded-full px-3 py-1.5 shadow-sm border border-ainomiq-border/60">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <span className="text-xs font-medium text-ainomiq-text-muted">Building...</span>
            </div>
            <SplineScene
              scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
              className="w-full h-full"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
