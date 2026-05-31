// ========================================
// AboutPage.jsx
// ========================================

import { motion } from "framer-motion";
import { useState } from "react";
import { Plus, Minus } from "lucide-react";
import { Link } from "react-router-dom";
import methodologyImg from "../assets/methodology.jpg";
import teamImg from "../assets/team.jpg";
import leadershipImg from "../assets/leadership.jpg";
import financialsImg from "../assets/financials.jpg";
import careersImg from "../assets/careers.jpg";
import pressImg from "../assets/press.jpg";

const values = [
  {
    title: "Leadership",
    content:
      "We strive to lead the nonprofit evaluation sector with integrity, innovation, and a commitment to helping donors make informed decisions.",
  },
  {
    title: "Collaboration",
    content:
      "We work closely with donors, nonprofits, foundations, and partners to strengthen charitable giving and maximize social impact.",
  },
  {
    title: "Equity",
    content:
      "We believe all donors deserve access to trustworthy information and all nonprofits deserve a fair opportunity to demonstrate their impact.",
  },
  {
    title: "Fairness",
    content:
      "Our evaluations are objective, consistent, and grounded in data, ensuring every organization is reviewed using the same standards.",
  },
  {
    title: "Usefulness",
    content:
      "We provide fair, transparent evaluations and valuable tools to enable a diverse set of donors to find and support an ever-greater number of nonprofits they can trust.",
  },
];

const AboutPage = () => {
  const [activeIndex, setActiveIndex] = useState(4);

  const toggleItem = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className="cn-about-page">
      <div className="cn-about-page-container">
        <motion.div
          className="cn-about-intro"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <span className="cn-about-subtitle">About Charity Navigator</span>

          <h1 className="cn-about-title">About Us</h1>

          <p className="cn-about-text">
            Charity Navigator helps millions of people take action and support
            the causes they care about by connecting them to the best charities
            that align with their passions and values.
          </p>
        </motion.div>

        <motion.div
          className="cn-about-video"
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
        >
          <div className="cn-about-video-wrapper">
            <iframe
              src="https://www.youtube.com/embed/-EnNwRuqo-A"
              title="About Charity Navigator"
              allowFullScreen
            />
          </div>
        </motion.div>
      </div>

      <motion.section
        className="cn-mission"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true }}
      >
        <div className="cn-mission-container">
          <span className="cn-mission-subtitle">Our Mission</span>

          <h2 className="cn-mission-title">
            Our mission is to make impactful giving easier for all
          </h2>

          <div className="cn-mission-content">
            <p>
              Since 2001, we've empowered millions of donors by providing free
              access to data, tools, and resources to guide philanthropic
              decision-making.
            </p>

            <p>
              With more than 225,000 charities rated, our comprehensive ratings
              shine a light on the cost-effectiveness and overall health of a
              charity’s programs, including measures of stability, efficiency,
              and sustainability.
            </p>

            <p>
              The metrics inform donors of not just where their dollars are
              going but what their dollars are doing.
            </p>

            <p>
              Like the organizations we rate, we're a 501(c)(3) nonprofit, too.
              We don't charge the charities we evaluate, ensuring our ratings
              remain objective. In turn, we depend on the generosity of
              individuals, foundations, and corporations to fund our programs.
            </p>
          </div>

          <button className="cn-mission-btn">
            Download Our Five-Year Strategic Plan
          </button>
        </div>
      </motion.section>

      <motion.section
        className="cn-about-links"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true }}
      >
        <div className="cn-about-links-container">
          <div className="cn-about-links-header">
            <span className="cn-about-links-subtitle">Learn More About Us</span>

            <h2 className="cn-about-links-title">Explore Charity Navigator</h2>
          </div>

          <div className="cn-about-links-grid">
            {/* CARD 1 */}
            <div className="cn-about-card">
              <img src={methodologyImg} alt="Methodology" />

              <div className="cn-about-card-content">
                <h3>Our Methodology</h3>

                <p>
                  Find out how we rate charities, issue Advisories, and curate
                  lists of organizations working across various causes and
                  issues.
                </p>

                <Link to="/contact" className="cn-about-btn">
                  Learn More →
                </Link>
              </div>
            </div>

            {/* CARD 2 */}
            <div className="cn-about-card">
              <img src={teamImg} alt="Our Team" />

              <div className="cn-about-card-content">
                <h3>Our Team</h3>

                <p>
                  Get to know the people who keep Charity Navigator moving
                  ahead.
                </p>

                <Link to="/contact" className="cn-about-btn">
                  Learn More →
                </Link>
              </div>
            </div>

            {/* CARD 3 */}
            <div className="cn-about-card">
              <img src={leadershipImg} alt="Thought Leadership" />

              <div className="cn-about-card-content">
                <h3>Thought Leadership & News</h3>

                <p>
                  Find out what's new at Charity Navigator and gain insight into
                  the future of charitable giving.
                </p>

                <Link to="/contact" className="cn-about-btn">
                  Learn More →
                </Link>
              </div>
            </div>

            {/* CARD 4 */}
            <div className="cn-about-card">
              <img src={financialsImg} alt="Financials" />

              <div className="cn-about-card-content">
                <h3>Financials and Policies</h3>

                <p>
                  Learn how we steward your contribution to advance the ratings
                  and resources donors depend on.
                </p>

                <Link to="/contact" className="cn-about-btn">
                  Learn More →
                </Link>
              </div>
            </div>

            {/* CARD 5 */}
            <div className="cn-about-card">
              <img src={careersImg} alt="Careers" />

              <div className="cn-about-card-content">
                <h3>Careers</h3>

                <p>
                  Discover opportunities to work at Charity Navigator and apply
                  today.
                </p>

                <Link to="/contact" className="cn-about-btn">
                  Learn More →
                </Link>
              </div>
            </div>

            {/* CARD 6 */}
            <div className="cn-about-card">
              <img src={pressImg} alt="Press Room" />

              <div className="cn-about-card-content">
                <h3>Press Room</h3>

                <p>Explore our recent press coverage and media resources.</p>

                <Link to="/contact" className="cn-about-btn">
                  Learn More →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      <section className="cn-values">
        <div className="cn-values-container">
          <div className="cn-values-header">
            <span className="cn-values-subtitle">What Drives Us</span>

            <h2 className="cn-values-title">Our Values</h2>

            <p className="cn-values-text">
              These are the beliefs and principles that guide Charity Navigator
              and our team.
            </p>
          </div>

          <div className="cn-values-accordion">
            {values.map((value, index) => (
              <div
                key={index}
                className={`cn-value-item ${
                  activeIndex === index ? "active" : ""
                }`}
              >
                <button
                  className="cn-value-header"
                  onClick={() => toggleItem(index)}
                >
                  <span>{value.title}</span>

                  {activeIndex === index ? (
                    <Minus size={20} />
                  ) : (
                    <Plus size={20} />
                  )}
                </button>

                <div
                  className={`cn-value-content ${
                    activeIndex === index ? "show" : ""
                  }`}
                >
                  <p>{value.content}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </section>
  );
};

export default AboutPage;
