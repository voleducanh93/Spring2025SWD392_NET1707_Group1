import React from 'react';
import { useNavigate } from 'react-router-dom';
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { IconButton, Typography } from '@mui/material';

export default function Covid19Page() {
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
          COVID-19 và Trẻ Em
        </h1>

        <div className="!mt-8">
          <h2 className="!text-2xl !font-semibold !text-blue-600 !mb-4">🦠 Triệu chứng COVID-19 ở trẻ</h2>
          <ul className="!list-disc !list-inside !text-gray-700 !space-y-2">
            <li>Sốt, ho, đau họng.</li>
            <li>Khó thở, mệt mỏi.</li>
            <li>Rối loạn tiêu hóa (buồn nôn, tiêu chảy).</li>
            <li>Mất vị giác, khứu giác.</li>
          </ul>
        </div>

        <div className="!mt-8">
          <h2 className="!text-2xl !font-semibold !text-blue-600 !mb-4">🛑 Biện pháp phòng ngừa</h2>
          <ul className="!list-disc !list-inside !text-gray-700 !space-y-2">
            <li>Đeo khẩu trang khi ra ngoài.</li>
            <li>Rửa tay thường xuyên với xà phòng.</li>
            <li>Giữ khoảng cách với người khác.</li>
            <li>Vệ sinh nhà cửa, đồ chơi của trẻ.</li>
          </ul>
        </div>

        <div className="!mt-8">
          <h2 className="!text-2xl !font-semibold !text-blue-600 !mb-4">💉 Tiêm chủng COVID-19 cho trẻ</h2>
          <p className="!text-gray-600 !leading-relaxed">
            Trẻ từ 5 tuổi trở lên nên được tiêm vắc xin COVID-19 theo hướng dẫn của Bộ Y tế.
            Việc tiêm chủng giúp giảm nguy cơ mắc bệnh nặng và lây nhiễm.
          </p>
        </div>
      </div>
    </div>
  );
}
