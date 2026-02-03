import { v4 as uuidv4 } from "uuid";

// ⚠️ Global store (demo-safe for Vercel)
global.pastes = global.pastes || {};

export default async function handler(req, res) {
  if (req.method === "POST") {
    const text = req.body?.text;

    if (!text) {
      return res.status(400).json({ error: "Text is required" });
    }

    const id = uuidv4();
    global.pastes[id] = text;

    return res.status(200).json({ id });
  }

  if (req.method === "GET") {
    const { id } = req.query;

    if (!id || !global.pastes[id]) {
      return res.status(404).json({ error: "Paste not found" });
    }

    return res.status(200).json({ text: global.pastes[id] });
  }

  res.status(405).json({ error: "Method not allowed" });
}