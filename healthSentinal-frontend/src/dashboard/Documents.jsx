// import React, { useEffect, useState } from "react";
// import Editor from "@monaco-editor/react";
// import {
//   listDocuments,
//   updateDocument,
//   deleteDocument
// } from "../api/documentApi";

// const S3_BASE = "https://health-sentinal-bucket.s3.amazonaws.com/";

// const Documents = () => {

//   const [docs, setDocs] = useState([]);
//   const [selectedDoc, setSelectedDoc] = useState(null);
//   const [content, setContent] = useState("");
//   const [signature, setSignature] = useState("");

//   useEffect(() => {
//     fetchDocs();
//   }, []);

//   const fetchDocs = async () => {
//     const data = await listDocuments();
//     setDocs(data);
//   };

//   const openDocument = async (doc) => {

//     try {

//       setSelectedDoc(doc);

//       const fileUrl = `${S3_BASE}${doc.s3_path}`;
//       const sigUrl = `${S3_BASE}${doc.signature_path}`;

//       const fileRes = await fetch(fileUrl);
//       const text = await fileRes.text();

//       const sigRes = await fetch(sigUrl);
//       const sigText = await sigRes.text();

//       setContent(text);
//       setSignature(sigText);

//     } catch (err) {
//       console.error("Failed to load document", err);
//     }

//   };

//   const handleUpdate = async () => {

//     if (!selectedDoc) return;

//     const blob = new Blob([content], { type: "text/plain" });
//     const file = new File([blob], selectedDoc.filename);

//     await updateDocument(selectedDoc.id, file);

//     alert("Document updated");

//     fetchDocs();

//   };

//   const handleDelete = async () => {

//     if (!selectedDoc) return;

//     if (!window.confirm("Delete this document?")) return;

//     await deleteDocument(selectedDoc.id);

//     setSelectedDoc(null);
//     setContent("");
//     setSignature("");

//     fetchDocs();

//   };

//   return (

//     <div className="flex h-screen bg-black text-white">

//       {/* DOCUMENT LIST */}

//       <div className="w-80 border-r border-gray-800 p-4 overflow-y-auto">

//         <h2 className="text-lg mb-4 font-semibold">Documents</h2>

//         {docs.map((doc) => (

//           <div
//             key={doc.id}
//             className="cursor-pointer p-3 mb-2 bg-gray-900 hover:bg-gray-800 rounded"
//             onClick={() => openDocument(doc)}
//           >

//             <div className="font-medium">{doc.filename}</div>

//             <div className="text-xs text-gray-400">
//               {new Date(doc.created_at).toLocaleString()}
//             </div>

//           </div>

//         ))}

//       </div>


//       {/* EDITOR AREA */}

//       <div className="flex-1 flex flex-col">

//         {selectedDoc ? (

//           <>

//             {/* ACTION BAR */}

//             <div className="flex gap-3 p-3 border-b border-gray-800">

//               <button
//                 onClick={handleUpdate}
//                 className="bg-blue-600 px-4 py-1 rounded"
//               >
//                 Update
//               </button>

//               <button
//                 onClick={handleDelete}
//                 className="bg-red-600 px-4 py-1 rounded"
//               >
//                 Delete
//               </button>

//               <div className="text-gray-400 ml-4">
//                 {selectedDoc.filename}
//               </div>

//             </div>


//             {/* EDITOR + SIGNATURE */}

//             <div className="flex flex-1">

//               {/* DOCUMENT EDITOR */}

//               <div className="flex-1 border-r border-gray-800">

//                 <Editor
//                   height="100%"
//                   theme="vs-dark"
//                   language="markdown"
//                   value={content}
//                   onChange={(v) => setContent(v)}
//                 />

//               </div>


//               {/* SIGNATURE VIEW */}

//               <div className="w-96 p-4 bg-gray-950 overflow-auto">

//                 <h3 className="mb-3 text-gray-300">Document Signature</h3>

//                 <pre className="text-xs text-green-400 break-all">
//                   {signature}
//                 </pre>

//               </div>

//             </div>

//           </>

//         ) : (

//           <div className="flex items-center justify-center h-full text-gray-500">
//             Select a document to view
//           </div>

//         )}

//       </div>

//     </div>

//   );

// };

// export default Documents;

import React, { useEffect, useState } from "react";
import Editor from "@monaco-editor/react";
import {
  listDocuments,
  updateDocument,
  deleteDocument
} from "../api/documentApi";

const S3_BASE = "https://health-sentinal-bucket.s3.amazonaws.com/";

const Documents = () => {
  const [docs, setDocs] = useState([]);
  const [selectedDoc, setSelectedDoc] = useState(null);
  const [content, setContent] = useState("");
  const [signature, setSignature] = useState("");

  useEffect(() => {
    fetchDocs();
  }, []);

  const fetchDocs = async () => {
    const data = await listDocuments();
    setDocs(data);
  };

  const openDocument = async (doc) => {
    try {
      setSelectedDoc(doc);
      const fileUrl = `${S3_BASE}${doc.s3_path}`;
      const sigUrl = `${S3_BASE}${doc.signature_path}`;
      const fileRes = await fetch(fileUrl);
      const text = await fileRes.text();
      const sigRes = await fetch(sigUrl);
      const sigText = await sigRes.text();
      setContent(text);
      setSignature(sigText);
    } catch (err) {
      console.error("Failed to load document", err);
    }
  };

  const handleUpdate = async () => {
    if (!selectedDoc) return;
    const blob = new Blob([content], { type: "text/plain" });
    const file = new File([blob], selectedDoc.filename);
    await updateDocument(selectedDoc.id, file);
    alert("Document updated");
    fetchDocs();
  };

  const handleDelete = async () => {
    if (!selectedDoc) return;
    if (!window.confirm("Delete this document?")) return;
    await deleteDocument(selectedDoc.id);
    setSelectedDoc(null);
    setContent("");
    setSignature("");
    fetchDocs();
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600&family=DM+Serif+Display:ital@0;1&family=DM+Mono:wght@400;500;600&display=swap');

        .hs-docs-root {
          display: flex;
          height: 100vh;
          background: #050810;
          color: #e8eeff;
          font-family: 'DM Sans', system-ui, sans-serif;
          position: relative;
          overflow: hidden;
        }

        /* Subtle background grid */
        .hs-docs-root::before {
          content: '';
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(rgba(14,165,233,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(14,165,233,0.03) 1px, transparent 1px);
          background-size: 48px 48px;
          pointer-events: none;
          z-index: 0;
        }

        /* ── SIDEBAR ── */
        .hs-sidebar {
          position: relative;
          z-index: 1;
          width: 280px;
          border-right: 1px solid rgba(255,255,255,0.06);
          display: flex;
          flex-direction: column;
          background: rgba(5,8,16,0.95);
          flex-shrink: 0;
        }

        .hs-sidebar-header {
          padding: 24px 20px 20px;
          border-bottom: 1px solid rgba(255,255,255,0.06);
        }

        .hs-sidebar-label {
          font-family: 'DM Mono', monospace;
          font-size: 9px;
          color: #0ea5e9;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          font-weight: 500;
          margin-bottom: 6px;
        }

        .hs-sidebar-title {
          font-family: 'DM Serif Display', Georgia, serif;
          font-size: 20px;
          font-weight: 400;
          color: #f0f6ff;
          letter-spacing: -0.02em;
        }

        .hs-doc-list {
          flex: 1;
          overflow-y: auto;
          padding: 12px;
        }

        .hs-doc-list::-webkit-scrollbar { width: 3px; }
        .hs-doc-list::-webkit-scrollbar-track { background: transparent; }
        .hs-doc-list::-webkit-scrollbar-thumb { background: rgba(14,165,233,0.2); }

        .hs-doc-item {
          cursor: pointer;
          padding: 14px 16px;
          margin-bottom: 2px;
          background: transparent;
          border: 1px solid transparent;
          transition: all 0.18s ease;
          position: relative;
        }

        .hs-doc-item:hover {
          background: rgba(14,165,233,0.05);
          border-color: rgba(14,165,233,0.15);
        }

        .hs-doc-item.active {
          background: rgba(14,165,233,0.08);
          border-color: rgba(14,165,233,0.3);
          border-left: 2px solid #0ea5e9;
        }

        .hs-doc-item.active::before {
          content: '';
          position: absolute;
          left: 0;
          top: 0;
          bottom: 0;
          width: 2px;
          background: #0ea5e9;
          box-shadow: 0 0 8px rgba(14,165,233,0.5);
        }

        .hs-doc-name {
          font-family: 'DM Sans', sans-serif;
          font-size: 13px;
          font-weight: 500;
          color: #e8eeff;
          margin-bottom: 4px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .hs-doc-item.active .hs-doc-name {
          color: #38bdf8;
        }

        .hs-doc-date {
          font-family: 'DM Mono', monospace;
          font-size: 10px;
          color: rgba(120,140,180,0.5);
          letter-spacing: 0.04em;
        }

        .hs-doc-count {
          font-family: 'DM Mono', monospace;
          font-size: 10px;
          color: rgba(14,165,233,0.4);
          padding: 16px 20px 8px;
          letter-spacing: 0.08em;
        }

        /* ── MAIN AREA ── */
        .hs-main {
          position: relative;
          z-index: 1;
          flex: 1;
          display: flex;
          flex-direction: column;
          overflow: hidden;
          background: rgba(5,8,16,0.7);
        }

        /* ── ACTION BAR ── */
        .hs-action-bar {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 14px 20px;
          border-bottom: 1px solid rgba(255,255,255,0.06);
          background: rgba(8,12,24,0.9);
          backdrop-filter: blur(8px);
        }

        .hs-btn {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          padding: 8px 18px;
          font-family: 'DM Sans', sans-serif;
          font-size: 12px;
          font-weight: 600;
          letter-spacing: 0.04em;
          cursor: pointer;
          border: none;
          transition: all 0.18s ease;
        }

        .hs-btn-update {
          background: rgba(14,165,233,0.15);
          color: #38bdf8;
          border: 1px solid rgba(14,165,233,0.35);
        }
        .hs-btn-update:hover {
          background: rgba(14,165,233,0.25);
          border-color: rgba(14,165,233,0.6);
          box-shadow: 0 0 16px rgba(14,165,233,0.15);
        }

        .hs-btn-delete {
          background: rgba(239,68,68,0.08);
          color: rgba(248,113,113,0.8);
          border: 1px solid rgba(239,68,68,0.2);
        }
        .hs-btn-delete:hover {
          background: rgba(239,68,68,0.15);
          border-color: rgba(239,68,68,0.4);
        }

        .hs-filename-pill {
          margin-left: 8px;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 5px 12px;
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.07);
        }

        .hs-filename-dot {
          width: 6px;
          height: 6px;
          background: #10b981;
          border-radius: 50%;
          box-shadow: 0 0 6px rgba(16,185,129,0.6);
          animation: hs-pulse 2.5s infinite;
        }

        @keyframes hs-pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.35; }
        }

        .hs-filename-text {
          font-family: 'DM Mono', monospace;
          font-size: 11px;
          color: rgba(180,200,240,0.5);
          letter-spacing: 0.04em;
        }

        /* ── EDITOR + SIG ROW ── */
        .hs-editor-row {
          display: flex;
          flex: 1;
          overflow: hidden;
        }

        .hs-editor-pane {
          flex: 1;
          border-right: 1px solid rgba(255,255,255,0.06);
          position: relative;
          display: flex;
          flex-direction: column;
        }

        .hs-pane-label {
          font-family: 'DM Mono', monospace;
          font-size: 9px;
          color: rgba(14,165,233,0.4);
          letter-spacing: 0.14em;
          text-transform: uppercase;
          padding: 10px 16px;
          border-bottom: 1px solid rgba(255,255,255,0.04);
          background: rgba(8,12,24,0.6);
        }

        /* ── SIGNATURE PANEL ── */
        .hs-sig-panel {
          width: 340px;
          flex-shrink: 0;
          background: rgba(8,12,24,0.95);
          display: flex;
          flex-direction: column;
          overflow: hidden;
        }

        .hs-sig-header {
          padding: 10px 16px;
          border-bottom: 1px solid rgba(255,255,255,0.04);
          background: rgba(8,12,24,0.6);
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .hs-sig-badge {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          padding: 3px 8px;
          background: rgba(16,185,129,0.1);
          border: 1px solid rgba(16,185,129,0.25);
          font-family: 'DM Mono', monospace;
          font-size: 9px;
          color: #10b981;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          font-weight: 600;
        }

        .hs-sig-badge-dot {
          width: 5px;
          height: 5px;
          background: #10b981;
          border-radius: 50%;
        }

        .hs-sig-title {
          font-family: 'DM Mono', monospace;
          font-size: 9px;
          color: rgba(14,165,233,0.4);
          letter-spacing: 0.14em;
          text-transform: uppercase;
          flex: 1;
        }

        .hs-sig-content {
          flex: 1;
          overflow-y: auto;
          padding: 16px;
        }

        .hs-sig-content::-webkit-scrollbar { width: 3px; }
        .hs-sig-content::-webkit-scrollbar-thumb { background: rgba(16,185,129,0.2); }

        .hs-sig-divider {
          font-family: 'DM Mono', monospace;
          font-size: 9px;
          color: rgba(16,185,129,0.3);
          letter-spacing: 0.1em;
          margin-bottom: 10px;
          padding-bottom: 8px;
          border-bottom: 1px solid rgba(16,185,129,0.08);
        }

        .hs-sig-pre {
          font-family: 'DM Mono', monospace;
          font-size: 10px;
          color: rgba(16,185,129,0.7);
          line-height: 1.7;
          white-space: pre-wrap;
          word-break: break-all;
          letter-spacing: 0.02em;
        }

        /* ── EMPTY STATE ── */
        .hs-empty {
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 16px;
        }

        .hs-empty-icon {
          width: 56px;
          height: 56px;
          background: rgba(14,165,233,0.06);
          border: 1px solid rgba(14,165,233,0.15);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .hs-empty-title {
          font-family: 'DM Serif Display', Georgia, serif;
          font-size: 18px;
          font-weight: 400;
          color: rgba(200,220,255,0.4);
          letter-spacing: -0.01em;
        }

        .hs-empty-sub {
          font-family: 'DM Sans', sans-serif;
          font-size: 12px;
          color: rgba(120,140,180,0.35);
          margin-top: -8px;
          font-family: 'DM Mono', monospace;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          font-size: 10px;
        }
      `}</style>

      <div className="hs-docs-root">

        {/* ── SIDEBAR ── */}
        <div className="hs-sidebar">
          <div className="hs-sidebar-header">
            <div className="hs-sidebar-label">Clinical Records</div>
            <div className="hs-sidebar-title">Documents</div>
          </div>

          {docs.length > 0 && (
            <div className="hs-doc-count">{docs.length} FILE{docs.length !== 1 ? "S" : ""}</div>
          )}

          <div className="hs-doc-list">
            {docs.map((doc) => (
              <div
                key={doc.id}
                className={`hs-doc-item ${selectedDoc?.id === doc.id ? "active" : ""}`}
                onClick={() => openDocument(doc)}
              >
                <div className="hs-doc-name">{doc.filename}</div>
                <div className="hs-doc-date">
                  {new Date(doc.created_at).toLocaleString("en-US", {
                    month: "short", day: "numeric", year: "numeric",
                    hour: "2-digit", minute: "2-digit"
                  })}
                </div>
              </div>
            ))}

            {docs.length === 0 && (
              <div style={{
                padding: "32px 16px", textAlign: "center",
                fontFamily: "'DM Mono', monospace", fontSize: "10px",
                color: "rgba(120,140,180,0.3)", letterSpacing: "0.08em",
                textTransform: "uppercase"
              }}>
                No documents found
              </div>
            )}
          </div>
        </div>

        {/* ── MAIN CONTENT ── */}
        <div className="hs-main">
          {selectedDoc ? (
            <>
              {/* Action Bar */}
              <div className="hs-action-bar">
                <button className="hs-btn hs-btn-update" onClick={handleUpdate}>
                  <svg width="11" height="11" viewBox="0 0 20 20" fill="none">
                    <path d="M3 17h14M10 3v10m-4-4l4 4 4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  Save Changes
                </button>

                <button className="hs-btn hs-btn-delete" onClick={handleDelete}>
                  <svg width="11" height="11" viewBox="0 0 20 20" fill="none">
                    <path d="M4 6h12M8 6V4h4v2M6 6l1 12h6l1-12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  Delete
                </button>

                <div className="hs-filename-pill">
                  <div className="hs-filename-dot" />
                  <span className="hs-filename-text">{selectedDoc.filename}</span>
                </div>
              </div>

              {/* Editor + Signature */}
              <div className="hs-editor-row">
                {/* Document Editor */}
                <div className="hs-editor-pane">
                  <div className="hs-pane-label">Document Editor · Markdown</div>
                  <div style={{ flex: 1 }}>
                    <Editor
                      height="100%"
                      theme="vs-dark"
                      language="markdown"
                      value={content}
                      onChange={(v) => setContent(v)}
                      options={{
                        fontFamily: "'DM Mono', monospace",
                        fontSize: 13,
                        lineHeight: 1.7,
                        padding: { top: 16, left: 8 },
                        minimap: { enabled: false },
                        scrollBeyondLastLine: false,
                        renderLineHighlight: "gutter",
                        overviewRulerLanes: 0,
                      }}
                    />
                  </div>
                </div>

                {/* Signature Panel */}
                <div className="hs-sig-panel">
                  <div className="hs-sig-header">
                    <span className="hs-sig-title">ML-DSA Signature</span>
                    <span className="hs-sig-badge">
                      <span className="hs-sig-badge-dot" />
                      Verified
                    </span>
                  </div>
                  <div className="hs-sig-content">
                    <div className="hs-sig-divider">
                      POST-QUANTUM · FIPS 204 · ML-DSA
                    </div>
                    <pre className="hs-sig-pre">{signature}</pre>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="hs-empty">
              <div className="hs-empty-icon">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                  <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6z" stroke="rgba(14,165,233,0.5)" strokeWidth="1.5" strokeLinejoin="round"/>
                  <path d="M14 2v6h6M8 13h8M8 17h5" stroke="rgba(14,165,233,0.5)" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
              </div>
              <div className="hs-empty-title">Select a document</div>
              <div className="hs-empty-sub">Choose from the sidebar to begin editing</div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Documents;