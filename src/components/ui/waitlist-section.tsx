"use client"

import { useState } from "react"
import Link from "next/link"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { CheckCircle, Loader2, ArrowRight } from "lucide-react"

const KLAVIYO_COMPANY_ID = process.env.NEXT_PUBLIC_KLAVIYO_COMPANY_ID || ""
const KLAVIYO_LIST_ID = process.env.NEXT_PUBLIC_KLAVIYO_LIST_ID || ""

export function WaitlistSection() {
  const [email, setEmail] = useState("")
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!email || !email.includes("@")) return

    setStatus("loading")

    try {
      // Klaviyo Client API v3 — Subscribe to list
      const res = await fetch(
        `https://a.klaviyo.com/client/subscriptions/?company_id=${KLAVIYO_COMPANY_ID}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json", revision: "2024-10-15" },
          body: JSON.stringify({
            data: {
              type: "subscription",
              attributes: {
                custom_source: "ainomiq-website-waitlist",
                profile: {
                  data: {
                    type: "profile",
                    attributes: { email },
                  },
                },
              },
              relationships: {
                list: {
                  data: { type: "list", id: KLAVIYO_LIST_ID },
                },
              },
            },
          }),
        }
      )

      if (res.ok || res.status === 202) {
        setStatus("success")
        setEmail("")
      } else {
        setStatus("error")
      }
    } catch {
      setStatus("error")
    }
  }

  return (
    <section className="py-20 md:py-28 px-6 bg-white border-t border-gray-100">
      <div className="mx-auto max-w-5xl">
        <div className="flex flex-col md:flex-row items-center gap-12 md:gap-16">

          {/* Left — waitlist */}
          <div className="flex-1 w-full space-y-6">
            <div className="space-y-2">
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#0f1b2d]">
                Never miss new products.
              </h2>
              <p className="text-sm text-gray-500">
                We&apos;re always working on automations to help you scale.
              </p>
            </div>

            {status === "success" ? (
              <div className="flex items-center gap-2 text-green-600 font-medium">
                <CheckCircle className="w-5 h-5" />
                <span>You&apos;re on the list. We&apos;ll be in touch.</span>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex gap-2 max-w-sm">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-11 bg-gray-50 border-gray-200 text-[#0f1b2d] placeholder:text-gray-400"
                  required
                />
                <Button
                  type="submit"
                  disabled={status === "loading"}
                  className="h-11 px-5 bg-[#0f1b2d] hover:bg-[#1a2d4a] text-white font-semibold rounded-lg whitespace-nowrap"
                >
                  {status === "loading" ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    "Get Notified"
                  )}
                </Button>
              </form>
            )}

            {status === "error" && (
              <p className="text-xs text-red-500">Something went wrong. Please try again.</p>
            )}

            <div className="flex items-center gap-3">
              <div className="flex -space-x-2">
                <Avatar className="border-2 border-white w-8 h-8">
                  <AvatarFallback className="text-xs font-semibold bg-blue-600 text-white">JD</AvatarFallback>
                </Avatar>
                <Avatar className="border-2 border-white w-8 h-8">
                  <AvatarFallback className="text-xs font-semibold bg-blue-700 text-white">AS</AvatarFallback>
                </Avatar>
                <Avatar className="border-2 border-white w-8 h-8">
                  <AvatarFallback className="text-xs font-semibold bg-blue-800 text-white">MK</AvatarFallback>
                </Avatar>
              </div>
              <span className="text-xs text-gray-400">10,000+ people on the waitlist</span>
            </div>
          </div>

          {/* Divider */}
          <div className="hidden md:block w-px h-40 bg-gray-100" />

          {/* Right — CTA */}
          <div className="flex-1 w-full space-y-5 md:pl-4">
            <div className="space-y-2">
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#0f1b2d]">
                Ready to automate?
              </h2>
              <p className="text-sm text-gray-500 max-w-xs">
                Start with one module, grow to the full app.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Button
                asChild
                className="h-11 px-6 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-semibold"
              >
                <Link href="/get-started">Get started for free</Link>
              </Button>
              <Button
                asChild
                variant="outline"
                className="h-11 px-6 rounded-full border-gray-200 text-[#0f1b2d] font-semibold hover:border-gray-300"
              >
                <Link href="/contact">
                  Book a call <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
