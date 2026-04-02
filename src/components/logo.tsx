import Link from "next/link";
import { cn } from "@/lib/utils";

export function Logo({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      className={cn("block", className)}
    >
      <img
        src="/logos/ainomiq-wordmark.png"
        alt="Ainomiq"
        className="h-7 w-auto object-contain mix-blend-multiply"
      />
    </Link>
  );
}

export function LogoMark({ className }: { className?: string }) {
  return (
    <span className={cn("block", className)}>
      <img
        src="/logos/ainomiq-wordmark.png"
        alt="Ainomiq"
        className="h-7 w-auto object-contain mix-blend-multiply"
      />
    </span>
  );
}
