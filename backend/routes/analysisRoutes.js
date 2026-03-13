// backend/routes/analysisRoutes.js
// Defines all API routes for stress analysis.

const express = require("express");
const router  = express.Router();
const { analyzeMessage, healthCheck } = require("../controllers/analysisController");

// GET  /api/health  — server health check
router.get("/health", healthCheck);

// POST /api/analyze — analyze a user message for stress
router.post("/analyze", analyzeMessage);

module.exports = router;
