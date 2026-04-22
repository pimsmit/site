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
  Smartphone,
  Star,
  FileUp,
  Lightbulb,
} from "lucide-react";

const TOP_SOLUTIONS = [
  { label: "AI chatbot", prompt: "I need an AI chatbot for my webshop that handles customer support via email, chat, and WhatsApp" },
  { label: "WhatsApp bot", prompt: "I need a WhatsApp chatbot for sales, support, and automated follow-ups" },
  { label: "Website chatbot", prompt: "I need an embedded chatbot widget on my website that answers visitor questions 24/7" },
  { label: "iOS / Android app", prompt: "I need a custom branded mobile app for iOS and Android" },
  { label: "Inventory system", prompt: "I need an inventory management system with real-time stock tracking and low-stock alerts" },
  { label: "Email automation", prompt: "I need an email marketing automation system with flows, campaigns, and segmentation" },
  { label: "CRM integration", prompt: "I need a CRM integration connecting my tools with HubSpot, Salesforce, or similar" },
  { label: "Review management", prompt: "I need a review and reputation management system with auto-reply and monitoring" },
  { label: "Analytics dashboard", prompt: "I need a real-time analytics dashboard showing my key KPIs and performance metrics" },
  { label: "Shopify integration", prompt: "I need a full Shopify or WooCommerce e-commerce automation integration" },
];

const PROJECT_TYPES = [
  { id: "website", label: "Website", Icon: Globe },
  { id: "chatbot", label: "AI Chatbot", Icon: Bot },
  { id: "dashboard", label: "Dashboard / Portal", Icon: LayoutDashboard },
  { id: "webshop", label: "Webshop", Icon: ShoppingCart },
  { id: "mobile-app", label: "iOS / Android App", Icon: Smartphone },
  { id: "enterprise", label: "Enterprise / Full Custom", Icon: Star },
];

const TIMELINES = [
  { id: "asap", label: "ASAP (< 1 week)", tag: "Rush", color: "text-red-400" },
  { id: "1-2-weeks", label: "1-2 weeks", tag: "Fast", color: "text-orange-400" },
  { id: "2-4-weeks", label: "2-4 weeks", tag: "Standard", color: "text-blue-400" },
  { id: "1-2-months", label: "1-2 months", tag: "Relaxed", color: "text-green-400" },
  { id: "flexible", label: "Flexible", tag: "Best price", color: "text-emerald-400" },
];

const SOURCES = ["Google", "Social media", "Referral", "Other"];
const DEFAULT_TECH_OPTIONS = ["React/Next.js", "Vue", "Python", "Node.js", "Shopify", "WordPress", "WooCommerce", "Magento", "No preference"];

interface Estimate {
  hours: number;
  total: number;
  complexity: string;
  deliveryDays: number;
  deliveryWeeks?: string;
  projectType: string;
  monthlyCost?: number | null;
  detectedComplexity?: string[];
  basePrice?: number;
}

export function ProjectRequestForm() {
  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);
  const [estimate, setEstimate] = useState<Estimate | null>(null);

  const [projectType, setProjectType] = useState("");
  const [chatbotLevel, setChatbotLevel] = useState<string | null>(null);
  const [description, setDescription] = useState("");
  const [isEnhancing, setIsEnhancing] = useState(false);
  const [wasEnhanced, setWasEnhanced] = useState(false);
  const [aiInput, setAiInput] = useState("");
  const [isPrefilling, setIsPrefilling] = useState(false);
  const [prefilled, setPrefilled] = useState(false);
  const [siteUrl, setSiteUrl] = useState("");
  const [detectedTech, setDetectedTech] = useState<string[]>([]);
  const [isScanning, setIsScanning] = useState(false);
  const [siteData, setSiteData] = useState<Record<string, unknown> | null>(null);
  const [recommendations, setRecommendations] = useState<string[]>([]);
  const [selectedRecs, setSelectedRecs] = useState<Set<number>>(new Set());
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
  const [aiFeatures, setAiFeatures] = useState<string[]>([]);       // structured feature keys from ai-prefill
  const [aiIntegrations, setAiIntegrations] = useState<string[]>([]); // structured integration keys from ai-prefill

  const descPlaceholder = projectType
    ? `Describe your ${PROJECT_TYPES.find((t) => t.id === projectType)?.label?.toLowerCase() || "project"}. What should it do? Any integrations or specific features?`
    : "Select a project type first…";

  const budgetLabel = estimate ? `€${estimate.total}` : "-";

  const fetchEstimate = useCallback(async () => {
    if (!projectType || description.trim().length < 3 || !timeline) return;
    setLoading(true);
    try {
      const selRecs = recommendations.filter((_, i) => selectedRecs.has(i));
      const res = await fetch("/api/estimate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          projectType: projectType === "chatbot" && chatbotLevel ? chatbotLevel : projectType,
          description,
          timeline,
          features: aiFeatures,
          integrations: aiIntegrations,
          recommendations: selRecs,
        }),
      });
      const data = (await res.json()) as { estimate?: Estimate };
      if (data.estimate) setEstimate(data.estimate);
    } catch {
      // Silent failure keeps the wizard usable.
    } finally {
      setLoading(false);
    }
  }, [projectType, chatbotLevel, description, timeline, recommendations, selectedRecs, aiFeatures, aiIntegrations]);

  useEffect(() => {
    if (step === 3) {
      void fetchEstimate();
    }
    // Pre-fill existingUrl from siteUrl when advancing past step 0
    if (step >= 1 && siteUrl.trim() && !existingUrl.trim()) {
      const u = siteUrl.trim();
      setExistingUrl(u.startsWith("http") ? u : "https://" + u);
    }
  }, [step, fetchEstimate, siteUrl, existingUrl]);

  async function handleAiPrefill() {
    if (isPrefilling || aiInput.trim().length < 3) return;
    setIsPrefilling(true);
    try {
      // Optionally scrape site first
      let scraped = siteData;
      if (siteUrl.trim().length >= 4 && !siteData) {
        setIsScanning(true);
        try {
          const scrapeRes = await fetch("/api/scrape-site", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ url: siteUrl }),
          });
          if (scrapeRes.ok) {
            scraped = await scrapeRes.json();
            setSiteData(scraped);
          }
        } catch {}
        setIsScanning(false);
      }

      const res = await fetch("/api/ai-prefill", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ input: aiInput, siteData: scraped }),
      });
      const data = await res.json();
      if (data.projectType) setProjectType(data.projectType);
      if (data.description) { setDescription(data.description); setWasEnhanced(true); }
      if (data.timeline) setTimeline(data.timeline);
      if (Array.isArray(data.features)) setAiFeatures(data.features);
      if (Array.isArray(data.integrations)) setAiIntegrations(data.integrations);
      if (data.targetAudience) setTargetAudience(data.targetAudience);
      if (data.needsCredentials) setNeedsCredentials(data.needsCredentials);
      if (data.recommendations) {
        setRecommendations(data.recommendations);
        setSelectedRecs(new Set(data.recommendations.map((_: string, i: number) => i)));
      }
      if (siteUrl.trim()) {
        const u = siteUrl.trim();
        setExistingUrl(u.startsWith("http") ? u : "https://" + u);
      }
      // Detect tech stack from scraped data
      if (scraped?.tech && Array.isArray(scraped.tech)) {
        setDetectedTech(scraped.tech);
        // Auto-select detected tech
        scraped.tech.forEach((t: string) => {
          const match = DEFAULT_TECH_OPTIONS.find((o) => o.toLowerCase() === t.toLowerCase() || t.toLowerCase().includes(o.toLowerCase()) || o.toLowerCase().includes(t.toLowerCase()));
          if (match && !techStack.includes(match)) toggleTechStack(match);
        });
      }
      setPrefilled(true);
      // Auto-advance to next step
      setTimeout(() => setStep(1), 600);
    } catch {}
    setIsPrefilling(false);
  }

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

      // Include selected AI recommendations
      const selRecs = recommendations.filter((_, i) => selectedRecs.has(i));
      if (selRecs.length > 0) {
        formData.append("recommendations", selRecs.join("\n"));
      }

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

      const data = (await response.json()) as { success?: boolean; errors?: string[]; projectId?: string };

      if (!response.ok || !data.success) {
        setErrors(data.errors ?? ["Could not submit your request. Please try again."]);
        return;
      }

      // Redirect to Stripe Checkout if we have an estimate
      if (estimate && estimate.total > 0 && data.projectId) {
        try {
          const checkoutRes = await fetch("/api/checkout", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              projectId: data.projectId,
              amount: estimate.total,
              company,
              projectType: PROJECT_TYPES.find((t) => t.id === projectType)?.label || projectType,
              email,
            }),
          });
          const checkoutData = (await checkoutRes.json()) as { url?: string };
          if (checkoutData.url) {
            window.location.href = checkoutData.url;
            return;
          }
        } catch (e) {
          console.error("Checkout redirect failed, showing success:", e);
        }
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
    { title: "Project Type", valid: !!projectType || prefilled },
    { title: "Details", valid: description.trim().length >= 3 && isValidUrl(existingUrl) },
    { title: "Timeline", valid: !!timeline },
    { title: "Your Estimate", valid: true },
    { title: "Contact", valid: !!company && !!contact && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) },
  ];

  const canNext = steps[step]?.valid;
  const isLast = step === steps.length - 1;

  function handleStepChange(newStep: number) {
    setStep(newStep);
    setErrors([]);
    
    // Scroll to top of page on step change so user always starts at top
    window.scrollTo({ top: 0, behavior: 'smooth' });
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
        <div className="mx-auto max-w-xl rounded-2xl border border-blue-200/60 bg-ainomiq-navy/95 p-10 text-center shadow-2xl">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-500/10">
            <CheckCircle className="h-8 w-8 text-green-400" />
          </div>
          <h3 className="mb-2 text-2xl font-bold text-ainomiq-text">Project request submitted</h3>
          <p className="mb-6 text-ainomiq-text-muted">
            Thanks! We&apos;ll prepare your project brief and get back within 24h.
          </p>
          <button
            onClick={resetForm}
            className="text-sm font-medium text-[#4A90F5] transition-colors hover:text-ainomiq-text"
          >
            ← Submit another request
          </button>
        </div>
      </section>
    );
  }

  const inputCls =
    "w-full rounded-xl border border-blue-200/60 bg-ainomiq-navy/80 px-4 py-3 text-ainomiq-text placeholder:text-ainomiq-text-muted/60 focus:border-[#4A90F5] focus:outline-none focus:ring-1 focus:ring-[#4A90F5] transition-colors";
  const labelCls = "mb-1.5 block text-sm font-medium text-ainomiq-text-muted";

  return (
    <section id="project-request" className="px-6">
      <div className="mx-auto max-w-3xl">
        <div className="mb-8 flex items-center gap-1">
          {steps.map((item, index) => (
            <div key={item.title} className="flex flex-1 flex-col items-center gap-1">
              <div
                className={`h-1.5 w-full rounded-full transition-all duration-500 ${
                  index < step ? "bg-[#4A90F5]" : index === step ? "bg-[#4A90F5]/60" : "bg-blue-100/50"
                }`}
              />
              <span className={`text-[10px] font-medium ${index <= step ? "text-ainomiq-text-muted" : "text-ainomiq-text-muted"}`}>
                {item.title}
              </span>
            </div>
          ))}
        </div>

        <div className="flex min-h-[320px] flex-col p-2">
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
                {/* Top 10 quick-select chips */}
                <div className="mb-6">
                  <p className="mb-3 text-sm font-medium text-ainomiq-text-muted">Most requested solutions</p>
                  <div className="flex flex-wrap gap-2">
                    {TOP_SOLUTIONS.map((sol) => (
                      <button
                        key={sol.label}
                        type="button"
                        onClick={() => {
                          setAiInput(sol.prompt);
                          setPrefilled(false);
                        }}
                        className={`rounded-full border px-3.5 py-1.5 text-sm font-medium transition-all hover:border-[#4A90F5]/60 hover:bg-[#4A90F5]/5 hover:text-ainomiq-text ${
                          aiInput === sol.prompt
                            ? "border-[#4A90F5] bg-[#4A90F5]/10 text-[#4A90F5]"
                            : "border-blue-200/60 bg-ainomiq-navy/40 text-ainomiq-text-muted"
                        }`}
                      >
                        {sol.label}
                      </button>
                    ))}
                  </div>
                </div>
                {/* AI Magic Prefill */}
                <div className="mb-8 rounded-2xl border border-[#4A90F5]/20 bg-gradient-to-br from-[#4A90F5]/5 to-[#6C5CE7]/5 p-5">
                  <div className="mb-3 flex items-center gap-2">
                    <Sparkles className="h-5 w-5 text-[#6C5CE7]" />
                    <h3 className="text-base font-semibold text-ainomiq-text">Describe what you need</h3>
                  </div>
                  <p className="mb-3 text-sm text-ainomiq-text-muted">
                    Tell us in your own words - our AI will fill in the form for you.
                  </p>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      className={`${inputCls} flex-1`}
                      placeholder="e.g. I need a chatbot for my webshop that handles returns and FAQs"
                      value={aiInput}
                      onChange={(e) => { setAiInput(e.target.value); setPrefilled(false); }}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" && aiInput.trim().length >= 3 && !isPrefilling) {
                          e.preventDefault();
                          handleAiPrefill();
                        }
                      }}
                    />
                    <button
                      type="button"
                      disabled={isPrefilling || aiInput.trim().length < 3}
                      onClick={handleAiPrefill}
                      className="flex items-center gap-1.5 whitespace-nowrap rounded-xl bg-gradient-to-r from-[#4A90F5] to-[#6C5CE7] px-4 py-2.5 text-sm font-medium text-white transition-all hover:opacity-90 disabled:opacity-50"
                    >
                      {isPrefilling ? (
                        <><Loader2 className="h-4 w-4 animate-spin" /> {isScanning ? "Scanning..." : "Analyzing..."}</>
                      ) : prefilled ? (
                        <><CheckCircle className="h-4 w-4" /> Done!</>
                      ) : (
                        <><Sparkles className="h-4 w-4" /> Go</>
                      )}
                    </button>
                  </div>

                  {/* Optional website URL */}
                  <div className="mt-4 flex items-center gap-2">
                    <Globe className="h-4 w-4 text-ainomiq-text-muted/60" />
                    <input
                      type="text"
                      className={`${inputCls} flex-1 text-sm`}
                      placeholder="yourwebsite.com (optional - we'll analyze your brand)"
                      value={siteUrl}
                      onChange={(e) => { setSiteUrl(e.target.value); setSiteData(null); }}
                    />
                  </div>
                  <p className="mt-1 text-xs text-ainomiq-text-muted/50">We'll scan your site for brand voice, tech stack, and integrations.</p>
                  {prefilled && (
                    <p className="mt-2 text-xs text-[#6C5CE7]">Form filled! Click Continue to review.</p>
                  )}
                </div>
              </div>
            )}
            {step === 1 && (
              <div className="space-y-5">
                <div>
                  <h3 className="mb-1 text-lg font-semibold text-ainomiq-text">Describe your project</h3>
                  <p className="mb-6 text-sm text-ainomiq-text-muted">
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
                    <p className={`text-xs ${description.trim().length >= 3 ? "text-green-400" : "text-ainomiq-text-muted/60"}`}>
                      {description.trim().length} chars
                    </p>
                    <div className="flex items-center gap-3">
                      {description.trim().length >= 10 && !wasEnhanced && (
                        <button
                          type="button"
                          disabled={isEnhancing}
                          onClick={async () => {
                            setIsEnhancing(true);
                            try {
                              const res = await fetch("/api/enhance-description", {
                                method: "POST",
                                headers: { "Content-Type": "application/json" },
                                body: JSON.stringify({ description, projectType }),
                              });
                              const data = await res.json();
                              if (data.enhanced) {
                                setDescription(data.enhanced);
                                setWasEnhanced(true);
                              }
                              if (data.chatbotLevel) {
                                setChatbotLevel(data.chatbotLevel);
                              }
                            } catch {}
                            setIsEnhancing(false);
                          }}
                          className="flex items-center gap-1.5 rounded-full bg-gradient-to-r from-[#4A90F5] to-[#6C5CE7] px-3 py-1 text-xs font-medium text-white transition-all hover:opacity-90 disabled:opacity-50"
                        >
                          {isEnhancing ? (
                            <><Loader2 className="h-3 w-3 animate-spin" /> Enhancing...</>
                          ) : (
                            <><Sparkles className="h-3 w-3" /> Enhance with AI</>
                          )}
                        </button>
                      )}
                      {wasEnhanced && (
                        <span className="flex items-center gap-1 text-xs text-[#6C5CE7]">
                          <Sparkles className="h-3 w-3" /> AI enhanced
                        </span>
                      )}
                      {description.trim().length >= 3 && (
                        <span className="flex items-center gap-1 text-xs text-[#4A90F5]">
                          <Zap className="h-3 w-3" /> Ready for estimate
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* AI Recommendations */}
                {recommendations.length > 0 && (
                  <div className="rounded-xl border border-[#4A90F5]/20 bg-[#4A90F5]/5 p-4">
                    <div className="mb-2 flex items-center gap-2">
                      <Lightbulb className="h-4 w-4 text-[#4A90F5]" />
                      <h4 className="text-sm font-semibold text-ainomiq-text">Recommendations based on your site</h4>
                    </div>
                    <ul className="space-y-2">
                      {recommendations.map((rec, i) => (
                        <li
                          key={i}
                          className="flex cursor-pointer items-start gap-3 rounded-lg px-2 py-1.5 transition-colors hover:bg-[#4A90F5]/5"
                          onClick={() => {
                            setSelectedRecs((prev) => {
                              const next = new Set(prev);
                              if (next.has(i)) next.delete(i);
                              else next.add(i);
                              return next;
                            });
                          }}
                        >
                          <div className={`mt-0.5 flex h-4 w-4 flex-shrink-0 items-center justify-center rounded border transition-colors ${
                            selectedRecs.has(i)
                              ? "border-[#4A90F5] bg-[#4A90F5] text-white"
                              : "border-gray-300 bg-ainomiq-navy"
                          }`}>
                            {selectedRecs.has(i) && (
                              <CheckCircle className="h-3 w-3" />
                            )}
                          </div>
                          <span className={`text-sm ${selectedRecs.has(i) ? "text-ainomiq-text" : "text-ainomiq-text-muted"}`}>{rec}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <div>
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

                <label className="flex items-start gap-3 rounded-xl border border-blue-200/60 bg-blue-50/60 p-4 text-sm text-ainomiq-text-muted">
                  <input
                    type="checkbox"
                    checked={needsCredentials}
                    onChange={(event) => setNeedsCredentials(event.target.checked)}
                    className="mt-1 h-4 w-4 rounded border-blue-200/60 bg-ainomiq-navy/95 text-[#4A90F5] focus:ring-[#4A90F5]"
                  />
                  <span>Will the developer need access to existing systems?</span>
                </label>

                <div className="rounded-xl border border-blue-200/60 bg-blue-50/40 p-5">
                  <p className="mb-3 text-sm font-medium text-ainomiq-text">Preferred tech stack (optional)</p>
                  <div className="flex flex-wrap gap-2">
                    {(detectedTech.length > 0
                      ? [...new Set([...detectedTech.filter(t => DEFAULT_TECH_OPTIONS.some(o => o.toLowerCase().includes(t.toLowerCase()) || t.toLowerCase().includes(o.toLowerCase()))).map(t => DEFAULT_TECH_OPTIONS.find(o => o.toLowerCase().includes(t.toLowerCase()) || t.toLowerCase().includes(o.toLowerCase()))!), ...DEFAULT_TECH_OPTIONS])]
                      : DEFAULT_TECH_OPTIONS
                    ).map((option) => {
                      const active = techStack.includes(option);
                      return (
                        <button
                          key={option}
                          type="button"
                          onClick={() => toggleTechStack(option)}
                          className={`rounded-full border px-3 py-2 text-sm transition-colors ${
                            active
                              ? "border-[#4A90F5] bg-[#4A90F5]/10 text-[#4A90F5]"
                              : "border-blue-200/60 bg-ainomiq-navy/95 text-ainomiq-text-muted hover:border-[#4A90F5]/50"
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
                  <label className="flex cursor-pointer flex-col items-center justify-center rounded-2xl border border-dashed border-blue-200/60 bg-blue-50/40 px-6 py-8 text-center transition-colors hover:border-[#4A90F5]/50">
                    <FileUp className="mb-3 h-6 w-6 text-[#4A90F5]" />
                    <span className="text-sm font-medium text-ainomiq-text">Upload briefs, designs, wireframes</span>
                    <span className="mt-1 text-xs text-ainomiq-text-muted">Up to 5 files, max 10MB each</span>
                    <input type="file" multiple className="hidden" onChange={handleFileChange} />
                  </label>
                  {files.length > 0 && (
                    <div className="mt-3 space-y-2">
                      {files.map((file) => (
                        <div
                          key={`${file.name}-${file.size}`}
                          className="rounded-xl border border-blue-200/60 bg-blue-50/60 px-4 py-3 text-sm text-ainomiq-text-muted"
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
                <h3 className="mb-1 text-lg font-semibold text-ainomiq-text">When do you need it?</h3>
                <p className="mb-6 text-sm text-ainomiq-text-muted">Faster delivery means more pressure on scope and budget.</p>
                <div className="space-y-3">
                  {TIMELINES.map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setTimeline(item.id)}
                      className={`flex w-full items-center justify-between rounded-xl border p-4 transition-all duration-200 hover:border-[#4A90F5]/50 ${
                        timeline === item.id
                          ? "border-[#4A90F5] bg-[#4A90F5]/10 shadow-lg shadow-[#4A90F5]/10"
                          : "border-blue-200/60 bg-blue-50/60 hover:bg-blue-100/70"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <Clock className="h-4 w-4 text-ainomiq-text-muted" />
                        <span className="text-sm font-medium text-ainomiq-text">{item.label}</span>
                      </div>
                      <span className={`text-xs font-semibold ${item.color}`}>{item.tag}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {step === 3 && (
              <div>
                <h3 className="mb-1 text-lg font-semibold text-ainomiq-text">Your estimate</h3>
                <p className="mb-6 text-sm text-ainomiq-text-muted">
                  Calculated from scope and timeline. Final pricing is confirmed after review.
                </p>

                {loading ? (
                  <div className="flex flex-col items-center justify-center gap-3 py-12">
                    <Loader2 className="h-8 w-8 animate-spin text-[#4A90F5]" />
                    <p className="text-sm text-ainomiq-text-muted">Calculating your estimate…</p>
                  </div>
                ) : estimate ? (
                  <div className="rounded-xl border border-blue-200/60 bg-gradient-to-br from-[#4A90F5] to-[#2563eb] p-6">
                    <div className="mb-6 text-center">
                      <p className="mb-1 text-sm text-white/80">Estimated total</p>
                      <p className="text-5xl font-bold text-white">
                        <span className="text-white/90">€</span>
                        {estimate.total.toLocaleString()}
                      </p>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="rounded-lg bg-ainomiq-navy/20 p-3 backdrop-blur-sm">
                        <p className="mb-0.5 text-[10px] uppercase tracking-wider text-white/60">Project</p>
                        <p className="text-sm font-medium text-white">{estimate.projectType}</p>
                      </div>
                      <div className="rounded-lg bg-ainomiq-navy/20 p-3 backdrop-blur-sm">
                        <p className="mb-0.5 text-[10px] uppercase tracking-wider text-white/60">Complexity</p>
                        <p className="text-sm font-medium text-white">{estimate.complexity}</p>
                      </div>
                      <div className="rounded-lg bg-ainomiq-navy/20 p-3 backdrop-blur-sm">
                        <p className="mb-0.5 text-[10px] uppercase tracking-wider text-white/60">Delivery</p>
                        <p className="text-sm font-medium text-white">{estimate.deliveryWeeks || `~${estimate.deliveryDays} days`}{estimate.deliveryWeeks ? " weeks" : ""}</p>
                      </div>
                      <div className="rounded-lg bg-ainomiq-navy/20 p-3 backdrop-blur-sm">
                        <p className="mb-0.5 text-[10px] uppercase tracking-wider text-white/60">{estimate.monthlyCost ? "Monthly costs" : "One-time"}</p>
                        <p className="text-sm font-medium text-white">{estimate.monthlyCost ? `+ \u20AC${estimate.monthlyCost}/mo` : "No recurring fees"}</p>
                      </div>
                    </div>

                    <p className="mt-4 text-center text-xs text-white/60">
                      This request goes straight to review. No checkout step.
                    </p>
                  </div>
                ) : (
                  <div className="rounded-xl border border-blue-200/60 bg-blue-50/40 p-6 text-center text-sm text-ainomiq-text-muted">
                    Could not calculate an estimate automatically. You can still submit the project.
                  </div>
                )}
              </div>
            )}

            {step === 4 && (
              <div>
                <h3 className="mb-1 text-lg font-semibold text-ainomiq-text">Almost there - who are you?</h3>
                <p className="mb-6 text-sm text-ainomiq-text-muted">We&apos;ll prepare your project brief and reply within 24h.</p>

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

          <div className="mt-8 flex items-center justify-between border-t border-blue-200/60 pt-6">
            {step > 0 ? (
              <button
                type="button"
                onClick={() => handleStepChange(step - 1)}
                className="flex items-center gap-2 text-sm text-ainomiq-text-muted transition-colors hover:text-ainomiq-text"
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
                className="flex items-center gap-2 rounded-xl bg-[#4A90F5] px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-[#4A90F5]/25 transition-all hover:bg-[#3a7de0] disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-gray-400"
              >
                {submitting ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" /> Sending…
                  </>
                ) : (
                  <>Go to checkout {estimate ? `- €${estimate.total.toLocaleString()}` : ''} →</>
                )}
              </button>
            ) : (
              <div className="flex flex-col items-end gap-2">
                <button
                  type="button"
                  disabled={!canNext}
                  onClick={() => handleStepChange(step + 1)}
                  className="flex items-center gap-2 rounded-xl bg-[#4A90F5] px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-[#3a7de0] disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-gray-400"
                >
                  Continue <ArrowRight className="h-4 w-4" />
                </button>
                {!canNext && step === 0 && (
                  <p className="text-xs text-ainomiq-text-muted">Describe your project above to continue</p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
