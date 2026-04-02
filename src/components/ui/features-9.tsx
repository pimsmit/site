'use client'

import { useState, useEffect, useRef, useMemo, useCallback, type FormEvent } from 'react'
import { Users, MessageCircle, Activity, Send } from 'lucide-react'
import DottedMap from 'dotted-map'
import { Area, AreaChart, CartesianGrid } from 'recharts'
import { type ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart'
import { useChat } from '@ai-sdk/react'
import { DefaultChatTransport } from 'ai'

const map = new DottedMap({ height: 55, grid: 'diagonal' })
const mapPoints = map.getPoints()

// Pick N random land positions, deterministic per page load
function pickLandPoints(n: number) {
    const shuffled = [...mapPoints].sort(() => Math.random() - 0.5)
    return shuffled.slice(0, n).map((p, i) => ({
        x: p.x,
        y: p.y,
        phase: Math.random() * Math.PI * 2, // random pulse phase
        speed: 1.8 + Math.random() * 1.4,   // pulse speed 1.8-3.2s
    }))
}

function getBaseCount() {
    const hour = new Date().getHours()
    if (hour >= 9 && hour <= 17) return 38 + (hour - 9) * 3
    if (hour >= 18 && hour <= 22) return 52 - (hour - 18) * 4
    return 24 + hour
}

const INITIAL_MESSAGES = [
    {
        id: 'q1',
        role: 'user' as const,
        parts: [{ type: 'text' as const, text: 'Why Ainomiq?' }],
    },
    {
        id: 'a1',
        role: 'assistant' as const,
        parts: [{
            type: 'text' as const,
            text: "Honestly? Because we've been in your shoes. We ran webshops and other businesses, dealt with the same chaos, and built exactly what we needed. Ainomiq runs your customer support, optimizes your marketing, and tracks everything that matters.",
        }],
    },
]

export function Features() {
    const [count, setCount] = useState(() => getBaseCount() + Math.floor(Math.random() * 5 - 2))

    // Chat
    const [chatInput, setChatInput] = useState('')
    const chatRef = useRef<HTMLDivElement>(null)
    const transport = useMemo(() => new DefaultChatTransport({ api: '/api/chat' }), [])
    const { messages, sendMessage, status, error } = useChat({
        transport,
        messages: INITIAL_MESSAGES,
    })

    // Counter: guaranteed ±1-2 change every 5-8s
    useEffect(() => {
        const tick = () => {
            setCount(prev => {
                const base = getBaseCount()
                const diff = prev - base
                const pull = diff > 3 ? -1 : diff < -3 ? 1 : 0
                // Always change by at least 1
                const raw = pull + (Math.random() > 0.5 ? 1 : -1) + Math.round((Math.random() - 0.5) * 2)
                const delta = raw === 0 ? (Math.random() > 0.5 ? 1 : -1) : raw
                return Math.max(15, Math.min(base + 18, prev + delta))
            })
        }
        const id = setInterval(tick, 5000 + Math.floor(Math.random() * 3000))
        return () => clearInterval(id)
    }, [])

    useEffect(() => {
        if (chatRef.current) chatRef.current.scrollTop = chatRef.current.scrollHeight
    }, [messages])

    const handleSend = useCallback((e: FormEvent) => {
        e.preventDefault()
        if (!chatInput.trim() || status === 'streaming' || status === 'submitted') return
        sendMessage({ text: chatInput })
        setChatInput('')
    }, [chatInput, status, sendMessage])

    return (
        <section className="px-4 py-16 md:py-32">
            <div className="mx-auto grid max-w-5xl border border-ainomiq-border md:grid-cols-2">
                {/* Live activity map */}
                <div>
                    <div className="p-6 sm:p-12">
                        <span className="text-ainomiq-text-muted flex items-center gap-2">
                            <Users className="size-4" />
                            Live activity
                        </span>
                        <p className="mt-8 text-2xl font-semibold text-ainomiq-text">
                            <span className="text-ainomiq-blue font-bold tabular-nums">{count}</span>{' '}
                            people active now
                        </p>
                    </div>
                    <div className="relative overflow-hidden">
                        <div className="[background-image:radial-gradient(var(--tw-gradient-stops))] z-1 to-white absolute inset-0 from-transparent to-75%" />
                        <ActiveMap />
                    </div>
                </div>

                {/* Chat section */}
                <div className="flex flex-col overflow-hidden border-t border-ainomiq-border bg-ainomiq-navy-light md:border-0 md:border-l">
                    <div className="p-6 sm:px-12 sm:pt-12 sm:pb-4">
                        <span className="text-ainomiq-text-muted flex items-center gap-2">
                            <MessageCircle className="size-4" />
                            Chat with us
                        </span>
                        <p className="mt-4 text-2xl font-semibold text-ainomiq-text">We&apos;re there to help</p>
                    </div>
                    <div className="flex flex-1 flex-col px-6 sm:px-12 pb-6 sm:pb-12">
                        <div ref={chatRef} className="flex-1 space-y-3 overflow-y-auto mb-4 max-h-[220px]">
                            {messages.map((msg) => (
                                <div key={msg.id} className={msg.role === 'user' ? 'flex justify-end' : ''}>
                                    <div className={`rounded-xl p-3 text-xs max-w-[85%] ${
                                        msg.role === 'user'
                                            ? 'bg-ainomiq-blue text-white'
                                            : 'bg-white border border-ainomiq-border text-ainomiq-text'
                                    }`}>
                                        {msg.parts?.filter((p: any) => p.type === 'text').map((p: any, i: number) => (
                                            <span key={i}>{p.text}</span>
                                        ))}
                                    </div>
                                </div>
                            ))}
                            {status === 'submitted' && (
                                <div className="rounded-xl bg-white border border-ainomiq-border p-3 text-xs text-ainomiq-text-muted italic">
                                    Typing...
                                </div>
                            )}
                            {error && (
                                <div className="rounded-xl bg-white border border-ainomiq-border p-3 text-xs text-red-500">
                                    Something went wrong. Please try again.
                                </div>
                            )}
                        </div>
                        <form onSubmit={handleSend} className="flex gap-2">
                            <input
                                value={chatInput}
                                onChange={(e) => setChatInput(e.target.value)}
                                placeholder="Ask a question..."
                                className="flex-1 rounded-xl border border-ainomiq-border bg-white px-3 py-2 text-xs text-ainomiq-text placeholder:text-ainomiq-text-muted focus:outline-none focus:ring-1 focus:ring-ainomiq-blue"
                            />
                            <button
                                type="submit"
                                disabled={status === 'streaming' || status === 'submitted'}
                                className="shrink-0 rounded-xl bg-ainomiq-blue p-2 text-white hover:bg-ainomiq-blue-hover transition-colors disabled:opacity-50"
                            >
                                <Send className="size-3.5" />
                            </button>
                        </form>
                    </div>
                </div>

                {/* Uptime */}
                <div className="col-span-full border-y border-ainomiq-border p-12">
                    <p className="text-center text-4xl font-semibold text-ainomiq-text lg:text-7xl">99.99% Uptime</p>
                </div>

                {/* Activity chart */}
                <div className="relative col-span-full">
                    <div className="absolute z-10 max-w-lg px-6 pr-12 pt-6 md:px-12 md:pt-12">
                        <span className="text-ainomiq-text-muted flex items-center gap-2">
                            <Activity className="size-4" />
                            Your growth, visualized
                        </span>
                        <p className="my-8 text-2xl font-semibold text-ainomiq-text">
                            Track every metric that matters.{' '}
                            <span className="text-ainomiq-text-muted">
                                From revenue to engagement, always in real-time.
                            </span>
                        </p>
                    </div>
                    <MonitoringChart />
                </div>
            </div>
        </section>
    )
}

// Persistent dots that pulse — no spawning/despawning
const ActiveMap = () => {
    const [dots] = useState(() => pickLandPoints(18))

    return (
        <svg viewBox="0 0 120 60" style={{ background: 'white' }}>
            <defs>
                <filter id="glow">
                    <feGaussianBlur stdDeviation="0.5" result="blur" />
                    <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
                </filter>
            </defs>
            {mapPoints.map((point, index) => (
                <circle key={index} cx={point.x} cy={point.y} r={0.15} fill="currentColor" />
            ))}
            {dots.map((dot, i) => (
                <g key={i} filter="url(#glow)">
                    <circle cx={dot.x} cy={dot.y} r={0.6} fill="#3b82f6">
                        <animate
                            attributeName="r"
                            values="0.4;0.8;0.4"
                            dur={`${dot.speed}s`}
                            begin={`${(dot.phase / (Math.PI * 2)) * dot.speed}s`}
                            repeatCount="indefinite"
                        />
                        <animate
                            attributeName="opacity"
                            values="0.6;1;0.6"
                            dur={`${dot.speed}s`}
                            begin={`${(dot.phase / (Math.PI * 2)) * dot.speed}s`}
                            repeatCount="indefinite"
                        />
                    </circle>
                </g>
            ))}
        </svg>
    )
}

const chartConfig = {
    desktop: { label: 'Desktop', color: '#3b82f6' },
    mobile: { label: 'Mobile', color: '#93c5fd' },
} satisfies ChartConfig

const chartData = [
    { month: 'May', desktop: 56, mobile: 224 },
    { month: 'June', desktop: 56, mobile: 224 },
    { month: 'January', desktop: 126, mobile: 252 },
    { month: 'February', desktop: 205, mobile: 410 },
    { month: 'March', desktop: 200, mobile: 126 },
    { month: 'April', desktop: 400, mobile: 800 },
]

const MonitoringChart = () => {
    return (
        <ChartContainer className="h-120 aspect-auto md:h-96" config={chartConfig}>
            <AreaChart
                accessibilityLayer
                data={chartData}
                margin={{ left: 0, right: 0 }}>
                <defs>
                    <linearGradient id="fillDesktop" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="var(--color-desktop)" stopOpacity={0.8} />
                        <stop offset="55%" stopColor="var(--color-desktop)" stopOpacity={0.1} />
                    </linearGradient>
                    <linearGradient id="fillMobile" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="var(--color-mobile)" stopOpacity={0.8} />
                        <stop offset="55%" stopColor="var(--color-mobile)" stopOpacity={0.1} />
                    </linearGradient>
                </defs>
                <CartesianGrid vertical={false} />
                <ChartTooltip active cursor={false} content={<ChartTooltipContent />} />
                <Area strokeWidth={2} dataKey="mobile" type="stepBefore" fill="url(#fillMobile)" fillOpacity={0.1} stroke="var(--color-mobile)" stackId="a" />
                <Area strokeWidth={2} dataKey="desktop" type="stepBefore" fill="url(#fillDesktop)" fillOpacity={0.1} stroke="var(--color-desktop)" stackId="a" />
            </AreaChart>
        </ChartContainer>
    )
}
