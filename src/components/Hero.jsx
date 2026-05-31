// ========================================
// Hero.jsx
// ========================================

import { motion } from "framer-motion";

// MAIN HERO IMAGE
import heroMain from "../assets/hero-main.jpg";
import { Link } from "react-router-dom";
// FLOATING IMAGES
import heroSmallOne from "../assets/hero-small-1.jpg";
import heroSmallTwo from "../assets/hero-small-2.jpg";
import heroSmallThree from "../assets/hero-small-3.jpg";

export default function Hero() {
  return (
    <section className="cn-hero">
      {/* DECORATION */}
      <div className="cn-hero-dots"></div>

      <div className="cn-hero-container">
        {/* ================= LEFT CONTENT ================= */}
        <motion.div
          initial={{ opacity: 0, x: -80 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="cn-hero-content"
        >
          {/* FLOATING IMAGE 1 */}
          <motion.div
            animate={{
              y: [0, -12, 0],
              rotate: [-2, 2, -2],
            }}
            transition={{
              repeat: Infinity,
              duration: 6,
            }}
            className="cn-floating-image cn-floating-image-one"
          >
            <img src={heroSmallOne} alt="" />
          </motion.div>

          {/* FLOATING IMAGE 2 */}
          <motion.div
            animate={{
              y: [0, 12, 0],
              rotate: [2, -2, 2],
            }}
            transition={{
              repeat: Infinity,
              duration: 7,
            }}
            className="cn-floating-image cn-floating-image-two"
          >
            <img src={heroSmallTwo} alt="" />
          </motion.div>

          {/* CONTENT CARD */}
          <div className="cn-hero-card">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="cn-hero-subtitle"
            >
              Support Communities Worldwide
            </motion.span>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="cn-hero-title"
            >
              Make Every Donation Create Real Impact
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45 }}
              className="cn-hero-text"
            >
              Discover trusted charities, support meaningful causes, and help
              communities thrive through transparent giving.
            </motion.p>

            {/* BUTTONS */}

            <motion.div
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="cn-hero-buttons"
            >
              <button
                className="cn-hero-primary-btn"
                onClick={() => {
                  const el = document.getElementById("donate");
                  if (el) {
                    el.scrollIntoView({ behavior: "smooth" });
                  }
                }}
              >
                Donate Now
              </button>

              <Link to="/about">
                <button className="cn-hero-secondary-btn">Learn More</button>
              </Link>
            </motion.div>
          </div>
        </motion.div>

        {/* ================= RIGHT IMAGE ================= */}
        <motion.div
          initial={{ opacity: 0, x: 80 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="cn-hero-image-wrapper"
        >
          {/* FLOATING IMAGE 3 */}
          <motion.div
            animate={{
              y: [0, -10, 0],
              rotate: [3, -3, 3],
            }}
            transition={{
              repeat: Infinity,
              duration: 8,
            }}
            className="cn-floating-image cn-floating-image-three"
          >
            <img src={heroSmallThree} alt="" />
          </motion.div>

          {/* MAIN IMAGE */}
          <img
            src={heroMain}
            alt="Community Volunteers"
            className="cn-hero-main-image"
          />
        </motion.div>
      </div>
    </section>
  );
}
