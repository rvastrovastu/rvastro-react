import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";

const Kundali = () => (
  <div style={{ padding: "100px", textAlign: "center" }}>
    <h2>Kundali Page</h2>
  </div>
);

const Panchang = () => (
  <div style={{ padding: "100px", textAlign: "center" }}>
    <h2>Panchang Page</h2>
  </div>
);

const Horoscope = () => (
  <div style={{ padding: "100px", textAlign: "center" }}>
    <h2>Daily Horoscope Page</h2>
  </div>
);

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/kundali" element={<Kundali />} />
      <Route path="/panchang" element={<Panchang />} />
      <Route path="/horoscope" element={<Horoscope />} />
    </Routes>
  );
}

export default App;