"use client";

export default function StimulusNode({ fireSignal, setRaw }) {

  const handleUpload = async (file) => {

    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch("http://localhost:8000/analyze", {
  method: "POST",
  body: formData,
    });

    const data = await res.json();

    setRaw(data);

    // Simulate signal propagation
    setTimeout(() => fireSignal("visual", data.signals.visual), 200);
    setTimeout(() => fireSignal("attention", data.signals.attention), 400);
    setTimeout(() => fireSignal("load", data.signals.load), 600);
  };

  return (
    <div className="p-6 border rounded-xl">
      <p>🧠 Stimulus</p>
      <input type="file" onChange={(e) => handleUpload(e.target.files[0])} />
    </div>
  );
}