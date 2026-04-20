import type { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { Section } from "@/components/section";
import { ContactForm } from "@/components/contact-form";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Ainomiq. Send us a message and we'll respond within 24 hours.",
};

export default function ContactPage() {
  return (
    <>
      {/* Hero */}
      <section className="pt-40 pb-20 px-6">
        <div className="mx-auto max-w-4xl">
          <div className="mb-6 inline-flex items-center rounded-full bg-ainomiq-blue-glow px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-ainomiq-blue">
            Contact
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight leading-[1.05] mb-6">
            Let&apos;s Explore How Ainomiq{" "}
            <span className="gradient-text">Works for You</span>
          </h1>
          <p className="text-lg text-ainomiq-text-muted max-w-2xl">
            Tell us a little about yourself in the form below and we&apos;ll connect you with an Ainomiq expert who can share more about the product and answer any questions you have. Or email us directly at{" "}
            <a href="mailto:info@ainomiq.com" className="text-ainomiq-blue font-semibold hover:underline">info@ainomiq.com</a>.
          </p>
        </div>
      </section>

      {/* Form */}
      <Section className="bg-ainomiq-navy-light">
        <div className="max-w-2xl mx-auto">
          <ContactForm />
        </div>
      </Section>

      {/* CTA */}
      <section className="py-32 px-6 text-center">
        <div className="mx-auto max-w-2xl">
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-6">
            We respond within 24 hours
          </h2>
          <p className="text-lg text-ainomiq-text-muted mb-10 max-w-lg mx-auto">
            Fill in the form above or email us directly. No sales scripts, just a real conversation.
          </p>
          <Button
            asChild
            size="lg"
            className="rounded-full bg-ainomiq-blue hover:bg-ainomiq-blue-hover text-white px-10 h-12"
          >
            <a href="mailto:info@ainomiq.com">Email us directly</a>
          </Button>
        </div>
      </section>
    </>
  );
}
