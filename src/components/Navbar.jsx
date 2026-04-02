import { useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";

const leftLinks = [
  { label: "Home",     to: "/" },
  { label: "About Us", to: "/about" },
];

const rightLinks = [
  { label: "Services",     to: "/services" },
  { label: "Get In Touch", to: "/contact" },
];

export default function Navbar() {
  const [open, setOpen]         = useState(false);
  const [scrolled, setScrolled] = useState(false);
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
      `}</style>

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

            {/* ── CENTER LOGO ── */}
            <NavLink to="/" className="flex items-center select-none shrink-0 z-10">
              <img
                src="/media/L1-01.png"
                alt="MonkMedia Logo"
                style={{
                  height: "180px",
                  width: "auto",
                  objectFit: "contain",
                  filter: scrolled ? "none" : "brightness(0) invert(1)",
                  transition: "filter 0.4s ease",
                }}
              />
            </NavLink>

            {/* ── LEFT LINKS — tight to logo ── */}
            <ul className="hidden md:flex items-center gap-0 nav-dm absolute right-1/2 pr-[100px]">
              {leftLinks.map(({ label, to }) => (
                <li key={to}>
                  <NavLink
                    to={to}
                    end={to === "/"}
                    className={({ isActive }) =>
                      `relative px-3.5 py-2 rounded-full text-[0.88rem] transition-colors duration-200 group whitespace-nowrap
                       ${isActive
                         ? "text-[#2587a8]"
                         : `${scrolled ? "text-[#0d1b2a]" : "text-[#eee3ca]"} hover:text-[#2587a8]`
                       }`
                    }
                    style={{ fontWeight: 800 }}
                  >
                    {({ isActive }) => (
                      <>
                        {label}
                        <span
                          className={`
                            absolute bottom-1 left-3.5 right-3.5 h-[2px] rounded-full bg-[#2587a8]
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

            {/* ── RIGHT LINKS + CTA — tight to logo ── */}
            <div className="hidden md:flex items-center gap-0 nav-dm absolute left-1/2 pl-[100px]">
              {rightLinks.map(({ label, to }) => (
                <NavLink
                  key={to}
                  to={to}
                  className={({ isActive }) =>
                    `relative px-3.5 py-2 rounded-full text-[0.88rem] transition-colors duration-200 group whitespace-nowrap
                     ${isActive
                       ? "text-[#2587a8]"
                       : `${scrolled ? "text-[#0d1b2a]" : "text-[#eee3ca]"} hover:text-[#2587a8]`
                     }`
                  }
                  style={{ fontWeight: 800 }}
                >
                  {({ isActive }) => (
                    <>
                      {label}
                      <span
                        className={`
                          absolute bottom-1 left-3.5 right-3.5 h-[2px] rounded-full bg-[#2587a8]
                          transition-transform duration-300 origin-left
                          ${isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"}
                        `}
                      />
                    </>
                  )}
                </NavLink>
              ))}

              {/* Portfolio CTA */}
              <NavLink
                to="/portfolio"
                className="
                  nav-syne flex items-center gap-2 ml-3
                  bg-[#2587a8] hover:bg-[#1e6f8f]
                  text-[#eee3ca] text-[0.82rem] tracking-wide
                  px-5 py-2.5 rounded-full
                  transition-all duration-200 hover:scale-[1.03] active:scale-[0.97]
                  shadow-[0_2px_12px_rgba(37,135,168,0.25)]
                  select-none whitespace-nowrap
                "
                style={{ fontWeight: 800 }}
              >
                Portfolio
                <span className="w-6 h-6 rounded-full bg-[#0d1b2a] flex items-center justify-center shrink-0">
                  <ArrowUpRight size={13} color="#eee3ca" />
                </span>
              </NavLink>
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

            <NavLink
              to="/portfolio"
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
                transitionDelay: open ? `${allLinks.length * 55}ms` : "0ms",
              }}
            >
              Portfolio
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