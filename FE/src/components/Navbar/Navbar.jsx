import React from "react";
import SearchIcon from '@mui/icons-material/Search';
export default function Navbar() {
  return (
    <div className="col-sm-12">
      {/* Navigation */}
      <nav className="bg-gray-100 p-3 flex justify-around space-x-6">
        <div className="bg-red-300">
        <a href="#" className="text-gray-700">
          TRANG CHỦ
        </a>
        <a href="#" className="text-gray-700">
          GIỚI THIỆU
        </a>
        <a href="#" className="text-gray-700">
          VẮC XIN TRẺ EM
        </a>
        <a href="#" className="text-gray-700">
          VẮC XIN NGƯỜI LỚN
        </a>
        <a href="#" className="text-gray-700">
          GÓI VẮC XIN
        </a>
        <a href="#" className="text-gray-700">
          CẨM NANG
        </a>
        <a href="#" className="text-gray-700">
          BẢNG GIÁ
        </a>
        <a href="#" className="text-gray-700">
          BỆNH HỌC
        </a>
        <a href="#" className="text-gray-700">
          TIN TỨC
        </a>
        </div>

        <div>
        <SearchIcon className="text-blue-600"/>
        </div>

      </nav>
    </div>
  );
}
