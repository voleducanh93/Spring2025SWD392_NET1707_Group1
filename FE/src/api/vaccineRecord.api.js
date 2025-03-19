import http from "../utils/http";


const BASE_URL = "/VaccineRecord";


export const createVaccineRecord = async (id) => {

    const response = await http.post(`${BASE_URL}/${id}/create`);
    return response.data.result;
};

export const getVaccineRecord = async (bookingId) => {
    const response = await http.get(`${BASE_URL}/bookingDetail/${bookingId}`);
    return response.data.result;
  };

  export const updateVaccineRecord = async (vaccinationRecordId, updatedData) => {
    const response = await http.put(`${BASE_URL}/${vaccinationRecordId}/update`, updatedData);
    return response.data;
  };
  export const getVaccineRecordByBooking = async (bookingId) => {
    const response = await http.get(`${BASE_URL}/booking/${bookingId}`);
    return response.data.result;
  };