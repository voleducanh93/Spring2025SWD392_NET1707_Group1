import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getChildren, createChildren, updateChildren, deleteChildren } from "../api/children.api";

export const useChildren = () => {
  const queryClient = useQueryClient();

  const { data: vaccines, isLoading, isError, error } = useQuery({
    queryKey: ["children"],
    queryFn: getChildren,
    refetchOnWindowFocus: false,
    onError: (err) => {
      console.error("❌ Lỗi khi lấy dữ liệu children:", err);
    },
  });

  const addChildren = useMutation({
    mutationFn: createChildren,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["children"] });
    },
    onError: (error) => {
      console.error("❌ Lỗi khi thêm children:", error);
    },
  });

  const editChildren = useMutation({
    mutationFn: ({ id, data }) => updateChildren(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["children"] });
    },
    onError: (error) => {
      console.error("❌ Lỗi khi cập nhật children:", error);
    },
  });

  const removeChildren = useMutation({
    mutationFn: deleteChildren,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["children"] });
    },
    onError: (error) => {
      console.error("❌ Lỗi khi xóa children:", error);
    },
  });

  return {
    vaccines,
    isLoading,
    isError,
    error,
    addChildren,
    editChildren,
    removeChildren,
  };
};
