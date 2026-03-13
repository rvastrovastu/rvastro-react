// src/components/Navbar.js
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav style={{padding:"20px", background:"#2c0b3f"}}>
      <Link style={{margin:"10px", color:"white"}} to="/">Home</Link>
      <Link style={{margin:"10px", color:"white"}} to="/kundali">Kundali</Link>
      <Link style={{margin:"10px", color:"white"}} to="/vastu">Vastu</Link>
      <Link style={{margin:"10px", color:"white"}} to="/matching">Matching</Link>
      <Link style={{margin:"10px", color:"white"}} to="/muhurat">Muhurat</Link>
      <Link style={{margin:"10px", color:"white"}} to="/gemstone">Gemstone</Link>
    </nav>
  );
}

export default Navbar;