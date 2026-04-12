"use client";

import { useState } from "react";
import { useBrain } from "./hooks/useBrain";
import { useEffect } from "react";
import GraphView from "./components/GraphView";
import BrainView from "./components/BrainView";

import StimulusNode from "./components/neurons/StimulusNode";
import VisualNode from "./components/neurons/VisualNode";
import AttentionNode from "./components/neurons/AttentionNode";
import LoadNode from "./components/neurons/LoadNode";
import DecisionNode from "./components/neurons/DecisionNode";



type NeuroData = {
  signals: {
    visual: number;
    attention: number;
    load: number;
  };
  decision: {
    ux_score: number;
    suggestions: string[];
  };
  heatmap: string;
};

export default function Home() {
  const { signals, fireSignal } = useBrain();
  const [raw, setRaw] = useState<NeuroData | null>(null);
  const [stage, setStage] = useState<"idle" | "visual" | "attention" | "load" | "decision">("idle");

  useEffect(() => {
  if (raw) {
    setStage("idle"); // reset first

    setTimeout(() => setStage("visual"), 100);
    setTimeout(() => setStage("attention"), 600);
    setTimeout(() => setStage("load"), 1100);
    setTimeout(() => setStage("decision"), 1600);
  }
}, [raw]);

useEffect(() => {
  if (raw) {
    window.scrollTo({
      top: 200,
      behavior: "smooth",
    });
  }
}, [raw]);

  return (
    <div className="min-h-screen bg-black text-white p-10">

      <h1 className="text-4xl mb-6">🧠 NeuroUX Brain</h1>

      <StimulusNode fireSignal={fireSignal} setRaw={setRaw} />
      {stage !== "idle" && (
  <p className="text-center mt-4 text-purple-300 text-lg">
    {stage === "visual" && "🧠 Activating visual cortex..."}
    {stage === "attention" && "🎯 Focusing attention..."}
    {stage === "load" && "🧩 Evaluating cognitive load..."}
    {stage === "decision" && "🧠 Finalizing decision..."}
  </p>
)}

<div className="space-y-1">
  <GraphView signals={signals} raw={raw} stage={stage} />
  <BrainView signals={signals} raw={raw} stage={stage} />
</div>

{raw && (
  <div className="mt-10 flex flex-col items-center">
    <h2 className="text-lg bold mb-2">Visual Attention Heatmap</h2>
    <img
      src={`data:image/png;base64,${raw.heatmap}`}
      className="rounded-xl border border-gray-700"
    />
  </div>
)}
    </div>
  );
}

