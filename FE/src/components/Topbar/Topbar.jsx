import * as React from "react";
import { motion } from "framer-motion";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AppContext } from "../../contexts/app.context";
import { Avatar } from "@mui/material";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";
import PersonAdd from "@mui/icons-material/PersonAdd";
import Settings from "@mui/icons-material/Settings";
import Logout from "@mui/icons-material/Logout";

export default function Topbar() {
  const { isAuthenticated } = useContext(AppContext);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="bg-white flex justify-between items-center w-full"
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
            {/* Đăng nhập */}
            {!isAuthenticated ? (
              <div className="flex items-center mr-5">
                {/* Đăng nhập */}
                <Link to="/auth">
                  <motion.a
                    transition={{ type: "spring", stiffness: 200 }}
                    className=" flex items-center border-amber-500 gap-2 hover:text-blue-500 transition-all duration-300"
                  >
                    <span>Đăng nhập</span>
                  </motion.a>
                </Link>
              </div>
            ) : (
              <div>
                <Tooltip title="Account settings">
                  <IconButton
                    onClick={handleClick}
                    size="small"
                    sx={{ ml: 2 }}
                    aria-controls={open ? "account-menu" : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? "true" : undefined}
                  >
                    <Avatar sx={{ width: 32, height: 32 }}>M</Avatar>
                  </IconButton>
                </Tooltip>
                {/* Dropdown Menu */}
                <Menu
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}
                  MenuListProps={{
                    "aria-labelledby": "account-menu-button",
                  }}
                >
                  <MenuItem onClick={handleClose}>
                    <Avatar /> Tài Khoản Của Tôi
                  </MenuItem>
                  <MenuItem onClick={handleClose}>
                    <Avatar /> Đơn Mua
                  </MenuItem>
                  <Divider />
                  <MenuItem onClick={handleClose}>
                    <ListItemIcon>
                      <PersonAdd fontSize="small" />
                    </ListItemIcon>
                    Thêm tài khoản
                  </MenuItem>
                  <MenuItem onClick={handleClose}>
                    <ListItemIcon>
                      <Settings fontSize="small" />
                    </ListItemIcon>
                    Cài đặt
                  </MenuItem>
                  <MenuItem onClick={handleClose}>
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
    </>
  );
}
