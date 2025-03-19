import http from "../utils/http";


const BASE_URL = "/VaccineRecord";


export const createVaccineRecord = async (id) => {
  try {
    const response = await http.post(`${BASE_URL}/${id}/create`);
   

    if (!response.data || !response.data.result) {
      throw new Error("🚨 API không trả về dữ liệu hợp lệ!");
    }

    return response.data.result;
  } catch (error) {
    console.error("❌ Lỗi khi tạo Vaccine Record:", error);
    throw error;
  }
};

export const getVaccineRecord = async (bookingId) => {
    const response = await http.get(`${BASE_URL}/booking/${bookingId}`);
    return response.data.result;
  };

  export const updateVaccineRecord = async (vaccinationRecordId, updatedData) => {
    const response = await http.put(`${BASE_URL}/${vaccinationRecordId}/update`, updatedData);
    return response.data;
  };