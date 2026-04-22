"use client";

import * as React from "react";

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

  if (intent === "refund_request") {
    await escalate(email, "support-team");
    return { resolved: false, handoff: true };
  }
}`,
  },
  {
    title: "inventory.ts",
    label: "Smart Inventory",
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
    label: "E-mail Marketing",
    color: "#8b5cf6",
    code: `// Ainomiq - Abandoned cart recovery
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
        message: "Thank you! We're glad you love it.",
      });
    }
  }
}`,
  },
];

function CodeDisplay({ code, color, title }: { code: string; color: string; title: string }) {
  const [displayed, setDisplayed] = React.useState("");
  const [done, setDone] = React.useState(false);

  React.useEffect(() => {
    setDisplayed("");
    setDone(false);
    let i = 0;
    const speed = 8; // ms per char
    const timer = setInterval(() => {
      i++;
      setDisplayed(code.slice(0, i));
      if (i >= code.length) {
        clearInterval(timer);
        setDone(true);
      }
    }, speed);
    return () => clearInterval(timer);
  }, [code]);

  // Syntax highlight: keywords, strings, comments
  const highlight = (text: string) => {
    const lines = text.split("\n");
    return lines.map((line, li) => {
      // Comment line
      if (line.trim().startsWith("//")) {
        return <span key={li} style={{ color: "#6b7280" }}>{line}{"\n"}</span>;
      }
      // Keyword coloring inline
      const parts = line.split(/(\bimport\b|\bfrom\b|\bexport\b|\basync\b|\bfunction\b|\bconst\b|\blet\b|\bfor\b|\bof\b|\bif\b|\breturn\b|\bawait\b|"[^"]*"|'[^']*'|`[^`]*`)/);
      return (
        <span key={li}>
          {parts.map((p, pi) => {
            if (["import","from","export","async","function","const","let","for","of","if","return","await"].includes(p))
              return <span key={pi} style={{ color: "#93c5fd" }}>{p}</span>;
            if (p.startsWith('"') || p.startsWith("'") || p.startsWith("`"))
              return <span key={pi} style={{ color: "#86efac" }}>{p}</span>;
            return <span key={pi}>{p}</span>;
          })}
          {"\n"}
        </span>
      );
    });
  };

  return (
    <div
      className="rounded-2xl overflow-hidden w-full"
      style={{ background: "#0d1117", boxShadow: `0 0 60px ${color}22` }}
    >
      {/* Title bar */}
      <div className="flex items-center gap-2 px-4 py-3 border-b border-white/10">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-red-400/70" />
          <div className="w-3 h-3 rounded-full bg-yellow-400/70" />
          <div className="w-3 h-3 rounded-full bg-green-400/70" />
        </div>
        <span className="text-xs text-white/40 ml-2 font-mono">{title}</span>
        <div className="ml-auto flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: color }} />
          <span className="text-xs font-mono" style={{ color }}>running</span>
        </div>
      </div>
      {/* Code */}
      <div className="p-5 overflow-x-auto" style={{ minHeight: 320 }}>
        <pre className="text-[13px] font-mono leading-relaxed text-white/80 whitespace-pre">
          {highlight(displayed)}
          {!done && <span className="inline-block w-2 h-4 bg-white/70 animate-pulse align-middle ml-0.5" />}
        </pre>
      </div>
    </div>
  );
}

export function LiveCodeSection() {
  const [activeIndex, setActiveIndex] = React.useState(0);

  // Cycle through scripts every 12 seconds
  React.useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((i) => (i + 1) % SCRIPTS.length);
    }, 12000);
    return () => clearInterval(timer);
  }, []);

  const active = SCRIPTS[activeIndex];

  return (
    <section className="py-24 md:py-32 px-6 bg-ainomiq-navy overflow-hidden">
      <div className="mx-auto max-w-4xl">
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

        {/* Code display */}
        <CodeDisplay
          key={activeIndex}
          code={active.code}
          color={active.color}
          title={active.title}
        />
      </div>
    </section>
  );
}


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
    label: "Smart Inventory",
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
    label: "E-mail Marketing",
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
