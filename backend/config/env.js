// backend/config/env.js

require("dotenv").config();

function requireEnv(key) {
  const val = process.env[key];
  if (!val || val === `your_${key.toLowerCase()}_here`) {
    throw new Error(
      `Missing required environment variable: ${key}\n` +
      `  → Copy backend/.env.example to backend/.env and fill in your values.`
    );
  }
  return val;
}

module.exports = {
  PORT:          process.env.PORT || 5000,
  NODE_ENV:      process.env.NODE_ENV || "development",
  CLIENT_ORIGIN: process.env.CLIENT_ORIGIN || "http://localhost:3000",

  get GROQ_API_KEY() {
    return requireEnv("GROQ_API_KEY");
  },

  GROQ_MODEL:   "llama-3.1-8b-instant",
  GROQ_API_URL: "https://api.groq.com/openai/v1/chat/completions",
};
