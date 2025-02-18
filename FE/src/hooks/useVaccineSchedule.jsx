import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getVaccines, createVaccine, updateVaccine, deleteVaccine } from "../api/vaccineSchedule.api";

export const useVaccineSchedule = () => {
  const queryClient = useQueryClient();

  // ✅ Fetch danh sách vaccine
  const { data: vaccines, isLoading, isError, error } = useQuery({
    queryKey: ["vaccines"],
    queryFn: getVaccines, // Không cần `try/catch` vì React Query tự xử lý
    refetchOnWindowFocus: false,
  });

  // ✅ Thêm vaccine mới
  const addVaccine = useMutation({
    mutationFn: createVaccine,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["vaccines"] });
    },
    onError: (error) => {
      console.error("❌ Lỗi khi thêm vaccine:", error);
    },
  });

  // ✅ Sửa vaccine
  const editVaccine = useMutation({
    mutationFn: ({ id, data }) => updateVaccine(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["vaccines"] });
    },
    onError: (error) => {
      console.error("❌ Lỗi khi cập nhật vaccine:", error);
    },
  });

  // ✅ Xóa vaccine
  const removeVaccine = useMutation({
    mutationFn: deleteVaccine,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["vaccines"] });
    },
    onError: (error) => {
      console.error("❌ Lỗi khi xóa vaccine:", error);
    },
  });

  return { vaccines, isLoading, isError, error, addVaccine, editVaccine, removeVaccine };
};
