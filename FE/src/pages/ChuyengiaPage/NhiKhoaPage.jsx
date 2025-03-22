import React from 'react';
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from 'react-router-dom';
import { IconButton, Typography } from "@mui/material";


export default function NhiKhoaPage() {
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
          Nhi khoa
        </h1>
        
        <div className="!mt-4">
          <h2 className="!text-2xl !font-semibold !text-blue-600 !mb-3">🩺 Sức khỏe tổng quát của trẻ</h2>
          <p className="!text-gray-700 !leading-relaxed">
            Sức khỏe tổng quát của trẻ bao gồm các chỉ số phát triển thể chất, tinh thần và miễn dịch. Việc theo dõi cân nặng, chiều cao và dinh dưỡng hợp lý
            giúp trẻ phát triển toàn diện.
          </p>
        </div>

        <div className="!mt-6">
          <h2 className="!text-2xl !font-semibold !text-blue-600 !mb-3">🤒 Các bệnh lý phổ biến ở trẻ</h2>
          <ul className="!list-disc !list-inside !text-gray-700 !space-y-2">
            <li>Viêm phổi và nhiễm trùng hô hấp</li>
            <li>Bệnh tay chân miệng</li>
            <li>Tiêu chảy cấp</li>
            <li>Sởi, quai bị, rubella</li>
            <li>Thiếu máu do thiếu sắt</li>
          </ul>
        </div>

        <div className="!mt-6">
          <h2 className="!text-2xl !font-semibold !text-blue-600 !mb-3">🛡️ Hướng dẫn chăm sóc y tế</h2>
          <ul className="!list-disc !list-inside !text-gray-700 !space-y-2">
            <li>Đưa trẻ đi khám định kỳ để theo dõi sức khỏe.</li>
            <li>Chú ý đến chế độ dinh dưỡng và giấc ngủ.</li>
            <li>Hạn chế tiếp xúc với môi trường ô nhiễm.</li>
            <li>Tiêm chủng đầy đủ để phòng ngừa bệnh tật.</li>
            <li>Thực hiện các biện pháp vệ sinh cá nhân.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
