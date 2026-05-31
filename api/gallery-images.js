import { connectDB } from "./db.js";
import GalleryImage from "../models/galleryImage.js";

export default async function handler(req, res) {
  await connectDB();

  if (req.method !== "GET") {
    return res.status(405).json({
      error: "Method not allowed",
    });
  }

  try {
    const images = await GalleryImage.find().sort({ createdAt: -1 });

    res.status(200).json(images);
  } catch (error) {
    res.status(500).json({
      error: "Failed to fetch images",
    });
  }
}
