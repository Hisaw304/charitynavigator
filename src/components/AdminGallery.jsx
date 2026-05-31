// ========================================
// AdminGallery.jsx
// ========================================

import { useState } from "react";
import { Upload, Trash2, ImageIcon } from "lucide-react";

export default function AdminGallery() {
  const [title, setTitle] = useState("");
  const [image, setImage] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log({
      title,
      image,
    });

    // Upload to backend later

    setTitle("");
    setImage(null);
  };

  return (
    <section className="cn-admin-gallery">
      <div className="cn-admin-container">
        <div className="cn-admin-header">
          <span>Gallery Manager</span>

          <h2>Upload Gallery Photos</h2>

          <p>
            Add images that will automatically appear in the homepage gallery
            slider.
          </p>
        </div>

        {/* Upload Form */}

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

          <button type="submit">
            <Upload size={18} />
            Upload Photo
          </button>
        </form>

        {/* Uploaded Images */}

        <div className="cn-gallery-grid">
          <div className="cn-gallery-card">
            <img
              src="https://images.unsplash.com/photo-1593113598332-cd59a93b2d4f"
              alt=""
            />

            <div className="cn-gallery-overlay">
              <button>
                <Trash2 size={18} />
              </button>
            </div>
          </div>

          <div className="cn-gallery-card">
            <img
              src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c"
              alt=""
            />

            <div className="cn-gallery-overlay">
              <button>
                <Trash2 size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
