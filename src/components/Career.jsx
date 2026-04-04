import { useEffect, useRef, useState } from "react";
import { Send, User, Mail, Phone, Briefcase, FileText, ChevronDown, CheckCircle, Loader2, MapPin, Clock, Star } from "lucide-react";

/* ── useReveal hook ── */
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

const POSITIONS = [
  "Social Media Manager",
  "SEO Specialist",
  "Video Editor / Producer",
  "Web Designer",
  "Graphic Designer / Branding",
  "Paid Ads Specialist",
  "Content Writer",
  "Business Development",
  "Other",
];

const PERKS = [
  { icon: Star,    label: "Creative Freedom",     desc: "We trust your ideas and encourage bold thinking." },
  { icon: Clock,   label: "Flexible Hours",        desc: "Work when you're most productive." },
  { icon: MapPin,  label: "Remote / Hybrid",       desc: "Work from anywhere or our Mississauga office." },
  { icon: Briefcase, label: "Growth Focused",      desc: "Real projects, real clients, real impact." },
];

const INPUT_BASE = `
  w-full bg-white/[0.04] border border-white/10 rounded-xl
  px-4 py-3.5 text-sm text-[#eee3ca] placeholder-white/25
  outline-none transition-all duration-300
  focus:border-[#2587a8] focus:bg-[#2587a8]/5 focus:ring-1 focus:ring-[#2587a8]/30
  hover:border-white/20
`.trim();

export default function Career() {
  const [headerRef, headerVisible] = useReveal(0.05);
  const [perksRef,  perksVisible]  = useReveal(0.08);
  const [formRef,   formVisible]   = useReveal(0.06);

  const [form, setForm] = useState({
    name: "", email: "", phone: "",
    position: "", experience: "", portfolio: "",
    linkedin: "", message: "", resume: null,
  });
  const [errors,       setErrors]       = useState({});
  const [submitState,  setSubmitState]  = useState("idle"); // idle | loading | success
  const [dropOpen,     setDropOpen]     = useState(false);
  const dropRef = useRef(null);

  /* close dropdown on outside click */
  useEffect(() => {
    const handler = (e) => {
      if (dropRef.current && !dropRef.current.contains(e.target)) setDropOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const set = (field, value) => {
    setForm((p) => ({ ...p, [field]: value }));
    setErrors((p) => ({ ...p, [field]: "" }));
  };

  const validate = () => {
    const e = {};
    if (!form.name.trim())        e.name     = "Full name is required.";
    if (!form.email.trim())       e.email    = "Email is required.";
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = "Enter a valid email.";
    if (!form.position)           e.position = "Please select a role.";
    if (!form.message.trim())     e.message  = "Tell us a bit about yourself.";
    return e;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setSubmitState("loading");

    /* ── Replace with your actual form endpoint (e.g. Formspree / EmailJS) ── */
    await new Promise((r) => setTimeout(r, 1800));
    setSubmitState("success");
  };

  const Field = ({ label, error, children }) => (
    <div className="flex flex-col gap-1.5">
      <label className="text-[11px] font-semibold tracking-[0.15em] uppercase text-[#eee3ca]/50">
        {label}
      </label>
      {children}
      {error && (
        <span className="text-[11px] text-red-400 flex items-center gap-1">
          <span className="w-1 h-1 rounded-full bg-red-400 inline-block" />
          {error}
        </span>
      )}
    </div>
  );

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@600;700;800&family=DM+Sans:wght@300;400;500;600&display=swap');
        .cr-root { font-family: 'DM Sans', sans-serif; }
        @keyframes fadeUp {
          from { opacity:0; transform:translateY(32px); }
          to   { opacity:1; transform:translateY(0); }
        }
        .fade-up   { opacity:0; }
        .fade-up.in { animation: fadeUp 0.75s cubic-bezier(0.22,1,0.36,1) forwards; }
        .fade-up.d1 { animation-delay:0.05s; }
        .fade-up.d2 { animation-delay:0.18s; }
        .fade-up.d3 { animation-delay:0.32s; }
        .fade-up.d4 { animation-delay:0.46s; }
        .fade-up.d5 { animation-delay:0.60s; }

        .cr-input:focus { box-shadow: 0 0 0 3px rgba(37,135,168,0.15); }

        .perk-card {
          background: linear-gradient(135deg, rgba(255,255,255,0.03), rgba(255,255,255,0.01));
          border: 1px solid rgba(255,255,255,0.07);
          transition: all 0.35s cubic-bezier(0.22,1,0.36,1);
        }
        .perk-card:hover {
          border-color: rgba(37,135,168,0.35);
          background: linear-gradient(135deg, rgba(37,135,168,0.07), rgba(37,135,168,0.02));
          transform: translateY(-4px);
        }

        .submit-btn {
          background: linear-gradient(135deg, #2587a8 0%, #1a6b85 100%);
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
        }
        .submit-btn::after {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(255,255,255,0.1), transparent);
          opacity: 0;
          transition: opacity 0.3s ease;
        }
        .submit-btn:hover::after { opacity: 1; }
        .submit-btn:hover { transform: translateY(-2px); box-shadow: 0 16px 40px rgba(37,135,168,0.35); }
        .submit-btn:active { transform: translateY(0); }

        .file-zone {
          border: 2px dashed rgba(255,255,255,0.1);
          transition: all 0.3s ease;
        }
        .file-zone:hover, .file-zone.drag {
          border-color: rgba(37,135,168,0.5);
          background: rgba(37,135,168,0.05);
        }

        .drop-menu {
          background: #0f0f0f;
          border: 1px solid rgba(37,135,168,0.25);
          border-radius: 14px;
          overflow: hidden;
          box-shadow: 0 20px 60px rgba(0,0,0,0.6);
        }
        .drop-item:hover { background: rgba(37,135,168,0.1); color: #2587a8; }

        .glow-line {
          background: linear-gradient(to right, transparent, #2587a8, transparent);
        }
      `}</style>

      <div className="cr-root w-full min-h-screen bg-black overflow-hidden">

        {/* ── ambient glows ── */}
        <div className="pointer-events-none fixed inset-0 overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[340px] bg-[#2587a8]/[0.06] rounded-full blur-[120px]" />
          <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-[#d4af37]/[0.03] rounded-full blur-[100px]" />
        </div>

        {/* ══════════════ HERO HEADER ══════════════ */}
        <div
          ref={headerRef}
          className="relative max-w-7xl mx-auto px-5 sm:px-10
                     pt-20 sm:pt-28 lg:pt-36
                     pb-16 sm:pb-20 lg:pb-24
                     flex flex-col items-center text-center gap-5 sm:gap-6"
        >
          {/* tag */}
          <div className={`fade-up d1 ${headerVisible ? "in" : ""} flex items-center gap-3`}>
            <span className="block w-8 h-px bg-[#2587a8]" />
            <span className="text-[11px] sm:text-xs font-semibold tracking-[0.22em] uppercase text-[#2587a8]">
              Join Our Team
            </span>
            <span className="block w-8 h-px bg-[#2587a8]" />
          </div>

          {/* headline */}
          <h1
            className={`fade-up d2 ${headerVisible ? "in" : ""}
              font-extrabold leading-[1.05] text-[#eee3ca]
              text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-[5.5rem]`}
            style={{ fontFamily: "'Syne', sans-serif" }}
          >
            Build Something<br />
            <span className="text-[#2587a8]">That Matters.</span>
          </h1>

          <p className={`fade-up d3 ${headerVisible ? "in" : ""}
            text-[#eee3ca]/55 text-sm sm:text-base md:text-lg max-w-xl leading-relaxed`}>
            We're a fast-growing digital agency looking for bold, creative minds.
            If you're passionate about your craft and want real impact — let's talk.
          </p>

          <div className={`fade-up d4 ${headerVisible ? "in" : ""} w-24 h-px mt-1 glow-line`} />
        </div>

        {/* ══════════════ PERKS ══════════════ */}
        <div
          ref={perksRef}
          className="max-w-7xl mx-auto px-5 sm:px-10 pb-16 sm:pb-20 lg:pb-24"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
            {PERKS.map((perk, i) => {
              const Icon = perk.icon;
              return (
                <div
                  key={i}
                  className={`fade-up ${perksVisible ? "in" : ""} perk-card rounded-2xl p-5 sm:p-6`}
                  style={{ animationDelay: `${0.05 + i * 0.1}s` }}
                >
                  <div className="w-10 h-10 rounded-xl bg-[#2587a8]/10 border border-[#2587a8]/20 flex items-center justify-center mb-4">
                    <Icon size={18} color="#2587a8" strokeWidth={1.8} />
                  </div>
                  <p className="text-[#eee3ca] font-semibold text-sm mb-1"
                     style={{ fontFamily: "'Syne', sans-serif" }}>
                    {perk.label}
                  </p>
                  <p className="text-[#eee3ca]/45 text-xs leading-relaxed">{perk.desc}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* ══════════════ FORM SECTION ══════════════ */}
        <div ref={formRef} className="max-w-7xl mx-auto px-5 sm:px-10 pb-24 sm:pb-32">

          {/* section label */}
          <div className={`fade-up d1 ${formVisible ? "in" : ""} flex items-center gap-3 mb-10 sm:mb-14`}>
            <span className="block w-8 h-px bg-[#2587a8]" />
            <span className="text-[11px] font-semibold tracking-[0.22em] uppercase text-[#2587a8]">
              Apply Now
            </span>
            <span className="block w-8 h-px bg-[#2587a8]" />
          </div>

          {submitState === "success" ? (

            /* ── SUCCESS STATE ── */
            <div className={`fade-up ${formVisible ? "in" : ""}
              flex flex-col items-center justify-center text-center gap-6
              py-24 sm:py-32 border border-white/[0.06] rounded-3xl
              bg-white/[0.02]`}
            >
              <div className="w-20 h-20 rounded-full bg-[#2587a8]/15 border border-[#2587a8]/30 flex items-center justify-center">
                <CheckCircle size={36} color="#2587a8" strokeWidth={1.5} />
              </div>
              <div>
                <h3 className="text-[#eee3ca] text-2xl sm:text-3xl font-extrabold mb-2"
                    style={{ fontFamily: "'Syne', sans-serif" }}>
                  Application Received!
                </h3>
                <p className="text-[#eee3ca]/50 text-sm sm:text-base max-w-md">
                  Thanks for reaching out. We review every application personally and will get back to you within 3–5 business days.
                </p>
              </div>
              <button
                onClick={() => { setSubmitState("idle"); setForm({ name:"",email:"",phone:"",position:"",experience:"",portfolio:"",linkedin:"",message:"",resume:null }); }}
                className="mt-2 px-6 py-3 rounded-full border border-[#2587a8]/50 text-[#2587a8] text-sm font-semibold hover:bg-[#2587a8] hover:text-white transition-all duration-300"
              >
                Submit Another
              </button>
            </div>

          ) : (

            /* ── FORM ── */
            <form
              onSubmit={handleSubmit}
              noValidate
              className={`fade-up d2 ${formVisible ? "in" : ""}
                grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12`}
            >

              {/* LEFT COLUMN */}
              <div className="flex flex-col gap-6">

                <h2 className="text-[#eee3ca] text-xl sm:text-2xl font-extrabold"
                    style={{ fontFamily: "'Syne', sans-serif" }}>
                  Personal Info
                </h2>

                {/* Name */}
                <Field label="Full Name *" error={errors.name}>
                  <div className="relative">
                    <User size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#2587a8]/60 pointer-events-none" />
                    <input
                      type="text"
                      placeholder="John Doe"
                      value={form.name}
                      onChange={(e) => set("name", e.target.value)}
                      className={`${INPUT_BASE} cr-input pl-11 ${errors.name ? "border-red-500/50" : ""}`}
                    />
                  </div>
                </Field>

                {/* Email */}
                <Field label="Email Address *" error={errors.email}>
                  <div className="relative">
                    <Mail size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#2587a8]/60 pointer-events-none" />
                    <input
                      type="email"
                      placeholder="you@email.com"
                      value={form.email}
                      onChange={(e) => set("email", e.target.value)}
                      className={`${INPUT_BASE} cr-input pl-11 ${errors.email ? "border-red-500/50" : ""}`}
                    />
                  </div>
                </Field>

                {/* Phone */}
                <Field label="Phone Number" error={errors.phone}>
                  <div className="relative">
                    <Phone size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#2587a8]/60 pointer-events-none" />
                    <input
                      type="tel"
                      placeholder="+1 (519) 000-0000"
                      value={form.phone}
                      onChange={(e) => set("phone", e.target.value)}
                      className={`${INPUT_BASE} cr-input pl-11`}
                    />
                  </div>
                </Field>

                {/* LinkedIn */}
                <Field label="LinkedIn / Portfolio URL" error={errors.linkedin}>
                  <div className="relative">
                    <FileText size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#2587a8]/60 pointer-events-none" />
                    <input
                      type="url"
                      placeholder="https://linkedin.com/in/yourname"
                      value={form.linkedin}
                      onChange={(e) => set("linkedin", e.target.value)}
                      className={`${INPUT_BASE} cr-input pl-11`}
                    />
                  </div>
                </Field>

                {/* Resume upload */}
                <Field label="Resume / CV" error={errors.resume}>
                  <label
                    className={`file-zone rounded-xl px-4 py-6 flex flex-col items-center justify-center gap-2 cursor-pointer text-center
                      ${form.resume ? "border-[#2587a8]/50 bg-[#2587a8]/05" : ""}`}
                  >
                    <FileText size={24} className="text-[#2587a8]/50" />
                    {form.resume ? (
                      <span className="text-xs text-[#2587a8] font-medium">{form.resume.name}</span>
                    ) : (
                      <>
                        <span className="text-xs text-[#eee3ca]/50">Drop your resume here or <span className="text-[#2587a8] underline underline-offset-2">browse</span></span>
                        <span className="text-[10px] text-[#eee3ca]/25">PDF, DOC, DOCX — max 5MB</span>
                      </>
                    )}
                    <input
                      type="file"
                      accept=".pdf,.doc,.docx"
                      className="hidden"
                      onChange={(e) => set("resume", e.target.files[0] || null)}
                    />
                  </label>
                </Field>

              </div>

              {/* RIGHT COLUMN */}
              <div className="flex flex-col gap-6">

                <h2 className="text-[#eee3ca] text-xl sm:text-2xl font-extrabold"
                    style={{ fontFamily: "'Syne', sans-serif" }}>
                  Role Details
                </h2>

                {/* Position dropdown */}
                <Field label="Position Applying For *" error={errors.position}>
                  <div className="relative" ref={dropRef}>
                    <button
                      type="button"
                      onClick={() => setDropOpen((p) => !p)}
                      className={`${INPUT_BASE} cr-input flex items-center justify-between text-left
                        ${errors.position ? "border-red-500/50" : ""}
                        ${form.position ? "text-[#eee3ca]" : "text-white/25"}`}
                    >
                      <span className="flex items-center gap-2">
                        <Briefcase size={15} className="text-[#2587a8]/60 shrink-0" />
                        {form.position || "Select a role"}
                      </span>
                      <ChevronDown
                        size={15}
                        className={`text-[#2587a8]/60 transition-transform duration-300 shrink-0 ${dropOpen ? "rotate-180" : ""}`}
                      />
                    </button>

                    {dropOpen && (
                      <div className="drop-menu absolute z-50 left-0 right-0 mt-2 py-1.5 max-h-60 overflow-y-auto">
                        {POSITIONS.map((pos) => (
                          <button
                            key={pos}
                            type="button"
                            className="drop-item w-full text-left px-4 py-2.5 text-sm text-[#eee3ca]/70 transition-all duration-200"
                            onClick={() => { set("position", pos); setDropOpen(false); }}
                          >
                            {pos}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </Field>

                {/* Experience */}
                <Field label="Years of Experience" error={errors.experience}>
                  <div className="relative">
                    <Star size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#2587a8]/60 pointer-events-none" />
                    <input
                      type="text"
                      placeholder="e.g. 2 years, Fresher, 5+"
                      value={form.experience}
                      onChange={(e) => set("experience", e.target.value)}
                      className={`${INPUT_BASE} cr-input pl-11`}
                    />
                  </div>
                </Field>

                {/* Portfolio */}
                <Field label="Portfolio / Work Samples URL" error={errors.portfolio}>
                  <div className="relative">
                    <FileText size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#2587a8]/60 pointer-events-none" />
                    <input
                      type="url"
                      placeholder="https://yourportfolio.com"
                      value={form.portfolio}
                      onChange={(e) => set("portfolio", e.target.value)}
                      className={`${INPUT_BASE} cr-input pl-11`}
                    />
                  </div>
                </Field>

                {/* Message */}
                <Field label="Why do you want to join? *" error={errors.message}>
                  <textarea
                    rows={6}
                    placeholder="Tell us about yourself, your skills, and what excites you about Monk Media..."
                    value={form.message}
                    onChange={(e) => set("message", e.target.value)}
                    className={`${INPUT_BASE} cr-input resize-none ${errors.message ? "border-red-500/50" : ""}`}
                  />
                </Field>

                {/* Divider */}
                <div className="h-px glow-line" />

                {/* Submit */}
                <button
                  type="submit"
                  disabled={submitState === "loading"}
                  className="submit-btn w-full flex items-center justify-center gap-3
                    px-8 py-4 rounded-xl text-white font-semibold text-sm tracking-wide
                    disabled:opacity-60 disabled:cursor-not-allowed disabled:transform-none"
                >
                  {submitState === "loading" ? (
                    <>
                      <Loader2 size={18} className="animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    <>
                      <Send size={16} strokeWidth={2} />
                      Submit Application
                    </>
                  )}
                </button>

                <p className="text-center text-[11px] text-[#eee3ca]/30 leading-relaxed">
                  By submitting, you agree that we may contact you regarding your application.
                  We respect your privacy and never share your data.
                </p>

              </div>
            </form>
          )}
        </div>

        {/* ── bottom divider ── */}
        <div className="max-w-7xl mx-auto px-5 sm:px-10">
          <div className="h-px glow-line mb-0" />
        </div>

      </div>
    </>
  );
}