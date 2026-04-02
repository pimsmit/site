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

// ── Counter helpers ──────────────────────────────────────────────
function getBaseCount() {
    const hour = new Date().getHours()
    // Time-of-day curve: peak ~18 during business hours, lower at night
    if (hour >= 9 && hour <= 17) return 12 + Math.round((hour - 9) * 0.8)
    if (hour >= 18 && hour <= 22) return 18 - (hour - 18) * 2
    return 5 + Math.round(hour * 0.3)
}

// ── Chat initial messages ────────────────────────────────────────
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

// ── Arc animation types & helpers ────────────────────────────────
interface Arc {
    fromX: number; fromY: number
    toX: number; toY: number
    cx: number; cy: number  // bezier control point
    duration: number        // ms
    startTime: number       // timestamp when arc starts
    delay: number           // ms to wait before starting
}

function pickTwoLandPoints(): [{ x: number; y: number }, { x: number; y: number }] {
    const a = mapPoints[Math.floor(Math.random() * mapPoints.length)]
    let b = a
    // Pick a second point at least 10 units away for visible travel
    let attempts = 0
    while (attempts < 50) {
        b = mapPoints[Math.floor(Math.random() * mapPoints.length)]
        const dist = Math.sqrt((b.x - a.x) ** 2 + (b.y - a.y) ** 2)
        if (dist > 10 && dist < 60) break
        attempts++
    }
    return [a, b]
}

function createArc(now: number, delay = 0): Arc {
    const [from, to] = pickTwoLandPoints()
    const midX = (from.x + to.x) / 2
    const midY = (from.y + to.y) / 2
    const dist = Math.sqrt((to.x - from.x) ** 2 + (to.y - from.y) ** 2)
    return {
        fromX: from.x, fromY: from.y,
        toX: to.x, toY: to.y,
        cx: midX, cy: midY - dist * 0.3, // arc rises proportional to distance
        duration: 2000 + Math.random() * 2000, // 2-4s travel
        startTime: now,
        delay,
    }
}

function getQuadraticPoint(
    x1: number, y1: number,
    cx: number, cy: number,
    x2: number, y2: number,
    t: number
) {
    const mt = 1 - t
    return {
        x: mt * mt * x1 + 2 * mt * t * cx + t * t * x2,
        y: mt * mt * y1 + 2 * mt * t * cy + t * t * y2,
    }
}

function easeInOutCubic(t: number) {
    return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2
}

// ── Main Features component ─────────────────────────────────────
export function Features() {
    const [count, setCount] = useState(() => {
        const base = getBaseCount()
        return Math.max(1, Math.min(30, base + Math.floor(Math.random() * 3 - 1)))
    })

    // Chat
    const [chatInput, setChatInput] = useState('')
    const chatRef = useRef<HTMLDivElement>(null)
    const transport = useMemo(() => new DefaultChatTransport({ api: '/api/chat' }), [])
    const { messages, sendMessage, status, error } = useChat({
        transport,
        messages: INITIAL_MESSAGES,
    })

    // Counter: range 1-30, small realistic jumps every 5-8s
    useEffect(() => {
        const tick = () => {
            setCount(prev => {
                const base = getBaseCount()
                const diff = prev - base
                // Mean-reverting: pull back if too far from base
                const pull = diff > 4 ? -1 : diff < -4 ? 1 : 0
                // Small delta: usually ±1, occasionally ±2
                const step = Math.random() > 0.7 ? 2 : 1
                const dir = Math.random() > 0.5 ? 1 : -1
                const delta = pull !== 0 ? pull * step : dir * step
                return Math.max(1, Math.min(30, prev + delta))
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
                            people starting now
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

// ── Animated Map with traveling arc dots ─────────────────────────
const NUM_ARCS = 6

const ActiveMap = () => {
    const svgRef = useRef<SVGSVGElement>(null)
    const arcsRef = useRef<Arc[]>([])
    const frameRef = useRef<number>(0)
    const dotRefs = useRef<(SVGCircleElement | null)[]>([])
    const trailRefs = useRef<(SVGPathElement | null)[]>([])
    const rippleRefs = useRef<(SVGCircleElement | null)[]>([])
    const rippleTimers = useRef<number[]>(new Array(NUM_ARCS).fill(0))

    useEffect(() => {
        // Initialize arcs with staggered delays
        const now = performance.now()
        arcsRef.current = Array.from({ length: NUM_ARCS }, (_, i) =>
            createArc(now, i * 600) // stagger by 600ms
        )

        const animate = (timestamp: number) => {
            for (let i = 0; i < NUM_ARCS; i++) {
                const arc = arcsRef.current[i]
                if (!arc) continue

                const elapsed = timestamp - arc.startTime - arc.delay
                if (elapsed < 0) {
                    // Still waiting for delay — hide dot
                    const dot = dotRefs.current[i]
                    if (dot) dot.setAttribute('opacity', '0')
                    const trail = trailRefs.current[i]
                    if (trail) trail.setAttribute('opacity', '0')
                    continue
                }

                const rawProgress = Math.min(elapsed / arc.duration, 1)
                const easedProgress = easeInOutCubic(rawProgress)

                // Position traveling dot
                const pos = getQuadraticPoint(
                    arc.fromX, arc.fromY,
                    arc.cx, arc.cy,
                    arc.toX, arc.toY,
                    easedProgress
                )

                const dot = dotRefs.current[i]
                if (dot) {
                    dot.setAttribute('cx', String(pos.x))
                    dot.setAttribute('cy', String(pos.y))
                    // Fade in first 10%, full in middle, fade out last 15%
                    const opacity = rawProgress < 0.1
                        ? rawProgress / 0.1
                        : rawProgress > 0.85
                            ? (1 - rawProgress) / 0.15
                            : 1
                    dot.setAttribute('opacity', String(Math.max(0, Math.min(1, opacity))))
                }

                // Animate trail path
                const trail = trailRefs.current[i]
                if (trail) {
                    trail.setAttribute('opacity', '1')
                    const path = `M ${arc.fromX} ${arc.fromY} Q ${arc.cx} ${arc.cy} ${arc.toX} ${arc.toY}`
                    trail.setAttribute('d', path)
                    const totalLen = trail.getTotalLength()
                    trail.style.strokeDasharray = `${totalLen}`
                    trail.style.strokeDashoffset = `${totalLen * (1 - rawProgress)}`
                }

                // Ripple at destination when arc completes
                const ripple = rippleRefs.current[i]
                if (rawProgress >= 1) {
                    // Trigger ripple
                    if (ripple && rippleTimers.current[i] === 0) {
                        ripple.setAttribute('cx', String(arc.toX))
                        ripple.setAttribute('cy', String(arc.toY))
                        rippleTimers.current[i] = timestamp
                    }

                    // Animate ripple expansion (300ms)
                    if (ripple && rippleTimers.current[i] > 0) {
                        const rippleElapsed = timestamp - rippleTimers.current[i]
                        const rippleProgress = Math.min(rippleElapsed / 400, 1)
                        ripple.setAttribute('r', String(0.3 + rippleProgress * 1.5))
                        ripple.setAttribute('opacity', String(0.6 * (1 - rippleProgress)))
                        ripple.setAttribute('stroke-width', String(0.15 * (1 - rippleProgress * 0.5)))
                    }

                    // After ripple completes, recycle arc
                    if (rippleTimers.current[i] > 0 && timestamp - rippleTimers.current[i] > 400) {
                        rippleTimers.current[i] = 0
                        if (ripple) ripple.setAttribute('opacity', '0')
                        arcsRef.current[i] = createArc(timestamp, 300 + Math.random() * 1500)
                    }
                }
            }
            frameRef.current = requestAnimationFrame(animate)
        }

        frameRef.current = requestAnimationFrame(animate)
        return () => cancelAnimationFrame(frameRef.current)
    }, [])

    return (
        <svg ref={svgRef} viewBox="0 0 120 60" style={{ background: 'white' }}>
            <defs>
                <filter id="glow">
                    <feGaussianBlur stdDeviation="0.4" result="blur" />
                    <feMerge>
                        <feMergeNode in="blur" />
                        <feMergeNode in="SourceGraphic" />
                    </feMerge>
                </filter>
            </defs>

            {/* Static map dots */}
            {mapPoints.map((point, index) => (
                <circle key={index} cx={point.x} cy={point.y} r={0.15} fill="currentColor" />
            ))}

            {/* Arc trails */}
            {Array.from({ length: NUM_ARCS }, (_, i) => (
                <path
                    key={`trail-${i}`}
                    ref={el => { trailRefs.current[i] = el }}
                    stroke="#3b82f6"
                    strokeWidth={0.12}
                    strokeOpacity={0.25}
                    fill="none"
                    opacity={0}
                />
            ))}

            {/* Arrival ripples */}
            {Array.from({ length: NUM_ARCS }, (_, i) => (
                <circle
                    key={`ripple-${i}`}
                    ref={el => { rippleRefs.current[i] = el }}
                    r={0}
                    fill="none"
                    stroke="#3b82f6"
                    strokeWidth={0.15}
                    opacity={0}
                />
            ))}

            {/* Traveling dots */}
            {Array.from({ length: NUM_ARCS }, (_, i) => (
                <circle
                    key={`dot-${i}`}
                    ref={el => { dotRefs.current[i] = el }}
                    r={0.45}
                    fill="#3b82f6"
                    filter="url(#glow)"
                    opacity={0}
                />
            ))}
        </svg>
    )
}

// ── Chart ────────────────────────────────────────────────────────
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
