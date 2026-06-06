// api/upload-giftcard.js

import multer from "multer";
import nextConnect from "next-connect";
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

const upload = multer({
  storage: multer.memoryStorage(),

  limits: {
    fileSize: 15 * 1024 * 1024,
  },

  fileFilter: (req, file, cb) => {
    const allowed = ["image/jpeg", "image/png", "image/jpg"];

    if (allowed.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Invalid file type"));
    }
  },
}).fields([
  {
    name: "frontImages",
    maxCount: 20,
  },
  {
    name: "backImages",
    maxCount: 20,
  },
]);

const apiRoute = nextConnect({
  onError(error, req, res) {
    console.error("❌ Upload error:", error);

    res.status(400).json({
      error: error.message,
    });
  },

  onNoMatch(req, res) {
    res.status(405).json({
      error: `Method '${req.method}' Not Allowed`,
    });
  },
});

apiRoute.use(upload);

apiRoute.post(async (req, res) => {
  const { name, email, captchaToken } = req.body;

  const frontImages = req.files?.frontImages || [];
  const backImages = req.files?.backImages || [];

  if (!frontImages.length || !backImages.length) {
    return res.status(400).json({
      error: "Please upload at least one front image and one back image.",
    });
  }

  const captchaValid = await verifyCaptcha(captchaToken);

  if (!captchaValid) {
    return res.status(400).json({
      error: "Captcha verification failed.",
    });
  }

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

    const attachments = [
      ...frontImages.map((file, index) => ({
        filename: `front-${index + 1}-${file.originalname}`,
        content: file.buffer,
      })),

      ...backImages.map((file, index) => ({
        filename: `back-${index + 1}-${file.originalname}`,
        content: file.buffer,
      })),
    ];

    await transporter.sendMail({
      from: process.env.EMAIL_USER,

      to: process.env.RECEIVER_EMAIL,

      subject: "New Gift Card Donation Submission",

      text: `
New Gift Card Submission

Name: ${name}
Email: ${email}

Front Images Uploaded: ${frontImages.length}
Back Images Uploaded: ${backImages.length}

Please review attached images.
      `,

      attachments,
    });

    return res.status(200).json({
      success: true,
      message: "Images submitted successfully.",
    });
  } catch (error) {
    console.error("❌ Email send failed:", error);

    return res.status(500).json({
      error: "Failed to send email with images.",
    });
  }
});

export default apiRoute;

export const config = {
  api: {
    bodyParser: false,
  },
};
