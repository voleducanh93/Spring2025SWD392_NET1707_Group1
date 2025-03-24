import { IconButton, Typography } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

export default function CoTheTrePage() {
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
          Cơ thể trẻ và sự phát triển
        </h1>
        <div className="!mt-8">
          <h2 className="!text-2xl !font-semibold !text-blue-600 !mb-4">🧒 Quá trình phát triển thể chất</h2>
          <p className="!text-gray-600 !leading-relaxed">
            Trẻ em phát triển theo từng giai đoạn quan trọng, bao gồm sự phát triển chiều cao, cân nặng,
            hệ thần kinh, và hệ miễn dịch. Việc theo dõi sự phát triển của trẻ giúp phát hiện sớm các vấn đề
            bất thường để can thiệp kịp thời.
          </p>
        </div>
        <div className="!mt-8">
          <h2 className="!text-2xl !font-semibold !text-blue-600 !mb-4">💪 Hệ miễn dịch và sức đề kháng</h2>
          <p className="!text-gray-600 !leading-relaxed">
            Hệ miễn dịch của trẻ chưa hoàn thiện trong những năm đầu đời, vì vậy việc tiêm chủng đúng lịch
            và chế độ dinh dưỡng hợp lý đóng vai trò quan trọng trong việc tăng cường sức đề kháng.
          </p>
        </div>
        <div className="!mt-8">
          <h2 className="!text-2xl !font-semibold !text-blue-600 !mb-4">🥦 Dinh dưỡng ảnh hưởng đến sự phát triển</h2>
          <p className="!text-gray-600 !leading-relaxed">
            Một chế độ ăn uống cân đối, đầy đủ chất dinh dưỡng giúp trẻ phát triển khỏe mạnh, tăng cường trí tuệ
            và thể chất. Nên bổ sung đầy đủ các nhóm thực phẩm như protein, vitamin, khoáng chất và chất xơ.
          </p>
        </div>
      </div>
    </div>
  );
}
