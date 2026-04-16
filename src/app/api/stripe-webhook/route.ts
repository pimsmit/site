import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { getProject, updateProject } from "@/lib/projects";
import { postProjectToDiscord } from "@/app/api/discord/interactions/route";
import { Resend } from "resend";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2026-03-25.dahlia",
});

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

  // Send confirmation email via Resend
  const resendKey = process.env.RESEND_API_KEY;
  if (resendKey) {
    try {
      const resend = new Resend(resendKey);
      await resend.emails.send({
        from: "Ainomiq <info@ainomiq.com>",
        to: project.email,
        subject: "We received your project request",
        html: `
          <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; max-width: 600px; margin: 0 auto; padding: 40px 20px; color: #111;">
            <img src="https://ainomiq.com/logos/ainomiq-wordmark.png" alt="Ainomiq" style="height: 32px; margin-bottom: 32px;" />
            <h1 style="font-size: 24px; font-weight: 700; margin: 0 0 16px;">Payment confirmed. We're on it.</h1>
            <p style="font-size: 16px; color: #444; line-height: 1.6; margin: 0 0 24px;">
              Hi ${project.contact.split(" ")[0]},<br/><br/>
              We've received your project request and your payment has been processed successfully.
              Our team will review your brief and reach out within 24 hours to get things moving.
            </p>
            <div style="background: #f5f5f5; border-radius: 12px; padding: 20px; margin: 0 0 24px;">
              <p style="margin: 0 0 8px; font-size: 14px; color: #666;">Project details</p>
              <p style="margin: 0 0 4px; font-size: 15px;"><strong>Type:</strong> ${project.projectType}</p>
              <p style="margin: 0 0 4px; font-size: 15px;"><strong>Company:</strong> ${project.company}</p>
              <p style="margin: 0; font-size: 15px;"><strong>Timeline:</strong> ${project.timeline}</p>
            </div>
            <p style="font-size: 14px; color: #888; line-height: 1.6;">
              Questions? Reply to this email or reach us at <a href="mailto:info@ainomiq.com" style="color: #3b82f6;">info@ainomiq.com</a>
            </p>
            <hr style="border: none; border-top: 1px solid #eee; margin: 32px 0;" />
            <p style="font-size: 12px; color: #aaa;">Ainomiq &mdash; Build. Ship. Grow.</p>
          </div>
        `,
      });
    } catch (err) {
      console.error("Resend email error (non-blocking):", err);
    }
  }

  return NextResponse.json({ received: true });
}

// Stripe needs raw body — disable Next.js body parsing
export const config = {
  api: { bodyParser: false },
};
