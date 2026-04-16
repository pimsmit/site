import { randomBytes } from "crypto";
import type { InValue } from "@libsql/client";
import { getDb } from "@/lib/db";

export type ProjectStatus =
  | "new"
  | "reviewing"
  | "published"
  | "assigned"
  | "in_progress"
  | "delivered"
  | "paid";

export interface ProjectFile {
  name: string;
  size: number;
  type: string;
}

export interface ProjectRecord {
  id: string;
  status: string;
  company: string;
  contact: string;
  email: string;
  phone: string | null;
  foundVia: string | null;
  projectType: string;
  description: string;
  timeline: string;
  budget: string | null;
  targetAudience: string | null;
  existingUrl: string | null;
  needsCredentials: boolean;
  techStack: string[];
  features: string | null;
  designPrefs: string | null;
  referencesText: string | null;
  files: ProjectFile[];
  accessToken: string | null;
  driveFolderUrl: string | null;
  adminTitle: string | null;
  adminBrief: string | null;
  adminDeliverables: string[];
  adminTechRequirements: string | null;
  adminDesignAssetsLink: string | null;
  adminRepoLink: string | null;
  builderFee: string | null;
  deadline: string | null;
  difficulty: string | null;
  priority: string;
  assignedTo: string | null;
  discordMessageId: string | null;
  estimateTotal: number | null;
  estimateHours: number | null;
  createdAt: string;
  publishedAt: string | null;
  updatedAt: string;
}

export interface CreateProjectInput {
  company: string;
  contact: string;
  email: string;
  phone?: string | null;
  foundVia?: string | null;
  projectType: string;
  description: string;
  timeline: string;
  budget?: string | null;
  targetAudience?: string | null;
  existingUrl?: string | null;
  needsCredentials?: boolean;
  techStack?: string[];
  features?: string | null;
  designPrefs?: string | null;
  referencesText?: string | null;
  files?: ProjectFile[];
  estimateTotal?: number | null;
  estimateHours?: number | null;
}

export interface UpdateProjectInput {
  status?: string;
  company?: string;
  contact?: string;
  email?: string;
  phone?: string | null;
  foundVia?: string | null;
  projectType?: string;
  description?: string;
  timeline?: string;
  budget?: string | null;
  targetAudience?: string | null;
  existingUrl?: string | null;
  needsCredentials?: boolean;
  techStack?: string[];
  features?: string | null;
  designPrefs?: string | null;
  referencesText?: string | null;
  files?: ProjectFile[];
  driveFolderUrl?: string | null;
  adminTitle?: string | null;
  adminBrief?: string | null;
  adminDeliverables?: string[];
  adminTechRequirements?: string | null;
  adminDesignAssetsLink?: string | null;
  adminRepoLink?: string | null;
  builderFee?: string | null;
  deadline?: string | null;
  difficulty?: string | null;
  priority?: string;
  assignedTo?: string | null;
  discordMessageId?: string | null;
  estimateTotal?: number | null;
  estimateHours?: number | null;
  publishedAt?: string | null;
}

function parseJsonArray(value: unknown): string[] {
  if (typeof value !== "string" || !value) {
    return [];
  }

  try {
    const parsed = JSON.parse(value);
    return Array.isArray(parsed)
      ? parsed.filter((item): item is string => typeof item === "string")
      : [];
  } catch {
    return [];
  }
}

function parseFiles(value: unknown): ProjectFile[] {
  if (typeof value !== "string" || !value) {
    return [];
  }

  try {
    const parsed = JSON.parse(value);
    if (!Array.isArray(parsed)) {
      return [];
    }

    return parsed.flatMap((item) => {
      if (
        item &&
        typeof item === "object" &&
        typeof item.name === "string" &&
        typeof item.size === "number" &&
        typeof item.type === "string"
      ) {
        return [{ name: item.name, size: item.size, type: item.type }];
      }

      return [];
    });
  } catch {
    return [];
  }
}

function mapRow(row: Record<string, unknown>): ProjectRecord {
  return {
    id: String(row.id),
    status: String(row.status ?? "new"),
    company: String(row.company ?? ""),
    contact: String(row.contact ?? ""),
    email: String(row.email ?? ""),
    phone: typeof row.phone === "string" ? row.phone : null,
    foundVia: typeof row.found_via === "string" ? row.found_via : null,
    projectType: String(row.project_type ?? ""),
    description: String(row.description ?? ""),
    timeline: String(row.timeline ?? ""),
    budget: typeof row.budget === "string" ? row.budget : null,
    targetAudience: typeof row.target_audience === "string" ? row.target_audience : null,
    existingUrl: typeof row.existing_url === "string" ? row.existing_url : null,
    needsCredentials: Number(row.needs_credentials ?? 0) === 1,
    techStack: parseJsonArray(row.tech_stack),
    features: typeof row.features === "string" ? row.features : null,
    designPrefs: typeof row.design_prefs === "string" ? row.design_prefs : null,
    referencesText: typeof row.references_text === "string" ? row.references_text : null,
    files: parseFiles(row.files),
    accessToken: typeof row.access_token === "string" ? row.access_token : null,
    driveFolderUrl: typeof row.drive_folder_url === "string" ? row.drive_folder_url : null,
    adminTitle: typeof row.admin_title === "string" ? row.admin_title : null,
    adminBrief: typeof row.admin_brief === "string" ? row.admin_brief : null,
    adminDeliverables: parseJsonArray(row.admin_deliverables),
    adminTechRequirements:
      typeof row.admin_tech_requirements === "string" ? row.admin_tech_requirements : null,
    adminDesignAssetsLink:
      typeof row.admin_design_assets_link === "string" ? row.admin_design_assets_link : null,
    adminRepoLink: typeof row.admin_repo_link === "string" ? row.admin_repo_link : null,
    builderFee: typeof row.builder_fee === "string" ? row.builder_fee : null,
    deadline: typeof row.deadline === "string" ? row.deadline : null,
    difficulty: typeof row.difficulty === "string" ? row.difficulty : null,
    priority: String(row.priority ?? "normal"),
    assignedTo: typeof row.assigned_to === "string" ? row.assigned_to : null,
    discordMessageId: typeof row.discord_message_id === "string" ? row.discord_message_id : null,
    estimateTotal: typeof row.estimate_total === "number" ? row.estimate_total : null,
    estimateHours: typeof row.estimate_hours === "number" ? row.estimate_hours : null,
    createdAt: String(row.created_at ?? ""),
    publishedAt: typeof row.published_at === "string" ? row.published_at : null,
    updatedAt: String(row.updated_at ?? ""),
  };
}

function toStoredValue(value: unknown): InValue {
  if (typeof value === "boolean") {
    return value ? 1 : 0;
  }

  if (Array.isArray(value)) {
    return JSON.stringify(value);
  }

  if (value === undefined) {
    return null;
  }

  return value as InValue;
}

export async function createProject(data: CreateProjectInput): Promise<ProjectRecord> {
  const db = await getDb();
  const countRow = await db.execute("SELECT COUNT(*) AS count FROM projects");
  const countValue = countRow.rows[0]?.count;
  const count = typeof countValue === "number" ? countValue : Number(countValue ?? 0);
  const id = `PRJ-${String(count + 1).padStart(3, "0")}`;

  const accessToken = randomBytes(32).toString("hex");

  await db.execute({
    sql: `
      INSERT INTO projects (
        id, access_token, company, contact, email, phone, found_via, project_type, description, timeline,
        budget, target_audience, existing_url, needs_credentials, tech_stack, features,
        design_prefs, references_text, files, estimate_total, estimate_hours, updated_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, datetime('now'))
    `,
    args: [
      id,
      accessToken,
      data.company,
      data.contact,
      data.email,
      data.phone ?? null,
      data.foundVia ?? null,
      data.projectType,
      data.description,
      data.timeline,
      data.budget ?? null,
      data.targetAudience ?? null,
      data.existingUrl ?? null,
      data.needsCredentials ?? false,
      JSON.stringify(data.techStack ?? []),
      data.features ?? null,
      data.designPrefs ?? null,
      data.referencesText ?? null,
      JSON.stringify(data.files ?? []),
      data.estimateTotal ?? null,
      data.estimateHours ?? null,
    ],
  });

  const project = await getProject(id);
  if (!project) {
    throw new Error("Failed to create project");
  }

  return project;
}

export async function getProjects(filters?: { status?: string }): Promise<ProjectRecord[]> {
  const db = await getDb();
  const query = filters?.status
    ? await db.execute({
        sql: "SELECT * FROM projects WHERE status = ? ORDER BY datetime(created_at) DESC",
        args: [filters.status],
      })
    : await db.execute("SELECT * FROM projects ORDER BY datetime(created_at) DESC");

  return query.rows.map((row) => mapRow(row as Record<string, unknown>));
}

export async function getProject(id: string): Promise<ProjectRecord | null> {
  const db = await getDb();
  const result = await db.execute({
    sql: "SELECT * FROM projects WHERE id = ? LIMIT 1",
    args: [id],
  });

  const row = result.rows[0];
  return row ? mapRow(row as Record<string, unknown>) : null;
}

export async function updateProject(id: string, data: UpdateProjectInput): Promise<ProjectRecord | null> {
  const entries = Object.entries(data).filter(([, value]) => value !== undefined);
  if (entries.length === 0) {
    return getProject(id);
  }

  const columnMap: Record<string, string> = {
    status: "status",
    company: "company",
    contact: "contact",
    email: "email",
    phone: "phone",
    foundVia: "found_via",
    projectType: "project_type",
    description: "description",
    timeline: "timeline",
    budget: "budget",
    targetAudience: "target_audience",
    existingUrl: "existing_url",
    needsCredentials: "needs_credentials",
    techStack: "tech_stack",
    features: "features",
    designPrefs: "design_prefs",
    referencesText: "references_text",
    files: "files",
    driveFolderUrl: "drive_folder_url",
    adminTitle: "admin_title",
    adminBrief: "admin_brief",
    adminDeliverables: "admin_deliverables",
    adminTechRequirements: "admin_tech_requirements",
    adminDesignAssetsLink: "admin_design_assets_link",
    adminRepoLink: "admin_repo_link",
    builderFee: "builder_fee",
    deadline: "deadline",
    difficulty: "difficulty",
    priority: "priority",
    assignedTo: "assigned_to",
    discordMessageId: "discord_message_id",
    estimateTotal: "estimate_total",
    estimateHours: "estimate_hours",
    publishedAt: "published_at",
  };

  const sets = entries.map(([key]) => `${columnMap[key]} = ?`);
  const args: InValue[] = entries.map(([, value]) => toStoredValue(value));

  const db = await getDb();
  await db.execute({
    sql: `UPDATE projects SET ${sets.join(", ")}, updated_at = datetime('now') WHERE id = ?`,
    args: [...args, id],
  });

  return getProject(id);
}

export async function updateProjectStatus(id: string, status: ProjectStatus): Promise<ProjectRecord | null> {
  return updateProject(id, { status });
}
