const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const backendUrl = process.env.BACKEND_URL || "http://127.0.0.1:5000";

app.get("/", (_req, res) => {
  res.type("html").send(`<h1>Express frontend is running</h1><p>Backend: ${backendUrl}</p><a href="/health">Health check</a>`);
});
app.get("/health", (_req, res) => res.json({ status: "ok", service: "express-frontend" }));
app.listen(port, "0.0.0.0", () => console.log(`Express listening on ${port}`));
