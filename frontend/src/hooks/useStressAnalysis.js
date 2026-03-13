// frontend/src/hooks/useStressAnalysis.js

import { useState, useCallback } from "react";
import { analyzeMessage } from "../services/api";
import { uid, getStressTrend } from "../utils/helpers";

const INITIAL_STATE = {
  messages:       [],
  isTyping:       false,
  stressLevel:    "NONE",
  stressHistory:  [],
  analysisCount:  0,
  latestAnalysis: {
    reason:         "",
    emotionalTone:  "",
    supportMessage: "",
    copingTip:      "",
    resources:      [],
  },
  trend: null,
  error: null,
};

export function useStressAnalysis() {
  const [state, setState] = useState(INITIAL_STATE);

  const sendMessage = useCallback(async (text) => {
    if (!text.trim()) return;

    const userMsg = { id: uid(), role: "user", content: text };
    setState((prev) => ({
      ...prev,
      messages: [...prev.messages, userMsg],
      isTyping: true,
      error:    null,
    }));

    try {
      const result = await analyzeMessage(text);

      const aiMsg = {
        id:     uid(),
        role:   "assistant",
        content: result.supportMessage,
        parsed: {
          supportMessage: result.supportMessage,
          copingTip:      result.copingTip,
          level:          result.level,
        },
      };

      setState((prev) => {
        const newHistory = [...prev.stressHistory, result.level];
        return {
          ...prev,
          messages:      [...prev.messages, aiMsg],
          isTyping:       false,
          stressLevel:    result.level,
          stressHistory:  newHistory,
          analysisCount:  prev.analysisCount + 1,
          trend:          getStressTrend(newHistory),
          latestAnalysis: {
            reason:         result.reason,
            emotionalTone:  result.emotionalTone,
            supportMessage: result.supportMessage,
            copingTip:      result.copingTip,
            resources:      result.resources || [],
          },
        };
      });
    } catch (err) {
      const errorMsg = { id: uid(), role: "error", content: err.message };
      setState((prev) => ({
        ...prev,
        messages: [...prev.messages, errorMsg],
        isTyping: false,
        error:    err.message,
      }));
    }
  }, []);

  const clearChat = useCallback(() => setState(INITIAL_STATE), []);

  return { ...state, sendMessage, clearChat };
}
