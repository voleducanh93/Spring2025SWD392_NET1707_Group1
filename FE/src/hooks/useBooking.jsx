import { useContext } from "react";
import { AppContext } from "../contexts/app.context";
import { useMutation, useQuery } from "@tanstack/react-query";
import { checkParentVaccine, createBooking, getBoookingByDoctor } from "../api/booking.api";
import { toast } from "react-toastify";

export const useBooking = () => {
  const { getUser } = useContext(AppContext);
  const doctorId = getUser;

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
    queryFn: () => getBoookingByDoctor(doctorId),
    enabled: !!doctorId,
    refetchOnWindowFocus: false,
    onError: () => {
      toast.error("⚠️ Không thể tải danh sách lịch tiêm chủng!");
    },
  });

  // Kiểm tra vaccine của phụ huynh
  const checkVaccine = useMutation({
    mutationFn: (vaccineIds) => checkParentVaccine(vaccineIds)
});

  return { addBooking, bookings, isLoading, isError, error, checkVaccine };
};
