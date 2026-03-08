// import React, { useState } from "react";
// import { signup } from "../api/authApi";
// import { useNavigate } from "react-router-dom";
// import Navbar from "./Navbar";

// export default function Signup() {

//   const navigate = useNavigate();

//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   const handleSignup = async () => {

//     try {

//       await signup(email, password);

//       alert("Signup successful");

//       navigate("/login");

//     } catch {

//       alert("Signup failed");
//     }
//   };

//   return (

//     <div className="min-h-screen bg-black text-white">

//       <Navbar />

//       <div className="flex justify-center items-center h-[80vh]">

//         <div className="bg-gray-900 p-8 rounded w-96">

//           <h2 className="text-2xl mb-6">Signup</h2>

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
//             onClick={handleSignup}
//             className="bg-green-600 w-full py-2"
//           >
//             Signup
//           </button>

//         </div>

//       </div>

//     </div>
//   );
// }

import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { signup } from "../api/authApi";

export default function Signup() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSignup = async () => {
    if (!email || !password) return;
    if (password !== confirm) {
      setError("Passwords do not match.");
      return;
    }
    setError("");
    setLoading(true);
    try {
      await signup(email, password);
      navigate("/login");
    } catch {
      setError("Signup failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleKey = (e) => {
    if (e.key === "Enter") handleSignup();
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
          background: radial-gradient(ellipse 80% 70% at 10% 50%, rgba(99,102,241,0.07) 0%, transparent 65%);
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
          color: #818cf8;
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

        /* Steps */
        .hs-onboard-steps {
          position: relative;
          z-index: 1;
          display: flex;
          flex-direction: column;
          gap: 0;
        }

        .hs-onboard-step {
          display: flex;
          gap: 16px;
          padding-bottom: 0;
        }

        .hs-step-spine {
          display: flex;
          flex-direction: column;
          align-items: center;
          flex-shrink: 0;
        }

        .hs-step-node {
          width: 22px; height: 22px;
          background: rgba(99,102,241,0.12);
          border: 1px solid rgba(99,102,241,0.3);
          display: flex; align-items: center; justify-content: center;
          font-family: 'DM Mono', monospace;
          font-size: 9px;
          color: #818cf8;
          font-weight: 700;
          letter-spacing: 0.04em;
          flex-shrink: 0;
        }

        .hs-step-line {
          width: 1px;
          flex: 1;
          background: rgba(99,102,241,0.12);
          min-height: 28px;
        }

        .hs-step-content {
          padding-bottom: 24px;
          padding-top: 2px;
        }

        .hs-step-title {
          font-family: 'DM Sans', sans-serif;
          font-size: 13px;
          font-weight: 600;
          color: rgba(200,220,255,0.7);
          margin-bottom: 3px;
        }

        .hs-step-desc {
          font-family: 'DM Mono', monospace;
          font-size: 10px;
          color: rgba(120,140,180,0.4);
          letter-spacing: 0.05em;
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

        .hs-auth-form { width: 100%; }

        .hs-auth-form-eyebrow {
          font-family: 'DM Mono', monospace;
          font-size: 9px;
          color: rgba(99,102,241,0.5);
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

        /* ── FIELDS ── */
        .hs-field { margin-bottom: 16px; }

        .hs-field-label {
          display: block;
          font-family: 'DM Mono', monospace;
          font-size: 9px;
          color: rgba(99,102,241,0.5);
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
          caret-color: #818cf8;
          transition: border-color 0.2s, box-shadow 0.2s;
        }

        .hs-field-input::placeholder { color: rgba(120,140,180,0.3); }

        .hs-field-input:focus {
          border-color: rgba(99,102,241,0.45);
          box-shadow: 0 0 0 3px rgba(99,102,241,0.06);
        }

        /* error */
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

        /* submit */
        .hs-auth-submit {
          width: 100%;
          padding: 15px 24px;
          background: #6366f1;
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
          background: #818cf8;
          box-shadow: 0 0 28px rgba(99,102,241,0.28);
        }

        .hs-auth-submit:disabled { opacity: 0.45; cursor: not-allowed; }

        .hs-spinner {
          width: 15px; height: 15px;
          border: 2px solid rgba(255,255,255,0.3);
          border-top-color: #fff;
          border-radius: 50%;
          animation: hs-spin 0.7s linear infinite;
        }

        /* divider */
        .hs-auth-divider {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 20px;
        }

        .hs-auth-divider-line {
          flex: 1; height: 1px;
          background: rgba(255,255,255,0.05);
        }

        .hs-auth-divider-text {
          font-family: 'DM Mono', monospace;
          font-size: 9px;
          color: rgba(120,140,180,0.3);
          letter-spacing: 0.1em;
          text-transform: uppercase;
        }

        /* switch */
        .hs-auth-switch {
          text-align: center;
          font-family: 'DM Sans', sans-serif;
          font-size: 13px;
          color: rgba(160,180,220,0.45);
        }

        .hs-auth-switch a {
          color: #818cf8;
          text-decoration: none;
          font-weight: 500;
          transition: color 0.15s;
        }
        .hs-auth-switch a:hover { color: #a5b4fc; }

        /* security */
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
            Join the next<br />generation of <em>clinical<br />AI.</em>
          </h1>

          <p className="hs-auth-body">
            Create your account and get instant access to quantum-resistant document signing, fully local LLM inference, and BM25 retrieval — all on-premise.
          </p>

          <div className="hs-onboard-steps">
            {[
              { n: "01", title: "Create your account", desc: "Secured with Supabase JWT + row-level security" },
              { n: "02", title: "Upload clinical documents", desc: "ML-DSA signed on ingestion, stored in encrypted S3" },
              { n: "03", title: "Query with local AI", desc: "BM25 retrieval + Ollama LLM — zero external calls" },
            ].map((s, i, arr) => (
              <div key={s.n} className="hs-onboard-step">
                <div className="hs-step-spine">
                  <div className="hs-step-node">{s.n}</div>
                  {i < arr.length - 1 && <div className="hs-step-line" />}
                </div>
                <div className="hs-step-content">
                  <div className="hs-step-title">{s.title}</div>
                  <div className="hs-step-desc">{s.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── RIGHT ── */}
        <div className="hs-auth-right">
          <div className="hs-auth-form">
            <div className="hs-auth-form-eyebrow">New Account</div>
            <div className="hs-auth-form-title">Create account</div>

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

            <div className="hs-field">
              <label className="hs-field-label">Password</label>
              <input
                className="hs-field-input"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyDown={handleKey}
                autoComplete="new-password"
              />
            </div>

            <div className="hs-field" style={{ marginBottom: 24 }}>
              <label className="hs-field-label">Confirm password</label>
              <input
                className="hs-field-input"
                type="password"
                placeholder="••••••••"
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                onKeyDown={handleKey}
                autoComplete="new-password"
              />
            </div>

            <button
              className="hs-auth-submit"
              onClick={handleSignup}
              disabled={loading || !email || !password || !confirm}
            >
              {loading ? (
                <><div className="hs-spinner" /> Creating account…</>
              ) : (
                <>
                  <svg width="14" height="14" viewBox="0 0 20 20" fill="none">
                    <path d="M10 3v14M3 10h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                  Create Account
                </>
              )}
            </button>

            <div className="hs-auth-divider">
              <div className="hs-auth-divider-line" />
              <span className="hs-auth-divider-text">Have an account?</span>
              <div className="hs-auth-divider-line" />
            </div>

            <div className="hs-auth-switch">
              Already registered?{" "}
              <Link to="/login">Sign in →</Link>
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