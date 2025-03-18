import { useMutation, useQuery } from "@tanstack/react-query";
import { depositMoney, getWalletByUser, proccessWallet } from "../api/wallet.api";
import { toast } from "react-toastify";

export const useGetWallet = () => {
  return useQuery({
    queryKey: ["wallet"],
    queryFn: () => getWalletByUser(),
    
    staleTime: 1000 * 60 * 5,
    onError: (error) => {
      const errorMessage = error.response?.data?.errorMessages?.length
        ? error.response.data.errorMessages.join(", ")
        : "❌ Lỗi lấy thông tin ví!";
      toast.error(errorMessage, { position: "top-right" });
    },
  });
};

export const useProcessWalletPayment = () => {
    return useMutation({
      mutationFn: proccessWallet,
      onError: (error) => {
        const errorMessage = error.response?.data?.errorMessages?.length
          ? error.response.data.errorMessages.join(", ")
          : "❌ Thanh toán thất bại! Số dư không đủ.";
        toast.error(errorMessage, { position: "top-right" });
      },
    });
  };

  export const useDeposit = () => {
    return useMutation({
      mutationFn: (amount) => depositMoney(amount),
      onSuccess: (response) => {
        toast.success("✅ Vui lòng hoàn tất thanh toán!");
        
        if (response?.paymentUrl) {
          window.open(response.paymentUrl, "_blank"); 
        } else {
          toast.error("❌ Không thể tạo giao dịch. Vui lòng thử lại!");
        }
      },
      onError: (error) => {
        console.error("❌ Lỗi khi nạp tiền:", error);
        toast.error("⚠️ Lỗi hệ thống khi tạo giao dịch nạp tiền.");
      },
    });
  };
  