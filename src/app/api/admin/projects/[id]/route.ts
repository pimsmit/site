import { NextRequest, NextResponse } from "next/server";
import { isAdminRequest } from "@/lib/admin";
import { DIFFICULTY_LEVELS, PRIORITY_LEVELS } from "@/lib/project-submission";
import { getProject, updateProject } from "@/lib/projects";

function asOptionalString(value: unknown): string | null | undefined {
  if (value === undefined) return undefined;
  if (value === null) return null;
  return typeof value === "string" ? value.trim() || null : undefined;
}

export async function PATCH(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    if (!isAdminRequest(request)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await context.params;
    const existingProject = await getProject(id);
    if (!existingProject) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }

    const body = (await request.json()) as Record<string, unknown>;
    const deliverablesInput = body.adminDeliverables;
    const deliverables = Array.isArray(deliverablesInput)
      ? deliverablesInput.filter((item): item is string => typeof item === "string").map((item) => item.trim()).filter(Boolean)
      : undefined;

    const status = asOptionalString(body.status);
    const difficulty = asOptionalString(body.difficulty);
    const priority = asOptionalString(body.priority);

    if (
      difficulty &&
      !DIFFICULTY_LEVELS.includes(difficulty as (typeof DIFFICULTY_LEVELS)[number])
    ) {
      return NextResponse.json({ error: "Invalid difficulty" }, { status: 400 });
    }

    if (
      priority &&
      !PRIORITY_LEVELS.includes(priority as (typeof PRIORITY_LEVELS)[number])
    ) {
      return NextResponse.json({ error: "Invalid priority" }, { status: 400 });
    }

    const updatedProject = await updateProject(id, {
      status: status ?? undefined,
      adminTitle: asOptionalString(body.adminTitle),
      adminBrief: asOptionalString(body.adminBrief),
      adminDeliverables: deliverables,
      adminTechRequirements: asOptionalString(body.adminTechRequirements),
      adminDesignAssetsLink: asOptionalString(body.adminDesignAssetsLink),
      adminRepoLink: asOptionalString(body.adminRepoLink),
      builderFee: asOptionalString(body.builderFee),
      deadline: asOptionalString(body.deadline),
      difficulty,
      priority: priority ?? undefined,
      driveFolderUrl: asOptionalString(body.driveFolderUrl),
      assignedTo: asOptionalString(body.assignedTo),
      discordMessageId: asOptionalString(body.discordMessageId),
    });

    return NextResponse.json({ project: updatedProject });
  } catch (error) {
    console.error("Admin update project error:", error);
    return NextResponse.json({ error: "Failed to update project" }, { status: 500 });
  }
}
