// import React, { useState } from "react";
// import { uploadDocument } from "../api/documentApi";

// const UploadDocument = () => {

//   const [file, setFile] = useState(null);
//   const [uploading, setUploading] = useState(false);
//   const [responseData, setResponseData] = useState(null);

//   const handleFileChange = (e) => {
//     const selectedFile = e.target.files[0];
//     setFile(selectedFile);
//   };

//   const handleUpload = async () => {

//     if (!file) {
//       alert("Please select a file first");
//       return;
//     }

//     const userId = localStorage.getItem("user_id");

//     try {

//       setUploading(true);

//       const formData = new FormData();
//       formData.append("file", file);

//       const response = await uploadDocument(userId, formData);

//       // backend returns array
//       setResponseData(response[0]);

//       alert("Uploaded successfully");

//     } catch (error) {

//       console.error("Upload failed:", error);
//       alert("Upload failed");

//     } finally {

//       setUploading(false);

//     }

//   };

//   return (

//     <div className="p-8 text-white">

//       <h1 className="text-xl mb-6 font-semibold">Upload Document</h1>

//       <div className="flex flex-col gap-4 max-w-md">

//         <input
//           type="file"
//           onChange={handleFileChange}
//           className="bg-gray-800 p-2 rounded"
//         />

//         <button
//           onClick={handleUpload}
//           disabled={uploading}
//           className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded disabled:opacity-50"
//         >
//           {uploading ? "Uploading..." : "Upload"}
//         </button>

//       </div>

//       {responseData && (

//         <div className="mt-6 p-4 bg-gray-900 rounded">

//           <h2 className="text-lg mb-3">Upload Result</h2>

//           <p><strong>File:</strong> {responseData.filename}</p>
//           <p><strong>ID:</strong> {responseData.id}</p>
//           <p><strong>Signature:</strong> {responseData.signature_path}</p>
//           <p><strong>Created:</strong> {responseData.created_at}</p>

//         </div>

//       )}

//     </div>

//   );

// };

// export default UploadDocument;


import React, { useState, useRef } from "react";
import { uploadDocument } from "../api/documentApi";

const UploadDocument = () => {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [responseData, setResponseData] = useState(null);
  const [dragOver, setDragOver] = useState(false);
  const inputRef = useRef(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    setResponseData(null);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    const dropped = e.dataTransfer.files[0];
    if (dropped) {
      setFile(dropped);
      setResponseData(null);
    }
  };

  const handleUpload = async () => {
    if (!file) {
      alert("Please select a file first");
      return;
    }
    const userId = localStorage.getItem("user_id");
    try {
      setUploading(true);
      const formData = new FormData();
      formData.append("file", file);
      const response = await uploadDocument(userId, formData);
      // backend returns array
      setResponseData(response[0]);
      alert("Uploaded successfully");
    } catch (error) {
      console.error("Upload failed:", error);
      alert("Upload failed");
    } finally {
      setUploading(false);
    }
  };

  const formatBytes = (bytes) => {
    if (!bytes) return "—";
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600&family=DM+Serif+Display:ital@0;1&family=DM+Mono:wght@400;500;600&display=swap');

        .hs-upload-root {
          min-height: 100vh;
          background: #050810;
          color: #e8eeff;
          font-family: 'DM Sans', system-ui, sans-serif;
          padding: 56px 64px;
          position: relative;
          overflow-x: hidden;
        }

        .hs-upload-root::before {
          content: '';
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(rgba(14,165,233,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(14,165,233,0.03) 1px, transparent 1px);
          background-size: 48px 48px;
          pointer-events: none;
        }

        .hs-upload-root::after {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 320px;
          background: radial-gradient(ellipse 70% 60% at 15% 0%, rgba(14,165,233,0.07) 0%, transparent 70%);
          pointer-events: none;
        }

        .hs-upload-inner {
          position: relative;
          z-index: 1;
          max-width: 720px;
        }

        /* ── HEADER ── */
        .hs-upload-eyebrow {
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
          margin-bottom: 24px;
        }

        .hs-upload-eyebrow-dot {
          width: 7px; height: 7px;
          background: #10b981;
          border-radius: 50%;
          animation: hs-pulse 2.5s infinite;
          box-shadow: 0 0 6px rgba(16,185,129,0.5);
        }

        @keyframes hs-pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.3; }
        }

        .hs-upload-title {
          font-family: 'DM Serif Display', Georgia, serif;
          font-size: clamp(36px, 5vw, 54px);
          font-weight: 400;
          color: #f0f6ff;
          letter-spacing: -0.025em;
          line-height: 1.08;
          margin-bottom: 14px;
        }

        .hs-upload-title em {
          font-style: italic;
          color: #38bdf8;
        }

        .hs-upload-subtitle {
          font-family: 'DM Sans', sans-serif;
          font-size: 15px;
          color: rgba(180,200,240,0.55);
          line-height: 1.8;
          margin-bottom: 48px;
          max-width: 520px;
        }

        /* ── DIVIDER ── */
        .hs-divider {
          height: 1px;
          background: rgba(255,255,255,0.05);
          margin-bottom: 40px;
        }

        /* ── STEP LABEL ── */
        .hs-step {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 18px;
        }

        .hs-step-num {
          font-family: 'DM Mono', monospace;
          font-size: 10px;
          color: #0ea5e9;
          font-weight: 700;
          letter-spacing: 0.08em;
        }

        .hs-step-label {
          font-family: 'DM Sans', sans-serif;
          font-size: 13px;
          font-weight: 600;
          color: rgba(200,220,255,0.7);
          letter-spacing: 0.04em;
          text-transform: uppercase;
        }

        /* ── DROP ZONE ── */
        .hs-dropzone {
          border: 1px dashed rgba(14,165,233,0.25);
          background: rgba(14,165,233,0.03);
          padding: 48px 40px;
          text-align: center;
          cursor: pointer;
          transition: all 0.2s ease;
          position: relative;
          overflow: hidden;
          margin-bottom: 6px;
        }

        .hs-dropzone:hover, .hs-dropzone.drag-over {
          border-color: rgba(14,165,233,0.55);
          background: rgba(14,165,233,0.07);
        }

        .hs-dropzone-icon {
          width: 52px; height: 52px;
          background: rgba(14,165,233,0.08);
          border: 1px solid rgba(14,165,233,0.2);
          display: flex; align-items: center; justify-content: center;
          margin: 0 auto 20px;
        }

        .hs-dropzone-title {
          font-family: 'DM Serif Display', Georgia, serif;
          font-size: 22px;
          font-weight: 400;
          color: #f0f6ff;
          margin-bottom: 8px;
          letter-spacing: -0.01em;
        }

        .hs-dropzone-sub {
          font-family: 'DM Mono', monospace;
          font-size: 11px;
          color: rgba(120,140,180,0.5);
          letter-spacing: 0.06em;
          text-transform: uppercase;
          margin-bottom: 24px;
        }

        .hs-browse-btn {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          padding: 9px 22px;
          background: rgba(14,165,233,0.1);
          border: 1px solid rgba(14,165,233,0.3);
          color: #38bdf8;
          font-family: 'DM Sans', sans-serif;
          font-size: 13px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.18s;
          letter-spacing: 0.03em;
        }

        .hs-browse-btn:hover {
          background: rgba(14,165,233,0.18);
          border-color: rgba(14,165,233,0.55);
        }

        /* ── FILE PREVIEW ── */
        .hs-file-preview {
          display: flex;
          align-items: center;
          gap: 16px;
          padding: 16px 20px;
          background: rgba(14,165,233,0.05);
          border: 1px solid rgba(14,165,233,0.2);
          margin-bottom: 28px;
          animation: hs-fade-in 0.3s ease;
        }

        @keyframes hs-fade-in {
          from { opacity: 0; transform: translateY(6px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .hs-file-icon {
          width: 40px; height: 40px;
          background: rgba(14,165,233,0.1);
          border: 1px solid rgba(14,165,233,0.2);
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0;
        }

        .hs-file-name {
          font-family: 'DM Mono', monospace;
          font-size: 13px;
          color: #38bdf8;
          font-weight: 500;
          margin-bottom: 3px;
        }

        .hs-file-meta {
          font-family: 'DM Mono', monospace;
          font-size: 10px;
          color: rgba(120,140,180,0.5);
          letter-spacing: 0.04em;
          text-transform: uppercase;
        }

        .hs-file-clear {
          margin-left: auto;
          background: none;
          border: none;
          color: rgba(180,200,240,0.3);
          cursor: pointer;
          padding: 4px;
          transition: color 0.15s;
        }
        .hs-file-clear:hover { color: rgba(239,68,68,0.6); }

        /* ── UPLOAD BUTTON ── */
        .hs-upload-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          width: 100%;
          padding: 16px 32px;
          background: #0ea5e9;
          border: none;
          color: #fff;
          font-family: 'DM Sans', sans-serif;
          font-size: 15px;
          font-weight: 600;
          letter-spacing: 0.03em;
          cursor: pointer;
          transition: all 0.2s ease;
          position: relative;
          overflow: hidden;
          margin-bottom: 40px;
        }

        .hs-upload-btn:hover:not(:disabled) {
          background: #38bdf8;
          box-shadow: 0 0 32px rgba(14,165,233,0.3);
        }

        .hs-upload-btn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .hs-spinner {
          width: 16px; height: 16px;
          border: 2px solid rgba(255,255,255,0.3);
          border-top-color: #fff;
          border-radius: 50%;
          animation: hs-spin 0.7s linear infinite;
        }

        @keyframes hs-spin {
          to { transform: rotate(360deg); }
        }

        /* ── RESULT CARD ── */
        .hs-result {
          border: 1px solid rgba(16,185,129,0.2);
          background: rgba(5,8,16,0.9);
          animation: hs-fade-in 0.4s ease;
        }

        .hs-result-header {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 18px 24px;
          border-bottom: 1px solid rgba(255,255,255,0.05);
          background: rgba(16,185,129,0.05);
        }

        .hs-result-badge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 4px 10px;
          background: rgba(16,185,129,0.12);
          border: 1px solid rgba(16,185,129,0.3);
          font-family: 'DM Mono', monospace;
          font-size: 9px;
          color: #10b981;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          font-weight: 600;
        }

        .hs-result-badge-dot {
          width: 5px; height: 5px;
          background: #10b981;
          border-radius: 50%;
          box-shadow: 0 0 5px rgba(16,185,129,0.6);
        }

        .hs-result-title {
          font-family: 'DM Serif Display', Georgia, serif;
          font-size: 18px;
          font-weight: 400;
          color: #f0f6ff;
          letter-spacing: -0.01em;
        }

        .hs-result-body {
          display: flex;
          flex-direction: column;
          gap: 1px;
          background: rgba(255,255,255,0.04);
        }

        .hs-result-row {
          display: flex;
          padding: 16px 24px;
          background: #050810;
          gap: 24px;
          align-items: flex-start;
        }

        .hs-result-row:nth-child(even) {
          background: rgba(255,255,255,0.018);
        }

        .hs-result-key {
          font-family: 'DM Mono', monospace;
          font-size: 10px;
          color: rgba(14,165,233,0.5);
          letter-spacing: 0.1em;
          text-transform: uppercase;
          font-weight: 600;
          width: 100px;
          flex-shrink: 0;
          padding-top: 2px;
        }

        .hs-result-val {
          font-family: 'DM Mono', monospace;
          font-size: 13px;
          color: rgba(200,220,255,0.75);
          line-height: 1.6;
          word-break: break-all;
          flex: 1;
        }

        .hs-result-val.highlight {
          color: #38bdf8;
          font-weight: 500;
        }
      `}</style>

      <div className="hs-upload-root">
        <div className="hs-upload-inner">

          {/* ── HEADER ── */}
          <div className="hs-upload-eyebrow">
            <span className="hs-upload-eyebrow-dot" />
            Secure Document Ingestion
          </div>

          <h1 className="hs-upload-title">
            Upload a<br />
            <em>clinical record.</em>
          </h1>

          <p className="hs-upload-subtitle">
            Files are signed with ML-DSA (FIPS 204) on ingestion and stored in encrypted, isolated S3 buckets. No document leaves your network unverified.
          </p>

          <div className="hs-divider" />

          {/* ── STEP 01 · DROP ZONE ── */}
          <div className="hs-step">
            <span className="hs-step-num">01</span>
            <span className="hs-step-label">Select or drop your file</span>
          </div>

          <input
            ref={inputRef}
            type="file"
            onChange={handleFileChange}
            style={{ display: "none" }}
          />

          {!file ? (
            <div
              className={`hs-dropzone${dragOver ? " drag-over" : ""}`}
              onClick={() => inputRef.current?.click()}
              onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
              onDragLeave={() => setDragOver(false)}
              onDrop={handleDrop}
            >
              <div className="hs-dropzone-icon">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                  <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M17 8l-5-5-5 5M12 3v12" stroke="#38bdf8" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <div className="hs-dropzone-title">Drop your file here</div>
              <div className="hs-dropzone-sub">or click to browse from your system</div>
              <button className="hs-browse-btn" onClick={(e) => { e.stopPropagation(); inputRef.current?.click(); }}>
                <svg width="13" height="13" viewBox="0 0 20 20" fill="none">
                  <path d="M10 3v10M5 8l5-5 5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Browse Files
              </button>
            </div>
          ) : (
            <div className="hs-file-preview">
              <div className="hs-file-icon">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6z" stroke="#38bdf8" strokeWidth="1.5" strokeLinejoin="round"/>
                  <path d="M14 2v6h6" stroke="#38bdf8" strokeWidth="1.5" strokeLinejoin="round"/>
                </svg>
              </div>
              <div>
                <div className="hs-file-name">{file.name}</div>
                <div className="hs-file-meta">{formatBytes(file.size)} · {file.type || "unknown type"}</div>
              </div>
              <button className="hs-file-clear" onClick={() => setFile(null)} title="Remove file">
                <svg width="16" height="16" viewBox="0 0 20 20" fill="none">
                  <path d="M15 5L5 15M5 5l10 10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
                </svg>
              </button>
            </div>
          )}

          {/* ── STEP 02 · UPLOAD BUTTON ── */}
          <div className="hs-step" style={{ marginTop: 32, marginBottom: 18 }}>
            <span className="hs-step-num">02</span>
            <span className="hs-step-label">Sign &amp; upload to S3</span>
          </div>

          <button
            className="hs-upload-btn"
            onClick={handleUpload}
            disabled={uploading || !file}
          >
            {uploading ? (
              <>
                <div className="hs-spinner" />
                Signing &amp; Uploading…
              </>
            ) : (
              <>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round"/>
                  <path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Sign &amp; Upload Document
              </>
            )}
          </button>

          {/* ── RESULT CARD ── */}
          {responseData && (
            <div className="hs-result">
              <div className="hs-result-header">
                <span className="hs-result-badge">
                  <span className="hs-result-badge-dot" />
                  Upload Confirmed
                </span>
                <span className="hs-result-title">Document Record</span>
              </div>

              <div className="hs-result-body">
                {[
                  { key: "Filename", val: responseData.filename, hi: true },
                  { key: "Record ID", val: responseData.id },
                  { key: "Signature", val: responseData.signature_path },
                  { key: "Created", val: new Date(responseData.created_at).toLocaleString("en-US", { month: "long", day: "numeric", year: "numeric", hour: "2-digit", minute: "2-digit" }) },
                ].map((row) => (
                  <div key={row.key} className="hs-result-row">
                    <span className="hs-result-key">{row.key}</span>
                    <span className={`hs-result-val${row.hi ? " highlight" : ""}`}>{row.val}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      </div>
    </>
  );
};

export default UploadDocument;