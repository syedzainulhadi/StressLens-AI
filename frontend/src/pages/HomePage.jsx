import React from "react";
import ChatPanel    from "../components/chat/ChatPanel";
import StressMeter  from "../components/stress/StressMeter";
import AnalysisCard from "../components/stress/AnalysisCard";
import CopingTips   from "../components/stress/CopingTips";
import { useStressAnalysis } from "../hooks/useStressAnalysis";

export default function HomePage() {
  const {
    messages, isTyping, stressLevel,
    analysisCount, trend, latestAnalysis,
    sendMessage, clearChat,
  } = useStressAnalysis();

  /* Stress colour for header pill */
  const sColor = {
    LOW:"var(--s-low)", MEDIUM:"var(--s-med)",
    HIGH:"var(--s-high)", CRISIS:"var(--s-crisis)", NONE:"var(--t3)"
  }[stressLevel] || "var(--t3)";

  const sLabel = {
    LOW:"Calm", MEDIUM:"Stressed", HIGH:"Overwhelmed", CRISIS:"Crisis", NONE:"—"
  }[stressLevel] || "—";

  return (
    <>
      {/* Animated canvas bg */}
      <div className="sl-canvas">
        <div className="sl-lines" />
        <div className="sl-orb orb-a" />
        <div className="sl-orb orb-b" />
        <div className="sl-orb orb-c" />
      </div>

      <div className="sl-shell">
        {/* ── Global Header ── */}
        <header className="sl-header">
          {/* Logo */}
          <div className="sl-logo">
            <div className="sl-logo-mark">🧠</div>
            <span className="sl-logo-name">Stress<span>Lens</span></span>
          </div>

          {/* Centre — live status */}
          <div className="sl-header-center">
            <div className="hdr-pill hdr-pill-ai">
              <span className="hdr-pill-dot" />
              AI Active
            </div>
            {stressLevel !== "NONE" && (
              <div className="hdr-pill" style={{
                background:`rgba(0,0,0,0.2)`,
                borderColor:`${sColor}30`,
                color: sColor,
              }}>
                {sLabel}
              </div>
            )}
          </div>

          {/* Right — clear */}
          <div className="sl-header-right">
            {messages.length > 0 && (
              <button className="hdr-btn danger" onClick={clearChat}>
                Clear session
              </button>
            )}
          </div>
        </header>

        {/* ── Main grid ── */}
        <main className="sl-main">
          {/* Chat */}
          <ChatPanel messages={messages} isTyping={isTyping} onSend={sendMessage} />

          {/* Right panel — all 3 sections always visible, stacked + scrollable */}
          <div className="sl-right">
            <StressMeter  level={stressLevel} analysisCount={analysisCount} trend={trend} />
            <AnalysisCard
              emotionalTone={latestAnalysis.emotionalTone}
              reason={latestAnalysis.reason}
              supportMessage={latestAnalysis.supportMessage}
            />
            <CopingTips
              aiTip={latestAnalysis.copingTip || null}
              resources={latestAnalysis.resources || []}
              stressLevel={stressLevel}
            />
          </div>
        </main>
      </div>
    </>
  );
}
