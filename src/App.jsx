import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

// Import halaman dan layout yang dibutuhkan
import Beranda from "./pages/web/beranda"

function App() {
  return (
    <Router>
      <Routes>
        {/* Rute untuk halaman beranda dengan menggunakan WebLayout */}
        <Route path="/" element={<Beranda />} />
      </Routes>
    </Router>
  );
}

export default App;
