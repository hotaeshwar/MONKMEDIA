import { useEffect, useRef, useState } from "react";

/* ─── STATS ─── */
const STATS = [
  { target: 117, suffix: "+", label: "Projects" },
  { target: 109, suffix: "+", label: "Happy Clients" },
  { target: 5,   suffix: "★", label: "Rating" },
];

const TESTIMONIALS = [
  {
    id: 1,
    name: "Jasprit",
    role: "Business Owner",
    quote: "MonkMedia completely transformed our online presence. Their creative direction and attention to detail is unlike anything we've experienced before.",
    stars: 5,
  },
  {
    id: 2,
    name: "Nakul",
    role: "Founder, StartupCo",
    quote: "The team at MonkMedia delivered beyond expectations. Our brand identity now truly represents who we are, and the results speak for themselves.",
    stars: 5,
  },
  {
    id: 3,
    name: "Firoz",
    role: "Marketing Director",
    quote: "Working with MonkMedia was seamless from day one. Fast, reliable, and incredibly talented — they elevated our digital strategy to the next level.",
    stars: 5,
  },
];

/* ── useReveal ── */
function useReveal(threshold = 0.08) {
  const ref   = useRef(null);
  const [on, setOn] = useState(false);
  const fired = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const trigger = () => {
      if (fired.current) return;
      fired.current = true;
      requestAnimationFrame(() => requestAnimationFrame(() => setOn(true)));
    };
    const io = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) trigger(); },
      { threshold }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);

  return [ref, on];
}

/* ── CountUp ── */
function CountUp({ target, suffix, run }) {
  const [count, setCount] = useState(0);
  const raf     = useRef(null);
  const started = useRef(false);

  useEffect(() => {
    if (!run || started.current) return;
    started.current = true;
    const duration = 1600;
    const start    = performance.now();
    const step = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased    = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * target));
      if (progress < 1) raf.current = requestAnimationFrame(step);
    };
    raf.current = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf.current);
  }, [run, target]);

  return <span>{count}{suffix}</span>;
}

/* ── Stars ── */
const Stars = ({ count = 5 }) => (
  <div className="flex gap-1 mb-4">
    {Array.from({ length: count }).map((_, i) => (
      <svg key={i} viewBox="0 0 24 24" width="15" height="15" fill="#d4af37">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
      </svg>
    ))}
  </div>
);

/* ── Video Modal ── */
function VideoModal({ onClose }) {
  const videoRef = useRef(null);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    const v = videoRef.current;
    if (v) v.play();
    const onKey = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        background: "rgba(0,0,0,0.92)",
        backdropFilter: "blur(10px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
        animation: "modalFadeIn 0.3s ease",
      }}
    >
      <div
        onClick={e => e.stopPropagation()}
        style={{
          position: "relative",
          width: "100%",
          maxWidth: "900px",
          borderRadius: "20px",
          overflow: "hidden",
          background: "#000",
          boxShadow: "0 30px 80px rgba(0,0,0,0.7), 0 0 0 1px rgba(37,135,168,0.2)",
          animation: "modalZoomIn 0.35s cubic-bezier(.22,1,.36,1)",
        }}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          style={{
            position: "absolute",
            top: "14px",
            right: "14px",
            zIndex: 10,
            width: "38px",
            height: "38px",
            borderRadius: "50%",
            background: "rgba(0,0,0,0.6)",
            border: "1px solid rgba(255,255,255,0.15)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            transition: "all 0.25s ease",
          }}
          onMouseEnter={e => {
            e.currentTarget.style.background = "#2587a8";
            e.currentTarget.style.borderColor = "#2587a8";
            e.currentTarget.style.transform = "rotate(90deg) scale(1.1)";
          }}
          onMouseLeave={e => {
            e.currentTarget.style.background = "rgba(0,0,0,0.6)";
            e.currentTarget.style.borderColor = "rgba(255,255,255,0.15)";
            e.currentTarget.style.transform = "none";
          }}
        >
          <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round">
            <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
        </button>

        {/* 16:9 video */}
        <div style={{ position: "relative", paddingBottom: "56.25%", height: 0 }}>
          <video
            ref={videoRef}
            src="/media/testimonial/testimonial.mp4"
            controls
            playsInline
            preload="auto"
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              background: "#000",
            }}
          />
        </div>

        {/* accent bar */}
        <div style={{ height: "3px", background: "linear-gradient(to right, #d4af37, #2587a8, #d4af37)" }} />
      </div>
    </div>
  );
}

/* ── Video Card (thumbnail → opens modal) ── */
function VideoCard({ visible }) {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <div
        onClick={() => setModalOpen(true)}
        className="relative rounded-2xl overflow-hidden border border-[#1a1a1a] group cursor-pointer"
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? "translateX(0)" : "translateX(60px)",
          transition: "opacity 0.85s ease, transform 0.85s cubic-bezier(.22,1,.36,1)",
          transitionDelay: "0.3s",
          background: "#0a0a0a",
          minHeight: "260px",
        }}
      >
        <video
          src="/media/testimonial/testimonial.mp4"
          className="w-full h-full object-cover"
          style={{ maxHeight: "420px", minHeight: "260px", pointerEvents: "none" }}
          preload="metadata"
          muted
          playsInline
        />

        {/* play overlay */}
        <div
          className="absolute inset-0 flex flex-col items-center justify-center"
          style={{ background: "rgba(0,0,0,0.52)" }}
        >
          <div
            className="w-16 h-16 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300"
            style={{
              border: "2px solid rgba(238,227,202,0.6)",
              backdropFilter: "blur(6px)",
              background: "rgba(255,255,255,0.08)",
            }}
          >
            <svg viewBox="0 0 24 24" width="26" height="26" fill="#eee3ca">
              <polygon points="5 3 19 12 5 21 5 3" />
            </svg>
          </div>
          <p className="mt-3 text-[#eee3ca] text-xs tracking-widest uppercase opacity-70">
            Play Testimonials
          </p>
        </div>

        {/* gold bar */}
        <div
          className="absolute bottom-0 left-0 right-0 h-[3px]"
          style={{ background: "linear-gradient(to right, #d4af37, #2587a8, #d4af37)" }}
        />
      </div>

      {modalOpen && <VideoModal onClose={() => setModalOpen(false)} />}
    </>
  );
}

/* ── Testimonial Card ── */
function TestimonialCard({ item, index, visible }) {
  return (
    <div
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(50px)",
        transition: "opacity 0.7s ease, transform 0.7s cubic-bezier(.22,1,.36,1)",
        transitionDelay: `${0.12 + index * 0.12}s`,
        background: "linear-gradient(135deg,#0d0d0d 0%,#0a0a0a 100%)",
        border: "1px solid #1e1e1e",
      }}
      className="relative rounded-2xl p-6 sm:p-7 flex flex-col hover:border-[#2587a8] transition-colors duration-300 group"
    >
      <div className="absolute top-5 right-6 pointer-events-none select-none">
        <svg viewBox="0 0 40 30" width="36" height="28" fill="#2587a8" opacity="0.18">
          <path d="M0 30V18C0 7.333 5.333 1.333 16 0l2 4C12.667 5.333 10 8.667 10 14h6v16H0zm22 0V18C22 7.333 27.333 1.333 38 0l2 4C34.667 5.333 32 8.667 32 14h6v16H22z" />
        </svg>
      </div>

      <Stars count={item.stars} />

      <p style={{ color: "#c8bfae", fontSize: "14px", lineHeight: "1.8" }} className="mb-6 flex-1">
        "{item.quote}"
      </p>

      <div style={{ width: "32px", height: "2px", background: "#d4af37", borderRadius: "2px", marginBottom: "16px" }} />

      <div className="flex items-center gap-3">
        <div
          className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0"
          style={{ background: "linear-gradient(135deg,#2587a8,#1a6a87)", color: "#eee3ca" }}
        >
          {item.name[0]}
        </div>
        <div>
          <p style={{ color: "#eee3ca", fontWeight: 600, fontSize: "14px" }}>{item.name}</p>
          <p style={{ color: "#666", fontSize: "12px" }}>{item.role}</p>
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════
   MAIN
══════════════════════════════════════════════════ */
export default function Testimonials() {
  const [sectionRef, sectionVisible] = useReveal(0.04);
  const [statsRef,   statsVisible]   = useReveal(0.1);
  const [mediaRef,   mediaVisible]   = useReveal(0.06);
  const [cardsRef,   cardsVisible]   = useReveal(0.06);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@600;700;800&family=DM+Sans:wght@300;400;500&display=swap');
        .tst-wrap  { font-family: 'DM Sans', sans-serif; }
        .tst-title { font-family: 'Syne', sans-serif; }

        .tst-dot-grid {
          background-image: radial-gradient(circle, #2587a8 1px, transparent 1px);
          background-size: 38px 38px;
        }

        .tst-hdr {
          opacity: 0;
          transform: translateY(-28px);
          transition: opacity 0.75s ease, transform 0.75s cubic-bezier(.22,1,.36,1);
        }
        .tst-hdr.on { opacity: 1; transform: translateY(0); }

        .tst-stat {
          opacity: 0;
          transform: translateY(24px);
          transition: opacity 0.65s ease, transform 0.65s ease;
        }
        .tst-stat.on { opacity: 1; transform: translateY(0); }

        .tst-img-wrap {
          opacity: 0;
          transform: translateX(-55px);
          transition: opacity 0.85s ease, transform 0.85s cubic-bezier(.22,1,.36,1);
          transition-delay: 0.15s;
        }
        .tst-img-wrap.on { opacity: 1; transform: translateX(0); }

        @keyframes modalFadeIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        @keyframes modalZoomIn {
          from { opacity: 0; transform: scale(0.93); }
          to   { opacity: 1; transform: scale(1); }
        }
      `}</style>

      <section
        ref={sectionRef}
        className="tst-wrap relative w-full py-20 px-4 sm:px-8 overflow-hidden"
        style={{ background: "#000" }}
      >
        <div className="absolute inset-0 tst-dot-grid opacity-[0.045] pointer-events-none" />
        <div className="absolute top-0 left-1/3 w-[500px] h-[500px] rounded-full opacity-[0.055] blur-3xl pointer-events-none"
          style={{ background: "radial-gradient(circle,#2587a8,transparent 70%)" }} />
        <div className="absolute bottom-0 right-1/4 w-[380px] h-[380px] rounded-full opacity-[0.05] blur-3xl pointer-events-none"
          style={{ background: "radial-gradient(circle,#d4af37,transparent 70%)" }} />

        <div className="relative z-10 max-w-6xl mx-auto">

          {/* ── HEADER ── */}
          <div className={`tst-hdr ${sectionVisible ? "on" : ""} text-center mb-12`}>
            <p className="flex items-center justify-center gap-3 text-xs tracking-[0.2em] uppercase mb-5"
              style={{ color: "#555" }}>
              <span style={{ display: "block", width: "40px", height: "1px", background: "#2587a8" }} />
              What Clients Say
              <span style={{ display: "block", width: "40px", height: "1px", background: "#2587a8" }} />
            </p>
            <h2 className="tst-title text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-5"
              style={{ color: "#eee3ca" }}>
              Real Stories,
              <br className="hidden sm:block" />
              <span style={{ color: "#2587a8" }}> Real Results.</span>
            </h2>
            <p className="text-sm sm:text-base max-w-xl mx-auto leading-relaxed"
              style={{ color: "#888" }}>
              Hear directly from the clients who trusted MonkMedia to elevate their brand
              and grow their business.
            </p>
          </div>

          {/* ── STATS ── */}
          <div ref={statsRef} className="grid grid-cols-3 gap-6 sm:gap-10 mb-14 max-w-2xl mx-auto">
            {STATS.map(({ target, suffix, label }, i) => (
              <div
                key={label}
                className={`tst-stat ${statsVisible ? "on" : ""} text-center`}
                style={{ transitionDelay: `${0.05 + i * 0.12}s` }}
              >
                <p className="tst-title text-3xl sm:text-4xl lg:text-5xl font-bold" style={{ color: "#2587a8" }}>
                  <CountUp target={target} suffix={suffix} run={statsVisible} />
                </p>
                <p className="text-[11px] sm:text-xs tracking-[0.15em] uppercase mt-2" style={{ color: "#666" }}>
                  {label}
                </p>
              </div>
            ))}
          </div>

          {/* ── MEDIA ROW ── */}
          <div ref={mediaRef} className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-10">
            <div className={`tst-img-wrap ${mediaVisible ? "on" : ""} relative rounded-2xl overflow-hidden border border-[#1a1a1a]`}>
              <img
                src="/media/testimonial/testimonial.png"
                alt="Client testimonials"
                className="w-full object-cover"
                style={{ minHeight: "260px", maxHeight: "420px" }}
              />
              <div className="absolute bottom-0 left-0 right-0 h-[3px]"
                style={{ background: "linear-gradient(to right, #d4af37, #2587a8, #d4af37)" }} />
            </div>

            <VideoCard visible={mediaVisible} />
          </div>

          {/* ── CARDS ── */}
          <div ref={cardsRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {TESTIMONIALS.map((item, i) => (
              <TestimonialCard key={item.id} item={item} index={i} visible={cardsVisible} />
            ))}
          </div>

          {/* ── BOTTOM CTA ── */}
          <div className={`tst-stat ${sectionVisible ? "on" : ""} mt-14 text-center`} style={{ transitionDelay: "0.5s" }}>
            <p className="text-sm mb-5" style={{ color: "#666" }}>
              Ready to be our next success story?
            </p>
            <a
              href={`https://wa.me/15197746608?text=${encodeURIComponent("Hello MonkMedia! I'd like to start a project with you.")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-3 rounded-full text-sm font-semibold tracking-wide transition-all duration-300"
              style={{ color: "#eee3ca", border: "1px solid #2587a8" }}
              onMouseEnter={e => { e.currentTarget.style.background = "#2587a8"; }}
              onMouseLeave={e => { e.currentTarget.style.background = "transparent"; }}
            >
              Start Your Project
              <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
              </svg>
            </a>
          </div>

        </div>
      </section>
    </>
  );
}