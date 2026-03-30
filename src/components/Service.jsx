import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, X } from "lucide-react";

const services = [
  {
    id: "01",
    title: "Website Designing",
    short: "Web Design & Development",
    description:
      "We create stunning, user-friendly websites that not only look amazing but also drive results. From responsive design to smooth navigation, we build digital experiences that leave a lasting impression.",
    image: "/media/website.jpg",
    tag: "Design · Dev · UX",
    detail:
      "Our web design process starts with understanding your brand, goals, and audience. We craft pixel-perfect interfaces built on modern frameworks — fast, accessible, and conversion-focused. Every interaction is intentional, every pixel has purpose. We handle everything from wireframing and prototyping to final deployment and post-launch support.",
  },
  {
    id: "02",
    title: "Google My Business",
    short: "GMB Optimization",
    description:
      "Stand out in local search and attract customers right in your area. We optimize your GMB listing so your business gets found quickly, builds trust, and drives real foot traffic or leads.",
    image: "/media/Google My Business dashboard in office.png",
    tag: "Local · Maps · Trust",
    detail:
      "A fully optimized Google My Business profile is one of the highest ROI moves for any local business. We handle complete setup, category optimization, photo strategy, review management, Q&A, and ongoing performance tracking — so your business dominates the local map pack.",
  },
  {
    id: "03",
    title: "SEO & Local SEO",
    short: "Search Engine Optimization",
    description:
      "Rank higher on Google and reach the right audience at the right time. Our SEO strategies combine on-page, off-page, and local optimization to boost visibility and generate sustainable growth.",
    image: "/media/sco.jpg",
    tag: "Organic · Rankings · Growth",
    detail:
      "We build SEO strategies that compound over time. From technical audits and keyword research to content strategy and link building, every decision is data-driven. Our local SEO layer ensures your business ranks in the neighborhoods that matter most, driving qualified traffic that converts.",
  },
  {
    id: "04",
    title: "Social Media Management",
    short: "Content & Community",
    description:
      "Grow your online presence with engaging content, consistent posting, and community management. We help your brand connect with your audience and turn followers into loyal customers.",
    image: "/media/Social media dashboard in modern office.png",
    tag: "Content · Engage · Convert",
    detail:
      "We manage your social presence end-to-end — strategy, content creation, scheduling, community management, and analytics. Our team creates platform-native content that feels authentic, builds genuine community, and drives measurable business outcomes across Instagram, Facebook, LinkedIn, and beyond.",
  },
  {
    id: "05",
    title: "Brand Shoots",
    short: "Photography & Videography",
    description:
      "Tell your story visually with professional brand photography and videography. From product shoots to lifestyle visuals, we create imagery that reflects your brand identity and captivates your audience.",
    image: "/media/shoot.jpg",
    tag: "Photo · Video · Identity",
    detail:
      "First impressions are visual. Our brand shoot productions cover everything from pre-shoot creative direction and mood boarding to on-location shooting and post-production editing. Whether you need hero imagery for your website, social content, or ad campaigns — we deliver visuals that stop the scroll and build brand equity.",
  },
  {
    id: "06",
    title: "SEO For GMB",
    short: "Local Search Dominance",
    description:
      "Maximize your local search potential with expert GMB SEO. We ensure your business ranks higher in local searches, attracts more clicks, and converts online visibility into real customers.",
    image: "/media/SEO performance on Google My Business.png",
    tag: "Local · Rank · Convert",
    detail:
      "GMB SEO is its own discipline. We optimize your listing for the specific signals Google uses to rank local results — citation consistency, review velocity, post frequency, service area targeting, and structured data. The result: your business appearing in the coveted 3-pack for high-intent local searches.",
  },
];

export default function Services() {
  const [activeIndex, setActiveIndex] = useState(null);
  const [modalService, setModalService] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [visibleHeader, setVisibleHeader] = useState(false);
  const [visibleRows, setVisibleRows] = useState([]);
  const headerRef = useRef(null);
  const rowRefs = useRef([]);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisibleHeader(true); },
      { threshold: 0.15 }
    );
    if (headerRef.current) obs.observe(headerRef.current);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    const observers = rowRefs.current.map((el, i) => {
      if (!el) return null;
      const o = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting)
            setVisibleRows((prev) => prev.includes(i) ? prev : [...prev, i]);
        },
        { threshold: 0.06, rootMargin: "0px 0px -20px 0px" }
      );
      o.observe(el);
      return o;
    });
    return () => observers.forEach((o) => o && o.disconnect());
  }, []);

  const openModal = (svc, e) => {
    e.stopPropagation();
    setModalService(svc);
    setTimeout(() => setModalVisible(true), 10);
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    setModalVisible(false);
    setTimeout(() => {
      setModalService(null);
      document.body.style.overflow = "";
    }, 420);
  };

  useEffect(() => {
    const onKey = (e) => { if (e.key === "Escape") closeModal(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const toggle = (i) => setActiveIndex(activeIndex === i ? null : i);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:wght@300;400;500;700&display=swap');

        .svc-section { background: #000; font-family: 'DM Sans', sans-serif; }

        /* Header reveal */
        .hdr-reveal {
          opacity: 0; transform: translateY(40px);
          transition: opacity 0.9s cubic-bezier(0.22,1,0.36,1), transform 0.9s cubic-bezier(0.22,1,0.36,1);
        }
        .hdr-reveal.in { opacity: 1; transform: translateY(0); }
        .hdr-reveal.d1 { transition-delay: 0.05s; }
        .hdr-reveal.d2 { transition-delay: 0.2s; }
        .hdr-reveal.d3 { transition-delay: 0.35s; }

        .display-num {
          font-family: 'Bebas Neue', sans-serif;
          font-size: clamp(1.4rem,3vw,2rem);
          color: transparent;
          -webkit-text-stroke: 1px rgba(37,135,168,0.45);
          line-height: 1; letter-spacing: 0.05em;
          transition: -webkit-text-stroke 0.3s ease;
          flex-shrink: 0; width: 60px;
        }

        /* Service row */
        .svc-row {
          opacity: 0; transform: translateX(-40px);
          transition:
            opacity 0.75s cubic-bezier(0.22,1,0.36,1),
            transform 0.75s cubic-bezier(0.22,1,0.36,1),
            background 0.3s ease;
          border-top: 1px solid rgba(255,255,255,0.07);
          cursor: pointer; position: relative; overflow: hidden;
        }
        .svc-row.in { opacity: 1; transform: translateX(0); }
        .svc-row:last-child { border-bottom: 1px solid rgba(255,255,255,0.07); }

        .svc-row:hover, .svc-row.active { background: rgba(37,135,168,0.04); }
        .svc-row:hover .display-num, .svc-row.active .display-num { -webkit-text-stroke: 1px #2587a8; }
        .svc-row:hover .svc-title, .svc-row.active .svc-title { color: #eee3ca; }
        .svc-row:hover .row-arrow, .svc-row.active .row-arrow {
          background: #2587a8; transform: rotate(0deg); border-color: #2587a8;
        }
        .svc-row:hover .svc-tag, .svc-row.active .svc-tag {
          color: #2587a8; border-color: rgba(37,135,168,0.4);
        }

        .row-bar {
          display: flex; align-items: center;
          gap: clamp(12px,3vw,32px);
          padding: clamp(18px,3vw,28px) clamp(16px,4vw,48px);
          position: relative; z-index: 1;
        }

        .svc-title {
          font-family: 'Bebas Neue', sans-serif;
          font-size: clamp(1.8rem,4.5vw,3.8rem);
          color: rgba(255,255,255,0.4); line-height: 1;
          letter-spacing: 0.03em; transition: color 0.3s ease; flex: 1;
        }

        .svc-tag {
          font-size: 0.68rem; font-weight: 500;
          letter-spacing: 0.12em; text-transform: uppercase;
          color: rgba(255,255,255,0.25);
          padding: 4px 12px;
          border: 1px solid rgba(255,255,255,0.1); border-radius: 9999px;
          white-space: nowrap; display: none;
          transition: color 0.3s ease, border-color 0.3s ease;
        }
        @media (min-width: 640px) { .svc-tag { display: inline-flex; } }

        .row-arrow {
          width: clamp(36px,4vw,48px); height: clamp(36px,4vw,48px);
          border-radius: 50%; border: 1px solid rgba(255,255,255,0.15);
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0; transform: rotate(45deg); color: rgba(255,255,255,0.45);
          transition: background 0.3s ease, transform 0.4s cubic-bezier(0.22,1,0.36,1), border-color 0.3s ease;
        }

        /* Expand */
        .expand-panel { display: grid; grid-template-rows: 0fr; transition: grid-template-rows 0.55s cubic-bezier(0.22,1,0.36,1); }
        .expand-panel.open { grid-template-rows: 1fr; }
        .expand-inner { overflow: hidden; }
        .expand-content {
          display: flex; flex-direction: column; gap: 20px;
          padding: 0 clamp(16px,4vw,48px) 28px;
          padding-left: calc(clamp(16px,4vw,48px) + 60px + clamp(12px,3vw,32px));
        }
        @media (min-width: 768px) { .expand-content { flex-direction: row; align-items: flex-start; gap: 40px; } }

        .expand-img-wrap {
          width: 100%; max-width: 340px; height: 190px;
          border-radius: 12px; overflow: hidden; flex-shrink: 0;
          opacity: 0; transform: translateY(18px);
          transition: opacity 0.5s ease 0.12s, transform 0.5s cubic-bezier(0.22,1,0.36,1) 0.12s;
        }
        .expand-panel.open .expand-img-wrap { opacity: 1; transform: translateY(0); }
        .expand-img-wrap img { width:100%; height:100%; object-fit:cover; display:block; transition: transform 0.6s ease; }
        .expand-img-wrap:hover img { transform: scale(1.05); }

        .expand-text {
          flex: 1; opacity: 0; transform: translateY(12px);
          transition: opacity 0.5s ease 0.2s, transform 0.5s cubic-bezier(0.22,1,0.36,1) 0.2s;
        }
        .expand-panel.open .expand-text { opacity: 1; transform: translateY(0); }

        /* Left accent */
        .svc-row::before {
          content: ''; position: absolute; left: 0; top: 0; bottom: 0;
          width: 3px; background: #2587a8;
          transform: scaleY(0); transform-origin: bottom;
          transition: transform 0.4s cubic-bezier(0.22,1,0.36,1);
        }
        .svc-row.active::before { transform: scaleY(1); }

        /* Learn more button */
        .learn-btn {
          margin-top: 20px; display: inline-flex; align-items: center; gap: 10px;
          font-family: 'DM Sans', sans-serif; font-size: 0.85rem; font-weight: 700;
          color: #eee3ca; background: none; border: none; cursor: pointer; padding: 0;
          transition: gap 0.25s ease;
        }
        .learn-btn:hover { gap: 14px; }
        .learn-btn .lb-circle {
          width: 30px; height: 30px; border-radius: 50%; background: #2587a8;
          display: inline-flex; align-items: center; justify-content: center;
          transition: background 0.25s ease, transform 0.25s ease;
        }
        .learn-btn:hover .lb-circle { background: #eee3ca; transform: scale(1.12); }

        .tag-line::before, .tag-line::after {
          content: ''; display: inline-block; width: 2rem; height: 2px;
          background: #2587a8; vertical-align: middle; margin: 0 0.5rem;
        }

        /* ══ MODAL ══ */
        .modal-backdrop {
          position: fixed; inset: 0; z-index: 100;
          background: rgba(0,0,0,0);
          display: flex; align-items: center; justify-content: center;
          padding: 16px;
          transition: background 0.4s ease;
          pointer-events: none;
        }
        .modal-backdrop.visible { background: rgba(0,0,0,0.82); pointer-events: all; }

        .modal-box {
          width: 100%; max-width: 780px; max-height: 90vh;
          background: #0d0d0d;
          border: 1px solid rgba(37,135,168,0.28);
          border-radius: 20px; overflow: hidden;
          display: flex; flex-direction: column;
          opacity: 0; transform: scale(0.9) translateY(28px);
          transition: opacity 0.42s cubic-bezier(0.22,1,0.36,1), transform 0.42s cubic-bezier(0.22,1,0.36,1);
          box-shadow: 0 48px 120px rgba(0,0,0,0.8), 0 0 0 1px rgba(37,135,168,0.12);
          position: relative;
        }
        .modal-box.visible { opacity: 1; transform: scale(1) translateY(0); }

        .modal-hero {
          width: 100%; height: 260px; flex-shrink: 0;
          overflow: hidden; position: relative;
        }
        @media (min-width: 640px) { .modal-hero { height: 320px; } }
        .modal-hero img { width:100%; height:100%; object-fit:cover; display:block; }
        .modal-hero-fade {
          position: absolute; inset: 0;
          background: linear-gradient(to top, #0d0d0d 0%, rgba(0,0,0,0.3) 55%, transparent 100%);
        }

        /* Close button */
        .modal-close {
          position: absolute; top: 14px; right: 14px; z-index: 20;
          width: 42px; height: 42px; border-radius: 50%;
          background: rgba(10,10,10,0.7);
          border: 1px solid rgba(255,255,255,0.18);
          backdrop-filter: blur(10px);
          display: flex; align-items: center; justify-content: center;
          cursor: pointer; color: rgba(255,255,255,0.75);
          transition: background 0.3s ease, color 0.3s ease, transform 0.35s cubic-bezier(0.22,1,0.36,1), border-color 0.3s ease;
        }
        .modal-close:hover {
          background: #2587a8; color: #000; border-color: #2587a8;
          transform: scale(1.1) rotate(90deg);
        }

        .modal-body {
          padding: clamp(18px,4vw,32px); overflow-y: auto; flex: 1;
        }
        .modal-body::-webkit-scrollbar { width: 3px; }
        .modal-body::-webkit-scrollbar-track { background: transparent; }
        .modal-body::-webkit-scrollbar-thumb { background: rgba(37,135,168,0.35); border-radius: 9999px; }

        .modal-big-num {
          font-family: 'Bebas Neue', sans-serif; font-size: 5rem;
          color: transparent; -webkit-text-stroke: 1px rgba(37,135,168,0.15);
          line-height: 1; float: right; margin-left: 12px; margin-top: -4px;
          user-select: none;
        }
      `}</style>

      <section className="svc-section w-full py-14 px-0">
        <div className="max-w-7xl mx-auto">

          {/* Header */}
          <div ref={headerRef} className="px-4 sm:px-8 md:px-12 lg:px-20 mb-14">
            <div className={`hdr-reveal d1 ${visibleHeader ? "in" : ""}`}>
              <div className="text-sm font-semibold tracking-widest uppercase tag-line mb-5" style={{ color: "#2587a8", fontFamily: "'DM Sans', sans-serif" }}>
                Services
              </div>
            </div>
            <div className="flex flex-col lg:flex-row lg:items-end gap-6">
              <div className="flex-1">
                <h2
                  className={`hdr-reveal d2 ${visibleHeader ? "in" : ""}`}
                  style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(3rem,8vw,6.5rem)", lineHeight: 0.92, letterSpacing: "0.02em", color: "#eee3ca" }}
                >
                  What We<br /><span style={{ color: "#2587a8" }}>Do Best.</span>
                </h2>
              </div>
              <div className={`hdr-reveal d3 ${visibleHeader ? "in" : ""} lg:w-2/5 lg:pb-2`}>
                <p className="text-sm sm:text-base leading-relaxed" style={{ color: "rgba(255,255,255,0.45)", fontFamily: "'DM Sans', sans-serif" }}>
                  Six focused disciplines. One relentless goal — help your brand grow, get found, and be remembered.
                </p>
              </div>
            </div>
          </div>

          {/* Rows */}
          <div>
            {services.map((svc, i) => {
              const isOpen = activeIndex === i;
              const isVisible = visibleRows.includes(i);
              return (
                <div
                  key={svc.id}
                  ref={(el) => (rowRefs.current[i] = el)}
                  className={`svc-row ${isVisible ? "in" : ""} ${isOpen ? "active" : ""}`}
                  style={{ transitionDelay: `${i * 0.07}s` }}
                  onClick={() => toggle(i)}
                >
                  <div className="row-bar">
                    <span className="display-num">{svc.id}</span>
                    <span className="svc-title">{svc.title}</span>
                    <span className="svc-tag">{svc.tag}</span>
                    <div className="row-arrow">
                      <ArrowUpRight size={18} strokeWidth={2} />
                    </div>
                  </div>

                  <div className={`expand-panel ${isOpen ? "open" : ""}`}>
                    <div className="expand-inner">
                      <div className="expand-content">
                        <div className="expand-img-wrap">
                          <img src={svc.image} alt={svc.title} />
                        </div>
                        <div className="expand-text">
                          <p className="text-xs font-semibold tracking-widest uppercase mb-3" style={{ color: "#2587a8", fontFamily: "'DM Sans', sans-serif" }}>
                            {svc.short}
                          </p>
                          <p className="text-sm sm:text-base leading-relaxed" style={{ color: "rgba(255,255,255,0.6)", fontFamily: "'DM Sans', sans-serif", maxWidth: "480px" }}>
                            {svc.description}
                          </p>
                          <button className="learn-btn" onClick={(e) => openModal(svc, e)}>
                            Learn more
                            <span className="lb-circle">
                              <ArrowUpRight size={14} color="#000" strokeWidth={2.5} />
                            </span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Footer */}
          <div className="px-4 sm:px-8 md:px-12 lg:px-20 mt-10 flex items-center justify-between">
            <span style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "0.85rem", letterSpacing: "0.1em", color: "rgba(255,255,255,0.2)" }}>
              {services.length} Services
            </span>
            <div style={{ height: "1px", flex: 1, background: "rgba(255,255,255,0.06)", margin: "0 20px" }} />
            <span className="text-xs font-medium tracking-widest uppercase" style={{ color: "rgba(255,255,255,0.18)", fontFamily: "'DM Sans', sans-serif" }}>
              Monk Media
            </span>
          </div>
        </div>
      </section>

      {/* MODAL */}
      {modalService && (
        <div className={`modal-backdrop ${modalVisible ? "visible" : ""}`} onClick={closeModal}>
          <div className={`modal-box ${modalVisible ? "visible" : ""}`} onClick={(e) => e.stopPropagation()}>

            {/* Close button */}
            <button className="modal-close" onClick={closeModal} aria-label="Close modal">
              <X size={18} strokeWidth={2.5} />
            </button>

            {/* Hero image */}
            <div className="modal-hero">
              <img src={modalService.image} alt={modalService.title} />
              <div className="modal-hero-fade" />
            </div>

            {/* Body */}
            <div className="modal-body">
              <span className="modal-big-num">{modalService.id}</span>

              <p className="text-xs font-semibold tracking-widest uppercase mb-2" style={{ color: "#2587a8", fontFamily: "'DM Sans', sans-serif" }}>
                {modalService.short}
              </p>

              <h3 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(2rem,5vw,3rem)", lineHeight: 1, letterSpacing: "0.03em", color: "#eee3ca", marginBottom: "16px" }}>
                {modalService.title}
              </h3>

              <div style={{ height: "1px", background: "rgba(37,135,168,0.22)", marginBottom: "18px" }} />

              <p className="text-sm sm:text-base leading-relaxed mb-4" style={{ color: "rgba(255,255,255,0.65)", fontFamily: "'DM Sans', sans-serif" }}>
                {modalService.description}
              </p>

              <p className="text-sm sm:text-base leading-relaxed" style={{ color: "rgba(255,255,255,0.42)", fontFamily: "'DM Sans', sans-serif" }}>
                {modalService.detail}
              </p>

              <div style={{ marginTop: "22px" }}>
                <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.68rem", fontWeight: 600, letterSpacing: "0.14em", textTransform: "uppercase", color: "#2587a8", padding: "5px 14px", border: "1px solid rgba(37,135,168,0.32)", borderRadius: "9999px" }}>
                  {modalService.tag}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}