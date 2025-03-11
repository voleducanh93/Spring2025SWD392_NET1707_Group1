import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getComboVaccines, getComboById, createCombo, updateCombo, deleteCombo } from "../api/comboVaccine.api";
import { toast } from "react-toastify";

export const useComboVaccine = () => {
  const queryClient = useQueryClient();

  const { data: combos, isLoading, isError, error } = useQuery({
    queryKey: ["comboVaccine"],
    queryFn: getComboVaccines,
    refetchOnWindowFocus: false,
  });

  const useGetComboByIdQuery = (id) => {
    return useQuery({
      queryKey: ["comboVaccine", id],
      queryFn: () => getComboById(id),
      enabled: !!id,
    });
  };

  const addCombo = useMutation({
    mutationFn: createCombo,
    onSuccess: () => {
      queryClient.invalidateQueries(["comboVaccine"]);
      toast.success("Combo Vaccine đã được thêm thành công!");
    },
    onError: (error) => {
      toast.error(`${error.response?.data?.errorMessages || "Lỗi không xác định"}`);
    },
  });

  const editCombo = useMutation({
    mutationFn: ({ id, data }) => updateCombo(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries(["comboVaccine"]);
      toast.success("Combo Vaccine đã được cập nhật thành công!");
    },
    onError: (error) => {
      toast.error(`${error.response?.data?.errorMessages || "Lỗi không xác định"}`);
    },
  });

  const removeCombo = useMutation({
    mutationFn: deleteCombo,
    onSuccess: () => {
      queryClient.invalidateQueries(["comboVaccine"]);
      toast.success("Combo Vaccine đã được xóa thành công!");
    },
    onError: (error) => {
      toast.error(`${error.response?.data?.errorMessages || "Lỗi không xác định"}`);
    },
  });

  return { combos, isLoading, isError, error, addCombo, editCombo, removeCombo, useGetComboByIdQuery };
};
