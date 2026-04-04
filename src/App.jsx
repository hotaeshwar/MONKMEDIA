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
          @keyframes splashFadeIn {
            from { opacity: 0; transform: scale(0.85); }
            to   { opacity: 1; transform: scale(1); }
          }
          @keyframes spin {
            to { transform: rotate(360deg); }
          }
          @keyframes pulse-ring {
            0%   { transform: scale(0.85); opacity: 0.6; }
            50%  { transform: scale(1.1);  opacity: 0.2; }
            100% { transform: scale(0.85); opacity: 0.6; }
          }

          .splash-root {
            position: fixed;
            inset: 0;
            z-index: 9999;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            animation: splashFadeIn 0.6s ease both;
            background-image: url('/media/screen/skyline.jpg');
            background-size: cover;
            background-position: center;
          }

          .splash-root::before {
            content: '';
            position: absolute;
            inset: 0;
            background: rgba(0, 0, 0, 0.55);
            z-index: 1;
          }

          .splash-content {
            position: relative;
            z-index: 2;
            display: flex;
            flex-direction: column;
            align-items: center;
          }

          .splash-logo-wrap {
            position: relative;
            display: flex;
            align-items: center;
            justify-content: center;
            margin-bottom: 48px;
          }

          .splash-pulse {
            position: absolute;
            width: 320px;
            height: 320px;
            border-radius: 50%;
            border: 2px solid rgba(37,135,168,0.35);
            animation: pulse-ring 2s ease-in-out infinite;
          }
          .splash-pulse.p2 {
            width: 390px;
            height: 390px;
            animation-delay: 0.4s;
            border-color: rgba(37,135,168,0.18);
          }

          .splash-logo {
            width: 70vw;
            max-width: 420px;
            min-width: 220px;
            object-fit: contain;
            position: relative;
            z-index: 2;
            animation: splashFadeIn 0.8s 0.2s both;
          }

          .splash-spinner {
            width: 44px;
            height: 44px;
            border-radius: 50%;
            border: 3px solid rgba(238,227,202,0.15);
            border-top-color: #2587a8;
            animation: spin 0.9s linear infinite;
          }

          .splash-dots {
            display: flex;
            gap: 8px;
            margin-top: 20px;
          }
          .splash-dot {
            width: 7px;
            height: 7px;
            border-radius: 50%;
            background: rgba(37,135,168,0.7);
            animation: pulse-ring 1.2s ease-in-out infinite;
          }
          .splash-dot:nth-child(2) { animation-delay: 0.2s; }
          .splash-dot:nth-child(3) { animation-delay: 0.4s; }
        `}</style>

        <div className="splash-root">
          <div className="splash-content">
            <div className="splash-logo-wrap">
              <div className="splash-pulse" />
              <div className="splash-pulse p2" />
              <img
                src="/media/L1-01.png"
                alt="Monk Media"
                className="splash-logo"
              />
            </div>
            <div className="splash-spinner" />
            <div className="splash-dots">
              <div className="splash-dot" />
              <div className="splash-dot" />
              <div className="splash-dot" />
            </div>
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