import { NextRequest, NextResponse } from "next/server";

interface ProjectForm {
  company: string;
  contact: string;
  email: string;
  phone?: string;
  projectType: string;
  description: string;
  timeline: string;
  budget: string;
  references?: string;
  foundVia?: string;
  estimateTotal?: number;
  estimateHours?: number;
  _hp?: string; // honeypot
}

export async function POST(req: NextRequest) {
  try {
    const body: ProjectForm = await req.json();

    // Honeypot check
    if (body._hp) {
      return NextResponse.json({ success: true }); // silent fail
    }

    // Validation
    const errors: string[] = [];
    if (!body.company?.trim()) errors.push("Company name is required");
    if (!body.contact?.trim()) errors.push("Contact name is required");
    if (!body.email?.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(body.email))
      errors.push("Valid email is required");
    if (!body.projectType?.trim()) errors.push("Project type is required");
    if (!body.description?.trim() || body.description.trim().length < 3)
      errors.push("Description is required");
    if (!body.timeline?.trim()) errors.push("Timeline is required");
    if (!body.budget?.trim()) errors.push("Budget range is required");

    if (errors.length > 0) {
      return NextResponse.json({ success: false, errors }, { status: 400 });
    }

    const webhookUrl = process.env.DISCORD_WEBHOOK_URL;
    if (!webhookUrl) {
      console.error("DISCORD_WEBHOOK_URL not configured");
      return NextResponse.json(
        { success: false, errors: ["Server configuration error"] },
        { status: 500 }
      );
    }

    const payload = {
      username: "Ainomiq Projects",
      embeds: [
        {
          title: "🆕 New Project Request",
          color: 4886773,
          fields: [
            { name: "🏢 Company", value: body.company.trim(), inline: true },
            { name: "👤 Contact", value: body.contact.trim(), inline: true },
            { name: "📧 Email", value: body.email.trim(), inline: true },
            {
              name: "📱 Phone",
              value: body.phone?.trim() || "N/A",
              inline: true,
            },
            {
              name: "📋 Type",
              value: body.projectType.trim(),
              inline: true,
            },
            {
              name: "⏰ Timeline",
              value: body.timeline.trim(),
              inline: true,
            },
            { name: "💰 Budget", value: body.budget.trim(), inline: true },
            {
              name: "🤖 Estimate",
              value: body.estimateTotal
                ? `€${body.estimateTotal} (~${body.estimateHours}h)`
                : "N/A",
              inline: true,
            },
            {
              name: "🔍 Found via",
              value: body.foundVia?.trim() || "N/A",
              inline: true,
            },
            {
              name: "📝 Description",
              value: body.description.trim().slice(0, 1024),
              inline: false,
            },
            {
              name: "🔗 References",
              value: body.references?.trim() || "N/A",
              inline: false,
            },
          ],
          footer: { text: "Ainomiq Get Started Form" },
          timestamp: new Date().toISOString(),
        },
      ],
    };

    const res = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      console.error("Discord webhook failed:", res.status, await res.text());
      return NextResponse.json(
        { success: false, errors: ["Failed to submit. Please try again."] },
        { status: 502 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Submit project error:", err);
    return NextResponse.json(
      { success: false, errors: ["Unexpected error"] },
      { status: 500 }
    );
  }
}
