export default function VisualNode({ signals }) {
  return <div>👁 Visual: {signals.visual?.toFixed(2)}</div>;
}