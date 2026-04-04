import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Background from "./components/Background";
import Hero from "./components/Hero";
import AboutUs from "./components/AboutUs";
import Services from "./components/Service";
import WhyChooseUs from "./components/Whychooseus";
import Testimonials from "./components/Testimonials";
import Ourwork from "./components/Ourwork";
import Contactus from "./components/Contactus";
import Clientcarousel from "./components/Clientcarousel";
import Career from "./components/Career"; // ✅ added import for Career component

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 5000);
    return () => clearTimeout(t);
  }, []);

  if (loading) {
    return (
      <>
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&display=swap');

          /* ── Base ── */
          .splash-root {
            position: fixed;
            inset: 0;
            z-index: 9999;
            background: #000;
            background-image: url('/media/screen/skyline.jpg');
            background-size: cover;
            background-position: center;
            display: flex;
            align-items: center;
            justify-content: center;
            overflow: hidden;
          }

          /* ── Dark overlay + scan lines over skyline ── */
          .splash-root::before {
            content: '';
            position: absolute;
            inset: 0;
            background:
              repeating-linear-gradient(
                0deg,
                transparent,
                transparent 3px,
                rgba(0,0,0,0.15) 3px,
                rgba(0,0,0,0.15) 4px
              ),
              rgba(0,0,0,0.50);
            pointer-events: none;
            z-index: 1;
          }

          /* ── Animated corner brackets ── */
          .splash-bracket {
            position: absolute;
            width: 48px;
            height: 48px;
            opacity: 0;
            z-index: 20;
            animation: bracketIn 0.6s cubic-bezier(0.22,1,0.36,1) forwards;
          }
          .splash-bracket::before,
          .splash-bracket::after {
            content: '';
            position: absolute;
            background: #2587a8;
          }
          .splash-bracket::before { width: 100%; height: 2px; top: 0; left: 0; }
          .splash-bracket::after  { width: 2px; height: 100%; top: 0; left: 0; }

          .splash-bracket.tl { top: 32px; left: 32px; animation-delay: 0.1s; }
          .splash-bracket.tr { top: 32px; right: 32px; transform: scaleX(-1); animation-delay: 0.2s; }
          .splash-bracket.bl { bottom: 32px; left: 32px; transform: scaleY(-1); animation-delay: 0.3s; }
          .splash-bracket.br { bottom: 32px; right: 32px; transform: scale(-1); animation-delay: 0.4s; }

          @keyframes bracketIn {
            from { opacity: 0; transform: scale(0.6); }
            to   { opacity: 1; transform: scale(1); }
          }
          .splash-bracket.tr  { animation-name: bracketInTR; }
          .splash-bracket.bl  { animation-name: bracketInBL; }
          .splash-bracket.br  { animation-name: bracketInBR; }

          @keyframes bracketInTR {
            from { opacity: 0; transform: scaleX(-1) scale(0.6); }
            to   { opacity: 1; transform: scaleX(-1) scale(1); }
          }
          @keyframes bracketInBL {
            from { opacity: 0; transform: scaleY(-1) scale(0.6); }
            to   { opacity: 1; transform: scaleY(-1) scale(1); }
          }
          @keyframes bracketInBR {
            from { opacity: 0; transform: scale(-1) scale(0.6); }
            to   { opacity: 1; transform: scale(-1) scale(1); }
          }

          /* ── Horizontal sweep line ── */
          .splash-sweep {
            position: absolute;
            left: 0; right: 0;
            height: 1px;
            z-index: 20;
            background: linear-gradient(to right, transparent, #2587a8, #d4af37, #2587a8, transparent);
            animation: sweep 2.8s cubic-bezier(0.4,0,0.2,1) infinite;
            opacity: 0.7;
          }
          @keyframes sweep {
            0%   { top: -2px; opacity: 0; }
            5%   { opacity: 0.7; }
            95%  { opacity: 0.7; }
            100% { top: 100%; opacity: 0; }
          }

          /* ── Centre content ── */
          .splash-content {
            position: relative;
            z-index: 30;
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 0;
          }

          /* ── Logo reveal ── */
          .splash-logo-wrap {
            position: relative;
            opacity: 0;
            animation: logoReveal 0.9s cubic-bezier(0.22,1,0.36,1) 0.5s forwards;
          }
          @keyframes logoReveal {
            from { opacity: 0; transform: translateY(24px) scale(0.92); filter: blur(8px); }
            to   { opacity: 1; transform: translateY(0)    scale(1);    filter: blur(0); }
          }

          .splash-logo {
            width: 60vw;
            max-width: 340px;
            min-width: 180px;
            object-fit: contain;
            display: block;
          }

          /* ── Gold accent line under logo ── */
          .splash-accent-line {
            width: 0;
            height: 2px;
            background: linear-gradient(to right, #d4af37, #2587a8);
            margin: 18px auto 28px;
            border-radius: 2px;
            animation: lineExpand 0.8s cubic-bezier(0.22,1,0.36,1) 1.2s forwards;
          }
          @keyframes lineExpand {
            to { width: 120px; }
          }

          /* ── Tagline ── */
          .splash-tagline {
            font-family: 'Syne', sans-serif;
            font-size: clamp(10px, 2vw, 13px);
            font-weight: 700;
            letter-spacing: 0.35em;
            text-transform: uppercase;
            color: rgba(238,227,202,0.5);
            opacity: 0;
            animation: fadeUp 0.7s cubic-bezier(0.22,1,0.36,1) 1.6s forwards;
          }
          @keyframes fadeUp {
            from { opacity: 0; transform: translateY(10px); }
            to   { opacity: 1; transform: translateY(0); }
          }

          /* ── Progress bar ── */
          .splash-bar-wrap {
            margin-top: 44px;
            width: clamp(160px, 40vw, 260px);
            height: 2px;
            background: rgba(255,255,255,0.06);
            border-radius: 2px;
            overflow: hidden;
            opacity: 0;
            animation: fadeUp 0.5s ease 1.8s forwards;
          }
          .splash-bar-fill {
            height: 100%;
            width: 0%;
            background: linear-gradient(to right, #2587a8, #d4af37);
            border-radius: 2px;
            animation: barFill 3.2s cubic-bezier(0.4,0,0.2,1) 1.9s forwards;
          }
          @keyframes barFill {
            0%   { width: 0%; }
            60%  { width: 75%; }
            85%  { width: 92%; }
            100% { width: 100%; }
          }

          /* ── Percentage counter ── */
          .splash-pct {
            margin-top: 10px;
            font-family: 'Syne', sans-serif;
            font-size: 11px;
            font-weight: 700;
            letter-spacing: 0.18em;
            color: rgba(37,135,168,0.7);
            opacity: 0;
            animation: fadeUp 0.5s ease 1.9s forwards;
          }

          /* ── Ambient glow blobs ── */
          .splash-glow {
            position: absolute;
            border-radius: 50%;
            pointer-events: none;
            filter: blur(90px);
            z-index: 2;
          }
          .splash-glow.g1 {
            width: 500px; height: 500px;
            background: rgba(37,135,168,0.08);
            top: -180px; left: -180px;
            animation: drift1 8s ease-in-out infinite alternate;
          }
          .splash-glow.g2 {
            width: 400px; height: 400px;
            background: rgba(212,175,55,0.05);
            bottom: -160px; right: -160px;
            animation: drift2 10s ease-in-out infinite alternate;
          }
          @keyframes drift1 {
            to { transform: translate(60px, 60px); }
          }
          @keyframes drift2 {
            to { transform: translate(-40px, -40px); }
          }

          /* ── Noise grain ── */
          .splash-grain {
            position: absolute;
            inset: 0;
            opacity: 0.025;
            background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
            background-size: 200px 200px;
            pointer-events: none;
          }
        `}</style>

        <div className="splash-root">
          {/* Ambient glows */}
          <div className="splash-glow g1" />
          <div className="splash-glow g2" />

          {/* Grain texture */}
          <div className="splash-grain" />

          {/* Scan sweep */}
          <div className="splash-sweep" />

          {/* Corner brackets */}
          <div className="splash-bracket tl" />
          <div className="splash-bracket tr" />
          <div className="splash-bracket bl" />
          <div className="splash-bracket br" />

          {/* Centre */}
          <div className="splash-content">
            <div className="splash-logo-wrap">
              <img
                src="/media/logo.png"
                alt="Monk Media"
                className="splash-logo"
              />
            </div>

            <div className="splash-accent-line" />

            <p className="splash-tagline">Digital Agency · Mississauga</p>

            <div className="splash-bar-wrap">
              <div className="splash-bar-fill" />
            </div>

            <p className="splash-pct" id="splashPct">Loading...</p>
          </div>
        </div>
      </>
    );
  }

  return (
    <BrowserRouter>
      <Background />
      <Navbar />
      <Routes>
        <Route path="/" element={
          <>
            <Hero />
            <AboutUs />
            <Clientcarousel />
            <Services />
            <Ourwork />
            <WhyChooseUs />
            <Testimonials />
            <Contactus />
          </>
        } />
        <Route path="/about"     element={<AboutUs />} />
        <Route path="/services"  element={<Services />} />
        <Route path="/why-us"    element={<WhyChooseUs />} />
        <Route path="/our-work"  element={<Ourwork />} />
        <Route path="/contact"   element={<Contactus />} />
        <Route path="/career"    element={<Career />} /> {/* ✅ Career route - only shows when clicking Career link */}
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;