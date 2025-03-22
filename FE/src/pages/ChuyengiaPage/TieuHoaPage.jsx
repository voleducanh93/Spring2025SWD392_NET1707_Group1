import React from 'react';
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from 'react-router-dom';
import { IconButton, Typography } from "@mui/material";

export default function TieuHoaPage() {
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
          Hệ tiêu hóa và các bệnh lý thường gặp
        </h1>

        <div className="!mt-8">
          <h2 className="!text-2xl !font-semibold !text-blue-600 !mb-4">🥦 Vai trò của hệ tiêu hóa</h2>
          <p className="!text-gray-600 !leading-relaxed">
            Hệ tiêu hóa giúp hấp thu dinh dưỡng từ thức ăn, đảm bảo sự phát triển của trẻ. Ngoài ra, nó còn đóng vai trò quan trọng trong hệ miễn dịch, bảo vệ cơ thể khỏi các tác nhân gây bệnh.
          </p>
        </div>

        <div className="!mt-8">
          <h2 className="!text-2xl !font-semibold !text-blue-600 !mb-4">⚠️ Các bệnh lý tiêu hóa thường gặp</h2>
          <ul className="!list-disc !list-inside !text-gray-700 !space-y-2">
            <li>Tiêu chảy do nhiễm khuẩn hoặc virus.</li>
            <li>Táo bón do chế độ ăn ít chất xơ.</li>
            <li>Trào ngược dạ dày thực quản.</li>
            <li>Rối loạn tiêu hóa do thực phẩm không an toàn.</li>
          </ul>
        </div>

        <div className="!mt-8">
          <h2 className="!text-2xl !font-semibold !text-blue-600 !mb-4">🔍 Dấu hiệu nhận biết bệnh tiêu hóa</h2>
          <ul className="!list-disc !list-inside !text-gray-700 !space-y-2">
            <li>Đau bụng, chướng bụng.</li>
            <li>Nôn mửa, tiêu chảy hoặc táo bón kéo dài.</li>
            <li>Sụt cân không rõ nguyên nhân.</li>
          </ul>
        </div>

        <div className="!mt-8">
          <h2 className="!text-2xl !font-semibold !text-blue-600 !mb-4">📝 Cách chăm sóc hệ tiêu hóa khỏe mạnh</h2>
          <ul className="!list-disc !list-inside !text-gray-700 !space-y-2">
            <li>Bổ sung nhiều rau xanh và thực phẩm giàu chất xơ.</li>
            <li>Uống đủ nước mỗi ngày.</li>
            <li>Giữ vệ sinh thực phẩm sạch sẽ.</li>
            <li>Rèn thói quen ăn uống đúng giờ.</li>
          </ul>
        </div>

        <div className="!mt-8">
          <h2 className="!text-2xl !font-semibold !text-blue-600 !mb-4">🚑 Khi nào cần đưa trẻ đi khám?</h2>
          <p className="!text-gray-600 !leading-relaxed">
            Nếu trẻ có dấu hiệu mất nước, sốt cao, nôn liên tục hoặc không ăn uống được, cần đưa đến cơ sở y tế để được kiểm tra và điều trị kịp thời.
          </p>
        </div>
      </div>
    </div>
  );
}
