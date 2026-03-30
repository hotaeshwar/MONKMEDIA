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

/* ─── useInView: fires once when element hits viewport ─── */
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

export default function WhyChooseUs() {
  const [headRef,  headIn]  = useInView("0px 0px -5% 0px");
  const [bodyRef,  bodyIn]  = useInView("0px 0px -8% 0px");
  const [imgRef,   imgIn]   = useInView("0px 0px -5% 0px");

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;700;800;900&display=swap');

        .wcu * { box-sizing: border-box; margin: 0; padding: 0; }

        .wcu {
          width: 100%;
          padding: 80px 0 0;
          font-family: 'Inter', sans-serif;
          display: flex;
          flex-direction: column;
          align-items: center;
          background: #000;
        }

        /* ── HEADER ── */
        .wcu-head {
          text-align: center;
          padding: 0 24px;
          margin-bottom: 60px;
          opacity: 0;
          transform: translateY(-28px);
          transition: opacity .75s ease, transform .75s cubic-bezier(.22,1,.36,1);
        }
        .wcu-head.in { opacity: 1; transform: none; }

        .wcu-eye {
          display: flex; align-items: center; justify-content: center;
          gap: 12px; color: rgba(238,227,202,0.5); font-size: 13px; letter-spacing: .08em;
          text-transform: uppercase; margin-bottom: 20px;
        }
        .wcu-eye::before, .wcu-eye::after {
          content: ''; width: 44px; height: 1px; background: #2587a8; display: block;
        }
        .wcu-h1 {
          font-size: clamp(30px, 5vw, 64px);
          font-weight: 800; color: #eee3ca;
          line-height: 1.08; letter-spacing: -.025em; margin-bottom: 20px;
        }
        .wcu-sub {
          color: rgba(238,227,202,0.4); font-size: 15px; line-height: 1.78;
          max-width: 530px; margin: 0 auto;
        }

        /* ── LAYOUT ── */
        .wcu-body-outer {
          width: 100%;
          max-width: 1280px;
          padding: 0 24px;
        }

        .wcu-body {
          display: flex;
          align-items: stretch;
          gap: 0;
        }

        .wcu-col {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .wcu-gap {
          width: 24px;
          flex-shrink: 0;
        }

        /* ── CENTER IMAGE ── */
        .wcu-mid {
          width: 380px;
          flex-shrink: 0;
          display: flex;
          align-items: flex-end;
          justify-content: center;
          margin-top: -80px;
          position: relative;
          min-height: 520px;
        }

        /* Image rises from below — starts hidden below container */
        .wcu-img {
          width: 100%;
          height: auto;
          object-fit: contain;
          object-position: bottom center;
          transform: translateY(120px);
          opacity: 0;
          transition: transform 1.3s cubic-bezier(.22,1,.36,1) .1s,
                      opacity   1s   ease                       .1s;
          position: relative;
          z-index: 2;
          will-change: transform, opacity;
        }
        .wcu-img.in {
          transform: translateY(0);
          opacity: 1;
        }

        /* ── CARDS ── */
        .wcu-card {
          flex: 1;
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 12px;
          padding: 44px 32px;
          text-align: center;
          display: flex; flex-direction: column; align-items: center;
          background: rgba(0,0,0,0.55);
          backdrop-filter: blur(8px);
          opacity: 0;
          will-change: transform, opacity;
          transition: opacity .7s ease,
                      transform .7s cubic-bezier(.22,1,.36,1),
                      border-color .3s,
                      background .3s;
        }
        .wcu-card:hover {
          border-color: #2587a8;
          background: rgba(4,4,4,0.75);
        }

        /* ── fly-in starting positions — corners ── */
        .wcu-col.left  .wcu-card:nth-child(1) { transform: translate(-90px, -60px); transition-delay: .05s; }
        .wcu-col.left  .wcu-card:nth-child(2) { transform: translate(-90px,  60px); transition-delay: .20s; }
        .wcu-col.right .wcu-card:nth-child(1) { transform: translate( 90px, -60px); transition-delay: .12s; }
        .wcu-col.right .wcu-card:nth-child(2) { transform: translate( 90px,  60px); transition-delay: .27s; }

        /* ── animate to natural position ── */
        .wcu-card.in {
          opacity: 1 !important;
          transform: translate(0, 0) !important;
        }

        .wcu-ring {
          width: 62px; height: 62px; border-radius: 50%;
          border: 1.5px solid #2587a8;
          display: flex; align-items: center; justify-content: center;
          margin-bottom: 26px;
        }

        .wcu-ct {
          font-size: 19px; font-weight: 700; color: #eee3ca;
          line-height: 1.3; padding-bottom: 14px; position: relative;
        }
        .wcu-ct::after {
          content: '';
          display: block; width: 32px; height: 2px;
          background: #d4af37; margin: 10px auto 0; border-radius: 2px;
        }
        .wcu-cd {
          font-size: 14px; color: rgba(238,227,202,0.4); line-height: 1.78; margin-top: 12px;
        }

        /* ── TABLET ── */
        @media (max-width: 900px) {
          .wcu-body { flex-wrap: wrap; }
          .wcu-gap { display: none; }
          .wcu-col { flex: 0 0 50%; gap: 16px; }
          .wcu-mid { flex: 0 0 100%; order: -1; width: 100%; min-height: 320px; }
          .wcu-col.left  .wcu-card:nth-child(1),
          .wcu-col.left  .wcu-card:nth-child(2) { transform: translate(-60px, 36px); }
          .wcu-col.right .wcu-card:nth-child(1),
          .wcu-col.right .wcu-card:nth-child(2) { transform: translate( 60px, 36px); }
        }

        /* ── MOBILE ── */
        @media (max-width: 560px) {
          .wcu { padding: 52px 0 0; }
          .wcu-body-outer { padding: 0 12px; }
          .wcu-col { flex: 0 0 100%; gap: 12px; }
          .wcu-mid { min-height: 260px; }
          .wcu-card { padding: 32px 18px; }
          .wcu-col.left  .wcu-card:nth-child(1),
          .wcu-col.left  .wcu-card:nth-child(2),
          .wcu-col.right .wcu-card:nth-child(1),
          .wcu-col.right .wcu-card:nth-child(2) { transform: translateY(40px); }
        }
      `}</style>

      <section className="wcu">

        {/* Header — own ref, fires when header scrolls in */}
        <div className={`wcu-head${headIn ? " in" : ""}`} ref={headRef}>
          <p className="wcu-eye">Why Choose Us</p>
          <h2 className="wcu-h1">Crafting Experiences,<br />Delivering Success.</h2>
          <p className="wcu-sub">
            Digital solutions that connect with your audience, strengthen your brand,
            and deliver real, measurable results that fuel your business growth.
          </p>
        </div>

        <div className="wcu-body-outer">
          {/* bodyRef on the row — cards animate when the row enters viewport */}
          <div className="wcu-body" ref={bodyRef}>

            {/* LEFT CARDS */}
            <div className="wcu-col left">
              <div className={`wcu-card${bodyIn ? " in" : ""}`}>
                <div className="wcu-ring"><BoltIcon /></div>
                <h3 className="wcu-ct">Fast Reliable Service</h3>
                <p className="wcu-cd">We deliver quick, dependable digital solutions designed to keep your business running smoothly without delays.</p>
              </div>
              <div className={`wcu-card${bodyIn ? " in" : ""}`}>
                <div className="wcu-ring"><ClockIcon /></div>
                <h3 className="wcu-ct">Ongoing Support</h3>
                <p className="wcu-cd">Our team is available 24/7 to provide continuous assistance and ensure your business never misses a beat.</p>
              </div>
            </div>

            <div className="wcu-gap" />

            {/* CENTER IMAGE — own ref for the rise-up */}
            <div className="wcu-mid" ref={imgRef}>
              <img
                src="/media/chooseus.jpg"
                alt="Why Choose Us"
                className={`wcu-img${imgIn ? " in" : ""}`}
              />
            </div>

            <div className="wcu-gap" />

            {/* RIGHT CARDS */}
            <div className="wcu-col right">
              <div className={`wcu-card${bodyIn ? " in" : ""}`}>
                <div className="wcu-ring"><GlobeIcon /></div>
                <h3 className="wcu-ct">Efficient Project Execution</h3>
                <p className="wcu-cd">Delivering projects on time with accuracy and professionalism, ensuring optimal results for your business.</p>
              </div>
              <div className={`wcu-card${bodyIn ? " in" : ""}`}>
                <div className="wcu-ring"><DigitalIcon /></div>
                <h3 className="wcu-ct">High-Quality Digital Solutions</h3>
                <p className="wcu-cd">We craft premium digital experiences that elevate your brand and drive measurable business outcomes.</p>
              </div>
            </div>

          </div>
        </div>
      </section>
    </>
  );
}