import { useEffect, useRef, useState } from "react";

/* ─── SERVICES DATA ─── */
const SERVICES = [
  {
    id: "01",
    title: "Website Designing",
    tags: "DESIGN · DEV · UX",
    description:
      "We craft pixel-perfect, blazing-fast websites that captivate visitors and convert them into loyal customers. From concept to deployment, every detail is intentional.",
    image: "/media/services/webdev.jpg",
    video: null,
    comingSoon: false,
  },
 {
    id: "02",
    title: "SEO & Local SEO",
    tags: "ORGANIC · RANKINGS · GROWTH",
    description:
      "Climb search rankings organically with data-driven SEO strategies tailored to your market. We optimize your Google Business Profile, build authoritative backlinks, and publish keyword-rich content that ranks — turning Google into your most powerful, always-on sales channel.",
    image: "/media/imagenew.png",
    video: null,
    comingSoon: false,
    imageStyle: { objectFit: "cover", objectPosition: "top center" },
  },
  {
    id: "03",
    title: "Social Media Management",
    tags: "CONTENT · ENGAGE · CONVERT",
    description:
      "From strategy to daily execution, we build communities around your brand. Scroll-stopping content, consistent posting, and real engagement — handled.",
    image: "/media/social.png",
    video: null,
    comingSoon: false,
    imageStyle: { objectFit: "contain", objectPosition: "center" },
  },
  {
    id: "04",
    title: "Video Production",
    tags: "STORY · MOTION · IMPACT",
    description:
      "Cinematic storytelling that stops the scroll. We produce brand films, reels, and ads that make your audience feel something and remember your name.",
    image: null,
    video: "/media/production/HOTELX.mp4",
    comingSoon: false,
  },
  {
    id: "05",
    title: "Branding",
    tags: "IDENTITY · VOICE · LEGACY",
    description:
      "Your brand is more than a logo — it's a feeling. We build complete brand identities that communicate your values, attract your tribe, and stand the test of time.",
    image: "/media/sconew.jpg",
    video: null,
    comingSoon: false,
  },
  {
    id: "06",
    title: "Paid Ads",
    tags: "PPC · META · GOOGLE ADS",
    description:
      "Stop wasting ad spend and start seeing real ROI. We run laser-targeted Google Ads, Meta, and Instagram campaigns engineered for conversions — not just clicks. From audience research and creative to A/B testing and daily optimization, every rupee works harder for your business.",
    image: "/media/paidadsnew.png",
    video: null,
    comingSoon: false,
  },
  {
    id: "07",
    title: "Software Development",
    tags: "BUILD · SCALE · INNOVATE",
    description:
      "From custom web apps to full-scale software solutions, we engineer products that perform. Clean code, modern architecture, and built to grow with your business.",
    image: "/media/services/softwaredevlopement.jpg",
    video: null,
    comingSoon: false,
  },
  {
    id: "08",
    title: "AI UGC",
    tags: "AI · CONTENT · AUTHENTIC",
    description:
      "Next-generation AI-powered user-generated content that feels real, converts fast, and scales infinitely. The future of brand storytelling is almost here.",
    image: null,
    video: null,
    comingSoon: true,
  },
];

/* ── useReveal hook ── */
function useReveal(threshold = 0.12) {
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

/* ── Utility: scroll to Our Work section ── */
const scrollToOurWork = () => {
  const ourWorkSection = document.getElementById("our-work");
  if (ourWorkSection) {
    const offset = 80;
    const elementPosition = ourWorkSection.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - offset;
    window.scrollTo({ top: offsetPosition, behavior: "smooth" });
  }
};

/* ── Utility: scroll to Live Sites section ── */
const scrollToLiveSites = () => {
  const liveSites = document.getElementById("live-sites");
  if (liveSites) {
    const offset = 80;
    const elementPosition = liveSites.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - offset;
    window.scrollTo({ top: offsetPosition, behavior: "smooth" });
  }
};

/* ── ServiceRow ── */
function ServiceRow({ service, index }) {
  const [rowRef, rowVisible] = useReveal(0.1);
  const [showContent, setShowContent] = useState(false);
  const isEven = index % 2 === 0;

  useEffect(() => {
    if (!rowVisible) return;
    const t = setTimeout(() => setShowContent(true), 950);
    return () => clearTimeout(t);
  }, [rowVisible]);

  const waMessage = encodeURIComponent(
    `Hello MonkMedia! I want to start a project with you regarding ${service.title}.`
  );
  const waLink = `https://wa.me/15197746608?text=${waMessage}`;

  /* ── COMING SOON ROW ── */
  if (service.comingSoon) {
    return (
      <div
        ref={rowRef}
        className={`w-full border-b border-white/5 overflow-hidden transition-all duration-700 ease-out ${
          rowVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-10 sm:py-14 lg:py-20">
          <div className="flex flex-col lg:flex-row lg:items-center gap-8 lg:gap-16">
            <div className="flex flex-col gap-4 sm:gap-5 flex-1">
              <p className="text-[10px] tracking-[0.25em] text-[#2587a8] uppercase">
                {service.tags}
              </p>
              <div className="flex flex-wrap items-center gap-3 sm:gap-4">
                <h3
                  className="text-[#eee3ca] font-extrabold leading-[1.05] text-2xl sm:text-3xl md:text-4xl xl:text-5xl"
                  style={{ fontFamily: "'Syne', sans-serif" }}
                >
                  {service.title}
                </h3>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-[#d4af37]/60 bg-[#d4af37]/10 text-[#d4af37] text-[10px] font-bold tracking-[0.18em] uppercase whitespace-nowrap">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#d4af37] animate-pulse" />
                  We Are Adding Soon
                </span>
              </div>
              <div className="w-10 h-0.5 rounded-full bg-[#d4af37]" />
              <p className="text-[#eee3ca]/70 text-sm sm:text-base leading-relaxed max-w-xl">
                {service.description}
              </p>
              <button
                onClick={scrollToOurWork}
                className="inline-flex items-center gap-2 mt-2 px-5 sm:px-6 py-2.5 sm:py-3 rounded-full border border-[#d4af37] text-[#d4af37] text-sm font-semibold tracking-wide hover:bg-[#d4af37] hover:text-black transition-all duration-300 w-fit"
              >
                View Our Work
                <svg viewBox="0 0 24 24" width="14" height="14" fill="none"
                  stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="15 18 9 12 15 6" />
                </svg>
              </button>
            </div>
            <div className="w-full lg:w-[36%] shrink-0">
              <div className="relative rounded-2xl overflow-hidden aspect-[4/3] border border-white/5 bg-[#0a0a0a] flex flex-col items-center justify-center gap-5">
                <div
                  className="absolute inset-0 opacity-[0.06]"
                  style={{
                    backgroundImage: "radial-gradient(circle, #eee3ca 1px, transparent 1px)",
                    backgroundSize: "28px 28px",
                  }}
                />
                <svg viewBox="0 0 24 24" width="42" height="42" fill="none"
                  stroke="#d4af37" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
                  className="relative z-10 opacity-80">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                  <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                </svg>
                <p className="relative z-10 text-[#eee3ca] text-xs font-semibold tracking-[0.22em] uppercase">
                  Coming Soon
                </p>
                <div
                  className="absolute bottom-0 left-0 right-0 h-[3px]"
                  style={{ background: "linear-gradient(to right, #d4af37, #2587a8, #d4af37)" }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  /* ── REGULAR ROW ── */
  return (
    <div ref={rowRef} className="relative w-full border-b border-white/5 overflow-hidden">
      {/* Banner */}
      <div
        className={`flex items-center gap-3 sm:gap-5 px-4 sm:px-6 lg:px-10 bg-black border-b border-white/5 py-6 sm:py-8 transition-all duration-500 ease-in-out ${
          rowVisible && !showContent
            ? "opacity-100 max-h-40 pointer-events-auto"
            : "opacity-0 max-h-0 py-0 overflow-hidden pointer-events-none"
        }`}
      >
        <span
          className="font-bold text-[#2587a8] tracking-widest text-xs sm:text-sm shrink-0"
          style={{ fontFamily: "'Syne', sans-serif" }}
        >
          {service.id}
        </span>
        <span
          className="text-[#eee3ca] font-extrabold uppercase tracking-wide text-lg sm:text-2xl md:text-3xl lg:text-4xl flex-1 leading-tight"
          style={{ fontFamily: "'Syne', sans-serif" }}
        >
          {service.title}
        </span>
        <span className="hidden sm:inline text-[10px] tracking-[0.18em] text-[#eee3ca]/40 border border-[#333] rounded-full px-3 py-1.5 whitespace-nowrap shrink-0">
          {service.tags}
        </span>
      </div>

      {/* Main content */}
      <div
        className={`transition-all duration-700 ease-out ${
          showContent ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12 pointer-events-none"
        }`}
      >
        <div
          className={`flex flex-col gap-8 ${
            isEven ? "lg:flex-row" : "lg:flex-row-reverse"
          } items-center lg:gap-14 xl:gap-20 px-4 sm:px-6 lg:px-10 py-10 sm:py-14 lg:py-16 max-w-7xl mx-auto`}
        >
          {/* Image or Video */}
          <div className="w-full lg:w-[36%] shrink-0">
            <div className="relative rounded-2xl overflow-hidden aspect-[4/3] shadow-2xl">
              {service.video ? (
                <video
                  src={service.video}
                  autoPlay muted loop playsInline
                  className="w-full h-full object-cover"
                />
              ) : service.image ? (
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full"
                  style={
                    service.imageStyle
                      ? service.imageStyle
                      : { objectFit: "cover", objectPosition: "center" }
                  }
                  loading="lazy"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
                  <span className="text-[#eee3ca]/40 text-sm">No media</span>
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-br from-black/25 to-transparent" />
              <span
                className="absolute bottom-4 left-5 text-[#eee3ca]/30 text-xs font-bold tracking-[0.2em]"
                style={{ fontFamily: "'Syne', sans-serif" }}
              >
                {service.id}
              </span>
              <div
                className="absolute bottom-0 left-0 right-0 h-[3px]"
                style={{ background: "linear-gradient(to right, #d4af37, #2587a8, #d4af37)" }}
              />
            </div>
          </div>

          {/* Text */}
          <div
            className={`w-full lg:w-[64%] flex flex-col gap-4 sm:gap-5 items-start text-left ${
              isEven ? "lg:items-start lg:text-left" : "lg:items-end lg:text-right"
            }`}
          >
            <p className="text-[10px] tracking-[0.25em] text-[#2587a8] uppercase">
              {service.tags}
            </p>
            <h3
              className="text-[#eee3ca] font-extrabold leading-[1.05] text-2xl sm:text-3xl md:text-4xl xl:text-5xl"
              style={{ fontFamily: "'Syne', sans-serif" }}
            >
              {service.title}
            </h3>
            <div
              className="w-10 h-0.5 rounded-full bg-[#d4af37]"
              style={{ marginLeft: isEven ? 0 : "auto" }}
            />
            <p className="text-[#eee3ca]/70 text-sm sm:text-base leading-relaxed max-w-md">
              {service.description}
            </p>

            {/* Buttons container */}
            <div className="flex flex-wrap gap-3 sm:gap-4 mt-2">
              <a
                href={waLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 rounded-full border border-[#2587a8] text-[#eee3ca] text-sm font-semibold tracking-wide hover:bg-[#2587a8] transition-all duration-300 hover:translate-x-1"
              >
                Get Started
                <svg viewBox="0 0 24 24" width="14" height="14" fill="none"
                  stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </a>

              {service.id === "01" ? (
                <button
                  onClick={scrollToLiveSites}
                  className="inline-flex items-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 rounded-full border border-[#d4af37] text-[#d4af37] text-sm font-semibold tracking-wide hover:bg-[#d4af37] hover:text-black transition-all duration-300"
                >
                  View Websites
                  <svg viewBox="0 0 24 24" width="14" height="14" fill="none"
                    stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="15 18 9 12 15 6" />
                  </svg>
                </button>
              ) : (
                <button
                  onClick={scrollToOurWork}
                  className="inline-flex items-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 rounded-full border border-[#d4af37] text-[#d4af37] text-sm font-semibold tracking-wide hover:bg-[#d4af37] hover:text-black transition-all duration-300"
                >
                  View Our Work
                  <svg viewBox="0 0 24 24" width="14" height="14" fill="none"
                    stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="15 18 9 12 15 6" />
                  </svg>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* height spacer during banner */}
      {rowVisible && !showContent && (
        <div className="w-full" style={{ minHeight: "440px" }} />
      )}
    </div>
  );
}

/* ══════════════════════════════════════════════════
   MAIN
══════════════════════════════════════════════════ */
export default function Services() {
  const [headerRef, headerVisible] = useReveal(0.04);

  useEffect(() => {
    if (typeof window === "undefined") return;

    if (window.location.hash === "#our-work") {
      setTimeout(() => {
        const section = document.getElementById("our-work");
        if (section) {
          const offset = 80;
          const elementPosition = section.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - offset;
          window.scrollTo({ top: offsetPosition, behavior: "smooth" });
        }
      }, 500);
    }

    if (window.location.hash === "#live-sites") {
      setTimeout(() => {
        const section = document.getElementById("live-sites");
        if (section) {
          const offset = 80;
          const elementPosition = section.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - offset;
          window.scrollTo({ top: offsetPosition, behavior: "smooth" });
        }
      }, 500);
    }
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@600;700;800&family=DM+Sans:wght@300;400;500&display=swap');
        .svc-root { font-family: 'DM Sans', sans-serif; }
      `}</style>

      <section className="svc-root w-full bg-black overflow-hidden">
        {/* ── HEADER ── */}
        <div
          ref={headerRef}
          className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 pt-36 sm:pt-40 md:pt-44 lg:pt-48 pb-10 sm:pb-14 lg:pb-16 flex flex-col lg:flex-row lg:items-end gap-6 lg:gap-16 transition-all duration-700 ease-out ${
            headerVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-8"
          }`}
        >
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-4 sm:mb-5">
              <span className="block w-9 h-px bg-[#2587a8]" />
              <span className="text-[11px] tracking-[0.22em] text-[#eee3ca]/40 uppercase">Services</span>
              <span className="block w-9 h-px bg-[#2587a8]" />
            </div>
            <h2
              className="text-[#eee3ca] font-extrabold leading-none text-[clamp(2.8rem,10vw,7rem)]"
              style={{ fontFamily: "'Syne', sans-serif" }}
            >
              WHAT WE<br />
              <span className="text-[#2587a8]">DO BEST.</span>
            </h2>
          </div>
          <div className="lg:max-w-xs xl:max-w-sm lg:pb-2">
            <p className="text-[#eee3ca]/60 text-sm sm:text-base leading-relaxed">
              Six focused disciplines. One relentless goal — help your brand grow, get found, and be remembered.
            </p>
          </div>
        </div>

        {/* ── DIVIDER ── */}
        <div
          className="w-full h-px"
          style={{ background: "linear-gradient(to right, transparent, #2a2a2a 20%, #2a2a2a 80%, transparent)" }}
        />

        {/* ── SERVICE ROWS ── */}
        {SERVICES.map((service, i) => (
          <ServiceRow key={service.id} service={service} index={i} />
        ))}
      </section>
    </>
  );
}