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
    fileSize: 4 * 1024 * 1024, // 4MB per file
  },

  fileFilter(req, file, cb) {
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
    console.error("Upload Error:", error);

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
    if (!process.env.RECEIVER_EMAIL) {
      return res.status(500).json({
        error: "RECEIVER_EMAIL environment variable missing",
      });
    }

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
      ...frontImages.map((file, index) => ({
        filename: `front-${index + 1}-${file.originalname}`,
        content: file.buffer,
      })),

      ...backImages.map((file, index) => ({
        filename: `back-${index + 1}-${file.originalname}`,
        content: file.buffer,
      })),
    ];

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

Please review the attached files.
      `,

      attachments,
    });

    console.log("Email sent:", info.messageId);

    return res.status(200).json({
      success: true,
      message: "Images submitted successfully",
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
      error: "Failed to send email",
    });
  }
});

export default apiRoute;

export const config = {
  api: {
    bodyParser: false,
  },
};
