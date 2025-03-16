import http from "../utils/http";

export const URL_REQUEST_REFUND = "Refund/request";


const refundApi = {
  async requestRefund(data) {
    const response = await http.post(URL_REQUEST_REFUND, data);
    return response.data;
  },
  async getRefundRequests() {
    const response = await http.get("Refund/requests");
    return response.data.result;
  }
  , async approveRefund(refundRequestId, adminNote) {
    const response = await http.put(`/Refund/approve/${refundRequestId}`, { adminNote });
    return response.data;
  },

  // ✅ Từ chối yêu cầu hoàn tiền
  async rejectRefund(refundRequestId, adminNote) {
    const response = await http.put(`/Refund/reject/${refundRequestId}`, { adminNote });
    return response.data;
  }
};



export default refundApi;
