import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getVaccines, createVaccine, updateVaccine, deleteVaccine, getVaccinesAndCombo } from "../api/vaccineSchedule.api";
import { toast } from 'react-toastify'; // Import toast

export const useVaccineSchedule = () => {
  const queryClient = useQueryClient();

  const { data: vaccines, isLoading, isError, error } = useQuery({
    queryKey: ["vaccineSchedule"],
    queryFn: getVaccines,
    refetchOnWindowFocus: false,
  });

  const addVaccine = useMutation({
    mutationFn: createVaccine,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["vaccineSchedule"] });
      toast.success("Vaccine đã được thêm thành công!"); // Thông báo thành công
    },
    onError: (error) => {
      console.error("❌ Lỗi khi thêm vaccine:", error);
      toast.error(`Thêm vaccine thất bại: ${error.message || "Lỗi không xác định"}`); // Thông báo lỗi
    },
  });

  const editVaccine = useMutation({
    mutationFn: ({ id, data }) => updateVaccine(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["vaccineSchedule"] });
      toast.success("Vaccine đã được cập nhật thành công!"); // Thông báo thành công
    },
    onError: (error) => {
      console.error("❌ Lỗi khi cập nhật vaccine:", error);
      toast.error(`Cập nhật vaccine thất bại: ${error.message || "Lỗi không xác định"}`); // Thông báo lỗi
    },
  });

  const removeVaccine = useMutation({
    mutationFn: deleteVaccine,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["vaccineSchedule"] });
      toast.success("Vaccine đã được xóa thành công!"); // Thông báo thành công
    },
    onError: (error) => {
      console.error("❌ Lỗi khi xóa vaccine:", error);
      toast.error(`Xóa vaccine thất bại: ${error.message || "Lỗi không xác định"}`); // Thông báo lỗi
    },
  });
  

  return { vaccines, isLoading, isError, error, addVaccine, editVaccine, removeVaccine };
};
