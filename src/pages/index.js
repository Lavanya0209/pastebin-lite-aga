import { useState } from "react";

export default function Home() {
  const [text, setText] = useState("");
  const [link, setLink] = useState("");

  async function createPaste() {
    setLink("");

    const res = await fetch("/api/pastes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text })
    });

    const data = await res.json();

    if (data.id) {
      setLink(`/p/${data.id}`);
    }
  }

  return (
    <div style={{ padding: 20 }}>
      <h1>Pastebin Lite</h1>

      <textarea
        rows={10}
        cols={60}
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      <br /><br />

      <button onClick={createPaste}>Create Paste</button>

      {link && (
        <p>
          Paste created:{" "}
          <a href={link} target="_blank" rel="noreferrer">
            View Paste
          </a>
        </p>
      )}
    </div>
  );
}