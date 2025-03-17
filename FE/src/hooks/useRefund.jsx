import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import refundApi from "../api/refund.api";
import { toast } from "react-toastify";


export const useRequestRefund = () => {
  return useMutation({
    mutationFn: (bookingId) => refundApi.requestRefund(bookingId),
    onSuccess: () => {
      toast.success("✅ Yêu cầu hoàn tiền đã được gửi!");
    },
    onError: (error) => {
      const errorMessage = error?.response?.data?.errorMessages?.[0] || "❌ Lỗi không xác định!";
      toast.error(`⚠️ ${errorMessage}`);
    },
  });
};


export const useRefunds = () => {
  const queryClient = useQueryClient();


  const { data: refunds, isLoading, isError, error } = useQuery({
    queryKey: ["refundRequests"],
    queryFn: refundApi.getRefundRequests,
    refetchOnWindowFocus: false,
  });


  const approveMutation = useMutation({
    mutationFn: ({ refundRequestId, adminNote }) => refundApi.approveRefund(refundRequestId, adminNote),
    onSuccess: () => {
      queryClient.invalidateQueries(["refundRequests"]);
      toast.success("✅ Yêu cầu hoàn tiền đã được phê duyệt!");
    },
    onError: (error) => {
      const errorMessage = error?.response?.data?.errorMessages?.[0] || "❌ Lỗi khi phê duyệt!";
      toast.error(`⚠️ ${errorMessage}`);
    },
  });

  // ❌ Từ chối hoàn tiền
  const rejectMutation = useMutation({
    mutationFn: ({ refundRequestId, adminNote }) => refundApi.rejectRefund(refundRequestId, adminNote),
    onSuccess: () => {
      queryClient.invalidateQueries(["refundRequests"]);
      toast.success("❌ Yêu cầu hoàn tiền đã bị từ chối!");
    },
    onError: (error) => {
      const errorMessage = error?.response?.data?.errorMessages?.[0] || "❌ Lỗi khi từ chối!";
      toast.error(`⚠️ ${errorMessage}`);
    },
  });

  return { refunds, isLoading, isError, error, approveMutation, rejectMutation };
};