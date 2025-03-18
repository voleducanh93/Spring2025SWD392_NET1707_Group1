import http from "../utils/http";

const BASE_URL = "/Notification";

// Lấy danh sách tất cả thông báo

export const getAllNotifications = async () => {
  const response = await http.get(`${BASE_URL}/user`);
  return response.data.result;
};

// Lấy số lượng thông báo chưa đọc
export const getUnreadCount = async () => {
  const response = await http.get(`${BASE_URL}/unread-count`);
  console.log(response.data.result);
  
  return response.data.result;
};

// Đánh dấu một thông báo là đã đọc
export const markAsRead = async (notificationId) => {
  const response = await http.put(`${BASE_URL}/${notificationId}/read`);
  return response.data.isSuccess;
};

// Xóa một thông báo
export const deleteNotification = async (notificationId) => {
  const response = await http.delete(`${BASE_URL}/${notificationId}`);
  return response.data.isSuccess;
};

// Đánh dấu tất cả thông báo là đã đọc
export const markAllAsRead = async () => {
  const response = await http.put(`${BASE_URL}/mark-all-read`);
  return response.data.isSuccess;
};
