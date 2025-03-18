import { useState, useEffect, useRef, useContext } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SearchIcon from "@mui/icons-material/Search";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CloseIcon from "@mui/icons-material/Close";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { Container } from "@mui/material";
import { Link } from "react-router-dom";
import { AppContext } from "../../contexts/app.context";

export default function Navbar() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isSticky, setIsSticky] = useState(false);
  const [isScrollTopVisible, setIsScrollTopVisible] = useState(false);
  const {userRole } =
      useContext(AppContext);
  const [searchQuery, setSearchQuery] = useState("");
  const dropdownRef = useRef(null);
  const searchSuggestions = [
    "Vắc xin Qdenga (Sản xuất tại Đức)",
    "Vắc xin Shingrix (Bỉ)",
    "Vắc xin Pneumovax 23 (Mỹ)",
    "Vắc xin Bexsero (Ý)",
  ];

  const hideSearch = () => {
    setIsSearchOpen(false);
    setSearchQuery("");
  };
  // Sticky Navbar + Hiển thị nút cuộn lên đầu trang
  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 80);
      setIsScrollTopVisible(window.scrollY > 300);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  // Đóng dropdown khi click bên ngoài
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  // Cuộn lên đầu trang khi bấm nút 🔝
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  // Xử lý khi chọn gợi ý tìm kiếm
  const handleSuggestionClick = (suggestion) => {
    setSearchQuery(suggestion);
    setIsSearchOpen(false);
    handleSearch(suggestion);
  };
  // Giả lập chức năng tìm kiếm
  const handleSearch = (query) => {
    console.log("Tìm kiếm:", query);
    // Ở đây có thể điều hướng đến trang kết quả tìm kiếm hoặc thực hiện fetch API
  };
  if (!userRole || userRole !== "customer") {
    return null;
  }
  return (
    <Container>
      <nav
        className={`transition-all duration-500 ${
          isSticky ? "fixed top-0 left-0 w-full z-50" : "py-3"
        }`}
      >
        <div className="mx-auto px-10 flex justify-around items-center">
          {/* Menu chính */}
          <div className="flex items-center gap-6">
            {[
              { name: "TRANG CHỦ", link: "/" },
              { name: "GIỚI THIỆU", link: "/gioi-thieu" },
              { name: "VẮC XIN TRẺ EM", link: "/vacxin-tre-em" },
              { name: "VẮC XIN NGƯỜI LỚN", link: "/vacxin-nguoi-lon" },
              { name: "GÓI VẮC XIN", link: "/goi-vacxin" },
              { name: "CẨM NANG", link: "/cam-nang" },
              { name: "BẢNG GIÁ", link: "/bang-gia" },
              { name: "BỆNH HỌC", link: "/benh-hoc" },
            ].map((item, index) => (
              <Link
                key={index}
                to={item.link}
                className="text-gray-700 font-medium relative transition-all duration-300 before:absolute before:-bottom-1 before:left-0 before:w-0 before:h-0.5 before:bg-gradient-to-r before:from-[#2A388F] before:to-[#1F2B75] hover:before:w-full before:transition-all before:duration-500"
              >
                {item.name}
              </Link>
            ))}

            {/* Dropdown "TIN TỨC" */}
            <div className="relative" ref={dropdownRef}>
              <button
                className="flex items-center text-gray-700 font-medium hover:text-[#2A388F] transition-all duration-300"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              >
                TIN TỨC <ExpandMoreIcon className="ml-1" />
              </button>
              {/* Danh sách dropdown */}
              <AnimatePresence>
                {isDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -20, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -20, scale: 0.95 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="absolute bg-[#2A388F] text-white w-56 mt-2 shadow-lg rounded-md z-50 overflow-hidden"
                  >
                    {[
                      "Tin tức sức khỏe",
                      "Tin tức hoạt động",
                      "Ưu Đãi",
                      "Khai trương",
                      "Lớp tư vấn sức khỏe cộng đồng",
                      "Trực tuyến",
                      "Cuộc thi",
                      "Hợp tác",
                    ].map((subItem, idx) => (
                      <motion.a
                        key={idx}
                        href="#"
                        whileHover={{ scale: 1.05 }}
                        className="block px-4 py-2 hover:bg-[#1F2B75] transition-all duration-300"
                      >
                        {subItem}
                      </motion.a>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
          {/* Khu vực phải - Tìm kiếm */}
          <div className="flex items-center space-x-4 relative">
            {/* Nút tìm kiếm */}
            <button
              className="text-[#2A388F] hover:text-[#1F2B75] transition-all duration-300"
              onClick={() => setIsSearchOpen(!isSearchOpen)}
            >
              <SearchIcon fontSize="large" className="relative" />
            </button>
            {/* Ô tìm kiếm mở rộng */}
            <AnimatePresence>
              {isSearchOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.95 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="absolute top-10 right-0 bg-white p-3 rounded-lg shadow-md w-80 flex flex-col space-y-2 z-10"
                >
                  <div className="flex items-center space-x-2">
                    <input
                      type="text"
                      placeholder="Tìm kiếm..."
                      className="w-full outline-none border-b-2 border-[#2A388F] p-2"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <button
                      className="text-gray-500 hover:text-gray-700 transition-all duration-300"
                      onClick={() => hideSearch()}
                    >
                      <CloseIcon />
                    </button>
                  </div>
                  {/* Gợi ý tìm kiếm */}
                  {searchQuery === "" && (
                    <div className="border-t pt-2 text-gray-500">
                      <p className="text-sm font-semibold">Gợi ý:</p>
                      {searchSuggestions.map((suggestion, index) => (
                        <p
                          key={index}
                          className="text-sm hover:text-[#2A388F] cursor-pointer transition-all duration-300"
                          onClick={() => handleSuggestionClick(suggestion)}
                        >
                          {suggestion}
                        </p>
                      ))}
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </nav>
    </Container>
  );
}
