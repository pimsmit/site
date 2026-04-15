import { NextRequest, NextResponse } from "next/server";
import { isAdminRequest } from "@/lib/admin";
import { buildAdminPublishEmbed, buildBuilderPublishEmbed } from "@/lib/project-submission";
import { getProject, updateProject } from "@/lib/projects";

export async function POST(request: NextRequest) {
  try {
    if (!isAdminRequest(request)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = (await request.json()) as { id?: string };
    const id = body.id?.trim();

    if (!id) {
      return NextResponse.json({ error: "Project id is required" }, { status: 400 });
    }

    const project = await getProject(id);
    if (!project) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }

    if (!project.adminTitle || !project.adminBrief) {
      return NextResponse.json(
        { error: "Project title and brief are required before publishing" },
        { status: 400 }
      );
    }

    const builderWebhook = process.env.DISCORD_WEBHOOK_PROJECTS;
    const adminWebhook = process.env.DISCORD_WEBHOOK_ADMIN;

    if (!builderWebhook || !adminWebhook) {
      return NextResponse.json({ error: "Webhook configuration missing" }, { status: 500 });
    }

    const [builderResponse, adminResponse] = await Promise.all([
      fetch(builderWebhook, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(buildBuilderPublishEmbed(project)),
      }),
      fetch(adminWebhook, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(buildAdminPublishEmbed(project)),
      }),
    ]);

    if (!builderResponse.ok || !adminResponse.ok) {
      console.error("Publish webhook failure", {
        builderStatus: builderResponse.status,
        builderBody: !builderResponse.ok ? await builderResponse.text() : null,
        adminStatus: adminResponse.status,
        adminBody: !adminResponse.ok ? await adminResponse.text() : null,
        projectId: project.id,
      });

      return NextResponse.json({ error: "Failed to publish project" }, { status: 502 });
    }

    const now = new Date().toISOString();
    const updatedProject = await updateProject(id, {
      status: "published",
      publishedAt: now,
    });

    return NextResponse.json({ project: updatedProject });
  } catch (error) {
    console.error("Publish project error:", error);
    return NextResponse.json({ error: "Failed to publish project" }, { status: 500 });
  }
}
