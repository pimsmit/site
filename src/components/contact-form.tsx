"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, MapPin, CheckCircle } from "lucide-react";

export function ContactForm() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const form = e.currentTarget;
    const data = {
      name: (form.elements.namedItem("name") as HTMLInputElement).value,
      email: (form.elements.namedItem("email") as HTMLInputElement).value,
      company: (form.elements.namedItem("company") as HTMLInputElement).value,
      phone: (form.elements.namedItem("phone") as HTMLInputElement).value,
      message: (form.elements.namedItem("message") as HTMLTextAreaElement).value,
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const json = await res.json();
        throw new Error(json.error || "Something went wrong.");
      }

      setSuccess(true);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please email us directly.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Card className="bg-white border-ainomiq-border">
      <CardContent className="p-8 md:p-10">
        {success ? (
          <div className="flex flex-col items-center justify-center py-12 text-center gap-4">
            <CheckCircle className="h-12 w-12 text-ainomiq-blue" />
            <h3 className="text-xl font-bold text-ainomiq-text">Message sent!</h3>
            <p className="text-ainomiq-text-muted max-w-sm">
              Thanks for reaching out. We&apos;ll get back to you within 24 hours.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label
                  htmlFor="name"
                  className="mb-2 block text-sm font-medium text-ainomiq-text-muted"
                >
                  Name *
                </label>
                <Input
                  id="name"
                  name="name"
                  placeholder="Your full name"
                  required
                  className="bg-white border-ainomiq-border text-ainomiq-text placeholder:text-ainomiq-text-subtle focus-visible:ring-ainomiq-blue"
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-medium text-ainomiq-text-muted"
                >
                  Email *
                </label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="name@company.com"
                  required
                  className="bg-white border-ainomiq-border text-ainomiq-text placeholder:text-ainomiq-text-subtle focus-visible:ring-ainomiq-blue"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label
                  htmlFor="company"
                  className="mb-2 block text-sm font-medium text-ainomiq-text-muted"
                >
                  Company
                </label>
                <Input
                  id="company"
                  name="company"
                  placeholder="Company name"
                  className="bg-white border-ainomiq-border text-ainomiq-text placeholder:text-ainomiq-text-subtle focus-visible:ring-ainomiq-blue"
                />
              </div>
              <div>
                <label
                  htmlFor="phone"
                  className="mb-2 block text-sm font-medium text-ainomiq-text-muted"
                >
                  Phone
                </label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  placeholder="+31 6 00000000"
                  className="bg-white border-ainomiq-border text-ainomiq-text placeholder:text-ainomiq-text-subtle focus-visible:ring-ainomiq-blue"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="message"
                className="mb-2 block text-sm font-medium text-ainomiq-text-muted"
              >
                Message *
              </label>
              <Textarea
                id="message"
                name="message"
                placeholder="Tell us about your project or question..."
                rows={6}
                required
                className="bg-white border-ainomiq-border text-ainomiq-text placeholder:text-ainomiq-text-subtle focus-visible:ring-ainomiq-blue resize-none"
              />
            </div>

            {error && (
              <p className="text-sm text-red-500">{error}</p>
            )}

            <Button
              type="submit"
              size="lg"
              disabled={loading}
              className="w-full rounded-full bg-ainomiq-blue hover:bg-ainomiq-blue-hover text-white h-12 disabled:opacity-60"
            >
              {loading ? "Sending..." : "Send message"}
            </Button>
          </form>
        )}

        {/* Contact info */}
        <div className="mt-8 flex flex-col sm:flex-row gap-6 border-t border-ainomiq-border pt-6">
          <div className="flex items-center gap-3 text-sm text-ainomiq-text-muted">
            <Mail className="h-5 w-5 text-ainomiq-blue shrink-0" />
            <a
              href="mailto:info@ainomiq.com"
              className="hover:text-ainomiq-text transition-colors"
            >
              info@ainomiq.com
            </a>
          </div>
          <div className="flex items-center gap-3 text-sm text-ainomiq-text-muted">
            <MapPin className="h-5 w-5 text-ainomiq-blue shrink-0" />
            <span>The Netherlands</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
