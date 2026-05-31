// ========================================
// GivingBasket.jsx
// ========================================

import { motion } from "framer-motion";

export default function GivingBasket() {
  return (
    <section className="cn-basket">
      <div className="cn-basket-container">
        {/* CONTENT */}

        <motion.div
          className="cn-basket-content"
          initial={{ opacity: 0, x: -60 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
        >
          <span className="cn-basket-subtitle">
            THE SMART, EASY WAY TO GIVE
          </span>

          <h2 className="cn-basket-title">Donate with the Giving Basket</h2>

          <p className="cn-basket-text">
            Charity Navigator's Giving Basket empowers you to support multiple
            charities in one convenient checkout while controlling how much of
            your information you share with each organization.
          </p>

          <a href="/about" className="cn-basket-btn">
            Learn More
          </a>
        </motion.div>

        {/* VIDEO */}

        <motion.div
          className="cn-basket-video"
          initial={{ opacity: 0, x: 60 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
        >
          <div className="cn-video-wrapper">
            <iframe
              src="https://www.youtube.com/embed/yL6BqGcxwl4"
              title="Giving Basket"
              allowFullScreen
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
