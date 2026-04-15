import type { Metadata } from "next";
import { CustomProjectsHero } from "@/components/get-started/custom-projects-hero";
import { ProjectRequestForm } from "@/components/get-started/project-request-form";
import { Features } from "@/components/ui/features-9";
import { Testimonials } from "@/components/ui/unique-testimonial";
import { TestimonialsColumns } from "@/components/ui/testimonials-columns-1";

export const metadata: Metadata = {
  title: "Custom Projects - Ainomiq",
  description:
    "Need a custom automation solution? Tell us what you need and we'll connect you with the right builder.",
};

export default function GetStartedPage() {
  return (
    <>
      <CustomProjectsHero />
      <ProjectRequestForm />
      <Features />
      <Testimonials />
      <TestimonialsColumns />
    </>
  );
}
