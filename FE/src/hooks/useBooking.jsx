import { useContext } from "react";
import { AppContext } from "../contexts/app.context";
import { useMutation } from "@tanstack/react-query";
import { createBooking } from "../api/booking.api";
import { toast } from "react-toastify";

export const useBooking = () => {
  const { getUser } = useContext(AppContext);
  console.log(getUser);
  const addBooking = useMutation({
   
    
    mutationFn: (data) => createBooking(getUser, data),
    onSuccess: () => {
      toast.success("✅ Đặt lịch tiêm thành công!");
    },
    onError: (error) => {
      console.error("❌ Lỗi khi đặt lịch:", error);
      toast.error(error || "⚠️ Đặt lịch thất bại!");
    },
  });

  return { addBooking };
};
