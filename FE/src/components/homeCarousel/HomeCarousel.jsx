import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation, EffectFade } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/effect-fade";

// Import hình ảnh từ thư mục assets
import image1 from "../../assets/logo-vnvc-tet-nguyen-dan.png";
import image2 from "../../assets/logo.webp";
import image3 from "../../assets/vac-xin-pentaxim-1.jpg";

function HomeCarousel() {
  const slides = [
    { image: image1, text: "Khám phá thế giới STEM" },
    { image: image2, text: "Đổi mới và truyền cảm hứng" },
    { image: image3, text: "Trao cho thế hệ tương lai" },
  ];

  return (
    <Swiper
      autoplay={{
        delay: 5000,
        disableOnInteraction: false,
      }}
      pagination={{
        dynamicBullets: true,
        clickable: true,
      }}
      navigation={true}
      effect="fade"
      modules={[Pagination, Autoplay, Navigation, EffectFade]}
      breakpoints={{
        320: { slidesPerView: 1 }, // Điện thoại nhỏ
        640: { slidesPerView: 1 }, // Tablet dọc
        1024: { slidesPerView: 1 }, // Tablet ngang
        1280: { slidesPerView: 1 }, // Laptop
        1536: { slidesPerView: 1 }, // Desktop lớn
      }}
      className="carousel w-full h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px] xl:h-[700px]"
    >
      {slides.map((slide, index) => (
        <SwiperSlide key={index}>
          <div className="relative w-full h-full">
            {/* Ảnh nền */}
            <img
              loading="lazy"
              src={slide.image}
              alt=""
              className="w-full h-full object-cover"
            />

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>

            {/* Text với Animation và Responsive */}
            <div className="absolute inset-0 flex items-center justify-center">
              <h2 className="text-white text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold drop-shadow-lg opacity-0 animate-fadeIn">
                {slide.text}
              </h2>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}

export default HomeCarousel;
