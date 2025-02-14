import { useMutation } from "@tanstack/react-query";
import authApi from "../api/auth.api";
import { toast } from "react-toastify";
import { useContext } from "react";
import { AppContext } from "../contexts/app.context";
import { useNavigate } from "react-router-dom";

export const useRegister = () => {
  const mutation = useMutation({
    mutationFn: (userData) => authApi.registerAccount(userData),

    onSuccess: (data) => {
      if (data.message) {
        toast.success(data.message); 
      } else {
        toast.success("Đăng ký thành công! Bạn cần phải đăng nhập lại.");
      }
    },

    onError: (error) => {
      if (error.response?.data?.error) {
        toast.error(error.response.data.error);
      } else {
        toast.error("Đăng ký thất bại!");
      }
    }
  });

  return {
    mutate: mutation.mutate, 
    isLoading: mutation.isLoading, 
    isError: mutation.isError, 
    isSuccess: mutation.isSuccess,
  };
};

export const useLogin = () => {
  const { setIsAuthenticated } = useContext(AppContext);
  const navigate = useNavigate(); 

  return useMutation({
    mutationFn: (userData) => authApi.login(userData),

    onSuccess: (data) => {
      if (data) {
        setIsAuthenticated(true);
        toast.success("Đăng nhập thành công!");
        navigate("/");
      } else {
        toast.error("Đăng nhập thành công nhưng không có token hợp lệ!");
      }
    },

    onError: (error) => {
      if (error.response?.data?.data) {
        const formError = error.response?.data?.data;
        Object.keys(formError).forEach((key) => {
          toast.error(`${key}: ${formError[key]}`);
        });
      } else {
        toast.error(error.response?.data?.error || "Đăng nhập thất bại!");
      }
    },
  });
};
