import React from "react";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";

export default function Topbar() {
  return (
    <>
      {/* Header */}
      <header className="bg-white shadow-md p-4 flex justify-between items-center w-full">
        <div className="flex items-center space-x-2">
          <img
            src="src\assets\logo-vnvc-tet-nguyen-dan.png"
            alt="VNVC Logo"
            className="h-10"
          />
          <span className="text-orange-500 text-xl font-bold">VNVC</span>
        </div>
        <div className="flex space-x-6 items-center">
          <a href="#" className="text-blue-700 flex items-center space-x-1">
            <LocationOnIcon className="" />
            <span>TÌM TRUNG TÂM VNVC</span>
          </a>
          {/* <a href="#" className="text-blue-700 flex items-center space-x-1">
          <span className="material-icons">shopping_cart</span>
          <span>ĐẶT MUA VẮC XIN</span>
        </a> */}
          <a href="#" className="text-blue-700 flex items-center space-x-1">
            <CalendarMonthIcon className="" />
            <span>ĐĂNG KÝ TIÊM</span>
          </a>
          <span className="text-orange-500 font-bold">
            Hotline: 028 7102 6595
          </span>
        </div>
      </header>
    </>
  );
}
