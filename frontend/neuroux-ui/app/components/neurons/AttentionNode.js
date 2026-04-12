export default function AttentionNode({ signals }) {
  return <div>🎯 Attention: {signals.attention?.toFixed(2)}</div>;
}