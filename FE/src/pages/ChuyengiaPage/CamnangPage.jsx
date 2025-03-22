import { IconButton, Typography } from "@mui/material";
import React from "react";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";

export default function CamnangPage() {
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
          Cẩm nang tiêm chủng cho trẻ em
        </h1>

        {/* Các loại vắc xin quan trọng cho trẻ em */}
        <div className="!mt-8">
          <h2 className="!text-2xl !font-semibold !text-blue-600 !mb-4">
            💉 Các loại vắc xin quan trọng
          </h2>
          <ul className="!list-disc !list-inside !text-gray-700 !space-y-2">
            <li>Vắc xin BCG - phòng lao</li>
            <li>
              Vắc xin 6 trong 1 - phòng bạch hầu, ho gà, uốn ván, bại liệt, viêm
              gan B, Hib
            </li>
            <li>Vắc xin sởi - quai bị - rubella</li>
            <li>Vắc xin cúm mùa</li>
            <li>Vắc xin thủy đậu</li>
            <li>Vắc xin phế cầu - phòng viêm phổi, viêm màng não</li>
            <li>Vắc xin rota - phòng tiêu chảy do rotavirus</li>
          </ul>
        </div>

        {/* Hướng dẫn chăm sóc sau tiêm */}
        <div className="!mt-8">
          <h2 className="!text-2xl !font-semibold !text-blue-600 !mb-4">
            🩺 Hướng dẫn chăm sóc sau tiêm
          </h2>
          <ul className="!list-disc !list-inside !text-gray-700 !space-y-2">
            <li>❄️ Chườm lạnh nhẹ lên vị trí tiêm để giảm sưng.</li>
            <li>🥛 Cho trẻ bú mẹ hoặc uống nhiều nước.</li>
            <li>🛑 Theo dõi dấu hiệu bất thường như sốt cao, co giật.</li>
            <li>📞 Đưa trẻ đến cơ sở y tế nếu có phản ứng nghiêm trọng.</li>
          </ul>
        </div>

        {/* Khi nào cần trì hoãn lịch tiêm? */}
        <div className="!mt-8">
          <h2 className="!text-2xl !font-semibold !text-blue-600 !mb-4">
            🚫 Khi nào cần trì hoãn lịch tiêm?
          </h2>
          <ul className="!list-disc !list-inside !text-gray-700 !space-y-2">
            <li>Trẻ đang bị sốt cao hoặc mắc bệnh cấp tính.</li>
            <li>Trẻ có tiền sử phản ứng dị ứng nặng với lần tiêm trước.</li>
            <li>
              Trẻ suy giảm miễn dịch hoặc đang điều trị thuốc ức chế miễn dịch.
            </li>
          </ul>
        </div>

        {/* Những ai không nên tiêm chủng? */}
        <div className="!mt-8">
          <h2 className="!text-2xl !font-semibold !text-blue-600 !mb-4">
            ❌ Những ai không nên tiêm chủng?
          </h2>
          <ul className="!list-disc !list-inside !text-gray-700 !space-y-2">
            <li>Trẻ có tiền sử phản vệ độ III trở lên với vắc xin.</li>
            <li>Trẻ mắc bệnh mãn tính nghiêm trọng chưa được kiểm soát.</li>
            <li>Trẻ bị suy giảm miễn dịch nghiêm trọng.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
