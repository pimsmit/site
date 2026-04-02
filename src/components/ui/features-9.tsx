'use client'

import { useState, useEffect, useRef, useMemo, useCallback, type FormEvent } from 'react'
import { Users, MessageCircle, Activity, Send } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
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

export function Features() {
    const [count, setCount] = useState(3)
    const [dots, setDots] = useState<LiveDot[]>([])
    const dotIdRef = useRef(0)
    const [chatInput, setChatInput] = useState('')
    const chatRef = useRef<HTMLDivElement>(null)

    const transport = useMemo(() => new DefaultChatTransport({ api: '/api/chat' }), [])
    const { messages, sendMessage, status, error } = useChat({ transport })

    // Counter updates every 5s
    useEffect(() => {
        const interval = setInterval(() => {
            setCount(3 + Math.floor(Math.random() * 28))
        }, 5000)
        return () => clearInterval(interval)
    }, [])

    // Dots appear organically: 1-3 new dots every 1.5s, each lives ~6s
    useEffect(() => {
        const spawnDots = () => {
            const now = Date.now()
            const newCount = 1 + Math.floor(Math.random() * 3)
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
        const interval = setInterval(spawnDots, 1500)
        return () => clearInterval(interval)
    }, [])

    useEffect(() => {
        if (chatRef.current) {
            chatRef.current.scrollTop = chatRef.current.scrollHeight
        }
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
                            <AnimatePresence mode="wait">
                                <motion.span
                                    key={count}
                                    initial={{ opacity: 0, y: 8 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -8 }}
                                    transition={{ duration: 0.3 }}
                                    className="inline-block text-ainomiq-blue font-bold tabular-nums"
                                >
                                    {count}
                                </motion.span>
                            </AnimatePresence>{' '}
                            People are now starting with Ainomiq
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
                            {messages.length === 0 && !error && (
                                <div className="rounded-xl bg-white border border-ainomiq-border p-3 text-xs text-ainomiq-text">
                                    Hi! Ask me anything about Ainomiq — our products, pricing, or how we can help your business.
                                </div>
                            )}
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
                    {/* Dot that fades in then fades out */}
                    <circle cx={dot.x} cy={dot.y} r={0} fill="#3b82f6">
                        <animate attributeName="r" values="0;0.5;0.5;0" keyTimes="0;0.1;0.8;1" dur="6s" fill="freeze" />
                        <animate attributeName="opacity" values="0;0.9;0.9;0" keyTimes="0;0.1;0.8;1" dur="6s" fill="freeze" />
                    </circle>
                    {/* Ripple ring */}
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
