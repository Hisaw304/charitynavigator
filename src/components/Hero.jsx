import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

import heroOne from "../assets/hero-small-1.jpg";
import heroTwo from "../assets/hero-small-2.jpg";
import heroThree from "../assets/hero-small-3.jpg";

export default function Hero() {
  const slides = [heroOne, heroTwo, heroThree];

  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="cn-hero">
      {/* BACKGROUND SLIDER */}
      <AnimatePresence mode="sync">
        <motion.div
          key={current}
          className="cn-hero-bg"
          style={{
            backgroundImage: `url(${slides[current]})`,
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2 }}
        />
      </AnimatePresence>

      {/* DARK OVERLAY */}
      <div className="cn-hero-overlay"></div>

      {/* CONTENT CONTAINER */}
      <div className="cn-hero-container">
        <div className="cn-hero-content">
          <motion.span
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="cn-hero-subtitle"
          >
            Support Communities Worldwide
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 35 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="cn-hero-title"
          >
            Make Every Donation Create Real Impact
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 35 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="cn-hero-text"
          >
            Discover trusted charities, support meaningful causes, and help
            communities thrive through transparent giving, financial
            accountability, and measurable impact that changes lives.
          </motion.p>

          <motion.div
            className="cn-hero-buttons"
            initial={{ opacity: 0, y: 35 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45 }}
          >
            <Link to="/donate">
              <button className="cn-hero-primary-btn">Donate Now</button>
            </Link>

            <Link to="/about">
              <button className="cn-hero-secondary-btn">Learn More</button>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
