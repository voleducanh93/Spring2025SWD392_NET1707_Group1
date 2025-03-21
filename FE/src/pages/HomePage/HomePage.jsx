// import CarouselComponent from "../../components/homeCarousel/Blog";
import HomeCarousel from "../../components/homeCarousel/HomeCarousel";
import Cards from "../../components/ui/Cards";


export default function HomePage() {
  return (
    <div>
      <HomeCarousel />
      <Cards />
      {/* <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <CarouselComponent />
    </div> */}
    </div>
  );
}
