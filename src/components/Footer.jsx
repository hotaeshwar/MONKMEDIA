import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { MapPin, Phone, Mail, ArrowUpRight } from "lucide-react";

/* ─────────────────────────────────────────────
   Icons
───────────────────────────────────────────── */

function InstagramIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#eee3ca" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
      <circle cx="12" cy="12" r="4"/>
      <circle cx="17.5" cy="6.5" r="1" fill="#eee3ca" stroke="none"/>
    </svg>
  );
}
function FacebookIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#eee3ca" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
    </svg>
  );
}
function LinkedInIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#eee3ca" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
      <rect x="2" y="9" width="4" height="12"/>
      <circle cx="4" cy="4" r="2"/>
    </svg>
  );
}

/* ─────────────────────────────────────────────
   Legal modal data
───────────────────────────────────────────── */

const privacySections = [
  { num: "01", title: "Introduction", body: "Welcome to Monk Media. This Privacy Policy explains how we collect, use, and protect your personal data when you use our website at monkmedia.ca." },
  { num: "02", title: "Information We Collect", items: ["Name, email address, and phone number", "Billing and shipping address", "Payment information (handled by third-party processors)", "Usage data and cookies"] },
  { num: "03", title: "How We Use Your Information", items: ["Provide and maintain our services", "Process transactions and send related information", "Send marketing communications (with consent)", "Improve user experience and website functionality"] },
  { num: "04", title: "Sharing of Your Information", body: "We do not sell or rent your personal data. We may share it with service providers and partners who help us operate our business, or law enforcement when required by law." },
  { num: "05", title: "Cookies and Tracking", body: "We use cookies to enhance your browsing experience. You can control cookie preferences through your browser settings." },
  { num: "06", title: "Data Security", body: "We implement appropriate security measures to protect your data, but no online transmission is 100% secure." },
  { num: "07", title: "Your Rights", items: ["Access the personal data we hold about you", "Request correction or deletion of your data", "Withdraw consent for marketing at any time"] },
  { num: "08", title: "Children's Privacy", body: "Our services are not directed to children under 13, and we do not knowingly collect personal data from them." },
  { num: "09", title: "Contact Us", body: "If you have any questions about this Privacy Policy, contact us at: Monk Media Toronto, Canada. Email: info@monkmedia.ca" },
];

const termsSections = [
  { num: "01", title: "Acceptance of Terms", body: "By accessing or using the website monkmedia.ca, operated by Monk Media, you agree to be bound by these Terms of Service and our Privacy Policy." },
  { num: "02", title: "Changes to Terms", body: "We reserve the right to update or change these Terms at any time. Continued use of the site after changes constitutes acceptance of those changes." },
  { num: "03", title: "Use of the Website", items: ["You agree not to misuse the site or services provided.", "You must be at least 18 years old to use our services.", "You agree not to use the site for illegal or unauthorized purposes."] },
  { num: "04", title: "Intellectual Property", body: "All content on this site, including text, graphics, logos, and images, is the property of Monk Media and is protected by copyright and other laws." },
  { num: "05", title: "Account Responsibility", body: "If you create an account, you are responsible for maintaining its security and all activities that occur under it." },
  { num: "06", title: "Termination", body: "We may terminate or suspend your access to the website at any time, without prior notice or liability, for any reason." },
  { num: "07", title: "Disclaimer", body: 'This website is provided "as is" and "as available." We make no warranties regarding its accuracy, availability, or reliability.' },
  { num: "08", title: "Limitation of Liability", body: "Monk Media shall not be liable for any damages arising out of or related to your use or inability to use the site." },
  { num: "09", title: "Governing Law", body: "These Terms are governed by the laws of India. Any disputes shall be subject to the jurisdiction of the courts in Mumbai." },
  { num: "10", title: "Contact Information", body: "For any questions about these Terms, contact us at: Monk Media Toronto, Canada. Email: info@monkmedia.ca" },
];

/* ─────────────────────────────────────────────
   Shared legal modal
───────────────────────────────────────────── */

function LegalModal({ open, onClose, title, updated, sections }) {
  const [animIn, setAnimIn]   = useState(false);
  const [animOut, setAnimOut] = useState(false);
  const scrollRef = useRef(null);

  useEffect(() => {
    if (open) {
      setAnimOut(false);
      requestAnimationFrame(() => requestAnimationFrame(() => setAnimIn(true)));
      document.body.style.overflow = "hidden";
    }
  }, [open]);

  const handleClose = () => {
    setAnimIn(false);
    setAnimOut(true);
    setTimeout(() => {
      setAnimOut(false);
      document.body.style.overflow = "";
      onClose();
    }, 380);
  };

  useEffect(() => {
    const handler = (e) => { if (e.key === "Escape" && open) handleClose(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open]);

  if (!open && !animOut) return null;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@300;400;500&display=swap');
        .lm-backdrop{position:fixed;inset:0;z-index:9990;background:rgba(0,0,0,0.75);backdrop-filter:blur(10px);-webkit-backdrop-filter:blur(10px);transition:opacity .38s cubic-bezier(.22,1,.36,1);opacity:0;}
        .lm-backdrop.in{opacity:1;} .lm-backdrop.out{opacity:0;}
        .lm-sheet{position:fixed;inset:0;z-index:9991;display:flex;align-items:flex-end;justify-content:center;padding:0;pointer-events:none;}
        @media(min-width:640px){.lm-sheet{align-items:center;padding:24px 16px;}}
        .lm-panel{pointer-events:all;width:100%;max-width:720px;max-height:92dvh;display:flex;flex-direction:column;border-radius:24px 24px 0 0;background:#0d0d0d;border:1px solid rgba(255,255,255,0.08);border-bottom:none;overflow:hidden;transform:translateY(60px) scale(.97);opacity:0;transition:transform .42s cubic-bezier(.22,1,.36,1),opacity .38s cubic-bezier(.22,1,.36,1);font-family:'DM Sans',sans-serif;}
        @media(min-width:640px){.lm-panel{border-radius:20px;border-bottom:1px solid rgba(255,255,255,0.08);max-height:88dvh;}}
        .lm-panel.in{transform:translateY(0) scale(1);opacity:1;} .lm-panel.out{transform:translateY(60px) scale(.97);opacity:0;}
        .lm-handle{width:40px;height:4px;border-radius:2px;background:rgba(255,255,255,0.15);margin:14px auto 0;flex-shrink:0;}
        @media(min-width:640px){.lm-handle{display:none;}}
        .lm-header{display:flex;align-items:flex-start;justify-content:space-between;gap:16px;padding:20px 24px 18px;border-bottom:1px solid rgba(255,255,255,0.06);flex-shrink:0;}
        @media(min-width:640px){.lm-header{padding:28px 36px 22px;}}
        .lm-accent-tag{display:inline-block;font-family:'DM Sans',sans-serif;font-size:10px;font-weight:500;letter-spacing:.2em;text-transform:uppercase;color:#1eaec8;margin-bottom:8px;padding:3px 10px;border:1px solid rgba(30,174,200,.35);border-radius:20px;background:rgba(30,174,200,.08);}
        .lm-title{font-family:'Syne',sans-serif;font-size:clamp(1.3rem,4vw,1.9rem);font-weight:800;color:#fff;line-height:1.15;margin:0;letter-spacing:-.02em;}
        .lm-updated{margin-top:6px;font-size:11px;color:rgba(255,255,255,.3);}
        .lm-close{flex-shrink:0;width:36px;height:36px;border-radius:50%;border:1px solid rgba(255,255,255,.12);background:rgba(255,255,255,.05);display:flex;align-items:center;justify-content:center;cursor:pointer;color:rgba(255,255,255,.5);transition:background .2s,border-color .2s,color .2s,transform .25s;margin-top:4px;}
        .lm-close:hover{background:rgba(30,174,200,.15);border-color:rgba(30,174,200,.5);color:#1eaec8;transform:rotate(90deg);}
        .lm-body{overflow-y:auto;padding:24px 24px 32px;flex:1;scroll-behavior:smooth;}
        @media(min-width:640px){.lm-body{padding:28px 36px 40px;}}
        .lm-body::-webkit-scrollbar{width:4px;} .lm-body::-webkit-scrollbar-track{background:transparent;} .lm-body::-webkit-scrollbar-thumb{background:rgba(30,174,200,.3);border-radius:2px;}
        .lm-section{display:flex;gap:16px;padding:18px 0;border-bottom:1px solid rgba(255,255,255,.05);}
        .lm-section:last-child{border-bottom:none;}
        .lm-num{font-family:'Syne',sans-serif;font-size:11px;font-weight:700;color:#1eaec8;letter-spacing:.08em;min-width:28px;padding-top:2px;flex-shrink:0;}
        .lm-section-title{font-family:'Syne',sans-serif;font-size:.95rem;font-weight:700;color:#fff;margin:0 0 8px;letter-spacing:-.01em;}
        .lm-section-body{font-size:.875rem;line-height:1.75;color:rgba(255,255,255,.55);margin:0;}
        .lm-list{margin:0;padding:0;list-style:none;display:flex;flex-direction:column;gap:6px;}
        .lm-list li{display:flex;align-items:flex-start;gap:8px;font-size:.875rem;line-height:1.65;color:rgba(255,255,255,.55);}
        .lm-list li::before{content:'';display:block;width:5px;height:5px;border-radius:50%;background:#1eaec8;flex-shrink:0;margin-top:7px;}
        .lm-footer{flex-shrink:0;padding:14px 24px;border-top:1px solid rgba(255,255,255,.06);display:flex;align-items:center;justify-content:space-between;gap:12px;background:rgba(255,255,255,.02);}
        @media(min-width:640px){.lm-footer{padding:16px 36px;}}
        .lm-footer-text{font-size:11px;color:rgba(255,255,255,.25);}
        .lm-footer-btn{font-size:11px;font-weight:600;letter-spacing:.1em;text-transform:uppercase;color:#1eaec8;background:rgba(30,174,200,.1);border:1px solid rgba(30,174,200,.3);border-radius:20px;padding:6px 16px;cursor:pointer;transition:background .2s,border-color .2s;}
        .lm-footer-btn:hover{background:rgba(30,174,200,.2);border-color:rgba(30,174,200,.55);}
      `}</style>

      <div className={`lm-backdrop ${animIn ? "in" : ""} ${animOut ? "out" : ""}`} onClick={handleClose} aria-hidden="true" />

      <div className="lm-sheet" role="dialog" aria-modal="true" aria-label={title}>
        <div className={`lm-panel ${animIn ? "in" : ""} ${animOut ? "out" : ""}`}>
          <div className="lm-handle" />

          <div className="lm-header">
            <div>
              <span className="lm-accent-tag">Legal Document</span>
              <h2 className="lm-title">{title}</h2>
              <p className="lm-updated">Last updated: {updated}</p>
            </div>
            <button className="lm-close" onClick={handleClose} aria-label="Close">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M1 1l12 12M13 1L1 13" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
              </svg>
            </button>
          </div>

          <div className="lm-body" ref={scrollRef}>
            {sections.map((s) => (
              <div className="lm-section" key={s.num}>
                <span className="lm-num">{s.num}</span>
                <div style={{ flex: 1 }}>
                  <h3 className="lm-section-title">{s.title}</h3>
                  {s.body  && <p className="lm-section-body">{s.body}</p>}
                  {s.items && (
                    <ul className="lm-list">
                      {s.items.map((item, i) => <li key={i}>{item}</li>)}
                    </ul>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="lm-footer">
            <span className="lm-footer-text">© {new Date().getFullYear()} Monk Media. All rights reserved.</span>
            <button className="lm-footer-btn" onClick={handleClose}>Got it</button>
          </div>
        </div>
      </div>
    </>
  );
}

/* ─────────────────────────────────────────────
   Nav / services data
───────────────────────────────────────────── */

const navLinks = [
  { label: "Home",       to: "/" },
  { label: "About Us",   to: "/about" },
  { label: "Services",   to: "/services" },
  { label: "Career",     to: "/career" },
  { label: "Contact Us", to: "/contact" },
];

const services = [
  "Website Designing",
  "Google My Business",
  "SEO & Local SEO",
  "Social Media Management",
  "Brand Shoots",
  "SEO For GMB",
];

/* ─────────────────────────────────────────────
   Footer
───────────────────────────────────────────── */

export default function Footer() {
  const year = new Date().getFullYear();
  const [showPrivacy, setShowPrivacy] = useState(false);
  const [showTerms,   setShowTerms]   = useState(false);

  return (
    <>
      <footer
        className="relative w-full pt-16 pb-6 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-20 border-t border-white/10"
        style={{
          background: "rgba(255,255,255,0.04)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
        }}
      >
        {/* teal top glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-32 pointer-events-none blur-3xl bg-gradient-radial from-teal-500/20 to-transparent" />

        <div className="max-w-7xl mx-auto relative z-10">

          {/* ── TOP GRID ── */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10 mb-12">

            {/* Brand column */}
            <div className="lg:col-span-1">
              <div className="mb-4">
                <img
                  src="/media/L1-01.png"
                  alt="Monk Media"
                  className="w-auto h-24 sm:h-28 md:h-32 lg:h-36 object-contain block"
                />
              </div>
              <p className="text-[11px] sm:text-xs font-semibold uppercase mb-4 text-white/35 tracking-[0.14em]">
                14689941 Canada Inc.
              </p>
              <p className="text-sm leading-relaxed mb-6 text-white/55 max-w-md">
                We turn ideas into powerful digital experiences. Your goals are our mission — your success is our result.
              </p>
              <div className="flex gap-3 flex-wrap">
                <a href="https://www.instagram.com/monkmedia.ca?igsh=MWdyemR6dzJyZ21wMA==" target="_blank" rel="noopener noreferrer" className="w-[38px] h-[38px] rounded-full border border-white/20 flex items-center justify-center transition-all duration-300 hover:bg-teal-600 hover:border-teal-600 hover:-translate-y-1 bg-white/5" aria-label="Instagram">
                  <InstagramIcon />
                </a>
                <a href="https://www.facebook.com/monkmedia.ca" target="_blank" rel="noopener noreferrer" className="w-[38px] h-[38px] rounded-full border border-white/20 flex items-center justify-center transition-all duration-300 hover:bg-teal-600 hover:border-teal-600 hover:-translate-y-1 bg-white/5" aria-label="Facebook">
                  <FacebookIcon />
                </a>
                <a href="https://www.linkedin.com/company/monkmediaca/" target="_blank" rel="noopener noreferrer" className="w-[38px] h-[38px] rounded-full border border-white/20 flex items-center justify-center transition-all duration-300 hover:bg-teal-600 hover:border-teal-600 hover:-translate-y-1 bg-white/5" aria-label="LinkedIn">
                  <LinkedInIcon />
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-extrabold text-sm uppercase tracking-widest mb-5 text-teal-500 relative inline-block before:content-[''] before:inline-block before:w-6 before:h-[2px] before:bg-teal-500 before:align-middle before:mr-2 after:content-[''] after:inline-block after:w-6 after:h-[2px] after:bg-teal-500 after:align-middle after:ml-2">
                Quick Links
              </h4>
              <ul className="flex flex-col gap-3">
                {navLinks.map(({ label, to }) => (
                  <li key={label}>
                    <Link to={to} className="text-white/60 text-sm no-underline transition-all duration-200 hover:text-teal-500 hover:pl-1 flex items-center gap-1.5" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
                      <ArrowUpRight size={13} color="#2587a8" strokeWidth={2} className="flex-shrink-0" />
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Services */}
            <div>
              <h4 className="font-extrabold text-sm uppercase tracking-widest mb-5 text-teal-500 relative inline-block before:content-[''] before:inline-block before:w-6 before:h-[2px] before:bg-teal-500 before:align-middle before:mr-2 after:content-[''] after:inline-block after:w-6 after:h-[2px] after:bg-teal-500 after:align-middle after:ml-2">
                Services
              </h4>
              <ul className="flex flex-col gap-3">
                {services.map((svc) => (
                  <li key={svc}>
                    <Link to="/services" className="text-white/60 text-sm no-underline transition-all duration-200 hover:text-teal-500 hover:pl-1 flex items-center gap-1.5" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
                      <ArrowUpRight size={13} color="#2587a8" strokeWidth={2} className="flex-shrink-0" />
                      {svc}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="font-extrabold text-sm uppercase tracking-widest mb-5 text-teal-500 relative inline-block before:content-[''] before:inline-block before:w-6 before:h-[2px] before:bg-teal-500 before:align-middle before:mr-2 after:content-[''] after:inline-block after:w-6 after:h-[2px] after:bg-teal-500 after:align-middle after:ml-2">
                Contact
              </h4>
              <ul className="flex flex-col gap-4">
                <li className="flex items-start gap-3">
                  <MapPin size={16} color="#2587a8" strokeWidth={2} className="flex-shrink-0 mt-0.5" />
                  <span className="text-sm leading-relaxed text-white/55">
                    2585 Skymark Ave, Suite 306<br />Mississauga, ON<br />Canada
                  </span>
                </li>
                <li className="flex items-center gap-3">
                  <Phone size={15} color="#2587a8" strokeWidth={2} className="flex-shrink-0" />
                  <a href="tel:+15197746608" className="text-white/60 text-sm no-underline transition-all duration-200 hover:text-teal-500 hover:pl-1 flex items-center gap-1.5 p-0">
                    +1 (519) 774-6608
                  </a>
                </li>
                <li className="flex items-center gap-3">
                  <Mail size={15} color="#2587a8" strokeWidth={2} className="flex-shrink-0" />
                  <a href="mailto:info@monkmedia.ca" className="text-white/60 text-sm no-underline transition-all duration-200 hover:text-teal-500 hover:pl-1 flex items-center gap-1.5 p-0">
                    info@monkmedia.ca
                  </a>
                </li>
                <li className="flex items-center gap-3">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#2587a8" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="flex-shrink-0">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                    <circle cx="12" cy="12" r="4"/>
                    <circle cx="17.5" cy="6.5" r="1" fill="#2587a8" stroke="none"/>
                  </svg>
                  <a href="https://www.instagram.com/monkmedia.ca?igsh=MWdyemR6dzJyZ21wMA==" target="_blank" rel="noopener noreferrer" className="text-white/60 text-sm no-underline transition-all duration-200 hover:text-teal-500 hover:pl-1 flex items-center gap-1.5 p-0">
                    @monkmedia.ca
                  </a>
                </li>
              </ul>
            </div>

          </div>

          {/* ── DIVIDER ── */}
          <div className="h-px bg-gradient-to-r from-transparent via-teal-500/40 to-transparent mb-6" />

          {/* ── BOTTOM BAR ── */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4">

            {/* Left: copyright + legal links */}
            <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4">
              <p className="text-xs text-center sm:text-left text-white/35">
                © {year} Monk Media. All rights reserved. Building India's{" "}
                <span className="text-teal-500">Digital</span> Team.
              </p>
              <div className="flex items-center gap-3">
                <span className="hidden sm:block w-px h-3 bg-white/15" />
                <button
                  onClick={() => setShowPrivacy(true)}
                  className="text-[11px] text-white/35 hover:text-teal-500 transition-colors duration-200 underline-offset-2 hover:underline cursor-pointer bg-transparent border-none p-0"
                >
                  Privacy Policy
                </button>
                <span className="w-px h-3 bg-white/15" />
                <button
                  onClick={() => setShowTerms(true)}
                  className="text-[11px] text-white/35 hover:text-teal-500 transition-colors duration-200 underline-offset-2 hover:underline cursor-pointer bg-transparent border-none p-0"
                >
                  Terms of Service
                </button>
              </div>
            </div>

            {/* Right: back to top */}
            <button
              className="inline-flex items-center gap-1.5 px-5 py-2 rounded-full border border-teal-500/50 bg-teal-500/20 text-teal-500 text-[11px] sm:text-xs font-semibold tracking-wide uppercase transition-all duration-300 hover:bg-teal-500 hover:border-teal-500 hover:text-black"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              aria-label="Back to top"
            >
              ↑ Back to Top
            </button>
          </div>

        </div>
      </footer>

      {/* ── LEGAL MODALS ── */}
      <LegalModal
        open={showPrivacy}
        onClose={() => setShowPrivacy(false)}
        title="Privacy Policy"
        updated="July 25, 2025"
        sections={privacySections}
      />
      <LegalModal
        open={showTerms}
        onClose={() => setShowTerms(false)}
        title="Terms of Service"
        updated="July 25, 2025"
        sections={termsSections}
      />
    </>
  );
}