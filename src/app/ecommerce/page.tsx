import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ScaleWithoutLimits } from "@/components/ui/scale-without-limits";
import { EcomDynamicSections } from "@/components/ecom-dynamic-sections";
import {
  ArrowRight,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Ecommerce Application",
  description:
    "The Ainomiq app: intelligent modules working together to automate your e-commerce business.",
};

export default function PlatformPage() {
  return (
    <>
      {/* Stats — Scale Without Limits */}
      <ScaleWithoutLimits />

      {/* Heavy dynamic sections (client component wrapper) */}
      <EcomDynamicSections>
        </EcomDynamicSections>



    </>
  );
}
