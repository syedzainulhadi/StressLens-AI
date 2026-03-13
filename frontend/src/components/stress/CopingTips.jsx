import React from "react";

const DEFAULT_RES = [
  { icon:"📞", name:"iCall",               desc:"Free counselling by trained professionals.",     contact:"9152987821"    },
  { icon:"💚", name:"Vandrevala Foundation",desc:"24/7 crisis support — free & confidential.",   contact:"1860-2662-345" },
  { icon:"💻", name:"YourDOST",             desc:"Online emotional wellness platform.",            contact:"yourdost.com"  },
];
const TECHS = [
  { icon:"🌬", bg:"rgba(14,240,212,0.07)",  name:"Box Breathing",          desc:"Inhale 4s → hold 4s → exhale 4s → hold 4s. Repeat 4×. Instantly calms your nervous system." },
  { icon:"🌿", bg:"rgba(82,201,138,0.07)",  name:"5-4-3-2-1 Grounding",   desc:"5 things you see, 4 hear, 3 feel, 2 smell, 1 taste. Anchors you to the present." },
  { icon:"🧘", bg:"rgba(201,168,76,0.07)",  name:"Progressive Relaxation", desc:"Tense then release each muscle group from feet upward. 5 seconds each." },
];

export default function CopingTips({ aiTip, resources, stressLevel }) {
  const isCrisis = stressLevel === "CRISIS";
  const hasAiRes = resources && resources.length > 0;

  return (
    <div className="rp-section">
      <div className="rp-section-hdr">
        <div className="rp-section-title">
          <div className="rp-section-title-dot" />
          Support & Resources
        </div>
      </div>
      <div className="rp-section-body stagger-3">

        {isCrisis && (
          <div className="crisis-banner">
            <div className="crisis-banner-title">🆘 Immediate support available</div>
            <div className="crisis-banner-body">You're not alone — reach out right now. These services are free, confidential, and available 24/7.</div>
            <div className="crisis-line">📞 iCall: <strong>9152987821</strong></div>
            <div className="crisis-line">📞 Vandrevala: <strong>1860-2662-345</strong></div>
          </div>
        )}

        {aiTip && (
          <div className="ai-tip-card">
            <div className="ai-tip-lbl">✦ Personalised for you</div>
            <div className="ai-tip-body">{aiTip}</div>
          </div>
        )}

        {hasAiRes ? (
          resources.map((r,i) => {
            const colon = r.indexOf(":");
            const name  = colon > 0 ? r.slice(0,colon).trim() : r;
            const desc  = colon > 0 ? r.slice(colon+1).trim() : "";
            return (
              <div key={i} className="res-item">
                <div className="res-icon">🔗</div>
                <div>
                  <div className="res-name">{name}</div>
                  {desc && <div className="res-desc">{desc}</div>}
                </div>
              </div>
            );
          })
        ) : (
          DEFAULT_RES.map((r,i) => (
            <div key={i} className="res-item">
              <div className="res-icon">{r.icon}</div>
              <div>
                <div className="res-name">{r.name}</div>
                <div className="res-desc">{r.desc}</div>
                <div className="res-contact">{r.contact}</div>
              </div>
            </div>
          ))
        )}

        <div style={{ height:"1px", background:"var(--border)", margin:"14px 0" }} />

        {TECHS.map((t,i) => (
          <div key={i} className="tech-item">
            <div className="tech-icon-wrap" style={{ background:t.bg }}>{t.icon}</div>
            <div>
              <div className="tech-name">{t.name}</div>
              <div className="tech-desc">{t.desc}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
