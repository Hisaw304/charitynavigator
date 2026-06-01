import { motion } from "framer-motion";
import teamHero from "../assets/team-hero.jpg";
import staffImg from "../assets/staff.jpg";
import boardImg from "../assets/board.jpg";
import expertsImg from "../assets/experts.jpg";
import committeeImg from "../assets/committee.jpg";
import councilImg from "../assets/council.jpg";
import { Link } from "react-router-dom";
import partnerImage from "../assets/partner.jpg";
export default function OurTeam() {
  const groups = [
    {
      image: staffImg,
      title: "Staff",
      description:
        "Charity Navigator’s staff is the essential core that carries out the organization's work, translating plans into tangible services to advance the mission.",
    },
    {
      image: boardImg,
      title: "Board of Directors",
      description:
        "Our board oversees Charity Navigator’s progress toward our mission while ensuring the team has the necessary resources to continue serving donors and nonprofits.",
    },
    {
      image: expertsImg,
      title: "Expert Groups",
      description:
        "Expert Groups are composed of industry leaders, board members, and staff. These groups advise Charity Navigator on how to best reach organizational goals.",
    },
    {
      image: committeeImg,
      title: "Standing Board Committees",
      description:
        "Below is a listing of the current Charity Navigator Governance Committee with respective membership.",
    },
    {
      image: councilImg,
      title: "Consultative Council of Nonprofit Leaders",
      description:
        "This diverse team of experienced nonprofit leaders advises Charity Navigator and works collaboratively to help strengthen our current and future initiatives.",
    },
  ];
  return (
    <section>
      <section className="cn-team-hero">
        <div className="cn-team-hero-container">
          <motion.div
            className="cn-team-hero-image-wrapper"
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
          >
            <img
              src={teamHero}
              alt="Charity Navigator Team"
              className="cn-team-hero-image"
            />
          </motion.div>
          {/* LEFT CONTENT */}

          <motion.div
            className="cn-team-hero-content"
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
          >
            <span className="cn-team-hero-subtitle">OUR TEAM</span>

            <h1 className="cn-team-hero-title">
              Making Impactful Giving Easier for All
            </h1>

            <p className="cn-team-hero-text">
              Making impactful giving easier for all is a collaborative effort
              that relies on the hard work and dedication of individuals inside
              and outside of Charity Navigator.
            </p>
          </motion.div>

          {/* RIGHT IMAGE */}
        </div>
      </section>
      <section className="cn-team-groups">
        <div className="cn-team-groups-container">
          <motion.div
            className="cn-team-groups-header"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
          >
            <span>OUR PEOPLE</span>

            <h2>Meet the Teams Behind Our Mission</h2>

            <p>
              Charity Navigator’s work is powered by dedicated professionals,
              advisors, and leaders who help advance our mission of making
              impactful giving easier for everyone.
            </p>
          </motion.div>

          <div className="cn-team-groups-grid">
            {groups.map((group, index) => (
              <motion.div
                key={index}
                className="cn-team-group-card"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.1,
                }}
                viewport={{ once: true }}
              >
                <div className="cn-team-group-image">
                  <img src={group.image} alt={group.title} />
                </div>

                <div className="cn-team-group-content">
                  <h3>{group.title}</h3>

                  <p>{group.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      <section className="cn-partner-section">
        <div className="cn-partner-container">
          {/* IMAGE */}

          <motion.div
            className="cn-partner-image-wrapper"
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
          >
            <img
              src={partnerImage}
              alt="Partner With Charity Navigator"
              className="cn-partner-image"
            />
          </motion.div>

          {/* CONTENT */}

          <motion.div
            className="cn-partner-content"
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
          >
            <span className="cn-partner-subtitle">PARTNER WITH US</span>

            <h2 className="cn-partner-title">
              Explore Opportunities to Partner With Charity Navigator
            </h2>

            <p className="cn-partner-text">
              We collaborate with organizations, foundations, corporations, and
              nonprofit leaders who share our commitment to making impactful
              giving easier for all. Together, we can expand access to trusted
              information, strengthen the nonprofit sector, and help donors make
              informed decisions that create lasting change.
            </p>

            <Link to="/contact" className="cn-partner-btn">
              Contact Us
            </Link>
          </motion.div>
        </div>
      </section>
    </section>
  );
}
