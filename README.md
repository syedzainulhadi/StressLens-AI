# 🧠 StressLens AI
### Early stress detection and AI-powered emotional support

---

## Project Structure

```
stresslens/
│
├── frontend/                          ← React.js client
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── components/
│   │   │   ├── chat/
│   │   │   │   ├── ChatPanel.jsx      ← Full chat panel assembly
│   │   │   │   ├── ChatInput.jsx      ← Textarea + mic + send button
│   │   │   │   ├── MessageBubble.jsx  ← Single message bubble
│   │   │   │   └── TypingIndicator.jsx← Animated "AI is typing..."
│   │   │   ├── stress/
│   │   │   │   ├── StressMeter.jsx    ← Animated bar + segment dots + stats
│   │   │   │   ├── AnalysisCard.jsx   ← AI reason + support message
│   │   │   │   └── CopingTips.jsx     ← Toolkit + AI tip injection
│   │   │   └── layout/
│   │   │       └── Header.jsx         ← Sticky top bar
│   │   ├── hooks/
│   │   │   ├── useVoiceInput.js       ← Web Speech API hook
│   │   │   └── useStressAnalysis.js   ← All state + API call logic
│   │   ├── pages/
│   │   │   └── HomePage.jsx           ← Two-column layout page
│   │   ├── services/
│   │   │   └── api.js                 ← Axios client → backend
│   │   ├── utils/
│   │   │   ├── constants.js           ← STRESS_CONFIG, SUGGESTIONS, BASE_TIPS
│   │   │   └── helpers.js             ← uid(), getStressTrend()
│   │   ├── App.jsx
│   │   ├── index.js
│   │   └── index.css
│   ├── .env.example
│   ├── package.json
│   ├── tailwind.config.js
│   └── postcss.config.js
│
├── backend/                           ← Node.js + Express API server
│   ├── config/
│   │   └── env.js                     ← Centralised env validation
│   ├── controllers/
│   │   └── analysisController.js      ← Request handlers
│   ├── middleware/
│   │   ├── errorHandler.js            ← Global error handler
│   │   └── rateLimiter.js             ← Rate limit (20 req/min)
│   ├── routes/
│   │   └── analysisRoutes.js          ← GET /api/health, POST /api/analyze
│   ├── services/
│   │   └── groqService.js             ← Groq API + prompt engineering
│   ├── .env.example
│   ├── package.json
│   └── server.js                      ← Express entry point
│
├── package.json                       ← Root — runs both with concurrently
└── README.md
```

---

## API Key Setup

### Step 1 — Get a free Groq API key
Go to: https://console.groq.com → sign up → create API key

### Step 2 — Create the backend .env file

```bash
cp backend/.env.example backend/.env
```

Open `backend/.env` and replace the placeholder:

```env
GROQ_API_KEY=gsk_your_actual_key_here   ← LINE 5 in backend/.env
PORT=5000
NODE_ENV=development
CLIENT_ORIGIN=http://localhost:3000
```

### Where the key is used in code

| File | Line | Purpose |
|------|------|---------|
| `backend/.env` | 5 | Where you paste your key |
| `backend/config/env.js` | 14 | Validates + exports it |
| `backend/services/groqService.js` | 56 | Passed as Bearer token to Groq API |

The frontend **never** touches the API key. All Groq calls go through the backend.

---

## Installation & Running

### Option A — Run everything with one command (recommended)

```bash
# From the root stresslens/ folder:

# 1. Install all dependencies
npm run install:all

# 2. Set up backend .env (see above)
cp backend/.env.example backend/.env
# → edit backend/.env, add your GROQ_API_KEY

# 3. Start both servers simultaneously
npm run dev
```

Frontend → http://localhost:3000
Backend  → http://localhost:5000

---

### Option B — Run frontend & backend separately

**Terminal 1 — Backend:**
```bash
cd backend
npm install
cp .env.example .env
# edit .env → add GROQ_API_KEY
npm run dev
```

**Terminal 2 — Frontend:**
```bash
cd frontend
npm install
npm start
```

---

## Dependencies

### Backend (`backend/package.json`)
```
express              — HTTP server framework
axios                — HTTP client for Groq API calls
cors                 — Cross-origin resource sharing
helmet               — Security HTTP headers
morgan               — Request logging
dotenv               — Loads .env file
express-rate-limit   — Rate limiting middleware
nodemon (dev)        — Auto-restart on file change
```

### Frontend (`frontend/package.json`)
```
react                — UI library
react-dom            — React DOM renderer
react-scripts        — CRA build tooling
axios                — HTTP client for backend calls
lucide-react         — Icon library
tailwindcss (dev)    — Utility CSS framework
autoprefixer (dev)   — CSS vendor prefixes
postcss (dev)        — CSS processing
```

### Root (`package.json`)
```
concurrently (dev)   — Run frontend + backend simultaneously
```

---

## API Endpoints

```
GET  /api/health    → Server health check
POST /api/analyze   → Analyze message for stress

Body: { "message": "I feel overwhelmed with work" }

Response: {
  "success": true,
  "data": {
    "level":          "HIGH",
    "reason":         "...",
    "supportMessage": "...",
    "copingTip":      "...",
    "model":          "llama3-8b-8192",
    "tokensUsed":     142,
    "analyzedAt":     "2025-01-01T00:00:00.000Z"
  }
}
```

---

*StressLens AI — Built for hackathon*
