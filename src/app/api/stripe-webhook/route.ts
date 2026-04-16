import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { getProject, updateProject } from "@/lib/projects";
import { postProjectToDiscord } from "@/app/api/discord/interactions/route";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2026-03-25.dahlia",
});

async function sendKlaviyoConfirmation(project: {
  email: string;
  contact: string;
  company: string;
  projectType: string;
  timeline: string;
  id: string;
}) {
  const apiKey = process.env.KLAVIYO_PRIVATE_API_KEY;
  if (!apiKey) return;

  // Trigger a Klaviyo event that can power a flow
  await fetch("https://a.klaviyo.com/api/events/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Klaviyo-API-Key ${apiKey}`,
      revision: "2024-10-15",
    },
    body: JSON.stringify({
      data: {
        type: "event",
        attributes: {
          metric: {
            data: {
              type: "metric",
              attributes: { name: "Project Payment Confirmed" },
            },
          },
          profile: {
            data: {
              type: "profile",
              attributes: {
                email: project.email,
                first_name: project.contact.split(" ")[0] || project.contact,
                last_name: project.contact.split(" ").slice(1).join(" ") || undefined,
                organization: project.company,
              },
            },
          },
          properties: {
            project_id: project.id,
            project_type: project.projectType,
            company: project.company,
            timeline: project.timeline,
            brief_url: `https://ainomiq.com/project/${project.id}`,
          },
          time: new Date().toISOString(),
        },
      },
    }),
  });
}

export async function POST(request: NextRequest) {
  const body = await request.text();
  const sig = request.headers.get("stripe-signature");
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!webhookSecret || !sig) {
    return NextResponse.json({ error: "Missing webhook secret or signature" }, { status: 400 });
  }

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(body, sig, webhookSecret);
  } catch (err) {
    console.error("Stripe webhook signature verification failed:", err);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  if (event.type !== "checkout.session.completed") {
    return NextResponse.json({ received: true });
  }

  const session = event.data.object as Stripe.Checkout.Session;
  const projectId = session.metadata?.projectId;

  if (!projectId) {
    console.error("No projectId in Stripe session metadata");
    return NextResponse.json({ error: "No projectId" }, { status: 400 });
  }

  const project = await getProject(projectId);
  if (!project) {
    console.error("Project not found:", projectId);
    return NextResponse.json({ error: "Project not found" }, { status: 404 });
  }

  // Mark as paid in DB
  await updateProject(projectId, { status: "paid" });

  // Post to #available-projects in Discord
  try {
    const msgId = await postProjectToDiscord(projectId, {
      company: project.company,
      contact: project.contact,
      email: project.email,
      projectType: project.projectType,
      budget: project.budget,
      timeline: project.timeline,
      description: project.description,
      estimateTotal: project.estimateTotal,
      estimateHours: project.estimateHours,
      driveFolderUrl: project.driveFolderUrl,
    }, "available");
    if (msgId) {
      await updateProject(projectId, { discordMessageId: msgId });
    }
  } catch (err) {
    console.error("Discord post error (non-blocking):", err);
  }

  // Send confirmation via Klaviyo event (triggers flow in Klaviyo)
  try {
    await sendKlaviyoConfirmation({
      email: project.email,
      contact: project.contact,
      company: project.company,
      projectType: project.projectType,
      timeline: project.timeline,
      id: projectId,
    });
  } catch (err) {
    console.error("Klaviyo confirmation error (non-blocking):", err);
  }

  return NextResponse.json({ received: true });
}

// Stripe needs raw body - disable Next.js body parsing
export const config = {
  api: { bodyParser: false },
};
