import Link from "next/link";
import { LogoMark } from "@/components/logo";

const services = [
  { href: "https://app.ainomiq.com", label: "App" },
  { href: "/enterprise", label: "Enterprise" },
];

const company = [
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

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
                  <Link
                    href={link.href}
                    className="text-sm text-ainomiq-text-subtle transition-colors hover:text-ainomiq-text"
                  >
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
                  <Link
                    href={link.href}
                    className="text-sm text-ainomiq-text-subtle transition-colors hover:text-ainomiq-text"
                  >
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
                <a
                  href="mailto:info@ainomiq.com"
                  className="text-sm text-ainomiq-text-subtle transition-colors hover:text-ainomiq-text"
                >
                  info@ainomiq.com
                </a>
              </li>
              <li>
                <span className="text-sm text-ainomiq-text-subtle">
                  The Netherlands
                </span>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="mb-4 text-xs font-semibold uppercase tracking-wider text-ainomiq-text-muted">
              Legal
            </h4>
            <ul className="space-y-2.5">
              <li>
                <Link
                  href="/privacy"
                  className="text-sm text-ainomiq-text-subtle transition-colors hover:text-ainomiq-text"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="text-sm text-ainomiq-text-subtle transition-colors hover:text-ainomiq-text"
                >
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-16 border-t border-ainomiq-border pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <span className="text-xs text-ainomiq-text-subtle">
            &copy; {new Date().getFullYear()} Ainomiq B.V. &mdash; KVK: 42032616 &mdash; All rights reserved.
          </span>
          <div className="flex items-center gap-3 flex-wrap justify-end">
            <div className="flex items-center gap-1.5 rounded-full border border-ainomiq-border px-3 py-1">
              <svg className="h-3 w-3 text-ainomiq-blue" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd"/></svg>
              <span className="text-xs text-ainomiq-text-subtle">SSL Secured</span>
            </div>
            <div className="flex items-center gap-1.5 rounded-full border border-ainomiq-border px-3 py-1">
              <svg className="h-3 w-3 text-ainomiq-blue" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/></svg>
              <span className="text-xs text-ainomiq-text-subtle">GDPR Compliant</span>
            </div>
            {/* Stripe payment icons */}
            <div className="flex items-center gap-1.5">
              {/* Visa */}
              <svg className="h-6" viewBox="0 0 60 40" xmlns="http://www.w3.org/2000/svg">
                <rect width="60" height="40" rx="4" fill="#1a1f71"/>
                <text x="50%" y="58%" dominantBaseline="middle" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold" fontFamily="Arial">VISA</text>
              </svg>
              {/* Mastercard */}
              <svg className="h-6" viewBox="0 0 60 40" xmlns="http://www.w3.org/2000/svg">
                <rect width="60" height="40" rx="4" fill="#252525"/>
                <circle cx="22" cy="20" r="12" fill="#eb001b"/>
                <circle cx="38" cy="20" r="12" fill="#f79e1b"/>
                <path d="M30 10.5a12 12 0 010 19A12 12 0 0130 10.5z" fill="#ff5f00"/>
              </svg>
              {/* iDEAL */}
              <svg className="h-6" viewBox="0 0 60 40" xmlns="http://www.w3.org/2000/svg">
                <rect width="60" height="40" rx="4" fill="#cc0066"/>
                <text x="50%" y="58%" dominantBaseline="middle" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold" fontFamily="Arial">iDEAL</text>
              </svg>
              {/* Bancontact */}
              <svg className="h-6" viewBox="0 0 60 40" xmlns="http://www.w3.org/2000/svg">
                <rect width="60" height="40" rx="4" fill="#005498"/>
                <text x="50%" y="58%" dominantBaseline="middle" textAnchor="middle" fill="white" fontSize="8" fontWeight="bold" fontFamily="Arial">BANCONTACT</text>
              </svg>
              {/* SEPA */}
              <svg className="h-6" viewBox="0 0 60 40" xmlns="http://www.w3.org/2000/svg">
                <rect width="60" height="40" rx="4" fill="#003087"/>
                <text x="50%" y="58%" dominantBaseline="middle" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold" fontFamily="Arial">SEPA</text>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
