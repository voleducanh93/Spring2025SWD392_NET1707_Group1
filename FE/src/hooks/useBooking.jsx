import { useContext } from "react";
import { AppContext } from "../contexts/app.context";
import { useMutation } from "@tanstack/react-query";
import { createBooking } from "../api/booking.api";
import { toast } from "react-toastify";

export const useBooking = () => {
  const { getUser } = useContext(AppContext);
  
  const addBooking = useMutation({
   
    
    mutationFn: (data) => createBooking(getUser, data),
    
    onError: (error) => {
      //console.error("❌ Lỗi khi đặt lịch:", error);
      toast.error(error || "⚠️ Đặt lịch thất bại!");
    },
  });

  return { addBooking };
};
