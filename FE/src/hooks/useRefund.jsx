import { useMutation } from "@tanstack/react-query";
import refundApi from "../api/refund.api";
import { toast } from "react-toastify";

export const useRequestRefund = () => {
  return useMutation({
    mutationFn: (bookingId) => refundApi.requestRefund(bookingId),
    onSuccess: () => {
      toast.success("Yêu cầu hoàn tiền đã được gửi!");
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Hoàn tiền thất bại!");
    },
  });
};
