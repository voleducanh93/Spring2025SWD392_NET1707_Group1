import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createVaccineRecord, getVaccineRecord, updateVaccineRecord } from "../api/vaccineRecord.api";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

// ✅ Hook tạo hồ sơ tiêm chủng (Chỉ được gọi khi nhấn "Tiến hành tiêm")
export const useCreateVaccineRecord = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: createVaccineRecord,

    onSuccess: (data, bookingId) => {
      toast.success("Hồ sơ tiêm chủng đã được tạo!");
      navigate(`/doctor/record/${bookingId}`);
    },

    onError: (error, bookingId) => {
      toast.error("Tạo hồ sơ tiêm chủng thất bại!");
      navigate(`/doctor/record/${bookingId}`);
    },
  });
};


// ✅ Hook lấy thông tin hồ sơ tiêm chủng
export const useVaccineRecord = () => {
  const { bookingId } = useParams();

  return useQuery({
    queryKey: ["vaccineRecord", bookingId],
    queryFn: () => getVaccineRecord(bookingId),
    enabled: !!bookingId,
  });
};

export const useUpdateVaccineRecord = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ vaccinationRecordId, updatedData }) => updateVaccineRecord(vaccinationRecordId, updatedData),
    onSuccess: () => {
      toast.success("Cập nhật thành công!");
      queryClient.invalidateQueries(["vaccineRecord"]);
    },
    onError: () => {
      toast.error("Không thể cập nhật hồ sơ tiêm chủng!");
    },
  });
};
