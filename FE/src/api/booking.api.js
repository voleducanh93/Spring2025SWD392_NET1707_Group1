import http from "../utils/http";

const BASE_URL = "/Booking";

export const createBooking = async ( id, bookingData) => {
    const response = await http.post(`${BASE_URL}?userId=${id}`, bookingData);
    return response.data; 
  };