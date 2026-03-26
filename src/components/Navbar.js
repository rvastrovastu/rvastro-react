import { useState } from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav style={styles.nav}>
      <div style={styles.logo}>🔮 RVAstroVastu</div>

      <div style={styles.hamburger} onClick={() => setOpen(!open)}>
        ☰
      </div>

      <div style={{ ...styles.links, display: open ? "flex" : "" }}>
        <Link to="/">Home</Link>
        <Link to="/kundali">Kundali</Link>
        <Link to="/panchang">Panchang</Link>
        <Link to="/horoscope">Horoscope</Link>
      </div>
    </nav>
  );
}

const styles = {
  nav: {
    display: "flex",
    justifyContent: "space-between",
    padding: "15px",
    background: "#0b0f1a",
    color: "#fff",
    position: "sticky",
    top: 0
  },
  logo: { fontWeight: "bold" },
  hamburger: { display: "block", cursor: "pointer" },
  links: {
    display: "none",
    flexDirection: "column",
    gap: "10px"
  }
};