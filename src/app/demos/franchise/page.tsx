import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { FranchiseDashboard } from "@/components/ui/franchise-dashboard";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Franchise Demo - Ainomiq",
  description:
    "Live interactive demo: see exactly how Ainomiq runs a 10-location restaurant franchise. Real-time AI actions, per-location insights, and full automation visibility.",
};

export default function FranchiseDemoPage() {
  return (
    <main className="min-h-screen pt-28 pb-24 px-4">
      {/* Back breadcrumb */}
      <div className="mx-auto max-w-7xl mb-8">
        <Link
          href="/demos"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to demos
        </Link>
      </div>

      {/* Header */}
      <div className="mx-auto max-w-7xl mb-10 text-center">
        <div className="mb-4 inline-flex items-center rounded-full bg-ainomiq-blue-glow px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-ainomiq-blue">
          Live Demo
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
          Franchise Operations Dashboard
        </h1>
        <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
          This is what your franchise operations look like with Ainomiq. Click through all tabs, filter by location, and explore real-time AI actions across 10 locations.
        </p>
      </div>

      {/* Full-width interactive dashboard */}
      <div className="mx-auto max-w-7xl">
        <FranchiseDashboard />
      </div>

      {/* CTA below */}
      <div className="mx-auto max-w-2xl mt-16 text-center">
        <p className="text-muted-foreground mb-6">
          Ready to run your franchise like this?
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Button asChild size="lg" className="rounded-xl px-8">
            <Link href="/get-started">
              Get started <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
          <Button asChild size="lg" variant="outline" className="rounded-xl px-8">
            <Link href="/franchise">See how it works</Link>
          </Button>
        </div>
      </div>
    </main>
  );
}
