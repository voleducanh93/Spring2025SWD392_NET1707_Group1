import http from "../utils/http";

const BASE_URL = "/VaccinationSchedule";

// Lấy danh sách vaccine
export const getVaccines = async () => {
  const response = await http.get(BASE_URL);
  console.log(response);
  
  return response.data.result;
};

// Thêm vaccine mới
export const createVaccine = async (data) => {
  const response = await http.post(BASE_URL, data);
  return response.data;
};

// Cập nhật vaccine
export const updateVaccine = async (id, data) => {
  const response = await http.put(`${BASE_URL}/${id}`, data);
  return response.data;
};

// Xóa vaccine
export const deleteVaccine = async (id) => {
  const response = await http.delete(`${BASE_URL}/${id}`);
  return response.data;
};
