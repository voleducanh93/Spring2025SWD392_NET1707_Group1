import React from "react";
import SearchIcon from '@mui/icons-material/Search';

export default function Navbar() {
  return (
    <div className="">
      {/* Navigation */}
      <nav className="bg-gray-100 py-3  items-center">
        <div className="mx-auto px-10 flex justify-between">
        <div className="max-w-screen-xl flex items-center space-x-6 px-4">
          <a href="#" className="text-gray-700">TRANG CHỦ</a>
          <a href="#" className="text-gray-700">GIỚI THIỆU</a>
          <a href="#" className="text-gray-700">VẮC XIN TRẺ EM</a>
          <a href="#" className="text-gray-700">VẮC XIN NGƯỜI LỚN</a>
          <a href="#" className="text-gray-700">GÓI VẮC XIN</a>
          <a href="#" className="text-gray-700">CẨM NANG</a>
          <a href="#" className="text-gray-700">BẢNG GIÁ</a>
          <a href="#" className="text-gray-700">BỆNH HỌC</a>
          <a href="#" className="text-gray-700">TIN TỨC</a>
        </div>

        <div className="flex items-center space-x-4">
          <SearchIcon className="text-blue-600" />
        </div>
        </div>
      </nav>
    </div>
  );
}
