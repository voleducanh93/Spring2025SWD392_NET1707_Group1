
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from 'react-router-dom';
import { IconButton, Typography } from "@mui/material";


export default function TruyenNhiemPage() {
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
          Bệnh truyền nhiễm ở trẻ em
        </h1>

        <div className="!mt-8">
          <h2 className="!text-2xl !font-semibold !text-blue-600 !mb-4">📌 Các bệnh truyền nhiễm phổ biến</h2>
          <ul className="!list-disc !list-inside !text-gray-700 !space-y-2">
            <li>🤒 Sởi</li>
            <li>🤧 Quai bị</li>
            <li>🩹 Rubella</li>
            <li>🖐️ Tay chân miệng</li>
            <li>🤢 Cúm</li>
            <li>🤕 Thủy đậu</li>
            <li>💉 Bạch hầu</li>
          </ul>
        </div>

        <div className="!mt-8">
          <h2 className="!text-2xl !font-semibold !text-blue-600 !mb-4">⚠️ Triệu chứng nhận biết</h2>
          <p className="!text-gray-600 !leading-relaxed">
            Các bệnh truyền nhiễm thường có triệu chứng như sốt cao, phát ban, ho, đau họng, sưng hạch, nổi mụn nước hoặc tiêu chảy. 
            Phát hiện sớm và điều trị kịp thời giúp giảm biến chứng.
          </p>
        </div>

        <div className="!mt-8">
          <h2 className="!text-2xl !font-semibold !text-blue-600 !mb-4">🛡️ Cách phòng ngừa</h2>
          <ul className="!list-disc !list-inside !text-gray-700 !space-y-2">
            <li>💉 Tiêm chủng đầy đủ theo lịch</li>
            <li>🧼 Rửa tay thường xuyên bằng xà phòng</li>
            <li>🚫 Hạn chế tiếp xúc với người bệnh</li>
            <li>🍎 Ăn uống lành mạnh để tăng sức đề kháng</li>
          </ul>
        </div>
      </div>
    </div>
  );
}