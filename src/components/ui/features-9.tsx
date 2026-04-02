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

interface LiveDot {
    x: number
    y: number
    id: number
    born: number
}

const DOT_LIFETIME = 6000

// Time-of-day aware base count — more realistic than random jumps
function getBaseCount() {
    const hour = new Date().getHours()
    if (hour >= 9 && hour <= 17) return 38 + (hour - 9) * 3  // business hours: 38-62
    if (hour >= 18 && hour <= 22) return 52 - (hour - 18) * 4 // evening: 52-36
    return 24 + hour                                           // night: 24-32
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
            text: "Honestly? Because we've been in your shoes. We ran webshops and other businesses, dealt with the same chaos, and built exactly what we needed. Ainomiq runs your customer support, optimizes your marketing, and tracks everything that matters. You start free, you're live in two weeks.",
        }],
    },
]

export function Features() {
    // Realistic counter: mean-reverting random walk with small deltas
    const [count, setCount] = useState(() => getBaseCount() + Math.floor(Math.random() * 5 - 2))
    const timeoutRef = useRef<ReturnType<typeof setTimeout>>(null)

    // Organic dots
    const [dots, setDots] = useState<LiveDot[]>([])
    const dotIdRef = useRef(0)

    // Chat
    const [chatInput, setChatInput] = useState('')
    const chatRef = useRef<HTMLDivElement>(null)
    const transport = useMemo(() => new DefaultChatTransport({ api: '/api/chat' }), [])
    const { messages, sendMessage, status, error } = useChat({
        transport,
        messages: INITIAL_MESSAGES,
    })

    // Counter: small +/- changes every 4-7s, mean-reverting toward base
    useEffect(() => {
        const tick = () => {
            setCount(prev => {
                const base = getBaseCount()
                const diff = prev - base
                // Pull gently toward base
                const pull = -Math.sign(diff) * Math.min(Math.abs(diff) * 0.25, 1)
                const noise = (Math.random() - 0.48) * 2.5 // slight upward bias
                const delta = Math.round(pull + noise)
                // Clamp: never below 12, never above base+20
                return Math.max(12, Math.min(base + 20, prev + delta))
            })
            timeoutRef.current = setTimeout(tick, 4000 + Math.random() * 3000)
        }
        timeoutRef.current = setTimeout(tick, 4000 + Math.random() * 3000)
        return () => { if (timeoutRef.current) clearTimeout(timeoutRef.current) }
    }, [])

    // Dots: 1-2 new dots every 2s, each lives 6s
    useEffect(() => {
        const spawnDots = () => {
            const now = Date.now()
            const newCount = 1 + Math.floor(Math.random() * 2)
            setDots(prev => {
                const alive = prev.filter(d => now - d.born < DOT_LIFETIME)
                const spawned = Array.from({ length: newCount }, () => {
                    const point = mapPoints[Math.floor(Math.random() * mapPoints.length)]
                    return { x: point.x, y: point.y, id: dotIdRef.current++, born: now }
                })
                return [...alive, ...spawned]
            })
        }
        spawnDots()
        const interval = setInterval(spawnDots, 2000)
        return () => clearInterval(interval)
    }, [])

    // Auto-scroll chat
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
                            people explored Ainomiq today
                        </p>
                    </div>
                    <div className="relative overflow-hidden">
                        <div className="[background-image:radial-gradient(var(--tw-gradient-stops))] z-1 to-white absolute inset-0 from-transparent to-75%" />
                        <MapWithDots dots={dots} />
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

const MapWithDots = ({ dots }: { dots: LiveDot[] }) => {
    return (
        <svg viewBox="0 0 120 60" style={{ background: 'white' }}>
            {mapPoints.map((point, index) => (
                <circle key={index} cx={point.x} cy={point.y} r={0.15} fill="currentColor" />
            ))}
            {dots.map((dot) => (
                <g key={dot.id}>
                    <circle cx={dot.x} cy={dot.y} r={0} fill="#3b82f6">
                        <animate attributeName="r" values="0;0.5;0.5;0" keyTimes="0;0.1;0.8;1" dur="6s" fill="freeze" />
                        <animate attributeName="opacity" values="0;0.9;0.9;0" keyTimes="0;0.1;0.8;1" dur="6s" fill="freeze" />
                    </circle>
                    <circle cx={dot.x} cy={dot.y} r={0.5} fill="none" stroke="#3b82f6" strokeWidth={0.08}>
                        <animate attributeName="r" from="0.5" to="1.8" dur="2s" repeatCount="2" />
                        <animate attributeName="opacity" from="0.5" to="0" dur="2s" repeatCount="2" />
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
