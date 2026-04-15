import type { ProjectFile, ProjectRecord } from "@/lib/projects";

export const PROJECT_STATUSES = [
  "all",
  "new",
  "reviewing",
  "published",
  "assigned",
  "in_progress",
  "delivered",
  "paid",
] as const;

export const DIFFICULTY_LEVELS = ["Easy", "Medium", "Hard", "Expert"] as const;
export const PRIORITY_LEVELS = ["normal", "urgent", "critical"] as const;

export function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function isValidUrl(url: string): boolean {
  try {
    const parsed = new URL(url);
    return parsed.protocol === "http:" || parsed.protocol === "https:";
  } catch {
    return false;
  }
}

export function parseBudgetAmount(budget: string | null | undefined): number | null {
  if (!budget) {
    return null;
  }

  const cleaned = budget.replace(/[^0-9.,]/g, "").replace(",", ".");
  const amount = Number.parseFloat(cleaned);
  return Number.isFinite(amount) && amount > 0 ? amount : null;
}

export function calculateBudgetSplit(budget: string | null | undefined) {
  const amount = parseBudgetAmount(budget);
  if (amount === null) {
    return {
      amount: null,
      builderFee: null,
      margin: null,
      builderFeeLabel: "TBD",
      marginLabel: "TBD",
      amountLabel: budget?.trim() || "TBD",
    };
  }

  const builderFee = Math.round(amount * 0.2 * 100) / 100;
  const margin = Math.round((amount - builderFee) * 100) / 100;

  return {
    amount,
    builderFee,
    margin,
    builderFeeLabel: formatEuro(builderFee),
    marginLabel: formatEuro(margin),
    amountLabel: formatEuro(amount),
  };
}

export function formatEuro(value: number): string {
  return new Intl.NumberFormat("nl-NL", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: value % 1 === 0 ? 0 : 2,
  }).format(value);
}

export function formatProjectFiles(files: ProjectFile[]): string {
  if (files.length === 0) {
    return "N/A";
  }

  return files
    .map((file) => `${file.name} (${Math.round(file.size / 1024)} KB, ${file.type || "unknown"})`)
    .join("\n");
}

export function toDiscordList(items: string[]): string {
  return items.length > 0 ? items.map((item) => `• ${item}`).join("\n") : "N/A";
}

export function buildAdminSubmissionEmbed(project: ProjectRecord) {
  const split = calculateBudgetSplit(project.budget);
  return {
    username: "Ainomiq Admin",
    embeds: [
      {
        title: "🆕 New Project Request (ADMIN)",
        color: 15158332,
        fields: [
          { name: "🆔 Project", value: project.id, inline: true },
          { name: "🏢 Company", value: project.company, inline: true },
          { name: "👤 Contact", value: project.contact, inline: true },
          { name: "📧 Email", value: project.email, inline: true },
          { name: "📱 Phone", value: project.phone || "N/A", inline: true },
          { name: "🔍 Found via", value: project.foundVia || "N/A", inline: true },
          { name: "📋 Type", value: project.projectType, inline: true },
          { name: "⏰ Timeline", value: project.timeline, inline: true },
          { name: "💰 Client Budget", value: split.amountLabel, inline: true },
          { name: "💵 Builder Fee (20%)", value: split.builderFeeLabel, inline: true },
          { name: "📊 Margin (80%)", value: split.marginLabel, inline: true },
          { name: "👥 Target Audience", value: project.targetAudience || "N/A", inline: false },
          { name: "🌐 Existing URL", value: project.existingUrl || "N/A", inline: false },
          {
            name: "🔐 Needs Credentials",
            value: project.needsCredentials ? "Yes" : "No",
            inline: true,
          },
          {
            name: "🛠 Preferred Tech",
            value: project.techStack.length > 0 ? project.techStack.join(", ") : "N/A",
            inline: true,
          },
          { name: "📝 Description", value: project.description.slice(0, 1024), inline: false },
          { name: "✨ Must-have Features", value: project.features || "N/A", inline: false },
          { name: "🎨 Design Preferences", value: project.designPrefs || "N/A", inline: false },
          { name: "🔗 References", value: project.referencesText || "N/A", inline: false },
          { name: "📎 Files", value: formatProjectFiles(project.files), inline: false },
        ],
        footer: { text: "ADMIN — Ainomiq" },
        timestamp: new Date().toISOString(),
      },
    ],
  };
}

export function buildBuilderPublishEmbed(project: ProjectRecord) {
  return {
    username: "Ainomiq Projects",
    embeds: [
      {
        title: `🚀 ${project.adminTitle || project.projectType}`,
        color: 4886773,
        fields: [
          { name: "📋 Type", value: project.projectType, inline: true },
          { name: "⏰ Deadline", value: project.deadline || "TBD", inline: true },
          { name: "💰 Fee", value: project.builderFee || "TBD", inline: true },
          { name: "⚡ Difficulty", value: project.difficulty || "TBD", inline: true },
          { name: "🔥 Priority", value: project.priority, inline: true },
          {
            name: "🛠 Tech Stack",
            value: project.techStack.length > 0 ? project.techStack.join(", ") : "N/A",
            inline: true,
          },
          { name: "📝 Brief", value: project.adminBrief || "N/A", inline: false },
          {
            name: "✅ Deliverables",
            value: toDiscordList(project.adminDeliverables),
            inline: false,
          },
          {
            name: "📁 Project Folder",
            value: project.driveFolderUrl || "N/A",
            inline: false,
          },
          {
            name: "🔗 Repo",
            value: project.adminRepoLink || "Will be created",
            inline: false,
          },
        ],
        footer: { text: "Reply ✋ to claim — first come first serve" },
        timestamp: new Date().toISOString(),
      },
    ],
  };
}

export function buildAdminPublishEmbed(project: ProjectRecord) {
  const split = calculateBudgetSplit(project.budget);
  return {
    username: "Ainomiq Admin",
    embeds: [
      {
        title: `📢 Published Project ${project.id}`,
        color: 3447003,
        fields: [
          { name: "🏷 Title", value: project.adminTitle || "N/A", inline: false },
          { name: "🏢 Company", value: project.company, inline: true },
          { name: "👤 Contact", value: project.contact, inline: true },
          { name: "📧 Email", value: project.email, inline: true },
          { name: "💰 Client Budget", value: split.amountLabel, inline: true },
          { name: "💵 Builder Fee", value: project.builderFee || split.builderFeeLabel, inline: true },
          { name: "📊 Margin", value: split.marginLabel, inline: true },
          { name: "🔥 Priority", value: project.priority, inline: true },
          { name: "⚡ Difficulty", value: project.difficulty || "TBD", inline: true },
          { name: "⏰ Deadline", value: project.deadline || "TBD", inline: true },
          { name: "📝 Brief", value: project.adminBrief || "N/A", inline: false },
          { name: "✅ Deliverables", value: toDiscordList(project.adminDeliverables), inline: false },
        ],
        footer: { text: "ADMIN — Ainomiq" },
        timestamp: new Date().toISOString(),
      },
    ],
  };
}
