import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, company, phone, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, email, and message are required." },
        { status: 400 }
      );
    }

    // Send to Discord webhook if configured
    const webhookUrl = process.env.DISCORD_CONTACT_WEBHOOK;
    if (webhookUrl) {
      const discordBody = {
        embeds: [
          {
            title: "📬 New Contact Form Submission",
            color: 0x3b82f6,
            fields: [
              { name: "Name", value: name, inline: true },
              { name: "Email", value: email, inline: true },
              ...(company ? [{ name: "Company", value: company, inline: true }] : []),
              ...(phone ? [{ name: "Phone", value: phone, inline: true }] : []),
              { name: "Message", value: message },
            ],
            timestamp: new Date().toISOString(),
          },
        ],
      };

      await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(discordBody),
      });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Contact form error:", err);
    return NextResponse.json({ error: "Internal server error." }, { status: 500 });
  }
}
