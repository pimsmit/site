"use client";

import { useEffect, useMemo, useState } from "react";
import {
  ChevronDown,
  ChevronUp,
  Folder,
  Loader2,
  Lock,
  Save,
  Send,
  CalendarDays,
  Euro,
  User,
  Mail,
  Phone,
} from "lucide-react";
import { calculateBudgetSplit, formatEuro } from "@/lib/project-submission";
import type { ProjectRecord } from "@/lib/projects";

const FILTERS = [
  { id: "all", label: "All" },
  { id: "new", label: "New" },
  { id: "reviewing", label: "Reviewing" },
  { id: "published", label: "Published" },
  { id: "assigned", label: "Assigned" },
  { id: "in_progress", label: "In Progress" },
  { id: "delivered", label: "Delivered" },
  { id: "paid", label: "Paid" },
] as const;

const STATUS_OPTIONS = FILTERS.filter((item) => item.id !== "all");
const DIFFICULTY_OPTIONS = ["Easy", "Medium", "Hard", "Expert"] as const;
const PRIORITY_OPTIONS = ["normal", "urgent", "critical"] as const;

type FilterId = (typeof FILTERS)[number]["id"];

interface EditableProjectState {
  status: string;
  adminTitle: string;
  adminBrief: string;
  adminDeliverables: string[];
  adminTechRequirements: string;
  adminDesignAssetsLink: string;
  adminRepoLink: string;
  builderFee: string;
  deadline: string;
  difficulty: string;
  priority: string;
  driveFolderUrl: string;
}

function createEditableState(project: ProjectRecord): EditableProjectState {
  const split = calculateBudgetSplit(project.budget);
  return {
    status: project.status,
    adminTitle: project.adminTitle || "",
    adminBrief: project.adminBrief || "",
    adminDeliverables: project.adminDeliverables.length > 0 ? project.adminDeliverables : [""],
    adminTechRequirements: project.adminTechRequirements || "",
    adminDesignAssetsLink: project.adminDesignAssetsLink || "",
    adminRepoLink: project.adminRepoLink || "",
    builderFee: project.builderFee || split.builderFeeLabel,
    deadline: project.deadline || "",
    difficulty: project.difficulty || "Medium",
    priority: project.priority || "normal",
    driveFolderUrl: project.driveFolderUrl || "",
  };
}

function getProjectOrFallback(projects: ProjectRecord[], projectId: string): ProjectRecord | null {
  return projects.find((project) => project.id === projectId) || null;
}

function statusBadgeClass(status: string): string {
  switch (status) {
    case "new":
      return "border-blue-500/30 bg-blue-500/10 text-blue-300";
    case "reviewing":
      return "border-yellow-500/30 bg-yellow-500/10 text-yellow-300";
    case "published":
      return "border-green-500/30 bg-green-500/10 text-green-300";
    case "assigned":
      return "border-purple-500/30 bg-purple-500/10 text-purple-300";
    case "in_progress":
      return "border-indigo-500/30 bg-indigo-500/10 text-indigo-300";
    case "delivered":
      return "border-emerald-500/30 bg-emerald-500/10 text-emerald-300";
    case "paid":
      return "border-gray-500/30 bg-ainomiq-surface0/10 text-ainomiq-text-subtle";
    default:
      return "border-[#1e293b] bg-[#1e293b]/50 text-ainomiq-text-subtle";
  }
}

export default function AdminProjectsPage() {
  const [adminKey, setAdminKey] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [authenticated, setAuthenticated] = useState(false);
  const [projects, setProjects] = useState<ProjectRecord[]>([]);
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});
  const [drafts, setDrafts] = useState<Record<string, EditableProjectState>>({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [filter, setFilter] = useState<FilterId>("all");
  const [savingId, setSavingId] = useState<string | null>(null);
  const [publishingId, setPublishingId] = useState<string | null>(null);

  useEffect(() => {
    const stored = window.sessionStorage.getItem("ainomiq-admin-password") || "";
    if (stored) {
      setAdminKey(stored);
      setPasswordInput(stored);
      setAuthenticated(true);
    }
  }, []);

  useEffect(() => {
    if (!authenticated || !adminKey) return;

    async function loadProjects() {
      setLoading(true);
      setError("");
      try {
        const response = await fetch("/api/admin/projects", {
          headers: { "x-admin-key": adminKey },
        });

        if (!response.ok) {
          if (response.status === 401) {
            window.sessionStorage.removeItem("ainomiq-admin-password");
            setAuthenticated(false);
            setAdminKey("");
            setPasswordInput("");
            setError("Admin password rejected.");
            return;
          }
          throw new Error("Failed to load projects");
        }

        const data = (await response.json()) as { projects: ProjectRecord[] };
        setProjects(data.projects);
        setDrafts(
          Object.fromEntries(data.projects.map((project) => [project.id, createEditableState(project)]))
        );
      } catch (loadError) {
        console.error(loadError);
        setError("Failed to load projects.");
      } finally {
        setLoading(false);
      }
    }

    void loadProjects();
  }, [authenticated, adminKey]);

  const filteredProjects = useMemo(() => {
    return filter === "all" ? projects : projects.filter((project) => project.status === filter);
  }, [projects, filter]);

  function handleUnlock() {
    if (!passwordInput.trim()) {
      setError("Enter the admin password.");
      return;
    }

    window.sessionStorage.setItem("ainomiq-admin-password", passwordInput.trim());
    setAdminKey(passwordInput.trim());
    setAuthenticated(true);
    setError("");
  }

  function updateDraft(projectId: string, updater: (state: EditableProjectState) => EditableProjectState) {
    setDrafts((current) => {
      const existingDraft = current[projectId];
      const project = getProjectOrFallback(projects, projectId);

      if (!existingDraft && !project) {
        return current;
      }

      const baseState = existingDraft || (project ? createEditableState(project) : null);
      if (!baseState) {
        return current;
      }

      return {
        ...current,
        [projectId]: updater(baseState),
      };
    });
  }

  async function saveProject(projectId: string) {
    const draft = drafts[projectId];
    if (!draft) return;

    setSavingId(projectId);
    setError("");

    try {
      const response = await fetch(`/api/admin/projects/${projectId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "x-admin-key": adminKey,
        },
        body: JSON.stringify({
          status: draft.status,
          adminTitle: draft.adminTitle,
          adminBrief: draft.adminBrief,
          adminDeliverables: draft.adminDeliverables.filter((item) => item.trim().length > 0),
          adminTechRequirements: draft.adminTechRequirements,
          adminDesignAssetsLink: draft.adminDesignAssetsLink,
          adminRepoLink: draft.adminRepoLink,
          builderFee: draft.builderFee,
          deadline: draft.deadline,
          difficulty: draft.difficulty,
          priority: draft.priority,
          driveFolderUrl: draft.driveFolderUrl,
        }),
      });

      const data = (await response.json()) as { project?: ProjectRecord; error?: string };
      if (!response.ok || !data.project) {
        throw new Error(data.error || "Failed to save project");
      }

      const updatedProject = data.project;
      setProjects((current) =>
        current.map((project) => (project.id === projectId ? updatedProject : project))
      );
      setDrafts((current) => ({ ...current, [projectId]: createEditableState(updatedProject) }));
    } catch (saveError) {
      console.error(saveError);
      setError("Failed to save project.");
    } finally {
      setSavingId(null);
    }
  }

  async function publishProject(projectId: string) {
    setPublishingId(projectId);
    setError("");

    try {
      const response = await fetch("/api/publish-project", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-admin-key": adminKey,
        },
        body: JSON.stringify({ id: projectId }),
      });

      const data = (await response.json()) as { project?: ProjectRecord; error?: string };
      if (!response.ok || !data.project) {
        throw new Error(data.error || "Failed to publish project");
      }

      const updatedProject = data.project;
      setProjects((current) =>
        current.map((project) => (project.id === projectId ? updatedProject : project))
      );
      setDrafts((current) => ({ ...current, [projectId]: createEditableState(updatedProject) }));
    } catch (publishError) {
      console.error(publishError);
      setError("Failed to publish project.");
    } finally {
      setPublishingId(null);
    }
  }

  if (!authenticated) {
    return (
      <main className="min-h-screen bg-[#020617] px-6 py-24 text-white">
        <div className="mx-auto max-w-md rounded-2xl border border-[#1e293b] bg-[#0f172a] p-8 shadow-2xl">
          <div className="mb-6 flex items-center gap-3">
            <div className="rounded-xl bg-[#4A90F5]/10 p-3 text-[#4A90F5]">
              <Lock className="h-5 w-5" />
            </div>
            <div>
              <h1 className="text-2xl font-semibold">Admin Projects</h1>
              <p className="text-sm text-ainomiq-text-subtle">Enter the admin password to review requests.</p>
            </div>
          </div>
          <input
            type="password"
            value={passwordInput}
            onChange={(event) => setPasswordInput(event.target.value)}
            className="w-full rounded-xl border border-[#1e293b] bg-[#1e293b]/50 px-4 py-3 text-white placeholder:text-ainomiq-text-subtle focus:border-[#4A90F5] focus:outline-none focus:ring-1 focus:ring-[#4A90F5]"
            placeholder="Admin password"
          />
          {error && <p className="mt-3 text-sm text-red-400">{error}</p>}
          <button
            type="button"
            onClick={handleUnlock}
            className="mt-5 w-full rounded-xl bg-[#4A90F5] px-4 py-3 font-medium text-white transition-colors hover:bg-[#3a7de0]"
          >
            Unlock dashboard
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#020617] px-4 py-10 text-white sm:px-6">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex flex-col gap-4 rounded-2xl border border-[#1e293b] bg-[#0f172a] p-6 shadow-2xl md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.24em] text-[#4A90F5]">Admin Review</p>
            <h1 className="mt-2 text-3xl font-semibold">Project submissions</h1>
            <p className="mt-2 text-ainomiq-text-subtle">Newest requests first. Save edits before publishing to Discord.</p>
          </div>
          <div className="flex flex-wrap gap-2">
            {FILTERS.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setFilter(item.id)}
                className={`rounded-full border px-4 py-2 text-sm transition-colors ${
                  filter === item.id
                    ? "border-[#4A90F5] bg-[#4A90F5]/10 text-[#4A90F5]"
                    : "border-[#1e293b] bg-[#1e293b]/40 text-ainomiq-text-subtle hover:border-[#4A90F5]/40"
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>

        {error && <div className="mb-6 rounded-xl border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-300">{error}</div>}

        {loading ? (
          <div className="flex items-center justify-center py-24 text-ainomiq-text-subtle">
            <Loader2 className="mr-3 h-5 w-5 animate-spin" /> Loading projects…
          </div>
        ) : filteredProjects.length === 0 ? (
          <div className="rounded-2xl border border-[#1e293b] bg-[#0f172a] p-10 text-center text-ainomiq-text-subtle">
            No projects in this filter.
          </div>
        ) : (
          <div className="space-y-5">
            {filteredProjects.map((project) => {
              const draft = drafts[project.id] || createEditableState(project);
              const split = calculateBudgetSplit(project.budget);
              const isExpanded = expanded[project.id] ?? false;

              return (
                <section
                  key={project.id}
                  className="rounded-2xl border border-[#1e293b] bg-[#0f172a] p-6 shadow-2xl"
                >
                  <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
                    <div className="flex-1 space-y-4">
                      <div className="flex flex-wrap items-center gap-3">
                        <span className="rounded-full border border-[#1e293b] bg-[#1e293b]/50 px-3 py-1 text-xs text-ainomiq-text-subtle">
                          {project.id}
                        </span>
                        <span className={`rounded-full border px-3 py-1 text-xs font-medium capitalize ${statusBadgeClass(project.status)}`}>
                          {project.status.replace("_", " ")}
                        </span>
                        <span className="text-sm text-ainomiq-text-subtle">{new Date(project.createdAt).toLocaleString()}</span>
                      </div>

                      <div className="grid gap-4 lg:grid-cols-2">
                        <div className="rounded-xl border border-[#1e293b] bg-[#1e293b]/20 p-4">
                          <p className="mb-3 text-sm font-medium text-white">Client details</p>
                          <div className="space-y-2 text-sm text-ainomiq-text-subtle">
                            <p className="flex items-center gap-2"><User className="h-4 w-4 text-[#4A90F5]" /> {project.company} · {project.contact}</p>
                            <p className="flex items-center gap-2"><Mail className="h-4 w-4 text-[#4A90F5]" /> {project.email}</p>
                            <p className="flex items-center gap-2"><Phone className="h-4 w-4 text-[#4A90F5]" /> {project.phone || "No phone"}</p>
                          </div>
                        </div>

                        <div className="rounded-xl border border-[#1e293b] bg-[#1e293b]/20 p-4">
                          <p className="mb-3 text-sm font-medium text-white">Project details</p>
                          <div className="space-y-2 text-sm text-ainomiq-text-subtle">
                            <p>{project.projectType}</p>
                            <p>{project.timeline}</p>
                            <p className="flex items-center gap-2"><Euro className="h-4 w-4 text-[#4A90F5]" /> {project.budget || "TBD"} {project.estimateTotal ? `(${formatEuro(project.estimateTotal)} est.)` : ""}</p>
                            <p>{project.description}</p>
                          </div>
                        </div>
                      </div>

                      <div className="grid gap-4 lg:grid-cols-3">
                        <div className="rounded-xl border border-[#1e293b] bg-[#1e293b]/20 p-4 text-sm text-ainomiq-text-subtle">
                          <p className="mb-2 font-medium text-white">Files</p>
                          {project.files.length > 0 ? (
                            <div className="space-y-2">
                              {project.files.map((file) => (
                                <p key={`${project.id}-${file.name}`}>
                                  {file.name} · {(file.size / 1024 / 1024).toFixed(2)} MB
                                </p>
                              ))}
                            </div>
                          ) : (
                            <p>No files uploaded</p>
                          )}
                        </div>
                        <div className="rounded-xl border border-[#1e293b] bg-[#1e293b]/20 p-4 text-sm text-ainomiq-text-subtle">
                          <p className="mb-2 font-medium text-white">Scope notes</p>
                          <p>Target audience: {project.targetAudience || "N/A"}</p>
                          <p>Existing URL: {project.existingUrl || "N/A"}</p>
                          <p>Credentials needed: {project.needsCredentials ? "Yes" : "No"}</p>
                          <p>Stack: {project.techStack.join(", ") || "N/A"}</p>
                        </div>
                        <div className="rounded-xl border border-[#1e293b] bg-[#1e293b]/20 p-4 text-sm text-ainomiq-text-subtle">
                          <p className="mb-2 font-medium text-white">Commercials</p>
                          <p>Builder fee: {draft.builderFee || split.builderFeeLabel}</p>
                          <p>Margin: {split.marginLabel}</p>
                          <p className="flex items-center gap-2"><CalendarDays className="h-4 w-4 text-[#4A90F5]" /> {project.deadline || "Deadline not set"}</p>
                        </div>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => setExpanded((current) => ({ ...current, [project.id]: !isExpanded }))}
                      className="flex items-center gap-2 self-start rounded-xl border border-[#1e293b] bg-[#1e293b]/40 px-4 py-2 text-sm text-ainomiq-text-subtle transition-colors hover:border-[#4A90F5]/40"
                    >
                      {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                      {isExpanded ? "Hide editor" : "Edit project"}
                    </button>
                  </div>

                  {isExpanded && (
                    <div className="mt-6 border-t border-[#1e293b] pt-6">
                      <div className="grid gap-4 lg:grid-cols-2">
                        <div>
                          <label className="mb-2 block text-sm text-ainomiq-text-subtle">Project title</label>
                          <input
                            type="text"
                            value={draft.adminTitle}
                            onChange={(event) => updateDraft(project.id, (state) => ({ ...state, adminTitle: event.target.value }))}
                            className="w-full rounded-xl border border-[#1e293b] bg-[#1e293b]/50 px-4 py-3 text-white focus:border-[#4A90F5] focus:outline-none focus:ring-1 focus:ring-[#4A90F5]"
                          />
                        </div>
                        <div>
                          <label className="mb-2 block text-sm text-ainomiq-text-subtle">Repo link</label>
                          <input
                            type="text"
                            value={draft.adminRepoLink}
                            onChange={(event) => updateDraft(project.id, (state) => ({ ...state, adminRepoLink: event.target.value }))}
                            className="w-full rounded-xl border border-[#1e293b] bg-[#1e293b]/50 px-4 py-3 text-white focus:border-[#4A90F5] focus:outline-none focus:ring-1 focus:ring-[#4A90F5]"
                          />
                        </div>
                      </div>

                      <div className="mt-4">
                        <label className="mb-2 block text-sm text-ainomiq-text-subtle">Detailed brief</label>
                        <textarea
                          value={draft.adminBrief}
                          onChange={(event) => updateDraft(project.id, (state) => ({ ...state, adminBrief: event.target.value }))}
                          className="min-h-[140px] w-full rounded-xl border border-[#1e293b] bg-[#1e293b]/50 px-4 py-3 text-white focus:border-[#4A90F5] focus:outline-none focus:ring-1 focus:ring-[#4A90F5]"
                        />
                      </div>

                      <div className="mt-4">
                        <label className="mb-2 block text-sm text-ainomiq-text-subtle">Deliverables</label>
                        <div className="space-y-2">
                          {draft.adminDeliverables.map((deliverable, index) => (
                            <div key={`${project.id}-deliverable-${index}`} className="flex gap-2">
                              <input
                                type="text"
                                value={deliverable}
                                onChange={(event) =>
                                  updateDraft(project.id, (state) => ({
                                    ...state,
                                    adminDeliverables: state.adminDeliverables.map((item, itemIndex) =>
                                      itemIndex === index ? event.target.value : item
                                    ),
                                  }))
                                }
                                className="flex-1 rounded-xl border border-[#1e293b] bg-[#1e293b]/50 px-4 py-3 text-white focus:border-[#4A90F5] focus:outline-none focus:ring-1 focus:ring-[#4A90F5]"
                              />
                              <button
                                type="button"
                                onClick={() =>
                                  updateDraft(project.id, (state) => ({
                                    ...state,
                                    adminDeliverables:
                                      state.adminDeliverables.length > 1
                                        ? state.adminDeliverables.filter((_, itemIndex) => itemIndex !== index)
                                        : [""],
                                  }))
                                }
                                className="rounded-xl border border-[#1e293b] px-4 text-sm text-ainomiq-text-subtle transition-colors hover:border-red-500/40 hover:text-red-300"
                              >
                                Remove
                              </button>
                            </div>
                          ))}
                          <button
                            type="button"
                            onClick={() =>
                              updateDraft(project.id, (state) => ({
                                ...state,
                                adminDeliverables: [...state.adminDeliverables, ""],
                              }))
                            }
                            className="rounded-xl border border-[#1e293b] px-4 py-2 text-sm text-ainomiq-text-subtle transition-colors hover:border-[#4A90F5]/40"
                          >
                            Add deliverable
                          </button>
                        </div>
                      </div>

                      <div className="mt-4 grid gap-4 lg:grid-cols-2">
                        <div>
                          <label className="mb-2 block text-sm text-ainomiq-text-subtle">Tech requirements</label>
                          <textarea
                            value={draft.adminTechRequirements}
                            onChange={(event) => updateDraft(project.id, (state) => ({ ...state, adminTechRequirements: event.target.value }))}
                            className="min-h-[110px] w-full rounded-xl border border-[#1e293b] bg-[#1e293b]/50 px-4 py-3 text-white focus:border-[#4A90F5] focus:outline-none focus:ring-1 focus:ring-[#4A90F5]"
                          />
                        </div>
                        <div>
                          <label className="mb-2 block text-sm text-ainomiq-text-subtle">Design assets link</label>
                          <input
                            type="text"
                            value={draft.adminDesignAssetsLink}
                            onChange={(event) => updateDraft(project.id, (state) => ({ ...state, adminDesignAssetsLink: event.target.value }))}
                            className="w-full rounded-xl border border-[#1e293b] bg-[#1e293b]/50 px-4 py-3 text-white focus:border-[#4A90F5] focus:outline-none focus:ring-1 focus:ring-[#4A90F5]"
                          />
                        </div>
                      </div>

                      <div className="mt-4 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                        <div>
                          <label className="mb-2 block text-sm text-ainomiq-text-subtle">Builder fee</label>
                          <input
                            type="text"
                            value={draft.builderFee}
                            onChange={(event) => updateDraft(project.id, (state) => ({ ...state, builderFee: event.target.value }))}
                            className="w-full rounded-xl border border-[#1e293b] bg-[#1e293b]/50 px-4 py-3 text-white focus:border-[#4A90F5] focus:outline-none focus:ring-1 focus:ring-[#4A90F5]"
                          />
                        </div>
                        <div>
                          <label className="mb-2 block text-sm text-ainomiq-text-subtle">Deadline</label>
                          <input
                            type="date"
                            value={draft.deadline}
                            onChange={(event) => updateDraft(project.id, (state) => ({ ...state, deadline: event.target.value }))}
                            className="w-full rounded-xl border border-[#1e293b] bg-[#1e293b]/50 px-4 py-3 text-white focus:border-[#4A90F5] focus:outline-none focus:ring-1 focus:ring-[#4A90F5]"
                          />
                        </div>
                        <div>
                          <label className="mb-2 block text-sm text-ainomiq-text-subtle">Status</label>
                          <select
                            value={draft.status}
                            onChange={(event) => updateDraft(project.id, (state) => ({ ...state, status: event.target.value }))}
                            className="w-full rounded-xl border border-[#1e293b] bg-[#1e293b]/50 px-4 py-3 text-white focus:border-[#4A90F5] focus:outline-none focus:ring-1 focus:ring-[#4A90F5]"
                          >
                            {STATUS_OPTIONS.map((option) => (
                              <option key={option.id} value={option.id}>
                                {option.label}
                              </option>
                            ))}
                          </select>
                        </div>
                        <div>
                          <label className="mb-2 block text-sm text-ainomiq-text-subtle">Difficulty</label>
                          <select
                            value={draft.difficulty}
                            onChange={(event) => updateDraft(project.id, (state) => ({ ...state, difficulty: event.target.value }))}
                            className="w-full rounded-xl border border-[#1e293b] bg-[#1e293b]/50 px-4 py-3 text-white focus:border-[#4A90F5] focus:outline-none focus:ring-1 focus:ring-[#4A90F5]"
                          >
                            {DIFFICULTY_OPTIONS.map((option) => (
                              <option key={option} value={option}>
                                {option}
                              </option>
                            ))}
                          </select>
                        </div>
                        <div>
                          <label className="mb-2 block text-sm text-ainomiq-text-subtle">Priority</label>
                          <select
                            value={draft.priority}
                            onChange={(event) => updateDraft(project.id, (state) => ({ ...state, priority: event.target.value }))}
                            className="w-full rounded-xl border border-[#1e293b] bg-[#1e293b]/50 px-4 py-3 text-white focus:border-[#4A90F5] focus:outline-none focus:ring-1 focus:ring-[#4A90F5]"
                          >
                            {PRIORITY_OPTIONS.map((option) => (
                              <option key={option} value={option}>
                                {option}
                              </option>
                            ))}
                          </select>
                        </div>
                        <div>
                          <label className="mb-2 block text-sm text-ainomiq-text-subtle">Project folder</label>
                          <input
                            type="text"
                            value={draft.driveFolderUrl}
                            onChange={(event) => updateDraft(project.id, (state) => ({ ...state, driveFolderUrl: event.target.value }))}
                            className="w-full rounded-xl border border-[#1e293b] bg-[#1e293b]/50 px-4 py-3 text-white focus:border-[#4A90F5] focus:outline-none focus:ring-1 focus:ring-[#4A90F5]"
                          />
                        </div>
                      </div>

                      <div className="mt-6 flex flex-wrap gap-3">
                        <button
                          type="button"
                          onClick={() => void saveProject(project.id)}
                          disabled={savingId === project.id}
                          className="flex items-center gap-2 rounded-xl bg-[#4A90F5] px-5 py-3 text-sm font-medium text-white transition-colors hover:bg-[#3a7de0] disabled:opacity-50"
                        >
                          {savingId === project.id ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
                          Save
                        </button>
                        <button
                          type="button"
                          onClick={() => void publishProject(project.id)}
                          disabled={publishingId === project.id}
                          className="flex items-center gap-2 rounded-xl border border-[#1e293b] bg-[#1e293b]/40 px-5 py-3 text-sm font-medium text-white transition-colors hover:border-[#4A90F5]/40 disabled:opacity-50"
                        >
                          {publishingId === project.id ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
                          Publish to Discord
                        </button>
                        {project.adminDesignAssetsLink && (
                          <a
                            href={project.adminDesignAssetsLink}
                            target="_blank"
                            rel="noreferrer"
                            className="flex items-center gap-2 rounded-xl border border-[#1e293b] px-5 py-3 text-sm text-ainomiq-text-subtle transition-colors hover:border-[#4A90F5]/40"
                          >
                            <Folder className="h-4 w-4" /> Open assets
                          </a>
                        )}
                      </div>
                    </div>
                  )}
                </section>
              );
            })}
          </div>
        )}
      </div>
    </main>
  );
}
