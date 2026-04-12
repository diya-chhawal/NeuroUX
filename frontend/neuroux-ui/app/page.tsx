"use client";

import { useState } from "react";
import { useBrain } from "./hooks/useBrain";
import GraphView from "./components/GraphView";

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

  return (
    <div className="min-h-screen bg-black text-white p-10">

      <h1 className="text-4xl mb-6">🧠 NeuroUX Brain</h1>

      <StimulusNode fireSignal={fireSignal} setRaw={setRaw} />

<GraphView signals={signals} raw={raw} />

{raw && (
  <img
    src={`data:image/png;base64,${raw.heatmap}`}
    className="mt-10"
  />
)}
    </div>
  );
}