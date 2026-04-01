import Link from "next/link";
import { cn } from "@/lib/utils";

export function Logo({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      className={cn("text-xl font-bold tracking-tight", className)}
    >
      <span className="text-ainomiq-blue">ai</span>
      <span className="text-ainomiq-text">nomiq</span>
    </Link>
  );
}

export function LogoMark({ className }: { className?: string }) {
  return (
    <span className={cn("text-xl font-bold tracking-tight", className)}>
      <span className="text-ainomiq-blue">ai</span>
      <span className="text-ainomiq-text">nomiq</span>
    </span>
  );
}
