import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

//Rute Admin
import Dashboard from "./pages/admin/dashboard/index";
import AdminDrama from "./pages/admin/drama/index";

//Rute Web
import Beranda from "./pages/web/beranda";
import Login from "./pages/web/login";
import SignUp from "./pages/web/signup";
import Drama from "./pages/web/drama/index";

function App() {
  return (
    <Router>
      <Routes>
        {/* Rute Admin*/}
        <Route path="/admin/dashboard" element={<Dashboard />} />
        <Route path="/admin/drama" element={<AdminDrama />} />

        {/* Rute Web*/}
        <Route path="/" element={<Beranda />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/user/drama" element={<Drama />} />
      </Routes>
    </Router>
  );
}

export default App;
