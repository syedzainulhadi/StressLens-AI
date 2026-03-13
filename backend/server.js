// backend/server.js
// Express application entry point.
// Configures middleware, mounts routes, starts the server.

const express      = require("express");
const cors         = require("cors");
const helmet       = require("helmet");
const morgan       = require("morgan");
const { PORT, NODE_ENV, CLIENT_ORIGIN } = require("./config/env");
const analysisRoutes = require("./routes/analysisRoutes");
const errorHandler   = require("./middleware/errorHandler");
const { analysisLimiter } = require("./middleware/rateLimiter");

const app = express();

// ─── Security & Logging ──────────────────────────────────────────────────────
app.use(helmet());
app.use(morgan(NODE_ENV === "development" ? "dev" : "combined"));

// ─── CORS ────────────────────────────────────────────────────────────────────
app.use(
  cors({
    origin: CLIENT_ORIGIN,
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type"],
  })
);

// ─── Body parsing ─────────────────────────────────────────────────────────────
app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: false }));

// ─── Rate limiting on analysis endpoint ──────────────────────────────────────
app.use("/api/analyze", analysisLimiter);

// ─── Routes ───────────────────────────────────────────────────────────────────
app.use("/api", analysisRoutes);

// 404 fallback
app.use((req, res) => {
  res.status(404).json({ success: false, error: `Route ${req.originalUrl} not found.` });
});

// ─── Global error handler (must be last) ─────────────────────────────────────
app.use(errorHandler);

// ─── Start ────────────────────────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`\n🧠 StressLens AI — Backend running`);
  console.log(`   Environment : ${NODE_ENV}`);
  console.log(`   Port        : ${PORT}`);
  console.log(`   CORS origin : ${CLIENT_ORIGIN}`);
  console.log(`   Health check: http://localhost:${PORT}/api/health\n`);
});

module.exports = app;
