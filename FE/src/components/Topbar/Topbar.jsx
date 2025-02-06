import React from "react";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";

export default function Topbar() {
  return (
    <>
      {/* Header */}
      <header className="bg-white shadow-md w-full py-4">
        <div className="flex flex-col mx-auto md:flex-row justify-between items-center w-full px-10">
          <div className="flex items-center space-x-3">
            <img
              src="src/assets/logo-vnvc-tet-nguyen-dan.png"
              alt="VNVC Logo"
              className="h-12"
            />
            <span className="text-orange-500 text-xl font-bold">VNVC</span>
          </div>

          <div className="flex flex-col md:flex-row items-center gap-4 mt-4 md:mt-0">
            <a href="#" className="text-blue-700 flex items-center gap-1">
              <LocationOnIcon />
              <span>TÌM TRUNG TÂM VNVC</span>
            </a>
            <a href="#" className="text-blue-700 flex items-center gap-1">
              <CalendarMonthIcon />
              <span>ĐĂNG KÝ TIÊM</span>
            </a>
            <span className="text-orange-500 font-bold">
              Hotline: 028 7102 6595
            </span>
          </div>
        </div>
      </header>
    </>
  );
}
