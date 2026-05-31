// ========================================
// GallerySlider.jsx
// ========================================

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function GallerySlider() {
  const [images, setImages] = useState([]);
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(0);

  // ========================
  // FETCH IMAGES
  // ========================

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const res = await fetch("/api/gallery-images");
        const data = await res.json();

        setImages(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchImages();
  }, []);

  // ========================
  // AUTO SLIDE
  // ========================

  useEffect(() => {
    if (!images.length) return;

    const interval = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => clearInterval(interval);
  }, [current, images]);

  // ========================
  // NAVIGATION
  // ========================

  const nextSlide = () => {
    setDirection(1);

    setCurrent((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setDirection(-1);

    setCurrent((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  // ========================
  // DRAG / SWIPE
  // ========================

  const handleDragEnd = (event, info) => {
    if (info.offset.x < -100) {
      nextSlide();
    }

    if (info.offset.x > 100) {
      prevSlide();
    }
  };

  if (!images.length) return null;

  return (
    <section className="cn-gallery-slider">
      <div className="cn-gallery-container">
        {/* ================= HEADING ================= */}

        <motion.div
          className="cn-gallery-header"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
        >
          <span className="cn-gallery-subtitle">
            Real Impact, Real Communities
          </span>

          <h2 className="cn-gallery-title">
            See How Your Support Creates Change
          </h2>

          <p className="cn-gallery-text">
            Every contribution helps nonprofits deliver life-changing services,
            strengthen communities, and create opportunities for people in need.
            Together, we can build a brighter future through informed and
            impactful giving.
          </p>

          <a href="#donate" className="cn-gallery-btn">
            Donate Now
          </a>
        </motion.div>

        {/* ================= SLIDER ================= */}

        <div className="cn-slider-wrapper">
          <AnimatePresence mode="wait">
            <motion.div
              key={images[current]._id}
              className="cn-slide"
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              onDragEnd={handleDragEnd}
              initial={{
                x: direction > 0 ? 400 : -400,
                opacity: 0,
              }}
              animate={{
                x: 0,
                opacity: 1,
              }}
              exit={{
                x: direction > 0 ? -400 : 400,
                opacity: 0,
              }}
              transition={{
                duration: 0.5,
                ease: "easeInOut",
              }}
            >
              <img src={images[current].imageUrl} alt={images[current].title} />

              {images[current].title && (
                <div className="cn-slide-content">
                  <h3>{images[current].title}</h3>
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          {/* ARROWS */}

          <button className="cn-slider-arrow cn-left" onClick={prevSlide}>
            <ChevronLeft size={28} />
          </button>

          <button className="cn-slider-arrow cn-right" onClick={nextSlide}>
            <ChevronRight size={28} />
          </button>
        </div>

        {/* DOTS */}

        <div className="cn-slider-dots">
          {images.map((_, index) => (
            <button
              key={index}
              className={`cn-dot ${current === index ? "active" : ""}`}
              onClick={() => {
                setDirection(index > current ? 1 : -1);
                setCurrent(index);
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
