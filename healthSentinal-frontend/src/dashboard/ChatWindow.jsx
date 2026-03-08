// import React, { useState } from "react";
// import { askQuery } from "../api/queryApi";
// import {
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   Tooltip,
//   ResponsiveContainer
// } from "recharts";

// const ChatWindow = () => {

//   const [query, setQuery] = useState("");
//   const [answer, setAnswer] = useState("");
//   const [documents, setDocuments] = useState([]);
//   const [loading, setLoading] = useState(false);

//   const ask = async () => {

//     if (!query) return;

//     setLoading(true);

//     try {

//       const res = await askQuery(query);

//       setAnswer(res.answer || "");

//       const docs = res.documents || [];

//       setDocuments(docs);

//     } catch (err) {

//       console.error("Query failed", err);

//     } finally {

//       setLoading(false);

//     }

//   };

//   const chartData = documents.map((doc, index) => ({
//     name: `Doc ${index + 1}`,
//     length: doc.length
//   }));

//   return (

//     <div className="p-8 text-white h-full flex flex-col gap-6">

//       <h2 className="text-2xl font-semibold">Chat With Documents</h2>

//       {/* Query input */}

//       <div className="flex gap-4">

//         <input
//           className="flex-1 p-3 bg-black border border-gray-700 rounded"
//           value={query}
//           onChange={(e) => setQuery(e.target.value)}
//           placeholder="Ask something..."
//         />

//         <button
//           onClick={ask}
//           className="bg-green-600 px-6 py-2 rounded"
//         >
//           Ask
//         </button>

//       </div>

//       {loading && (
//         <div className="text-gray-400">Processing query...</div>
//       )}

//       {/* Answer section */}

//       {answer && (

//         <div className="bg-black border border-gray-800 p-6 rounded">

//           <h3 className="text-lg mb-3 text-green-400">Answer</h3>

//           <p className="text-gray-200 whitespace-pre-wrap">
//             {answer}
//           </p>

//         </div>

//       )}

//       {/* Retrieval visualization */}

//       {documents.length > 0 && (

//         <div className="bg-black border border-gray-800 p-6 rounded">

//           <h3 className="text-lg mb-4 text-blue-400">
//             Retrieved Documents Visualization
//           </h3>

//           <div style={{ width: "100%", height: 300 }}>

//             <ResponsiveContainer>

//               <BarChart data={chartData}>

//                 <XAxis dataKey="name" stroke="#aaa" />

//                 <YAxis stroke="#aaa" />

//                 <Tooltip />

//                 <Bar dataKey="length" fill="#3b82f6" />

//               </BarChart>

//             </ResponsiveContainer>

//           </div>

//         </div>

//       )}

//       {/* Documents preview */}

//       {documents.length > 0 && (

//         <div className="bg-black border border-gray-800 p-6 rounded">

//           <h3 className="text-lg mb-4 text-yellow-400">
//             Retrieved Documents
//           </h3>

//           <div className="grid gap-4">

//             {documents.map((doc, index) => (

//               <div
//                 key={index}
//                 className="border border-gray-700 p-4 rounded bg-gray-900"
//               >

//                 <div className="text-sm text-gray-400 mb-2">
//                   Document {index + 1}
//                 </div>

//                 <pre className="text-sm whitespace-pre-wrap text-gray-200">
//                   {doc.slice(0, 800)}
//                 </pre>

//               </div>

//             ))}

//           </div>

//         </div>

//       )}

//     </div>

//   );

// };

// export default ChatWindow;
import React, { useState, useRef, useEffect } from "react";
import { askQuery } from "../api/queryApi";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell
} from "recharts";

const ChatWindow = () => {
  const [query, setQuery] = useState("");
  const [answer, setAnswer] = useState("");
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [expandedDoc, setExpandedDoc] = useState(null);
  const answerRef = useRef(null);

  const ask = async () => {
    if (!query) return;
    setLoading(true);
    try {
      const res = await askQuery(query);
      setAnswer(res.answer || "");
      const docs = res.documents || [];
      setDocuments(docs);
      setExpandedDoc(null);
    } catch (err) {
      console.error("Query failed", err);
    } finally {
      setLoading(false);
    }
  };

  const handleKey = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      ask();
    }
  };

  useEffect(() => {
    if (answer && answerRef.current) {
      answerRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [answer]);

  const chartData = documents.map((doc, index) => ({
    name: `Doc ${index + 1}`,
    length: doc.length,
  }));

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div style={{
          background: "#080c18", border: "1px solid rgba(14,165,233,0.3)",
          padding: "10px 14px", fontFamily: "'DM Mono', monospace",
        }}>
          <p style={{ fontSize: 10, color: "#38bdf8", letterSpacing: "0.08em", marginBottom: 4 }}>{label}</p>
          <p style={{ fontSize: 13, color: "#f0f6ff" }}>{payload[0].value.toLocaleString()} chars</p>
        </div>
      );
    }
    return null;
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600&family=DM+Serif+Display:ital@0;1&family=DM+Mono:wght@400;500;600&display=swap');

        .hs-chat-root {
          min-height: 100vh;
          background: #050810;
          color: #e8eeff;
          font-family: 'DM Sans', system-ui, sans-serif;
          display: flex;
          flex-direction: column;
          position: relative;
          overflow-x: hidden;
        }

        .hs-chat-root::before {
          content: '';
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(rgba(14,165,233,0.025) 1px, transparent 1px),
            linear-gradient(90deg, rgba(14,165,233,0.025) 1px, transparent 1px);
          background-size: 48px 48px;
          pointer-events: none;
          z-index: 0;
        }

        /* ── PAGE HEADER ── */
        .hs-chat-header {
          position: relative;
          z-index: 1;
          padding: 48px 56px 40px;
          border-bottom: 1px solid rgba(255,255,255,0.05);
          background: rgba(5,8,16,0.9);
        }

        .hs-chat-eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          border: 1px solid rgba(14,165,233,0.3);
          background: rgba(14,165,233,0.08);
          padding: 5px 14px 5px 10px;
          font-family: 'DM Mono', monospace;
          font-size: 10px;
          font-weight: 500;
          color: #38bdf8;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          margin-bottom: 20px;
        }

        .hs-eyebrow-dot {
          width: 7px; height: 7px;
          background: #10b981;
          border-radius: 50%;
          animation: hs-pulse 2.5s infinite;
          box-shadow: 0 0 6px rgba(16,185,129,0.5);
        }

        @keyframes hs-pulse { 0%,100%{opacity:1} 50%{opacity:0.3} }
        @keyframes hs-fade-up { from{opacity:0;transform:translateY(10px)} to{opacity:1;transform:translateY(0)} }
        @keyframes hs-spin { to{transform:rotate(360deg)} }
        @keyframes hs-blink { 0%,100%{opacity:1} 50%{opacity:0} }

        .hs-chat-title {
          font-family: 'DM Serif Display', Georgia, serif;
          font-size: clamp(32px, 4vw, 48px);
          font-weight: 400;
          color: #f0f6ff;
          letter-spacing: -0.025em;
          line-height: 1.08;
          margin-bottom: 10px;
        }

        .hs-chat-title em { font-style: italic; color: #38bdf8; }

        .hs-chat-sub {
          font-family: 'DM Sans', sans-serif;
          font-size: 14px;
          color: rgba(180,200,240,0.5);
          line-height: 1.75;
          max-width: 560px;
        }

        /* ── QUERY AREA ── */
        .hs-query-area {
          position: relative;
          z-index: 1;
          padding: 32px 56px;
          border-bottom: 1px solid rgba(255,255,255,0.05);
          background: rgba(8,12,24,0.7);
        }

        .hs-query-label {
          font-family: 'DM Mono', monospace;
          font-size: 9px;
          color: rgba(14,165,233,0.45);
          letter-spacing: 0.14em;
          text-transform: uppercase;
          margin-bottom: 12px;
        }

        .hs-query-row {
          display: flex;
          gap: 0;
          border: 1px solid rgba(14,165,233,0.2);
          background: rgba(5,8,16,0.9);
          transition: border-color 0.2s;
        }

        .hs-query-row:focus-within {
          border-color: rgba(14,165,233,0.5);
          box-shadow: 0 0 24px rgba(14,165,233,0.08);
        }

        .hs-query-input {
          flex: 1;
          background: transparent;
          border: none;
          outline: none;
          padding: 18px 22px;
          font-family: 'DM Sans', sans-serif;
          font-size: 15px;
          color: #e8eeff;
          caret-color: #38bdf8;
        }

        .hs-query-input::placeholder {
          color: rgba(120,140,180,0.35);
          font-style: italic;
        }

        .hs-ask-btn {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 0 28px;
          background: #0ea5e9;
          border: none;
          color: #fff;
          font-family: 'DM Sans', sans-serif;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          transition: background 0.2s, box-shadow 0.2s;
          letter-spacing: 0.03em;
          flex-shrink: 0;
        }

        .hs-ask-btn:hover:not(:disabled) {
          background: #38bdf8;
          box-shadow: 0 0 24px rgba(14,165,233,0.25);
        }

        .hs-ask-btn:disabled { opacity: 0.45; cursor: not-allowed; }

        .hs-spinner {
          width: 15px; height: 15px;
          border: 2px solid rgba(255,255,255,0.3);
          border-top-color: #fff;
          border-radius: 50%;
          animation: hs-spin 0.7s linear infinite;
        }

        /* ── LOADING BAR ── */
        .hs-loading-bar {
          position: relative;
          z-index: 1;
          padding: 20px 56px;
          display: flex;
          align-items: center;
          gap: 16px;
          border-bottom: 1px solid rgba(255,255,255,0.04);
        }

        .hs-loading-track {
          flex: 1;
          height: 2px;
          background: rgba(255,255,255,0.05);
          overflow: hidden;
        }

        .hs-loading-fill {
          height: 100%;
          width: 40%;
          background: linear-gradient(90deg, transparent, #0ea5e9, transparent);
          animation: hs-loading 1.4s ease-in-out infinite;
        }

        @keyframes hs-loading {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(350%); }
        }

        .hs-loading-text {
          font-family: 'DM Mono', monospace;
          font-size: 10px;
          color: rgba(14,165,233,0.5);
          letter-spacing: 0.1em;
          text-transform: uppercase;
          white-space: nowrap;
        }

        /* ── CONTENT AREA ── */
        .hs-content {
          position: relative;
          z-index: 1;
          flex: 1;
          padding: 40px 56px 56px;
          display: flex;
          flex-direction: column;
          gap: 32px;
        }

        /* ── SECTION HEADER ── */
        .hs-section-head {
          display: flex;
          align-items: center;
          gap: 14px;
          margin-bottom: 18px;
        }

        .hs-section-num {
          font-family: 'DM Mono', monospace;
          font-size: 10px;
          color: #0ea5e9;
          font-weight: 700;
          letter-spacing: 0.08em;
        }

        .hs-section-title {
          font-family: 'DM Serif Display', Georgia, serif;
          font-size: 20px;
          font-weight: 400;
          color: #f0f6ff;
          letter-spacing: -0.01em;
        }

        .hs-section-count {
          margin-left: auto;
          font-family: 'DM Mono', monospace;
          font-size: 10px;
          color: rgba(14,165,233,0.4);
          letter-spacing: 0.08em;
        }

        /* ── ANSWER CARD ── */
        .hs-answer-card {
          border: 1px solid rgba(14,165,233,0.18);
          background: rgba(8,12,24,0.95);
          animation: hs-fade-up 0.4s ease;
        }

        .hs-answer-top {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 14px 22px;
          border-bottom: 1px solid rgba(255,255,255,0.04);
          background: rgba(14,165,233,0.04);
        }

        .hs-answer-badge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 3px 10px;
          background: rgba(14,165,233,0.1);
          border: 1px solid rgba(14,165,233,0.25);
          font-family: 'DM Mono', monospace;
          font-size: 9px;
          color: #38bdf8;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          font-weight: 600;
        }

        .hs-answer-badge-dot {
          width: 5px; height: 5px;
          background: #38bdf8;
          border-radius: 50%;
          box-shadow: 0 0 4px rgba(56,189,248,0.7);
        }

        .hs-answer-body {
          padding: 28px 28px 32px;
          font-family: 'DM Sans', sans-serif;
          font-size: 16px;
          color: rgba(210,225,255,0.85);
          line-height: 1.9;
          white-space: pre-wrap;
        }

        /* ── CHART CARD ── */
        .hs-chart-card {
          border: 1px solid rgba(255,255,255,0.06);
          background: rgba(8,12,24,0.9);
          animation: hs-fade-up 0.4s 0.1s ease both;
        }

        .hs-chart-inner {
          padding: 24px 28px 20px;
        }

        /* ── DOC GRID ── */
        .hs-doc-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
          gap: 1px;
          background: rgba(255,255,255,0.04);
          animation: hs-fade-up 0.4s 0.15s ease both;
        }

        .hs-doc-card {
          background: #050810;
          padding: 22px 24px;
          cursor: pointer;
          transition: background 0.18s;
          position: relative;
          border-left: 2px solid transparent;
        }

        .hs-doc-card:hover {
          background: rgba(14,165,233,0.04);
          border-left-color: rgba(14,165,233,0.3);
        }

        .hs-doc-card.expanded {
          background: rgba(14,165,233,0.06);
          border-left-color: #0ea5e9;
        }

        .hs-doc-card-head {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 12px;
        }

        .hs-doc-index {
          font-family: 'DM Mono', monospace;
          font-size: 10px;
          color: rgba(14,165,233,0.5);
          font-weight: 700;
          letter-spacing: 0.06em;
          background: rgba(14,165,233,0.08);
          border: 1px solid rgba(14,165,233,0.15);
          padding: 3px 8px;
          flex-shrink: 0;
        }

        .hs-doc-chars {
          font-family: 'DM Mono', monospace;
          font-size: 10px;
          color: rgba(120,140,180,0.45);
          letter-spacing: 0.05em;
        }

        .hs-doc-toggle {
          margin-left: auto;
          color: rgba(14,165,233,0.35);
          transition: transform 0.2s, color 0.2s;
        }

        .hs-doc-card.expanded .hs-doc-toggle {
          transform: rotate(180deg);
          color: #38bdf8;
        }

        .hs-doc-preview {
          font-family: 'DM Mono', monospace;
          font-size: 11.5px;
          color: rgba(160,180,220,0.55);
          line-height: 1.75;
          white-space: pre-wrap;
          word-break: break-word;
        }
      `}</style>

      <div className="hs-chat-root">

        {/* ── HEADER ── */}
        <div className="hs-chat-header">
          <div className="hs-chat-eyebrow">
            <span className="hs-eyebrow-dot" />
            RAG · BM25 Retrieval · Local LLM
          </div>
          <h1 className="hs-chat-title">
            Query your<br /><em>clinical records.</em>
          </h1>
          <p className="hs-chat-sub">
            Ask anything across your uploaded documents. BM25 retrieves the most relevant chunks, which are injected into a fully local LLM — zero external API calls.
          </p>
        </div>

        {/* ── QUERY BOX ── */}
        <div className="hs-query-area">
          <div className="hs-query-label">01 · Enter your query</div>
          <div className="hs-query-row">
            <input
              className="hs-query-input"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={handleKey}
              placeholder="e.g. What medications were prescribed in Q3?"
            />
            <button
              className="hs-ask-btn"
              onClick={ask}
              disabled={loading || !query.trim()}
            >
              {loading ? (
                <div className="hs-spinner" />
              ) : (
                <>
                  <svg width="14" height="14" viewBox="0 0 20 20" fill="none">
                    <path d="M10 3v14M3 10h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                  Ask
                </>
              )}
            </button>
          </div>
        </div>

        {/* ── LOADING STATE ── */}
        {loading && (
          <div className="hs-loading-bar">
            <span className="hs-loading-text">Retrieving · Inferring</span>
            <div className="hs-loading-track">
              <div className="hs-loading-fill" />
            </div>
          </div>
        )}

        {/* ── RESULTS ── */}
        {(answer || documents.length > 0) && (
          <div className="hs-content">

            {/* Answer */}
            {answer && (
              <div ref={answerRef}>
                <div className="hs-section-head">
                  <span className="hs-section-num">02</span>
                  <span className="hs-section-title">AI Answer</span>
                </div>
                <div className="hs-answer-card">
                  <div className="hs-answer-top">
                    <span className="hs-answer-badge">
                      <span className="hs-answer-badge-dot" />
                      Local LLM · Ollama
                    </span>
                  </div>
                  <div className="hs-answer-body">{answer}</div>
                </div>
              </div>
            )}

            {/* Chart */}
            {documents.length > 0 && (
              <div>
                <div className="hs-section-head">
                  <span className="hs-section-num">03</span>
                  <span className="hs-section-title">Retrieval Visualization</span>
                  <span className="hs-section-count">{documents.length} chunks retrieved</span>
                </div>
                <div className="hs-chart-card">
                  <div className="hs-chart-inner">
                    <div style={{ width: "100%", height: 220 }}>
                      <ResponsiveContainer>
                        <BarChart data={chartData} barCategoryGap="35%">
                          <XAxis
                            dataKey="name"
                            stroke="rgba(120,140,180,0.3)"
                            tick={{ fontFamily: "'DM Mono', monospace", fontSize: 10, fill: "rgba(120,140,180,0.5)" }}
                            axisLine={false}
                            tickLine={false}
                          />
                          <YAxis
                            stroke="rgba(120,140,180,0.3)"
                            tick={{ fontFamily: "'DM Mono', monospace", fontSize: 10, fill: "rgba(120,140,180,0.5)" }}
                            axisLine={false}
                            tickLine={false}
                          />
                          <Tooltip content={<CustomTooltip />} cursor={{ fill: "rgba(14,165,233,0.05)" }} />
                          <Bar dataKey="length" radius={0}>
                            {chartData.map((_, i) => (
                              <Cell
                                key={i}
                                fill={`rgba(14,165,233,${0.35 + (i / chartData.length) * 0.45})`}
                              />
                            ))}
                          </Bar>
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Document chunks */}
            {documents.length > 0 && (
              <div>
                <div className="hs-section-head">
                  <span className="hs-section-num">04</span>
                  <span className="hs-section-title">Retrieved Chunks</span>
                  <span className="hs-section-count">BM25 · top-k</span>
                </div>
                <div className="hs-doc-grid">
                  {documents.map((doc, index) => (
                    <div
                      key={index}
                      className={`hs-doc-card${expandedDoc === index ? " expanded" : ""}`}
                      onClick={() => setExpandedDoc(expandedDoc === index ? null : index)}
                    >
                      <div className="hs-doc-card-head">
                        <span className="hs-doc-index">DOC {String(index + 1).padStart(2, "0")}</span>
                        <span className="hs-doc-chars">{doc.length.toLocaleString()} chars</span>
                        <svg className="hs-doc-toggle" width="14" height="14" viewBox="0 0 20 20" fill="none">
                          <path d="M5 8l5 5 5-5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </div>
                      <pre className="hs-doc-preview">
                        {expandedDoc === index ? doc : doc.slice(0, 180) + (doc.length > 180 ? "…" : "")}
                      </pre>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>
        )}

        {/* ── EMPTY STATE ── */}
        {!answer && !loading && documents.length === 0 && (
          <div style={{
            flex: 1, display: "flex", flexDirection: "column",
            alignItems: "center", justifyContent: "center", gap: 16,
            position: "relative", zIndex: 1,
          }}>
            <div style={{
              width: 56, height: 56,
              background: "rgba(14,165,233,0.05)",
              border: "1px solid rgba(14,165,233,0.12)",
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <circle cx="11" cy="11" r="8" stroke="rgba(14,165,233,0.4)" strokeWidth="1.5"/>
                <path d="M21 21l-4.35-4.35" stroke="rgba(14,165,233,0.4)" strokeWidth="1.5" strokeLinecap="round"/>
                <path d="M11 8v6M8 11h6" stroke="rgba(14,165,233,0.4)" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            </div>
            <div style={{ fontFamily: "'DM Serif Display', Georgia, serif", fontSize: 20, color: "rgba(200,220,255,0.35)", letterSpacing: "-0.01em" }}>
              Ask your first question
            </div>
            <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, color: "rgba(120,140,180,0.3)", letterSpacing: "0.08em", textTransform: "uppercase" }}>
              BM25 retrieval · Local LLM inference
            </div>
          </div>
        )}

      </div>
    </>
  );
};

export default ChatWindow;