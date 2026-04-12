"use client";

import React from "react";
import ReactFlow, { Background, Controls, Node, Edge } from "reactflow";
import "reactflow/dist/style.css";

type Signals = {
  visual?: number;
  attention?: number;
  load?: number;
};

type RawData = {
  decision: {
    ux_score: number;
  };
} | null;

type Props = {
  signals: Signals;
  raw: RawData;
  stage: string;
};

export default function GraphView({ signals, raw, stage }: Props) {

  const nodes: Node[] = [
  {
    id: "1",
    position: { x: 50, y: 100 },
    data: { label: "🧠 Stimulus" },
    style: {
      background: "#1f2937",
      color: "white",
    },
  },
  {
    id: "2",
    position: { x: 250, y: 50 },
    data: {
      label: `👁 Visual\n${signals.visual?.toFixed(2) || ""}`,
    },
    style: {
      background:
        stage === "visual" ||
        stage === "attention" ||
        stage === "load" ||
        stage === "decision"
          ? "#9333ea"
          : "#1f2937",
      color: "white",
      boxShadow:
        stage === "visual" ? "0 0 20px #9333ea" : "none",
    },
  },
  {
    id: "3",
    position: { x: 250, y: 150 },
    data: {
      label: `🎯 Attention\n${signals.attention?.toFixed(2) || ""}`,
    },
    style: {
      background:
        stage === "attention" ||
        stage === "load" ||
        stage === "decision"
          ? "#ec4899"
          : "#1f2937",
      color: "white",
      boxShadow:
        stage === "attention" ? "0 0 20px #ec4899" : "none",
    },
  },
  {
    id: "4",
    position: { x: 450, y: 100 },
    data: {
      label: `🧩 Load\n${signals.load?.toFixed(2) || ""}`,
    },
    style: {
      background:
        stage === "load" ||
        stage === "decision"
          ? "#22c55e"
          : "#1f2937",
      color: "white",
      boxShadow:
        stage === "load" ? "0 0 20px #22c55e" : "none",
    },
  },
  {
    id: "5",
    position: { x: 650, y: 100 },
    data: {
      label: raw
        ? `🧠 Decision\n${raw.decision.ux_score.toFixed(2)}`
        : "🧠 Decision",
    },
    style: {
      background:
        stage === "decision"
          ? "#facc15"
          : "#1f2937",
      color: "black",
      boxShadow:
        stage === "decision" ? "0 0 25px #facc15" : "none",
    },
  },
];

  const edges: Edge[] = [
    { id: "e1-2", source: "1", target: "2", animated: true },
    { id: "e1-3", source: "1", target: "3", animated: true },
    { id: "e2-4", source: "2", target: "4", animated: true },
    { id: "e3-4", source: "3", target: "4", animated: true },
    { id: "e4-5", source: "4", target: "5", animated: true },
  ];

  return (
    <div className="h-[200px] bg-gray-900 rounded-xl mt-10">
      <ReactFlow nodes={nodes} edges={edges} fitView>
        <Background />
        <Controls />
      </ReactFlow>
    </div>
  );
}