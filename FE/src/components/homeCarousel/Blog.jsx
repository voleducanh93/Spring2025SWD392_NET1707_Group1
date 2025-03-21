import  { useState } from "react";
import { Container, Typography, Card, CardContent, CardMedia } from "@mui/material";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const newsData = [
  {
    id: 1,
    title: "Vắc xin COVID-19 thế hệ mới",
    description: "Vắc xin thế hệ mới đang được thử nghiệm và có hiệu quả cao hơn.",
    image: "src/assets/vac-xin-covid-19.jpg",
  },
  {
    id: 2,
    title: "Lịch tiêm chủng cho trẻ em",
    description: "Bộ Y tế công bố lịch tiêm chủng mới dành cho trẻ em dưới 5 tuổi.",
    image: "./assets/vac-xin-covid-19.jpg",
  },
  {
    id: 3,
    title: "Vắc xin cúm mùa mới nhất",
    description: "Vắc xin cúm mùa 2025 đã sẵn sàng với hiệu quả cao hơn.",
    image: "./assets/vac-xin-covid-19.jpg",
  },
  {
    id: 4,
    title: "Tiêm chủng và miễn dịch cộng đồng",
    description: "Tầm quan trọng của việc tiêm chủng để đạt miễn dịch cộng đồng.",
    image: "./assets/vac-xin-covid-19.jpg",
  },
];

const CarouselComponent = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % newsData.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? newsData.length - 1 : prevIndex - 1));
  };

  return (
    <Container sx={{ mt: 5, position: "relative" }}>
      {/* Tiêu đề */}
      <div className="!flex !justify-between !items-center !mb-4">
        <Typography
          variant="h5"
          sx={{
            fontWeight: "bold",
            color: "#2A388F",
            borderBottom: "2px solid #2A388F",
            paddingBottom: "4px",
          }}
        >
          Tin Tức Mới Nhất
        </Typography>
      </div>

      {/* Carousel */}
      <div className="!relative !w-full !max-w-3xl !mx-auto !overflow-hidden">
        {newsData.map((news, index) => (
          <motion.div
            key={news.id}
            className={`!absolute !w-full !transition-opacity ${index === currentIndex ? "!opacity-100" : "!opacity-0"}`}
            animate={{ opacity: index === currentIndex ? 1 : 0 }}
            transition={{ duration: 0.5 }}
          >
            <Link to={`/news/${news.id}`} className="!no-underline">
              <Card className="!max-w-lg !mx-auto !shadow-lg !rounded-xl !bg-gray-100">
                <CardMedia
                  component="img"
                  alt={news.title}
                  height="250"
                  image={news.image}
                  className="!rounded-t-xl"
                />
                <CardContent>
                  <Typography
                    gutterBottom
                    variant="h6"
                    component="div"
                    className="!font-bold !text-[#2A388F]"
                  >
                    {news.title}
                  </Typography>
                  <Typography variant="body2" className="!text-gray-600 !text-sm !leading-5">
                    {news.description}
                  </Typography>
                </CardContent>
              </Card>
            </Link>
          </motion.div>
        ))}
      </div>

      {/* Nút Trái */}
      <button onClick={prevSlide} className="!absolute !left-4 !top-1/2 !transform !-translate-y-1/2 !bg-black/50 !text-white !p-2 !rounded-full">
        ❮
      </button>

      {/* Nút Phải */}
      <button onClick={nextSlide} className="!absolute !right-4 !top-1/2 !transform !-translate-y-1/2 !bg-black/50 !text-white !p-2 !rounded-full">
        ❯
      </button>

      {/* Chấm tròn phân trang */}
      <div className="!absolute !bottom-4 !left-1/2 !transform !-translate-x-1/2 !flex !space-x-2">
        {newsData.map((_, index) => (
          <button
            key={index}
            className={`!w-3 !h-3 !rounded-full ${index === currentIndex ? "!bg-white" : "!bg-gray-400"}`}
            onClick={() => setCurrentIndex(index)}
          />
        ))}
      </div>
    </Container>
  );
};

export default CarouselComponent;
