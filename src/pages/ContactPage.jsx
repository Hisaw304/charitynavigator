// ========================================
// ContactPage.jsx
// ========================================

import { motion } from "framer-motion";
import heroImage from "../assets/careers.jpg";
import { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import Faq from "../components/Faq";
import NonprofitsFaq from "../components/NonprofitsFaq";

const position = [42.0597, -93.8802]; // Boone, IA

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Something went wrong.");
      }

      setSuccess(
        "Thank you for contacting Charity Navigator. We'll get back to you soon."
      );

      setFormData({
        name: "",
        email: "",
        message: "",
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <section
        className="cn-contact-hero"
        style={{
          backgroundImage: `url(${heroImage})`,
        }}
      >
        <div className="cn-contact-overlay"></div>

        <div className="cn-contact-hero-container">
          <motion.div
            className="cn-contact-hero-content"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <span className="cn-contact-subtitle">Charity Navigator</span>

            <h1 className="cn-contact-title">Contact Us</h1>

            <p className="cn-contact-text">
              We'd love to hear from you. Whether you're a donor, nonprofit,
              partner, or member of the media, our team is here to help.
            </p>

            <a href="#contact" className="cn-contact-btn">
              Reach Out To Us
            </a>
          </motion.div>
        </div>
      </section>
      <section className="cn-contact-section">
        <div className="cn-contact-container">
          {/* FORM */}

          <motion.div
            className="cn-contact-form-wrapper"
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
          >
            <span className="cn-contact-label">Get In Touch</span>

            <h2 className="cn-contact-heading">We'd Love To Hear From You</h2>

            <p className="cn-contact-description">
              Have questions about Charity Navigator, partnerships, donations,
              or our ratings? Send us a message and we'll get back to you.
            </p>

            <form
              id="contact"
              className="cn-contact-form"
              onSubmit={handleSubmit}
            >
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                value={formData.name}
                onChange={handleChange}
                required
              />

              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleChange}
                required
              />

              <textarea
                rows="6"
                name="message"
                placeholder="Write your message..."
                value={formData.message}
                onChange={handleChange}
                required
              />

              {error && <p className="cn-form-error">{error}</p>}

              {success && <p className="cn-form-success">{success}</p>}

              <button type="submit" disabled={loading}>
                {loading ? "Sending..." : "Send Message"}
              </button>
            </form>
          </motion.div>

          {/* MAP */}

          <motion.div
            className="cn-contact-map-wrapper"
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
          >
            <div className="cn-map-card">
              <div className="cn-map-info">
                <h3>Mailing Address</h3>

                <p>PO Box 5117</p>
                <p>Boone, IA 50950</p>
              </div>

              <MapContainer
                center={position}
                zoom={12}
                scrollWheelZoom={false}
                className="cn-leaflet-map"
              >
                <TileLayer
                  attribution="&copy; OpenStreetMap contributors"
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                <Marker position={position}>
                  <Popup>
                    Charity Navigator
                    <br />
                    Boone, IA 50950
                  </Popup>
                </Marker>
              </MapContainer>
            </div>
          </motion.div>
        </div>
      </section>
      <Faq />
      <NonprofitsFaq />
    </>
  );
};

export default ContactPage;
