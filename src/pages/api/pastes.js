import { v4 as uuidv4 } from "uuid";
import store from "../../lib/store";

export default function handler(req, res) {
  if (req.method === "POST") {
    const { text } = req.body;

    if (!text) {
      return res.status(400).json({ error: "Text required" });
    }

    const id = uuidv4();
    store.set(id, text);

    return res.status(200).json({ id });
  }

  if (req.method === "GET") {
    const { id } = req.query;

    if (!store.has(id)) {
      return res.status(404).json({ error: "Paste not found" });
    }

    return res.status(200).json({ text: store.get(id) });
  }

  res.status(405).end();
}