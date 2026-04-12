export default function DecisionNode({ raw }) {
  if (!raw) return null;

  return (
    <div>
      🧠 UX Score: {raw.decision.ux_score.toFixed(2)}

      {raw.decision.suggestions.map((s, i) => (
        <p key={i}>• {s}</p>
      ))}
    </div>
  );
}