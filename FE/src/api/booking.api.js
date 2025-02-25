import http from "../utils/http";

const BASE_URL = "/Booking";

export const createBooking = async (bookingData) => {
    const response = await http.post(BASE_URL, bookingData);
    return response.data; 
  };