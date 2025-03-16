import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import feebackApi from "../api/feedback.api";

export const useRequestFeedback = () => {
  return useMutation({
    mutationFn: (data) => feebackApi.requestFeedback(data),

    onSuccess: () => {
      toast.success("Feedback của bạn đã được gửi!");
    },

    onError: (error) => {
      if (error?.response?.data?.errorMessages?.length > 0) {
        const errorMessage = error.response.data.errorMessages[0];
        toast.error(`⚠️ ${errorMessage}`);
      } else {
        toast.error("Có lỗi xảy ra khi gửi feedback!");
      }
    },
  });
};
