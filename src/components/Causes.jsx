// ========================================
// Causes.jsx
// ========================================

import { motion } from "framer-motion";
import hawaiiImg from "../assets/hawaii.jpg";
import immigrantImg from "../assets/immigrant.jpg";
import gazaImg from "../assets/gaza.jpg";
import { Link } from "react-router-dom";

const causesData = [
  {
    image: hawaiiImg,
    title: "Hawaii Flooding",
    description:
      "Support nonprofits delivering urgent relief and long-term recovery across Hawaii.",
  },

  {
    image: immigrantImg,
    title: "Immigrant Support in the United States",
    description:
      "These highly rated U.S.-based charities are providing critical support to immigrants, asylum seekers, and displaced individuals navigating life in the United States.",
  },

  {
    image: gazaImg,
    title: "Humanitarian Crisis in Gaza",
    description:
      "Highly rated charities providing relief, recovery, and peace-building in Gaza.",
  },
];

export default function Causes() {
  return (
    <section className="cn-causes">
      <div className="cn-causes-container">
        {/* ================= TOP ================= */}

        <div className="cn-causes-top">
          <div>
            <span className="cn-causes-subtitle">Featured Causes</span>

            <h2 className="cn-causes-title">Discover Charities</h2>
          </div>

          <Link to="/about">
            <button className="cn-causes-view-btn">Learn More</button>
          </Link>
        </div>

        {/* ================= CARDS ================= */}

        <div className="cn-causes-grid">
          {causesData.map((cause, index) => (
            <motion.div
              key={index}
              className="cn-cause-card"
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              viewport={{ once: true }}
            >
              {/* IMAGE */}
              <div className="cn-cause-image-wrapper">
                <img
                  src={cause.image}
                  alt={cause.title}
                  className="cn-cause-image"
                />
              </div>

              {/* CONTENT */}
              <div className="cn-cause-content">
                <h3 className="cn-cause-title">{cause.title}</h3>

                <p className="cn-cause-description">{cause.description}</p>

                <Link to="/about">
                  <button className="cn-cause-btn">Learn More</button>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
