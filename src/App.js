// src/App.js
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Kundali from "./pages/Kundali";
import Vastu from "./pages/Vastu";
import Matching from "./pages/Matching";
import Muhurat from "./pages/Muhurat";
import Gemstone from "./pages/Gemstone";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/kundali" element={<Kundali />} />
        <Route path="/vastu" element={<Vastu />} />
        <Route path="/matching" element={<Matching />} />
        <Route path="/muhurat" element={<Muhurat />} />
        <Route path="/gemstone" element={<Gemstone />} />
      </Routes>
    </Router>
  );
}

export default App;