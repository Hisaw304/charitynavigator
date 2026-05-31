// ========================================
// AdminGallery.jsx
// ========================================

import { useEffect, useState } from "react";
import { Upload, Trash2, ImageIcon } from "lucide-react";

export default function AdminGallery() {
  const [title, setTitle] = useState("");
  const [image, setImage] = useState(null);

  const [galleryImages, setGalleryImages] = useState([]);

  const [loading, setLoading] = useState(false);

  const [status, setStatus] = useState("");

  // ===============================
  // FETCH IMAGES
  // ===============================

  const fetchImages = async () => {
    try {
      const res = await fetch("/api/gallery-images");

      const data = await res.json();

      setGalleryImages(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchImages();
  }, []);

  // ===============================
  // UPLOAD
  // ===============================

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!image) return;

    setLoading(true);
    setStatus("");

    try {
      const formData = new FormData();

      formData.append("title", title);
      formData.append("image", image);

      const res = await fetch("/api/gallery-upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Upload failed");
      }

      setStatus("✅ Image uploaded successfully");

      setTitle("");
      setImage(null);

      fetchImages();
    } catch (error) {
      setStatus("❌ " + error.message);
    } finally {
      setLoading(false);
    }
  };

  // ===============================
  // DELETE
  // ===============================

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Delete this image?");

    if (!confirmDelete) return;

    try {
      const res = await fetch("/api/gallery-delete", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error);
      }

      fetchImages();
    } catch (error) {
      console.error(error);
      alert("Failed to delete image");
    }
  };

  return (
    <section className="cn-admin-gallery">
      <div className="cn-admin-container">
        {/* HEADER */}

        <div className="cn-admin-header">
          <span>Gallery Manager</span>

          <h2>Upload Gallery Photos</h2>

          <p>
            Add images that automatically appear in the homepage gallery slider.
          </p>
        </div>

        {/* FORM */}

        <form className="cn-gallery-form" onSubmit={handleSubmit}>
          <div className="cn-upload-box">
            <ImageIcon size={40} />

            <p>Choose an image to upload</p>

            <input
              type="file"
              accept="image/*"
              onChange={(e) => setImage(e.target.files[0])}
              required
            />
          </div>

          <input
            type="text"
            placeholder="Photo Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          {status && <p className="cn-gallery-status">{status}</p>}

          <button type="submit" disabled={loading}>
            <Upload size={18} />

            {loading ? "Uploading..." : "Upload Photo"}
          </button>
        </form>

        {/* GALLERY */}

        <div className="cn-gallery-grid">
          {galleryImages.length === 0 && <p>No images uploaded yet.</p>}

          {galleryImages.map((item) => (
            <div key={item._id} className="cn-gallery-card">
              <img src={item.imageUrl} alt={item.title} />

              <div className="cn-gallery-overlay">
                <button onClick={() => handleDelete(item._id)}>
                  <Trash2 size={18} />
                </button>
              </div>

              {item.title && (
                <div className="cn-gallery-title">{item.title}</div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
