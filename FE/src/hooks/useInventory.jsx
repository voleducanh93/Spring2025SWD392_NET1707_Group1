import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createInventory, deleteInventory, getInventory, updateInventory } from "../api/VaccineInventory.api";
import { toast } from "react-toastify";

export const useInventory = () => {
  const queryClient = useQueryClient();

  const { data: inventory, isLoading } = useQuery({
    queryKey: ["inventory"],
    queryFn: getInventory,
  });

  const addInventory = useMutation({
    mutationFn: createInventory,
    onSuccess: () => {
      queryClient.invalidateQueries(["inventory"]);
      toast.success("✅ Thêm lô vaccine thành công!");
    },
    onError: (error) => {
      console.error("❌ Lỗi khi thêm lô vaccine:", error);
      toast.error("⚠️ Không thể thêm lô vaccine. Vui lòng thử lại!");
    },
  });

  const editInventory = useMutation({
    mutationFn: ({ id, data }) => updateInventory(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries(["inventory"]);
      toast.success("✅ Cập nhật thông tin lô vaccine thành công!");
    },
    onError: (error) => {
      console.error("❌ Lỗi khi cập nhật lô vaccine:", error);
      toast.error("⚠️ Không thể cập nhật lô vaccine. Vui lòng thử lại!");
    },
  });

  const removeInventory = useMutation({
    mutationFn: deleteInventory,
    onSuccess: () => {
      queryClient.invalidateQueries(["inventory"]);
      toast.success("✅ Xóa lô vaccine thành công!");
    },
    onError: (error) => {
      console.error("❌ Lỗi khi xóa lô vaccine:", error);
      toast.error("⚠️ Không thể xóa lô vaccine. Vui lòng thử lại!");
    },
  });

  return {
    inventory,
    isLoading,
    addInventory,
    editInventory,
    removeInventory,
  };
};
