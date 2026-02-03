import { useState } from "react";

export default function Home() {
  const [text, setText] = useState("");
  const [pasteId, setPasteId] = useState(null);

  const createPaste = async () => {
    const res = await fetch("/api/paste", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text }),
    });

    const data = await res.json();
    setPasteId(data.id);
  };

  return (
    <div style={{ padding: 30 }}>
      <h1>Pastebin Lite</h1>

      <textarea
        rows="6"
        cols="50"
        placeholder="Enter text..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      <br /><br />
      <button onClick={createPaste}>Create Paste</button>

      {pasteId && (
        <p>
          Paste created:{" "}
          <a href={`/p/${pasteId}`} target="_blank">
            View Paste
          </a>
        </p>
      )}
    </div>
  );
}