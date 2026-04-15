import { NextRequest, NextResponse } from "next/server";
import { buildAdminSubmissionEmbed, calculateBudgetSplit, isValidEmail, isValidUrl } from "@/lib/project-submission";
import { createProject, type ProjectFile } from "@/lib/projects";

const RATE_LIMIT_MAX = 5;
const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000;
const uploadAttempts = new Map<string, number[]>();

function getIpAddress(request: NextRequest): string {
  const forwardedFor = request.headers.get("x-forwarded-for");
  if (forwardedFor) {
    return forwardedFor.split(",")[0]?.trim() || "unknown";
  }

  return request.headers.get("x-real-ip") || "unknown";
}

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const attempts = uploadAttempts.get(ip) ?? [];
  const recentAttempts = attempts.filter((timestamp) => now - timestamp < RATE_LIMIT_WINDOW_MS);

  if (recentAttempts.length >= RATE_LIMIT_MAX) {
    uploadAttempts.set(ip, recentAttempts);
    return true;
  }

  recentAttempts.push(now);
  uploadAttempts.set(ip, recentAttempts);
  return false;
}

function getString(formData: FormData, key: string): string {
  const value = formData.get(key);
  return typeof value === "string" ? value.trim() : "";
}

function getOptionalString(formData: FormData, key: string): string | null {
  const value = getString(formData, key);
  return value ? value : null;
}

function getStringArray(formData: FormData, key: string): string[] {
  return formData
    .getAll(key)
    .flatMap((value) => (typeof value === "string" ? [value.trim()] : []))
    .filter(Boolean);
}

function parseUploadedFiles(formData: FormData): ProjectFile[] | { errors: string[] } {
  const fileEntries = formData.getAll("files");
  const files = fileEntries.filter((entry): entry is File => entry instanceof File && entry.size > 0);

  if (files.length > 5) {
    return { errors: ["You can upload up to 5 files."] };
  }

  const invalidFiles = files.filter((file) => file.size > 10 * 1024 * 1024);
  if (invalidFiles.length > 0) {
    return { errors: ["Each file must be 10MB or smaller."] };
  }

  return files.map((file) => ({
    name: file.name,
    size: file.size,
    type: file.type || "application/octet-stream",
  }));
}

export async function POST(request: NextRequest) {
  try {
    const ip = getIpAddress(request);
    if (isRateLimited(ip)) {
      return NextResponse.json(
        { success: false, errors: ["Too many submissions from this IP. Please try again later."] },
        { status: 429 }
      );
    }

    const formData = await request.formData();

    if (getString(formData, "website_url")) {
      return NextResponse.json({ success: true });
    }

    const filesResult = parseUploadedFiles(formData);
    if ("errors" in filesResult) {
      return NextResponse.json({ success: false, errors: filesResult.errors }, { status: 400 });
    }

    const company = getString(formData, "company");
    const contact = getString(formData, "contact");
    const email = getString(formData, "email");
    const phone = getOptionalString(formData, "phone");
    const foundVia = getOptionalString(formData, "foundVia");
    const projectType = getString(formData, "projectType");
    const description = getString(formData, "description");
    const timeline = getString(formData, "timeline");
    const budget = getOptionalString(formData, "budget");
    const targetAudience = getOptionalString(formData, "targetAudience");
    const existingUrl = getOptionalString(formData, "existingUrl");
    const needsCredentials = getString(formData, "needsCredentials") === "true";
    const techStack = getStringArray(formData, "techStack");
    const features = getOptionalString(formData, "features");
    const designPrefs = getOptionalString(formData, "designPrefs");
    const referencesText = getOptionalString(formData, "referencesText");
    const estimateTotalRaw = getOptionalString(formData, "estimateTotal");
    const estimateHoursRaw = getOptionalString(formData, "estimateHours");

    const errors: string[] = [];

    if (!company) errors.push("Company name is required.");
    if (!contact) errors.push("Contact name is required.");
    if (!email || !isValidEmail(email)) errors.push("Valid email is required.");
    if (!projectType) errors.push("Project type is required.");
    if (description.length < 3) errors.push("Description is required.");
    if (!timeline) errors.push("Timeline is required.");
    if (existingUrl && !isValidUrl(existingUrl)) errors.push("Existing site/app URL must be valid.");
    if (techStack.length > 7) errors.push("Too many tech stack values submitted.");

    const estimateTotal = estimateTotalRaw ? Number(estimateTotalRaw) : null;
    const estimateHours = estimateHoursRaw ? Number(estimateHoursRaw) : null;

    if (estimateTotalRaw && !Number.isFinite(estimateTotal ?? NaN)) {
      errors.push("Estimate total is invalid.");
    }

    if (estimateHoursRaw && !Number.isFinite(estimateHours ?? NaN)) {
      errors.push("Estimate hours is invalid.");
    }

    if (errors.length > 0) {
      return NextResponse.json({ success: false, errors }, { status: 400 });
    }

    const project = await createProject({
      company,
      contact,
      email,
      phone,
      foundVia,
      projectType,
      description,
      timeline,
      budget,
      targetAudience,
      existingUrl,
      needsCredentials,
      techStack,
      features,
      designPrefs,
      referencesText,
      files: filesResult,
      estimateTotal,
      estimateHours,
    });

    // Send Discord notification (non-blocking — DB write is the important part)
    const adminWebhook = process.env.DISCORD_WEBHOOK_URL;
    if (adminWebhook) {
      try {
        const payload = buildAdminSubmissionEmbed(project);
        const webhookResponse = await fetch(adminWebhook, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });

        if (!webhookResponse.ok) {
          const split = calculateBudgetSplit(project.budget);
          console.error("Admin webhook failed", {
            status: webhookResponse.status,
            projectId: project.id,
            builderFee: split.builderFeeLabel,
            margin: split.marginLabel,
            response: await webhookResponse.text(),
          });
        }
      } catch (webhookError) {
        console.error("Admin webhook error (project saved successfully):", webhookError);
      }
    } else {
      console.warn("DISCORD_WEBHOOK_URL not set — skipping notification");
    }

    return NextResponse.json({ success: true, projectId: project.id });
  } catch (error) {
    console.error("Submit project error:", error);
    return NextResponse.json(
      { success: false, errors: ["Unexpected error. Please try again."] },
      { status: 500 }
    );
  }
}
