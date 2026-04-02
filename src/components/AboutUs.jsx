import { useEffect, useRef } from "react";
import { PhoneCall } from "lucide-react";

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

const LOOPED_IMAGES = [...CLIENT_IMAGES, ...CLIENT_IMAGES];

export default function AboutUs() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("animate-in");
        });
      },
      { threshold: 0.08, rootMargin: "0px 0px -40px 0px" }
    );
    document.querySelectorAll(".scroll-reveal").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <style>{`
        .scroll-reveal {
          opacity: 0;
          transform: translateY(40px);
          transition: opacity 0.9s cubic-bezier(0.22,1,0.36,1),
                      transform 0.9s cubic-bezier(0.22,1,0.36,1);
        }
        .scroll-reveal.delay-1 { transition-delay: 0.08s; }
        .scroll-reveal.delay-2 { transition-delay: 0.20s; }
        .scroll-reveal.delay-3 { transition-delay: 0.34s; }
        .scroll-reveal.delay-4 { transition-delay: 0.48s; }
        .scroll-reveal.animate-in {
          opacity: 1;
          transform: translateY(0);
        }

        @keyframes carousel-scroll {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .carousel-track {
          display: flex;
          width: max-content;
          animation: carousel-scroll 55s linear infinite;
          will-change: transform;
        }
        .carousel-track:hover {
          animation-play-state: paused;
        }
        .carousel-wrapper {
          overflow: hidden;
          position: relative;
        }
        .carousel-wrapper::before,
        .carousel-wrapper::after {
          content: '';
          position: absolute;
          top: 0; bottom: 0;
          width: 100px;
          z-index: 2;
          pointer-events: none;
        }
        .carousel-wrapper::before {
          left: 0;
          background: linear-gradient(to right, #000 0%, transparent 100%);
        }
        .carousel-wrapper::after {
          right: 0;
          background: linear-gradient(to left, #000 0%, transparent 100%);
        }

        .tag-line::before,
        .tag-line::after {
          content: '';
          display: inline-block;
          width: 2rem;
          height: 2px;
          background: #2587a8;
          vertical-align: middle;
          margin: 0 0.5rem;
        }

        @keyframes soft-ping {
          0%, 100% { transform: scale(1); opacity: 0.4; }
          50%       { transform: scale(1.55); opacity: 0; }
        }
        .phone-ping {
          animation: soft-ping 2s ease-out infinite;
        }

        .client-img {
          flex-shrink: 0;
          overflow: hidden;
          border-radius: 0.75rem;
          transition: transform 0.4s cubic-bezier(0.22,1,0.36,1), opacity 0.4s ease;
        }
        .client-img img {
          width: 100%;
          height: 100%;
          object-fit: contain;
          display: block;
          filter: brightness(0.9);
          transition: filter 0.4s ease, transform 0.4s cubic-bezier(0.22,1,0.36,1);
        }
        .client-img:hover img {
          filter: brightness(1.1);
          transform: scale(1.04);
        }
      `}</style>

      <section
        ref={sectionRef}
        className="w-full py-16 sm:py-20 md:py-24 px-4 sm:px-8 md:px-12 lg:px-20"
        style={{ backgroundColor: "#000000" }}
      >
        <div className="max-w-7xl mx-auto flex flex-col gap-12 sm:gap-14 md:gap-16">

          {/* ── Top row: heading + phone ── */}
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-8">

            <div className="flex flex-col gap-3">
              <span
                className="scroll-reveal delay-1 text-xs sm:text-sm font-semibold tracking-widest uppercase tag-line"
                style={{ color: "#2587a8" }}
              >
                About Us
              </span>
              <h2
                className="scroll-reveal delay-2 font-extrabold text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-tight"
                style={{ color: "#eee3ca" }}
              >
                A Full-Service<br />
                Digital Agency.
              </h2>
            </div>

            <div className="scroll-reveal delay-3 flex items-center gap-4 flex-shrink-0">
              <div className="relative flex-shrink-0">
                <div
                  className="phone-ping absolute inset-0 rounded-full"
                  style={{ background: "rgba(37,135,168,0.28)" }}
                />
                <div
                  className="relative w-11 h-11 sm:w-12 sm:h-12 rounded-full flex items-center justify-center"
                  style={{
                    border: "2px solid #2587a8",
                    background: "rgba(37,135,168,0.12)",
                  }}
                >
                  <PhoneCall size={20} color="#2587a8" strokeWidth={2} />
                </div>
              </div>
              <div>
                <p className="font-bold text-sm sm:text-base" style={{ color: "#eee3ca" }}>
                  Contact Us
                </p>
                <p className="text-sm" style={{ color: "rgba(255,255,255,0.55)" }}>
                  +1 (519) 774-6608
                </p>
              </div>
            </div>
          </div>

          {/* ── Divider ── */}
          <div
            className="w-full h-px"
            style={{ background: "rgba(255,255,255,0.07)" }}
          />

          {/* ── Our Work label ── */}
          <div className="scroll-reveal delay-3 flex flex-col gap-2 -mt-4">
            <span
              className="text-xs sm:text-sm font-semibold tracking-widest uppercase tag-line"
              style={{ color: "#2587a8" }}
            >
              Our Work
            </span>
            <p
              className="text-sm sm:text-base"
              style={{ color: "rgba(255,255,255,0.45)" }}
            >
              Brands we've helped grow.
            </p>
          </div>

          {/* ── Carousel ── */}
          <div
            className="scroll-reveal delay-4 carousel-wrapper"
            style={{
              marginLeft: "calc(-1 * clamp(1rem, 5vw, 5rem))",
              marginRight: "calc(-1 * clamp(1rem, 5vw, 5rem))",
            }}
          >
            <div
              className="carousel-track"
              style={{
                gap: "clamp(14px, 2vw, 24px)",
                paddingLeft: "clamp(1rem, 5vw, 5rem)",
              }}
            >
              {LOOPED_IMAGES.map((src, i) => (
                <div
                  key={i}
                  className="client-img"
                  style={{
                    width: "clamp(180px, 22vw, 280px)",
                    height: "clamp(130px, 16vw, 200px)",
                  }}
                >
                  <img
                    src={src}
                    alt={`Client ${(i % CLIENT_IMAGES.length) + 1}`}
                    loading="lazy"
                  />
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>
    </>
  );
}