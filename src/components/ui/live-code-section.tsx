"use client";

import * as React from "react";
import dynamic from "next/dynamic";
import { GlassCodeBlock } from "@/components/ui/code-block-animation";

const Player = dynamic(() => import("@remotion/player").then(m => m.Player), { ssr: false });

const SCRIPTS = [
  {
    title: "cs-bot.ts",
    label: "Customer Service",
    color: "#3b82f6",
    code: `// Ainomiq - Auto-reply incoming emails
import { classify } from "@ainomiq/cs";
import { sendReply } from "@ainomiq/email";

export async function handleTicket(email: Email) {
  const intent = await classify(email.body);

  if (intent === "order_status") {
    const order = await getOrder(email.customerId);
    await sendReply(email, {
      template: "order-status",
      data: { status: order.status },
    });
    return { resolved: true, handoff: false };
  }

  // Escalate complex queries to human
  if (intent === "refund_request") {
    await escalate(email, "support-team");
    return { resolved: false, handoff: true };
  }
}`,
  },
  {
    title: "inventory.ts",
    label: "Inventory",
    color: "#10b981",
    code: `// Ainomiq - Smart restock alerts
import { getStockLevels } from "@ainomiq/inventory";
import { notify } from "@ainomiq/alerts";

const RESTOCK_THRESHOLD = 15;

export async function checkInventory(storeId: string) {
  const products = await getStockLevels(storeId);

  const lowStock = products.filter(
    (p) => p.quantity <= RESTOCK_THRESHOLD
  );

  for (const product of lowStock) {
    await notify({
      type: "low_stock",
      product: product.title,
      quantity: product.quantity,
      channel: "slack",
    });
  }

  return { checked: products.length, alerts: lowStock.length };
}`,
  },
  {
    title: "email-flow.ts",
    label: "Email Marketing",
    color: "#8b5cf6",
    code: `// Ainomiq - Abandoned cart recovery flow
import { getAbandonedCarts } from "@ainomiq/klaviyo";
import { sendCampaign } from "@ainomiq/email";

export async function runAbandonedCartFlow() {
  const carts = await getAbandonedCarts({
    hoursAgo: 2,
    minValue: 30,
  });

  for (const cart of carts) {
    const discount = cart.value > 80 ? "10%" : "5%";

    await sendCampaign({
      to: cart.email,
      template: "abandoned-cart",
      data: {
        firstName: cart.customer.firstName,
        items: cart.items,
        discount,
      },
    });
  }

  return { sent: carts.length };
}`,
  },
  {
    title: "analytics.ts",
    label: "Performance",
    color: "#f59e0b",
    code: `// Ainomiq - Daily performance snapshot
import { getMetrics } from "@ainomiq/analytics";
import { report } from "@ainomiq/reporting";

export async function dailySnapshot(storeId: string) {
  const today = await getMetrics(storeId, {
    range: "today",
    metrics: ["revenue", "orders", "cvr", "roas"],
  });

  const yesterday = await getMetrics(storeId, {
    range: "yesterday",
    metrics: ["revenue", "orders", "cvr", "roas"],
  });

  const delta = {
    revenue: today.revenue - yesterday.revenue,
    roas: today.roas - yesterday.roas,
  };

  await report({ storeId, today, delta });
  return delta;
}`,
  },
  {
    title: "social.ts",
    label: "Social Replies",
    color: "#ec4899",
    code: `// Ainomiq - Auto-respond IG comments
import { getComments } from "@ainomiq/instagram";
import { replyComment } from "@ainomiq/social";
import { classify } from "@ainomiq/cs";

export async function handleComments(pageId: string) {
  const comments = await getComments(pageId, {
    status: "unanswered",
    limit: 50,
  });

  for (const comment of comments) {
    const intent = await classify(comment.text);

    if (intent === "question") {
      await replyComment(comment.id, {
        message: await generateReply(comment.text),
      });
    }

    if (intent === "positive") {
      await replyComment(comment.id, {
        message: "Thank you! 🙌 We're glad you love it.",
      });
    }
  }
}`,
  },
];

function Scene({ scriptIndex }: { scriptIndex?: number }) {
  const script = SCRIPTS[(scriptIndex ?? 0) % SCRIPTS.length];
  return (
    <GlassCodeBlock
      code={script.code}
      title={script.title}
      width={680}
      height={420}
      fontSize={13}
      staggerFrames={3}
    />
  );
}

export function LiveCodeSection() {
  const [activeIndex, setActiveIndex] = React.useState(0);

  // Cycle through scripts every 8 seconds
  React.useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((i) => (i + 1) % SCRIPTS.length);
    }, 8000);
    return () => clearInterval(timer);
  }, []);

  const active = SCRIPTS[activeIndex];

  return (
    <section className="py-24 md:py-32 px-6 bg-ainomiq-navy overflow-hidden">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-xs font-semibold text-blue-600 uppercase tracking-widest mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
            Live
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#0f1b2d]">
            24/7 optimizing your systems.
          </h2>
          <p className="text-ainomiq-text-subtle mt-3 max-w-lg mx-auto text-base">
            While you sleep, Ainomiq runs. Every module is always on, always learning.
          </p>
        </div>

        {/* Tab pills */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {SCRIPTS.map((s, i) => (
            <button
              key={s.title}
              onClick={() => setActiveIndex(i)}
              className="px-4 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 border"
              style={{
                background: i === activeIndex ? active.color + "22" : "transparent",
                borderColor: i === activeIndex ? active.color : "rgba(0,0,0,0.12)",
                color: i === activeIndex ? active.color : "#6b7280",
              }}
            >
              {s.label}
            </button>
          ))}
        </div>

        {/* Player */}
        <div className="flex justify-center">
          <div
            className="rounded-2xl overflow-hidden"
            style={{ width: "min(100%, 720px)", aspectRatio: "16/10", boxShadow: "0 0 80px rgba(59,130,246,0.12)" }}
          >
            <Player
              key={activeIndex}
              component={Scene}
              durationInFrames={240}
              compositionWidth={760}
              compositionHeight={475}
              fps={30}
              controls={false}
              autoPlay
              loop={false}
              clickToPlay={false}
              inputProps={{ scriptIndex: activeIndex }}
              style={{ width: "100%", height: "100%" }}
            />
          </div>
        </div>

        {/* Active script label */}
        <div className="text-center mt-6">
          <span className="text-xs text-ainomiq-text-subtle">
            Running:{" "}
            <span className="font-mono" style={{ color: active.color }}>
              {active.title}
            </span>
          </span>
        </div>
      </div>
    </section>
  );
}
