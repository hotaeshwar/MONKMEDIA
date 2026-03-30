import { useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";

const links = [
  { label: "Home",     to: "/" },
  { label: "About Us", to: "/about" },
  { label: "Services", to: "/services" },
];

export default function Navbar() {
  const [open, setOpen]         = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location                = useLocation();

  useEffect(() => { setOpen(false); }, [location]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@600;700;800&family=DM+Sans:wght@400;500;700;800&display=swap');
        .nav-syne { font-family: 'Syne', sans-serif; }
        .nav-dm   { font-family: 'DM Sans', sans-serif; }
      `}</style>

      <nav
        className={`
          relative w-full z-50
          bg-[#eee3ca]
          transition-shadow duration-300
          ${scrolled ? "shadow-[0_4px_24px_rgba(0,0,0,0.10)]" : ""}
        `}
      >
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          <div className="flex items-center justify-between h-24 sm:h-[100px]">

            {/* ✅ Logo — overflow allowed so it can be taller than navbar */}
            <NavLink to="/" className="flex items-center select-none shrink-0" style={{ overflow: "visible" }}>
              <img
                src="/media/L1-01.png"
                alt="MonkMedia Logo"
                style={{
                  height: "140px",        /* ✅ Bigger than navbar height */
                  width: "auto",
                  objectFit: "contain",
                  position: "relative",
                  zIndex: 10,
                }}
              />
            </NavLink>

            {/* Desktop Links */}
            <ul className="hidden md:flex items-center gap-1 nav-dm">
              {links.map(({ label, to }) => (
                <li key={to}>
                  <NavLink
                    to={to}
                    end={to === "/"}
                    className={({ isActive }) =>
                      `relative px-4 py-2 rounded-full text-[0.92rem] transition-colors duration-200 group
                       ${isActive
                         ? "text-[#2587a8]"
                         : "text-[#0d1b2a] hover:text-[#2587a8]"
                       }`
                    }
                    /* ✅ Bold font weight via style so it always applies */
                    style={{ fontWeight: 800 }}
                  >
                    {({ isActive }) => (
                      <>
                        {label}
                        <span
                          className={`
                            absolute bottom-1 left-4 right-4 h-[2px] rounded-full bg-[#2587a8]
                            transition-transform duration-300 origin-left
                            ${isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"}
                          `}
                        />
                      </>
                    )}
                  </NavLink>
                </li>
              ))}
            </ul>

            {/* Desktop CTA */}
            <div className="hidden md:flex items-center">
              <NavLink
                to="/contact"
                className="
                  nav-syne flex items-center gap-2
                  bg-[#2587a8] hover:bg-[#1e6f8f]
                  text-[#eee3ca] text-[0.82rem] tracking-wide
                  px-5 py-2.5 rounded-full
                  transition-all duration-200 hover:scale-[1.03] active:scale-[0.97]
                  shadow-[0_2px_12px_rgba(37,135,168,0.25)]
                  select-none
                "
                style={{ fontWeight: 800 }}
              >
                Get In Touch
                <span className="w-6 h-6 rounded-full bg-[#0d1b2a] flex items-center justify-center shrink-0">
                  <ArrowUpRight size={13} color="#eee3ca" />
                </span>
              </NavLink>
            </div>

            {/* Hamburger */}
            <button
              onClick={() => setOpen(o => !o)}
              aria-label="Toggle menu"
              className="
                md:hidden relative w-10 h-10 rounded-xl
                flex flex-col items-center justify-center gap-[5px]
                bg-transparent border-none cursor-pointer
                focus:outline-none select-none
                transition-colors duration-200
                hover:bg-[#0d1b2a]/5
              "
            >
              <span className={`block h-[2.5px] bg-[#0d1b2a] rounded-full transition-all duration-300 ease-[cubic-bezier(.16,1,.3,1)] ${open ? "w-[22px] translate-y-[7.5px] rotate-45" : "w-[22px]"}`} />
              <span className={`block h-[2.5px] bg-[#0d1b2a] rounded-full transition-all duration-300 ease-[cubic-bezier(.16,1,.3,1)] ${open ? "w-0 opacity-0" : "w-[16px] self-end mr-[2px]"}`} />
              <span className={`block h-[2.5px] bg-[#0d1b2a] rounded-full transition-all duration-300 ease-[cubic-bezier(.16,1,.3,1)] ${open ? "w-[22px] -translate-y-[7.5px] -rotate-45" : "w-[22px]"}`} />
            </button>

          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`
            md:hidden overflow-hidden
            transition-all duration-400 ease-[cubic-bezier(.16,1,.3,1)]
            ${open ? "max-h-[400px] opacity-100" : "max-h-0 opacity-0"}
          `}
        >
          <div className="bg-[#eee3ca] border-t border-[#0d1b2a]/8 px-5 pb-6 pt-3">
            <ul className="nav-dm flex flex-col gap-1 mb-5">
              {links.map(({ label, to }, i) => (
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

            {/* Mobile CTA */}
            <NavLink
              to="/contact"
              className="
                nav-syne flex items-center justify-center gap-2
                bg-[#2587a8] hover:bg-[#1e6f8f]
                text-[#eee3ca] text-[0.85rem] tracking-wide
                w-full py-3 rounded-full
                transition-all duration-200 active:scale-[0.97]
                shadow-[0_2px_12px_rgba(37,135,168,0.25)]
              "
              style={{
                fontWeight: 800,
                transitionDelay: open ? `${links.length * 55}ms` : "0ms",
              }}
            >
              Get In Touch
              <span className="w-6 h-6 rounded-full bg-[#0d1b2a] flex items-center justify-center shrink-0">
                <ArrowUpRight size={13} color="#eee3ca" />
              </span>
            </NavLink>
          </div>
        </div>
      </nav>
    </>
  );
}