import http from "../utils/http";

const BASE_URL = "/VnPayment";
export const getPayment = async (bookingId) => {
  const response = await http.post(`${BASE_URL}/create-payment/${bookingId}`);
  return response.data.result;
};