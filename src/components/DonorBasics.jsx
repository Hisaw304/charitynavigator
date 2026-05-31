// ========================================
// DonorBasics.jsx
// ========================================

import { motion } from "framer-motion";
import givingImg from "../assets/module_illo_giving101-a-4.svg";
import whereImg from "../assets/module_illo_giving101-a-3.svg";
import toolsImg from "../assets/module_illo_giving101-a.svg";

const donorCards = [
  {
    image: givingImg,
    category: "Protect Your Giving",
    title: "Giving 101",
    description:
      "Just starting out with giving? Look here for questions to ask a charity, strategies for maximizing your donation, and more.",
  },
  {
    image: whereImg,
    category: "Where to Give",
    title: "Where to Give",
    description:
      "Discover and support organizations responding to current events and crises.",
  },
  {
    image: toolsImg,
    category: "Donor Tools",
    title: "Donor Tools",
    description:
      "Whether you're a new donor or a seasoned philanthropist, use these tools to help make the most of your giving.",
  },
];

export default function DonorBasics() {
  return (
    <section className="cn-donor">
      <div className="cn-donor-container">
        <div className="cn-donor-top">
          <div>
            <span className="cn-donor-subtitle">Giving Resources</span>

            <h2 className="cn-donor-title">Donor Basics</h2>
          </div>

          <button className="cn-donor-view-btn">See More</button>
        </div>

        <div className="cn-donor-grid">
          {donorCards.map((card, index) => (
            <motion.div
              key={index}
              className="cn-donor-card"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.5,
                delay: index * 0.15,
              }}
            >
              <div className="cn-donor-image-wrap">
                <img
                  src={card.image}
                  alt={card.title}
                  className="cn-donor-image"
                />
              </div>

              <div className="cn-donor-content">
                <span className="cn-donor-category">{card.category}</span>

                <h3>{card.title}</h3>

                <p>{card.description}</p>

                <button className="cn-donor-btn">Learn More →</button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
