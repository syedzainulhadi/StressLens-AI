import React from "react";

export default function AnalysisCard({ emotionalTone, reason, supportMessage }) {
  const hasData = emotionalTone || reason || supportMessage;
  return (
    <div className="rp-section">
      <div className="rp-section-hdr">
        <div className="rp-section-title">
          <div className="rp-section-title-dot" />
          AI Insights
        </div>
      </div>
      <div className="rp-section-body stagger-2">
        {!hasData ? (
          <div className="rp-empty">Your emotional analysis will appear here after your first message.</div>
        ) : (
          <>
            {emotionalTone && (
              <div className="tone-wrap">
                {emotionalTone.split(/[,/]/).map((t,i) => (
                  <span key={i} className="tone-pill">{t.trim()}</span>
                ))}
              </div>
            )}
            {reason && <div className="insight-box">{reason}</div>}
            {supportMessage && <div className="quote-block">{supportMessage}</div>}
          </>
        )}
      </div>
    </div>
  );
}
