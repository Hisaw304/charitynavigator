import { useEffect, useState } from "react";
import { motion } from "framer-motion";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

import { ChevronLeft, ChevronRight } from "lucide-react";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

// import "./GallerySlider.css";

export default function GallerySlider() {
  const [images, setImages] = useState([]);

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

  if (!images.length) return null;

  return (
    <section className="cn-gallery-slider">
      <div className="cn-gallery-container">
        {/* HEADER */}

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

        {/* SLIDER */}

        <div className="cn-slider-section">
          <button className="cn-slider-arrow cn-prev">
            <ChevronLeft size={26} />
          </button>

          <button className="cn-slider-arrow cn-next">
            <ChevronRight size={26} />
          </button>

          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            loop={true}
            speed={800}
            preloadImages={true}
            watchSlidesProgress={true}
            observer={true}
            observeParents={true}
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            navigation={{
              prevEl: ".cn-prev",
              nextEl: ".cn-next",
            }}
            pagination={{
              clickable: true,
            }}
            spaceBetween={24}
            breakpoints={{
              0: {
                slidesPerView: 1,
              },
              768: {
                slidesPerView: 2,
              },
              1200: {
                slidesPerView: 3,
              },
            }}
            className="cn-gallery-swiper"
          >
            {images.map((item) => (
              <SwiperSlide key={item._id}>
                <div className="cn-gallery-card">
                  <img
                    src={item.imageUrl}
                    alt={item.title || "Gallery"}
                    loading="lazy"
                  />

                  {item.title && (
                    <div className="cn-slide-content">
                      <h3>{item.title}</h3>
                    </div>
                  )}
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
}
