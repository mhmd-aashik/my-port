"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Activity, Database, HardDrive, Layers, Server, Shield, Cpu, Zap } from "lucide-react";

export function SystemDiagram() {
  const [activeNode, setActiveNode] = useState<string | null>(null);

  // Nodes definition
  const nodes = {
    client: { label: "client", subLabel: "Web / Mobile Client", icon: Layers, type: "standard" },
    apiGateway: { label: "api gateway", subLabel: "Reverse Proxy & Rate Limiter", icon: Cpu, type: "highlight" },
    auth: { label: "auth", subLabel: "OAuth2 & JWT Service", icon: Shield, type: "standard" },
    svcBooking: { label: "svc·booking", subLabel: "Booking Microservice", icon: Server, type: "standard" },
    rabbitmq: { label: "rabbitmq", subLabel: "AMQP Event Message Bus", icon: Zap, type: "highlight" },
    svcReporting: { label: "svc·reporting", subLabel: "Analytics & Reporting", icon: Server, type: "standard" },
    postgres: { label: "postgres", subLabel: "Relational Database", icon: Database, type: "storage" },
    redis: { label: "redis", subLabel: "In-Memory Cache", icon: Activity, type: "storage" },
    s3: { label: "s3", subLabel: "Object & Asset Storage", icon: HardDrive, type: "storage" },
  };

  // SVG Connection paths in percentage coordinates (0 to 100)
  const connections = [
    { id: "client-gw", from: "client", to: "apiGateway", path: "M 16.6 18 L 50 18", delay: "0s", dur: "2.2s" },
    { id: "gw-auth", from: "apiGateway", to: "auth", path: "M 50 18 L 83.3 18", delay: "0.4s", dur: "2.2s" },
    { id: "gw-mq", from: "apiGateway", to: "rabbitmq", path: "M 50 18 L 50 50", delay: "0.2s", dur: "2.0s" },
    { id: "book-mq", from: "svcBooking", to: "rabbitmq", path: "M 16.6 50 L 50 50", delay: "0.6s", dur: "2.2s" },
    { id: "mq-rep", from: "rabbitmq", to: "svcReporting", path: "M 50 50 L 83.3 50", delay: "0.8s", dur: "2.2s" },
    { id: "mq-pg", from: "rabbitmq", to: "postgres", path: "M 50 50 L 50 67 L 37.5 67 L 37.5 82", delay: "1.0s", dur: "2.5s" },
    { id: "mq-redis", from: "rabbitmq", to: "redis", path: "M 50 50 L 50 82", delay: "1.2s", dur: "2.3s" },
    { id: "mq-s3", from: "rabbitmq", to: "s3", path: "M 50 50 L 50 67 L 62.5 67 L 62.5 82", delay: "1.4s", dur: "2.5s" },
  ];

  return (
    <div className="relative w-full max-w-[640px] overflow-hidden rounded-2xl border border-border/80 bg-surface/80 p-5 sm:p-6 shadow-2xl backdrop-blur-xl transition-all duration-300">
      {/* Background Dot Grid */}
      <div className="absolute inset-0 bg-grid opacity-40 pointer-events-none" />

      {/* Header bar */}
      <div className="relative z-20 mb-6 flex items-center justify-between border-b border-border/60 pb-3">
        <div className="flex items-center gap-2">
          <span className="relative flex size-2.5">
            <span className="absolute inline-flex size-full animate-ping rounded-full bg-accent opacity-75" />
            <span className="relative inline-flex size-2.5 rounded-full bg-accent" />
          </span>
          <span className="font-mono text-xs font-semibold tracking-wider text-foreground/90 uppercase">
            SYSTEM ARCHITECTURE FLOW
          </span>
        </div>
      </div>

      {/* Diagram Canvas */}
      <div className="relative min-h-[340px] w-full select-none flex flex-col justify-between py-2">
        {/* SVG Edges Overlay */}
        <svg
          className="absolute inset-0 size-full pointer-events-none z-0"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          <defs>
            <filter id="glow-pulse" x="-30%" y="-30%" width="160%" height="160%">
              <feGaussianBlur stdDeviation="1" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {connections.map((conn) => {
            const isHighlighted =
              activeNode === conn.from || activeNode === conn.to;

            return (
              <g key={conn.id}>
                {/* Solid Background Path */}
                <path
                  d={conn.path}
                  fill="none"
                  stroke={isHighlighted ? "var(--accent)" : "var(--border-strong)"}
                  strokeWidth={isHighlighted ? "0.8" : "0.5"}
                  strokeLinecap="round"
                  className="transition-colors duration-300 opacity-70"
                />

                {/* React Flow Animated Dashed Line */}
                <path
                  d={conn.path}
                  fill="none"
                  stroke="var(--accent)"
                  strokeWidth={isHighlighted ? "1" : "0.6"}
                  strokeDasharray="1.2 1.8"
                  className="animate-flow opacity-90"
                  strokeLinecap="round"
                />

                {/* Moving Data Packet Pulse */}
                <circle r={isHighlighted ? "1.2" : "0.9"} fill="var(--accent)" filter="url(#glow-pulse)">
                  <animateMotion
                    path={conn.path}
                    dur={conn.dur}
                    repeatCount="indefinite"
                    begin={conn.delay}
                  />
                </circle>
              </g>
            );
          })}
        </svg>

        {/* ROW 1: client | api gateway | auth */}
        <div className="grid grid-cols-3 w-full items-center text-center z-10 my-2">
          <div className="flex justify-center">
            <NodeItem
              id="client"
              data={nodes.client}
              activeNode={activeNode}
              setActiveNode={setActiveNode}
              handles={["right"]}
            />
          </div>
          <div className="flex justify-center">
            <NodeItem
              id="apiGateway"
              data={nodes.apiGateway}
              activeNode={activeNode}
              setActiveNode={setActiveNode}
              handles={["left", "right", "bottom"]}
            />
          </div>
          <div className="flex justify-center">
            <NodeItem
              id="auth"
              data={nodes.auth}
              activeNode={activeNode}
              setActiveNode={setActiveNode}
              handles={["left"]}
            />
          </div>
        </div>

        {/* ROW 2: svc·booking | rabbitmq | svc·reporting */}
        <div className="grid grid-cols-3 w-full items-center text-center z-10 my-2">
          <div className="flex justify-center">
            <NodeItem
              id="svcBooking"
              data={nodes.svcBooking}
              activeNode={activeNode}
              setActiveNode={setActiveNode}
              handles={["right"]}
            />
          </div>
          <div className="flex justify-center">
            <NodeItem
              id="rabbitmq"
              data={nodes.rabbitmq}
              activeNode={activeNode}
              setActiveNode={setActiveNode}
              handles={["left", "right", "top", "bottom"]}
            />
          </div>
          <div className="flex justify-center">
            <NodeItem
              id="svcReporting"
              data={nodes.svcReporting}
              activeNode={activeNode}
              setActiveNode={setActiveNode}
              handles={["left"]}
            />
          </div>
        </div>

        {/* ROW 3: Storage Cluster (postgres, redis, s3) */}
        <div className="grid grid-cols-3 w-full items-center text-center z-10 my-2">
          <div />
          <div className="flex justify-center items-center gap-2 sm:gap-3">
            <NodeItem
              id="postgres"
              data={nodes.postgres}
              activeNode={activeNode}
              setActiveNode={setActiveNode}
              handles={["top"]}
              compact
            />
            <NodeItem
              id="redis"
              data={nodes.redis}
              activeNode={activeNode}
              setActiveNode={setActiveNode}
              handles={["top"]}
              compact
            />
            <NodeItem
              id="s3"
              data={nodes.s3}
              activeNode={activeNode}
              setActiveNode={setActiveNode}
              handles={["top"]}
              compact
            />
          </div>
          <div />
        </div>
      </div>

      {/* Footer controls bar */}
      <div className="relative z-20 mt-4 flex items-center justify-between border-t border-border/50 pt-3 font-mono text-[10px] text-subtle">
        <div className="flex items-center gap-1.5">
          <span className="size-1.5 rounded-full bg-accent animate-pulse" />
          <span>Active Nodes</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="rounded border border-border/70 bg-surface/50 px-2 py-0.5">
            Zoom 100%
          </span>
          <span className="rounded border border-border/70 bg-surface/50 px-2 py-0.5">
            Controls On
          </span>
        </div>
      </div>
    </div>
  );
}

// Single Node Component
function NodeItem({
  id,
  data,
  activeNode,
  setActiveNode,
  handles,
  compact = false,
}: {
  id: string;
  data: {
    label: string;
    subLabel: string;
    icon: React.ComponentType<{ className?: string }>;
    type: string;
  };
  activeNode: string | null;
  setActiveNode: (id: string | null) => void;
  handles: ("left" | "right" | "top" | "bottom")[];
  compact?: boolean;
}) {
  const isSelected = activeNode === id;
  const isHighlight = data.type === "highlight";
  const Icon = data.icon;

  return (
    <motion.div
      initial={{ scale: 0.95, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.2 }}
      onMouseEnter={() => setActiveNode(id)}
      onMouseLeave={() => setActiveNode(null)}
      className={`relative group cursor-pointer rounded-lg border transition-all duration-300 flex items-center gap-2 ${
        compact ? "px-2.5 py-1 text-xs" : "px-3.5 py-2 text-xs sm:text-sm"
      } ${
        isHighlight
          ? "border-accent/70 bg-accent-soft text-accent shadow-[0_0_18px_rgba(34,211,238,0.25)] hover:border-accent hover:shadow-[0_0_24px_rgba(34,211,238,0.4)]"
          : isSelected
          ? "border-accent/80 bg-surface-raised text-foreground shadow-[0_0_14px_rgba(34,211,238,0.2)]"
          : "border-border/80 bg-surface/95 text-foreground/90 shadow-sm hover:border-accent/60 hover:text-foreground"
      }`}
    >
      {/* Connector Handles */}
      {handles.includes("left") && (
        <span className="absolute -left-1.5 top-1/2 -translate-y-1/2 size-2 rounded-full border border-border/80 bg-background group-hover:border-accent group-hover:bg-accent transition-all z-20" />
      )}
      {handles.includes("right") && (
        <span className="absolute -right-1.5 top-1/2 -translate-y-1/2 size-2 rounded-full border border-border/80 bg-background group-hover:border-accent group-hover:bg-accent transition-all z-20" />
      )}
      {handles.includes("top") && (
        <span className="absolute left-1/2 -top-1.5 -translate-x-1/2 size-2 rounded-full border border-border/80 bg-background group-hover:border-accent group-hover:bg-accent transition-all z-20" />
      )}
      {handles.includes("bottom") && (
        <span className="absolute left-1/2 -bottom-1.5 -translate-x-1/2 size-2 rounded-full border border-border/80 bg-background group-hover:border-accent group-hover:bg-accent transition-all z-20" />
      )}

      {/* Icon & Label */}
      <Icon className={`size-3.5 ${isHighlight ? "text-accent" : "text-subtle group-hover:text-foreground"}`} />
      <span className="font-mono tracking-tight font-medium whitespace-nowrap">
        {data.label}
      </span>

      {/* Hover Tooltip */}
      {isSelected && (
        <motion.div
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2.5 w-max max-w-[180px] rounded-md border border-border/80 bg-surface-raised px-2.5 py-1 font-mono text-[10px] text-foreground shadow-2xl pointer-events-none z-40"
        >
          <span className="text-accent font-semibold block">{data.label}</span>
          <span className="text-subtle">{data.subLabel}</span>
        </motion.div>
      )}
    </motion.div>
  );
}
