import { useMutation } from "@tanstack/react-query";
import authApi from "../api/auth.api";
import { toast } from "react-toastify";

export const useRegister = () => {
    return useMutation({
      mutationFn: (userData) => authApi.registerAccount(userData),
      onSuccess: (data) => {
        if (data.message) {
          toast.success(data.message); 
        } else {
          toast.success("Đăng ký thành công! Vui lòng kiểm tra email.");
        }
      },
      onError: (error) => {
        toast.error(error.response?.data?.message || "Đăng ký thất bại!");
      }
    });
  };
  

  export const useLogin = () => {
    return useMutation({
      mutationFn: (userData) => authApi.login(userData),
      onSuccess: (data) => {
        console.log(data)
  
            console.log("Đăng nhập thành công!")
          toast.success("Đăng nhập thành công")
        
        //   toast.error("Đăng nhập thành công nhưng không có token hợp lệ!");
        
      },
      onError: (error) => {
        toast.error(error.response?.data?.message || "Đăng nhập thất bại!");
      }
    });
  };
