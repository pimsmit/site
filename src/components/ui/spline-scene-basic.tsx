'use client'

import React, { useRef, useState, useEffect } from 'react';
import { SplineScene } from "@/components/ui/spline";
import { Spotlight } from "@/components/ui/spotlight";

// Predefined responses for demo — no API needed
const MARK_RESPONSES: Record<string, string> = {
  "default": "I can handle customer emails, run your ads, optimize email flows, and manage inventory — all automatically.",
  "ads": "I'll analyze your best-performing creatives, kill underperformers, and scale winners. Your ROAS stays healthy while you sleep.",
  "email": "Abandoned carts, post-purchase flows, win-back campaigns — I build and optimize them all in Klaviyo.",
  "customer": "I respond to customer emails and DMs in your brand voice. Refunds, tracking, sizing — handled in seconds.",
  "inventory": "I track stock levels, flag low inventory before you run out, and sync everything with your fulfillment partner.",
  "price": "Plans start at €299/month. One AI operator replacing hours of manual work. Want to see the ROI math?",
  "how": "Connect your Shopify store, and I learn your products, brand voice, and customer patterns. Then I get to work.",
};

function getMarkResponse(input: string): string {
  const lower = input.toLowerCase();
  if (lower.includes('ad') || lower.includes('meta') || lower.includes('facebook') || lower.includes('roas') || lower.includes('campaign')) return MARK_RESPONSES.ads;
  if (lower.includes('email') || lower.includes('klaviyo') || lower.includes('flow') || lower.includes('abandon')) return MARK_RESPONSES.email;
  if (lower.includes('customer') || lower.includes('support') || lower.includes('service') || lower.includes('ticket') || lower.includes('dm')) return MARK_RESPONSES.customer;
  if (lower.includes('inventory') || lower.includes('stock') || lower.includes('fulfil') || lower.includes('ship')) return MARK_RESPONSES.inventory;
  if (lower.includes('price') || lower.includes('cost') || lower.includes('plan') || lower.includes('€') || lower.includes('pricing')) return MARK_RESPONSES.price;
  if (lower.includes('how') || lower.includes('start') || lower.includes('connect') || lower.includes('setup') || lower.includes('work')) return MARK_RESPONSES.how;
  return MARK_RESPONSES.default;
}

type Message = { role: 'user' | 'mark'; text: string };

const SUGGESTIONS = [
  "What can you do?",
  "How do you handle ads?",
  "Tell me about email flows",
  "How does it work?",
];

function TypingBubble() {
  return (
    <div className="flex items-end gap-2">
      <div className="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center text-[10px] font-bold text-white shrink-0">M</div>
      <div className="px-4 py-2.5 rounded-2xl rounded-bl-md bg-white/10 backdrop-blur-sm">
        <div className="flex gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-blue-300 animate-bounce [animation-delay:0ms]" />
          <span className="w-1.5 h-1.5 rounded-full bg-blue-300 animate-bounce [animation-delay:150ms]" />
          <span className="w-1.5 h-1.5 rounded-full bg-blue-300 animate-bounce [animation-delay:300ms]" />
        </div>
      </div>
    </div>
  );
}

function AskMark() {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'mark', text: "Hey! I'm Mark, your AI store operator. Ask me anything." }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const sendMessage = (text: string) => {
    if (!text.trim() || isTyping) return;
    const userMsg = text.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setIsTyping(true);

    // Simulate typing delay
    setTimeout(() => {
      setIsTyping(false);
      setMessages(prev => [...prev, { role: 'mark', text: getMarkResponse(userMsg) }]);
    }, 800 + Math.random() * 600);
  };

  return (
    <div className="flex flex-col w-full max-w-xs h-[340px] md:h-[360px] rounded-2xl overflow-hidden bg-black/20 backdrop-blur-md border border-white/10">
      {/* Header bar — iMessage style */}
      <div className="flex items-center gap-3 px-4 py-3 border-b border-white/10 bg-white/5">
        <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-xs font-bold text-white">M</div>
        <div>
          <p className="text-white text-sm font-semibold leading-tight">Mark</p>
          <p className="text-blue-300 text-[11px]">AI Store Operator</p>
        </div>
        <div className="ml-auto w-2 h-2 rounded-full bg-green-400 animate-pulse" />
      </div>

      {/* Messages */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-3 space-y-3 scrollbar-hide">
        {messages.map((msg, i) => (
          <div key={i} className={`flex items-end gap-2 ${msg.role === 'user' ? 'justify-end' : ''}`}>
            {msg.role === 'mark' && (
              <div className="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center text-[10px] font-bold text-white shrink-0">M</div>
            )}
            <div className={`max-w-[80%] px-4 py-2.5 text-sm leading-relaxed ${
              msg.role === 'user'
                ? 'bg-blue-500 text-white rounded-2xl rounded-br-md'
                : 'bg-white/10 text-blue-50 rounded-2xl rounded-bl-md backdrop-blur-sm'
            }`}>
              {msg.text}
            </div>
          </div>
        ))}
        {isTyping && <TypingBubble />}

        {/* Suggestion chips — only show at start */}
        {messages.length === 1 && !isTyping && (
          <div className="flex flex-wrap gap-2 pt-1">
            {SUGGESTIONS.map(s => (
              <button
                key={s}
                onClick={() => sendMessage(s)}
                className="px-3 py-1.5 text-xs text-blue-200 bg-white/10 hover:bg-white/20 rounded-full border border-white/10 transition-colors"
              >
                {s}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Input bar */}
      <div className="px-3 py-2.5 border-t border-white/10 bg-white/5">
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && sendMessage(input)}
            placeholder="Ask Mark anything..."
            className="flex-1 bg-white/10 text-white text-sm placeholder-blue-300/50 rounded-full px-4 py-2 outline-none focus:ring-1 focus:ring-blue-400/50 border border-white/10"
          />
          <button
            onClick={() => sendMessage(input)}
            disabled={!input.trim() || isTyping}
            className="w-8 h-8 rounded-full bg-blue-500 hover:bg-blue-400 disabled:opacity-40 flex items-center justify-center transition-colors shrink-0"
          >
            <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

export function SplineSceneBasic() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState<{ x: number; y: number } | null>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const handleMouseLeave = () => setMousePos(null);

  return (
    <div className="w-full px-4 md:px-8 py-20 bg-white relative overflow-hidden">
      <div className="max-w-6xl mx-auto">
        {/* Glassy container */}
        <div
          ref={containerRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className="relative flex flex-col md:flex-row items-center gap-8 p-8 md:p-12 rounded-3xl border border-white/40 bg-gradient-to-br from-blue-950 via-blue-900 to-indigo-950 shadow-[0_8px_32px_rgba(0,0,0,0.12)] overflow-hidden"
        >
          {/* Mouse hover glow */}
          {mousePos && (
            <div
              className="absolute pointer-events-none z-[1] rounded-full bg-white/15 blur-[60px] transition-opacity duration-300"
              style={{
                width: 250,
                height: 250,
                left: mousePos.x - 125,
                top: mousePos.y - 125,
              }}
            />
          )}
          {/* Interactive moving spotlight background */}
          <Spotlight
            className="-top-40 left-0 md:left-60 md:-top-20"
            fill="#4A90E2"
          />
          {/* Glass reflection overlay */}
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-white/[0.08] to-transparent pointer-events-none" />

          {/* Left content — text + chat */}
          <div className="flex-1 z-10 flex flex-col items-center md:items-start">
            <h1 className="text-5xl md:text-6xl font-bold text-white leading-tight mb-3">
              Meet Mark
            </h1>
            <p className="text-lg text-blue-200 leading-relaxed max-w-md mb-5">
              Mark works 24/7 and never needs a break. Crazy, right?
            </p>
            <AskMark />
          </div>

          {/* Right content — robot */}
          <div className="flex-1 relative h-[300px] md:h-[500px] w-full -mb-8 md:-mb-12">
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
