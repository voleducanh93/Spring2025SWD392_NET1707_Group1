import React from 'react';
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from 'react-router-dom';
import { IconButton, Typography } from "@mui/material";

export default function HoHapPage() {
  const navigate = useNavigate();
  return (
    <div className="!min-h-screen !bg-gray-100 !flex !items-center !justify-center !p-6">
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
      <div className="!max-w-4xl !bg-white !p-8 !rounded-2xl !shadow-xl !border !border-gray-200">
        <h1 className="!text-4xl !font-bold !text-blue-700 !mb-6 !text-center">
          Bệnh lý hô hấp ở trẻ em
        </h1>

        <div className="!mt-8">
          <h2 className="!text-2xl !font-semibold !text-blue-600 !mb-4">🫁 Các bệnh hô hấp thường gặp</h2>
          <ul className="!list-disc !list-inside !text-gray-700 !space-y-2">
            <li>Viêm phổi</li>
            <li>Hen suyễn</li>
            <li>Viêm tiểu phế quản</li>
            <li>Cảm lạnh và cúm</li>
            <li>Viêm họng do virus</li>
          </ul>
        </div>

        <div className="!mt-8">
          <h2 className="!text-2xl !font-semibold !text-blue-600 !mb-4">💡 Biện pháp phòng ngừa</h2>
          <ul className="!list-disc !list-inside !text-gray-700 !space-y-2">
            <li>Tiêm vắc xin đầy đủ</li>
            <li>Giữ ấm cơ thể trẻ, đặc biệt vào mùa lạnh</li>
            <li>Rửa tay thường xuyên</li>
            <li>Tránh tiếp xúc với khói thuốc lá và ô nhiễm không khí</li>
            <li>Bổ sung dinh dưỡng đầy đủ giúp tăng cường miễn dịch</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
