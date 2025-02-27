import Navbar from "../Navbar/Navbar";
import Topbar from "../Topbar/Topbar";

export default function Header() {
  return (
    <header className="grid grid-rows-2 gap-4 mx-auto w-full">
      <div className="bg-[linear-gradient(180deg,_rgba(10,_62,_173,_1)_0%,_rgba(4,_87,_229,_1)_100%)] !py-6">
        <Topbar />
      </div>
      <div className="h-0">
        <Navbar />
      </div>
    </header>
  );
}
