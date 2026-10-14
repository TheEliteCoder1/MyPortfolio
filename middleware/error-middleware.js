// 404 for unknown routes, plus one place that turns errors into clean JSON
export function notFound(req, res) {
  res.status(404).json({ message: `Route not found: ${req.method} ${req.originalUrl}` });
}

export function errorHandler(err, req, res, next) {
  if (err.name === "ValidationError") {
    return res.status(400).json({ message: "Validation failed", errors: Object.values(err.errors).map((e) => e.message) });
  }
  if (err.name === "CastError") return res.status(400).json({ message: "Invalid id format" });
  if (err.code === 11000) return res.status(409).json({ message: "A record with that value already exists" });
  if (err.type === "entity.parse.failed") return res.status(400).json({ message: "Request body is not valid JSON" });

  console.error(err);
  res.status(500).json({ message: "Server error" });
}
