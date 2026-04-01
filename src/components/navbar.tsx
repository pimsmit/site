"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

const links = [
  { href: "/platform", label: "Platform" },
  { href: "/enterprise", label: "Enterprise" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <div className="fixed top-0 left-0 right-0 z-50 pt-5 pointer-events-none px-4">
      <nav className="pointer-events-auto mx-auto flex max-w-3xl items-center justify-between rounded-full glass px-6 py-3 shadow-sm">
        <Logo />

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-6">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "text-sm font-medium transition-colors",
                pathname === link.href
                  ? "text-ainomiq-text"
                  : "text-ainomiq-text-muted hover:text-ainomiq-text"
              )}
            >
              {link.label}
            </Link>
          ))}
          <Button asChild size="sm" className="rounded-full bg-ainomiq-blue hover:bg-ainomiq-blue-hover text-white">
            <Link href="/get-started">Get started</Link>
          </Button>
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden text-ainomiq-text"
          aria-label="Menu"
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div className="pointer-events-auto md:hidden mx-auto mt-3 max-w-3xl rounded-2xl glass p-6 shadow-lg">
          <div className="flex flex-col gap-4">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className={cn(
                  "text-base font-medium transition-colors",
                  pathname === link.href
                    ? "text-ainomiq-text"
                    : "text-ainomiq-text-muted hover:text-ainomiq-text"
                )}
              >
                {link.label}
              </Link>
            ))}
            <Button asChild className="rounded-full bg-ainomiq-blue hover:bg-ainomiq-blue-hover text-white mt-2">
              <Link href="/get-started" onClick={() => setOpen(false)}>
                Get started
              </Link>
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
