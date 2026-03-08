import React, { useEffect, useRef, useState } from "react";
import Navbar from "./Navbar";

// ─── Animated SVG DB/Pipeline Diagram (inline, no deps) ───────────────────────
function PipelineDiagram() {
  const [animStep, setAnimStep] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setAnimStep(s => (s + 1) % 4), 1400);
    return () => clearInterval(t);
  }, []);

  const paths = [
    "M 31 10 v 15 q 0 5 5 5 h 59 q 5 0 5 5 v 10",
    "M 77 10 v 10 q 0 5 5 5 h 13 q 5 0 5 5 v 10",
    "M 124 10 v 10 q 0 5 -5 5 h -14 q -5 0 -5 5 v 10",
    "M 170 10 v 15 q 0 5 -5 5 h -60 q -5 0 -5 5 v 10",
  ];
  const labels = ["ML-DSA", "Upload", "BM25", "RAG+LLM"];
  const labelX = [14, 60, 108, 150];

  return (
    <div style={{ position: "relative", width: "100%", maxWidth: 520, margin: "0 auto" }}>
      <style>{`
        @keyframes db-travel {
          0%   { offset-distance: 0%; opacity: 0; }
          8%   { opacity: 1; }
          85%  { opacity: 1; }
          100% { offset-distance: 100%; opacity: 0; }
        }
        .db-dot { animation: db-travel 2.8s cubic-bezier(0,0,0.2,1) infinite; offset-anchor: center; }
        .db-dot-1 { offset-path: path("M 31 10 v 15 q 0 5 5 5 h 59 q 5 0 5 5 v 25"); animation-delay: 0s; }
        .db-dot-2 { offset-path: path("M 77 10 v 10 q 0 5 5 5 h 13 q 5 0 5 5 v 25"); animation-delay: 0.7s; }
        .db-dot-3 { offset-path: path("M 124 10 v 10 q 0 5 -5 5 h -14 q -5 0 -5 5 v 25"); animation-delay: 1.4s; }
        .db-dot-4 { offset-path: path("M 170 10 v 15 q 0 5 -5 5 h -60 q -5 0 -5 5 v 25"); animation-delay: 2.1s; }
      `}</style>

      <svg width="100%" viewBox="0 0 200 110" style={{ overflow: "visible" }}>
        {/* Connector paths */}
        <g stroke="rgba(255,255,255,0.1)" fill="none" strokeWidth="0.5">
          {paths.map((d, i) => <path key={i} d={d} />)}
        </g>

        {/* Active path highlight */}
        <g stroke="rgba(14,165,233,0.35)" fill="none" strokeWidth="0.5">
          <path d={paths[animStep]} />
        </g>

        {/* Travelling dots */}
        <defs>
          <radialGradient id="dot-grad" fx="0.5" fy="0.5">
            <stop offset="0%" stopColor="#38bdf8" />
            <stop offset="100%" stopColor="transparent" />
          </radialGradient>
        </defs>
        {[1,2,3,4].map(i => (
          <circle key={i} className={`db-dot db-dot-${i}`} cx="0" cy="0" r="5" fill="url(#dot-grad)" />
        ))}

        {/* Source badges */}
        {labels.map((label, i) => (
          <g key={i}>
            <rect
              x={labelX[i]} y="3" width="36" height="11"
              fill={animStep === i ? "rgba(14,165,233,0.18)" : "#0e1320"}
              stroke={animStep === i ? "rgba(14,165,233,0.6)" : "rgba(255,255,255,0.12)"}
              strokeWidth="0.4"
            />
            <text x={labelX[i] + 18} y="10.5" fill={animStep === i ? "#38bdf8" : "rgba(200,220,255,0.55)"}
              stroke="none" fontSize="4.2" fontWeight="600" textAnchor="middle"
              fontFamily="'DM Mono', monospace">{label}</text>
          </g>
        ))}

        {/* Central box */}
        <g>
          <rect x="60" y="50" width="80" height="40"
            fill="#080c18" stroke="rgba(14,165,233,0.25)" strokeWidth="0.6" />
          {/* Inner glow rings */}
          <ellipse cx="100" cy="90" rx="28" ry="10" fill="none" stroke="rgba(14,165,233,0.08)" strokeWidth="0.5"/>
          <ellipse cx="100" cy="90" rx="20" ry="7" fill="none" stroke="rgba(14,165,233,0.12)" strokeWidth="0.5"/>
          {/* Label inside box */}
          <text x="100" y="67" fill="#38bdf8" stroke="none" fontSize="5" fontWeight="700"
            textAnchor="middle" fontFamily="'DM Mono', monospace">HealthSentinel</text>
          <text x="100" y="74" fill="rgba(160,200,240,0.5)" stroke="none" fontSize="3.5"
            textAnchor="middle" fontFamily="'DM Mono', monospace">POST-QUANTUM · RAG · REDIS</text>
          {/* Divider */}
          <line x1="68" y1="78" x2="132" y2="78" stroke="rgba(255,255,255,0.07)" strokeWidth="0.4"/>
          {/* Status badges */}
          <rect x="68" y="81" width="26" height="6" fill="rgba(16,185,129,0.15)" stroke="rgba(16,185,129,0.4)" strokeWidth="0.4"/>
          <text x="81" y="85.5" fill="#10b981" stroke="none" fontSize="3.2" textAnchor="middle" fontFamily="'DM Mono', monospace">SECURE</text>
          <rect x="97" y="81" width="26" height="6" fill="rgba(14,165,233,0.12)" stroke="rgba(14,165,233,0.4)" strokeWidth="0.4"/>
          <text x="110" y="85.5" fill="#38bdf8" stroke="none" fontSize="3.2" textAnchor="middle" fontFamily="'DM Mono', monospace">LOCAL AI</text>
        </g>
      </svg>
    </div>
  );
}

// ─── Scroll-reveal wrapper ─────────────────────────────────────────────────────
function Reveal({ children, delay = 0 }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.15 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return (
    <div ref={ref} style={{
      opacity: visible ? 1 : 0,
      transform: visible ? "translateY(0)" : "translateY(20px)",
      transition: `opacity 0.6s ${delay}s ease, transform 0.6s ${delay}s ease`,
    }}>
      {children}
    </div>
  );
}

// ─── Section label ─────────────────────────────────────────────────────────────
function SectionLabel({ children }) {
  return (
    <p style={{
      fontFamily: "'DM Mono', monospace", fontSize: "10px", color: "#0ea5e9",
      letterSpacing: "0.14em", textTransform: "uppercase", fontWeight: 500, marginBottom: "12px",
    }}>{children}</p>
  );
}

// ─── Main About ────────────────────────────────────────────────────────────────
export default function About() {
  const stack = [
    { name: "ML-DSA / Dilithium", role: "Post-quantum digital signatures (NIST PQC)", color: "#38bdf8", icon: "⚛" },
    { name: "Ollama", role: "100% local LLM inference — no external API", color: "#6366f1", icon: "🤖" },
    { name: "BM25 + RAG", role: "Sparse retrieval + context-aware generation", color: "#10b981", icon: "🔍" },
    { name: "Redis", role: "Intelligent query caching — 300× speedup", color: "#f59e0b", icon: "⚡" },
    { name: "AWS S3", role: "Encrypted, isolated document storage", color: "#ef4444", icon: "☁" },
    { name: "Supabase + JWT", role: "Clinician-level auth with row-level security", color: "#0ea5e9", icon: "🛡" },
  ];

  const pillars = [
    {
      num: "01",
      title: "Quantum-Resistant Security",
      body: "HealthSentinel uses ML-DSA (Module Lattice Digital Signature Algorithm), standardized by NIST in 2024, to sign every document upload. Unlike RSA or ECDSA — which quantum computers will break — ML-DSA is mathematically secure against Shor's algorithm.",
      color: "#38bdf8",
    },
    {
      num: "02",
      title: "On-Premise AI Inference",
      body: "No patient data is ever sent to OpenAI, Anthropic, or any external provider. Ollama runs the LLM entirely within your hospital network. Every query, every response — fully air-gapped from the public internet.",
      color: "#10b981",
    },
    {
      num: "03",
      title: "Intelligent Document Retrieval",
      body: "Clinical documents are tokenized and indexed using BM25 sparse retrieval. When a clinician asks a question, the top-k relevant document chunks are pulled and injected into the LLM context — this is Retrieval-Augmented Generation (RAG).",
      color: "#6366f1",
    },
    {
      num: "04",
      title: "Sub-200ms Cached Responses",
      body: "Redis caches query-response pairs using a content-hash key. Identical or near-identical queries return in 70–150ms instead of the 20–26 second LLM inference time — a 300× improvement measured under Autocannon load testing.",
      color: "#f59e0b",
    },
  ];

  const timeline = [
    { year: "2024", event: "NIST standardizes ML-DSA (FIPS 204) — Dilithium becomes the official PQC signature scheme" },
    { year: "2024", event: "HealthSentinel prototype: BM25 + Ollama + ML-DSA integrated in a single pipeline" },
    { year: "2025", event: "Redis caching layer added — 409 requests/60s validated under Autocannon load test" },
    { year: "2025", event: "AWS S3 + Supabase auth integrated — production-grade user isolation deployed" },
  ];

  return (
    <div style={{
      minHeight: "100vh", background: "#050810",
      color: "#e8eeff", fontFamily: "'DM Sans', system-ui, sans-serif",
      overflowX: "hidden",
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700&family=DM+Serif+Display:ital@0;1&family=DM+Mono:wght@400;500;600&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        @keyframes pulse { 0%,100%{opacity:1}50%{opacity:0.35} }
        @keyframes fadeUp { from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)} }

        .stack-card {
          background: rgba(255,255,255,0.025);
          border: 1px solid rgba(255,255,255,0.07);
          padding: 22px 20px;
          transition: all 0.22s;
        }
        .stack-card:hover {
          background: rgba(255,255,255,0.045);
          border-color: rgba(14,165,233,0.22);
          transform: translateY(-2px);
        }

        .pillar-card {
          background: rgba(255,255,255,0.02);
          border: 1px solid rgba(255,255,255,0.06);
          border-left-width: 3px;
          padding: 28px;
          transition: background 0.2s;
        }
        .pillar-card:hover { background: rgba(255,255,255,0.04); }

        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: #050810; }
        ::-webkit-scrollbar-thumb { background: rgba(14,165,233,0.25); }
      `}</style>

      <Navbar />

      {/* ── PAGE HEADER ─────────────────────────────────────────────────── */}
      <section style={{
        position: "relative", borderBottom: "1px solid rgba(255,255,255,0.06)",
        padding: "120px 48px 80px", overflow: "hidden",
      }}>
        {/* Background grid */}
        <div style={{
          position: "absolute", inset: 0,
          backgroundImage: "linear-gradient(rgba(14,165,233,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(14,165,233,0.03) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
        }} />
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 70% 60% at 20% 50%, rgba(14,165,233,0.06) 0%, transparent 65%)" }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to right, transparent 55%, #050810 100%)" }} />

        <div style={{ maxWidth: "1100px", margin: "0 auto", position: "relative", zIndex: 1 }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "80px", alignItems: "center" }}>
            {/* Left — text */}
            <div>
              <div style={{
                display: "inline-flex", alignItems: "center", gap: "8px",
                border: "1px solid rgba(14,165,233,0.35)", background: "rgba(14,165,233,0.1)",
                padding: "5px 14px 5px 10px", fontSize: "11px",
                fontFamily: "'DM Mono', monospace", fontWeight: 500, color: "#38bdf8",
                letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: "28px",
                animation: "fadeUp 0.7s ease both",
              }}>
                <span style={{ width: 7, height: 7, background: "#10b981", display: "inline-block", animation: "pulse 2.5s infinite" }} />
                About the Platform
              </div>

              <h1 style={{
                fontFamily: "'DM Serif Display', Georgia, serif",
                fontSize: "clamp(36px, 5vw, 62px)",
                fontWeight: 400, lineHeight: 1.06, letterSpacing: "-0.025em",
                color: "#f0f6ff", marginBottom: "20px",
                animation: "fadeUp 0.7s 0.1s ease both",
              }}>
                Why HealthSentinel<br />
                <em style={{ fontStyle: "italic", color: "#38bdf8" }}>exists.</em>
              </h1>

              <p style={{
                fontFamily: "'DM Sans', sans-serif", fontSize: "15px",
                fontWeight: 400, color: "rgba(200,220,255,0.65)", lineHeight: 1.85,
                maxWidth: "460px", marginBottom: "20px",
                animation: "fadeUp 0.7s 0.18s ease both",
              }}>
                Healthcare systems manage the most sensitive data on earth — yet AI platforms for medicine still send patient records to external APIs and sign documents with cryptography that quantum computers will break within the decade.
              </p>
              <p style={{
                fontFamily: "'DM Sans', sans-serif", fontSize: "15px",
                fontWeight: 400, color: "rgba(200,220,255,0.65)", lineHeight: 1.85,
                maxWidth: "460px",
                animation: "fadeUp 0.7s 0.24s ease both",
              }}>
                HealthSentinel was built to fix this — combining NIST-standardized post-quantum cryptography, fully local LLM inference, and BM25 + RAG retrieval into a single clinical-grade platform.
              </p>
            </div>

            {/* Right — animated diagram */}
            <div style={{ animation: "fadeUp 0.8s 0.3s ease both" }}>
              <div style={{
                background: "rgba(5,8,16,0.8)", border: "1px solid rgba(14,165,233,0.18)",
                padding: "28px 24px 20px",
              }}>
                <div style={{
                  fontFamily: "'DM Mono', monospace", fontSize: "9px",
                  color: "rgba(14,165,233,0.5)", letterSpacing: "0.14em",
                  textTransform: "uppercase", marginBottom: "16px",
                }}>Live pipeline visualization</div>
                <PipelineDiagram />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── MISSION NUMBERS ─────────────────────────────────────────────── */}
      <section style={{ borderBottom: "1px solid rgba(255,255,255,0.05)", background: "rgba(0,0,0,0.2)" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: "1px", background: "rgba(255,255,255,0.05)" }}>
          {[
            { value: "NIST", sub: "FIPS 204 compliant", label: "Standard", color: "#38bdf8" },
            { value: "300×", sub: "query speed improvement", label: "Redis Cache", color: "#10b981" },
            { value: "0", sub: "external API calls made", label: "Data Leakage", color: "#6366f1" },
            { value: "100%", sub: "on-premise LLM inference", label: "Local AI", color: "#f59e0b" },
          ].map((m, i) => (
            <Reveal key={i} delay={i * 0.08}>
              <div style={{ background: "#050810", padding: "32px 24px", textAlign: "center", borderBottom: `2px solid ${m.color}` }}>
                <div style={{ fontFamily: "'DM Serif Display', Georgia, serif", fontSize: "clamp(28px,3.5vw,40px)", fontWeight: 400, color: m.color, letterSpacing: "-0.02em", lineHeight: 1 }}>{m.value}</div>
                <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "11px", fontWeight: 700, color: "rgba(200,220,255,0.55)", marginTop: "8px", textTransform: "uppercase", letterSpacing: "0.06em" }}>{m.label}</div>
                <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "12px", color: "rgba(120,140,180,0.45)", marginTop: "4px" }}>{m.sub}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── FOUR PILLARS ────────────────────────────────────────────────── */}
      <section style={{ padding: "88px 48px", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <Reveal>
            <SectionLabel>Core Principles</SectionLabel>
            <h2 style={{ fontFamily: "'DM Serif Display', Georgia, serif", fontSize: "clamp(26px,4vw,42px)", fontWeight: 400, lineHeight: 1.1, letterSpacing: "-0.02em", color: "#f0f6ff", marginBottom: "48px" }}>
              Four pillars of clinical-grade AI.
            </h2>
          </Reveal>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1px", background: "rgba(255,255,255,0.05)" }}>
            {pillars.map((p, i) => (
              <Reveal key={i} delay={i * 0.08}>
                <div className="pillar-card" style={{ borderLeftColor: p.color, background: "#050810" }}>
                  <div style={{ display: "flex", alignItems: "baseline", gap: "12px", marginBottom: "14px" }}>
                    <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "11px", color: p.color, fontWeight: 700, letterSpacing: "0.06em" }}>{p.num}</span>
                    <h3 style={{ fontFamily: "'DM Serif Display', Georgia, serif", fontSize: "18px", fontWeight: 400, color: "#f0f6ff", letterSpacing: "-0.01em" }}>{p.title}</h3>
                  </div>
                  <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "13.5px", color: "rgba(180,200,240,0.55)", lineHeight: 1.8 }}>{p.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── TECH STACK ──────────────────────────────────────────────────── */}
      <section style={{ padding: "88px 48px", borderBottom: "1px solid rgba(255,255,255,0.05)", background: "rgba(0,0,0,0.18)" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <Reveal>
            <SectionLabel>Technology Stack</SectionLabel>
            <h2 style={{ fontFamily: "'DM Serif Display', Georgia, serif", fontSize: "clamp(26px,4vw,42px)", fontWeight: 400, lineHeight: 1.1, letterSpacing: "-0.02em", color: "#f0f6ff", marginBottom: "48px" }}>
              Every layer chosen for<br /><em style={{ fontStyle: "italic", color: "rgba(180,200,240,0.4)" }}>clinical trust.</em>
            </h2>
          </Reveal>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px,1fr))", gap: "1px", background: "rgba(255,255,255,0.05)" }}>
            {stack.map((s, i) => (
              <Reveal key={i} delay={i * 0.07}>
                <div className="stack-card" style={{ background: "#050810" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "14px", marginBottom: "10px" }}>
                    <div style={{ width: 40, height: 40, background: `${s.color}12`, border: `1px solid ${s.color}25`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "18px", flexShrink: 0 }}>{s.icon}</div>
                    <div>
                      <div style={{ fontFamily: "'DM Serif Display', Georgia, serif", fontSize: "16px", fontWeight: 400, color: "#f0f6ff", letterSpacing: "-0.01em" }}>{s.name}</div>
                      <div style={{ fontFamily: "'DM Mono', monospace", fontSize: "9px", color: s.color, letterSpacing: "0.07em", textTransform: "uppercase", marginTop: "2px", opacity: 0.8 }}>Active</div>
                    </div>
                  </div>
                  <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "13px", color: "rgba(160,180,220,0.55)", lineHeight: 1.75 }}>{s.role}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── TIMELINE ────────────────────────────────────────────────────── */}
      <section style={{ padding: "88px 48px", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "80px", alignItems: "start" }}>
            <Reveal>
              <div>
                <SectionLabel>Development Timeline</SectionLabel>
                <h2 style={{ fontFamily: "'DM Serif Display', Georgia, serif", fontSize: "clamp(26px,4vw,42px)", fontWeight: 400, lineHeight: 1.1, letterSpacing: "-0.02em", color: "#f0f6ff", marginBottom: "16px" }}>
                  Built on the shoulders<br /><em style={{ fontStyle: "italic", color: "#38bdf8" }}>of NIST.</em>
                </h2>
                <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "14px", color: "rgba(180,200,240,0.55)", lineHeight: 1.85 }}>
                  The timeline of HealthSentinel is inseparable from NIST's Post-Quantum Cryptography standardization effort. When NIST finalized ML-DSA (FIPS 204) in 2024, the cryptographic foundation became available to build on.
                </p>
              </div>
            </Reveal>
            <div style={{ display: "flex", flexDirection: "column", gap: "0" }}>
              {timeline.map((t, i) => (
                <Reveal key={i} delay={i * 0.1}>
                  <div style={{ display: "flex", gap: "20px", paddingBottom: i < timeline.length - 1 ? "0" : "0" }}>
                    {/* Timeline spine */}
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", flexShrink: 0 }}>
                      <div style={{ width: 10, height: 10, background: "#0ea5e9", flexShrink: 0, marginTop: "4px", boxShadow: "0 0 8px rgba(14,165,233,0.5)" }} />
                      {i < timeline.length - 1 && <div style={{ width: 1, flex: 1, background: "rgba(14,165,233,0.15)", minHeight: "40px" }} />}
                    </div>
                    {/* Content */}
                    <div style={{ paddingBottom: "28px" }}>
                      <div style={{ fontFamily: "'DM Mono', monospace", fontSize: "10px", color: "#38bdf8", letterSpacing: "0.1em", fontWeight: 600, marginBottom: "6px" }}>{t.year}</div>
                      <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "13.5px", color: "rgba(180,200,240,0.6)", lineHeight: 1.75 }}>{t.event}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── RESEARCH SECTION ────────────────────────────────────────────── */}
      <section style={{ padding: "88px 48px", borderBottom: "1px solid rgba(255,255,255,0.05)", background: "rgba(0,0,0,0.18)" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "64px", alignItems: "start" }}>
            <Reveal>
              <div>
                <SectionLabel>Research Contribution</SectionLabel>
                <h2 style={{ fontFamily: "'DM Serif Display', Georgia, serif", fontSize: "clamp(24px,3.5vw,38px)", fontWeight: 400, lineHeight: 1.12, letterSpacing: "-0.02em", color: "#f0f6ff", marginBottom: "16px" }}>
                  Validated under load.<br /><em style={{ fontStyle: "italic", color: "#38bdf8" }}>Not just designed.</em>
                </h2>
                <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "14px", color: "rgba(180,200,240,0.55)", lineHeight: 1.85, marginBottom: "24px" }}>
                  The performance of the Redis caching layer was validated using Autocannon, an HTTP benchmarking tool. The test ran 409 requests over 60 seconds against the /query endpoint.
                </p>
                <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "14px", color: "rgba(180,200,240,0.55)", lineHeight: 1.85 }}>
                  The median cache-hit latency of 83ms versus 20–26 seconds cold inference represents a real-world improvement of approximately 300× — measurably significant for clinical workflows where query response time directly affects patient care speed.
                </p>
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <div style={{ display: "flex", flexDirection: "column", gap: "1px", background: "rgba(255,255,255,0.05)" }}>
                {[
                  { label: "Benchmark Tool", value: "Autocannon", color: "#38bdf8" },
                  { label: "Test Duration", value: "60 seconds", color: "#10b981" },
                  { label: "Total Requests", value: "409", color: "#6366f1" },
                  { label: "Cache Hit Latency (p50)", value: "83ms", color: "#f59e0b" },
                  { label: "Cache Miss Latency", value: "20–26 seconds", color: "#ef4444" },
                  { label: "Throughput (cached)", value: "6.8 req/s", color: "#38bdf8" },
                  { label: "Speed Improvement", value: "~300×", color: "#10b981" },
                ].map((row, i) => (
                  <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "13px 20px", background: i % 2 === 0 ? "#050810" : "rgba(255,255,255,0.02)", borderBottom: i < 6 ? "1px solid rgba(255,255,255,0.04)" : "none" }}>
                    <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "13px", color: "rgba(160,180,220,0.55)", fontWeight: 500 }}>{row.label}</span>
                    <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "13px", color: row.color, fontWeight: 600 }}>{row.value}</span>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── CTA STRIP ───────────────────────────────────────────────────── */}
      <section style={{ padding: "72px 48px" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <div style={{ position: "relative", background: "#080c18", border: "1px solid rgba(255,255,255,0.07)", padding: "56px 48px", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "24px", overflow: "hidden" }}>
            {/* Ambient gradient */}
            <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 60% 80% at 10% 50%, rgba(14,165,233,0.07), transparent)" }} />
            <div style={{ position: "relative", zIndex: 1 }}>
              <h2 style={{ fontFamily: "'DM Serif Display', Georgia, serif", fontSize: "clamp(22px,3vw,34px)", fontWeight: 400, color: "#f0f6ff", letterSpacing: "-0.02em", marginBottom: "8px" }}>
                Ready to secure your clinical workflow?
              </h2>
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "14px", color: "rgba(160,180,220,0.55)" }}>
                Upload documents, query with AI, rest easy — quantum-proof, fully local.
              </p>
            </div>
            <div style={{ position: "relative", zIndex: 1, display: "flex", gap: "12px", flexShrink: 0 }}>
              <a href="/signup" style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "#0ea5e9", color: "#fff", border: "none", padding: "12px 24px", fontFamily: "'DM Sans', sans-serif", fontSize: "14px", fontWeight: 600, cursor: "pointer", textDecoration: "none", transition: "background 0.2s" }}>
                Get Started →
              </a>
              <a href="/" style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "transparent", color: "rgba(200,220,255,0.65)", border: "1px solid rgba(255,255,255,0.12)", padding: "12px 24px", fontFamily: "'DM Sans', sans-serif", fontSize: "14px", fontWeight: 500, cursor: "pointer", textDecoration: "none", transition: "all 0.2s" }}>
                Back to Home
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── FOOTER ──────────────────────────────────────────────────────── */}
      <footer style={{ padding: "28px 48px", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "16px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <div style={{ width: 22, height: 22, background: "linear-gradient(135deg,#0ea5e9,#6366f1)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <svg width="10" height="10" viewBox="0 0 20 20" fill="none"><path d="M10 3v14M3 10h14" stroke="#fff" strokeWidth="2.5" strokeLinecap="round"/></svg>
            </div>
            <span style={{ fontFamily: "'DM Serif Display', Georgia, serif", fontSize: "14px", color: "rgba(200,220,255,0.55)" }}>HealthSentinel</span>
            <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "12px", color: "rgba(120,140,180,0.3)" }}>· Post-Quantum Healthcare AI</span>
          </div>
          <div style={{ display: "flex", gap: "24px" }}>
            {["ML-DSA", "Ollama", "BM25", "Redis", "AWS S3", "Supabase"].map(t => (
              <span key={t} style={{ fontFamily: "'DM Mono', monospace", fontSize: "10px", color: "rgba(14,165,233,0.22)", letterSpacing: "0.06em" }}>{t}</span>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}