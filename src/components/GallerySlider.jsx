// ========================================
// GallerySlider.jsx
// ========================================

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function GallerySlider() {
  const [images, setImages] = useState([]);
  const [current, setCurrent] = useState(0);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);

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
    if (images.length === 0) return;

    const interval = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => clearInterval(interval);
  }, [current, images]);

  // ========================
  // NAVIGATION
  // ========================

  const nextSlide = () => {
    setCurrent((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrent((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  // ========================
  // SWIPE SUPPORT
  // ========================

  const minSwipeDistance = 50;

  const onTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;

    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) nextSlide();

    if (isRightSwipe) prevSlide();
  };

  if (!images.length) return null;

  return (
    <section className="cn-gallery-slider">
      <div
        className="cn-slider-wrapper"
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={images[current]._id}
            className="cn-slide"
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
          >
            <img src={images[current].imageUrl} alt={images[current].title} />

            {images[current].title && (
              <div className="cn-slide-content">
                <h3>{images[current].title}</h3>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Arrows */}

        <button className="cn-slider-arrow cn-left" onClick={prevSlide}>
          <ChevronLeft size={28} />
        </button>

        <button className="cn-slider-arrow cn-right" onClick={nextSlide}>
          <ChevronRight size={28} />
        </button>
      </div>

      {/* Dots */}

      <div className="cn-slider-dots">
        {images.map((_, index) => (
          <button
            key={index}
            className={`cn-dot ${current === index ? "active" : ""}`}
            onClick={() => setCurrent(index)}
          />
        ))}
      </div>
    </section>
  );
}
