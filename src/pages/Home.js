import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import logo from "../assets/logo.png";
import "../App.css";
function Home() {
  const phoneNumber = "1513765xxxx";
  const navigate = useNavigate();
  const canvasRef = useRef(null);
  const [offsetY, setOffsetY] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [horoscope, setHoroscope] = useState("");
  const [zodiac, setZodiac] = useState("Aries");
  const [kundaliPreview, setKundaliPreview] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    dob: "",
    time: "",
    place: "",
  });
  const zodiacSymbols = ["♈︎","♉︎","♊︎","♋︎","♌︎","♍︎","♎︎","♏︎","♐︎","♑︎","♒︎","♓︎"];
  // ===================== SCROLL PARALLAX =====================
  useEffect(() => {
    const handleScroll = () => setOffsetY(window.scrollY * 0.3);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  // ===================== AUTO POPUP =====================
  useEffect(() => {
    const timer = setTimeout(() => setShowPopup(true), 5000);
    return () => clearTimeout(timer);
  }, []);
  useEffect(() => {
    const handleExit = (e) => {
      if (e.clientY < 10) setShowPopup(true);
    };
    document.addEventListener("mouseleave", handleExit);
    return () => document.removeEventListener("mouseleave", handleExit);
  }, []);
  // ===================== PARTICLE + ZODIAC EFFECT =====================
 // ===================== PREMIUM PARTICLE + ZODIAC EFFECT WITH SHIMMER =====================
useEffect(() => {
  const canvas = canvasRef.current;
  const ctx = canvas.getContext("2d");
  let width = canvas.width = window.innerWidth;
  let height = canvas.height = window.innerHeight;

  const particles = [];
  const totalParticles = 70; // clean and airy
  const particleColors = ["#fff8f0", "#f0f8ff", "#e0fff4"]; // soft particle colors
  const zodiacColors = ["#FFB3B3", "#FFF1B3", "#B3FFD6", "#B3E0FF"]; // soft, small pastel palette

  for (let i = 0; i < totalParticles; i++) {
    const isZodiac = Math.random() < 0.25;
    particles.push({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: Math.random() * 2 + 1,
      speedX: (Math.random() - 0.5) * 0.12, // slower horizontal
      speedY: (Math.random() - 0.5) * 0.12, // slower vertical
      alpha: Math.random() * 0.3 + 0.3,
      color: particleColors[Math.floor(Math.random() * particleColors.length)],
      symbol: isZodiac ? zodiacSymbols[Math.floor(Math.random() * zodiacSymbols.length)] : null,
      fontSize: isZodiac ? Math.random() * 10 + 8 : 0, // small zodiac size
      glow: isZodiac ? Math.random() * 2 + 1 : 0,
      zodiacColor: isZodiac ? zodiacColors[Math.floor(Math.random() * zodiacColors.length)] : null,
      pulse: Math.random() * Math.PI * 2 // for shimmer effect
    });
  }

  const animate = () => {
    ctx.clearRect(0, 0, width, height);

    particles.forEach((p) => {
      p.x += p.speedX;
      p.y += p.speedY;

      // Wrap around edges
      if (p.x < 0) p.x = width;
      if (p.x > width) p.x = 0;
      if (p.y < 0) p.y = height;
      if (p.y > height) p.y = 0;

      if (p.symbol) {
        // Soft shimmer effect
        const shimmer = (Math.sin(p.pulse) * 0.3 + 0.7) * p.alpha; 
        p.pulse += 0.02;

        ctx.font = `${p.fontSize}px 'Arial', sans-serif`;
        ctx.fillStyle = p.zodiacColor;
        ctx.globalAlpha = shimmer;
        ctx.shadowColor = `${p.zodiacColor}88`;
        ctx.shadowBlur = p.glow;
        ctx.fillText(p.symbol, p.x, p.y);
        ctx.shadowBlur = 0;
        ctx.globalAlpha = 1; // reset
      } else {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.radius * 3);
        gradient.addColorStop(0, `rgba(255,255,255,${p.alpha})`);
        gradient.addColorStop(1, "rgba(255,255,255,0)");
        ctx.fillStyle = gradient;
        ctx.fill();
      }
    });

    requestAnimationFrame(animate);
  };

  animate();

  const handleResize = () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  };

  window.addEventListener("resize", handleResize);
  return () => window.removeEventListener("resize", handleResize);
}, []);
  // ===================== HOROSCOPE =====================
  useEffect(() => {
    const dummy = {
      Aries: "Today is powerful for new beginnings 🔥",
      Taurus: "Financial growth is likely today 💰",
      Gemini: "Communication brings success 📞",
      Cancer: "Focus on family and emotions ❤️",
      Leo: "Leadership and creativity shine today 🌟",
      Virgo: "Organize and plan for best results 📋",
      Libra: "Harmony and relationships are key 💛",
      Scorpio: "Passion drives success 🔮",
      Sagittarius: "Adventure and learning bring joy 🌍",
      Capricorn: "Discipline leads to growth 🏆",
      Aquarius: "Innovation is your strength ⚡",
      Pisces: "Intuition guides your day 🌊",
    };
    setHoroscope(dummy[zodiac] || "Great day ahead 🌟");
  }, [zodiac]);
  // ===================== KUNDALI PREVIEW =====================
  const generatePreview = () => {
    setKundaliPreview({
      sun: "Libra",
      moon: "Scorpio",
      message: "Strong personality with leadership traits 🔮",
    });
  };
  // ===================== FORM HANDLERS =====================
  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
  const sendToWhatsApp = () => {
    const msg = `Hi, I want Kundali consultation.
Name: ${formData.name}
Phone: ${formData.phone}
DOB: ${formData.dob}
Time: ${formData.time}
Place: ${formData.place}`;
    window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(msg)}`);
  };
  const scrollToSection = (id) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
      setMenuOpen(false);
    }
  };
  // ===================== JSX =====================
  return (
    <div style={{ position: "relative", overflow: "hidden" }}>
      {/* Particle canvas */}
      <canvas
        ref={canvasRef}
        style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", zIndex: 1, pointerEvents: "none" }}
      />
     

 {/* HEADER */}
      <header className="header premium-header" style={{ justifyContent: "flex-start" }}>
        <div className="logo-wrap" style={{ display: "flex", alignItems: "center" }}>
          <img src={logo} alt="logo" className="logo-img-small" />
          <span className="logo-text" style={{ color: "white", fontWeight: "bold" }}>RV Astro Vastu</span>
        </div>
        <nav className={menuOpen ? "nav open" : "nav"} style={{ marginLeft: "50px" }}>
          <span onClick={() => scrollToSection("about")}>About</span>
          <span onClick={() => scrollToSection("services")}>Services</span>
          <span onClick={() => scrollToSection("kundaliForm")}>Consultation</span>
        </nav>
        <div className="hamburger" onClick={() => setMenuOpen(!menuOpen)} style={{ marginLeft: "auto" }}>☰</div>
      </header>
     
 {/* HERO */}
      <section className="hero">
        <motion.img src={logo} className="hero-logo" alt="RV Astro Vastu Logo" />
        <h1 className="premium-title">Get Your FREE Kundali 🔮</h1>
        <p className="tagline">Accurate Predictions • Vastu • Life Guidance</p>
        <div className="button-group">
          <button className="gold-btn" onClick={sendToWhatsApp}>💬 Free Consultation</button>
          <button className="outline-btn" onClick={() => navigate("/kundali")}>📊 Generate Kundali</button>
        </div>
      </section>
      {/* ABOUT */}
      <section id="about" className="section">
        <h2>About Us</h2>
        <p>We combine ancient Vedic astrology with modern insights to guide your life.</p>
      </section>
      {/* SERVICES */}
      <section id="services" className="section">
        <h2>Our Services</h2>
        <div className="services-grid">
          <div className="glass-card">
            <h3>Kundali Analysis</h3>
            <p>Detailed birth chart reading.</p>
          </div>
          <div className="glass-card">
            <h3>Vastu Consultation</h3>
            <p>Balance your home energy.</p>
          </div>
          <div className="glass-card">
            <h3>Love & Marriage</h3>
            <p>Solve relationship issues.</p>
          </div>
        </div>
      </section>
      {/* HOROSCOPE */}
      <section className="section">
        <h2>Today's Horoscope 🔮</h2>
        <select value={zodiac} onChange={(e) => setZodiac(e.target.value)}>
          {Object.keys({
            Aries:1,Taurus:1,Gemini:1,Cancer:1,Leo:1,Virgo:1,Libra:1,Scorpio:1,Sagittarius:1,Capricorn:1,Aquarius:1,Pisces:1
          }).map((z, i) => (
            <option key={i} value={z}>{z}</option>
          ))}
        </select>
        <div className="glass-card">
          {horoscope}
        </div>
      </section>
      {/* KUNDALI PREVIEW */}
      <section className="section">
        <h2>Free Kundali Preview</h2>
        <button className="gold-btn" onClick={generatePreview}>Generate Preview</button>
        {kundaliPreview && (
          <div className="kundali-preview">
            <p>Sun Sign: {kundaliPreview.sun}</p>
            <p>Moon Sign: {kundaliPreview.moon}</p>
            <p>{kundaliPreview.message}</p>
            <button className="gold-btn" onClick={sendToWhatsApp}>Unlock Full Report 🔓</button>
          </div>
        )}
      </section>
      {/* CONTACT */}
      <section id="contact" className="contact-section">
        <h2>Get Your Kundali</h2>
        <form className="contact-form">
          <input name="name" placeholder="Full Name" required onChange={handleChange} />
          <input name="phone" placeholder="Phone" required onChange={handleChange} />
          <input name="dob" type="date" required onChange={handleChange} />
          <input name="time" type="time" required onChange={handleChange} />
          <input name="place" placeholder="Birth Place" required onChange={handleChange} />
          <button type="button" className="gold-btn" onClick={sendToWhatsApp}>🔮 Get Report</button>
        </form>
      </section>
      {/* WHATSAPP FLOAT */}
      <div className="whatsapp-float" onClick={sendToWhatsApp}>💬</div>
      {/* POPUP */}
      {showPopup && (
        <div className="popup">
          <div className="popup-box glass-card">
            <h3>Get FREE Kundali 🔮</h3>
            <button className="gold-btn" onClick={sendToWhatsApp}>Claim Now</button>
            <span onClick={() => setShowPopup(false)}>✖</span>
          </div>
        </div>
      )}
      {/* FOOTER */}
      <footer className="footer premium-footer">
        © 2026 RV Astro Vastu
      </footer>
    </div>
  );
}
export default Home;