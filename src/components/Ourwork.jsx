import { useEffect, useRef, useState, useCallback } from "react";

/* ─── PROJECTS DATA ─── */
const PROJECTS = [
  { id: 1,  title: "Chocolate Groove Event",  category: "Event Coverage",    videoSrc: "/media/work/Chocolate.mp4",                  tag: "E"  },
  { id: 13, title: "Reel V3",                 category: "Creative",          videoSrc: "/media/work/V3.mp4",                         tag: "L"  },
  { id: 14, title: "Reel V5",                 category: "Creative",          videoSrc: "/media/work/V5.mp4",                         tag: "R"  },
  { id: 15, title: "Reel V6",                 category: "Creative",          videoSrc: "/media/work/V6.mp4",                         tag: "R"  },
  { id: 16, title: "Reel V7",                 category: "Creative",          videoSrc: "/media/work/V7.mp4",                         tag: "L"  },
  { id: 17, title: "Reel V9",                 category: "Creative",          videoSrc: "/media/work/V9.mp4",                         tag: "R"  },
  { id: 45, title: "Reel 1",                  category: "Creative",          videoSrc: "/media/work/REEL1.mp4",                      tag: "C"  },
  { id: 46, title: "Reel 11",                 category: "Creative",          videoSrc: "/media/work/Reel11.mp4",                     tag: "L"  },
  { id: 47, title: "Reels",                   category: "Creative",          videoSrc: "/media/work/REELS.mp4",                      tag: "C"  },
  { id: 48, title: "Reels 06",                category: "Creative",          videoSrc: "/media/work/REELS06.mp4",                    tag: "P"  },
  { id: 49, title: "V1",                      category: "Creative",          videoSrc: "/media/work/V1.mp4",                         tag: "P"  },
  { id: 50, title: "V2",                      category: "Creative",          videoSrc: "/media/work/V2.mp4",                         tag: "A"  },
  { id: 51, title: "V5",                      category: "Creative",          videoSrc: "/media/work/v5 (2).mp4",                     tag: "C"  },
  { id: 52, title: "V7",                      category: "Creative",          videoSrc: "/media/work/V7 (2).mp4",                     tag: "A"  },
  { id: 53, title: "Video 3",                 category: "Creative",          videoSrc: "/media/work/video3.mp4",                     tag: "A"  },
  { id: 40, title: "MJ",                      category: "Creative",          videoSrc: "/media/work/MJ.mp4",                         tag: "E"  },
  { id: 19, title: "AD",                      category: "Advertisement",     videoSrc: "/media/work/AD.mp4",                         tag: "A"  },
  { id: 20, title: "AD Vol. 2",               category: "Advertisement",     videoSrc: "/media/work/AD1.mp4",                        tag: "P"  },
  { id: 21, title: "AD Vol. 3",               category: "Advertisement",     videoSrc: "/media/work/AD2.mp4",                        tag: "L"  },
  { id: 22, title: "AD Vol. 4",               category: "Advertisement",     videoSrc: "/media/work/AD3.mp4",                        tag: "P"  },
  { id: 23, title: "AD Vol. 5",               category: "Advertisement",     videoSrc: "/media/work/AD4.mp4",                        tag: "P"  },
  { id: 24, title: "AD Vol. 6",               category: "Advertisement",     videoSrc: "/media/work/AD5.mp4",                        tag: "R"  },
  { id: 25, title: "AD Vol. 7",               category: "Advertisement",     videoSrc: "/media/work/AD6.mp4",                        tag: "C"  },
  { id: 27, title: "AD Vol. 9",               category: "Advertisement",     videoSrc: "/media/work/AD8.mp4",                        tag: "L"  },
  { id: 28, title: "AD Vol. 10",              category: "Advertisement",     videoSrc: "/media/work/AD9.mp4",                        tag: "P"  },
  { id: 29, title: "AD Vol. 23",              category: "Advertisement",     videoSrc: "/media/work/AD23.mp4",                       tag: "A"  },
  { id: 30, title: "AD Vol. 24",              category: "Advertisement",     videoSrc: "/media/work/AD24.mp4",                       tag: "A"  },
  { id: 37, title: "Feroz Ads V1",            category: "Advertisement",     videoSrc: "/media/work/FEROZADSV1.mp4",                 tag: "C"  },
  { id: 42, title: "New AD",                  category: "Advertisement",     videoSrc: "/media/work/NewAD.mp4",                      tag: "C"  },
  { id: 43, title: "New AD Vol. 2",           category: "Advertisement",     videoSrc: "/media/work/NEWAD1.mp4",                     tag: "P"  },
  { id: 44, title: "Paint Ad",                category: "Advertisement",     videoSrc: "/media/work/PaintAd.mp4",                    tag: "A"  },
  { id: 54, title: "X Square Ad",             category: "Advertisement",     videoSrc: "/media/work/XSQUAREAD.mp4",                  tag: "A"  },
  { id: 2,  title: "Epicater",                category: "Food & Beverage",   videoSrc: "/media/work/Epicater.mp4",                   tag: "R"  },
  { id: 3,  title: "Epicater Vol. 2",         category: "Food & Beverage",   videoSrc: "/media/work/Epicater2.mp4",                  tag: "R"  },
  { id: 6,  title: "Goli Soda",              category: "Food & Beverage",   videoSrc: "/media/work/GOLI SODA.mp4",                  tag: "R"  },
  { id: 7,  title: "Goli Soda Vol. 2",        category: "Food & Beverage",   videoSrc: "/media/work/GOLISODA2.mp4",                  tag: "R"  },
  { id: 8,  title: "Goli Soda Vol. 3",        category: "Food & Beverage",   videoSrc: "/media/work/GOLISODA3.mp4",                  tag: "R"  },
  { id: 9,  title: "Goli Soda Vol. 4",        category: "Food & Beverage",   videoSrc: "/media/work/GOLISODA4.mp4",                  tag: "R"  },
  { id: 39, title: "Maharaja",                category: "Food & Beverage",   videoSrc: "/media/work/MAHARAJA.mp4",                   tag: "R"  },
  { id: 10, title: "Sushant",                 category: "Personal Branding", videoSrc: "/media/work/SUSHANT.mp4",                    tag: "P"  },
  { id: 31, title: "Atul",                    category: "Personal Branding", videoSrc: "/media/work/ATUL7.mp4",                      tag: "P"  },
  { id: 35, title: "Dipit Bhai",              category: "Personal Branding", videoSrc: "/media/work/DIPITBHAI.mp4",                  tag: "P"  },
  { id: 4,  title: "Everlend",                category: "Construction",      videoSrc: "/media/work/EVERLAND.mp4",                   tag: "L"  },
  { id: 5,  title: "Everlend Reel",           category: "Construction",      videoSrc: "/media/work/Everlend1.mp4",                  tag: "L"  },
  { id: 11, title: "Baby Reel",               category: "Lifestyle",         videoSrc: "/media/work/BABY.mp4",                       tag: "E"  },
  { id: 12, title: "Covertee",                category: "Automotive",        videoSrc: "/media/work/covertee.mp4",                   tag: "L"  },
  // { id: 32, title: "Corvette Reel",           category: "Automotive",        videoSrc: "/media/work/CorvetteReel.mp4",               tag: "L"  },
  { id: 33, title: "Corvette Reel Vol. 2",    category: "Automotive",        videoSrc: "/media/work/CorvetteReel2.mp4",              tag: "L"  },
  { id: 34, title: "Credible Group",          category: "Corporate",         videoSrc: "/media/work/CredibleGroup.mp4",              tag: "L"  },
  { id: 36, title: "Event Reel",              category: "Event Coverage",    videoSrc: "/media/work/EVENTR1.mp4",                    tag: "A"  },
  { id: 38, title: "Hotel X",                 category: "Hospitality",       videoSrc: "/media/work/HotelX.mp4",                     tag: "E"  },
  { id: 41, title: "Negotiation",             category: "Corporate",         videoSrc: "/media/work/Negotiation.mp4",                tag: "P"  },
  { id: 18, title: "EVA Animation",           category: "Animation",         videoSrc: "/media/work/22 EVA - Animation_updated.mp4", tag: "C"  },
];

/* ─── TAB DEFINITIONS ─── */
const TABS = [
  { key: "ALL", label: "All",             color: "#eee3ca" },
  { key: "A",   label: "Ads",             color: "#f4a261" },
  { key: "R",   label: "Restaurant",      color: "#2587a8" },
  { key: "P",   label: "Personal Brand",  color: "#d4af37" },
  { key: "L",   label: "Local Business",  color: "#6bcb77" },
  { key: "C",   label: "Construction",    color: "#e76f51" },
  { key: "E",   label: "Event",           color: "#9b59b6" },
];

const TAG_LABELS = { A: "Ad", R: "Reel", P: "Personal", L: "Local", C: "Construction", E: "Event" };
const TAG_COLORS = { A: "#f4a261", R: "#2587a8", P: "#d4af37", L: "#6bcb77", C: "#e76f51", E: "#9b59b6" };

/* ─── CLIENT SITES ─── */
const CLIENT_SITES = [
  { id: 1, url: "https://everlend.ca",        label: "everlend.ca",       tagline: "Lending, simplified.",            image: "/media/website/everland.png"  },
  { id: 2, url: "https://laundryforall.com",  label: "laundryforall.com", tagline: "On-demand laundry, delivered.",   image: "/media/website/lfa.png"       },
  { id: 3, url: "https://barberscave.ca",     label: "barberscave.ca",    tagline: "Premium barbershop experience.",  image: "/media/website/babercave.png" },
  { id: 4, url: "https://canmasonry.com/",    label: "canmasonry.com",    tagline: "Built to last, built with care.", image: "/media/website/can.png"       },
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

/* ─── BackButton ─── */
function BackButton({ onClick }) {
  const [hovered, setHovered] = useState(false);
  return (
    <button onClick={onClick} onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
      style={{ position: "absolute", top: "16px", left: "16px", zIndex: 10, display: "flex", alignItems: "center", gap: "8px", background: hovered ? "#2587a8" : "rgba(0,0,0,0.55)", border: `1px solid ${hovered ? "#2587a8" : "rgba(238,227,202,0.18)"}`, borderRadius: "999px", padding: "8px 16px 8px 10px", cursor: "pointer", transition: "all 0.28s cubic-bezier(.22,1,.36,1)", backdropFilter: "blur(8px)" }}>
      <span style={{ display: "flex", alignItems: "center", justifyContent: "center", width: "22px", height: "22px", borderRadius: "50%", background: hovered ? "rgba(255,255,255,0.15)" : "rgba(37,135,168,0.25)", transform: hovered ? "translateX(-3px)" : "translateX(0)", transition: "transform 0.28s cubic-bezier(.22,1,.36,1), background 0.28s" }}>
        <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke={hovered ? "#fff" : "#eee3ca"} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6" /></svg>
      </span>
      <span style={{ fontSize: "12px", fontWeight: 600, color: hovered ? "#fff" : "#eee3ca", letterSpacing: "0.06em", fontFamily: "'Syne', sans-serif", transition: "color 0.28s" }}>Close</span>
    </button>
  );
}

/* ─── VideoModal ─── */
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
    <div onClick={onClose} style={{ position: "fixed", inset: 0, zIndex: 9999, background: "rgba(0,0,0,0.95)", backdropFilter: "blur(14px)", display: "flex", alignItems: "center", justifyContent: "center", padding: "20px", animation: "wFadeIn 0.3s ease" }}>
      <div onClick={(e) => e.stopPropagation()} style={{ position: "relative", width: "min(92vw, 440px)", borderRadius: "22px", overflow: "hidden", background: "#000", boxShadow: "0 40px 100px rgba(0,0,0,0.85), 0 0 0 1px rgba(37,135,168,0.25)", animation: "wZoomIn 0.38s cubic-bezier(.22,1,.36,1)" }}>
        <BackButton onClick={onClose} />
        <div style={{ padding: "14px 60px", background: "rgba(13,13,13,0.95)", borderBottom: "1px solid rgba(238,227,202,0.06)", display: "flex", alignItems: "center", justifyContent: "center", gap: "10px", flexWrap: "wrap" }}>
          <span style={{ fontSize: "10px", letterSpacing: "0.18em", textTransform: "uppercase", color: "#2587a8", fontFamily: "'DM Sans', sans-serif" }}>{project.category}</span>
          <span style={{ color: "rgba(238,227,202,0.2)", fontSize: "10px" }}>•</span>
          <span style={{ fontSize: "12px", fontWeight: 700, color: "#eee3ca", fontFamily: "'Syne', sans-serif" }}>{project.title}</span>
        </div>
        <video ref={videoRef} src={project.videoSrc} controls playsInline autoPlay style={{ width: "100%", display: "block", background: "#000", maxHeight: "82vh", objectFit: "contain" }} />
        <div style={{ height: "3px", background: "linear-gradient(to right,#d4af37,#2587a8,#d4af37)" }} />
      </div>
    </div>
  );
}

/* ─── ProjectCard ─── */
function ProjectCard({ project, index, visible, onClick }) {
  const [hovered, setHovered] = useState(false);
  const [loaded, setLoaded]   = useState(false);
  const videoRef  = useRef(null);
  const cardRef   = useRef(null);
  const revealDelay = Math.min(index * 50, 1000);
  const tagColor = TAG_COLORS[project.tag] || "#2587a8";
  const tagLabel = TAG_LABELS[project.tag] || project.tag;

  useEffect(() => {
    const video = videoRef.current;
    const card  = cardRef.current;
    if (!video || !card) return;
    const tryPlay = () => { if (video.src) video.play().catch(() => {}); };
    const nearIO = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !video.src) { video.src = project.videoSrc; video.load(); setLoaded(true); }
    }, { rootMargin: "500px 0px 500px 0px", threshold: 0 });
    nearIO.observe(card);
    const visIO = new IntersectionObserver(([e]) => { e.isIntersecting ? tryPlay() : video.pause(); }, { threshold: 0.2 });
    visIO.observe(card);
    const onTouch = () => tryPlay();
    document.addEventListener("touchstart", onTouch, { once: true });
    return () => { nearIO.disconnect(); visIO.disconnect(); document.removeEventListener("touchstart", onTouch); };
  }, [project.videoSrc]);

  return (
    <div
      ref={cardRef}
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        width: "100%", aspectRatio: "9 / 16", position: "relative", cursor: "pointer", borderRadius: "18px", overflow: "visible",
        opacity: visible ? 1 : 0,
        transition: visible
          ? `transform 0.42s cubic-bezier(.22,1,.36,1), box-shadow 0.35s ease, border-color 0.3s ease`
          : `opacity 0.6s ease ${revealDelay}ms, transform 0.6s cubic-bezier(.22,1,.36,1) ${revealDelay}ms`,
        transform: !visible ? "translateY(60px) scale(0.94)" : hovered ? "translateY(-14px) scale(1.025)" : "translateY(0) scale(1)",
        zIndex: hovered ? 2 : 1,
        willChange: "transform",
      }}
    >
      <div style={{ position: "absolute", top: "-1px", right: "16px", zIndex: 10, background: tagColor, borderRadius: "0 0 10px 10px", padding: "5px 13px 7px", boxShadow: `0 6px 18px ${tagColor}66`, pointerEvents: "none" }}>
        <span style={{ fontSize: "9px", color: "#000", fontWeight: 900, letterSpacing: "0.14em", textTransform: "uppercase", fontFamily: "'DM Sans', sans-serif" }}>{tagLabel}</span>
      </div>
      <div style={{ position: "absolute", inset: 0, borderRadius: "18px", overflow: "hidden", border: hovered ? `1.5px solid ${tagColor}99` : "1px solid rgba(238,227,202,0.08)", boxShadow: hovered ? `0 36px 72px rgba(0,0,0,0.85), 0 0 0 1px ${tagColor}33` : "0 4px 24px rgba(0,0,0,0.5)", background: "#111", transition: "border-color 0.3s ease, box-shadow 0.35s ease" }}>
        {!loaded && (
          <div style={{ position: "absolute", inset: 0, zIndex: 1, display: "flex", alignItems: "center", justifyContent: "center", background: "#0d0d0d" }}>
            <div style={{ width: "32px", height: "32px", borderRadius: "50%", border: "2px solid rgba(37,135,168,0.3)", borderTopColor: "#2587a8", animation: "ow-spin 0.9s linear infinite" }} />
          </div>
        )}
        <video ref={videoRef} muted playsInline loop preload="auto"
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", display: "block", zIndex: 1, opacity: loaded ? 1 : 0, transition: "opacity 0.4s ease" }}
        />
        <div style={{ position: "absolute", inset: 0, zIndex: 2, background: hovered ? "linear-gradient(to top,rgba(0,0,0,0.92) 0%,rgba(0,0,0,0.06) 50%,transparent 100%)" : "linear-gradient(to top,rgba(0,0,0,0.78) 0%,rgba(0,0,0,0.08) 55%,transparent 100%)", transition: "background 0.35s ease" }} />
        <div style={{ position: "absolute", top: "50%", left: "50%", transform: `translate(-50%,-50%) scale(${hovered ? 1 : 0.6})`, zIndex: 3, width: "52px", height: "52px", borderRadius: "50%", background: "rgba(0,0,0,0.45)", border: "2px solid rgba(238,227,202,0.6)", display: "flex", alignItems: "center", justifyContent: "center", backdropFilter: "blur(4px)", opacity: hovered ? 1 : 0, transition: "opacity 0.25s ease, transform 0.35s cubic-bezier(.22,1,.36,1)" }}>
          <svg viewBox="0 0 24 24" width="20" height="20" fill="#eee3ca"><polygon points="5 3 19 12 5 21 5 3" /></svg>
        </div>
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, zIndex: 3, padding: "14px 14px 16px" }}>
          <p style={{ fontSize: "9px", color: tagColor, letterSpacing: "0.16em", textTransform: "uppercase", fontFamily: "'DM Sans', sans-serif", marginBottom: "3px" }}>{project.category}</p>
          <p style={{ fontSize: "13px", fontWeight: 700, color: "#eee3ca", fontFamily: "'Syne', sans-serif", lineHeight: 1.25 }}>{project.title}</p>
          <p style={{ marginTop: "7px", fontSize: "10px", color: "rgba(238,227,202,0.5)", fontFamily: "'DM Sans', sans-serif", letterSpacing: "0.05em", opacity: hovered ? 1 : 0, transform: hovered ? "translateY(0)" : "translateY(6px)", transition: "opacity 0.3s ease 0.06s, transform 0.3s ease 0.06s" }}>Tap to watch full ↗</p>
        </div>
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "2.5px", zIndex: 4, background: hovered ? `linear-gradient(to right,${tagColor},#2587a8,${tagColor})` : "linear-gradient(to right,rgba(212,175,55,0.15),rgba(37,135,168,0.15),rgba(212,175,55,0.15))", transition: "background 0.35s ease" }} />
      </div>
    </div>
  );
}

/* ─── SiteCard ─── */
function SiteCard({ site }) {
  const [hovered, setHovered] = useState(false);
  return (
    <a href={site.url} target="_blank" rel="noopener noreferrer" draggable={false}
      onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
      style={{ display: "flex", flexDirection: "column", borderRadius: "20px", overflow: "hidden", border: hovered ? "1.5px solid rgba(37,135,168,0.8)" : "1px solid rgba(37,135,168,0.25)", background: "#0a0a0a", textDecoration: "none", boxShadow: hovered ? "0 25px 50px rgba(37,135,168,0.25)" : "0 10px 30px rgba(0,0,0,0.5)", transform: hovered ? "translateY(-6px)" : "translateY(0)", transition: "all 0.4s cubic-bezier(0.22,1,0.36,1)", cursor: "pointer", width: "100%", userSelect: "none" }}>
      <div style={{ width: "100%", aspectRatio: "16/9", background: "#111", overflow: "hidden", position: "relative", flexShrink: 0 }}>
        <img src={site.image} alt={site.label} draggable={false} style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center top", display: "block", transition: "transform 0.5s ease", transform: hovered ? "scale(1.05)" : "scale(1)" }} />
        <div style={{ position: "absolute", inset: 0, background: hovered ? "linear-gradient(135deg,rgba(37,135,168,0.15),transparent)" : "transparent", transition: "background 0.3s ease", pointerEvents: "none" }} />
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "50%", background: "linear-gradient(to top,rgba(10,10,10,0.95) 0%,transparent 100%)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", bottom: "16px", right: "16px", background: hovered ? "#2587a8" : "rgba(0,0,0,0.8)", border: `1px solid ${hovered ? "#2587a8" : "rgba(37,135,168,0.5)"}`, borderRadius: "999px", padding: "6px 14px", display: "flex", alignItems: "center", gap: "6px", backdropFilter: "blur(8px)", transition: "all 0.3s ease", transform: hovered ? "translateX(-4px)" : "translateX(0)" }}>
          <span style={{ fontSize: "11px", fontWeight: 700, color: "#fff", fontFamily: "'DM Sans', sans-serif", letterSpacing: "0.08em" }}>Visit site</span>
          <svg viewBox="0 0 24 24" width="11" height="11" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" /><polyline points="15 3 21 3 21 9" /><line x1="10" y1="14" x2="21" y2="3" /></svg>
        </div>
      </div>
      <div style={{ padding: "16px 20px 18px", borderTop: "1px solid rgba(238,227,202,0.06)", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "12px", background: "#0d0d0d" }}>
        <div>
          <p style={{ fontSize: "15px", fontWeight: 800, color: hovered ? "#2587a8" : "#eee3ca", fontFamily: "'Syne', sans-serif", letterSpacing: "0.02em", marginBottom: "4px", transition: "color 0.3s" }}>{site.label}</p>
          <p style={{ fontSize: "11px", color: "rgba(238,227,202,0.45)", fontFamily: "'DM Sans', sans-serif" }}>{site.tagline}</p>
        </div>
        <div style={{ flexShrink: 0, width: "34px", height: "34px", borderRadius: "50%", background: hovered ? "rgba(37,135,168,0.25)" : "rgba(37,135,168,0.1)", border: `1.5px solid ${hovered ? "rgba(37,135,168,0.8)" : "rgba(37,135,168,0.35)"}`, display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.3s ease", transform: hovered ? "rotate(45deg)" : "rotate(0deg)" }}>
          <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="#2587a8" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" /><polyline points="15 3 21 3 21 9" /><line x1="10" y1="14" x2="21" y2="3" /></svg>
        </div>
      </div>
      <div style={{ height: "3px", flexShrink: 0, background: hovered ? "linear-gradient(90deg,#d4af37,#2587a8,#d4af37)" : "linear-gradient(90deg,rgba(212,175,55,0.2),rgba(37,135,168,0.2),rgba(212,175,55,0.2))", transition: "all 0.35s ease" }} />
    </a>
  );
}

/* ─── SitesCarousel ─── */
function SitesCarousel({ visible }) {
  const total = CLIENT_SITES.length;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStartX, setDragStartX] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);
  const intervalRef = useRef(null);
  const trackRef    = useRef(null);

  const getVisible = () => {
    if (typeof window === "undefined") return 3;
    if (window.innerWidth < 640)  return 1;
    if (window.innerWidth < 1024) return 2;
    return 3;
  };
  const [visibleCount, setVisibleCount] = useState(getVisible());
  useEffect(() => {
    const onR = () => setVisibleCount(getVisible());
    window.addEventListener("resize", onR);
    return () => window.removeEventListener("resize", onR);
  }, []);

  const maxIndex = Math.max(0, total - visibleCount);

  const startAuto = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setCurrentIndex(prev => (prev >= maxIndex ? 0 : prev + 1));
    }, 3500);
  }, [maxIndex]);

  useEffect(() => {
    if (!visible) return;
    startAuto();
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [visible, startAuto]);

  const goTo = (idx) => { setCurrentIndex(Math.max(0, Math.min(idx, maxIndex))); startAuto(); };

  const onDragStart = (x) => { setIsDragging(true); setDragStartX(x); setDragOffset(0); if (intervalRef.current) clearInterval(intervalRef.current); };
  const onDragMove  = (x) => { if (!isDragging) return; setDragOffset(x - dragStartX); };
  const onDragEnd   = () => {
    if (!isDragging) return;
    setIsDragging(false);
    const cardW = trackRef.current ? trackRef.current.offsetWidth / visibleCount : 300;
    if (dragOffset < -cardW * 0.25) goTo(currentIndex + 1);
    else if (dragOffset > cardW * 0.25) goTo(currentIndex - 1);
    else startAuto();
    setDragOffset(0);
  };

  return (
    <div style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(30px)", transition: "opacity 0.7s ease 0.2s, transform 0.7s cubic-bezier(0.22,1,0.36,1) 0.2s" }}>
      <div
        style={{ overflow: "hidden", borderRadius: "22px", cursor: isDragging ? "grabbing" : "grab" }}
        onMouseDown={(e) => onDragStart(e.clientX)}
        onMouseMove={(e) => onDragMove(e.clientX)}
        onMouseUp={onDragEnd}
        onMouseLeave={onDragEnd}
        onTouchStart={(e) => onDragStart(e.touches[0].clientX)}
        onTouchMove={(e) => onDragMove(e.touches[0].clientX)}
        onTouchEnd={onDragEnd}
      >
        <div ref={trackRef} style={{ display: "flex", transform: `translateX(calc(-${(currentIndex * 100) / visibleCount}% + ${dragOffset}px))`, transition: isDragging ? "none" : "transform 0.55s cubic-bezier(0.22,1,0.36,1)", willChange: "transform" }}>
          {CLIENT_SITES.map((site) => (
            <div
              key={site.id}
              id={`site-${site.id}`}
              style={{ minWidth: `${100 / visibleCount}%`, boxSizing: "border-box", padding: "0 10px" }}
            >
              <SiteCard site={site} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─── TabBar ─── */
function TabBar({ activeTab, setActiveTab }) {
  const [ripple, setRipple] = useState(null);

  const handleTab = (key, e) => {
    if (key === activeTab) return;
    const rect = e.currentTarget.getBoundingClientRect();
    setRipple({ key, x: e.clientX - rect.left, y: e.clientY - rect.top });
    setTimeout(() => setRipple(null), 600);
    setActiveTab(key);
  };

  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", flexWrap: "wrap", gap: "8px", marginBottom: "36px" }}>
      {TABS.map((tab) => {
        const isActive = activeTab === tab.key;
        return (
          <button
            key={tab.key}
            onClick={(e) => handleTab(tab.key, e)}
            style={{
              position: "relative", padding: "9px 22px", borderRadius: "999px",
              border: isActive ? `1.5px solid ${tab.color}` : "1.5px solid rgba(255,255,255,0.1)",
              background: isActive ? `${tab.color}1a` : "rgba(255,255,255,0.03)",
              color: isActive ? tab.color : "rgba(238,227,202,0.4)",
              fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: "12px",
              letterSpacing: "0.08em", cursor: "pointer", overflow: "hidden",
              transition: "all 0.38s cubic-bezier(.22,1,.36,1)",
              boxShadow: isActive ? `0 0 24px ${tab.color}44, inset 0 0 14px ${tab.color}0d` : "none",
              transform: isActive ? "scale(1.07)" : "scale(1)",
              textTransform: "uppercase",
            }}
          >
            {isActive && (
              <span style={{ position: "absolute", inset: 0, borderRadius: "999px", background: `linear-gradient(105deg, transparent 30%, ${tab.color}28 50%, transparent 70%)`, backgroundSize: "200% 100%", animation: "tabSweep 2s ease-in-out infinite", pointerEvents: "none" }} />
            )}
            {ripple?.key === tab.key && (
              <span style={{ position: "absolute", left: ripple.x, top: ripple.y, width: "6px", height: "6px", marginLeft: "-3px", marginTop: "-3px", borderRadius: "50%", background: tab.color, animation: "tabRipple 0.55s ease-out forwards", pointerEvents: "none", zIndex: 5 }} />
            )}
            {isActive && (
              <span style={{ display: "inline-block", width: "5px", height: "5px", borderRadius: "50%", background: tab.color, marginRight: "7px", verticalAlign: "middle", boxShadow: `0 0 8px ${tab.color}`, animation: "tabPulse 1.4s ease-in-out infinite" }} />
            )}
            {tab.label}
          </button>
        );
      })}
    </div>
  );
}

/* ════════════════════════════════════════════════════════════
   MAIN
════════════════════════════════════════════════════════════ */
export default function OurWork() {
  const [sectionRef, sectionVisible] = useReveal(0.04);
  const [gridRef, gridVisible]       = useReveal(0.06);
  const [ctaRef, ctaVisible]         = useReveal(0.1);
  const [activeProject, setActiveProject] = useState(null);
  const [activeTab, setActiveTab]         = useState("ALL");
  const [gridKey, setGridKey]             = useState(0);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setGridKey(k => k + 1);
  };

  const filtered = activeTab === "ALL" ? PROJECTS : PROJECTS.filter(p => p.tag === activeTab);

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
        .ow-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 20px; padding-top: 14px; }
        @media (max-width: 1100px) { .ow-grid { grid-template-columns: repeat(3, 1fr); } }
        @media (max-width: 720px)  { .ow-grid { grid-template-columns: repeat(2, 1fr); gap: 12px; } }
        .ow-grid-enter { animation: gridEnter 0.44s cubic-bezier(.22,1,.36,1) both; }
        @keyframes gridEnter { from { opacity: 0; transform: translateY(32px) scale(0.97); } to { opacity: 1; transform: translateY(0) scale(1); } }
        @keyframes wFadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes wZoomIn { from { opacity: 0; transform: scale(0.92); } to { opacity: 1; transform: scale(1); } }
        @keyframes ow-spin { to { transform: rotate(360deg); } }
        @keyframes tabSweep { 0% { background-position: 200% 0; } 100% { background-position: -200% 0; } }
        @keyframes tabRipple { 0% { transform: scale(1); opacity: 0.7; } 100% { transform: scale(22); opacity: 0; } }
        @keyframes tabPulse { 0%, 100% { opacity: 1; transform: scale(1); } 50% { opacity: 0.5; transform: scale(0.7); } }
        .ow-cta-wrap { opacity: 0; transform: translateY(24px); transition: opacity 0.7s ease, transform 0.7s cubic-bezier(.22,1,.36,1); }
        .ow-cta-wrap.on { opacity: 1; transform: translateY(0); }
        html { scroll-behavior: smooth; }
      `}</style>

      <section
        id="our-work"
        ref={sectionRef}
        className="ow-wrap relative w-full py-20 px-4 sm:px-8 overflow-hidden"
        style={{ background: "#000" }}
      >
        <div className="absolute inset-0 ow-dot-grid opacity-[0.04] pointer-events-none" />
        <div className="absolute top-[-80px] left-1/4 w-[440px] h-[440px] rounded-full opacity-[0.05] blur-3xl pointer-events-none" style={{ background: "radial-gradient(circle,#2587a8,transparent 70%)" }} />
        <div className="absolute bottom-0 right-1/3 w-[360px] h-[360px] rounded-full opacity-[0.04] blur-3xl pointer-events-none" style={{ background: "radial-gradient(circle,#d4af37,transparent 70%)" }} />

        <div className="relative z-10 max-w-7xl mx-auto">

          {/* ── Section Header ── */}
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

          {/* ── Tab Bar ── */}
          <TabBar activeTab={activeTab} setActiveTab={handleTabChange} />

          {/* ── Video Grid ── */}
          <div ref={gridRef} key={gridKey} className={`ow-grid ${gridVisible ? "ow-grid-enter" : ""}`}>
            {filtered.map((project, i) => (
              <ProjectCard
                key={project.id}
                project={project}
                index={i}
                visible={gridVisible}
                onClick={() => setActiveProject(project)}
              />
            ))}
          </div>

          {/* ── Live Sites Section ── */}
          <div ref={ctaRef} id="live-sites" className={`ow-cta-wrap ${ctaVisible ? "on" : ""} mt-24`}>
            <div style={{ textAlign: "center", marginBottom: "40px" }}>
              <p style={{ fontSize: "11px", letterSpacing: "0.28em", textTransform: "uppercase", color: "#555", fontFamily: "'DM Sans', sans-serif", marginBottom: "12px", display: "flex", alignItems: "center", justifyContent: "center", gap: "12px" }}>
                <span style={{ display: "block", width: "36px", height: "1px", background: "#2587a8" }} />
                Live Projects
                <span style={{ display: "block", width: "36px", height: "1px", background: "#2587a8" }} />
              </p>
              <h3 style={{ fontSize: "clamp(1.6rem,3.5vw,2.4rem)", fontWeight: 800, color: "#eee3ca", fontFamily: "'Syne', sans-serif", lineHeight: 1.2, marginBottom: "10px" }}>
                Websites We've <span style={{ color: "#2587a8" }}>Built.</span>
              </h3>
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