import { useMutation } from "@tanstack/react-query";
import { getPayment } from "../api/payment.api";
import { toast } from "react-toastify";

export const usePayment = () => {
  const { mutate: fetchPaymentUrl, isLoading, isError, data, error } = useMutation({
    mutationFn: (bookingId) => getPayment(bookingId),
    onSuccess: (response) => {
        console.log("🔍 API Response:", response); // ✅ Kiểm tra dữ liệu từ API
    
        if (response && response.paymentUrl) { // ✅ Đảm bảo lấy đúng URL
            console.log("🔗 Redirecting to:", response.paymentUrl);
            window.open(response.paymentUrl, "_blank");  
      } else {
        console.error("❌ Lỗi: Không lấy được link thanh toán!");
        toast.error("⚠️ Không thể tạo thanh toán. Vui lòng thử lại!");
      }
    },
    onError: (error) => {
      console.error("❌ Lỗi khi lấy link thanh toán:", error);
      toast.error("⚠️ Lỗi hệ thống khi lấy link thanh toán!");
    },
  });

  return { fetchPaymentUrl, isLoading, isError, data, error };
};
