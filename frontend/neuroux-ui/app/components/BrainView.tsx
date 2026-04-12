"use client";

type Props = {
  signals: {
    visual?: number;
    attention?: number;
    load?: number;
  };
  raw: any;
  stage: string;
};

export default function BrainView({ signals, raw, stage }: Props) {
 return (
  <div className="mt-10 flex flex-col items-center">

    <h2 className="text-xl mb-0 text-bold">Brain Activation</h2>

    {/* ✅ STEP 3 APPLIED HERE */}
    <div className="relative w-[400px] h-[400px] bg-black/30 rounded-xl p-4">

      <img
        src="/brain.png"
        className="absolute w-full h-full object-contain opacity-70"
      />

      {/* Visual (back) */}
      <div
        className="absolute w-20 h-20 rounded-full bg-purple-500 blur-xl animate-pulse z-10"
        style={{
  top: "45%",
  left: "70%",
  opacity:
  stage === "visual" ||
  stage === "attention" ||
  stage === "load" ||
  stage === "decision"
    ? (signals.visual ?? 0)
    : 0,
  transform: `scale(${
  stage === "visual"
    ? 1.5 + (signals.visual ?? 0)
    : 1 + (signals.visual ?? 0)
})`,
  background: "radial-gradient(circle, rgba(168,85,247,0.9), transparent)",
}}
      />

      {/* Attention (middle) */}
      <div
        className="absolute w-20 h-20 rounded-full bg-pink-500 blur-xl animate-pulse z-20"
        style={{
  top: "30%",
  left: "50%",
  opacity:
  stage === "attention" ||
  stage === "load" ||
  stage === "decision"
    ? (signals.attention ?? 0)
    : 0,
  transform: `scale(${
  stage === "attention"
    ? 1.5 + (signals.attention ?? 0)
    : 1 + (signals.attention ?? 0)
})`,
  background: "radial-gradient(circle, rgba(236,72,153,0.9), transparent)",
}}
      />

      {/* Load (front) */}
      <div
        className="absolute w-20 h-20 rounded-full bg-green-500 blur-xl animate-pulse z-30"
        style={{
  top: "25%",
  left: "25%",
  opacity:
  stage === "load" ||
  stage === "decision"
    ? (signals.load ?? 0)
    : 0,
  transform: `scale(${
  stage === "load"
    ? 1.5 + (signals.load ?? 0)
    : 1 + (signals.load ?? 0)
})`,
  background: "radial-gradient(circle, rgba(34,197,94,0.9), transparent)",
}}
      />

      {/* Decision */}
      <div
        className="absolute w-24 h-24 rounded-full bg-yellow-400 blur-2xl animate-pulse z-40"
        style={{
  top: "15%",
  left: "35%",
  opacity:
  stage === "decision"
    ? (raw?.decision.ux_score ?? 0)
    : 0,
  transform: `scale(${
  stage === "decision"
    ? 1.5 + (raw?.decision.ux_score ?? 0)
    : 1 + (raw?.decision.ux_score ?? 0)
})`,
  background: "radial-gradient(circle, rgba(250,204,21,1), transparent)",
}}
      />

    </div>

    <div className="mt-4 text-sm text-center space-x-4">
        <span className="text-purple-400">Visual</span>
        <span className="text-pink-400">Attention</span>
        <span className="text-green-400">Load</span>
        <span className="text-yellow-400">Decision</span>
      </div>

    </div>
  );
}