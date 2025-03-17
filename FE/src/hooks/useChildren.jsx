import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getChildren, createChildren, updateChildren, deleteChildren } from "../api/children.api";
import { useContext } from "react";
import { AppContext } from "../contexts/app.context";
import { toast } from "react-toastify";

export const useChildren = () => {
  
  const queryClient = useQueryClient();
const { getUser} = useContext(AppContext);
  
if (!getUser) {
  toast.warn("⚠ Không tìm thấy thông tin người dùng! Vui lòng đăng nhập lại."); 
}

  const { data: vaccines, isLoading, isError, error } = useQuery({
    queryKey: ["children",getUser],
    queryFn: () => getChildren(getUser),
    refetchOnWindowFocus: false,
    onError: (error) => {
      if (error?.response?.data?.errorMessages?.length > 0) {
        const errorMessage = error.response.data.errorMessages[0]; 
        toast.error(`⚠️ ${errorMessage}`);
    }
    },
  });

  const addChildren = useMutation({
    mutationFn: (data) => createChildren(getUser, data),

    onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["children"] });
        toast.success("🎉 Thêm trẻ thành công!");
    },

    onError: (error) => {
        console.error("❌ Lỗi khi thêm trẻ:", error);

        
        if (error?.response?.data?.errorMessages?.length > 0) {
            const errorMessage = error.response.data.errorMessages[0]; 
            toast.error(`⚠️ ${errorMessage}`);
        } 
    }
});


  const editChildren = useMutation({
    mutationFn: ({ id, data }) => updateChildren(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["children"] });
    },
    onError: (error) => {
      if (error?.response?.data?.errorMessages?.length > 0) {
        const errorMessage = error.response.data.errorMessages[0]; 
        toast.error(`⚠️ ${errorMessage}`);
    } 
    },
  });

  const removeChildren = useMutation({
    mutationFn: deleteChildren,

    onSuccess: (_, id) => { // Lấy `id` từ mutation
        queryClient.setQueryData(["children"], (oldData) => {
            if (!oldData || oldData.length === 1) {
                return []; // Đảm bảo danh sách rỗng khi xóa phần tử cuối
            }
            return oldData.filter((child) => child.id !== id);
        });

        queryClient.invalidateQueries(["children"]); // Làm mới danh sách từ API

        toast.success("Đã xóa thành công");
    },

    onError: (error) => {
        if (error?.response?.data?.errorMessages?.length > 0) {
            const errorMessage = error.response.data.errorMessages[0]; 
            toast.error(`⚠️ ${errorMessage}`);
        }
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
