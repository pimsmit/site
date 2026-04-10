"use client";

export function PlatformGraph() {
  const nodes = [
    // Center
    { id: "core", x: 400, y: 300, label: "Ainomiq", size: 28, color: "#4A90F5", ring: true },

    // Owner level
    { id: "owner", x: 400, y: 100, label: "Franchise Owner", size: 18, color: "#0f172a" },
    { id: "success", x: 220, y: 60, label: "Success patterns", size: 12, color: "#64748b" },
    { id: "expansion", x: 580, y: 60, label: "Expansion scoring", size: 12, color: "#64748b" },
    { id: "benchmark", x: 160, y: 140, label: "Benchmarking", size: 12, color: "#64748b" },
    { id: "growth", x: 640, y: 140, label: "Growth recs", size: 12, color: "#64748b" },

    // Manager level
    { id: "manager", x: 160, y: 300, label: "Store Manager", size: 18, color: "#3b82f6" },
    { id: "scheduling", x: 40, y: 220, label: "Scheduling", size: 12, color: "#64748b" },
    { id: "inventory", x: 40, y: 380, label: "Inventory", size: 12, color: "#64748b" },
    { id: "quality", x: 100, y: 440, label: "Quality control", size: 12, color: "#64748b" },
    { id: "dashboard", x: 80, y: 160, label: "Dashboards", size: 12, color: "#64748b" },

    // Employee level
    { id: "employee", x: 640, y: 300, label: "Employee", size: 18, color: "#7dd3fc" },
    { id: "assistant", x: 760, y: 220, label: "Smart assistant", size: 12, color: "#64748b" },
    { id: "onboarding", x: 760, y: 380, label: "Onboarding", size: 12, color: "#64748b" },
    { id: "procedures", x: 720, y: 440, label: "Procedures", size: 12, color: "#64748b" },
    { id: "tasks", x: 720, y: 160, label: "Tasks & shifts", size: 12, color: "#64748b" },
  ];

  const edges = [
    // Core connections
    ["core", "owner"], ["core", "manager"], ["core", "employee"],
    // Owner sub-nodes
    ["owner", "success"], ["owner", "expansion"], ["owner", "benchmark"], ["owner", "growth"],
    // Manager sub-nodes
    ["manager", "scheduling"], ["manager", "inventory"], ["manager", "quality"], ["manager", "dashboard"],
    // Employee sub-nodes
    ["employee", "assistant"], ["employee", "onboarding"], ["employee", "procedures"], ["employee", "tasks"],
    // Cross connections (data flow)
    ["manager", "owner"], ["employee", "manager"],
    ["inventory", "growth"], ["quality", "benchmark"],
    ["assistant", "onboarding"], ["scheduling", "dashboard"],
  ];

  const nodeMap = Object.fromEntries(nodes.map((n) => [n.id, n]));

  return (
    <div className="w-full overflow-hidden">
      <svg viewBox="0 0 800 520" className="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <radialGradient id="glow">
            <stop offset="0%" stopColor="#4A90F5" stopOpacity="0.15" />
            <stop offset="100%" stopColor="#4A90F5" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Background glow */}
        <circle cx="400" cy="300" r="250" fill="url(#glow)" />

        {/* Edges */}
        {edges.map(([from, to], i) => {
          const a = nodeMap[from];
          const b = nodeMap[to];
          const isCross = (from === "inventory" || from === "quality" || from === "assistant" || from === "scheduling");
          return (
            <line
              key={i}
              x1={a.x}
              y1={a.y}
              x2={b.x}
              y2={b.y}
              stroke={isCross ? "#4A90F5" : "#e2e8f0"}
              strokeWidth={isCross ? 0.5 : 1}
              strokeDasharray={isCross ? "4 4" : "none"}
              opacity={isCross ? 0.3 : 0.6}
            />
          );
        })}

        {/* Nodes */}
        {nodes.map((node) => (
          <g key={node.id}>
            {node.ring && (
              <circle cx={node.x} cy={node.y} r={node.size + 8} fill="none" stroke="#4A90F5" strokeWidth="1" opacity="0.2">
                <animate attributeName="r" values={`${node.size + 6};${node.size + 14};${node.size + 6}`} dur="3s" repeatCount="indefinite" />
                <animate attributeName="opacity" values="0.3;0.1;0.3" dur="3s" repeatCount="indefinite" />
              </circle>
            )}
            <circle cx={node.x} cy={node.y} r={node.size} fill={node.color} opacity={node.size > 14 ? 1 : 0.8} />
            <text
              x={node.x}
              y={node.y + node.size + 16}
              textAnchor="middle"
              fontSize={node.size > 14 ? 13 : 11}
              fontWeight={node.size > 14 ? 600 : 400}
              fill={node.size > 14 ? "#0f172a" : "#64748b"}
              fontFamily="system-ui, sans-serif"
            >
              {node.label}
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
}
