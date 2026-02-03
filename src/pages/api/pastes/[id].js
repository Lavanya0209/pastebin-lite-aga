import { store } from "./store";

export default function handler(req, res) {
  const { id } = req.query;

  if (!store.has(id)) {
    return res.status(404).json({ error: "Paste not found" });
  }

  res.status(200).send(store.get(id));
}