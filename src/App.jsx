import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";
// Pages
import Home from "./pages/Home";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import AdminSettings from "./pages/AdminSettings";
import DonatePage from "./pages/DonatePage";

export default function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <ScrollToTop />

      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/donate" element={<DonatePage />} />
          <Route path="/admin" element={<AdminSettings />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}
