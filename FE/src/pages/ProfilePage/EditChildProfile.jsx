import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  TextField,
  Button,
  CircularProgress,
  Alert,
  Grid,
  Box,
  Typography,
  Divider,
} from "@mui/material";
import { useChildren } from "../../hooks/useChildren"; // Custom hook để lấy dữ liệu trẻ
import { toast } from "react-toastify"; // Hiển thị thông báo

const EditChildProfile = () => {
  const { childId } = useParams();
  const { vaccines: children, isLoading, isError, error, editChildren } = useChildren();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: "",
    dateOfBirth: "",
    gender: "",
    medicalHistory: "",
    relationToUser: "",
    height: "",
    weight: "",
    imageUrl: "",
  });

  const [selectedFile, setSelectedFile] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const child = children.find((child) => child.childId == childId);
    if (child) {
      setFormData({
        fullName: child.fullName,
        dateOfBirth: child.dateOfBirth ? child.dateOfBirth.split("T")[0] : "",
        gender: child.gender,
        medicalHistory: child.medicalHistory,
        relationToUser: child.relationToUser,
        height: child.height,
        weight: child.weight,
        imageUrl: child.imageUrl,
      });
    }
  }, [children, childId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
      setFormData((prev) => ({
        ...prev,
        imageUrl: URL.createObjectURL(file), // Hiển thị ảnh xem trước
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let imageUrl = formData.imageUrl;

    if (selectedFile) {
      // 🔥 Nếu có file ảnh mới, upload lên server trước rồi lấy URL
      const formDataImage = new FormData();
      formDataImage.append("file", selectedFile);

      try {
        const response = await fetch("/api/upload", {
          method: "POST",
          body: formDataImage,
        });

        if (!response.ok) throw new Error("Upload ảnh thất bại!");

        const result = await response.json();
        imageUrl = result.imageUrl; // URL ảnh từ server
      } catch (error) {
        toast.error(error.message);
        return;
      }
    }

    // Chuẩn bị dữ liệu để gửi API
    const updatedData = {
      id: childId,
      data: {
        ...formData,
        dateOfBirth: formData.dateOfBirth + "T00:00:00.000Z",
        imageUrl, // Cập nhật ảnh URL mới
      },
    };

    // Gửi yêu cầu cập nhật
    editChildren.mutate(updatedData, {
      onSuccess: () => {
        toast.success("Cập nhật hồ sơ thành công!");
        navigate("/child-profile");
      },
      onError: (error) => {
        toast.error(`Lỗi: ${error.message}`);
      },
    });
  };

  if (isLoading) return <CircularProgress sx={{ display: "block", margin: "auto" }} />;
  if (isError) return <Alert severity="error">{error.message || "Không thể tải dữ liệu trẻ."}</Alert>;

  return (
    <Box sx={{ maxWidth: 800, margin: "auto", padding: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom align="center">
        Chỉnh Sửa Hồ Sơ Trẻ Em
      </Typography>

      {!isEditing ? (
        <Box>
          <Typography variant="h6" fontWeight="bold" gutterBottom>
            Thông Tin Trẻ Em:
          </Typography>
          <Typography><strong>Họ và Tên:</strong> {formData.fullName}</Typography>
          <Typography><strong>Ngày Sinh:</strong> {new Date(formData.dateOfBirth).toLocaleDateString("vi-VN")}</Typography>
          <Typography><strong>Giới Tính:</strong> {formData.gender === "Male" ? "Nam" : "Nữ"}</Typography>
          <Typography><strong>Quan Hệ:</strong> {formData.relationToUser}</Typography>
          <Typography><strong>Tiền Sử Bệnh:</strong> {formData.medicalHistory || "Không có"}</Typography>
          <Typography><strong>Chiều cao:</strong> {formData.height || "Không có"} cm</Typography>
          <Typography><strong>Cân nặng:</strong> {formData.weight || "Không có"} kg</Typography>
          {formData.imageUrl && (
            <Box mt={2}>
              <Typography variant="body2"><strong>Ảnh:</strong></Typography>
              <img src={formData.imageUrl} alt="Child" style={{ width: "100px", height: "100px", borderRadius: "8px" }} />
            </Box>
          )}
          <Divider sx={{ marginY: 2 }} />
          <Button variant="outlined" color="primary" fullWidth onClick={() => setIsEditing(true)}>Chỉnh Sửa</Button>
          <Button variant="outlined" color="secondary" fullWidth sx={{ mt: 2 }} onClick={() => navigate("/child-profile")}>Quay lại</Button>
        </Box>
      ) : (
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}><TextField label="Họ và Tên" name="fullName" value={formData.fullName} onChange={handleChange} fullWidth required /></Grid>
            <Grid item xs={12}><TextField label="Ngày Sinh" name="dateOfBirth" type="date" value={formData.dateOfBirth} onChange={handleChange} fullWidth required /></Grid>
            <Grid item xs={12}><TextField label="Giới Tính" name="gender" value={formData.gender} onChange={handleChange} fullWidth required /></Grid>
            <Grid item xs={12}><TextField label="Quan Hệ" name="relationToUser" value={formData.relationToUser} onChange={handleChange} fullWidth required /></Grid>
            <Grid item xs={12}><TextField label="Tiền Sử Bệnh" name="medicalHistory" value={formData.medicalHistory} onChange={handleChange} fullWidth multiline rows={3} /></Grid>
            <Grid item xs={6}><TextField label="Chiều Cao (cm)" name="height" type="number" value={formData.height} onChange={handleChange} fullWidth /></Grid>
            <Grid item xs={6}><TextField label="Cân Nặng (kg)" name="weight" type="number" value={formData.weight} onChange={handleChange} fullWidth /></Grid>
            <Grid item xs={12}>
              <Button variant="contained" component="label" fullWidth>
                Chọn Ảnh
                <input type="file" hidden accept="image/*" onChange={handleFileChange} />
              </Button>
              {formData.imageUrl && <img src={formData.imageUrl} alt="Preview" style={{ width: "100px", height: "100px", borderRadius: "8px", marginTop: 10 }} />}
            </Grid>
            <Grid item xs={12}><Button type="submit" variant="contained" fullWidth>Lưu Thay Đổi</Button></Grid>
            <Grid item xs={12}><Button variant="outlined" color="secondary" fullWidth onClick={() => setIsEditing(false)}>Hủy</Button></Grid>
          </Grid>
        </form>
      )}
    </Box>
  );
};

export default EditChildProfile;
