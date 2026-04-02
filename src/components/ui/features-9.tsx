'use client'
import { Activity, Map as MapIcon, MessageCircle } from 'lucide-react'
import DottedMap from 'dotted-map'
import { Area, AreaChart, CartesianGrid } from 'recharts'
import { type ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart'

export function Features() {
    return (
        <section className="px-4 py-16 md:py-32">
            <div className="mx-auto grid max-w-5xl border border-ainomiq-border md:grid-cols-2">
                <div>
                    <div className="p-6 sm:p-12">
                        <span className="text-ainomiq-text-muted flex items-center gap-2">
                            <MapIcon className="size-4" />
                            Real time location tracking
                        </span>

                        <p className="mt-8 text-2xl font-semibold text-ainomiq-text">Advanced tracking system, Instantly locate all your assets.</p>
                    </div>

                    <div aria-hidden className="relative">
                        <div className="absolute inset-0 z-10 m-auto size-fit">
                            <div className="rounded-xl bg-white z-[1] relative flex size-fit w-fit items-center gap-2 border border-ainomiq-border px-3 py-1 text-xs font-medium text-ainomiq-text shadow-md shadow-black/5">
                                <span className="text-lg">🇨🇩</span> Last connection from DR Congo
                            </div>
                            <div className="rounded-xl bg-white absolute inset-2 -bottom-2 mx-auto border border-ainomiq-border px-3 py-4 text-xs font-medium shadow-md shadow-black/5"></div>
                        </div>

                        <div className="relative overflow-hidden">
                            <div className="[background-image:radial-gradient(var(--tw-gradient-stops))] z-1 to-white absolute inset-0 from-transparent to-75%"></div>
                            <Map />
                        </div>
                    </div>
                </div>
                <div className="overflow-hidden border-t border-ainomiq-border bg-ainomiq-navy-light p-6 sm:p-12 md:border-0 md:border-l">
                    <div className="relative z-10">
                        <span className="text-ainomiq-text-muted flex items-center gap-2">
                            <MessageCircle className="size-4" />
                            Email and web support
                        </span>

                        <p className="my-8 text-2xl font-semibold text-ainomiq-text">Reach out via email or web for any assistance you need.</p>
                    </div>
                    <div aria-hidden className="flex flex-col gap-8">
                        <div>
                            <div className="flex items-center gap-2">
                                <span className="flex justify-center items-center size-5 rounded-full border border-ainomiq-border">
                                    <span className="size-3 rounded-full bg-ainomiq-blue"/>
                                </span>
                                <span className="text-ainomiq-text-muted text-xs">Sat 22 Feb</span>
                            </div>
                            <div className="rounded-xl bg-white mt-1.5 w-3/5 border border-ainomiq-border p-3 text-xs text-ainomiq-text">Hey, I&apos;m having trouble with my account.</div>
                        </div>

                        <div>
                            <div className="rounded-xl mb-1 ml-auto w-3/5 bg-ainomiq-blue p-3 text-xs text-white">Molestiae numquam debitis et ullam distinctio provident nobis repudiandae deleniti necessitatibus.</div>
                            <span className="text-ainomiq-text-muted block text-right text-xs">Now</span>
                        </div>
                    </div>
                </div>
                <div className="col-span-full border-y border-ainomiq-border p-12">
                    <p className="text-center text-4xl font-semibold text-ainomiq-text lg:text-7xl">99.99% Uptime</p>
                </div>
                <div className="relative col-span-full">
                    <div className="absolute z-10 max-w-lg px-6 pr-12 pt-6 md:px-12 md:pt-12">
                        <span className="text-ainomiq-text-muted flex items-center gap-2">
                            <Activity className="size-4" />
                            Activity feed
                        </span>

                        <p className="my-8 text-2xl font-semibold text-ainomiq-text">
                            Monitor your application&apos;s activity in real-time. <span className="text-ainomiq-text-muted"> Instantly identify and resolve issues.</span>
                        </p>
                    </div>
                    <MonitoringChart />
                </div>
            </div>
        </section>
    )
}

const map = new DottedMap({ height: 55, grid: 'diagonal' })

const points = map.getPoints()

const svgOptions = {
    backgroundColor: 'white',
    color: 'currentColor',
    radius: 0.15,
}

const Map = () => {
    const viewBox = `0 0 120 60`
    return (
        <svg viewBox={viewBox} style={{ background: svgOptions.backgroundColor }}>
            {points.map((point, index) => (
                <circle key={index} cx={point.x} cy={point.y} r={svgOptions.radius} fill={svgOptions.color} />
            ))}
        </svg>
    )
}

const chartConfig = {
    desktop: {
        label: 'Desktop',
        color: '#3b82f6',
    },
    mobile: {
        label: 'Mobile',
        color: '#93c5fd',
    },
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
                margin={{
                    left: 0,
                    right: 0,
                }}>
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
