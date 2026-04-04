import { useEffect, useRef, useState } from "react";

/* ─── PROJECTS DATA ─── */
const PROJECTS = [
  // ── REELS / CREATIVE ──
  { id: 1,  title: "Chocolate Groove Event",  category: "Event Coverage",    videoSrc: "/media/work/Chocolate.mp4",                  tag: "Reel"          },
  { id: 13, title: "Reel V3",                 category: "Creative",          videoSrc: "/media/work/V3.mp4",                         tag: "Reel"          },
  { id: 14, title: "Reel V5",                 category: "Creative",          videoSrc: "/media/work/V5.mp4",                         tag: "Reel"          },
  { id: 15, title: "Reel V6",                 category: "Creative",          videoSrc: "/media/work/V6.mp4",                         tag: "Reel"          },
  { id: 16, title: "Reel V7",                 category: "Creative",          videoSrc: "/media/work/V7.mp4",                         tag: "Reel"          },
  { id: 17, title: "Reel V9",                 category: "Creative",          videoSrc: "/media/work/V9.mp4",                         tag: "Reel"          },
  { id: 45, title: "Reel 1",                  category: "Creative",          videoSrc: "/media/work/REEL1.mp4",                      tag: "Reel"          },
  { id: 46, title: "Reel 11",                 category: "Creative",          videoSrc: "/media/work/Reel11.mp4",                     tag: "Reel"          },
  { id: 47, title: "Reels",                   category: "Creative",          videoSrc: "/media/work/REELS.mp4",                      tag: "Reel"          },
  { id: 48, title: "Reels 06",                category: "Creative",          videoSrc: "/media/work/REELS06.mp4",                    tag: "Reel"          },
  { id: 49, title: "V1",                      category: "Creative",          videoSrc: "/media/work/V1.mp4",                         tag: "Reel"          },
  { id: 50, title: "V2",                      category: "Creative",          videoSrc: "/media/work/V2.mp4",                         tag: "Reel"          },
  { id: 51, title: "V5",                      category: "Creative",          videoSrc: "/media/work/v5 (2).mp4",                     tag: "Reel"          },
  { id: 52, title: "V7",                      category: "Creative",          videoSrc: "/media/work/V7 (2).mp4",                     tag: "Reel"          },
  { id: 53, title: "Video 3",                 category: "Creative",          videoSrc: "/media/work/video3.mp4",                     tag: "Reel"          },
  { id: 40, title: "MJ",                      category: "Creative",          videoSrc: "/media/work/MJ.mp4",                         tag: "Reel"          },

  // ── ADVERTISEMENT (A) ──
  { id: 19, title: "AD",                      category: "Advertisement",     videoSrc: "/media/work/AD.mp4",                         tag: "Ad"            },
  { id: 20, title: "AD Vol. 2",               category: "Advertisement",     videoSrc: "/media/work/AD1.mp4",                        tag: "Ad"            },
  { id: 21, title: "AD Vol. 3",               category: "Advertisement",     videoSrc: "/media/work/AD2.mp4",                        tag: "Ad"            },
  { id: 22, title: "AD Vol. 4",               category: "Advertisement",     videoSrc: "/media/work/AD3.mp4",                        tag: "Ad"            },
  { id: 23, title: "AD Vol. 5",               category: "Advertisement",     videoSrc: "/media/work/AD4.mp4",                        tag: "Ad"            },
  { id: 24, title: "AD Vol. 6",               category: "Advertisement",     videoSrc: "/media/work/AD5.mp4",                        tag: "Ad"            },
  { id: 25, title: "AD Vol. 7",               category: "Advertisement",     videoSrc: "/media/work/AD6.mp4",                        tag: "Ad"            },
  { id: 27, title: "AD Vol. 9",               category: "Advertisement",     videoSrc: "/media/work/AD8.mp4",                        tag: "Ad"            },
  { id: 28, title: "AD Vol. 10",              category: "Advertisement",     videoSrc: "/media/work/AD9.mp4",                        tag: "Ad"            },
  { id: 29, title: "AD Vol. 23",              category: "Advertisement",     videoSrc: "/media/work/AD23.mp4",                       tag: "Ad"            },
  { id: 30, title: "AD Vol. 24",              category: "Advertisement",     videoSrc: "/media/work/AD24.mp4",                       tag: "Ad"            },
  { id: 37, title: "Feroz Ads V1",            category: "Advertisement",     videoSrc: "/media/work/FEROZADSV1.mp4",                 tag: "Ad"            },
  { id: 42, title: "New AD",                  category: "Advertisement",     videoSrc: "/media/work/NewAD.mp4",                      tag: "Ad"            },
  { id: 43, title: "New AD Vol. 2",           category: "Advertisement",     videoSrc: "/media/work/NEWAD1.mp4",                     tag: "Ad"            },
  { id: 44, title: "Paint Ad",                category: "Advertisement",     videoSrc: "/media/work/PaintAd.mp4",                    tag: "Ad"            },
  { id: 54, title: "X Square Ad",             category: "Advertisement",     videoSrc: "/media/work/XSQUAREAD.mp4",                  tag: "Ad"            },

  // ── FOOD & BEVERAGE (R = Restaurant) ──
  { id: 2,  title: "Epicater",                category: "Food & Beverage",   videoSrc: "/media/work/Epicater.mp4",                   tag: "Brand Film"    },
  { id: 3,  title: "Epicater Vol. 2",         category: "Food & Beverage",   videoSrc: "/media/work/Epicater2.mp4",                  tag: "Brand Film"    },
  { id: 6,  title: "Goli Soda",               category: "Food & Beverage",   videoSrc: "/media/work/GOLI SODA.mp4",                  tag: "Brand Film"    },
  { id: 7,  title: "Goli Soda Vol. 2",        category: "Food & Beverage",   videoSrc: "/media/work/GOLISODA2.mp4",                  tag: "Brand Film"    },
  { id: 8,  title: "Goli Soda Vol. 3",        category: "Food & Beverage",   videoSrc: "/media/work/GOLISODA3.mp4",                  tag: "Brand Film"    },
  { id: 9,  title: "Goli Soda Vol. 4",        category: "Food & Beverage",   videoSrc: "/media/work/GOLISODA4.mp4",                  tag: "Brand Film"    },
  { id: 39, title: "Maharaja",                category: "Food & Beverage",   videoSrc: "/media/work/MAHARAJA.mp4",                   tag: "Brand Film"    },

  // ── PERSONAL BRANDING (P) ──
  { id: 10, title: "Sushant",                 category: "Personal Branding", videoSrc: "/media/work/SUSHANT.mp4",                    tag: "Personal Brand"},
  { id: 31, title: "Atul",                    category: "Personal Branding", videoSrc: "/media/work/ATUL7.mp4",                      tag: "Personal Brand"},
  { id: 35, title: "Dipit Bhai",              category: "Personal Branding", videoSrc: "/media/work/DIPITBHAI.mp4",                  tag: "Personal Brand"},

  // ── CONSTRUCTION (C) ──
  { id: 4,  title: "Everlend",                category: "Construction",      videoSrc: "/media/work/EVERLAND.mp4",                   tag: "Brand Film"    },
  { id: 5,  title: "Everlend Reel",           category: "Construction",      videoSrc: "/media/work/Everlend1.mp4",                  tag: "Brand Film"    },

  // ── LOCAL BUSINESS (L) ──
  { id: 11, title: "Baby Reel",               category: "Lifestyle",         videoSrc: "/media/work/BABY.mp4",                       tag: "Lifestyle"     },
  { id: 12, title: "Covertee",                category: "Fashion & Apparel", videoSrc: "/media/work/covertee.mp4",                   tag: "Brand Film"    },
  { id: 32, title: "Corvette Reel",           category: "Automotive",        videoSrc: "/media/work/CorvetteReel.mp4",               tag: "Brand Film"    },
  { id: 33, title: "Corvette Reel Vol. 2",    category: "Automotive",        videoSrc: "/media/work/CorvetteReel2.mp4",              tag: "Brand Film"    },
  { id: 34, title: "Credible Group",          category: "Corporate",         videoSrc: "/media/work/CredibleGroup.mp4",              tag: "Brand Film"    },
  { id: 36, title: "Event Reel",              category: "Event Coverage",    videoSrc: "/media/work/EVENTR1.mp4",                    tag: "Event"         },
  { id: 38, title: "Hotel X",                 category: "Hospitality",       videoSrc: "/media/work/HotelX.mp4",                     tag: "Brand Film"    },
  { id: 41, title: "Negotiation",             category: "Corporate",         videoSrc: "/media/work/Negotiation.mp4",                tag: "Brand Film"    },
  { id: 18, title: "EVA Animation",           category: "Animation",         videoSrc: "/media/work/22 EVA - Animation_updated.mp4", tag: "Animation"     },
];

/* ─── CLIENT SITES ─── */
const CLIENT_SITES = [
  { url: "https://everlend.ca",       label: "everlend.ca",       tagline: "Lending, simplified.",           image: "/media/website/everland.png"  },
  { url: "https://laundryforall.com", label: "laundryforall.com", tagline: "On-demand laundry, delivered.",  image: "/media/website/lfa.png"       },
  { url: "https://barberscave.ca",    label: "barberscave.ca",    tagline: "Premium barbershop experience.", image: "/media/website/babercave.png" },
];

/* ─── useReveal ─── */
function useReveal(threshold = 0.08) {
  const ref = useRef(null);
  const [on, setOn] = useState(false);
  const fired = useRef(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !fired.current) {
        fired.current = true;
        requestAnimationFrame(() => requestAnimationFrame(() => setOn(true)));
      }
    }, { threshold });
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);
  return [ref, on];
}

function BackButton({ onClick }) {
  const [hovered, setHovered] = useState(false);
  return (
    <button onClick={onClick}
      onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
      style={{
        position: "absolute", top: "16px", left: "16px", zIndex: 10,
        display: "flex", alignItems: "center", gap: "8px",
        background: hovered ? "#2587a8" : "rgba(0,0,0,0.55)",
        border: `1px solid ${hovered ? "#2587a8" : "rgba(238,227,202,0.18)"}`,
        borderRadius: "999px", padding: "8px 16px 8px 10px",
        cursor: "pointer", transition: "all 0.28s cubic-bezier(.22,1,.36,1)", backdropFilter: "blur(8px)",
      }}>
      <span style={{
        display: "flex", alignItems: "center", justifyContent: "center",
        width: "22px", height: "22px", borderRadius: "50%",
        background: hovered ? "rgba(255,255,255,0.15)" : "rgba(37,135,168,0.25)",
        transform: hovered ? "translateX(-3px)" : "translateX(0)",
        transition: "transform 0.28s cubic-bezier(.22,1,.36,1), background 0.28s",
      }}>
        <svg viewBox="0 0 24 24" width="13" height="13" fill="none"
          stroke={hovered ? "#fff" : "#eee3ca"} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="15 18 9 12 15 6"/>
        </svg>
      </span>
      <span style={{ fontSize: "12px", fontWeight: 600, color: hovered ? "#fff" : "#eee3ca", letterSpacing: "0.06em", fontFamily: "'Syne', sans-serif", transition: "color 0.28s" }}>Close</span>
    </button>
  );
}

function VideoModal({ project, onClose }) {
  const videoRef = useRef(null);
  useEffect(() => {
    document.body.style.overflow = "hidden";
    const onKey = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    if (videoRef.current) videoRef.current.play();
    return () => { document.body.style.overflow = ""; window.removeEventListener("keydown", onKey); };
  }, [onClose]);
  return (
    <div onClick={onClose} style={{
      position: "fixed", inset: 0, zIndex: 9999, background: "rgba(0,0,0,0.95)", backdropFilter: "blur(14px)",
      display: "flex", alignItems: "center", justifyContent: "center", padding: "20px", animation: "wFadeIn 0.3s ease",
    }}>
      <div onClick={e => e.stopPropagation()} style={{
        position: "relative", width: "min(92vw, 440px)", borderRadius: "22px", overflow: "hidden", background: "#000",
        boxShadow: "0 40px 100px rgba(0,0,0,0.85), 0 0 0 1px rgba(37,135,168,0.25)", animation: "wZoomIn 0.38s cubic-bezier(.22,1,.36,1)",
      }}>
        <BackButton onClick={onClose} />
        <div style={{
          padding: "14px 60px", background: "rgba(13,13,13,0.95)", borderBottom: "1px solid rgba(238,227,202,0.06)",
          display: "flex", alignItems: "center", justifyContent: "center", gap: "10px", flexWrap: "wrap",
        }}>
          <span style={{ fontSize: "10px", letterSpacing: "0.18em", textTransform: "uppercase", color: "#2587a8", fontFamily: "'DM Sans', sans-serif" }}>{project.category}</span>
          <span style={{ color: "rgba(238,227,202,0.2)", fontSize: "10px" }}>•</span>
          <span style={{ fontSize: "12px", fontWeight: 700, color: "#eee3ca", fontFamily: "'Syne', sans-serif" }}>{project.title}</span>
        </div>
        <video ref={videoRef} src={project.videoSrc} controls playsInline autoPlay
          style={{ width: "100%", display: "block", background: "#000", maxHeight: "82vh", objectFit: "contain" }} />
        <div style={{ height: "3px", background: "linear-gradient(to right,#d4af37,#2587a8,#d4af37)" }} />
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   ProjectCard
───────────────────────────────────────────────────────────── */
function ProjectCard({ project, index, visible, onClick }) {
  const [hovered, setHovered] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const videoRef = useRef(null);
  const cardRef  = useRef(null);
  const revealDelay = Math.min(index * 60, 1800);

  useEffect(() => {
    const video = videoRef.current;
    const card  = cardRef.current;
    if (!video || !card) return;
    const tryPlay = () => { if (video.src) video.play().catch(() => {}); };
    const nearIO = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !video.src) { video.src = project.videoSrc; video.load(); setLoaded(true); }
    }, { rootMargin: "500px 0px 500px 0px", threshold: 0 });
    nearIO.observe(card);
    const visibleIO = new IntersectionObserver(
      ([entry]) => { entry.isIntersecting ? tryPlay() : video.pause(); },
      { threshold: 0.2 }
    );
    visibleIO.observe(card);
    const onGesture = () => tryPlay();
    document.addEventListener("touchstart", onGesture, { once: true });
    return () => { nearIO.disconnect(); visibleIO.disconnect(); document.removeEventListener("touchstart", onGesture); };
  }, [project.videoSrc]);

  return (
    <div ref={cardRef} onClick={onClick}
      onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
      style={{
        width: "100%", aspectRatio: "9 / 16", position: "relative",
        cursor: "pointer", borderRadius: "18px", overflow: "hidden",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0) scale(1)" : "translateY(52px) scale(0.95)",
        transition: `opacity 0.65s ease ${revealDelay}ms, transform 0.65s cubic-bezier(.22,1,.36,1) ${revealDelay}ms, box-shadow 0.3s, border 0.3s`,
        border: hovered ? "1.5px solid rgba(37,135,168,0.7)" : "1px solid rgba(238,227,202,0.08)",
        boxShadow: hovered ? "0 24px 56px rgba(37,135,168,0.25), 0 4px 16px rgba(0,0,0,0.7)" : "0 4px 24px rgba(0,0,0,0.5)",
        background: "#111",
      }}>
      {!loaded && (
        <div style={{ position: "absolute", inset: 0, zIndex: 1, display: "flex", alignItems: "center", justifyContent: "center", background: "#0d0d0d" }}>
          <div style={{ width: "32px", height: "32px", borderRadius: "50%", border: "2px solid rgba(37,135,168,0.3)", borderTopColor: "#2587a8", animation: "ow-spin 0.9s linear infinite" }} />
        </div>
      )}
      <video ref={videoRef} muted playsInline loop preload="auto"
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", display: "block", zIndex: 1, opacity: loaded ? 1 : 0, transition: "opacity 0.4s ease" }} />
      <div style={{ position: "absolute", inset: 0, zIndex: 2, background: hovered ? "linear-gradient(to top, rgba(0,0,0,0.88) 0%, rgba(0,0,0,0.06) 50%, transparent 100%)" : "linear-gradient(to top, rgba(0,0,0,0.78) 0%, rgba(0,0,0,0.08) 55%, transparent 100%)", transition: "background 0.35s ease" }} />
      <div style={{ position: "absolute", top: "12px", right: "12px", zIndex: 3, background: "rgba(0,0,0,0.65)", border: "1px solid rgba(37,135,168,0.5)", borderRadius: "999px", padding: "3px 10px", backdropFilter: "blur(6px)" }}>
        <span style={{ fontSize: "9px", color: "#2587a8", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", fontFamily: "'DM Sans', sans-serif" }}>{project.tag}</span>
      </div>
      <div style={{ position: "absolute", top: "50%", left: "50%", transform: `translate(-50%, -50%) scale(${hovered ? 1 : 0.7})`, zIndex: 3, width: "52px", height: "52px", borderRadius: "50%", background: "rgba(0,0,0,0.45)", border: "2px solid rgba(238,227,202,0.6)", display: "flex", alignItems: "center", justifyContent: "center", backdropFilter: "blur(4px)", opacity: hovered ? 1 : 0, transition: "opacity 0.25s ease, transform 0.3s cubic-bezier(.22,1,.36,1)" }}>
        <svg viewBox="0 0 24 24" width="20" height="20" fill="#eee3ca"><polygon points="5 3 19 12 5 21 5 3"/></svg>
      </div>
      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, zIndex: 3, padding: "14px 14px 16px" }}>
        <p style={{ fontSize: "9px", color: "#2587a8", letterSpacing: "0.16em", textTransform: "uppercase", fontFamily: "'DM Sans', sans-serif", marginBottom: "3px" }}>{project.category}</p>
        <p style={{ fontSize: "13px", fontWeight: 700, color: "#eee3ca", fontFamily: "'Syne', sans-serif", lineHeight: 1.25 }}>{project.title}</p>
        <p style={{ marginTop: "7px", fontSize: "10px", color: "rgba(238,227,202,0.5)", fontFamily: "'DM Sans', sans-serif", letterSpacing: "0.05em", opacity: hovered ? 1 : 0, transform: hovered ? "translateY(0)" : "translateY(5px)", transition: "opacity 0.3s ease, transform 0.3s ease" }}>Tap to watch full ↗</p>
      </div>
      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "2.5px", zIndex: 4, background: hovered ? "linear-gradient(to right,#d4af37,#2587a8,#d4af37)" : "linear-gradient(to right,rgba(212,175,55,0.2),rgba(37,135,168,0.2),rgba(212,175,55,0.2))", transition: "background 0.35s ease" }} />
    </div>
  );
}

/* ════════════════════════════════════════════════════════════
   SiteCard
════════════════════════════════════════════════════════════ */
function SiteCard({ site }) {
  const [hovered, setHovered] = useState(false);
  return (
    <a
      href={site.url}
      target="_blank"
      rel="noopener noreferrer"
      draggable={false}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "flex", flexDirection: "column",
        borderRadius: "16px", overflow: "hidden",
        border: hovered ? "1.5px solid rgba(37,135,168,0.7)" : "1px solid rgba(37,135,168,0.2)",
        background: "#0a0a0a",
        textDecoration: "none",
        boxShadow: hovered ? "0 20px 48px rgba(37,135,168,0.18), 0 4px 16px rgba(0,0,0,0.6)" : "0 6px 24px rgba(0,0,0,0.5)",
        transform: hovered ? "translateY(-4px)" : "translateY(0)",
        transition: "transform 0.35s cubic-bezier(.22,1,.36,1), box-shadow 0.35s, border-color 0.3s",
        cursor: "pointer", width: "100%", flexShrink: 0,
      }}
    >
      <div style={{ width: "100%", aspectRatio: "16 / 9", background: "#111", overflow: "hidden", position: "relative", flexShrink: 0 }}>
        <img src={site.image} alt={site.label} draggable={false}
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "center top", display: "block" }} />
        <div style={{ position: "absolute", inset: 0, background: hovered ? "rgba(37,135,168,0.08)" : "transparent", transition: "background 0.3s ease", pointerEvents: "none" }} />
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "45%", background: "linear-gradient(to top, rgba(10,10,10,0.9) 0%, transparent 100%)", pointerEvents: "none" }} />
        <div style={{
          position: "absolute", bottom: "12px", right: "12px",
          background: hovered ? "#2587a8" : "rgba(0,0,0,0.7)",
          border: `1px solid ${hovered ? "#2587a8" : "rgba(37,135,168,0.4)"}`,
          borderRadius: "999px", padding: "5px 12px",
          display: "flex", alignItems: "center", gap: "5px",
          backdropFilter: "blur(6px)", transition: "background 0.3s, border-color 0.3s",
        }}>
          <span style={{ fontSize: "10px", fontWeight: 600, color: "#fff", fontFamily: "'DM Sans', sans-serif", letterSpacing: "0.06em" }}>Visit site</span>
          <svg viewBox="0 0 24 24" width="10" height="10" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
            <polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/>
          </svg>
        </div>
      </div>
      <div style={{ padding: "12px 16px 14px", borderTop: "1px solid rgba(238,227,202,0.05)", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "10px" }}>
        <div>
          <p style={{ fontSize: "13px", fontWeight: 700, color: hovered ? "#2587a8" : "#eee3ca", fontFamily: "'Syne', sans-serif", letterSpacing: "0.02em", marginBottom: "3px", transition: "color 0.3s" }}>{site.label}</p>
          <p style={{ fontSize: "11px", color: "rgba(238,227,202,0.38)", fontFamily: "'DM Sans', sans-serif" }}>{site.tagline}</p>
        </div>
        <div style={{
          flexShrink: 0, width: "30px", height: "30px", borderRadius: "50%",
          background: hovered ? "rgba(37,135,168,0.25)" : "rgba(37,135,168,0.1)",
          border: `1px solid ${hovered ? "rgba(37,135,168,0.7)" : "rgba(37,135,168,0.3)"}`,
          display: "flex", alignItems: "center", justifyContent: "center",
          transition: "background 0.3s, border-color 0.3s",
        }}>
          <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="#2587a8" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
            style={{ transform: hovered ? "translate(1px,-1px)" : "none", transition: "transform 0.3s" }}>
            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
            <polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/>
          </svg>
        </div>
      </div>
      <div style={{
        height: "2px", flexShrink: 0,
        background: hovered ? "linear-gradient(to right,#d4af37,#2587a8,#d4af37)" : "linear-gradient(to right,rgba(212,175,55,0.15),rgba(37,135,168,0.15),rgba(212,175,55,0.15))",
        transition: "background 0.35s ease",
      }} />
    </a>
  );
}

/* ════════════════════════════════════════════════════════════
   SitesCarousel
════════════════════════════════════════════════════════════ */
function SitesCarousel({ visible }) {
  const total = CLIENT_SITES.length;
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const t = setInterval(() => {
      setCurrent(c => (c + 1) % total);
    }, 2000);
    return () => clearInterval(t);
  }, [total]);

  return (
    <div style={{
      opacity: visible ? 1 : 0,
      transform: visible ? "translateY(0)" : "translateY(24px)",
      transition: "opacity 0.7s ease, transform 0.7s cubic-bezier(.22,1,.36,1)",
      maxWidth: "380px", margin: "0 auto",
    }}>
      <div style={{ overflow: "hidden", borderRadius: "16px" }}>
        <div style={{
          display: "flex",
          transform: `translateX(calc(-${current * 100}%))`,
          transition: "transform 0.45s cubic-bezier(.22,1,.36,1)",
        }}>
          {CLIENT_SITES.map((site) => (
            <div key={site.url} style={{ minWidth: "100%", boxSizing: "border-box" }}>
              <SiteCard site={site} />
            </div>
          ))}
        </div>
      </div>
      <div style={{ display: "flex", justifyContent: "center", gap: "6px", marginTop: "14px" }}>
        {CLIENT_SITES.map((_, i) => (
          <span key={i} style={{
            display: "block",
            width: i === current ? "22px" : "6px",
            height: "6px", borderRadius: "999px",
            background: i === current ? "#2587a8" : "rgba(37,135,168,0.25)",
            transition: "width 0.35s cubic-bezier(.22,1,.36,1), background 0.3s",
          }} />
        ))}
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════
   MAIN
══════════════════════════════════════════════════ */
export default function OurWork() {
  const [sectionRef, sectionVisible] = useReveal(0.04);
  const [gridRef, gridVisible] = useReveal(0.06);
  const [ctaRef, ctaVisible] = useReveal(0.1);
  const [activeProject, setActiveProject] = useState(null);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@600;700;800;900&family=DM+Sans:wght@300;400;500;600&display=swap');
        .ow-wrap  { font-family: 'DM Sans', sans-serif; }
        .ow-title { font-family: 'Syne', sans-serif; }
        .ow-dot-grid { background-image: radial-gradient(circle, #2587a8 1px, transparent 1px); background-size: 40px 40px; }
        .ow-hdr { opacity: 0; transform: translateY(-30px); transition: opacity 0.75s ease, transform 0.75s cubic-bezier(.22,1,.36,1); }
        .ow-hdr.on { opacity: 1; transform: translateY(0); }
        .ow-sub { opacity: 0; transform: translateY(20px); transition: opacity 0.7s ease 0.12s, transform 0.7s cubic-bezier(.22,1,.36,1) 0.12s; }
        .ow-sub.on { opacity: 1; transform: translateY(0); }
        .ow-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; }
        @media (max-width: 1100px) { .ow-grid { grid-template-columns: repeat(3, 1fr); } }
        @media (max-width: 720px)  { .ow-grid { grid-template-columns: repeat(2, 1fr); gap: 10px; } }
        @keyframes wFadeIn  { from { opacity: 0; } to { opacity: 1; } }
        @keyframes wZoomIn  { from { opacity: 0; transform: scale(0.92); } to { opacity: 1; transform: scale(1); } }
        @keyframes ow-spin  { to { transform: rotate(360deg); } }
        .ow-cta-wrap { opacity: 0; transform: translateY(24px); transition: opacity 0.7s ease, transform 0.7s cubic-bezier(.22,1,.36,1); }
        .ow-cta-wrap.on { opacity: 1; transform: translateY(0); }
      `}</style>

      {/* ADDED id="our-work" HERE */}
      <section id="our-work" ref={sectionRef} className="ow-wrap relative w-full py-20 px-4 sm:px-8 overflow-hidden" style={{ background: "#000" }}>
        <div className="absolute inset-0 ow-dot-grid opacity-[0.04] pointer-events-none" />
        <div className="absolute top-[-80px] left-1/4 w-[440px] h-[440px] rounded-full opacity-[0.05] blur-3xl pointer-events-none"
          style={{ background: "radial-gradient(circle,#2587a8,transparent 70%)" }} />
        <div className="absolute bottom-0 right-1/3 w-[360px] h-[360px] rounded-full opacity-[0.04] blur-3xl pointer-events-none"
          style={{ background: "radial-gradient(circle,#d4af37,transparent 70%)" }} />

        <div className="relative z-10 max-w-7xl mx-auto">

          <div className={`ow-hdr ${sectionVisible ? "on" : ""} text-center mb-12`}>
            <p className="flex items-center justify-center gap-3 text-xs tracking-[0.22em] uppercase mb-5" style={{ color: "#555" }}>
              <span className="block w-10 h-px" style={{ background: "#2587a8" }} />
              Our Work
              <span className="block w-10 h-px" style={{ background: "#2587a8" }} />
            </p>
            <h2 className="ow-title text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-4" style={{ color: "#eee3ca" }}>
              Crafted With<br className="hidden sm:block" />
              <span style={{ color: "#2587a8" }}> Purpose.</span>
            </h2>
            <p className={`ow-sub ${sectionVisible ? "on" : ""} text-sm sm:text-base max-w-lg mx-auto leading-relaxed`} style={{ color: "#777" }}>
              A glimpse into the work we're proud of — events, brands, and digital experiences built to last.
            </p>
          </div>

          <div ref={gridRef} className="ow-grid">
            {PROJECTS.map((project, i) => (
              <ProjectCard key={project.id} project={project} index={i} visible={gridVisible} onClick={() => setActiveProject(project)} />
            ))}
          </div>

          <div ref={ctaRef} className={`ow-cta-wrap ${ctaVisible ? "on" : ""} mt-16`}>
            <div style={{ textAlign: "center", marginBottom: "28px" }}>
              <p style={{ fontSize: "11px", letterSpacing: "0.2em", textTransform: "uppercase", color: "#555", fontFamily: "'DM Sans', sans-serif", marginBottom: "6px" }}>
                Live projects we've built
              </p>
              <p style={{ fontSize: "14px", color: "rgba(238,227,202,0.45)", fontFamily: "'DM Sans', sans-serif" }}>
                Explore the digital work beyond the screen.
              </p>
            </div>
            <SitesCarousel visible={ctaVisible} />
          </div>

        </div>
      </section>

      {activeProject && (
        <VideoModal project={activeProject} onClose={() => setActiveProject(null)} />
      )}
    </>
  );
}