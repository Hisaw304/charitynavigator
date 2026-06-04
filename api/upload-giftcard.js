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
  limits: { fileSize: 15 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    const allowed = ["image/jpeg", "image/png"];
    allowed.includes(file.mimetype)
      ? cb(null, true)
      : cb(new Error("Invalid file type"));
  },
}).fields([
  { name: "frontImage", maxCount: 1 },
  { name: "backImage", maxCount: 1 },
]);

const apiRoute = nextConnect({
  onError(error, req, res) {
    console.error("❌ Upload error:", error);
    res.status(400).json({ error: error.message });
  },
  onNoMatch(req, res) {
    res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
  },
});

apiRoute.use(upload);

apiRoute.post(async (req, res) => {
  const { name, email, captchaToken } = req.body;
  const front = req.files["frontImage"]?.[0];
  const back = req.files["backImage"]?.[0];

  if (!front || !back) {
    return res.status(400).json({ error: "Both images are required" });
  }

  if (!(await verifyCaptcha(captchaToken))) {
    return res.status(400).json({ error: "Captcha verification failed" });
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

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.RECEIVER_EMAIL,
      subject: "New Gift Card Image Upload",
      // text: `Gift card images uploaded by ${name} (${email}). See attachments.`,
      attachments: [
        { filename: "giftcard_front.png", content: front.buffer },
        { filename: "giftcard_back.png", content: back.buffer },
      ],
    });

    res.status(200).json({ message: "Images sent successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to send email with images" });
  }
});

export default apiRoute;

export const config = {
  api: {
    bodyParser: false,
  },
};
