import nextConnect from "next-connect";
import multer from "multer";
import nodemailer from "nodemailer";
import axios from "axios";

console.log("=== upload-giftcard route loaded ===");

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

    console.log("Captcha Result:", response.data);

    return response.data.success;
  } catch (error) {
    console.error("Captcha Error:", error.response?.data || error.message);

    return false;
  }
}

const upload = multer({
  storage: multer.memoryStorage(),

  limits: {
    fileSize: 4 * 1024 * 1024, // 4MB per file
  },

  fileFilter(req, file, cb) {
    console.log("Incoming file:", file.originalname, file.mimetype);

    const allowedTypes = ["image/jpeg", "image/jpg", "image/png"];

    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Only JPG and PNG images are allowed"));
    }
  },
}).fields([
  {
    name: "frontImages",
    maxCount: 5,
  },
  {
    name: "backImages",
    maxCount: 5,
  },
]);

const apiRoute = nextConnect({
  onError(error, req, res) {
    console.error("=== UPLOAD ERROR ===");
    console.error(error);

    res.status(400).json({
      error: error.message,
    });
  },

  onNoMatch(req, res) {
    console.log("=== METHOD NOT ALLOWED ===", req.method);

    res.status(405).json({
      error: `Method ${req.method} not allowed`,
    });
  },
});

apiRoute.use(upload);

apiRoute.post(async (req, res) => {
  console.log("================================");
  console.log("UPLOAD REQUEST RECEIVED");
  console.log("Method:", req.method);
  console.log("Content-Length:", req.headers["content-length"]);
  console.log("================================");

  try {
    if (!process.env.RECEIVER_EMAIL) {
      console.error("RECEIVER_EMAIL missing");

      return res.status(500).json({
        error: "RECEIVER_EMAIL environment variable missing",
      });
    }

    const { name, email, captchaToken } = req.body;

    console.log("Name:", name);
    console.log("Email:", email);

    const frontImages = req.files?.frontImages || [];
    const backImages = req.files?.backImages || [];

    console.log("Front Images Count:", frontImages.length);
    console.log("Back Images Count:", backImages.length);

    frontImages.forEach((file, index) => {
      console.log(
        `Front ${index + 1}:`,
        file.originalname,
        `${(file.size / 1024 / 1024).toFixed(2)} MB`
      );
    });

    backImages.forEach((file, index) => {
      console.log(
        `Back ${index + 1}:`,
        file.originalname,
        `${(file.size / 1024 / 1024).toFixed(2)} MB`
      );
    });

    if (!frontImages.length || !backImages.length) {
      console.error("Missing images");

      return res.status(400).json({
        error: "Please upload at least one front image and one back image.",
      });
    }

    console.log("Verifying captcha...");

    const captchaValid = await verifyCaptcha(captchaToken);

    console.log("Captcha Valid:", captchaValid);

    if (!captchaValid) {
      return res.status(400).json({
        error: "Captcha verification failed",
      });
    }

    console.log("Creating transporter...");

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: true,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    console.log("Verifying SMTP...");

    await transporter.verify();

    console.log("SMTP verified successfully");

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

    const totalSize = attachments.reduce(
      (sum, file) => sum + file.content.length,
      0
    );

    console.log(
      "Total Attachment Size:",
      (totalSize / 1024 / 1024).toFixed(2),
      "MB"
    );

    console.log("Sending email...");

    const info = await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.RECEIVER_EMAIL,
      subject: "New Gift Card Donation Submission",

      text: `
New Gift Card Donation Submission

Name: ${name}
Email: ${email}

Front Images: ${frontImages.length}
Back Images: ${backImages.length}

Please review attached files.
      `,

      attachments,
    });

    console.log("EMAIL SENT");
    console.log("Message ID:", info.messageId);

    return res.status(200).json({
      success: true,
      message: "Images submitted successfully",
    });
  } catch (err) {
    console.error("=== SMTP/API ERROR ===");

    console.error({
      message: err.message,
      code: err.code,
      command: err.command,
      response: err.response,
      responseCode: err.responseCode,
      stack: err.stack,
    });

    return res.status(500).json({
      error: err.message || "Failed to send email",
    });
  }
});

export default apiRoute;

export const config = {
  api: {
    bodyParser: false,
  },
};
