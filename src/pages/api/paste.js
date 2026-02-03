/ src/pages/api/paste.js

let store = {}; 

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { text } = req.body;

    if (!text) {
      return res.status(400).json({ error: "Text is required" });
    }

    const id = Date.now().toString();
    store[id] = text;

    return res.status(200).json({ id });
  }

  if (req.method === "GET") {
    const { id } = req.query;

    if (!id || !store[id]) {
      return res.status(404).json({ error: "Paste not found" });
    }

    return res.status(200).json({ text: store[id] });
  }

  return res.status(405).json({ error: "Method not allowed" });
}