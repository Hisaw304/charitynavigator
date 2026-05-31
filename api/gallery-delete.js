import { connectDB } from "./db.js";
import cloudinary from "./cloudinary.js";

import GalleryImage from "../models/galleryImage.js";

export default async function handler(req, res) {
  await connectDB();

  if (req.method !== "DELETE") {
    return res.status(405).json({
      error: "Method not allowed",
    });
  }

  try {
    const { id } = req.body;

    const image = await GalleryImage.findById(id);

    if (!image) {
      return res.status(404).json({
        error: "Image not found",
      });
    }

    await cloudinary.uploader.destroy(image.cloudinaryId);

    await GalleryImage.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
    });
  } catch (error) {
    res.status(500).json({
      error: "Delete failed",
    });
  }
}
