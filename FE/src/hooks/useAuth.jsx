// useRegister.js
import { useMutation } from "@tanstack/react-query";
import authApi from "../api/auth.api";
import { toast } from "react-toastify";
import { useQueryString } from "../utils/utils";

export const useRegister = () => {
  return useMutation({
    mutationFn: (userData) => authApi.registerAccount(userData),
    onSuccess: (data) => {
      toast.success(data.message || "Đăng ký thành công! Vui lòng kiểm tra email.");
    },
    onError: (error) => {
      toast.error(error.response?.data?.error || "Đăng ký thất bại!");
    },
  });
};


export const useLogin = () => {
  return useMutation({
    mutationFn: (userData) => authApi.login(userData),
    onSuccess: (data) => {
      toast.success("Đăng nhập thành công!");
    },
    onError: (error) => {
      toast.error(error.response?.data?.error || "Đăng nhập thất bại!");
    },
  });
};





export const useForgotPassword = () => {
  return useMutation({
    mutationFn: (email) => authApi.forgotPassword(email),
    onSuccess: (data) => {
      toast.success(data.message || "Đã gửi email đặt lại mật khẩu!");
    },
    onError: (error) => {
      toast.error(error.response?.data?.error || "Có lỗi xảy ra!");
    },
  });
};


export const useResetPassword = () => {
  const queryParams = useQueryString(); 
  console.log(queryParams.email + queryParams.token);
  return useMutation({
    
    
    mutationFn: (passwordData) =>
      authApi.resetPassword({
        email: queryParams.email, 
        token: queryParams.token, 
        newPassword: passwordData.newPassword, // Fix lỗi truyền tham số

      }),

    onSuccess: (data) => {
      toast.success(data.message || "Mật khẩu đã được đặt lại thành công!");
    },

    onError: (error) => {
      toast.error(error.response?.data?.error || "Có lỗi xảy ra!");
    },
  });
};
