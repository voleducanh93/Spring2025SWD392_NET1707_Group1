import { Outlet } from "react-router-dom";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";

export default function MainLayout() {
  return (
    <div className="flex flex-col  min-h-screen">
      <Header />
      
      <main className="flex-grow">
        <Outlet />
      </main>
      <div className="">
        <Footer />
      </div>
    </div>
  );
}
