import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import { useContext } from "react";
import { AppContext } from "../contexts/app.context";
import { toast } from "react-toastify";
import { createUser, deleteUser, getUsers, updateUser } from "../api/user.api";

export const useUsers = () => {
  const queryClient = useQueryClient();
  const { getUser } = useContext(AppContext);

  if (!getUser) {
    toast.warn("⚠ Không tìm thấy thông tin người dùng! Vui lòng đăng nhập lại.");
  }

  // Lấy danh sách người dùng
  const { data: users, isLoading, isError, error } = useQuery({
    queryKey: ["users"],
    queryFn: getUsers,
    refetchOnWindowFocus: false,
    onError: (error) => {
      if (error?.response?.data?.errorMessages?.length > 0) {
        const errorMessage = error.response.data.errorMessages[0];
        toast.error(`⚠️ ${errorMessage}`);
      }
    },
  });

  // Thêm người dùng
  const addUser = useMutation({
    mutationFn: createUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      toast.success("🎉 Thêm người dùng thành công!");
    },
    onError: (error) => {
      console.error("❌ Lỗi khi thêm người dùng:", error);
      if (error?.response?.data?.errorMessages?.length > 0) {
        const errorMessage = error.response.data.errorMessages[0];
        toast.error(`⚠️ ${errorMessage}`);
      }
    },
  });

  // Chỉnh sửa người dùng
  const editUser = useMutation({
    mutationFn: ({ id, data }) => updateUser(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      toast.success("✅ Cập nhật người dùng thành công!");
    },
    onError: (error) => {
      console.error("❌ Lỗi khi cập nhật người dùng:", error);
      if (error?.response?.data?.errorMessages?.length > 0) {
        const errorMessage = error.response.data.errorMessages[0];
        toast.error(`⚠️ ${errorMessage}`);
      }
    },
  });

  // Xóa người dùng
  const removeUser = useMutation({
    mutationFn: deleteUser,
    onSuccess: (_, id) => {
      queryClient.setQueryData(["users"], (oldData) => {
        if (!oldData || oldData.length === 1) {
          return []; // Nếu xóa phần tử cuối cùng, danh sách trở thành rỗng
        }
        return oldData.filter((user) => user.id !== id);
      });

      queryClient.invalidateQueries(["users"]); // Làm mới danh sách từ API
      toast.success("✅ Đã xóa người dùng thành công");
    },
    onError: (error) => {
      console.error("❌ Lỗi khi xóa người dùng:", error);
      if (error?.response?.data?.errorMessages?.length > 0) {
        const errorMessage = error.response.data.errorMessages[0];
        toast.error(`⚠️ ${errorMessage}`);
      }
    },
  });

  return {
    users,
    isLoading,
    isError,
    error,
    addUser,
    editUser,
    removeUser,
  };
};
