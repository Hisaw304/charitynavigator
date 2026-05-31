// ========================================
// Navbar.jsx
// ========================================

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, HeartHandshake } from "lucide-react";
import { Link } from "react-router-dom";

const navLinks = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
  { name: "Contact", path: "/contact" },
  { name: "Donate", path: "/donate" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      {/* ================= TOP BAR ================= */}
      <div className="cn-topbar">
        <div className="cn-container cn-topbar-content">
          <p className="cn-topbar-text">Non Profit Organization</p>

          <a href="/donate" className="cn-support-btn">
            <HeartHandshake size={18} />
            Support Charity Navigator Now
          </a>
        </div>
      </div>

      {/* ================= NAVBAR ================= */}
      <header className="cn-navbar">
        <div className="cn-container cn-navbar-content">
          {/* LOGO */}
          <Link to="/" className="cn-logo">
            <span>Charity</span> Navigator
          </Link>

          {/* DESKTOP NAV */}
          <nav className="cn-navlinks">
            {navLinks.map((link, index) => (
              <Link key={index} to={link.path} className="cn-navlink">
                {link.name}
              </Link>
            ))}
          </nav>

          {/* DONATE BUTTON */}
          <Link to="/donate" className="cn-donate-btn">
            Donate Now
          </Link>

          {/* MOBILE MENU BUTTON */}
          <motion.button
            whileTap={{ scale: 0.9 }}
            animate={{ rotate: menuOpen ? 90 : 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => setMenuOpen(!menuOpen)}
            className="cn-menu-btn"
          >
            {menuOpen ? <X size={28} /> : <Menu size={28} />}
          </motion.button>
        </div>

        {/* ================= MOBILE MENU ================= */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.3 }}
              className="cn-mobile-menu"
            >
              {navLinks.map((link, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.08 }}
                >
                  <Link
                    to={link.path}
                    className="cn-mobile-link"
                    onClick={() => setMenuOpen(false)}
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}

              <Link
                to="/donate"
                className="cn-mobile-donate-btn"
                onClick={() => setMenuOpen(false)}
              >
                Donate Now
              </Link>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
}
