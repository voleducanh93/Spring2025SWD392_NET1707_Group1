import React from "react";
import { motion } from "framer-motion";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import PersonIcon from "@mui/icons-material/Person";

export default function Topbar() {
  return (
    <>
      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="bg-white shadow-md p-4 flex justify-between items-center w-full"
      >
        <div className="flex flex-col mx-auto md:flex-row justify-between items-center w-full px-8 lg:px-16">
          {/* Logo Section */}
          <motion.div
            whileHover={{ scale: 1.1, rotate: 3 }}
            transition={{ type: "spring", stiffness: 200 }}
            className="flex items-center space-x-4 cursor-pointer"
          >
            <img
              src="src/assets/logo-vnvc-tet-nguyen-dan.png"
              alt="VNVC Logo"
              className="h-12 rounded-md shadow-md transition-all duration-300 hover:shadow-xl"
            />
            <span className="text-orange-500 text-2xl font-bold tracking-wide drop-shadow-md">
              VNVC
            </span>
          </motion.div>

          {/* Navigation and Contact Section */}
          <div className="flex flex-col md:flex-row items-center gap-6 mt-4 md:mt-0">
            {/* Find Center Link */}
            <motion.a
              href="#"
              whileHover={{ scale: 1.1, x: 5 }}
              transition={{ type: "spring", stiffness: 200 }}
              className="text-blue-700 flex items-center gap-2 hover:text-blue-900 transition-all duration-300"
            >
              <LocationOnIcon className="text-blue-500" />
              <span className="font-medium">TÌM TRUNG TÂM VNVC</span>
            </motion.a>

            {/* Register Link */}
            <motion.a
              href="#"
              whileHover={{ scale: 1.1, x: 5 }}
              transition={{ type: "spring", stiffness: 200 }}
              className="text-blue-700 flex items-center gap-2 hover:text-blue-900 transition-all duration-300"
            >
              <CalendarMonthIcon className="text-blue-500" />
              <span className="font-medium">ĐĂNG KÝ TIÊM</span>
            </motion.a>

            {/* Hotline */}
            <motion.span
              whileHover={{ scale: 1.1 }}
              transition={{ type: "spring", stiffness: 200 }}
              className="text-orange-500 font-bold text-lg md:text-base bg-orange-100 px-4 py-2 rounded-lg shadow-md hover:bg-orange-200 transition-all duration-300 cursor-pointer"
            >
              Hotline:{" "}
              <a href="tel:02871026595" className="hover:underline">
                028 7102 6595
              </a>
            </motion.span>

            {/* Đăng nhập / Đăng ký */}
            <div className="flex items-center space-x-4">
              {/* Đăng nhập */}
              <motion.a
                href="/signin"
                whileHover={{ scale: 1.1 }}
                transition={{ type: "spring", stiffness: 200 }}
                className="text-gray-700 flex items-center gap-2 hover:text-blue-500 transition-all duration-300"
              >
                <PersonIcon className="text-gray-500" />
                <span>Đăng nhập</span>
              </motion.a>

              {/* Đăng ký */}
              <motion.a
                href="/signup"
                whileHover={{ scale: 1.1 }}
                transition={{ type: "spring", stiffness: 200 }}
                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-all duration-300"
              >
                Đăng ký
              </motion.a>
            </div>
          </div>
        </div>
      </motion.header>
    </>
  );
}
