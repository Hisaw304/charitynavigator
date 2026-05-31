// models/galleryImage.js

import mongoose from "mongoose";

const galleryImageSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      default: "",
    },

    imageUrl: {
      type: String,
      required: true,
    },

    cloudinaryId: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.GalleryImage ||
  mongoose.model("GalleryImage", galleryImageSchema);
