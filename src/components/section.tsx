import { cn } from "@/lib/utils";

interface SectionProps {
  children: React.ReactNode;
  className?: string;
  label?: string;
  id?: string;
}

export function Section({ children, className, label, id }: SectionProps) {
  return (
    <section id={id} className={cn("scroll-mt-28 py-24 px-6", className)}>
      <div className="mx-auto max-w-6xl">
        {label && (
          <div className="mb-6 inline-flex items-center rounded-full bg-ainomiq-blue-glow px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-ainomiq-blue">
            {label}
          </div>
        )}
        {children}
      </div>
    </section>
  );
}
