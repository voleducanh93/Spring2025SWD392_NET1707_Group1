import { useEffect, useState } from "react";
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
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import { useChildren } from "../../hooks/useChildren"; // Custom hook để lấy dữ liệu trẻ
import { toast } from "react-toastify"; // Hiển thị thông báo
import { uploadFile } from "../../config/firebase";
import moment from "moment";

const EditChildProfile = () => {
  const { childId } = useParams();
  const {
    vaccines: children,
    isLoading,
    isError,
    error,
    editChildren,
  } = useChildren();
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
  const [isUploading, setIsUploading] = useState(false);
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
      console.log(child.imageUrl);
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
    setIsUploading(true);

    const selectedDate = moment(formData.dateOfBirth, "YYYY-MM-DD");

    if (!selectedDate.isValid() || selectedDate.isAfter(moment())) {
      toast.error("Ngày sinh không được lớn hơn ngày hiện tại!");
      return;
    }
    if (formData.height < 0 ) {
      toast.error("Chiều cao không hợp lệ!");
      return;
    }
  
    if (formData.weight < 0) {
      toast.error("Cân nặng không hợp lệ!");
      return;
    }
    let imageUrl = formData.imageUrl;

    if (selectedFile) {
      imageUrl = await uploadFile(selectedFile);
    }

    const updatedData = {
      id: childId,
      data: {
        ...formData,
        dateOfBirth: formData.dateOfBirth + "T00:00:00.000Z",
        imageUrl, // ✅ Dùng ảnh mới nếu có
      },
    };

    // ✅ Dùng editChildren từ useChildren
    editChildren.mutate(updatedData, {
      onSuccess: () => {
        toast.success("Cập nhật hồ sơ thành công!");
        navigate("/child-profile");
      },
      onError: (error) => {
        toast.error(`Lỗi: ${error.message}`);
      },
      onSettled: () => {
        setIsUploading(false);
      },
    });
  };

  if (isLoading)
    return <CircularProgress sx={{ display: "block", margin: "auto" }} />;
  if (isError)
    return (
      <Alert severity="error">
        {error.message || "Không thể tải dữ liệu trẻ."}
      </Alert>
    );
    const relationMapping = {
      "SonOrDaughter": "Con",
      "Grandchild": "Cháu",
      "Sibling": "Anh/Chị/Em",
      "Relative": "Người thân",
      "Other": "Khác",
    };

  <Typography>
    <strong>Quan Hệ:</strong>{" "}
    {relationMapping[formData.relationToUser] || "Không xác định"}
  </Typography>;

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
          <Typography>
            <strong>Họ và Tên:</strong> {formData.fullName}
          </Typography>
          <Typography>
            <strong>Ngày Sinh:</strong>{" "}
            {new Date(formData.dateOfBirth).toLocaleDateString("vi-VN")}
          </Typography>
          <Typography>
            <strong>Giới Tính:</strong>{" "}
            {formData.gender === "Male" ? "Nam" : "Nữ"}
          </Typography>
          <Typography>
            <strong>Quan Hệ:</strong>{" "}
            {relationMapping[formData.relationToUser] || "Không xác định"}
          </Typography>
          <Typography>
            <strong>Tiền Sử Bệnh:</strong>{" "}
            {formData.medicalHistory || "Không có"}
          </Typography>
          <Typography>
            <strong>Chiều cao:</strong> {formData.height || "Không có"} cm
          </Typography>
          <Typography>
            <strong>Cân nặng:</strong> {formData.weight || "Không có"} kg
          </Typography>
          {formData.imageUrl && (
            <Box mt={2}>
              <Typography variant="body2">
                <strong>Ảnh:</strong>
              </Typography>
              <img
                src={formData.imageUrl}
                alt="Child"
                style={{ width: "100px", height: "100px", borderRadius: "8px" }}
              />
            </Box>
          )}
          <Divider sx={{ marginY: 2 }} />
          <Button
            variant="outlined"
            color="primary"
            fullWidth
            onClick={() => setIsEditing(true)}
          >
            Chỉnh Sửa
          </Button>
          <Button
            variant="outlined"
            color="secondary"
            fullWidth
            sx={{ mt: 2 }}
            onClick={() => navigate("/child-profile")}
          >
            Quay lại
          </Button>
        </Box>
      ) : (
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label="Họ và Tên"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Ngày Sinh"
                name="dateOfBirth"
                type="date"
                value={formData.dateOfBirth}
                onChange={handleChange}
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth required>
                <InputLabel>Giới Tính</InputLabel>
                <Select
                  name="gender"
                  value={formData.gender}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, gender: e.target.value }))
                  }
                >
                  <MenuItem value="Male">Nam</MenuItem>
                  <MenuItem value="Female">Nữ</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
  <FormControl fullWidth required>
    <InputLabel>Quan Hệ</InputLabel>
    <Select
      name="relationToUser"
      value={formData.relationToUser || ""}
      onChange={(e) =>
        setFormData((prev) => ({
          ...prev,
          relationToUser: e.target.value,
        }))
      }
    >
      <MenuItem value="SonOrDaughter">Con</MenuItem>
      <MenuItem value="Grandchild">Cháu</MenuItem>
      <MenuItem value="Sibling">Anh/Chị/Em</MenuItem>
      <MenuItem value="Relative">Người thân</MenuItem>
      <MenuItem value="Other">Khác</MenuItem>
    </Select>
  </FormControl>
</Grid>


            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={formData.medicalHistory === "Có"}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        medicalHistory: e.target.checked ? "Có" : "Không",
                      }))
                    }
                  />
                }
                label="Tiền Sử Bệnh"
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Chiều Cao (cm)"
                name="height"
                type="number"
                value={formData.height}
                onChange={handleChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Cân Nặng (kg)"
                name="weight"
                type="number"
                value={formData.weight}
                onChange={handleChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <Button variant="contained" component="label" fullWidth>
                Chọn Ảnh
                <input
                  type="file"
                  hidden
                  accept="image/*"
                  onChange={handleFileChange}
                />
              </Button>
              {formData.imageUrl && (
                <img
                  src={formData.imageUrl}
                  alt="Preview"
                  style={{
                    width: "100px",
                    height: "100px",
                    borderRadius: "8px",
                    marginTop: 10,
                  }}
                />
              )}
            </Grid>
            <Grid item xs={12}>
              <Button type="submit" variant="contained" fullWidth>
                Lưu Thay Đổi
              </Button>
            </Grid>
            <Grid item xs={12}>
              <Button
                variant="outlined"
                color="secondary"
                fullWidth
                onClick={() => setIsEditing(false)}
              >
                Hủy
              </Button>
            </Grid>
          </Grid>
        </form>
      )}
    </Box>
  );
};

export default EditChildProfile;
