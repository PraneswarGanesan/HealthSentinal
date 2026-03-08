import React from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user_id");
    navigate("/login");
  };

  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
      display: "flex", alignItems: "center", justifyContent: "space-between",
      padding: "0 48px", height: "60px",
      background: "rgba(5,8,16,0.85)",
      backdropFilter: "blur(16px)",
      WebkitBackdropFilter: "blur(16px)",
      borderBottom: "1px solid rgba(255,255,255,0.06)",
    }}>
      {/* Logo */}
      <Link to="/" style={{ display: "flex", alignItems: "center", gap: "10px", textDecoration: "none" }}>
        <div style={{
          width: 28, height: 28,
          background: "linear-gradient(135deg, #0ea5e9, #6366f1)",
          display: "flex", alignItems: "center", justifyContent: "center",
          flexShrink: 0,
        }}>
          <svg width="14" height="14" viewBox="0 0 20 20" fill="none">
            <path d="M10 3v14M3 10h14" stroke="#fff" strokeWidth="2.5" strokeLinecap="round"/>
            <circle cx="10" cy="10" r="3.5" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5"/>
          </svg>
        </div>
        <span style={{
          fontFamily: "'DM Serif Display', Georgia, serif",
          fontSize: "17px", fontWeight: 400, color: "#f0f6ff",
          letterSpacing: "-0.01em",
        }}>HealthSentinel</span>
      </Link>

      {/* Nav links */}
      <div style={{ display: "flex", alignItems: "center", gap: "32px" }}>
        {["Features", "Architecture", "Security", "Research"].map(item => (
          <a key={item} href={`#${item.toLowerCase()}`} style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: "13px", fontWeight: 500,
            color: "rgba(180,200,240,0.55)",
            textDecoration: "none", transition: "color 0.15s",
            letterSpacing: "0.01em",
          }}
            onMouseEnter={e => e.target.style.color = "#e8eeff"}
            onMouseLeave={e => e.target.style.color = "rgba(180,200,240,0.55)"}
          >{item}</a>
        ))}
        <Link to="/about" style={{
          fontFamily: "'DM Sans', sans-serif",
          fontSize: "13px", fontWeight: 500,
          color: "rgba(180,200,240,0.55)",
          textDecoration: "none", transition: "color 0.15s",
        }}
          onMouseEnter={e => e.target.style.color = "#e8eeff"}
          onMouseLeave={e => e.target.style.color = "rgba(180,200,240,0.55)"}
        >About</Link>
      </div>

      {/* Auth CTAs */}
      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
        {token ? (
          <>
            <button onClick={() => navigate("/dashboard")} style={{
              background: "#0ea5e9", color: "#fff", border: "none",
              padding: "8px 18px", fontFamily: "'DM Sans', sans-serif",
              fontSize: "13px", fontWeight: 600, cursor: "pointer",
              transition: "background 0.2s", letterSpacing: "0.01em",
            }}
              onMouseEnter={e => e.target.style.background = "#0284c7"}
              onMouseLeave={e => e.target.style.background = "#0ea5e9"}
            >Dashboard</button>
            <button onClick={logout} style={{
              background: "transparent", color: "rgba(200,220,255,0.5)",
              border: "1px solid rgba(255,255,255,0.1)",
              padding: "8px 18px", fontFamily: "'DM Sans', sans-serif",
              fontSize: "13px", fontWeight: 500, cursor: "pointer",
              transition: "all 0.2s",
            }}
              onMouseEnter={e => { e.target.style.borderColor = "rgba(255,255,255,0.25)"; e.target.style.color = "#e8eeff"; }}
              onMouseLeave={e => { e.target.style.borderColor = "rgba(255,255,255,0.1)"; e.target.style.color = "rgba(200,220,255,0.5)"; }}
            >Logout</button>
          </>
        ) : (
          <>
            <Link to="/login" style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "13px", fontWeight: 500,
              color: "rgba(180,200,240,0.55)",
              textDecoration: "none", padding: "8px 14px",
              transition: "color 0.15s",
            }}
              onMouseEnter={e => e.target.style.color = "#e8eeff"}
              onMouseLeave={e => e.target.style.color = "rgba(180,200,240,0.55)"}
            >Login</Link>
            <Link to="/signup" style={{
              background: "#0ea5e9", color: "#fff",
              padding: "8px 18px", fontFamily: "'DM Sans', sans-serif",
              fontSize: "13px", fontWeight: 600, textDecoration: "none",
              transition: "background 0.2s",
              display: "inline-block",
            }}
              onMouseEnter={e => e.target.style.background = "#0284c7"}
              onMouseLeave={e => e.target.style.background = "#0ea5e9"}
            >Get Started</Link>
          </>
        )}
      </div>
    </nav>
  );
}