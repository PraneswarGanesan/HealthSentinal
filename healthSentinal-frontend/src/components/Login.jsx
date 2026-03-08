// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { login } from "../api/authApi";
// import Navbar from "./Navbar";

// export default function Login() {

//   const navigate = useNavigate();

//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   const handleLogin = async () => {

//     try {

//       const res = await login(email, password);

//       localStorage.setItem("token", res.token);
//       localStorage.setItem("user_id", res.user.id);
//       localStorage.setItem("email", res.user.email);

//       navigate("/dashboard");

//     } catch (err) {

//       alert("Login failed");
//     }
//   };

//   return (

//     <div className="min-h-screen bg-black text-white">

//       <Navbar />

//       <div className="flex justify-center items-center h-[80vh]">

//         <div className="bg-gray-900 p-8 rounded w-96">

//           <h2 className="text-2xl mb-6">Login</h2>

//           <input
//             className="w-full p-2 mb-4 bg-black border border-gray-700"
//             placeholder="Email"
//             onChange={(e) => setEmail(e.target.value)}
//           />

//           <input
//             type="password"
//             className="w-full p-2 mb-4 bg-black border border-gray-700"
//             placeholder="Password"
//             onChange={(e) => setPassword(e.target.value)}
//           />

//           <button
//             onClick={handleLogin}
//             className="bg-blue-600 w-full py-2"
//           >
//             Login
//           </button>

//         </div>

//       </div>

//     </div>
//   );
// }
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { login } from "../api/authApi";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async () => {
    if (!email || !password) return;
    setError("");
    setLoading(true);
    try {
      const res = await login(email, password);
      localStorage.setItem("token", res.token);
      localStorage.setItem("user_id", res.user.id);
      localStorage.setItem("email", res.user.email);
      navigate("/dashboard");
    } catch (err) {
      setError("Invalid credentials. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleKey = (e) => {
    if (e.key === "Enter") handleLogin();
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600&family=DM+Serif+Display:ital@0;1&family=DM+Mono:wght@400;500;600&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        .hs-auth-root {
          min-height: 100vh;
          background: #050810;
          color: #e8eeff;
          font-family: 'DM Sans', system-ui, sans-serif;
          display: flex;
          position: relative;
          overflow: hidden;
        }

        /* Background grid */
        .hs-auth-root::before {
          content: '';
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(rgba(14,165,233,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(14,165,233,0.03) 1px, transparent 1px);
          background-size: 48px 48px;
          pointer-events: none;
        }

        /* ── LEFT PANEL ── */
        .hs-auth-left {
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding: 80px 72px;
          position: relative;
          border-right: 1px solid rgba(255,255,255,0.05);
        }

        .hs-auth-left::after {
          content: '';
          position: absolute;
          inset: 0;
          background: radial-gradient(ellipse 80% 70% at 10% 50%, rgba(14,165,233,0.07) 0%, transparent 65%);
          pointer-events: none;
        }

        .hs-auth-logo {
          display: flex;
          align-items: center;
          gap: 10px;
          text-decoration: none;
          margin-bottom: 64px;
          position: relative;
          z-index: 1;
        }

        .hs-auth-logo-icon {
          width: 30px; height: 30px;
          background: linear-gradient(135deg, #0ea5e9, #6366f1);
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0;
        }

        .hs-auth-logo-name {
          font-family: 'DM Serif Display', Georgia, serif;
          font-size: 18px;
          font-weight: 400;
          color: #f0f6ff;
          letter-spacing: -0.02em;
        }

        .hs-auth-headline {
          position: relative;
          z-index: 1;
          font-family: 'DM Serif Display', Georgia, serif;
          font-size: clamp(36px, 4vw, 56px);
          font-weight: 400;
          color: #f0f6ff;
          letter-spacing: -0.025em;
          line-height: 1.08;
          margin-bottom: 20px;
        }

        .hs-auth-headline em {
          font-style: italic;
          color: #38bdf8;
        }

        .hs-auth-body {
          position: relative;
          z-index: 1;
          font-family: 'DM Sans', sans-serif;
          font-size: 14px;
          color: rgba(180,200,240,0.5);
          line-height: 1.85;
          max-width: 420px;
          margin-bottom: 48px;
        }

        .hs-auth-pillars {
          position: relative;
          z-index: 1;
          display: flex;
          flex-direction: column;
          gap: 14px;
        }

        .hs-auth-pillar {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .hs-auth-pillar-dot {
          width: 6px; height: 6px;
          background: #0ea5e9;
          border-radius: 50%;
          flex-shrink: 0;
          box-shadow: 0 0 5px rgba(14,165,233,0.5);
        }

        .hs-auth-pillar-text {
          font-family: 'DM Mono', monospace;
          font-size: 11px;
          color: rgba(14,165,233,0.55);
          letter-spacing: 0.07em;
        }

        /* ── RIGHT PANEL ── */
        .hs-auth-right {
          width: 460px;
          flex-shrink: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 48px 56px;
          position: relative;
          z-index: 1;
          background: rgba(8,12,24,0.6);
        }

        .hs-auth-form {
          width: 100%;
        }

        .hs-auth-form-eyebrow {
          font-family: 'DM Mono', monospace;
          font-size: 9px;
          color: rgba(14,165,233,0.45);
          letter-spacing: 0.16em;
          text-transform: uppercase;
          margin-bottom: 16px;
        }

        .hs-auth-form-title {
          font-family: 'DM Serif Display', Georgia, serif;
          font-size: 28px;
          font-weight: 400;
          color: #f0f6ff;
          letter-spacing: -0.02em;
          margin-bottom: 32px;
        }

        /* ── FORM FIELDS ── */
        .hs-field {
          margin-bottom: 16px;
        }

        .hs-field-label {
          display: block;
          font-family: 'DM Mono', monospace;
          font-size: 9px;
          color: rgba(14,165,233,0.45);
          letter-spacing: 0.14em;
          text-transform: uppercase;
          margin-bottom: 8px;
        }

        .hs-field-input {
          width: 100%;
          background: rgba(5,8,16,0.9);
          border: 1px solid rgba(255,255,255,0.08);
          outline: none;
          padding: 14px 16px;
          font-family: 'DM Sans', sans-serif;
          font-size: 14px;
          color: #e8eeff;
          caret-color: #38bdf8;
          transition: border-color 0.2s, box-shadow 0.2s;
        }

        .hs-field-input::placeholder {
          color: rgba(120,140,180,0.3);
        }

        .hs-field-input:focus {
          border-color: rgba(14,165,233,0.45);
          box-shadow: 0 0 0 3px rgba(14,165,233,0.06);
        }

        /* ── ERROR ── */
        .hs-auth-error {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 12px 14px;
          background: rgba(239,68,68,0.07);
          border: 1px solid rgba(239,68,68,0.2);
          margin-bottom: 18px;
          font-family: 'DM Sans', sans-serif;
          font-size: 13px;
          color: rgba(248,113,113,0.85);
          animation: hs-fade-up 0.25s ease;
        }

        @keyframes hs-fade-up {
          from { opacity: 0; transform: translateY(6px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes hs-spin { to { transform: rotate(360deg); } }
        @keyframes hs-pulse { 0%,100%{opacity:1} 50%{opacity:0.3} }

        /* ── SUBMIT ── */
        .hs-auth-submit {
          width: 100%;
          padding: 15px 24px;
          background: #0ea5e9;
          border: none;
          color: #fff;
          font-family: 'DM Sans', sans-serif;
          font-size: 14px;
          font-weight: 600;
          letter-spacing: 0.03em;
          cursor: pointer;
          transition: background 0.2s, box-shadow 0.2s;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          margin-bottom: 24px;
        }

        .hs-auth-submit:hover:not(:disabled) {
          background: #38bdf8;
          box-shadow: 0 0 28px rgba(14,165,233,0.28);
        }

        .hs-auth-submit:disabled { opacity: 0.45; cursor: not-allowed; }

        .hs-spinner {
          width: 15px; height: 15px;
          border: 2px solid rgba(255,255,255,0.3);
          border-top-color: #fff;
          border-radius: 50%;
          animation: hs-spin 0.7s linear infinite;
        }

        /* ── DIVIDER ── */
        .hs-auth-divider {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 20px;
        }

        .hs-auth-divider-line {
          flex: 1;
          height: 1px;
          background: rgba(255,255,255,0.05);
        }

        .hs-auth-divider-text {
          font-family: 'DM Mono', monospace;
          font-size: 9px;
          color: rgba(120,140,180,0.3);
          letter-spacing: 0.1em;
          text-transform: uppercase;
        }

        /* ── SWITCH LINK ── */
        .hs-auth-switch {
          text-align: center;
          font-family: 'DM Sans', sans-serif;
          font-size: 13px;
          color: rgba(160,180,220,0.45);
        }

        .hs-auth-switch a {
          color: #38bdf8;
          text-decoration: none;
          font-weight: 500;
          transition: color 0.15s;
        }

        .hs-auth-switch a:hover { color: #7dd3fc; }

        /* ── SECURITY BADGE ── */
        .hs-auth-security {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-top: 32px;
          padding-top: 20px;
          border-top: 1px solid rgba(255,255,255,0.04);
        }

        .hs-security-dot {
          width: 6px; height: 6px;
          background: #10b981;
          border-radius: 50%;
          animation: hs-pulse 2.5s infinite;
          box-shadow: 0 0 5px rgba(16,185,129,0.5);
          flex-shrink: 0;
        }

        .hs-security-text {
          font-family: 'DM Mono', monospace;
          font-size: 9px;
          color: rgba(16,185,129,0.45);
          letter-spacing: 0.1em;
          text-transform: uppercase;
        }
      `}</style>

      <div className="hs-auth-root">

        {/* ── LEFT ── */}
        <div className="hs-auth-left">
          <Link to="/home" className="hs-auth-logo">
            <div className="hs-auth-logo-icon">
              <svg width="13" height="13" viewBox="0 0 20 20" fill="none">
                <path d="M10 3v14M3 10h14" stroke="#fff" strokeWidth="2.5" strokeLinecap="round"/>
              </svg>
            </div>
            <span className="hs-auth-logo-name">HealthSentinel</span>
          </Link>

          <h1 className="hs-auth-headline">
            Secure access<br />to your <em>clinical<br />intelligence.</em>
          </h1>

          <p className="hs-auth-body">
            Sign in to query your documents with local AI, verify post-quantum signatures, and manage your encrypted clinical records — all within your network.
          </p>

          <div className="hs-auth-pillars">
            {[
              "ML-DSA · FIPS 204 post-quantum signatures",
              "100% local LLM — no external API calls",
              "Row-level security via Supabase + JWT",
              "BM25 retrieval + Redis 300× cache",
            ].map((t) => (
              <div key={t} className="hs-auth-pillar">
                <div className="hs-auth-pillar-dot" />
                <span className="hs-auth-pillar-text">{t}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ── RIGHT ── */}
        <div className="hs-auth-right">
          <div className="hs-auth-form">
            <div className="hs-auth-form-eyebrow">Clinician Access</div>
            <div className="hs-auth-form-title">Sign in</div>

            {error && (
              <div className="hs-auth-error">
                <svg width="13" height="13" viewBox="0 0 20 20" fill="none">
                  <circle cx="10" cy="10" r="8" stroke="currentColor" strokeWidth="1.5"/>
                  <path d="M10 6v5M10 13.5v.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
                </svg>
                {error}
              </div>
            )}

            <div className="hs-field">
              <label className="hs-field-label">Email address</label>
              <input
                className="hs-field-input"
                type="email"
                placeholder="you@hospital.org"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onKeyDown={handleKey}
                autoComplete="email"
              />
            </div>

            <div className="hs-field" style={{ marginBottom: 24 }}>
              <label className="hs-field-label">Password</label>
              <input
                className="hs-field-input"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyDown={handleKey}
                autoComplete="current-password"
              />
            </div>

            <button
              className="hs-auth-submit"
              onClick={handleLogin}
              disabled={loading || !email || !password}
            >
              {loading ? (
                <><div className="hs-spinner" /> Authenticating…</>
              ) : (
                <>
                  <svg width="14" height="14" viewBox="0 0 20 20" fill="none">
                    <path d="M12 3h5v14h-5M8 14l4-4-4-4M12 10H3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  Sign In
                </>
              )}
            </button>

            <div className="hs-auth-divider">
              <div className="hs-auth-divider-line" />
              <span className="hs-auth-divider-text">New here?</span>
              <div className="hs-auth-divider-line" />
            </div>

            <div className="hs-auth-switch">
              Don't have an account?{" "}
              <Link to="/signup">Create one →</Link>
            </div>

            <div className="hs-auth-security">
              <div className="hs-security-dot" />
              <span className="hs-security-text">ML-DSA · JWT · Supabase RLS · Encrypted at rest</span>
            </div>
          </div>
        </div>

      </div>
    </>
  );
}