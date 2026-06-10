import nextConnect from "next-connect";
import multer from "multer";
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

const upload = multer({
  storage: multer.memoryStorage(),

  limits: {
    fileSize: 4 * 1024 * 1024, // 4MB per image
  },

  fileFilter(req, file, cb) {
    const allowedTypes = ["image/jpeg", "image/jpg", "image/png"];

    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Only JPG, JPEG and PNG images are allowed."));
    }
  },
}).fields([
  {
    name: "frontImages",
    maxCount: 1,
  },
  {
    name: "backImages",
    maxCount: 1,
  },
]);

const apiRoute = nextConnect({
  onError(error, req, res) {
    console.error("UPLOAD ERROR:", error);

    res.status(400).json({
      error: error.message,
    });
  },

  onNoMatch(req, res) {
    res.status(405).json({
      error: `Method ${req.method} not allowed`,
    });
  },
});

apiRoute.use(upload);

apiRoute.post(async (req, res) => {
  try {
    console.log("=== UPLOAD REQUEST RECEIVED ===");

    if (!process.env.RECEIVER_EMAIL) {
      return res.status(500).json({
        error: "RECEIVER_EMAIL environment variable missing",
      });
    }

    const { name, email, captchaToken } = req.body;

    const frontImage = req.files?.frontImages?.[0] || null;

    const backImage = req.files?.backImages?.[0] || null;

    console.log("Name:", name);
    console.log("Email:", email);

    if (!frontImage || !backImage) {
      return res.status(400).json({
        error: "Please upload both front and back images.",
      });
    }

    console.log(
      "Front Image:",
      frontImage.originalname,
      `${(frontImage.size / 1024 / 1024).toFixed(2)} MB`
    );

    console.log(
      "Back Image:",
      backImage.originalname,
      `${(backImage.size / 1024 / 1024).toFixed(2)} MB`
    );

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

    const attachments = [
      {
        filename: `front-${frontImage.originalname}`,
        content: frontImage.buffer,
      },
      {
        filename: `back-${backImage.originalname}`,
        content: backImage.buffer,
      },
    ];

    const totalAttachmentSize = attachments.reduce(
      (sum, file) => sum + file.content.length,
      0
    );

    console.log(
      "Total Attachment Size:",
      (totalAttachmentSize / 1024 / 1024).toFixed(2),
      "MB"
    );

    const info = await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.RECEIVER_EMAIL,
      subject: "New Gift Card Donation Submission",

      text: `
New Gift Card Donation Submission

Name: ${name}
Email: ${email}

Front Image: ${frontImage.originalname}
Back Image: ${backImage.originalname}

Please review the attached images.
      `,

      attachments,
    });

    console.log("Email Sent Successfully:", info.messageId);

    return res.status(200).json({
      success: true,
      message: "Images submitted successfully.",
    });
  } catch (err) {
    console.error("SMTP/API ERROR:", {
      message: err.message,
      code: err.code,
      command: err.command,
      response: err.response,
      responseCode: err.responseCode,
    });

    return res.status(500).json({
      error: err.message || "Failed to send email.",
    });
  }
});

export default apiRoute;

export const config = {
  api: {
    bodyParser: false,
  },
};
