// // import React, { useState, useEffect, useRef } from "react";
// // import { useNavigate } from "react-router-dom";
// // import Navbar from "./Navbar";

// // // ─── Animated Counter ──────────────────────────────────────────────────────────
// // function AnimatedCounter({ target, suffix = "", duration = 2000 }) {
// //   const [count, setCount] = useState(0);
// //   const ref = useRef(null);
// //   const started = useRef(false);

// //   useEffect(() => {
// //     const observer = new IntersectionObserver(
// //       ([entry]) => {
// //         if (entry.isIntersecting && !started.current) {
// //           started.current = true;
// //           const start = Date.now();
// //           const isFloat = String(target).includes(".");
// //           const tick = () => {
// //             const elapsed = Date.now() - start;
// //             const progress = Math.min(elapsed / duration, 1);
// //             const eased = 1 - Math.pow(1 - progress, 3);
// //             const current = eased * target;
// //             setCount(isFloat ? parseFloat(current.toFixed(1)) : Math.floor(current));
// //             if (progress < 1) requestAnimationFrame(tick);
// //             else setCount(target);
// //           };
// //           requestAnimationFrame(tick);
// //         }
// //       },
// //       { threshold: 0.3 }
// //     );
// //     if (ref.current) observer.observe(ref.current);
// //     return () => observer.disconnect();
// //   }, [target, duration]);

// //   return (
// //     <span ref={ref}>
// //       {count}
// //       {suffix}
// //     </span>
// //   );
// // }

// // // ─── Particle Canvas ───────────────────────────────────────────────────────────
// // function ParticleField() {
// //   const canvasRef = useRef(null);

// //   useEffect(() => {
// //     const canvas = canvasRef.current;
// //     const ctx = canvas.getContext("2d");
// //     let animId;
// //     let particles = [];

// //     const resize = () => {
// //       canvas.width = canvas.offsetWidth;
// //       canvas.height = canvas.offsetHeight;
// //     };
// //     resize();
// //     window.addEventListener("resize", resize);

// //     for (let i = 0; i < 60; i++) {
// //       particles.push({
// //         x: Math.random() * canvas.width,
// //         y: Math.random() * canvas.height,
// //         vx: (Math.random() - 0.5) * 0.3,
// //         vy: (Math.random() - 0.5) * 0.3,
// //         size: Math.random() * 1.5 + 0.5,
// //         opacity: Math.random() * 0.4 + 0.1,
// //         color: Math.random() > 0.5 ? "0,212,255" : "139,92,246",
// //       });
// //     }

// //     const draw = () => {
// //       ctx.clearRect(0, 0, canvas.width, canvas.height);
// //       particles.forEach((p) => {
// //         p.x += p.vx;
// //         p.y += p.vy;
// //         if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
// //         if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
// //         ctx.beginPath();
// //         ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
// //         ctx.fillStyle = `rgba(${p.color},${p.opacity})`;
// //         ctx.fill();
// //       });
// //       particles.forEach((a, i) => {
// //         particles.slice(i + 1).forEach((b) => {
// //           const d = Math.hypot(a.x - b.x, a.y - b.y);
// //           if (d < 100) {
// //             ctx.beginPath();
// //             ctx.moveTo(a.x, a.y);
// //             ctx.lineTo(b.x, b.y);
// //             ctx.strokeStyle = `rgba(0,212,255,${0.08 * (1 - d / 100)})`;
// //             ctx.lineWidth = 0.5;
// //             ctx.stroke();
// //           }
// //         });
// //       });
// //       animId = requestAnimationFrame(draw);
// //     };
// //     draw();

// //     return () => {
// //       cancelAnimationFrame(animId);
// //       window.removeEventListener("resize", resize);
// //     };
// //   }, []);

// //   return (
// //     <canvas
// //       ref={canvasRef}
// //       style={{
// //         position: "absolute",
// //         inset: 0,
// //         width: "100%",
// //         height: "100%",
// //         pointerEvents: "none",
// //       }}
// //     />
// //   );
// // }

// // // ─── Flow Badge ────────────────────────────────────────────────────────────────
// // function Badge({ children }) {
// //   return (
// //     <span
// //       style={{
// //         display: "inline-flex",
// //         alignItems: "center",
// //         gap: "6px",
// //         background: "rgba(0,212,255,0.08)",
// //         border: "1px solid rgba(0,212,255,0.25)",
// //         borderRadius: "100px",
// //         padding: "4px 14px",
// //         fontSize: "11px",
// //         fontFamily: "'Space Mono', monospace",
// //         color: "#00d4ff",
// //         letterSpacing: "0.08em",
// //         textTransform: "uppercase",
// //       }}
// //     >
// //       <span
// //         style={{
// //           width: 6,
// //           height: 6,
// //           borderRadius: "50%",
// //           background: "#00d4ff",
// //           boxShadow: "0 0 8px #00d4ff",
// //           animation: "pulse 2s infinite",
// //         }}
// //       />
// //       {children}
// //     </span>
// //   );
// // }

// // // ─── Feature Card ──────────────────────────────────────────────────────────────
// // function FeatureCard({ icon, title, description, accent = "#00d4ff", delay = 0 }) {
// //   const [hovered, setHovered] = useState(false);

// //   return (
// //     <div
// //       onMouseEnter={() => setHovered(true)}
// //       onMouseLeave={() => setHovered(false)}
// //       style={{
// //         background: hovered
// //           ? "rgba(255,255,255,0.04)"
// //           : "rgba(255,255,255,0.02)",
// //         border: `1px solid ${hovered ? accent + "55" : "rgba(255,255,255,0.07)"}`,
// //         borderRadius: "16px",
// //         padding: "28px",
// //         transition: "all 0.3s ease",
// //         transform: hovered ? "translateY(-4px)" : "translateY(0)",
// //         boxShadow: hovered ? `0 20px 40px rgba(0,0,0,0.4), 0 0 30px ${accent}15` : "none",
// //         animationDelay: `${delay}ms`,
// //         animation: "fadeSlideUp 0.6s ease both",
// //       }}
// //     >
// //       <div
// //         style={{
// //           width: 44,
// //           height: 44,
// //           borderRadius: "12px",
// //           background: `${accent}15`,
// //           border: `1px solid ${accent}30`,
// //           display: "flex",
// //           alignItems: "center",
// //           justifyContent: "center",
// //           fontSize: "20px",
// //           marginBottom: "16px",
// //         }}
// //       >
// //         {icon}
// //       </div>
// //       <h3
// //         style={{
// //           fontFamily: "'Space Grotesk', sans-serif",
// //           fontSize: "16px",
// //           fontWeight: 600,
// //           color: "#f0f4ff",
// //           marginBottom: "10px",
// //           letterSpacing: "-0.01em",
// //         }}
// //       >
// //         {title}
// //       </h3>
// //       <p
// //         style={{
// //           fontFamily: "'IBM Plex Sans', sans-serif",
// //           fontSize: "13.5px",
// //           color: "rgba(200,210,240,0.55)",
// //           lineHeight: 1.7,
// //         }}
// //       >
// //         {description}
// //       </p>
// //     </div>
// //   );
// // }

// // // ─── Metric Card ───────────────────────────────────────────────────────────────
// // function MetricCard({ value, suffix, label, sub, accent = "#00d4ff" }) {
// //   return (
// //     <div
// //       style={{
// //         background: "rgba(255,255,255,0.025)",
// //         border: "1px solid rgba(255,255,255,0.08)",
// //         borderRadius: "16px",
// //         padding: "28px 24px",
// //         textAlign: "center",
// //       }}
// //     >
// //       <div
// //         style={{
// //           fontFamily: "'Space Mono', monospace",
// //           fontSize: "38px",
// //           fontWeight: 700,
// //           color: accent,
// //           lineHeight: 1,
// //           textShadow: `0 0 30px ${accent}60`,
// //         }}
// //       >
// //         <AnimatedCounter target={value} suffix={suffix} />
// //       </div>
// //       <div
// //         style={{
// //           fontFamily: "'Space Grotesk', sans-serif",
// //           fontSize: "13px",
// //           fontWeight: 600,
// //           color: "rgba(200,220,255,0.7)",
// //           marginTop: "8px",
// //           textTransform: "uppercase",
// //           letterSpacing: "0.06em",
// //         }}
// //       >
// //         {label}
// //       </div>
// //       {sub && (
// //         <div
// //           style={{
// //             fontFamily: "'IBM Plex Sans', sans-serif",
// //             fontSize: "11px",
// //             color: "rgba(150,170,210,0.45)",
// //             marginTop: "6px",
// //           }}
// //         >
// //           {sub}
// //         </div>
// //       )}
// //     </div>
// //   );
// // }

// // // ─── Pipeline Step ─────────────────────────────────────────────────────────────
// // function PipelineStep({ step, label, active }) {
// //   return (
// //     <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "8px" }}>
// //       <div
// //         style={{
// //           width: 40,
// //           height: 40,
// //           borderRadius: "50%",
// //           background: active ? "rgba(0,212,255,0.15)" : "rgba(255,255,255,0.04)",
// //           border: active ? "1px solid rgba(0,212,255,0.5)" : "1px solid rgba(255,255,255,0.1)",
// //           display: "flex",
// //           alignItems: "center",
// //           justifyContent: "center",
// //           fontFamily: "'Space Mono', monospace",
// //           fontSize: "12px",
// //           color: active ? "#00d4ff" : "rgba(200,220,255,0.4)",
// //           fontWeight: 700,
// //         }}
// //       >
// //         {step}
// //       </div>
// //       <span
// //         style={{
// //           fontFamily: "'IBM Plex Sans', sans-serif",
// //           fontSize: "11px",
// //           color: active ? "rgba(200,230,255,0.8)" : "rgba(150,170,210,0.4)",
// //           textAlign: "center",
// //           maxWidth: "80px",
// //         }}
// //       >
// //         {label}
// //       </span>
// //     </div>
// //   );
// // }

// // // ─── Main Home Component ───────────────────────────────────────────────────────
// // export default function Home() {
// //   const navigate = useNavigate();
// //   const token = localStorage.getItem("token");
// //   const [scrollY, setScrollY] = useState(0);
// //   const [activePipeline, setActivePipeline] = useState(0);

// //   useEffect(() => {
// //     const onScroll = () => setScrollY(window.scrollY);
// //     window.addEventListener("scroll", onScroll);
// //     return () => window.removeEventListener("scroll", onScroll);
// //   }, []);

// //   useEffect(() => {
// //     const interval = setInterval(() => {
// //       setActivePipeline((p) => (p + 1) % 7);
// //     }, 900);
// //     return () => clearInterval(interval);
// //   }, []);

// //   const pipelineSteps = [
// //     { step: "01", label: "Auth" },
// //     { step: "02", label: "Upload" },
// //     { step: "03", label: "ML-DSA Sign" },
// //     { step: "04", label: "S3 Store" },
// //     { step: "05", label: "BM25 Index" },
// //     { step: "06", label: "Redis Cache" },
// //     { step: "07", label: "RAG + LLM" },
// //   ];

// //   const features = [
// //     {
// //       icon: "⚛",
// //       title: "Post-Quantum Cryptography",
// //       description:
// //         "ML-DSA (Dilithium) digital signatures protect your healthcare documents against quantum computing threats — future-proof security today.",
// //       accent: "#00d4ff",
// //     },
// //     {
// //       icon: "🔒",
// //       title: "Zero Data Leakage",
// //       description:
// //         "Ollama runs inference locally. No external API calls, no data transmission — sensitive healthcare data never leaves your environment.",
// //       accent: "#8b5cf6",
// //       delay: 100,
// //     },
// //     {
// //       icon: "📋",
// //       title: "BM25 + RAG Retrieval",
// //       description:
// //         "Sparse BM25 retrieval surfaces the most relevant medical documents, then constructs context for the local LLM to generate precise answers.",
// //       accent: "#10b981",
// //       delay: 200,
// //     },
// //     {
// //       icon: "⚡",
// //       title: "Redis Query Caching",
// //       description:
// //         "Repeated queries return in 70–150ms versus 20–26 second cold LLM inference — a ~300x speed improvement via intelligent caching.",
// //       accent: "#f59e0b",
// //       delay: 300,
// //     },
// //     {
// //       icon: "☁",
// //       title: "AWS S3 Secure Storage",
// //       description:
// //         "Documents are stored in AWS S3 with scalable, reliable, and secure object access with full user-level document isolation.",
// //       accent: "#ef4444",
// //       delay: 400,
// //     },
// //     {
// //       icon: "🛡",
// //       title: "Supabase Auth + JWT",
// //       description:
// //         "Every request is tied to a user_id through JWT-based authentication backed by Supabase PostgreSQL — strict access control at every layer.",
// //       accent: "#00d4ff",
// //       delay: 500,
// //     },
// //   ];

// //   const comparisonRows = [
// //     { component: "Security", traditional: "ECDSA", hs: "ML-DSA (Dilithium PQC)" },
// //     { component: "AI Privacy", traditional: "External LLM APIs", hs: "Local Ollama LLM" },
// //     { component: "Retrieval", traditional: "Keyword search", hs: "BM25 + RAG" },
// //     { component: "Storage", traditional: "Local files", hs: "AWS S3 secure storage" },
// //     { component: "Authentication", traditional: "Basic login", hs: "Supabase + JWT" },
// //     { component: "Performance", traditional: "No optimization", hs: "Redis caching" },
// //   ];

// //   return (
// //     <div
// //       style={{
// //         minHeight: "100vh",
// //         background: "#050810",
// //         color: "#e8eeff",
// //         overflowX: "hidden",
// //       }}
// //     >
// //       {/* Inject fonts + keyframes */}
// //       <style>{`
// //         @import url('https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&family=Space+Grotesk:wght@300;400;500;600;700&family=IBM+Plex+Sans:wght@300;400;500&display=swap');

// //         * { box-sizing: border-box; margin: 0; padding: 0; }

// //         @keyframes pulse {
// //           0%, 100% { opacity: 1; }
// //           50% { opacity: 0.3; }
// //         }

// //         @keyframes fadeSlideUp {
// //           from { opacity: 0; transform: translateY(24px); }
// //           to   { opacity: 1; transform: translateY(0); }
// //         }

// //         @keyframes scanline {
// //           0%   { transform: translateY(-100%); }
// //           100% { transform: translateY(400%); }
// //         }

// //         @keyframes glow {
// //           0%, 100% { opacity: 0.5; }
// //           50%       { opacity: 1; }
// //         }

// //         @keyframes float {
// //           0%, 100% { transform: translateY(0px); }
// //           50%       { transform: translateY(-8px); }
// //         }

// //         .btn-primary {
// //           display: inline-flex;
// //           align-items: center;
// //           gap: 8px;
// //           background: linear-gradient(135deg, #00d4ff, #0099cc);
// //           color: #000;
// //           border: none;
// //           borderRadius: 8px;
// //           padding: 14px 28px;
// //           fontFamily: "'Space Grotesk', sans-serif";
// //           fontSize: 14px;
// //           fontWeight: 700;
// //           letterSpacing: 0.04em;
// //           cursor: pointer;
// //           transition: all 0.2s ease;
// //           textTransform: uppercase;
// //         }
// //         .btn-primary:hover {
// //           transform: translateY(-2px);
// //           box-shadow: 0 12px 32px rgba(0,212,255,0.35);
// //         }
// //         .btn-secondary {
// //           display: inline-flex;
// //           align-items: center;
// //           gap: 8px;
// //           background: transparent;
// //           color: rgba(200,220,255,0.8);
// //           border: 1px solid rgba(255,255,255,0.15);
// //           border-radius: 8px;
// //           padding: 14px 28px;
// //           font-family: "'Space Grotesk', sans-serif";
// //           font-size: 14px;
// //           font-weight: 600;
// //           letter-spacing: 0.04em;
// //           cursor: pointer;
// //           transition: all 0.2s ease;
// //           text-transform: uppercase;
// //         }
// //         .btn-secondary:hover {
// //           background: rgba(255,255,255,0.06);
// //           border-color: rgba(255,255,255,0.3);
// //           transform: translateY(-2px);
// //         }

// //         ::-webkit-scrollbar { width: 6px; }
// //         ::-webkit-scrollbar-track { background: #050810; }
// //         ::-webkit-scrollbar-thumb { background: rgba(0,212,255,0.3); border-radius: 3px; }
// //       `}</style>

// //       <Navbar />

// //       {/* ── HERO ──────────────────────────────────────────────────────── */}
// //       <section
// //         style={{
// //           position: "relative",
// //           minHeight: "100vh",
// //           display: "flex",
// //           alignItems: "center",
// //           justifyContent: "center",
// //           overflow: "hidden",
// //         }}
// //       >
// //         {/* Background layers */}
// //         <div
// //           style={{
// //             position: "absolute",
// //             inset: 0,
// //             background:
// //               "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(0,212,255,0.08) 0%, transparent 60%), radial-gradient(ellipse 60% 50% at 80% 80%, rgba(139,92,246,0.06) 0%, transparent 60%)",
// //           }}
// //         />
// //         {/* Grid overlay */}
// //         <div
// //           style={{
// //             position: "absolute",
// //             inset: 0,
// //             backgroundImage:
// //               "linear-gradient(rgba(0,212,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0,212,255,0.03) 1px, transparent 1px)",
// //             backgroundSize: "60px 60px",
// //           }}
// //         />
// //         <ParticleField />

// //         {/* Content */}
// //         <div
// //           style={{
// //             position: "relative",
// //             zIndex: 10,
// //             maxWidth: "860px",
// //             margin: "0 auto",
// //             padding: "120px 24px 80px",
// //             textAlign: "center",
// //           }}
// //         >
// //           <div style={{ marginBottom: "24px" }}>
// //             <Badge>Post-Quantum Healthcare AI</Badge>
// //           </div>

// //           <h1
// //             style={{
// //               fontFamily: "'Space Grotesk', sans-serif",
// //               fontSize: "clamp(40px, 7vw, 76px)",
// //               fontWeight: 700,
// //               lineHeight: 1.05,
// //               letterSpacing: "-0.03em",
// //               marginBottom: "24px",
// //               animation: "fadeSlideUp 0.8s ease both",
// //             }}
// //           >
// //             <span style={{ color: "#f0f6ff" }}>Health</span>
// //             <span
// //               style={{
// //                 background: "linear-gradient(135deg, #00d4ff 0%, #8b5cf6 100%)",
// //                 WebkitBackgroundClip: "text",
// //                 WebkitTextFillColor: "transparent",
// //               }}
// //             >
// //               Sentinel
// //             </span>
// //           </h1>

// //           <p
// //             style={{
// //               fontFamily: "'IBM Plex Sans', sans-serif",
// //               fontSize: "clamp(15px, 2vw, 19px)",
// //               fontWeight: 300,
// //               color: "rgba(180,200,240,0.7)",
// //               lineHeight: 1.75,
// //               maxWidth: "620px",
// //               margin: "0 auto 16px",
// //               animation: "fadeSlideUp 0.8s 0.1s ease both",
// //             }}
// //           >
// //             Secure AI-powered healthcare document intelligence combining{" "}
// //             <span style={{ color: "#00d4ff", fontWeight: 500 }}>
// //               Post-Quantum Cryptography
// //             </span>
// //             , local LLM inference, and BM25 + RAG — zero data leaves your environment.
// //           </p>

// //           <p
// //             style={{
// //               fontFamily: "'Space Mono', monospace",
// //               fontSize: "11px",
// //               color: "rgba(100,140,180,0.5)",
// //               letterSpacing: "0.1em",
// //               marginBottom: "40px",
// //               textTransform: "uppercase",
// //               animation: "fadeSlideUp 0.8s 0.15s ease both",
// //             }}
// //           >
// //             ML-DSA · Ollama · BM25 · Redis · AWS S3 · Supabase
// //           </p>

// //           <div
// //             style={{
// //               display: "flex",
// //               gap: "12px",
// //               justifyContent: "center",
// //               flexWrap: "wrap",
// //               animation: "fadeSlideUp 0.8s 0.2s ease both",
// //             }}
// //           >
// //             {token ? (
// //               <button className="btn-primary" onClick={() => navigate("/dashboard")}>
// //                 <span>→</span> Go to Dashboard
// //               </button>
// //             ) : (
// //               <>
// //                 <button className="btn-primary" onClick={() => navigate("/login")}>
// //                   <span>→</span> Login
// //                 </button>
// //                 <button className="btn-secondary" onClick={() => navigate("/signup")}>
// //                   Create Account
// //                 </button>
// //               </>
// //             )}
// //           </div>

// //           {/* Pipeline visualizer */}
// //           <div
// //             style={{
// //               marginTop: "72px",
// //               animation: "fadeSlideUp 0.8s 0.35s ease both",
// //             }}
// //           >
// //             <p
// //               style={{
// //                 fontFamily: "'Space Mono', monospace",
// //                 fontSize: "10px",
// //                 color: "rgba(100,140,180,0.45)",
// //                 letterSpacing: "0.15em",
// //                 textTransform: "uppercase",
// //                 marginBottom: "20px",
// //               }}
// //             >
// //               System Pipeline
// //             </p>
// //             <div
// //               style={{
// //                 display: "flex",
// //                 alignItems: "center",
// //                 justifyContent: "center",
// //                 gap: "0",
// //                 overflowX: "auto",
// //                 padding: "12px 0",
// //               }}
// //             >
// //               {pipelineSteps.map((s, i) => (
// //                 <React.Fragment key={i}>
// //                   <PipelineStep {...s} active={activePipeline === i} />
// //                   {i < pipelineSteps.length - 1 && (
// //                     <div
// //                       style={{
// //                         width: "28px",
// //                         height: "1px",
// //                         background:
// //                           activePipeline > i
// //                             ? "rgba(0,212,255,0.5)"
// //                             : "rgba(255,255,255,0.08)",
// //                         transition: "background 0.3s ease",
// //                         flexShrink: 0,
// //                       }}
// //                     />
// //                   )}
// //                 </React.Fragment>
// //               ))}
// //             </div>
// //           </div>
// //         </div>

// //         {/* Scroll indicator */}
// //         <div
// //           style={{
// //             position: "absolute",
// //             bottom: "32px",
// //             left: "50%",
// //             transform: "translateX(-50%)",
// //             display: "flex",
// //             flexDirection: "column",
// //             alignItems: "center",
// //             gap: "6px",
// //             animation: "float 2s ease-in-out infinite",
// //             opacity: scrollY > 100 ? 0 : 1,
// //             transition: "opacity 0.3s",
// //           }}
// //         >
// //           <span
// //             style={{
// //               fontFamily: "'Space Mono', monospace",
// //               fontSize: "9px",
// //               color: "rgba(100,140,180,0.4)",
// //               letterSpacing: "0.15em",
// //               textTransform: "uppercase",
// //             }}
// //           >
// //             Scroll
// //           </span>
// //           <div
// //             style={{
// //               width: "1px",
// //               height: "40px",
// //               background:
// //                 "linear-gradient(to bottom, rgba(0,212,255,0.4), transparent)",
// //             }}
// //           />
// //         </div>
// //       </section>

// //       {/* ── METRICS ────────────────────────────────────────────────────── */}
// //       <section style={{ padding: "80px 24px", background: "rgba(0,0,0,0.3)" }}>
// //         <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
// //           <div
// //             style={{
// //               display: "grid",
// //               gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
// //               gap: "20px",
// //             }}
// //           >
// //             <MetricCard
// //               value={300}
// //               suffix="x"
// //               label="Faster Cached Queries"
// //               sub="70–150ms vs 20–26s"
// //               accent="#00d4ff"
// //             />
// //             <MetricCard
// //               value={83}
// //               suffix="ms"
// //               label="Median Cache Latency"
// //               sub="Redis hit response time"
// //               accent="#10b981"
// //             />
// //             <MetricCard
// //               value={6.8}
// //               suffix=" req/s"
// //               label="Cached Throughput"
// //               sub="Autocannon benchmark"
// //               accent="#8b5cf6"
// //             />
// //             <MetricCard
// //               value={409}
// //               suffix=""
// //               label="Requests / 60s"
// //               sub="Load test result"
// //               accent="#f59e0b"
// //             />
// //           </div>
// //         </div>
// //       </section>

// //       {/* ── PROBLEM STATEMENT ──────────────────────────────────────────── */}
// //       <section style={{ padding: "100px 24px" }}>
// //         <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
// //           <div
// //             style={{
// //               display: "grid",
// //               gridTemplateColumns: "1fr 1fr",
// //               gap: "64px",
// //               alignItems: "center",
// //             }}
// //           >
// //             <div>
// //               <Badge>Problem Statement</Badge>
// //               <h2
// //                 style={{
// //                   fontFamily: "'Space Grotesk', sans-serif",
// //                   fontSize: "clamp(28px, 4vw, 42px)",
// //                   fontWeight: 700,
// //                   letterSpacing: "-0.02em",
// //                   lineHeight: 1.15,
// //                   marginTop: "20px",
// //                   marginBottom: "20px",
// //                   color: "#f0f6ff",
// //                 }}
// //               >
// //                 Healthcare AI is broken by design
// //               </h2>
// //               <p
// //                 style={{
// //                   fontFamily: "'IBM Plex Sans', sans-serif",
// //                   fontSize: "15px",
// //                   color: "rgba(180,200,240,0.6)",
// //                   lineHeight: 1.8,
// //                   marginBottom: "24px",
// //                 }}
// //               >
// //                 Healthcare systems manage the most sensitive patient data on earth.
// //                 Existing AI analytics platforms introduce compounding security risks
// //                 that the industry has failed to address.
// //               </p>
// //               <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
// //                 {[
// //                   {
// //                     icon: "⚠",
// //                     text: "Medical records exposed via external LLM API calls",
// //                     color: "#ef4444",
// //                   },
// //                   {
// //                     icon: "⚠",
// //                     text: "ECDSA signatures vulnerable to quantum attacks",
// //                     color: "#f59e0b",
// //                   },
// //                   {
// //                     icon: "⚠",
// //                     text: "Intelligent retrieval and analysis capabilities absent",
// //                     color: "#8b5cf6",
// //                   },
// //                 ].map((item, i) => (
// //                   <div
// //                     key={i}
// //                     style={{
// //                       display: "flex",
// //                       alignItems: "flex-start",
// //                       gap: "12px",
// //                       padding: "14px 18px",
// //                       background: "rgba(255,255,255,0.025)",
// //                       border: `1px solid ${item.color}20`,
// //                       borderLeft: `3px solid ${item.color}`,
// //                       borderRadius: "8px",
// //                     }}
// //                   >
// //                     <span style={{ fontSize: "14px" }}>{item.icon}</span>
// //                     <span
// //                       style={{
// //                         fontFamily: "'IBM Plex Sans', sans-serif",
// //                         fontSize: "13.5px",
// //                         color: "rgba(200,220,255,0.65)",
// //                         lineHeight: 1.6,
// //                       }}
// //                     >
// //                       {item.text}
// //                     </span>
// //                   </div>
// //                 ))}
// //               </div>
// //             </div>

// //             {/* Comparison table */}
// //             <div
// //               style={{
// //                 background: "rgba(255,255,255,0.02)",
// //                 border: "1px solid rgba(255,255,255,0.07)",
// //                 borderRadius: "16px",
// //                 overflow: "hidden",
// //               }}
// //             >
// //               <div
// //                 style={{
// //                   display: "grid",
// //                   gridTemplateColumns: "1fr 1fr 1fr",
// //                   background: "rgba(0,0,0,0.4)",
// //                   padding: "14px 20px",
// //                   borderBottom: "1px solid rgba(255,255,255,0.07)",
// //                 }}
// //               >
// //                 {["Component", "Traditional", "HealthSentinel"].map((h, i) => (
// //                   <span
// //                     key={i}
// //                     style={{
// //                       fontFamily: "'Space Mono', monospace",
// //                       fontSize: "10px",
// //                       color:
// //                         i === 2
// //                           ? "#00d4ff"
// //                           : "rgba(150,170,210,0.5)",
// //                       textTransform: "uppercase",
// //                       letterSpacing: "0.08em",
// //                     }}
// //                   >
// //                     {h}
// //                   </span>
// //                 ))}
// //               </div>
// //               {comparisonRows.map((row, i) => (
// //                 <div
// //                   key={i}
// //                   style={{
// //                     display: "grid",
// //                     gridTemplateColumns: "1fr 1fr 1fr",
// //                     padding: "14px 20px",
// //                     borderBottom:
// //                       i < comparisonRows.length - 1
// //                         ? "1px solid rgba(255,255,255,0.04)"
// //                         : "none",
// //                     background:
// //                       i % 2 === 0 ? "transparent" : "rgba(255,255,255,0.01)",
// //                   }}
// //                 >
// //                   <span
// //                     style={{
// //                       fontFamily: "'Space Grotesk', sans-serif",
// //                       fontSize: "12px",
// //                       color: "rgba(200,220,255,0.5)",
// //                       fontWeight: 500,
// //                     }}
// //                   >
// //                     {row.component}
// //                   </span>
// //                   <span
// //                     style={{
// //                       fontFamily: "'IBM Plex Sans', sans-serif",
// //                       fontSize: "12px",
// //                       color: "rgba(150,170,210,0.35)",
// //                       textDecoration: "line-through",
// //                     }}
// //                   >
// //                     {row.traditional}
// //                   </span>
// //                   <span
// //                     style={{
// //                       fontFamily: "'IBM Plex Sans', sans-serif",
// //                       fontSize: "12px",
// //                       color: "#00d4ff",
// //                       fontWeight: 500,
// //                     }}
// //                   >
// //                     {row.hs}
// //                   </span>
// //                 </div>
// //               ))}
// //             </div>
// //           </div>
// //         </div>
// //       </section>

// //       {/* ── FEATURES ───────────────────────────────────────────────────── */}
// //       <section
// //         style={{
// //           padding: "100px 24px",
// //           background:
// //             "radial-gradient(ellipse 100% 60% at 50% 50%, rgba(0,212,255,0.03) 0%, transparent 70%)",
// //         }}
// //       >
// //         <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
// //           <div style={{ textAlign: "center", marginBottom: "60px" }}>
// //             <Badge>Key Features</Badge>
// //             <h2
// //               style={{
// //                 fontFamily: "'Space Grotesk', sans-serif",
// //                 fontSize: "clamp(28px, 4vw, 42px)",
// //                 fontWeight: 700,
// //                 letterSpacing: "-0.02em",
// //                 lineHeight: 1.15,
// //                 marginTop: "20px",
// //                 color: "#f0f6ff",
// //               }}
// //             >
// //               Built for the quantum era
// //             </h2>
// //           </div>
// //           <div
// //             style={{
// //               display: "grid",
// //               gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
// //               gap: "20px",
// //             }}
// //           >
// //             {features.map((f, i) => (
// //               <FeatureCard key={i} {...f} delay={i * 80} />
// //             ))}
// //           </div>
// //         </div>
// //       </section>

// //       {/* ── RAG ARCHITECTURE ───────────────────────────────────────────── */}
// //       <section style={{ padding: "100px 24px", background: "rgba(0,0,0,0.2)" }}>
// //         <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
// //           <div style={{ textAlign: "center", marginBottom: "60px" }}>
// //             <Badge>Architecture</Badge>
// //             <h2
// //               style={{
// //                 fontFamily: "'Space Grotesk', sans-serif",
// //                 fontSize: "clamp(28px, 4vw, 42px)",
// //                 fontWeight: 700,
// //                 letterSpacing: "-0.02em",
// //                 lineHeight: 1.15,
// //                 marginTop: "20px",
// //                 marginBottom: "14px",
// //                 color: "#f0f6ff",
// //               }}
// //             >
// //               RAG Pipeline + Redis Cache
// //             </h2>
// //             <p
// //               style={{
// //                 fontFamily: "'IBM Plex Sans', sans-serif",
// //                 fontSize: "15px",
// //                 color: "rgba(180,200,240,0.55)",
// //                 maxWidth: "520px",
// //                 margin: "0 auto",
// //                 lineHeight: 1.7,
// //               }}
// //             >
// //               Every query hits Redis first. Cache misses trigger the full BM25 retrieval
// //               + Ollama inference pipeline, then cache the result.
// //             </p>
// //           </div>

// //           <div
// //             style={{
// //               display: "grid",
// //               gridTemplateColumns: "1fr 1fr",
// //               gap: "24px",
// //             }}
// //           >
// //             {/* Cache hit path */}
// //             <div
// //               style={{
// //                 background: "rgba(16,185,129,0.04)",
// //                 border: "1px solid rgba(16,185,129,0.2)",
// //                 borderRadius: "16px",
// //                 padding: "32px",
// //               }}
// //             >
// //               <div
// //                 style={{
// //                   display: "flex",
// //                   alignItems: "center",
// //                   gap: "10px",
// //                   marginBottom: "24px",
// //                 }}
// //               >
// //                 <div
// //                   style={{
// //                     width: 8,
// //                     height: 8,
// //                     borderRadius: "50%",
// //                     background: "#10b981",
// //                     boxShadow: "0 0 8px #10b981",
// //                   }}
// //                 />
// //                 <span
// //                   style={{
// //                     fontFamily: "'Space Mono', monospace",
// //                     fontSize: "11px",
// //                     color: "#10b981",
// //                     letterSpacing: "0.1em",
// //                     textTransform: "uppercase",
// //                   }}
// //                 >
// //                   Cache Hit — ~83ms
// //                 </span>
// //               </div>
// //               {["User Query", "Redis Cache Lookup", "Cache Hit ✓", "Return Cached Response"].map(
// //                 (step, i) => (
// //                   <div
// //                     key={i}
// //                     style={{
// //                       display: "flex",
// //                       alignItems: "center",
// //                       gap: "12px",
// //                       padding: "10px 0",
// //                       borderBottom:
// //                         i < 3 ? "1px dashed rgba(16,185,129,0.15)" : "none",
// //                     }}
// //                   >
// //                     <div
// //                       style={{
// //                         width: 6,
// //                         height: 6,
// //                         borderRadius: "50%",
// //                         background: "rgba(16,185,129,0.5)",
// //                         flexShrink: 0,
// //                       }}
// //                     />
// //                     <span
// //                       style={{
// //                         fontFamily: "'IBM Plex Sans', sans-serif",
// //                         fontSize: "13px",
// //                         color: "rgba(180,220,200,0.7)",
// //                       }}
// //                     >
// //                       {step}
// //                     </span>
// //                   </div>
// //                 )
// //               )}
// //             </div>

// //             {/* Cache miss path */}
// //             <div
// //               style={{
// //                 background: "rgba(0,212,255,0.03)",
// //                 border: "1px solid rgba(0,212,255,0.15)",
// //                 borderRadius: "16px",
// //                 padding: "32px",
// //               }}
// //             >
// //               <div
// //                 style={{
// //                   display: "flex",
// //                   alignItems: "center",
// //                   gap: "10px",
// //                   marginBottom: "24px",
// //                 }}
// //               >
// //                 <div
// //                   style={{
// //                     width: 8,
// //                     height: 8,
// //                     borderRadius: "50%",
// //                     background: "#00d4ff",
// //                     boxShadow: "0 0 8px #00d4ff",
// //                   }}
// //                 />
// //                 <span
// //                   style={{
// //                     fontFamily: "'Space Mono', monospace",
// //                     fontSize: "11px",
// //                     color: "#00d4ff",
// //                     letterSpacing: "0.1em",
// //                     textTransform: "uppercase",
// //                   }}
// //                 >
// //                   Cache Miss — ~20-26s
// //                 </span>
// //               </div>
// //               {[
// //                 "User Query",
// //                 "Redis Cache Lookup",
// //                 "Cache Miss →",
// //                 "BM25 Retrieval",
// //                 "Top Documents",
// //                 "Context Construction",
// //                 "Ollama Local LLM",
// //                 "RAG Response + Cache",
// //               ].map((step, i, arr) => (
// //                 <div
// //                   key={i}
// //                   style={{
// //                     display: "flex",
// //                     alignItems: "center",
// //                     gap: "12px",
// //                     padding: "8px 0",
// //                     borderBottom:
// //                       i < arr.length - 1
// //                         ? "1px dashed rgba(0,212,255,0.1)"
// //                         : "none",
// //                   }}
// //                 >
// //                   <div
// //                     style={{
// //                       width: 6,
// //                       height: 6,
// //                       borderRadius: "50%",
// //                       background: "rgba(0,212,255,0.4)",
// //                       flexShrink: 0,
// //                     }}
// //                   />
// //                   <span
// //                     style={{
// //                       fontFamily: "'IBM Plex Sans', sans-serif",
// //                       fontSize: "13px",
// //                       color: "rgba(160,210,230,0.65)",
// //                     }}
// //                   >
// //                     {step}
// //                   </span>
// //                 </div>
// //               ))}
// //             </div>
// //           </div>
// //         </div>
// //       </section>

// //       {/* ── RESEARCH CONTRIBUTION ──────────────────────────────────────── */}
// //       <section style={{ padding: "100px 24px" }}>
// //         <div style={{ maxWidth: "780px", margin: "0 auto", textAlign: "center" }}>
// //           <Badge>Research Contribution</Badge>
// //           <h2
// //             style={{
// //               fontFamily: "'Space Grotesk', sans-serif",
// //               fontSize: "clamp(28px, 4vw, 40px)",
// //               fontWeight: 700,
// //               letterSpacing: "-0.02em",
// //               lineHeight: 1.15,
// //               marginTop: "20px",
// //               marginBottom: "20px",
// //               color: "#f0f6ff",
// //             }}
// //           >
// //             Advancing Healthcare Document Intelligence
// //           </h2>
// //           <p
// //             style={{
// //               fontFamily: "'IBM Plex Sans', sans-serif",
// //               fontSize: "15px",
// //               color: "rgba(180,200,240,0.6)",
// //               lineHeight: 1.8,
// //               marginBottom: "48px",
// //             }}
// //           >
// //             HealthSentinel demonstrates measurable improvements across security,
// //             privacy, retrieval quality, and performance — validated by Autocannon
// //             load testing with 409 requests over 60 seconds.
// //           </p>
// //           <div
// //             style={{
// //               display: "grid",
// //               gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
// //               gap: "16px",
// //               textAlign: "left",
// //             }}
// //           >
// //             {[
// //               {
// //                 label: "Quantum-Resistant",
// //                 value: "ML-DSA / Dilithium",
// //                 icon: "⚛",
// //                 accent: "#00d4ff",
// //               },
// //               {
// //                 label: "Inference",
// //                 value: "100% Local via Ollama",
// //                 icon: "🏠",
// //                 accent: "#10b981",
// //               },
// //               {
// //                 label: "Avg Cache Latency",
// //                 value: "147 ms",
// //                 icon: "⚡",
// //                 accent: "#f59e0b",
// //               },
// //               {
// //                 label: "Cache Speed Boost",
// //                 value: "~300x faster",
// //                 icon: "🚀",
// //                 accent: "#8b5cf6",
// //               },
// //             ].map((item, i) => (
// //               <div
// //                 key={i}
// //                 style={{
// //                   background: "rgba(255,255,255,0.02)",
// //                   border: "1px solid rgba(255,255,255,0.07)",
// //                   borderRadius: "12px",
// //                   padding: "20px",
// //                 }}
// //               >
// //                 <div style={{ fontSize: "18px", marginBottom: "10px" }}>{item.icon}</div>
// //                 <div
// //                   style={{
// //                     fontFamily: "'Space Mono', monospace",
// //                     fontSize: "10px",
// //                     color: "rgba(150,170,210,0.5)",
// //                     letterSpacing: "0.1em",
// //                     textTransform: "uppercase",
// //                     marginBottom: "6px",
// //                   }}
// //                 >
// //                   {item.label}
// //                 </div>
// //                 <div
// //                   style={{
// //                     fontFamily: "'Space Grotesk', sans-serif",
// //                     fontSize: "15px",
// //                     fontWeight: 600,
// //                     color: item.accent,
// //                   }}
// //                 >
// //                   {item.value}
// //                 </div>
// //               </div>
// //             ))}
// //           </div>
// //         </div>
// //       </section>

// //       {/* ── CTA ────────────────────────────────────────────────────────── */}
// //       <section
// //         style={{
// //           padding: "100px 24px",
// //           background:
// //             "radial-gradient(ellipse 80% 60% at 50% 100%, rgba(0,212,255,0.06) 0%, transparent 70%)",
// //         }}
// //       >
// //         <div style={{ maxWidth: "620px", margin: "0 auto", textAlign: "center" }}>
// //           <h2
// //             style={{
// //               fontFamily: "'Space Grotesk', sans-serif",
// //               fontSize: "clamp(26px, 4vw, 38px)",
// //               fontWeight: 700,
// //               letterSpacing: "-0.02em",
// //               lineHeight: 1.2,
// //               marginBottom: "16px",
// //               color: "#f0f6ff",
// //             }}
// //           >
// //             Secure healthcare intelligence starts here
// //           </h2>
// //           <p
// //             style={{
// //               fontFamily: "'IBM Plex Sans', sans-serif",
// //               fontSize: "15px",
// //               color: "rgba(180,200,240,0.55)",
// //               lineHeight: 1.75,
// //               marginBottom: "36px",
// //             }}
// //           >
// //             Upload documents, query with AI, and rest easy knowing every signature
// //             is quantum-proof and every inference runs locally.
// //           </p>
// //           <div style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap" }}>
// //             {token ? (
// //               <button className="btn-primary" onClick={() => navigate("/dashboard")}>
// //                 <span>→</span> Open Dashboard
// //               </button>
// //             ) : (
// //               <>
// //                 <button className="btn-primary" onClick={() => navigate("/signup")}>
// //                   Get Started Free
// //                 </button>
// //                 <button className="btn-secondary" onClick={() => navigate("/login")}>
// //                   Sign In
// //                 </button>
// //               </>
// //             )}
// //           </div>
// //         </div>
// //       </section>

// //       {/* ── FOOTER ─────────────────────────────────────────────────────── */}
// //       <footer
// //         style={{
// //           padding: "32px 24px",
// //           borderTop: "1px solid rgba(255,255,255,0.05)",
// //           display: "flex",
// //           justifyContent: "space-between",
// //           alignItems: "center",
// //           flexWrap: "wrap",
// //           gap: "12px",
// //         }}
// //       >
// //         <span
// //           style={{
// //             fontFamily: "'Space Mono', monospace",
// //             fontSize: "12px",
// //             color: "rgba(100,130,170,0.4)",
// //             letterSpacing: "0.06em",
// //           }}
// //         >
// //           HealthSentinel · Post-Quantum Healthcare AI
// //         </span>
// //         <div style={{ display: "flex", gap: "20px" }}>
// //           {["ML-DSA", "Ollama", "BM25", "Redis", "AWS S3"].map((t) => (
// //             <span
// //               key={t}
// //               style={{
// //                 fontFamily: "'Space Mono', monospace",
// //                 fontSize: "10px",
// //                 color: "rgba(0,212,255,0.3)",
// //                 letterSpacing: "0.08em",
// //                 textTransform: "uppercase",
// //               }}
// //             >
// //               {t}
// //             </span>
// //           ))}
// //         </div>
// //       </footer>
// //     </div>
// //   );
// // }
// import React, { useState, useEffect, useRef } from "react";

// // ─── Infinite Slider (pure JS, no external deps) ──────────────────────────────
// function InfiniteSlider({ children, speed = 40, gap = 112 }) {
//   const items = React.Children.toArray(children);
//   return (
//     <div style={{ overflow: "hidden", width: "100%", position: "relative" }}>
//       <div style={{ display: "flex", width: "max-content", animation: `infiniteScroll ${speed}s linear infinite`, gap: `${gap}px` }}>
//         {items.map((child, i) => (
//           <div key={`a-${i}`} style={{ display: "flex", alignItems: "center", flexShrink: 0 }}>{child}</div>
//         ))}
//         {items.map((child, i) => (
//           <div key={`b-${i}`} style={{ display: "flex", alignItems: "center", flexShrink: 0 }}>{child}</div>
//         ))}
//       </div>
//     </div>
//   );
// }

// // ─── Animated Counter ──────────────────────────────────────────────────────────
// function AnimatedCounter({ target, suffix = "", duration = 2000 }) {
//   const [count, setCount] = useState(0);
//   const ref = useRef(null);
//   const started = useRef(false);
//   useEffect(() => {
//     const observer = new IntersectionObserver(([entry]) => {
//       if (entry.isIntersecting && !started.current) {
//         started.current = true;
//         const start = Date.now();
//         const isFloat = String(target).includes(".");
//         const tick = () => {
//           const progress = Math.min((Date.now() - start) / duration, 1);
//           const eased = 1 - Math.pow(1 - progress, 3);
//           const current = eased * target;
//           setCount(isFloat ? parseFloat(current.toFixed(1)) : Math.floor(current));
//           if (progress < 1) requestAnimationFrame(tick);
//           else setCount(target);
//         };
//         requestAnimationFrame(tick);
//       }
//     }, { threshold: 0.3 });
//     if (ref.current) observer.observe(ref.current);
//     return () => observer.disconnect();
//   }, [target, duration]);
//   return <span ref={ref}>{count}{suffix}</span>;
// }

// // ─── Main Home ─────────────────────────────────────────────────────────────────
// export default function Home() {
//   const [scrolled, setScrolled] = useState(false);
//   const [activePipeline, setActivePipeline] = useState(0);
//   const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;

//   useEffect(() => {
//     const onScroll = () => setScrolled(window.scrollY > 40);
//     window.addEventListener("scroll", onScroll);
//     return () => window.removeEventListener("scroll", onScroll);
//   }, []);

//   useEffect(() => {
//     const t = setInterval(() => setActivePipeline(p => (p + 1) % 7), 900);
//     return () => clearInterval(t);
//   }, []);

//   const pipelineSteps = [
//     { step: "01", label: "Auth" }, { step: "02", label: "Upload" },
//     { step: "03", label: "ML-DSA" }, { step: "04", label: "S3 Store" },
//     { step: "05", label: "BM25" }, { step: "06", label: "Redis" },
//     { step: "07", label: "RAG+LLM" },
//   ];

//   const features = [
//     { icon: "⚛", title: "Post-Quantum Cryptography", description: "ML-DSA (Dilithium) digital signatures protect patient documents against tomorrow's quantum threats. Future-proof security, validated by NIST.", accent: "#0ea5e9" },
//     { icon: "🔒", title: "Zero Data Leakage", description: "Ollama runs inference entirely on-premise. Sensitive patient records never leave your hospital network — no external API calls, no cloud exposure.", accent: "#6366f1" },
//     { icon: "📋", title: "BM25 + RAG Retrieval", description: "Clinical documents indexed with BM25 sparse retrieval, feeding the most relevant context to a local LLM for precise, evidence-grounded answers.", accent: "#10b981" },
//     { icon: "⚡", title: "Redis Query Caching", description: "Repeated clinical queries resolve in 70–150ms versus 20+ seconds cold — a ~300× speed improvement via intelligent semantic caching.", accent: "#f59e0b" },
//     { icon: "☁", title: "AWS S3 Secure Storage", description: "Documents stored in AWS S3 with full user-level isolation. Scalable, compliant, and accessible only by the clinician who uploaded them.", accent: "#ef4444" },
//     { icon: "🛡", title: "Supabase Auth + JWT", description: "Every request is cryptographically tied to a verified clinician identity through JWT-backed Supabase — strict access control at every layer.", accent: "#0ea5e9" },
//   ];

//   const comparisonRows = [
//     { component: "Signature Security", traditional: "ECDSA", hs: "ML-DSA (Dilithium PQC)" },
//     { component: "AI Privacy", traditional: "External LLM APIs", hs: "Local Ollama LLM" },
//     { component: "Document Retrieval", traditional: "Keyword search", hs: "BM25 + RAG pipeline" },
//     { component: "Storage", traditional: "Local file systems", hs: "AWS S3 with isolation" },
//     { component: "Authentication", traditional: "Basic session login", hs: "Supabase + JWT" },
//     { component: "Query Speed", traditional: "No optimization", hs: "Redis caching layer" },
//   ];

//   const menuItems = ["Features", "Architecture", "Security", "Research"];

//   return (
//     <div style={{ minHeight: "100vh", background: "#fff", color: "#0f172a", overflowX: "hidden", fontFamily: "'DM Sans', system-ui, sans-serif" }}>
//       <style>{`
//         @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;1,9..40,400&family=DM+Serif+Display:ital@0;1&family=DM+Mono:wght@400;500&display=swap');
//         *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

//         @keyframes infiniteScroll {
//           0%   { transform: translateX(0); }
//           100% { transform: translateX(-50%); }
//         }
//         @keyframes fadeUp {
//           from { opacity: 0; transform: translateY(20px); }
//           to   { opacity: 1; transform: translateY(0); }
//         }
//         @keyframes pulse {
//           0%, 100% { opacity: 1; }
//           50%       { opacity: 0.45; }
//         }

//         .ha  { animation: fadeUp 0.75s ease both; }
//         .ha1 { animation: fadeUp 0.75s 0.10s ease both; }
//         .ha2 { animation: fadeUp 0.75s 0.18s ease both; }
//         .ha3 { animation: fadeUp 0.75s 0.26s ease both; }
//         .ha4 { animation: fadeUp 0.75s 0.36s ease both; }

//         .nav-link { color: #64748b; text-decoration: none; font-size: 14px; font-weight: 500; transition: color 0.15s; }
//         .nav-link:hover { color: #0f172a; }

//         .btn-primary {
//           display: inline-flex; align-items: center; gap: 8px;
//           background: #0f172a; color: #fff; border: none; border-radius: 100px;
//           padding: 13px 24px; font-family: 'DM Sans', sans-serif;
//           font-size: 15px; font-weight: 600; cursor: pointer;
//           transition: all 0.2s; letter-spacing: -0.01em;
//         }
//         .btn-primary:hover { background: #1e293b; transform: translateY(-1px); box-shadow: 0 8px 28px rgba(15,23,42,0.2); }

//         .btn-ghost {
//           display: inline-flex; align-items: center;
//           background: transparent; color: #0f172a; border: none;
//           border-radius: 100px; padding: 13px 20px;
//           font-family: 'DM Sans', sans-serif; font-size: 15px; font-weight: 500;
//           cursor: pointer; transition: background 0.15s;
//         }
//         .btn-ghost:hover { background: rgba(15,23,42,0.05); }

//         .btn-white-outline {
//           display: inline-flex; align-items: center; gap: 8px;
//           background: transparent; color: rgba(255,255,255,0.85);
//           border: 1px solid rgba(255,255,255,0.25); border-radius: 100px;
//           padding: 13px 24px; font-family: 'DM Sans', sans-serif;
//           font-size: 15px; font-weight: 500; cursor: pointer; transition: all 0.2s;
//         }
//         .btn-white-outline:hover { background: rgba(255,255,255,0.1); border-color: rgba(255,255,255,0.5); }

//         .btn-sky {
//           display: inline-flex; align-items: center; gap: 8px;
//           background: #0ea5e9; color: #fff; border: none; border-radius: 100px;
//           padding: 13px 26px; font-family: 'DM Sans', sans-serif;
//           font-size: 15px; font-weight: 600; cursor: pointer; transition: all 0.2s;
//         }
//         .btn-sky:hover { background: #0284c7; transform: translateY(-1px); box-shadow: 0 8px 24px rgba(14,165,233,0.35); }

//         .feature-card {
//           background: #fff; border: 1px solid #e2e8f0; border-radius: 20px;
//           padding: 32px; transition: all 0.25s;
//         }
//         .feature-card:hover { border-color: #cbd5e1; box-shadow: 0 16px 48px rgba(15,23,42,0.09); transform: translateY(-4px); }

//         .metric-card {
//           background: #fff; border: 1px solid #e2e8f0;
//           border-radius: 20px; padding: 28px 24px; text-align: center;
//           transition: box-shadow 0.2s;
//         }
//         .metric-card:hover { box-shadow: 0 8px 32px rgba(15,23,42,0.08); }

//         .pipeline-node {
//           width: 38px; height: 38px; border-radius: 50%;
//           display: flex; align-items: center; justify-content: center;
//           font-family: 'DM Mono', monospace; font-size: 10px; font-weight: 500;
//           transition: all 0.35s; flex-shrink: 0;
//         }

//         .cmp-row:nth-child(even) { background: #f8fafc; }
//         .cmp-row:hover { background: #f1f5f9; }
//         .cmp-row { transition: background 0.15s; }

//         ::-webkit-scrollbar { width: 5px; }
//         ::-webkit-scrollbar-track { background: #f8fafc; }
//         ::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 3px; }
//       `}</style>

//       {/* ── NAVBAR ──────────────────────────────────────────────────────── */}
//       <header style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 50, padding: "8px 0" }}>
//         <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 24px" }}>
//           <div style={{
//             display: "flex", alignItems: "center", justifyContent: "space-between",
//             padding: scrolled ? "12px 28px" : "16px 28px",
//             background: scrolled ? "rgba(255,255,255,0.88)" : "transparent",
//             backdropFilter: scrolled ? "blur(20px)" : "none",
//             WebkitBackdropFilter: scrolled ? "blur(20px)" : "none",
//             borderRadius: "24px",
//             border: scrolled ? "1px solid rgba(226,232,240,0.9)" : "1px solid transparent",
//             boxShadow: scrolled ? "0 4px 24px rgba(15,23,42,0.07)" : "none",
//             transition: "all 0.35s cubic-bezier(0.4,0,0.2,1)",
//           }}>
//             {/* Logo */}
//             <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
//               <div style={{ width: 34, height: 34, borderRadius: "10px", background: "linear-gradient(135deg,#0ea5e9,#6366f1)", display: "flex", alignItems: "center", justifyContent: "center" }}>
//                 <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
//                   <path d="M10 3v14M3 10h14" stroke="#fff" strokeWidth="2.5" strokeLinecap="round"/>
//                   <circle cx="10" cy="10" r="3.5" fill="none" stroke="rgba(255,255,255,0.45)" strokeWidth="1.5"/>
//                 </svg>
//               </div>
//               <span style={{ fontFamily: "'DM Serif Display', Georgia, serif", fontSize: "20px", fontWeight: 400, color: "#0f172a", letterSpacing: "-0.01em" }}>HealthSentinel</span>
//             </div>

//             {/* Desktop links */}
//             <div style={{ display: "flex", gap: "32px" }}>
//               {menuItems.map(item => (
//                 <a key={item} href={`#${item.toLowerCase()}`} className="nav-link">{item}</a>
//               ))}
//             </div>

//             {/* Auth CTAs */}
//             <div style={{ display: "flex", gap: "4px", alignItems: "center" }}>
//               {token ? (
//                 <button className="btn-primary" style={{ fontSize: "14px", padding: "10px 20px" }} onClick={() => window.location.href = '/dashboard'}>Dashboard →</button>
//               ) : (
//                 <>
//                   <button className="btn-ghost" style={{ fontSize: "14px", padding: "10px 16px" }} onClick={() => window.location.href = '/login'}>Login</button>
//                   <button className="btn-primary" style={{ fontSize: "14px", padding: "10px 20px" }} onClick={() => window.location.href = '/signup'}>Sign Up</button>
//                 </>
//               )}
//             </div>
//           </div>
//         </div>
//       </header>

//       {/* ── HERO — full-viewport video, left-aligned text overlay (demo style) ── */}
//       <section style={{ position: "relative", minHeight: "100vh", overflow: "hidden" }}>
//         {/* Full-bleed video background — exact same pattern as the demo site */}
//         <div style={{ position: "absolute", inset: "4px", borderRadius: "48px", overflow: "hidden", border: "1px solid rgba(0,0,0,0.07)" }}>
//           <video
//             autoPlay loop muted playsInline
//             style={{ width: "100%", height: "100%", objectFit: "cover", opacity: "0.5" }}
//             src="https://ik.imagekit.io/lrigu76hy/tailark/dna-video.mp4?updatedAt=1745736251477"
//           />
//           {/* White gradient overlay — heavier on left for text legibility */}
//           <div
//   style={{
//     position: "absolute",
//     inset: 0,
//     background:
//       "linear-gradient(110deg, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.65) 45%, rgba(0,0,0,0.35) 100%)"
//   }}
// />
//         </div>

//         {/* Content — left-aligned exactly like the demo */}
//         <div style={{ position: "relative", zIndex: 10, maxWidth: "1280px", margin: "0 auto", padding: "0 48px" }}>
//           <div style={{ paddingTop: "clamp(130px, 18vw, 280px)", paddingBottom: "clamp(80px, 10vw, 160px)", maxWidth: "660px" }}>

//             {/* Eyebrow */}
//             <div className="ha" style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "#fff", border: "1px solid #e2e8f0", borderRadius: "100px", padding: "6px 16px 6px 10px", fontSize: "13px", fontWeight: 500, color: "#374151", boxShadow: "0 1px 6px rgba(15,23,42,0.07)", marginBottom: "28px" }}>
//               <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#10b981", display: "inline-block", animation: "pulse 2.5s infinite" }} />
//               Trusted by clinical teams · NIST-validated PQC
//             </div>

//             {/* Headline — large serif like the demo */}
//             <h1 className="ha1" style={{ fontFamily: "'DM Serif Display', Georgia, serif", fontSize: "clamp(44px, 6.5vw, 80px)", fontWeight: 400, lineHeight: 1.05, letterSpacing: "-0.025em", color: "#0f172a", marginBottom: "24px", maxWidth: "620px" }}>
//               AI-powered intelligence<br />
//               <em style={{ fontStyle: "italic", color: "#0ea5e9" }}>built for medicine.</em>
//             </h1>

//             <p className="ha2" style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "clamp(16px, 2vw, 19px)", fontWeight: 300, color: "#475569", lineHeight: 1.75, maxWidth: "500px", marginBottom: "44px" }}>
//               Secure healthcare document intelligence combining post-quantum cryptography, local LLM inference, and BM25 + RAG — zero data leaves your environment.
//             </p>

//             {/* CTA buttons — rounded-full, matching demo */}
//             <div className="ha3" style={{ display: "flex", alignItems: "center", gap: "12px", flexWrap: "wrap", marginBottom: "72px" }}>
//               {token ? (
//                 <button className="btn-primary" onClick={() => window.location.href = '/dashboard'}>
//                   Open Dashboard
//                   <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
//                 </button>
//               ) : (
//                 <>
//                   <button className="btn-primary" onClick={() => window.location.href = '/signup'}>
//                     Start for free
//                     <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
//                   </button>
//                   <button className="btn-ghost" onClick={() => window.location.href = '/login'}>Request a demo</button>
//                 </>
//               )}
//             </div>

//             {/* Pipeline visualizer */}
//             <div className="ha4">
//               <p style={{ fontFamily: "'DM Mono', monospace", fontSize: "10px", color: "#94a3b8", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: "12px" }}>System pipeline</p>
//               <div style={{ display: "inline-flex", alignItems: "center", background: "rgba(255,255,255,0.9)", backdropFilter: "blur(12px)", WebkitBackdropFilter: "blur(12px)", border: "1px solid rgba(226,232,240,0.95)", borderRadius: "14px", padding: "16px 20px", boxShadow: "0 2px 16px rgba(15,23,42,0.08)" }}>
//                 {pipelineSteps.map((s, i) => (
//                   <React.Fragment key={i}>
//                     <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "5px" }}>
//                       <div className="pipeline-node" style={{
//                         background: activePipeline === i ? "#0ea5e9" : activePipeline > i ? "rgba(14,165,233,0.1)" : "#f8fafc",
//                         border: `1.5px solid ${activePipeline === i ? "#0ea5e9" : activePipeline > i ? "rgba(14,165,233,0.3)" : "#e2e8f0"}`,
//                         color: activePipeline === i ? "#fff" : activePipeline > i ? "#0ea5e9" : "#94a3b8",
//                         boxShadow: activePipeline === i ? "0 0 14px rgba(14,165,233,0.4)" : "none",
//                       }}>{s.step}</div>
//                       <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "8px", color: activePipeline === i ? "#0f172a" : "#94a3b8", textAlign: "center", maxWidth: "52px", transition: "color 0.3s" }}>{s.label}</span>
//                     </div>
//                     {i < pipelineSteps.length - 1 && (
//                       <div style={{ width: "18px", height: "1px", background: activePipeline > i ? "rgba(14,165,233,0.4)" : "#e2e8f0", transition: "background 0.35s", flexShrink: 0, marginBottom: "18px" }} />
//                     )}
//                   </React.Fragment>
//                 ))}
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* ── INFINITE SLIDER — exact copy of demo's "Powering the best teams" section ── */}
//       <section style={{ background: "#fff", borderTop: "1px solid #f1f5f9" }}>
//         <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 24px" }}>
//           <div style={{ display: "flex", alignItems: "center" }}>
//             {/* Label */}
//             <div style={{ minWidth: "168px", borderRight: "1px solid #e2e8f0", paddingRight: "24px", paddingTop: "24px", paddingBottom: "24px", flexShrink: 0 }}>
//               <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "13px", color: "#64748b", textAlign: "right", lineHeight: 1.5 }}>Trusted infrastructure</p>
//             </div>
//             {/* Slider track */}
//             <div style={{ flex: 1, position: "relative", paddingTop: "24px", paddingBottom: "24px", overflow: "hidden" }}>
//               <InfiniteSlider speed={32} gap={80}>
//                 {[
//                   { label: "NIST PQC", sub: "ML-DSA" },
//                   { label: "AWS S3", sub: "Storage" },
//                   { label: "Ollama", sub: "Local LLM" },
//                   { label: "Redis", sub: "Caching" },
//                   { label: "Supabase", sub: "Auth + DB" },
//                   { label: "BM25", sub: "Retrieval" },
//                   { label: "Dilithium", sub: "Signatures" },
//                   { label: "RAG", sub: "Pipeline" },
//                 ].map((item, i) => (
//                   <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "0 8px" }}>
//                     <span style={{ fontFamily: "'DM Serif Display', Georgia, serif", fontSize: "17px", color: "#0f172a", fontWeight: 400, letterSpacing: "-0.01em", whiteSpace: "nowrap" }}>{item.label}</span>
//                     <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "10px", color: "#94a3b8", marginTop: "2px", letterSpacing: "0.06em", textTransform: "uppercase" }}>{item.sub}</span>
//                   </div>
//                 ))}
//               </InfiniteSlider>
//               {/* Fade edges */}
//               <div style={{ position: "absolute", top: 0, left: 0, bottom: 0, width: "80px", background: "linear-gradient(to right, #fff, transparent)", zIndex: 2, pointerEvents: "none" }} />
//               <div style={{ position: "absolute", top: 0, right: 0, bottom: 0, width: "80px", background: "linear-gradient(to left, #fff, transparent)", zIndex: 2, pointerEvents: "none" }} />
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* ── METRICS ─────────────────────────────────────────────────────── */}
//       <section style={{ padding: "80px 24px", background: "#f8fafc" }}>
//         <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
//           <div style={{ textAlign: "center", marginBottom: "48px" }}>
//             <p style={{ fontFamily: "'DM Mono', monospace", fontSize: "11px", color: "#0ea5e9", letterSpacing: "0.1em", textTransform: "uppercase", fontWeight: 500, marginBottom: "10px" }}>Performance</p>
//             <h2 style={{ fontFamily: "'DM Serif Display', Georgia, serif", fontSize: "clamp(28px, 4vw, 44px)", fontWeight: 400, color: "#0f172a", letterSpacing: "-0.02em" }}>Numbers that matter to clinicians.</h2>
//           </div>
//           <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "20px" }}>
//             {[
//               { value: 300, suffix: "×", label: "Faster Cached Queries", sub: "70–150ms vs 20–26s cold", color: "#0ea5e9" },
//               { value: 83, suffix: "ms", label: "Median Cache Latency", sub: "Redis hit response time", color: "#10b981" },
//               { value: 6.8, suffix: " req/s", label: "Cached Throughput", sub: "Autocannon benchmark", color: "#6366f1" },
//               { value: 409, suffix: "", label: "Requests / 60s", sub: "Load test validated", color: "#f59e0b" },
//             ].map((m, i) => (
//               <div key={i} className="metric-card">
//                 <div style={{ fontFamily: "'DM Serif Display', Georgia, serif", fontSize: "clamp(32px, 4vw, 44px)", fontWeight: 400, color: m.color, lineHeight: 1, letterSpacing: "-0.02em" }}>
//                   <AnimatedCounter target={m.value} suffix={m.suffix} />
//                 </div>
//                 <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "12px", fontWeight: 700, color: "#374151", marginTop: "10px", textTransform: "uppercase", letterSpacing: "0.05em" }}>{m.label}</div>
//                 <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "12px", color: "#94a3b8", marginTop: "4px" }}>{m.sub}</div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* ── PROBLEM STATEMENT ──────────────────────────────────────────── */}
//       <section id="security" style={{ padding: "100px 24px", background: "#fff" }}>
//         <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
//           <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "72px", alignItems: "start" }}>
//             <div>
//               <p style={{ fontFamily: "'DM Mono', monospace", fontSize: "11px", color: "#0ea5e9", letterSpacing: "0.1em", textTransform: "uppercase", fontWeight: 500, marginBottom: "14px" }}>Problem Statement</p>
//               <h2 style={{ fontFamily: "'DM Serif Display', Georgia, serif", fontSize: "clamp(28px, 4vw, 44px)", fontWeight: 400, lineHeight: 1.12, letterSpacing: "-0.02em", color: "#0f172a", marginBottom: "20px" }}>
//                 Healthcare AI has a<br /><em style={{ fontStyle: "italic", color: "#ef4444" }}>trust problem.</em>
//               </h2>
//               <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "15px", color: "#64748b", lineHeight: 1.8, marginBottom: "32px" }}>
//                 Existing AI platforms expose patient data to external APIs, use cryptography quantum computers will soon break, and lack the intelligent retrieval clinicians actually need.
//               </p>
//               <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
//                 {[
//                   { text: "Medical records exposed via external LLM API calls", color: "#ef4444" },
//                   { text: "ECDSA signatures vulnerable to quantum computing attacks", color: "#f59e0b" },
//                   { text: "Intelligent retrieval and analysis capabilities absent", color: "#8b5cf6" },
//                 ].map((item, i) => (
//                   <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: "12px", padding: "14px 16px", background: "#fafafa", border: "1px solid #f1f5f9", borderLeft: `3px solid ${item.color}`, borderRadius: "8px" }}>
//                     <span style={{ color: item.color, fontWeight: 700, fontSize: "14px", flexShrink: 0 }}>⚠</span>
//                     <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "13.5px", color: "#475569", lineHeight: 1.6 }}>{item.text}</span>
//                   </div>
//                 ))}
//               </div>
//             </div>

//             {/* Comparison table */}
//             <div style={{ background: "#fff", border: "1px solid #e2e8f0", borderRadius: "20px", overflow: "hidden", boxShadow: "0 4px 24px rgba(15,23,42,0.07)" }}>
//               <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", background: "#f8fafc", padding: "14px 20px", borderBottom: "1px solid #e2e8f0" }}>
//                 {["Component", "Traditional", "HealthSentinel"].map((h, i) => (
//                   <span key={i} style={{ fontFamily: "'DM Mono', monospace", fontSize: "10px", color: i === 2 ? "#0ea5e9" : "#94a3b8", textTransform: "uppercase", letterSpacing: "0.08em", fontWeight: 500 }}>{h}</span>
//                 ))}
//               </div>
//               {comparisonRows.map((row, i) => (
//                 <div key={i} className="cmp-row" style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", padding: "13px 20px", borderBottom: i < comparisonRows.length - 1 ? "1px solid #f1f5f9" : "none" }}>
//                   <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "12px", color: "#64748b", fontWeight: 600 }}>{row.component}</span>
//                   <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "12px", color: "#94a3b8", textDecoration: "line-through" }}>{row.traditional}</span>
//                   <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "12px", color: "#0ea5e9", fontWeight: 600 }}>{row.hs}</span>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* ── FEATURES ───────────────────────────────────────────────────── */}
//       <section id="features" style={{ padding: "100px 24px", background: "#f8fafc" }}>
//         <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
//           <div style={{ textAlign: "center", marginBottom: "64px" }}>
//             <p style={{ fontFamily: "'DM Mono', monospace", fontSize: "11px", color: "#0ea5e9", letterSpacing: "0.1em", textTransform: "uppercase", fontWeight: 500, marginBottom: "10px" }}>Platform Features</p>
//             <h2 style={{ fontFamily: "'DM Serif Display', Georgia, serif", fontSize: "clamp(28px, 4vw, 46px)", fontWeight: 400, lineHeight: 1.1, letterSpacing: "-0.02em", color: "#0f172a" }}>
//               Built for the quantum era.<br /><em style={{ fontStyle: "italic", color: "#64748b" }}>Trusted by clinicians.</em>
//             </h2>
//           </div>
//           <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "20px" }}>
//             {features.map((f, i) => (
//               <div key={i} className="feature-card">
//                 <div style={{ width: 46, height: 46, borderRadius: "12px", background: `${f.accent}12`, border: `1px solid ${f.accent}28`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "22px", marginBottom: "20px" }}>{f.icon}</div>
//                 <h3 style={{ fontFamily: "'DM Serif Display', Georgia, serif", fontSize: "19px", fontWeight: 400, color: "#0f172a", marginBottom: "10px", letterSpacing: "-0.01em" }}>{f.title}</h3>
//                 <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "14px", color: "#64748b", lineHeight: 1.75 }}>{f.description}</p>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* ── ARCHITECTURE ───────────────────────────────────────────────── */}
//       <section id="architecture" style={{ padding: "100px 24px", background: "#fff" }}>
//         <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
//           <div style={{ textAlign: "center", marginBottom: "56px" }}>
//             <p style={{ fontFamily: "'DM Mono', monospace", fontSize: "11px", color: "#0ea5e9", letterSpacing: "0.1em", textTransform: "uppercase", fontWeight: 500, marginBottom: "10px" }}>Architecture</p>
//             <h2 style={{ fontFamily: "'DM Serif Display', Georgia, serif", fontSize: "clamp(28px, 4vw, 44px)", fontWeight: 400, lineHeight: 1.12, letterSpacing: "-0.02em", color: "#0f172a", marginBottom: "14px" }}>RAG Pipeline + Redis Cache</h2>
//             <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "15px", color: "#64748b", maxWidth: "500px", margin: "0 auto", lineHeight: 1.7 }}>Every clinical query hits Redis first. Cache misses trigger BM25 retrieval and local Ollama inference — result is cached for future queries.</p>
//           </div>
//           <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px" }}>
//             <div style={{ background: "#fff", border: "1px solid #d1fae5", borderRadius: "20px", padding: "32px", boxShadow: "0 2px 16px rgba(16,185,129,0.07)" }}>
//               <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "24px" }}>
//                 <div style={{ width: 9, height: 9, borderRadius: "50%", background: "#10b981", boxShadow: "0 0 10px rgba(16,185,129,0.5)" }} />
//                 <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "11px", color: "#10b981", letterSpacing: "0.09em", textTransform: "uppercase", fontWeight: 500 }}>Cache Hit — ~83ms</span>
//               </div>
//               {["User Query", "Redis Cache Lookup", "Cache Hit ✓", "Return Cached Response"].map((step, i, arr) => (
//                 <div key={i} style={{ display: "flex", alignItems: "center", gap: "12px", padding: "11px 0", borderBottom: i < arr.length - 1 ? "1px dashed #d1fae5" : "none" }}>
//                   <div style={{ width: 7, height: 7, borderRadius: "50%", background: "#10b981", flexShrink: 0, opacity: 0.5 }} />
//                   <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "14px", color: "#374151" }}>{step}</span>
//                 </div>
//               ))}
//             </div>
//             <div style={{ background: "#fff", border: "1px solid #e0f2fe", borderRadius: "20px", padding: "32px", boxShadow: "0 2px 16px rgba(14,165,233,0.07)" }}>
//               <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "24px" }}>
//                 <div style={{ width: 9, height: 9, borderRadius: "50%", background: "#0ea5e9", boxShadow: "0 0 10px rgba(14,165,233,0.5)" }} />
//                 <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "11px", color: "#0ea5e9", letterSpacing: "0.09em", textTransform: "uppercase", fontWeight: 500 }}>Cache Miss — ~20-26s</span>
//               </div>
//               {["User Query", "Redis Cache Lookup", "Cache Miss →", "BM25 Retrieval", "Top Documents", "Context Construction", "Ollama Local LLM", "Response + Cache Result"].map((step, i, arr) => (
//                 <div key={i} style={{ display: "flex", alignItems: "center", gap: "12px", padding: "9px 0", borderBottom: i < arr.length - 1 ? "1px dashed #e0f2fe" : "none" }}>
//                   <div style={{ width: 7, height: 7, borderRadius: "50%", background: "#0ea5e9", flexShrink: 0, opacity: 0.45 }} />
//                   <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "13.5px", color: "#374151" }}>{step}</span>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* ── RESEARCH ───────────────────────────────────────────────────── */}
//       <section id="research" style={{ padding: "100px 24px", background: "#f8fafc" }}>
//         <div style={{ maxWidth: "900px", margin: "0 auto", textAlign: "center" }}>
//           <p style={{ fontFamily: "'DM Mono', monospace", fontSize: "11px", color: "#0ea5e9", letterSpacing: "0.1em", textTransform: "uppercase", fontWeight: 500, marginBottom: "10px" }}>Research Contribution</p>
//           <h2 style={{ fontFamily: "'DM Serif Display', Georgia, serif", fontSize: "clamp(28px, 4vw, 44px)", fontWeight: 400, lineHeight: 1.12, letterSpacing: "-0.02em", color: "#0f172a", marginBottom: "16px" }}>
//             Validated by benchmarks.<br /><em style={{ fontStyle: "italic", color: "#64748b" }}>Designed for trust.</em>
//           </h2>
//           <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "15px", color: "#64748b", lineHeight: 1.8, maxWidth: "540px", margin: "0 auto 56px" }}>
//             HealthSentinel delivers measurable improvements in security, privacy, retrieval quality, and performance — validated by Autocannon load testing with 409 requests over 60 seconds.
//           </p>
//           <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "16px" }}>
//             {[
//               { label: "Quantum-Resistant", value: "ML-DSA / Dilithium", icon: "⚛", color: "#0ea5e9" },
//               { label: "LLM Inference", value: "100% Local Ollama", icon: "🏠", color: "#10b981" },
//               { label: "Avg Cache Latency", value: "147 ms", icon: "⚡", color: "#f59e0b" },
//               { label: "Cache Speed Boost", value: "~300× faster", icon: "🚀", color: "#6366f1" },
//             ].map((item, i) => (
//               <div key={i} style={{ background: "#fff", border: "1px solid #e2e8f0", borderRadius: "16px", padding: "24px 20px", borderTop: `3px solid ${item.color}`, textAlign: "left" }}>
//                 <div style={{ fontSize: "24px", marginBottom: "12px" }}>{item.icon}</div>
//                 <div style={{ fontFamily: "'DM Mono', monospace", fontSize: "10px", color: "#94a3b8", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "6px" }}>{item.label}</div>
//                 <div style={{ fontFamily: "'DM Serif Display', Georgia, serif", fontSize: "17px", fontWeight: 400, color: item.color }}>{item.value}</div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* ── CTA — dark panel with ambient video ──────────────────────────── */}
//       <section style={{ padding: "80px 24px" }}>
//         <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
//           <div style={{ position: "relative", background: "#0f172a", borderRadius: "36px", padding: "84px 48px", textAlign: "center", overflow: "hidden" }}>
//             {/* Ambient video — very low opacity, same DNA video */}
//             <video
//               autoPlay loop muted playsInline
//               style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", opacity: 0.07, filter: "invert(1) hue-rotate(180deg)" }}
//               src="https://ik.imagekit.io/lrigu76hy/tailark/dna-video.mp4?updatedAt=1745736251477"
//             />
//             <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 70% 60% at 25% 40%, rgba(14,165,233,0.13), transparent), radial-gradient(ellipse 55% 50% at 78% 68%, rgba(99,102,241,0.11), transparent)" }} />
//             <div style={{ position: "relative", zIndex: 1 }}>
//               <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "rgba(14,165,233,0.12)", border: "1px solid rgba(14,165,233,0.28)", borderRadius: "100px", padding: "5px 16px", fontSize: "12px", fontFamily: "'DM Mono', monospace", fontWeight: 500, color: "#38bdf8", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: "28px" }}>
//                 <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#38bdf8", display: "inline-block", animation: "pulse 2.5s infinite" }} />
//                 Ready for your clinic
//               </div>
//               <h2 style={{ fontFamily: "'DM Serif Display', Georgia, serif", fontSize: "clamp(28px, 4vw, 52px)", fontWeight: 400, lineHeight: 1.08, letterSpacing: "-0.025em", color: "#fff", marginBottom: "16px" }}>
//                 Secure healthcare intelligence<br /><em style={{ fontStyle: "italic", color: "#7dd3fc" }}>starts here.</em>
//               </h2>
//               <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "15px", color: "rgba(148,163,184,0.9)", lineHeight: 1.75, maxWidth: "460px", margin: "0 auto 40px" }}>
//                 Upload documents, query with AI, and rest easy knowing every signature is quantum-proof and every inference runs locally.
//               </p>
//               <div style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap" }}>
//                 {token ? (
//                   <button className="btn-sky" onClick={() => window.location.href = '/dashboard'}>Open Dashboard →</button>
//                 ) : (
//                   <>
//                     <button className="btn-sky" onClick={() => window.location.href = '/signup'}>Get Started Free →</button>
//                     <button className="btn-white-outline" onClick={() => window.location.href = '/login'}>Sign In</button>
//                   </>
//                 )}
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* ── FOOTER ─────────────────────────────────────────────────────── */}
//       <footer style={{ padding: "32px 24px", borderTop: "1px solid #f1f5f9" }}>
//         <div style={{ maxWidth: "1100px", margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "16px" }}>
//           <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
//             <div style={{ width: 26, height: 26, borderRadius: "7px", background: "linear-gradient(135deg,#0ea5e9,#6366f1)", display: "flex", alignItems: "center", justifyContent: "center" }}>
//               <svg width="12" height="12" viewBox="0 0 20 20" fill="none"><path d="M10 3v14M3 10h14" stroke="#fff" strokeWidth="2.5" strokeLinecap="round"/></svg>
//             </div>
//             <span style={{ fontFamily: "'DM Serif Display', Georgia, serif", fontSize: "15px", color: "#374151" }}>HealthSentinel</span>
//             <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "13px", color: "#94a3b8" }}>· Post-Quantum Healthcare AI</span>
//           </div>
//           <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
//             {["ML-DSA", "Ollama", "BM25", "Redis", "AWS S3", "Supabase"].map(t => (
//               <span key={t} style={{ fontFamily: "'DM Mono', monospace", fontSize: "11px", color: "#94a3b8", letterSpacing: "0.05em" }}>{t}</span>
//             ))}
//           </div>
//         </div>
//       </footer>
//     </div>
//   );
// }
import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";

// ─── Infinite Slider ──────────────────────────────────────────────────────────
function InfiniteSlider({ children, speed = 38, gap = 80 }) {
  const items = React.Children.toArray(children);
  return (
    <div style={{ overflow: "hidden", width: "100%", position: "relative" }}>
      <div style={{
        display: "flex", width: "max-content",
        animation: `infiniteScroll ${speed}s linear infinite`,
        gap: `${gap}px`,
      }}>
        {items.map((c, i) => <div key={`a${i}`} style={{ display: "flex", alignItems: "center", flexShrink: 0 }}>{c}</div>)}
        {items.map((c, i) => <div key={`b${i}`} style={{ display: "flex", alignItems: "center", flexShrink: 0 }}>{c}</div>)}
      </div>
    </div>
  );
}

// ─── Animated Counter ─────────────────────────────────────────────────────────
function AnimatedCounter({ target, suffix = "", duration = 2000 }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const started = useRef(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !started.current) {
        started.current = true;
        const t0 = Date.now();
        const isFloat = String(target).includes(".");
        const tick = () => {
          const p = Math.min((Date.now() - t0) / duration, 1);
          const v = (1 - Math.pow(1 - p, 3)) * target;
          setCount(isFloat ? parseFloat(v.toFixed(1)) : Math.floor(v));
          if (p < 1) requestAnimationFrame(tick); else setCount(target);
        };
        requestAnimationFrame(tick);
      }
    }, { threshold: 0.3 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [target, duration]);
  return <span ref={ref}>{count}{suffix}</span>;
}

// ─── Pipeline Step ────────────────────────────────────────────────────────────
function PipelineStep({ step, label, active, done }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "7px" }}>
      <div style={{
        width: 44, height: 44,
        display: "flex", alignItems: "center", justifyContent: "center",
        fontFamily: "'DM Mono', monospace", fontSize: "11px", fontWeight: 700,
        transition: "all 0.35s",
        background: active ? "rgba(14,165,233,0.22)" : done ? "rgba(14,165,233,0.1)" : "rgba(255,255,255,0.05)",
        border: active ? "1.5px solid #38bdf8" : done ? "1.5px solid rgba(14,165,233,0.5)" : "1.5px solid rgba(255,255,255,0.18)",
        color: active ? "#38bdf8" : done ? "rgba(56,189,248,0.8)" : "rgba(200,220,255,0.4)",
        boxShadow: active ? "0 0 20px rgba(14,165,233,0.5), inset 0 0 12px rgba(14,165,233,0.1)" : done ? "0 0 6px rgba(14,165,233,0.15)" : "none",
      }}>{step}</div>
      <span style={{
        fontFamily: "'DM Mono', monospace", fontSize: "9px", fontWeight: 500,
        color: active ? "#f0f6ff" : done ? "rgba(56,189,248,0.65)" : "rgba(160,180,220,0.45)",
        textAlign: "center", maxWidth: "58px", transition: "color 0.3s",
        letterSpacing: "0.04em", textTransform: "uppercase",
      }}>{label}</span>
    </div>
  );
}

// ─── Main Home ────────────────────────────────────────────────────────────────
export default function Home() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const heroRef = useRef(null);
  const videoRef = useRef(null);
  const [activePipeline, setActivePipeline] = useState(0);
  const [parallaxY, setParallaxY] = useState(0);
  const [heroOpacity, setHeroOpacity] = useState(1);

  // Parallax + fade on scroll
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setParallaxY(y * 0.4);
      setHeroOpacity(Math.max(0, 1 - y / 600));
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const t = setInterval(() => setActivePipeline(p => (p + 1) % 7), 900);
    return () => clearInterval(t);
  }, []);

  const pipelineSteps = [
    { step: "01", label: "Auth" }, { step: "02", label: "Upload" },
    { step: "03", label: "ML-DSA" }, { step: "04", label: "S3" },
    { step: "05", label: "BM25" }, { step: "06", label: "Redis" },
    { step: "07", label: "RAG+LLM" },
  ];

  const features = [
    { icon: "⚛", title: "Post-Quantum Cryptography", description: "ML-DSA (Dilithium) signatures protect patient documents against quantum threats. Future-proof security, validated today by NIST.", accent: "#0ea5e9" },
    { icon: "🔒", title: "Zero Data Leakage", description: "Ollama runs inference entirely on-premise. Sensitive patient data never leaves your hospital network — no external API calls, ever.", accent: "#6366f1" },
    { icon: "📋", title: "BM25 + RAG Retrieval", description: "Clinical documents indexed with BM25, feeding the most relevant context to a local LLM for precise, evidence-grounded answers.", accent: "#10b981" },
    { icon: "⚡", title: "Redis Query Caching", description: "Repeated queries resolve in 70–150ms versus 20+ seconds cold — a ~300× speed improvement via intelligent semantic caching.", accent: "#f59e0b" },
    { icon: "☁", title: "AWS S3 Secure Storage", description: "Documents in AWS S3 with full user-level isolation. Scalable, compliant, accessible only by the clinician who uploaded them.", accent: "#ef4444" },
    { icon: "🛡", title: "Supabase Auth + JWT", description: "Every request is cryptographically tied to a verified clinician identity through JWT-backed Supabase — strict access at every layer.", accent: "#0ea5e9" },
  ];

  const comparison = [
    { component: "Signature Security", trad: "ECDSA", hs: "ML-DSA (Dilithium PQC)" },
    { component: "AI Privacy", trad: "External LLM APIs", hs: "Local Ollama LLM" },
    { component: "Document Retrieval", trad: "Keyword search", hs: "BM25 + RAG pipeline" },
    { component: "Storage", trad: "Local file systems", hs: "AWS S3 with isolation" },
    { component: "Authentication", trad: "Basic session login", hs: "Supabase + JWT" },
    { component: "Query Speed", trad: "No optimization", hs: "Redis caching layer" },
  ];

  const metrics = [
    { value: 300, suffix: "×", label: "Faster Cached Queries", sub: "70–150ms vs 20–26s cold", color: "#0ea5e9" },
    { value: 83, suffix: "ms", label: "Median Cache Latency", sub: "Redis hit response time", color: "#10b981" },
    { value: 6.8, suffix: " req/s", label: "Cached Throughput", sub: "Autocannon benchmark", color: "#6366f1" },
    { value: 409, suffix: "", label: "Requests / 60s", sub: "Load test validated", color: "#f59e0b" },
  ];

  return (
    <div style={{
      minHeight: "100vh",
      background: "#050810",
      color: "#e8eeff",
      overflowX: "hidden",
      fontFamily: "'DM Sans', system-ui, sans-serif",
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700&family=DM+Serif+Display:ital@0;1&family=DM+Mono:wght@400;500&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        @keyframes infiniteScroll {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0.35; }
        }
        @keyframes scanline {
          0%   { transform: translateY(-100%); }
          100% { transform: translateY(200vh); }
        }

        .ha  { animation: fadeUp 0.8s ease both; }
        .ha1 { animation: fadeUp 0.8s 0.12s ease both; }
        .ha2 { animation: fadeUp 0.8s 0.22s ease both; }
        .ha3 { animation: fadeUp 0.8s 0.32s ease both; }
        .ha4 { animation: fadeUp 0.8s 0.44s ease both; }

        .feature-card {
          background: rgba(255,255,255,0.02);
          border: 1px solid rgba(255,255,255,0.06);
          padding: 28px;
          transition: all 0.25s;
          cursor: default;
        }
        .feature-card:hover {
          background: rgba(255,255,255,0.04);
          border-color: rgba(14,165,233,0.25);
          transform: translateY(-3px);
          box-shadow: 0 20px 40px rgba(0,0,0,0.4);
        }

        .metric-card {
          background: rgba(255,255,255,0.025);
          border: 1px solid rgba(255,255,255,0.07);
          padding: 28px 24px;
          text-align: center;
          transition: border-color 0.2s;
        }
        .metric-card:hover { border-color: rgba(255,255,255,0.15); }

        .cmp-row { transition: background 0.15s; }
        .cmp-row:nth-child(even) { background: rgba(255,255,255,0.015); }
        .cmp-row:hover { background: rgba(255,255,255,0.04); }

        .btn-primary {
          display: inline-flex; align-items: center; gap: 8px;
          background: #0ea5e9; color: #fff; border: none;
          padding: 13px 26px; font-family: 'DM Sans', sans-serif;
          font-size: 14px; font-weight: 600; cursor: pointer;
          transition: all 0.2s; letter-spacing: 0.01em;
        }
        .btn-primary:hover { background: #0284c7; box-shadow: 0 8px 28px rgba(14,165,233,0.3); transform: translateY(-1px); }

        .btn-outline {
          display: inline-flex; align-items: center; gap: 8px;
          background: transparent; color: rgba(200,220,255,0.75);
          border: 1px solid rgba(255,255,255,0.15);
          padding: 13px 26px; font-family: 'DM Sans', sans-serif;
          font-size: 14px; font-weight: 500; cursor: pointer;
          transition: all 0.2s;
        }
        .btn-outline:hover { border-color: rgba(255,255,255,0.35); color: #e8eeff; background: rgba(255,255,255,0.04); }

        .btn-ghost-dark {
          display: inline-flex; align-items: center; gap: 6px;
          background: transparent; color: rgba(180,200,240,0.55);
          border: none; padding: 13px 18px;
          font-family: 'DM Sans', sans-serif;
          font-size: 14px; font-weight: 500; cursor: pointer; transition: color 0.15s;
        }
        .btn-ghost-dark:hover { color: #e8eeff; }

        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: #050810; }
        ::-webkit-scrollbar-thumb { background: rgba(14,165,233,0.25); }
      `}</style>

      <Navbar />

      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section ref={heroRef} style={{
        position: "relative",
        height: "100vh", minHeight: "640px", maxHeight: "960px",
        display: "flex", alignItems: "center",
        overflow: "hidden",
      }}>
        {/* Video — parallax, NO invert filter */}
        <div style={{
          position: "absolute", inset: 0,
          transform: `translateY(${parallaxY}px)`,
          willChange: "transform",
        }}>
          <video
            ref={videoRef}
            autoPlay loop muted playsInline
            style={{
              width: "100%", height: "115%", objectFit: "cover",
              opacity: 0.55,
            }}
            src="https://ik.imagekit.io/lrigu76hy/tailark/dna-video.mp4?updatedAt=1745736251477"
          />
        </div>

        {/* Strong dark overlay for readability */}
        <div style={{ position: "absolute", inset: 0, background: "rgba(5,8,16,0.72)" }} />
        {/* Blue radial glow */}
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 80% 55% at 40% 50%, rgba(14,165,233,0.09) 0%, transparent 70%)" }} />
        {/* Fade to bg at bottom */}
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, transparent 55%, #050810 100%)" }} />

        {/* Scanline */}
        <div style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none" }}>
          <div style={{
            position: "absolute", left: 0, right: 0, height: "1px",
            background: "linear-gradient(90deg, transparent, rgba(14,165,233,0.12), transparent)",
            animation: "scanline 10s linear infinite",
          }} />
        </div>

        {/* Grid */}
        <div style={{
          position: "absolute", inset: 0,
          backgroundImage: "linear-gradient(rgba(14,165,233,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(14,165,233,0.04) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
        }} />

        {/* Content */}
        <div style={{
          position: "relative", zIndex: 10,
          maxWidth: "1200px", margin: "0 auto",
          padding: "0 48px",
          paddingTop: "80px",
          opacity: heroOpacity,
          transition: "opacity 0.05s linear",
          width: "100%",
        }}>
          {/* Eyebrow */}
          <div className="ha" style={{
            display: "inline-flex", alignItems: "center", gap: "8px",
            border: "1px solid rgba(14,165,233,0.35)",
            background: "rgba(14,165,233,0.1)",
            padding: "6px 16px 6px 10px",
            fontSize: "11px", fontFamily: "'DM Mono', monospace",
            fontWeight: 500, color: "#38bdf8",
            letterSpacing: "0.08em", textTransform: "uppercase",
            marginBottom: "28px",
          }}>
            <span style={{ width: 7, height: 7, background: "#10b981", display: "inline-block", animation: "pulse 2.5s infinite" }} />
            Post-Quantum Healthcare AI · NIST Validated
          </div>

          {/* Headline */}
          <h1 className="ha1" style={{
            fontFamily: "'DM Serif Display', Georgia, serif",
            fontSize: "clamp(38px, 5.5vw, 72px)",
            fontWeight: 400, lineHeight: 1.06,
            letterSpacing: "-0.025em",
            color: "#f0f6ff", marginBottom: "20px",
            maxWidth: "680px",
          }}>
            AI-powered intelligence<br />
            <em style={{ fontStyle: "italic", color: "#38bdf8" }}>built for medicine.</em>
          </h1>

          <p className="ha2" style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: "clamp(14px, 1.6vw, 17px)",
            fontWeight: 400, color: "rgba(200,220,255,0.72)",
            lineHeight: 1.75, maxWidth: "500px",
            marginBottom: "16px",
          }}>
            Secure healthcare document intelligence combining post-quantum cryptography, local LLM inference, and BM25 + RAG — zero patient data leaves your environment.
          </p>

          {/* Stack tags */}
          <div className="ha2" style={{
            fontFamily: "'DM Mono', monospace", fontSize: "11px",
            color: "rgba(14,165,233,0.55)",
            letterSpacing: "0.1em", marginBottom: "32px",
            textTransform: "uppercase",
          }}>
            ML-DSA · Ollama · BM25 · Redis · AWS S3 · Supabase
          </div>

          {/* CTAs */}
          <div className="ha3" style={{ display: "flex", gap: "12px", flexWrap: "wrap", marginBottom: "48px" }}>
            {token ? (
              <button className="btn-primary" onClick={() => navigate("/dashboard")}>
                Open Dashboard
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </button>
            ) : (
              <>
                <button className="btn-primary" onClick={() => navigate("/signup")}>
                  Start for free
                  <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </button>
                <button className="btn-ghost-dark" onClick={() => navigate("/login")}>Sign in</button>
              </>
            )}
          </div>

          {/* Pipeline — bolder nodes */}
          <div className="ha4">
            <p style={{
              fontFamily: "'DM Mono', monospace", fontSize: "9px",
              color: "rgba(14,165,233,0.5)", letterSpacing: "0.16em",
              textTransform: "uppercase", marginBottom: "12px",
            }}>System pipeline</p>
            <div style={{
              display: "inline-flex", alignItems: "center",
              background: "rgba(5,8,16,0.75)",
              border: "1px solid rgba(14,165,233,0.22)",
              padding: "16px 22px", gap: "0",
              backdropFilter: "blur(8px)",
            }}>
              {pipelineSteps.map((s, i) => (
                <React.Fragment key={i}>
                  <PipelineStep {...s} active={activePipeline === i} done={activePipeline > i} />
                  {i < pipelineSteps.length - 1 && (
                    <div style={{
                      width: "22px", height: "2px",
                      background: activePipeline > i ? "rgba(14,165,233,0.65)" : "rgba(255,255,255,0.14)",
                      transition: "background 0.35s", flexShrink: 0, marginBottom: "22px",
                    }} />
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>

        {/* Scroll cue */}
        <div style={{
          position: "absolute", bottom: "28px", left: "48px",
          display: "flex", flexDirection: "column", gap: "6px",
          opacity: heroOpacity * 0.6, transition: "opacity 0.1s",
        }}>
          <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "9px", color: "rgba(14,165,233,0.5)", letterSpacing: "0.14em", textTransform: "uppercase" }}>Scroll</span>
          <div style={{ width: "1px", height: "32px", background: "linear-gradient(to bottom, rgba(14,165,233,0.5), transparent)" }} />
        </div>
      </section>

      {/* ── INFINITE SLIDER ────────────────────────────────────────────── */}
      <section style={{ borderTop: "1px solid rgba(255,255,255,0.06)", borderBottom: "1px solid rgba(255,255,255,0.06)", background: "rgba(0,0,0,0.3)" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 48px", display: "flex", alignItems: "center" }}>
          <div style={{ minWidth: "160px", borderRight: "1px solid rgba(255,255,255,0.07)", paddingRight: "32px", paddingTop: "24px", paddingBottom: "24px", flexShrink: 0 }}>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "12px", color: "rgba(120,140,180,0.5)", textAlign: "right" }}>Trusted infrastructure</p>
          </div>
          <div style={{ flex: 1, position: "relative", paddingTop: "24px", paddingBottom: "24px", overflow: "hidden" }}>
            <InfiniteSlider speed={30} gap={72}>
              {[
                { label: "NIST PQC", sub: "ML-DSA" },
                { label: "AWS S3", sub: "Storage" },
                { label: "Ollama", sub: "Local LLM" },
                { label: "Redis", sub: "Caching" },
                { label: "Supabase", sub: "Auth + DB" },
                { label: "BM25", sub: "Retrieval" },
                { label: "Dilithium", sub: "Signatures" },
                { label: "RAG", sub: "Pipeline" },
              ].map((item, i) => (
                <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "0 8px" }}>
                  <span style={{ fontFamily: "'DM Serif Display', Georgia, serif", fontSize: "16px", color: "rgba(200,220,255,0.7)", letterSpacing: "-0.01em", whiteSpace: "nowrap" }}>{item.label}</span>
                  <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "9px", color: "rgba(14,165,233,0.4)", marginTop: "2px", letterSpacing: "0.08em", textTransform: "uppercase" }}>{item.sub}</span>
                </div>
              ))}
            </InfiniteSlider>
            <div style={{ position: "absolute", top: 0, left: 0, bottom: 0, width: "80px", background: "linear-gradient(to right, rgba(0,0,0,0.3), transparent)", zIndex: 2, pointerEvents: "none" }} />
            <div style={{ position: "absolute", top: 0, right: 0, bottom: 0, width: "80px", background: "linear-gradient(to left, rgba(0,0,0,0.3), transparent)", zIndex: 2, pointerEvents: "none" }} />
          </div>
        </div>
      </section>

      {/* ── METRICS ─────────────────────────────────────────────────────── */}
      <section style={{ padding: "80px 48px", background: "rgba(0,0,0,0.2)" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "48px" }}>
            <p style={{ fontFamily: "'DM Mono', monospace", fontSize: "10px", color: "#0ea5e9", letterSpacing: "0.12em", textTransform: "uppercase", fontWeight: 500, marginBottom: "10px" }}>Performance</p>
            <h2 style={{ fontFamily: "'DM Serif Display', Georgia, serif", fontSize: "clamp(28px,4vw,44px)", fontWeight: 400, color: "#f0f6ff", letterSpacing: "-0.02em" }}>Numbers that matter to clinicians.</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px,1fr))", gap: "1px", background: "rgba(255,255,255,0.06)" }}>
            {metrics.map((m, i) => (
              <div key={i} className="metric-card" style={{ background: "#050810" }}>
                <div style={{ fontFamily: "'DM Serif Display', Georgia, serif", fontSize: "clamp(32px,4vw,46px)", fontWeight: 400, color: m.color, lineHeight: 1, letterSpacing: "-0.02em" }}>
                  <AnimatedCounter target={m.value} suffix={m.suffix} />
                </div>
                <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "11px", fontWeight: 700, color: "rgba(200,220,255,0.6)", marginTop: "10px", textTransform: "uppercase", letterSpacing: "0.06em" }}>{m.label}</div>
                <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "12px", color: "rgba(120,140,180,0.45)", marginTop: "5px" }}>{m.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PROBLEM STATEMENT ──────────────────────────────────────────── */}
      <section id="security" style={{ padding: "100px 48px", background: "#050810" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "72px", alignItems: "start" }}>
            <div>
              <p style={{ fontFamily: "'DM Mono', monospace", fontSize: "10px", color: "#0ea5e9", letterSpacing: "0.12em", textTransform: "uppercase", fontWeight: 500, marginBottom: "14px" }}>Problem Statement</p>
              <h2 style={{ fontFamily: "'DM Serif Display', Georgia, serif", fontSize: "clamp(28px,4vw,46px)", fontWeight: 400, lineHeight: 1.1, letterSpacing: "-0.02em", color: "#f0f6ff", marginBottom: "20px" }}>
                Healthcare AI has a<br /><em style={{ fontStyle: "italic", color: "#ef4444" }}>trust problem.</em>
              </h2>
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "15px", color: "rgba(180,200,240,0.55)", lineHeight: 1.85, marginBottom: "32px" }}>
                Existing AI platforms expose patient data to external APIs, use cryptography quantum computers will soon break, and lack the intelligent retrieval clinicians actually need.
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                {[
                  { text: "Medical records exposed via external LLM API calls", color: "#ef4444" },
                  { text: "ECDSA signatures vulnerable to quantum computing attacks", color: "#f59e0b" },
                  { text: "Intelligent retrieval and analysis capabilities absent", color: "#8b5cf6" },
                ].map((item, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: "12px", padding: "14px 16px", background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)", borderLeft: `3px solid ${item.color}` }}>
                    <span style={{ color: item.color, fontWeight: 700, fontSize: "13px", flexShrink: 0 }}>⚠</span>
                    <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "13.5px", color: "rgba(180,200,240,0.6)", lineHeight: 1.6 }}>{item.text}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Comparison */}
            <div style={{ border: "1px solid rgba(255,255,255,0.07)", overflow: "hidden" }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", background: "rgba(0,0,0,0.4)", padding: "13px 20px", borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
                {["Component", "Traditional", "HealthSentinel"].map((h, i) => (
                  <span key={i} style={{ fontFamily: "'DM Mono', monospace", fontSize: "9px", color: i === 2 ? "#0ea5e9" : "rgba(120,140,180,0.45)", textTransform: "uppercase", letterSpacing: "0.08em", fontWeight: 500 }}>{h}</span>
                ))}
              </div>
              {comparison.map((row, i) => (
                <div key={i} className="cmp-row" style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", padding: "13px 20px", borderBottom: i < comparison.length - 1 ? "1px solid rgba(255,255,255,0.04)" : "none" }}>
                  <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "12px", color: "rgba(180,200,240,0.55)", fontWeight: 600 }}>{row.component}</span>
                  <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "12px", color: "rgba(120,140,180,0.35)", textDecoration: "line-through" }}>{row.trad}</span>
                  <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "12px", color: "#0ea5e9", fontWeight: 600 }}>{row.hs}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── FEATURES ───────────────────────────────────────────────────── */}
      <section id="features" style={{ padding: "100px 48px", background: "rgba(0,0,0,0.25)", borderTop: "1px solid rgba(255,255,255,0.04)" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "64px" }}>
            <p style={{ fontFamily: "'DM Mono', monospace", fontSize: "10px", color: "#0ea5e9", letterSpacing: "0.12em", textTransform: "uppercase", fontWeight: 500, marginBottom: "10px" }}>Platform Features</p>
            <h2 style={{ fontFamily: "'DM Serif Display', Georgia, serif", fontSize: "clamp(28px,4vw,46px)", fontWeight: 400, lineHeight: 1.1, letterSpacing: "-0.02em", color: "#f0f6ff" }}>
              Built for the quantum era.<br /><em style={{ fontStyle: "italic", color: "rgba(180,200,240,0.45)" }}>Trusted by clinicians.</em>
            </h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px,1fr))", gap: "1px", background: "rgba(255,255,255,0.05)" }}>
            {features.map((f, i) => (
              <div key={i} className="feature-card" style={{ background: "#050810" }}>
                <div style={{ width: 44, height: 44, background: `${f.accent}12`, border: `1px solid ${f.accent}25`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "20px", marginBottom: "20px" }}>{f.icon}</div>
                <h3 style={{ fontFamily: "'DM Serif Display', Georgia, serif", fontSize: "19px", fontWeight: 400, color: "#f0f6ff", marginBottom: "10px", letterSpacing: "-0.01em" }}>{f.title}</h3>
                <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "13.5px", color: "rgba(160,180,220,0.55)", lineHeight: 1.8 }}>{f.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ARCHITECTURE ───────────────────────────────────────────────── */}
      <section id="architecture" style={{ padding: "100px 48px", background: "#050810", borderTop: "1px solid rgba(255,255,255,0.04)" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "56px" }}>
            <p style={{ fontFamily: "'DM Mono', monospace", fontSize: "10px", color: "#0ea5e9", letterSpacing: "0.12em", textTransform: "uppercase", fontWeight: 500, marginBottom: "10px" }}>Architecture</p>
            <h2 style={{ fontFamily: "'DM Serif Display', Georgia, serif", fontSize: "clamp(28px,4vw,44px)", fontWeight: 400, color: "#f0f6ff", letterSpacing: "-0.02em", marginBottom: "14px" }}>RAG Pipeline + Redis Cache</h2>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "15px", color: "rgba(160,180,220,0.55)", maxWidth: "480px", margin: "0 auto", lineHeight: 1.75 }}>Every clinical query hits Redis first. Cache misses trigger BM25 retrieval and local Ollama inference.</p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1px", background: "rgba(255,255,255,0.05)" }}>
            {/* Cache hit */}
            <div style={{ background: "#050810", border: "none", padding: "40px 32px", borderLeft: "3px solid #10b981" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "28px" }}>
                <div style={{ width: 8, height: 8, background: "#10b981", boxShadow: "0 0 10px rgba(16,185,129,0.6)" }} />
                <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "10px", color: "#10b981", letterSpacing: "0.1em", textTransform: "uppercase", fontWeight: 500 }}>Cache Hit — ~83ms</span>
              </div>
              {["User Query", "Redis Cache Lookup", "Cache Hit ✓", "Return Cached Response"].map((step, i, arr) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: "12px", padding: "12px 0", borderBottom: i < arr.length - 1 ? "1px solid rgba(16,185,129,0.08)" : "none" }}>
                  <div style={{ width: 6, height: 6, background: "#10b981", flexShrink: 0, opacity: 0.45 }} />
                  <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "14px", color: "rgba(200,230,210,0.7)" }}>{step}</span>
                </div>
              ))}
            </div>
            {/* Cache miss */}
            <div style={{ background: "#050810", border: "none", padding: "40px 32px", borderLeft: "3px solid #0ea5e9" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "28px" }}>
                <div style={{ width: 8, height: 8, background: "#0ea5e9", boxShadow: "0 0 10px rgba(14,165,233,0.6)" }} />
                <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "10px", color: "#0ea5e9", letterSpacing: "0.1em", textTransform: "uppercase", fontWeight: 500 }}>Cache Miss — ~20-26s</span>
              </div>
              {["User Query", "Redis Cache Lookup", "Cache Miss →", "BM25 Retrieval", "Top Documents", "Context Construction", "Ollama Local LLM", "Response + Cache Result"].map((step, i, arr) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: "12px", padding: "9px 0", borderBottom: i < arr.length - 1 ? "1px solid rgba(14,165,233,0.06)" : "none" }}>
                  <div style={{ width: 6, height: 6, background: "#0ea5e9", flexShrink: 0, opacity: 0.4 }} />
                  <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "13.5px", color: "rgba(160,200,230,0.65)" }}>{step}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── RESEARCH ───────────────────────────────────────────────────── */}
      <section id="research" style={{ padding: "100px 48px", background: "rgba(0,0,0,0.25)", borderTop: "1px solid rgba(255,255,255,0.04)" }}>
        <div style={{ maxWidth: "900px", margin: "0 auto", textAlign: "center" }}>
          <p style={{ fontFamily: "'DM Mono', monospace", fontSize: "10px", color: "#0ea5e9", letterSpacing: "0.12em", textTransform: "uppercase", fontWeight: 500, marginBottom: "10px" }}>Research Contribution</p>
          <h2 style={{ fontFamily: "'DM Serif Display', Georgia, serif", fontSize: "clamp(28px,4vw,44px)", fontWeight: 400, lineHeight: 1.1, letterSpacing: "-0.02em", color: "#f0f6ff", marginBottom: "16px" }}>
            Validated by benchmarks.<br /><em style={{ fontStyle: "italic", color: "rgba(180,200,240,0.45)" }}>Designed for trust.</em>
          </h2>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "15px", color: "rgba(160,180,220,0.55)", lineHeight: 1.8, maxWidth: "540px", margin: "0 auto 56px" }}>
            HealthSentinel demonstrates measurable improvements across security, privacy, retrieval quality, and performance — validated by Autocannon load testing.
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px,1fr))", gap: "1px", background: "rgba(255,255,255,0.05)" }}>
            {[
              { label: "Quantum-Resistant", value: "ML-DSA / Dilithium", icon: "⚛", color: "#0ea5e9" },
              { label: "LLM Inference", value: "100% Local Ollama", icon: "🏠", color: "#10b981" },
              { label: "Avg Cache Latency", value: "147 ms", icon: "⚡", color: "#f59e0b" },
              { label: "Cache Speed Boost", value: "~300× faster", icon: "🚀", color: "#6366f1" },
            ].map((item, i) => (
              <div key={i} style={{ background: "#050810", padding: "28px 24px", borderTop: `2px solid ${item.color}`, textAlign: "left" }}>
                <div style={{ fontSize: "22px", marginBottom: "12px" }}>{item.icon}</div>
                <div style={{ fontFamily: "'DM Mono', monospace", fontSize: "9px", color: "rgba(120,140,180,0.45)", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "6px" }}>{item.label}</div>
                <div style={{ fontFamily: "'DM Serif Display', Georgia, serif", fontSize: "17px", fontWeight: 400, color: item.color }}>{item.value}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ─────────────────────────────────────────────────────────── */}
      <section style={{ padding: "80px 48px", background: "#050810", borderTop: "1px solid rgba(255,255,255,0.04)" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <div style={{ position: "relative", background: "#080c18", border: "1px solid rgba(255,255,255,0.07)", padding: "84px 48px", textAlign: "center", overflow: "hidden" }}>
            {/* Ambient video */}
            <video autoPlay loop muted playsInline
              style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", opacity: 0.07, filter: "invert(1) hue-rotate(180deg)" }}
              src="https://ik.imagekit.io/lrigu76hy/tailark/dna-video.mp4?updatedAt=1745736251477"
            />
            <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 70% 60% at 25% 40%, rgba(14,165,233,0.1), transparent), radial-gradient(ellipse 55% 50% at 78% 68%, rgba(99,102,241,0.08), transparent)" }} />
            <div style={{ position: "relative", zIndex: 1 }}>
              <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "rgba(14,165,233,0.08)", border: "1px solid rgba(14,165,233,0.2)", padding: "5px 14px", fontSize: "10px", fontFamily: "'DM Mono', monospace", fontWeight: 500, color: "#38bdf8", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "28px" }}>
                <span style={{ width: 6, height: 6, background: "#38bdf8", display: "inline-block", animation: "pulse 2.5s infinite" }} />
                Ready for your clinic
              </div>
              <h2 style={{ fontFamily: "'DM Serif Display', Georgia, serif", fontSize: "clamp(28px,4vw,54px)", fontWeight: 400, lineHeight: 1.08, letterSpacing: "-0.025em", color: "#f0f6ff", marginBottom: "16px" }}>
                Secure healthcare intelligence<br /><em style={{ fontStyle: "italic", color: "#7dd3fc" }}>starts here.</em>
              </h2>
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "15px", color: "rgba(148,163,184,0.8)", lineHeight: 1.75, maxWidth: "440px", margin: "0 auto 40px" }}>
                Upload documents, query with AI, and rest easy knowing every signature is quantum-proof and every inference runs locally.
              </p>
              <div style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap" }}>
                {token ? (
                  <button className="btn-primary" onClick={() => navigate("/dashboard")}>Open Dashboard →</button>
                ) : (
                  <>
                    <button className="btn-primary" onClick={() => navigate("/signup")}>Get Started Free →</button>
                    <button className="btn-outline" onClick={() => navigate("/login")}>Sign In</button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FOOTER ─────────────────────────────────────────────────────── */}
      <footer style={{ padding: "32px 48px", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "16px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <div style={{ width: 22, height: 22, background: "linear-gradient(135deg,#0ea5e9,#6366f1)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <svg width="10" height="10" viewBox="0 0 20 20" fill="none"><path d="M10 3v14M3 10h14" stroke="#fff" strokeWidth="2.5" strokeLinecap="round"/></svg>
            </div>
            <span style={{ fontFamily: "'DM Serif Display', Georgia, serif", fontSize: "14px", color: "rgba(200,220,255,0.6)" }}>HealthSentinel</span>
            <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "12px", color: "rgba(120,140,180,0.35)" }}>· Post-Quantum Healthcare AI</span>
          </div>
          <div style={{ display: "flex", gap: "24px" }}>
            {["ML-DSA", "Ollama", "BM25", "Redis", "AWS S3", "Supabase"].map(t => (
              <span key={t} style={{ fontFamily: "'DM Mono', monospace", fontSize: "10px", color: "rgba(14,165,233,0.25)", letterSpacing: "0.06em" }}>{t}</span>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}