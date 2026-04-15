"use client";

import { useState, useCallback, useEffect, type ChangeEvent } from "react";
import {
  CheckCircle,
  Loader2,
  Send,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  Zap,
  Clock,
  Globe,
  LayoutDashboard,
  Bot,
  ShoppingCart,
  Plug,
  Smartphone,
  BarChart3,
  Star,
  FileUp,
} from "lucide-react";

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
const TECH_OPTIONS = ["React/Next.js", "Vue", "Python", "Node.js", "Shopify", "WordPress", "No preference"];

interface Estimate {
  hours: number;
  total: number;
  complexity: string;
  deliveryDays: number;
  projectType: string;
}

export function ProjectRequestForm() {
  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);
  const [estimate, setEstimate] = useState<Estimate | null>(null);

  const [projectType, setProjectType] = useState("");
  const [description, setDescription] = useState("");
  const [timeline, setTimeline] = useState("");
  const [company, setCompany] = useState("");
  const [contact, setContact] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [references, setReferences] = useState("");
  const [foundVia, setFoundVia] = useState("");
  const [targetAudience, setTargetAudience] = useState("");
  const [existingUrl, setExistingUrl] = useState("");
  const [needsCredentials, setNeedsCredentials] = useState(false);
  const [techStack, setTechStack] = useState<string[]>([]);
  const [features, setFeatures] = useState("");
  const [designPrefs, setDesignPrefs] = useState("");
  const [files, setFiles] = useState<File[]>([]);
  const [hp, setHp] = useState("");

  const descPlaceholder = projectType
    ? `Describe your ${PROJECT_TYPES.find((t) => t.id === projectType)?.label?.toLowerCase() || "project"}. What should it do? Any integrations or specific features?`
    : "Select a project type first…";

  const budgetLabel = estimate ? `€${estimate.total}` : "—";

  const fetchEstimate = useCallback(async () => {
    if (!projectType || description.trim().length < 3 || !timeline) return;
    setLoading(true);
    try {
      const res = await fetch("/api/estimate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ projectType, description, timeline }),
      });
      const data = (await res.json()) as { estimate?: Estimate };
      if (data.estimate) setEstimate(data.estimate);
    } catch {
      // Silent failure keeps the wizard usable.
    } finally {
      setLoading(false);
    }
  }, [projectType, description, timeline]);

  useEffect(() => {
    if (step === 3) {
      void fetchEstimate();
    }
  }, [step, fetchEstimate]);

  function toggleTechStack(option: string) {
    setTechStack((current) => {
      if (option === "No preference") {
        return current.includes(option) ? [] : [option];
      }

      const withoutNoPreference = current.filter((item) => item !== "No preference");
      return withoutNoPreference.includes(option)
        ? withoutNoPreference.filter((item) => item !== option)
        : [...withoutNoPreference, option];
    });
  }

  function handleFileChange(event: ChangeEvent<HTMLInputElement>) {
    const selected = Array.from(event.target.files ?? []);
    const nextErrors: string[] = [];

    if (selected.length > 5) {
      nextErrors.push("You can upload up to 5 files.");
    }

    if (selected.some((file) => file.size > 10 * 1024 * 1024)) {
      nextErrors.push("Each file must be 10MB or smaller.");
    }

    setErrors(nextErrors);
    setFiles(nextErrors.length === 0 ? selected.slice(0, 5) : []);
  }

  async function handleSubmit() {
    setErrors([]);
    const errs: string[] = [];

    if (!company.trim()) errs.push("Company name is required.");
    if (!contact.trim()) errs.push("Contact name is required.");
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errs.push("Valid email is required.");
    if (existingUrl.trim() && !isValidUrl(existingUrl)) {
      errs.push("Existing site/app URL must be valid.");
      setStep(1);
    }

    if (files.length > 5) errs.push("You can upload up to 5 files.");
    if (files.some((file) => file.size > 10 * 1024 * 1024)) errs.push("Each file must be 10MB or smaller.");

    if (errs.length > 0) {
      setErrors(errs);
      return;
    }

    setSubmitting(true);
    try {
      const typeLabel = PROJECT_TYPES.find((t) => t.id === projectType)?.label || projectType;
      const timelineLabel = TIMELINES.find((t) => t.id === timeline)?.label || timeline;

      const formData = new FormData();
      formData.append("company", company);
      formData.append("contact", contact);
      formData.append("email", email);
      formData.append("phone", phone);
      formData.append("foundVia", foundVia);
      formData.append("projectType", typeLabel);
      formData.append("description", description);
      formData.append("timeline", timelineLabel);
      formData.append("budget", budgetLabel);
      formData.append("referencesText", references);
      formData.append("targetAudience", targetAudience);
      formData.append("existingUrl", existingUrl);
      formData.append("needsCredentials", String(needsCredentials));
      formData.append("features", features);
      formData.append("designPrefs", designPrefs);
      formData.append("website_url", hp);

      techStack.forEach((item) => formData.append("techStack", item));
      files.forEach((file) => formData.append("files", file));

      if (estimate) {
        formData.append("estimateTotal", String(estimate.total));
        formData.append("estimateHours", String(estimate.hours));
      }

      const response = await fetch("/api/submit-project", {
        method: "POST",
        body: formData,
      });

      const data = (await response.json()) as { success?: boolean; errors?: string[] };

      if (!response.ok || !data.success) {
        setErrors(data.errors ?? ["Could not submit your request. Please try again."]);
        return;
      }

      setSuccess(true);
    } catch {
      setErrors(["Network error. Please try again."]);
    } finally {
      setSubmitting(false);
    }
  }

  const isValidUrl = (url: string) => {
    if (!url.trim()) return true;
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  const steps = [
    { title: "Project Type", valid: !!projectType },
    { title: "Details", valid: description.trim().length >= 3 && isValidUrl(existingUrl) },
    { title: "Timeline", valid: !!timeline },
    { title: "Your Estimate", valid: true },
    { title: "Contact", valid: !!company && !!contact && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) },
  ];

  const canNext = steps[step]?.valid;
  const isLast = step === steps.length - 1;

  function handleStepChange(newStep: number) {
    setStep(newStep);
    setErrors([]); // Clear errors when changing steps
  }

  function resetForm() {
    setSuccess(false);
    setStep(0);
    setProjectType("");
    setDescription("");
    setTimeline("");
    setCompany("");
    setContact("");
    setEmail("");
    setPhone("");
    setReferences("");
    setFoundVia("");
    setTargetAudience("");
    setExistingUrl("");
    setNeedsCredentials(false);
    setTechStack([]);
    setFeatures("");
    setDesignPrefs("");
    setFiles([]);
    setHp("");
    setEstimate(null);
    setErrors([]);
  }

  if (success) {
    return (
      <section className="py-20 px-6">
        <div className="mx-auto max-w-xl rounded-2xl border border-[#1e293b] bg-[#0f172a] p-10 text-center shadow-2xl">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-500/10">
            <CheckCircle className="h-8 w-8 text-green-400" />
          </div>
          <h3 className="mb-2 text-2xl font-bold text-white">Project request submitted</h3>
          <p className="mb-6 text-gray-400">
            Thanks! We&apos;ll prepare your project brief and get back within 24h.
          </p>
          <button
            onClick={resetForm}
            className="text-sm font-medium text-[#4A90F5] transition-colors hover:text-white"
          >
            ← Submit another request
          </button>
        </div>
      </section>
    );
  }

  const inputCls =
    "w-full rounded-xl border border-[#1e293b] bg-[#1e293b]/50 px-4 py-3 text-white placeholder:text-gray-500 focus:border-[#4A90F5] focus:outline-none focus:ring-1 focus:ring-[#4A90F5] transition-colors";
  const labelCls = "mb-1.5 block text-sm font-medium text-gray-300";

  return (
    <section id="project-request" className="py-20 px-6">
      <div className="mx-auto max-w-3xl">
        <div className="mb-10 text-center">
          <span className="mb-4 inline-flex items-center gap-1.5 rounded-full bg-[#4A90F5]/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-[#4A90F5]">
            <Sparkles className="h-3.5 w-3.5" /> Custom Projects
          </span>
          <h2 className="text-3xl font-bold text-white sm:text-4xl">Need a custom solution?</h2>
          <p className="mx-auto mt-3 max-w-md text-gray-400">
            Tell us what you need. We&apos;ll calculate the cost, prepare a project brief, and connect you with a builder.
          </p>
        </div>

        <div className="mb-8 flex items-center gap-1">
          {steps.map((item, index) => (
            <div key={item.title} className="flex flex-1 flex-col items-center gap-1">
              <div
                className={`h-1.5 w-full rounded-full transition-all duration-500 ${
                  index < step ? "bg-[#4A90F5]" : index === step ? "bg-[#4A90F5]/60" : "bg-[#1e293b]"
                }`}
              />
              <span className={`text-[10px] font-medium ${index <= step ? "text-gray-300" : "text-gray-600"}`}>
                {item.title}
              </span>
            </div>
          ))}
        </div>

        <div className="flex min-h-[320px] flex-col rounded-2xl border border-[#1e293b] bg-[#0f172a] p-8 shadow-2xl">
          <div className="pointer-events-none absolute opacity-0" aria-hidden>
            <input
              tabIndex={-1}
              autoComplete="off"
              name="website_url"
              value={hp}
              onChange={(event) => setHp(event.target.value)}
            />
          </div>

          <div className="flex-1">
            {step === 0 && (
              <div>
                <h3 className="mb-1 text-lg font-semibold text-white">What are you building?</h3>
                <p className="mb-6 text-sm text-gray-400">
                  Select the option that best describes your project.
                </p>
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                  {PROJECT_TYPES.map((type) => (
                    <button
                      key={type.id}
                      type="button"
                      onClick={() => setProjectType(type.id)}
                      className={`relative rounded-xl border p-4 text-left transition-all duration-200 hover:border-[#4A90F5]/50 ${
                        projectType === type.id
                          ? "border-[#4A90F5] bg-[#4A90F5]/10 shadow-lg shadow-[#4A90F5]/10"
                          : "border-[#1e293b] bg-[#1e293b]/30 hover:bg-[#1e293b]/60"
                      }`}
                    >
                      <type.Icon className="h-6 w-6 text-[#4A90F5]" />
                      <p className="mt-2 text-sm font-medium text-white">{type.label}</p>
                      {projectType === type.id && (
                        <div className="absolute right-2 top-2 h-2 w-2 rounded-full bg-[#4A90F5]" />
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {step === 1 && (
              <div className="space-y-5">
                <div>
                  <h3 className="mb-1 text-lg font-semibold text-white">Describe your project</h3>
                  <p className="mb-6 text-sm text-gray-400">
                    The more detail you share here, the better the review brief will be.
                  </p>
                  <textarea
                    className={`${inputCls} min-h-[160px] resize-y`}
                    placeholder={descPlaceholder}
                    value={description}
                    onChange={(event) => setDescription(event.target.value)}
                    autoFocus
                  />
                  <div className="mt-2 flex items-center justify-between">
                    <p className={`text-xs ${description.trim().length >= 3 ? "text-green-400" : "text-gray-500"}`}>
                      {description.trim().length} chars
                    </p>
                    {description.trim().length >= 3 && (
                      <span className="flex items-center gap-1 text-xs text-[#4A90F5]">
                        <Zap className="h-3 w-3" /> Ready for estimate
                      </span>
                    )}
                  </div>
                </div>

                <div>
                  <label className={labelCls}>Reference links (optional)</label>
                  <input
                    type="text"
                    className={inputCls}
                    placeholder="https://example.com, https://inspiration.com"
                    value={references}
                    onChange={(event) => setReferences(event.target.value)}
                  />
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className={labelCls}>Target audience (optional)</label>
                    <input
                      type="text"
                      className={inputCls}
                      placeholder="Who is this for?"
                      value={targetAudience}
                      onChange={(event) => setTargetAudience(event.target.value)}
                    />
                  </div>
                  <div>
                    <label className={labelCls}>Existing site/app URL (optional)</label>
                    <input
                      type="url"
                      className={inputCls}
                      placeholder="https://your-site.com"
                      value={existingUrl}
                      onChange={(event) => setExistingUrl(event.target.value)}
                    />
                  </div>
                </div>

                <label className="flex items-start gap-3 rounded-xl border border-[#1e293b] bg-[#1e293b]/30 p-4 text-sm text-gray-300">
                  <input
                    type="checkbox"
                    checked={needsCredentials}
                    onChange={(event) => setNeedsCredentials(event.target.checked)}
                    className="mt-1 h-4 w-4 rounded border-[#1e293b] bg-[#0f172a] text-[#4A90F5] focus:ring-[#4A90F5]"
                  />
                  <span>Will the developer need access to existing systems?</span>
                </label>

                <div className="rounded-xl border border-[#1e293b] bg-[#1e293b]/20 p-5">
                  <p className="mb-3 text-sm font-medium text-white">Preferred tech stack (optional)</p>
                  <div className="flex flex-wrap gap-2">
                    {TECH_OPTIONS.map((option) => {
                      const active = techStack.includes(option);
                      return (
                        <button
                          key={option}
                          type="button"
                          onClick={() => toggleTechStack(option)}
                          className={`rounded-full border px-3 py-2 text-sm transition-colors ${
                            active
                              ? "border-[#4A90F5] bg-[#4A90F5]/10 text-[#4A90F5]"
                              : "border-[#1e293b] bg-[#0f172a] text-gray-300 hover:border-[#4A90F5]/50"
                          }`}
                        >
                          {option}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div>
                  <label className={labelCls}>Must-have features (optional)</label>
                  <textarea
                    className={`${inputCls} min-h-[110px] resize-y`}
                    placeholder="List specific features"
                    value={features}
                    onChange={(event) => setFeatures(event.target.value)}
                  />
                </div>

                <div>
                  <label className={labelCls}>Design preferences (optional)</label>
                  <textarea
                    className={`${inputCls} min-h-[110px] resize-y`}
                    placeholder="Describe look and feel, or link examples"
                    value={designPrefs}
                    onChange={(event) => setDesignPrefs(event.target.value)}
                  />
                </div>

                <div>
                  <label className={labelCls}>File uploads (optional)</label>
                  <label className="flex cursor-pointer flex-col items-center justify-center rounded-2xl border border-dashed border-[#1e293b] bg-[#1e293b]/20 px-6 py-8 text-center transition-colors hover:border-[#4A90F5]/50">
                    <FileUp className="mb-3 h-6 w-6 text-[#4A90F5]" />
                    <span className="text-sm font-medium text-white">Upload briefs, designs, wireframes</span>
                    <span className="mt-1 text-xs text-gray-400">Up to 5 files, max 10MB each</span>
                    <input type="file" multiple className="hidden" onChange={handleFileChange} />
                  </label>
                  {files.length > 0 && (
                    <div className="mt-3 space-y-2">
                      {files.map((file) => (
                        <div
                          key={`${file.name}-${file.size}`}
                          className="rounded-xl border border-[#1e293b] bg-[#1e293b]/30 px-4 py-3 text-sm text-gray-300"
                        >
                          {file.name} · {(file.size / 1024 / 1024).toFixed(2)} MB
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}

            {step === 2 && (
              <div>
                <h3 className="mb-1 text-lg font-semibold text-white">When do you need it?</h3>
                <p className="mb-6 text-sm text-gray-400">Faster delivery means more pressure on scope and budget.</p>
                <div className="space-y-3">
                  {TIMELINES.map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setTimeline(item.id)}
                      className={`flex w-full items-center justify-between rounded-xl border p-4 transition-all duration-200 hover:border-[#4A90F5]/50 ${
                        timeline === item.id
                          ? "border-[#4A90F5] bg-[#4A90F5]/10 shadow-lg shadow-[#4A90F5]/10"
                          : "border-[#1e293b] bg-[#1e293b]/30 hover:bg-[#1e293b]/60"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <Clock className="h-4 w-4 text-gray-400" />
                        <span className="text-sm font-medium text-white">{item.label}</span>
                      </div>
                      <span className={`text-xs font-semibold ${item.color}`}>{item.tag}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {step === 3 && (
              <div>
                <h3 className="mb-1 text-lg font-semibold text-white">Your estimate</h3>
                <p className="mb-6 text-sm text-gray-400">
                  Calculated from scope and timeline. Final pricing is confirmed after review.
                </p>

                {loading ? (
                  <div className="flex flex-col items-center justify-center gap-3 py-12">
                    <Loader2 className="h-8 w-8 animate-spin text-[#4A90F5]" />
                    <p className="text-sm text-gray-400">Calculating your estimate…</p>
                  </div>
                ) : estimate ? (
                  <div className="rounded-xl border border-[#1e293b] bg-gradient-to-br from-[#0f172a] to-[#1e293b]/50 p-6">
                    <div className="mb-6 text-center">
                      <p className="mb-1 text-sm text-gray-400">Estimated total</p>
                      <p className="text-5xl font-bold text-white">
                        <span className="text-[#4A90F5]">€</span>
                        {estimate.total.toLocaleString()}
                      </p>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="rounded-lg bg-[#1e293b]/50 p-3">
                        <p className="mb-0.5 text-[10px] uppercase tracking-wider text-gray-500">Project</p>
                        <p className="text-sm font-medium text-white">{estimate.projectType}</p>
                      </div>
                      <div className="rounded-lg bg-[#1e293b]/50 p-3">
                        <p className="mb-0.5 text-[10px] uppercase tracking-wider text-gray-500">Complexity</p>
                        <p className="text-sm font-medium text-white">{estimate.complexity}</p>
                      </div>
                      <div className="rounded-lg bg-[#1e293b]/50 p-3">
                        <p className="mb-0.5 text-[10px] uppercase tracking-wider text-gray-500">Est. Hours</p>
                        <p className="text-sm font-medium text-white">{estimate.hours}h</p>
                      </div>
                      <div className="rounded-lg bg-[#1e293b]/50 p-3">
                        <p className="mb-0.5 text-[10px] uppercase tracking-wider text-gray-500">Delivery</p>
                        <p className="text-sm font-medium text-white">~{estimate.deliveryDays} days</p>
                      </div>
                    </div>

                    <p className="mt-4 text-center text-xs text-gray-500">
                      This request goes straight to review. No checkout step.
                    </p>
                  </div>
                ) : (
                  <div className="rounded-xl border border-[#1e293b] bg-[#1e293b]/20 p-6 text-center text-sm text-gray-400">
                    Could not calculate an estimate automatically. You can still submit the project.
                  </div>
                )}
              </div>
            )}

            {step === 4 && (
              <div>
                <h3 className="mb-1 text-lg font-semibold text-white">Almost there — who are you?</h3>
                <p className="mb-6 text-sm text-gray-400">We&apos;ll prepare your project brief and reply within 24h.</p>

                <div className="space-y-5">
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <label className={labelCls}>
                        Company name <span className="text-red-400">*</span>
                      </label>
                      <input
                        type="text"
                        className={inputCls}
                        placeholder="Acme Inc."
                        value={company}
                        onChange={(event) => setCompany(event.target.value)}
                        autoFocus
                      />
                    </div>
                    <div>
                      <label className={labelCls}>
                        Contact name <span className="text-red-400">*</span>
                      </label>
                      <input
                        type="text"
                        className={inputCls}
                        placeholder="John Doe"
                        value={contact}
                        onChange={(event) => setContact(event.target.value)}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <label className={labelCls}>
                        Email <span className="text-red-400">*</span>
                      </label>
                      <input
                        type="email"
                        className={inputCls}
                        placeholder="john@acme.com"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                      />
                    </div>
                    <div>
                      <label className={labelCls}>Phone</label>
                      <input
                        type="tel"
                        className={inputCls}
                        placeholder="+31 6 1234 5678"
                        value={phone}
                        onChange={(event) => setPhone(event.target.value)}
                      />
                    </div>
                  </div>

                  <div>
                    <label className={labelCls}>How did you find us?</label>
                    <select
                      className={`${inputCls} cursor-pointer`}
                      value={foundVia}
                      onChange={(event) => setFoundVia(event.target.value)}
                    >
                      <option value="">Rather not say</option>
                      {SOURCES.map((source) => (
                        <option key={source} value={source}>
                          {source}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            )}
          </div>

          {errors.length > 0 && (
            <div className="mt-4 rounded-xl border border-red-500/30 bg-red-500/10 p-4">
              <ul className="list-disc space-y-1 list-inside text-sm text-red-400">
                {errors.map((error) => (
                  <li key={error}>{error}</li>
                ))}
              </ul>
            </div>
          )}

          <div className="mt-8 flex items-center justify-between border-t border-[#1e293b] pt-6">
            {step > 0 ? (
              <button
                type="button"
                onClick={() => handleStepChange(step - 1)}
                className="flex items-center gap-2 text-sm text-gray-400 transition-colors hover:text-white"
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
                onClick={() => void handleSubmit()}
                className="flex items-center gap-2 rounded-xl bg-[#4A90F5] px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-[#4A90F5]/25 transition-colors hover:bg-[#3a7de0] disabled:opacity-40"
              >
                {submitting ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" /> Sending…
                  </>
                ) : (
                  <>
                    <Send className="h-4 w-4" /> Submit project request
                  </>
                )}
              </button>
            ) : (
              <button
                type="button"
                disabled={!canNext}
                onClick={() => handleStepChange(step + 1)}
                className="flex items-center gap-2 rounded-xl bg-[#4A90F5] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#3a7de0] disabled:opacity-40"
              >
                Continue <ArrowRight className="h-4 w-4" />
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
