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
};

export default function GraphView({ signals, raw }: Props) {

  const nodes: Node[] = [
    {
      id: "1",
      position: { x: 50, y: 100 },
      data: { label: "🧠 Stimulus" },
    },
    {
      id: "2",
      position: { x: 250, y: 50 },
      data: {
        label: `👁 Visual\n${signals.visual?.toFixed(2) || ""}`,
      },
    },
    {
      id: "3",
      position: { x: 250, y: 150 },
      data: {
        label: `🎯 Attention\n${signals.attention?.toFixed(2) || ""}`,
      },
    },
    {
      id: "4",
      position: { x: 450, y: 100 },
      data: {
        label: `🧩 Load\n${signals.load?.toFixed(2) || ""}`,
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
    <div className="h-[400px] bg-gray-900 rounded-xl mt-10">
      <ReactFlow nodes={nodes} edges={edges} fitView>
        <Background />
        <Controls />
      </ReactFlow>
    </div>
  );
}