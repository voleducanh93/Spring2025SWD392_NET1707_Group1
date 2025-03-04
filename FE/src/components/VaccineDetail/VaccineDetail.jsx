import  { useEffect, useState } from "react";
import { useParams } from "react-router-dom"; // Lấy `id` từ URL
import { Button, CardContent, Container, Typography, CircularProgress } from "@mui/material";
import SellIcon from "@mui/icons-material/Sell";

import { toast } from "react-toastify";
import { getVaccineById } from "../../api/vaccine.api";

const VaccineDetail = () => {
  const { id } = useParams(); // Lấy ID vaccine từ URL
  const [vaccine, setVaccine] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVaccineDetail = async () => {
      try {
        const data = await getVaccineById(id);
        console.log(data);
        
        setVaccine(data);
      } catch  {
        toast.error("Không thể tải thông tin vaccine!");
      } finally {
        setLoading(false);
      }
    };

    fetchVaccineDetail();
  }, [id]);

  if (loading) {
    return (
      <Container className="flex justify-center items-center h-screen">
        <CircularProgress />
      </Container>
    );
  }

  if (!vaccine) {
    return (
      <Container className="text-center mt-10">
        <Typography variant="h5" color="error">
          Không tìm thấy thông tin vaccine!
        </Typography>
      </Container>
    );
  }

  return (
    <Container>
      <div className="flex gap-8">
        {/* Thông tin vaccine */}
        <div className="w-1/3">
          <CardContent className="text-white bg-[#055AB9] rounded-3xl !p-10">
            <Typography variant="h5" className="font-semibold text-xl">
              {vaccine.name}
            </Typography>
            <Typography sx={{ mb: 1.5 }}>Nguồn gốc: {vaccine.manufacturer}</Typography>
            <Typography sx={{ mb: 1.5 }}>Phòng bệnh: {vaccine.diseasePrevented}</Typography>
            <Typography variant="body2" className="flex items-center gap-2 !my-10">
              <SellIcon className="text-white" />
              <span className="text-2xl font-semibold">
                {vaccine.price.toLocaleString()} VNĐ
              </span>
            </Typography>
            <Button
              size="small"
              className="!bg-[#1F2B75] !text-white !rounded-xl hover:!bg-[#2A388F] transition-all mt-4 w-full !p-3"
            >
              Chọn
            </Button>
          </CardContent>
        </div>

        {/* Mô tả vaccine */}
        <div className="w-2/3">
          <h2>Mô tả thông tin vắc xin: {vaccine.name}</h2>
          <div className="!p-10">
            <img src={`/assets/${vaccine.image}`} alt={vaccine.name} className="w-full h-auto" />
          </div>
          <div className="border-[#2A388F] border-2 rounded-xl">
            <div className="bg-gradient-to-r from-[#052065] via-[#052065] to-[#0780CB] text-[#FBA307] p-4 rounded-tl-xl rounded-tr-xl overflow-hidden">
              <h2>Thông tin vắc xin</h2>
            </div>
            <div className="p-4">
              <p>
                <strong>Vị trí tiêm:</strong> {vaccine.injectionSite}
              </p>
              <p>
                <strong>Số mũi tiêm:</strong> {vaccine.injectionsCount}
              </p>
              <p>
                <strong>Phản ứng không mong muốn:</strong> {vaccine.undesirableEffects}
              </p>
              <p>
                <strong>Cách bảo quản:</strong> {vaccine.preserve}
              </p>
              <p>
                <strong>Ghi chú:</strong> {vaccine.notes}
              </p>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default VaccineDetail;
