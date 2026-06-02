// ========================================
// Footer.jsx
// ========================================

import {
  FaFacebookF,
  FaInstagram,
  FaYoutube,
  FaLinkedinIn,
  FaXTwitter,
} from "react-icons/fa6";
import { Link } from "react-router-dom";
import fourStar from "../assets/four-star.png";
import bbb from "../assets/ac-s-cmyk-h-reversedwhite-w-url-01.svg";
import candid from "../assets/candid.png";

export default function Footer() {
  return (
    <footer className="cn-footer">
      <div className="cn-footer-container">
        {/* ================= TOP ================= */}
        <div className="cn-footer-top">
          {/* LEFT */}
          <div className="cn-footer-left">
            <div className="cn-footer-logo">
              <Link to="/">
                <span>Charity</span> Navigator
              </Link>
            </div>

            <div className="cn-footer-address">
              <p className="cn-footer-heading">
                Mailing address for check donations in support of Charity
                Navigator:
              </p>

              <p>Charity Navigator</p>
              <p>PO Box 5117</p>
              <p>Boone, IA 50950</p>
            </div>

            <div className="cn-footer-note">
              <strong>Note:</strong> We cannot process checks in support of
              other nonprofits. Use our Giving Basket to support other
              organizations through our website.
            </div>

            {/* CERTIFICATIONS */}
            <div className="cn-footer-certifications">
              <img src={fourStar} alt="Four Star Charity" />
              <img src={bbb} alt="BBB" />
              <img src={candid} alt="Candid GuideStar Platinum Seal 2026" />
            </div>
          </div>

          {/* RIGHT */}
          <div className="cn-footer-right">
            <a href="/">Home</a>
            <a href="/">About</a>
            <a href="/contact">FAQs / Contact Us</a>
            <a href="/">Donate</a>
            <a href="/our-team">Our Team</a>
            <a href="/privacy-policy">Privacy Policy</a>
          </div>
        </div>

        <div className="cn-footer-bottom">
          {/* SOCIALS */}
          <div className="cn-footer-socials">
            <a href="/">
              <FaFacebookF size={20} />
            </a>

            <a href="/">
              <FaXTwitter size={20} />
            </a>

            <a href="/">
              <FaInstagram size={20} />
            </a>

            <a href="/">
              <FaYoutube size={20} />
            </a>

            <a href="/">
              <FaLinkedinIn size={20} />
            </a>
          </div>

          {/* COPYRIGHT */}
          <div className="cn-footer-copy">
            Copyright ©2026 | EIN 13-4148824 | Bridge ID 3108588923
          </div>
        </div>
      </div>
    </footer>
  );
}
