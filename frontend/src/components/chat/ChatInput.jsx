import React, { useRef, useState, useCallback } from "react";
import { useVoiceInput } from "../../hooks/useVoiceInput";

export default function ChatInput({ onSend, disabled }) {
  const [value, setValue] = useState("");
  const ref = useRef(null);
  const { isListening, isSupported, startListening, stopListening, error: voiceError } = useVoiceInput();

  const submit = useCallback((text) => {
    const t = (text || value).trim();
    if (!t || disabled) return;
    onSend(t);
    setValue("");
    if (ref.current) ref.current.style.height = "auto";
  }, [value, disabled, onSend]);

  const handleKey = (e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); submit(); } };
  const handleResize = (e) => { e.target.style.height = "auto"; e.target.style.height = Math.min(e.target.scrollHeight, 120) + "px"; };
  const handleMic = () => {
    if (isListening) stopListening();
    else startListening((t) => { setValue(t); setTimeout(() => submit(t), 250); });
  };

  return (
    <div className="sl-input-dock">
      {(isListening || voiceError) && (
        <div className="voice-hint">
          {isListening && <span className="voice-hint-dot" />}
          {isListening ? "Listening — speak now" : voiceError}
        </div>
      )}
      <div className="sl-input-box">
        <textarea
          ref={ref} value={value} rows={1}
          onChange={e => { setValue(e.target.value); handleResize(e); }}
          onKeyDown={handleKey}
          placeholder="Share how you're feeling…"
          className="sl-textarea"
        />
        <button onClick={handleMic} disabled={!isSupported} title={isSupported ? (isListening ? "Stop" : "Voice") : "Not supported"}
          className={`sl-icon-btn ${isListening ? "mic-active" : ""}`}>
          {isListening ? "◼" : "🎙"}
        </button>
        <button onClick={() => submit()} disabled={!value.trim() || disabled} className="sl-send-btn">↑</button>
      </div>
    </div>
  );
}
