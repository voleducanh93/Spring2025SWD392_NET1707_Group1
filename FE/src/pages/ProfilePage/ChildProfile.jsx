import React from "react";
import { motion } from "framer-motion";
import { useChildren } from "../../hooks/useChildren"; // Gọi dữ liệu từ useChildren
import { Card, CardContent, CardActions, Button, Avatar, Typography, Grid, CircularProgress, Alert } from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import MaleIcon from "@mui/icons-material/Male";
import FemaleIcon from "@mui/icons-material/Female";

const ChildProfile = () => {
  const { vaccines: children, isLoading, isError, error, removeChildren } = useChildren(); // Gọi API từ useChildren

  // Xử lý trạng thái tải dữ liệu
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <CircularProgress />
      </div>
    );
  }

  // Xử lý lỗi khi lấy dữ liệu
  if (isError) {
    return (
      <div className="container mx-auto p-6">
        <Alert severity="error">{error.message || "Lỗi khi tải dữ liệu. Vui lòng thử lại."}</Alert>
      </div>
    );
  }

  // Hàm xóa hồ sơ
  const handleDelete = (id) => {
    if (window.confirm("Bạn có chắc muốn xóa hồ sơ này không?")) {
      removeChildren.mutate(id);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-4xl font-bold text-center text-blue-700"
      >
        Hồ Sơ Trẻ Em
      </motion.h1>

      <p className="text-lg text-center text-gray-600 mt-2">
        Quản lý thông tin sức khỏe và lịch sử tiêm vắc xin cho con yêu.
      </p>

      {/* Danh sách hồ sơ */}
      <Grid container spacing={4} className="mt-6">
        {children.map((child) => (
          <Grid item xs={12} sm={6} md={4} key={child.id}>
            <motion.div whileHover={{ scale: 1.05 }} transition={{ type: "spring", stiffness: 200 }}>
              <Card sx={{ maxWidth: 350, borderRadius: 3, boxShadow: 3 }}>
                <CardContent className="flex flex-col items-center">
                  <Avatar sx={{ width: 80, height: 80, mb: 2 }}>
                    {child.gender === "Male" ? <MaleIcon fontSize="large" color="primary" /> : <FemaleIcon fontSize="large" color="secondary" />}
                  </Avatar>
                  <Typography variant="h6" fontWeight="bold">
                    {child.fullName}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Ngày sinh: {new Date(child.dateOfBirth).toLocaleDateString("vi-VN")}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Giới tính: {child.gender === "Male" ? "Nam" : "Nữ"}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Quan hệ: {child.relationToUser}
                  </Typography>

                  <Typography variant="subtitle1" sx={{ mt: 2, fontWeight: "bold" }}>
                    Tiền sử bệnh:
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    {child.medicalHistory ? child.medicalHistory : "Không có"}
                  </Typography>
                </CardContent>
                <CardActions className="flex justify-center">
                  <Button variant="contained" color="primary" startIcon={<EditIcon />}>
                    Chỉnh sửa
                  </Button>
                  <Button variant="outlined" color="error" startIcon={<DeleteIcon />} onClick={() => handleDelete(child.childId)}>
                    Xóa
                  </Button>
                </CardActions>
              </Card>
            </motion.div>
          </Grid>
        ))}

        {/* Nút thêm hồ sơ mới */}
        <Grid item xs={12} sm={6} md={4}>
          <motion.div whileHover={{ scale: 1.05 }} transition={{ type: "spring", stiffness: 200 }}>
            <Card
              sx={{
                maxWidth: 350,
                height: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                border: "2px dashed #3b82f6",
                boxShadow: "none",
                borderRadius: 3,
                padding: 3,
              }}
            >
              <Button variant="outlined" color="primary" startIcon={<AddCircleIcon />} size="large">
                Thêm Hồ Sơ
              </Button>
            </Card>
          </motion.div>
        </Grid>
      </Grid>
    </div>
  );
};

export default ChildProfile;
