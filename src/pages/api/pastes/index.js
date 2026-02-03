import { v4 as uuidv4 } from "uuid";

const store = global.pasteStore || new Map();
global.pasteStore = store;

export default function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { text } = req.body;

  if (!text || typeof text !== "string") {
    return res.status(400).json({ error: "Text is required" });
  }

  const id = uuidv4();
  store.set(id, text);

  res.status(201).json({ id });
}