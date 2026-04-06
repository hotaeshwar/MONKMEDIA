import { useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { ArrowUpRight, X, User, Mail, Phone, MessageSquare, ChevronDown, CheckCircle, Loader2 } from "lucide-react";

/* ─── NAV LINKS ─── */
const leftLinks = [
  { label: "Home",    to: "/" },
  { label: "Career",  to: "/career" },
];

const rightLinks = [
  { label: "Services", to: "/services" },
];

const SERVICES_LIST = [
  "Website Designing",
  "SEO & Local SEO",
  "Social Media Management",
  "Video Production",
  "Branding",
  "Software Development",
  "Paid Ads",
  "AI UGC",
];

/* ─── WATER DROPLET LINK ─── */
function DropletNavLink({ to, label, end, scrolled }) {
  const [drops, setDrops] = useState([]);

  const spawnDrop = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const id = Date.now() + Math.random();
    setDrops((d) => [...d, { id, x }]);
    setTimeout(() => setDrops((d) => d.filter((drop) => drop.id !== id)), 800);
  };

  return (
    <NavLink
      to={to}
      end={end}
      onMouseEnter={spawnDrop}
      className={({ isActive }) =>
        `relative px-5 py-2.5 rounded-full text-[0.95rem] transition-all duration-300 overflow-hidden select-none whitespace-nowrap group
         ${isActive
           ? "text-[#2587a8]"
           : `${scrolled ? "text-[#0d1b2a]" : "text-[#eee3ca]"} hover:text-[#2587a8]`}`
      }
      style={{ fontWeight: 800 }}
    >
      {({ isActive }) => (
        <>
          {label}

          {/* shimmer underline */}
          <span
            className={`absolute bottom-1 left-4 right-4 h-[2.5px] rounded-full
              transition-all duration-300 origin-left
              ${isActive ? "scale-x-100 nav-link-shimmer" : "scale-x-0 bg-[#2587a8]"}`}
          />

          {/* hover glow bg */}
          <span className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            style={{ background: "radial-gradient(ellipse at center, rgba(37,135,168,0.13) 0%, transparent 75%)" }}
          />

          {/* droplet ripples */}
          {drops.map((drop) => (
            <span
              key={drop.id}
              className="droplet-ripple"
              style={{ left: drop.x, top: "50%" }}
            />
          ))}
        </>
      )}
    </NavLink>
  );
}

/* ─── GET IN TOUCH MODAL ─── */
function ContactModal({ open, onClose }) {
  const [form, setForm] = useState({
    name: "", email: "", phone: "", service: "", message: "",
  });
  const [status, setStatus] = useState("idle"); // idle | sending | success | error
  const [serviceOpen, setServiceOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  useEffect(() => {
    if (!open) {
      setForm({ name: "", email: "", phone: "", service: "", message: "" });
      setStatus("idle");
      setServiceOpen(false);
    }
  }, [open]);

  const handleChange = (e) => {
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.service) return;
    setStatus("sending");

    try {
      const res = await fetch("https://formsubmit.co/ajax/info@monkmedia.ca", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          _subject: `New Inquiry from ${form.name} — MonkMedia`,
          _captcha: "false",
          Name: form.name,
          Email: form.email,
          Phone: form.phone || "Not provided",
          "Service Interested In": form.service,
          Message: form.message || "No message",
        }),
      });
      if (res.ok) setStatus("success");
      else setStatus("error");
    } catch {
      setStatus("error");
    }
  };

  if (!open) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-[100] bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed inset-0 z-[101] flex items-center justify-center p-4 sm:p-6">
        <div
          className="
            relative w-full max-w-lg bg-[#0d1b2a] rounded-2xl shadow-2xl
            border border-white/10 overflow-hidden
            max-h-[90vh] overflow-y-auto
          "
          onClick={(e) => e.stopPropagation()}
        >
          {/* Top accent bar */}
          <div className="h-[3px] w-full" style={{ background: "linear-gradient(to right, #d4af37, #2587a8, #d4af37)" }} />

          {/* Header */}
          <div className="flex items-start justify-between px-6 pt-6 pb-4 sm:px-8 sm:pt-8">
            <div>
              <h2
                className="text-[#eee3ca] font-extrabold text-2xl sm:text-3xl leading-tight"
                style={{ fontFamily: "'Syne', sans-serif" }}
              >
                Let's Work Together
              </h2>
              <p className="text-[#eee3ca]/50 text-sm mt-1">
                Tell us about your project and we'll get back to you soon.
              </p>
            </div>
            <button
              onClick={onClose}
              className="ml-4 mt-1 text-[#eee3ca]/40 hover:text-[#eee3ca] transition-colors shrink-0"
              aria-label="Close"
            >
              <X size={20} />
            </button>
          </div>

          {/* Body */}
          <div className="px-6 pb-8 sm:px-8 sm:pb-10">
            {status === "success" ? (
              <div className="flex flex-col items-center justify-center gap-4 py-12 text-center">
                <div className="w-16 h-16 rounded-full bg-[#2587a8]/20 flex items-center justify-center">
                  <CheckCircle className="text-[#2587a8]" size={32} />
                </div>
                <h3 className="text-[#eee3ca] font-bold text-xl" style={{ fontFamily: "'Syne', sans-serif" }}>
                  Message Sent!
                </h3>
                <p className="text-[#eee3ca]/60 text-sm max-w-xs">
                  Thanks for reaching out. Our team will contact you within 24 hours at <strong className="text-[#eee3ca]/80">{form.email}</strong>.
                </p>
                <button
                  onClick={onClose}
                  className="mt-2 px-6 py-2.5 rounded-full bg-[#2587a8] text-[#eee3ca] text-sm font-bold hover:bg-[#1e6f8f] transition-colors"
                >
                  Close
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-2">
                {/* Name + Phone row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[#eee3ca]/60 text-xs font-semibold uppercase tracking-wider">
                      Full Name <span className="text-[#2587a8]">*</span>
                    </label>
                    <div className="relative">
                      <User size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#eee3ca]/30" />
                      <input
                        type="text"
                        name="name"
                        required
                        value={form.name}
                        onChange={handleChange}
                        placeholder="John Doe"
                        className="
                          w-full pl-9 pr-4 py-2.5 rounded-xl text-sm text-[#eee3ca]
                          bg-white/5 border border-white/10
                          focus:border-[#2587a8] focus:outline-none focus:ring-1 focus:ring-[#2587a8]/30
                          placeholder:text-[#eee3ca]/20 transition-all
                        "
                      />
                    </div>
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[#eee3ca]/60 text-xs font-semibold uppercase tracking-wider">
                      Phone
                    </label>
                    <div className="relative">
                      <Phone size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#eee3ca]/30" />
                      <input
                        type="tel"
                        name="phone"
                        value={form.phone}
                        onChange={handleChange}
                        placeholder="+1 (555) 000-0000"
                        className="
                          w-full pl-9 pr-4 py-2.5 rounded-xl text-sm text-[#eee3ca]
                          bg-white/5 border border-white/10
                          focus:border-[#2587a8] focus:outline-none focus:ring-1 focus:ring-[#2587a8]/30
                          placeholder:text-[#eee3ca]/20 transition-all
                        "
                      />
                    </div>
                  </div>
                </div>

                {/* Email */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-[#eee3ca]/60 text-xs font-semibold uppercase tracking-wider">
                    Email Address <span className="text-[#2587a8]">*</span>
                  </label>
                  <div className="relative">
                    <Mail size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#eee3ca]/30" />
                    <input
                      type="email"
                      name="email"
                      required
                      value={form.email}
                      onChange={handleChange}
                      placeholder="john@example.com"
                      className="
                        w-full pl-9 pr-4 py-2.5 rounded-xl text-sm text-[#eee3ca]
                        bg-white/5 border border-white/10
                        focus:border-[#2587a8] focus:outline-none focus:ring-1 focus:ring-[#2587a8]/30
                        placeholder:text-[#eee3ca]/20 transition-all
                      "
                    />
                  </div>
                </div>

                {/* Service dropdown */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-[#eee3ca]/60 text-xs font-semibold uppercase tracking-wider">
                    Service Interested In <span className="text-[#2587a8]">*</span>
                  </label>
                  <div className="relative">
                    <button
                      type="button"
                      onClick={() => setServiceOpen((o) => !o)}
                      className="
                        w-full flex items-center justify-between
                        px-4 py-2.5 rounded-xl text-sm
                        bg-white/5 border border-white/10
                        focus:border-[#2587a8] focus:outline-none focus:ring-1 focus:ring-[#2587a8]/30
                        transition-all text-left
                      "
                    >
                      <span className={form.service ? "text-[#eee3ca]" : "text-[#eee3ca]/20"}>
                        {form.service || "Select a service…"}
                      </span>
                      <ChevronDown
                        size={14}
                        className={`text-[#eee3ca]/40 transition-transform duration-200 ${serviceOpen ? "rotate-180" : ""}`}
                      />
                    </button>
                    {serviceOpen && (
                      <div className="
                        absolute top-full left-0 right-0 mt-1 z-10
                        bg-[#0d1b2a] border border-white/10 rounded-xl shadow-2xl
                        overflow-hidden
                      ">
                        {SERVICES_LIST.map((svc) => (
                          <button
                            key={svc}
                            type="button"
                            onClick={() => {
                              setForm((p) => ({ ...p, service: svc }));
                              setServiceOpen(false);
                            }}
                            className="
                              w-full text-left px-4 py-2.5 text-sm text-[#eee3ca]/80
                              hover:bg-[#2587a8]/20 hover:text-[#eee3ca]
                              transition-colors border-b border-white/5 last:border-0
                            "
                          >
                            {svc}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Message */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-[#eee3ca]/60 text-xs font-semibold uppercase tracking-wider">
                    Message
                  </label>
                  <div className="relative">
                    <MessageSquare size={14} className="absolute left-3 top-3 text-[#eee3ca]/30" />
                    <textarea
                      name="message"
                      rows={3}
                      value={form.message}
                      onChange={handleChange}
                      placeholder="Tell us about your project…"
                      className="
                        w-full pl-9 pr-4 py-2.5 rounded-xl text-sm text-[#eee3ca]
                        bg-white/5 border border-white/10
                        focus:border-[#2587a8] focus:outline-none focus:ring-1 focus:ring-[#2587a8]/30
                        placeholder:text-[#eee3ca]/20 transition-all resize-none
                      "
                    />
                  </div>
                </div>

                {status === "error" && (
                  <p className="text-red-400 text-xs text-center">
                    Something went wrong. Please try again or email us directly at{" "}
                    <a href="mailto:info@monkmedia.ca" className="underline">info@monkmedia.ca</a>.
                  </p>
                )}

                {/* Submit */}
                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="
                    mt-1 w-full flex items-center justify-center gap-2
                    bg-[#2587a8] hover:bg-[#1e6f8f]
                    text-[#eee3ca] font-bold text-sm
                    py-3 px-6 rounded-full
                    transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]
                    disabled:opacity-60 disabled:cursor-not-allowed
                    shadow-[0_4px_24px_rgba(37,135,168,0.3)]
                  "
                  style={{ fontFamily: "'Syne', sans-serif" }}
                >
                  {status === "sending" ? (
                    <><Loader2 size={16} className="animate-spin" /> Sending…</>
                  ) : (
                    <>Send Message <ArrowUpRight size={15} /></>
                  )}
                </button>

                <p className="text-[#eee3ca]/25 text-xs text-center">
                  We reply within 24 hours · info@monkmedia.ca
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

/* ═══════════════════════════════════════════
   MAIN NAVBAR
═══════════════════════════════════════════ */
export default function Navbar() {
  const [open, setOpen]         = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [modal, setModal]       = useState(false);
  const location                = useLocation();

  useEffect(() => { setOpen(false); }, [location]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  const allLinks = [...leftLinks, ...rightLinks];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@600;700;800&family=DM+Sans:wght@400;500;700;800&display=swap');
        .nav-syne { font-family: 'Syne', sans-serif; }
        .nav-dm   { font-family: 'DM Sans', sans-serif; }

        /* Shimmer underline for active/hover */
        @keyframes shimmerSlide {
          0%   { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        .nav-link-shimmer {
          background: linear-gradient(90deg, #2587a8 0%, #7dd4ed 35%, #d4af37 55%, #2587a8 100%);
          background-size: 200% auto;
          animation: shimmerSlide 1.4s linear infinite;
        }

        /* Letter float on hover */
        @keyframes letterFloat {
          0%, 100% { transform: translateY(0px); }
          50%       { transform: translateY(-3px); }
        }
        .nav-link-float:hover > span.link-text {
          display: inline-block;
          animation: letterFloat 0.5s ease-in-out;
        }

        /* Water droplet ripple — visible teal burst */
        @keyframes dropletRipple {
          0%   { width: 0px; height: 0px; opacity: 0.55; transform: translate(-50%, -50%) scale(1); }
          50%  { opacity: 0.25; }
          100% { width: 100px; height: 100px; opacity: 0; transform: translate(-50%, -50%) scale(1); }
        }
        .droplet-ripple {
          position: absolute;
          border-radius: 50%;
          pointer-events: none;
          background: radial-gradient(circle, rgba(37,135,168,0.6) 0%, rgba(37,135,168,0.15) 50%, transparent 70%);
          animation: dropletRipple 0.75s ease-out forwards;
          z-index: 0;
        }
      `}</style>

      {/* Contact Modal */}
      <ContactModal open={modal} onClose={() => setModal(false)} />

      <nav
        className={`
          fixed top-0 left-0 right-0 z-50
          transition-all duration-500 ease-out
          ${scrolled
            ? "bg-[#eee3ca] shadow-[0_4px_32px_rgba(0,0,0,0.12)]"
            : "bg-transparent"}
        `}
      >
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          <div className="relative flex items-center justify-center h-24 sm:h-[100px]">

            {/* ── CENTER LOGO — bigger but navbar height unchanged ── */}
            <NavLink to="/" className="flex items-center select-none shrink-0 z-10">
              <img
                src="/media/logo.png"
                alt="MonkMedia Logo"
                style={{
                  height: "210px",
                  width: "auto",
                  objectFit: "contain",
                }}
              />
            </NavLink>

            {/* ── LEFT LINKS ── */}
            <ul className="hidden md:flex items-center gap-2 nav-dm absolute right-1/2 pr-[100px]">
              {leftLinks.map(({ label, to }) => (
                <li key={to}>
                  <DropletNavLink to={to} label={label} end={to === "/"} scrolled={scrolled} />
                </li>
              ))}
            </ul>

            {/* ── RIGHT LINKS + CTA ── */}
            <div className="hidden md:flex items-center gap-2 nav-dm absolute left-1/2 pl-[100px]">
              {rightLinks.map(({ label, to }) => (
                <DropletNavLink key={to} to={to} label={label} scrolled={scrolled} />
              ))}

              {/* Get In Touch — PILL BUTTON STYLE */}
              <button
                onClick={() => setModal(true)}
                className={`
                  relative ml-3 px-6 py-2.5 rounded-full text-[0.95rem] font-extrabold
                  transition-all duration-300 overflow-hidden select-none whitespace-nowrap
                  ${scrolled
                    ? "bg-[#2587a8] text-[#eee3ca] hover:bg-[#1e6f8f] hover:scale-[1.04] active:scale-[0.98]"
                    : "bg-[#2587a8] text-[#eee3ca] hover:bg-[#1e6f8f] hover:scale-[1.04] active:scale-[0.98]"
                  }
                  shadow-[0_2px_16px_rgba(37,135,168,0.4)]
                `}
                style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 800 }}
              >
                Get In Touch
                <span className="absolute inset-0 rounded-full bg-white/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              </button>
            </div>

            {/* ── HAMBURGER (mobile) ── */}
            <button
              onClick={() => setOpen(o => !o)}
              aria-label="Toggle menu"
              className="md:hidden absolute right-0 w-10 h-10 rounded-xl flex flex-col items-center justify-center gap-[5px] bg-transparent border-none cursor-pointer focus:outline-none select-none"
            >
              <span className={`block h-[2.5px] rounded-full transition-all duration-300 ease-[cubic-bezier(.16,1,.3,1)]
                ${scrolled ? "bg-[#0d1b2a]" : "bg-[#eee3ca]"}
                ${open ? "w-[22px] translate-y-[7.5px] rotate-45" : "w-[22px]"}`} />
              <span className={`block h-[2.5px] rounded-full transition-all duration-300 ease-[cubic-bezier(.16,1,.3,1)]
                ${scrolled ? "bg-[#0d1b2a]" : "bg-[#eee3ca]"}
                ${open ? "w-0 opacity-0" : "w-[16px] self-end mr-[2px]"}`} />
              <span className={`block h-[2.5px] rounded-full transition-all duration-300 ease-[cubic-bezier(.16,1,.3,1)]
                ${scrolled ? "bg-[#0d1b2a]" : "bg-[#eee3ca]"}
                ${open ? "w-[22px] -translate-y-[7.5px] -rotate-45" : "w-[22px]"}`} />
            </button>

          </div>
        </div>

        {/* ── MOBILE MENU ── */}
        <div
          className={`
            md:hidden overflow-hidden
            transition-all duration-400 ease-[cubic-bezier(.16,1,.3,1)]
            ${open ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"}
          `}
        >
          <div className="bg-[#eee3ca] border-t border-[#0d1b2a]/8 px-5 pb-6 pt-3">
            <ul className="nav-dm flex flex-col gap-1 mb-5">
              {allLinks.map(({ label, to }, i) => (
                <li
                  key={to}
                  style={{ transitionDelay: open ? `${i * 55}ms` : "0ms" }}
                  className={`transition-all duration-300 ${open ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-3"}`}
                >
                  <NavLink
                    to={to}
                    end={to === "/"}
                    className={({ isActive }) =>
                      `flex items-center justify-between px-4 py-3 rounded-xl text-[0.95rem]
                       transition-colors duration-200
                       ${isActive
                         ? "text-[#2587a8] bg-[#2587a8]/10"
                         : "text-[#0d1b2a] hover:bg-[#0d1b2a]/5 hover:text-[#2587a8]"
                       }`
                    }
                    style={{ fontWeight: 800 }}
                  >
                    {({ isActive }) => (
                      <>
                        <span>{label}</span>
                        {isActive && <span className="w-2 h-2 rounded-full bg-[#2587a8]" />}
                      </>
                    )}
                  </NavLink>
                </li>
              ))}
            </ul>

            <button
              onClick={() => { setOpen(false); setModal(true); }}
              className="
                nav-dm flex items-center justify-between px-4 py-3 rounded-xl text-[0.95rem]
                text-[#0d1b2a] hover:bg-[#0d1b2a]/5 hover:text-[#2587a8]
                w-full transition-colors duration-200
              "
              style={{ fontWeight: 800, background: "none", border: "none", cursor: "pointer",
                transitionDelay: open ? `${allLinks.length * 55}ms` : "0ms" }}
            >
              <span>Get In Touch</span>
              <ArrowUpRight size={15} className="text-[#2587a8]" />
            </button>
          </div>
        </div>
      </nav>
    </>
  );
}