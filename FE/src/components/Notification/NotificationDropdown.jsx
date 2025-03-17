import { useState } from "react";
import { IconButton, Badge, Menu, MenuItem, Typography, Tooltip, Divider, Box, Button } from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord"; // 🔵 Chấm xanh
import { useNotificationHook } from "../../hooks/useNotificationHook";

export default function NotificationDropdown() {
  const { notifications, unreadCount, handleNotificationClick, markAsRead } = useNotificationHook();
  const [anchorEl, setAnchorEl] = useState(null);
  const [filter, setFilter] = useState("all"); // Bộ lọc: 'all' hoặc 'unread'
  console.log(unreadCount);
  
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  // Lọc thông báo (Tất cả hoặc Chưa đọc)
  const filteredNotifications = filter === "unread" 
    ? notifications.filter((n) => !n.isRead) 
    : notifications;
  
  return (
    <>
      {/* 🔔 Icon thông báo */}
      <Tooltip title="Thông báo">
        <IconButton color="inherit" onClick={handleClick}>
          <Badge badgeContent={unreadCount} color="error">
            <NotificationsIcon sx={{ color: "white" }} />
          </Badge>
        </IconButton>
      </Tooltip>

      {/* Dropdown danh sách thông báo */}
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{
          sx: { 
            width: 350, 
            maxHeight: 450, 
            overflowY: "auto",
            padding: "10px",
          }
        }}
      >
        {/* Header "Thông báo" + Chọn bộ lọc */}
        <Box sx={{ display: "flex", justifyContent: "space-between", padding: "10px 16px" }}>
          <Typography variant="h6" sx={{ fontWeight: "bold" }}>
            Thông báo
          </Typography>
          <Box>
            <Button 
              size="small" 
              sx={{ fontWeight: filter === "all" ? "bold" : "normal" }} 
              onClick={() => setFilter("all")}
            >
              Tất cả
            </Button>
            <Button 
              size="small" 
              sx={{ fontWeight: filter === "unread" ? "bold" : "normal" }} 
              onClick={() => setFilter("unread")}
            >
              Chưa đọc
            </Button>
          </Box>
        </Box>

        <Divider />

        {/* Danh sách thông báo */}
        {filteredNotifications.length > 0 ? (
          filteredNotifications.map((notification) => (
            <MenuItem 
              key={notification.notificationId} 
              sx={{ 
                display: "flex", 
                flexDirection: "column", 
                alignItems: "flex-start", 
                padding: "12px 16px",
                whiteSpace: "normal",
                backgroundColor: notification.isRead ? "transparent" : "#f0f7ff" // Nền xanh nhạt nếu chưa đọc
              }}
            >
              {/* Tiêu đề thông báo */}
              <Box sx={{ display: "flex", alignItems: "center", width: "100%" }}>
                {!notification.isRead && <FiberManualRecordIcon sx={{ color: "#1877f2", fontSize: "12px", marginRight: "8px" }} />} {/* 🔵 Icon chấm xanh */}
                <Typography 
                  variant="body1" 
                  sx={{ fontSize: "16px", fontWeight: notification.isRead ? "normal" : "bold", flexGrow: 1 }}
                  onClick={() => handleNotificationClick(notification)}
                >
                  {notification.message}
                </Typography>
                
                {/* Nút đánh dấu đã đọc */}
                {!notification.isRead && (
                  <IconButton 
                    size="small" 
                    onClick={() => markAsRead(notification.notificationId)} 
                    sx={{ color: "#4caf50" }} // ✅ Icon màu xanh
                  >
                    <CheckCircleIcon />
                  </IconButton>
                )}
              </Box>

              {/* Thời gian thông báo */}
              <Typography variant="caption" sx={{ color: "gray", marginTop: "5px" }}>
                {new Date(notification.timestamp).toLocaleString()}
              </Typography>
            </MenuItem>
          ))
        ) : (
          <MenuItem onClick={handleClose} sx={{ padding: "16px" }}>
            <Typography variant="body2" sx={{ fontSize: "16px", textAlign: "center" }}>
              Không có thông báo nào
            </Typography>
          </MenuItem>
        )}

        <Divider />

        {/* Nút "Xem tất cả thông báo" */}
        <Box textAlign="center" sx={{ padding: "10px" }}>
          <Typography 
            variant="body1" 
            sx={{ 
              fontSize: "14px", 
              color: "#1877f2", 
              cursor: "pointer", 
              fontWeight: "bold" 
            }}
            onClick={() => console.log("Xem tất cả thông báo")}
          >
            Xem tất cả thông báo
          </Typography>
        </Box>
      </Menu>
    </>
  );
}
