import React from "react";

const C = {
  LOW:    { label:"Calm",        sub:"Low stress detected",      color:"var(--s-low)",    bar:"#52c98a", pct:20,  lit:"low"    },
  MEDIUM: { label:"Stressed",    sub:"Moderate stress detected", color:"var(--s-med)",    bar:"#e8a33a", pct:58,  lit:"med"    },
  HIGH:   { label:"Overwhelmed", sub:"High stress detected",     color:"var(--s-high)",   bar:"#e85d75", pct:88,  lit:"high"   },
  CRISIS: { label:"Crisis",      sub:"Please seek support now",  color:"var(--s-crisis)", bar:"#ff3355", pct:100, lit:"crisis" },
  NONE:   { label:"—",           sub:"Awaiting your message",    color:"var(--t3)",        bar:"#2e2622", pct:0,   lit:""       },
};
const SEG_CLASS = { low:"#52c98a", med:"#e8a33a", high:"#e85d75", crisis:"#ff3355" };

export default function StressMeter({ level="NONE", analysisCount=0, trend=null }) {
  const c = C[level] || C.NONE;
  const lit = Math.round(c.pct / 10);
  const trendCol = trend==="down" ? "var(--s-low)" : trend==="up" ? "var(--s-high)" : "var(--t3)";
  const trendIcon = trend==="down" ? "↓" : trend==="up" ? "↑" : "—";

  return (
    <div className="rp-section">
      <div className="rp-section-hdr">
        <div className="rp-section-title">
          <div className="rp-section-title-dot" />
          Stress Monitor
        </div>
      </div>
      <div className="rp-section-body stagger-1">
        <div className="sm-level" style={{ color: c.color }}>{c.label}</div>
        <div className="sm-sub">{c.sub}</div>
        <div className="sm-track">
          <div className="sm-fill" style={{ width:`${c.pct}%`, background:c.bar, boxShadow:c.pct>0?`0 0 10px ${c.bar}70`:"none" }} />
        </div>
        <div className="sm-segs">
          {Array.from({length:10}).map((_,i) => (
            <div key={i} className="sm-seg"
              style={{ background: i < lit && c.lit ? SEG_CLASS[c.lit] : undefined }} />
          ))}
        </div>
        <div className="sm-scale"><span>Calm</span><span>Moderate</span><span>Critical</span></div>

        {level === "CRISIS" && (
          <div className="crisis-alert">
            <div className="crisis-alert-title">🆘 Reach out right now</div>
            <div className="crisis-alert-body">
              iCall: <strong>9152987821</strong><br />
              Vandrevala: <strong>1860-2662-345</strong>
            </div>
          </div>
        )}

        <div className="sm-stats">
          <div className="sm-stat"><div className="sm-stat-val">{analysisCount}</div><div className="sm-stat-lbl">Sessions</div></div>
          <div className="sm-stat"><div className="sm-stat-val" style={{ color:trendCol }}>{trendIcon}</div><div className="sm-stat-lbl">Trend</div></div>
        </div>
      </div>
    </div>
  );
}
