import http from "../utils/http";

export const URL_REQUEST_REFUND = "Refund/request";

const refundApi = {
  async requestRefund(data) {
    const response = await http.post(URL_REQUEST_REFUND, data);
    return response.data;
  },
};

export default refundApi;
