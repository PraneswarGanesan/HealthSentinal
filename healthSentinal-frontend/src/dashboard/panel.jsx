// import React from "react";
// import { Link, useLocation } from "react-router-dom";

// const SidePanel = () => {

//   const location = useLocation();

//   const items = [
//     { path: "/home", label: "Home" },
//     { path: "/dashboard/documents", label: "Documents" },
//     { path: "/dashboard/upload", label: "Upload" },
//     { path: "/dashboard/chat", label: "Chat" }
//   ];

//   return (

//     <aside className="w-64 bg-[#0b0b0b] border-r border-gray-800 min-h-screen text-white">

//       <div className="p-6 border-b border-gray-800">
//         <h1 className="text-xl font-bold">HealthSentinel</h1>
//       </div>

//       <nav className="p-4 flex flex-col gap-3">

//         {items.map((item) => {

//           const active = location.pathname === item.path;

//           return (
//             <Link
//               key={item.path}
//               to={item.path}
//               className={`px-4 py-2 rounded transition ${
//                 active
//                   ? "bg-blue-600"
//                   : "hover:bg-gray-800"
//               }`}
//             >
//               {item.label}
//             </Link>
//           );

//         })}

//       </nav>

//     </aside>

//   );
// };

// export default SidePanel;
import React from "react";
import { Link, useLocation } from "react-router-dom";

const items = [
  {
    path: "/home",
    label: "Home",
    icon: (
      <svg width="15" height="15" viewBox="0 0 20 20" fill="none">
        <path d="M3 9.5L10 3l7 6.5V17a1 1 0 01-1 1H4a1 1 0 01-1-1V9.5z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
        <path d="M7 18v-6h6v6" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    path: "/dashboard/documents",
    label: "Documents",
    icon: (
      <svg width="15" height="15" viewBox="0 0 20 20" fill="none">
        <path d="M11 2H5a1 1 0 00-1 1v14a1 1 0 001 1h10a1 1 0 001-1V7l-5-5z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
        <path d="M11 2v5h5M7 11h6M7 14h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    path: "/dashboard/upload",
    label: "Upload",
    icon: (
      <svg width="15" height="15" viewBox="0 0 20 20" fill="none">
        <path d="M17 13v3a1 1 0 01-1 1H4a1 1 0 01-1-1v-3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M13 7l-3-3-3 3M10 4v9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    path: "/dashboard/chat",
    label: "Chat",
    icon: (
      <svg width="15" height="15" viewBox="0 0 20 20" fill="none">
        <path d="M17 10c0 3.866-3.134 7-7 7a6.97 6.97 0 01-3.5-.937L3 17l.937-3.5A6.97 6.97 0 013 10c0-3.866 3.134-7 7-7s7 3.134 7 7z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
      </svg>
    ),
  },
];

const SidePanel = () => {
  const location = useLocation();

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600&family=DM+Serif+Display:ital@0;1&family=DM+Mono:wght@400;500;600&display=swap');

        .hs-side {
          width: 240px;
          min-height: 100vh;
          background: #040710;
          border-right: 1px solid rgba(255,255,255,0.05);
          display: flex;
          flex-direction: column;
          flex-shrink: 0;
          position: relative;
          overflow: hidden;
        }

        /* Subtle vertical grid line texture */
        .hs-side::before {
          content: '';
          position: absolute;
          inset: 0;
          background-image: linear-gradient(rgba(14,165,233,0.025) 1px, transparent 1px);
          background-size: 100% 48px;
          pointer-events: none;
        }

        /* Ambient glow top-left */
        .hs-side::after {
          content: '';
          position: absolute;
          top: -40px; left: -40px;
          width: 200px; height: 200px;
          background: radial-gradient(circle, rgba(14,165,233,0.07) 0%, transparent 70%);
          pointer-events: none;
        }

        /* ── LOGO ── */
        .hs-side-logo {
          position: relative;
          z-index: 1;
          padding: 28px 20px 24px;
          border-bottom: 1px solid rgba(255,255,255,0.05);
        }

        .hs-logo-mark {
          display: flex;
          align-items: center;
          gap: 10px;
          text-decoration: none;
          margin-bottom: 10px;
        }

        .hs-logo-icon {
          width: 28px; height: 28px;
          background: linear-gradient(135deg, #0ea5e9, #6366f1);
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0;
        }

        .hs-logo-name {
          font-family: 'DM Serif Display', Georgia, serif;
          font-size: 16px;
          font-weight: 400;
          color: #f0f6ff;
          letter-spacing: -0.02em;
        }

        .hs-logo-tag {
          font-family: 'DM Mono', monospace;
          font-size: 9px;
          color: rgba(14,165,233,0.4);
          letter-spacing: 0.1em;
          text-transform: uppercase;
        }

        /* ── NAV ── */
        .hs-nav {
          position: relative;
          z-index: 1;
          padding: 16px 12px;
          display: flex;
          flex-direction: column;
          gap: 2px;
          flex: 1;
        }

        .hs-nav-section {
          font-family: 'DM Mono', monospace;
          font-size: 8px;
          color: rgba(14,165,233,0.3);
          letter-spacing: 0.16em;
          text-transform: uppercase;
          padding: 12px 8px 6px;
        }

        .hs-nav-link {
          display: flex;
          align-items: center;
          gap: 11px;
          padding: 10px 12px;
          text-decoration: none;
          color: rgba(160,180,220,0.5);
          font-family: 'DM Sans', sans-serif;
          font-size: 13.5px;
          font-weight: 500;
          transition: all 0.18s ease;
          border: 1px solid transparent;
          position: relative;
          letter-spacing: 0.01em;
        }

        .hs-nav-link:hover {
          color: rgba(200,220,255,0.8);
          background: rgba(14,165,233,0.04);
          border-color: rgba(14,165,233,0.1);
        }

        .hs-nav-link.active {
          color: #38bdf8;
          background: rgba(14,165,233,0.08);
          border-color: rgba(14,165,233,0.22);
        }

        .hs-nav-link.active::before {
          content: '';
          position: absolute;
          left: -1px; top: 0; bottom: 0;
          width: 2px;
          background: #0ea5e9;
          box-shadow: 0 0 8px rgba(14,165,233,0.6);
        }

        .hs-nav-icon {
          flex-shrink: 0;
          opacity: 0.6;
          transition: opacity 0.18s;
        }

        .hs-nav-link:hover .hs-nav-icon,
        .hs-nav-link.active .hs-nav-icon {
          opacity: 1;
        }

        /* ── FOOTER ── */
        .hs-side-footer {
          position: relative;
          z-index: 1;
          padding: 16px 20px;
          border-top: 1px solid rgba(255,255,255,0.04);
        }

        .hs-status-row {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 8px;
        }

        .hs-status-dot {
          width: 6px; height: 6px;
          background: #10b981;
          border-radius: 50%;
          box-shadow: 0 0 5px rgba(16,185,129,0.6);
          animation: hs-side-pulse 2.5s infinite;
        }

        @keyframes hs-side-pulse {
          0%,100% { opacity: 1; }
          50% { opacity: 0.3; }
        }

        .hs-status-label {
          font-family: 'DM Mono', monospace;
          font-size: 9px;
          color: rgba(16,185,129,0.6);
          letter-spacing: 0.1em;
          text-transform: uppercase;
          font-weight: 600;
        }

        .hs-stack-pills {
          display: flex;
          flex-wrap: wrap;
          gap: 4px;
        }

        .hs-stack-pill {
          font-family: 'DM Mono', monospace;
          font-size: 8px;
          color: rgba(14,165,233,0.3);
          letter-spacing: 0.06em;
          padding: 2px 6px;
          border: 1px solid rgba(14,165,233,0.1);
          background: rgba(14,165,233,0.04);
        }
      `}</style>

      <aside className="hs-side">

        {/* ── LOGO ── */}
        <div className="hs-side-logo">
          <Link to="/home" className="hs-logo-mark">
            <div className="hs-logo-icon">
              <svg width="12" height="12" viewBox="0 0 20 20" fill="none">
                <path d="M10 3v14M3 10h14" stroke="#fff" strokeWidth="2.5" strokeLinecap="round"/>
              </svg>
            </div>
            <span className="hs-logo-name">HealthSentinel</span>
          </Link>
          <div className="hs-logo-tag">Post-Quantum · RAG · Redis</div>
        </div>

        {/* ── NAV ── */}
        <nav className="hs-nav">
          <div className="hs-nav-section">Navigation</div>
          {items.map((item) => {
            const active = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`hs-nav-link${active ? " active" : ""}`}
              >
                <span className="hs-nav-icon">{item.icon}</span>
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* ── FOOTER STATUS ── */}
        <div className="hs-side-footer">
          <div className="hs-status-row">
            <span className="hs-status-dot" />
            <span className="hs-status-label">All Systems Online</span>
          </div>
          <div className="hs-stack-pills">
            {["ML-DSA", "Ollama", "BM25", "Redis", "S3"].map(t => (
              <span key={t} className="hs-stack-pill">{t}</span>
            ))}
          </div>
        </div>

      </aside>
    </>
  );
};

export default SidePanel;