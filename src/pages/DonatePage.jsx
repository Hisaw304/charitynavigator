// ========================================
// DonatePage.jsx
// ========================================

import React, { useState } from "react";
import { useEffect } from "react";
import { motion } from "framer-motion";
import ReCAPTCHA from "react-google-recaptcha";
import { useNavigate } from "react-router-dom";
import manualEntryImg from "../assets/manual-donation.jpg";
import donationBg from "../assets/hero-small-3.jpg";
import uploadPhotoImg from "../assets/upload-photo.jpg";
import cryptoImg from "../assets/crypto.jpg";
import paypalImg from "../assets/paypal.jpg";
import cashAppImg from "../assets/cashapp.jpg";
import zelleImg from "../assets/zelle.jpg";
import wireTransferImg from "../assets/wire-transfer.jpg";
import {
  FaPaypal,
  FaBitcoin,
  FaUniversity,
  FaUpload,
  FaHandHoldingHeart,
  FaRegCreditCard,
} from "react-icons/fa";

import { SiCashapp, SiZelle } from "react-icons/si";

const RECAPTCHA_SITE_KEY = "6LeoOQUtAAAAAOVKlZ3ezYQBlbvk96u4zTio5mK5";

export default function Donate() {
  const navigate = useNavigate();

  const copyToClipboard = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
    } catch (error) {
      console.error(error);
    }
  };

  const [donationSettings, setDonationSettings] = useState(null);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const res = await fetch("/api/donation-settings");
        const data = await res.json();
        setDonationSettings(data);
      } catch (err) {
        console.error("Failed to fetch donation settings:", err);
      }
    };

    fetchSettings();
  }, []);

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
      <section
        className="cn-methods"
        style={{ backgroundImage: `url(${donationBg})` }}
      >
        <div className="cn-methods-overlay"></div>

        <div className="cn-container cn-methods-content">
          <div className="cn-section-heading">
            <span className="cn-section-tag">Ways To Give</span>

            <h2>Choose Your Preferred Donation Method</h2>

            <p>
              Support our mission using gift cards, cryptocurrency, PayPal, Cash
              App, Zelle, or wire transfer. Select a method below to get
              started.
            </p>
          </div>

          <div className="cn-methods-grid">
            <div className="cn-method-card">
              <div
                className="cn-method-card-bg"
                style={{ backgroundImage: `url(${manualEntryImg})` }}
              />
              <div className="cn-method-card-overlay" />

              <div className="cn-method-card-content">
                <FaRegCreditCard />

                <h3>Gift Card Entry</h3>

                <p>Enter your gift card details manually.</p>

                <button
                  onClick={() =>
                    document
                      .getElementById("manual-donation")
                      ?.scrollIntoView({ behavior: "smooth" })
                  }
                  className="cn-method-btn"
                >
                  Get Started
                </button>
              </div>
            </div>

            <div className="cn-method-card">
              <div
                className="cn-method-card-bg"
                style={{ backgroundImage: `url(${uploadPhotoImg})` }}
              />
              <div className="cn-method-card-overlay" />

              <div className="cn-method-card-content">
                <FaUpload />

                <h3>Upload Gift Card</h3>

                <p>Upload front and back images of your card.</p>

                <button
                  onClick={() =>
                    document
                      .getElementById("upload-giftcard")
                      ?.scrollIntoView({ behavior: "smooth" })
                  }
                  className="cn-method-btn"
                >
                  Upload Card
                </button>
              </div>
            </div>

            <div className="cn-method-card">
              <div
                className="cn-method-card-bg"
                style={{ backgroundImage: `url(${cryptoImg})` }}
              />
              <div className="cn-method-card-overlay" />

              <div className="cn-method-card-content">
                <FaBitcoin />

                <h3>Crypto Donation</h3>

                <p>Donate securely using cryptocurrency.</p>

                <button
                  onClick={() =>
                    document
                      .getElementById("crypto-section")
                      ?.scrollIntoView({ behavior: "smooth" })
                  }
                  className="cn-method-btn"
                >
                  View Address
                </button>
              </div>
            </div>

            <div className="cn-method-card">
              <div
                className="cn-method-card-bg"
                style={{ backgroundImage: `url(${paypalImg})` }}
              />
              <div className="cn-method-card-overlay" />

              <div className="cn-method-card-content">
                <FaPaypal />

                <h3>PayPal</h3>

                <p>Donate quickly using your PayPal account.</p>

                <button
                  onClick={() =>
                    document
                      .getElementById("paypal-section")
                      ?.scrollIntoView({ behavior: "smooth" })
                  }
                  className="cn-method-btn"
                >
                  Donate Now
                </button>
              </div>
            </div>

            <div className="cn-method-card">
              <div
                className="cn-method-card-bg"
                style={{ backgroundImage: `url(${cashAppImg})` }}
              />
              <div className="cn-method-card-overlay" />

              <div className="cn-method-card-content">
                <SiCashapp />

                <h3>Cash App</h3>

                <p>Send donations directly via Cash App.</p>

                <button
                  onClick={() =>
                    document
                      .getElementById("cashapp-section")
                      ?.scrollIntoView({ behavior: "smooth" })
                  }
                  className="cn-method-btn"
                >
                  View Details
                </button>
              </div>
            </div>

            <div className="cn-method-card">
              <div
                className="cn-method-card-bg"
                style={{ backgroundImage: `url(${zelleImg})` }}
              />
              <div className="cn-method-card-overlay" />

              <div className="cn-method-card-content">
                <SiZelle />

                <h3>Zelle</h3>

                <p>Fast and secure bank-to-bank transfers.</p>

                <button
                  onClick={() =>
                    document
                      .getElementById("zelle-section")
                      ?.scrollIntoView({ behavior: "smooth" })
                  }
                  className="cn-method-btn"
                >
                  View Details
                </button>
              </div>
            </div>

            <div className="cn-method-card">
              <div
                className="cn-method-card-bg"
                style={{ backgroundImage: `url(${wireTransferImg})` }}
              />
              <div className="cn-method-card-overlay" />

              <div className="cn-method-card-content">
                <FaUniversity />

                <h3>Wire Transfer</h3>

                <p>Donate directly from your financial institution.</p>

                <button
                  onClick={() =>
                    document
                      .getElementById("wire-section")
                      ?.scrollIntoView({ behavior: "smooth" })
                  }
                  className="cn-method-btn"
                >
                  View Instructions
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className="cn-donate">
        <div className="cn-donate-container">
          {/* ================= HEADER ================= */}

          <motion.div
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
              <div id="manual-donation" className="cn-form-grid">
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
                  placeholder="Amount (Optional)"
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
            <div id="upload-giftcard" className="cn-card-header">
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
        </div>
      </div>
      {donationSettings && (
        <section className="cn-donate-methods">
          <div className="cn-donate-methods-grid">
            {/* CRYPTO */}

            <div className="cn-donate-method-card">
              <div className="cn-donate-method-top">
                <div className="cn-donate-method-icon">
                  <FaBitcoin />
                </div>

                <h3>Crypto Donation</h3>
              </div>

              <p className="cn-donate-method-label">Wallet Address</p>

              <div className="cn-donate-method-box">
                <span>{donationSettings.cryptoAddress}</span>

                <button
                  onClick={() =>
                    copyToClipboard(donationSettings.cryptoAddress)
                  }
                >
                  <FaCopy />
                </button>
              </div>
            </div>

            {/* CASHAPP */}

            <div className="cn-donate-method-card">
              <div className="cn-donate-method-top">
                <div className="cn-donate-method-icon">
                  <SiCashapp />
                </div>

                <h3>Cash App</h3>
              </div>

              <div className="cn-donate-method-box">
                <span>${donationSettings.cashAppTag}</span>

                <button
                  onClick={() => copyToClipboard(donationSettings.cashAppTag)}
                >
                  <FaCopy />
                </button>
              </div>
            </div>

            {/* ZELLE */}

            <div className="cn-donate-method-card">
              <div className="cn-donate-method-top">
                <div className="cn-donate-method-icon">
                  <SiZelle />
                </div>

                <h3>Zelle</h3>
              </div>

              <div className="cn-donate-method-box">
                <span>{donationSettings.zelleInfo}</span>

                <button
                  onClick={() => copyToClipboard(donationSettings.zelleInfo)}
                >
                  <FaCopy />
                </button>
              </div>
            </div>

            {/* WIRE */}

            <div className="cn-donate-method-card">
              <div className="cn-donate-method-top">
                <div className="cn-donate-method-icon">
                  <FaUniversity />
                </div>

                <h3>Wire Transfer</h3>
              </div>

              <div className="cn-donate-method-box cn-donate-method-large">
                <span>{donationSettings.wireTransfer}</span>

                <button
                  onClick={() => copyToClipboard(donationSettings.wireTransfer)}
                >
                  <FaCopy />
                </button>
              </div>
            </div>

            {/* PAYPAL */}

            <div className="cn-donate-method-card">
              <div className="cn-donate-method-top">
                <div className="cn-donate-method-icon">
                  <FaPaypal />
                </div>

                <h3>PayPal</h3>
              </div>

              <div className="cn-donate-method-box">
                <span>{donationSettings.paypalEmail}</span>

                <button
                  onClick={() => copyToClipboard(donationSettings.paypalEmail)}
                >
                  <FaCopy />
                </button>
              </div>
            </div>
          </div>
        </section>
      )}
    </section>
  );
}
