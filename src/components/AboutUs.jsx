import { useEffect, useRef } from "react";
import { Plus, ArrowUpRight, PhoneCall, Eye, Target } from "lucide-react";

export default function AboutUs() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const observerOptions = {
      threshold: 0.08,
      rootMargin: "0px 0px -40px 0px",
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate-in");
        }
      });
    }, observerOptions);

    // Observe both scroll-reveal AND fade-up elements
    const animatedEls = document.querySelectorAll(".scroll-reveal, .fade-up");
    animatedEls.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <style>{`
        /* ── Scroll-reveal: hidden until intersected ── */
        .scroll-reveal {
          opacity: 0;
          transform: translateY(48px);
          transition: opacity 0.85s cubic-bezier(0.22, 1, 0.36, 1),
                      transform 0.85s cubic-bezier(0.22, 1, 0.36, 1);
        }
        .scroll-reveal.delay-1 { transition-delay: 0.08s; }
        .scroll-reveal.delay-2 { transition-delay: 0.18s; }
        .scroll-reveal.delay-3 { transition-delay: 0.28s; }
        .scroll-reveal.delay-4 { transition-delay: 0.40s; }
        .scroll-reveal.delay-5 { transition-delay: 0.54s; }

        .scroll-reveal.animate-in {
          opacity: 1;
          transform: translateY(0);
        }

        /* ── Media cards: also scroll-triggered ── */
        .fade-up {
          opacity: 0;
          transform: translateY(48px);
          transition: opacity 0.85s cubic-bezier(0.22, 1, 0.36, 1),
                      transform 0.85s cubic-bezier(0.22, 1, 0.36, 1);
        }
        .fade-up.fade-up-2 { transition-delay: 0.14s; }
        .fade-up.fade-up-3 { transition-delay: 0.26s; }
        .fade-up.fade-up-4 { transition-delay: 0.38s; }

        .fade-up.animate-in {
          opacity: 1;
          transform: translateY(0);
        }

        /* ── Icon button hover ── */
        .icon-btn {
          transition: transform 0.25s ease, box-shadow 0.25s ease;
        }
        .icon-btn:hover {
          transform: scale(1.1);
          box-shadow: 0 0 16px rgba(37, 135, 168, 0.45);
        }

        /* ── Card hover lift ── */
        .card-lift {
          transition: transform 0.3s cubic-bezier(0.22, 1, 0.36, 1),
                      box-shadow 0.3s ease;
        }
        .card-lift:hover {
          transform: translateY(-6px);
          box-shadow: 0 24px 48px rgba(37, 135, 168, 0.18);
        }

        /* ── Image zoom on hover ── */
        .img-zoom img {
          transition: transform 0.6s cubic-bezier(0.22, 1, 0.36, 1);
        }
        .img-zoom:hover img {
          transform: scale(1.03);
        }

        /* ── About Us tag decorators ── */
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
      `}</style>

      <section
        ref={sectionRef}
        className="w-full min-h-screen py-12 px-4 sm:px-8 md:px-12 lg:px-20"
        style={{ backgroundColor: "#000000" }}
      >
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">

            {/* ────────── LEFT: media cards ────────── */}
            <div className="flex flex-col sm:flex-row gap-4">

              {/* Left sub-column */}
              <div className="flex flex-col gap-4 flex-1">

                {/* Big photo */}
                <div
                  className="img-zoom fade-up rounded-2xl overflow-hidden"
                  style={{ height: "320px" }}
                >
                  <img
                    src="/media/About-1.jpg"
                    alt="Team working"
                    className="w-full h-full object-cover object-top"
                  />
                </div>

                {/* Driven By Growth card */}
                <div
                  className="fade-up fade-up-2 card-lift rounded-2xl p-5 flex flex-col gap-2"
                  style={{
                    backgroundImage:
                      "linear-gradient(rgba(0,0,0,0.80), rgba(0,0,0,0.80)), url('/media/About-2.jpg')",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                >
                  <div
                    className="icon-btn w-10 h-10 rounded-full flex items-center justify-center"
                    style={{ background: "#2587a8" }}
                  >
                    <Plus size={18} color="#000000" strokeWidth={3} />
                  </div>
                  <h3
                    className="font-extrabold text-xl leading-tight mt-1"
                    style={{ color: "#eee3ca" }}
                  >
                    Driven By Growth
                  </h3>
                  <p className="text-sm leading-relaxed" style={{ color: "#d4af37" }}>
                    Creative solutions that help your brand succeed.
                  </p>
                </div>
              </div>

              {/* Right sub-column */}
              <div className="flex flex-col gap-4 flex-1">

                {/* 24/7 Support card */}
                <div
                  className="fade-up fade-up-3 card-lift rounded-2xl p-5 flex flex-col gap-2"
                  style={{
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(255,255,255,0.08)",
                  }}
                >
                  <h3
                    className="font-extrabold text-xl underline underline-offset-4"
                    style={{ color: "#eee3ca" }}
                  >
                    24/7 Support
                  </h3>
                  <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.55)" }}>
                    Always here to keep your business running smoothly.
                  </p>
                  <div
                    className="icon-btn cursor-pointer mt-2 w-11 h-11 rounded-full flex items-center justify-center self-start"
                    style={{ background: "#2587a8" }}
                  >
                    <ArrowUpRight size={20} color="#000000" strokeWidth={2.5} />
                  </div>
                </div>

                {/* Second photo */}
                <div
                  className="img-zoom fade-up fade-up-4 rounded-2xl overflow-hidden"
                  style={{ height: "240px" }}
                >
                  <img
                    src="/media/About-2.jpg"
                    alt="Collaboration"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>

            {/* ────────── RIGHT: text content ────────── */}
            <div className="flex flex-col gap-6 lg:pt-4">

              {/* About Us label */}
              <div
                className="scroll-reveal delay-1 text-sm font-semibold tracking-widest uppercase tag-line"
                style={{ color: "#2587a8" }}
              >
                About Us
              </div>

              {/* Headline */}
              <h2
                className="scroll-reveal delay-2 font-extrabold text-3xl sm:text-4xl lg:text-5xl leading-tight"
                style={{ color: "#eee3ca" }}
              >
                A Full-Service<br />
                Digital Agency.
              </h2>

              {/* Description */}
              <div
                className="scroll-reveal delay-3 space-y-3 text-sm sm:text-base leading-relaxed"
                style={{ color: "rgba(255,255,255,0.6)" }}
              >
                <p>
                  At Monk Media, we turn ideas into powerful digital experiences that help
                  businesses reach their goals. Our focus is not just on design or technology but
                  on delivering results that truly matter.
                </p>
                <p>
                  We work closely with our clients to understand their vision, targets, and
                  audience. From creative design to smart digital strategies, every solution we
                  create is aimed at growth, performance, and measurable success.
                </p>
                <p>
                  Monk Media is committed to completing targets, meeting deadlines, and helping
                  brands stand out in today's competitive digital world. Your goals are our
                  mission, and your success is our result.
                </p>
              </div>

              {/* Vision + Mission cards */}
              <div className="scroll-reveal delay-4 grid grid-cols-1 sm:grid-cols-2 gap-4">

                {/* Vision */}
                <div
                  className="card-lift rounded-2xl p-5 flex flex-col items-center text-center gap-3"
                  style={{
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(255,255,255,0.08)",
                  }}
                >
                  <div
                    className="icon-btn w-10 h-10 rounded-full flex items-center justify-center"
                    style={{ background: "#2587a8" }}
                  >
                    <Eye size={18} color="#000000" strokeWidth={2.5} />
                  </div>
                  <h4 className="font-extrabold text-lg" style={{ color: "#eee3ca" }}>
                    Our Vision
                  </h4>
                  <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.55)" }}>
                    To be the go-to creative studio for innovative, results-driven digital experiences.
                  </p>
                </div>

                {/* Mission */}
                <div
                  className="card-lift rounded-2xl p-5 flex flex-col items-center text-center gap-3"
                  style={{
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(255,255,255,0.08)",
                  }}
                >
                  <div
                    className="icon-btn w-10 h-10 rounded-full flex items-center justify-center"
                    style={{ background: "#2587a8" }}
                  >
                    <Target size={18} color="#000000" strokeWidth={2.5} />
                  </div>
                  <h4 className="font-extrabold text-lg" style={{ color: "#eee3ca" }}>
                    Our Mission
                  </h4>
                  <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.55)" }}>
                    To create digital solutions that truly help grow your brand and business.
                  </p>
                </div>
              </div>

              {/* Contact info row */}
              <div className="scroll-reveal delay-5 flex items-center gap-4 mt-2">
                <div className="relative flex-shrink-0">
                  <div
                    className="absolute inset-0 rounded-full animate-ping"
                    style={{ background: "rgba(37,135,168,0.25)" }}
                  />
                  <div
                    className="relative w-12 h-12 rounded-full flex items-center justify-center"
                    style={{
                      border: "2px solid #2587a8",
                      background: "rgba(37,135,168,0.12)",
                    }}
                  >
                    <PhoneCall size={20} color="#2587a8" strokeWidth={2} />
                  </div>
                </div>
                <div>
                  <p className="font-bold text-base" style={{ color: "#eee3ca" }}>
                    Contact Us
                  </p>
                  <p className="text-sm" style={{ color: "rgba(255,255,255,0.55)" }}>
                    +1 (519) 774-6608
                  </p>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>
    </>
  );
}