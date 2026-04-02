import type { Metadata } from "next";
import { GetStartedWizard } from "@/components/get-started/wizard";
import { Features } from "@/components/ui/features-9";

export const metadata: Metadata = {
  title: "Get Started",
  description:
    "Analyze your website and get a personalized AI automation recommendation from Ainomiq.",
};

export default function GetStartedPage() {
  return (
    <>
      <GetStartedWizard />
      <Features />
    </>
  );
}
