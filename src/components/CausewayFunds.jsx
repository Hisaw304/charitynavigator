// ========================================
// CausewayFunds.jsx
// ========================================

import { motion } from "framer-motion";

import womenImg from "../assets/womens-health.jpg";
import lgbtImg from "../assets/lgbtq-support.jpg";
import homelessImg from "../assets/homelessness.jpg";

const funds = [
  {
    image: womenImg,
    title: "Womens Health & Wellbeing Fund",
    description:
      "Our fund supports a group of nonprofits advancing proven solutions for women’s health, including reproductive and maternal care, mental health, prevention, and other historically underfunded needs.",
  },
  {
    image: lgbtImg,
    title: "LGBTQIA+ Support Fund",
    description:
      "Our LGBTQIA+ Fund is a powerful solution, supporting organizations that deliver life-saving services, affirming care, youth empowerment, and long-term legal and policy change.",
  },
  {
    image: homelessImg,
    title: "End Homelessness Fund",
    description:
      "Our End Homelessness Fund supports charities that address the causes of homelessness and implement solutions to increase the availability of affordable housing.",
  },
];

export default function CausewayFunds() {
  return (
    <section className="cn-funds">
      <div className="cn-funds-container">
        <div className="cn-funds-top">
          <div>
            <span className="cn-funds-subtitle">Curated Giving</span>

            <h2 className="cn-funds-title">Causeway Funds</h2>
          </div>

          <button className="cn-funds-view-btn">View All</button>
        </div>

        <div className="cn-funds-grid">
          {funds.map((fund, index) => (
            <motion.div
              key={index}
              className="cn-fund-card"
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.5,
                delay: index * 0.15,
              }}
            >
              <div className="cn-fund-image-wrap">
                <img
                  src={fund.image}
                  alt={fund.title}
                  className="cn-fund-image"
                />
              </div>

              <div className="cn-fund-content">
                <h3>{fund.title}</h3>

                <p>{fund.description}</p>

                <button className="cn-fund-btn">Explore Fund</button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
