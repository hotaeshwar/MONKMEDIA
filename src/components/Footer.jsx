import { Link } from "react-router-dom";
import { MapPin, Phone, Mail, ArrowUpRight } from "lucide-react";

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
function TwitterIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#eee3ca" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/>
    </svg>
  );
}
function YoutubeIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#eee3ca" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"/>
      <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="#eee3ca" stroke="none"/>
    </svg>
  );
}

const navLinks = [
  { label: "Home",       to: "/" },
  { label: "About Us",   to: "/about" },
  { label: "Services",   to: "/services" },
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

const socials = [
  { icon: InstagramIcon, label: "Instagram", href: "https://instagram.com/monkmedia.ca" },
  { icon: FacebookIcon,  label: "Facebook",  href: "https://facebook.com" },
  { icon: TwitterIcon,   label: "Twitter",   href: "https://twitter.com" },
  { icon: YoutubeIcon,   label: "YouTube",   href: "https://youtube.com" },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <>
      <style>{`
        .ft-link {
          color: rgba(255,255,255,0.6);
          font-size: 0.875rem;
          text-decoration: none;
          transition: color 0.22s ease, padding-left 0.22s ease;
          display: flex;
          align-items: center;
          gap: 6px;
        }
        .ft-link:hover { color: #2587a8; padding-left: 4px; }

        .ft-social {
          width: 38px; height: 38px;
          border-radius: 50%;
          border: 1px solid rgba(255,255,255,0.2);
          display: flex; align-items: center; justify-content: center;
          transition: background 0.25s ease, border-color 0.25s ease, transform 0.25s ease;
          cursor: pointer;
          text-decoration: none;
          background: rgba(255,255,255,0.05);
        }
        .ft-social:hover {
          background: #2587a8;
          border-color: #2587a8;
          transform: translateY(-3px);
        }

        .ft-tag::before, .ft-tag::after {
          content: '';
          display: inline-block;
          width: 1.5rem; height: 2px;
          background: #2587a8;
          vertical-align: middle;
          margin: 0 0.5rem;
        }

        .ft-divider {
          height: 1px;
          background: linear-gradient(to right, transparent, rgba(37,135,168,0.4), transparent);
        }

        .ft-top-btn {
          display: inline-flex; align-items: center; gap: 6px;
          padding: 8px 18px;
          border-radius: 999px;
          border: 1px solid rgba(37,135,168,0.5);
          background: rgba(37,135,168,0.12);
          color: #2587a8;
          font-size: 0.78rem;
          font-weight: 600;
          letter-spacing: 0.06em;
          cursor: pointer;
          transition: background 0.25s ease, border-color 0.25s ease, color 0.25s ease;
          text-transform: uppercase;
        }
        .ft-top-btn:hover {
          background: #2587a8;
          border-color: #2587a8;
          color: #000;
        }
      `}</style>

      <footer
        className="relative w-full pt-16 pb-6 px-4 sm:px-8 md:px-12 lg:px-20"
        style={{
          borderTop: "1px solid rgba(255,255,255,0.1)",
          background: "rgba(255,255,255,0.04)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
        }}
      >
        {/* teal top glow */}
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-32 pointer-events-none blur-3xl"
          style={{ background: "radial-gradient(ellipse,rgba(37,135,168,0.18),transparent 70%)" }}
        />

        <div className="max-w-7xl mx-auto relative z-10">

          {/* ── TOP GRID ── */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">

            {/* Brand column */}
            <div className="lg:col-span-1">
              <div className="mb-4">
                <img
                  src="/media/L1-01.png"
                  alt="Monk Media"
                  style={{ height: "153px", width: "auto", objectFit: "contain" }}
                />
              </div>
              <p className="text-sm leading-relaxed mb-6" style={{ color: "rgba(255,255,255,0.55)" }}>
                We turn ideas into powerful digital experiences. Your goals are our mission — your success is our result.
              </p>
              <div className="flex gap-3 flex-wrap">
                {socials.map(({ icon: Icon, label, href }) => (
                  <a key={label} href={href} target="_blank" rel="noopener noreferrer" className="ft-social" aria-label={label}>
                    <Icon />
                  </a>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-extrabold text-sm uppercase tracking-widest mb-5 ft-tag" style={{ color: "#2587a8" }}>
                Quick Links
              </h4>
              <ul className="flex flex-col gap-3">
                {navLinks.map(({ label, to }) => (
                  <li key={label}>
                    <Link
                      to={to}
                      className="ft-link"
                      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                    >
                      <ArrowUpRight size={13} color="#2587a8" strokeWidth={2} className="flex-shrink-0" />
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Services */}
            <div>
              <h4 className="font-extrabold text-sm uppercase tracking-widest mb-5 ft-tag" style={{ color: "#2587a8" }}>
                Services
              </h4>
              <ul className="flex flex-col gap-3">
                {services.map((svc) => (
                  <li key={svc}>
                    <Link
                      to="/services"
                      className="ft-link"
                      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                    >
                      <ArrowUpRight size={13} color="#2587a8" strokeWidth={2} className="flex-shrink-0" />
                      {svc}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="font-extrabold text-sm uppercase tracking-widest mb-5 ft-tag" style={{ color: "#2587a8" }}>
                Contact
              </h4>
              <ul className="flex flex-col gap-4">
                <li className="flex items-start gap-3">
                  <MapPin size={16} color="#2587a8" strokeWidth={2} className="flex-shrink-0 mt-0.5" />
                  <span className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.55)" }}>
                    2585 Skymark Ave, Suite 306<br />
                    Mississauga, ON<br />
                    Canada
                  </span>
                </li>
                <li className="flex items-center gap-3">
                  <Phone size={15} color="#2587a8" strokeWidth={2} className="flex-shrink-0" />
                  <a href="tel:+15197746608" className="ft-link" style={{ padding: 0 }}>
                    +1 (519) 774-6608
                  </a>
                </li>
                <li className="flex items-center gap-3">
                  <Mail size={15} color="#2587a8" strokeWidth={2} className="flex-shrink-0" />
                  <a href="mailto:info@monkmedia.ca" className="ft-link" style={{ padding: 0 }}>
                    info@monkmedia.ca
                  </a>
                </li>
                <li className="flex items-center gap-3">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#2587a8" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="flex-shrink-0">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                    <circle cx="12" cy="12" r="4"/>
                    <circle cx="17.5" cy="6.5" r="1" fill="#2587a8" stroke="none"/>
                  </svg>
                  <a href="https://instagram.com/monkmedia.ca" target="_blank" rel="noopener noreferrer" className="ft-link" style={{ padding: 0 }}>
                    @monkmedia.ca
                  </a>
                </li>
              </ul>
            </div>

          </div>

          {/* ── DIVIDER ── */}
          <div className="ft-divider mb-6" />

          {/* ── BOTTOM BAR ── */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-center sm:text-left" style={{ color: "rgba(255,255,255,0.35)" }}>
              © {year} Monk Media. All rights reserved. Crafted with{" "}
              <span style={{ color: "#2587a8" }}>♥</span> in Mississauga, Canada.
            </p>
            <button
              className="ft-top-btn"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              aria-label="Back to top"
            >
              ↑ Back to Top
            </button>
          </div>

        </div>
      </footer>
    </>
  );
}