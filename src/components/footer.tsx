"use client";

import Link from "next/link";
import { Icon } from "@iconify/react";
import { LogoMark } from "@/components/logo";
import { ArrowUp } from "lucide-react";

const nav = [
  {
    title: "Product",
    links: [
      { href: "https://app.ainomiq.com", label: "App" },
      { href: "/enterprise", label: "Enterprise" },
      { href: "/demos", label: "Demos" },
    ],
  },
  {
    title: "Company",
    links: [
      { href: "/about", label: "About" },
      { href: "/contact", label: "Contact" },
    ],
  },
  {
    title: "Legal",
    links: [
      { href: "/privacy", label: "Privacy Policy" },
      { href: "/terms", label: "Terms of Service" },
    ],
  },
];

const socials = [
  { href: "mailto:info@ainomiq.com", label: "Email", icon: (
    <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25H4.5a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5H4.5a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
    </svg>
  )},
  { href: "https://linkedin.com/company/ainomiq", label: "LinkedIn", icon: (
    <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
    </svg>
  )},
  { href: "https://instagram.com/ainomiq", label: "Instagram", icon: (
    <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
    </svg>
  )},
];

const paymentIcons = [
  { icon: "logos:visa", label: "Visa" },
  { icon: "logos:mastercard", label: "Mastercard" },
  { icon: "logos:amex", label: "American Express" },
  { icon: "logos:paypal", label: "PayPal" },
  { icon: "logos:apple-pay", label: "Apple Pay" },
  { icon: "logos:google-pay", label: "Google Pay" },
];

export function Footer() {
  return (
    <footer className="border-t border-ainomiq-border bg-ainomiq-navy-light">
      <div className="mx-auto max-w-6xl px-6">

        {/* Main grid */}
        <div className="grid grid-cols-2 gap-10 py-14 md:grid-cols-5">
          {/* Brand */}
          <div className="col-span-2 md:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <LogoMark className="h-7 w-auto" />
            </Link>
            <p className="text-sm text-ainomiq-text-muted leading-relaxed max-w-xs">
              Automation that works. Built for businesses that want to move forward.
            </p>
          </div>

          {/* Nav columns */}
          {nav.map((col) => (
            <div key={col.title}>
              <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-ainomiq-text-subtle">
                {col.title}
              </p>
              <ul className="space-y-2">
                {col.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-ainomiq-text-muted hover:text-ainomiq-text transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="border-t border-ainomiq-border" />

        {/* Payment icons */}
        <div className="flex flex-wrap items-center justify-start gap-2 py-5">
          {paymentIcons.map((p) => (
            <div
              key={p.label}
              title={p.label}
              className="flex h-7 w-10 items-center justify-center rounded border border-ainomiq-border bg-white/5"
            >
              <Icon icon={p.icon} className="h-4 w-auto max-w-[28px]" />
            </div>
          ))}
          <div title="iDEAL" className="flex h-7 items-center justify-center rounded border border-ainomiq-border bg-white/5 overflow-hidden px-1.5">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/payment/ideal.png" alt="iDEAL" className="h-6 w-auto object-contain" />
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-ainomiq-border" />

        {/* Bottom bar */}
        <div className="flex flex-col items-center justify-between gap-4 py-6 sm:flex-row">
          {/* Copyright */}
          <p className="text-xs text-ainomiq-text-subtle">
            &copy; {new Date().getFullYear()} Ainomiq B.V. &mdash; KVK: 42032616 &mdash; All rights reserved.
          </p>

          {/* Socials + scroll top */}
          <div className="flex items-center gap-2">
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                aria-label={s.label}
                target={s.href.startsWith("http") ? "_blank" : undefined}
                rel={s.href.startsWith("http") ? "noopener noreferrer" : undefined}
                className="flex h-8 w-8 items-center justify-center rounded-full border border-ainomiq-border text-ainomiq-text-subtle hover:text-ainomiq-text hover:border-ainomiq-border-hover transition-colors"
              >
                {s.icon}
              </a>
            ))}

            <div className="mx-2 h-4 w-px bg-ainomiq-border" />

            <button
              type="button"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              aria-label="Back to top"
              className="flex h-8 w-8 items-center justify-center rounded-full border border-ainomiq-border text-ainomiq-text-subtle hover:text-ainomiq-text hover:border-ainomiq-border-hover transition-colors"
            >
              <ArrowUp className="h-3.5 w-3.5" />
            </button>
          </div>

          {/* Trust badges */}
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1 text-xs text-ainomiq-text-subtle">
              <svg className="h-3.5 w-3.5 text-green-400" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
              </svg>
              SSL Secured
            </span>
            <span className="flex items-center gap-1 text-xs text-ainomiq-text-subtle">
              <svg className="h-3.5 w-3.5 text-blue-400" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M7.864 4.243A7.5 7.5 0 0119.5 10.5c0 2.92-.556 5.709-1.568 8.268M5.742 6.364A7.465 7.465 0 004.5 10.5a7.464 7.464 0 01-1.15 3.993m1.989 3.559A11.209 11.209 0 008.25 10.5a3.75 3.75 0 117.5 0c0 .527-.021 1.049-.064 1.565M12 10.5a14.94 14.94 0 01-3.6 9.75m6.633-4.596a18.666 18.666 0 01-2.485 5.33" />
              </svg>
              GDPR Compliant
            </span>
          </div>
        </div>

      </div>
    </footer>
  );
}
