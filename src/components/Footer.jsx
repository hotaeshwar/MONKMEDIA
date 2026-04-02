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
function LinkedInIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#eee3ca" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
      <rect x="2" y="9" width="4" height="12"/>
      <circle cx="4" cy="4" r="2"/>
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

export default function Footer() {
  const year = new Date().getFullYear();

  return (
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

            {/* Logo - 50% bigger with responsive sizing */}
            <div className="mb-4">
              <img
                src="/media/L1-01.png"
                alt="Monk Media"
                className="w-auto h-24 sm:h-28 md:h-32 lg:h-36 object-contain block"
              />
            </div>

            {/* Company Inc. right below logo */}
            <p className="text-[11px] sm:text-xs font-semibold uppercase mb-4 text-white/35 tracking-[0.14em]">
              14689941 Canada Inc.
            </p>

            <p className="text-sm leading-relaxed mb-6 text-white/55 max-w-md">
              We turn ideas into powerful digital experiences. Your goals are our mission — your success is our result.
            </p>

            {/* Socials */}
            <div className="flex gap-3 flex-wrap">
              {/* Instagram — disabled */}
              <div className="w-[38px] h-[38px] rounded-full border border-white/10 flex items-center justify-center bg-white/5 opacity-35 cursor-not-allowed" aria-label="Instagram (coming soon)" title="Coming soon">
                <InstagramIcon />
              </div>

              {/* Facebook */}
              <a
                href="https://www.facebook.com/monkmedia.ca"
                target="_blank"
                rel="noopener noreferrer"
                className="w-[38px] h-[38px] rounded-full border border-white/20 flex items-center justify-center transition-all duration-300 hover:bg-teal-600 hover:border-teal-600 hover:-translate-y-1 bg-white/5"
                aria-label="Facebook"
              >
                <FacebookIcon />
              </a>

              {/* LinkedIn */}
              <a
                href="https://www.linkedin.com/company/monkmediaca/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-[38px] h-[38px] rounded-full border border-white/20 flex items-center justify-center transition-all duration-300 hover:bg-teal-600 hover:border-teal-600 hover:-translate-y-1 bg-white/5"
                aria-label="LinkedIn"
              >
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
                  <Link
                    to={to}
                    className="text-white/60 text-sm no-underline transition-all duration-200 hover:text-teal-500 hover:pl-1 flex items-center gap-1.5"
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
            <h4 className="font-extrabold text-sm uppercase tracking-widest mb-5 text-teal-500 relative inline-block before:content-[''] before:inline-block before:w-6 before:h-[2px] before:bg-teal-500 before:align-middle before:mr-2 after:content-[''] after:inline-block after:w-6 after:h-[2px] after:bg-teal-500 after:align-middle after:ml-2">
              Services
            </h4>
            <ul className="flex flex-col gap-3">
              {services.map((svc) => (
                <li key={svc}>
                  <Link
                    to="/services"
                    className="text-white/60 text-sm no-underline transition-all duration-200 hover:text-teal-500 hover:pl-1 flex items-center gap-1.5"
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
            <h4 className="font-extrabold text-sm uppercase tracking-widest mb-5 text-teal-500 relative inline-block before:content-[''] before:inline-block before:w-6 before:h-[2px] before:bg-teal-500 before:align-middle before:mr-2 after:content-[''] after:inline-block after:w-6 after:h-[2px] after:bg-teal-500 after:align-middle after:ml-2">
              Contact
            </h4>
            <ul className="flex flex-col gap-4">
              <li className="flex items-start gap-3">
                <MapPin size={16} color="#2587a8" strokeWidth={2} className="flex-shrink-0 mt-0.5" />
                <span className="text-sm leading-relaxed text-white/55">
                  2585 Skymark Ave, Suite 306<br />
                  Mississauga, ON<br />
                  Canada
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
                <a href="https://instagram.com/monkmedia.ca" target="_blank" rel="noopener noreferrer" className="text-white/60 text-sm no-underline transition-all duration-200 hover:text-teal-500 hover:pl-1 flex items-center gap-1.5 p-0">
                  @monkmedia.ca
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* ── DIVIDER ── */}
        <div className="h-px bg-gradient-to-r from-transparent via-teal-500/40 to-transparent mb-6" />

        {/* ── BOTTOM BAR ── */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-center sm:text-left text-white/35">
            © {year} Monk Media. All rights reserved. Crafted with{" "}
            <span className="text-teal-500">♥</span> in Mississauga, Canada.
          </p>
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
  );
}