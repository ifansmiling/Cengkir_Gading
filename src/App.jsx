import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

//Rute Admin

//Rute Web
import Beranda from "./pages/web/beranda";
import Login from "./pages/web/login";
import SignUp from "./pages/web/signup";

function App() {
  return (
    <Router>
      <Routes>
        {/* Rute Web*/}
        <Route path="/" element={<Beranda />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </Router>
  );
}

export default App;
