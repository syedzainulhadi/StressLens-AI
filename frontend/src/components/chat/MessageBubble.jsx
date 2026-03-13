import React from "react";
export default function MessageBubble({ role, content, parsed }) {
  const isUser  = role === "user";
  const isError = role === "error";
  return (
    <div className={`sl-msg ${isUser ? "sl-user" : ""}`}>
      <div className={`sl-avatar ${isError ? "av-err" : isUser ? "av-user" : "av-ai"}`}>
        {isError ? "!" : isUser ? "●" : "✦"}
      </div>
      <div className={`sl-bubble ${isError ? "bbl-err" : isUser ? "bbl-user" : "bbl-ai"}`}>
        {parsed ? (
          <>
            <p>{parsed.supportMessage}</p>
            {parsed.copingTip && (
              <div className="bbl-tip">
                <div className="bbl-tip-lbl">✦ Try this</div>
                <div className="bbl-tip-txt">{parsed.copingTip}</div>
              </div>
            )}
          </>
        ) : (
          <p>{content}</p>
        )}
      </div>
    </div>
  );
}
