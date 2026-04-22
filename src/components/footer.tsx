"use client";

import Link from "next/link";
import { useTheme } from "next-themes";
import { Sun, Moon, ArrowUp, Mail, Linkedin, Instagram } from "lucide-react";
import { LogoMark } from "@/components/logo";

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: "smooth" });
}

const services = [
  { href: "https://app.ainomiq.com", label: "App" },
  { href: "/enterprise", label: "Enterprise" },
];

const company = [
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

const legal = [
  { href: "/privacy", label: "Privacy Policy" },
  { href: "/terms", label: "Terms of Service" },
];

// Inline SVG payment icons — consistent pill cards
const PaymentIcons = () => (
  <div className="flex items-center justify-center gap-1.5 flex-wrap">
    <div className="h-7 px-2 rounded bg-ainomiq-navy border border-ainomiq-border flex items-center justify-center">
      <svg viewBox="0 0 50 16" height="12" xmlns="http://www.w3.org/2000/svg">
        <text x="0" y="13" fill="#1A1F71" fontSize="16" fontWeight="900" fontFamily="Arial, sans-serif" letterSpacing="-0.5">VISA</text>
      </svg>
    </div>
    <div className="h-7 px-1.5 rounded bg-[#252525] border border-gray-700 flex items-center justify-center">
      <svg viewBox="0 0 30 20" height="16" xmlns="http://www.w3.org/2000/svg">
        <circle cx="10" cy="10" r="10" fill="#EB001B"/>
        <circle cx="20" cy="10" r="10" fill="#F79E1B"/>
        <path d="M15 3.8a10 10 0 010 12.4A10 10 0 0115 3.8z" fill="#FF5F00"/>
      </svg>
    </div>
    <div className="h-7 px-2 rounded bg-[#2E77BC] border border-[#2E77BC] flex items-center justify-center">
      <svg viewBox="0 0 40 14" height="10" xmlns="http://www.w3.org/2000/svg">
        <text x="0" y="12" fill="white" fontSize="11" fontWeight="700" fontFamily="Arial, sans-serif" letterSpacing="0.5">AMEX</text>
      </svg>
    </div>
    <div className="h-7 px-2 rounded bg-[#003087] border border-[#003087] flex items-center justify-center">
      <svg viewBox="0 0 48 14" height="11" xmlns="http://www.w3.org/2000/svg">
        <text x="0" y="12" fill="#009CDE" fontSize="12" fontWeight="700" fontFamily="Arial, sans-serif">Pay</text>
        <text x="22" y="12" fill="white" fontSize="12" fontWeight="700" fontFamily="Arial, sans-serif">Pal</text>
      </svg>
    </div>
    <div className="h-7 px-2.5 rounded bg-black border border-gray-700 flex items-center justify-center">
      <svg viewBox="0 0 52 20" height="13" fill="white" xmlns="http://www.w3.org/2000/svg">
        <path d="M9.5 4.2c-.6.7-1.5 1.2-2.4 1.1-.1-.9.3-1.9.9-2.5.6-.7 1.6-1.2 2.4-1.2.1.9-.3 1.9-.9 2.6zm.9 1.4c-1.3-.1-2.5.8-3.1.8-.7 0-1.6-.7-2.7-.7C2.9 5.8 1.7 6.7 1 8c-1.2 2.1-.3 5.2.9 6.9.6.9 1.2 1.7 2.1 1.7s1.2-.6 2.3-.6 1.4.6 2.3.6 1.5-.8 2.1-1.7c.7-1 1-1.9 1-1.9-1-.4-1.9-1.4-1.9-2.6 0-1.1.5-2 1.4-2.6-.5-.7-1.3-1.2-2.8-1.2z"/>
        <path d="M20 3.5v12h1.9V10.5h2.6c2.4 0 4-1.6 4-4s-1.6-3.9-4-3.9H20zm1.9 1.7h2.2c1.6 0 2.5.9 2.5 2.2s-.9 2.2-2.5 2.2h-2.2V5.2zm8.9 10.3c1.2 0 2.3-.6 2.8-1.5v1.4h1.7V9.3c0-1.7-1.4-2.8-3.5-2.8-2 0-3.4 1.1-3.5 2.7h1.7c.1-.8.8-1.3 1.7-1.3 1.1 0 1.7.5 1.7 1.4v.6l-2.3.2c-2 .1-3.2 1-3.2 2.5 0 1.6 1.2 2.6 2.9 2.6zm.5-1.4c-.9 0-1.6-.5-1.6-1.2 0-.8.6-1.2 1.7-1.3l2-.2v.7c0 1.1-1 2-2.1 2zm6 5c1.8 0 2.6-.7 3.3-2.7l3.2-8.9h-1.9l-2 6.5-2.1-6.5h-2l3.1 8.5-.2.5c-.3.8-.7 1.2-1.5 1.2h-.9v1.4h1z"/>
      </svg>
    </div>
    <div className="h-7 px-2 rounded bg-ainomiq-navy border border-ainomiq-border flex items-center justify-center">
      <svg viewBox="0 0 50 20" height="14" xmlns="http://www.w3.org/2000/svg">
        <path d="M23.5 9.8c0-.5 0-.9-.1-1.3h-6v2.5h3.4c-.1.8-.6 1.5-1.3 2v1.6h2c1.2-1.1 1.9-2.6 1.9-4.4l.1-.4z" fill="#4285F4"/>
        <path d="M17.4 15c1.7 0 3.2-.6 4.2-1.5l-2-1.6c-.6.4-1.3.6-2.2.6-1.7 0-3.1-1.1-3.6-2.6h-2.1v1.7c1 2.1 3.2 3.4 5.7 3.4z" fill="#34A853"/>
        <path d="M13.8 9.9c-.3-.8-.3-1.7 0-2.5V5.8h-2.1c-.9 1.8-.9 3.8 0 5.6l2.1-1.5z" fill="#FBBC05"/>
        <path d="M17.4 6.8c1 0 1.8.3 2.5 1l1.8-1.8c-1.1-1-2.6-1.6-4.3-1.6-2.5 0-4.7 1.4-5.7 3.5l2.1 1.6c.5-1.5 1.9-2.6 3.6-2.6l.3-.1z" fill="#EA4335"/>
        <text x="27" y="14" fill="#3C4043" fontSize="10" fontWeight="500" fontFamily="Arial, sans-serif">Pay</text>
      </svg>
    </div>
    <div className="h-7 px-2 rounded bg-ainomiq-navy border border-ainomiq-border flex items-center justify-center">
      <svg viewBox="0 0 44 16" height="12" xmlns="http://www.w3.org/2000/svg">
        <text x="0" y="13" fill="#CC0066" fontSize="14" fontWeight="900" fontFamily="Arial, sans-serif">iDEAL</text>
      </svg>
    </div>
    <div className="h-7 px-2.5 rounded border flex items-center justify-center" style={{background:"#FFB3C7", borderColor:"#FF8FAB"}}>
      <svg viewBox="0 0 46 14" height="10" xmlns="http://www.w3.org/2000/svg">
        <text x="0" y="12" fill="#17120F" fontSize="12" fontWeight="700" fontFamily="Arial, sans-serif">klarna</text>
      </svg>
    </div>
    <div className="h-7 px-2 rounded bg-[#005498] border border-[#005498] flex items-center justify-center">
      <svg viewBox="0 0 64 14" height="9" xmlns="http://www.w3.org/2000/svg">
        <text x="0" y="11" fill="white" fontSize="10" fontWeight="700" fontFamily="Arial, sans-serif">Bancontact</text>
      </svg>
    </div>
  </div>
);

function ThemeToggle() {
  const { setTheme } = useTheme();
  return (
    <div className="flex items-center justify-center">
      <div className="flex items-center rounded-full border border-dotted border-ainomiq-border px-1 py-1 gap-1">
        <button
          onClick={() => setTheme("light")}
          className="rounded-full p-1.5 text-ainomiq-text-subtle hover:text-ainomiq-text hover:bg-ainomiq-navy-light transition-colors"
          aria-label="Light mode"
        >
          <Sun className="h-4 w-4" strokeWidth={1.5} />
        </button>
        <button
          type="button"
          onClick={scrollToTop}
          className="rounded-full p-1.5 text-ainomiq-text-subtle hover:text-ainomiq-text hover:bg-ainomiq-navy-light transition-colors"
          aria-label="Back to top"
        >
          <ArrowUp className="h-3 w-3" />
        </button>
        <button
          onClick={() => setTheme("dark")}
          className="rounded-full p-1.5 text-ainomiq-text-subtle hover:text-ainomiq-text hover:bg-ainomiq-navy-light transition-colors"
          aria-label="Dark mode"
        >
          <Moon className="h-4 w-4" strokeWidth={1.5} />
        </button>
      </div>
    </div>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-ainomiq-border">
      <div className="mx-auto max-w-6xl px-6 pt-16 pb-8">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-5">
          {/* Brand */}
          <div className="md:col-span-1">
            <LogoMark className="mb-4 block text-xl" />
            <p className="text-sm leading-relaxed text-ainomiq-text-subtle max-w-[28ch]">
              Automation that works. Built for businesses that want to move forward.
            </p>
          </div>

          {/* Services */}
          <div>
            <h4 className="mb-4 text-xs font-semibold uppercase tracking-wider text-ainomiq-text-muted">
              Services
            </h4>
            <ul className="space-y-2.5">
              {services.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-ainomiq-text-subtle transition-colors hover:text-ainomiq-text">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="mb-4 text-xs font-semibold uppercase tracking-wider text-ainomiq-text-muted">
              Company
            </h4>
            <ul className="space-y-2.5">
              {company.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-ainomiq-text-subtle transition-colors hover:text-ainomiq-text">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="mb-4 text-xs font-semibold uppercase tracking-wider text-ainomiq-text-muted">
              Contact
            </h4>
            <ul className="space-y-2.5">
              <li>
                <a href="mailto:info@ainomiq.com" className="text-sm text-ainomiq-text-subtle transition-colors hover:text-ainomiq-text">
                  info@ainomiq.com
                </a>
              </li>
              <li>
                <span className="text-sm text-ainomiq-text-subtle">The Netherlands</span>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="mb-4 text-xs font-semibold uppercase tracking-wider text-ainomiq-text-muted">
              Legal
            </h4>
            <ul className="space-y-2.5">
              {legal.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-ainomiq-text-subtle transition-colors hover:text-ainomiq-text">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="mt-12 border-b border-dotted border-ainomiq-border" />

        {/* Social + Theme toggle */}
        <div className="py-8 flex flex-wrap items-center justify-center gap-6">
          <a href="mailto:info@ainomiq.com" aria-label="Email" className="hover:-translate-y-1 border border-dotted border-ainomiq-border rounded-xl p-2.5 transition-transform text-ainomiq-text-subtle hover:text-ainomiq-text">
            <Mail className="h-5 w-5" strokeWidth={1.5} />
          </a>
          <a href="https://www.linkedin.com/company/ainomiq" target="_blank" rel="noreferrer" aria-label="LinkedIn" className="hover:-translate-y-1 border border-dotted border-ainomiq-border rounded-xl p-2.5 transition-transform text-ainomiq-text-subtle hover:text-ainomiq-text">
            <Linkedin className="h-5 w-5" strokeWidth={1.5} />
          </a>
          <a href="https://www.instagram.com/ainomiq" target="_blank" rel="noreferrer" aria-label="Instagram" className="hover:-translate-y-1 border border-dotted border-ainomiq-border rounded-xl p-2.5 transition-transform text-ainomiq-text-subtle hover:text-ainomiq-text">
            <Instagram className="h-5 w-5" strokeWidth={1.5} />
          </a>
          <ThemeToggle />
        </div>

        <div className="border-b border-dotted border-ainomiq-border" />

        {/* Payment icons */}
        <div className="py-6">
          <PaymentIcons />
        </div>

        {/* Copyright */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-3 mt-2">
          <span className="text-xs text-ainomiq-text-subtle">
            &copy; {new Date().getFullYear()} Ainomiq B.V. &mdash; KVK: 42032616 &mdash; All rights reserved.
          </span>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 rounded-full border border-ainomiq-border px-3 py-1">
              <svg className="h-3 w-3 text-ainomiq-blue" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd"/>
              </svg>
              <span className="text-xs text-ainomiq-text-subtle">SSL Secured</span>
            </div>
            <div className="flex items-center gap-1.5 rounded-full border border-ainomiq-border px-3 py-1">
              <svg className="h-3 w-3 text-ainomiq-blue" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
              </svg>
              <span className="text-xs text-ainomiq-text-subtle">GDPR Compliant</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
