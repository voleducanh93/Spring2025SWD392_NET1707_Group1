import http from "../utils/http";

export const URL_FEEDBACK = "Feedback";

const feebackApi = {
  async requestFeedback(data) {
    const response = await http.post(URL_FEEDBACK, data);
    return response.data;
  },
};

export default feebackApi;