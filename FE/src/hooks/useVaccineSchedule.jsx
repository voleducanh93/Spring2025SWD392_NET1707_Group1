import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getVaccines, createVaccine, updateVaccine, deleteVaccine, VaccineById } from "../api/vaccineSchedule.api";
import { toast } from 'react-toastify'; // Import toast
import { handleApiError } from "../utils/utils";


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
      handleApiError(error);
    },
  });

  const editVaccine = useMutation({
    mutationFn: ({ id, data }) => updateVaccine(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["vaccineSchedule"] });
      toast.success("Vaccine đã được cập nhật thành công!"); 
    },
    onError: (error) => {
      handleApiError(error);
    },
  });

  const removeVaccine = useMutation({
    mutationFn: deleteVaccine,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["vaccineSchedule"] });
      toast.success("Vaccine đã được xóa thành công!"); 
    },
    onError: (error) => {
      handleApiError(error);
    },
  });
  

  return { vaccines, isLoading, isError, error, addVaccine, editVaccine, removeVaccine };
};

export const useVaccineScheduleById = (id) => {
  return useQuery({
    queryKey: ["vaccineScheduleID", id],
    queryFn: () => VaccineById(id),
    enabled: !!id, 
    refetchOnWindowFocus: false,
  });
};