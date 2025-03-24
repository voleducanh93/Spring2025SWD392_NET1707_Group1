import React from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from 'react-router-dom';
import { IconButton, Typography } from "@mui/material";

export default function GioithieuPage() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen !bg-gray-100 !flex !items-center !justify-center !p-6">
      <IconButton
              onClick={() => navigate(-1)}
              sx={{
                position: "absolute",
                top: 160,
                left: 120,
                display: "flex",
                alignItems: "center",
                gap: 1,
                backgroundColor: "#f5f5f5",
                p: 1,
                borderRadius: 2,
                "&:hover": { backgroundColor: "#e0e0e0" },
              }}
            >
              <ArrowBackIcon />
              <Typography variant="body1">Back</Typography>
            </IconButton>
      <div className="max-w-4xl !bg-white !p-8 !rounded-2xl !shadow-xl !border !border-gray-200">
        <h1 className="!text-4xl !font-bold !text-blue-700 !mb-6 !text-center">
          Giới thiệu về <span className="!text-orange-500">CVSTS</span>
        </h1>

        <p className="!text-gray-600 !text-lg !leading-relaxed !text-center">
          Child Vaccine Schedule Tracking System (CVSTS) là một hệ thống thông minh giúp các cơ sở y tế và phụ huynh
          dễ dàng theo dõi, quản lý và nhắc nhở lịch tiêm chủng cho trẻ nhỏ một cách hiệu quả.
        </p>

        <p className="!text-gray-600 !leading-relaxed !mt-4">
          Với sự phát triển của công nghệ, CVSTS mang lại một giải pháp toàn diện giúp giảm thiểu sai sót trong việc 
          theo dõi lịch tiêm, tăng cường khả năng tiếp cận thông tin và đảm bảo rằng trẻ nhỏ nhận được đầy đủ các mũi tiêm cần thiết.
        </p>

        <div className="!mt-8">
          <h2 className="!text-2xl !font-semibold !text-blue-600 !mb-4">Tính năng chính</h2>
          <ul className="!list-disc !list-inside !text-gray-700 !space-y-2">
            <li>📅 Tra cứu lịch tiêm chủng nhanh chóng và chính xác.</li>
            <li>📂 Quản lý hồ sơ tiêm chủng của từng trẻ em một cách chi tiết.</li>
            <li>🔔 Nhắc nhở lịch tiêm phòng tự động qua email và tin nhắn.</li>
            <li>👥 Hệ thống phân quyền cho khách, phụ huynh, nhân viên và quản trị viên.</li>
            <li>📊 Cung cấp báo cáo thống kê giúp các cơ sở y tế dễ dàng quản lý dữ liệu.</li>
          </ul>
        </div>

        <div className="!mt-8">
          <h2 className="!text-2xl !font-semibold !text-blue-600 !mb-4">Lợi ích</h2>
          <ul className="!list-disc !list-inside !text-gray-700 !space-y-2">
            <li>🎯 Giảm thiểu nguy cơ bỏ sót mũi tiêm quan trọng.</li>
            <li>📱 Giao diện thân thiện, dễ sử dụng cho cả phụ huynh và nhân viên y tế.</li>
            <li>🔔 Nhắc nhở tự động giúp người dùng không quên lịch tiêm.</li>
            <li>💾 Lưu trữ và truy xuất thông tin tiêm chủng nhanh chóng.</li>
          </ul>
        </div>

        <div className="!mt-8">
          <h2 className="!text-2xl !font-semibold !text-blue-600 !mb-4">Hướng dẫn sử dụng</h2>
          <ol className="!list-decimal !list-inside !text-gray-700 !space-y-2">
            <li>Đăng ký tài khoản và đăng nhập vào hệ thống.</li>
            <li>Thêm thông tin của trẻ cần theo dõi lịch tiêm.</li>
            <li>Xem danh sách các mũi tiêm cần thiết và thời gian dự kiến.</li>
            <li>Nhận thông báo nhắc nhở trước ngày tiêm.</li>
            <li>Cập nhật trạng thái sau khi hoàn thành mũi tiêm.</li>
          </ol>
        </div>

        <div className="!mt-8">
          <h2 className="!text-2xl !font-semibold !text-blue-600 !mb-4">Câu hỏi thường gặp</h2>
          <details className="!mb-4 !border !border-gray-300 !rounded-lg !p-4 !bg-gray-50">
            <summary className="!text-lg !font-medium !cursor-pointer">CVSTS có miễn phí không?</summary>
            <p className="!mt-2 !text-gray-600">CVSTS có phiên bản miễn phí với các tính năng cơ bản và phiên bản nâng cấp dành cho cơ sở y tế.</p>
          </details>
          <details className="!mb-4 !border !border-gray-300 !rounded-lg !p-4 !bg-gray-50">
            <summary className="!text-lg !font-medium !cursor-pointer">Làm sao để nhận thông báo nhắc nhở?</summary>
            <p className="!mt-2 !text-gray-600">Bạn có thể nhận thông báo qua email hoặc tin nhắn SMS khi đăng ký tài khoản.</p>
          </details>
        </div>
      </div>
    </div>
  );
}
