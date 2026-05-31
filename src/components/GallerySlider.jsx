import { useEffect, useState } from "react";
import { motion } from "framer-motion";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

import { ChevronLeft, ChevronRight } from "lucide-react";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export default function GallerySlider() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const res = await fetch("/api/gallery-images");
        const data = await res.json();

        await Promise.all(
          data.map((item) => {
            return new Promise((resolve) => {
              const img = new Image();
              img.src = item.imageUrl;
              img.onload = resolve;
              img.onerror = resolve;
            });
          })
        );

        setImages(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, []);

  if (loading || !images.length) return null;

  return (
    <section className="cn-gallery-slider">
      <div className="cn-gallery-container">
        <motion.div
          className="cn-gallery-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
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
          </p>

          <a href="#donate" className="cn-gallery-btn">
            Donate Now
          </a>
        </motion.div>

        <div className="cn-slider-wrapper">
          <button className="cn-slider-arrow cn-prev">
            <ChevronLeft size={24} />
          </button>

          <button className="cn-slider-arrow cn-next">
            <ChevronRight size={24} />
          </button>

          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            slidesPerView={1}
            spaceBetween={24}
            speed={700}
            loop={images.length > 3}
            centeredSlides={false}
            preloadImages={true}
            watchSlidesProgress={true}
            observer={true}
            observeParents={true}
            updateOnImagesReady={true}
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
                    alt={item.title || "Gallery image"}
                    draggable="false"
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
