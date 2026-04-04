import { useEffect, useRef, useState } from "react";
import { X, TrendingUp, Users, Clock, Zap, Star, Award, Briefcase, ChevronRight, BarChart3, Eye, Building2, UserCheck, Home, Hammer, Video, Briefcase as BriefcaseIcon } from "lucide-react";

const caseStudies = [
  {
    id: "01",
    title: "Social Media Marketing",
    client: "Goli Soda",
    category: "Social Media Marketing",
    about: "Goli Soda is a vibrant and nostalgic beverage brand that brings back the charm of traditional Indian fizzy drinks with a modern twist. Known for its refreshing flavors and iconic packaging, the brand connects strongly with both younger audiences and those who love a touch of desi nostalgia.",
    challenge: "Increase brand visibility in a competitive beverage market, build a strong digital presence, connect with younger social-media-savvy audiences, and drive more sales through online engagement.",
    strategy: "Eye-catching content creation, brand storytelling combining nostalgia and modern vibes, Reels & trend marketing, interactive audience engagement posts, and maintaining a visually cohesive feed.",
    results: "Significant increase in engagement and reach • Stronger brand recall among target audience • Growth in followers and online visibility • Noticeable boost in inquiries and product demand • Converted social media presence into real sales impact",
    metrics: [
      { label: "Engagement", value: "+240%", icon: TrendingUp },
      { label: "Followers", value: "+180%", icon: Users },
      { label: "Inquiries", value: "+150%", icon: Zap },
    ],
  },
  {
    id: "02",
    title: "B2B Food Service",
    client: "Epicater",
    category: "B2B Food Service · Canada",
    about: "Epicater is a Canada-based B2B food service company specializing in delivering nutritious, well-balanced meals to corporate organizations. With a focus on quality, convenience, and employee wellness, the brand positions itself as a reliable partner for modern workplaces.",
    challenge: "Establish a strong and credible digital presence within the corporate space, build trust, communicate value effectively, and attract high-quality B2B clients in a competitive and professional market.",
    strategy: "Premium content showcasing food quality and hygiene, value-driven messaging around employee health and productivity, consistent professional branding, and content crafted specifically for corporate decision-makers.",
    results: "Strengthened brand positioning in the Canadian corporate market • Increased engagement from relevant B2B audiences • Enhanced trust, credibility, and professional perception • Growth in qualified leads and business inquiries • Improved conversion potential through a stronger digital presence",
    metrics: [
      { label: "Engagement", value: "+156%", icon: TrendingUp },
      { label: "Qualified Leads", value: "+112%", icon: Users },
      { label: "Trust Score", value: "+98%", icon: Star },
    ],
  },
  {
    id: "03",
    title: "Personal Brand · Real Estate",
    client: "Nakul Sood",
    category: "Personal Brand · Real Estate",
    about: "Nakul Sood is a real estate professional focused on building a strong personal brand in the property market. With a vision to stand out in a competitive industry, the goal was to position him as a credible, influential, and recognizable name in real estate.",
    challenge: "Establish a powerful personal brand from the ground up while maintaining professionalism and trust, increasing visibility online and offline, and attracting high-intent clients.",
    strategy: "Crafted a distinct professional identity, high-quality content on real estate insights and market trends, consistent premium digital presence, event hosting for offline authority, and relatable value-driven communication.",
    results: "Strong and recognizable personal brand in real estate • Increased social media engagement and audience growth • Enhanced credibility and trust among potential clients • Improved networking and visibility through events • Growth in quality leads and client inquiries",
    metrics: [
      { label: "Audience Growth", value: "+200%", icon: Users },
      { label: "Credibility", value: "+95%", icon: Star },
      { label: "Client Inquiries", value: "+175%", icon: TrendingUp },
    ],
  },
  {
    id: "04",
    title: "Renovation · Brand",
    client: "YouLike Renovations",
    category: "Renovation · Brand",
    about: "YouLike Renovations is a modern renovation company specializing in transforming residential and commercial spaces with a focus on quality craftsmanship, functional design, and aesthetic appeal.",
    challenge: "Build a strong digital presence, showcase its work effectively, and stand out in a competitive renovation market while attracting quality leads and building trust through visual proof of work.",
    strategy: "High-quality before-and-after transformation content, clean premium visuals reflecting craftsmanship, engaging project showcase Reels, professional brand positioning, and a cohesive polished feed.",
    results: "Increased engagement and visibility on social media • Stronger brand trust through high-quality visual content • Improved audience perception and credibility • Growth in inquiries and potential client leads • Enhanced positioning in a competitive renovation market",
    metrics: [
      { label: "Engagement", value: "+220%", icon: TrendingUp },
      { label: "Inquiries", value: "+185%", icon: Users },
      { label: "Brand Trust", value: "+90%", icon: Award },
    ],
  },
  {
    id: "05",
    title: "Mortgage · Video Production",
    client: "Jaspreet – Mortgage Agent",
    category: "Mortgage · Video Production",
    about: "Jaspreet is a professional mortgage agent who wanted to build a strong digital presence and connect more effectively with potential homebuyers. While she had the expertise, her online presence lacked consistency, engagement, and impactful content.",
    challenge: "Position Jaspreet as a trusted and approachable mortgage expert through strategic social media marketing and high-quality video content that educates, engages, and converts.",
    strategy: "Tailored content strategy educating audiences about mortgages and home financing, informational Reels on mortgage basics, personal branding videos, and consistent professional visual identity across all channels.",
    results: "Stronger and more consistent online presence • Increased audience engagement and reach • Enhanced credibility as a mortgage expert • Better connection with potential clients through video-first content",
    metrics: [
      { label: "Engagement", value: "+300%", icon: TrendingUp },
      { label: "Reach", value: "+250%", icon: Eye },
      { label: "Client Connect", value: "+165%", icon: Users },
    ],
  },
];

// Client images array (you can replace these with actual image paths later)
const CLIENT_IMAGES = [
  "/media/client/A4.png",
  "/media/client/A5.png",
  "/media/client/A6.png",
  "/media/client/A7.png",
  "/media/client/A10.png",
  "/media/client/A12.png",
  "/media/client/A13.png",
  "/media/client/A14.png",
  "/media/client/A15.png",
  "/media/client/A18.png",
  "/media/client/a1.png",
  "/media/client/a2.png",
  "/media/client/a3.png",
];

const OFFSET = 6;
const INTERLEAVED = CLIENT_IMAGES.reduce((acc, img, i) => {
  acc.push(img);
  acc.push(CLIENT_IMAGES[(i + OFFSET) % CLIENT_IMAGES.length]);
  return acc;
}, []);

const TRACK = [...INTERLEAVED, ...INTERLEAVED];

function useReveal(threshold = 0.1) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  const fired = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !fired.current) {
          fired.current = true;
          requestAnimationFrame(() => requestAnimationFrame(() => setVisible(true)));
        }
      },
      { threshold }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);

  return [ref, visible];
}

// Animated Counter Component
function AnimatedCounter({ targetValue, suffix = "", prefix = "", duration = 2000 }) {
  const [count, setCount] = useState(0);
  const counterRef = useRef(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  const getNumericValue = (val) => {
    if (typeof val === "number") return val;
    const match = val.toString().match(/(\d+(?:\.\d+)?)/);
    return match ? parseFloat(match[1]) : 0;
  };

  const numericTarget = getNumericValue(targetValue);
  const isPercentage = targetValue.toString().includes("%");
  const hasPlus = targetValue.toString().includes("+");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          let startTime = null;
          const startValue = 0;
          const endValue = numericTarget;

          const animateCount = (currentTime) => {
            if (!startTime) startTime = currentTime;
            const progress = Math.min((currentTime - startTime) / duration, 1);
            const easeOutQuart = 1 - Math.pow(1 - progress, 4);
            const currentValue = startValue + (endValue - startValue) * easeOutQuart;
            setCount(Math.floor(currentValue));
            if (progress < 1) {
              requestAnimationFrame(animateCount);
            } else {
              setCount(endValue);
            }
          };
          requestAnimationFrame(animateCount);
        }
      },
      { threshold: 0.3 }
    );

    if (counterRef.current) {
      observer.observe(counterRef.current);
    }
    return () => observer.disconnect();
  }, [numericTarget, duration, hasAnimated]);

  const formatDisplay = () => {
    if (isPercentage) {
      return `${prefix}${count}%${suffix}${hasPlus ? "+" : ""}`;
    }
    return `${prefix}${count}${suffix}${hasPlus ? "+" : ""}`;
  };

  return <span ref={counterRef}>{formatDisplay()}</span>;
}

export default function MergedComponent() {
  const [modalCase, setModalCase] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [visibleCards, setVisibleCards] = useState(false);
  const [heroRef, heroVisible] = useReveal(0.05);
  const [carouselRef, carouselVisible] = useReveal(0.08);
  const [statsVisible, setStatsVisible] = useState(false);

  const cardsRef = useRef(null);
  const statsRef = useRef(null);

  useEffect(() => {
    const o2 = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisibleCards(true); }, { threshold: 0.05 });
    const statsObserver = new IntersectionObserver(([e]) => { if (e.isIntersecting) setStatsVisible(true); }, { threshold: 0.3 });
    
    if (cardsRef.current) o2.observe(cardsRef.current);
    if (statsRef.current) statsObserver.observe(statsRef.current);
    
    return () => {
      o2.disconnect();
      statsObserver.disconnect();
    };
  }, []);

  const openModal = (study) => {
    setModalCase(study);
    setTimeout(() => setModalVisible(true), 10);
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    setModalVisible(false);
    setTimeout(() => {
      setModalCase(null);
      document.body.style.overflow = "";
    }, 420);
  };

  useEffect(() => {
    const onKey = (e) => { if (e.key === "Escape") closeModal(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const statsData = [
    { value: "150+", label: "Projects Delivered", icon: Briefcase, numericValue: 150, suffix: "+" },
    { value: "98%", label: "Client Satisfaction", icon: Star, numericValue: 98, suffix: "%" },
    { value: "24/7", label: "Support Available", icon: Clock, numericValue: 24, suffix: "/7", prefix: "" },
    { value: "50M+", label: "Revenue Generated", icon: TrendingUp, numericValue: 50, suffix: "M+", prefix: "$" },
  ];

  const getCategoryIcon = (category) => {
    if (category.includes("Social")) return <BarChart3 size={14} />;
    if (category.includes("B2B")) return <Building2 size={14} />;
    if (category.includes("Real Estate")) return <Home size={14} />;
    if (category.includes("Renovation")) return <Hammer size={14} />;
    if (category.includes("Mortgage")) return <Video size={14} />;
    return <BriefcaseIcon size={14} />;
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@300;400;500;600;700&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap');

        .ow-bebas { font-family: 'Bebas Neue', sans-serif; }
        .ow-dm { font-family: 'DM Sans', sans-serif; }

        @keyframes scrollLeft {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        .track-single {
          display: flex;
          width: max-content;
          animation: scrollLeft 60s linear infinite;
          will-change: transform;
        }
        .track-single:hover { animation-play-state: paused; }

        .carousel-mask {
          -webkit-mask-image: linear-gradient(
            to right, transparent 0%, black 6%, black 94%, transparent 100%
          );
          mask-image: linear-gradient(
            to right, transparent 0%, black 6%, black 94%, transparent 100%
          );
        }

        .reel-card {
          flex-shrink: 0;
          border-radius: 14px;
          overflow: hidden;
          transition: transform 0.35s cubic-bezier(0.22,1,0.36,1), box-shadow 0.35s ease;
          cursor: pointer;
        }
        .reel-card:hover {
          transform: translateY(-8px) scale(1.04);
          box-shadow: 0 24px 52px rgba(37,135,168,0.25);
        }
        .reel-card img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          transition: filter 0.35s ease;
        }
        .reel-card:hover img { filter: brightness(1.1); }

        .reveal {
          opacity: 0;
          transform: translateY(36px);
          transition: opacity 0.85s cubic-bezier(0.22,1,0.36,1),
                      transform 0.85s cubic-bezier(0.22,1,0.36,1);
        }
        .reveal.visible { opacity: 1; transform: translateY(0); }
        .reveal.d1 { transition-delay: 0.05s; }
        .reveal.d2 { transition-delay: 0.18s; }
        .reveal.d3 { transition-delay: 0.32s; }
        .reveal.d4 { transition-delay: 0.46s; }

        .carousel-reveal {
          opacity: 0;
          transform: translateY(50px);
          transition: opacity 1s cubic-bezier(0.22,1,0.36,1),
                      transform 1s cubic-bezier(0.22,1,0.36,1);
          transition-delay: 0.12s;
        }
        .carousel-reveal.visible { opacity: 1; transform: translateY(0); }

        .case-card {
          background: linear-gradient(135deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.01) 100%);
          backdrop-filter: blur(0px);
          transition: all 0.4s cubic-bezier(0.22,1,0.36,1);
        }
        .case-card:hover {
          transform: translateY(-8px);
          background: linear-gradient(135deg, rgba(37,135,168,0.08) 0%, rgba(37,135,168,0.02) 100%);
          border-color: rgba(37,135,168,0.4) !important;
        }

        .case-number {
          font-family: 'Bebas Neue', sans-serif;
          background: linear-gradient(135deg, rgba(37,135,168,0.2), rgba(37,135,168,0.05));
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
          text-shadow: none;
        }

        .metric-badge {
          background: rgba(37,135,168,0.1);
          border: 1px solid rgba(37,135,168,0.2);
          transition: all 0.3s ease;
        }
        .case-card:hover .metric-badge {
          background: rgba(37,135,168,0.2);
          border-color: rgba(37,135,168,0.4);
        }

        .modal-backdrop {
          position: fixed; inset: 0; z-index: 100;
          background: rgba(0,0,0,0);
          display: flex; align-items: center; justify-content: center;
          padding: 16px;
          transition: background 0.4s ease;
          pointer-events: none;
        }
        .modal-backdrop.visible { background: rgba(0,0,0,0.92); pointer-events: all; }

        .modal-box {
          width: 100%; max-width: 780px; max-height: 90vh;
          background: #0a0a0a; border: 1px solid rgba(37,135,168,0.3);
          border-radius: 28px; overflow: hidden;
          display: flex; flex-direction: column;
          opacity: 0; transform: scale(0.92) translateY(28px);
          transition: opacity 0.42s cubic-bezier(0.22,1,0.36,1),
                      transform 0.42s cubic-bezier(0.22,1,0.36,1);
          box-shadow: 0 40px 100px rgba(0,0,0,0.6), 0 0 0 1px rgba(37,135,168,0.1);
        }
        .modal-box.visible { opacity: 1; transform: scale(1) translateY(0); }

        .modal-close {
          position: absolute; top: 18px; right: 18px; z-index: 20;
          width: 42px; height: 42px; border-radius: 50%;
          background: rgba(37,135,168,0.15); border: 1px solid rgba(37,135,168,0.3);
          backdrop-filter: blur(12px);
          display: flex; align-items: center; justify-content: center;
          cursor: pointer; color: #eee3ca;
          transition: all 0.3s ease;
        }
        .modal-close:hover {
          background: #2587a8; color: #fff; transform: scale(1.1) rotate(90deg);
        }

        .modal-scroll { overflow-y: auto; flex: 1; }
        .modal-scroll::-webkit-scrollbar { width: 3px; }
        .modal-scroll::-webkit-scrollbar-thumb { background: rgba(37,135,168,0.4); border-radius: 9999px; }

        .result-badge-modal {
          background: linear-gradient(135deg, rgba(37,135,168,0.12) 0%, rgba(37,135,168,0.03) 100%);
          border-left: 3px solid #2587a8;
          padding: 16px 20px;
          border-radius: 16px;
          margin: 20px 0;
        }

        .stat-number {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 2.5rem;
        }
        @media (min-width: 640px) {
          .stat-number { font-size: 3rem; }
        }

        .section-tag {
          background: linear-gradient(135deg, #2587a8 0%, #1a6b85 100%);
        }
      `}</style>

      {/* ==================== ABOUT US SECTION ==================== */}
      <section className="w-full bg-black overflow-hidden" style={{ fontFamily: "'DM Sans', sans-serif" }}>
        <div
          ref={heroRef}
          className="max-w-7xl mx-auto px-5 sm:px-10
                     pt-20 sm:pt-28 md:pt-36
                     pb-14 sm:pb-20 md:pb-24
                     flex flex-col items-center text-center gap-5 sm:gap-7"
        >
          <div className={`reveal d1 ${heroVisible ? "visible" : ""} flex items-center gap-3`}>
            <span className="block w-8 h-px bg-[#2587a8]" />
            <span className="text-[11px] sm:text-xs font-semibold tracking-[0.22em] uppercase text-[#2587a8]">
              About Us
            </span>
            <span className="block w-8 h-px bg-[#2587a8]" />
          </div>

          <h2
            className={`reveal d2 ${heroVisible ? "visible" : ""}
              font-extrabold leading-[1.08] text-[#eee3ca]
              text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-[5.5rem]`}
            style={{ fontFamily: "'Syne', sans-serif" }}
          >
            A Full-Service<br />
            <span className="text-[#2587a8]">Digital Agency.</span>
          </h2>

          <p className={`reveal d3 ${heroVisible ? "visible" : ""}
            text-[#eee3ca]/55 text-sm sm:text-base md:text-lg max-w-xl leading-relaxed`}>
            We help brands grow, get found, and be remembered — through strategy,
            creativity, and relentless execution.
          </p>

          <div
            className={`reveal d4 ${heroVisible ? "visible" : ""} w-24 h-px mt-1`}
            style={{ background: "linear-gradient(to right, transparent, #2587a8, transparent)" }}
          />
        </div>

        <div
          ref={carouselRef}
          className={`carousel-reveal ${carouselVisible ? "visible" : ""} pb-20 sm:pb-28 md:pb-36`}
        >
          <div className="max-w-7xl mx-auto px-5 sm:px-10 mb-8 sm:mb-12
                          flex flex-col items-center gap-2 text-center">
            <div className="flex items-center gap-3">
              <span className="block w-8 h-px bg-[#2587a8]" />
              <span className="text-[11px] sm:text-xs font-semibold tracking-[0.22em] uppercase text-[#2587a8]">
                Impact Reel
              </span>
              <span className="block w-8 h-px bg-[#2587a8]" />
            </div>
            <span className="text-[#eee3ca]/40 text-sm sm:text-base italic">
              Some of our viral creations
            </span>
          </div>

          <div className="carousel-mask overflow-hidden">
            <div className="track-single" style={{ gap: "clamp(12px, 1.6vw, 22px)" }}>
              {TRACK.map((src, i) => (
                <div
                  key={i}
                  className="reel-card"
                  style={{
                    width:  "clamp(170px, 19vw, 290px)",
                    height: "clamp(230px, 27vw, 400px)",
                  }}
                >
                  <img src={src} alt={`Creation ${(i % INTERLEAVED.length) + 1}`} loading="lazy" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ==================== CASE STUDIES SECTION ==================== */}
      <section
        id="case-studies"
        aria-label="Case Studies"
        className="ow-dm relative w-full bg-black py-20 sm:py-28 lg:py-32 overflow-hidden"
      >
        <div className="absolute w-[600px] h-[600px] bg-[#2587a8]/[0.03] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute w-[400px] h-[400px] bg-[#2587a8]/[0.02] bottom-0 right-0 rounded-full blur-[100px] pointer-events-none" />
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div ref={cardsRef} className={`reveal ${visibleCards ? "visible" : ""} text-center mb-16 sm:mb-20`}>
            <div className="flex items-center justify-center gap-3 mb-5">
              <span className="w-8 h-px bg-[#2587a8]" />
              <span className="text-[11px] sm:text-xs font-bold tracking-[0.22em] uppercase text-[#2587a8]">
                Our Work
              </span>
              <span className="w-8 h-px bg-[#2587a8]" />
            </div>
            <h2 className="ow-bebas text-[#eee3ca] text-5xl sm:text-6xl md:text-7xl lg:text-8xl leading-[0.9] tracking-tight mb-5">
              Case Studies
            </h2>
            <p className="text-[#eee3ca]/50 text-sm sm:text-base max-w-2xl mx-auto font-light">
              Real results for real brands. Explore how we've helped businesses transform and grow.
            </p>
          </div>

          <div className={`reveal ${visibleCards ? "visible" : ""}`} style={{ transitionDelay: "0.2s" }}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {caseStudies.map((study) => (
                <article
                  key={study.id}
                  onClick={() => openModal(study)}
                  className="case-card group relative cursor-pointer rounded-2xl border border-white/[0.08] p-6 sm:p-7 transition-all duration-500"
                >
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#2587a8]/0 via-transparent to-[#2587a8]/0 group-hover:from-[#2587a8]/5 group-hover:to-[#2587a8]/5 transition-all duration-500 pointer-events-none" />
                  
                  <div className="flex items-start justify-between mb-4">
                    <span className="case-number text-6xl sm:text-7xl font-black opacity-30 group-hover:opacity-50 transition-opacity">
                      {study.id}
                    </span>
                    <span className="flex items-center gap-1.5 text-[9px] font-semibold tracking-[0.12em] uppercase text-[#2587a8] bg-[#2587a8]/10 px-3 py-1.5 rounded-full border border-[#2587a8]/20">
                      {getCategoryIcon(study.category)}
                      {study.category}
                    </span>
                  </div>

                  <h3 className="ow-bebas text-[#eee3ca] text-2xl sm:text-3xl leading-[1.1] mb-1 group-hover:text-[#2587a8] transition-colors duration-300">
                    {study.title}
                  </h3>
                  <p className="text-[#2587a8] text-sm font-medium mb-3 flex items-center gap-1">
                    <Briefcase size={12} />
                    {study.client}
                  </p>

                  <p className="text-[#eee3ca]/50 text-sm leading-relaxed mb-5 line-clamp-2">
                    {study.about.substring(0, 100)}...
                  </p>

                  <div className="flex flex-wrap gap-2 mb-5">
                    {study.metrics.map((metric, i) => {
                      const MetricIcon = metric.icon;
                      return (
                        <div
                          key={i}
                          className="metric-badge flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-[11px] font-semibold"
                        >
                          <MetricIcon size={12} className="text-[#2587a8]" />
                          <span className="text-[#eee3ca]/80">{metric.value}</span>
                        </div>
                      );
                    })}
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-white/[0.05]">
                    <span className="text-[#2587a8] text-xs font-medium tracking-wide uppercase">
                      View Case Study
                    </span>
                    <ChevronRight size={16} className="text-[#2587a8] transform transition-transform group-hover:translate-x-1" />
                  </div>
                </article>
              ))}
            </div>
          </div>

          <div ref={statsRef} className={`reveal ${visibleCards ? "visible" : ""} mt-16 sm:mt-20 pt-8 border-t border-white/[0.05]`} style={{ transitionDelay: "0.35s" }}>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              {statsData.map((stat, i) => {
                const StatIcon = stat.icon;
                return (
                  <div key={i} className="space-y-2 group">
                    <StatIcon size={24} className="text-[#2587a8] mx-auto opacity-60 group-hover:opacity-100 transition-opacity" />
                    <div className="stat-number text-3xl sm:text-4xl font-bold text-[#eee3ca]">
                      {statsVisible ? (
                        <AnimatedCounter 
                          targetValue={stat.value} 
                          suffix={stat.suffix || ""} 
                          prefix={stat.prefix || ""}
                          duration={2000}
                        />
                      ) : (
                        <span>0</span>
                      )}
                    </div>
                    <div className="text-[11px] tracking-wide text-[#eee3ca]/40 uppercase">{stat.label}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* MODAL */}
      {modalCase && (
        <div
          className={`modal-backdrop ${modalVisible ? "visible" : ""}`}
          onClick={closeModal}
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
        >
          <div
            className={`modal-box ${modalVisible ? "visible" : ""}`}
            onClick={(e) => e.stopPropagation()}
          >
            <button className="modal-close" onClick={closeModal} aria-label="Close modal">
              <X size={18} strokeWidth={2.5} />
            </button>

            <div className="modal-scroll p-6 sm:p-8">
              <div className="flex items-start justify-between mb-4">
                <span className="flex items-center gap-1.5 text-[10px] font-bold tracking-[0.16em] uppercase text-[#2587a8] bg-[#2587a8]/10 px-3 py-1.5 rounded-full">
                  {getCategoryIcon(modalCase.category)}
                  {modalCase.category}
                </span>
                <span className="ow-bebas text-5xl text-[#2587a8]/20">{modalCase.id}</span>
              </div>

              <h2 id="modal-title" className="ow-bebas text-[#eee3ca] text-3xl sm:text-4xl leading-[1.1] mb-2">
                {modalCase.title}
              </h2>
              <p className="text-[#2587a8] text-sm font-medium mb-6 flex items-center gap-2">
                <Briefcase size={14} />
                {modalCase.client}
              </p>

              <div className="h-px bg-gradient-to-r from-transparent via-[#2587a8]/30 to-transparent mb-6" />

              {/* About the Brand */}
              <div className="mb-6">
                <h3 className="text-[#eee3ca] text-sm font-semibold mb-2 flex items-center gap-2">
                  <Star size={14} className="text-[#2587a8]" />
                  About the Brand
                </h3>
                <p className="text-[#eee3ca]/70 text-sm leading-relaxed">
                  {modalCase.about}
                </p>
              </div>

              {/* The Challenge */}
              <div className="mb-6">
                <h3 className="text-[#eee3ca] text-sm font-semibold mb-2 flex items-center gap-2">
                  <Zap size={14} className="text-[#2587a8]" />
                  The Challenge
                </h3>
                <p className="text-[#eee3ca]/70 text-sm leading-relaxed">
                  {modalCase.challenge}
                </p>
              </div>

              {/* Our Strategy */}
              <div className="mb-6">
                <h3 className="text-[#eee3ca] text-sm font-semibold mb-2 flex items-center gap-2">
                  <TrendingUp size={14} className="text-[#2587a8]" />
                  Our Strategy
                </h3>
                <p className="text-[#eee3ca]/70 text-sm leading-relaxed">
                  {modalCase.strategy}
                </p>
              </div>

              {/* Metrics Grid */}
              <div className="grid grid-cols-3 gap-3 mb-6">
                {modalCase.metrics.map((metric, i) => {
                  const MetricIcon = metric.icon;
                  return (
                    <div key={i} className="text-center p-3 rounded-xl bg-[#2587a8]/5 border border-[#2587a8]/10">
                      <MetricIcon size={20} className="text-[#2587a8] mx-auto mb-2" />
                      <div className="text-lg font-bold text-[#eee3ca]">{metric.value}</div>
                      <div className="text-[10px] text-[#eee3ca]/40 uppercase tracking-wide">{metric.label}</div>
                    </div>
                  );
                })}
              </div>

              {/* Results */}
              <div className="result-badge-modal">
                <p className="text-[11px] font-bold tracking-[0.16em] uppercase text-[#2587a8] mb-2 flex items-center gap-2">
                  <Award size={14} /> Results
                </p>
                <p className="text-sm leading-relaxed text-[#eee3ca]/80 font-medium">
                  {modalCase.results}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}