import React, { useEffect, useRef } from "react";
import MessageBubble   from "./MessageBubble";
import TypingIndicator from "./TypingIndicator";
import ChatInput       from "./ChatInput";

const CHIPS = [
  { emoji:"😮‍💨", text:"I feel completely overwhelmed with work" },
  { emoji:"😰",   text:"I'm anxious about my exams" },
  { emoji:"😴",   text:"I can't sleep, my mind won't stop" },
  { emoji:"💙",   text:"I'm feeling hopeless and low" },
];

function Welcome({ onSend }) {
  return (
    <div className="sl-welcome">
      <div className="sl-welcome-orb-wrap">
        <div className="sl-ring sl-ring-2" />
        <div className="sl-ring sl-ring-1" />
        <div className="sl-welcome-orb">🧠</div>
      </div>
      <h1 className="sl-welcome-title">How are you feeling?</h1>
      <p className="sl-welcome-sub">
        Share anything on your mind — stress, anxiety, grief, or just the weight of the day. I'm here to listen and help.
      </p>
      <div className="sl-chips">
        {CHIPS.map(c => (
          <button key={c.text} className="sl-chip" onClick={() => onSend(c.text)}>
            <span className="sl-chip-emoji">{c.emoji}</span>
            {c.text}
          </button>
        ))}
      </div>
    </div>
  );
}

export default function ChatPanel({ messages, isTyping, onSend }) {
  const bottomRef = useRef(null);
  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior:"smooth" }); }, [messages, isTyping]);

  return (
    <div className="sl-chat">
      {/* Sub-header bar */}
      <div className="chat-bar">
        <div className="chat-bar-left">
          <div className="chat-live-dot" />
          <span className="chat-bar-title">Emotional Check-In</span>
        </div>
        <span className="chat-bar-count">
          {messages.length === 0 ? "Ready to listen" : `${messages.length} message${messages.length > 1 ? "s" : ""}`}
        </span>
      </div>

      {/* Messages */}
      <div className="sl-messages">
        {messages.length === 0
          ? <Welcome onSend={onSend} />
          : messages.map(m => <MessageBubble key={m.id} {...m} />)
        }
        {isTyping && <TypingIndicator />}
        <div ref={bottomRef} />
      </div>

      <ChatInput onSend={onSend} disabled={isTyping} />
    </div>
  );
}
