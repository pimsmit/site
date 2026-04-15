import type { Metadata } from "next";
import { GetStartedWizard } from "@/components/get-started/wizard";
import { ProjectRequestForm } from "@/components/get-started/project-request-form";
import { Features } from "@/components/ui/features-9";
import { Testimonials } from "@/components/ui/unique-testimonial";
import { TestimonialsColumns } from "@/components/ui/testimonials-columns-1";

export const metadata: Metadata = {
  title: "Get Started",
  description:
    "Analyze your website and get a personalized automation recommendation from Ainomiq.",
};

export default function GetStartedPage() {
  return (
    <>
      <GetStartedWizard />
      <ProjectRequestForm />
      <Features />
      <Testimonials />
      <TestimonialsColumns />
    </>
  );
}
