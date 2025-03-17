import http from "../utils/http";

const BASE_URL = "/Booking";

export const createBooking = async ( id, bookingData) => {
    const response = await http.post(`${BASE_URL}?userId=${id}`, bookingData);
    return response.data; 
  };
  
  // Lấy danh sách tất cả các lịch đặt
  export const getAllBookings = async () => {
    const response = await http.get(`${BASE_URL}/all-bookings`);
    return response.data;
  };
  
  // Lấy danh sách bác sĩ
  export const getAllDoctors = async () => {
    const response = await http.get("/Admin/getAllDoctors");
    return response.data;
  };
  
  // Gán bác sĩ cho lịch hẹn
  export const assignDoctorToBooking = async (bookingId, doctorId) => {
    const response = await http.post(`${BASE_URL}/assign-doctor?bookingId=${bookingId}&userId=${doctorId}`);
    return response.data;
  };
  
  export const getBoookingByDoctor = async (id) => {
    const response = await http.get(`${BASE_URL}/doctor/${id}/bookings`)
    return response.data.result;
  }
  export const checkParentVaccine = async (vaccineIds) => {
    const response = await http.post(`${BASE_URL}/check-parent-vaccine`, {
      vaccineIds,
    });
    return response.data;
  };
  