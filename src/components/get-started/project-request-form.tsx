"use client";

import { useState, FormEvent, useCallback, useEffect } from "react";
import {
  CheckCircle,
  Loader2,
  Send,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  Zap,
  Clock,
  Euro,
  CreditCard,
  Globe,
  LayoutDashboard,
  Bot,
  ShoppingCart,
  Plug,
  Smartphone,
  BarChart3,
  Wrench,
  Star,
} from "lucide-react";

/* ─── Data ─────────────────────────────────────────────────── */

const PROJECT_TYPES = [
  { id: "website-landing", label: "Website / Landing page", Icon: Globe },
  { id: "webapp-dashboard", label: "Web app / Dashboard", Icon: LayoutDashboard },
  { id: "ai-chatbot", label: "AI Integration / Chatbot", Icon: Bot },
  { id: "automation-workflow", label: "Automation / Workflow", Icon: Zap },
  { id: "ecommerce", label: "E-commerce", Icon: ShoppingCart },
  { id: "api-development", label: "API Development", Icon: Plug },
  { id: "mobile-app", label: "Mobile App", Icon: Smartphone },
  { id: "data-analytics", label: "Data & Analytics", Icon: BarChart3 },
  { id: "other", label: "Other", Icon: Star },
];

const TIMELINES = [
  { id: "asap", label: "ASAP (< 1 week)", tag: "Rush", color: "text-red-400" },
  { id: "1-2-weeks", label: "1-2 weeks", tag: "Fast", color: "text-orange-400" },
  { id: "2-4-weeks", label: "2-4 weeks", tag: "Standard", color: "text-blue-400" },
  { id: "1-2-months", label: "1-2 months", tag: "Relaxed", color: "text-green-400" },
  { id: "flexible", label: "Flexible", tag: "Best price", color: "text-emerald-400" },
];

const SOURCES = ["Google", "Social media", "Referral", "Other"];

interface Estimate {
  hours: number;
  total: number;
  complexity: string;
  deliveryDays: number;
  projectType: string;
}

/* ─── Component ────────────────────────────────────────────── */

export function ProjectRequestForm() {
  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);
  const [estimate, setEstimate] = useState<Estimate | null>(null);

  // Form state
  const [projectType, setProjectType] = useState("");
  const [description, setDescription] = useState("");
  const [timeline, setTimeline] = useState("");
  const [company, setCompany] = useState("");
  const [contact, setContact] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [references, setReferences] = useState("");
  const [foundVia, setFoundVia] = useState("");
  const [hp, setHp] = useState("");

  // Auto-suggest description placeholder based on type
  const descPlaceholder = projectType
    ? `Describe your ${PROJECT_TYPES.find((t) => t.id === projectType)?.label?.toLowerCase() || "project"}. What should it do? Any integrations or specific features?`
    : "Select a project type first…";

  // Auto-fill budget label from estimate
  const budgetLabel = estimate
    ? `€${estimate.total}`
    : "—";

  // Fetch estimate when type + description + timeline are set
  const fetchEstimate = useCallback(async () => {
    if (!projectType || description.trim().length < 3 || !timeline) return;
    setLoading(true);
    try {
      const res = await fetch("/api/estimate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ projectType, description, timeline }),
      });
      const data = await res.json();
      if (data.estimate) setEstimate(data.estimate);
    } catch {
      // silent
    } finally {
      setLoading(false);
    }
  }, [projectType, description, timeline]);

  useEffect(() => {
    if (step === 3) fetchEstimate();
  }, [step, fetchEstimate]);

  async function handleSubmit() {
    setErrors([]);
    // Client validation
    const errs: string[] = [];
    if (!company.trim()) errs.push("Company name is required.");
    if (!contact.trim()) errs.push("Contact name is required.");
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      errs.push("Valid email is required.");
    if (errs.length > 0) { setErrors(errs); return; }

    setSubmitting(true);
    try {
      const typeLabel = PROJECT_TYPES.find((t) => t.id === projectType)?.label || projectType;
      const timelineLabel = TIMELINES.find((t) => t.id === timeline)?.label || timeline;

      // 1. Send to Discord webhook
      await fetch("/api/submit-project", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          company, contact, email, phone, references, foundVia,
          projectType: typeLabel,
          description,
          timeline: timelineLabel,
          budget: budgetLabel,
          estimateTotal: estimate?.total,
          estimateHours: estimate?.hours,
          _hp: hp,
        }),
      });

      // 2. Create Stripe checkout session
      if (estimate?.total) {
        const stripeRes = await fetch("/api/checkout", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            amount: estimate.total,
            projectType: typeLabel,
            company,
            contact,
            email,
            description,
            timeline: timelineLabel,
            estimateHours: estimate.hours,
          }),
        });
        const stripeData = await stripeRes.json();
        if (stripeData.url) {
          window.location.href = stripeData.url;
          return;
        }
      }

      // Fallback if no estimate or Stripe fails
      setSuccess(true);
    } catch {
      setErrors(["Network error. Please try again."]);
    } finally {
      setSubmitting(false);
    }
  }

  /* ─── Steps ──────────────────────────────────────────────── */

  const STEPS = [
    { title: "Project Type", valid: !!projectType },
    { title: "Details", valid: description.trim().length >= 3 },
    { title: "Timeline", valid: !!timeline },
    { title: "Your Estimate", valid: !!estimate },
    { title: "Contact", valid: !!company && !!contact && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) },
  ];

  const canNext = STEPS[step]?.valid;
  const isLast = step === STEPS.length - 1;

  /* ─── Success ────────────────────────────────────────────── */

  if (success) {
    return (
      <section className="py-20 px-6">
        <div className="mx-auto max-w-xl rounded-2xl border border-[#1e293b] bg-[#0f172a] p-10 text-center shadow-2xl">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-500/10">
            <CheckCircle className="h-8 w-8 text-green-400" />
          </div>
          <h3 className="text-2xl font-bold text-white mb-2">
            Thanks! We&apos;ll review your project and get back within 24h.
          </h3>
          <p className="text-gray-400">
            Estimated total: <span className="text-white font-semibold">€{estimate?.total || "—"}</span>
          </p>
        </div>
      </section>
    );
  }

  /* ─── Render ─────────────────────────────────────────────── */

  const inputCls =
    "w-full rounded-xl border border-[#1e293b] bg-[#1e293b]/50 px-4 py-3 text-white placeholder:text-gray-500 focus:border-[#4A90F5] focus:outline-none focus:ring-1 focus:ring-[#4A90F5] transition-colors";
  const labelCls = "block text-sm font-medium text-gray-300 mb-1.5";

  return (
    <section id="project-request" className="py-20 px-6">
      <div className="mx-auto max-w-2xl">
        {/* Header */}
        <div className="text-center mb-10">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-[#4A90F5]/10 px-4 py-1.5 text-xs font-semibold text-[#4A90F5] uppercase tracking-wider mb-4">
            <Sparkles className="h-3.5 w-3.5" /> Smart Project Builder
          </span>
          <h2 className="text-3xl font-bold text-white sm:text-4xl">
            Tell us what you need.
          </h2>
          <p className="mt-3 text-gray-400 max-w-md mx-auto">
            We&apos;ll calculate the cost instantly — no waiting, no back-and-forth.
          </p>
        </div>

        {/* Progress */}
        <div className="flex items-center gap-1 mb-8">
          {STEPS.map((s, i) => (
            <div key={i} className="flex-1 flex flex-col items-center gap-1">
              <div
                className={`h-1.5 w-full rounded-full transition-all duration-500 ${
                  i < step
                    ? "bg-[#4A90F5]"
                    : i === step
                    ? "bg-[#4A90F5]/60"
                    : "bg-[#1e293b]"
                }`}
              />
              <span
                className={`text-[10px] font-medium transition-colors ${
                  i <= step ? "text-gray-300" : "text-gray-600"
                }`}
              >
                {s.title}
              </span>
            </div>
          ))}
        </div>

        {/* Card */}
        <div className="rounded-2xl border border-[#1e293b] bg-[#0f172a] p-8 shadow-2xl min-h-[320px] flex flex-col">
          {/* Honeypot */}
          <div className="absolute opacity-0 pointer-events-none" aria-hidden>
            <input tabIndex={-1} autoComplete="off" name="website_url" value={hp} onChange={(e) => setHp(e.target.value)} />
          </div>

          <div className="flex-1">
            {/* Step 0: Project Type */}
            {step === 0 && (
              <div>
                <h3 className="text-lg font-semibold text-white mb-1">What are you building?</h3>
                <p className="text-sm text-gray-400 mb-6">Select the option that best describes your project.</p>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {PROJECT_TYPES.map((t) => (
                    <button
                      key={t.id}
                      type="button"
                      onClick={() => setProjectType(t.id)}
                      className={`relative rounded-xl border p-4 text-left transition-all duration-200 hover:border-[#4A90F5]/50 ${
                        projectType === t.id
                          ? "border-[#4A90F5] bg-[#4A90F5]/10 shadow-lg shadow-[#4A90F5]/10"
                          : "border-[#1e293b] bg-[#1e293b]/30 hover:bg-[#1e293b]/60"
                      }`}
                    >
                      <t.Icon className="h-6 w-6 text-[#4A90F5]" />
                      <p className="text-sm font-medium text-white mt-2">{t.label}</p>
                      {projectType === t.id && (
                        <div className="absolute top-2 right-2 h-2 w-2 rounded-full bg-[#4A90F5]" />
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Step 1: Description */}
            {step === 1 && (
              <div>
                <h3 className="text-lg font-semibold text-white mb-1">Describe your project</h3>
                <p className="text-sm text-gray-400 mb-6">The more detail, the more accurate our estimate.</p>
                <textarea
                  className={inputCls + " min-h-[160px] resize-y"}
                  placeholder={descPlaceholder}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  autoFocus
                />
                <div className="flex items-center justify-between mt-2">
                  <p className={`text-xs ${description.trim().length >= 3 ? "text-green-400" : "text-gray-500"}`}>
                    {description.trim().length} chars
                  </p>
                  {description.trim().length >= 3 && (
                    <span className="text-xs text-[#4A90F5] flex items-center gap-1">
                      <Zap className="h-3 w-3" /> Ready for estimate
                    </span>
                  )}
                </div>

                {/* Optional: references */}
                <div className="mt-5">
                  <label className={labelCls}>Reference links (optional)</label>
                  <input
                    type="text"
                    className={inputCls}
                    placeholder="https://example.com, https://inspiration.com"
                    value={references}
                    onChange={(e) => setReferences(e.target.value)}
                  />
                </div>
              </div>
            )}

            {/* Step 2: Timeline */}
            {step === 2 && (
              <div>
                <h3 className="text-lg font-semibold text-white mb-1">When do you need it?</h3>
                <p className="text-sm text-gray-400 mb-6">Faster delivery = rush fee. Flexible = best price.</p>
                <div className="space-y-3">
                  {TIMELINES.map((t) => (
                    <button
                      key={t.id}
                      type="button"
                      onClick={() => setTimeline(t.id)}
                      className={`w-full flex items-center justify-between rounded-xl border p-4 transition-all duration-200 hover:border-[#4A90F5]/50 ${
                        timeline === t.id
                          ? "border-[#4A90F5] bg-[#4A90F5]/10 shadow-lg shadow-[#4A90F5]/10"
                          : "border-[#1e293b] bg-[#1e293b]/30 hover:bg-[#1e293b]/60"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <Clock className="h-4 w-4 text-gray-400" />
                        <span className="text-sm font-medium text-white">{t.label}</span>
                      </div>
                      <span className={`text-xs font-semibold ${t.color}`}>{t.tag}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Step 3: Estimate */}
            {step === 3 && (
              <div>
                <h3 className="text-lg font-semibold text-white mb-1">Your estimate</h3>
                <p className="text-sm text-gray-400 mb-6">Calculated based on project type, scope, and timeline.</p>

                {loading ? (
                  <div className="flex flex-col items-center justify-center py-12 gap-3">
                    <Loader2 className="h-8 w-8 animate-spin text-[#4A90F5]" />
                    <p className="text-sm text-gray-400">Calculating your estimate…</p>
                  </div>
                ) : estimate ? (
                  <div className="rounded-xl border border-[#1e293b] bg-gradient-to-br from-[#0f172a] to-[#1e293b]/50 p-6">
                    {/* Price */}
                    <div className="text-center mb-6">
                      <p className="text-sm text-gray-400 mb-1">Estimated total</p>
                      <p className="text-5xl font-bold text-white">
                        <span className="text-[#4A90F5]">€</span>{estimate.total.toLocaleString()}
                      </p>
                    </div>

                    {/* Details grid */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="rounded-lg bg-[#1e293b]/50 p-3">
                        <p className="text-[10px] text-gray-500 uppercase tracking-wider mb-0.5">Project</p>
                        <p className="text-sm font-medium text-white">{estimate.projectType}</p>
                      </div>
                      <div className="rounded-lg bg-[#1e293b]/50 p-3">
                        <p className="text-[10px] text-gray-500 uppercase tracking-wider mb-0.5">Complexity</p>
                        <p className="text-sm font-medium text-white">{estimate.complexity}</p>
                      </div>
                      <div className="rounded-lg bg-[#1e293b]/50 p-3">
                        <p className="text-[10px] text-gray-500 uppercase tracking-wider mb-0.5">Est. Hours</p>
                        <p className="text-sm font-medium text-white">{estimate.hours}h</p>
                      </div>
                      <div className="rounded-lg bg-[#1e293b]/50 p-3">
                        <p className="text-[10px] text-gray-500 uppercase tracking-wider mb-0.5">Delivery</p>
                        <p className="text-sm font-medium text-white">~{estimate.deliveryDays} days</p>
                      </div>
                    </div>

                    <p className="text-xs text-gray-500 text-center mt-4">
                      Final price confirmed after review. No payment needed now.
                    </p>
                  </div>
                ) : (
                  <p className="text-sm text-gray-400 text-center py-8">Could not calculate estimate. Continue anyway.</p>
                )}
              </div>
            )}

            {/* Step 4: Contact */}
            {step === 4 && (
              <div>
                <h3 className="text-lg font-semibold text-white mb-1">Almost there — who are you?</h3>
                <p className="text-sm text-gray-400 mb-6">We&apos;ll get back to you within 24 hours.</p>

                <div className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className={labelCls}>Company name <span className="text-red-400">*</span></label>
                      <input type="text" className={inputCls} placeholder="Acme Inc." value={company} onChange={(e) => setCompany(e.target.value)} autoFocus />
                    </div>
                    <div>
                      <label className={labelCls}>Contact name <span className="text-red-400">*</span></label>
                      <input type="text" className={inputCls} placeholder="John Doe" value={contact} onChange={(e) => setContact(e.target.value)} />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className={labelCls}>Email <span className="text-red-400">*</span></label>
                      <input type="email" className={inputCls} placeholder="john@acme.com" value={email} onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div>
                      <label className={labelCls}>Phone</label>
                      <input type="tel" className={inputCls} placeholder="+31 6 1234 5678" value={phone} onChange={(e) => setPhone(e.target.value)} />
                    </div>
                  </div>
                  <div>
                    <label className={labelCls}>How did you find us?</label>
                    <select
                      className={inputCls + " cursor-pointer"}
                      value={foundVia}
                      onChange={(e) => setFoundVia(e.target.value)}
                    >
                      <option value="">Rather not say</option>
                      {SOURCES.map((s) => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Errors */}
          {errors.length > 0 && (
            <div className="rounded-xl border border-red-500/30 bg-red-500/10 p-4 mt-4">
              <ul className="list-disc list-inside text-sm text-red-400 space-y-1">
                {errors.map((err, i) => (
                  <li key={i}>{err}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Navigation */}
          <div className="flex items-center justify-between mt-8 pt-6 border-t border-[#1e293b]">
            {step > 0 ? (
              <button
                type="button"
                onClick={() => { setStep(step - 1); setErrors([]); }}
                className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors"
              >
                <ArrowLeft className="h-4 w-4" /> Back
              </button>
            ) : (
              <div />
            )}

            {isLast ? (
              <button
                type="button"
                disabled={!canNext || submitting}
                onClick={handleSubmit}
                className="flex items-center gap-2 rounded-xl bg-[#4A90F5] px-6 py-3 text-sm font-semibold text-white hover:bg-[#3a7de0] disabled:opacity-40 transition-colors shadow-lg shadow-[#4A90F5]/25"
              >
                {submitting ? (
                  <><Loader2 className="h-4 w-4 animate-spin" /> Processing…</>
                ) : (
                  <><CreditCard className="h-4 w-4" /> Pay & Submit — €{estimate?.total || "—"}</>
                )}
              </button>
            ) : (
              <button
                type="button"
                disabled={!canNext}
                onClick={() => { setStep(step + 1); setErrors([]); }}
                className="flex items-center gap-2 rounded-xl bg-[#4A90F5] px-6 py-3 text-sm font-semibold text-white hover:bg-[#3a7de0] disabled:opacity-40 transition-colors shadow-lg shadow-[#4A90F5]/25"
              >
                Continue <ArrowRight className="h-4 w-4" />
              </button>
            )}
          </div>
        </div>

        {/* Live estimate preview (bottom bar after step 1) */}
        {step >= 1 && (
          <div className="mt-4 rounded-xl border border-[#1e293b] bg-[#0f172a]/80 px-5 py-3 flex items-center justify-between">
            <div className="flex items-center gap-4 text-xs text-gray-400">
              <span>{PROJECT_TYPES.find((t) => t.id === projectType)?.label || "—"}</span>
              {timeline && <span>• {TIMELINES.find((t) => t.id === timeline)?.label}</span>}
            </div>
            <div className="flex items-center gap-1.5 text-sm font-semibold text-white">
              <Euro className="h-3.5 w-3.5 text-[#4A90F5]" />
              {estimate ? estimate.total.toLocaleString() : "—"}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
