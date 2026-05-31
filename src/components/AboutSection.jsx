// ========================================
// AboutSection.jsx
// ========================================

import { motion } from "framer-motion";
import aboutImage from "../assets/atom_illo_GivingCircle.svg";

export default function AboutSection() {
  return (
    <section className="cn-about">
      <div className="cn-about-container">
        {/* IMAGE */}

        <motion.div
          className="cn-about-image"
          initial={{ opacity: 0, x: -80 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
        >
          <img src={aboutImage} alt="Who We Are" />
        </motion.div>

        {/* CONTENT */}

        <motion.div
          className="cn-about-content"
          initial={{ opacity: 0, x: 80 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
        >
          <span className="cn-about-subtitle">WHO WE ARE</span>

          <h2 className="cn-about-title">
            Charity Navigator is a research tool for anyone looking to make a
            difference.
          </h2>

          <p className="cn-about-text">
            You can use Charity Navigator to find and support thousands of
            charities that align with your passions and values.
          </p>

          <p className="cn-about-text">
            We use data from the IRS, partners, and the charities themselves to
            power our unbiased ratings so that you can give with confidence.
          </p>

          <a href="/about" className="cn-about-btn">
            Learn More About Us
          </a>
        </motion.div>
      </div>
    </section>
  );
}
