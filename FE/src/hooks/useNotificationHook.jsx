import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import { useContext, useEffect } from "react";

import { toast } from "react-toastify";

import { AppContext } from "../contexts/app.context";
import { deleteNotification, getAllNotifications, getUnreadCount, markAsRead } from "../api/notification.api";
import notificationService from "../services/NotificationService";


export const useNotificationHook = () => {
  const queryClient = useQueryClient();
  const { getUser } = useContext(AppContext);

  if (!getUser) {
    toast.warn("⚠ Không tìm thấy thông tin người dùng! Vui lòng đăng nhập lại.");
  }

  // Fetch danh sách thông báo
  const { data: notifications = [], isLoading, isError, error } = useQuery({
    queryKey: ["notifications", getUser],
    queryFn: () => getAllNotifications(getUser),
    refetchOnWindowFocus: false,
    onError: (err) => {
      console.error("❌ Lỗi khi lấy thông báo:", err);
    },
  });

  // Fetch số lượng thông báo chưa đọc
  const { data: unreadCount = 0 } = useQuery({
    queryKey: ["unreadCount", getUser],
    queryFn: () => getUnreadCount(getUser),
    refetchOnWindowFocus: false,
    onError: (err) => {
      console.error("❌ Lỗi khi lấy số lượng thông báo chưa đọc:", err);
    },
    select: (data) => data?.unreadCount || 0,
  });

  // Mutation: Đánh dấu thông báo đã đọc
  const markAsReadMutation = useMutation({
    mutationFn: (notificationId) => markAsRead(notificationId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notifications"] });
      queryClient.invalidateQueries({ queryKey: ["unreadCount"] });
    },
    onError: (error) => {
      console.error("❌ Lỗi khi đánh dấu thông báo đã đọc:", error);
      toast.error("⚠️ Không thể đánh dấu thông báo! Vui lòng thử lại.");
    },
  });

  // Mutation: Xóa thông báo
  const deleteNotificationMutation = useMutation({
    mutationFn: deleteNotification,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notifications"] });
      queryClient.invalidateQueries({ queryKey: ["unreadCount"] });
      toast.success("✅ Đã xóa thông báo!");
    },
    onError: (error) => {
      console.error("❌ Lỗi khi xóa thông báo:", error);
      toast.error("⚠️ Không thể xóa thông báo! Vui lòng thử lại.");
    },
  });

  // Kết nối real-time với SignalR
  useEffect(() => {
    notificationService.startConnection();

    const unsubscribe = notificationService.addListener((notification) => {
      queryClient.setQueryData(["notifications", getUser], (oldData = []) => [notification, ...oldData]);
      queryClient.setQueryData(["unreadCount", getUser], (oldData) => (oldData || 0) + 1);

      toast.info(`🔔 ${notification.message}`, { autoClose: 5000 });
    });

    return () => {
      unsubscribe();
      notificationService.stopConnection();
    };
  }, [queryClient, getUser]);

  return {
    notifications,
    unreadCount,
    isLoading,
    isError,
    error,
    markAsRead: markAsReadMutation.mutate,
    deleteNotification: deleteNotificationMutation.mutate,
  };
};
