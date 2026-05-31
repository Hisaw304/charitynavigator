import formidable from "formidable";
import fs from "fs";

import { connectDB } from "./db.js";
import cloudinary from "./cloudinary.js";

import GalleryImage from "../models/galleryImage.js";

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  await connectDB();

  if (req.method !== "POST") {
    return res.status(405).json({
      error: "Method not allowed",
    });
  }

  try {
    const form = formidable({ multiples: false });

    const [fields, files] = await form.parse(req);

    const title = fields.title?.[0] || "";

    const imageFile = files.image?.[0];

    if (!imageFile) {
      return res.status(400).json({
        error: "Image required",
      });
    }

    const uploadResult = await cloudinary.uploader.upload(imageFile.filepath, {
      folder: "charity-navigator-gallery",
    });

    const image = await GalleryImage.create({
      title,
      imageUrl: uploadResult.secure_url,
      cloudinaryId: uploadResult.public_id,
    });

    return res.status(201).json(image);
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      error: "Upload failed",
    });
  }
}
