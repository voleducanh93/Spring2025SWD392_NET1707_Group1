import * as React from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AppContext } from "../../contexts/app.context";
import {
  Avatar,
  Menu,
  MenuItem,
  ListItemIcon,
  Divider,
  IconButton,
  Tooltip,
} from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import { Container } from "@mui/material";
import WalletIcon from "@mui/icons-material/Wallet";
import Logout from "@mui/icons-material/Logout";
import ChildCareIcon from "@mui/icons-material/ChildCare";
import { clearLS } from "../../utils/auth";
import { toast } from "react-toastify";
import PersonIcon from "@mui/icons-material/Person";
import { EventNote } from "@mui/icons-material";

export default function Topbar() {
  const navigate = useNavigate();
  const { setIsAuthenticated, isAuthenticated, walletBalance } =
    useContext(AppContext);
  console.log(walletBalance);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    toast.success("Đăng xuất thành công!");
    handleClose();
    clearLS();
    setIsAuthenticated(false);
    navigate("/auth");
  };

  return (
    <Container>
      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className=" w-full"
      >
        <div className="flex flex-col mx-auto md:flex-row justify-around items-center w-full lg:px-16">
          {/* Logo Section */}
          <motion.div
            whileHover={{ scale: 1.1, rotate: 3 }}
            transition={{ type: "spring", stiffness: 200 }}
            className="flex items-center !space-x-3 cursor-pointer"
            onClick={() => navigate("/")}
          >
            <img
              src="src/assets/logo.webp"
              alt="VNVC Logo"
              className="h-12 rounded-md shadow-md transition-all duration-300 hover:shadow-xl"
            />
            <span className="text-orange-500 text-2xl font-bold tracking-wide drop-shadow-md">
              CVSTS
            </span>
          </motion.div>

          {/* Navigation */}
          <div className="flex flex-col md:flex-row items-center gap-6 mt-4 md:mt-0">
            <motion.a
              href="#"
              whileHover={{ scale: 1.1, x: 5 }}
              transition={{ type: "spring", stiffness: 200 }}
              className="text-[#F9BC31] flex items-center gap-2 hover:text-[#F9BC31] transition-all duration-300"
            >
              <LocationOnIcon />
              <span className="font-medium">TÌM TRUNG TÂM VNVC</span>
            </motion.a>

            <motion.div
              whileHover={{ scale: 1.1, x: 5 }}
              transition={{ type: "spring", stiffness: 200 }}
              className="text-[#F9BC31] flex items-center gap-2 hover:text-[#F9BC31] transition-all duration-300"
            >
              <Link to="/Booking">
                <CalendarMonthIcon />
                <span className="font-medium">ĐĂNG KÝ TIÊM</span>
              </Link>
            </motion.div>

            <motion.span
              whileHover={{ scale: 1.1 }}
              transition={{ type: "spring", stiffness: 200 }}
              className="text-orange-500 font-bold text-lg md:text-base bg-orange-100 !px-4 !py-2 rounded-lg shadow-md hover:bg-orange-200 transition-all duration-300 cursor-pointer"
            >
              Hotline:{" "}
              <a href="tel:02871026595" className="hover:underline">
                028 7102 6595
              </a>
            </motion.span>

            {/* Đăng nhập / Tài khoản */}
            {!isAuthenticated ? (
              <div className="flex items-center mr-5">
                <Link to="/auth">
                  <motion.a
                    transition={{ type: "spring", stiffness: 200 }}
                    className=" flex items-center text-[#F9BC31] gap-2 hover:opacity-80 transition-all duration-200"
                  >
                    <span>Đăng nhập</span>
                    <PersonIcon />
                  </motion.a>
                </Link>
              </div>
            ) : (
              <div>
                <Tooltip title="Tài khoản">
                  <IconButton onClick={handleClick} size="small">
                    <Avatar sx={{ width: 32, height: 32 }}>M</Avatar>
                  </IconButton>
                </Tooltip>

                {/* Dropdown Menu */}
                <Menu
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}
                  PaperProps={{
                    sx: {
                      borderRadius: "8px",
                      boxShadow: "0 8px 16px rgba(0,0,0,0.2)",
                    },
                  }}
                >
                  <MenuItem
                    onClick={handleClose}
                    className="hover:bg-gray-100 transition-all duration-200"
                  >
                    <Avatar /> Tài Khoản Của Tôi
                  </MenuItem>

                  {/* Hồ sơ trẻ em */}
                  <MenuItem
                    onClick={() => navigate("/child-profile")}
                    className="hover:bg-gray-100 transition-all duration-200"
                  >
                    <ListItemIcon>
                      <ChildCareIcon fontSize="small" />
                    </ListItemIcon>
                    Hồ sơ trẻ em
                  </MenuItem>

                  <Divider />

                  <MenuItem
                    onClick={() => navigate("/mybooking")}
                    className="hover:bg-gray-100 transition-all duration-200"
                  >
                    <ListItemIcon>
                      <EventNote fontSize="small" />
                    </ListItemIcon>
                    Danh sách lịch hẹn
                  </MenuItem>

                  <MenuItem
                    onClick={() => navigate("/mywallet")}
                    className="hover:bg-gray-100 transition-all duration-200"
                  >
                    <ListItemIcon>
                      <WalletIcon />
                    </ListItemIcon>
                    <div className="flex flex-col">
                      <span>
                        Ví tiền:{" "}
                        {walletBalance ? walletBalance.toLocaleString() : "0"}{" "}
                        VND
                      </span>
                    </div>
                  </MenuItem>

                  <MenuItem
                    onClick={handleLogout}
                    className="hover:bg-gray-100 transition-all duration-200"
                  >
                    <ListItemIcon>
                      <Logout fontSize="small" />
                    </ListItemIcon>
                    Đăng Xuất
                  </MenuItem>
                </Menu>
              </div>
            )}
          </div>
        </div>
      </motion.header>
    </Container>
  );
}
