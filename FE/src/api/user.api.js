import http from "../utils/http";

const BASE_URL = "/Admin";

// Lấy danh sách người dùng
export const getUsers = async () => {
  const response = await http.get(`${BASE_URL}/getAllUsers`);

  return response.data.result;
};

// Thêm người dùng
export const createUser = async (data) => {
  const response = await http.post(`${BASE_URL}/create-account`, data);
  return response.data;
};

// Cập nhật người dùng
export const updateUser = async (id, data) => {
  const response = await http.put(`${BASE_URL}/UpdateUser`, data);
  return response.data;
};

// Xóa người dùng
export const deleteUser = async (id) => {
  const response = await http.delete(`${BASE_URL}/DeleteUser/${id}`);
  return response.data;
};

