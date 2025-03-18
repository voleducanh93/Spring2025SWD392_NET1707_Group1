import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getComboVaccines, getComboById, createCombo, updateCombo, deleteCombo } from "../api/comboVaccine.api";
import { toast } from "react-toastify";
import { handleApiError } from "../utils/utils";

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
      handleApiError(error);
    },
  });

  const editCombo = useMutation({
    mutationFn: ({ id, data }) => updateCombo(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries(["comboVaccine"]);
      toast.success("Combo Vaccine đã được cập nhật thành công!");
    },
    onError: (error) => {
      handleApiError(error);
    },
  });

  const removeCombo = useMutation({
    mutationFn: deleteCombo,
    onSuccess: () => {
      queryClient.invalidateQueries(["comboVaccine"]);
      toast.success("Combo Vaccine đã được xóa thành công!");
    },
    onError: (error) => {
      handleApiError(error);
    },
  });

  return { combos, isLoading, isError, error, addCombo, editCombo, removeCombo, useGetComboByIdQuery };
};
