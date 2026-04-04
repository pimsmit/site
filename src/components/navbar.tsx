"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";
import {
  Menu,
  X,
  Headset,
  Package,
  Mail,
  ArrowRight,
  Layers,
  MessageCircle,
  Smartphone,
  ShoppingCart,
  Building2,
  Wrench,
  ChevronDown,
} from "lucide-react";
import { cn } from "@/lib/utils";

const productsEcommerce = [
  { href: "/platform#customer-service", label: "Customer Service", sub: "24/7 AI support", icon: Headset },
  { href: "/platform#smart-inventory", label: "Smart Inventory", sub: "Real-time stock tracking", icon: Package },
  { href: "/platform#email-marketing", label: "E-mail Marketing", sub: "Automated campaigns", icon: Mail },
  { href: "/platform", label: "See More", sub: "All features", icon: ArrowRight },
];

const productsCustom = [
  { href: "/enterprise#all-in-one", label: "All-in-one", sub: "Full automation suite", icon: Layers },
  { href: "/enterprise#chatbot", label: "Chatbot", sub: "Website & WhatsApp", icon: MessageCircle },
  { href: "/enterprise#app", label: "App", sub: "iOS / Playstore app", icon: Smartphone },
  { href: "/enterprise", label: "See More", sub: "All solutions", icon: ArrowRight },
];

const industries = [
  { href: "/platform", label: "E-commerce", sub: "Webshops & DTC", icon: ShoppingCart },
  { href: "/enterprise", label: "Franchise", sub: "Multi-location ops", icon: Building2 },
  { href: "/enterprise", label: "Facility Services", sub: "Field & maintenance", icon: Wrench },
];

const navLinks = [
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

type DropdownKey = "products" | "industries" | null;

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<DropdownKey>(null);
  const [mobileExpanded, setMobileExpanded] = useState<DropdownKey>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const pathname = usePathname();

  // Close dropdowns on route change
  useEffect(() => {
    setActiveDropdown(null);
    setMobileOpen(false);
    setMobileExpanded(null);
  }, [pathname]);

  const openDropdown = (key: DropdownKey) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setActiveDropdown(key);
  };

  const closeDropdown = () => {
    timeoutRef.current = setTimeout(() => setActiveDropdown(null), 150);
  };

  return (
    <div className="fixed top-0 left-0 right-0 z-50 pt-5 pointer-events-none px-4">
      <nav className="pointer-events-auto mx-auto flex max-w-3xl items-center justify-between rounded-full glass px-6 py-3 shadow-sm">
        <Logo />

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-1">
          {/* Products dropdown trigger */}
          <div
            className="relative"
            onMouseEnter={() => openDropdown("products")}
            onMouseLeave={closeDropdown}
          >
            <button
              className={cn(
                "flex items-center gap-1 px-3 py-2 text-sm font-medium rounded-lg transition-colors",
                activeDropdown === "products"
                  ? "text-ainomiq-text bg-ainomiq-surface"
                  : "text-ainomiq-text-muted hover:text-ainomiq-text"
              )}
            >
              Products
              <ChevronDown
                className={cn(
                  "h-3.5 w-3.5 transition-transform",
                  activeDropdown === "products" && "rotate-180"
                )}
              />
            </button>
          </div>

          {/* Industries dropdown trigger */}
          <div
            className="relative"
            onMouseEnter={() => openDropdown("industries")}
            onMouseLeave={closeDropdown}
          >
            <button
              className={cn(
                "flex items-center gap-1 px-3 py-2 text-sm font-medium rounded-lg transition-colors",
                activeDropdown === "industries"
                  ? "text-ainomiq-text bg-ainomiq-surface"
                  : "text-ainomiq-text-muted hover:text-ainomiq-text"
              )}
            >
              Industries
              <ChevronDown
                className={cn(
                  "h-3.5 w-3.5 transition-transform",
                  activeDropdown === "industries" && "rotate-180"
                )}
              />
            </button>
          </div>

          {/* Static links */}
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "px-3 py-2 text-sm font-medium rounded-lg transition-colors",
                pathname === link.href
                  ? "text-ainomiq-text"
                  : "text-ainomiq-text-muted hover:text-ainomiq-text"
              )}
            >
              {link.label}
            </Link>
          ))}

          <Button
            asChild
            size="sm"
            className="rounded-full bg-ainomiq-blue hover:bg-ainomiq-blue-hover text-white ml-2"
          >
            <Link href="/get-started">Get started</Link>
          </Button>
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden text-ainomiq-text"
          aria-label="Menu"
        >
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>

      {/* Desktop dropdown panels */}
      {activeDropdown && (
        <div
          className="pointer-events-auto hidden md:block mx-auto mt-2 max-w-3xl"
          onMouseEnter={() => openDropdown(activeDropdown)}
          onMouseLeave={closeDropdown}
        >
          <div className="rounded-2xl glass p-6 shadow-lg animate-fade-in">
            {activeDropdown === "products" && (
              <div className="grid grid-cols-2 gap-8">
                {/* Ecommerce Application */}
                <div>
                  <h3 className="text-xs font-semibold uppercase tracking-wider text-ainomiq-text-muted mb-3">
                    Ecommerce Application
                  </h3>
                  <div className="flex flex-col gap-1">
                    {productsEcommerce.map((item) => (
                      <Link
                        key={item.label}
                        href={item.href}
                        className="flex items-center gap-3 rounded-lg px-3 py-2.5 hover:bg-ainomiq-surface transition-colors"
                      >
                        <item.icon className="h-4 w-4 text-ainomiq-blue shrink-0 mt-0.5" />
                        <div>
                          <div className="text-sm font-medium text-ainomiq-text-muted group-hover:text-ainomiq-text">{item.label}</div>
                          <div className="text-xs text-ainomiq-text-subtle">{item.sub}</div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>

                {/* Custom Solutions */}
                <div>
                  <h3 className="text-xs font-semibold uppercase tracking-wider text-ainomiq-text-muted mb-3">
                    Custom Solutions
                  </h3>
                  <div className="flex flex-col gap-1">
                    {productsCustom.map((item) => (
                      <Link
                        key={item.label}
                        href={item.href}
                        className="flex items-center gap-3 rounded-lg px-3 py-2.5 hover:bg-ainomiq-surface transition-colors"
                      >
                        <item.icon className="h-4 w-4 text-ainomiq-blue shrink-0 mt-0.5" />
                        <div>
                          <div className="text-sm font-medium text-ainomiq-text-muted group-hover:text-ainomiq-text">{item.label}</div>
                          <div className="text-xs text-ainomiq-text-subtle">{item.sub}</div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeDropdown === "industries" && (
              <div>
                <h3 className="text-xs font-semibold uppercase tracking-wider text-ainomiq-text-muted mb-3">
                  Specialised in
                </h3>
                <div className="grid grid-cols-3 gap-1">
                  {industries.map((item) => (
                    <Link
                      key={item.label}
                      href={item.href}
                      className="flex items-center gap-3 rounded-lg px-3 py-2.5 hover:bg-ainomiq-surface transition-colors"
                    >
                      <item.icon className="h-4 w-4 text-ainomiq-blue shrink-0 mt-0.5" />
                      <div>
                        <div className="text-sm font-medium text-ainomiq-text-muted">{item.label}</div>
                        <div className="text-xs text-ainomiq-text-subtle">{item.sub}</div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="pointer-events-auto md:hidden mx-auto mt-3 max-w-3xl rounded-2xl glass p-6 shadow-lg">
          <div className="flex flex-col gap-2">
            {/* Products accordion */}
            <button
              onClick={() =>
                setMobileExpanded(mobileExpanded === "products" ? null : "products")
              }
              className="flex items-center justify-between text-base font-medium text-ainomiq-text-muted hover:text-ainomiq-text transition-colors py-1"
            >
              Products
              <ChevronDown
                className={cn(
                  "h-4 w-4 transition-transform",
                  mobileExpanded === "products" && "rotate-180"
                )}
              />
            </button>
            {mobileExpanded === "products" && (
              <div className="pl-2 flex flex-col gap-3 pb-2">
                <p className="text-xs font-semibold uppercase tracking-wider text-ainomiq-text-subtle mt-1">
                  Ecommerce Application
                </p>
                {productsEcommerce.map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center gap-2.5 text-sm text-ainomiq-text-muted hover:text-ainomiq-text"
                  >
                    <item.icon className="h-4 w-4 text-ainomiq-blue" />
                    {item.label}
                  </Link>
                ))}
                <p className="text-xs font-semibold uppercase tracking-wider text-ainomiq-text-subtle mt-2">
                  Custom Solutions
                </p>
                {productsCustom.map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center gap-2.5 text-sm text-ainomiq-text-muted hover:text-ainomiq-text"
                  >
                    <item.icon className="h-4 w-4 text-ainomiq-blue" />
                    {item.label}
                  </Link>
                ))}
              </div>
            )}

            {/* Industries accordion */}
            <button
              onClick={() =>
                setMobileExpanded(mobileExpanded === "industries" ? null : "industries")
              }
              className="flex items-center justify-between text-base font-medium text-ainomiq-text-muted hover:text-ainomiq-text transition-colors py-1"
            >
              Industries
              <ChevronDown
                className={cn(
                  "h-4 w-4 transition-transform",
                  mobileExpanded === "industries" && "rotate-180"
                )}
              />
            </button>
            {mobileExpanded === "industries" && (
              <div className="pl-2 flex flex-col gap-3 pb-2">
                <p className="text-xs font-semibold uppercase tracking-wider text-ainomiq-text-subtle mt-1">
                  Specialised in
                </p>
                {industries.map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center gap-2.5 text-sm text-ainomiq-text-muted hover:text-ainomiq-text"
                  >
                    <item.icon className="h-4 w-4 text-ainomiq-blue" />
                    {item.label}
                  </Link>
                ))}
              </div>
            )}

            {/* Static links */}
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className={cn(
                  "text-base font-medium transition-colors py-1",
                  pathname === link.href
                    ? "text-ainomiq-text"
                    : "text-ainomiq-text-muted hover:text-ainomiq-text"
                )}
              >
                {link.label}
              </Link>
            ))}

            <Button
              asChild
              className="rounded-full bg-ainomiq-blue hover:bg-ainomiq-blue-hover text-white mt-2"
            >
              <Link href="/get-started" onClick={() => setMobileOpen(false)}>
                Get started
              </Link>
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
