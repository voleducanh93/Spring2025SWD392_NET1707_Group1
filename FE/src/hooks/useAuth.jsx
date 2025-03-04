// useRegister.js
import { useMutation } from "@tanstack/react-query";
import authApi from "../api/auth.api";
import { toast } from "react-toastify";
import { useQueryString } from "../utils/utils";
import { useContext } from "react";
import { AppContext } from "../contexts/app.context";
import { useNavigate } from "react-router-dom";

export const useRegister = () => {
  return useMutation({
    mutationFn: (userData) => authApi.registerAccount(userData),
    onSuccess: (data) => {
      toast.success(
        data.message || "Đăng ký thành công! Vui lòng kiểm tra email."
      );
    },
    onError: (error) => {
      toast.error(error.response?.data?.error || "Đăng ký thất bại!");
    },
  });
};

export const useLogin = () => {
  const { setIsAuthenticated, isAuthenticated } = useContext(AppContext);
  return useMutation({
    mutationFn: (userData) => authApi.login(userData),
    onSuccess: () => {
      setIsAuthenticated(true);
      console.log(isAuthenticated);

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
  //console.log(queryParams.email + queryParams.token);
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
export const useConfirmEmail = () => {
  const queryParams = useQueryString();
  const navigate = useNavigate();

  const email = queryParams.email;
  const token = queryParams.token;

  return useMutation({
    mutationFn: async () => {
      console.log(email, token);
      
      if (!email || !token) throw new Error("Thông tin không hợp lệ!");
      return await authApi.confirmEmail({ email, token });
    },
    onSuccess: (data) => {
      toast.success(data.message || "Xác nhận email thành công!, Mời bạn đăng nhập");
      setTimeout(() => navigate("/auth"), 2000); 
    },
    onError: (error) => {
      toast.error(error.response?.error || "Xác nhận thất bại!");
    },
  });
};
