import { useEffect, useRef, useState } from "react";

function useInView() {
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
      { threshold: 0.1, rootMargin: "0px 0px -6% 0px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return [ref, inView];
}

const STEPS = [
  {
    number: "01",
    label: "STEP 01",
    title: "Onboarding",
    desc: "We kick things off with a discovery call to understand your business, your brand voice, your goals, and what makes you different from every other contractor in your market.",
    tags: ["Discovery call", "Brand questionnaire", "Goals alignment", "Platform audit"],
    note: "20–30 min call",
  },
  {
    number: "02",
    label: "STEP 02",
    title: "Ideation",
    desc: "Together we brainstorm your content — what topics will resonate with your audience, what projects to showcase, what offers to push. You know your business; we know what converts.",
    tags: ["Content strategy session", "Topic mapping", "Trend research", "Hook concepts"],
    note: "Collaborative — client + Monk Media",
  },
  {
    number: "03",
    label: "STEP 03",
    title: "Scripting",
    desc: "We write every script based on the ideation session. Each video is crafted to hook within 3 seconds, hold attention, and drive action. You review and approve before anything is filmed.",
    tags: ["Hook writing", "Script review + approval", "CTA crafting", "Caption drafts"],
    note: "Delivered within 48 hrs of ideation",
  },
  {
    number: "04",
    label: "STEP 04",
    title: "Shoot Schedule",
    desc: "We plan the full shoot day in advance — shot list, locations, timing, and what to have ready on site. No wasted time on the day. Everything is mapped and approved before we show up.",
    tags: ["Shot list finalized", "Location confirmed", "Run-of-day schedule", "Client prep checklist"],
    note: "Scheduled 3–5 days before shoot",
  },
  {
    number: "05",
    label: "STEP 05",
    title: "Shoot Day",
    desc: "We come to your job site or location. One full day of professional filming — job site footage, promos, before & afters, and any b-roll needed. You focus on the work; we handle everything on camera.",
    tags: ["On-location filming", "Job site & results footage", "Promo videos", "B-roll capture"],
    note: "1 full day on location",
  },
  {
    number: "06",
    label: "STEP 06",
    title: "Editing",
    desc: "Our editors cut, colour grade, add captions, music and branded overlays. Every video is optimized for vertical format and platform-specific specs. You get a review link before anything goes live.",
    tags: ["Professional edit", "Captions + music", "Colour grade", "Brand overlays", "Client review"],
    note: "Delivered within 5–7 days of shoot",
  },
  {
    number: "07",
    label: "STEP 07",
    title: "Posting",
    desc: "We schedule and post every video to Instagram, TikTok and Facebook — optimized timing, custom captions, hashtags and SEO keywords for each platform. Your content engine runs on autopilot.",
    tags: ["Instagram Reels", "TikTok", "Facebook", "Optimized timing", "Monthly report"],
    note: "Posted throughout the month",
  },
];

function StepRow({ step, index, isLast }) {
  const [ref, inView] = useInView();

  return (
    <div
      ref={ref}
      className="flex items-start gap-0"
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(28px)",
        transition: `opacity 0.65s cubic-bezier(.22,1,.36,1) ${index * 0.1}s, transform 0.65s cubic-bezier(.22,1,.36,1) ${index * 0.1}s`,
      }}
    >
      {/* ── LEFT RAIL ── */}
      <div className="flex flex-col items-center flex-shrink-0 w-12 sm:w-16 md:w-20 pt-0.5">
        {/* Number circle */}
        <div
          className="flex items-center justify-center w-9 h-9 sm:w-11 sm:h-11 md:w-12 md:h-12 rounded-full flex-shrink-0 z-10"
          style={{
            border: "1.5px solid #2587a8",
            background: "#000",
          }}
        >
          <span
            className="text-xs sm:text-sm font-bold tracking-wider"
            style={{ color: "#2587a8" }}
          >
            {step.number}
          </span>
        </div>

        {/* Connector line */}
        {!isLast && (
          <div
            className="w-px flex-1 min-h-8"
            style={{
              background:
                "linear-gradient(to bottom, rgba(37,135,168,0.6) 0%, rgba(37,135,168,0.12) 100%)",
              margin: "5px 0",
            }}
          />
        )}
      </div>

      {/* ── CARD ── */}
      <div
        className="flex-1 ml-3 sm:ml-4 md:ml-5 mb-5 sm:mb-6 md:mb-7 rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-7 relative overflow-hidden group transition-all duration-300"
        style={{
          background: "rgba(255,255,255,0.03)",
          border: "1px solid rgba(255,255,255,0.07)",
        }}
        onMouseEnter={e => {
          e.currentTarget.style.borderColor = "rgba(37,135,168,0.4)";
          e.currentTarget.style.background = "rgba(37,135,168,0.05)";
          e.currentTarget.style.transform = "translateY(-3px)";
        }}
        onMouseLeave={e => {
          e.currentTarget.style.borderColor = "rgba(255,255,255,0.07)";
          e.currentTarget.style.background = "rgba(255,255,255,0.03)";
          e.currentTarget.style.transform = "translateY(0)";
        }}
      >
        {/* Step label */}
        <span
          className="block text-[10px] sm:text-xs font-semibold tracking-widest uppercase mb-1.5 sm:mb-2 relative z-10"
          style={{ color: "#2587a8" }}
        >
          {step.label}
        </span>

        {/* Title */}
        <h3
          className="text-lg sm:text-xl md:text-2xl font-extrabold uppercase tracking-tight leading-tight mb-2.5 sm:mb-3 relative z-10"
          style={{ color: "#eee3ca" }}
        >
          {step.title}
        </h3>

        {/* Description */}
        <p
          className="text-xs sm:text-sm md:text-[13.5px] leading-relaxed sm:leading-7 mb-3 sm:mb-4 md:mb-5 relative z-10"
          style={{ color: "rgba(238,227,202,0.4)" }}
        >
          {step.desc}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-3 sm:mb-4 relative z-10">
          {step.tags.map((tag, i) => (
            <span
              key={i}
              className="text-[10px] sm:text-xs px-2.5 sm:px-3 py-1 rounded-full whitespace-nowrap"
              style={{
                border: "1px solid rgba(255,255,255,0.1)",
                color: "rgba(238,227,202,0.55)",
                background: "rgba(255,255,255,0.03)",
              }}
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Note */}
        <p
          className="text-[11px] sm:text-xs font-semibold tracking-wide relative z-10"
          style={{ color: "#2587a8" }}
        >
          {step.note}
        </p>

        {/* Glow */}
        <div
          className="absolute bottom-[-50px] right-[-50px] w-36 h-36 rounded-full pointer-events-none"
          style={{
            background:
              "radial-gradient(circle, rgba(37,135,168,0.13) 0%, transparent 70%)",
          }}
        />
      </div>
    </div>
  );
}

export default function WhyChooseUs() {
  const [headRef, headIn] = useInView();

  return (
    <section className="w-full bg-black py-16 sm:py-20 md:py-24 px-4 sm:px-6 md:px-8 flex flex-col items-center overflow-hidden">

      {/* ── HEADER ── */}
      <div
        ref={headRef}
        className="text-center mb-12 sm:mb-16 md:mb-20 max-w-xl mx-auto"
        style={{
          opacity: headIn ? 1 : 0,
          transform: headIn ? "translateY(0)" : "translateY(-28px)",
          transition: "opacity 0.75s ease, transform 0.75s cubic-bezier(.22,1,.36,1)",
        }}
      >
        {/* Eyebrow */}
        <div className="flex items-center justify-center gap-3 mb-3 sm:mb-4">
          <span
            className="block w-8 sm:w-11 h-px"
            style={{ background: "#2587a8" }}
          />
          <span
            className="text-[10px] sm:text-xs font-semibold tracking-[0.14em] uppercase"
            style={{ color: "rgba(238,227,202,0.5)" }}
          >
            Monk Media · Our Process
          </span>
          <span
            className="block w-8 sm:w-11 h-px"
            style={{ background: "#2587a8" }}
          />
        </div>

        {/* Heading */}
        <h2
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black uppercase tracking-tight leading-none mb-3 sm:mb-4"
          style={{ color: "#eee3ca" }}
        >
          How We Work
        </h2>

        {/* Sub */}
        <p
          className="text-sm sm:text-base leading-relaxed sm:leading-7"
          style={{ color: "rgba(238,227,202,0.45)" }}
        >
          From first call to content live — every step, done for you.
        </p>
      </div>

      {/* ── TIMELINE ── */}
      <div className="w-full max-w-xs sm:max-w-lg md:max-w-2xl lg:max-w-3xl flex flex-col">
        {STEPS.map((step, i) => (
          <StepRow
            key={i}
            step={step}
            index={i}
            isLast={i === STEPS.length - 1}
          />
        ))}
      </div>

    </section>
  );
}