import { useEffect, useRef, useState } from "react";

// WhatsApp number (digits only, with country code)
const WA_NUMBER = "15197746608";

const sendToWhatsApp = ({ name, email, service, message }) => {
  const text = `Hello MonkMedia!

I'm *${name}*${email ? ` (${email})` : ""} and I'm interested in your services.

*Service Needed:* ${service || "General Inquiry"}

*Message:*
${message}

Looking forward to hearing from you!`;

  const url = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(text)}`;
  window.open(url, "_blank");
};

const services = [
  "Web Design & Development",
  "Brand Identity",
  "Social Media Marketing",
  "SEO & Growth",
  "UI/UX Design",
  "Digital Strategy",
  "Other",
];

const GridDots = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    <div
      className="absolute inset-0 opacity-[0.07]"
      style={{
        backgroundImage: "radial-gradient(circle, #2587a8 1px, transparent 1px)",
        backgroundSize: "40px 40px",
      }}
    />
    <div
      className="absolute w-[500px] h-[500px] rounded-full opacity-10 blur-3xl"
      style={{
        background: "radial-gradient(circle, #2587a8, transparent 70%)",
        top: "-10%",
        left: "-5%",
      }}
    />
    <div
      className="absolute w-[400px] h-[400px] rounded-full opacity-10 blur-3xl"
      style={{
        background: "radial-gradient(circle, #d4af37, transparent 70%)",
        bottom: "-10%",
        right: "-5%",
      }}
    />
  </div>
);

const WhatsAppIcon = () => (
  <svg viewBox="0 0 32 32" width="20" height="20" fill="currentColor">
    <path d="M16 2C8.28 2 2 8.28 2 16c0 2.46.66 4.77 1.8 6.77L2 30l7.43-1.77A13.94 13.94 0 0 0 16 30c7.72 0 14-6.28 14-14S23.72 2 16 2zm0 25.5c-2.2 0-4.27-.6-6.04-1.65l-.43-.26-4.41 1.05 1.08-4.3-.28-.44A11.45 11.45 0 0 1 4.5 16C4.5 9.6 9.6 4.5 16 4.5S27.5 9.6 27.5 16 22.4 27.5 16 27.5zm6.29-8.56c-.34-.17-2.02-1-2.34-1.11-.31-.11-.54-.17-.77.17-.23.34-.88 1.11-1.08 1.34-.2.23-.4.26-.74.09-.34-.17-1.44-.53-2.74-1.69-1.01-.9-1.7-2.01-1.9-2.35-.2-.34-.02-.52.15-.69.15-.15.34-.4.51-.6.17-.2.23-.34.34-.57.11-.23.06-.43-.03-.6-.09-.17-.77-1.86-1.06-2.55-.28-.67-.57-.58-.77-.59h-.66c-.23 0-.6.09-.91.43-.31.34-1.2 1.17-1.2 2.86s1.23 3.32 1.4 3.55c.17.23 2.42 3.7 5.87 5.19.82.35 1.46.56 1.96.72.82.26 1.57.22 2.16.13.66-.1 2.02-.83 2.31-1.62.28-.8.28-1.48.2-1.62-.09-.14-.31-.23-.66-.4z" />
  </svg>
);

const PhoneIcon = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.4 2 2 0 0 1 3.6 1.22h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.8a16 16 0 0 0 6.29 6.29l.96-.96a2 2 0 0 1 2.11-.45c.9.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z" />
  </svg>
);

const MailIcon = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
    <polyline points="22,6 12,13 2,6" />
  </svg>
);

const MapIcon = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0 1 18 0z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);

export default function ContactUs() {
  const [form, setForm] = useState({ name: "", email: "", service: "", message: "" });
  const [focused, setFocused] = useState("");
  const [visible, setVisible] = useState(false);
  const sectionRef = useRef(null);
  const triggered = useRef(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const trigger = () => {
      if (triggered.current) return;
      triggered.current = true;
      requestAnimationFrame(() => requestAnimationFrame(() => setVisible(true)));
    };

    const io = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) trigger(); },
      { threshold: 0.05 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const handle = (e) => setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

  const submit = (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.message.trim()) return;
    sendToWhatsApp(form);
  };

  const inputBase =
    "w-full bg-[#0a0a0a] border text-[#eee3ca] placeholder-[#333] rounded-lg px-4 py-3 text-sm outline-none transition-all duration-300 font-['DM_Sans',sans-serif]";
  const inputIdle = "border-[#1a1a1a]";
  const inputFocused = "border-[#2587a8] shadow-[0_0_0_3px_rgba(37,135,168,0.12)]";

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@600;700;800&family=DM+Sans:wght@300;400;500&display=swap');

        .contact-section { font-family: 'DM Sans', sans-serif; }
        .contact-title   { font-family: 'Syne', sans-serif; }

        .fade-up {
          opacity: 0;
          transform: translateY(40px);
          transition: opacity 0.7s ease, transform 0.7s cubic-bezier(.22,1,.36,1);
        }
        .fade-up.visible { opacity: 1; transform: translateY(0); }

        .fade-left {
          opacity: 0;
          transform: translateX(-50px);
          transition: opacity 0.8s ease, transform 0.8s cubic-bezier(.22,1,.36,1);
        }
        .fade-left.visible { opacity: 1; transform: translateX(0); }

        .fade-right {
          opacity: 0;
          transform: translateX(50px);
          transition: opacity 0.8s ease, transform 0.8s cubic-bezier(.22,1,.36,1);
        }
        .fade-right.visible { opacity: 1; transform: translateX(0); }

        .wa-btn {
          position: relative;
          overflow: hidden;
          background: linear-gradient(135deg, #25d366 0%, #128c7e 100%);
        }
        .wa-btn::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, #128c7e 0%, #25d366 100%);
          opacity: 0;
          transition: opacity 0.4s ease;
        }
        .wa-btn:hover::before { opacity: 1; }
        .wa-btn > * { position: relative; z-index: 1; }

        .info-card {
          background: linear-gradient(135deg, #0d0d0d 0%, #0a0a0a 100%);
          border: 1px solid #151515;
          transition: border-color 0.3s ease, transform 0.3s ease;
        }
        .info-card:hover {
          border-color: #2587a8;
          transform: translateY(-2px);
        }

        .select-dark option { background: #0a0a0a; color: #eee3ca; }

        @keyframes pulse-ring {
          0%   { transform: scale(1); opacity: 0.6; }
          100% { transform: scale(1.6); opacity: 0; }
        }
        .pulse-ring::after {
          content: '';
          position: absolute;
          inset: -4px;
          border-radius: 50%;
          border: 2px solid #25d366;
          animation: pulse-ring 1.8s ease-out infinite;
        }
      `}</style>

      <section
        ref={sectionRef}
        className="contact-section relative w-full py-20 px-4 sm:px-8 overflow-hidden"
        style={{ background: "#000" }}
      >
        <GridDots />

        <div className="relative z-10 max-w-6xl mx-auto">

          {/* Header */}
          <div className={`fade-up ${visible ? "visible" : ""} text-center mb-14`} style={{ transitionDelay: "0ms" }}>
            <p className="flex items-center justify-center gap-3 text-[#555] text-xs tracking-[0.2em] uppercase mb-4">
              <span className="block w-10 h-px bg-[#2587a8]" />
              Get In Touch
              <span className="block w-10 h-px bg-[#2587a8]" />
            </p>
            <h2 className="contact-title text-[#eee3ca] text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-4">
              Let's Build Something<br className="hidden sm:block" />
              <span className="text-[#2587a8]"> Great Together.</span>
            </h2>
            <p className="text-[#555] text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
              Have a project in mind? We'd love to hear about it. Send us a message
              directly on WhatsApp and we'll get back to you shortly.
            </p>
          </div>

          {/* Main grid */}
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 lg:gap-10">

            {/* LEFT — Info panel */}
            <div
              className={`fade-left ${visible ? "visible" : ""} lg:col-span-2 flex flex-col gap-5`}
              style={{ transitionDelay: "150ms" }}
            >
              {/* WhatsApp CTA card */}
              <div className="info-card rounded-2xl p-6 sm:p-8 flex flex-col gap-4">
                <div className="flex items-center gap-3 mb-1">
                  <div className="relative pulse-ring w-10 h-10 rounded-full bg-[#25d366]/10 flex items-center justify-center flex-shrink-0">
                    <span className="text-[#25d366]"><WhatsAppIcon /></span>
                  </div>
                  <div>
                    <p className="text-[#555] text-xs tracking-widest uppercase">WhatsApp</p>
                    <p className="text-[#eee3ca] font-semibold text-sm">Direct Message</p>
                  </div>
                </div>
                <div className="border-t border-[#151515] pt-4">
                  <p className="text-[#2587a8] contact-title font-bold text-xl sm:text-2xl tracking-tight">+1 (519) 774-6608</p>
                  <p className="text-[#555] text-xs mt-1">Available Mon–Sat, 9am–7pm EST</p>
                </div>
                <a
                  href={`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent("Hello MonkMedia! I'd like to discuss a project with you.")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="wa-btn mt-1 flex items-center justify-center gap-2 text-white font-semibold text-sm rounded-xl py-3 px-5 cursor-pointer"
                >
                  <WhatsAppIcon />
                  Chat on WhatsApp
                </a>
              </div>

              {/* Info items */}
              {[
                {
                  icon: <PhoneIcon />,
                  label: "Phone",
                  value: "+1 (519) 774-6608",
                  href: "tel:+15197746608",
                },
                {
                  icon: <MailIcon />,
                  label: "Email",
                  value: "hello@monkmedia.com",
                  href: "mailto:hello@monkmedia.com",
                },
                {
                  icon: <MapIcon />,
                  label: "Location",
                  value: "Ontario, Canada",
                  href: null,
                },
              ].map(({ icon, label, value, href }) => (
                <div key={label} className="info-card rounded-xl px-5 py-4 flex items-center gap-4">
                  <div className="w-9 h-9 rounded-full border border-[#2587a8]/30 flex items-center justify-center text-[#2587a8] flex-shrink-0">
                    {icon}
                  </div>
                  <div>
                    <p className="text-[#555] text-[11px] tracking-widest uppercase">{label}</p>
                    {href ? (
                      <a href={href} className="text-[#eee3ca] text-sm hover:text-[#2587a8] transition-colors">{value}</a>
                    ) : (
                      <p className="text-[#eee3ca] text-sm">{value}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* RIGHT — Form */}
            <div
              className={`fade-right ${visible ? "visible" : ""} lg:col-span-3`}
              style={{ transitionDelay: "250ms" }}
            >
              <div className="info-card rounded-2xl p-6 sm:p-8 lg:p-10">
                <h3 className="contact-title text-[#eee3ca] text-xl sm:text-2xl font-bold mb-1">Send a Message</h3>
                <p className="text-[#555] text-xs mb-7">Fill in the form — it'll open WhatsApp with your message pre-filled.</p>

                <form onSubmit={submit} className="flex flex-col gap-4">

                  {/* Name + Email row */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[#555] text-xs tracking-wider uppercase">Your Name *</label>
                      <input
                        name="name"
                        value={form.name}
                        onChange={handle}
                        onFocus={() => setFocused("name")}
                        onBlur={() => setFocused("")}
                        placeholder="John Doe"
                        required
                        className={`${inputBase} ${focused === "name" ? inputFocused : inputIdle}`}
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[#555] text-xs tracking-wider uppercase">Email</label>
                      <input
                        name="email"
                        type="email"
                        value={form.email}
                        onChange={handle}
                        onFocus={() => setFocused("email")}
                        onBlur={() => setFocused("")}
                        placeholder="john@email.com"
                        className={`${inputBase} ${focused === "email" ? inputFocused : inputIdle}`}
                      />
                    </div>
                  </div>

                  {/* Service */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[#555] text-xs tracking-wider uppercase">Service Needed</label>
                    <select
                      name="service"
                      value={form.service}
                      onChange={handle}
                      onFocus={() => setFocused("service")}
                      onBlur={() => setFocused("")}
                      className={`${inputBase} select-dark cursor-pointer ${focused === "service" ? inputFocused : inputIdle}`}
                    >
                      <option value="">Select a service...</option>
                      {services.map((s) => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                  </div>

                  {/* Message */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[#555] text-xs tracking-wider uppercase">Your Message *</label>
                    <textarea
                      name="message"
                      value={form.message}
                      onChange={handle}
                      onFocus={() => setFocused("message")}
                      onBlur={() => setFocused("")}
                      placeholder="Tell us about your project, goals, timeline..."
                      rows={5}
                      required
                      className={`${inputBase} resize-none ${focused === "message" ? inputFocused : inputIdle}`}
                    />
                  </div>

                  {/* Submit */}
                  <button
                    type="submit"
                    className="wa-btn mt-2 w-full flex items-center justify-center gap-3 text-white font-bold text-sm sm:text-base rounded-xl py-4 px-6 cursor-pointer tracking-wide"
                  >
                    <WhatsAppIcon />
                    Send via WhatsApp
                    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="5" y1="12" x2="19" y2="12" />
                      <polyline points="12 5 19 12 12 19" />
                    </svg>
                  </button>

                  <p className="text-center text-[#333] text-[11px] leading-relaxed">
                    Clicking the button will open WhatsApp with your message pre-filled.<br />
                    We typically respond within a few hours.
                  </p>
                </form>
              </div>
            </div>
          </div>

          {/* Bottom strip */}
          <div
            className={`fade-up ${visible ? "visible" : ""} mt-14 pt-8 border-t border-[#111] flex flex-col sm:flex-row items-center justify-between gap-4 text-[#333] text-xs`}
            style={{ transitionDelay: "400ms" }}
          >
            <p className="contact-title font-bold text-[#eee3ca]/20 text-lg tracking-widest uppercase">MonkMedia</p>
            <p>© {new Date().getFullYear()} MonkMedia. All rights reserved.</p>
            <p>Crafting Digital Experiences.</p>
          </div>
        </div>
      </section>
    </>
  );
}