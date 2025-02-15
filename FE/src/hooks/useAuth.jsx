// useRegister.js
import { useMutation } from "@tanstack/react-query";
import authApi from "../api/auth.api";
import { toast } from "react-toastify";

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




// Hook cho quên mật khẩu
export const useForgotPassword = () => {
  return useMutation({
    mutationFn: (email) => authApi.forgotPassword(email),  // Gọi API quên mật khẩu
    onSuccess: (data) => {
      toast.success(data.message || "Đã gửi email đặt lại mật khẩu!");
    },
    onError: (error) => {
      toast.error(error.response?.data?.error || "Có lỗi xảy ra!");
    },
  });
};

