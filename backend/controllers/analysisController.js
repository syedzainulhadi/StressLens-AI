// backend/controllers/analysisController.js

const { analyzeStress } = require("../services/groqService");

async function analyzeMessage(req, res) {
  const { message } = req.body;

  if (!message || typeof message !== "string") {
    return res.status(400).json({ success: false, error: "message field is required." });
  }
  const trimmed = message.trim();
  if (trimmed.length < 2) {
    return res.status(400).json({ success: false, error: "Message is too short." });
  }
  if (trimmed.length > 2000) {
    return res.status(400).json({ success: false, error: "Message too long (max 2000 chars)." });
  }

  try {
    const result = await analyzeStress(trimmed);

    return res.status(200).json({
      success: true,
      data: {
        level:          result.level,
        emotionalTone:  result.emotionalTone,
        reason:         result.reason,
        supportMessage: result.supportMessage,
        copingTip:      result.copingTip,
        resources:      result.resources || [],
        model:          result.model,
        tokensUsed:     result.tokensUsed,
        analyzedAt:     new Date().toISOString(),
      },
    });
  } catch (err) {
    console.error("[Controller] Error:", err.message);

    if (err.response?.status === 401) {
      return res.status(502).json({ success: false, error: "Invalid Groq API key." });
    }
    if (err.response?.status === 429) {
      return res.status(429).json({ success: false, error: "Rate limit reached. Please wait." });
    }
    if (err.code === "ECONNABORTED") {
      return res.status(504).json({ success: false, error: "Request timed out. Try again." });
    }

    return res.status(500).json({ success: false, error: "Internal server error." });
  }
}

function healthCheck(req, res) {
  res.status(200).json({
    success: true,
    service: "StressLens AI API",
    status:  "healthy",
    timestamp: new Date().toISOString(),
  });
}

module.exports = { analyzeMessage, healthCheck };
