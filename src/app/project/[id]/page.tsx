import { getProject } from "@/lib/projects";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

function formatDate(dateStr: string) {
  try {
    return new Date(dateStr).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  } catch {
    return dateStr;
  }
}

function statusBadge(status: string) {
  const colors: Record<string, string> = {
    new: "bg-blue-100 text-blue-700",
    paid: "bg-green-100 text-green-700",
    assigned: "bg-yellow-100 text-yellow-700",
    in_progress: "bg-purple-100 text-purple-700",
    delivered: "bg-emerald-100 text-emerald-700",
    reviewing: "bg-orange-100 text-orange-700",
  };
  return colors[status] || "bg-ainomiq-navy-light text-ainomiq-text-muted";
}

function formatBudget(budget: string | null, estimateTotal: number | null) {
  if (estimateTotal) return `EUR ${estimateTotal.toLocaleString()}`;
  if (budget) return budget;
  return null;
}

export default async function ProjectBriefPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ token?: string }>;
}) {
  const { id } = await params;
  const { token } = await searchParams;
  const project = await getProject(id);

  if (!project || !token || token !== project.accessToken) return notFound();

  const budget = formatBudget(project.budget, project.estimateTotal);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/30">
      <div className="max-w-3xl mx-auto px-6 py-16">
        {/* Header */}
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-sm font-mono text-ainomiq-text-subtle">{project.id}</span>
            <span
              className={`text-xs font-medium px-2.5 py-1 rounded-full uppercase tracking-wide ${statusBadge(project.status)}`}
            >
              {project.status.replace("_", " ")}
            </span>
          </div>
          <h1 className="text-3xl font-bold text-ainomiq-text mb-2">
            {project.projectType} - {project.company}
          </h1>
          <p className="text-ainomiq-text-subtle">
            Submitted {formatDate(project.createdAt)}
          </p>
        </div>

        {/* Project overview */}
        <section className="mb-10">
          <h2 className="text-lg font-semibold text-ainomiq-text mb-4 pb-2 border-b border-ainomiq-border">
            Project Overview
          </h2>
          <p className="text-ainomiq-text-muted leading-relaxed whitespace-pre-wrap">
            {project.description}
          </p>
        </section>

        {/* Details grid */}
        <section className="mb-10">
          <h2 className="text-lg font-semibold text-ainomiq-text mb-4 pb-2 border-b border-ainomiq-border">
            Details
          </h2>
          <div className="grid grid-cols-2 gap-x-8 gap-y-4">
            <Detail label="Company" value={project.company} />
            <Detail label="Contact" value={project.contact} />
            <Detail label="Email" value={project.email} />
            {project.phone && <Detail label="Phone" value={project.phone} />}
            <Detail label="Timeline" value={project.timeline} />
            {budget && <Detail label="Budget" value={budget} />}
            {project.estimateHours && (
              <Detail label="Est. Hours" value={`${project.estimateHours}h`} />
            )}
            {project.targetAudience && (
              <Detail label="Target Audience" value={project.targetAudience} />
            )}
            {project.existingUrl && (
              <Detail
                label="Existing Site"
                value={
                  <a
                    href={project.existingUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline break-all"
                  >
                    {project.existingUrl}
                  </a>
                }
              />
            )}
            {project.foundVia && (
              <Detail label="Found Via" value={project.foundVia} />
            )}
          </div>
        </section>

        {/* Tech & Design */}
        {(project.techStack.length > 0 ||
          project.features ||
          project.designPrefs ||
          project.needsCredentials) && (
          <section className="mb-10">
            <h2 className="text-lg font-semibold text-ainomiq-text mb-4 pb-2 border-b border-ainomiq-border">
              Technical & Design
            </h2>
            {project.techStack.length > 0 && (
              <div className="mb-4">
                <p className="text-sm text-ainomiq-text-subtle mb-2">Tech Stack</p>
                <div className="flex flex-wrap gap-2">
                  {project.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="text-sm bg-slate-100 text-ainomiq-text-muted px-3 py-1 rounded-full"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            )}
            {project.features && (
              <div className="mb-4">
                <p className="text-sm text-ainomiq-text-subtle mb-1">Features & Requirements</p>
                <p className="text-ainomiq-text-muted whitespace-pre-wrap">{project.features}</p>
              </div>
            )}
            {project.designPrefs && (
              <div className="mb-4">
                <p className="text-sm text-ainomiq-text-subtle mb-1">Design Preferences</p>
                <p className="text-ainomiq-text-muted whitespace-pre-wrap">{project.designPrefs}</p>
              </div>
            )}
            {project.needsCredentials && (
              <div className="mb-4">
                <p className="text-sm text-amber-600 font-medium">
                  Credentials / access will be shared separately
                </p>
              </div>
            )}
          </section>
        )}

        {/* References */}
        {project.referencesText && (
          <section className="mb-10">
            <h2 className="text-lg font-semibold text-ainomiq-text mb-4 pb-2 border-b border-ainomiq-border">
              References & Inspiration
            </h2>
            <p className="text-ainomiq-text-muted whitespace-pre-wrap">
              {project.referencesText}
            </p>
          </section>
        )}

        {/* Files */}
        {project.files.length > 0 && (
          <section className="mb-10">
            <h2 className="text-lg font-semibold text-ainomiq-text mb-4 pb-2 border-b border-ainomiq-border">
              Attached Files
            </h2>
            <ul className="space-y-2">
              {project.files.map((file, i) => (
                <li
                  key={i}
                  className="flex items-center gap-3 text-sm text-ainomiq-text-muted"
                >
                  <span className="w-8 h-8 bg-slate-100 rounded flex items-center justify-center text-xs font-mono text-ainomiq-text-subtle">
                    {file.type.split("/")[1]?.slice(0, 4).toUpperCase() || "FILE"}
                  </span>
                  <span>{file.name}</span>
                  <span className="text-ainomiq-text-subtle">
                    ({(file.size / 1024).toFixed(0)} KB)
                  </span>
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* Footer */}
        <div className="pt-8 border-t border-ainomiq-border text-center">
          <p className="text-sm text-ainomiq-text-subtle">
            Ainomiq Project Brief - Confidential
          </p>
        </div>
      </div>
    </div>
  );
}

function Detail({
  label,
  value,
}: {
  label: string;
  value: React.ReactNode;
}) {
  return (
    <div>
      <p className="text-sm text-ainomiq-text-subtle">{label}</p>
      <p className="text-ainomiq-text font-medium">{typeof value === "string" ? value : value}</p>
    </div>
  );
}
