import { useEffect, useRef, useState } from "react";

const BoltIcon = () => (
  <svg viewBox="0 0 24 24" width="22" height="22">
    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" fill="#2587a8" />
  </svg>
);

const ClockIcon = () => (
  <svg fill="#2587a8" height="22" width="22" viewBox="0 0 490 490" xmlns="http://www.w3.org/2000/svg">
    <g><g><g>
      <path d="M245,15.313c126.65,0,229.688,103.038,229.688,229.687S371.65,474.688,245,474.688S15.313,371.65,15.313,245
        S118.35,15.313,245,15.313 M245,0C109.688,0,0,109.69,0,245s109.688,245,245,245s245-109.69,245-245S380.311,0,245,0L245,0z"/>
    </g></g>
    <g>
      <polygon points="370.61,379.523 237.344,246.256 237.344,58.289 252.656,58.289 252.656,239.916 381.437,368.696"/>
    </g></g>
  </svg>
);

const GlobeIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="#2587a8" strokeWidth="1.8"
    strokeLinecap="round" strokeLinejoin="round" width="22" height="22">
    <circle cx="12" cy="12" r="10" />
    <line x1="2" y1="12" x2="22" y2="12" />
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
  </svg>
);

const DigitalIcon = () => (
  <img
    src="/media/digital-icon.svg"
    alt="Digital Solutions"
    width="22"
    height="22"
    style={{ filter: "invert(52%) sepia(60%) saturate(500%) hue-rotate(163deg) brightness(95%)" }}
  />
);

function useInView(rootMargin = "0px 0px -10% 0px") {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15, rootMargin }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [rootMargin]);

  return [ref, inView];
}

const STEPS = [
  {
    icon: <BoltIcon />,
    number: "01",
    title: "Fast Reliable Service",
    desc: "We deliver quick, dependable digital solutions designed to keep your business running smoothly without delays.",
    side: "left",
  },
  {
    icon: <ClockIcon />,
    number: "02",
    title: "Ongoing Support",
    desc: "Our team is available 24/7 to provide continuous assistance and ensure your business never misses a beat.",
    side: "right",
  },
  {
    icon: <GlobeIcon />,
    number: "03",
    title: "Efficient Project Execution",
    desc: "Delivering projects on time with accuracy and professionalism, ensuring optimal results for your business.",
    side: "left",
  },
  {
    icon: <DigitalIcon />,
    number: "04",
    title: "High-Quality Digital Solutions",
    desc: "We craft premium digital experiences that elevate your brand and drive measurable business outcomes.",
    side: "right",
  },
];

function StepCard({ step, index }) {
  const [ref, inView] = useInView("0px 0px -8% 0px");
  const isLeft = step.side === "left";

  return (
    <div
      ref={ref}
      className={`wcu-step ${isLeft ? "step-left" : "step-right"} ${inView ? "in" : ""}`}
      style={{ transitionDelay: `${index * 0.12}s` }}
    >
      {/* Card */}
      <div className={`wcu-step-card ${isLeft ? "card-left" : "card-right"}`}>
        <div className="wcu-step-number">{step.number}</div>
        <div className="wcu-step-icon-ring">{step.icon}</div>
        <h3 className="wcu-step-title">{step.title}</h3>
        <p className="wcu-step-desc">{step.desc}</p>
        <div className="wcu-step-glow" />
      </div>

      {/* Center dot */}
      <div className="wcu-step-dot">
        <div className="wcu-step-dot-inner" />
      </div>
    </div>
  );
}

export default function WhyChooseUs() {
  const [headRef, headIn] = useInView("0px 0px -5% 0px");

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;700;800;900&display=swap');

        .wcu * { box-sizing: border-box; margin: 0; padding: 0; }

        .wcu {
          width: 100%;
          padding: 90px 24px 100px;
          font-family: 'Inter', sans-serif;
          background: #000;
          display: flex;
          flex-direction: column;
          align-items: center;
          overflow: hidden;
        }

        /* ── HEADER ── */
        .wcu-head {
          text-align: center;
          margin-bottom: 80px;
          opacity: 0;
          transform: translateY(-28px);
          transition: opacity .75s ease, transform .75s cubic-bezier(.22,1,.36,1);
        }
        .wcu-head.in { opacity: 1; transform: none; }

        .wcu-eye {
          display: flex; align-items: center; justify-content: center;
          gap: 12px; color: rgba(238,227,202,0.5); font-size: 13px;
          letter-spacing: .10em; text-transform: uppercase; margin-bottom: 20px;
        }
        .wcu-eye::before, .wcu-eye::after {
          content: ''; width: 44px; height: 1px; background: #2587a8; display: block;
        }
        .wcu-h1 {
          font-size: clamp(30px, 5vw, 64px);
          font-weight: 800; color: #eee3ca;
          line-height: 1.08; letter-spacing: -.025em; margin-bottom: 20px;
        }
        .wcu-h1 span {
          color: #2587a8;
        }
        .wcu-sub {
          color: rgba(238,227,202,0.4); font-size: 15px; line-height: 1.78;
          max-width: 530px; margin: 0 auto;
        }

        /* ── TIMELINE WRAPPER ── */
        .wcu-timeline {
          position: relative;
          width: 100%;
          max-width: 1100px;
          display: flex;
          flex-direction: column;
          gap: 0;
        }

        /* Vertical center line */
        .wcu-timeline::before {
          content: '';
          position: absolute;
          left: 50%;
          top: 0; bottom: 0;
          width: 1px;
          background: linear-gradient(
            to bottom,
            transparent 0%,
            #2587a8 10%,
            #2587a8 90%,
            transparent 100%
          );
          transform: translateX(-50%);
          z-index: 0;
        }

        /* ── EACH STEP ROW ── */
        .wcu-step {
          display: flex;
          align-items: center;
          position: relative;
          min-height: 180px;
          opacity: 0;
          will-change: transform, opacity;
          transition: opacity .75s cubic-bezier(.22,1,.36,1),
                      transform .75s cubic-bezier(.22,1,.36,1);
        }
        .wcu-step.step-left  { transform: translateX(-60px); justify-content: flex-start; }
        .wcu-step.step-right { transform: translateX(60px);  justify-content: flex-end;  }
        .wcu-step.in { opacity: 1; transform: translateX(0); }

        /* ── CARD ── */
        .wcu-step-card {
          width: 44%;
          position: relative;
          border-radius: 16px;
          padding: 36px 32px;
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.07);
          overflow: hidden;
          transition: border-color .35s ease, background .35s ease, transform .35s ease;
          z-index: 2;
        }
        .wcu-step-card:hover {
          border-color: rgba(37,135,168,0.5);
          background: rgba(37,135,168,0.05);
          transform: translateY(-4px);
        }

        /* Accent corner slice */
        .wcu-step-card.card-left::before {
          content: '';
          position: absolute;
          top: 0; right: -1px;
          width: 0; height: 0;
          border-style: solid;
          border-width: 0 0 48px 48px;
          border-color: transparent transparent #000 transparent;
        }
        .wcu-step-card.card-right::before {
          content: '';
          position: absolute;
          top: 0; left: -1px;
          width: 0; height: 0;
          border-style: solid;
          border-width: 48px 48px 0 0;
          border-color: #000 transparent transparent transparent;
        }

        /* Glowing bg blur */
        .wcu-step-glow {
          position: absolute;
          bottom: -40px; 
          width: 160px; height: 160px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(37,135,168,0.18) 0%, transparent 70%);
          pointer-events: none;
          z-index: 0;
        }
        .card-left  .wcu-step-glow { right: -40px; }
        .card-right .wcu-step-glow { left: -40px; }

        .wcu-step-number {
          font-size: 52px;
          font-weight: 900;
          color: rgba(37,135,168,0.12);
          line-height: 1;
          position: absolute;
          top: 16px; right: 20px;
          letter-spacing: -.04em;
          z-index: 1;
          user-select: none;
        }
        .card-right .wcu-step-number { right: auto; left: 20px; }

        .wcu-step-icon-ring {
          width: 52px; height: 52px; border-radius: 50%;
          border: 1px solid rgba(37,135,168,0.4);
          display: flex; align-items: center; justify-content: center;
          margin-bottom: 18px;
          background: rgba(37,135,168,0.07);
          position: relative; z-index: 2;
        }

        .wcu-step-title {
          font-size: 18px; font-weight: 700;
          color: #eee3ca; line-height: 1.3;
          margin-bottom: 10px;
          position: relative; z-index: 2;
        }

        .wcu-step-desc {
          font-size: 13.5px; line-height: 1.75;
          color: rgba(238,227,202,0.4);
          position: relative; z-index: 2;
        }

        /* ── CENTER DOT ── */
        .wcu-step-dot {
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
          width: 18px; height: 18px;
          border-radius: 50%;
          border: 1.5px solid #2587a8;
          background: #000;
          display: flex; align-items: center; justify-content: center;
          z-index: 3;
        }
        .wcu-step-dot-inner {
          width: 7px; height: 7px;
          border-radius: 50%;
          background: #2587a8;
        }

        /* ── MOBILE ── */
        @media (max-width: 680px) {
          .wcu { padding: 60px 16px 72px; }
          .wcu-head { margin-bottom: 48px; }

          .wcu-timeline::before { left: 16px; }

          .wcu-step {
            justify-content: flex-end !important;
            padding-left: 44px;
          }
          .wcu-step.step-left,
          .wcu-step.step-right { transform: translateY(30px); }
          .wcu-step.in { transform: translateY(0); }

          .wcu-step-card { width: 100%; }
          .wcu-step-card.card-left::before,
          .wcu-step-card.card-right::before { display: none; }

          .wcu-step-dot {
            left: 16px;
            top: 50%;
          }
          .wcu-step-number { font-size: 36px; }
        }
      `}</style>

      <section className="wcu">

        {/* Header */}
        <div className={`wcu-head${headIn ? " in" : ""}`} ref={headRef}>
          <p className="wcu-eye">Why Choose Us</p>
          <h2 className="wcu-h1">
            Crafting Experiences,<br />
            <span>Delivering Success.</span>
          </h2>
          <p className="wcu-sub">
            Digital solutions that connect with your audience, strengthen your brand,
            and deliver real, measurable results that fuel your business growth.
          </p>
        </div>

        {/* Timeline */}
        <div className="wcu-timeline">
          {STEPS.map((step, i) => (
            <StepCard key={i} step={step} index={i} />
          ))}
        </div>

      </section>
    </>
  );
}