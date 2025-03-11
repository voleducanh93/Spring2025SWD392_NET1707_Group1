import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getVaccines, createVaccine, updateVaccine, deleteVaccine } from "../api/vaccine.api";


export const useVaccine = () => {
  const queryClient = useQueryClient();

  
  const { data: vaccines, isLoading, isError, error } = useQuery({
    queryKey: ["vaccines"],
    queryFn: getVaccines,
    refetchOnWindowFocus: false,
    onError: (err) => {
      console.error("❌ Lỗi khi lấy dữ liệu vaccine:", err);
    },
  });

 
  const addVaccine = useMutation({
    mutationFn: createVaccine,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["vaccines"] });
    },
    onError: (error) => {
      console.error("❌ Lỗi khi thêm vaccine:", error);
    },
  });

 
  const editVaccine = useMutation({
    mutationFn: ({ id, data }) => updateVaccine(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["vaccines"] });
    },
    onError: (error) => {
      console.error("❌ Lỗi khi cập nhật vaccine:", error);
    },
  });

  
  const removeVaccine = useMutation({
    mutationFn: deleteVaccine,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["vaccines"] });
    },
    onError: (error) => {
      console.error("❌ Lỗi khi xóa vaccine:", error);
    },
  });

  return {
    vaccines,
    isLoading,
    isError,
    error,
    addVaccine,
    editVaccine,
    removeVaccine,
  };
};
