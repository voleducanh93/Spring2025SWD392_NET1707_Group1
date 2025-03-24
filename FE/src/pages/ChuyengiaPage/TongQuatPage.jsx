import React from 'react';
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from 'react-router-dom';
import { IconButton, Typography } from "@mui/material";

export default function TongQuatPage() {
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
          Thông Tin Tổng Quát
        </h1>
        
        <div className="!mt-8">
          <h2 className="!text-2xl !font-semibold !text-blue-600 !mb-4">👶 Sức khỏe tổng quát cho trẻ em</h2>
          <p className="!text-gray-600 !leading-relaxed">
            Việc chăm sóc sức khỏe cho trẻ em đòi hỏi sự quan tâm đặc biệt từ cha mẹ và người giám hộ.
            Dưới đây là những yếu tố quan trọng để đảm bảo trẻ phát triển khỏe mạnh:
          </p>
          <ul className="!list-disc !list-inside !text-gray-700 !space-y-2 mt-4">
            <li>💧 Đảm bảo chế độ dinh dưỡng đầy đủ và cân bằng.</li>
            <li>🏃 Khuyến khích vận động thể chất hàng ngày.</li>
            <li>😴 Đảm bảo trẻ có giấc ngủ đủ và chất lượng.</li>
            <li>🩺 Khám sức khỏe định kỳ để phát hiện sớm các vấn đề.</li>
            <li>🦷 Chăm sóc răng miệng đúng cách từ nhỏ.</li>
          </ul>
        </div>
        
        <div className="!mt-8">
          <h2 className="!text-2xl !font-semibold !text-blue-600 !mb-4">🛑 Các dấu hiệu cần lưu ý</h2>
          <p className="!text-gray-600 !leading-relaxed">
            Nếu trẻ có các dấu hiệu sau, cha mẹ cần đưa trẻ đến cơ sở y tế để kiểm tra kịp thời:
          </p>
          <ul className="!list-disc !list-inside !text-gray-700 !space-y-2 mt-4">
            <li>🤒 Sốt cao kéo dài không rõ nguyên nhân.</li>
            <li>🤢 Buồn nôn, nôn nhiều hoặc tiêu chảy kéo dài.</li>
            <li>💤 Ngủ nhiều bất thường, lờ đờ, ít phản ứng.</li>
            <li>💨 Khó thở, thở nhanh hoặc có dấu hiệu tím tái.</li>
            <li>🩹 Phát ban da kèm theo sốt hoặc dấu hiệu nhiễm trùng.</li>
          </ul>
        </div>
        
        <div className="!mt-8">
          <h2 className="!text-2xl !font-semibold !text-blue-600 !mb-4">🩺 Phòng bệnh cho trẻ</h2>
          <p className="!text-gray-600 !leading-relaxed">
            Phòng bệnh là cách tốt nhất để bảo vệ sức khỏe trẻ em. Một số biện pháp quan trọng bao gồm:
          </p>
          <ul className="!list-disc !list-inside !text-gray-700 !space-y-2 mt-4">
            <li>🧼 Giữ vệ sinh cá nhân sạch sẽ, rửa tay thường xuyên.</li>
            <li>💉 Tiêm phòng đầy đủ theo lịch tiêm chủng.</li>
            <li>🍏 Cung cấp chế độ ăn uống lành mạnh, đủ vitamin.</li>
            <li>🏡 Giữ môi trường sống sạch sẽ, tránh khói bụi và ô nhiễm.</li>
            <li>🛌 Đảm bảo giấc ngủ đủ giúp tăng cường miễn dịch.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}