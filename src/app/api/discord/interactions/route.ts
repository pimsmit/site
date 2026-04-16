import { NextRequest, NextResponse } from "next/server";
import { getProject, updateProject } from "@/lib/projects";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const PUBLIC_KEY = process.env.DISCORD_PUBLIC_KEY ?? "";

async function verifyDiscordRequest(request: NextRequest, rawBody: string): Promise<boolean> {
  if (!PUBLIC_KEY) { console.error("DISCORD_PUBLIC_KEY not set"); return false; }
  const signature = request.headers.get("x-signature-ed25519");
  const timestamp = request.headers.get("x-signature-timestamp");
  if (!signature || !timestamp) return false;
  try {
    const key = await crypto.subtle.importKey(
      "raw",
      hexToUint8Array(PUBLIC_KEY),
      { name: "Ed25519" },
      false,
      ["verify"]
    );
    const message = new TextEncoder().encode(timestamp + rawBody);
    return await crypto.subtle.verify("Ed25519", key, hexToUint8Array(signature), message);
  } catch {
    return false;
  }
}

function hexToUint8Array(hex: string): Uint8Array<ArrayBuffer> {
  const buf = new ArrayBuffer(hex.length / 2);
  const arr = new Uint8Array(buf);
  for (let i = 0; i < hex.length; i += 2) {
    arr[i / 2] = parseInt(hex.slice(i, i + 2), 16);
  }
  return arr;
}

const BOT_TOKEN = process.env.DISCORD_BOT_TOKEN;
const GUILD_ID = "1493968257860767926";

const CHANNELS: Record<string, string> = {
  available: "1493970777538560132",
  ongoing: "1494342124412342402",
  review: "1494342125590941867",
  finished: "1494342127206006784",
};

const STATUS_COLORS: Record<string, number> = {
  available: 0x3498db,
  ongoing: 0xf39c12,
  review: 0x9b59b6,
  finished: 0x2ecc71,
};

const STATUS_LABELS: Record<string, string> = {
  available: "🟡 AVAILABLE",
  ongoing: "🔵 ACTIVE",
  review: "🟠 REVIEW",
  finished: "✅ FINISHED",
};

async function discordApi(method: string, path: string, body?: unknown) {
  const res = await fetch(`https://discord.com/api/v10${path}`, {
    method,
    headers: {
      Authorization: `Bot ${BOT_TOKEN}`,
      "Content-Type": "application/json",
    },
    body: body ? JSON.stringify(body) : undefined,
  });
  if (res.status === 204) return {};
  return res.json();
}

function buildEmbed(projectId: string, data: Record<string, unknown>, status: string) {
  const color = STATUS_COLORS[status] ?? 0x95a5a6;
  const label = STATUS_LABELS[status] ?? status.toUpperCase();

  const fields = [
    { name: "Bedrijf", value: String(data.company || "?"), inline: true },
    { name: "Contact", value: String(data.contact || "?"), inline: true },
    { name: "Type", value: String(data.projectType || "?"), inline: true },
    { name: "Budget", value: String(data.budget || "Niet opgegeven"), inline: true },
    { name: "Timeline", value: String(data.timeline || "?"), inline: true },
    {
      name: "Estimate",
      value: data.estimateTotal
        ? `€${Number(data.estimateTotal).toLocaleString("nl-NL")} (~${data.estimateHours}u)`
        : "?",
      inline: true,
    },
    {
      name: "Beschrijving",
      value: String(data.description || "?").slice(0, 500),
      inline: false,
    },
  ];

  if (data.driveFolderUrl) {
    fields.push({ name: "Brief & Assets", value: `[Open Drive folder](${data.driveFolderUrl})`, inline: false });
  }

  if (data.assignedTo) {
    fields.push({ name: "Toegewezen aan", value: String(data.assignedTo), inline: true });
  }

  return {
    title: `${label} | ${projectId}`,
    color,
    fields,
    footer: { text: `Ainomiq Projects - ${data.email || ""}` },
  };
}

function buildComponents(status: string) {
  if (status === "available") {
    return [{ type: 1, components: [{ type: 2, style: 3, label: "Claim opdracht", custom_id: "claim", emoji: { name: "🔵" } }] }];
  }
  if (status === "ongoing") {
    return [{ type: 1, components: [{ type: 2, style: 1, label: "Mark Done", custom_id: "done", emoji: { name: "🟠" } }] }];
  }
  if (status === "review") {
    return [
      {
        type: 1,
        components: [
          { type: 2, style: 3, label: "Goedkeuren", custom_id: "approve", emoji: { name: "✅" } },
          { type: 2, style: 4, label: "Terugsturen", custom_id: "reject", emoji: { name: "🔄" } },
        ],
      },
    ];
  }
  return [];
}

export async function postProjectToDiscord(
  projectId: string,
  data: Record<string, unknown>,
  status = "available"
): Promise<string | null> {
  const channelId = CHANNELS[status];
  if (!channelId || !BOT_TOKEN) return null;

  const result = await discordApi("POST", `/channels/${channelId}/messages`, {
    embeds: [buildEmbed(projectId, data, status)],
    components: buildComponents(status),
  });

  return result.id ?? null;
}

async function moveProject(
  projectId: string,
  oldMessageId: string,
  oldChannelId: string,
  newStatus: string,
  claimedBy?: string
) {
  // Delete old message
  await discordApi("DELETE", `/channels/${oldChannelId}/messages/${oldMessageId}`);

  // Get project from DB
  const project = await getProject(projectId);
  if (!project) return;

  const data: Record<string, unknown> = { ...project };
  if (claimedBy) data.assignedTo = claimedBy;

  // Update DB status
  const dbStatus =
    newStatus === "available" ? "new" :
    newStatus === "ongoing" ? "in_progress" :
    newStatus === "review" ? "reviewing" :
    newStatus === "finished" ? "delivered" : newStatus;

  await updateProject(projectId, { status: dbStatus, assignedTo: claimedBy ?? project.assignedTo ?? undefined });

  // Post to new channel
  const newMsgId = await postProjectToDiscord(projectId, data, newStatus);

  // Update discord message ID in DB
  if (newMsgId) {
    await updateProject(projectId, { discordMessageId: newMsgId });
  }
}

export async function POST(request: NextRequest) {
  const rawBody = await request.text();
  const isValid = await verifyDiscordRequest(request, rawBody);
  if (!isValid) {
    return new NextResponse("Invalid signature", { status: 401 });
  }
  const body = JSON.parse(rawBody);

  // Discord ping verification
  if (body.type === 1) {
    return NextResponse.json({ type: 1 });
  }

  // Component interaction
  if (body.type === 3) {
    const customId: string = body.data?.custom_id;
    const user = body.member?.user ?? body.user;
    const username = user?.username ?? "Unknown";
    const messageId: string = body.message?.id;
    const channelId: string = body.channel_id;

    // Extract project ID from embed title
    const embeds = body.message?.embeds ?? [];
    const title: string = embeds[0]?.title ?? "";
    const match = title.match(/PRJ-\d+/);
    const projectId = match?.[0];

    if (!projectId) {
      return NextResponse.json({
        type: 4,
        data: { content: "Project ID niet gevonden.", flags: 64 },
      });
    }

    if (customId === "claim") {
      await discordApi("POST", `/interactions/${body.id}/${body.token}/callback`, {
        type: 4,
        data: { content: `✅ ${username} heeft de opdracht geclaimd!`, flags: 64 },
      });
      await moveProject(projectId, messageId, channelId, "ongoing", username);
    } else if (customId === "done") {
      await discordApi("POST", `/interactions/${body.id}/${body.token}/callback`, {
        type: 4,
        data: { content: `🟠 ${username} heeft de opdracht afgerond - wacht op review.`, flags: 64 },
      });
      await moveProject(projectId, messageId, channelId, "review");
    } else if (customId === "approve") {
      await discordApi("POST", `/interactions/${body.id}/${body.token}/callback`, {
        type: 4,
        data: { content: `✅ Goedgekeurd door ${username}!`, flags: 64 },
      });
      await moveProject(projectId, messageId, channelId, "finished");
    } else if (customId === "reject") {
      await discordApi("POST", `/interactions/${body.id}/${body.token}/callback`, {
        type: 4,
        data: { content: `🔄 Teruggestuurd naar ongoing door ${username}.`, flags: 64 },
      });
      await moveProject(projectId, messageId, channelId, "ongoing");
    }

    return NextResponse.json({});
  }

  return NextResponse.json({});
}
