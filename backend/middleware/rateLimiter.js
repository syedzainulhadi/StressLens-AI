// backend/middleware/rateLimiter.js
// Limits requests to /api/analyze to prevent abuse.

const rateLimit = require("express-rate-limit");

const analysisLimiter = rateLimit({
  windowMs: 60 * 1000,   // 1 minute window
  max: 20,               // max 20 requests per window per IP
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    error: "Too many requests. Please wait a minute before trying again.",
  },
});

module.exports = { analysisLimiter };
