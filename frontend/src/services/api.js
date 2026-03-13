// frontend/src/services/api.js
// Centralised API client.
// All backend calls go through this file — no fetch() or axios in components.

import axios from "axios";

// Base URL: in dev, CRA's "proxy" in package.json handles /api → localhost:5000
// In production set REACT_APP_API_BASE_URL to your deployed backend URL.
const BASE_URL = process.env.REACT_APP_API_BASE_URL || "http://localhost:5000";

const apiClient = axios.create({
  baseURL: BASE_URL,
  timeout: 20000,
  headers: { "Content-Type": "application/json" },
});

// ─── Response interceptor — normalises errors ─────────────────────────────

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const message =
      error.response?.data?.error ||
      error.message ||
      "An unexpected error occurred.";
    return Promise.reject(new Error(message));
  }
);

// ─── API calls ────────────────────────────────────────────────────────────

/**
 * Send a message to the backend for stress analysis.
 * @param {string} message
 * @returns {Promise<{ level, reason, supportMessage, copingTip, model, tokensUsed, analyzedAt }>}
 */
export async function analyzeMessage(message) {
  const { data } = await apiClient.post("/api/analyze", { message });
  return data.data;
}

/**
 * Ping the backend health endpoint.
 */
export async function checkHealth() {
  const { data } = await apiClient.get("/api/health");
  return data;
}
