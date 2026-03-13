// frontend/src/utils/constants.js

export const STRESS_CONFIG = {
  LOW: {
    label:       "Low Stress",
    emoji:       "😌",
    color:       "#34d399",
    barColor:    "bg-emerald-400",
    segClass:    "seg-low",
    badgeBg:     "rgba(52,211,153,0.1)",
    badgeBorder: "rgba(52,211,153,0.3)",
    fillPct:     22,
  },
  MEDIUM: {
    label:       "Medium Stress",
    emoji:       "😟",
    color:       "#fbbf24",
    barColor:    "bg-amber-400",
    segClass:    "seg-medium",
    badgeBg:     "rgba(251,191,36,0.1)",
    badgeBorder: "rgba(251,191,36,0.3)",
    fillPct:     60,
  },
  HIGH: {
    label:       "High Stress",
    emoji:       "😰",
    color:       "#f87171",
    barColor:    "bg-red-400",
    segClass:    "seg-high",
    badgeBg:     "rgba(248,113,113,0.1)",
    badgeBorder: "rgba(248,113,113,0.35)",
    fillPct:     88,
  },
  CRISIS: {
    label:       "Crisis — Get Help Now",
    emoji:       "🆘",
    color:       "#ff4444",
    barColor:    "bg-red-600",
    segClass:    "seg-high",
    badgeBg:     "rgba(255,68,68,0.15)",
    badgeBorder: "rgba(255,68,68,0.5)",
    fillPct:     100,
  },
  NONE: {
    label:       "Awaiting Analysis",
    emoji:       "⬤",
    color:       "#6b7280",
    barColor:    "bg-gray-600",
    segClass:    "",
    badgeBg:     "rgba(255,255,255,0.04)",
    badgeBorder: "rgba(255,255,255,0.1)",
    fillPct:     0,
  },
};

export const SUGGESTIONS = [
  "I feel completely overwhelmed with work deadlines",
  "I'm very anxious about my upcoming exams",
  "I can't sleep — my mind won't stop racing",
  "I feel calm and at peace today",
];

export const DEFAULT_RESOURCES = [
  {
    icon:  "📞",
    bg:    "rgba(56,189,248,0.1)",
    title: "iCall Helpline",
    body:  "Free psychological counselling by trained professionals.",
    contact: "9152987821",
  },
  {
    icon:  "🌿",
    bg:    "rgba(52,211,153,0.1)",
    title: "Vandrevala Foundation",
    body:  "24/7 mental health support helpline, free and confidential.",
    contact: "1860-2662-345",
  },
  {
    icon:  "💻",
    bg:    "rgba(167,139,250,0.1)",
    title: "YourDOST",
    body:  "Online counselling and emotional wellness platform.",
    contact: "yourdost.com",
  },
];

export const BASE_TIPS = [
  {
    icon:  "🌬",
    bg:    "rgba(56,189,248,0.1)",
    title: "4-7-8 Breathing",
    body:  "Inhale for 4 seconds, hold for 7, exhale for 8. Repeat 4 times to calm your nervous system.",
  },
  {
    icon:  "🌿",
    bg:    "rgba(52,211,153,0.1)",
    title: "5-4-3-2-1 Grounding",
    body:  "Name 5 things you see, 4 you hear, 3 you feel, 2 you smell, 1 you taste.",
  },
  {
    icon:  "🧘",
    bg:    "rgba(167,139,250,0.1)",
    title: "Body Scan",
    body:  "Close your eyes and slowly relax each muscle group from head to toe.",
  },
];
