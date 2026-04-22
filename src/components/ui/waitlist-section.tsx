"use client"

import { useState } from "react"
import Link from "next/link"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { CheckCircle, Loader2 } from "lucide-react"

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
      // Klaviyo Client API v3 - Subscribe to list
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
    <section className="py-20 md:py-28 px-6 bg-ainomiq-navy">
      <div className="mx-auto max-w-2xl">
        <div className="w-full space-y-6">
            <div className="space-y-2">
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#0f1b2d]">
                Never miss new products.
              </h2>
              <p className="text-sm text-ainomiq-text-subtle">
                We&apos;re always working on automations to help you scale.
              </p>
            </div>

            {status === "success" ? (
              <div className="flex items-center gap-2 text-green-600 font-medium">
                <CheckCircle className="w-5 h-5" />
                <span>You&apos;re on the list. We&apos;ll be in touch.</span>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-wrap gap-2">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-11 bg-ainomiq-surface border-ainomiq-border text-[#0f1b2d] placeholder:text-ainomiq-text-subtle flex-1 min-w-[180px]"
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
                <Button
                  asChild
                  className="h-11 px-5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold whitespace-nowrap"
                >
                  <Link href="/get-started">Get started for free</Link>
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
              <span className="text-xs text-ainomiq-text-subtle">10,000+ people on the waitlist</span>
            </div>
        </div>
      </div>
    </section>
  )
}
