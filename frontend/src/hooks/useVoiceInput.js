// frontend/src/hooks/useVoiceInput.js
// Custom React hook that wraps the Web Speech API.
// Returns helpers to start/stop voice recognition and track state.

import { useState, useRef, useCallback } from "react";

export function useVoiceInput() {
  const [isListening, setIsListening] = useState(false);
  const [error, setError]             = useState(null);
  const recognitionRef                = useRef(null);

  const SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;
  const isSupported = Boolean(SpeechRecognition);

  const stopListening = useCallback(() => {
    recognitionRef.current?.stop();
    setIsListening(false);
  }, []);

  /**
   * Start voice recognition.
   * @param {(finalText: string) => void} onResult — called with final transcript
   */
  const startListening = useCallback(
    (onResult) => {
      if (!isSupported) {
        setError("Voice recognition is not supported. Please use Chrome or Edge.");
        return;
      }
      setError(null);

      const rec = new SpeechRecognition();
      rec.continuous      = false;
      rec.interimResults  = true;
      rec.lang            = "en-US";

      rec.onstart = () => setIsListening(true);

      rec.onresult = (e) => {
        const text = Array.from(e.results)
          .map((r) => r[0].transcript)
          .join("");
        if (e.results[e.results.length - 1].isFinal) {
          onResult(text.trim());
          stopListening();
        }
      };

      rec.onerror = (e) => {
        setError(`Voice error: ${e.error}`);
        stopListening();
      };

      rec.onend = () => setIsListening(false);

      recognitionRef.current = rec;
      rec.start();
    },
    [isSupported, stopListening]
  );

  return { isListening, isSupported, startListening, stopListening, error };
}
