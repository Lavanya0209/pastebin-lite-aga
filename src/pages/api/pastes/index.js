import { v4 as uuidv4 } from "uuid";

const store = new Map();

export default function handler(req, res) {
  if (req.method === "POST") {
    const { text } = req.body;

    if (!text) {
      return res.status(400).json({ error: "Text required" });
    }

    const id = uuidv4();
    store.set(id, text);

    return res.status(201).json({ id });
  }

  if (req.method === "GET") {
    const { id } = req.query;

    if (!id || !store.has(id)) {
      return res.status(404).json({ error: "Not found" });
    }

    return res.status(200).send(store.get(id));
  }

  return res.status(405).end();
}