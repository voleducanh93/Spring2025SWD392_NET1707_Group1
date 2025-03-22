import { IconButton, Typography } from '@mui/material';
import React from 'react';
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from 'react-router-dom';

export default function DiUngPage() {
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
          Dị ứng ở trẻ em
        </h1>
        
        <div className="!mt-8">
          <h2 className="!text-2xl !font-semibold !text-blue-600 !mb-4">❓ Dị ứng là gì?</h2>
          <p className="!text-gray-600 !leading-relaxed">
            Dị ứng là phản ứng quá mức của hệ miễn dịch đối với các tác nhân thông thường như thức ăn, phấn hoa, lông thú hoặc thuốc.
            Trẻ nhỏ có thể dễ bị dị ứng hơn do hệ miễn dịch chưa hoàn thiện.
          </p>
        </div>
        
        <div className="!mt-8">
          <h2 className="!text-2xl !font-semibold !text-blue-600 !mb-4">🌿 Nguyên nhân phổ biến</h2>
          <ul className="!list-disc !list-inside !text-gray-700 !space-y-2">
            <li>Thực phẩm: sữa, trứng, hải sản, đậu phộng.</li>
            <li>Phấn hoa, bụi nhà, lông động vật.</li>
            <li>Thuốc, đặc biệt là kháng sinh.</li>
            <li>Thời tiết thay đổi đột ngột.</li>
            <li>Hóa chất như nước hoa, xà phòng.</li>
          </ul>
        </div>
        
        <div className="!mt-8">
          <h2 className="!text-2xl !font-semibold !text-blue-600 !mb-4">⚠️ Triệu chứng nhận biết</h2>
          <ul className="!list-disc !list-inside !text-gray-700 !space-y-2">
            <li>Nổi mẩn đỏ, ngứa da.</li>
            <li>Hắt hơi, chảy nước mũi.</li>
            <li>Khó thở, khò khè.</li>
            <li>Buồn nôn, đau bụng, tiêu chảy.</li>
            <li>Phản ứng nghiêm trọng như sốc phản vệ.</li>
          </ul>
        </div>
        
        <div className="!mt-8">
          <h2 className="!text-2xl !font-semibold !text-blue-600 !mb-4">🛡️ Phòng ngừa & Điều trị</h2>
          <ul className="!list-disc !list-inside !text-gray-700 !space-y-2">
            <li>Tránh tiếp xúc với tác nhân gây dị ứng.</li>
            <li>Dùng thuốc kháng histamin theo chỉ định.</li>
            <li>Vệ sinh nhà cửa sạch sẽ, tránh bụi bẩn.</li>
            <li>Giữ ấm cho trẻ vào thời điểm giao mùa.</li>
            <li>Đi khám bác sĩ khi có dấu hiệu nghiêm trọng.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
