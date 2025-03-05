import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Container,
  Typography,
  CircularProgress,
  Card,
  CardContent,
  CardMedia,
  Box,
  Divider,
  IconButton,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { toast } from "react-toastify";
import { getVaccineById } from "../../api/vaccine.api";

const VaccineDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [vaccine, setVaccine] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVaccineDetail = async () => {
      try {
        const data = await getVaccineById(id);
        setVaccine(data);
      } catch {
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
    <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
      <IconButton
        onClick={() => navigate(-1)}
        sx={{
          position: "absolute",
          top: 180,
          left: 180,
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
      <Card sx={{ borderRadius: 3, boxShadow: 3 }}>
        <CardMedia
          component="img"
          height="300"
          image={vaccine.image}
          alt={vaccine.name}
          sx={{ objectFit: "cover" }}
        />
        <CardContent>
          <Typography variant="h4" color="primary" gutterBottom>
            {vaccine.name}
          </Typography>
          <Typography variant="body1" color="textSecondary" gutterBottom>
            {vaccine.description}
          </Typography>
          <Divider sx={{ my: 2 }} />
          <Box sx={{ mb: 2 }}>
            <Typography variant="body1" gutterBottom>
              <strong>Hãng sản xuất:</strong> {vaccine.manufacturer}
            </Typography>
            <Typography variant="body1" gutterBottom>
              <strong>Bệnh phòng ngừa:</strong> {vaccine.diseasePrevented}
            </Typography>
            <Typography variant="body1" gutterBottom>
              <strong>Vị trí tiêm:</strong> {vaccine.injectionSite}
            </Typography>
            <Typography variant="body1" gutterBottom>
              <strong>Số mũi tiêm:</strong> {vaccine.injectionsCount}
            </Typography>
            <Typography variant="body1" gutterBottom>
              <strong>Giá:</strong> {vaccine.price.toLocaleString()} VND
            </Typography>
            <Typography variant="body1" gutterBottom>
              <strong>Phản ứng không mong muốn:</strong> {vaccine.undesirableEffects}
            </Typography>
            <Typography variant="body1" gutterBottom>
              <strong>Tương tác với vắc xin khác:</strong> {vaccine.vaccineInteractions}
            </Typography>
            <Typography variant="body1" gutterBottom>
              <strong>Cách bảo quản:</strong> {vaccine.preserve}
            </Typography>
            <Typography variant="body1" gutterBottom>
              <strong>Ghi chú:</strong> {vaccine.notes}
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </Container>
  );
};

export default VaccineDetail;
