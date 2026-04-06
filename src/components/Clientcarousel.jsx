import { useEffect, useRef, useState } from "react";

const techStack = [
  { id: 1, name: "Google",             src: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg" },
  { id: 2, name: "Meta",               src: "/media/technology/meta.png" },
  { id: 3, name: "TikTok",             src: "https://upload.wikimedia.org/wikipedia/en/a/a9/TikTok_logo.svg" },
  { id: 4, name: "Adobe Premiere Pro", src: "https://upload.wikimedia.org/wikipedia/commons/4/40/Adobe_Premiere_Pro_CC_icon.svg" },
  { id: 5, name: "Higgsfield AI",      src: "/media/technology/hiss.png" },
  { id: 6, name: "Claude AI",          src: "/media/technology/claude.jpg" },
  { id: 7, name: "React",              src: "https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg" },
  { id: 8, name: "Node.js",            src: "https://upload.wikimedia.org/wikipedia/commons/d/d9/Node.js_logo.svg" },
];

const clients = [
  { id: 1, name: "Can",          src: "/media/technology/can.jpg" },
  { id: 2, name: "Everlend CA",  src: "/media/technology/everland.png" },
  { id: 3, name: "Logo Preview", src: "/media/technology/Logo Preview.png" },
  { id: 4, name: "LOGO",         src: "/media/technology/LOGO.jpg" },
  { id: 5, name: "Matrix",       src: "/media/technology/matrix.png" },
  { id: 6, name: "Nest4Pet",     src: "/media/technology/nest.png" },
  { id: 7, name: "TSB",          src: "/media/technology/tsb.png" },
];

function LogoTile({ name, src }) {
  return (
    <div className="logo-tile">
      <div className="logo-card">
        {src ? (
          <img src={src} alt={name} className="logo-img" />
        ) : (
          <span className="logo-text">{name}</span>
        )}
      </div>
    </div>
  );
}

function Marquee({ items, speed = 0.6 }) {
  const trackRef = useRef(null);
  const posRef   = useRef(0);
  const rafRef   = useRef(null);
  const pauseRef = useRef(false);
  const doubled  = [...items, ...items];

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    const tick = () => {
      if (!pauseRef.current) {
        posRef.current += speed;
        const half = el.scrollWidth / 2;
        if (posRef.current >= half) posRef.current = 0;
        el.style.transform = `translateX(-${posRef.current}px)`;
      }
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); };
  }, [speed]);

  return (
    <div
      className="cc-marquee-outer"
      onMouseEnter={() => { pauseRef.current = true; }}
      onMouseLeave={() => { pauseRef.current = false; }}
    >
      <div ref={trackRef} className="cc-track">
        {doubled.map((item, i) => (
          <LogoTile key={`${item.id}-${i}`} name={item.name} src={item.src} />
        ))}
      </div>
    </div>
  );
}

export default function ClientCarousel() {
  const [visible, setVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) setVisible(true);
      },
      { threshold: 0.08 }
    );
    if (sectionRef.current) obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500&display=swap');

        .cc-section {
          background: #0a0a0a;
          position: relative;
          overflow: hidden;
          padding: 0;
          font-family: 'DM Sans', sans-serif;
        }

        /* ── Entrance animations ── */
        .cc-fade-up {
          opacity: 0;
          transform: translateY(32px);
          transition: opacity 0.9s cubic-bezier(0.22,1,0.36,1),
                      transform 0.9s cubic-bezier(0.22,1,0.36,1);
        }
        .cc-fade-up.d1 { transition-delay: 0.05s; }
        .cc-fade-up.d2 { transition-delay: 0.2s;  }
        .cc-fade-up.d3 { transition-delay: 0.35s; }
        .cc-fade-up.d4 { transition-delay: 0.5s;  }
        .cc-fade-up.in {
          opacity: 1;
          transform: translateY(0);
        }

        /* ── Top / bottom border glow lines ── */
        .cc-glow-line {
          height: 1px;
          background: linear-gradient(90deg,
            transparent 0%,
            rgba(30,174,200,0.25) 30%,
            rgba(30,174,200,0.25) 70%,
            transparent 100%
          );
        }

        /* ── Label row ── */
        .cc-label-row {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
          padding: 36px 24px 22px;
        }
        .cc-dot {
          width: 5px; height: 5px;
          border-radius: 50%;
          background: #1eaec8;
          box-shadow: 0 0 10px rgba(30,174,200,0.8);
          flex-shrink: 0;
        }
        .cc-label {
          font-size: 0.6rem;
          font-weight: 500;
          letter-spacing: 0.24em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.35);
        }

        /* ── Divider between the two rows ── */
        .cc-divider {
          height: 1px;
          margin: 4px 60px 0;
          background: linear-gradient(90deg,
            transparent,
            rgba(255,255,255,0.06) 30%,
            rgba(255,255,255,0.06) 70%,
            transparent
          );
        }

        /* ── Marquee ── */
        .cc-marquee-outer {
          position: relative;
          overflow: hidden;
          padding: 20px 0 36px;
        }
        .cc-marquee-outer::before,
        .cc-marquee-outer::after {
          content: '';
          position: absolute; top: 0; bottom: 0;
          width: 140px;
          z-index: 2;
          pointer-events: none;
        }
        .cc-marquee-outer::before {
          left: 0;
          background: linear-gradient(to right, #0a0a0a, transparent);
        }
        .cc-marquee-outer::after {
          right: 0;
          background: linear-gradient(to left, #0a0a0a, transparent);
        }
        @media (max-width: 640px) {
          .cc-marquee-outer::before,
          .cc-marquee-outer::after { width: 70px; }
        }

        .cc-track {
          display: flex;
          align-items: center;
          width: max-content;
          will-change: transform;
        }

        /* ── Logo tiles ── */
        .logo-tile {
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 8px 20px;
          cursor: default;
          min-width: 260px;
          min-height: 150px;
        }
        @media (max-width: 768px) {
          .logo-tile { padding: 8px 14px; min-width: 210px; min-height: 130px; }
        }
        @media (max-width: 480px) {
          .logo-tile { padding: 6px 10px; min-width: 165px; min-height: 108px; }
        }

        .logo-card {
          display: flex;
          align-items: center;
          justify-content: center;
          background: #ffffff;
          border: 1px solid rgba(255,255,255,0.12);
          border-radius: 16px;
          /* Reduced padding so logo fills more of the card */
          padding: 12px 16px;
          width: 220px;
          height: 130px;
          overflow: hidden;
          transition: border-color 0.35s ease,
                      box-shadow 0.35s ease,
                      transform 0.35s ease;
        }
        @media (max-width: 768px) {
          .logo-card { width: 180px; height: 110px; padding: 10px 14px; }
        }
        @media (max-width: 480px) {
          .logo-card { width: 145px; height: 88px; padding: 8px 10px; border-radius: 12px; }
        }

        .logo-tile:hover .logo-card {
          border-color: rgba(30,174,200,0.6);
          box-shadow: 0 0 28px rgba(30,174,200,0.18), 0 6px 24px rgba(0,0,0,0.5);
          transform: translateY(-3px);
        }

        /* KEY FIX: logo fills the card edge-to-edge with object-fit: contain */
        .logo-img {
          width: 100%;
          height: 100%;
          object-fit: contain;
          object-position: center;
          transition: transform 0.35s ease;
          filter: none;
          display: block;
        }

        .logo-tile:hover .logo-img {
          transform: scale(1.06);
        }

        .logo-text {
          font-family: 'DM Sans', sans-serif;
          font-size: clamp(0.75rem, 1.6vw, 0.9rem);
          font-weight: 500;
          letter-spacing: 0.1em;
          color: rgba(255,255,255,0.4);
          white-space: nowrap;
          transition: color 0.3s ease;
          text-transform: uppercase;
          user-select: none;
        }
        .logo-tile:hover .logo-text { color: #1eaec8; }

        /* ── Bottom padding ── */
        .cc-bottom-pad { height: 8px; }
      `}</style>

      <section ref={sectionRef} className="cc-section" aria-label="Technologies and Clients">

        <div className="cc-glow-line" />

        {/* ── Technologies We Use ── */}
        <div className={`cc-fade-up d1 ${visible ? "in" : ""}`}>
          <div className="cc-label-row">
            <div className="cc-dot" />
            <span className="cc-label">Technologies We Use</span>
            <div className="cc-dot" />
          </div>
        </div>

        <div className={`cc-fade-up d2 ${visible ? "in" : ""}`}>
          <Marquee items={techStack} speed={0.5} />
        </div>

        <div className={`cc-fade-up d2 ${visible ? "in" : ""}`}>
          <div className="cc-divider" />
        </div>

        {/* ── Trusted Clients ── */}
        <div className={`cc-fade-up d3 ${visible ? "in" : ""}`}>
          <div className="cc-label-row">
            <div className="cc-dot" />
            <span className="cc-label">Trusted Clients of MonkMedia</span>
            <div className="cc-dot" />
          </div>
        </div>

        <div className={`cc-fade-up d4 ${visible ? "in" : ""}`}>
          <Marquee items={clients} speed={0.6} />
        </div>

        <div className="cc-glow-line" />
        <div className="cc-bottom-pad" />

      </section>
    </>
  );
}