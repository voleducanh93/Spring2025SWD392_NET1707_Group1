import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import feebackApi from "../api/feedback.api";
import { handleApiError } from "../utils/utils";

export const useRequestFeedback = () => {
  return useMutation({
    mutationFn: (data) => feebackApi.requestFeedback(data),

    onSuccess: () => {
      toast.success("Feedback của bạn đã được gửi!");
    },

    onError: (error) => {
      handleApiError(error);
    },
  });
};
