import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { TextField, Button, CircularProgress, Alert, Grid, Box, Typography, Divider } from "@mui/material";
import { useChildren } from "../../hooks/useChildren"; // Custom hook to get child data
import { toast } from "react-toastify"; // For success/failure messages

const EditChildProfile = () => {
  const { childId } = useParams(); // Get childId from the URL
console.log(childId);


  // Check if childId is undefined, which means the parameter is not found
  if (!childId) {
    return <Alert severity="error">Child ID is missing or undefined!</Alert>;
  }

  const { vaccines: children, isLoading, isError, error, editChildren } = useChildren(); // Custom hook to fetch data
  const navigate = useNavigate();
  

  const [formData, setFormData] = useState({
    fullName: "",
    dateOfBirth: "",
    gender: "",
    medicalHistory: "",
    relationToUser: "",
  });

  const [isEditing, setIsEditing] = useState(false); // To toggle between viewing and editing modes

  useEffect(() => {
    // Get child data based on childId
  ;
    
    
    const child = children.find(child => child.childId == childId); // Ensure you're using the correct property (`childId`)
    if (child) {
      // Ensure the date is in correct format (YYYY-MM-DD)
      const formattedDate = child.dateOfBirth ? child.dateOfBirth.split("T")[0] : ""; // Get date part only
  
      setFormData({
        fullName: child.fullName,
        dateOfBirth: formattedDate, // Ensure correct date format
        gender: child.gender,
        medicalHistory: child.medicalHistory,
        relationToUser: child.relationToUser,
      });
    }
  }, [children, childId]);
  
  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent form submission default behavior

    // Prepare the data to be passed to the mutation
    const updatedData = {
      id: childId,
      data: {
        fullName: formData.fullName,
        dateOfBirth: formData.dateOfBirth + "T00:00:00.000Z", // Format the date correctly
        gender: formData.gender,
        medicalHistory: formData.medicalHistory,
        relationToUser: formData.relationToUser,
      }
    };

    // Use the editChildren mutation to update the child profile
    editChildren.mutate(updatedData, {
      onSuccess: () => {
        toast.success("Cập nhật hồ sơ thành công!");
        navigate("/child-profile"); // Redirect after successful update
      },
      onError: (error) => {
        toast.error(`Lỗi: ${error.message}`);
      },
    });
  };

  const handleBack = () => {
    navigate("/child-profile"); // Navigate back to the profile list without saving
  };

  const handleEdit = () => {
    setIsEditing(true); // Enable editing mode
  };

  if (isLoading) return <CircularProgress sx={{ display: "block", margin: "auto" }} />;
  if (isError) return <Alert severity="error">{error.message || "Failed to load child data."}</Alert>;

  return (
    <Box sx={{ maxWidth: 800, margin: "auto", padding: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom align="center">
        Chỉnh Sửa Hồ Sơ Trẻ Em
      </Typography>

      {/* Show profile data if not in editing mode */}
      {!isEditing ? (
        <Box>
          <Typography variant="h6" fontWeight="bold" gutterBottom>
            Thông Tin Trẻ Em:
          </Typography>
          <Typography variant="body1" gutterBottom><strong>Họ và Tên:</strong> {formData.fullName}</Typography>
          <Typography variant="body1" gutterBottom><strong>Ngày Sinh:</strong> {new Date(formData.dateOfBirth).toLocaleDateString("vi-VN")}</Typography>
          <Typography variant="body1" gutterBottom><strong>Giới Tính:</strong> {formData.gender === "Male" ? "Nam" : "Nữ"}</Typography>
          <Typography variant="body1" gutterBottom><strong>Quan Hệ:</strong> {formData.relationToUser}</Typography>
          <Typography variant="body1" gutterBottom><strong>Tiền Sử Bệnh:</strong> {formData.medicalHistory || "Không có"}</Typography>

          <Divider sx={{ marginY: 2 }} />

          <Button variant="outlined" color="primary" onClick={handleEdit} sx={{ width: "100%" }}>
            Chỉnh Sửa
          </Button>
          <Button variant="outlined" color="secondary" onClick={handleBack} sx={{ width: "100%", marginTop: 2 }}>
            Quay lại
          </Button>
        </Box>
      ) : (
        // Show editable form if in editing mode
        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>

            {/* Full Name */}
            <Grid item xs={12} md={6}>
              <TextField
                label="Họ và Tên"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                fullWidth
                required
                variant="outlined"
              />
            </Grid>

            {/* Date of Birth */}
            <Grid item xs={12} md={6}>
              <TextField
                label="Ngày Sinh"
                name="dateOfBirth"
                type="date"
                value={formData.dateOfBirth}
                onChange={handleChange}
                fullWidth
                required
                InputLabelProps={{
                  shrink: true,
                }}
                variant="outlined"
              />
            </Grid>

            {/* Gender */}
            <Grid item xs={12} md={6}>
              <TextField
                label="Giới Tính"
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                fullWidth
                required
                variant="outlined"
                select
                SelectProps={{
                  native: true,  // This ensures proper dropdown behavior for mobile and desktop
                }}
                InputLabelProps={{
                  shrink: true,  // Ensures the label is placed correctly above the input field
                }}
              >
                <option value="">Chọn giới tính</option>
                <option value="Male">Nam</option>
                <option value="Female">Nữ</option>
              </TextField>
            </Grid>

            {/* Relation to User */}
            <Grid item xs={12} md={6}>
              <TextField
                label="Quan Hệ với Người Dùng"
                name="relationToUser"
                value={formData.relationToUser}
                onChange={handleChange}
                fullWidth
                required
                variant="outlined"
              />
            </Grid>

            {/* Medical History */}
            <Grid item xs={12}>
              <TextField
                label="Tiền Sử Bệnh"
                name="medicalHistory"
                value={formData.medicalHistory}
                onChange={handleChange}
                fullWidth
                variant="outlined"
                multiline
                rows={4}
              />
            </Grid>

            {/* Submit Button */}
            <Grid item xs={12}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                sx={{ width: "100%", padding: "14px" }}
              >
                Lưu Thay Đổi
              </Button>
            </Grid>

            {/* Back Button */}
            <Grid item xs={12}>
              <Button
                variant="outlined"
                color="secondary"
                sx={{ width: "100%", padding: "14px", marginTop: 2 }}
                onClick={handleBack}
              >
                Quay lại
              </Button>
            </Grid>

          </Grid>
        </form>
      )}
    </Box>
  );
};

export default EditChildProfile;
