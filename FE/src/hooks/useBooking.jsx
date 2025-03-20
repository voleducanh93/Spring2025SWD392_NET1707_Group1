import { useContext } from "react";
import { AppContext } from "../contexts/app.context";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { checkParentVaccine, createBooking, DeleteBoooking, getBoooking, getBoookingDetailByDoctor } from "../api/booking.api";
import { toast } from "react-toastify";
import { handleApiError } from "../utils/utils";


export const useBooking = () => {
  const { getUser } = useContext(AppContext);
  const doctorId = getUser;
  const queryClient = useQueryClient();
  // Đặt lịch tiêm chủng
  const addBooking = useMutation({
    mutationFn: (data) => createBooking(getUser, data),
    onError: (error) => {
      toast.error(error || "⚠️ Đặt lịch thất bại!");
    },
  });

  // Lấy danh sách lịch tiêm chủng của bác sĩ
  const { data: bookings, isLoading, isError, error } = useQuery({
    queryKey: ["doctorBookings", doctorId],
    queryFn: () => getBoookingDetailByDoctor(doctorId),
    enabled: !!doctorId,
    refetchOnWindowFocus: false,
    onError: () => {
      toast.error("⚠️ Không thể tải danh sách lịch tiêm chủng!");
    },
  });
  const {
    data: userBookings,
    isLoading: isLoadingUserBookings,
    isError: isErrorUserBookings,
    error: errorUserBookings,
  } = useQuery({
    queryKey: ["userBookings", doctorId], // Đảm bảo key không thay đổi liên tục
    queryFn: () => getBoooking(doctorId),
    enabled: !!doctorId,
    refetchOnWindowFocus: false,
    onError: () => {
      toast.error("⚠️ Không thể tải danh sách đặt lịch của bạn!");
    },
  });
  
  const removeBooking = useMutation({
    
      mutationFn: (bookingId) => DeleteBoooking(bookingId, getUser),
    
      onSuccess: () => { 
        queryClient.invalidateQueries({ queryKey: ["userBookings"] });
          toast.success("Đã xóa thành công");
      },
  
      onError: (error) => {
        handleApiError(error);
      }
  });

  // Kiểm tra vaccine của phụ huynh
  const checkVaccine = useMutation({
    mutationFn: (vaccineIds) => checkParentVaccine(vaccineIds)
});

  return { addBooking, bookings,userBookings, isLoading, isError, error, checkVaccine,removeBooking,isLoadingUserBookings,isErrorUserBookings,errorUserBookings };
};
