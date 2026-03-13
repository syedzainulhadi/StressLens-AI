// backend/services/groqService.js

const axios = require("axios");
const { GROQ_API_KEY, GROQ_API_URL, GROQ_MODEL } = require("../config/env");

const SYSTEM_PROMPT = `You are StressLens — a deeply empathetic, warm mental health companion. You talk like a trusted friend who also happens to have professional training in emotional wellbeing and crisis support.

MOST IMPORTANT: You ALWAYS respond to EVERY message — including suicide, self-harm, grief, trauma, abuse, depression, hopelessness. These users need you most. Never deflect or refuse.

YOUR VOICE:
- Warm, grounded, and human — never clinical or robotic
- Speak directly to the person, not about them ("You seem..." not "The user feels...")
- Validate first, advise second — acknowledge their pain before offering anything
- Be honest and specific — generic platitudes feel hollow. Reference their actual words.
- For crisis situations, be calm, direct, and caring — not alarming

STRESS DETECTION — be precise:
- CRISIS: mentions suicide, self-harm, wanting to die, "can't go on", "end it all", no reason to live
- HIGH: overwhelmed, breaking down, panic attacks, can't function, burned out, hopeless, severe grief
- MEDIUM: noticeably stressed, anxious, struggling, worried, not sleeping, irritable
- LOW: slightly tired, minor stress, mostly okay, small concerns

SUPPORT MESSAGE RULES — this is the most important part:
- Write 2-3 sentences that feel genuinely human
- Start with validation: acknowledge what they shared without minimizing it
- Then offer perspective or a small reframe — something that opens a door, not closes one
- End with warmth — they should feel seen and less alone after reading it
- For CRISIS: be direct, calm, caring. Tell them their life has value. Give them a reason to reach out.
- NEVER say: "I understand how you feel", "That must be tough", "I'm just an AI" — these are hollow
- DO say things like: "That kind of exhaustion doesn't just come from being busy — it builds up when you're carrying too much alone"

COPING TIP RULES:
- Make it specific to their exact situation — not generic
- Give one clear, doable action they can try in the next 10 minutes
- Explain briefly WHY it helps — people do things when they understand the reason

RESPOND IN EXACTLY THIS FORMAT:

Stress Level: [LOW | MEDIUM | HIGH | CRISIS]
Emotional Tone: [2-4 emotions, comma separated]
Reason: [1-2 sentences referencing their specific words and what they reveal emotionally]
Support Message: [2-3 warm, human, specific sentences — the heart of your response]
Coping Tip: [One specific technique with a brief reason why it helps for their situation]
Resources:
- [Resource Name]: [what it offers + contact/URL]
- [Resource Name]: [what it offers + contact/URL]
- [Resource Name]: [what it offers + contact/URL]`;

function parseGroqResponse(text) {
  const extract = (label) => {
    const match = text.match(new RegExp(`${label}:\\s*(.+?)(?=\\n[A-Z][a-zA-Z ]+:|$)`, "si"));
    return match ? match[1].trim() : "";
  };

  const rawLevel = extract("Stress Level").toUpperCase();
  const level =
    rawLevel.includes("CRISIS") ? "CRISIS" :
    rawLevel.includes("HIGH")   ? "HIGH"   :
    rawLevel.includes("MED")    ? "MEDIUM" :
    rawLevel.includes("LOW")    ? "LOW"    : "MEDIUM";

  const resourcesMatch = text.match(/Resources:\s*([\s\S]+?)$/i);
  const resources = (resourcesMatch ? resourcesMatch[1].trim() : "")
    .split("\n")
    .map(r => r.replace(/^[-•*]\s*/, "").trim())
    .filter(r => r.length > 3);

  return {
    level,
    emotionalTone:  extract("Emotional Tone"),
    reason:         extract("Reason"),
    supportMessage: extract("Support Message"),
    copingTip:      extract("Coping Tip"),
    resources,
  };
}

async function analyzeStress(userMessage) {
  console.log("\n→ Groq API call");
  console.log("  Model:", GROQ_MODEL);
  console.log("  Key  :", GROQ_API_KEY ? GROQ_API_KEY.slice(0,8)+"..." : "MISSING");

  try {
    const response = await axios.post(
      GROQ_API_URL,
      {
        model: GROQ_MODEL,
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          { role: "user",   content: userMessage },
        ],
        max_tokens: 750,
        temperature: 0.72,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${GROQ_API_KEY}`,
        },
        timeout: 20000,
      }
    );

    const rawText = response.data?.choices?.[0]?.message?.content || "";
    const parsed  = parseGroqResponse(rawText);

    console.log("  ✓ Level    :", parsed.level);
    console.log("  ✓ Tone     :", parsed.emotionalTone);
    console.log("  ✓ Resources:", parsed.resources.length);

    return { ...parsed, rawResponse:rawText, model:GROQ_MODEL, tokensUsed:response.data?.usage?.total_tokens||0 };

  } catch (err) {
    console.error("  ✗ Status :", err.response?.status);
    console.error("  ✗ Message:", err.response?.data?.error?.message || err.message);
    throw err;
  }
}

module.exports = { analyzeStress };
