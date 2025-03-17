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
    onError: (err) => {
      console.error("❌ Lỗi khi lấy dữ liệu children:", err);
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
        } else {
            toast.error("⚠️ Thêm trẻ thất bại! Vui lòng thử lại.");
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
